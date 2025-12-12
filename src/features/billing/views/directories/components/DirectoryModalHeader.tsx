import Edit2Icon from '@/components/icons/edit-2'
import { useTranslation } from 'react-i18next'

type Props = {
  id: any
  Icon: React.ComponentType<{ className?: string }>
  addText?: string
  textDesc?: string
}

function DirectoryModalHeader({ id, Icon, addText, textDesc }: Props) {
  const { t } = useTranslation()
  return (
    <div className="mb-6 flex flex-col items-center justify-center text-center">
      <div className="mb-4 flex size-[62px] shrink-0 items-center justify-center rounded-full border-[8px] border-[#EFF6FF] bg-[#DBEAFE]">
        {id ? <Edit2Icon className="text-2xl text-primary" /> : <Icon></Icon>}
      </div>
      <div className="mb-2 text-2xl font-bold text-primary-dark">
        { t(`${addText}`)}
      </div>
      <p className="font-medium text-secondary">{t(`${textDesc}`)}</p>
    </div>
  )
}

export default DirectoryModalHeader
