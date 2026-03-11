const C = {
  food: '#F97316',
  taxi: '#7C3AED',
  mkt: '#059669',
  blue: '#2563EB',
  red: '#DC2626',
  amber: '#D97706',
  indigo: '#4F46E5',
  slate: '#0F172A',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  light: '#F1F5F9',
}
function Donut({ segments, size = 76 }: any) {
  const r = 28,
    cx = 40,
    cy = 40,
    circ = 2 * Math.PI * r
  const total = segments.reduce((s: any, x: any) => s + x.value, 0)
  let offset = 0
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={C.light}
        strokeWidth="10"
      />
      {segments.map((seg: any, i: any) => {
        const dash = (seg.value / total) * circ
        const el = (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth="10"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '40px 40px',
            }}
          />
        )
        offset += dash + 1.5
        return el
      })}
      <text
        x="40"
        y="44"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={C.text}
      >
        {Math.round((segments[0].value / total) * 100)}%
      </text>
    </svg>
  )
}
export default Donut
