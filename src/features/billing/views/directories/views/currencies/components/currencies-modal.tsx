import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Space } from 'antd'
import CSelect from '@/components/ui/select'
import { createCurrency, getCurrency, updateCurrency, } from '../../../api/getCurrencies'
import CloseIcon from '@/components/icons/close-icon'
import MoneyIcon from '@/components/icons/money'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import useCurrenciesModalStore from '../../../store/currencies-modal-store'
import useNotify from '@/hooks/useNotify'
import { getCurrencyTypesList } from '../../../api/getCurrencyTypes'
import { mapToSelectOptions } from '@/features/billing/utils/mapToSelectOptions'
import { ICurrencies } from '../../../types'
import { BillingInputNumber } from '@/features/billing/components/billingInputNumber'

type FormValues = Pick<ICurrencies, 'currencyTypeId' | 'rate'>
const CurrencyModal = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { isModalOpen, closeModal , id:isEdit ,clearId} = useCurrenciesModalStore(state => state)

  const { openNotify, notificationPlace, notify } = useNotify()

  const [form] = Form.useForm<FormValues>()
  const [formToShow] = Form.useForm<any>()

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

  const { data } = useQuery<any>({
    queryKey: ['currency', isEdit],
    queryFn: () => getCurrency({ id: isEdit }),
    enabled: !!isEdit,
    staleTime: 1000,
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
        return updateCurrency({ id: `${isEdit}`, queryParams: formattedValues })
      }

      return createCurrency(formattedValues)
    },
    onSuccess: () => {
      // if (res) {
        openNotification()
        form.resetFields()
        // queryClient.invalidateQueries({ queryKey: ['currency', isEdit] })
        closeHandler()
        queryClient.invalidateQueries({ queryKey: ['currencies'] })
      // }
    },
    onError: () => {
      form.getFieldsError()
      notify.error({ message: 'Error', description: 'Error' })
    },
  })

  const closeHandler = () => {
    closeModal()
    form?.resetFields()
    formToShow?.resetFields()
    if (isEdit) {
      clearId()
    }
  }

  useEffect(() => {
    if (data && isEdit) {
      form.setFieldsValue({
        currencyTypeId: data?.currencyTypeId,
        rate: data?.rate,
      })
      formToShow.setFieldsValue({
        currencyTypeCode: data?.currencyTypeCode,
        currencyTypeSymbol: data?.currencyTypeSymbol ?  data?.currencyTypeSymbol : '-',
        currencyTypeTranslateName: data?.currencyTypeTranslateName,
        source: data?.source,
      })
    }
  }, [data, form, formToShow, isEdit])

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
          disabled={handleUserSave.isPending}
        />
        <DirectoryModalHeader
          addText={isEdit ? 'common.edit' : 'common.add'}
          textDesc={ isEdit ? 'common.modal_description_edit' : 'common.modal_description' }
          id={isEdit}
          Icon={MoneyIcon}
        />
        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          form={form}
          autoComplete="off"
          className="flex flex-col gap-2"
          id="onSave"
        >
          <Form.Item
            label={t('fields.currency-type.label')}
            name="currencyTypeId"
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: t('fields.currency-type.error'),
              },
            ]}
          >
            <CSelect
              showSearch
              placeholder={t('fields.currency-type.placeholder')}
              className="select-shadow"
              options={mapToSelectOptions(currencyTypes?.content, 'name', 'id')}
              optionFilterProp="label"
              filterOption={(input, option) =>
                String(option?.label) .toLowerCase() .includes(input.toLowerCase()) ||
                String(option?.data?.code) .toLowerCase() .includes(input.toLowerCase())
              }
              optionRender={option => (
                <Space> {option.data.code} - {option.data.label} </Space>
              )}
              labelRender={({ value, label }) => {
                const option = currencyTypes?.content.find(o => o.id === value)
                return (
                  <Space> {option?.code} - {label} </Space>
                )
              }}
            />
          </Form.Item>
          <Form.Item
            label={t('fields.rate.label')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: true,
                message: t('fields.rate.error'),
              },
            ]}
          >
               <BillingInputNumber placeholder={t('fields.rate.placeholder')} />
          </Form.Item>
        </Form>

        <Form
          layout="vertical"
          form={formToShow}
          autoComplete="off"
          className="mt-2 flex flex-col gap-2"
          name="formToShow"
        >
          <div className="flex items-center gap-2">
            <Form.Item
              label={t('fields.currency_code.label')}
              name="currencyTypeCode"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.currency_code.error'),
                },
              ]}
            >
              <Input
                className="select-shadow"
                placeholder={t('fields.currency_code.placeholder')}
                disabled
              />
            </Form.Item>
            <Form.Item
              label={t('fields.currency_name.label')}
              name="currencyTypeTranslateName"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.currency_name.error'),
                },
              ]}
            >
              <Input
                className="select-shadow"
                placeholder={t('fields.currency_name.placeholder')}
                disabled
              />
            </Form.Item>
          </div>

          {/* <div className="flex items-center gap-2"> */}
          <Form.Item
            label={t('fields.currency_symbol.label')}
            name="currencyTypeSymbol"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.currency_symbol.error'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.currency_symbol.placeholder')}
              disabled
            />

          </Form.Item>

          <Form.Item
            label={t('fields.course_source.label')}
            name="source"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.course_source.error'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.course_source.placeholder')}
              disabled
            />

          </Form.Item>
        </Form>
        <div className="col-span-full mt-6 flex justify-center gap-4">
          <Button onClick={closeHandler} disabled={handleUserSave.isPending}>
            {t('common.cancel')}
          </Button>
          <Button
            color="default"
            variant="solid"
            htmlType="submit"
            loading={handleUserSave.isPending}
            form="onSave"
          >
            {isEdit ? t('common.edit') : t('common.add')}
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default CurrencyModal
