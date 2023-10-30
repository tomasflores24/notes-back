import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
@Module({
  imports: [TypeOrmModule.forRoot(DataSourceConfig)],
})
export class AppModule {}
