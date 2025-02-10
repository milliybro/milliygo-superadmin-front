import { Flex, Form, Table, TableProps, Typography } from 'antd'
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

interface FormValues {
  username: string
  email: string
  password: string
}

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
    id: number
    name: string
    avg_rating: number
    address: string
    description: string
    facilities: Facility[]
    checkin_start: string
    checkout_end: string
    payment_types: PaymentType[]
  }
}

const HotelsItemContent = ({ data }: HotelContent) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  function formatTime(timeString: string | undefined): string {
    if (!timeString) return '' // Agar undefined bo'lsa, bo'sh string qaytar
    const [hours, minutes] = timeString.split(':') // Soat va daqiqalarni ajratib olamiz
    return `${hours}:${minutes}` // Faqat soat va daqiqalarni qaytaramiz
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: `${t('user.price')} (${t('preferences.night')})`,
      dataIndex: 'price',
      width: 282,

      render: (text, vals) => (
        <Flex align="center" gap={10} className=" font-semibold">
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
      icon: <LoginIcon className=" w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          {t('common.from')} {formatTime(data?.checkin_start)}
          <Typography.Text className="text-sm text-secondary">
            {t('hotels-page.check-in.desc')}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: '2',
      price: t('hotels-page.check-out.title'),
      icon: <LogoutIcon className=" w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          {t('common.to')} {formatTime(data?.checkout_end)}
        </Flex>
      ),
    },
    {
      key: '3',
      price: t('hotels-page.bed-for-child.title'),
      icon: <BedSingleIcon className="w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          <Typography.Text className=" font-medium">
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
        <Typography.Text className="text-secondary text-sm">
          {t('hotels-page.no-age.desc')}
        </Typography.Text>
      ),
    },
    {
      key: '6',
      price: t('hotels-page.pets.title'),
      icon: <PawPrintIcon className="w-[18px]" />,
      conditions: (
        <Typography.Text className="text-secondary text-sm">
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
                    src={item?.image}
                    className="rounded-lg"
                    alt="user avatar image"
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

  const onFinish = (values: FormValues) => {
    console.log('Form values:', values)
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
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.main-information')}
        </h2>
        <Divider />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="size-[80px] rounded-[8px] border border-border bg-secondary-light" />
            <div className="flex flex-col gap-[6px]">
              <div className="flex gap-3">
                <h3 className="text-2xl font-semibold text-[#232E40]">
                  {data?.name}
                </h3>
                <div className="flex items-center gap-2">
                  <RatingTag value={data?.avg_rating} icon />
                </div>
              </div>
              <a
                style={{ textDecoration: 'underline' }}
                className="text-[#2563EB] text-sm font-normal"
              >
                {data?.address}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CallIcon />
            <p className="text-2xl font-semibold text-[#3276FF]">
              71 207 12 34 (-)
            </p>
          </div>
        </div>
        <Divider />
        <p className="text-base font-normal">{data?.description}</p>
      </div>
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.facilities-and-services')}
        </h2>
        <Divider />
        <div className="grid grid-cols-5 gap-2">
          {data?.facilities.map(item => {
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 text-base font-normal text-[#232E40]"
              >
                <img src={item.icon} alt={item.name} />
                {item.name}
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-6 border rounded-[12px]">
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

export default HotelsItemContent
