import React, { useState } from "react";

import { socketIO } from "../Socket";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../UserAtom";
import { userId } from "../UserAtom";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [userID, ] = useAtom(userId);
    const [user, setUser] = useAtom(userAtom);
    const [gameId, setGameId] = useState("");
    const navigate = useNavigate();
    const handleJoin = () => {
      
      if(gameId.length === 0){
        return;
      }
      socketIO.emit("joinGame", {uuid: gameId, userId: userID});

      var route = `/game/${gameId}`;
      navigate(route);
    };

    const handleHost = () => {
        const uuid = uuidv4(); // Generate a UUID

        socketIO.emit("joinGame", {uuid: uuid, userId: userID});
        console.log("asdfasdf");

        var route = `/game/${uuid}`;
        navigate(route);
    };

    return (
        <div className="bg-[#1A2238] w-full h-full flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-4 ">
                <h1 className="text-6xl font-extrabold text-white tracking-widest">
                    Welcome to TikTakToe
                </h1>
                <h2 className="text-3xl font-semibold text-white tracking-widest">
                    Host a game
                </h2>
                <button
                    onClick={handleHost}
                    className="w-40 h-12 bg-blue-700 text-white font-semibold rounded-lg"
                >
                    Host
                </button>
                <h2 className="mt-8 text-3xl font-semibold text-white tracking-widest">
                    Or join a game
                </h2>
                <input
                    placeholder="Lobby Key"
                    className="p-2 w-72 h-8 rounded"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                ></input>
                <button
                    onClick={handleJoin}
                    className="w-40 h-12 bg-blue-700 text-white font-semibold rounded-lg"
                >
                    Join
                </button>
            </div>
        </div>
    );
}
