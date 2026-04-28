import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';
import { DockerModule } from './docker/docker.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [SystemModule, DockerModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
