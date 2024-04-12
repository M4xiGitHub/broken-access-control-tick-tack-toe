import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'test1',
      password: 'changeme',
      gamesPlayed: 0,
      gamesWon: 0
    },
    {
      userId: 2,
      username: 'test2',
      password: 'guess',
      gamesPlayed: 0,
      gamesWon: 0
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOnePerId(userId: number){
    const user = this.users.find(user => user.userId == userId);

    const { password, ...result } = user;
    return result;
  }

  addOne(username: string, password: string) : void {
    let numbers = this.users.map(user => user.userId);
    let lastNumber = Math.max(...numbers);

    this.users.push({
      userId: lastNumber+1,
      username: username,
      password: password,
      gamesPlayed: 0,
      gamesWon: 0
    })
  }
}
