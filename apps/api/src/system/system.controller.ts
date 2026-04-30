import { Controller, Get, UseGuards } from '@nestjs/common';
import { SystemService } from './system.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('status')
  getStatus() {
    return this.systemService.getStatus();
  }

  @Get('uptime')
  getUptime() {
    return this.systemService.getUptime();
  }

  @Get('memory')
  getMemory() {
    return this.systemService.getMemory();
  }

  @Get('disk')
  getDisk() {
    return this.systemService.getDisk();
  }
}
