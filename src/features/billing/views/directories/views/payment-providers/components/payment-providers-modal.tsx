import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button } from 'antd'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import usePaymentProvidersModalStore from '../../../store/payment-providers-store'
import { createPaymentProvider, getPaymentProvider, updatePaymentProvider, } from '../../../api/getPaymentProviders'
import BankIcon from '@/components/icons/bankIcon'
import useNotify from '@/hooks/useNotify'
import { IPaymentProviders } from '../../../types'
type FormValues = Pick<IPaymentProviders, 'name'>

const PaymentProvidersModal = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openNotify, notificationPlace, notify } = useNotify()
  const { isModalOpen, closeModal } = usePaymentProvidersModalStore( state => state, )
  const queryClient = useQueryClient()

  const [form] = Form.useForm<FormValues>()

  const isEdit = searchParams.get('edit')

  const { data } = useQuery({
    queryKey: ['payment-provider', isEdit],
    queryFn: () => getPaymentProvider({ id: isEdit }),
    enabled: !!isEdit,
  })

  const openNotification = () => {
    openNotify({ edit: isEdit })
  }

  const handleSave = useMutation({
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
        minAmount: Number(values.minAmount),
        maxAmount: Number(values.maxAmount),
        commissionRate: Number(values.commissionRate),
      }

      if (isEdit) {
        return updatePaymentProvider({
          id: isEdit,
          queryParams: formattedValues,
        })
      }

      return createPaymentProvider(formattedValues)
    },
    onSuccess: () => {
      openNotification()
      closeHandler()
      queryClient.invalidateQueries({ queryKey: ['payment-providers'] })
    },
    onError: () => {
      form.getFieldsError()
      notify.error({ message: 'Error', description: 'Error' })
    },
  })

  const closeHandler = () => {
    closeModal()
    form.resetFields()
    if (isEdit) {
      navigate(pathname)
    }
  }

  useEffect(() => {
    if (data && isEdit) {
      form.setFieldsValue({
        name: data?.name,
      })
    }
  }, [data, form, isEdit])

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
      >
        <Button
          className="absolute right-[10px] top-[10px]"
          type="text"
          icon={<CloseIcon className="text-base" />}
          onClick={closeHandler}
          disabled={handleSave.isPending}
        />
        <DirectoryModalHeader
          addText={isEdit ? 'common.edit' : 'common.add'}
          textDesc={
            isEdit
              ? 'common.modal_description_edit'
              : 'common.modal_description'
          }
          id={isEdit}
          Icon={BankIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleSave.mutate(values)}
          form={form}
          className="flex flex-col gap-2"
        >
          <div className="flex h-[530px] flex-col gap-2 overflow-y-auto px-2">
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
                name="type"
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
              label={t('supportedCurrencies')}
              name="supportedCurrencies"
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
                mode="multiple"
                maxTagCount={1}
                options={[
                  {
                    label: t('string1'),
                    value: 'string1',
                  },
                  {
                    label: t('string2'),
                    value: 'string2',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={t('code')}
              name="code"
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
                    label: t('CLICK'),
                    value: 'CLICK',
                  },
                ]}
              />
            </Form.Item>

            {/* <Form.Item
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
            </Form.Item> */}

            {/* <Form.Item
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
            </Form.Item> */}
            <div className="flex items-center gap-2">
              <Form.Item
                label={t('minAmount')}
                name="minAmount"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.response-time.error'),
                  },
                ]}
              >
                <Input
                  type="number"
                  className="select-shadow"
                  placeholder={t('fields.response-time.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('maxAmount')}
                name="maxAmount"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.response-time.error'),
                  },
                ]}
              >
                <Input
                  type="number"
                  className="select-shadow"
                  placeholder={t('fields.response-time.placeholder')}
                />
              </Form.Item>
            </div>
            <Form.Item
              label={t('commissionType')}
              name="commissionType"
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
                    label: t('PERCENTAGE'),
                    value: 'PERCENTAGE',
                  },
                  {
                    label: t('FIXED'),
                    value: 'FIXED',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={t('commissionRate')}
              name="commissionRate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.response-time.error'),
                },
              ]}
            >
              <Input
                type="number"
                className="select-shadow"
                placeholder={t('fields.response-time.placeholder')}
              />
            </Form.Item>
            {/* <Form.Item
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
            </Form.Item> */}

            <Form.Item
              label={t('fields.status.label')}
              name="status"
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
                  {
                    label: t('DRAFT'),
                    value: 'DRAFT ',
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="col-span-full mt-2 flex justify-center gap-4">
            <Button onClick={closeHandler} disabled={handleSave.isPending}>
              {t('common.cancel')}
            </Button>
            <Button
              color="default"
              variant="solid"
              htmlType="submit"
              loading={handleSave.isPending}
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
