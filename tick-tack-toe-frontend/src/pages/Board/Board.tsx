import React, {useEffect, useState} from "react";
import { Socket, io } from 'socket.io-client';

import Square from "../Square/Square"
import {useParams} from "react-router-dom";

const Board = () => {
    let { id } = useParams();
    const [isMyTurn, setIsMyTurn] = useState(true);
    const [state, setState] = useState(Array(9).fill(null));
    const [socket, setSocket] = useState<Socket | null>(null)

    const playTurn = (idx: number, other: boolean) => {
        if (other) {
            state[idx] = "O";
            setIsMyTurn(true);
        } else {
            state[idx] = "X";
            setIsMyTurn(false);
        }

        console.log("set state");
        setState(state);

        // should be server sided
        // if (isVictory(state)) {
        //     alert("Victory");
        //     setState(Array(9).fill(null));
        //     return;
        // }

        // if (state.findIndex(s => s == null) == -1) {
        //     alert("Draw");
        //     setState(Array(9).fill(null));
        // }
    }

    const onClick = (idx: number) => {
        if (isMyTurn && socket != null) {
            socket.emit("play", idx);            
            playTurn(idx, false);         
        }
    }

    useEffect(() => {
        let localSocket = socket;

        if(localSocket === null)
        {
            localSocket = io("http://localhost:3001");
            setSocket(localSocket);
        }
        
        localSocket.emit("joinGame", id);    

        localSocket.on("play", (msg: any) => {
            console.log("got play with " + msg);
            let idx: number = msg.message;

            // if (state[idx] != null) {
            //     return;
            // }

            playTurn(idx, true);
        });
      
        return () => {
            if (socket != null) {
                socket.offAny();

                socket.disconnect();
            }            
        };
      }, [socket, state]);

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