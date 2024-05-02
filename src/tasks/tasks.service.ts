import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "@src/tasks/entities/task.entity";

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTasksDto } from "@src/tasks/dto/get-tasks.dto";


@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const t: Task = await this.taskRepo.save(
      {
        status: TaskStatus.OPEN,
        ...createTaskDto
      }
    );
    return t;
  }

  async findAll(page: GetTasksDto) {
    return this.taskRepo.findAndCount(
      {
        skip: page.offset,
        take: page.limit
      }
    );
  }

  async findOne(id: string) {
    const t = await this.taskRepo.findOne(
      {
        where: {
          id: id
        }
      }
    );
    if (!t) throw new NotFoundException("Invalid task id");
    return t;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {

    const res = await this.taskRepo.update(id, updateTaskDto);
    if (!res.affected) throw new NotFoundException("Invalid task id");
    return res.affected;
  }

  async remove(id: string) {
    const res = await this.taskRepo.delete(id);
    if (!res.affected) throw new NotFoundException("Invalid task id");
    return res.affected;
  }

  async filterAll(q: GetTasksDto) {
    let query = this.taskRepo.createQueryBuilder("task");

    if (q.search) {
      query = query.where("task.title LIKE :search", { search: `%${q.search}%` });
    }

    if (q.status) {
      query = query.andWhere("task.status = :status", { status: q.status });
    }

    return await query.skip(q.offset).limit(q.limit).getManyAndCount();

  }


}
