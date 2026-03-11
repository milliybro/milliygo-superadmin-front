import type { FC } from 'react'
import type { IExpertAdvice } from '@/features/content/types'

const ExpertAdviceDescription: FC<IExpertAdvice> = props => {
  return (
    <div
      className="line-clamp-2 text-sm font-medium"
      dangerouslySetInnerHTML={{
        __html: props?.description,
      }}
    />
  )
}

export default ExpertAdviceDescription
