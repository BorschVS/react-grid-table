import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API health check' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHealth() {
    return {
      message: 'Jira Statistics API is running',
      version: '1.0',
      endpoints: {
        tasks: '/api/tasks',
        docs: '/api/docs',
      },
    }
  }
}
