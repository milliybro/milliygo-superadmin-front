import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Button, DatePicker, Input, Flex, Typography } from 'antd'
import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import useSubscriberServicesModalStore from '../../../store/subscriber-services-store'
import {
  createSubscriberService,
  getSubscriberService,
  updateSubscriberService,
} from '../../../api/getSubscriberServices'
import LetterIcon from '@/components/icons/letterIcon'
import { BillingInputNumber } from '@/features/billing/components/billingInputNumber'
import { ISubscriberServices } from '../../../types'
import dayjs from 'dayjs'
import useNotify from '@/hooks/useNotify'
import { mapToSelectOptions } from '@/features/billing/utils/mapToSelectOptions'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
type FormValues = Omit<ISubscriberServices, 'id'>
const SubscriberServicesModal = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isModalOpen, closeModal } = useSubscriberServicesModalStore(
    state => state,
  )
  const queryClient = useQueryClient()
  const { openNotify, notificationPlace, notify } = useNotify()

  const [form] = Form.useForm<FormValues>()
  const isEdit = searchParams.get('edit')

  const closeHandler = () => {
    closeModal()
    form.resetFields()
    if (isEdit) {
      navigate(pathname)
    }
  }

  const { data } = useQuery({
    queryKey: ['subscriber-service', isEdit],
    queryFn: () => getSubscriberService({ id: isEdit }),
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
        checkoutFrom: Number(values?.checkoutFrom),
        checkoutsTo: Number(values?.checkoutsTo),
      }

      if (isEdit) {
        return updateSubscriberService({
          id: isEdit,
          queryParams: formattedValues,
        })
      }

      return createSubscriberService(formattedValues)
    },
    onSuccess: () => {
      openNotification()
      queryClient.invalidateQueries({ queryKey: ['subscriber-services'] })
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
        status: data?.status,
        amount: data?.amount,
        calculationType: data?.calculationType,
        checkoutFrom: data?.checkoutFrom,
        checkoutsTo: data?.checkoutsTo,
        activeFrom: dayjs(data?.activeFrom),
        activeTo: dayjs(data?.activeTo),
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
          textDesc={ isEdit ? 'common.modal_description_edit' : 'common.modal_description' }
          id={isEdit}
          Icon={LetterIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleSave.mutate(values)}
          form={form}
          className="flex flex-col gap-2"
          initialValues={{
            translates: [
              {
                lang: undefined,
                name: undefined,
              },
            ],
          }}
        >
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
            label={t('fields.amount.label')}
            name="amount"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.amount.error'),
              },
            ]}
          >
            <BillingInputNumber placeholder={t('fields.amount.placeholder')} />
          </Form.Item>

          <div className="flex items-center gap-2">
            <Form.Item
              label={t('checkoutFrom')}
              name="checkoutFrom"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.gender.validation-message-required'),
                },
              ]}
            >
              <BillingInputNumber placeholder="checkoutFrom" />
            </Form.Item>
            <Form.Item
              label={t('checkoutsTo')}
              name="checkoutsTo"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.gender.validation-message-required'),
                },
              ]}
            >
              <BillingInputNumber placeholder="checkoutsTo" />
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
              ]}
            />
          </Form.Item>
          <div className="flex items-center gap-2">
            <Form.Item
              label={t('fields.periodFrom.label')}
              name="activeFrom"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.periodFrom.error'),
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
              name="activeTo"
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
                        options={mapToSelectOptions(LANGUAGES, 'name', 'lang')}
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

export default SubscriberServicesModal
