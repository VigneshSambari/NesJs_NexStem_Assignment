import {
  Controller,
  Delete,
  Param,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { StreamTypes } from '../shared/common.enum';
import { ResponseStructure } from 'src/shared';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @ApiOperation({
    summary: 'Creates a Stream',
    description:
      'It takes type as a path param type and return response which contains unique StreamId',
  })
  @ApiParam({ name: 'type', description: 'The type of stream (cpu, memory)' })
  @HttpCode(HttpStatus.CREATED)
  @Get('create/:type')
  async createStream(@Param('type') type: string): Promise<ResponseStructure> {
    let streamType: StreamTypes;
    if (type === 'cpu') streamType = StreamTypes.CPU;
    else if (type === 'memory') streamType = StreamTypes.MEMORY;
    else streamType = StreamTypes.DEFAULT;

    // console.log(await SystemInfoUtil.getCPUUsage())
    // console.log(await SystemInfoUtil.getMemoryUsage())
    return this.streamsService.createStream(streamType);
  }

  @ApiOperation({
    summary: 'Start a stream by ID',
    description: 'It starts the stream to which websocket client can connect',
  })
  @ApiParam({ name: 'id', description: 'The ID of the stream to start' })
  @HttpCode(HttpStatus.OK)
  @Get('start/:id')
  startStream(@Param('id') streamId: string): ResponseStructure {
    return this.streamsService.startStream(streamId);
  }

  @ApiOperation({
    summary: 'Stop a stream by ID',
    description:
      'Stops the stream with streamID of the stream, doesnot destroy it',
  })
  @ApiParam({ name: 'id', description: 'The ID of the stream to stop' })
  @HttpCode(HttpStatus.OK)
  @Get('stop/:id')
  stopStream(@Param('id') streamId: string): ResponseStructure {
    return this.streamsService.stopStream(streamId);
  }

  @ApiOperation({
    summary: 'Destroy a stream by ID',
    description:
      'Destroys the stream, ensures stream is stopped before destroying the stream',
  })
  @ApiParam({ name: 'id', description: 'The ID of the stream to destroy' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  destroyStream(@Param('id') streamId: string): ResponseStructure {
    return this.streamsService.destroyStream(streamId);
  }
}
