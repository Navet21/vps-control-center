import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

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
