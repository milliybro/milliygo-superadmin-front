import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

import { Table, type PaginationProps } from 'antd'
import ContractActionButton from '../components/contract-action-button'

const ContactsTable = () => {
  const { t } = useTranslation()

  const columns = [
    {
      title: 'Тип документа',
      dataIndex: 'typeDocument',
      key: 'typeDocument',
    },
    {
      title: 'Дата контракта',
      dataIndex: 'dataContract',
      key: 'dataContract',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div className="bg-[#3276FF0D] py-[6px] px-[10px] rounded-[6px] text-[#3276FF] text-center w-fit ">
          {status}
        </div>
      ),
    },
    {
      title: 'Дата статуса',
      dataIndex: 'updateDate',
      key: 'updateDate',
    },
    {
      width: 300,
      title: 'common.action',
      dataIndex: 'id',
      render: () => <ContractActionButton />,
    },
  ]

  const data = [
    {
      typeDocument: 'Договор №',
      dataContract: '11.12.2024',
      status: 'Подписано',
      updateDate: '12.12.2024 12:44',
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

  //   const handlePaginationChange = (page: number) => {
  //     setCurrentPage(page)
  //   }

  //   const transformedData =
  //     UsersData?.results.map((user: IUsers) => ({
  //       full_name: user.full_name,
  //       type_name: user.type_name,
  //       key: user.id.toString(),
  //       id: user.id,
  //       fullName:
  //         `${user.first_name} ${user.middle_name || ''} ${user.last_name}`.trim(),
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       middle_name: user.middle_name || '',
  //       phone: user.phone,
  //       gender: user.gender,
  //       username: user.username,
  //       password: user.password,
  //       position: user.type?.name,
  //       status: user.is_active,
  //     })) || []

  return (
    <Table<any>
      columns={columns.map(val => ({
        ...val,
        title: t(`${val?.title}`),
      }))}
      dataSource={data}
      //   onChange={pagination => handlePaginationChange(pagination.current!)}
      className="w-full h-full"
      pagination={{
        current: 1,
        pageSize: 10,
        total: 0 || 0,
        hideOnSinglePage: true,
        showSizeChanger: false,
        position: ['bottomCenter'],
        itemRender: itemRender,
        // onChange: handlePaginationChange,
      }}
      locale={{
        // emptyText: <UsersNotFound />,
        triggerDesc: t('common.sort_descending') ?? '',
        triggerAsc: t('common.sort_ascending') ?? '',
        cancelSort: t('common.sort_cancel') ?? '',
      }}
    />
  )
}

export default ContactsTable
