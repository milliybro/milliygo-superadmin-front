import StarIcon from '../icons/star'

import type { FC } from 'react'

interface IProps {
  value: number | string
  icon?: boolean
}

const RatingTag: FC<IProps> = ({ value, icon }) => {
  return (
    <span className="shrink-0 text-[12px] inline-flex items-center gap-1 font-medium px-[8px] py-[6px] rounded-[6px] text-primary-dark bg-[#FEF9C3]">
      {icon ? <StarIcon className="text-[16px]" /> : null}
      {value}
    </span>
  )
}

export default RatingTag
