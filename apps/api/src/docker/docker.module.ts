import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { DockerController } from './docker.controller';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  controllers: [DockerController],
  providers: [DockerService],
  imports: [AuditModule],
})
export class DockerModule {}
