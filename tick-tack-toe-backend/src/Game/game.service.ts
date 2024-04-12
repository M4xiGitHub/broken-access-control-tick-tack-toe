import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService {

    private player1 : any;
    private player2 : any;

    private gameField = Array(9).fill(null);

    public join(): boolean {
        return true;
    }


}