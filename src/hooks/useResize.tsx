import { useState, useEffect } from 'react'

const data = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
})

export default function useResize() {
    const [windowSize, setWindowSize] = useState(data())
    useEffect(() => {
        function handleResize() {
            setWindowSize(data())
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return windowSize
}
