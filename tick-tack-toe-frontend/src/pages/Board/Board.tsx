import React, {useState} from "react";

import Square from "../Square/Square"
import {useParams} from "react-router-dom";

const Board = () => {
    let { id } = useParams();
    const [isMyTurn, setIsMyTurn] = useState(true);
    const [state, setState] = useState(Array(9).fill(null));

    const isVictory = (cells: (string | null)[]) : boolean => {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
                ].findIndex (comb => 
                    cells[comb[0]] == cells[comb[1]] &&
                    cells[comb[1]] == cells[comb[2]] &&
                    cells[comb[0]] != null) != -1
    }

    const onClick = (idx: number) => {
        if (isMyTurn) {
            state[idx] = "X";
            setIsMyTurn(false);

            setState(state);

            if (isVictory(state)) {
                alert("Victory");
                setState(Array(9).fill(null));
                return;
            }

            if (state.findIndex(s => s == null) == -1) {
                alert("Draw");
                setState(Array(9).fill(null));
            }
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-[#1A2238] flex-col gap-6">
        <h1 className="text-6xl font-extrabold text-white tracking-widest">
            Game {id}
        </h1>
        <h1 className="text-6xl font-extrabold text-white tracking-widest">
            {isMyTurn ? "Your turn" : "Opponents turn"}
        </h1>
        <div className="grid w-[30rem] grid-cols-3 gap-4 content-center  place-items-center">
            <Square value={state[0]} onClick={() => onClick(0)}/>
            <Square value={state[1]} onClick={() => onClick(1)}/>
            <Square value={state[2]} onClick={() => onClick(2)}/>
            <Square value={state[3]} onClick={() => onClick(3)}/>
            <Square value={state[4]} onClick={() => onClick(4)}/>
            <Square value={state[5]} onClick={() => onClick(5)}/>
            <Square value={state[6]} onClick={() => onClick(6)}/>
            <Square value={state[7]} onClick={() => onClick(7)}/>
            <Square value={state[8]} onClick={() => onClick(8)}/>
        </div>
        </div>
    )
}

export default Board;