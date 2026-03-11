import { useTranslation } from 'react-i18next'
import {
  Modal,
  // Form,
  // Input,
  // Select,
  Button,
  // DatePicker,
  Typography,
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
    <div className="flex w-full flex-col gap-4">
      {info.map((item: any, index: number) => (
        <div key={index} className="flex items-center justify-between">
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
    // { label: 'hotel-guest.gender', value: 'Мужчина' },
    // { label: 'hotel-guest.phone', value: '+998 90 496 90 07' },
    // {
    //   label: 'hotel-guest.review',
    //   value:
    //     '“The apartment exceeded my expectations. The Host was extremely helpful with any question or inquiry.”',
    // },
    // { label: 'hotel-guest.number', value: '007' },
    // { label: 'hotel-guest.type', value: 'President room' },
    // { label: 'hotel-guest.night', value: '2 ночей' },
  ]

  // const otherGuestInfo = [
  //   { label: 'hotel-guest.lfm', value: 'RUSTAMOV SHOHRUH' },
  //   { label: 'hotel-guest.citizenship', value: "O'zbekiston" },
  //   { label: 'hotel-guest.nation', value: "O'zbek" },
  //   { label: 'hotel-guest.birth', value: '27.06.2003' },
  //   { label: 'hotel-guest.passport', value: 'AC 203 95 70' },
  //   { label: 'hotel-guest.gender', value: 'Мужчина' },
  // ]

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
        icon={<CloseIcon className="text-base" />}
        onClick={closeHandler}
      />
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex size-[62px] shrink-0 items-center justify-center rounded-full border-[8px] border-[#EFF6FF] bg-[#DBEAFE]">
          <UserIcon className="text-2xl text-primary" />
        </div>
        <div className="mb-2 text-2xl font-bold text-primary-dark">
          {t('hotel-guest.title')}
        </div>
        <GuestInfoSection info={guestInfo} />
        {/* <Divider className="border-border" />
        <Typography.Text className="text-left text-[#1F2937] text-base font-semibold">
          Информация о другие гостей
        </Typography.Text>
        <GuestInfoSection info={otherGuestInfo} /> */}
      </div>
    </Modal>
  )
}

export default GuestModal
