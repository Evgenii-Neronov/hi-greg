import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layout";
import { LayoutVoid } from "./components/LayoutVoid";
import "./custom.css";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
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
);
}
}