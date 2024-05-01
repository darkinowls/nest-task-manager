import { PartialType } from "@nestjs/swagger";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatus } from "@src/tasks/entities/task.entity";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  @IsOptional() // Makes the property optional
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
