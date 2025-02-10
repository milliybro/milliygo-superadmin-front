import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import EyeIcon from '@/components/icons/eye'

import type { FC } from 'react'
import useHotelModalStore from '../store/hotel-modal-store'
import GuestModal from './guest-modal'

interface IProps {
  id?: number
}

const HotelsItemTableActionButton: FC<IProps> = ({ id }) => {
  const { t } = useTranslation()
  const { openModal } = useHotelModalStore(store => store)
  console.log(id);
  

  return (
    <>
      <Button
        className="inline-flex items-center gap-2 font-medium text-primary"
        type="text"
        onClick={openModal}
      >
        <EyeIcon className="text-[20px]" />
        {t('common.more-details')}
      </Button>
      <GuestModal />
    </>
  )
}

export default HotelsItemTableActionButton
