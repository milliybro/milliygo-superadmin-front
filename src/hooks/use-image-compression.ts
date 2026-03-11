import { App } from 'antd'
import imageCompression from 'browser-image-compression'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const messageKey = 'image-compression'

interface CompressResult {
  compressedFile: File
  resizedFile?: File
}

interface ResizeOptions {
  width: number
  height: number
}

export function useImageCompression(
  logResults = false,
  convertToWebP = true,
  showLoadingMessage = true,
) {
  const [isCompressing, setIsCompressing] = useState(false)
  const { message } = App.useApp()

  const { t } = useTranslation()

  const compress = async (
    file: File,
    resizeOptions?: ResizeOptions,
  ): Promise<CompressResult | undefined> => {
    try {
      if (showLoadingMessage) {
        message.loading({
          key: messageKey,
          content: t('common.compressing-image'),
          duration: 0,
        })
      }
      setIsCompressing(true)

      // Create compressed version with original dimensions
      const compressedBlob: Blob = await imageCompression(file, {
        alwaysKeepResolution: true,
        maxSizeMB: 1,
        fileType: convertToWebP ? 'image/webp' : file.type,
        initialQuality: 0.6,
        useWebWorker: true,
      })

      const imageType = compressedBlob.type.split('/')[1]
      const baseFileName = file.name?.split('.').slice(0, -1).join('.')

      const compressedFile = new File(
        [compressedBlob],
        `${baseFileName}.${imageType}`,
        {
          type: compressedBlob.type,
        },
      )

      let resizedFile: File | undefined

      if (resizeOptions) {
        resizedFile = await resizeToExactDimensions(
          compressedFile,
          resizeOptions.width,
          resizeOptions.height,
          `${baseFileName}_${resizeOptions.width}x${resizeOptions.height}.${imageType}`,
          compressedFile.type,
        )
      }

      setIsCompressing(false)

      if (logResults) {
        const originalSizeMB = (file.size / 1024 / 1024).toFixed(2)
        const compressedSizeMB = (compressedFile.size / 1024 / 1024).toFixed(2)
        const compressionRatio = (
          (1 - compressedFile.size / file.size) *
          100
        ).toFixed(1)

        console.log(
          `Image compression: ${originalSizeMB}MB → ${compressedSizeMB}MB (${compressionRatio}% reduction)`,
        )

        if (resizedFile) {
          const resizedSizeMB = (resizedFile.size / 1024 / 1024).toFixed(2)
          console.log(
            `Resized image: ${resizedSizeMB}MB (${resizeOptions!.width}x${resizeOptions!.height}px)`,
          )
        }
      }

      if (showLoadingMessage) {
        message.destroy(messageKey)
      }

      return { compressedFile, resizedFile }
    } catch (error) {
      setIsCompressing(false)
      console.error('Error compressing image:', error)
      if (showLoadingMessage) {
        message.destroy(messageKey)
      }

      message.error({
        content: t('common.error-compressing-image'),
        duration: 3,
      })
    }
  }

  const resizeToExactDimensions = async (
    blob: File,
    targetWidth: number,
    targetHeight: number,
    fileName: string,
    mimeType: string,
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Could not get canvas context'))
        return
      }

      img.onload = () => {
        canvas.width = targetWidth
        canvas.height = targetHeight

        const scaleX = targetWidth / img.width
        const scaleY = targetHeight / img.height
        const scale = Math.max(scaleX, scaleY)

        const scaledWidth = img.width * scale
        const scaledHeight = img.height * scale

        const x = (targetWidth - scaledWidth) / 2
        const y = (targetHeight - scaledHeight) / 2

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

        canvas.toBlob(resizedBlob => {
          if (resizedBlob) {
            const file = new File([resizedBlob], fileName, { type: mimeType })
            resolve(file)
          } else {
            reject(new Error('Failed to create resized blob'))
          }
        }, mimeType)
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }

      img.src = URL.createObjectURL(blob)
    })
  }

  return { compress, isCompressing }
}
