import { EyeOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Table, TableProps } from 'antd'
import { useNavigate } from 'react-router'
import { getRegions } from '../../api'

function RegionsTable() {
  const navigate = useNavigate()

  const columns: TableProps['columns'] = [
    {
      title: 'Регион',
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
      title: 'Действие',
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
            Посмотреть
          </Button>
        </div>
      ),
    },
  ]

  const { data } = useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
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
    />
  )
}

export default RegionsTable
