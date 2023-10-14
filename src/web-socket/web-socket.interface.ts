import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class WebSocketStream
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected!`);
  }

  //Send messages from server on streamId socket
  sendStreamData(streamId: string, data: any) {
    this.server.emit(streamId, data);
  }
}
