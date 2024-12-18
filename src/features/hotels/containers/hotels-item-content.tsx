import { Avatar, Flex, Form, Table, TableProps, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Divider, message } from 'antd'

import RatingTag from '@/components/ui/rating-tag'
import CallIcon from '@/components/icons/call-icon'
import WifiIcon from '@/components/icons/wifi-icon'
import TvIcon from '@/components/icons/tv-icon'
import MachineIcon from '@/components/icons/machine-icon'
import MicrowaveIcon from '@/components/icons/microwave-icon'
import CameraIcon from '@/components/icons/camera-icon'
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

const HotelsItemContent = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

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

  const data: DataType[] = [
    {
      key: '1',
      price: t('hotels-page.check-in.title'),
      icon: <LoginIcon className=" w-[18px]" />,
      conditions: (
        <Flex vertical gap={8}>
          с 14:00
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
          до 12:00
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
              <Avatar
                size={24}
                shape="square"
                className="rounded-lg bg-secondary/20 animate-pulse"
                alt="user avatar image"
              />
              <Avatar
                size={24}
                shape="square"
                className="rounded-lg bg-secondary/20 animate-pulse"
                alt="user avatar image"
              />
              <Avatar
                size={24}
                shape="square"
                className="rounded-lg bg-secondary/20 animate-pulse"
                alt="user avatar image"
              />
              <Avatar
                size={24}
                shape="square"
                className="rounded-lg bg-secondary/20 animate-pulse"
                alt="user avatar image"
              />
            </>
          </Flex>
          <Typography.Text className="text-sm text-secondary">
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
                  Hyatt Regency Tashkent
                </h3>
                <div className="flex items-center gap-2">
                  <RatingTag value={8.9} icon />
                </div>
              </div>
              <a
                style={{ textDecoration: 'underline' }}
                className="text-[#2563EB] text-sm font-normal"
              >
                Лабзак (Ц-13) ж/м, Шайхантахурский район, Ташкент
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CallIcon />
            <p className="text-2xl font-semibold text-[#3276FF]">
              71 207 12 34
            </p>
          </div>
        </div>
        <Divider />
        <p className="text-base font-normal">
          Hyatt Regency Tashkent предлагает идеальное расположение как для
          деловых путешественников, так и для туристов. Почувствуйте себя как
          дома в вашем просторном номере, пообедайте в одном из наших четырех
          ресторанов и баров, проведите заседание совета директоров или
          эксклюзивное мероприятие и не забудьте расслабиться в нашем бассейне и
          спа-зоне. Здесь вы обнаружите, что продуктивность и отдых являются
          постоянными спутниками вашего пребывания в Ташкенте.
        </p>
      </div>
      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.facilities-and-services')}
        </h2>
        <Divider />
        <div className="grid grid-cols-5 gap-2">
          <div className="flex items-center gap-2 text-base font-normal text-[#232E40]">
            <WifiIcon /> Wi-Fi
          </div>
          <div className="flex items-center gap-2 text-base font-normal text-[#232E40]">
            <TvIcon /> Телевизор
          </div>
          <div className="flex items-center gap-2 text-base font-normal text-[#232E40]">
            <MachineIcon /> Стиральная машина
          </div>
          <div className="flex items-center gap-2 text-base font-normal text-[#232E40]">
            <MicrowaveIcon /> Микроволновка
          </div>
          <div className="w-[300px] flex items-center gap-2 text-base font-normal text-[#232E40]">
            <CameraIcon /> Внешние камеры видеонаблюдения
          </div>
        </div>
      </div>

      <div className="p-6 border border-border rounded-[12px]">
        <h2 className="text-[24px] font-medium text-primary-dark">
          {t('common.accommodation-terms')}
        </h2>
        <Divider />

        <Table
          columns={columns}
          dataSource={data}
          className=" rounded-3xl overflow-hidden"
          bordered
          pagination={false}
          showHeader={false}
        />
      </div>
    </Form>
  )
}

export default HotelsItemContent
