// YouTubeEmbed.tsx
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface YouTubeEmbedProps {
  url: string
  width?: string
  height?: string
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  url,
  width = '100%',
  height = '400px',
}) => {
  const { t } = useTranslation()
  const getEmbedUrl = useCallback((url: string) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
    )
    return match ? `https://www.youtube.com/embed/${match[1]}` : null
  }, [])

  const embedUrl = getEmbedUrl(url)

  if (!embedUrl) {
    return <p>{t('fields.youtube_url.error')}</p>
  }

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
      }}
    >
      <iframe
        src={embedUrl}
        title="YouTube Video"
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubeEmbed
