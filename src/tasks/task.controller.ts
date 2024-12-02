import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { Task } from "@prisma/client";
import { TaskService } from "./task.service";
import { PrismaService } from "src/database/prisma.service";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { CompleteTaskDto } from "./dtos/complete-task.dtc";

@Controller("tasks")
export class TaskController {
  constructor(
    private prisma: PrismaService,
    private taskService: TaskService,
  ) {}

  @Post("/create")
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskService.create(createTaskDto);
    return task;
  }

  @Get()
  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy: {
        createdAt: "desc"
      },
    });
    return tasks;
  }

  @Get(":id")
  async findTaskById(@Param() params: any) {
    const { id } = params;
    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    });

    return task;
  }

  @Patch("/update/:id")
  async updateTaskById(@Param() params: any, @Body() updateTaskDto: UpdateTaskDto) {
    const { id } = params;
    const { title, description, isCompleted } = updateTaskDto;

    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    });

    if (!task) {
      return {
        message: "Tarefa não encontrada."
      };
    }

    const update = await this.prisma.task.update({
      where: {
        id
      },
      data: {
        title,
        description,
        isCompleted: !!isCompleted,
        completedAt: isCompleted ? new Date() : null,
        updatedAt: new Date(),
      }
    });

    return update;
  }

  @Patch("/complete/:id")
  async completeTask(@Param() params: any, @Body() completeTaskDto: CompleteTaskDto) {
    const { id } = params;
    const { isCompleted } = completeTaskDto;

    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    });

    if (!task) {
      return {
        message: "Tarefa não encontrada."
      };
    }

    const update = await this.prisma.task.update({
      where: {
        id
      },
      data: {
        isCompleted,
        completedAt: new Date(),
      }
    });

    return update;
  }

  @Delete("/delete/:id")
  async deleteTaskById(@Param() params: any) {
    const { id } = params;

    const task = await this.prisma.task.findUnique({
      where: {
        id
      }
    });

    if (!task) {
      return {
        message: "Tarefa não encontrada."
      };
    }

    await this.prisma.task.delete({
      where: {
        id
      }
    });
  }
}
