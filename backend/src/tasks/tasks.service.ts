import { Injectable, NotFoundException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TaskEntity } from './tasks.entity'
import { JiraTask } from '@react-grid-table/shared/types'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async findAll(): Promise<JiraTask[]> {
    this.logger.debug('Finding all tasks')
    const tasks = await this.tasksRepository.find({
      order: { createdDate: 'DESC' },
    })
    this.logger.log(`Found ${tasks.length} tasks`)
    return tasks.map(this.mapToJiraTask)
  }

  async findOne(id: string): Promise<JiraTask> {
    this.logger.debug(`Finding task with ID: ${id}`)
    const task = await this.tasksRepository.findOne({ where: { id } })
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`)
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return this.mapToJiraTask(task)
  }

  async create(createTaskDto: CreateTaskDto): Promise<JiraTask> {
    const taskKey = await this.generateTaskKey()
    const task = this.tasksRepository.create({
      ...createTaskDto,
      key: taskKey,
      createdDate: new Date(),
      labels: createTaskDto.labels || [],
      components: createTaskDto.components || [],
    })
    const saved = await this.tasksRepository.save(task)
    this.logger.log(`Task created successfully with key: ${taskKey}`)
    return this.mapToJiraTask(saved)
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<JiraTask> {
    const task = await this.tasksRepository.findOne({ where: { id } })
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found for update`)
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    
    await this.tasksRepository.update(id, updateTaskDto)
    const updatedTask = await this.tasksRepository.findOne({ where: { id } })
    this.logger.log(`Task with ID ${id} updated successfully`)
    return this.mapToJiraTask(updatedTask!)
  }

  async remove(id: string): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id } })
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found for deletion`)
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    await this.tasksRepository.delete(id)
    this.logger.log(`Task with ID ${id} deleted successfully`)
  }

  private async generateTaskKey(): Promise<string> {
    const count = await this.tasksRepository.count()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    return `TASK-${String(month).padStart(2, '0')}-${String(count + 1).padStart(4, '0')}`
  }

  private mapToJiraTask(task: TaskEntity): JiraTask {
    // TypeORM simple-array returns string, need to convert to array
    const labelsValue = task.labels as string | string[] | undefined
    const labels = Array.isArray(labelsValue)
      ? labelsValue
      : (labelsValue || '').toString().split(',').filter(Boolean)
    
    const componentsValue = task.components as string | string[] | undefined
    const components = Array.isArray(componentsValue)
      ? componentsValue
      : (componentsValue || '').toString().split(',').filter(Boolean)

    return {
      id: task.id,
      key: task.key,
      title: task.title,
      status: task.status,
      priority: task.priority,
      type: task.type,
      assignee: task.assignee,
      reporter: task.reporter,
      createdDate: task.createdDate,
      resolvedDate: task.resolvedDate,
      storyPoints: task.storyPoints,
      timeSpent: task.timeSpent,
      timeEstimated: task.timeEstimated,
      month: task.month,
      sprint: task.sprint,
      labels,
      components,
    }
  }
}
