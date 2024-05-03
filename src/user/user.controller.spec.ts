// import { UserService } from './user.service';
// import { UserController } from './user.controller';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';
// import { PassportModule } from '@nestjs/passport';
// import { Repository } from 'typeorm';
// import { User } from '@src/user/entities/user.entity';
//
//
// describe('UserController', () => {
// 	let userController: UserController;
// 	let userService: UserService;
// 	let jwtService: JwtService;
//
// 	beforeEach(async () => {
// 		const moduleRef: TestingModule = await Test.createTestingModule({
// 			controllers: [UserController],
//       imports: [JwtModule, PassportModule],
// 			providers: [
// 				UserService,
//         Repository<User>,
//
// 				{
// 					provide: JwtService,
// 					useValue: {
// 						signAsync: jest.fn().mockResolvedValue('mockedJwtToken')
// 					}
// 				}
// 			]
// 		}).compile();
//
// 		userController = moduleRef.get<UserController>(UserController);
// 		userService = moduleRef.get<UserService>(UserService);
// 		jwtService = moduleRef.get<JwtService>(JwtService);
// 	});
//
// 	describe('findOne', () => {
// 		it('should return a JWT token when valid user credentials are provided', async () => {
// 			const mockUser = { email: 'test@example.com', password: 'password' };
// 			const mockJwtPayload = { id: 'a', email: 'test@example.com', password: 'password', name: 'as', tasks: [] };
//
// 			jest.spyOn(userService, 'findOne').mockResolvedValue(mockJwtPayload);
//
// 			const jwtToken = await userController.findOne(mockUser);
//
// 			expect(userService.findOne).toHaveBeenCalledWith('test@example.com', 'password');
// 			expect(jwtService.signAsync).toHaveBeenCalledWith(mockJwtPayload);
// 			expect(jwtToken).toEqual('mockJwtPaylo');
// 		});
//
// 		// Add more test cases for edge cases, error handling, etc.
// 	});
// });
