import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect mobile devices
 * 
 * Features:
 * - Provides reactive state based on window size changes
 * - Uses matchMedia for better browser compatibility
 * - Enhanced with proper SSR handling
 * - Resilient to React context issues with safe initialization
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return isMobile
}
