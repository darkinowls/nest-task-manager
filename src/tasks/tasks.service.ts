import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "@src/tasks/entities/task.entity";


const tasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    status: TaskStatus.DONE
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: TaskStatus.DONE
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    status: TaskStatus.DONE
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description 4",
    status: TaskStatus.DONE
  }
];

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto): Task {
   const t: Task =  {
     status: TaskStatus.OPEN,
     id: tasks.length + 1,
     ...createTaskDto
   }
    tasks.push(t);
    return t;

  }

  async findAll() {
    return tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const t: Task = {
      ...tasks[id],
      ...updateTaskDto
    }
    tasks[id] = t;
    return t;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
