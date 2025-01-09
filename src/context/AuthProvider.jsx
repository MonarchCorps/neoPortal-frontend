/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuthState] = useState(() => {
        const storedAuth = JSON.parse(localStorage.getItem("neoPortal_auth_token"));
        return storedAuth || {};
    });

    const setAuth = (newAuth) => {
        setAuthState(newAuth);
        if (newAuth?.accessToken) {
            localStorage.setItem("neoPortal_auth_token", JSON.stringify(newAuth));
        } else {
            localStorage.removeItem("neoPortal_auth_token");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;