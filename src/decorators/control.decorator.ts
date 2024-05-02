import { applyDecorators, Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

export function ControlDecorator(name: string = 'util') {
  return applyDecorators(
    Controller(name),
    ApiTags(name)
  );
}