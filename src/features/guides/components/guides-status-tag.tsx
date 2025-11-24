import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

interface IProps {
  colorless?: boolean
  type?: 'accepted' | 'in_progress' | 'rejected'
}

const GuidesStatusTag: FC<IProps> = ({ colorless, type }) => {
  const { t } = useTranslation()

  return (
    <span
      className={twMerge(
        'shrink-0 whitespace-nowrap rounded-[6px] px-[10px] py-[6px] text-xs font-medium',
        colorless
          ? type === 'accepted'
            ? 'border border-border bg-white py-[5px] text-primary-dark shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.05)]'
            : 'bg-primary-dark text-white'
          : type === 'accepted'
            ? 'bg-primary-light text-primary'
            : type === 'in_progress'
              ? 'bg-[#FEF9C3] text-[#854D0E]'
              : 'bg-danger-light/80 text-danger-dark',
      )}
    >
      {type === 'accepted'
        ? t('common.active')
        : type === 'in_progress'
          ? t('status.pending')
          : t('common.inactive')}
    </span>
  )
}

export default GuidesStatusTag
