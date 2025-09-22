import { twMerge } from 'tailwind-merge'

import type { FC, ReactNode } from 'react'

interface IProps {
  label: string
  value: ReactNode
  valueClass?: string
}

const InfoRow: FC<IProps> = ({ label, value, valueClass }) => {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-primary-dark">{label}</span>
      <span className={twMerge('text-end text-primary-dark', valueClass)}>
        {value}
      </span>
    </div>
  )
}

export default InfoRow
