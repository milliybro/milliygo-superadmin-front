import { type FC } from 'react'
import { IHollyTourism } from '../types'
import { Image } from 'antd'

const HollyTourismTitle: FC<IHollyTourism> = props => {
  return (
    <div className="flex items-center gap-4">
      <div className="size-10 overflow-hidden rounded-xl">
        {props?.image && (
          <Image
            src={props?.image}
            alt="Holly tourism"
            className="h-full w-full object-cover"
            rootClassName="w-full h-full"
          />
        )}
      </div>
      <div
        className="line-clamp-2 text-sm font-medium"
        dangerouslySetInnerHTML={{
          __html: props?.title,
        }}
      />
    </div>
  )
}

export default HollyTourismTitle
