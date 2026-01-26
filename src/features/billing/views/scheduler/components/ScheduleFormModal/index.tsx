import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import useNotify from '@/hooks/useNotify.tsx'
import { Button, Form, Input, Modal } from 'antd'
import CloseIcon from '@/components/icons/close-icon.tsx'
import DirectoryModalHeader from '@/features/billing/views/directories/components/DirectoryModalHeader.tsx'
import {
  ISchedulerFormData,
  ISchedulerResponse,
} from '@/features/billing/views/scheduler/types'
import { useEffect, useMemo } from 'react'
import CalendarIcon from '@/components/icons/calendar.tsx'
import {
  useSchedulerCreateMutation,
  useSchedulerUpdateMutation,
} from '@/features/billing/views/scheduler/service'
import CSelect from '@/components/ui/select.tsx'
import { AxiosError } from 'axios'

interface IProps {
  closeModal: () => void
  isOpen: boolean
  rowData?: ISchedulerResponse
}


enum  PeriodicityEnum  {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY'
}

const hourOptions = Array.from({ length: 24 }, (_, index) => {
  const hour = index + 1
  const label = String(hour).padStart(2, '0') + ':00'
  return { label, value: hour }
})




export function ScheduleFormModal({ closeModal, isOpen, rowData }: IProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { openNotify, notificationPlace, notify } = useNotify()
  const [form] = Form.useForm()
  const isEdit = !!rowData
  const id = rowData?.id



  const peridiocityOptions = useMemo(() => [
    PeriodicityEnum.DAILY,
    PeriodicityEnum.WEEKLY,
    PeriodicityEnum.MONTHLY
  ]
    .map(option => ({label:t(`billing.schedule-page.${option}` ), value: option})),[])

  // Set form data initial if form is edit
  useEffect(() => {
    if (rowData) {
      form.setFieldsValue(rowData)
    } else {
      form.resetFields()
    }
  }, [form, rowData])

  const openNotification = () => {
    openNotify({ edit: id })
  }

  const { mutate: updateSchedule, isPending: updateSchedulePending } =
    useSchedulerUpdateMutation({
      onSuccess: () => {
        openNotification()
        queryClient.invalidateQueries({ queryKey: ['SCHEDULER_LIST'] })
        form.resetFields()
        closeHandler()
      },
      onError: (error) => {
        form.getFieldsError()
        if(error instanceof AxiosError) {
          notify.error({ message: error.response?.data?.code || error.message,
            description: error.response?.data?.message || error.message  })
        }
      },
    })
  const { mutate: createSchedule, isPending: createSchedulePending } =
    useSchedulerCreateMutation({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['SCHEDULER_LIST'] })
        openNotification()
        form.resetFields()
        closeHandler()
      },
      onError: (error) => {
        form.getFieldsError()
        if(error instanceof AxiosError) {
          notify.error({ message: error.response?.data?.code || error.message,
            description: error.response?.data?.message || error.message  })
        }
      },
    })

  const onSubmit = (values: ISchedulerFormData) => {
    if (isEdit) {
      const payload = {
        ...values,
        id: rowData?.id,
        isActive: rowData?.isActive,
      } as Required<ISchedulerFormData>
      updateSchedule(payload)
      return
    }
    createSchedule(values)
  }

  const closeHandler = () => {
    closeModal()
    form?.resetFields()
  }

  return (
    <>
      {notificationPlace}
      <Modal
        title={null}
        open={isOpen}
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
          disabled={isEdit ? updateSchedulePending : createSchedulePending}
        />
        <DirectoryModalHeader
          addText={isEdit ? 'common.edit' : 'common.add'}
          textDesc={
            isEdit
              ? 'common.modal_description_edit'
              : 'common.modal_description'
          }
          id={id}
          Icon={CalendarIcon}
        />
        <Form
          id="schedule-form"
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          autoComplete="off"
          className="mt-2 flex flex-col gap-2"
          name="form"
        >
          <Form.Item
            label={t('billing.schedule-page.name')}
            name="name"
            rules={[
              {
                required: true,
                message: t('fields.scheduler.name.error'),
              },
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.scheduler.name.placeholder')}
            />
          </Form.Item>

          {/* <div className="flex items-center gap-2"> */}
          <Form.Item
            label={t('billing.schedule-page.periodicity')}
            name="periodicity"
            rules={[
              {
                required: true,
                message: t('fields.scheduler.periodicity.error'),
              },
            ]}
          >
            <CSelect
              options={peridiocityOptions}
              className="select-shadow"
              placeholder={t('fields.scheduler.periodicity.placeholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('billing.schedule-page.day')}
            name="day"
            dependencies={['periodicity']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const periodicity = getFieldValue('periodicity')
                  if (!periodicity || periodicity === PeriodicityEnum.DAILY) {
                    return Promise.resolve()
                  }

                  if (value === undefined || value === null || value === '') {
                    return Promise.reject(
                      new Error(
                        periodicity === PeriodicityEnum.WEEKLY
                          ? t('fields.scheduler.day.week-error-message')
                          : t('fields.scheduler.day.month-error-message')
                      )
                    )
                  }

                  const numericValue = Number(value)
                  const isInteger = Number.isInteger(numericValue)

                  if (periodicity === PeriodicityEnum.WEEKLY) {
                    if (isInteger && numericValue >= 1 && numericValue <= 7) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(t('fields.scheduler.day.week-error-message'))
                    )
                  }

                  if (periodicity === PeriodicityEnum.MONTHLY) {
                    if (isInteger && numericValue >= 1 && numericValue <= 31) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(t('fields.scheduler.day.month-error-message'))
                    )
                  }

                  return Promise.resolve()
                },
              }),
            ]}
          >
            <Input
              className="select-shadow"
              placeholder={t('fields.scheduler.day.placeholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('billing.schedule-page.scheduleHours')}
            name="scheduleHours"
            rules={[
              {
                required: true,
                message: t('fields.scheduler.schedule-hours.error'),
              },
            ]}
          >
            <CSelect
              className="select-shadow"
              mode="multiple"
              options={hourOptions}
              placeholder={t('fields.scheduler.schedule-hours.placeholder')}
            />
          </Form.Item>
          <div className="col-span-full mt-6 flex justify-center gap-4">
            <Button
              onClick={closeHandler}
              disabled={isEdit ? updateSchedulePending : createSchedulePending}
            >
              {t('common.cancel')}
            </Button>
            <Button
              color="default"
              variant="solid"
              htmlType="submit"
              loading={isEdit ? updateSchedulePending : createSchedulePending}
              form="schedule-form"
            >
              {isEdit ? t('common.edit') : t('common.add')}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
