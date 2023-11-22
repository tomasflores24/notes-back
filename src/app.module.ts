import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { StatusModule } from './modules/status/status.module';
import { NotesModule } from './modules/notes/notes.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    StatusModule,
    NotesModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
