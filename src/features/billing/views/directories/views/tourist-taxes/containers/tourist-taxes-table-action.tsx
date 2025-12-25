import {  type FC } from 'react'
import { Button, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
// import { useMutation } from '@tanstack/react-query'
// import ConfirmationModal from '@/components/ui/confirmation-modal'
// import HierarchyIcon from '@/components/icons/hierarchy'
// import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import { useLocation, useNavigate } from 'react-router'
import useTouristTaxesStore from '../../../store/tourist-taxes-store'
// import { deleteTouristTax } from '../../../api/getTouristTaxes'

interface IProps {
  id: number
  refetch: () => void
}

const TouristTaxesTableAction: FC<IProps> = ({ id }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openModal } = useTouristTaxesStore(store => store)

  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }

  // const [deleteModal, setDeleteModal] = useState(false)

  // const { mutate, isPending } = useMutation({
  //   mutationFn: () => deleteTouristTax(id),
  //   onSuccess: () => {
  //     setDeleteModal(false)
  //     refetch()
  //   },
  // })

  return (
    <>
      <div className="flex items-center justify-center gap-4 text-base font-medium">
        <Tooltip title={t('common.edit')}>
          <Button type="link" className="p-0" onClick={editHandler}>
            <EditIcon className="text-xl" />
          </Button>
        </Tooltip>
        {/* <Tooltip title={t('common.hierarchy')}>
          <Button
            type="link"
            className="px-0 text-base font-medium text-[#232E40]"
          >
            <HierarchyIcon className="text-xl" />
          </Button>
        </Tooltip>
        <Tooltip title={t('common.delete')}>
          <Button
            type="link"
            danger
            className="p-0"
            onClick={() => setDeleteModal(true)}
          >
            <DeleteIcon className="text-xl" />
          </Button>
        </Tooltip> */}
      </div>

      {/* <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('users-page.delete-modal')}
        subTitle={t('users-page.delete-modal-desc')}
        primaryBtnText={t('common.delete')}
        isLoading={isPending}
        action={() => mutate(id as any)}
      /> */}
    </>
  )
}
export default TouristTaxesTableAction
