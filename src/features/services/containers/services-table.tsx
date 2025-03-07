import { Image, Table } from 'antd'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import StatusTag from '@/components/ui/status-tag'

import type { ISevicesTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import ServicesActionButton from '../components/services-action-button'
import UsersNotFound from '@/features/users/components/users-not-found'
import dayjs from 'dayjs'

// const data: ISevicesTable[] = [
//   {
//     key: '1',
//     id: 1,
//     icon: <MicrowaveIcon />,
//     name_uz: `Mikroto'lqinli pech`,
//     name_ru: 'Микроволновка',
//     name_en: 'Microwave oven',
//     created_at: '13.12.2024',
//     status: true,
//   },
//   {
//     key: '2',
//     id: 2,
//     icon: <MicrowaveIcon />,
//     name_uz: `Mikroto'lqinli pech`,
//     name_ru: 'Микроволновка',
//     name_en: 'Microwave oven',
//     created_at: '13.12.2024',
//     status: false,
//   },
//   {
//     key: '3',
//     id: 3,
//     icon: <MicrowaveIcon />,
//     name_uz: `Mikroto'lqinli pech`,
//     name_ru: 'Микроволновка',
//     name_en: 'Microwave oven',
//     created_at: '13.12.2024',
//     status: true,
//   },
//   {
//     key: '4',
//     id: 4,
//     icon: <MicrowaveIcon />,
//     name_uz: `Mikroto'lqinli pech`,
//     name_ru: 'Микроволновка',
//     name_en: 'Microwave oven',
//     created_at: '13.12.2024',
//     status: false,
//   },
// ]

// const onChange: TableProps<ISevicesTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
//   console.log('params', pagination, filters, sorter, extra)
// }

const ServicesTable = ({
  type,
  data,
  pageSize,
  setCurrentPage,
  isLoading,
}: {
  type: any
  data: any
  pageSize: number
  currentPage: number
  setCurrentPage: (page: number) => void
  isLoading: boolean
}) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<ISevicesTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'fields.icon.label',
      dataIndex: 'icon_url',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
      render: (icon_url, record) => <Image width={24} src={icon_url || record.icon} />,
    },
    {
      title: 'fields.name.name-uz',
      dataIndex: 'name_uz',
      sorter: {
        compare: (a, b) => a.name_uz.localeCompare(b.name_uz),
        multiple: 2,
      },
    },
    {
      title: 'fields.name.name-cry',
      dataIndex: 'name_cry',
      sorter: {
        compare: (a, b) => a.name_en.localeCompare(b.name_en),
        multiple: 1,
      },
    },
    {
      title: 'fields.name.name-ru',
      dataIndex: 'name_ru',
      sorter: {
        compare: (a, b) => a.name_ru.localeCompare(b.name_ru),
        multiple: 1,
      },
    },
    {
      title: 'fields.created-at.label',
      dataIndex: 'created_at',
      sorter: {
        compare: (a, b) => a.created_at.localeCompare(b.created_at),
        multiple: 1,
      },
      render: val => <div>{dayjs(val).format('DD.MM.YYYY')}</div>,
    },
    {
      title: 'fields.status.label',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => Number(a.status) - Number(b.status),
        multiple: 1,
      },
      render: status => <StatusTag active={status || true} />,
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      render: id => <ServicesActionButton type={type} id={id} />,
    },
  ]
  const itemRender: PaginationProps['itemRender'] = (
    n,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <span
          className={twMerge(
            'px-[16px] select-none duration-200 py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
            n === 0 ? 'opacity-0 pointer-events-none' : '',
          )}
        >
          {t('common.prev')}
        </span>
      )
    }
    if (type === 'next') {
      return (
        <span
          className={twMerge(
            'px-[16px] select-none py-[8px] font-medium shrink-0 text-secondary border border-border rounded-[8px]',
            n === 10 ? 'opacity-0 pointer-events-none' : '',
          )}
        >
          {t('common.next')}
        </span>
      )
    }

    return originalElement
  }

  const handlePaginationChange = (page: number) => {
    setCurrentPage(page)
  }

  const transformedHotelsData =
    data?.results?.map((item: ISevicesTable | any, i: number) => ({
      key: i,
      id: item.id,
      icon: item.icon_url ? item.url : item.icon,
      icon_url: item.icon_url,
      name_uz: item?.translations?.['uz-latin']?.name,
      name_ru: item?.translations?.ru?.name,
      name_cry: item?.translations?.['uz-cyrillic']?.name,
      created_at: item.created_at,
    })) || []

  return (
    <Table<ISevicesTable>
      columns={columns.map(val => ({
        ...val,
        title: t(`${val?.title}`),
      }))}
      dataSource={transformedHotelsData || []}
      onChange={pagination => handlePaginationChange(pagination.current!)}
      rootClassName="custom-table"
      className="w-full h-full"
      loading={isLoading}
      pagination={{
        pageSize: pageSize,
        total: data?.count,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        onChange: handlePaginationChange,
        itemRender: itemRender,
      }}
      locale={{
        emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
}

export default ServicesTable
