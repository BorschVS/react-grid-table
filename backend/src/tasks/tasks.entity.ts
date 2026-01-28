import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TaskStatus, TaskPriority, TaskType } from '@react-grid-table/shared/types'

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  key: string

  @Column()
  title: string

  @Column({
    type: 'text',
    default: 'To Do',
  })
  status: TaskStatus

  @Column({
    type: 'text',
    default: 'Low',
  })
  priority: TaskPriority

  @Column({
    type: 'text',
    default: 'Task',
  })
  type: TaskType

  @Column()
  assignee: string

  @Column()
  reporter: string

  @CreateDateColumn()
  createdDate: Date

  @Column({ nullable: true })
  resolvedDate: Date | null

  @Column({ nullable: true })
  storyPoints: number | null

  @Column({ default: 0 })
  timeSpent: number

  @Column()
  timeEstimated: number

  @Column()
  month: string

  @Column()
  sprint: string

  @Column('simple-array', { default: '', nullable: true })
  labels: string | string[]

  @Column('simple-array', { default: '', nullable: true })
  components: string | string[]

  @UpdateDateColumn()
  updatedAt: Date
}
