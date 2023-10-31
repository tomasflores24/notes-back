import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { StatusModule } from './modules/status/status.module';
import { DataSourceConfig } from './config/db.config';
@Module({
  imports: [TypeOrmModule.forRoot(DataSourceConfig), UsersModule, StatusModule],
})
export class AppModule {}
