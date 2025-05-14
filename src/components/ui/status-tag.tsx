import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

interface IProps {
  active: boolean
  colorless?: boolean
}

const StatusTag: FC<IProps> = ({ active, colorless }) => {
  const { t } = useTranslation()

  return (
    <span
      className={twMerge(
        'shrink-0 whitespace-nowrap text-[12px] font-medium px-[10px] py-[6px] rounded-[6px]',
        colorless
          ? active
            ? 'text-primary-dark bg-white border py-[5px] border-border shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.05)]'
            : 'text-white bg-primary-dark'
          : active
            ? 'text-primary bg-primary-light'
            : 'text-danger-dark bg-danger-light/80',
      )}
    >
      {active ? t('common.active') : t('common.inactive')}
    </span>
  )
}

export default StatusTag
