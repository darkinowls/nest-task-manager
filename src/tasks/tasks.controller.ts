import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ApiTags } from "@nestjs/swagger";
import { GetTasksDto } from "@src/tasks/dto/get-tasks.dto";
import { AuthDefender } from "@src/decorators/auth.defender";
import { ControlDecorator } from "@src/decorators/control.decorator";
import { JwtPayloadDto } from "@src/user/dto/jwt-payload.dto";
import { GetUser } from "@dist/user/get-user.decorator";




@ControlDecorator("tasks")
@AuthDefender()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: JwtPayloadDto) {
    return this.tasksService.create(createTaskDto, user.id);
  }


  @Get("/")
  async findAll(@Query() q: GetTasksDto, @GetUser() user: JwtPayloadDto) {
    console.log(q);
    if (q.search || q.status) {
      console.log(q);
      return await this.tasksService.filterAll(q, user.id);
    }
    return await this.tasksService.findAll(q, user.id);
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string, @GetUser() user: JwtPayloadDto) {
    return this.tasksService.findOne(id, user.id);
  }

  @Patch(":id")
  update(
    @GetUser() user: JwtPayloadDto,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto, user.id);
  }


  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string, @GetUser() user:  JwtPayloadDto) {
    return this.tasksService.remove(id, user.id);
  }
}



