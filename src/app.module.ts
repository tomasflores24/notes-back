import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { StatusModule } from './modules/status/status.module';
import { DataSourceConfig } from './config/db.config';
import { NotesModule } from './modules/notes/notes.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    StatusModule,
    NotesModule,
  ],
})
export class AppModule {}
