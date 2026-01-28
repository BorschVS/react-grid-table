import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { DataSource } from 'typeorm'
import { seedDatabase } from './seed'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'jira-tasks.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development!
    }),
    TasksModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // Seed database on startup
    seedDatabase(dataSource).catch(console.error)
  }
}
