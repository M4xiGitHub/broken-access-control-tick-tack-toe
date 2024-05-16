import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

import { AuthProvider } from "./AuthProvider";
import Board from "./pages/Board/Board";
import Draw from "./pages/Draw";
import EasterEgg from "./pages/EasterEgg";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Loose from "./pages/Loose";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./ProtectedRoute";
import ReactDOM from "react-dom/client";
import Stats from "./pages/Stats";
import Win from "./pages/Win";

function App() {
    return (
        <BrowserRouter>
        <AuthProvider>
                <Routes>
                <Route index element={<Login />} />

                    <Route path="/" element={<Layout />}>
                        <Route
                            path="home"
                            element={<ProtectedRoute element={<Home />} />}
                        />
                        <Route
                            path="game"
                            element={<ProtectedRoute element={<Board />} />}
                        />
                        <Route
                            path="stats/:id"
                            element={<ProtectedRoute element={<Stats />} />}
                        />
                        <Route
                            path="win"
                            element={<ProtectedRoute element={<Win />} />}
                        />
                        <Route
                            path="draw"
                            element={<ProtectedRoute element={<Draw />} />}
                        />
                        <Route
                            path="loose"
                            element={<ProtectedRoute element={<Loose />} />}
                        />
                        <Route
                            path="easter-egg"
                            element={<ProtectedRoute element={<EasterEgg />} />}
                        />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
        </AuthProvider>
            </BrowserRouter>
    );
}

export default App;
