import { useLayoutEffect, useState } from 'react'

import { debounce } from 'es-toolkit'

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768)
    }

    updateSize()

    window.addEventListener('resize', debounce(updateSize, 250))

    return (): void => window.removeEventListener('resize', updateSize)
  }, [])

  return isMobile
}
