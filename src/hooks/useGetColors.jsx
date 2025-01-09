import { useState, useEffect } from 'react'
import { fetchColorsFromStorage } from '@/utils/getRandomColor'

function useGetColors() {

    const [colors, setColors] = useState({
        randomColor: '',
        darkerColor: ''
    })

    useEffect(() => {
        if (!colors.randomColor) {
            const { randomColor, darkerColor } = fetchColorsFromStorage()
            setColors(prev => ({
                ...prev,
                randomColor,
                darkerColor
            }))
        }
    }, [])

    return { colors }
}

export default useGetColors