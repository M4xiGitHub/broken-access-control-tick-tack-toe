import {Navigate, redirect, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

import Square from "../Square/Square"
import { gameId } from "../../UserAtom";
import { socketIO } from "../../Socket";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const Board = () => {
    const navigate = useNavigate();
    const [gameID, setGame] = useAtom(gameId);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [state, setState] = useState(Array(9).fill(null));

    const playTurn = (idx: number, other: boolean) => {
        if (other) {
            state[idx] = "O";
            setIsMyTurn(true);
        } else {
            state[idx] = "X";
            setIsMyTurn(false);
        }

        setState(state);
    }

    const onClick = (idx: number) => {
        if (isMyTurn && socketIO != null) {
            socketIO.emit("playTurn", {game: gameID, turn: idx});            
            playTurn(idx, false);  
        }
    }

    const opponentPlayedTurn = (msg: number) => {
        playTurn(msg, true);
    }

    const startGame = (msg: boolean) => {
        setIsMyTurn(msg);
    }

    const opponentDisconnected = () => {
        alert("opponentDisconnected");
        setGame(null);
        navigate("/home");
    }

    const gameAllreadyFull = () => {
        alert("game Allready full");
        setGame(null);
        navigate("/home");
    }

    const gameNotFound = () => {
        alert("game not found");
        setGame(null);
        navigate("/home");
    }

    const turnNotAllowed = (msg: number) => {
        playTurn(msg, true);
        alert("No allowed move");
    }

    const gameDraw = () => {
        setGame(null);
        navigate("/draw");
    }

    const gameWon = () => {
        setGame(null);
        navigate("/win");
    }

    const gameLost = () => {
        setGame(null);
        navigate("/loose");
    }

    useEffect(() => {
        if (!gameID) {
            setGame(null);
            navigate("/easter-egg");
        }

        socketIO.on("opponentPlayedTurn", opponentPlayedTurn);
        socketIO.on("startGame", startGame);
        socketIO.on("opponentDisconnected", opponentDisconnected);
        socketIO.on("gameAllreadyFull", gameAllreadyFull);
        socketIO.on("gameNotFound", gameNotFound);
        socketIO.on("turnNotAllowed", turnNotAllowed);
        socketIO.on("gameDraw", gameDraw);
        socketIO.on("gameWon", gameWon);
        socketIO.on("gameLost", gameLost);

        return () => {
            socketIO.off('opponentPlayedTurn', opponentPlayedTurn);
            socketIO.off('startGame', startGame);
            socketIO.off('opponentDisconnected', opponentDisconnected);
            socketIO.off("gameAllreadyFull", gameAllreadyFull);
            socketIO.off("gameNotFound", gameNotFound);
            socketIO.off("turnNotAllowed", turnNotAllowed);
            socketIO.off("gameDraw", gameDraw);
            socketIO.off("gameWon", gameWon);
            socketIO.off("gameLost", gameLost);
          };
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center bg-[#1A2238] flex-col gap-6">
        <h1 className="text-6xl font-extrabold text-white tracking-widest flex gap-2 items-baseline">
            Game: <p className="text-blue-700 text-3xl">{gameID}</p>
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