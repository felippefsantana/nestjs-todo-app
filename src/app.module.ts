import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { TaskController } from './tasks/task.controller';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [PrismaService],
})
export class AppModule {}
