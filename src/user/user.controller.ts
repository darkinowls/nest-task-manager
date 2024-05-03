import {
	Get,
	Post,
	Body,
	Patch,
	Delete, UseInterceptors, Req
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ControlDecorator } from '../decorators/control.decorator';
import { IdDto } from '../dto/id.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { FilenameInterceptor } from '@src/filename.interceptor';
import { AuthDefender } from '@src/decorators/auth.defender';

@ControlDecorator('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {
	}

	@Post('sign-up/')
	@ApiOperation({ summary: 'Create a new user' }) // Rename the operation
	async create(@Body() createUserDto: CreateUserDto): Promise<IdDto> {
		return await this.userService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	// test0@example.com
	// Test12
	// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QwQGV4YW1wbGUuY29tIiwiaWQiOiI0NzIzZDhkNC0wOTU3LTQwMjQtOWRhZS1iNjc1MDJkNzEyMTMiLCJuYW1lIjoic3RyaW5nIiwiaWF0IjoxNzE0NjU2MzAxLCJleHAiOjE3MTQ2NTk5MDF9.ENVXc2dhzfBJsNkIZY7CoEioRos8P-mIg2LfaLOWqos
	@Post('/sign-in/')
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
	@UseInterceptors(new FilenameInterceptor('avatar',))
	@ApiConsumes('multipart/form-data')
	update(@GetUser() user: JwtPayloadDto, @Body() updateUserDto: UpdateUserDto,) {
		// console.log(updateUserDto.avatar!.filename);
		return this.userService.update(user.id, updateUserDto);
	}


	@Delete(':id')
	remove(@GetUser() user: JwtPayloadDto) {
		return this.userService.remove(user.id);
	}
}
