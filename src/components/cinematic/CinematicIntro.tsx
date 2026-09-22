import { useCallback, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Terminal } from '../terminal/Terminal'
import { VideoScene } from './VideoScene'

gsap.registerPlugin(ScrollTrigger)

export function CinematicIntro() {
  const root = useRef<HTMLDivElement>(null)
  const scrubVideo = useRef<(progress: number) => void>(() => {})
  const setScrubber = useCallback((scrub: (progress: number) => void) => { scrubVideo.current = scrub }, [])
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !root.current) return
    const ctx = gsap.context(() => {
      const position = { progress: 0 }
      const timeline = gsap.timeline({ scrollTrigger: { trigger: '.cinematic', start: 'top top', end: '+=3300', scrub: 0.7, pin: true } })
      timeline
        .to(position, { progress: .92, ease: 'none', duration: 6, onUpdate: () => scrubVideo.current(position.progress) })
        .to('.lower-blur', { opacity: 1, duration: 1.8 }, 4.1)
        .to('.intro-one', { opacity: 1, y: 0, duration: 1.1 }, 4.5)
        .to('.intro-one', { y: -82, opacity: 0.85, duration: 1.4 }, 5.6)
        .to('.intro-two', { opacity: 1, y: 0, duration: 1.1 }, 5.8)
        .to('.scene-fade', { opacity: 1, duration: 2.2 }, 6.8)
        .to('.terminal-wrap', { opacity: 1, y: 0, duration: 1.1 }, 8.1)
    })
    return () => ctx.revert()
  }, [])
  return <div ref={root} className="cinematic">
    <VideoScene onScrubReady={setScrubber} />
    <div className="grade" /><div className="lower-blur" />
    <div className="intro-copy"><p className="intro-one">Hi, I&apos;m Aditya Trivedi</p><p className="intro-two">and this is a work in progress</p></div>
    <div className="scene-fade" />
    <div className="terminal-wrap"><Terminal /></div>
  </div>
}
