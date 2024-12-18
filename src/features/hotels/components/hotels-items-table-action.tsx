import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

import EyeIcon from '@/components/icons/eye'

import type { FC } from 'react'

interface IProps {
  id?: number
}

const HotelsItemTableActionButton: FC<IProps> = ({ id }) => {
  const { t } = useTranslation()

  return (
    <Button
      className="inline-flex items-center gap-2 font-medium text-primary"
      type="text"
      //   onClick={() => navigate(pathname + '/' + id)}
    >
      <EyeIcon className="text-[20px]" />
      {t('common.more-details')}
    </Button>
  )
}

export default HotelsItemTableActionButton
