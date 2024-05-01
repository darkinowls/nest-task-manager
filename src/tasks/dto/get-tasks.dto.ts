import { TaskStatus } from "@src/tasks/entities/task.entity";

export class GetTasksDto {
  search?: string;
  status?: TaskStatus;
}