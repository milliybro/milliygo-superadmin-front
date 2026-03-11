import { useState, useMemo, useRef, useEffect } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────
const C = {
  brand: '#10B981',
  brandDark: '#059669',
  brandLight: '#ECFDF5',
  brandBorder: '#A7F3D0',
  orange: '#F97316',
  violet: '#7C3AED',
  blue: '#2563EB',
  sky: '#0EA5E9',
  red: '#DC2626',
  rose: '#F43F5E',
  amber: '#D97706',
  yellow: '#CA8A04',
  text: '#0F172A',
  muted: '#64748B',
  light: '#F1F5F9',
  border: '#E2E8F0',
  card: '#FFFFFF',
  bg: '#F8FAFC',
  slate: '#0F172A',
  green: '#16A34A',
  indigo: '#4F46E5',
}

const STATUS = {
  Completed: {
    bg: '#F0FDF4',
    color: '#15803D',
    dot: '#22C55E',
    label: "To'langan",
  },
  Pending: {
    bg: '#FFFBEB',
    color: '#B45309',
    dot: '#FBBF24',
    label: 'Kutmoqda',
  },
  Failed: { bg: '#FFF1F2', color: '#BE123C', dot: '#F43F5E', label: 'Xato' },
  Refunded: {
    bg: '#F5F3FF',
    color: '#6D28D9',
    dot: '#8B5CF6',
    label: 'Qaytarilgan',
  },
  PartialRef: {
    bg: '#F0F9FF',
    color: '#0369A1',
    dot: '#38BDF8',
    label: 'Qisman qaytarilgan',
  },
  Disputed: {
    bg: '#FFF7ED',
    color: '#C2410C',
    dot: '#FB923C',
    label: 'Bahsli',
  },
  Processing: {
    bg: '#EFF6FF',
    color: '#1D4ED8',
    dot: '#60A5FA',
    label: 'Qayta ishlayapti',
  },
}

const METHOD = {
  Click: { icon: '⚡', color: '#00AAFF', bg: '#F0FBFF', label: 'Click' },
  Payme: { icon: '🔵', color: '#0055FF', bg: '#EFF6FF', label: 'Payme' },
  'Uzum Pay': {
    icon: '🟠',
    color: '#FF6B00',
    bg: '#FFF7ED',
    label: 'Uzum Pay',
  },
  'Visa/MC': { icon: '💳', color: '#1D4ED8', bg: '#EFF6FF', label: 'Visa/MC' },
  Hamkorbank: {
    icon: '🏦',
    color: '#7C3AED',
    bg: '#F5F3FF',
    label: 'Hamkorbank',
  },
  Naqd: { icon: '💵', color: '#15803D', bg: '#F0FDF4', label: 'Naqd' },
  Humo: { icon: '🟣', color: '#9333EA', bg: '#FAF5FF', label: 'Humo' },
  Uzcard: { icon: '🔴', color: '#DC2626', bg: '#FFF1F2', label: 'Uzcard' },
}

const SERVICE = {
  Food: { icon: '🍔', color: C.orange, bg: '#FFF7ED', border: '#FED7AA' },
  Market: { icon: '🛒', color: C.green, bg: '#F0FDF4', border: '#BBF7D0' },
  Taxi: { icon: '🚖', color: C.violet, bg: '#F5F3FF', border: '#DDD6FE' },
  Cargo: { icon: '📦', color: C.sky, bg: '#F0F9FF', border: '#BAE6FD' },
}

