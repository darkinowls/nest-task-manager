import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadDto } from "@src/user/dto/jwt-payload.dto";

export const GetUser = createParamDecorator(
  (_, req: ExecutionContext) : JwtPayloadDto => {
    return req.switchToHttp().getRequest().user;
  }
);