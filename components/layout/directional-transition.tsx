'use client'

import { ViewTransition, type ViewTransitionInstance } from 'react'

import { gsap } from 'gsap'

type ViewTransitionSnapshot = {
  animate: Element['animate']
}

type ViewTransitionInstanceWithSnapshots = ViewTransitionInstance & {
  new: ViewTransitionSnapshot
  old: ViewTransitionSnapshot
}

const NAV_TAB_TYPE = 'nav-tab'

function shouldAnimateNavTab(types: Array<string>) {
  return (
    types.includes(NAV_TAB_TYPE) &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function driveSnapshotWithGsap({
  delay = 0,
  duration,
  ease,
  keyframes,
  snapshot,
}: {
  delay?: number
  duration: number
  ease: string
  keyframes: Keyframe[]
  snapshot: ViewTransitionSnapshot
}) {
  const animation = snapshot.animate(keyframes, {
    duration: duration * 1000,
    easing: 'linear',
    fill: 'both',
  })
  const playhead = { time: 0 }

  animation.pause()
  animation.currentTime = 0

  const tween = gsap.to(playhead, {
    time: duration * 1000,
    delay,
    duration,
    ease,
    onUpdate: () => {
      animation.currentTime = playhead.time
    },
    onComplete: () => animation.finish(),
  })

  return () => {
    tween.kill()
    animation.cancel()
  }
}

function animateNavTabEnter(
  instance: ViewTransitionInstance,
  types: Array<string>
) {
  if (!shouldAnimateNavTab(types)) return

  const { new: snapshot } = instance as ViewTransitionInstanceWithSnapshots

  return driveSnapshotWithGsap({
    snapshot,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    duration: 0.22,
    delay: 0.04,
    ease: 'power2.out',
  })
}

function animateNavTabExit(
  instance: ViewTransitionInstance,
  types: Array<string>
) {
  if (!shouldAnimateNavTab(types)) return

  const { old: snapshot } = instance as ViewTransitionInstanceWithSnapshots

  return driveSnapshotWithGsap({
    snapshot,
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 0.13,
    ease: 'power1.out',
  })
}

export function DirectionalTransition({
  children,
  reveal = false,
}: {
  children: React.ReactNode
  reveal?: boolean
}) {
  return (
    <ViewTransition
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'nav-tab': 'gsap-route',
        default: reveal ? 'slide-up' : 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'nav-tab': 'gsap-route',
        default: 'none',
      }}
      onEnter={animateNavTabEnter}
      onExit={animateNavTabExit}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}

export function RouteLoadingTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransition
      enter={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'nav-tab': 'gsap-route',
        default: 'none',
      }}
      exit={{
        'nav-forward': 'nav-forward',
        'nav-back': 'nav-back',
        'nav-tab': 'gsap-route',
        default: 'slide-down',
      }}
      onEnter={animateNavTabEnter}
      onExit={animateNavTabExit}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}
