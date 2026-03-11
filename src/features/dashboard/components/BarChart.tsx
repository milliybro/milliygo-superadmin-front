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
function BarChart({ data, colors, height = 110 }) {
  const max = Math.max(...data.flatMap(d => d.values))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height }}>
      {data.map((group, gi) => (
        <div
          key={gi}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'flex-end',
              gap: 2,
            }}
          >
            {group.values.map((v, vi) => (
              <div
                key={vi}
                style={{
                  flex: 1,
                  height: `${(v / max) * 100}%`,
                  background: colors[vi],
                  borderRadius: '3px 3px 0 0',
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 9, color: C.muted, marginTop: 3 }}>
            {group.label}
          </span>
        </div>
      ))}
    </div>
  )
}
export default BarChart
