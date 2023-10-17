import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { StreamTypes } from '../shared/common.enum';
import { SocketStructure, StreamData, SystemInfoUtil } from 'src/shared';
import { WebSocketStream } from '../web-socket/web-socket.gateway';
import { ResponseStructure } from 'src/shared';

@Injectable()
export class StreamsService {
  private streams: Map<string, StreamData> = new Map(); // Map containging all created streams
  private intervals: Map<string, NodeJS.Timeout> = new Map(); // To keep track of live streams, if they are live or not

  constructor(private WebSocket: WebSocketStream) {}

  // Create stream with StreamTypoe and send response
  createStream(type: StreamTypes): ResponseStructure {
    const streamId = this.generateStreamId();
    const stream: StreamData = {
      id: streamId,
      type,
      live: false,
    };

    this.streams.set(streamId, stream);

    const response: ResponseStructure = {
      status: HttpStatus.CREATED,
      message: 'Stream Created!',
      data: stream,
    };

    return response;
  }

  // Start stream and initiate interval for of 100 milliseconds
  //to fetch and send system information
  startStream(streamId: string): ResponseStructure {
    const stream = this.streams.get(streamId);
    if (stream) {
      if (!this.intervals.has(streamId)) {
        // Start sending data to WebSocket at a rate of 10 events per second
        const interval = setInterval(async () => {
          const data = await this.collectStreamData(stream.type);
          this.WebSocket.sendStreamData(streamId, data);
        }, 100); // 100 milliseconds (10 times per second)
        this.intervals.set(streamId, interval); // save interval information into map
        stream.live = true;
      } else {
        throw new ForbiddenException('Stream already running!');
      }
    } else {
      throw new ForbiddenException('Invalid Stream ID!');
    }

    const response: ResponseStructure = {
      status: HttpStatus.CREATED,
      message: 'Stream Started!',
      data: stream,
    };

    return response;
  }

  // stop the stream with received streamId
  stopStream(streamId: string): ResponseStructure {
    const stream = this.streams.get(streamId);
    if (this.intervals.has(streamId)) {
      clearInterval(this.intervals.get(streamId)); // clear interval from map
      this.intervals.delete(streamId);
      stream.live = false;
    }

    const response: ResponseStructure = {
      status: HttpStatus.CREATED,
      message: 'Stream Stopped!',
      data: stream,
    };
    return response;
  }

  // Destroy stream, stop it if it is not stopped yet
  destroyStream(streamId: string): ResponseStructure {
    const stream = this.streams.get(streamId);

    this.stopStream(streamId); // ensure stream is stopped

    if (stream) {
      stream.live = false;
      this.streams.delete(streamId);
    } else {
      throw new ForbiddenException('Stream already destroyed!');
    }

    const response: ResponseStructure = {
      status: HttpStatus.CREATED,
      message: 'Stream Destroyed!',
      data: stream,
    };
    return response;
  }

  private generateStreamId(): string {
    // This is uniqueId generated from timestamp and random value
    return Date.now() + '-' + Math.random().toString(36);
  }

  // Logic to send cpu or memory info
  private async collectStreamData(
    streamType: StreamTypes,
  ): Promise<SocketStructure> {
    if (streamType === StreamTypes.CPU) {
      const data = await SystemInfoUtil.getCPUUsage();
      return {
        type: 'CPU',
        usage: data,
      };
    } else if (streamType === StreamTypes.MEMORY) {
      const data = await SystemInfoUtil.getMemoryUsage();
      return {
        type: 'MEMORY',
        usage: data,
      };
    }
  }
}
