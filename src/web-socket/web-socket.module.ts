import { Global, Module } from '@nestjs/common';
import { WebSocketStream } from './web-socket.gateway';

@Global()
@Module({
  providers: [WebSocketStream],
  exports: [WebSocketStream],
})
export class WebSocketModule {}
