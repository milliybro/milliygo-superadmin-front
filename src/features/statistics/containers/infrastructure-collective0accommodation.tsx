import { Button, Card } from 'antd'
import { useTranslation } from 'react-i18next'
import CustomChart from '@/components/ui/chart/custom-chart'

export default function InfrastructureCollectiveStatistics({
  data,
  activeTab,
  onTabChange,
}: any) {
  const { t } = useTranslation()

  return (
    <Card className="w-full" style={{ padding: '' }}>
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-[18px] font-semibold">
          {t('statistics.collective-accommodation-facilities')}
        </h2>
        <div className="flex items-center gap-3 rounded-lg p-1">
          <Button
            onClick={() => onTabChange('object')}
            className={`rounded-[8px] px-4 py-2 font-medium transition-all duration-200 ${
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
      <CustomChart
        data={data}
        legend={t('statistics.objects')}
        color="#FF9D4D"
      />
    </Card>
  )
}
