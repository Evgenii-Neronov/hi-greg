import React from "react";
import Cookies from 'js-cookie';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider = ({ children }) => {
        const [currentUser, setCurrentUser] = React.useState(null);

        const signIn = (accessToken, refreshToken) => {
            Cookies.set('access_token', accessToken, { expires: 7, secure: true });
            Cookies.set('refresh_token', refreshToken, { expires: 7, secure: true });
            setCurrentUser({ accessToken, refreshToken });
        };

        const signOut = () => {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            setCurrentUser(null);
        };

        const isNotLogged = () => 'undefined' == Cookies.get('refresh_token');

        const refresh = async () => {
            const refreshToken = Cookies.get('refresh_token');

            if (refreshToken == 'undefined') {
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

                    Cookies.set('access_token', accessToken, { expires: 7, secure: true });
                    Cookies.set('refresh_token', refreshToken, { expires: 7, secure: true });

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
            const accessToken = Cookies.get('access_token');
            const refreshToken = Cookies.get('refresh_token');
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