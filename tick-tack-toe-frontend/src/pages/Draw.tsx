import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Draw() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/home");
    }, 5000);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4">
            <h1 className="text-6xl">Its a draw!</h1>
            <p className="text-9xl">😮</p>
        </div>
    );
}
