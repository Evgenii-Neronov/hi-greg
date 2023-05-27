import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { SignIn, SignUp, ResetPwd } from "./components/Auth/Auth"

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/counter",
        element: <Counter />
    },
    {
        path: "/fetch-data",
        element: <FetchData />
    },
    {
        path: "/sign-in",
        element: <SignIn />
    },
    {
        path: "/sign-up",
        element: <SignUp />
    },
    {
        path: "/reset-pwd",
        element: <ResetPwd />
    }
];

export default AppRoutes;