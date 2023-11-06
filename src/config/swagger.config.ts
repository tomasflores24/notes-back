import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Notes')
  .setDescription('Description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
