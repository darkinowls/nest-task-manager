import { IsOptional, MinLength } from "class-validator";

export class UpdateUserDto {

  @IsOptional()
  @MinLength(2)
  name?: string;

}
