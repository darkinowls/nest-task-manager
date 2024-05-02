import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "@src/user/entities/user.entity";
import { JwtPayloadDto } from "@src/user/dto/jwt-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private ur: Repository<User>) {
    super(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
      }
    );
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    console.log(payload);
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

