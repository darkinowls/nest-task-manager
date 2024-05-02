import { IsEmail, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string = "test@example.com";

  @MinLength(6)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    {
      message: "Password must contain at least one uppercase letter, one lowercase letter and one number"
    }
  )
  password: string;


  @MinLength(4)
  @MaxLength(20)
  name: string;
}
