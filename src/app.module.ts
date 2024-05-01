import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    TypeOrmModule.forRootAsync(
      {
        useFactory: () => ({
          type: "postgres",
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          host: process.env.POSTGRES_HOST,
          database: process.env.POSTGRES_DB,
          port: parseInt(process.env.POSTGRES_PORT),
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== "production",
        })


      }
    )


  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {

}
