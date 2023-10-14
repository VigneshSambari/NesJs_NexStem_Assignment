/* eslint-disable prettier/prettier */
import { exec } from 'child_process';
import { MemoryUsage } from './common.interfaces';
import { CpuUsageData, CpuUsageInterpreter } from './common.enum';

export class SystemInfoUtil {
  // Fetch CPU information depending on platform -- windows or linux
  static async getCPUUsage(): Promise<any> {
    const isWindows = process.platform === 'win32';
  
    const cpuUsageCommand = isWindows
      ? 'wmic cpu get loadpercentage'
      : 'vmstat 1 1';

    try {
      const cpuUsage = await this.executeCommand(cpuUsageCommand);

      return isWindows
        ? `${cpuUsage.split('\r\r\n')[1]}%`
        : this.parseCpuUsageLinux(cpuUsage);
    } catch (error) {
      console.error('Error fetching CPU usage:', error);
      return 'N/A';
    }
  }

  // Fetch memory information depending on platform -- windows or linux
  static async getMemoryUsage(): Promise<any> {
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
        return this.parseMemoryUsageLinux(memoryData);
      }
    } catch (error) {
      console.error('Error fetching memory usage:', error);
      return 'N/A';
    }
  }

  // Execute linux/windows commands
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
  
  
  // Input Format -> 
  // "procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\nr  *contd.
  // b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n1  0    *contd.
  // 0 102097504 1635940 25885208    0    4     1    14    0    1 12  3 85  0  0"
  private static parseCpuUsageLinux(input: string): any | null {
    // Split the input string by whitespace and remove any empty elements
    const lines = input.trim().split('\n');

    const header = lines[1].split(/\s+/).filter(Boolean);
    const data = lines[2].split(/\s+/).filter(Boolean);

    const cpuUsage: any = {};

    for (let i = 0; i < header.length; i++) {
      cpuUsage[header[i]] = data[i];
    }

    const cpuUsageData = new CpuUsageData(cpuUsage);
    const interpreter = new CpuUsageInterpreter();
    const interpretedCpuUsage = interpreter.interpretCpuUsage(cpuUsageData);

    return interpretedCpuUsage;
  }


  // Input Format -> 
  // `
  // total        used        free      shared  buff/cache   available
  // Mem:          128717        2134       99703           3       26878      125386
  // Swap:           4095           0        4095
  // `
  private static parseMemoryUsageLinux(input: string): MemoryUsage | null {
    const lines = input.trim().split('\n');

    if (lines.length < 2) {
      return null; // Invalid format
    }

    const memLine = lines[1].split(/\s+/).filter(Boolean);

    if (memLine.length < 6) {
      return null; // Invalid format
    }

    return {
      total: memLine[1] + ' MB',
      used: memLine[2] + ' MB',
      free: memLine[3] + ' MB',
      shared: memLine[4] + ' MB',
      buffCache: memLine[5] + ' MB',
      available: memLine[6] + ' MB',
    };
  }
  

}
