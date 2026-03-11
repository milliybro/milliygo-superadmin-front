import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomChart from '@/components/ui/chart/custom-chart'

export default function InfrastructureHotelSectorStatistics({
  data,
  activeTab,
  onTabChange,
}: any) {
  const { t } = useTranslation()

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow">
      <div className="flex min-w-[80px] flex-row items-center justify-between">
        <h2 className="text-[20px] font-semibold text-gray-800">
          {t('statistics.hotel-sector-stat')}
        </h2>
        <div className="flex items-center gap-2 rounded-lg p-1">
          <Button
            onClick={() => onTabChange('object')}
            className={`rounded-[6px] px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'object'
                ? 'border-[#E5E7EB] bg-[#F8FAFC] text-[#232E40]'
                : 'text-[#777E90]'
            }`}
          >
            {t('statistics.by-objects')}
          </Button>
          <Button
            onClick={() => onTabChange('place')}
            className={`rounded-[8px] px-4 py-2 font-medium transition-all duration-200 ${
              activeTab === 'place'
                ? 'border-[#E5E7EB] bg-[#F8FAFC] text-[#232E40]'
                : 'text-[#777E90]'
            }`}
          >
            {t('statistics.by-places')}
          </Button>
        </div>
      </div>

      <div className="w-full">
        <CustomChart
          data={data}
          legend={[t('statistics.objects'), t('common.guests')]}
          color="#3b82f6"
          line={true}
        />
      </div>
    </div>
  )
}
