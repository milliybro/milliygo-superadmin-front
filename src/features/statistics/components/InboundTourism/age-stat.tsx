import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

function AgeGroupStats({ data = {} }: any) {
  const { t } = useTranslation()
  const PURPOSE_MAP = {
    leisure_recreation: {
      color: '#2563EB',
      label: t('statistics.leisure-and-recreation'),
    },
    medical_treatment: { color: '#8B5CF6', label: t('statistics.treatment') },
    study: { color: '#EF4444', label: t('statistics.training') },
    service: { color: '#FF8353', label: t('statistics.by-service') },
    commercial: { color: '#FFC107', label: t('statistics.commercial-goals') },
    relatives: { color: '#2CBE88', label: t('statistics.visit-relatives') },
  } as any

  const dataTotal = data.data_total ?? []
  const dataGender = data.data_gender ?? []

  const rows = dataTotal.map((item: any) => {
    const meta = PURPOSE_MAP[item.name] ?? {}

    return {
      color: meta.color,
      label: meta.label,
      male: item.men,
      female: item.women,
      total: item.total,
    }
  })

  const genderTotal = dataGender.reduce(
    (sum: any, item: any) => sum + item.total,
    0,
  )

  const progressBars = dataGender.map((item: any) => {
    const meta = PURPOSE_MAP[item.name] ?? {}
    const percent = genderTotal ? (item.total / genderTotal) * 100 : 0

    return {
      color: meta.color,
      width: `${percent}%`,
    }
  })

  const sumTotal = dataTotal.reduce((s: any, r: any) => s + r.total, 0)

  return (
    <div className="z-10 space-y-4 rounded-2xl bg-white p-4">
      <Typography.Title className="text-lg font-semibold">
        {t('statistics.distribution-of-foreign')}
      </Typography.Title>

      <div>
        <div className="text-[1.75rem] font-semibold">
          {Math.round(sumTotal)}
        </div>

        <Typography.Paragraph className="text-sm text-secondary">
          {t('statistics.customers-last')}
        </Typography.Paragraph>
      </div>

      <div className="flex items-center gap-1">
        {progressBars.map((bar: any, i: number) => (
          <div
            key={i}
            className="rounded-xs h-4"
            style={{
              backgroundColor: bar.color,
              width: bar.width,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-5 items-center gap-2 text-sm font-medium text-gray-600">
          <div className="col-span-2">{t('statistics.distribution-name')}</div>
          <div>{t('statistics.female')}</div>
          <div>{t('statistics.male')}</div>
          <div>{t('statistics.total')}</div>
        </div>

        {rows.map((row: any, i: number) => (
          <div className="grid grid-cols-5 items-center gap-2" key={i}>
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div
                  className="size-3 rounded-[3px]"
                  style={{ backgroundColor: row.color }}
                />
                <Typography.Text className="text-sm font-medium">
                  {row.label}
                </Typography.Text>
              </div>
            </div>

            <div className="text-sm">{row.female}</div>
            <div className="text-sm">{row.male}</div>
            <div className="text-sm">{row.total}</div>
          </div>
        ))}
      </div>

      <div className="card-shadow" />
    </div>
  )
}

export default AgeGroupStats
