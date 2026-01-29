import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsArray,
  Min,
  Max,
} from 'class-validator'
import { TaskStatus, TaskPriority, TaskType } from '../enums/task.enums'

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Implement OAuth2 authentication',
  })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.ToDo,
  })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus

  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
    example: TaskPriority.High,
  })
  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority

  @ApiProperty({
    description: 'Task type',
    enum: TaskType,
    example: TaskType.Story,
  })
  @IsEnum(TaskType)
  @IsNotEmpty()
  type: TaskType

  @ApiProperty({
    description: 'Assignee name',
    example: 'Alexander Johnson',
  })
  @IsString()
  @IsNotEmpty()
  assignee: string

  @ApiProperty({
    description: 'Reporter name',
    example: 'Product Owner',
  })
  @IsString()
  @IsNotEmpty()
  reporter: string

  @ApiProperty({
    description: 'Story points (1-13)',
    example: 5,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(13)
  storyPoints?: number | null

  @ApiProperty({
    description: 'Estimated time in hours',
    example: 8,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  timeEstimated: number

  @ApiProperty({
    description: 'Month when task was created',
    example: 'January 2024',
  })
  @IsString()
  @IsNotEmpty()
  month: string

  @ApiProperty({
    description: 'Sprint name',
    example: 'Sprint 1',
  })
  @IsString()
  @IsNotEmpty()
  sprint: string

  @ApiProperty({
    description: 'Task labels',
    example: ['frontend', 'api'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[]

  @ApiProperty({
    description: 'Task components',
    example: ['Authentication', 'Dashboard'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  components?: string[]
}
