import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import type { FC } from 'react'

interface IProps {
  status: string // Accept the status as a prop
}

const StatusRoomsTag: FC<IProps> = ({ status }) => {
  const { t } = useTranslation()

  // Define a mapping for statuses and their styles
  const statusStyles: Record<string, { text: string; styles: string }> = {
    true: {
      text: t('status.empty'),
      styles: 'text-[#1E40AF] bg-[#DBEAFE]',
    },
    false: {
      text: t('status.canceled'),
      styles: 'text-[#854D0E] bg-[#FEF9C3]',
    },
  }

  const currentStatus = statusStyles[status] || {
    text: t('status.booking'),
    styles: 'text-gray-500 bg-gray-200',
  }

  return (
    <span
      className={twMerge(
        'shrink-0 rounded-[6px] px-[10px] py-[6px] text-xs font-medium',
        currentStatus.styles,
      )}
    >
      {currentStatus.text}
    </span>
  )
}

export default StatusRoomsTag
