import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
export class signupDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  readonly password: string;
}
