import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@src/user/entities/user.entity";
import { JwtPayloadDto } from "@src/user/dto/jwt-payload.dto";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectRepository(User) private ur: Repository<User>) {
    super(
      {
        secretOrKey: configService.getOrThrow('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
      }
    );
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    Logger.debug(payload, "JwtStrategy")
    const u = await this.ur.findOne({
      where: {
        email: payload.email
      }
    });
    if (!u) {
      throw new UnauthorizedException();
    }
    return u;
  }
}

