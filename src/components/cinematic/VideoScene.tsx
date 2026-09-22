import { useEffect, useRef } from 'react'

interface Props { onScrubReady: (scrub: (progress: number) => void) => void }

export function VideoScene({ onScrubReady }: Props) {
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let pendingProgress = 0
    let lastProgress = -1
    const seek = (progress: number) => {
      pendingProgress = progress
      const element = video.current
      if (!element?.duration || Math.abs(progress - lastProgress) < .004) return
      lastProgress = progress
      element.currentTime = element.duration * Math.min(progress, .96)
    }
    onScrubReady(seek)
    const onReady = () => { lastProgress = -1; seek(pendingProgress) }
    const element = video.current
    element?.addEventListener('loadedmetadata', onReady)
    return () => { element?.removeEventListener('loadedmetadata', onReady); onScrubReady(() => {}) }
  }, [onScrubReady])

  return <div className="video-scene" aria-label="Eau Rouge driving video, controlled by page scroll">
    <video ref={video} className="spa-video" src="/spa.mp4" muted playsInline preload="auto" />
  </div>
}
