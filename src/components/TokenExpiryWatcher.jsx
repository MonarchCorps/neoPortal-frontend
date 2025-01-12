import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isTokenExpired } from "@/utils/isTokenExpired";
import useModal from "@/hooks/useModal";

const protectedRoutes = ["/dashboard", "/cbt-practice", "/saved-questions"]; // Add your protected routes here.

const TokenExpiryWatcher = ({ children }) => {
    const { showModal, hideModal } = useModal()
    const location = useLocation();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("neoPortal_auth_token"))?.accessToken;
        const isProtectedRoute = protectedRoutes.some((route) =>
            location.pathname.startsWith(route)
        );

        if (isProtectedRoute) {
            if (isTokenExpired(token)) {
                showModal();
            } else {
                hideModal();
            }
        } else {
            hideModal();
        }
    }, [location, showModal, hideModal]);

    return children;
};

export default TokenExpiryWatcher;