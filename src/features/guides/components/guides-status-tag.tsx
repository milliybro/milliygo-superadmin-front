import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

interface IProps {
  active: string
  colorless?: boolean
  type?: string
}

const GuidesStatusTag: FC<IProps> = ({ active, colorless, type }) => {
  const { t } = useTranslation()
  console.log(active)

  return (
    <span
      className={twMerge(
        'shrink-0 whitespace-nowrap rounded-[6px] px-[10px] py-[6px] text-xs font-medium',
        colorless
          ? type === 'active'
            ? 'border border-border bg-white py-[5px] text-primary-dark shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.05)]'
            : 'bg-primary-dark text-white'
          : type === 'active'
            ? 'bg-primary-light text-primary'
            : type === 'request'
              ? 'bg-[#FEF9C3] text-[#854D0E]'
              : 'bg-danger-light/80 text-danger-dark',
      )}
    >
      {type === 'active'
        ? t('common.active')
        : type === 'request'
          ? t('common.request')
          : t('common.inactive')}
    </span>
  )
}

export default GuidesStatusTag
