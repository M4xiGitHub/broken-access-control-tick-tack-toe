import { BadRequestException, Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from "uuid";

// This should be a real class/interface representing a user entity
export type User = {
  userId: string,
  username: string,
  password: string,
  gamesPlayed: number,
  gamesDisconnected: number,
  gamesOtherDisconnected: number,
  gamesWon: number,
  gamesDraw: number,
  gamesLost: number
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: uuidv4(),
      username: 'test1',
      password: 'changeme',
      gamesPlayed: 100,
      gamesDisconnected: 3,
      gamesOtherDisconnected: 60,
      gamesWon: 7,
      gamesDraw: 25,
      gamesLost: 5
    },
    {
      userId: uuidv4(),
      username: 'test2',
      password: 'guess',
      gamesPlayed: 100,
      gamesDisconnected: 60,
      gamesOtherDisconnected: 3,
      gamesWon: 5,
      gamesDraw: 25,
      gamesLost: 7
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOnePerId(userId: string){
    const user = this.users.find(user => user.userId == userId);

    if (!user) {
      throw new BadRequestException();
    }

    const { password, ...result } = user;
    return result;
  }

  addOne(username: string, password: string) : void {
    this.users.push({
      userId: uuidv4(),
      username: username,
      password: password,
      gamesPlayed: 0,
      gamesDisconnected: 0,
      gamesOtherDisconnected: 0,
      gamesWon: 0,
      gamesDraw: 0,
      gamesLost: 0
    })
  }


  addWinToUser(userId: string) : void {
    const userIdx = this.users.findIndex(user => user.userId == userId);

    if (userIdx == -1) {
      return;
    }

    this.users[userIdx].gamesWon++;
    this.users[userIdx].gamesPlayed++;
  }

  addLoseToUser(userId: string) : void {
    const userIdx = this.users.findIndex(user => user.userId == userId);

    if (userIdx == -1) {
      return;
    }

    this.users[userIdx].gamesLost++;
    this.users[userIdx].gamesPlayed++;
  }

  addDrawToUser(userId: string) : void {
    const userIdx = this.users.findIndex(user => user.userId == userId);

    if (userIdx == -1) {
      return;
    }

    this.users[userIdx].gamesDraw++;
    this.users[userIdx].gamesPlayed++;
  }

  addDisconenctToUser(userId: string) : void {
    const userIdx = this.users.findIndex(user => user.userId == userId);

    if (userIdx == -1) {
      return;
    }

    this.users[userIdx].gamesDisconnected++;
    this.users[userIdx].gamesPlayed++;
  }

  addOtherDisconnected(userId: string) : void {
    const userIdx = this.users.findIndex(user => user.userId == userId);

    if (userIdx == -1) {
      return;
    }

    this.users[userIdx].gamesOtherDisconnected++;
    this.users[userIdx].gamesPlayed++;
  }
}
