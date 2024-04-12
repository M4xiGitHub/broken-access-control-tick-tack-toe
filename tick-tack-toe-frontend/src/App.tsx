import { BrowserRouter, Route, Routes } from "react-router-dom";

import Board from "./pages/Board/Board";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import React from "react";
import ReactDOM from "react-dom/client";
import Stats from "./pages/Stats";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />

                    <Route path="/" element={<Layout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="game/:id" element={<Board />} />
                        <Route path="stats/:id" element={<Stats />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
