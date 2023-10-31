import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './modules/users/users.module';
@Module({
  imports: [TypeOrmModule.forRoot(DataSourceConfig), UsersModule],
})
export class AppModule {}
