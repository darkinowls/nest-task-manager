import { IsEmail, Matches, MinLength } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    {
      message: "Password must contain at least one uppercase letter, one lowercase letter and one number"
    }
  )
  password: string;
}