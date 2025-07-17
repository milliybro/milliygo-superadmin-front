import { PlusOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'

interface IProps {
  onAddClick?: () => void
  title?: string
}

export default function ContentHeader({ onAddClick, title }: IProps) {
  return (
    <div className="flex items-center justify-between">
      <Typography.Title level={2} className="text-lg font-medium">
        {title || 'Главная страница'}
      </Typography.Title>
      <Button type="primary" onClick={onAddClick}>
        <PlusOutlined />
        Добавить
      </Button>
    </div>
  )
}
