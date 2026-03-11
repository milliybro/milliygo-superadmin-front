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
function OrderRow({ id, restaurant, amount, status, time }: any) {
  const sm = {
    Yetkazildi: { bg: '#DCFCE7', c: '#15803D' },
    "Yo'lda": { bg: '#DBEAFE', c: '#1D4ED8' },
    Tayyorlanmoqda: { bg: '#FEF3C7', c: '#D97706' },
    'Bekor qilindi': { bg: '#FEE2E2', c: '#DC2626' },
  }
  const s = sm[status] || sm["Yo'lda"]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <span
        style={{
          fontSize: 10,
          color: C.muted,
          width: 48,
          flexShrink: 0,
          fontFamily: 'monospace',
        }}
      >
        #{id}
      </span>
      <span
        style={{
          flex: 1,
          fontSize: 12,
          fontWeight: 600,
          color: C.text,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {restaurant}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: C.text,
          width: 52,
          textAlign: 'right',
        }}
      >
        ${amount}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 20,
          background: s.bg,
          color: s.c,
          width: 105,
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        {status}
      </span>
      <span
        style={{
          fontSize: 10,
          color: C.muted,
          width: 44,
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {time}
      </span>
    </div>
  )
}
export default OrderRow
