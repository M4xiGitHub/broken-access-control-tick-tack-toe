import { GameService } from 'src/Game/game.service';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  constructor(private readonly gameService: GameService) {}

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
        console.log("socket " + socket.id + " disconnected");
        this.connectedClients.delete(clientId);
    });

    socket.on("joinGame", (data: any) => {
        
        console.log("socket " + socket.id + " joind room " + data);
        socket.join(data);
        
    })

    socket.on("play", (data: any) => {
        console.log(socket.id + " has rooms " + socket.rooms);

        socket.rooms.forEach(room => {
            socket.to(room).emit("play", data);
        });
    })
    // Handle other events and messages from the client
  }

  // Add more methods for handling events, messages, etc.
}