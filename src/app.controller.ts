import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from "./app.service";
import { ControlDecorator } from "@src/decorators/control.decorator";

@ControlDecorator()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    Logger.verbose("Hello from AppController")
    return this.appService.getHello();
  }
}
