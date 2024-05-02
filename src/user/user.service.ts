import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "@src/user/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IdDto } from "@src/dto/id.dto";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private ur: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return (await this.ur.insert({
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name
      })).identifiers[0] as IdDto;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.ur.find();
  }

  async findOne(id: string) {
    return await this.ur.findOne({
      where: {
        id: id
      }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // if (updateUserDto.password) {
    //   updateUserDto.password = updateUserDto.password;
    // }
    const res = (await this.ur.update(id, updateUserDto)).affected;
    if (res === 0) throw new NotFoundException();
    return res;
  }

  async remove(id: string) {
    const res = await this.ur.delete(id);
    if (res.affected === 0) throw new NotFoundException();
    return res;
  }
}
