import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto, UpdateTaskDto, JiraTask } from '@react-grid-table/shared/types'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<JiraTask> {
    return this.tasksService.create(createTaskDto)
  }

  @Get()
  findAll(): Promise<JiraTask[]> {
    return this.tasksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<JiraTask | null> {
    return this.tasksService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<JiraTask> {
    return this.tasksService.update(id, updateTaskDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(id)
  }
}
