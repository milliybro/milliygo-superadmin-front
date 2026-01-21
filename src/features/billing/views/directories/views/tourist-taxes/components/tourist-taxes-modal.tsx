import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, DatePicker } from 'antd'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import useTouristTaxesStore from '../../../store/tourist-taxes-store'
import { createTouristTax, getTouristTax, updateTouristTax, } from '../../../api/getTouristTaxes'
import BuildingIcon from '@/components/icons/building'
import { ITouristTaxes } from '../../../types'
import useNotify from '@/hooks/useNotify'
import dayjs from 'dayjs'
import { BillingInputNumber } from '@/features/billing/components/billingInputNumber'
import { CalculationType, CitizenType, PlaceType } from '@/features/billing/enums/enums'
type FormValues = Omit<ITouristTaxes, 'id'>

const TouristTaxesModal = () => {
  const { t } = useTranslation()
  const { isModalOpen, closeModal , id: isEdit , clearId} = useTouristTaxesStore(state => state)
  const { openNotify, notificationPlace, notify } = useNotify()
  const [form] = Form.useForm<FormValues>()
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['tourist-tax', isEdit],
    queryFn: () => getTouristTax({ id: isEdit }),
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
        rate: Number(values?.rate),
        roomsFrom:  Number(values?.roomsFrom),
        roomsTo:  Number(values?.roomsTo),
      }

      if (isEdit) {
        return updateTouristTax({
          id: `${isEdit}`,
          queryParams: formattedValues,
        })
      }

      return createTouristTax(formattedValues)
    },
    onSuccess: () => {
      openNotification()
      closeHandler()
      queryClient.invalidateQueries({ queryKey: ['tourist-taxes'] })
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
      clearId()
    }
  }

  useEffect(() => {
    if (data && isEdit) {
      form.setFieldsValue({
        name: data?.name,
        placeType: data?.placeType,
        citizenship: data?.citizenship,
        roomsFrom: data?.roomsFrom,
        roomsTo: data?.roomsTo,
        rate: data?.rate,
        status: data?.status,
        actualFrom: data?.actualFrom && dayjs(data?.actualFrom),
        actualTo: data?.actualTo && dayjs(data?.actualTo),
        rateType: data?.rateType,
        description: data?.description,
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
          disabled={handleUserSave.isPending}
        />
        <DirectoryModalHeader
          addText={isEdit ? 'common.edit' : 'common.add'}
          textDesc={ isEdit ? 'common.modal_description_edit' : 'common.modal_description' }
          id={isEdit}
          Icon={BuildingIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          form={form}
          className="flex flex-col gap-2"
        >
          <div className="mb-4 flex h-[530px] flex-col gap-2 overflow-y-auto px-2">
            <Form.Item
              label={t('fields.name.label')}
              name="name"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.name.required'),
                },
              ]}
            >
              <Input className="select-shadow" placeholder={t('fields.name.placeholder')} />
            </Form.Item>

            <Form.Item
              label={t('fields.placeType.label')}
              name="placeType"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  message: t('fields.placeType.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.placeType.placeholder')}
                className="select-shadow"
                options={[
                  { label: t('billing.placeType.HOTEL'), value: PlaceType.HOTEL },
                  {
                    label: t('billing.placeType.HOUSEHOLDER'),
                    value: PlaceType.HOUSEHOLDER,
                  },
                  { label: t('billing.placeType.HOSTEL'), value: PlaceType.HOSTEL },
                  {
                    label: t('billing.placeType.GUEST_HOUSE'),
                    value: PlaceType.GUEST_HOUSE,
                  },
                  {
                    label: t('billing.placeType.APARTMENT'),
                    value: PlaceType.APARTMENT,
                  },
                  {
                    label: t('billing.placeType.PRIVATE_HOUSE'),
                    value: PlaceType.PRIVATE_HOUSE,
                  },
                  { label: t('billing.placeType.RESORT'), value: PlaceType.RESORT },
                  {
                    label: t('billing.placeType.SANATORIUM'),
                    value: PlaceType.SANATORIUM,
                  },
                  { label: t('billing.placeType.CAMPING'), value: PlaceType.CAMPING },
                  { label: t('billing.placeType.ALL'), value: PlaceType.ALL },
                ]}
              />
            </Form.Item>

            <div className="flex items-center gap-2">
              <Form.Item
                label={t('roomsFrom')}
                name="roomsFrom"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: true,
                    message: t('fields.roomsFrom.error'),
                  },
                ]}
              >
                <Input
                  type="number"
                  className="select-shadow"
                  placeholder={t('fields.rate.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('roomsTo')}
                name="roomsTo"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.roomsTo.error'),
                  },
                ]}
              >
                <Input
                  type="number"
                  className="select-shadow"
                  placeholder={t('fields.rate.placeholder')}
                />
              </Form.Item>
            </div>
            <Form.Item
              label={t('fields.calculationType.label')}
              name="rateType"
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
                const type = getFieldValue('rateType')

                return (
                  <Form.Item
                    label={type === CalculationType.PERCENTAGE  ? t('fields.percentage.label')  :  t('fields.amount.label')}
                    name="rate"
                    style={{ width: '100%' }}
                    rules={[
                      {
                        required: true,
                        message: t('fields.amount.error'),
                      },
                      {
                        min: 2,
                        max: type === CalculationType.PERCENTAGE ? 15 : undefined,
                        message: type === CalculationType.PERCENTAGE ? t('fields.percentage.error', { min: 2, max: 15 }) : '',
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
            <Form.Item
              label={t('fields.citizenship.label')}
              name="citizenship"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
                  // message: t('fields.citizenship.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.currency-type.placeholder')}
                className="select-shadow"
                options={[
                  {
                    label: t('billing.citizenship.local'),
                    value: CitizenType.LOCAL,
                  },
                  {
                    label: t('billing.citizenship.foreign'),
                    value: CitizenType.FOREIGN,
                  },
                ]}
              />
            </Form.Item>
            <div className="flex items-center gap-2">
              <Form.Item
                label={t('fields.periodFrom.label')}
                name="actualFrom"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.gender.validation-message-required'),
                  },
                ]}
              >
                <DatePicker
                  format={'DD-MM-YYYY'}
                  style={{ width: '100%' }}
                  placeholder={t('fields.periodFrom.placeholder')}
                />
              </Form.Item>
              <Form.Item
                label={t('fields.periodTo.label')}
                name="actualTo"
                style={{ width: '50%' }}
                rules={[
                  {
                    required: false,
                    message: t('fields.periodTo.error'),
                  },
                ]}
              >
                <DatePicker
                  format={'DD-MM-YYYY'}
                  style={{ width: '100%' }}
                  placeholder={t('fields.periodTo.placeholder')}
                />
              </Form.Item>
            </div>
     
            <Form.Item
              label={t('fields.status.label')}
              name="status"
              style={{ width: '100%' }}
              rules={[
                {
                  required: true,
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
                    value: 'ACTIVE',
                  },
                  {
                    label: t('common.inactive'),
                    value: 'INACTIVE',
                  },
                ]}
              />
            </Form.Item>
           <Form.Item label={t('fields.comment.label')} name="description">
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

export default TouristTaxesModal
