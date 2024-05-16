import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway({
  cors: true,
})
export class SocketGateway implements OnGatewayConnection {
  constructor(private readonly socketService: SocketService) {}

  handleConnection(client: Socket): void {
    this.socketService.handleConnection(client);
  }

  handleDisconnect(client: any) {
    this.socketService.handeleDisconenct(client);
  }

  @SubscribeMessage("joinGame")
  handleJoinGameMessage(client: any, data: {uuid: any, userId: number}) {
    const message = this.socketService.handleJoinGame(client, data);

    if (!message) {
      return;
    }

    return {
      event: message.message,
      data: message.data,
    };
  }

  @SubscribeMessage("playTurn")
  handlePlayTurnMessage(client: any, data: {game: any, turn: number}) {
    const message = this.socketService.handlePlayTurn(client, data);

    if (!message) {
      return;
    }

    return {
      event: message.message,
      data: message.data,
    };
  }
  // Implement other Socket.IO event handlers and message handlers
}