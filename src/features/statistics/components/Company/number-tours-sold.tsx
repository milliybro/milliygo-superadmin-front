import { useTranslation } from 'react-i18next'
import CustomChart from '@/components/ui/chart/custom-chart'

export default function NumberToursSoldChart({ data }: any) {
  const { t } = useTranslation()

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow">
      <div className="mb-0 flex flex-row items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-800">
          {t('statistics.number-of-tours')}
        </h2>
      </div>

      <CustomChart
        data={data}
        legend={t('statistics.selling-tours')}
        color="#77D093"
      />
    </div>
  )
}
