import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { TaskController } from './tasks/task.controller';
import { TaskService } from './tasks/task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [PrismaService, TaskService],
})
export class AppModule {}
