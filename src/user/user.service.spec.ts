import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [JwtModule, PassportModule]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
