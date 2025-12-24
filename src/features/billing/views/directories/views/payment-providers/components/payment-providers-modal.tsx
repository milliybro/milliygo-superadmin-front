import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Space } from 'antd'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import usePaymentProvidersModalStore from '../../../store/payment-providers-store'
import { createPaymentProvider, getPaymentProvider, updatePaymentProvider, } from '../../../api/getPaymentProviders'
import BankIcon from '@/components/icons/bankIcon'
import useNotify from '@/hooks/useNotify'
import { IPaymentProviders } from '../../../types'
import { mapToSelectOptions } from '@/features/billing/utils/mapToSelectOptions'
import { getCurrencyTypesList } from '../../../api/getCurrencyTypes'
import { BillingInputNumber } from '@/features/billing/components/billingInputNumber'
type FormValues = Omit<IPaymentProviders, 'id'>

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

  const { data: currencyTypes } = useQuery({
    queryKey: ['currency-types'],
    queryFn: async () => {
      const res = await getCurrencyTypesList({
        size: 150,
        page: 0,
      })
      return res
    },
    enabled: isModalOpen,
  })

  const { data } = useQuery({
    queryKey: ['payment-provider', isEdit],
    queryFn: () => getPaymentProvider({ id: isEdit }),
    enabled: !!isEdit,
    staleTime: 1000, 
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
      // queryClient.invalidateQueries({ queryKey: ['payment-provider'] })
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
        type: data?.type,
        supportedCurrencies: data?.supportedCurrencies,
        code: data?.code,
        calculationType: data?.calculationType,
        commissionRate: data?.commissionRate,
        minAmount: data?.minAmount,
        maxAmount: data?.maxAmount,
        status: data?.status,
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
            <Form.Item
              label={t('fields.supportedCurrencies.label')}
              name="supportedCurrencies"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.supportedCurrencies.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.supportedCurrencies.placeholder')}
                showSearch
                className="select-shadow"
                options={mapToSelectOptions(
                  currencyTypes?.content,
                  'name',
                  'code',
                )}
                optionFilterProp="label"
                maxTagCount={3}
                mode="multiple"
                filterOption={(input, option) =>
                  String(option?.label) .toLowerCase() .includes(input.toLowerCase()) ||
                  String(option?.data?.code) .toLowerCase() .includes(input.toLowerCase())
                }
                optionRender={option => (
                  <Space>
                    {option.data.code} - {option.data.label}
                  </Space>
                )}
                labelRender={({ value }) => {
                  const option = currencyTypes?.content.find( o => o.code === value, )
                  return <Space> {option?.code} </Space>
                }}
              />
            </Form.Item>
           
            <Form.Item
              label={t('fields.calculationType.label')}
              name="calculationType"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.calculationType.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.calculationType.placeholder')}
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
              label={t('fields.commissionRate.label')}
              name="commissionRate"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.commissionRate.error'),
                },
              ]}
              
            >
              <Input
                addonAfter="%"
                type="number"
                className="select-shadow"
                placeholder={t('fields.commissionRate.placeholder')}
              />
            </Form.Item>
            <div className="flex items-center gap-2">
              <Form.Item
                label={t('fields.minAmount.label')}
                name="minAmount"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.minAmount.error'),
                  },
                ]}
              >
                  <BillingInputNumber placeholder={t('fields.minAmount.placeholder')} />
              </Form.Item>
              <Form.Item
                label={t('fields.maxAmount.label')}
                name="maxAmount"
                style={{ width: '100%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.maxAmount.error'),
                  },
                ]}
              >
                <BillingInputNumber  placeholder={t('fields.maxAmount.placeholder')} />
              </Form.Item>
            </div>
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
                  // {
                  //   label: t('DRAFT'),
                  //   value: 'DRAFT ',
                  // },
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
