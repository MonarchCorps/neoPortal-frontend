import { useEffect, useRef } from 'react'

function useHideScroll(state) {

    const bodyRef = useRef(document.body);

    useEffect(() => {
        if (state) {
            bodyRef.current.classList.add('no-scroll')
        } else {
            bodyRef.current.classList.remove('no-scroll')
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            bodyRef.current.classList.remove('no-scroll')
        }

    }, [state])
}

export default useHideScroll