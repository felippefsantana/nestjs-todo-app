import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateTaskDto } from "./dtos/create-task.dto";

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
      },
    });

    return task;
  }
}