import axios from '../api/axios'
import useAuth from './useAuth'

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/auth/refresh', {
                withCredentials: true
            });

            setAuth((prev) => ({
                ...prev,
                ...response.data
            }));

            localStorage.setItem("neoPortal_auth_token", JSON.stringify(response.data));

            return response.data.accessToken;
        } catch (error) {
            if (error.response?.status === 401) {
                setAuth(null);
                localStorage.removeItem("neoPortal_auth_token");
                console.error("Refresh token expired or invalid");
            }
            throw error;
        }
    };


    return refresh;
}

export default useRefreshToken