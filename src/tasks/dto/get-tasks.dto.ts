import { TaskStatus } from "@src/tasks/entities/task.entity";
import { IsEnum, IsOptional } from "class-validator";

export class GetTasksDto {
  @IsOptional() // Makes the property optional
  search?: string;

  @IsOptional() // Makes the property optional
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}