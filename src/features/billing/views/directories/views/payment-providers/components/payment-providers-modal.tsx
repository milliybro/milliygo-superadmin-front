import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Switch, } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import usePaymentProvidersModalStore from '../../../store/payment-providers-store'
import { createPaymentProvider, getPaymentProvider, updatePaymentProvider, } from '../../../api/getPaymentProviders'
import BankIcon from '@/components/icons/bankIcon'
import useNotify from '@/hooks/useNotify'


interface UserModalProps {
  refetch: () => Promise<any>
}

const PaymentProvidersModal = ({ refetch }: UserModalProps) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const { openNotify, notificationPlace } = useNotify()
  const { isModalOpen, closeModal } = usePaymentProvidersModalStore(
    state => state,
  )

  const [form] = Form.useForm()

  const isEdit = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()
    if (isEdit) {
      navigate(pathname)
    }
  }

  const { data, refetch: fetching } = useQuery({
    queryKey: ['payment-provider', isEdit],
    queryFn: () => getPaymentProvider({ id: isEdit }),
    enabled: !!isEdit,
    refetchOnMount: 'always',
  })

  const openNotification = () => {
    openNotify({ edit: isEdit })
  }

  const handleUserSave = useMutation({
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
      }

      if (isEdit) {
        return updatePaymentProvider({
          id: isEdit,
          queryParams: formattedValues,
        })
      }

      return createPaymentProvider(formattedValues)
    },
    onSuccess: res => {
      // notification.success({
      //   message: isEdit
      //     ? t('fields.user-notification.edit.message')
      //     : t('fields.user-notification.add.message'),
      // })
      openNotification()
      form.resetFields()
      refetch()
      if (isEdit) {
        fetching()
      }

      closeHandler()
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  useEffect(() => {
    if (data && isEdit) {
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
      {notificationPlace}
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
          addText={isEdit ? 'common.edit' : 'common.add'}
          textDesc={ isEdit ? 'common.modal_description_edit': 'common.modal_description'}
          id={isEdit}
          Icon={BankIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          form={form}
          className="flex flex-col gap-2"
        >
          <div className="flex h-[520px] flex-col gap-2 overflow-y-auto px-2">
            <div className="flex items-center gap-2">
              <Form.Item
                label={t('fields.payment-providers.label')}
                name="name"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.payment-providers.error'),
                  },
                ]}
              >
                <Input
                  className="select-shadow"
                  placeholder={t('fields.payment-providers.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('fields.providers-type.label')}
                name="code"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.providers-type.error'),
                  },
                ]}
              >
                <CSelect
                  placeholder={t('fields.providers-type.placeholder')}
                  className="select-shadow"
                  options={[
                    {
                      label: t('LOCAL'),
                      value: 'LOCAL',
                    },
                    {
                      label: t('INTERNATIONAL'),
                      value: 'INTERNATIONAL',
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item
              label={t('fields.supported-cards.label')}
              name="rate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.supported-cards.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.supported-cards.placeholder')}
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
              label={t('fields.integration-type.label')}
              name="rate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.integration-type.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.integration-type.placeholder')}
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
              label={t('fields.documentation.label')}
              name="rate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.documentation.error'),
                },
              ]}
            >
              <Input
                addonBefore="https://"
                className="select-shadow"
                placeholder={t('fields.documentation.placeholder')}
              />
            </Form.Item>

            <Form.Item
              label={t('fields.currency.label')}
              name="rate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.currency.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.currency.placeholder')}
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
                label={t('fields.limits.label')}
                name="refresh_rate"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.limits.error'),
                  },
                ]}
              >
                <CSelect
                  placeholder={t('fields.limits.placeholder')}
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
              <Form.Item label={t('fields.3ds-support.label')} name="status">
                <Switch
                  className="select-shadow"
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </div>
            <Form.Item
              label={t('fields.response-time.label')}
              name="rate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.response-time.error'),
                },
              ]}
            >
              <Input
                className="select-shadow"
                placeholder={t('fields.response-time.placeholder')}
              />
            </Form.Item>

            <Form.Item
              label={t('fields.status.label')}
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
                placeholder={t('fields.status.placeholder')}
                className="select-shadow"
                options={[
                  {
                    label: t('common.active'),
                    value: 'ACTIVE',
                  },
                  {
                    label: t('common.inactive'),
                    value: 'INACTIVE',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item label={t('fields.comment.label')} name="comment">
              <Input.TextArea
                className="select-shadow"
                placeholder={t('fields.comment.placeholder')}
                rows={5}
                style={{ resize: 'none' }}
              />
            </Form.Item>
          </div>
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
              {isEdit ? t('common.edit') : t('common.add')}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default PaymentProvidersModal
