import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { AppController } from './app.controller'
import { DataSource } from 'typeorm'
import { seedDatabase } from './seed'
import { TaskEntity } from './tasks/tasks.entity'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'jira-tasks.db',
      // Explicit entities array works in both dev and production
      // Alternative: entities: [join(__dirname, '**', '*.entity.{ts,js}')]
      entities: [TaskEntity],
      synchronize: true, // Only for development!
    }),
    TasksModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // Seed database on startup
    seedDatabase(dataSource).catch(console.error)
  }
}
