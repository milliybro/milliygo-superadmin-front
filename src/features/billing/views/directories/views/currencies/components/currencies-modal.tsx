import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Modal, Form, Input, Button, Switch } from 'antd'
import CSelect from '@/components/ui/select'
import { createCurrency, getCurrency, updateCurrency, } from '../../../api/getCurrencies'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import CloseIcon from '@/components/icons/close-icon'
import MoneyIcon from '@/components/icons/money'
import DirectoryModalHeader from '../../../components/DirectoryModalHeader'
import useCurrenciesModalStore from '../../../store/currencies-modal-store'
import useNotify from '@/hooks/useNotify'

interface FormValues {
  code: string
  name: string
  symbol: string
  uzs_rate: string
  rate: string
  refresh_rate: string
  status: boolean
  comment: string
}
const CurrencyModal = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { pathname } = useLocation()
  const { isModalOpen, closeModal } = useCurrenciesModalStore(state => state)

  const { openNotify, notificationPlace } = useNotify()

  const [form] = Form.useForm<FormValues>()
  const statusValue = Form.useWatch('status', form)
  const isEdit = searchParams.get('edit')

  const { data } = useQuery({
    queryKey: ['currency', isEdit],
    queryFn: () => getCurrency({ id: isEdit }),
    enabled: !!isEdit,
    refetchOnMount: 'always',
  })

  const openNotification = () => {
    openNotify({edit:isEdit})
  }

  const handleUserSave = useMutation({
    mutationFn: (values: any) => {
      const formattedValues = {
        ...values,
      }

      if (isEdit) {
        return updateCurrency({ id: isEdit, queryParams: formattedValues })
      }

      return createCurrency(formattedValues)
    },
    onSuccess: res => {
      if (res) {
        openNotification()
        form.resetFields()
        // queryClient.invalidateQueries({ queryKey: ['currency', isEdit] })
        closeHandler()
        queryClient.invalidateQueries({ queryKey: ['currencies'] })
      }
    },
    onError: () => {
      form.getFieldsError()
    },
  })

  const closeHandler = () => {
    closeModal()
    form?.resetFields()
    if (isEdit) {
      navigate(pathname)
    }
  }

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
        status: data?.status ? true : false,
        comment: data?.comment,
      })
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
          addText={'common.add'}
          textDesc={'common.modal_description'}
          id={isEdit}
          Icon={MoneyIcon}
        />

        <Form
          layout="vertical"
          onFinish={values => handleUserSave.mutate(values)}
          form={form}
          autoComplete="off"
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <Form.Item
              label={t('fields.currency_code.label')}
              name="code"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.currency_code.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.currency_code.placeholder')}
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
              label={t('fields.currency_name.label')}
              name="name"
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
              />
            </Form.Item>
          </div>

          <div className="flex items-center gap-2">
            <Form.Item
              label={t('fields.currency_symbol.label')}
              name="symbol"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.currency_symbol.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.currency_symbol.placeholder')}
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
              label={t('fields.course_uzs.label')}
              name="uzs_rate"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.course_uzs.error'),
                },
              ]}
            >
              <Input
                className="select-shadow"
                placeholder={t('fields.course_uzs.placeholder')}
              />
            </Form.Item>
          </div>
          <Form.Item
            label={t('fields.course_source.label')}
            name="rate"
            style={{ width: '100%' }}
            rules={[
              {
                required: false,
                message: t('fields.course_source.error'),
              },
            ]}
          >
            <CSelect
              placeholder={t('fields.course_source.placeholder')}
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
              label={t('fields.refresh_rate.label')}
              name="refresh_rate"
              style={{ width: '50%' }}
              rules={[
                {
                  required: false,
                  message: t('fields.refresh_rate.error'),
                },
              ]}
            >
              <CSelect
                placeholder={t('fields.refresh_rate.placeholder')}
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
            <Form.Item label={t('fields.status.label')} name="status">
              <Switch
                className="select-shadow"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
              ></Switch>
            </Form.Item>
            <span className="mt-6">
              {statusValue == true ? t('common.active') : t('common.inactive')}
            </span>
          </div>

          <Form.Item
            label={t('fields.comment.label')}
            name="comment"
          >
            <Input.TextArea
              className="select-shadow"
              placeholder={t('fields.comment.placeholder')}
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
              {isEdit ? t('common.edit') : t('common.add')}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default CurrencyModal
