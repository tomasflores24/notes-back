import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './modules/users/users.module';
import { StatusModule } from './modules/status/status.module';
@Module({
  imports: [TypeOrmModule.forRoot(DataSourceConfig), UsersModule, StatusModule],
})
export class AppModule {}
