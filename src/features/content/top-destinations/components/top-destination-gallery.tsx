import ImageUploadIcon from '@/components/icons/image-upload'
import { App, Form, Image, Typography, Upload, UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useTopDestinationImage } from '../hooks/use-top-destination-image'
import CloseIcon from '@/components/icons/close-icon'

export default function TopDestinationGallery() {
  const { t } = useTranslation()
  const { message } = App.useApp()
  const { images, addImage, removeImage } = useTopDestinationImage()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }

    addImage({ file: file, url: URL.createObjectURL(file) })
  }

  return (
    <>
      <Form.Item label="Добавить фотографии">
        <Upload.Dragger
          className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
          accept="image/*"
          multiple={false}
          showUploadList={false}
          beforeUpload={handleUpload}
        >
          <ImageUploadIcon className="text-[70px]" />
          <Typography.Title className="m-0 text-base font-medium">
            {t('common.select_or_drag')}
          </Typography.Title>
          <Typography.Paragraph className="m-0 text-sm text-secondary">
            {t('common.images_limit')}
          </Typography.Paragraph>
        </Upload.Dragger>
      </Form.Item>
      {images.length > 0 && (
        <div className="flex items-center gap-3">
          {images.map((img, i) => (
            <div
              key={img.url + '-' + i}
              className="relative h-[100px] w-[150px]"
            >
              <Image
                src={img.url}
                alt="Invalid image"
                className="h-full w-full rounded-2xl object-cover"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute right-0 top-0 flex size-[20px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-secondary-dark text-white transition-colors hover:bg-secondary-dark/80"
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
