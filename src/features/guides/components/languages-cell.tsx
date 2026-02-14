import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguagesCell = ({ languages }: { languages: (string | null)[] }) => {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const list = (languages || []).filter(Boolean) as string[]

  if (list.length === 0) return <span>-</span>

  if (!expanded) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm">{list[0]}</span>

        {list.length > 1 && (
          <button
            className="text-sm text-blue-500"
            onClick={e => {
              e.stopPropagation()
              setExpanded(true)
            }}
          >
            {t('guides.more')} +{list.length - 1}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap gap-2">
        {list.map((lang, i) => (
          <span key={i} className="text-sm">
            {lang}
          </span>
        ))}
      </div>

      <button
        className="w-fit text-sm text-gray-400 underline"
        onClick={e => {
          e.stopPropagation()
          setExpanded(false)
        }}
      >
        {t('guides.hide')}
      </button>
    </div>
  )
}
export default LanguagesCell
