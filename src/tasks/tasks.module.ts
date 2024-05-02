import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "@src/tasks/entities/task.entity";
import { UserModule } from "@src/user/user.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UserModule,

  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {
}
