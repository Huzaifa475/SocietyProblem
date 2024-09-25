import React, { useEffect, useState } from 'react'

function useResponsiveSize() {
    const [size, setSize] = useState({ width: 400, height: 200 })

    useEffect(() => {
        const updateSize = () => {
            if (window.matchMedia('(max-width: 600px)').matches) {
                setSize({ width: 300, height: 150 });
            } else if (window.matchMedia('(max-width: 1024px)').matches) {
                setSize({ width: 300, height: 150 });
            } else {
                setSize({ width: 400, height: 200 });
            }
        }

        updateSize()

        window.addEventListener('resize', updateSize)

        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size;
}

export default useResponsiveSize