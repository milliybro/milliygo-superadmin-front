import ContentHeader from '../components/content-header'
import RegionsTable from './views/list/regions-table'

export default function CountryMap() {
  return (
    <div className="flex flex-col gap-4">
      <ContentHeader title="Карта Узбекистана" />

      <RegionsTable />
    </div>
  )
}
