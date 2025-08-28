export function getFirstFrameFromVideo(video: File): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const videoElement = document.createElement('video')
    videoElement.src = URL.createObjectURL(video)

    videoElement.addEventListener('loadeddata', () => {
      videoElement.currentTime = 0
    })

    videoElement.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight
      const context = canvas.getContext('2d')
      context?.drawImage(videoElement, 0, 0)

      canvas.toBlob(blob => {
        if (blob) {
          const webpFile = new File([blob], 'first-frame.webp', {
            type: 'image/webp',
          })
          resolve(webpFile)
        } else {
          reject(new Error('Failed to convert canvas to WebP blob.'))
        }
      }, 'image/webp')
    })

    videoElement.addEventListener('error', reject)
  })
}
