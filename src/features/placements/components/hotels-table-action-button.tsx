import EyeIcon from '@/components/icons/eye'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { Button } from 'antd'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

interface IProps {
  id?: number
  tenant_id?: number
  type?: string
}

const HotelsTableActionButton: FC<IProps> = () => {
  const { t } = useTranslation()
  const isCompact = useCompactScreen()
  // const navigate = useNavigate()
  // const { pathname } = useLocation()

  return (
    <Button
      className={twMerge(
        'inline-flex items-center gap-2 font-medium',
        isCompact ? 'size-7 p-0 text-black' : 'text-primary',
      )}
      type="text"
      // onClick={() =>
      //   navigate(
      //     pathname +
      //       '/' +
      //       id +
      //       '?' +
      //       (tenant_id !== undefined ? 'tenant_id=' + tenant_id + '&' : '') +
      //       (type !== undefined ? 'type=' + type : ''),
      //   )
      // }
    >
      <EyeIcon className="text-base 2xl:text-xl" />
      {!isCompact && t('common.more-details')}
    </Button>
  )
}

export default HotelsTableActionButton
