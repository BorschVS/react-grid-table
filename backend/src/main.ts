import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS for frontend
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true)
      
      // Allow localhost for development
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true)
      }
      
      // Allow all GitHub Pages domains
      if (origin.includes('github.io')) {
        return callback(null, true)
      }
      
      // Allow custom frontend URL from env
      if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
        return callback(null, true)
      }
      
      callback(null, true) // Allow all for now
    },
    credentials: true,
  })
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are sent
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Enable implicit type conversion
      },
    }),
  )
  
  // Set global prefix
  app.setGlobalPrefix('api')
  
  // Swagger configuration
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
  console.log(`🚀 Backend server is running on port ${port}`)
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`)
  console.log(`🌐 Web: http://localhost:5173/react-grid-table/`)
}
bootstrap()
