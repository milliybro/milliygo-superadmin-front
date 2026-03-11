import { getRegions } from '@/features/tourists/api'
import { EyeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Table, TableProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

function RegionsTable() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const columns: TableProps['columns'] = [
    {
      title: t('billing.region'),
      key: 'region',
      dataIndex: 'region',
      render: (_, record) => (
        <div className="text-sm font-medium">{record?.name}</div>
      ),
    },
    // {
    //   title: 'Название',
    //   key: 'name',
    //   dataIndex: 'name',
    //   width: 300,
    //   render: (_, record) => (
    //     <div className="truncate text-sm font-medium">{record?.name}</div>
    //   ),
    // },
    // {
    //   title: 'Описание',
    //   key: 'description',
    //   dataIndex: 'description',
    //   render: value => (
    //     <Typography.Text className="line-clamp-2 text-sm font-medium">
    //       {value || 'Нет описания'}
    //     </Typography.Text>
    //   ),
    // },
    {
      title: t('common.action'),
      key: 'action',
      dataIndex: 'action',
      width: 0,
      render: (_, record) => (
        <div className="flex items-center gap-4 text-base font-medium">
          <Button
            type="link"
            className="px-0"
            onClick={() =>
              record?.id && navigate(`/content/country-map/${record?.id}`)
            }
          >
            <EyeOutlined className="text-xl" />
            {t('common.view')}
          </Button>
        </div>
      ),
    },
  ]

  const { data, isFetching } = useQuery({
    queryKey: ['regions'],
    queryFn: () => getRegions({ page_size: 14 }),
    enabled: true,
    refetchOnWindowFocus: false,
    placeholderData: data => data,
  })

  return (
    <Table
      columns={columns}
      dataSource={data?.results}
      bordered
      pagination={false}
      loading={isFetching}
    />
  )
}

export default RegionsTable
