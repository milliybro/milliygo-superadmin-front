import { Select } from 'antd'
import { twMerge } from 'tailwind-merge'

import ArrowDownIcon from '../icons/arrow-down'

import type { SelectProps } from 'antd'
import type { FC, ReactNode } from 'react'

interface IProps extends SelectProps {
  prefixIcon?: ReactNode
  containerClassName?: string
}

const CSelect: FC<IProps> = props => {
  const { suffixIcon, prefixIcon, className, containerClassName, ...rest } =
    props

  return (
    <div className={twMerge('relative', containerClassName)}>
      <Select
        {...rest}
        notFoundContent={null}
        defaultActiveFirstOption={false}
        suffixIcon={
          suffixIcon ? (
            suffixIcon
          ) : (
            <ArrowDownIcon className="text-base text-primary-dark dark:text-white pointer-events-none" />
          )
        }
        className={twMerge(
          '[&>.ant-select-selector]:px-4',
          className,
          prefixIcon ? 'custom-select' : '',
        )}
      />
      {prefixIcon ? (
        <span className="left-[16px] absolute top-[calc(50%-8px)] flex pointer-events-none">
          {prefixIcon}
        </span>
      ) : null}
    </div>
  )
}

export default CSelect
