import { useTranslation } from 'react-i18next'
import ContentHeader from '../../../components/content-header'
import RegionsTable from '../../components/regions-table'

export default function CountryMap() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4">
      <ContentHeader title={t('content.country-map.title')} />

      <RegionsTable />
    </div>
  )
}
