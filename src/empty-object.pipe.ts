import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any, meta: ArgumentMetadata) {

    if (meta.type === "body" && typeof value === "object" && Object.keys(value).length === 0) {
      throw new BadRequestException("Empty payload");
    }

    return value;
  }
}
