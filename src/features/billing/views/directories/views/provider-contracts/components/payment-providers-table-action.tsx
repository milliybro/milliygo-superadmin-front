import { useState, type FC } from 'react'
import { Button, Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from '@/components/ui/confirmation-modal'
import DeleteIcon from '@/components/icons/delete'
import EditIcon from '@/components/icons/edit'
import useProviderContractsModalStore from '../../../store/provider-contracts-store'
import { deleteProviderContarcts } from '../../../api/getProviderContracts'
import { BillingPath } from '../../../paths'

interface IProps {
  id: number
}

const ProviderContractsTableAction: FC<IProps> = ({ id }) => {
  const { t } = useTranslation()
  const { openModal, setId } = useProviderContractsModalStore(store => store)
  const queryClient = useQueryClient()
  const editHandler = () => {
    setId(id)
    openModal()
  }

  const [deleteModal, setDeleteModal] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProviderContarcts(id),
    onSuccess: () => {
      setDeleteModal(false)
      queryClient.invalidateQueries({
        queryKey: [BillingPath['provider-contracts']],
      })
    },
  })

  return (
    <>
      <div className="flex items-center justify-center gap-4 text-base font-medium">
        <Tooltip title={t('common.edit')}>
          <Button type="link" className="p-0" onClick={editHandler}>
            <EditIcon className="text-xl" />
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
        </Tooltip>
      </div>

      <ConfirmationModal
        danger
        icon={DeleteIcon}
        open={deleteModal}
        setOpen={setDeleteModal}
        title={t('users-page.delete-modal')}
        subTitle={t('users-page.delete-modal-desc')}
        primaryBtnText={t('common.delete')}
        isLoading={isPending}
        action={() => mutate(id as any)}
      />
    </>
  )
}
export default ProviderContractsTableAction
