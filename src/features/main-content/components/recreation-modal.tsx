import { useTranslation } from 'react-i18next'
import {
  Modal,
  Form,
  Input,
  Button,
  Typography,
  notification,
  ColorPicker,
  message,
} from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import CloseIcon from '@/components/icons/close-icon'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import Dragger from 'antd/es/upload/Dragger'
import AddCreateIcon from '@/components/icons/add-icon'
import useRecreationModalStore from '../store/recreation-modal-store'
import { createRecreation, getRecreation, updateRecreation } from '../api'

const RecreationModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useRecreationModalStore(state => state)
  const [form] = Form.useForm()
  const [color, setColor] = useState('')
  const [fileList, setFileList] = useState([])

  const editUserId = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()

    if (editUserId) {
      navigate(pathname)
    }
  }

  const { data } = useQuery({
    queryKey: ['user', editUserId],
    queryFn: async () => {
      const res = await getRecreation({ id: editUserId })
      return res
    },
    enabled: !!editUserId,
  })

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-[24px] text-primary" />,
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {editUserId
            ? t('fields.user-notification.edit.message')
            : t('fields.user-notification.add.message')}
        </Typography.Text>
      ),
      placement: 'topRight',
      description: (
        <div>
          <Button
            size="small"
            type="text"
            className="grid place-items-center rounded-lg absolute right-[10px] top-[10px]"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-secondary text-base">
            {editUserId
              ? t('fields.user-notification.add.message')
              : t('fields.user-notification.edit.message')}
          </Typography.Text>
        </div>
      ),
    })
  }
  const [api] = notification.useNotification() as any
  const openNotificationWithIcon = (type: any) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    })
  }
  const { mutate: handleUserSave, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const formData = new FormData()

      Object.entries(values).forEach(([key, value]) => {
        if (key !== 'icon' && key !== 'uploaded_files') {
          formData.append(
            key,
            typeof value === 'object' ? JSON.stringify(value) : String(value),
          )
        }
      })

      if (values.icon?.fileList) {
        values.icon.fileList.forEach((file: any) => {
          formData.append('icon', file.originFileObj)
        })
      }

      if (values.uploaded_files?.fileList) {
        values.uploaded_files.fileList.forEach((file: any) => {
          formData.append('uploaded_files', file.originFileObj)
        })
      }

      if (editUserId) {
        return updateRecreation({ id: editUserId, queryParams: formData })
      }
      return createRecreation(formData)
    },
    onSuccess: () => {
      openNotification()
      form.resetFields()
      closeHandler()
    },
    onError: (error: any) => {
      openNotificationWithIcon('error')
      message.error(error?.data?.username)
      console.log('error', error)
    },
  })

  useEffect(() => {
    if (data && editUserId) {
      const files =
        data?.content_files?.map((file: any) => ({
          uid: file.id.toString(),
          name: file.file_path.split('/').pop(),
          status: 'done',
          url: file.file_path,
        })) || []

      setFileList(files)

      form.setFieldsValue({
        title: data?.title,
        font_color: data?.font_color || '#000000',
        file_url: data?.content_files[0]?.file_path?.replace(/^http:\/\//, ''),
      })

      setColor(data?.font_color || '#000000')
    }
  }, [data, form])

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onCancel={closeHandler}
      closable={false}
      centered
      closeIcon={null}
      classNames={{
        wrapper: 'backdrop-blur-sm',
        content:
          '!p-[40px] [&>.ant-modal-close]:text-primary-dark dark:[&>.ant-modal-close]:text-dark-bg',
      }}
      footer={null}
    >
      <Button
        className="absolute right-[10px] top-[10px]"
        type="text"
        icon={<CloseIcon className="text-[16px]" />}
        onClick={closeHandler}
      />
      <div className="flex items-center mb-6 flex-col text-center justify-center">
        <div className="text-[24px] mb-2 text-primary-dark font-bold">
          {editUserId
            ? t('home-content.edit-recreation')
            : t('home-content.add-recreation')}
        </div>
        <p className="text-secondary font-medium">
          {t('home-content.desc-recreation')}
        </p>
      </div>
      <Form
        layout="vertical"
        onFinish={values => handleUserSave(values)}
        className="flex flex-col gap-4"
        form={form}
      >
        <Form.Item
          label={t('home-content.name-recreation')}
          name="title"
          rules={[
            {
              required: true,
              message: t('common.rule'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('home-content.name-recreation')}
          />
        </Form.Item>

        <Form.Item
          label={t('home-content.color')}
          name="font_color"
          rules={[{ required: true, message: 'Rang tanlash majburiy' }]}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ColorPicker
              value={color}
              onChange={value => setColor(value.toHexString())}
            />
            <Input value={color} onChange={e => setColor(e.target.value)} />
          </div>
        </Form.Item>

        <Form.Item
          name="uploaded_files"
          label={t('home-content.recreating-cover')}
          className="flex-1"
          rules={[{ required: false, message: t('common.rule') }]}
        >
          <Dragger
            multiple={false}
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }: { fileList: any }) =>
              setFileList(fileList)
            }
            onRemove={file =>
              setFileList(prev => prev.filter((f: any) => f.uid !== file.uid))
            }
          >
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
        </Form.Item>

        <Form.Item
          label={t('home-content.link-destination')}
          name="file_url"
          rules={[
            {
              required: true,
              message: t('common.rule'),
            },
          ]}
        >
          <Input addonBefore="https://" />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center gap-4">
            <Button onClick={closeHandler}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              {editUserId
                ? t('home-content.edit-recreation')
                : t('home-content.add-recreation')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default RecreationModal
