import { Server, Socket } from "socket.io";

import { GameService } from 'src/Game/game.service';
import { Injectable } from '@nestjs/common';
import { UsersService } from "src/users/users.service";
import { WebSocketServer } from '@nestjs/websockets';

@Injectable()
export class SocketService {
  private readonly games: Map<any, GameService> = new Map();

  constructor(private readonly userService: UsersService) {}

  handleConnection(socket: Socket): void {
    console.log("socket " + socket.id + " connected");
  }

  handeleDisconenct(socket: Socket): void {
    const gamesToDelete = [];

    this.games.forEach((value: GameService, key: any) => {
      const players = value.getPlayers();

      if (players.indexOf(socket.id) != -1) {
        gamesToDelete.push(key);
        this.userService.addDisconenctToUser(value.GetUserId(socket.id));

        players.forEach(player => {
          if (player != null && player != socket.id){
            socket.to(player).emit("opponentDisconnected");
            this.userService.addOtherDisconnected(value.GetUserId(player));
          }
        });
      }
    });

    gamesToDelete.forEach(gameKey => {
      this.games.delete(gameKey);
    });

    console.log("socket " + socket.id + " disconnected");
  }

  handleJoinGame(socket: Socket, data: {uuid: any, userId: number}): {message: string, data?: boolean} {
    let game: GameService;

    if (this.games.has(data.uuid)) {
      console.log("existing game");
      game = this.games.get(data.uuid);
    } else {
      console.log("new game");
      game = new GameService();
      this.games.set(data.uuid, game);
    }
    
    if (!game.join(socket.id, data.userId)) {
      console.log("socket " + socket.id + " gameAllreadyFull");
      return {message: "gameAllreadyFull"};
    }
    console.log("socket " + socket.id + " game " + data.uuid);

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

      this.userService.addDrawToUser(game.GetUserId(draw.other));
      this.userService.addDrawToUser(game.GetUserId(socket.id));

      this.games.delete(data.game);
      return {message: "gameDraw"};
    }

    const victory = game.IsVictory();

    if (victory.victory) {
      socket.to(victory.loser).emit("gameLost");

      this.userService.addLoseToUser(game.GetUserId(victory.loser));
      this.userService.addWinToUser(game.GetUserId(socket.id));

      this.games.delete(data.game);
      return {message: "gameWon"};
    }
  }
}