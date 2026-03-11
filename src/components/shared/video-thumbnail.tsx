import { useEffect, useState } from 'react'

export default function VideoThumbnail({ videoSrc }: { videoSrc: string }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null)

  useEffect(() => {
    const video = document.createElement('video')

    video.src = videoSrc
    video.crossOrigin = 'anonymous'
    video.muted = true
    video.currentTime = 0

    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        setThumbnail(canvas.toDataURL('image/webp'))
      }
    })
  }, [videoSrc])

  return thumbnail ? <img src={thumbnail} alt="" /> : <p>Loading...</p>
}
