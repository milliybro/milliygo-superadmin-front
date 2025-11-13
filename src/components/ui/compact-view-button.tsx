import EyeIcon from '@/components/icons/eye'
import { useCompactScreen } from '@/hooks/use-compact-screen'
import { Button } from 'antd'
import { ButtonProps } from 'antd/lib'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

const CompactViewButton: FC<ButtonProps> = props => {
  const { t } = useTranslation()
  const isCompact = useCompactScreen()

  return (
    <Button
      className={twMerge(
        'inline-flex items-center gap-2 font-medium',
        isCompact ? 'size-7 p-0 text-black' : 'text-primary',
      )}
      type="text"
      {...props}
    >
      <EyeIcon className="text-base 2xl:text-xl" />
      {!isCompact && t('common.more-details')}
    </Button>
  )
}

export default CompactViewButton
