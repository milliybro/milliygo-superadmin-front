function Sparkline({ data, color, height = 36, width = 80 }: any) {
  const max = Math.max(...data),
    min = Math.min(...data),
    range = max - min || 1
  const pts = data
    .map(
      (v: any, i: number) =>
        `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 4) - 2}`,
    )
    .join(' ')
  const fill = data.map((v: any, i: number) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((v - min) / range) * (height - 4) - 2,
  }))
  const area = `M0,${height} L${fill[0].x},${fill[0].y} ${fill
    .slice(1)
    .map((p: any) => `L${p.x},${p.y}`)
    .join(' ')} L${width},${height} Z`
  const last = fill[fill.length - 1]
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`g${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g${color.slice(1)})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={last.x} cy={last.y} r="2.5" fill={color} />
    </svg>
  )
}
export default Sparkline
