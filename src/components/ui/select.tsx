import { Select } from 'antd'
import { twMerge } from 'tailwind-merge'

import ArrowDownIcon from '../icons/arrow-down'

import type { SelectProps } from 'antd'
import type { FC, ReactNode } from 'react'

interface IProps extends SelectProps {
  prefixIcon?: ReactNode
<<<<<<< HEAD
  containerClassName?: string
  mode?: 'multiple' | 'tags' | undefined
}

const CSelect: FC<IProps> = props => {
  const {
    suffixIcon,
    prefixIcon,
    className,
    containerClassName,
    mode = undefined,
    ...rest
  } = props
=======
  containerClassName?: string,
  mode?:"multiple" | "tags" | undefined
}

const CSelect: FC<IProps> = props => {
  const { suffixIcon, prefixIcon, className, containerClassName,mode = undefined, ...rest } =
    props
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972

  return (
    <div className={twMerge('relative', containerClassName)}>
      <Select
        {...rest}
        notFoundContent={null}
        defaultActiveFirstOption={false}
        mode={mode}
        suffixIcon={
          suffixIcon ? (
            suffixIcon
          ) : (
<<<<<<< HEAD
            <ArrowDownIcon className="pointer-events-none text-base text-primary-dark dark:text-white" />
=======
            <ArrowDownIcon className="text-base text-primary-dark dark:text-white pointer-events-none" />
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
          )
        }
        className={twMerge(
          '[&>.ant-select-selector]:px-4',
          className,
          prefixIcon ? 'custom-select' : '',
        )}
      />
      {prefixIcon ? (
<<<<<<< HEAD
        <span className="pointer-events-none absolute left-[16px] top-[calc(50%-8px)] flex">
=======
        <span className="left-[16px] absolute top-[calc(50%-8px)] flex pointer-events-none">
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
          {prefixIcon}
        </span>
      ) : null}
    </div>
  )
}

export default CSelect
