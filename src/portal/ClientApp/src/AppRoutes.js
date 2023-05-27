import React from "react";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SignInSide } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { Layout } from "./components/Layout";
import { LayoutVoid } from "./components/LayoutVoid";

const AppRoutes = [
    {
        index: true,
        element: <Home />,
        layout: Layout
    },
    {
        path: "/counter",
        element: <Counter />,
        layout: Layout
    },
    {
        path: "/fetch-data",
        element: <FetchData />,
        layout: Layout
    },
    {
        path: "/sign-in",
        element: <SignInSide />,
        layout: LayoutVoid
    },
    {
        path: "/sign-up",
        element: <SignUp />,
        layout: LayoutVoid
    }
];

export default AppRoutes;