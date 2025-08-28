import CloseIcon from '@/components/icons/close-icon'
import ImageUploadIcon from '@/components/icons/image-upload'
import { App, Form, Image, Typography, Upload, UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useTopDestinationImage } from '../hooks/use-top-destination-image'

export default function TopDestinationGallery() {
  const { t } = useTranslation()
  const { images, addImage, removeImage } = useTopDestinationImage()
  const { notification } = App.useApp()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      notification.error({
        message: t('common.images_limit', { limit: '5 MB' }),
      })
      return
    }

    addImage({ file: file, url: URL.createObjectURL(file) })

    return false
  }

  return (
    <>
      <Form.Item label={t('fields.add-photo.label')}>
        <Upload.Dragger
          className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
          accept="image/*"
          multiple={true}
          showUploadList={false}
          beforeUpload={handleUpload}
        >
          <ImageUploadIcon className="text-[70px]" />
          <Typography.Title className="m-0 text-base font-medium">
            {t('common.select_or_drag')}
          </Typography.Title>
          <Typography.Paragraph className="m-0 text-sm text-secondary">
            {t('common.images_limit', { limit: '5 MB' })}
          </Typography.Paragraph>
        </Upload.Dragger>
      </Form.Item>
      {images.length > 0 && (
        <div className="max-w-full overflow-x-auto overflow-y-hidden">
          <Image.PreviewGroup preview>
            <div className="flex items-center gap-3">
              {images.map((img, i) => (
                <div
                  key={img?.url + '-' + i}
                  className="relative h-[120px] w-[200px] shrink-0"
                >
                  <Image
                    src={img?.url}
                    alt="Invalid image"
                    className="h-full w-full rounded-sm object-cover"
                    rootClassName="h-full w-full"
                    loading="lazy"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute right-0 top-0 flex size-[20px] -translate-x-[2px] translate-y-[2px] items-center justify-center rounded-sm bg-secondary-dark text-white transition-colors hover:bg-secondary-dark/80"
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
        </div>
      )}
    </>
  )
}
