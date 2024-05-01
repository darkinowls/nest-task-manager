import { PartialType } from "@nestjs/swagger";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatus } from "@src/tasks/entities/task.entity";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title: string;
  description: string;
  status: TaskStatus;
}
