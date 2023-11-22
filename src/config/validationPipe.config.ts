import { ValidationPipe } from '@nestjs/common';

export const ConfigValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
});
