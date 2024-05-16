import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Loose() {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/home");
    }, 5000);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-white gap-4">
            <h1 className="text-6xl">Sorry, you loose!</h1>
            <p className="text-9xl">😭</p>
        </div>
    );
}
