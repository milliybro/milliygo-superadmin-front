import StarIcon from '../icons/star'

import type { FC } from 'react'

interface IProps {
  value: number | string
  icon?: boolean
}

const RatingTag: FC<IProps> = ({ value, icon }) => {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-[6px] bg-[#FEF9C3] px-[8px] py-[6px] text-xs font-medium text-primary-dark">
      {icon ? <StarIcon className="text-base" /> : null}
      {value}
    </span>
  )
}

export default RatingTag
