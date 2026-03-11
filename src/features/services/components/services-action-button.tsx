import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import EditIcon from '@/components/icons/edit'

import type { FC } from 'react'

interface IProps {
  id?: number
  type?: any
}

const ServicesActionButton: FC<IProps> = ({ id, type }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const editHandler = () => {
    navigate(pathname + '/edit?id=' + id + '&type=' + (type ? type : 1))
  }

  return (
    <div className="flex items-center gap-6">
      <Button
        type="link"
        className="px-0 text-base font-medium"
        onClick={editHandler}
      >
        <EditIcon className="text-xl" /> {t('common.edit')}
      </Button>
    </div>
  )
}

export default ServicesActionButton
