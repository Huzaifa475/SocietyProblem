import React, { useEffect, useState } from 'react'

function useQuery(query) {
    const [matches, setMatches] = useState(window.matchMedia(query).matches)

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);
        const listener = (e) => setMatches(e.matches)

        mediaQueryList.addListener(listener)

        return () => mediaQueryList.removeListener(listener)
    }, [query])
  return matches
}

export default useQuery