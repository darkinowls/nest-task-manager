import { IsEnum, IsInt, Max } from "@node_modules/class-validator";
import { IsOptional } from "class-validator";
import { TaskStatus } from "@src/tasks/entities/task.entity";

export class PageDto {


  @IsInt()
  @Max(10)
  @IsOptional()
  limit?: number = 5;


  @IsInt()
  @IsOptional()
  offset?: number = 0;

}

