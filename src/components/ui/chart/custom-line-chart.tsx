import { useState } from 'react'
import { Popover } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatAmount } from '@/helpers/format-amount'

const CustomLineChart = ({
  data = {} as Record<string, number>,
  legend = '',
}) => {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const labels = Object.keys(data)
  const values = Object.values(data)

  const actualMaxValue = Math.max(...values, 40)
  const maxValue = actualMaxValue * 1.15

  const padding = 60
  const chartWidth = 1700
  const chartHeight = 400
  const innerWidth = chartWidth - padding * 2
  const innerHeight = chartHeight - padding * 2

  /* =======================
     Label formatter (i18n)
  ======================= */
  const formatLabel = (label: string) => {
    const key = label.toLowerCase()

    // Agar months.january kabi key bo‘lsa → tarjima
    if (t(`months.${key}`, { defaultValue: '' })) {
      return t(`months.${key}`)
    }

    // Aks holda (yil yoki boshqa)
    return label
  }

  /* =======================
     Points
  ======================= */
  const points = values.map((value, index) => ({
    x: padding + (index / (values.length - 1)) * innerWidth,
    y: chartHeight - padding - (value / maxValue) * innerHeight,
    value,
    label: formatLabel(labels[index]),
    index,
  }))

  const svgPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  const shadowPath =
    svgPath +
    ` L ${points[points.length - 1].x} ${chartHeight - padding}` +
    ` L ${points[0].x} ${chartHeight - padding} Z`

  const yAxisSteps = 5
  const yAxisValues = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((i / yAxisSteps) * maxValue),
  )

  return (
    <div className="rounded-lg bg-white">
      <div
        className="relative w-full overflow-x-hidden"
        style={{ height: chartHeight }}
      >
        <svg
          width="102%"
          height={chartHeight}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ minWidth: '100%' }}
        >
          <defs>
            <linearGradient
              id="chartGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FF9D4D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF9D4D" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid Y */}
          {yAxisValues.map((val, i) => {
            const y = chartHeight - padding - (val / maxValue) * innerHeight
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={chartWidth - padding}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="4"
                />
                <text
                  x={padding - 10}
                  y={y + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6B7280"
                >
                  {formatAmount(val)}
                </text>
              </g>
            )
          })}

          {/* Grid X + labels */}
          {points.map((p, i) => (
            <g key={i}>
              <line
                x1={p.x}
                y1={padding}
                x2={p.x}
                y2={chartHeight - padding}
                stroke="#E5E7EB"
              />
              <text
                x={p.x}
                y={chartHeight - padding + 25}
                textAnchor="middle"
                fontSize="12"
                fill="#6B7280"
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={chartHeight - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={chartWidth - padding}
            y2={chartHeight - padding}
            stroke="#D1D5DB"
            strokeWidth="2"
          />

          {/* Shadow */}
          <path d={shadowPath} fill="url(#chartGradient)" />

          {/* Line */}
          <path d={svgPath} stroke="#FF9D4D" strokeWidth="2" fill="none" />

          {/* Hover line */}
          {hoveredIndex !== null && (
            <line
              x1={points[hoveredIndex].x}
              y1={padding}
              x2={points[hoveredIndex].x}
              y2={chartHeight - padding}
              stroke="#EF4444"
              strokeWidth="2"
            />
          )}

          {/* Points */}
          {points.map((p, i) => (
            <Popover
              key={i}
              trigger="hover"
              placement="top"
              color="#232E40"
              content={
                <div className="text-center text-sm text-white">{p.value}</div>
              }
            >
              <g
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  fill="#fff"
                  stroke={hoveredIndex === i ? '#EF4444' : '#FF9D4D'}
                  strokeWidth={hoveredIndex === i ? 3 : 2}
                />
                <circle cx={p.x} cy={p.y} r={12} fill="transparent" />
              </g>
            </Popover>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#FF9D4D]" />
        <span className="text-sm font-medium text-[#374151]">{legend}</span>
      </div>
    </div>
  )
}

export default CustomLineChart
