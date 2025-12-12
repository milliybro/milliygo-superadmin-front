import { useTranslation } from 'react-i18next'
import { Button, Drawer, Typography } from 'antd'
import CloseIcon from '@/components/icons/close-icon'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getCurrency } from '../../../api/getCurrencies'

interface IProps {
  open: boolean
  onClose: () => void
}

const CurrenciesEditHistory = ({ open, onClose }: IProps) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const id = searchParams.get('id') || ''

  const { data } = useQuery({
    queryKey: ['tourist', id],
    queryFn: async () => {
      const res = await getCurrency({ id: id })
      return res
    },
    enabled: !!id,
    // keepPreviousData: true,
  })

  return (
    <>
      <Drawer
        bodyStyle={{ padding: 0 }}
        width={500}
        title={
          <>
          <Typography.Text className="text-base font-bold">
              {t('История')}
            </Typography.Text>
            <Typography.Paragraph>
              Для добавления нового платежа, пожалуйста заполните все
              необходимые поля
            </Typography.Paragraph>
          </>
        }
        closable={false}
        onClose={onClose}
        open={open}
        extra={
          <>
            <Button onClick={onClose} className="border-none p-0">
              <CloseIcon className="text-xl" />
            </Button>
          </>
        }
      >
        <div className="mt-6 px-4">
     
        </div>
      </Drawer>
    </>
  )
}

export default CurrenciesEditHistory
