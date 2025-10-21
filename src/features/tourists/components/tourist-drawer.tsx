import { useTranslation } from 'react-i18next'
import { Button, Divider, Drawer, Typography } from 'antd'
import CloseIcon from '@/components/icons/close-icon'
import { useQuery } from '@tanstack/react-query'
import { getTourist } from '../api'
import { useSearchParams } from 'react-router'

interface IProps {
  open: boolean
  onClose: () => void
}

const TouristDrawer = ({ open, onClose }: IProps) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id') || ''

  const { data } = useQuery({
    queryKey: ['tourist', id],
    queryFn: async () => {
      const res = await getTourist({ id: id })
      return res
    },
    enabled: !!id,
    // keepPreviousData: true,
  })

  const fields = [
    {
      label: t('fields.fullname.label'),
      value: `${data?.first_name} ${data?.last_name} ${data?.middle_name}`,
    },
    {
      label: t('fields.citizenship.label'),
      value: data?.user_information?.country,
    },
    {
      label: t('common.nation'),
      value: data?.user_information?.nationality,
    },
    {
      label: t('fields.birth-country.label'),
      value: data?.user_information?.birthcountry,
    },
    {
      label: t('common.birthdate'),
      value: data?.user_information?.birth_date,
    },
    {
      label: t('fields.gender.label'),
      value: data?.user_information?.gender,
    },
    {
      label: t('fields.type-document.label'),
      value: data?.user_information?.document_type,
    },
    {
      label: t('fields.passport-info.label'),
      value: data?.passport_sn,
    },
    {
      label: t('fields.passport-issued-date.label'),
      value: data?.user_information?.doc_given_date,
    },
    {
      label: t('fields.passport-issued-by.label'),
      value: data?.user_information?.docgiveplace,
    },
    {
      label: t('fields.destination-country.label'),
      value: '',
    },
    {
      label: t('fields.tourist-arrival-date.label'),
      value: data?.user_information?.day_of_tourist_arrival,
    },
    {
      label: t('fields.tourist-departure-date.label'),
      value: data?.user_information?.day_of_tourist_departure,
    },
    {
      label: t('fields.place-of-registration.label'),
      value: '',
    },
    {
      label: t('fields.arrival-destination.label'),
      value: data?.user_information?.purpose_of_arrival,
    },
    {
      label: t('fields.kpp.number'),
      value: '',
    },
    {
      label: t('fields.kpp.entry-date'),
      value: '',
    },
    {
      label: t('fields.type-guest.label'),
      value: data?.user_information?.guest_type,
    },
  ]

  const visaInfo = [
    {
      label: t('fields.visa.visa-type'),
      value: data?.visa_information?.visa_type,
    },
    {
      label: t('fields.visa.number-visa'),
      value: data?.visa_information?.visa_number,
    },
    {
      label: t('fields.visa.visa-issued-by'),
      value: data?.visa_information?.visa_issued_by,
    },
    {
      label: t('fields.visa.visa-issued-date'),
      value: data?.visa_information?.visa_issue_date,
    },
    {
      label: t('fields.visa.visa-expiry-date'),
      value: data?.visa_information?.visa_expiry_date,
    },
  ]

  const childInfo = [
    {
      label: t('fields.child.fullname'),
      value: data?.child_information?.full_name,
    },
    {
      label: t('fields.gender.label'),
      value: data?.child_information?.gender,
    },
    {
      label: t('fields.passport-info.label'),
      value: data?.child_information?.passport_serial_number,
    },
    {
      label: t('fields.child.birth-date'),
      value: data?.child_information?.birth_date,
    },
    {
      label: t('fields.child.departure-date'),
      value: data?.child_information?.day_of_departure,
    },
  ]
  return (
    <>
      <Drawer
        bodyStyle={{ padding: 0 }}
        width={500}
        title={
          <Typography.Text className="text-lg font-medium">
            {t('tourists.tourist-information')}
          </Typography.Text>
        }
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <>
            <Button onClick={onClose} className="border-none p-0">
              <CloseIcon className="text-xl" />
            </Button>
          </>
        }
      >
        <div className="mt-6 px-4">
          <Typography.Text className="text-base font-bold">
            {t('tourists.main-information')}
          </Typography.Text>
          <div className="mt-4 flex flex-col gap-4">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between"
              >
                <Typography.Text className="text-sm font-normal">
                  {field.label}:
                </Typography.Text>
                <Typography.Text className="text-sm font-medium">
                  {field.value}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div className="mt-6 px-4">
          <Typography.Text className="text-base font-bold">
            {t('tourists.visa-information')}
          </Typography.Text>
          <div className="mt-4 flex flex-col gap-4">
            {visaInfo.map((field, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between"
              >
                <Typography.Text className="text-sm font-normal">
                  {field.label}:
                </Typography.Text>
                <Typography.Text className="text-sm font-medium">
                  {field.value}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div className="mb-6 mt-6 px-4">
          <Typography.Text className="text-base font-bold">
            {t('tourists.under-chilren')}
          </Typography.Text>
          <div className="mt-4 flex flex-col gap-4">
            {childInfo.map((field, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between"
              >
                <Typography.Text className="text-sm font-normal">
                  {field.label}:
                </Typography.Text>
                <Typography.Text className="text-sm font-medium">
                  {field.value}
                </Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default TouristDrawer
