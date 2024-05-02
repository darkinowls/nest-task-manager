import { TaskStatus } from "@src/tasks/entities/task.entity";
import { IsEnum, IsOptional } from "class-validator";
import { PageDto } from "@src/dto/page.dto";

export class GetTasksDto extends PageDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

}