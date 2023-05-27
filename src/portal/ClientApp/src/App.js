import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layouts/Layout";
import { LayoutVoid } from "./components/Layouts/LayoutVoid";
import { LayoutAdmin } from "./components/Layouts/LayoutAdmin";
import { AuthProvider } from "./components/Auth/AuthProvider";
import "./custom.css";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <AuthProvider>
            <Routes>
            {AppRoutes.map((route, index) => {
            const { element, layout: LayoutComponent, ...rest } = route;
            const LayoutToRender = LayoutComponent || Layout;

            return (
            <Route
            key={index}
            {...rest}
            element={<LayoutToRender>{element}</LayoutToRender>}
        />
    );
})}
                </Routes>
        </AuthProvider>
);
}
}