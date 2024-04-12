import { ISquareProps } from "./SquareModel";
import React from "react";

const Square = (props: ISquareProps) => {
    return (
        <div
            onClick={props.onClick}
            className="square flex justify-center items-center w-36 h-36 bg-blue-700 text-white rounded-xl cursor-pointer hover:bg-blue-800 transition duration-300 ease-in-out font-bold text-4xl"
        >
            <h4>{props.value}</h4>
        </div>
    );
};

export default Square;
