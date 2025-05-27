import { Table } from 'antd'
import { twMerge } from 'tailwind-merge'

import formatPhoneNumber from '@/helpers/format-phone-number'
import ClientsTableActionButton from '../components/clients-table-action-button'

import type { IClientTable } from '../types'
import type { PaginationProps, TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { IUsers } from '@/features/users/types'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letter'
import UsersNotFound from '@/features/users/components/users-not-found'
import dayjs from 'dayjs'

// const onChange: TableProps<IClientTable>['onChange'] = (
//   pagination,
//   filters,
//   sorter,
//   extra,
// ) => {
// }
interface ClientsFiltersProps {
  setCurrentpage: (value: number) => void
  currentPage: number
  isLoading: any
  clientsData: any
  pageSize: number
}
const ClientsTable: React.FC<ClientsFiltersProps> = ({
  clientsData,
  isLoading,
  currentPage,
  setCurrentpage,
  pageSize,
}) => {
  const { t } = useTranslation()

  const columns: TableColumnsType<IClientTable> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'fields.fullname.label',
      dataIndex: 'full_name',
      sorter: false,
      render: val => {
        return <div className="">{val ? val : '-'}</div>
      },
    },
    {
      title: 'fields.passport-data.label',
      dataIndex: 'passport_sn',
      sorter: false,
      render: val => {
        return <div className="text-center">{val ? val : '-'}</div>
      },
    },
    {
      title: 'fields.phone.label',
      dataIndex: 'phone',
      sorter: false,
      render(value) {
        return <div className="text-center">{formatPhoneNumber(value)}</div>
      },
    },
    {
      title: 'fields.birthyear.label',
      dataIndex: 'birthYear',
      sorter: false,
      render: data => {
        return (
          <div className="text-center">
            {data ? dayjs(data).format('DD, MMMM YYYY') : '-'}
          </div>
        )
      },
    },
    {
      title: 'common.email',
      dataIndex: 'email',
      sorter: false,
      render: val => {
        return <div className="text-center">{val ? val : '-'}</div>
      },
    },
    {
      title: 'fields.gender.label',
      dataIndex: 'gender',
      sorter: false,
      render: data => {
        return (
          <div>
            {data === 'male'
              ? t('common.men-small')
              : data === 'man'
                ? t('common.men-small')
                : t('common.women-small')}
          </div>
        )
      },
    },
    // {
    //   title: 'fields.entry-date.label',
    //   dataIndex: 'entryDate',
    //   sorter: {
    //     compare: (a, b) =>
    //       new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: 'fields.exit-date.label',
    //   dataIndex: 'exitDate',
    //   sorter: {
    //     compare: (a, b) =>
    //       new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime(),
    //     multiple: 1,
    //   },
    // },
    {
      title: 'fields.country.label',
      dataIndex: 'country_name',
      sorter: false,
      render: country_name => {
        return (
          <div className="text-center">
            {country_name ? capitalizeFirstLetters(country_name) : '-'}
          </div>
        )
      },
    },
    // {
    //   title: 'fields.nationality.label',
    //   dataIndex: 'nationality_name',
    //   sorter: {
    //     compare: (a, b) => a.nationality_name.localeCompare(b.nationality_name),
    //     multiple: 1,
    //   },
    //   render: val => {
    //     return <div className="text-center">{val ? val : '-'}</div>
    //   },
    // },
    {
      title: 'common.action',
      dataIndex: 'id',
      render: id => <ClientsTableActionButton id={id} />,
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
    setCurrentpage(page)
  }

  const transformedData =
    clientsData?.results.map((user: IUsers) => ({
      full_name: user.full_name,
      passport_sn: user.passport_sn,
      phone: user.phone,
      key: user.id.toString(),
      id: user.id,
      fullName:
        `${user.first_name} ${user.middle_name || ''} ${user.last_name}`.trim(),
      first_name: user.first_name,
      last_name: user.last_name,
      middle_name: user.middle_name || '',
      gender: user.gender,
      email: user.email,
      phoneNumber: user.phone,
      birthYear: user.birth_date,
      country_name: user.country_name,
      nationality_name: user.nationality_name,
    })) || []
  return (
    <div className="bg-white border flex-col overflow-hidden border-border rounded-[16px] flex items-center justify-center h-full">
      <Table<IClientTable>
        columns={columns.map(val => ({
          ...val,
          title: t(val.title as string),
        }))}
        dataSource={transformedData}
        onChange={pagination => handlePaginationChange(pagination.current!)}
        className="w-full h-full"
        loading={isLoading}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: clientsData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],

          itemRender: itemRender,
        }}
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
      />
    </div>
  )
}

export default ClientsTable
