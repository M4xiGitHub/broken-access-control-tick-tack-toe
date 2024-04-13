import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {

    private readonly players: (string | null)[] = Array(2).fill(null);

    private readonly gameField: (string | null)[] = Array(9).fill(null);

    public join(player: string): boolean {

        const freePlayerIdx = this.players.findIndex(p => p == null);

        if (freePlayerIdx == -1 || this.players.findIndex(p => p == player) != -1) {
            return false;
        }

        this.players[freePlayerIdx] = player;

        return true;
    }

    public getPlayers(): (string | null)[] {
        return this.players;
    }

    public canStart(): {start: boolean, receiver: string[]} {
        const freePlayerIdx = this.players.findIndex(p => p == null);

        if (freePlayerIdx != -1) {
            return {start: false, receiver: []};
        }

        return {start: true, receiver: this.players};
    }

    public play(player: string, idx: number): {allowed: boolean, idx: number, receiver: string |null} {
        const playerIdx = this.players.findIndex(p => p == player);

        if (playerIdx == -1) {
            return {allowed: false, idx: idx, receiver: player};
        }

        if (this.gameField[idx] != null) {
            return {allowed: false, idx: idx, receiver: player};
        }

        this.gameField[idx] = player;

        return {allowed: true, idx: idx, receiver: this.players.find(p => p != player)};
    }

    public IsVictory (): {victory: boolean, winner: string| null, loser: string | null}  {
        if (this.players.findIndex(p => p == null) != -1) {
            return {victory: false, winner: null, loser: null};
        }

        const combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        const winnerComb = combs.findIndex (comb => 
            this.gameField[comb[0]] == this.gameField[comb[1]] &&
            this.gameField[comb[1]] == this.gameField[comb[2]] &&
            this.gameField[comb[0]] != null);

        if (winnerComb == -1){
            return {victory: false, winner: null, loser: null};
        }

        const winner = this.gameField[combs[winnerComb][0]];

        return {victory: true, winner: winner, loser: this.players.find(p => p != winner)}
    }

    public IsDraw(): {draw: boolean, receiver: string[]} {
        if (this.players.findIndex(p => p == null) != -1) {
            return {draw: false, receiver: []};
        }

        return {
            draw: this.gameField.findIndex(s => s == null) == -1,
            receiver: this.players
        }
    }
}