import { Button, Result } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useRouteError } from 'react-router'

export default function Error(): React.ReactElement {
  const navigate = useNavigate()
  const error: any = useRouteError()
  const { t } = useTranslation()

  console.log(error)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Result
        status={error?.status || 500}
        title={
          error?.status === 404 ? t('error.not-found') : t('error.unexpected')
        }
        subTitle={error?.message || error?.data?.[0]?.detail}
      />
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
        <Button
          onClick={() => {
            window.location.reload()
          }}
          size="large"
        >
          {t('common.refresh')}
        </Button>
      </div>
    </div>
  )
}
