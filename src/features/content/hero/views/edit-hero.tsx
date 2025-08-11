import ImageUploadIcon from '@/components/icons/image-upload'
import { App, Button, Form, Switch, Tag, Typography, Upload } from 'antd'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import VideoPlayer from 'react-player'
import { getFirstFrameFromVideo } from '../helpers/get-first-frame-from-video'
import { useHeroContext } from '../hooks/use-hero-context'
import { useUploadedVideoStore } from '../store/uploaded-video-store'

export default function EditHero() {
  const {
    video: { data },
    editBackground: { mutate, isPending },
  } = useHeroContext()
  const { t } = useTranslation()
  const { notification } = App.useApp()
  const { uploadedVideo, setUploadedVideo, removeUploadedVideo } =
    useUploadedVideoStore()
  const [form] = Form.useForm()
  const status = Form.useWatch('status', form)

  useEffect(() => {
    removeUploadedVideo()

    return () => {
      removeUploadedVideo()
    }
  }, [])

  useEffect(() => {
    form.setFieldsValue({ is_active: data?.is_active || false })
  }, [data])

  const handleUpload = (file: File) => {
    if (file?.size && file?.size > 200 * 1024 * 1024) {
      notification.error({
        message: t('common.images_limit', { limit: '5 MB' }),
      })
      return
    } else if (!file?.type?.includes('video/')) {
      notification.error({
        message: 'Неверный тип файла',
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
    <div>
      <Typography.Title level={3} className="text-2xl font-semibold">
        Изменить фон
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={values => {
          mutate(values)
        }}
        className="flex flex-wrap divide-x rounded-2xl border py-5 *:px-6"
      >
        <div className="flex basis-1/2 flex-col gap-5">
          <Typography.Text className="font-medium">
            Текущее видео
          </Typography.Text>
          <VideoPlayer src={data?.video} height="auto" width="100%" controls />
        </div>
        <div className="flex basis-1/2 flex-col gap-5">
          <div className="relative w-full">
            <Typography.Text className="font-medium">
              Новое видео
            </Typography.Text>
            {uploadedVideo && (
              <Button
                size="small"
                type="dashed"
                onClick={removeUploadedVideo}
                className="absolute right-0 top-0"
              >
                Изменить
              </Button>
            )}
          </div>
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
        </div>
        <div className="mt-5 flex basis-full items-end gap-5">
          <div className="flex items-end gap-5">
            <Form.Item label={t('fields.status.label')} name="is_active">
              <Switch />
            </Form.Item>
            <Tag color={status ? 'green' : 'red'} className="px-2 py-2 text-sm">
              {status ? t('common.active') : t('common.inactive')}
            </Tag>
          </div>
        </div>
      </Form>
      <Button
        type="primary"
        className="mt-10 self-start px-12"
        loading={isPending}
        onClick={() => form.submit()}
      >
        Сохранить
      </Button>
    </div>
  )
}
