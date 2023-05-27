import React from "react";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
        const [currentUser, setCurrentUser] = React.useState(null);

        const signIn = (accessToken, refreshToken) => {
            
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            setCurrentUser({ accessToken, refreshToken });
        };

        const signOut = () => {
            
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setCurrentUser(null);
        };

        React.useEffect(() => {
            const accessToken = localStorage.getItem("access_token");
            const refreshToken = localStorage.getItem("refresh_token");
            if (accessToken && refreshToken) {
                setCurrentUser({ accessToken, refreshToken });
            }
        }, []);

        return (
        <AuthContext.Provider value={{ currentUser, signIn, signOut }}>
    {children}
    </AuthContext.Provider>
);
};