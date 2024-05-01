import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string = "test@example.com";
  @MinLength(6)
  password: string ;
  @MinLength(6)
  passwordAgain: string;
  name: string;
}
