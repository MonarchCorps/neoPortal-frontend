/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // Converted it to an array because it was a string initially
        [auth?.role]?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?._id
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/auth' state={{ from: location }} replace />
    )

}

export default RequireAuth