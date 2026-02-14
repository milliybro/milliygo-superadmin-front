import { useTranslation } from 'react-i18next'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
interface IProps {
  onAddClick?: () => void
  title?: string
}
export function SchedulerHeader ({title,onAddClick}:IProps) {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between">
      <Typography.Title level={2} className="text-lg font-medium">
        {title || t('common.main-content')}
      </Typography.Title>
      {!!onAddClick && (
        <Button type="primary" onClick={onAddClick}>
          <PlusOutlined />
          {t('common.add')}
        </Button>
      )}
    </div>
  )
}