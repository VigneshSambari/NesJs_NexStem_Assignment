/* eslint-disable prettier/prettier */
import { StreamTypes } from 'src/shared/common.enum';

export interface StreamData {
  id: string;
  type: StreamTypes;
  live: boolean;
}

export interface ResponseStructure {
  status: number;
  message: string;
  data: any;
}

export interface SocketStructure {
  type: string;
  usage: any;
}

export interface CpuUsage {
  user: string;
  system: string;
  idle: string;
  wait: string;
  stolen: string;
}

export interface MemoryUsage {
  total: string;
  used: string;
  free: string;
  shared: string;
  buffCache: string;
  available: string;
}