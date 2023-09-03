import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signupDto } from './Dtos/signupDto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly jwtService: JwtService,
    private readonly emailService: EmailService,) { }


  async postSignup(body: signupDto) {

    function validateUsername(username) {
      const regex = /^[a-zA-Z]+[a-zA-Z0-9]+$/;
      return regex.test(username);
    }

    if (!validateUsername(body.username)) {
      return { message: 'Le nom d\'utilisateur n\'est pas valide. Il doit contenir uniquement des lettres et des chiffres' };
    }
    // Vérification si l'e-mail est déjà utilisé
    const existingUser = await this.userModel.findOne({ email: body.email });
    if (existingUser) {
      throw new ConflictException('Cet e-mail est déjà enregistré.');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = new this.userModel({
      username: body.username,
      email: body.email,
      password: hashedPassword, // Stocke le mot de passe haché en base de données
    });


    // Générez le token JWT pour l'activation de l'e-mail
    const token = this.jwtService.sign({ userId: newUser.id });

    newUser.token = token;

    // Générez le lien d'activation
    const activationLink = `http://127.0.0.1:3001/user/verify/${token}`;

    // Envoyez l'e-mail de vérification
    await this.emailService.sendEmail(
      newUser.email,
      'Vérification de votre compte',
      `Cliquez sur ce lien pour activer votre compte : ${activationLink}`,
    );

    return newUser.save();
  }


  async loginUser(email: string, password: string): Promise<User | any> {
    const user = await this.userModel.findOne({ email });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return "Le mot de passe est incorrect"; // Mot de passe incorrect
      }

      if (user.isVerified == false) {
        return { message: "Veuillez valider votre compte pour vous connecter" }
      }
      else {
        const token = this.jwtService.sign({ userId: user.id });
        user.token = token;
        await user.save()
        return { userId: user.id, token, message: "Connexion réussie" }; // Utilisateur connecté avec succès

      }
    }
  }

  async logoutUser(userId: string): Promise<User | any> {
    const user = await this.userModel.findById(userId);
    if (user) {
      if (user.token != null) {
        user.token = null;
        await user.save()
        return "Déconnexion réussie"
      }
      else {
        return "Vous n'êtes pas connecté"
      }
    }

  }

  async verifyUserEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const userId = payload.userId;
      const user = await this.userModel.findById(userId);

      if (user) {

        if (user.isVerified == true) {
          return "Votre compte a déjà été activé"
        }
        else {
          // Marquez l'utilisateur comme vérifié
          user.isVerified = true;
          user.token = null;
          await user.save();
          return "Votre compte a été validé avec succès";
        }

      }
      else {
        return "Ce lien a expiré, veuillez réessayer"
      }
    } catch (error) {
      return error;
    }
  }

  async addPreferences(userId: string, serviceId: string): Promise<User | any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    if (!user.preferences.includes(serviceId)) {
      user.preferences.push(serviceId);
      await user.save();
      return { message: 'Service ajouté avec succès aux préférences de l\'utilisateur', user };
    }
    else {
      return { message: 'Ce service a déjà été ajouté' }
    }

  }

  async deletePreferences(userId: string, serviceId: string): Promise<User | any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    if (user.preferences.includes(serviceId)) {
      const preferences = user.preferences;
      const filteredPreferences = preferences.filter((preference) => preference !== serviceId)
      user.preferences = filteredPreferences
      await user.save()
      return { message: 'Service retiré avec succès des préférences de l\'utilisateur' };
    }
    else {
      return { message: "Ce service n'existe pas dans la liste" }
    }

  }

  async getUserById(userId: string): Promise<User> {
    return this.userModel.findById(userId);
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateUser(userId: string, userData): Promise<User | any> {
    const user = await this.userModel.findById(userId);
    // console.log(userData)
    // console.log(user)
    if (!user) {
      return "L'utilisateur n'existe pas";
    }

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);
    console.log(isPasswordCorrect)

    if (!isPasswordCorrect) {
      return "Mot de passe incorrect"; // Mot de passe incorrect
    }
    if (userData.new_password === userData.new_password_conf) {
      const hashedPassword = await bcrypt.hash(userData.new_password, 10);
      delete userData.new_password_conf;
      delete userData.password;

      userData.password = hashedPassword;
      // console.log(userData)
      Object.assign(user, userData); // Met à jour les propriétés de l'utilisateur
      await user.save();
      // console.log(user)
      return { message: "L'utilisateur a bien été modifié", user };
    } else {
      return "Les mots de passe ne sont pas identique "
    }

  }

  async deleteUser(userId: string): Promise<User> {
    return this.userModel.findByIdAndDelete(userId)
  }
}