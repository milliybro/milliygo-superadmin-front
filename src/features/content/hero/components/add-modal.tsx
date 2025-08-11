import ImageUploadIcon from '@/components/icons/image-upload'
import ResetIcon from '@/components/icons/reset'
import UserIcon from '@/components/icons/user'
import { CloseOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { App, Button, Modal, Typography, Upload, UploadProps } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { createBackground } from '../api'
import { getFirstFrameFromVideo } from '../helpers/get-first-frame-from-video'
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

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      if (!uploadedVideo?.video && !uploadedVideo?.preview) {
        return Promise.reject('')
      }

      const formdata = new FormData()

      formdata.append('video', uploadedVideo?.video)
      formdata.append('preview_image', uploadedVideo?.preview)
      formdata.append('is_active', 'false')

      return createBackground(formdata)
    },
    onSuccess: () => {
      message.success('Фон успешно создан')
      setShowModal(false)
    },
  })

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
          Добавить
        </Typography.Title>
        <div className="w-full text-left">
          <Typography.Text className="mb-2 block text-left text-base font-medium">
            Добавить фотографии или видео
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
                Перезагрузить
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
              <ImageUploadIcon className="text-[70px]" />
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
              Отменить
            </Button>
            <Button
              type="primary"
              className="w-full"
              onClick={() => mutate()}
              loading={isPending}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
