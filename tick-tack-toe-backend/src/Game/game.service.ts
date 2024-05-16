import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {

    private readonly players: (string | null)[] = Array(2).fill(null);

    private readonly userIds: (string | null)[] = Array(2).fill(null);;

    private readonly gameField: (string | null)[] = Array(9).fill(null);

    public join(player: string, userId: string): boolean {

        const freePlayerIdx = this.players.findIndex(p => p == null);

        if (freePlayerIdx == -1 || this.players.findIndex(p => p == player) != -1) {
            return false;
        }

        this.players[freePlayerIdx] = player;
        this.userIds[freePlayerIdx] = userId;

        return true;
    }

    public getPlayers(): (string | null)[] {
        return this.players;
    }

    public canStart(player: string): {start: boolean, other?: string, myFirstTurn?: boolean} {
        if (this.players.indexOf(player) == -1) {
            return {start: false};
        }

        const freePlayerIdx = this.players.findIndex(p => p == null);

        if (freePlayerIdx != -1) {
            return {start: false};
        }
        return {start: true, other: this.players.filter(p => p != player)[0], myFirstTurn: false};
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

    public IsVictory (): {victory: boolean, loser?: string}  {
        if (this.players.findIndex(p => p == null) != -1) {
            return {victory: false};
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
            return {victory: false};
        }

        const winner = this.gameField[combs[winnerComb][0]];

        return {victory: true, loser: this.players.find(p => p != winner)}
    }

    public IsDraw(player: string): {draw: boolean, other?: string} {
        if (this.players.indexOf(player) == -1) {
            return {draw: false};
        }

        if (this.players.findIndex(p => p == null) != -1) {
            return {draw: false};
        }

        return {
            draw: this.gameField.findIndex(s => s == null) == -1,
            other: this.players.filter(p => p != player)[0]
        }
    }

    public GetUserId(player: string): string {
        const playerIdx = this.players.indexOf(player);

        if (playerIdx == -1) {
            throw new Error();
        }

        return this.userIds[playerIdx];
    }
}