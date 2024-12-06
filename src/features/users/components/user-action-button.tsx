import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import useUserModalStore from '../store/user-modal-store'

import EditIcon from '@/components/icons/edit'
import DeleteIcon from '@/components/icons/delete'

import type { FC } from 'react'

interface IProps {
  id?: number
}

const UserActionButton: FC<IProps> = ({ id }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const { openModal } = useUserModalStore(store => store)

  const editHandler = () => {
    navigate(pathname + '?edit=' + id)
    openModal()
  }

  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="text-[16px] font-medium px-0"
        onClick={editHandler}
      >
        <EditIcon className="text-[20px]" /> {t('common.edit')}
      </Button>

      <Button type="link" danger className="text-[16px] font-medium px-0">
        <DeleteIcon className="text-[20px]" /> {t('common.delete')}
      </Button>
    </div>
  )
}

export default UserActionButton
