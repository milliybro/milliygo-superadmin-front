import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import EyeIcon from '@/components/icons/eye'

import type { FC } from 'react'

interface IProps {
  id?: number
  tenant_id?: number
  type?: string
}

const HotelsTableActionButton: FC<IProps> = ({ id, tenant_id, type }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Button
      className="inline-flex items-center gap-2 font-medium text-primary"
      type="text"
      onClick={() =>
        navigate(
          pathname +
            '/' +
            id +
            '?' +
            (tenant_id !== undefined ? 'tenant_id=' + tenant_id + '&' : '') +
            (type !== undefined ? 'type=' + type : ''),
        )
      }
    >
      <EyeIcon className="text-[20px]" />
      {t('common.more-details')}
    </Button>
  )
}

export default HotelsTableActionButton
