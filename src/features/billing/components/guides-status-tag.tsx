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
        'shrink-0 whitespace-nowrap text-[12px] font-medium px-[10px] py-[6px] rounded-[6px]',
        colorless
          ? type === 'active'
            ? 'text-primary-dark bg-white border py-[5px] border-border shadow-[0px_1px_2px_0px_rgba(0,_0,_0,_0.05)]'
            : 'text-white bg-primary-dark'
          : type === 'active'
            ? 'text-primary bg-primary-light'
            : type === 'request'
              ? 'text-[#854D0E] bg-[#FEF9C3]'
              : 'text-danger-dark bg-danger-light/80',
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
