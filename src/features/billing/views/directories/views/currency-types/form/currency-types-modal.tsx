import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Button, Input, Flex, Typography } from 'antd'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import LetterIcon from '@/components/icons/letterIcon'
import { BillingInputNumber } from '@/features/billing/components/billingInputNumber'
import { ICurrencyTypes } from '../../../types'
import useNotify from '@/hooks/useNotify'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { createCurrencyType, getCurrencyType, updateCurrencyType, } from '../../../api/getCurrencyTypes'
import { mapToSelectOptions } from '@/features/billing/utils/mapToSelectOptions'
import useCurrencyTypesModalStore from '../../../store/currency-types-modal-store copy'
type FormValues = Omit<ICurrencyTypes, 'id'>
const CurrencyTypesModal = () => {
  const { t } = useTranslation()
  const { isModalOpen, closeModal ,id : isEdit, clearId } = useCurrencyTypesModalStore(state => state)
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
    queryKey: ['currency-type', isEdit],
    queryFn: () => getCurrencyType({ id: isEdit }),
    enabled: !!isEdit,
    staleTime: 1000,
  })

  const openNotification = () => {
    openNotify({ edit: isEdit })
  }
  const LANGUAGES = [
    { lang: 'UZ-LATIN', name: "O'zbek-Lotin" },
    { lang: 'UZ-CYRILLIC', name: "O'zbek-Kiril" },
    { lang: 'RU', name: 'Rus' },
    { lang: 'EN', name: 'Ingliz' },
  ]

  const handleSave = useMutation({
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
        isActive: values?.isActive === 1 ? true : false,
      }

      if (isEdit) {
        return updateCurrencyType({
          id: `${isEdit}`,
          queryParams: formattedValues,
        })
      }

      return createCurrencyType(formattedValues)
    },
    onSuccess: () => {
      openNotification()
      queryClient.invalidateQueries({ queryKey: ['currency-types'] })
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
        code: data?.code,
        translates: data.translates,
        numericCode: data?.numericCode,
        minorUnits: data?.minorUnits,
        symbol: data?.symbol,
        isActive: data?.isActive === true ? 1 : 0,
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
          textDesc={ isEdit ? 'common.modal_description_edit' : 'common.modal_description' }
          id={isEdit}
          Icon={LetterIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleSave.mutate(values)}
          form={form}
          autoComplete="off"
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
              label={t('fields.shortCode.label')}
              name="code"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.shortCode.error'),
                },
              ]}
            >
              <Input placeholder={t('fields.shortCode.placeholder')} />
            </Form.Item>

            <Form.Item
              label={t('fields.numericCode.label')}
              name="numericCode"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.numericCode.error'),
                },
              ]}
            >
              <Input
                placeholder={t('fields.numericCode.placeholder')}
              />
            </Form.Item>
            <Form.Item
              label={t('fields.minorUnits.label')}
              name="minorUnits"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.minorUnits.error'),
                },
              ]}
            >
              <BillingInputNumber
                placeholder={t('fields.minorUnits.placeholder')}
              />
            </Form.Item>

            <Form.Item
              label={t('fields.symbol.label')}
              name="symbol"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.symbol.error'),
                },
              ]}
            >
              <Input placeholder={t('fields.symbol.placeholder')} />
            </Form.Item>

            <Form.Item
              label={t('fields.status.label')}
              name="isActive"
              style={{ width: '100%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.status.validation-message-required'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.status.placeholder')}
                className="select-shadow"
                options={[
                  {
                    label: t('common.active'),
                    value: 1,
                  },
                  {
                    label: t('common.inactive'),
                    value: 0,
                  },
                ]}
              />
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
                          {
                            required: true,
                            message: t('fields.name.required'),
                          },
                        ]}
                        style={{ width: '100%' }}
                        label={t('fields.name.label')}
                      >
                        <Input placeholder={t('fields.name.placeholder')} />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className="mx-auto text-lg text-red-500"
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
                      {t('common.add-field')}
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

export default CurrencyTypesModal
