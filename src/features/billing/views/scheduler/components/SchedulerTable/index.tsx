import { useSearchParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Flex,
  PaginationProps,
  Switch,
  Table,
  TableColumnsType,
  Tooltip,
} from 'antd'
import UsersNotFound from '@/features/users/components/users-not-found.tsx'
import { ISchedulerResponse } from '@/features/billing/views/scheduler/types'
import {
  useSchedulerDeleteMutation,
  useSchedulerGetList,
  useSchedulerUpdateStatusMutation,
} from '@/features/billing/views/scheduler/service'
import EditIcon from '@/components/icons/edit.tsx'
import DeleteIcon from '@/components/icons/delete.tsx'
import ConfirmationModal from '@/components/ui/confirmation-modal'
import useModal from '@/features/billing/hooks/useModal.ts'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

interface IProps {
  setSelectedRowData: (rowData: ISchedulerResponse) => void
}

const pageSize = 10

export function SchedulerTable({ setSelectedRowData }: IProps) {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { isOpen, openModal, closeModal } = useModal()
  const [rowId,setRowId] = useState<number | null>(null)
  const { mutate: deleteSchedule, isPending: deletePending } =
    useSchedulerDeleteMutation({
      onSuccess: () => {
        closeModal()
        refetch()
      },
    })

  const itemRender: PaginationProps['itemRender'] = (
    n,
    type,
    originalElement,
  ) => {
    if (type === 'prev') {
      return (
        <span
          className={twMerge(
            'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary duration-200',
            n === 0 ? 'pointer-events-none opacity-0' : '',
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
            'shrink-0 select-none rounded-[8px] border border-border px-[16px] py-[8px] font-medium text-secondary',
            n === 10 ? 'pointer-events-none opacity-0' : '',
          )}
        >
          {t('common.next')}
        </span>
      )
    }

    return originalElement
  }

  const columns: TableColumnsType<ISchedulerResponse> = [
    {
      title: '№',
      dataIndex: 'id',
      className: 'text-center',
      render: (_text, _record, index) =>
        (currentPage - 1) * pageSize + index + 1,
      sorter: false,
    },
    {
      title: 'billing.schedule-page.name',
      dataIndex: 'name',
      className: 'text-center',
    },
    {
      title: 'billing.schedule-page.periodicity',
      dataIndex: 'periodicity',
      render:(periodicity) => t(`billing.schedule-page.${periodicity}`),
      className: 'text-center',
    },
    {
      title: 'billing.schedule-page.day',
      dataIndex: 'day',
      className: 'text-center',
    },
    {
      title: 'billing.schedule-page.scheduleHours',
      dataIndex: 'scheduleHours',
      className: 'text-center',
      render: (hoursList: number[]) =>
        Array.isArray(hoursList) && hoursList.map(hour => String(hour).padStart(2, '0') + ':00').join(','),
    },
    {
      title: 'billing.schedule-page.status',
      dataIndex: 'isActive',
      className: 'text-center',
      render: (isActive: boolean, record) => (
        <Switch
          checked={isActive}
          onChange={(value: boolean) =>
            updateScheduleStatus({ id: record.id, isActive: value })
          }
        />
      ),
    },

    {
      title: 'billing.schedule-page.action',
      className: 'text-center',
      render: (_isActive: boolean, record) => (
        <>
          <Flex gap={15} justify={'center'}>
            <Tooltip title={t('common.edit')}>
              <Button
                type="link"
                className="p-0"
                onClick={() => setSelectedRowData(record)}
              >
                <EditIcon className="text-xl" />
              </Button>
            </Tooltip>
            <Tooltip title={t('common.delete')}>

            <Button
              onClick={() => {
                setRowId(record.id)
                openModal()
              }}
              danger
              type='link'
              className="w-8 px-0 text-base font-medium"
            >
              <DeleteIcon className="text-xl" />
            </Button>
            </Tooltip>
          </Flex>

        </>
      ),
    },
  ]

  const { data, isFetching, refetch } = useSchedulerGetList({
    page: currentPage,
    page_size: 10,
  })

  const { mutate: updateScheduleStatus } = useSchedulerUpdateStatusMutation({
    onSuccess: () => {
      refetch()
    },
  })

  const handlePaginationChange = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev)
      params.set('page', String(page))
      return params
    })
  }

  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden rounded-[16px] border border-border p-6">

      <>
        <Table<ISchedulerResponse>
          columns={columns?.map(val => ({
            ...val,
            title: t(val?.title as string),
          }))}
          loading={isFetching}
          dataSource={data}
          onChange={pagination => handlePaginationChange(pagination.current!)}
          className="h-full w-full"
          bordered
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: data?.length || 0,
            hideOnSinglePage: true,
            showSizeChanger: false,
            position: ['bottomCenter'],
            itemRender: itemRender,
            onChange: handlePaginationChange,
          }}
          locale={{
            emptyText: <UsersNotFound />,
            triggerDesc: t('common.sort_descending') ?? '',
            triggerAsc: t('common.sort_ascending') ?? '',
            cancelSort: t('common.sort_cancel') ?? '',
          }}
        />

        <ConfirmationModal
          danger
          icon={DeleteIcon}
          open={isOpen}
          setOpen={value => (value ? openModal() : closeModal())}
          title={t('users-page.delete-modal')}
          subTitle={t('users-page.delete-modal-desc')}
          primaryBtnText={t('common.delete')}
          isLoading={deletePending}
          action={() => rowId && deleteSchedule(rowId)}
        />
      </>

    </div>
  )
}
