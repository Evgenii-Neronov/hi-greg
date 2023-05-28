import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { Layout } from "./components/Layouts/Layout";
import { LayoutVoid } from "./components/Layouts/LayoutVoid";
import { LayoutAdmin } from "./components/Layouts/LayoutAdmin";
import { AuthProvider } from "./components/Auth/AuthProvider";
import "./custom.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCtb38HOCTHGYggWRzZ8juTDO4TxFnvmGg",
    authDomain: "neu-api-339bb.firebaseapp.com",
    projectId: "neu-api-339bb",
    storageBucket: "neu-api-339bb.appspot.com",
    messagingSenderId: "147326280656",
    appId: "1:147326280656:web:ae07a12dc91bbc752d4fd5",
    measurementId: "G-DRL1T54T6Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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