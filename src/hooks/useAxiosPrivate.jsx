import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                const token = auth?.accessToken || JSON.parse(localStorage.getItem("neoPortal_auth_token"))?.accessToken;
                if (token && !config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        setAuth((prev) => ({ ...prev, accessToken: newAccessToken }));
                        localStorage.setItem("neoPortal_auth_token", JSON.stringify({ ...auth, accessToken: newAccessToken }));
                        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.error(refreshError);
                        if (refreshError.response?.status === 401) {
                            setAuth({});
                            localStorage.removeItem("neoPortal_auth_token");
                        }
                    }
                }

                return Promise.reject(error);
            }
        );


        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh, setAuth]);

    return axiosPrivate;
};

export default useAxiosPrivate;
