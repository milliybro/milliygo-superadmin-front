import { useTranslation } from 'react-i18next'
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  notification,
  Typography,
} from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useHotelModalStore from '../store/hotel-modal-store'

import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import HotelIcon from '@/components/icons/hotel'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createTenant, getTenant, updateTenant } from '../api'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { ITenantsTable } from '../types'
import { useEffect } from 'react'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const TernantsModal = ({ refetch }: { refetch: any }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useHotelModalStore(state => state)

  const editTenantId = searchParams.get('edit')

  const closeHandler = () => {
    form.resetFields()
    closeModal()

    if (editTenantId) {
      navigate(pathname)
    }
  }

  const openNotification = (
    type: 'error' | 'success',
    messageKey: string,
    messageDesc: string,
  ) => {
    notification[type]({
      closeIcon: null,
      className: `w-[406px] border-t-[5px] ${
        type === 'error' ? 'border-danger' : 'border-primary'
      } rounded-[12px] [&_.ant-notification-notice-message]:mb-0`,
      icon:
        type === 'error' ? (
          <CloseIcon className="text-[24px] text-red-500" />
        ) : (
          <CheckmarkCircleIcon className="text-[24px] text-primary" />
        ),
      message: (
        <Typography.Text className="text-[18px] font-semibold leading-[22.95px]">
          {t(messageKey)}
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
            {t(messageDesc)}
          </Typography.Text>
        </div>
      ),
    })
  }

  const { data } = useQuery({
    queryKey: ['tenant', editTenantId],
    queryFn: async () => {
      const res = await getTenant({ id: editTenantId })
      return res
    },
    enabled: !!editTenantId,
  })

  const { mutate: handleUserSave, isPending } = useMutation({
    mutationFn: (values: any) => {
      console.log('Values:', values)

      const formattedValues: ITenantsTable = {
        schema_name: values?.schema_name,
        start_date: values.date
          ? new Date(values.date[0].$d).toISOString().split('T')[0]
          : '-',
        end_date: values.date
          ? new Date(values.date[1].$d).toISOString().split('T')[0]
          : '-',
        is_active: values?.is_active,
        domain: values?.domain + '.em.xdevs.uz',
        user_id: editTenantId ? data?.user_id : null,
        username: values?.username,
        password: values?.password,
      }
      console.log('formattedValues:', formattedValues)

      if (editTenantId) {
        return updateTenant({ id: editTenantId, queryParams: formattedValues })
      }

      return createTenant(formattedValues)
    },
    onSuccess: () => {
      // notification.success({
      //   message: editTenantId
      //     ? t('fields.user-notification.edit.message')
      //     : t('fields.user-notification.add.message'),
      // })
      openNotification(
        'success',
        editTenantId
          ? 'fields.user-notification.edit.message'
          : 'fields.user-notification.add.message',
        '',
      )
      console.log('success')
      form.resetFields()
      refetch()
      closeHandler()
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        schema_name: data?.schema_name,
        date:
          data?.start_date && data?.end_date
            ? [dayjs(data.start_date), dayjs(data.end_date)]
            : undefined,
        is_active: data.is_active,
        domain: data?.domain?.split('.em.xdevs.uz')[0],
        username: data?.username,
        password: data?.password,
      })
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
        <div
          className="bg-[#DBEAFE] border-[8px] mb-4 border-[#EFF6FF] shrink-0 flex items-center justify-center
           size-[62px] rounded-full"
        >
          <HotelIcon className="text-[24px] text-primary" />
        </div>
        <div className="text-[24px] mb-2 text-primary-dark font-bold">
          {editTenantId ? t('tenant.edit-tenant') : t('tenant.add-tenant')}
        </div>
        <p className="text-secondary font-medium">
          {t('hotels-page.add-hotel-desc')}
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={values => handleUserSave(values)}
        className="flex flex-col gap-4"
      >
        <Form.Item
          label={t('hotels-page.name.title')}
          name="schema_name"
          rules={[
            {
              required: true,
              message: t('hotels-page.name.placeholder'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('hotels-page.name.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('hotels-page.login.title')}
          name="username"
          rules={[
            {
              required: true,
              message: t('hotels-page.login.placeholder'),
            },
          ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('hotels-page.login.placeholder')}
          />
        </Form.Item>
        {/* {editTenantId ? (
          null
        ) : ( */}
        <Form.Item
          label={t('hotels-page.password.title')}
          name="password"
          // rules={[
          //   {
          //     required: true,
          //     message: t('hotels-page.password.placeholder'),
          //   },
          // ]}
        >
          <Input
            className="select-shadow"
            placeholder={t('hotels-page.password.placeholder')}
          />
        </Form.Item>
        {/* )} */}

        <Form.Item
          label={t('hotels-page.domen.title')}
          name="domain"
          rules={[
            {
              required: true,
              message: t('hotels-page.domen.placeholder'),
            },
          ]}
        >
          <Input
            addonAfter="em.xdevs.uz"
            className="select-shadow"
            placeholder={t('hotels-page.domen.placeholder')}
          />
        </Form.Item>

        <Form.Item
          label={t('hotels-page.period')}
          name="date"
          rules={[
            {
              required: true,
              message: t('fields.role.validation-message-required'),
            },
          ]}
        >
          <RangePicker
            placeholder={[t('tenant.start-date'), t('tenant.end-date')]}
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
          />
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
          >
            <Select.Option value={true}>{t('common.active')}</Select.Option>
            <Select.Option value={false}>{t('common.inactive')}</Select.Option>
          </CSelect>
        </Form.Item>

        <Form.Item>
          <div className="flex justify-center gap-4">
            <Button onClick={closeHandler}>{t('common.cancel')}</Button>
            <Button type="primary" htmlType="submit" loading={isPending}>
              {editTenantId ? t('tenant.edit-tenant') : t('tenant.add-tenant')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TernantsModal
