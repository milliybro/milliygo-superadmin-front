import ImageUploadIcon from '@/components/icons/image-upload'
import { App, Form, Typography, Upload, UploadProps } from 'antd'
import { useTranslation } from 'react-i18next'

export default function DiscoverGallery() {
  const { t } = useTranslation()
  const { message } = App.useApp()

  const handleUpload: UploadProps['beforeUpload'] = file => {
    if (file?.size && file?.size > 5 * 1024 * 1024) {
      message.error(t('common.images_limit'))
      return
    }
  }

  return (
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
  )
}
