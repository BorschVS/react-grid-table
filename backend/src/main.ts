import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule)
  
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true)
      }
      
      if (origin.includes('github.io')) {
        return callback(null, true)
      }
      
      if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
        return callback(null, true)
      }
      
      callback(null, true)
    },
    credentials: true,
  })
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  
  app.setGlobalPrefix('api')
  
  const config = new DocumentBuilder()
    .setTitle('Jira Statistics API')
    .setDescription('REST API for managing Jira tasks and statistics')
    .setVersion('1.0')
    .addTag('tasks', 'Task management endpoints')
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  
  const port = process.env.PORT || 3000
  await app.listen(port)
  logger.log(`🚀 Backend server is running on port ${port}`)
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`)
  logger.log(`🌐 Web: http://localhost:5173/react-grid-table/`)
}
bootstrap()
