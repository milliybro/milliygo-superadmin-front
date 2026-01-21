import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Button, Input, Flex, Typography } from 'antd'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import LetterIcon from '@/components/icons/letterIcon'
import { BillingInputNumber } from '@/features/billing/components/billingInputNumber'
import useOperatorCommissionModalStore from '../../../store/operator-commission-store'
import { IOperatorCommissions } from '../../../types'
import useNotify from '@/hooks/useNotify'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { mapToSelectOptions } from '@/features/billing/utils/mapToSelectOptions'
import { createOperatorCommission, getOperatorCommission, updateOperatorCommission, } from '../../../api/getOperatorCommissions'
import { CalculationType, ServiceType } from '@/features/billing/enums/enums'
type FormValues = Omit<IOperatorCommissions, 'id'>
const OperatorCommissionModal = () => {
  const { t } = useTranslation()
  const { isModalOpen, closeModal, id: isEdit, clearId, } = useOperatorCommissionModalStore(state => state)
  const queryClient = useQueryClient()
  const { openNotify, notificationPlace, notify } = useNotify()

  const [form] = Form.useForm<FormValues>()

  const closeHandler = () => {
    closeModal()
    form.resetFields()
    if (isEdit) {
      clearId()
    }
  }

  const { data } = useQuery({
    queryKey: ['operator-commission', isEdit],
    queryFn: () => getOperatorCommission({ id: isEdit }),
    enabled: !!isEdit,
    staleTime: 1000,
  })

  const openNotification = () => {
    openNotify({ edit: isEdit })
  }
  const LANGUAGES = [
    { lang: 'uz', name: 'Uzbek' },
    { lang: 'en', name: 'English (UK)' },
    { lang: 'ru', name: 'Russian' },
    { lang: 'ko', name: 'Korean' },
    { lang: 'tr', name: 'Turkish' },
    { lang: 'de', name: 'German' },
    { lang: 'fr', name: 'French' },
    { lang: 'it', name: 'Italian' },
    { lang: 'es', name: 'Spanish' },
    { lang: 'pt', name: 'Portuguese' },
    { lang: 'ar', name: 'Arabic' },
    { lang: 'zh-CN', name: 'Chinese' },
    { lang: 'ja', name: 'Japanese' },
    { lang: 'hi', name: 'Hindi' },
    { lang: 'ur', name: 'Urdu' },
    { lang: 'tg', name: 'Tajik' },
    { lang: 'kk', name: 'Kazakh' },
    { lang: 'ky', name: 'Kyrgyz' },
    { lang: 'tk', name: 'Turkmen' },
    { lang: 'az', name: 'Azerbaijani' },
  ]

  const handleSave = useMutation({
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
        amount: Number(values?.amount),
      }

      if (isEdit) {
        return updateOperatorCommission({
          id: `${isEdit}`,
          queryParams: formattedValues,
        })
      }

      return createOperatorCommission(formattedValues)
    },
    onSuccess: () => {
      openNotification()
      queryClient.invalidateQueries({ queryKey: ['operator-commissions'] })
      closeHandler()
    },
    onError: () => {
      form.getFieldsError()
      notify.error({ message: 'Error', description: 'Error' })
    },
  })

  useEffect(() => {
    if (data && isEdit) {
      form.setFieldsValue({
        amount: data?.amount,
        calculationType: data?.calculationType,
        serviceType: data?.serviceType,
        translates: data?.translates,
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
          textDesc={isEdit ? 'common.modal_description_edit' : 'common.modal_description' }
          id={isEdit}
          Icon={LetterIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleSave.mutate(values)}
          form={form}
          autoComplete='off'
          initialValues={{
            translates: [
              {
                lang: undefined,
                name: undefined,
                description: '',
              },
            ],
          }}
        >
          <div className="flex h-[610px] flex-col gap-2 overflow-y-auto px-2">
            <Form.Item
              label={t('fields.serviceType.label')}
              name="serviceType"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.serviceType.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.serviceType.placeholder')}
                className="select-shadow"
                options={[
                  {
                    label: t('billing.serviceType.TOUR'),
                    value: ServiceType.TOUR,
                  },
                  {
                    label: t('billing.serviceType.HOTEL'),
                    value: ServiceType.HOTEL,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={t('fields.calculationType.label')}
              name="calculationType"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.calculationType.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.calculationType.placeholder')}
                className="select-shadow"
                options={[
                  {
                    label: t('billing.calculation-type.fixed'),
                    value: CalculationType.FIXED,
                  },
                  {
                    label: t('billing.calculation-type.percentage'),
                    value: CalculationType.PERCENTAGE,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {({ getFieldValue }) => {
                const type = getFieldValue('calculationType')
                return (
                  <Form.Item
                    label={type === CalculationType.PERCENTAGE  ? t('fields.percentage.label')  :  t('fields.amount.label')}
                    name="amount"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message:  t('fields.amount.error'),
                      },
                      {
                        min: 0,
                        max: type === CalculationType.PERCENTAGE ? 100 : undefined,
                        message: type === CalculationType.PERCENTAGE ? t('fields.percentage.error',{ min: 0, max: 100 }) : '',
                        type: 'number',
                      },
                    ]}
                  >
                    <BillingInputNumber
                      addonAfter={type === CalculationType.PERCENTAGE ? '%' : undefined}
                      placeholder={type === CalculationType.PERCENTAGE  ? t('fields.percentage.placeholder'): t('fields.amount.placeholder')}
                    />
                  </Form.Item>
                )
              }}
            </Form.Item>

            <Typography.Title level={5} className="mb-0 mt-2 text-center">
              {t('fields.translates.label')}
            </Typography.Title>
            <Form.List name="translates">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex vertical key={key} gap={10} align="center">
                      <Form.Item
                        {...restField}
                        label={t('fields.language.label')}
                        name={[name, 'lang']}
                        style={{ width: '100%' }}
                        rules={[
                          {
                            required: true,
                            message: t('fields.language.error'),
                          },
                        ]}
                      >
                        <CSelect
                          placeholder={t('fields.language.placeholder')}
                          className="select-shadow"
                          options={mapToSelectOptions(
                            LANGUAGES,
                            'name',
                            'lang',
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[
                          { required: true, message: t('fields.name.required') },
                        ]}
                        style={{ width: '100%' }}
                        label={t('fields.name.label')}
                      >
                        <Input placeholder={t('fields.name.placeholder')} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        rules={[
                          {
                            required: false,
                            message: t('fields.description.error'),
                          },
                        ]}
                        label={t('fields.description.label')}
                        style={{ width: '100%' }}
                      >
                        <Input.TextArea
                          placeholder={t('fields.description.placeholder')}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="mx-auto  text-lg text-red-500"
                      />
                    </Flex>
                  ))}
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                    {t('common.add-field') }
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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

export default OperatorCommissionModal
