import { Upload, Button, Form } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AddCreateIcon from '@/components/icons/add-icon'

const { Dragger } = Upload

const VideoUploader = () => {
  const [file, setFile] = useState<any>(null)
  const { t } = useTranslation()

  const props = {
    name: 'file',
    accept: '.mp4',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file: File) => {
      if (file.type !== 'video/mp4') {
        alert(t('home-content.video-alert'))
        return false
      }
      setFile(URL.createObjectURL(file))
      return false
    },
  }

  return (
    <Form.Item
      name="icon"
      label={t('home-content.upload-image')}
      className="flex-1"
      rules={[{ required: true, message: 'Video yuklash majburiy!' }]}
    >
      <div className="flex flex-col gap-2">
        {file && (
          <Button
            icon={<UploadOutlined />}
            onClick={() => setFile(null)}
            type="primary"
          >
            {t('home-content.reupload')}
          </Button>
        )}

        {!file ? (
          <Dragger {...props} className="mt-2">
            <div>
              <p className="ant-upload-drag-icon flex justify-center">
                <AddCreateIcon />
              </p>
              <p className="ant-upload-text text-[#232E40] text-base font-medium">
                <a
                  style={{ textDecoration: 'underline' }}
                  className="text-[#3276FF] me-1"
                >
                  {t('fields.icon.select')}
                </a>
                {t('fields.icon.drag-file')}
              </p>
              <p className="ant-upload-hint">{t('fields.icon.max-size')}</p>
            </div>
          </Dragger>
        ) : (
          <video
            src={file}
            controls
            style={{
              width: '100%',
              maxHeight: '300px',
              borderRadius: '8px',
            }}
          />
        )}
      </div>
    </Form.Item>
  )
}

export default VideoUploader
