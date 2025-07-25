import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function NotFound(): React.ReactElement {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Result status={404} title={t('error.not-found')} />
      <div className="space-x-5">
        <Button
          className="bg-success text-white"
          onClick={() => {
            navigate('/')
          }}
          type="primary"
          size="large"
        >
          {t('common.go-home')}
        </Button>
      </div>
    </div>
  )
}
