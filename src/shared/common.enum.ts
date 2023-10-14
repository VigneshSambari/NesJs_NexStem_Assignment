/* eslint-disable prettier/prettier */
export enum StreamTypes {
  CPU = 'CPU',
  MEMORY = 'Memory',
  DEFAULT = 'default',
}

export class CpuUsageData {
  private data: { [key: string]: string };

  constructor(data: { [key: string]: string }) {
    this.data = data;
  }

  getData(): { [key: string]: string } {
    return this.data;
  }
}

export class CpuUsageInterpreter {
  private cpuUsageMap: Map<string, string>;

  constructor() {
    this.cpuUsageMap = new Map<string, string>();
    this.cpuUsageMap.set('r', 'Processes in the run queue');
    this.cpuUsageMap.set('b', 'Processes in uninterruptible sleep');
    this.cpuUsageMap.set('swpd', 'Swap used');
    this.cpuUsageMap.set('free', 'Free memory (in KB)');
    this.cpuUsageMap.set('buff', 'Memory used as buffers (in KB)');
    this.cpuUsageMap.set('cache', 'Memory used as cache (in KB)');
    this.cpuUsageMap.set('si', 'Swap in from disk (KB/s)');
    this.cpuUsageMap.set('so', 'Swap out to disk (KB/s)');
    this.cpuUsageMap.set('bi', 'Blocks received from a block device (KB/s)');
    this.cpuUsageMap.set('bo', 'Blocks sent to a block device (KB/s)');
    this.cpuUsageMap.set('in', 'Interrupts per second');
    this.cpuUsageMap.set('cs', 'Context switches per second');
    this.cpuUsageMap.set('us', 'User CPU time (%)');
    this.cpuUsageMap.set('sy', 'System CPU time (%)');
    this.cpuUsageMap.set('id', 'Idle time (%)');
    this.cpuUsageMap.set('wa', 'Time waiting for I/O (%)');
    this.cpuUsageMap.set('st', 'Stolen time (virtual machine time)');
  }

  interpretCpuUsage(data: CpuUsageData): { [key: string]: string } {
    const parsedCpuUsage = data.getData();
    const interpretedCpuUsage: { [key: string]: string } = {};
    for (const key in parsedCpuUsage) {
      const description = this.cpuUsageMap.get(key);
      if (description) {
        interpretedCpuUsage[description] = parsedCpuUsage[key];
      }
    }
    return interpretedCpuUsage;
  }
}