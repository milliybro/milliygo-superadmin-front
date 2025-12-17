import { useTranslation } from 'react-i18next'
import CustomChart from '@/components/ui/chart/custom-chart'

export default function NumberTravelCompanyChart({ data }: any) {
  const { t } = useTranslation()

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow">
      <div className="mb-0 flex flex-row items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-800">
          {t('statistics.number-companies')}
        </h2>
      </div>

      <CustomChart
        data={data}
        legend={t('statistics.tour-operators-and-agents')}
        color="#4888F6"
      />
    </div>
  )
}
