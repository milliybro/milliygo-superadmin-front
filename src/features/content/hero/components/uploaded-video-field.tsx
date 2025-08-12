import { App, Typography, Upload } from 'antd'
import { useTranslation } from 'react-i18next'
import VideoPlayer from 'react-player'
import { getFirstFrameFromVideo } from '../helpers/get-first-frame-from-video'
import { useUploadedVideoStore } from '../store/uploaded-video-store'
import ImageUploadIcon from '@/components/icons/image-upload'
import { memo } from 'react'

function UploadedVideoField() {
  const { notification } = App.useApp()
  const { t } = useTranslation()
  const { setUploadedVideo, uploadedVideo } = useUploadedVideoStore()

  const handleUpload = (file: File) => {
    if (file?.size && file?.size > 200 * 1024 * 1024) {
      notification.error({
        message: t('common.images_limit', { limit: '5 MB' }),
      })
      return
    } else if (!file?.type?.includes('video/')) {
      notification.error({
        message: t('content.hero.incorrect-file-type'),
      })
      return
    }

    async function handleImage() {
      const preview = await getFirstFrameFromVideo(file)

      setUploadedVideo({ video: file, preview })
    }

    handleImage()

    return false
  }

  return (
    <>
      {uploadedVideo ? (
        <VideoPlayer
          src={URL.createObjectURL(uploadedVideo?.video)}
          height="auto"
          width="100%"
          controls
        />
      ) : (
        <Upload.Dragger
          className="mb-2 flex aspect-video flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
          beforeUpload={newFile => {
            handleUpload(newFile)
            return false
          }}
          showUploadList={false}
          accept="video/*"
        >
          <ImageUploadIcon className="text-[70px]" />
          <Typography.Title className="m-0 text-base font-medium">
            {t('common.select_or_drag')}
          </Typography.Title>
          <Typography.Paragraph className="m-0 text-sm text-secondary">
            {t('common.images_limit', { limit: '200 MB' })}
          </Typography.Paragraph>
        </Upload.Dragger>
      )}
    </>
  )
}

export default memo(UploadedVideoField)
