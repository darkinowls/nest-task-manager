import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { CreateUserDto } from "@src/user/dto/create-user.dto";

@Injectable()
export class PassPipe implements PipeTransform<CreateUserDto, CreateUserDto> {
  transform(value: CreateUserDto, _: ArgumentMetadata) {
    if (value.password !== value.passwordAgain) {
      throw new BadRequestException("Passwords do not match");
    }
    return value;
  }
}
