import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { execFile } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';

const execFileAsync = promisify(execFile);

@Injectable()
export class SystemService {
  async getStatus() {
    const [uptime, memory, disk] = await Promise.all([
      this.getUptime(),
      this.getMemory(),
      this.getDisk(),
    ]);

    return {
      status: 'ok',
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      cpuCores: os.cpus().length,
      uptime,
      memory,
      disk,
      timestamp: new Date().toISOString(),
    };
  }

  getUptime() {
    const totalSeconds = os.uptime();

    return {
      seconds: Math.floor(totalSeconds),
      human: this.formatUptime(totalSeconds),
    };
  }

  getMemory() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    return {
      totalBytes: total,
      usedBytes: used,
      freeBytes: free,
      usedPercent: Number(((used / total) * 100).toFixed(2)),
      total: this.formatBytes(total),
      used: this.formatBytes(used),
      free: this.formatBytes(free),
    };
  }

  async getDisk() {
    try {
      const { stdout } = await execFileAsync('df', ['-h', '/']);

      const lines = stdout.trim().split('\n');
      const data = lines[1].split(/\s+/);

      return {
        filesystem: data[0],
        size: data[1],
        used: data[2],
        available: data[3],
        usedPercent: data[4],
        mountedOn: data[5],
      };
    } catch {
      throw new InternalServerErrorException('Could not read disk usage');
    }
  }

  private formatBytes(bytes: number) {
    const gb = bytes / 1024 / 1024 / 1024;
    return `${gb.toFixed(2)} GB`;
  }

  private formatUptime(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  }
}
