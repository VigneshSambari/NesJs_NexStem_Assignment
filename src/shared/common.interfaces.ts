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
  usage: string;
}