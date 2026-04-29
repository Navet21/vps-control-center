import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type AuditStatus = 'SUCCESS' | 'ERROR';

type CreateAuditLogParams = {
  action: string;
  service?: string | null;
  status: AuditStatus;
  message?: string | null;
  ip?: string | null;
  userAgent?: string | null;
};

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(params: CreateAuditLogParams) {
    const entry = await this.prisma.auditLog.create({
      data: {
        action: params.action,
        service: params.service ?? null,
        status: params.status,
        message: params.message ?? null,
        ip: params.ip ?? null,
        userAgent: params.userAgent ?? null,
      },
    });

    console.log('[AUDIT]', entry);

    return entry;
  }

  async success(action: string, service?: string | null, message?: string) {
    return this.log({
      action,
      service,
      status: 'SUCCESS',
      message,
    });
  }

  async error(action: string, service?: string | null, error?: unknown) {
    return this.log({
      action,
      service,
      status: 'ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  async getLogs() {
    return this.prisma.auditLog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });
  }
}
