import { NestFactory } from '@nestjs/core'
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
  
  // Set global prefix
  app.setGlobalPrefix('api')
  
  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`🚀 Backend server is running on port ${port}`)
}
bootstrap()
