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

  // Handle User connection to WebSocket
  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);
  }

  // Handle User disconnect from WebSocket
  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected!`);
  }

  //Send messages from server on streamId socket
  sendStreamData(streamId: string, data: any) {
    // Sends messages to user using StreamId which is unique
    this.server.emit(streamId, data);
  }
}
