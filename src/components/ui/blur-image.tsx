import { Image, ImageProps } from 'antd'
import { useState } from 'react'

interface BlurImageProps extends ImageProps {
  clickHandler?: () => void
  fallbackSrc?: string
}

function BlurImage({ clickHandler, fallbackSrc, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [src, setSrc] = useState(props.src)

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt || 'Image'}
      className={`${props.className} cursor-pointer duration-300 ease-in-out ${
        isLoading ? 'blur-2xl opacity-0' : 'blur-0 opacity-100'
      }`}
      onLoad={() => setLoading(false)}
      onError={() => fallbackSrc && setSrc(fallbackSrc)}
      onClick={clickHandler}
    />
  )
}

export default BlurImage
