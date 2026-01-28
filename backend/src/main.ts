import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'https://borschvs.github.io'],
    credentials: true,
  })
  
  // Set global prefix
  app.setGlobalPrefix('api')
  
  await app.listen(3000)
  console.log('🚀 Backend server is running on http://localhost:3000')
}
bootstrap()
