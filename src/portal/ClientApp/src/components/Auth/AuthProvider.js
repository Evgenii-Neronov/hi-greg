import React from "react";
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);

    const signIn = (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setCurrentUser({ accessToken, refreshToken });
    };

    const signOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setCurrentUser(null);
    };

    const isNotLogged = () => !localStorage.getItem('refresh_token');

    const refresh = async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            console.error("No Refresh token available");
            setCurrentUser(null);
        }

        try {
            const response = await axios.post('/api/auth/refresh-token', null, {
                headers: {
                    'Accept': '*/*',
                },
                params: {
                    refreshToken: refreshToken,
                },
            });

            if (response.status === 200) {
                const { accessToken, refreshToken } = response.data;

                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);

                setCurrentUser({ accessToken, refreshToken });
                return {
                    isSuccess: true,
                    accessToken,
                    refreshToken,
                };
            }

            console.error("Failed to Refresh tokens");
            return {
                isSuccess: false,
                accessToken: null,
                refreshToken: null,
            };
        } catch (error) {
            console.error(error);
            setCurrentUser(null);
        }
    }

    React.useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        if (accessToken && refreshToken) {
            setCurrentUser({ accessToken, refreshToken });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, signIn, signOut, refresh, isNotLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
