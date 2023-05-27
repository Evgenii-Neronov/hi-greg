import React from "react";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SignInSide } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { Layout } from "./components/Layouts/Layout";
import { LayoutVoid } from "./components/Layouts/LayoutVoid";
import { LayoutAdmin } from "./components/Layouts/LayoutAdmin";

const AppRoutes = [
    {
        index: true,
        element: <Home />,
        layout: LayoutAdmin
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