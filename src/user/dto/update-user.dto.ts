import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "@src/user/dto/create-user.dto";

export class UpdateUserDto
  extends PartialType(OmitType(CreateUserDto, ["passwordAgain", "password", "email"] as const)) {

}
