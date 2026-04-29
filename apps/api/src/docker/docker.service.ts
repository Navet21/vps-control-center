import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { execFile } from 'child_process';
import { AuditService } from 'src/audit/audit.service';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

@Injectable()
export class DockerService {
  private allowedContainers: Record<string, string>;

  constructor(private readonly auditService: AuditService) {
    this.allowedContainers = this.parseAllowedContainers();
  }

  async getContainers() {
    try {
      const { stdout } = await execFileAsync('docker', [
        'ps',
        '--format',
        '{{json .}}',
      ]);

      const lines = stdout.trim().split('\n').filter(Boolean);

      return lines.map((line) => JSON.parse(line));
    } catch {
      throw new InternalServerErrorException('Error getting Docker containers');
    }
  }

  async getLogs(service: string) {
    const container = this.getContainer(service);

    try {
      const { stdout } = await execFileAsync('docker', [
        'logs',
        container,
        '--tail',
        '100',
      ]);

      await this.auditService.success('VIEW_LOGS', service);

      return {
        service,
        container,
        logs: stdout,
      };
    } catch (error) {
      await this.auditService.error('VIEW_LOGS', service, error);

      throw new InternalServerErrorException(
        `Error getting logs for ${service}`,
      );
    }
  }

  async restart(service: string) {
    const container = this.getContainer(service);

    try {
      await execFileAsync('docker', ['restart', container]);

      await this.auditService.success('RESTART_SERVICE', service);

      return {
        service,
        status: 'restarted',
      };
    } catch (error) {
      await this.auditService.error('RESTART_SERVICE', service, error);

      throw new InternalServerErrorException(`Error restarting ${service}`);
    }
  }

  getAllowedServices() {
    return Object.entries(this.allowedContainers).map(([alias, container]) => ({
      alias,
      container,
    }));
  }

  async getServicesWithStatus() {
    try {
      const containers = await this.getContainers();

      const services = Object.entries(this.allowedContainers).map(
        ([alias, containerName]) => {
          const container = containers.find((c) => c.Names === containerName);

          return {
            alias,
            container: containerName,
            status: container ? 'running' : 'stopped',
          };
        },
      );

      await this.auditService.success('SERVICE_LIST_READ');

      return services;
    } catch (error) {
      await this.auditService.error('SERVICE_LIST_READ', null, error);

      throw error;
    }
  }

  private getContainer(service: string): string {
    const container = this.allowedContainers[service];

    if (!container) {
      throw new BadRequestException('Service not allowed');
    }

    return container;
  }

  private parseAllowedContainers(): Record<string, string> {
    const raw = process.env.DOCKER_ALLOWED_CONTAINERS;

    if (!raw) {
      throw new Error('DOCKER_ALLOWED_CONTAINERS not defined in .env');
    }

    return raw.split(',').reduce(
      (acc, pair) => {
        const [alias, container] = pair.split(':');

        if (alias && container) {
          acc[alias.trim()] = container.trim();
        }

        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
