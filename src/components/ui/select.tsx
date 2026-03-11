import { Select } from 'antd'
import { twMerge } from 'tailwind-merge'

import ArrowDownIcon from '../icons/arrow-down'

import type { SelectProps } from 'antd'
import type { FC, ReactNode } from 'react'

interface IProps extends SelectProps {
  prefixIcon?: ReactNode
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
            <ArrowDownIcon className="pointer-events-none text-base text-primary-dark dark:text-white" />
          )
        }
        className={twMerge(
          '[&>.ant-select-selector]:px-4',
          className,
          prefixIcon ? 'custom-select' : '',
        )}
      />
      {prefixIcon ? (
        <span className="pointer-events-none absolute left-[16px] top-[calc(50%-8px)] flex">
          {prefixIcon}
        </span>
      ) : null}
    </div>
  )
}

export default CSelect
