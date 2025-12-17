import { useState } from 'react'
import { Popover } from 'antd'

const CustomLineChart = ({ 
  data = { 
    2016: 200, 2017: 220, 2018: 320, 2019: 220, 2020: 214, 
    2021: 310, 2022: 310, 2023: 160, 2024: 160, 2025: 350, 
  }, 
  legend = '', 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  const labels = Object.keys(data)
  const values = Object.values(data)
  const actualMaxValue = Math.max(...values, 500)
  const maxValue = actualMaxValue * 1.15
  
  const padding = 60
  const chartWidth = 1700
  const chartHeight = 400
  const innerWidth = chartWidth - padding * 2
  const innerHeight = chartHeight - padding * 2
  
  const points = values.map((value, index) => ({
    x: padding + (index / (values.length - 1)) * innerWidth,
    y: chartHeight - padding - (value / maxValue) * innerHeight,
    value,
    label: labels[index],
    index,
  }))
  
  const svgPath = points
    .map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
  
  // Create shadow/gradient fill path
  const shadowPath = svgPath + 
    ` L ${points[points.length - 1].x} ${chartHeight - padding}` +
    ` L ${points[0].x} ${chartHeight - padding}` +
    ' Z'
  
  const yAxisSteps = 5
  const yAxisValues = Array.from(
    { length: yAxisSteps + 1 }, 
    (_, i) => Math.round((i / yAxisSteps) * maxValue),
  )

  return (
    <div className="rounded-lg bg-white">
      <div className="relative w-full overflow-x-hidden" style={{ height: chartHeight }}>
        <svg 
          width="102%" 
          height={chartHeight} 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ minWidth: '100%' }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF9D4D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF9D4D" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {yAxisValues.map((val, i) => {
            const y = chartHeight - padding - (val / maxValue) * innerHeight
            return (
              <g key={`grid-${i}`}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={chartWidth - padding} 
                  y2={y} 
                  stroke="#E5E7EB" 
                  strokeDasharray="4" 
                  strokeWidth="1" 
                />
                <text 
                  x={padding - 10} 
                  y={y + 5} 
                  textAnchor="end" 
                  fontSize="12" 
                  fill="#6B7280" 
                  fontFamily="system-ui"
                >
                  {Math.round(val)}
                </text>
              </g>
            )
          })}

          {points.map((point, i) => (
            <g key={`vgrid-${i}`}>
              <line 
                x1={point.x} 
                y1={padding} 
                x2={point.x} 
                y2={chartHeight - padding} 
                stroke="#E5E7EB" 
                strokeDasharray="0" 
                strokeWidth="1" 
              />
              <text 
                x={point.x} 
                y={chartHeight - padding + 25} 
                textAnchor="middle" 
                fontSize="12" 
                fill="#6B7280" 
                fontFamily="system-ui"
              >
                {point.label}
              </text>
            </g>
          ))}

          {/* Y Axis */}
          <line 
            x1={padding} 
            y1={padding} 
            x2={padding} 
            y2={chartHeight - padding} 
            stroke="#D1D5DB" 
            strokeWidth="2" 
          />

          {/* X Axis */}
          <line 
            x1={padding} 
            y1={chartHeight - padding} 
            x2={chartWidth - padding} 
            y2={chartHeight - padding} 
            stroke="#D1D5DB" 
            strokeWidth="2" 
          />

          {/* Shadow/Gradient Fill */}
          <path 
            d={shadowPath} 
            fill="url(#chartGradient)" 
          />

          {/* Line */}
          <path 
            d={svgPath} 
            stroke="#FF9D4D" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Vertical line on hover */}
          {hoveredIndex !== null && (
            <line 
              x1={points[hoveredIndex].x} 
              y1={padding} 
              x2={points[hoveredIndex].x} 
              y2={chartHeight - padding} 
              stroke="#FF0000" 
              strokeWidth="2" 
              strokeDasharray="0" 
              opacity="0.8" 
            />
          )}

          {/* Points */}
          {points.map((point, i) => (
            <Popover 
              key={`point-${i}`} 
              color="#232E40" 
              content={
                <div className="text-center">
                  <p className="text-[14px] font-[400] text-[#FFFFFF]">
                    {point.value}
                  </p>
                </div>
              } 
              trigger="hover" 
              placement="top" 
              overlayClassName="chart-popover"
            >
              <g 
                onMouseEnter={() => setHoveredIndex(i)} 
                onMouseLeave={() => setHoveredIndex(null)} 
                style={{ cursor: 'pointer' }}
              >
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r={5} 
                  fill="#ffffff" 
                  stroke={i === hoveredIndex ? '#EF4444' : '#FF9D4D'} 
                  strokeWidth={i === hoveredIndex ? 3 : 2} 
                />
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r={10} 
                  fill="transparent" 
                  stroke="transparent" 
                  pointerEvents="auto" 
                />
              </g>
            </Popover>
          ))}

          {/* X Axis Labels */}
          {points.map((point, i) => (
            <text 
              key={`label-${i}`} 
              x={point.x} 
              y={chartHeight - padding + 25} 
              textAnchor="middle" 
              fontSize="12" 
              fill="#6B7280" 
              fontFamily="system-ui"
            >
              {point.label}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block h-3 w-3 rounded-sm bg-[#FF9D4D]"></span>
        <span className="text-sm font-medium text-[#374151]">{legend}</span>
      </div>
    </div>
  )
}

export default CustomLineChart