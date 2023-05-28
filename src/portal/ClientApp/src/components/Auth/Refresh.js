import axios from 'axios';
import Cookies from 'js-cookie';

export async function Refresh() {
    const refreshToken = Cookies.get('refresh_token');

    if (refreshToken == 'undefined') {
        console.error("No Refresh token available");
        return {
            isSuccess: false,
            accessToken: null,
            refreshToken: null,
        };
    }

    try {
        const response = await axios.post('/api/Account/refresh-token', null, {
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
        return {
            isSuccess: false,
            accessToken: null,
            refreshToken: null,
        };
    }
}

export default Refresh;