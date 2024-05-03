import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IdDto } from '../dto/id.dto';
import { compare, hash } from "bcrypt";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private ur: Repository<User>) {
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return (await this.ur.insert({
        email: createUserDto.email,
        password: await hash(createUserDto.password, 10),
        name: createUserDto.name
      })).identifiers[0] as IdDto;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.ur.find();
  }

  async findOne(email: string, password: string) {
    const u = await this.ur.findOne({
      where: {
        email
      },
    });
    if (!u || !await compare(password, u.password)) {
      throw new NotFoundException();
    }
    return u
  }

  async update(id: string, updateUserDto: UpdateUserDto, ) {
    // if (updateUserDto.password) {
    //   updateUserDto.password = updateUserDto.password;
    // }
    const {avatar, ...rest} = updateUserDto;
    const res = (await this.ur.update(id,
      {...rest,avatarImage: avatar?.filename })).affected;
    if (res === 0) throw new NotFoundException();
    return res;
  }

  async remove(id: string) {
    const res = await this.ur.delete(id);
    if (res.affected === 0) throw new NotFoundException();
    return res;
  }
}
