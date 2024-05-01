import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskStatus } from "@src/tasks/entities/task.entity";
import { GetTasksDto } from "@src/tasks/dto/get-tasks.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


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

  async findAll() {
    return this.taskRepo.find();
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

    return (await this.taskRepo.delete(id)).affected;
  }

  async filterAll(search: GetTasksDto): Promise<Task[]> {
    let query = this.taskRepo.createQueryBuilder("task");

    if (search.search) {
      query = query.where("task.title LIKE :search", { search: `%${search.search}%` });
    }

    if (search.status) {
      query = query.andWhere("task.status = :status", { status: search.status });
    }

    return await query.getMany();

  }


}
