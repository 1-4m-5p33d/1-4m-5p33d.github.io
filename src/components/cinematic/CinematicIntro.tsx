import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal } from '../terminal/Terminal'
import { CanvasFrameSequence } from './CanvasFrameSequence'

gsap.registerPlugin(ScrollTrigger)

export function CinematicIntro() {
  const root = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !root.current) return

    const softenWheelSpeed = (event: WheelEvent) => {
      if (!triggerRef.current?.isActive || event.ctrlKey || event.deltaY === 0) return

      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? window.innerHeight
          : 1
      const delta = event.deltaY * unit
      const magnitude = Math.abs(delta)
      const adjusted = 16 * Math.pow(magnitude / 16, 0.7)

      event.preventDefault()
      window.scrollBy(0, Math.sign(delta) * adjusted)
    }

    window.addEventListener('wheel', softenWheelSpeed, { passive: false })

    const ctx = gsap.context(() => {
      const position = { progress: 0 }
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.cinematic',
          start: 'top top',
          end: '+=6000',
          scrub: 1,
          pin: true,
        },
      })

      triggerRef.current = timeline.scrollTrigger ?? null

      timeline
        .to('.opening-fade', { opacity: 0, duration: 0.5, ease: 'none' }, 0)
        .to(
          position,
          {
            progress: 0.95,
            ease: 'none',
            duration: 6,
            onUpdate: () => setProgress(position.progress),
          },
          0
        )
        .to('.lower-blur', { opacity: 1, duration: 1.8 }, 3.8)
        .to('.intro-one', { opacity: 1, y: 0, duration: 1.1 }, 4.2)
        .to('.intro-one', { y: -75, opacity: 0.85, duration: 1.4 }, 5.3)
        .to('.intro-two', { opacity: 1, y: 0, duration: 1.1 }, 5.5)
        .to('.intro-copy', { opacity: 0, duration: 0.8 }, 6.8)
        .to('.scene-fade', { opacity: 1, duration: 1.8 }, 6.9)
        .to('.terminal-wrap', { opacity: 1, y: 0, duration: 1.1 }, 7.8)
        .to('.typed-command', { width: '9ch', duration: 0.5, ease: 'steps(9)' }, 8.9)
        .to('.fetch', { autoAlpha: 1, duration: 0.2 }, 9.5)
    })

    return () => {
      window.removeEventListener('wheel', softenWheelSpeed)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={root} className="cinematic">
      {/* High-Performance Canvas Frame Sequence (0ms seek latency) */}
      <CanvasFrameSequence progress={progress} />

      {/* Cinematic Copy */}
      <div className="intro-copy">
        <p className="intro-one">Hi, I&apos;m Aditya Trivedi</p>
        <p className="intro-two">and this is a work in progess</p>
      </div>

      {/* Smooth Scene Fade into Terminal */}
      <div className="scene-fade" />

      {/* Developer Terminal */}
      <div className="terminal-wrap">
        <Terminal />
      </div>

      {/* Initial Black Opening Scrim */}
      <div className="opening-fade" aria-hidden="true" />
    </div>
  )
}
