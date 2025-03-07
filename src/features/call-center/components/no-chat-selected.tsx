import NotFoundIcon from '@/components/icons/not-found'
import { useTranslation } from 'react-i18next'

const NoChatSelected = () => {
  const { t } = useTranslation()

  return (
    <div className="flex-1 col-span-4 flex items-center justify-center bg-white border flex-col overflow-hidden border-border rounded-[16px]">
      <div className="flex flex-col justify-center gap-3 items-center">
        <NotFoundIcon />
      </div>
      <span className="text-[26px] font-semibold text-primary-dark">
        {t('call-center-page.no-chat-selected-title')}
      </span>
      <span className="text-secondary">
        {t('call-center-page.no-chat-selected-description')}
      </span>
    </div>
  )
}

export default NoChatSelected
