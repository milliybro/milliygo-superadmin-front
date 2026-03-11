import Sparkline from './SparkLine'

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

function KpiCard({ title, value, change, color, spark, prefix = '' }: any) {
  const up = change >= 0
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 14,
        padding: '18px 20px',
        border: `1px solid ${C.border}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flex: 1,
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: color,
          borderRadius: '14px 14px 0 0',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>
          {title}
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 7px',
            borderRadius: 20,
            background: up ? '#DCFCE7' : '#FEE2E2',
            color: up ? '#15803D' : '#DC2626',
          }}
        >
          {up ? '▲' : '▼'} {Math.abs(change)}%
        </span>
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: C.text,
          letterSpacing: -1,
          lineHeight: 1,
        }}
      >
        {prefix}
        {value}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span style={{ fontSize: 10, color: C.muted }}>
          o'tgan haftaga nisbatan
        </span>
        <Sparkline data={spark} color={color} />
      </div>
    </div>
  )
}

export default KpiCard
