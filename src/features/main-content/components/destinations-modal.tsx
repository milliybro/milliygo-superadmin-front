import { Button, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import AddCreateIcon from '@/components/icons/add-icon'
import CloseIcon from '@/components/icons/close-icon'
import { getUserRoles } from '../api'
import useDestinationModalStore from '../store/destinations-modal-store'
import Dragger from 'antd/es/upload/Dragger'
import { useQuery } from '@tanstack/react-query'

const DestinationModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useDestinationModalStore(state => state)

  const [form] = Form.useForm()

  const editUserId = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()

    if (editUserId) {
      navigate(pathname)
    }
  }

  //   const { data, refetch: fetching } = useQuery({
  //     queryKey: ['user', editUserId],
  //     queryFn: async () => {
  //       const res = await getUser({ id: editUserId })
  //       return res
  //     },
  //     enabled: !!editUserId,
  //   })

  const { data: roles } = useQuery({
    queryKey: ['users-roles'],
    queryFn: async () => {
      const res = await getUserRoles()
      return res
    },
    // keepPreviousData: true,
  })

  //   const { mutate: handleUserSave } = useMutation({
  //     mutationFn: (values: any) => {
  //       const formattedValues: IDestinations = {
  //         ...values,
  //       }

  //       if (editUserId) {
  //         return updateUser({ id: editUserId, queryParams: formattedValues })
  //       }

  //       return createUser(formattedValues)
  //     },
  //     onSuccess: () => {
  //       // notification.success({
  //       //   message: editUserId
  //       //     ? t('fields.user-notification.edit.message')
  //       //     : t('fields.user-notification.add.message'),
  //       // })
  //       openNotification()
  //       form.resetFields()
  //       fetching()
  //       closeHandler()
  //     },
  //     onError: (error: any) => {
  //       openNotificationWithIcon('error')
  //       messageApi.open({
  //         type: 'error',
  //         content: 'This is an error message',
  //       })
  //       message.error(error?.data?.username)
  //       form.getFieldsError()
  //     },
  //   })

  //   useEffect(() => {
  //     if (data && editUserId) {
  //       form.setFieldsValue({
  //         first_name: data?.first_name + ' ' + data?.last_name,
  //         phone: data?.phone,
  //         gender: data?.gender,
  //         username: data?.username,
  //         code: data?.code,
  //         type: data?.type?.name,
  //         status: data?.is_active,
  //       })
  //     }
  //   }, [data, form])

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
        icon={<CloseIcon className="text-base" />}
        onClick={closeHandler}
      />
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <div className="mb-2 text-2xl font-bold text-primary-dark">
          {editUserId
            ? t('home-content.edit-destination')
            : t('home-content.add-destination')}
        </div>
        <p className="font-medium text-secondary">
          {t('home-content.destination-desc')}
        </p>
      </div>
      <Form
        layout="vertical"
        // onFinish={values => handleUserSave(values)}
        className="flex flex-col gap-4"
        form={form}
      >
        <Form.Item
          label={t('home-content.destination-name')}
          name="name"
          rules={[
            {
              required: true,
              message: t('common.rule'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('home-content.destination-name')}
          />
        </Form.Item>

        <Form.Item
          name="icon"
          label={t('home-content.direction-cover')}
          className="flex-1"
          rules={[
            {
              required: true,
              message: t('common.rule'),
            },
          ]}
        >
          <Dragger>
            <div>
              <p className="ant-upload-drag-icon flex justify-center">
                <AddCreateIcon />
              </p>
              <p className="ant-upload-text text-base font-medium text-[#232E40]">
                <a
                  style={{ textDecoration: 'underline' }}
                  className="me-1 text-[#3276FF]"
                >
                  {t('fields.icon.select')}
                </a>
                {t('fields.icon.drag-file')}
              </p>
              <p className="ant-upload-hint">{t('fields.icon.max-size')}</p>
            </div>
          </Dragger>
          {/* {previewImage && (
            <div className="mt-2 flex justify-start">
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>
          )} */}
        </Form.Item>

        <Form.Item
          label={t('home-content.link-destination')}
          name="link"
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
            <Button type="primary" htmlType="submit">
              {editUserId
                ? t('home-content.edit-destination')
                : t('home-content.add-destination')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DestinationModal
