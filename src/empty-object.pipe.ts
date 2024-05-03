import {
  ArgumentMetadata,
  BadRequestException, CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  PipeTransform
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class EmptyObjectPipe implements PipeTransform {
  transform(value: any, meta: ArgumentMetadata) {

    if (meta.type === "body" && typeof value === "object" && Object.keys(value).length === 0) {
      throw new BadRequestException("Empty payload");
    }

    return value;
  }
}