const PAYMENTS = [
  {
    id: 'TXN-10881',
    orderId: 'MGO-88421',
    service: 'Food',
    customer: 'Anvar Rustamov',
    phone: '+998 90 123 45 67',
    avatar: 'AR',
    partner: 'KFC Central',
    method: 'Click',
    amount: 124500,
    fee: 6225,
    net: 118275,
    status: 'Completed',
    date: '2025-10-30',
    time: '14:26',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10880',
    orderId: 'MGO-88420',
    service: 'Market',
    customer: 'Madina Olimova',
    phone: '+998 97 445 67 89',
    avatar: 'MO',
    partner: 'Korzinka.uz',
    method: 'Payme',
    amount: 450200,
    fee: 22510,
    net: 427690,
    status: 'Completed',
    date: '2025-10-30',
    time: '14:12',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10879',
    orderId: 'MGO-88419',
    service: 'Taxi',
    customer: 'Jasur Aliev',
    phone: '+998 93 998 11 22',
    avatar: 'JA',
    partner: 'MilliyGo Fleet',
    method: 'Naqd',
    amount: 35000,
    fee: 1750,
    net: 33250,
    status: 'Pending',
    date: '2025-10-30',
    time: '14:06',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10878',
    orderId: 'MGO-88418',
    service: 'Food',
    customer: 'Diyor Sobirov',
    phone: '+998 90 777 22 33',
    avatar: 'DS',
    partner: 'Rayhon Foods',
    method: 'Visa/MC',
    amount: 88000,
    fee: 4400,
    net: 83600,
    status: 'Failed',
    date: '2025-10-30',
    time: '14:01',
    city: 'Samarqand',
    note: "Karta rad etildi — yetarli mablag' yo'q",
  },
  {
    id: 'TXN-10877',
    orderId: 'MGO-88417',
    service: 'Food',
    customer: 'Nilufar Yusupova',
    phone: '+998 91 234 56 78',
    avatar: 'NY',
    partner: 'Burger King',
    method: 'Uzum Pay',
    amount: 67000,
    fee: 3350,
    net: 63650,
    status: 'Completed',
    date: '2025-10-30',
    time: '13:52',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10876',
    orderId: 'MGO-88416',
    service: 'Market',
    customer: "Sherzod Xo'jayev",
    phone: '+998 94 555 66 77',
    avatar: 'SX',
    partner: 'Makro Supermarket',
    method: 'Click',
    amount: 312000,
    fee: 0,
    net: 312000,
    status: 'Refunded',
    date: '2025-10-30',
    time: '13:48',
    city: 'Tashkent',
    note: 'Mijoz tomonidan bekor qilindi',
  },
  {
    id: 'TXN-10875',
    orderId: 'MGO-88415',
    service: 'Taxi',
    customer: 'Feruza Karimova',
    phone: '+998 90 888 99 00',
    avatar: 'FK',
    partner: 'Yandex Drive',
    method: 'Payme',
    amount: 48000,
    fee: 2400,
    net: 45600,
    status: 'Completed',
    date: '2025-10-30',
    time: '13:41',
    city: 'Buxoro',
    note: '',
  },
  {
    id: 'TXN-10874',
    orderId: 'MGO-88414',
    service: 'Food',
    customer: 'Abdulloh Nazarov',
    phone: '+998 93 111 22 33',
    avatar: 'AN',
    partner: 'Plov Center',
    method: 'Humo',
    amount: 95000,
    fee: 4750,
    net: 90250,
    status: 'Completed',
    date: '2025-10-30',
    time: '13:37',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10873',
    orderId: 'MGO-88413',
    service: 'Market',
    customer: 'Gulnora Ibragimova',
    phone: '+998 97 333 44 55',
    avatar: 'GI',
    partner: 'Next Supermarket',
    method: 'Hamkorbank',
    amount: 187500,
    fee: 9375,
    net: 178125,
    status: 'Completed',
    date: '2025-10-30',
    time: '13:32',
    city: 'Namangan',
    note: '',
  },
  {
    id: 'TXN-10872',
    orderId: 'MGO-88412',
    service: 'Taxi',
    customer: 'Otabek Mirzayev',
    phone: '+998 90 444 55 66',
    avatar: 'OM',
    partner: 'MilliyGo Fleet',
    method: 'Naqd',
    amount: 28000,
    fee: 1400,
    net: 26600,
    status: 'Completed',
    date: '2025-10-30',
    time: '13:21',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10871',
    orderId: 'MGO-88411',
    service: 'Food',
    customer: 'Maftuna Xoliqova',
    phone: '+998 91 777 88 99',
    avatar: 'MX',
    partner: 'Tandirchi',
    method: 'Click',
    amount: 54000,
    fee: 2700,
    net: 51300,
    status: 'Completed',
    date: '2025-10-29',
    time: '13:12',
    city: "Farg'ona",
    note: '',
  },
  {
    id: 'TXN-10870',
    orderId: 'MGO-88410',
    service: 'Market',
    customer: 'Lochinbek Tursunov',
    phone: '+998 93 222 33 44',
    avatar: 'LT',
    partner: 'Korzinka.uz',
    method: 'Payme',
    amount: 275000,
    fee: 0,
    net: 275000,
    status: 'PartialRef',
    date: '2025-10-29',
    time: '13:05',
    city: 'Tashkent',
    note: 'Qisman qaytarish: 137 500 UZS',
  },
  {
    id: 'TXN-10869',
    orderId: 'MGO-88409',
    service: 'Cargo',
    customer: 'Bobur Toshmatov',
    phone: '+998 90 001 11 22',
    avatar: 'BT',
    partner: 'MilliyGo Cargo',
    method: 'Uzum Pay',
    amount: 85000,
    fee: 4250,
    net: 80750,
    status: 'Completed',
    date: '2025-10-29',
    time: '12:55',
    city: 'Andijon',
    note: '',
  },
  {
    id: 'TXN-10868',
    orderId: 'MGO-88408',
    service: 'Taxi',
    customer: 'Zulfiya Rahimova',
    phone: '+998 97 100 22 33',
    avatar: 'ZR',
    partner: 'MilliyGo Fleet',
    method: 'Visa/MC',
    amount: 42000,
    fee: 2100,
    net: 39900,
    status: 'Disputed',
    date: '2025-10-29',
    time: '12:40',
    city: 'Tashkent',
    note: "Mijoz xizmat sifatidan norozi — da'vo ochildi",
  },
  {
    id: 'TXN-10867',
    orderId: 'MGO-88407',
    service: 'Cargo',
    customer: 'Kamola Yusupova',
    phone: '+998 94 300 44 55',
    avatar: 'KY',
    partner: 'MilliyGo Cargo',
    method: 'Click',
    amount: 120000,
    fee: 6000,
    net: 114000,
    status: 'Completed',
    date: '2025-10-29',
    time: '12:10',
    city: 'Toshkent',
    note: '',
  },
  {
    id: 'TXN-10866',
    orderId: 'MGO-88406',
    service: 'Market',
    customer: 'Sanjar Bekmurodov',
    phone: '+998 90 900 12 34',
    avatar: 'SB',
    partner: 'Makro Supermarket',
    method: 'Payme',
    amount: 390000,
    fee: 19500,
    net: 370500,
    status: 'Processing',
    date: '2025-10-29',
    time: '11:58',
    city: 'Tashkent',
    note: 'Bank tekshiruvi kutilmoqda',
  },
  {
    id: 'TXN-10865',
    orderId: 'MGO-88405',
    service: 'Food',
    customer: 'Shohruh Qodirov',
    phone: '+998 91 500 11 22',
    avatar: 'SQ',
    partner: 'Navruz Osh',
    method: 'Uzcard',
    amount: 73000,
    fee: 3650,
    net: 69350,
    status: 'Completed',
    date: '2025-10-29',
    time: '11:45',
    city: "Qo'qon",
    note: '',
  },
  {
    id: 'TXN-10864',
    orderId: 'MGO-88404',
    service: 'Taxi',
    customer: 'Dildora Xasanova',
    phone: '+998 93 400 55 66',
    avatar: 'DX',
    partner: 'MilliyGo Fleet',
    method: 'Humo',
    amount: 55000,
    fee: 2750,
    net: 52250,
    status: 'Completed',
    date: '2025-10-29',
    time: '11:30',
    city: 'Tashkent',
    note: '',
  },
  {
    id: 'TXN-10863',
    orderId: 'MGO-88403',
    service: 'Food',
    customer: 'Mirzo Ergashev',
    phone: '+998 97 200 33 44',
    avatar: 'ME',
    partner: 'Samarkand Pitstop',
    method: 'Click',
    amount: 61000,
    fee: 3050,
    net: 57950,
    status: 'Failed',
    date: '2025-10-29',
    time: '11:10',
    city: 'Samarqand',
    note: "Tarmoq xatosi — to'lov amalga oshmadi",
  },
  {
    id: 'TXN-10862',
    orderId: 'MGO-88402',
    service: 'Cargo',
    customer: 'Nodir Botirov',
    phone: '+998 90 600 77 88',
    avatar: 'NB',
    partner: 'MilliyGo Cargo',
    method: 'Hamkorbank',
    amount: 210000,
    fee: 10500,
    net: 199500,
    status: 'Completed',
    date: '2025-10-28',
    time: '17:30',
    city: 'Namangan',
    note: '',
  },
  {
    id: 'TXN-10861',
    orderId: 'MGO-88401',
    service: 'Market',
    customer: 'Barno Tojiboyeva',
    phone: '+998 91 700 99 00',
    avatar: 'BT',
    partner: 'Korzinka.uz',
    method: 'Uzum Pay',
    amount: 167000,
    fee: 8350,
    net: 158650,
    status: 'Completed',
    date: '2025-10-28',
    time: '16:55',
    city: 'Tashkent',
    note: '',
  },
]

