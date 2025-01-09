import axios from "@/api/axios"
import { useMutation } from "@tanstack/react-query"
import useAuth from "./useAuth"
import { useLocation, useNavigate } from "react-router-dom"

const useLogout = () => {

    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation();

    const { mutate: logout, isPending: logoutPending } = useMutation({
        mutationFn: () => {
            return axios.get('/auth/logout', {
                withCredentials: true
            })
        },
        onSuccess: () => {
            setAuth({})
            localStorage.removeItem("neoPortal_auth_token");
            navigate('/auth', { state: { from: location } });
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return { logout, logoutPending }
}

export default useLogout