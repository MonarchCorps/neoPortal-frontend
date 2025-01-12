import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isTokenExpired } from "@/utils/isTokenExpired";
import useModal from "@/hooks/useModal";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const protectedRoutes = ["/dashboard", "/cbt-practice", "/saved-questions"];

const TokenExpiryWatcher = ({ children }) => {
    const { showModal, hideModal } = useModal()
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const isProtectedRoute = protectedRoutes.some((route) =>
            location.pathname.startsWith(route)
        );

        if (isProtectedRoute) {
            axiosPrivate.get('/check-token')
                .then(response => {
                    hideModal()
                })
                .catch(error => {
                    if (error.response && error.response.data.message === 'Token expired') {
                        showModal()
                    }
                });
        } else {
            hideModal();
        }
    }, [axiosPrivate, hideModal, location.pathname, showModal]);

    return children;
};

export default TokenExpiryWatcher;