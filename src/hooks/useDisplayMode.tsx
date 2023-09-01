import { useState, useEffect } from 'react'

interface DisplayMode {
    computer: boolean
    tablet: boolean
    mobile: boolean
}

const getData = (): DisplayMode => ({
    computer: innerWidth >= 1024,
    tablet: innerWidth < 1024 && innerWidth >= 768,
    mobile: innerWidth < 768,
})

function cache(data: DisplayMode): number {
    return (Number(data.computer) << 2) | (Number(data.tablet) << 1) | Number(data.mobile)
}

export default function useDisplayMode() {
    const [data, setData] = useState(getData())
    const [cachedData, setCachedData] = useState(cache(data))
    useEffect(() => {
        function handleResize() {
            const _data = getData()
            const _cachedData = cache(_data)
            if (_cachedData !== cachedData) {
                setCachedData(_cachedData)
                setData(_data)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [cachedData])
    return data
}
