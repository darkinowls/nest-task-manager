import { IsOptional, MinLength, IsBase64 } from "class-validator";
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UploadedFile } from '@nestjs/common';


export class UpdateUserDto {

  @IsOptional()
  @MinLength(2)
  name?: string;


  @IsOptional()
  @ApiProperty({ type: 'file' })
  avatar?: Express.Multer.File

}
