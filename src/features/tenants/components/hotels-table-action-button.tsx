import type { FC } from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import EditIcon from '@/components/icons/edit'
import useHotelModalStore from '../store/hotel-modal-store'


interface IProps {
  id?: number
}

const HotelsTableActionButton: FC<IProps> = ({ id }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openModal } = useHotelModalStore(store => store)


  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }
  return (
    <Button
      className="inline-flex items-center gap-2 font-medium text-primary"
      type="text"
      onClick={editHandler}
    >
      <EditIcon className="text-[20px]" />
      {t('common.edit')}
    </Button>
  )
}

export default HotelsTableActionButton
