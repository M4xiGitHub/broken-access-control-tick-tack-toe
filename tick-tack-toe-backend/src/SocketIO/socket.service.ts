import { GameService } from 'src/Game/game.service';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();

  private readonly games: Map<any, GameService> = new Map();

  constructor() {}

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
        const gamesToDelete = [];

        this.games.forEach((value: GameService, key: any) => {
          const players = value.getPlayers();

          if (players.indexOf(socket.id) != -1) {
            gamesToDelete.push(key);

            players.forEach(player => {
              if (player != null && player != socket.id){
                socket.to(player).emit("opponentDisconnected");
              }
            });
          }
        });

        gamesToDelete.forEach(gameKey => {
          this.games.delete(gameKey);
        });

        console.log("socket " + socket.id + " disconnected");
        this.connectedClients.delete(clientId);
    });

    socket.on("joinGame", (data: any) => {
      let game: GameService;

      if (this.games.has(data)) {
        game = this.games[data];
      } else {
        game = new GameService();
        this.games[data] = game;
      }
      
      if (!game.join(socket.id)) {
        socket.to(socket.id).emit("gameAllreadyFull");
        return;
      }
      console.log("socket " + socket.id + " game " + data);

      const canStart = game.canStart();

      if (canStart.start) {
        canStart.receiver.forEach((reciver, idx) => {
          socket.to(reciver).emit("startGame", idx == 0);
        })
      }
    })

    socket.on("playTurn", (data: {game: any, turn: number}) => {

      if (!this.games.has(data.game)) {
        socket.to(socket.id).emit("gameNotFound");
      }

      // for intelisens
      const game: GameService = this.games[data.game];

      const turn = game.play(socket.id, data.turn);

      if (!turn.allowed) {
        socket.to(socket.id).emit("turnNotAllowed", turn.idx);
        return;
      }

      socket.to(turn.receiver).emit("opponentPlayedTurn", turn.idx);

      const draw = game.IsDraw();

      if (draw.draw){
        draw.receiver.forEach((reciver) => {
          socket.to(reciver).emit("gameDraw");
        });
        this.games.delete(data.game);
        return;
      }

      const victory = game.IsVictory();

      if (victory.victory) {
        socket.to(victory.winner).emit("gameWon");
        socket.to(victory.loser).emit("gameLost");
        this.games.delete(data.game);
        return;
      }
    })
    // Handle other events and messages from the client
  }

  // Add more methods for handling events, messages, etc.
}