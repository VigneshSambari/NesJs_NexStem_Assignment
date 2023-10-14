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
import { ResponseStructure, SystemInfoUtil } from 'src/shared';

@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

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

  @HttpCode(HttpStatus.OK)
  @Get('start/:id')
  startStream(@Param('id') streamId: string): ResponseStructure {
    return this.streamsService.startStream(streamId);
  }

  @HttpCode(HttpStatus.OK)
  @Get('stop/:id')
  stopStream(@Param('id') streamId: string): ResponseStructure {
    return this.streamsService.stopStream(streamId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  destroyStream(@Param('id') streamId: string): ResponseStructure {
    return this.streamsService.destroyStream(streamId);
  }
}
