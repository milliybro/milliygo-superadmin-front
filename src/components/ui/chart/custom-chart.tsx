import { Popover } from 'antd'
import { useMemo, useState, useEffect } from 'react'
import tiles from '@/assets/tiled-bg.png'
import { motion } from 'framer-motion'

const CustomChart = ({
  data = {} as any,
  legend = [''] as any,
  color = '#FF9D4D',
  lineColor = '#FF6B6B',
  line = false,
}) => {
  const [hoveredBar, setHoveredBar] = useState(null) as any
  const [hoveredPoint, setHoveredPoint] = useState(null) as any
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [animationKey, setAnimationKey] = useState(0)

  // Data o'zgarsa animatsiyani qayta ishga tushuramiz
  useEffect(() => {
    setAnimationKey(prev => prev + 1)
  }, [data])

  // Prepare data
  const financeData = useMemo(() => {
    const barData = data.main_data || data
    const lineData = data.guest_data || {}

    return Object.entries(barData).map(([year, value]) => ({
      date: year,
      barValue: value,
      lineValue: lineData[year] || 0,
    }))
  }, [data])

  const barChartData = financeData.map(item => item.barValue) as any
  const lineChartData = financeData.map(item => item.lineValue)

  const maxBarValue = Math.max(...barChartData, 0)
  const maxLineValue = Math.max(...lineChartData, 0)
  const maxValue = Math.max(maxBarValue, maxLineValue)

  const buffer = maxValue * 0.1
  const yAxisMax = Math.ceil((maxValue + buffer) / 50) * 50

  const horizontalLinesCount = 5
  const verticalLinesCount = financeData.length
  const chartHeight = 350
  const chartTop = 50
  const chartBottom = chartTop + chartHeight
  const chartLeft = 80
  const chartRight = 1160
  const chartWidth = chartRight - chartLeft

  // Generate line path
  const generateLinePoints = () => {
    const step = chartWidth / verticalLinesCount

    return financeData
      .map((item, idx) => {
        const x = chartLeft + idx * step + step / 2
        const value = item.lineValue
        const barHeight = (value / yAxisMax) * chartHeight
        const y = chartBottom - barHeight

        return `${x},${y}`
      })
      .join(' ')
  }

  const handleBarHover = (
    idx: any,
    barX: any,
    barY: any,
    barWidth: any,
    value: any,
  ) => {
    setHoveredBar({ idx, value })
    setTooltipPos({ x: barX + barWidth / 2, y: barY - 10 })
  }

  const handleLinePointHover = (idx: any, x: number, y: number, value: any) => {
    setHoveredPoint({ idx, value })
    setTooltipPos({ x, y: y - 10 })
  }

  const handleLeave = () => {
    setHoveredBar(null)
    setHoveredPoint(null)
  }

  return (
    <div className="w-full rounded-lg bg-white">
      <div className="relative w-full overflow-x-auto rounded-lg">
        <svg
          key={animationKey}
          viewBox="0 0 1160 450"
          preserveAspectRatio="none"
          className="w-full"
        >
          {/* Horizontal Grid Lines and Y-axis labels */}
          {Array.from({ length: horizontalLinesCount + 1 }, (_, i) => {
            const y = chartTop + (chartHeight / horizontalLinesCount) * i
            const valueLabel = Math.round(
              yAxisMax - (yAxisMax / horizontalLinesCount) * i,
            )
            return (
              <g key={`h-grid-${i}`}>
                <line
                  x1={chartLeft}
                  y1={y}
                  x2={chartRight}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
                <text
                  x={chartLeft - 15}
                  y={y + 5}
                  textAnchor="end"
                  fontSize="13"
                  fill="#6B7280"
                >
                  {valueLabel}
                </text>
              </g>
            )
          })}

          {/* Vertical Grid Lines and X-axis labels */}
          {financeData.map((item, idx) => {
            const step = chartWidth / verticalLinesCount
            const x = chartLeft + idx * step + step / 2
            return (
              <g key={`v-grid-${idx}`}>
                <line
                  x1={x}
                  y1={chartTop}
                  x2={x}
                  y2={chartBottom}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={chartBottom + 25}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#6B7280"
                >
                  {item.date}
                </text>
              </g>
            )
          })}

          {/* Bar Chart */}
          {financeData.map((item, idx) => {
            const step = chartWidth / verticalLinesCount
            const barWidth = step * 0.65
            const spacing = step * 0.35
            const barX = chartLeft + idx * step + spacing / 2
            const value = item.barValue as any
            const barHeight = (value / yAxisMax) * chartHeight
            const barY = chartBottom - barHeight

            return (
              <motion.g
                key={`bar-${idx}`}
                initial={{ y: chartBottom - 110, scaleY: 0 }}
                animate={{ y: barY, scaleY: 1 }}
                transformOrigin="bottom center"
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                onMouseEnter={() =>
                  handleBarHover(idx, barX, barY, barWidth, value)
                }
                onMouseLeave={handleLeave}
              >
                <foreignObject
                  x={barX}
                  y={0}
                  width={barWidth}
                  height={barHeight}
                >
                  <Popover
                    content={
                      <div className="font-600 text-[14px] text-white">
                        {value}
                      </div>
                    }
                    placement="top"
                    overlayClassName="chart-popover"
                    color="#232E40"
                  >
                    <div
                      className="relative h-full rounded-[8px]"
                      style={{ backgroundColor: color }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 rounded-[8px]"
                        style={{
                          backgroundImage: `url(${tiles})`,
                          backgroundRepeat: 'repeat',
                          backgroundSize: 'auto 24px',
                          backgroundPosition: 'center',
                          opacity: 0.2,
                        }}
                      />
                    </div>
                  </Popover>
                </foreignObject>
              </motion.g>
            )
          })}

          {/* Line Chart */}
          {line && (
            <>
              {/* Line path */}
              <polyline
                points={generateLinePoints()}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Line points */}
              {financeData.map((item, idx) => {
                const step = chartWidth / verticalLinesCount
                const x = chartLeft + idx * step + step / 2
                const value = item.lineValue
                const barHeight = (value / yAxisMax) * chartHeight
                const y = chartBottom - barHeight

                return (
                  <g
                    key={`line-point-${idx}`}
                    onMouseEnter={() => handleLinePointHover(idx, x, y, value)}
                    onMouseLeave={handleLeave}
                  >
                    <Popover
                      content={
                        <div className="font-600 text-[14px] text-white">
                          {typeof value === 'number' ? value.toFixed(1) : value}
                        </div>
                      }
                      placement="top"
                      overlayClassName="chart-popover"
                      color="#232E40"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#ffffff"
                        stroke={lineColor}
                        strokeWidth="2"
                        style={{ cursor: 'pointer' }}
                      />
                    </Popover>
                  </g>
                )
              })}
            </>
          )}

          {/* Axes */}
          <line
            x1={chartLeft}
            y1={chartBottom}
            x2={chartRight}
            y2={chartBottom}
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <line
            x1={chartLeft}
            y1={chartTop}
            x2={chartLeft}
            y2={chartBottom}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
          <line
            x1={chartRight}
            y1={chartTop}
            x2={chartRight}
            y2={chartBottom}
            stroke="#D1D5DB"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="-mt-1 flex items-center justify-center gap-4">
        <div className="inline-flex items-center gap-2">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: color }}
          ></span>
          <span className="text-[14px] font-[400] text-[#232E40]">
            {Array.isArray(legend) && legend.length > 0 ? legend[0] : legend}
          </span>
        </div>
        {line && Array.isArray(legend) && legend.length > 1 && (
          <div className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: lineColor }}
            ></span>
            <span className="text-[14px] font-[400] text-[#232E40]">
              {legend[1]}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomChart
