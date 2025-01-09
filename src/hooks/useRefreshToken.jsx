import axios from '../api/axios'
import useAuth from './useAuth'


function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {

        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                _id: response.data._id,
                role: response.data.role,
                accessToken: response.data.accessToken,
                name: response.data.name,
                email: response.data.email,
                phoneNumber: response.data.phoneNumber,
                type: response.data.type,
                cacNumber: response.data.cacNumber,
                state: response.data.state,
                qualification: response.data.qualification,
                profileImage: response.data.profileImage,
                licenseNo: response.data.licenseNo,
                createdAt: response.data.createdAt,
                assignedSubject: response.data.assignedSubject
            };
        });

        localStorage.setItem("neoPortal_auth_token", JSON.stringify(response.data));

        return response.data.accessToken;

    };

    return refresh;
}

export default useRefreshToken