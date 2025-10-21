import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import EyeIcon from '@/components/icons/eye'

import type { FC } from 'react'

interface IProps {
  id?: number
}

const ClientsTableActionButton: FC<IProps> = ({ id }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <Button
      className="inline-flex items-center gap-2 font-medium text-primary"
      type="text"
      onClick={() => navigate(pathname + '/' + id)}
    >
      <EyeIcon className="text-xl" />
      {t('common.more-details')}
    </Button>
  )
}

export default ClientsTableActionButton
