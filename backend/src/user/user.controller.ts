import { Controller, Get, Render, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { signupDto } from './Dtos/signupDto';
import { loginDto } from './Dtos/loginDto'
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/signup')
  @Render('user/signup')
  getSignup() {}

  @Get('/login')
  @Render('user/login')
  getLogin() {}

  @Post('/signup')
  postSignup(@Body() body: signupDto) {
    return this.userService.postSignup(body);
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string) {
    // Vérifiez le token JWT et activez le compte utilisateur
    const user = await this.userService.verifyUserEmail(token);
    return user
  }
  
  @Post('/login')
  async postLogin(@Body() body: loginDto) {
    const user = await this.userService.loginUser(body.email, body.password);

    if (!user) {
      // Gérer le cas où la connexion a échoué
      return {
        message: 'Échec de la connexion. Vérifiez vos informations de connexion.',
      };
    }
    else{
      return user
    }
  }

  @Post("logout/:userId")
  async logout(@Param("userId") userId: string){
    const user = await this.userService.logoutUser(userId);
    return user
  }

  
  @Post(':userId/add-preference/:serviceId')
  async addPreference(@Param('userId') userId: string, @Param('serviceId') serviceId: string) {
    const user = await this.userService.addPreferences(userId, serviceId);
    return user;
  }

  @Delete(':userId/delete-preference/:serviceId')
  async removePreference(@Param('userId') userId: string, @Param('serviceId') serviceId: string) {
    const user = await this.userService.deletePreferences(userId, serviceId);
    return user;
  }

  @Get('/preference/:userId')
  async getPreference(@Param('userId') userId: string) {
    const user = await this.userService.getUserById(userId);
    return user.preferences;
  }

  @Get()
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return users
  }
  
  @Put(':userId')
  async updateU(@Param('userId') userId: string, @Body() userData: any){
    const updatedUser = await this.userService.updateUser(userId, userData);
    return { updatedUser }
  }

  @Get(':userId')
  async getOneUser(@Param('userId') userId: string){
    const user = await this.userService.getUserById(userId)
    if (user){
      return {user}
    }
    else{
      return {message:'Cet utilisateur n\'existe pas'}
    }
    
  }

  @Delete(':userId')
  async removeUser(@Param('userId') userId: string){
    const deletedUser = await this.userService.deleteUser(userId)
    if (deletedUser){
      return {message: 'Utilisateur supprimer avec sussès', deletedUser}
    }
    else{
      return {message:'Cet utilisateur n\'existe pas'}
    }  
  }
}
