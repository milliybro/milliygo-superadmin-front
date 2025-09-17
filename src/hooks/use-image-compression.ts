import { App } from 'antd'
import imageCompression from 'browser-image-compression'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const messageKey = 'image-compression'

export function useImageCompression(
  logResults = false,
  convertToWebP = true,
  showLoadingMessage = true,
) {
  const [isCompressing, setIsCompressing] = useState(false)
  const { message } = App.useApp()

  const { t } = useTranslation()

  const compress = async (file: File) => {
    try {
      if (showLoadingMessage) {
        message.loading({
          key: messageKey,
          content: t('common.compressing-image'),
          duration: 0,
        })
      }
      setIsCompressing(true)

      const compressedBlob: Blob = await imageCompression(file, {
        alwaysKeepResolution: true,
        maxSizeMB: 1,
        fileType: convertToWebP ? 'image/webp' : file.type,
        initialQuality: 0.6,
        useWebWorker: true,
      })

      const imageType = compressedBlob.type.split('/')[1]

      const compressedFile = new File(
        [compressedBlob],
        file.name?.split('.').slice(0, -1).join('.') + `.${imageType}`,
        {
          type: compressedBlob.type,
        },
      )

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
      }

      if (showLoadingMessage) {
        message.destroy(messageKey)
      }

      return compressedFile
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

  return { compress, isCompressing }
}
