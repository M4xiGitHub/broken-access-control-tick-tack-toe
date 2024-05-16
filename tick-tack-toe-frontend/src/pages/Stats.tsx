import React, { useEffect } from 'react'

import { UserAtom } from '../UserAtom';
import { useAtom } from 'jotai';
import {useParams} from "react-router-dom";

export default function Stats () {
    let { id } = useParams();
    const [user, setUser] = React.useState<null|UserAtom>(null);
    
    const fetchStats = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              }
            });
            if (!response.ok) {
              throw new Error('Failed to Fetch');
            }
            const data = await response.json();
            setUser(data);
        }
        catch (error) {
            console.error('Failed to fetch:', error);
        }
    }
    useEffect(() => {
        fetchStats();
    }
    , []);
    
    return (
        <div className="h-full w-full dark:bg-[#1A2238] flex justify-center items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">{user ? user.username : "Your"} statistics</h2>
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-6 sm:grid-cols-3 mt-4">
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Your played games </dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{user ? user.gamesPlayed : "NaN"}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Won games</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{user ? user.gamesWon : "NaN"}
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Lost games</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{user ? user.gamesLost : "NaN"}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Drawn games</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{user ? user.gamesDraw : "NaN"}
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">Others disconnected</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{user ? user.gamesOtherDisconnected : "NaN"}
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
                        <div className="px-4 py-5 sm:p-6">
                            <dl>
                                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">You disconnected</dt>
                                <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">{user ? user.gamesDisconnected : "NaN"}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}