import React, { useState } from "react";

import { gameId } from "../UserAtom";
import { socketIO } from "../Socket";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../UserAtom";
import { userId } from './../UserAtom';
import { v4 as uuidv4 } from "uuid";

export default function Home() {
    const [userID, setUserId ] = React.useState("");

    const [gameID, setGame] = useAtom(gameId);
    const navigate = useNavigate();
    const handleJoin = () => {
      
      if(gameID?.length === 0){
        return;
      }
      socketIO.emit("joinGame", {uuid: gameID, userId: userID});

      var route = `/game`;
      navigate(route);
    };

    React.useEffect(() => {
        fetchID();
    }, []);

    const handleHost = () => {
        const uuid = uuidv4(); // Generate a UUID
        setGame(uuid);
        socketIO.emit("joinGame", {uuid: gameID, userId: userID});
        navigate("/game");
    };


    const fetchID = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')?.replace(/"/g, ''),
              }
            });
            if (!response.ok) {
              throw new Error('Failed to Fetch');
            }
            const data = await response.json();
            // console.log('data:', data);
            setUserId(data.userId);
        }
        catch (error) {
            // console.error('Failed to fetch:', error);
        }
    }

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
                    value={gameID!}
                    onChange={(e) => setGame(e.target.value)}
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
