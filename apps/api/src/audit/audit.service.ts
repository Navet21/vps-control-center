import { Injectable } from '@nestjs/common';

type AuditEntry = {
  action: string;
  service: string;
  success: boolean;
  timestamp: string;
};

@Injectable()
export class AuditService {
  private logs: AuditEntry[] = [];

  log(action: string, service: string, success: boolean) {
    const entry: AuditEntry = {
      action,
      service,
      success,
      timestamp: new Date().toISOString(),
    };

    this.logs.unshift(entry);

    console.log('[AUDIT]', entry);
  }

  getLogs() {
    return this.logs.slice(0, 50);
  }
}
