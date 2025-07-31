import { twMerge } from 'tailwind-merge'
import { Table, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'

import type { PaginationProps, TableColumnsType } from 'antd'

interface IProps<T extends object> extends Omit<TableProps<T>, 'columns'> {
  columns: TableColumnsType<T>
  totalCount?: number
  currentPage?: number
  pageSize?: number
}

const CustomTable = <T extends object>(props: IProps<T>) => {
  const { t } = useTranslation()

  const itemRender: PaginationProps['itemRender'] = (
    _,
    type,
    originalElement,
  ) => {
    const classes =
      'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary'
    if (type === 'prev')
      return <span className={twMerge(classes)}>{t('common.prev')}</span>
    if (type === 'next')
      return <span className={twMerge(classes)}>{t('common.next')}</span>
    return originalElement
  }

  return (
    <Table
      {...props}
      pagination={{
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        itemRender,
        current: props?.currentPage,
        pageSize: props?.pageSize || 10,
        total: props?.totalCount || 0,
        ...props?.pagination,
      }}
    />
  )
}

export default CustomTable
