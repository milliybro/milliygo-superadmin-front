import ImageUploadIcon from '@/components/icons/image-upload'
import { useImageCompression } from '@/hooks/use-image-compression'
import { Button, Form, Typography, Upload, UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDiscoverImage } from '../hooks/use-discover-image'

export default function DiscoverGallery() {
  const { t } = useTranslation()
  const { setImage, image, removeImage } = useDiscoverImage()
  const { compress, isCompressing } = useImageCompression()

  const handleUpload: UploadProps['beforeUpload'] = async file => {
    // if (file?.size && file?.size > 5 * 1024 * 1024) {
    //   notification.error({
    //     message: t('common.images_limit', { limit: '5 MB' }),
    //   })
    //   return
    // }

    const compressed = await compress(file)

    if (compressed) {
      setImage({ file: compressed, url: URL.createObjectURL(compressed) })
    }

    return false
  }

  return (
    <Form.Item label={t('fields.images.label')}>
      {image === null ? (
        <Upload.Dragger
          className="mb-2 flex flex-col items-center gap-2 [&_.ant-upload-btn]:py-12"
          accept="image/*"
          multiple={false}
          showUploadList={false}
          beforeUpload={handleUpload}
          disabled={isCompressing}
        >
          <ImageUploadIcon className="text-7xl" />
          <Typography.Title className="m-0 text-base font-medium">
            {t('common.select_or_drag')}
          </Typography.Title>
          <Typography.Paragraph className="m-0 text-sm text-secondary">
            {t('common.images_limit', { limit: '5 MB' })}
          </Typography.Paragraph>
        </Upload.Dragger>
      ) : (
        <div className="group relative mb-2 h-[210px] w-full overflow-hidden rounded-lg">
          <img
            src={image.url}
            alt="Uploaded image"
            className="block h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center transition-all group-hover:bg-black/30">
            <Button
              size="small"
              type="dashed"
              onClick={removeImage}
              className="bg-white/80"
            >
              {t('common.edit')}
            </Button>
          </div>
        </div>
      )}
    </Form.Item>
  )
}
