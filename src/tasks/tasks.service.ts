import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "@src/tasks/entities/task.entity";
import { GetTasksDto } from "@src/tasks/dto/get-tasks.dto";


let tasks: Task[] = [
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
    const t: Task = {
      status: TaskStatus.OPEN,
      id: tasks[tasks.length - 1].id + 1,
      ...createTaskDto
    };
    tasks.push(t);
    return t;

  }

  async findAll() {
    return tasks;
  }

  findOne(id: number) {
    const t = tasks.find((t) => t.id === id);
    if (!t) throw new NotFoundException("Invalid task id");
    return t;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    if (taskIndex < 0) throw new NotFoundException("Invalid task id");
    const t: Task = {
      ...tasks[taskIndex],
      ...updateTaskDto
    };
    tasks[taskIndex] = t;
    return t;
  }

  remove(id: number) {
    if (id < 0) throw new BadRequestException("Invalid task id");
    const t = tasks.find((t) => t.id === id)
    if (!t) throw new NotFoundException("Invalid task id");

    tasks = tasks.filter((ta) => ta.id !== id);

    console.log(tasks);

    return tasks;
  }

  filterAll(search: GetTasksDto) {
    let f = tasks.filter((t) => {
      if (!search.search) return true;
      return t.title.toLowerCase().includes(search.search.toLowerCase());

    });
    f = f.filter((t) => {
      if (!search.status) return true;
      return t.status === search.status;
    });
    return f;
  }


}
