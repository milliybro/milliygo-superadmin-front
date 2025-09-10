import { useTranslation } from 'react-i18next'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Typography,
  notification,
  message,
  InputNumber,
} from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useUserModalStore from '../store/user-modal-store'

import CSelect from '@/components/ui/select'
import UserIcon from '@/components/icons/user'
import CloseIcon from '@/components/icons/close-icon'
import Edit2Icon from '@/components/icons/edit-2'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createUser, getUser, getUserRoles, updateUser } from '../api'
import { useEffect, useState } from 'react'
import { IUsers } from '../types'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { CopyOutlined } from '@ant-design/icons'
// import queryClient from '@/utils/query-client'

interface UserModalProps {
  refetch: () => Promise<any>
}

const UserModal = ({ refetch }: UserModalProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useUserModalStore(state => state)

  const [createdUser, setCreatedUser] = useState<any>(null)

  const [form] = Form.useForm()

  const editUserId = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()

    if (editUserId) {
      navigate(pathname)
    }
  }

  const { data, refetch: fetching } = useQuery({
    queryKey: ['user', editUserId],
    queryFn: () => getUser({ id: editUserId }),
    enabled: !!editUserId,
  })

  const { data: roles, isLoading } = useQuery({
    queryKey: ['users-roles'],
    queryFn: async () => {
      const res = await getUserRoles()
      return res
    },
    // keepPreviousData: true,
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
            className="absolute right-[10px] top-[10px] grid place-items-center rounded-lg"
            icon={<CloseIcon className="text-base" />}
            onClick={() => notification.destroy()}
          />
          <Typography.Text className="text-base text-secondary">
            {editUserId
              ? t('fields.user-notification.add.message')
              : t('fields.user-notification.edit.message')}
          </Typography.Text>
        </div>
      ),
    })
  }

  const handleUserSave = useMutation({
    mutationFn: (values: IUsers) => {
      const formattedValues = {
        ...values,
      }

      if (editUserId) {
        return updateUser({ id: editUserId, queryParams: formattedValues })
      }

      return createUser(formattedValues)
    },
    onSuccess: res => {
      // notification.success({
      //   message: editUserId
      //     ? t('fields.user-notification.edit.message')
      //     : t('fields.user-notification.add.message'),
      // })
      openNotification()
      form.resetFields()
      refetch()
      if (editUserId) {
        fetching()
      }

      if (!editUserId) {
        setCreatedUser(res)
      }

      closeHandler()
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  useEffect(() => {
    if (editUserId) {
      refetch()
    }
  }, [editUserId, refetch])

  useEffect(() => {
    if (data && editUserId) {
      form.setFieldsValue({
        first_name: data?.first_name,
        last_name: data?.last_name,
        middle_name: data?.middle_name,
        phone: data?.phone,
        gender: data?.gender,
        username: data?.username,
        code: data?.code,
        type: data?.type?.id,
        is_active: data?.is_active ? 'True' : 'False',
      })
    } else {
      form.resetFields()
    }
  }, [data, form])

  return (
    <>
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
          disabled={handleUserSave.isPending}
        />
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-[62px] shrink-0 items-center justify-center rounded-full border-[8px] border-[#EFF6FF] bg-[#DBEAFE]">
            {editUserId ? (
              <Edit2Icon className="text-[24px] text-primary" />
            ) : (
              <UserIcon className="text-[24px] text-primary" />
            )}
          </div>
          <div className="mb-2 text-[24px] font-bold text-primary-dark">
            {editUserId ? t('users-page.edit-user') : t('users-page.add-user')}
          </div>
          <p className="font-medium text-secondary">
            {t('users-page.modal-description')}
          </p>
        </div>
        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          className="grid grid-cols-2 gap-4"
          form={form}
        >
          <Form.Item
            label={t('fields.first_name.label')}
            name="first_name"
            rules={[
              {
                required: true,
                message: t('fields.first_name.validation-message-required'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.first_name.placeholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.middle_name.label')}
            name="middle_name"
            rules={[
              {
                required: true,
                message: t('fields.middle_name.validation-message-required'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.middle_name.placeholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.last_name.label')}
            name="last_name"
            rules={[
              {
                required: true,
                message: t('fields.last_name.validation-message-required'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.last_name.placeholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('fields.gender.label')}
            name="gender"
            rules={[
              {
                required: true,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <CSelect
              placeholder={t('fields.gender.placeholder')}
              className="select-shadow"
              options={[
                {
                  label: t('common.men'),
                  value: 'male',
                },
                {
                  label: t('common.women'),
                  value: 'female',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.role.label')}
            name="type"
            rules={[
              {
                required: true,
                message: t('fields.role.validation-message-required'),
              },
            ]}
          >
            <CSelect
              className="select-shadow"
              placeholder={t('fields.role.validation-message-required')}
              loading={isLoading}
            >
              {roles?.results.map(role => (
                <Select.Option key={role.id} value={role.id}>
                  {role?.display_name}
                </Select.Option>
              ))}
            </CSelect>
          </Form.Item>

          <Form.Item
            label={t('fields.status.label')}
            name="is_active"
            rules={[
              {
                required: true,
                message: t('fields.status.validation-message-required'),
              },
            ]}
          >
            <CSelect
              className="select-shadow"
              placeholder={t('fields.status.placeholder')}
              options={[
                {
                  label: t('common.active'),
                  value: 'True',
                },
                {
                  label: t('common.inactive'),
                  value: 'False',
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label={t('fields.phone.label')}
            name="phone"
            rules={[
              {
                required: true,
                message: t('fields.phone.validation-message-required'),
              },
            ]}
          >
            <InputNumber
              controls={false}
              className="select-shadow w-full"
              placeholder={t('fields.phone.placeholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('fields.login.label')}
            name="username"
            rules={[
              {
                required: true,
                message: t('fields.login.validation-message-required'),
              },
              { type: 'email',
                message: t('fields.email.validation-message-invalid'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.login.placeholder')}
            />
          </Form.Item>
          {/* {editUserId ? null : (
          <Form.Item
            label={t('fields.code.label')}
            name="password"
            rules={[
              {
                required: true,
                message: t('fields.code.validation-message-required'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.code.placeholder')}
            />
          </Form.Item>
        )} */}
          {/* <Form.Item
          label={t('fields.code.label')}
          name="code"
          rules={[
            {
              required: true,
              message: t('fields.code.validation-message-required'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('fields.code.placeholder')}
          />
        </Form.Item> */}

          <div className="col-span-full flex justify-center gap-4">
            <Button onClick={closeHandler} disabled={handleUserSave.isPending}>
              {t('common.cancel')}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={handleUserSave.isPending}
            >
              {editUserId
                ? t('users-page.edit-user')
                : t('users-page.add-user')}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={!!createdUser}
        onCancel={() => setCreatedUser(null)}
        footer={null}
        centered
        title={t('users-page.user-is-added')}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Typography.Text strong>{t('fields.login.label')}:</Typography.Text>
            <Typography.Text code>{createdUser?.username}</Typography.Text>
            <Button
              type="link"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(createdUser?.username)
                message.success(t('common.copied'))
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Typography.Text strong>
              {t('fields.password.label')}:
            </Typography.Text>
            <Typography.Text code>
              {createdUser?.generated_password}
            </Typography.Text>
            <Button
              type="link"
              size="small"
              icon={<CopyOutlined />}
              onClick={() => {
                navigator.clipboard.writeText(createdUser?.generated_password)
                message.success(t('common.copied'))
              }}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="primary" onClick={() => setCreatedUser(null)}>
              {t('common.close')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UserModal
