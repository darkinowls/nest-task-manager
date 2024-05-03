import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from './entities/task.entity';

import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTasksDto } from './dto/get-tasks.dto';


@Injectable()
export class TasksService {

  constructor(@InjectRepository(Task) private readonly taskRepo: Repository<Task>) {
  }

  async create(createTaskDto: CreateTaskDto, userId: string) {
    let input = {
      status: TaskStatus.OPEN,
      ...createTaskDto
    };
    try {
      const res = await this.taskRepo.insert(
        {
          ...input,
          user: { id: userId }
        }
      );
      return {
        ...input,
        id: res.identifiers[0].id
      };
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async findAll(page: GetTasksDto, userId: string) {
    return this.taskRepo.findAndCount(
      {
        skip: page.offset,
        take: page.limit,
        where: {
          user: { id: userId }
        }
      }
    );
  }

  async findOne(id: string, userId: string) {
    const t = await this.taskRepo.findOne(
      {
        where: {
          id: id,
          user: { id: userId }
        }
      }
    );
    if (!t) throw new NotFoundException("Invalid task id");
    return t;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {

    const res = await this.taskRepo.update({
      id: id,
      user: { id: userId }
    }, updateTaskDto);
    if (!res.affected) throw new NotFoundException("Invalid task id");
    return res.affected;
  }

  async remove(id: string, userId: string) {
    const res = await this.taskRepo.delete({
      id: id,
      user: { id: userId }
    });
    if (!res.affected) throw new NotFoundException("Invalid task id");
    return res.affected;
  }

  async filterAll(q: GetTasksDto, userId: string) {
    let query = this.taskRepo.createQueryBuilder("task");

    query = query.where({
      user: { id: userId }
    });


    if (q.search) {
      query = query.andWhere(
        "(LOWER(task.title) LIKE LOWER(:search) " +
        "OR LOWER(task.description) LIKE LOWER(:search))",
        { search: `%${q.search}%` });
    }

    if (q.status) {
      query = query.andWhere({
        status: q.status
      });
    }

    return await query.skip(q.offset).limit(q.limit).getManyAndCount();

  }


}
