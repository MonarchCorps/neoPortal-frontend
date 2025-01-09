import { useLocation } from 'react-router-dom'

function usePathAfterSlash(val) {

    const location = useLocation();
    const pathAfterSlash = location.pathname.split('/').slice(parseInt(val))[0]

    return pathAfterSlash;

}

export default usePathAfterSlash