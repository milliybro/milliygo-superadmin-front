import { Flex, Form, Image, Table, TableProps, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Divider, message } from 'antd'

import RatingTag from '@/components/ui/rating-tag'
import CallIcon from '@/components/icons/call-icon'
import { ReactNode } from 'react'
import LoginIcon from '@/components/icons/login-icon'
import LogoutIcon from '@/components/icons/login-icon'
import BedSingleIcon from '@/components/icons/bed-icon'
import UserOutlinedIcon from '@/components/icons/user-circle-icon'
import PawPrintIcon from '@/components/icons/paw-icon'
import CardIcon from '@/components/icons/card-icon'
import HotelIcon from '@/components/icons/hotel'
import AddressCell from '../components/address-cell'

interface DataType {
  key: any
  price: any
  conditions: ReactNode
  icon?: ReactNode
}

interface TableType {
  key: any
  price: any
  conditions: ReactNode
  icon?: ReactNode
}

interface Facility {
  id: number
  name: string
  icon: string
}

interface PaymentType {
  id: number
  name: string
  image: string
}

interface HotelContent {
  data: {
    placement_detail: {
      checkin_start: string
      checkout_end: string
      description: string
      address: string
      avg_rating: string
      name: string
    }
    image_url: string
    placement_facilities: any
    id: number
    name: string
    rating: number
    address: string
    description: string
    facilities: Facility[]
    checkin_start: string
    checkout_end: string
    payment_types: PaymentType[]
    apartment_name: string
    phone: string
    lat: number
    long: number
  }
}

const LandlordsItemContent = ({ data }: HotelContent) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  function formatTime(timeString: string | undefined): string {
    if (!timeString) return ''
    const [hours, minutes] = timeString.split(':')
    return `${hours}:${minutes}`
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: `${t('user.price')} (${t('preferences.night')})`,
      dataIndex: 'price',
      width: 282,

      render: (text, vals) => (
        <Flex align="center" gap={10} className="font-semibold">
          {vals.icon} {text}
        </Flex>
      ),
    },
    {
      title: t('user.condition'),
      dataIndex: 'conditions',
    },
  ]

  const dataTable: TableType[] = [
    {
      key: '1',
      price: t('hotels-page.check-in.title'),
      icon: <LoginIcon className="w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          {t('common.time-from', {
            value: formatTime(data?.checkin_start),
          })}
        </Flex>
      ),
    },
    {
      key: '2',
      price: t('hotels-page.check-out.title'),
      icon: <LogoutIcon className="w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          {t('common.time-to', {
            value: formatTime(data?.checkout_end),
          })}
        </Flex>
      ),
    },
    {
      key: '3',
      price: t('hotels-page.bed-for-child.title'),
      icon: <BedSingleIcon className="w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          <Typography.Text className="font-medium">
            {t('hotels-page.bed-for-child.desc')}
          </Typography.Text>

          <Typography.Text className="text-sm text-secondary">
            {t('hotels-page.bed-for-child.text1')}
          </Typography.Text>
          <Typography.Text className="text-sm text-secondary">
            {t('hotels-page.bed-for-child.text2')}
          </Typography.Text>
          <Typography.Text className="text-sm text-secondary">
            {t('hotels-page.bed-for-child.text3')}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: '5',
      price: t('hotels-page.no-age.title'),
      icon: <UserOutlinedIcon className="w-[18px]" />,
      conditions: (
        <Typography.Text className="text-sm text-secondary">
          {t('hotels-page.no-age.desc')}
        </Typography.Text>
      ),
    },
    {
      key: '6',
      price: t('hotels-page.pets.title'),
      icon: <PawPrintIcon className="w-[18px]" />,
      conditions: (
        <Typography.Text className="text-sm text-secondary">
          {t('hotels-page.pets.desc')}
        </Typography.Text>
      ),
    },
    {
      key: '7',
      price: t('hotels-page.card.title'),
      icon: <CardIcon className="w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          <Flex gap={16}>
            <>
              {data?.payment_types.map((item, index) => {
                return (
                  <img
                    width={24}
                    key={index}
                    src={`https://api.emehmon.xdevs.uz/media/${item?.image}`}
                    className="rounded-lg"
                    alt="image"
                  />
                )
              })}
            </>
          </Flex>
          <Typography.Text className="text-sm text-secondary">
            {data?.name}
            {t('hotels-page.card.desc')}
          </Typography.Text>
        </Flex>
      ),
    },
  ]

  const onFinish = () => {
    message.success('Форма успешно отправлена!')
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="hotelContentForm"
      className="flex flex-col gap-6"
    >
      <div className="rounded-[12px] border border-border p-6">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.main-information')}
        </h2>
        <Divider />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {data?.image_url ? (
              <Image
                width={80}
                height={80}
                className="object-cover"
                src={data?.image_url}
              />
            ) : (
              <div className="flex size-[80px] flex-col items-center justify-center rounded-[8px] border border-border bg-secondary-light">
                <HotelIcon fontSize={48} />
              </div>
            )}
            <div className="flex flex-col gap-[6px]">
              <div className="flex gap-3">
                <h3 className="text-2xl font-semibold text-[#232E40]">
                  {data?.apartment_name}
                </h3>
                <div className="flex items-center gap-2">
                  <RatingTag value={data?.rating} icon />
                </div>
              </div>
              <a
                style={{ textDecoration: 'underline' }}
                className="text-sm font-normal text-[#2563EB]"
              >
                <AddressCell lat={data?.lat} lon={data?.long} />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CallIcon />
            <p className="text-2xl font-semibold text-[#3276FF]">
              {data?.phone}
            </p>
          </div>
        </div>
        <Divider />
        <p className="text-base font-normal">{data?.description}</p>
      </div>
      <div className="rounded-[12px] border border-border p-6">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.facilities-and-services')}
        </h2>
        <Divider />
        <div className="grid grid-cols-5 gap-2">
          {data?.facilities.map((item: any) => {
            return (
              <div
                key={item?.id}
                className="flex items-center gap-2 text-base font-normal text-[#232E40]"
              >
                <img
                  className="w-6"
                  src={`https://api.emehmon.xdevs.uz/media/${item?.icon}`}
                  alt={item?.name}
                />
                <Tooltip
                  title={item?.name}
                  color="white"
                  overlayInnerStyle={{ color: 'black', textAlign: 'center' }}
                  className="line-clamp-2"
                >
                  {item?.name}
                </Tooltip>
              </div>
            )
          })}
        </div>
      </div>

      <div className="rounded-[12px] border p-6">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.accommodation-terms')}
        </h2>
        <Divider />

        <Table
          columns={columns}
          dataSource={dataTable}
          pagination={false}
          showHeader={false}
        />
      </div>
    </Form>
  )
}

export default LandlordsItemContent
