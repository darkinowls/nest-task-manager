import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiTags } from "@nestjs/swagger";
import { GetTasksDto } from "@src/tasks/dto/get-tasks.dto";


@Controller("tasks")
@ApiTags("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }


  @Get("/")
  async findAll(@Query() search?: GetTasksDto) {
    if (Object.keys(search).length > 0) {
      console.log(search);
      return this.tasksService.filterAll(search);
    }
    return await this.tasksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }


  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.tasksService.remove(+id);
  }
}