const fmt = n => new Intl.NumberFormat('uz-UZ').format(n)
const fmtM = n =>
  n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + 'M'
    : n >= 1_000
      ? (n / 1_000).toFixed(0) + 'K'
      : String(n)

const SERVICES = ['Barcha xizmat', 'Food', 'Market', 'Taxi', 'Cargo']
const METHODS_F = [
  'Barcha usul',
  'Click',
  'Payme',
  'Uzum Pay',
  'Visa/MC',
  'Hamkorbank',
  'Naqd',
  'Humo',
  'Uzcard',
]
const STATUSES_F = [
  'Barcha holat',
  'Completed',
  'Pending',
  'Failed',
  'Refunded',
  'PartialRef',
  'Disputed',
  'Processing',
]
const DATE_OPT = [
  'Bugun',
  'Kecha',
  "So'nggi 7 kun",
  "So'nggi 30 kun",
  'Bu oy',
  "O'tgan oy",
]

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Dropdown({
  label,
  value,
  onChange,
  options,
  accent = C.blue,
  minW = 150,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {label && (
        <div
          style={{
            fontSize: 10,
            color: C.muted,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: C.card,
          border: `1px solid ${open ? accent : C.border}`,
          borderRadius: 8,
          padding: '7px 10px',
          fontSize: 12,
          fontWeight: 600,
          color: C.text,
          cursor: 'pointer',
          minWidth: minW,
          justifyContent: 'space-between',
          boxShadow: open ? `0 0 0 3px ${accent}18` : 'none',
          transition: 'all .15s',
          outline: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontSize: 8,
            color: C.muted,
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform .2s',
            flexShrink: 0,
            marginLeft: 4,
          }}
        >
          ▼
        </span>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 400,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            boxShadow: '0 8px 28px rgba(0,0,0,.13)',
            minWidth: '100%',
            overflow: 'hidden',
            maxHeight: 220,
            overflowY: 'auto',
          }}
        >
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              style={{
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: value === opt ? 700 : 500,
                color: value === opt ? accent : C.text,
                cursor: 'pointer',
                background: value === opt ? accent + '12' : 'transparent',
                transition: 'background .1s',
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Badge({ status }) {
  const s = STATUS[status] || STATUS.Pending
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: s.bg,
        color: s.color,
        fontSize: 10,
        fontWeight: 700,
        padding: '3px 9px',
        borderRadius: 20,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: s.dot,
          flexShrink: 0,
        }}
      />
      {s.label}
    </span>
  )
}

function Avatar({ initials, size = 32, color = C.blue }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: color + '1A',
        border: `1.5px solid ${color}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.34,
        fontWeight: 800,
        color,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

function Sparkline({ data, color, h = 28, w = 72 }) {
  const max = Math.max(...data),
    min = Math.min(...data),
    rng = max - min || 1
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / rng) * (h - 4) - 2}`,
    )
    .join(' ')
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: 'block' }}
    >
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill={color + '25'}
        stroke="none"
      />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Donut({ slices, size = 72 }) {
  const total = slices.reduce((s, d) => s + d.v, 0) || 1
  let a = -90
  const r = size / 2 - 7,
    cx = size / 2,
    cy = size / 2
  const arc = (sa, ea) => {
    const s1 = (sa * Math.PI) / 180,
      e1 = (ea * Math.PI) / 180
    const x1 = cx + r * Math.cos(s1),
      y1 = cy + r * Math.sin(s1)
    const x2 = cx + r * Math.cos(e1),
      y2 = cy + r * Math.sin(e1)
    return `M${x1} ${y1} A${r} ${r} 0 ${ea - sa > 180 ? 1 : 0} 1 ${x2} ${y2}`
  }
  return (
    <svg width={size} height={size}>
      {slices.map((s, i) => {
        const deg = (s.v / total) * 360,
          sa = a,
          ea = a + deg
        a += deg
        return (
          <path
            key={i}
            d={arc(sa, ea)}
            fill="none"
            stroke={s.color}
            strokeWidth="10"
            strokeLinecap="butt"
          />
        )
      })}
      <circle cx={cx} cy={cy} r={r - 10} fill={C.card} />
    </svg>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ txn, onClose, onAction }) {
  const svc = SERVICE[txn.service] || SERVICE.Food
  const mth = METHOD[txn.method] || METHOD['Click']
  const st = STATUS[txn.status] || STATUS.Pending
  const canRefund = txn.status === 'Completed'

  const [tab, setTab] = useState('overview')
  const [refAmt, setRefAmt] = useState(txn.amount)
  const [refNote, setRefNote] = useState('')

  const timeline = [
    {
      label: "To'lov so'rovi qabul qilindi",
      time: `${txn.date}, ${txn.time}`,
      done: true,
    },
    {
      label: 'Bank / Provayder tekshiruvi',
      time: '~30 soniya',
      done: txn.status !== 'Pending',
    },
    {
      label:
        txn.status === 'Failed'
          ? '❌ Rad etildi'
          : txn.status === 'Processing'
            ? '⏳ Qayta ishlanmoqda'
            : '✅ Tasdiqlandi',
      time:
        txn.status === 'Failed'
          ? txn.note
          : txn.status === 'Completed'
            ? 'Muvaffaqiyatli'
            : '—',
      done: ['Completed', 'Refunded', 'PartialRef'].includes(txn.status),
      active: ['Pending', 'Processing'].includes(txn.status),
    },
    {
      label: 'Hisob-faktura yaratildi',
      time: txn.status === 'Completed' ? 'PDF tayyorlandi' : '—',
      done: txn.status === 'Completed',
      last: true,
    },
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: '16px 20px 12px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          background: `linear-gradient(140deg,${st.bg},#fff)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 15 }}>{svc.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: svc.color,
                  background: svc.bg,
                  border: `1px solid ${svc.border}`,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                {txn.service}
              </span>
              <Badge status={txn.status} />
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.5,
              }}
            >
              {txn.id}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              Buyurtma #{txn.orderId} · {txn.date} {txn.time}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: C.light,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.muted,
            }}
          >
            ✕
          </button>
        </div>
        {/* Sub tabs */}
        <div style={{ display: 'flex', gap: 2, marginTop: 12 }}>
          {[
            ['overview', 'Umumiy'],
            ['timeline', 'Tarix'],
            ['refund', 'Qaytarish'],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: '5px 12px',
                borderRadius: 7,
                border: `1px solid ${tab === k ? C.brand : C.border}`,
                background: tab === k ? C.brandLight : C.card,
                color: tab === k ? C.brandDark : C.muted,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {tab === 'overview' && (
          <>
            {/* Amount hero */}
            <div
              style={{
                background: C.slate,
                borderRadius: 14,
                padding: '16px 18px',
                marginBottom: 14,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  right: -30,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: C.brand + '15',
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: '#94A3B8',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 6,
                }}
              >
                To'lov summasi
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: -1,
                }}
              >
                {fmt(txn.amount)}{' '}
                <span
                  style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}
                >
                  UZS
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid #1E293B',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      color: '#64748B',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.4,
                    }}
                  >
                    Platforma komissiyasi
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#F87171',
                      marginTop: 2,
                    }}
                  >
                    −{fmt(txn.fee)} UZS
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      color: '#64748B',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.4,
                    }}
                  >
                    Hamkorga o'tkazma
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#4ADE80',
                      marginTop: 2,
                    }}
                  >
                    +{fmt(txn.net)} UZS
                  </div>
                </div>
              </div>
            </div>

            {/* Method + Customer row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  background: mth.bg,
                  borderRadius: 10,
                  padding: '11px 12px',
                  border: `1px solid ${mth.color}22`,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  To'lov usuli
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 22 }}>{mth.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: mth.color,
                      }}
                    >
                      {txn.method}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                      **** **** 4291
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: C.light,
                  borderRadius: 10,
                  padding: '11px 12px',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  Mijoz
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar initials={txn.avatar} size={30} color={C.blue} />
                  <div>
                    <div
                      style={{ fontSize: 12, fontWeight: 800, color: C.text }}
                    >
                      {txn.customer}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                      {txn.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner + City */}
            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '11px 14px',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Hamkor
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>
                  {txn.partner}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 8,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Shahar
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                  📍 {txn.city}
                </div>
              </div>
            </div>

            {/* Note */}
            {txn.note && (
              <div
                style={{
                  background: '#FFF7ED',
                  border: '1px solid #FED7AA',
                  borderRadius: 10,
                  padding: '10px 12px',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: C.orange,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  ⚠ Izoh
                </div>
                <div style={{ fontSize: 12, color: C.text }}>{txn.note}</div>
              </div>
            )}

            {/* Actions */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              {[
                { icon: '🧾', label: 'Chek yuborish', color: C.blue },
                { icon: '📋', label: "To'liq log", color: C.muted },
                { icon: '💬', label: 'Mijozga xabar', color: C.green },
                { icon: '🔍', label: 'Bank tekshiruvi', color: C.violet },
              ].map(({ icon, label, color }) => (
                <button
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 12px',
                    borderRadius: 10,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    cursor: 'pointer',
                    fontSize: 11,
                    fontWeight: 700,
                    color,
                  }}
                >
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        {tab === 'timeline' && (
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.text,
                marginBottom: 14,
              }}
            >
              Tranzaksiya vaqt chizig'i
            </div>
            {timeline.map((step, i) => (
              <div
                key={i}
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: step.done
                        ? C.brand
                        : step.active
                          ? C.blue
                          : C.border,
                      border: step.active ? `2px solid ${C.blue}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background .3s',
                    }}
                  >
                    {step.done && (
                      <span
                        style={{ fontSize: 9, color: '#fff', fontWeight: 800 }}
                      >
                        ✓
                      </span>
                    )}
                    {step.active && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          display: 'block',
                        }}
                      />
                    )}
                  </div>
                  {!step.last && (
                    <div
                      style={{
                        width: 2,
                        height: 32,
                        background: step.done ? C.brand + '44' : C.border,
                        marginTop: 2,
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: step.last ? 0 : 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: step.done || step.active ? C.text : C.muted,
                    }}
                  >
                    {step.label}
                  </div>
                  {step.time && (
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                      {step.time}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 8,
                }}
              >
                Texnik ma'lumotlar
              </div>
              {[
                ['Tranzaksiya ID', txn.id],
                ['Buyurtma ID', `#${txn.orderId}`],
                ['Gateway', txn.method],
                ['IP manzil', '91.185.22.41'],
                ['Session ID', 'sess_Xk7pQm9...'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: C.text,
                      fontFamily: 'monospace',
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'refund' && (
          <div>
            {!canRefund ? (
              <div
                style={{
                  background: C.light,
                  borderRadius: 10,
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>🚫</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>
                  Bu tranzaksiya uchun qaytarish mavjud emas
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                  Faqat «To'langan» tranzaksiyalar qaytarilishi mumkin
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: '#FFF1F2',
                    border: '1px solid #FECDD3',
                    borderRadius: 10,
                    padding: '12px 14px',
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#BE123C',
                      marginBottom: 4,
                    }}
                  >
                    💸 Qaytarish so'rovi
                  </div>
                  <div style={{ fontSize: 10, color: C.muted }}>
                    Jami to'langan: <strong>{fmt(txn.amount)} UZS</strong>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.muted,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.4,
                      marginBottom: 4,
                    }}
                  >
                    Qaytarish summasi (UZS)
                  </div>
                  <input
                    type="number"
                    value={refAmt}
                    max={txn.amount}
                    onChange={e =>
                      setRefAmt(Math.min(Number(e.target.value), txn.amount))
                    }
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 8,
                      border: `1px solid #FECDD3`,
                      fontSize: 14,
                      fontWeight: 800,
                      color: C.text,
                      outline: 'none',
                      fontFamily: 'inherit',
                      background: '#fff',
                    }}
                  />
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
                    {refAmt === txn.amount
                      ? "To'liq qaytarish"
                      : 'Qisman qaytarish: ' +
                        fmt(txn.amount - refAmt) +
                        ' UZS saqlanadi'}
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.muted,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.4,
                      marginBottom: 4,
                    }}
                  >
                    Sabab (majburiy)
                  </div>
                  <textarea
                    value={refNote}
                    onChange={e => setRefNote(e.target.value)}
                    rows={3}
                    placeholder="Qaytarish sababini kiriting..."
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: 8,
                      border: `1px solid #FECDD3`,
                      fontSize: 12,
                      color: C.text,
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none',
                      background: '#fff',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setTab('overview')}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: 10,
                      border: `1px solid ${C.border}`,
                      background: C.card,
                      color: C.muted,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Bekor
                  </button>
                  <button
                    onClick={() => {
                      onAction('refund', txn.id, refAmt, refNote)
                      setTab('overview')
                    }}
                    disabled={!refNote.trim()}
                    style={{
                      flex: 2,
                      padding: '11px',
                      borderRadius: 10,
                      border: 'none',
                      background: refNote.trim() ? '#DC2626' : '#FCA5A5',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: refNote.trim() ? 'pointer' : 'default',
                      transition: 'background .2s',
                    }}
                  >
                    ✓ {fmt(refAmt)} UZS qaytarish
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          padding: '12px 20px',
          borderTop: `1px solid ${C.border}`,
          flexShrink: 0,
          display: 'flex',
          gap: 8,
        }}
      >
        <button
          style={{
            flex: 1,
            padding: '11px',
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: C.card,
            color: C.text,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ⬇ Chek (PDF)
        </button>
        <button
          style={{
            flex: 1,
            padding: '11px',
            borderRadius: 10,
            border: 'none',
            background: C.slate,
            color: '#fff',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          🔗 Ulashish
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MilliyGoPaymentsPage() {
  const [data, setData] = useState(PAYMENTS)
  const [svcF, setSvcF] = useState('Barcha xizmat')
  const [mthF, setMthF] = useState('Barcha usul')
  const [stF, setStF] = useState('Barcha holat')
  const [dateF, setDateF] = useState('Bugun')
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE = 8

  const filtered = useMemo(() => {
    let d = [...data]
    if (svcF !== 'Barcha xizmat') d = d.filter(p => p.service === svcF)
    if (mthF !== 'Barcha usul') d = d.filter(p => p.method === mthF)
    if (stF !== 'Barcha holat') d = d.filter(p => p.status === stF)
    if (q.trim()) {
      const lq = q.toLowerCase()
      d = d.filter(
        p =>
          p.id.toLowerCase().includes(lq) ||
          p.orderId.toLowerCase().includes(lq) ||
          p.customer.toLowerCase().includes(lq) ||
          p.phone.includes(lq) ||
          p.partner.toLowerCase().includes(lq),
      )
    }
    return d
  }, [data, svcF, mthF, stF, q])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))
  const paged = filtered.slice((page - 1) * PAGE, page * PAGE)

  const handleAction = (type, id, amt, note) => {
    setData(prev =>
      prev.map(p =>
        p.id !== id
          ? p
          : {
              ...p,
              status: amt === p.amount ? 'Refunded' : 'PartialRef',
              note: note || 'Qaytarildi',
            },
      ),
    )
    setSelected(prev =>
      prev?.id === id
        ? {
            ...prev,
            status: amt === prev.amount ? 'Refunded' : 'PartialRef',
            note,
          }
        : prev,
    )
  }

  // KPI
  const done = data.filter(p => p.status === 'Completed')
  const volume = done.reduce((s, p) => s + p.amount, 0)
  const fees = done.reduce((s, p) => s + p.fee, 0)
  const net = done.reduce((s, p) => s + p.net, 0)
  const refV = data
    .filter(p => ['Refunded', 'PartialRef'].includes(p.status))
    .reduce((s, p) => s + p.amount, 0)
  const failC = data.filter(p => p.status === 'Failed').length
  const pendC = data.filter(p => p.status === 'Pending').length

  const spark = [88, 104, 97, 132, 115, 148, 129, 161, 143, 177, 158, 195]

  // Method donut slices
  const mthSlices = Object.keys(METHOD)
    .map(m => ({
      label: m,
      color: METHOD[m].color,
      v: data
        .filter(p => p.method === m && p.status === 'Completed')
        .reduce((s, p) => s + p.amount, 0),
    }))
    .filter(s => s.v > 0)

  // Service bars
  const svcBars = Object.keys(SERVICE).map(s => ({
    label: s,
    ...SERVICE[s],
    v: data
      .filter(p => p.service === s && p.status === 'Completed')
      .reduce((x, p) => x + p.amount, 0),
    cnt: data.filter(p => p.service === s).length,
  }))
  const svcMax = Math.max(...svcBars.map(s => s.v)) || 1

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        fontFamily: "'Outfit','Inter',sans-serif",
      }}
    >
      <style>{`
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px;}
        button:hover{opacity:.88;}
        textarea,input{font-family:inherit;}
        .tr:hover{background:#F0FDF4 !important;}
      `}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* ── Header ────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: C.brandLight,
                border: `1px solid ${C.brandBorder}`,
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 10,
                fontWeight: 700,
                color: C.brandDark,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              MilliyGo Superadmin
            </div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              To'lovlar
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Barcha mijoz to'lovlari — real vaqtda monitoring, qaytarishlar va
              moliyaviy tahlil
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Dropdown
              value={dateF}
              onChange={setDateF}
              options={DATE_OPT}
              accent={C.brand}
              minW={130}
            />
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: C.card,
                color: C.text,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '9px 16px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 1px 4px rgba(0,0,0,.06)',
              }}
            >
              ⬇ CSV eksport
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: C.brand,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '9px 16px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${C.brand}44`,
              }}
            >
              📊 Hisobot
            </button>
          </div>
        </div>

        {/* ── KPI Strip ─────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            gap: 10,
            marginBottom: 18,
          }}
        >
          {[
            {
              label: 'Jami aylanma',
              val: fmtM(volume),
              sub: 'UZS · ' + dateF.toLowerCase(),
              color: C.brand,
              icon: '💰',
              spark: spark,
            },
            {
              label: 'Sof daromad',
              val: fmtM(net),
              sub: 'komissiyasiz',
              color: C.blue,
              icon: '📈',
              spark: spark.map(v => v * 0.95),
            },
            {
              label: 'Platforma ulushi',
              val: fmtM(fees),
              sub: '~5% komissiya',
              color: C.orange,
              icon: '⚡',
              spark: spark.map(v => v * 0.05),
            },
            {
              label: 'Qaytarishlar',
              val: fmtM(refV),
              sub:
                data.filter(p => ['Refunded', 'PartialRef'].includes(p.status))
                  .length + ' ta',
              color: '#8B5CF6',
              icon: '↩️',
              spark: spark.map(v => v * 0.03),
            },
            {
              label: 'Muvaffaqiyatsiz',
              val: failC,
              sub: `${pendC} kutmoqda`,
              color: C.rose,
              icon: '⚠️',
              spark: null,
            },
            {
              label: "Jami to'lovlar",
              val: data.length,
              sub: `${done.length} tasdiqlangan`,
              color: C.muted,
              icon: '📋',
              spark: null,
            },
          ].map(({ label, val, sub, color, icon, spark: sp }) => (
            <div
              key={label}
              style={{
                background: C.card,
                borderRadius: 12,
                padding: '13px 14px',
                border: `1px solid ${C.border}`,
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: color + '18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                {sp && <Sparkline data={sp} color={color} />}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color,
                  letterSpacing: -0.5,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.text,
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Analytics Row ─────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr 0.9fr',
            gap: 10,
            marginBottom: 18,
          }}
        >
          {/* Payment method donut */}
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: '16px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              💳 To'lov usullari ulushi
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Donut slices={mthSlices} size={80} />
              <div style={{ flex: 1 }}>
                {mthSlices
                  .sort((a, b) => b.v - a.v)
                  .slice(0, 5)
                  .map(m => {
                    const total = mthSlices.reduce((s, x) => s + x.v, 0) || 1
                    return (
                      <div
                        key={m.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: m.color,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: C.text,
                            flex: 1,
                          }}
                        >
                          {m.label}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: m.color,
                          }}
                        >
                          {Math.round((m.v / total) * 100)}%
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>

          {/* Service revenue bars */}
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: '16px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              🗂 Xizmat bo'yicha daromad
            </div>
            {svcBars.map(s => (
              <div key={s.label} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.text,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <span>{s.icon}</span>
                    {s.label}
                    <span
                      style={{ fontSize: 9, color: C.muted, fontWeight: 400 }}
                    >
                      ({s.cnt} ta)
                    </span>
                  </span>
                  <span
                    style={{ fontSize: 11, fontWeight: 800, color: s.color }}
                  >
                    {fmtM(s.v)}
                  </span>
                </div>
                <div
                  style={{
                    height: 7,
                    background: C.light,
                    borderRadius: 99,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(s.v / svcMax) * 100}%`,
                      background: s.color,
                      borderRadius: 99,
                      transition: 'width .5s',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Status breakdown */}
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              padding: '16px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              📊 Holat statistikasi
            </div>
            {Object.entries(STATUS).map(([key, cfg]) => {
              const cnt = data.filter(p => p.status === key).length
              const pct = data.length
                ? Math.round((cnt / data.length) * 100)
                : 0
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 7,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: cfg.dot,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: C.text,
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cfg.label}
                  </span>
                  <div
                    style={{
                      width: 50,
                      height: 5,
                      background: C.light,
                      borderRadius: 99,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: cfg.dot,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: cfg.color,
                      minWidth: 18,
                      textAlign: 'right',
                    }}
                  >
                    {cnt}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Filters ───────────────────────────────────────── */}
        <div
          style={{
            background: C.card,
            borderRadius: 12,
            padding: '14px 16px',
            border: `1px solid ${C.border}`,
            marginBottom: 14,
            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <Dropdown
              label="Xizmat"
              value={svcF}
              onChange={v => {
                setSvcF(v)
                setPage(1)
              }}
              options={SERVICES}
              accent={C.brand}
            />
            <Dropdown
              label="To'lov usuli"
              value={mthF}
              onChange={v => {
                setMthF(v)
                setPage(1)
              }}
              options={METHODS_F}
              accent={C.brand}
            />
            <Dropdown
              label="Holat"
              value={stF}
              onChange={v => {
                setStF(v)
                setPage(1)
              }}
              options={STATUSES_F}
              accent={C.brand}
            />
            <div style={{ flex: 1, minWidth: 220 }}>
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                Qidirish
              </div>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 12,
                    color: C.muted,
                  }}
                >
                  🔍
                </span>
                <input
                  value={q}
                  onChange={e => {
                    setQ(e.target.value)
                    setPage(1)
                  }}
                  placeholder="TXN ID, buyurtma, mijoz, hamkor..."
                  style={{
                    width: '100%',
                    padding: '7px 10px 7px 30px',
                    borderRadius: 8,
                    fontSize: 12,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    color: C.text,
                    outline: 'none',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 8,
                paddingBottom: 0,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: C.muted,
                  fontWeight: 600,
                  paddingBottom: 8,
                }}
              >
                <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
                natija
              </span>
              {(svcF !== 'Barcha xizmat' ||
                mthF !== 'Barcha usul' ||
                stF !== 'Barcha holat' ||
                q) && (
                <button
                  onClick={() => {
                    setSvcF('Barcha xizmat')
                    setMthF('Barcha usul')
                    setStF('Barcha holat')
                    setQ('')
                    setPage(1)
                  }}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                    background: C.light,
                    color: C.muted,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginBottom: 0,
                  }}
                >
                  ✕ Tozalash
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Table + Detail ────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selected ? '1fr 400px' : '1fr',
            gap: 14,
          }}
        >
          {/* Table */}
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  '100px 1.6fr 100px 1.2fr 120px 140px 110px 155px 60px',
                borderBottom: `2px solid ${C.border}`,
                background: '#FAFAFA',
              }}
            >
              {[
                'TXN ID',
                'Mijoz',
                'Xizmat',
                'Hamkor',
                'Usul',
                'Summa',
                'Sof / Komissiya',
                'Holat',
                '',
              ].map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: '11px 10px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {paged.length === 0 ? (
              <div
                style={{
                  padding: '52px',
                  textAlign: 'center',
                  color: C.muted,
                  fontSize: 13,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>
                Tranzaksiya topilmadi
              </div>
            ) : (
              paged.map(txn => {
                const isSel = selected?.id === txn.id
                const svc = SERVICE[txn.service] || SERVICE.Food
                const mth = METHOD[txn.method] || METHOD['Click']
                const isRefunded = ['Refunded', 'PartialRef'].includes(
                  txn.status,
                )
                return (
                  <div
                    key={txn.id}
                    className="tr"
                    onClick={() => setSelected(isSel ? null : txn)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '100px 1.6fr 100px 1.2fr 120px 140px 110px 155px 60px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      background: isSel ? '#ECFDF5' : 'transparent',
                      borderLeft: `3px solid ${isSel ? C.brand : 'transparent'}`,
                      transition: 'background .12s',
                    }}
                  >
                    {/* TXN ID */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: isSel ? C.brandDark : C.muted,
                          fontFamily: 'monospace',
                        }}
                      >
                        {txn.id}
                      </div>
                      <div
                        style={{ fontSize: 9, color: C.muted, marginTop: 2 }}
                      >
                        {txn.time}
                      </div>
                    </div>

                    {/* Customer */}
                    <div
                      style={{
                        padding: '13px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 9,
                        minWidth: 0,
                      }}
                    >
                      <Avatar initials={txn.avatar} size={32} color={C.blue} />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: isSel ? C.brandDark : C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {txn.customer}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: C.muted,
                            marginTop: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {txn.phone}
                        </div>
                      </div>
                    </div>

                    {/* Service */}
                    <div style={{ padding: '13px 8px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: svc.bg,
                          color: svc.color,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '3px 7px',
                          borderRadius: 6,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {svc.icon} {txn.service}
                      </span>
                    </div>

                    {/* Partner */}
                    <div
                      style={{
                        padding: '13px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.muted,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {txn.partner}
                    </div>

                    {/* Method */}
                    <div
                      style={{
                        padding: '13px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 17 }}>{mth.icon}</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: mth.color,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {txn.method}
                      </span>
                    </div>

                    {/* Amount */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 900,
                          color: isRefunded ? '#8B5CF6' : C.text,
                          textDecoration: isRefunded ? 'line-through' : 'none',
                        }}
                      >
                        {fmt(txn.amount)}
                      </div>
                      <div
                        style={{ fontSize: 9, color: C.muted, marginTop: 1 }}
                      >
                        UZS
                      </div>
                    </div>

                    {/* Net / Fee */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: C.brand,
                        }}
                      >
                        +{fmt(txn.net)}
                      </div>
                      <div style={{ fontSize: 9, color: C.rose, marginTop: 1 }}>
                        −{fmt(txn.fee)} kom.
                      </div>
                    </div>

                    {/* Status */}
                    <div style={{ padding: '13px 8px' }}>
                      <Badge status={txn.status} />
                      {txn.note && (
                        <div
                          style={{
                            fontSize: 9,
                            color: C.orange,
                            marginTop: 3,
                            maxWidth: 130,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                          title={txn.note}
                        >
                          ⚠ {txn.note}
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div
                      style={{ padding: '13px 8px' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelected(isSel ? null : txn)}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          border: `1px solid ${C.border}`,
                          background: C.card,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                        }}
                      >
                        🔍
                      </button>
                    </div>
                  </div>
                )
              })
            )}

            {/* Pagination + summary */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderTop: `1px solid ${C.border}`,
                background: '#FAFAFA',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: C.muted,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span>
                  Jami{' '}
                  <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
                  dan {Math.min((page - 1) * PAGE + 1, filtered.length)}–
                  {Math.min(page * PAGE, filtered.length)}
                </span>
                <span style={{ color: C.brand, fontWeight: 700 }}>
                  Ko'rsatilgan aylanma:{' '}
                  {fmt(
                    paged
                      .filter(p => p.status === 'Completed')
                      .reduce((s, p) => s + p.amount, 0),
                  )}{' '}
                  UZS
                </span>
              </div>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: page === 1 ? C.light : C.card,
                    color: page === 1 ? C.muted : C.text,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: page === 1 ? 'default' : 'pointer',
                  }}
                >
                  ← Oldingi
                </button>
                {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                  const p = i + Math.max(1, Math.min(page - 2, pages - 4))
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        border: `1px solid ${page === p ? C.brand : C.border}`,
                        background: page === p ? C.brand : C.card,
                        color: page === p ? '#fff' : C.text,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {p}
                    </button>
                  )
                })}
                <button
                  onClick={() => setPage(p => Math.min(pages, p + 1))}
                  disabled={page === pages}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: page === pages ? C.light : C.card,
                    color: page === pages ? C.muted : C.text,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: page === pages ? 'default' : 'pointer',
                  }}
                >
                  Keyingi →
                </button>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div
              style={{
                background: C.card,
                borderRadius: 12,
                border: `1px solid ${C.border}`,
                overflow: 'hidden',
                position: 'sticky',
                top: 10,
                maxHeight: 'calc(100vh - 40px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: `0 4px 24px ${C.brand}1A`,
              }}
            >
              <DetailPanel
                txn={selected}
                onClose={() => setSelected(null)}
                onAction={handleAction}
              />
            </div>
          )}
        </div>

        {/* ── Footer method cards ────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 10,
            marginTop: 14,
          }}
        >
          {Object.entries(METHOD)
            .slice(0, 4)
            .map(([key, m]) => {
              const mPay = data.filter(
                p => p.method === key && p.status === 'Completed',
              )
              const total = mPay.reduce((s, p) => s + p.amount, 0)
              const cnt = mPay.length
              const avg = cnt ? Math.round(total / cnt) : 0
              return (
                <div
                  key={key}
                  onClick={() => {
                    setMthF(mthF === key ? 'Barcha usul' : key)
                    setPage(1)
                  }}
                  style={{
                    background: C.card,
                    borderRadius: 12,
                    padding: '14px 16px',
                    border: `1.5px solid ${mthF === key ? m.color : C.border}`,
                    cursor: 'pointer',
                    transition: 'all .2s',
                    boxShadow:
                      mthF === key
                        ? `0 4px 14px ${m.color}20`
                        : '0 1px 4px rgba(0,0,0,.04)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <span style={{ fontSize: 22 }}>{m.icon}</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: m.color,
                        }}
                      >
                        {key}
                      </span>
                    </div>
                    <span
                      style={{
                        background: m.bg,
                        color: m.color,
                        borderRadius: 99,
                        padding: '2px 8px',
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {cnt} ta
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: C.text,
                      letterSpacing: -0.5,
                    }}
                  >
                    {fmtM(total)}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                    UZS · bugungi aylanma
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}
                      >
                        O'rtacha to'lov
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: m.color,
                        }}
                      >
                        {fmtM(avg)} UZS
                      </div>
                    </div>
                    <Sparkline
                      data={spark.map(v => v * (0.7 + Math.random() * 0.6))}
                      color={m.color}
                      h={26}
                      w={60}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
