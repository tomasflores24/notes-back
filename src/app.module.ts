import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config';
import { UsersModule } from './modules/users/users.module';
import { StatusModule } from './modules/status/status.module';
import { NotesModule } from './modules/notes/notes.module';
import { RolesModule } from './modules/roles/roles.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    StatusModule,
    NotesModule,
    RolesModule,
  ],
})
export class AppModule {}
