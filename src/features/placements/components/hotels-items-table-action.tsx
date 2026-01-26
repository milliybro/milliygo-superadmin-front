import CompactViewButton from '@/components/ui/compact-view-button'
import type { FC } from 'react'
import useHotelModalStore from '../store/hotel-modal-store'

interface IProps {
  id?: number
}

const HotelsItemTableActionButton: FC<IProps> = () => {
  const { openModal } = useHotelModalStore(store => store)

  return <CompactViewButton onClick={openModal} />
}

export default HotelsItemTableActionButton
