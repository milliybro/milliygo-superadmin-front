import { DatePicker, Select, Table, Typography } from 'antd'
import { sortedIndex } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function StatisticsOfVisits({ data }: any) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(1)
  const dataSource = [
    { id: 1, date: 'Январь, 2025', tourists: 10540, country: 'Франция' },
    { id: 2, date: 'Февраль, 2025', tourists: 12300, country: 'Германия' },
    { id: 3, date: 'Март, 2025', tourists: 11450, country: 'Испания' },
    { id: 4, date: 'Апрель, 2025', tourists: 13500, country: 'Италия' },
    { id: 5, date: 'Май, 2025', tourists: 14700, country: 'Нидерланды' },
    { id: 6, date: 'Июнь, 2025', tourists: 13600, country: 'Швеция' },
    { id: 7, date: 'Июль, 2025', tourists: 15200, country: 'Дания' },
    { id: 8, date: 'Август, 2025', tourists: 16800, country: 'Португалия' },
    { id: 9, date: 'Сентябрь, 2025', tourists: 17350, country: 'Финляндия' },
    { id: 10, date: 'Октябрь, 2025', tourists: 17350, country: 'Финляндия' },
    { id: 11, date: 'Ноябрь, 2025', tourists: 32938, country: 'Казахстан' },
    { id: 12, date: 'Декабрь, 2025', tourists: 32938, country: 'Казахстан' },
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 55,
    },
    {
      title: t(`statistics.visit_date`),
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => {
        return sortedIndex(a.date, b.date)
      },
    },
    {
      title: t(`statistics.number-tourists`),
      dataIndex: 'tourists',
      key: 'tourists',
      sorter: (a: any, b: any) => {
        return sortedIndex(a.tourists, b.tourists)
      },
    },
    {
      title: t(`statistics.from_country`),
      dataIndex: 'country',
      key: 'country',
      sorter: (a: any, b: any) => {
        return sortedIndex(a.country, b.country)
      },
    },
  ]
  return (
    <div className="z-10 space-y-4 rounded-2xl bg-white p-4">
      <Typography.Title className="text-lg font-semibold">
        {t(`statistics.visit-statistics`)}
      </Typography.Title>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-[8px] border px-4 py-[9px]">
          <Typography.Text className="text-[16px] font-[400] text-[#2563EB]">
            {t(`statistics.total_visits`)}
          </Typography.Text>
          <Typography.Text className="text-[18px] font-[600]">
            3 894
          </Typography.Text>
        </div>
        <div className="flex gap-3">
          <Select
            size="large"
            placeholder={t(`statistics.from_country`)}
            className="w-[360px]"
          />
          <Select
            size="large"
            value="year"
            className="w-[200px]"
            options={[
              { label: t(`statistics.month`), value: 'month' },
              { label: t(`statistics.year`), value: 'year' },
            ]}
          />
          <DatePicker picker="month" size="large" />
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{
          current,
          pageSize: 5,
          onChange: page => setCurrent(page),
        }}
      />
      <div className="card-shadow" />
    </div>
  )
}

export default StatisticsOfVisits
