import { Server, Socket } from "socket.io";

import { GameService } from 'src/Game/game.service';
import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class SocketService {
  private readonly games: Map<any, GameService> = new Map();

  constructor() {}

  handleConnection(socket: Socket): void {

  }

  handeleDisconenct(socket: Socket): void {
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
  }

  handleJoinGame(socket: Socket, data: any): {message: string, data?: boolean} {
    let game: GameService;

    if (this.games.has(data)) {
      console.log("existing game");
      game = this.games.get(data);
    } else {
      console.log("new game");
      game = new GameService();
      this.games.set(data, game);
    }
    
    if (!game.join(socket.id)) {
      console.log("socket " + socket.id + " gameAllreadyFull");
      return {message: "gameAllreadyFull"};
    }
    console.log("socket " + socket.id + " game " + data);

    const canStart = game.canStart(socket.id);

    if (canStart.start) {
      
      socket.to(canStart.other).emit("startGame", !canStart.myFirstTurn);

      return {message: "startGame", data: canStart.myFirstTurn};
    }
  }

  handlePlayTurn(socket: Socket, data: {game: any, turn: number}): {message: string, data?: any} {
    if (!this.games.has(data.game)) {
      return {message: "gameNotFound"};
    }

    // for intelisens
    const game: GameService = this.games.get(data.game);

    const turn = game.play(socket.id, data.turn);

    if (!turn.allowed) {
      return {message: "turnNotAllowed", data: turn.idx};
    }

    socket.to(turn.receiver).emit("opponentPlayedTurn", turn.idx);

    const draw = game.IsDraw(socket.id);

    if (draw.draw){
      socket.to(draw.other).emit("gameDraw");
      this.games.delete(data.game);
      return {message: "gameDraw"};
    }

    const victory = game.IsVictory();

    if (victory.victory) {
      socket.to(victory.loser).emit("gameLost");
      this.games.delete(data.game);
      return {message: "gameWon"};
    }
  }
}