import React, { useMemo, useState } from 'react'
import { Button, Table, Modal } from 'antd'
import type { TableColumnsType } from 'antd'
import type { TableProps } from 'antd/lib'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'

import StatusTag from '@/components/ui/status-tag'

import { truthyObject } from '@/helpers/truthy-object'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { useParsedQuery } from '@/hooks/use-parsed-query'
import { getOrganizationInfo } from '../api'
import UsersNotFound from '../components/users-not-found'
import ProviderItemFilters from './item-filter'
import CloseIcon from '@/components/icons/close-icon'
import StatusIcon from '@/components/icons/status-icon'
import AirportIcon from '@/components/icons/airport-icon'
import TicketIcon from '@/components/icons/ticket-icon'
import AirPlaneIcon from '@/components/icons/airplane'
import RouteIcon from '@/components/icons/route-icon'
import { ClockCircleOutlined } from '@ant-design/icons'
import MoneyExchangeIcon from '@/components/icons/money-exchange'
import SofaSingleIcon from '@/components/icons/sofa-single'
import CoinsIcon from '@/components/icons/coins'
import EyeIcon from '@/components/icons/eye'

function FieldBox({
  label,
  children,
  rightIcon,
  icon,
}: {
  icon: React.ReactNode
  label: string
  children?: any
  rightIcon?: any
}) {
  return (
    <div className="flex items-center gap-2 rounded-[12px] border border-border bg-white p-4 px-4">
      <span className="text-[20px] text-primary">{icon}</span>
      <span className="shrink-0 text-[14px] font-medium text-[#1F2937]">
        {label}
      </span>
      <div className="min-w-0 flex-1">{children}</div>
      {rightIcon ? <div className="shrink-0">{rightIcon}</div> : null}
    </div>
  )
}

type BookingRow = {
  id: number | string
  booking_date?: string
  number_booking?: string
  number_flight?: string
  passanger?: string
  price?: string
  status?: 'active' | 'inactive' | string

  passenger?: {
    full_name?: string
    city?: string
    country?: string
    birth_date?: string
    gender?: string
    passport_series?: string
    passport_country?: string
    phone?: string
    email?: string
    avatar_url?: string
  }
  details?: {
    airport_code?: string
    ticket_number?: string
    flight_number?: string
    route?: string
    flight_time?: string
    tariff?: string
    seat?: string
    price?: string
  }
}

