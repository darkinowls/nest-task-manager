import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ControlDecorator } from "@src/decorators/control.decorator";

@ControlDecorator()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
