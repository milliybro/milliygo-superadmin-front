import ImageUploadIcon from '@/components/icons/image-upload'
import ResetIcon from '@/components/icons/reset'
import UserIcon from '@/components/icons/user'
import { CloseOutlined } from '@ant-design/icons'
import { App, Button, Modal, Typography, Upload, UploadProps } from 'antd'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getFirstFrameFromVideo } from '../helpers/get-first-frame-from-video'
import { useHeroContext } from '../hooks/use-hero-context'
import { useUploadedVideoStore } from '../store/uploaded-video-store'

interface IProps {
  open: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function AddModal({ open, setShowModal }: IProps) {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const { uploadedVideo, setUploadedVideo, removeUploadedVideo } =
    useUploadedVideoStore()
  const {
    createBackground: { mutate, isPending, isSuccess },
  } = useHeroContext()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 200 * 1024 * 1024) {
      message.error(t('common.images_limit', { limit: '200 MB' }))
      return
    }
    async function handleImage() {
      const image = await getFirstFrameFromVideo(file)
      setUploadedVideo({ video: file, preview: image })
    }
    handleImage()
    return false
  }

  useEffect(() => {
    if (isSuccess) {
      setShowModal(false)
      removeUploadedVideo()
    }
  }, [isSuccess])

  return (
    <Modal
      open={open}
      onCancel={() => {
        setShowModal?.(false)
        removeUploadedVideo()
      }}
      closeIcon={<CloseOutlined className="text-black" />}
      footer={null}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-[62px] items-center justify-center rounded-full border-[7px] border-[#EFF6FF] bg-[#DBEAFE]">
          <UserIcon className="text-2xl text-primary" />
        </div>
        <Typography.Title level={3} className="text-2xl">
          {t('common.add')}
        </Typography.Title>
        <div className="w-full text-left">
          <Typography.Text className="mb-2 block text-left text-base font-medium">
            {t('content.hero.add-video')}
          </Typography.Text>
          {uploadedVideo ? (
            <div className="relative mb-2 h-52 w-full overflow-hidden rounded-2xl bg-black">
              <img
                src={
                  uploadedVideo?.preview
                    ? URL.createObjectURL(uploadedVideo.preview)
                    : ''
                }
                alt="Uploaded file"
                className="h-full w-full object-cover object-[center_center] opacity-80"
              />
              <Button
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white hover:text-white/70"
                type="link"
                onClick={() => {
                  removeUploadedVideo()
                }}
              >
                <ResetIcon className="text-lg" />
                {t('common.reload')}
              </Button>
            </div>
          ) : (
            <Upload.Dragger
              className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
              accept="image/*,video/*"
              multiple={false}
              showUploadList={false}
              beforeUpload={handleUpload}
            >
              <ImageUploadIcon className="text-xl" />
              <Typography.Title className="m-0 text-base font-medium">
                {t('common.select_or_drag')}
              </Typography.Title>
              <Typography.Paragraph className="m-0 text-sm text-secondary">
                {t('common.images_limit', { limit: '200 MB' })}
              </Typography.Paragraph>
            </Upload.Dragger>
          )}
          <div className="flex w-full items-center gap-4">
            <Button className="w-full" onClick={() => setShowModal(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              type="primary"
              className="w-full"
              onClick={() => mutate()}
              loading={isPending}
            >
              {t('common.save')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
