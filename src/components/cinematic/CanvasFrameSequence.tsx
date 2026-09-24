import React, { useEffect, useRef, useState } from 'react'

interface Props {
  progress: number
}

const TOTAL_FRAMES = 89

export function CanvasFrameSequence({ progress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const currentFrameRef = useRef(0)
  const isLoadedRef = useRef(false)

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loaded = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const pad = String(i).padStart(3, '0')
      img.src = `/frames/frame_${pad}.webp`
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === 1 && canvasRef.current) {
          // Draw first frame as soon as it arrives
          renderFrame(0)
        }
        if (loaded === TOTAL_FRAMES) {
          isLoadedRef.current = true
        }
      }
      images.push(img)
    }

    imagesRef.current = images
  }, [])

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let fallbackImg: HTMLImageElement | null = null
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset]
        if (prev && prev.complete && prev.naturalWidth > 0) {
          fallbackImg = prev
          break
        }
        const next = imagesRef.current[frameIndex + offset]
        if (next && next.complete && next.naturalWidth > 0) {
          fallbackImg = next
          break
        }
      }
      if (!fallbackImg) return
      drawCover(canvas, ctx, fallbackImg)
      return
    }

    drawCover(canvas, ctx, img)
  }

  const drawCover = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) => {
    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth || img.width
    const ih = img.naturalHeight || img.height
    if (!iw || !ih) return

    const imgRatio = iw / ih
    const canvasRatio = cw / ch
    let dw: number
    let dh: number
    let dx: number
    let dy: number

    if (canvasRatio > imgRatio) {
      dw = cw
      dh = cw / imgRatio
      dx = 0
      dy = (ch - dh) / 2
    } else {
      dh = ch
      dw = ch * imgRatio
      dy = 0
      dx = (cw - dw) / 2
    }

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, dx, dy, dw, dh)
  }

  // Handle Resize and DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      renderFrame(currentFrameRef.current)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sync with scroll progress
  useEffect(() => {
    const targetIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
    )

    if (targetIndex !== currentFrameRef.current) {
      currentFrameRef.current = targetIndex
      renderFrame(targetIndex)
    }
  }, [progress])

  return (
    <div className="canvas-scene" aria-label="Eau Rouge circuit footage scrubbed via high-performance canvas">
      <canvas ref={canvasRef} className="frame-canvas" />
      <div className="grade" />
      <div className="lower-blur" />
      {loadedCount < 10 && (
        <div className="frame-loader" aria-hidden="true">
          <div className="frame-spinner" />
        </div>
      )}
    </div>
  )
}
