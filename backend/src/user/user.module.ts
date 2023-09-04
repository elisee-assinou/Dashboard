// user/user.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema'; // Importez le modèle et le schéma
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({
      secret: 'votre-secret-jwt', // Remplacez par votre secret JWT
      signOptions: { expiresIn: '3m' }, // Durée de validité du token
    }), EmailModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
