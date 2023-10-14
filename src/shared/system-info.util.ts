/* eslint-disable prettier/prettier */
import { exec } from 'child_process';

export class SystemInfoUtil {
  static async getCPUUsage(): Promise<string> {
    const isWindows = process.platform === 'win32';

    const cpuUsageCommand = isWindows
      ? 'wmic cpu get loadpercentage'
      : 'top -b -n 1 | grep "%Cpu(s):" | awk \'{print $2}\'';

    try {
      const cpuUsage = await this.executeCommand(cpuUsageCommand);

      return isWindows
        ? `${cpuUsage.split('\r\r\n')[1]}%`
        : `${parseFloat(cpuUsage).toFixed(2)}%`;
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
      return 'N/A';
    }
  }

  static async getMemoryUsage(): Promise<string> {
    const isWindows = process.platform === 'win32';

    const memoryUsageCommand = isWindows
      ? 'wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /value'
      : 'free -m';

    try {
      const memoryData = await this.executeCommand(memoryUsageCommand);
        
      if (isWindows) {
        const lines = memoryData.split('\n');
        const freeMemory = parseFloat(lines[0].split('=')[1]) / 1024; // Convert to MB
        const totalMemory = parseFloat(lines[1].split('=')[1]) / 1024; // Convert to MB
        const usedMemory = totalMemory - freeMemory;
        return `${usedMemory.toFixed(2)}MB / ${totalMemory.toFixed(2)}MB`;
      } else {
        const usedMemory = memoryData.split('\n')[1].split(/\s+/)[2];
        const totalMemory = memoryData.split('\n')[1].split(/\s+/)[1];
        return `${usedMemory}MB / ${totalMemory}MB`;
      }
    } catch (error) {
      console.error('Error fetching memory usage:', error);
      return 'N/A';
    }
  }

  private static executeCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout.trim());
        }
      });
    });
  }
}
