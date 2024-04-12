import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import Logo from "../images/logo.png";

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('authStatus');
        navigate('/');
    }
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 sticky top-0">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        to="/home"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img src={Logo} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            TickTackToe
                        </span>
                    </Link>
                    
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-multi-level"
                    >
                        <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    to="/home"
                                    className={
                                        "block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    }
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/game/1"
                                    className={
                                        "block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    }
                                >
                                    Game
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/stats/1"
                                    className={
                                        "block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    }
                                >
                                    Stats
                                </Link>
                            </li>
                            <li>
                                <button className="text-white bg-blue-700 p-2 px-4 rounded" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Layout;
