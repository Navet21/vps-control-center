import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DockerService } from './docker.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('docker')
export class DockerController {
  constructor(private readonly dockerService: DockerService) {}

  @Get('containers')
  getContainers() {
    return this.dockerService.getContainers();
  }

  @Get('services')
  getServices() {
    return this.dockerService.getServicesWithStatus();
  }

  @Get('logs/:service')
  getLogs(@Param('service') service: string) {
    return this.dockerService.getLogs(service);
  }

  @Post('restart/:service')
  restart(@Param('service') service: string) {
    return this.dockerService.restart(service);
  }
}
