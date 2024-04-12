import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

import { AuthProvider } from "./AuthProvider";
import Board from "./pages/Board/Board";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./ProtectedRoute";
import ReactDOM from "react-dom/client";
import Stats from "./pages/Stats";

function App() {
    return (
        <BrowserRouter>
        <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Login />} />
                        <Route
                            path="home"
                            element={<ProtectedRoute element={<Home />} />}
                        />
                        <Route
                            path="game/:id"
                            element={<ProtectedRoute element={<Board />} />}
                        />
                        <Route
                            path="stats/:id"
                            element={<ProtectedRoute element={<Stats />} />}
                        />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
        </AuthProvider>
            </BrowserRouter>
    );
}

export default App;
