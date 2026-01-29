import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsArray,
  Min,
  Max,
  IsDateString,
} from 'class-validator'
import { TaskStatus, TaskPriority, TaskType } from '../enums/task.enums'

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Task title',
    example: 'Implement OAuth2 authentication',
  })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.InProgress,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @ApiPropertyOptional({
    description: 'Task priority',
    enum: TaskPriority,
    example: TaskPriority.High,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority

  @ApiPropertyOptional({
    description: 'Task type',
    enum: TaskType,
    example: TaskType.Story,
  })
  @IsOptional()
  @IsEnum(TaskType)
  type?: TaskType

  @ApiPropertyOptional({
    description: 'Assignee name',
    example: 'Alexander Johnson',
  })
  @IsOptional()
  @IsString()
  assignee?: string

  @ApiPropertyOptional({
    description: 'Story points (1-13)',
    example: 5,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(13)
  storyPoints?: number | null

  @ApiPropertyOptional({
    description: 'Time spent in hours',
    example: 6,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpent?: number

  @ApiPropertyOptional({
    description: 'Estimated time in hours',
    example: 8,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  timeEstimated?: number

  @ApiPropertyOptional({
    description: 'Resolved date',
    example: '2024-01-15T10:00:00Z',
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  resolvedDate?: Date | null

  @ApiPropertyOptional({
    description: 'Task labels',
    example: ['frontend', 'api'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[]

  @ApiPropertyOptional({
    description: 'Task components',
    example: ['Authentication', 'Dashboard'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  components?: string[]
}
