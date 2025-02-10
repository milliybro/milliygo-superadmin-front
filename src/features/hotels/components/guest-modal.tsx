import { useTranslation } from 'react-i18next'
import {
  Modal,
  // Form,
  // Input,
  // Select,
  Button,
  // DatePicker,
  Typography,
  Divider,
} from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

import useHotelModalStore from '../store/hotel-modal-store'

// import CSelect from '@/components/ui/select'
import CloseIcon from '@/components/icons/close-icon'
// import HotelIcon from '@/components/icons/hotel'
// import dayjs from 'dayjs'
import UserIcon from '@/components/icons/user'

// const { RangePicker } = DatePicker

const GuestInfoSection = ({ info }: { info: any }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col w-full gap-4">
      {info.map((item: any, index: number) => (
        <div key={index} className="flex justify-between items-center">
          <Typography.Text className="text-sm font-normal text-[#0A0D2C]">
            {t(item.label)}
          </Typography.Text>
          <Typography.Text
            className={`text-sm font-medium text-[#0A0D2C] ${
              item.label === 'hotel-guest.review' ||
              item.label === 'hotel-guest.number' ||
              item.label === 'hotel-guest.type'
                ? 'max-w-52 text-right'
                : ''
            }`}
          >
            {item.value}
          </Typography.Text>
        </div>
      ))}
    </div>
  )
}

const GuestModal = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const { isModalOpen, closeModal } = useHotelModalStore(state => state)

  const editUserId = searchParams.get('edit')

  const guestInfo = [
    { label: 'hotel-guest.lfm', value: 'RUSTAMOV SHOHRUH' },
    { label: 'hotel-guest.citizenship', value: "O'zbekiston" },
    { label: 'hotel-guest.nation', value: "O'zbek" },
    { label: 'hotel-guest.birth', value: '27.06.2003' },
    { label: 'hotel-guest.passport', value: 'AC 203 95 70' },
    { label: 'hotel-guest.check-in-out', value: '15.01.2025 - 17.01.2025' },
    { label: 'hotel-guest.gender', value: 'Мужчина' },
    { label: 'hotel-guest.phone', value: '+998 90 496 90 07' },
    {
      label: 'hotel-guest.review',
      value:
        '“The apartment exceeded my expectations. The Host was extremely helpful with any question or inquiry.”',
    },
    { label: 'hotel-guest.number', value: '007' },
    { label: 'hotel-guest.type', value: 'President room' },
    { label: 'hotel-guest.night', value: '2 ночей' },
  ]

  const otherGuestInfo = [
    { label: 'hotel-guest.lfm', value: 'RUSTAMOV SHOHRUH' },
    { label: 'hotel-guest.citizenship', value: "O'zbekiston" },
    { label: 'hotel-guest.nation', value: "O'zbek" },
    { label: 'hotel-guest.birth', value: '27.06.2003' },
    { label: 'hotel-guest.passport', value: 'AC 203 95 70' },
    { label: 'hotel-guest.gender', value: 'Мужчина' },
  ]

  const closeHandler = () => {
    closeModal()

    if (editUserId) {
      navigate(pathname)
    }
  }

  return (
    <Modal
      title={null}
      open={isModalOpen}
      onCancel={closeHandler}
      closable={false}
      centered
      closeIcon={null}
      classNames={{
        wrapper: 'backdrop-blur-sm',
        content:
          '!p-[40px] [&>.ant-modal-close]:text-primary-dark dark:[&>.ant-modal-close]:text-dark-bg',
      }}
      footer={null}
    >
      <Button
        className="absolute right-[10px] top-[10px]"
        type="text"
        icon={<CloseIcon className="text-[16px]" />}
        onClick={closeHandler}
      />
      <div className="flex items-center mb-6 flex-col text-center justify-center">
        <div
          className="bg-[#DBEAFE] border-[8px] mb-4 border-[#EFF6FF] shrink-0 flex items-center justify-center
           size-[62px] rounded-full"
        >
          <UserIcon className="text-[24px] text-primary" />
        </div>
        <div className="text-[24px] mb-2 text-primary-dark font-bold">
          {t('hotel-guest.title')}
        </div>
        <GuestInfoSection info={guestInfo} />
        <Divider className="border-border" />
        <Typography.Text className="text-left text-[#1F2937] text-base font-semibold">
          Информация о другие гостей
        </Typography.Text>
        <GuestInfoSection info={otherGuestInfo} />
      </div>
    </Modal>
  )
}

export default GuestModal
