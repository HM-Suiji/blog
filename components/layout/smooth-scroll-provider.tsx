'use client'

import { type ReactNode, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cleanupLenis: (() => void) | undefined

    const createLenis = () => {
      if (motionQuery.matches || lenisRef.current) {
        return
      }

      const lenis = new Lenis({
        anchors: {
          duration: 0.95,
          easing: time => Math.min(1, 1.001 - 2 ** (-10 * time)),
          offset: -88,
        },
        lerp: 0.085,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: false,
        wheelMultiplier: 0.92,
      })

      lenisRef.current = lenis

      const updateScrollTrigger = () => ScrollTrigger.update()
      const tick = (time: number) => lenis.raf(time * 1000)

      lenis.on('scroll', updateScrollTrigger)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      requestAnimationFrame(() => ScrollTrigger.refresh())

      cleanupLenis = () => {
        gsap.ticker.remove(tick)
        lenis.off('scroll', updateScrollTrigger)
        lenis.destroy()
        lenisRef.current = null
        requestAnimationFrame(() => ScrollTrigger.refresh())
      }
    }

    const syncMotionPreference = () => {
      cleanupLenis?.()
      cleanupLenis = undefined
      createLenis()

      if (motionQuery.matches) {
        requestAnimationFrame(() => ScrollTrigger.refresh())
      }
    }

    syncMotionPreference()
    motionQuery.addEventListener('change', syncMotionPreference)

    return () => {
      motionQuery.removeEventListener('change', syncMotionPreference)
      cleanupLenis?.()
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      lenisRef.current?.resize()
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  return children
}
