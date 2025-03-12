import CloseIcon from '@/components/icons/close-icon'
import EmptyDestinationIcon from '@/components/icons/empty-destination'
import PenSquareIcon from '@/components/icons/pen-square'
import { useTranslation } from 'react-i18next'
import useDestinationModalStore from '../store/destinations-modal-store'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'
import ConfirmationModal from '@/components/ui/confirmation-modal'
import DeleteIcon from '@/components/icons/delete'

const DestinationsItem = ({ destination }: { destination: any }) => {
  const { t } = useTranslation()
  const { openModal } = useDestinationModalStore(store => store)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [deleteModal, setDeleteModal] = useState(false)

  const editHandler = () => {
    if (destination.name) {
      navigate(pathname + '?edit=' + 1)
    }
    openModal()
  }

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 relative group">
        {destination.name ? (
          <div className="w-[288px] h-[288px] rounded-[20px] bg-[#141B3440] group-hover:bg-[#00000080] duration-500"></div>
        ) : (
          <div className="bg-[#F8F8FA] w-[288px] h-[288px] rounded-[20px] flex justify-center items-center group-hover:bg-[#00000080] duration-500">
            <EmptyDestinationIcon />
          </div>
        )}

        <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="p-[11px] rounded-[8px] bg-[#3276FF] cursor-pointer"
            onClick={editHandler}
          >
            <PenSquareIcon />
          </div>
          <div
            className="p-[11px] rounded-[8px] bg-[#F8F8FA]"
            onClick={() => setDeleteModal(true)}
          >
            <CloseIcon />
          </div>
        </div>

        {destination.name ? destination.name : t('home-content.empty')}
      </div>

      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('home-content.destination-delete')}
        subTitle={t('home-content.destination-del-desc')}
        primaryBtnText={t('common.delete')}
        // isLoading={isDeleting}
        // action={() => mutate(id as any)}
      />
    </>
  )
}

export default DestinationsItem
