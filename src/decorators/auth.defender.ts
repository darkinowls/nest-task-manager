import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AuthDefender() {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(AuthGuard()),
  );
}