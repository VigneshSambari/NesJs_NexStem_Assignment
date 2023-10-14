import { Module } from '@nestjs/common';
import { StreamsModule } from './streams/streams.module';
import { WebSocketModule } from './web-socket/web-socket.module';

@Module({
  imports: [StreamsModule, WebSocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
