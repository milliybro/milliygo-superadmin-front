import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Typography, notification, Switch, } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import usePaymentProvidersModalStore from '../../../store/payment-providers-store'
import { createPaymentProvider, getPaymentProvider, updatePaymentProvider, } from '../../../api/getPaymentProviders'
import BankIcon from '@/components/icons/bankIcon'

const { TextArea } = Input

interface UserModalProps {
  refetch: () => Promise<any>
}

const PaymentProvidersModal = ({ refetch }: UserModalProps) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isModalOpen, closeModal } = usePaymentProvidersModalStore(
    state => state,
  )

  const [form] = Form.useForm()

  const editUserId = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()
    if (editUserId) {
      navigate(pathname)
    }
  }

  const { data, refetch: fetching } = useQuery({
    queryKey: ['currency', editUserId],
    queryFn: () => getPaymentProvider({ id: editUserId }),
    enabled: !!editUserId,
    refetchOnMount: 'always',
  })

  const openNotification = () => {
    notification.info({
      closeIcon: null,
      className:
        'w-[406px] border-t-[5px] border-primary rounded-[12px] [&_.ant-notification-notice-message]:mb-0',
      icon: <CheckmarkCircleIcon className="text-2xl text-primary" />,
      message: (
        <Typography.Text className="text-lg font-semibold leading-[22.95px]">
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
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
      }

      if (editUserId) {
        return updatePaymentProvider({
          id: editUserId,
          queryParams: formattedValues,
        })
      }

      return createPaymentProvider(formattedValues)
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

      closeHandler()
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  // useEffect(() => {
  //   if (editUserId) {
  //     refetch()
  //   }
  // }, [editUserId, refetch])

  useEffect(() => {
    if (data && editUserId) {
      form.setFieldsValue({
        code: data?.code,
        name: data?.first_name,
        symbol: data?.symbol,
        uzs_rate: data?.uzs_rate,
        rate: data?.rate,
        refresh_rate: data?.refresh_rate,
        // type: data?.type?.id,
        status: data?.status ? 'True' : 'False',
        comment: data?.comment,
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
        maskClosable={false}
        footer={null}
        // classNames={{
        //   wrapper: 'backdrop-blur-sm',
        //   content:
        //     '!p-[40px] [&>.ant-modal-close]:text-primary-dark dark:[&>.ant-modal-close]:text-dark-bg',
        // }}
      >
        <Button
          className="absolute right-[10px] top-[10px]"
          type="text"
          icon={<CloseIcon className="text-base" />}
          onClick={closeHandler}
          disabled={handleUserSave.isPending}
        />
        <DirectoryModalHeader
          addText={'Добавить'}
          textDesc={
            'Для добавления нового платежа, пожалуйста заполните все необходимые поля'
          }
          id={editUserId}
          Icon={BankIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          form={form}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <Form.Item
              label={t('Название провайдера')}
              name="name"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.middle_name.validation-message-required'),
                },
              ]}
            >
              <Input
                className="select-shadow"
                placeholder={t('Введите название')}
              />
            </Form.Item>
            <Form.Item
              label={t('Тип провайдера')}
              name="code"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.gender.validation-message-required'),
                },
              ]}
            >
              <CSelect
                placeholder={t('Введите')}
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
          </div>
          <Form.Item
            label={t('Поддерживаемые карты ')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <CSelect
              placeholder={t('Выберите')}
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
            label={t('Тип интеграции')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <CSelect
              placeholder={t('Выберите')}
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
            label={t('Документация')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <Input   addonBefore="https://" className="select-shadow" placeholder={t('Введите')} />
          </Form.Item>

          <Form.Item
            label={t('Валюты')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <CSelect
              placeholder={t('Выберите')}
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
          <div className="flex items-center gap-2">
            <Form.Item
              label={t('Лимиты')}
              name="refresh_rate"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.gender.validation-message-required'),
                },
              ]}
            >
              <CSelect
                placeholder={t('Выберите')}
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
              label={t('3DS поддержка')}
              name="status"
              rules={
                [
                  // {
                  //   required: true,
                  //   message: t('fields.login.validation-message-required'),
                  // },
                  // {
                  //   type: 'email',
                  //   message: t('fields.email.validation-message-invalid'),
                  // },
                ]
              }
            >
              <Switch
                className="select-shadow"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              />
            </Form.Item>
          </div>
          <Form.Item
            label={t('SLA / Время ответа')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <Input className="select-shadow" placeholder={t('Введите')} />
          </Form.Item>

          <Form.Item
            label={t('Статус')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.gender.validation-message-required'),
              },
            ]}
          >
            <CSelect
              placeholder={t('Выберите')}
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
            label={t('Комментарий')}
            name="comment"
            rules={
              [
                // {
                //   required: true,
                //   message: t('fields.login.validation-message-required'),
                // },
                // {
                //   type: 'email',
                //   message: t('fields.email.validation-message-invalid'),
                // },
              ]
            }
          >
            <TextArea
              className="select-shadow"
              placeholder={t('Введите комментарий...')}
              rows={5}
              style={{ resize: 'none' }}
            />
          </Form.Item>

          <div className="col-span-full mt-2 flex justify-center gap-4">
            <Button onClick={closeHandler} disabled={handleUserSave.isPending}>
              {t('common.cancel')}
            </Button>
            <Button
              color="default"
              variant="solid"
              htmlType="submit"
              loading={handleUserSave.isPending}
            >
              {editUserId ? t('Редактировать') : t('Добавить')}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default PaymentProvidersModal
