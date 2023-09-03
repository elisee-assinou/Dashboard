import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class loginDto {
  
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  readonly password: string;
}