function BookingDetailsModal({
  open,
  onClose,
  record,
}: {
  open: boolean
  onClose: () => void
  record: BookingRow | null
}) {
  const { t } = useTranslation()
  const bookingNo = record?.number_booking ?? '—'
  const bookingDate = record?.booking_date ?? '—'

  const passenger = record?.passenger
  const details = record?.details

  const fullName = passenger?.full_name ?? record?.passanger ?? '—'
  const locationText =
    [passenger?.country, passenger?.city].filter(Boolean).join(', ') || '—'

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={980}
      centered
      destroyOnClose
      closeIcon={null}
      styles={{
        content: { borderRadius: 18, padding: 18 },
        header: { borderRadius: 18 },
      }}
      title={null}
    >
      <div className="relative">
        <div className="flex flex-col pt-5">
          <div className="text-[24px] font-semibold text-[#1F2937]">
            {t('services-page.booking')} №{bookingNo}
          </div>
          <div className="mt-2 text-[14px] font-medium text-[#2563EB]">
            {bookingDate}
          </div>
        </div>
        <div
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => onClose()}
        >
          <CloseIcon className="text-[20px]" />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[360px_1fr]">
          <div className="rounded-[12px] border border-border bg-[#F8FAFC] p-6">
            <div className="flex items-center gap-3">
              <div className="flex min-w-full flex-col items-center justify-center">
                <div className="mb-4 h-[120px] w-[120px] overflow-hidden rounded-full bg-gray-100">
                  {passenger?.avatar_url ? (
                    <img
                      src={passenger.avatar_url}
                      alt={fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[20px] font-semibold text-gray-500">
                      {(fullName || '—')
                        .split(' ')
                        .slice(0, 2)
                        .map(s => s?.[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="mb-1 truncate text-[18px] font-semibold text-[#111827]">
                  {fullName}
                </div>
                <div className="text-[14px] font-medium text-primary">
                  {locationText}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4 text-[14px]">
              <div className="flex justify-between gap-4">
                <span className="font-medium text-[#6B7280]">
                  {t('fields.birthyear.label')}
                </span>
                <span className="text-[#111827]">
                  {passenger?.birth_date ?? '—'}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="font-medium text-[#6B7280]">
                  {t('guides.filter.gender')}
                </span>
                <span className="text-[#111827]">
                  {passenger?.gender ?? '—'}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="font-medium text-[#6B7280]">
                  {t('services-page.passport')}
                </span>
                <span className="text-[#111827]">
                  {passenger?.passport_series ?? '—'}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="font-medium text-[#6B7280]">
                  {t('services-page.arrival-country')}
                </span>
                <span className="text-[#111827]">
                  {passenger?.passport_country ?? '—'}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="font-medium text-[#6B7280]">
                  {t('services-page.phone')}
                </span>
                <span className="text-[#111827]">
                  {passenger?.phone ?? '—'}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="font-medium text-[#6B7280]">
                  {t('services-page.email')}
                </span>
                <span className="text-[#111827]">
                  {passenger?.email ?? '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <FieldBox
              label={t('services-page.booking-status')}
              rightIcon={<StatusTag active={record?.status} />}
              icon={<StatusIcon />}
            >
              <div className="text-[14px] text-[#111827]" />
            </FieldBox>

            <FieldBox
              label={t('services-page.airport-code')}
              icon={<AirportIcon />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.airport_code ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.ticket-number')}
              icon={<TicketIcon />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.ticket_number ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.number-reis')}
              icon={<AirPlaneIcon />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.flight_number ?? record?.number_flight ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.route')}
              icon={<RouteIcon />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.route ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.flight-time')}
              icon={<ClockCircleOutlined />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.flight_time ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.tariff')}
              icon={<MoneyExchangeIcon />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.tariff ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.place')}
              icon={<SofaSingleIcon />}
              rightIcon={
                <div className="text-[14px] text-[#111827]">
                  {details?.seat ?? '—'}
                </div>
              }
            ></FieldBox>

            <FieldBox
              label={t('services-page.price')}
              icon={<CoinsIcon />}
              rightIcon={
                <div className="text-[14px] font-semibold text-[#111827]">
                  {details?.price ?? record?.price ?? '—'}
                </div>
              }
            ></FieldBox>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const ProviderItemTable = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queries = useParsedQuery()

  const isCompact = useCompactScreen()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<BookingRow | null>(null)

  const { data: organizationData, isFetching } = useQuery({
    queryKey: ['organization-data', queries],
    queryFn: () =>
      getOrganizationInfo(truthyObject({ ...queries, page_size: 10 })),
    placeholderData: data => data,
  })

  const dataSource: BookingRow[] =
    organizationData?.results?.map((item: any, i: number) => ({
      ...item,
      idx: i,
      key: (item?.key ?? item?.id ?? 'row') + '-' + i,

      booking_date: '30.01.2026, 8:00',
      number_booking: '23032942',
      number_flight: 'TK 765',
      passanger: 'Алимова Азиза Равшановна',
      price: '6 850 000 UZS',
      status: 'active',

      passenger: {
        full_name: 'Алимова Азиза Равшановна',
        country: 'Узбекистан',
        city: 'Ташкент',
        birth_date: '30.01.2001',
        gender: 'Женский',
        passport_series: 'AC1234567',
        passport_country: 'Узбекистан',
        phone: '+998 90 329 23 43',
        email: 'example@gmail.com',
        avatar_url: '',
      },

      details: {
        airport_code: 'DXB -> IST',
        ticket_number: '176 4839201746',
        flight_number: 'TK 765',
        route: 'Dubai (DXB) -> Istanbul (IST)',
        flight_time: 'Вылет: 03:25 — Прилёт: 07:20 (4ч 55м)',
        tariff: 'Economy Flex',
        seat: '14A',
        price: '6 850 000 UZS',
      },
    })) || []

  const openModal = (row: BookingRow) => {
    setSelectedRow(row)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedRow(null)
  }

  const columns: TableColumnsType<BookingRow> = useMemo(
    () => [
      {
        title: '№',
        dataIndex: 'id',
        render: (_text, _record, index) => index + 1,
        sorter: false,
        width: 50,
      },
      {
        title: t('services-page.booking-date'),
        dataIndex: 'booking_date',
        render: value => value,
        sorter: true,
      },
      {
        title: t('services-page.number-booking'),
        dataIndex: 'number_booking',
        render: value => value,
        sorter: true,
      },
      {
        title: t('services-page.number-reis'),
        dataIndex: 'number_flight',
        render: value => value,
        sorter: true,
      },
      {
        title: t('services-page.passenger-name'),
        dataIndex: 'passanger',
        sorter: true,
      },
      {
        title: t('fields.price.label'),
        dataIndex: 'price',
        sorter: true,
        render: value => <div className="line-clamp-2 w-full">{value}</div>,
      },
      {
        title: t('fields.status.label'),
        dataIndex: 'status',
        sorter: true,
        render: status => <StatusTag active={status} />,
      },
      {
        title: isCompact ? '' : t('common.action'),
        dataIndex: 'id',
        width: 120,
        render: (_id, record) => (
          <Button
            type="link"
            className="px-0"
            onClick={() => openModal(record)}
          >
            <EyeIcon />
            {t('common.view') || 'Посмотреть'}
          </Button>
        ),
      },
    ],
    [t, isCompact],
  )

  const handleTableChange: TableProps<BookingRow>['onChange'] = (
    pagination,
    _,
    sorter,
  ) => {
    const sort = Array.isArray(sorter) ? sorter[0] : sorter
    const ordering = sort?.field
      ? (sort?.order === 'descend' ? '-' : '') + String(sort.field)
      : null

    const newPage = pagination.current

    const updatedQuery = queryString.stringify(
      truthyObject({
        ...queries,
        page: newPage,
        ordering,
      }),
    )

    navigate({ pathname, search: updatedQuery })
  }

  return (
    <div className="px-3">
      <ProviderItemFilters />

      <Table<BookingRow>
        columns={columns}
        dataSource={dataSource}
        className="side-borderless-table responsive-table"
        scroll={{ x: 'max-content' }}
        loading={isFetching}
        pagination={{
          current: +(queries?.page || 1),
          pageSize: 10,
          total: organizationData?.count || 0,
          hideOnSinglePage: true,
          showSizeChanger: false,
          position: ['bottomCenter'],
        }}
        locale={{
          emptyText: <UsersNotFound />,
          triggerDesc: t('common.sort_descending') ?? '',
          triggerAsc: t('common.sort_ascending') ?? '',
          cancelSort: t('common.sort_cancel') ?? '',
        }}
        onChange={handleTableChange}
      />

      <BookingDetailsModal
        open={isModalOpen}
        onClose={closeModal}
        record={selectedRow}
      />
    </div>
  )
}

export default ProviderItemTable
