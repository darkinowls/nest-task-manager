import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PassPipe } from "@src/user/pipes/pass.pipe";
import { ApiTags, ApiOperation, ApiSecurity, ApiBearerAuth } from "@nestjs/swagger";
import { IdDto } from "@src/dto/id.dto";
import { LoginUserDto } from "@src/user/dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "@src/user/dto/jwt-payload.dto";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthDefender } from "@src/decorators/auth.defender";
import { ControlDecorator } from "@src/decorators/control.decorator";
import { GetUser } from "@src/decorators/get-user.decorator";

@ControlDecorator("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
  }

  @Post("sign-up/")
  @ApiOperation({ summary: "Create a new user" }) // Rename the operation
  async create(@Body(PassPipe) createUserDto: CreateUserDto): Promise<IdDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // test0@example.com
  // Test12
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwQGV4YW1wbGUuY29tIiwiaWQiOiI0NzIzZDhkNC0wOTU3LTQwMjQtOWRhZS1iNjc1MDJkNzEyMTMiLCJuYW1lIjoic3RyaW5nIiwiaWF0IjoxNzE0NjU2MzAxLCJleHAiOjE3MTQ2NTk5MDF9.ENVXc2dhzfBJsNkIZY7CoEioRos8P-mIg2LfaLOWqos
  @Post("/sign-in/")
  async findOne(@Body() user: LoginUserDto): Promise<string> {
    const u = await this.userService.findOne(user.email, user.password);
    const p: JwtPayloadDto = {
      email: u.email,
      id: u.id,
      name: u.name
    };
    return await this.jwtService.signAsync(p);
  }

  @AuthDefender()
  @Patch()
  update(@GetUser() user: JwtPayloadDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto);
  }


  @Delete(":id")
  remove(@GetUser() user: JwtPayloadDto) {
    return this.userService.remove(user.id);
  }
}
