import { DocumentBuilder } from '@nestjs/swagger';

export const configSwagger = new DocumentBuilder()
  .setTitle('Notes')
  .setDescription('')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
