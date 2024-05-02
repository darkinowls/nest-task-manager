import { IsString } from "@node_modules/class-validator";

export class IdDto {
  @IsString()
  id: string;
}