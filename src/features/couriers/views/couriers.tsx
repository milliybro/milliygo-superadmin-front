import { useState, useMemo, useEffect, useRef } from 'react'

const C = {
  orange: '#F97316',
  emerald: '#059669',
  slate: '#0F172A',
  blue: '#2563EB',
  red: '#DC2626',
  amber: '#D97706',
  violet: '#7C3AED',
  sky: '#0284C7',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  light: '#F1F5F9',
  green: '#16A34A',
  indigo: '#4F46E5',
}

const MOCK_COURIERS = [
  {
    id: 'CR-2091',
    name: 'Alisher Zokirov',
    avatar: 'AZ',
    status: 'Busy',
    transport: 'Motorbike',
    rating: 4.9,
    load: 80,
    ordersToday: 19,
    totalOrders: 1842,
    area: 'Chilonzor',
    phone: '+998 90 876 22 11',
    joined: 'Mar 2023',
    earnings: 284500,
    activeOrder: {
      id: 'MGO-88421',
      customer: 'Anvar Rustamov',
      address: 'Chilonzor-3, 45-uy',
      eta: '14:55',
      distance: '2.4 km',
    },
    lat: 41.2775,
    lng: 69.1983,
  },
  {
    id: 'CR-1882',
    name: 'Sardor Umidov',
    avatar: 'SU',
    status: 'Online',
    transport: 'Bicycle',
    rating: 4.7,
    load: 20,
    ordersToday: 11,
    totalOrders: 934,
    area: 'Yunusobod',
    phone: '+998 93 115 41 18',
    joined: 'Jun 2023',
    earnings: 145000,
    activeOrder: null,
    lat: 41.328,
    lng: 69.2965,
  },
  {
    id: 'CR-5541',
    name: 'Jasur Aliev',
    avatar: 'JA',
    status: 'Offline',
    transport: 'Car',
    rating: 4.8,
    load: 0,
    ordersToday: 0,
    totalOrders: 2210,
    area: 'Mirzo Ulugbek',
    phone: '+998 91 440 09 00',
    joined: 'Jan 2023',
    earnings: 0,
    activeOrder: null,
    lat: 41.3117,
    lng: 69.3431,
  },
  {
    id: 'CR-2307',
    name: 'Bekzod Karimov',
    avatar: 'BK',
    status: 'Online',
    transport: 'Scooter',
    rating: 4.6,
    load: 55,
    ordersToday: 15,
    totalOrders: 1105,
    area: 'Olmazor',
    phone: '+998 99 700 12 10',
    joined: 'Apr 2023',
    earnings: 198000,
    activeOrder: {
      id: 'MGO-88414',
      customer: 'Gulnora Ibragimova',
      address: 'Olmazor-5, 12-uy',
      eta: '15:10',
      distance: '3.1 km',
    },
    lat: 41.2844,
    lng: 69.2088,
  },
  {
    id: 'CR-3312',
    name: 'Otabek Hamidov',
    avatar: 'OH',
    status: 'Busy',
    transport: 'Motorbike',
    rating: 4.5,
    load: 90,
    ordersToday: 22,
    totalOrders: 3012,
    area: 'Yakkasaroy',
    phone: '+998 90 321 44 55',
    joined: 'Nov 2022',
    earnings: 312000,
    activeOrder: {
      id: 'MGO-88419',
      customer: 'Jasur Aliev',
      address: 'Yakkasaroy-2, 8-uy',
      eta: '14:30',
      distance: '1.8 km',
    },
    lat: 41.2995,
    lng: 69.2401,
  },
  {
    id: 'CR-4421',
    name: 'Nodir Rashidov',
    avatar: 'NR',
    status: 'Online',
    transport: 'Bicycle',
    rating: 4.3,
    load: 10,
    ordersToday: 7,
    totalOrders: 512,
    area: 'Sergeli',
    phone: '+998 94 888 77 66',
    joined: 'Aug 2023',
    earnings: 89000,
    activeOrder: null,
    lat: 41.2241,
    lng: 69.2619,
  },
  {
    id: 'CR-6102',
    name: 'Hamid Ortiqov',
    avatar: 'HO',
    status: 'Online',
    transport: 'Scooter',
    rating: 4.8,
    load: 40,
    ordersToday: 13,
    totalOrders: 1678,
    area: 'Shayhontohur',
    phone: '+998 91 555 33 22',
    joined: 'Feb 2023',
    earnings: 176000,
    activeOrder: {
      id: 'MGO-88413',
      customer: 'Gulnora Ibragimova',
      address: 'Shayxontohur-3, 15-uy',
      eta: '13:58',
      distance: '1.2 km',
    },
    lat: 41.3419,
    lng: 69.2785,
  },
  {
    id: 'CR-7890',
    name: 'Sanjar Azimov',
    avatar: 'SA',
    status: 'Offline',
    transport: 'Car',
    rating: 4.9,
    load: 0,
    ordersToday: 0,
    totalOrders: 4201,
    area: 'Uchtepa',
    phone: '+998 90 444 22 11',
    joined: 'Oct 2022',
    earnings: 0,
    activeOrder: null,
    lat: 41.2633,
    lng: 69.1752,
  },
  {
    id: 'CR-9001',
    name: 'Javlon Kalandarov',
    avatar: 'JK',
    status: 'Busy',
    transport: 'Motorbike',
    rating: 4.7,
    load: 70,
    ordersToday: 18,
    totalOrders: 2344,
    area: 'Bektemir',
    phone: '+998 93 666 55 44',
    joined: 'Dec 2022',
    earnings: 254000,
    activeOrder: {
      id: 'MGO-88412',
      customer: 'Otabek Mirzayev',
      address: 'Bektemir-2, 9-uy',
      eta: '13:45',
      distance: '4.2 km',
    },
    lat: 41.2752,
    lng: 69.361,
  },
  {
    id: 'CR-1023',
    name: 'Akbar Nazarov',
    avatar: 'AN',
    status: 'Online',
    transport: 'Bicycle',
    rating: 4.4,
    load: 30,
    ordersToday: 9,
    totalOrders: 723,
    area: 'Yunusobod',
    phone: '+998 97 111 00 99',
    joined: 'Jul 2023',
    earnings: 112000,
    activeOrder: null,
    lat: 41.335,
    lng: 69.3012,
  },
]

const STATUS_CFG = {
  Busy: { bg: '#FFF7ED', color: '#C2410C', dot: '#F97316', label: 'Busy' },
  Online: { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', label: 'Online' },
  Offline: {
    bg: '#F1F5F9',
    color: '#64748B',
    dot: '#94A3B8',
    label: 'Offline',
  },
}

const TRANSPORT_ICONS = {
  Motorbike: '🛵',
  Bicycle: '🚲',
  Car: '🚗',
  Scooter: '🛺',
}
const AREAS = [
  'Barcha hududlar',
  'Chilonzor',
  'Yunusobod',
  'Mirzo Ulugbek',
  'Olmazor',
  'Yakkasaroy',
  'Sergeli',
  'Shayhontohur',
  'Bektemir',
  'Uchtepa',
]
const TRANSPORTS = [
  'Barcha transport',
  'Motorbike',
  'Bicycle',
  'Car',
  'Scooter',
]
const STATUSES = ['Barcha holat', 'Online', 'Busy', 'Offline']

function Select({ label, value, onChange, options }) {
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
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: '7px 10px',
          fontSize: 12,
          fontWeight: 600,
          color: C.text,
          cursor: 'pointer',
          minWidth: 140,
          justifyContent: 'space-between',
          boxShadow: open ? `0 0 0 2px ${C.orange}33` : 'none',
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
            zIndex: 200,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(0,0,0,.12)',
            minWidth: '100%',
            overflow: 'hidden',
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
                padding: '8px 12px',
                fontSize: 12,
                fontWeight: value === opt ? 700 : 500,
                color: value === opt ? C.orange : C.text,
                cursor: 'pointer',
                background: value === opt ? '#FFF7ED' : 'transparent',
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

function Avatar({ initials, size = 34, bg = '#FFF7ED', color = C.orange }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.35,
        background: bg,
        border: `2px solid ${color}33`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.32,
        fontWeight: 800,
        color,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

function StatusBadge({ status }) {
  const s = STATUS_CFG[status]
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
        letterSpacing: 0.2,
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

function LoadBar({ value }) {
  const color = value >= 70 ? C.orange : value >= 30 ? C.amber : C.emerald
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: C.muted,
          width: 28,
          flexShrink: 0,
        }}
      >
        {value}%
      </span>
      <div
        style={{
          flex: 1,
          height: 6,
          background: C.light,
          borderRadius: 99,
          overflow: 'hidden',
          minWidth: 60,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: color,
            borderRadius: 99,
            transition: 'width .4s',
          }}
        />
      </div>
    </div>
  )
}

function MiniMap({ courier }) {
  return (
    <div
      style={{
        height: 140,
        background: '#D4E8F0',
        borderRadius: 12,
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 320 140"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
      >
        <rect width="320" height="140" fill="#D4E1EC" />
        {[
          [0, 42, 320, 42],
          [0, 84, 320, 84],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#B8CCDA"
            strokeWidth="12"
          />
        ))}
        {[
          [70, 0, 70, 140],
          [160, 0, 160, 140],
          [250, 0, 250, 140],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#B8CCDA"
            strokeWidth="10"
          />
        ))}
        {[
          [75, 8, 55, 20],
          [90, 8, 45, 20],
          [168, 10, 55, 18],
          [260, 8, 50, 18],
          [75, 53, 55, 20],
          [90, 53, 45, 20],
          [168, 53, 55, 18],
          [75, 96, 55, 22],
          [90, 96, 45, 20],
          [168, 96, 55, 18],
          [260, 96, 50, 20],
        ].map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            fill="#C0D4E0"
            rx="3"
          />
        ))}
        <path
          d="M 70,63 Q 110,30 160,63 Q 210,95 250,63"
          stroke="#F97316"
          strokeWidth="2.5"
          strokeDasharray="6,4"
          fill="none"
          opacity="0.85"
        />
        <circle
          cx="250"
          cy="63"
          r="8"
          fill="#DC262640"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <text x="250" y="67" textAnchor="middle" fontSize="9" fill="#DC2626">
          📍
        </text>
        <circle
          cx="148"
          cy="63"
          r="11"
          fill="#F97316"
          stroke="#fff"
          strokeWidth="2.5"
        />
        <text x="148" y="67" textAnchor="middle" fontSize="11">
          🛵
        </text>
        <circle
          cx="70"
          cy="63"
          r="6"
          fill="#22C55E"
          stroke="#fff"
          strokeWidth="2"
        />
        <text x="70" y="67" textAnchor="middle" fontSize="8">
          🏪
        </text>
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          background: 'rgba(255,255,255,.92)',
          borderRadius: 7,
          padding: '3px 8px',
          fontSize: 10,
          fontWeight: 700,
          color: C.orange,
        }}
      >
        {courier} · Jonli
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          background: C.slate,
          color: '#fff',
          borderRadius: 7,
          padding: '3px 8px',
          fontSize: 10,
          fontWeight: 700,
        }}
      >
        ~8 daqiqa qoldi
      </div>
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {['+', '−'].map(s => (
          <button
            key={s}
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              background: '#fff',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.text,
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function DetailPanel({ courier, onClose }) {
  if (!courier) return null
  const sc = STATUS_CFG[courier.status]
  const hasActive = !!courier.activeOrder

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 20px 14px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          background: `linear-gradient(135deg, #FFF7ED, #fff)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar initials={courier.avatar} size={48} />
            <div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 900,
                  color: C.text,
                  letterSpacing: -0.4,
                }}
              >
                {courier.name}
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                ID: {courier.id} · {courier.area}
              </div>
              <div style={{ marginTop: 6 }}>
                <StatusBadge status={courier.status} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: C.light,
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: C.muted,
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Quick stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 8,
            marginBottom: 14,
          }}
        >
          {[
            { label: 'Reyting', value: `★ ${courier.rating}`, color: C.amber },
            {
              label: 'Bugun',
              value: `${courier.ordersToday} buyurtma`,
              color: C.blue,
            },
            {
              label: 'Jami',
              value: `${courier.totalOrders.toLocaleString()}`,
              color: C.emerald,
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '10px 10px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color }}>
                {value}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: C.muted,
                  marginTop: 2,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.3,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Contact + Vehicle */}
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
              Aloqa
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
              {courier.phone}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
              Qo'shilgan: {courier.joined}
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
              Transport
            </div>
            <div style={{ fontSize: 18 }}>
              {TRANSPORT_ICONS[courier.transport]}
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.text,
                marginTop: 2,
              }}
            >
              {courier.transport}
            </div>
          </div>
        </div>

        {/* Load + Earnings */}
        <div
          style={{
            background: C.light,
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 14,
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
              style={{
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Bugungi yuk
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.orange }}>
              {courier.load}% band
            </span>
          </div>
          <LoadBar value={courier.load} />
          {courier.earnings > 0 && (
            <div
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTop: `1px solid ${C.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 10, color: C.muted, fontWeight: 600 }}>
                Bugungi daromad
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: C.green }}>
                {courier.earnings.toLocaleString()} UZS
              </span>
            </div>
          )}
        </div>

        {/* Active order */}
        {hasActive && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 10,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Faol buyurtma
            </div>
            <div
              style={{
                background: '#FFF7ED',
                border: `1px solid ${C.orange}33`,
                borderRadius: 12,
                padding: '12px 14px',
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 800, color: C.text }}>
                  #{courier.activeOrder.id}
                </span>
                <span
                  style={{ fontSize: 10, fontWeight: 700, color: C.orange }}
                >
                  ETA: {courier.activeOrder.eta}
                </span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>
                👤 {courier.activeOrder.customer}
              </div>
              <div style={{ fontSize: 11, color: C.muted }}>
                📍 {courier.activeOrder.address}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.blue,
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                🗺 {courier.activeOrder.distance} qoldi
              </div>
            </div>
            <MiniMap courier={courier.name.split(' ')[0]} />
          </div>
        )}

        {/* Performance chart (mini bar chart) */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              color: C.muted,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            Haftalik faollik
          </div>
          <div
            style={{
              display: 'flex',
              gap: 5,
              alignItems: 'flex-end',
              height: 60,
            }}
          >
            {[65, 88, 72, 95, 55, courier.ordersToday * 4.5, 40].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: Math.min(h, 48),
                    background: i === 5 ? C.orange : C.light,
                    borderRadius: '4px 4px 0 0',
                    border:
                      i === 5
                        ? `1px solid ${C.orange}`
                        : `1px solid ${C.border}`,
                    transition: 'height .3s',
                  }}
                />
                <span
                  style={{
                    fontSize: 8,
                    color: i === 5 ? C.orange : C.muted,
                    fontWeight: i === 5 ? 700 : 400,
                  }}
                >
                  {['Du', 'Se', 'Ch', 'Pa', 'Sh', 'Ya', 'Dy'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginBottom: 4 }}>
          <div
            style={{
              fontSize: 10,
              color: C.muted,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Amallar
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          >
            {[
              { icon: '📞', label: "Qo'ng'iroq", color: C.blue },
              { icon: '💬', label: 'Xabar', color: C.emerald },
              { icon: '🔄', label: 'Buyurtma tayinlash', color: C.orange },
              { icon: '⏸', label: "Dam olishga o'chirish", color: C.red },
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
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '12px 20px',
          borderTop: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        <button
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: 12,
            border: 'none',
            background: C.slate,
            color: '#fff',
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
            letterSpacing: 0.2,
          }}
        >
          📋 To'liq profil va tarixni ko'rish
        </button>
      </div>
    </div>
  )
}

export default function MilliyGoSuperadminCouriersPage() {
  const [selectedCourier, setSelectedCourier] = useState(null)
  const [statusFilter, setStatusFilter] = useState('Barcha holat')
  const [areaFilter, setAreaFilter] = useState('Barcha hududlar')
  const [transportFilter, setTransportFilter] = useState('Barcha transport')
  const [search, setSearch] = useState('')
  const [sortCol, setSortCol] = useState('ordersToday')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState('all')
  const PAGE_SIZE = 8

  const filtered = useMemo(() => {
    let data = [...MOCK_COURIERS]
    if (statusFilter !== 'Barcha holat')
      data = data.filter(c => c.status === statusFilter)
    if (areaFilter !== 'Barcha hududlar')
      data = data.filter(c => c.area === areaFilter)
    if (transportFilter !== 'Barcha transport')
      data = data.filter(c => c.transport === transportFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.area.toLowerCase().includes(q) ||
          c.phone.includes(q),
      )
    }
    data.sort((a, b) => {
      let av = a[sortCol],
        bv = b[sortCol]
      if (typeof av === 'string')
        ((av = av.toLowerCase()), (bv = bv.toLowerCase()))
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
    })
    return data
  }, [statusFilter, areaFilter, transportFilter, search, sortCol, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortCol(col)
      setSortDir('desc')
    }
  }

  const stats = {
    total: MOCK_COURIERS.length,
    online: MOCK_COURIERS.filter(c => c.status === 'Online').length,
    busy: MOCK_COURIERS.filter(c => c.status === 'Busy').length,
    offline: MOCK_COURIERS.filter(c => c.status === 'Offline').length,
    orders: MOCK_COURIERS.reduce((s, c) => s + c.ordersToday, 0),
    avgRating: (
      MOCK_COURIERS.reduce((s, c) => s + c.rating, 0) / MOCK_COURIERS.length
    ).toFixed(1),
  }

  const COL_HEADERS = [
    { key: 'name', label: 'Kuryer', flex: true },
    { key: 'status', label: 'Holat', w: 100 },
    { key: 'transport', label: 'Transport', w: 110 },
    { key: 'area', label: 'Hudud', w: 120 },
    { key: 'rating', label: 'Reyting', w: 90, right: true },
    { key: 'load', label: 'Yuk', w: 140 },
    { key: 'ordersToday', label: 'Bugun', w: 90, right: true },
    { key: '_actions', label: '', w: 80 },
  ]

  const TAB_COUNTS = {
    all: MOCK_COURIERS.length,
    online: stats.online,
    busy: stats.busy,
    offline: stats.offline,
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        fontFamily: "'Outfit','Inter',sans-serif",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        button:hover { opacity: .88; }
      `}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* ── Page Header ── */}
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
                background: '#FFF7ED',
                border: '1px solid #FED7AA',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 10,
                fontWeight: 700,
                color: C.orange,
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
              Courier Operations
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Real-time tracking, performance overview and courier availability
              control
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
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
              <span>⬇</span> Eksport
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: C.orange,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '9px 16px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${C.orange}44`,
              }}
            >
              <span style={{ fontSize: 14 }}>＋</span> Yangi kuryer
            </button>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {[
            {
              label: 'Jami kuryerlar',
              value: stats.total,
              color: C.indigo,
              icon: '🛵',
            },
            {
              label: 'Online',
              value: stats.online,
              color: C.emerald,
              icon: '🟢',
            },
            { label: 'Busy', value: stats.busy, color: C.orange, icon: '🔄' },
            {
              label: 'Offline',
              value: stats.offline,
              color: C.muted,
              icon: '⚫',
            },
            {
              label: 'Bugungi buyurtmalar',
              value: stats.orders,
              color: C.blue,
              icon: '📦',
            },
            {
              label: "O'rtacha reyting",
              value: `★ ${stats.avgRating}`,
              color: C.amber,
              icon: '⭐',
            },
          ].map(({ label, value, color, icon }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: C.card,
                borderRadius: 12,
                padding: '12px 14px',
                border: `1px solid ${C.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: color + '15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color }}>
                  {value}
                </div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
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
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <Select
              label="Holat"
              value={statusFilter}
              onChange={v => {
                setStatusFilter(v)
                setPage(1)
              }}
              options={STATUSES}
            />
            <Select
              label="Hudud"
              value={areaFilter}
              onChange={v => {
                setAreaFilter(v)
                setPage(1)
              }}
              options={AREAS}
            />
            <Select
              label="Transport"
              value={transportFilter}
              onChange={v => {
                setTransportFilter(v)
                setPage(1)
              }}
              options={TRANSPORTS}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
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
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  placeholder="Ism, ID, telefon, hudud..."
                  style={{
                    width: '100%',
                    padding: '7px 10px 7px 30px',
                    borderRadius: 8,
                    fontSize: 12,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    color: C.text,
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>
            <div>
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
                Saralash
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[
                  ['ordersToday', 'Buyurtma'],
                  ['rating', 'Reyting'],
                  ['load', 'Yuk'],
                ].map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => handleSort(k)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: 8,
                      border: `1px solid ${sortCol === k ? C.orange : C.border}`,
                      background: sortCol === k ? '#FFF7ED' : C.card,
                      color: sortCol === k ? C.orange : C.text,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {l} {sortCol === k ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Status Tabs ── */}
        <div
          style={{
            display: 'flex',
            gap: 2,
            marginBottom: 14,
            borderBottom: `2px solid ${C.border}`,
          }}
        >
          {[
            ['all', 'Hammasi'],
            ['online', 'Online'],
            ['busy', 'Busy'],
            ['offline', 'Offline'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key)
                setStatusFilter(
                  key === 'all'
                    ? 'Barcha holat'
                    : key.charAt(0).toUpperCase() + key.slice(1),
                )
                setPage(1)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
                color: activeTab === key ? C.orange : C.muted,
                borderBottom: `3px solid ${activeTab === key ? C.orange : 'transparent'}`,
                marginBottom: -2,
                transition: 'all .2s',
              }}
            >
              {label}
              <span
                style={{
                  background: activeTab === key ? C.orange : C.light,
                  color: activeTab === key ? '#fff' : C.muted,
                  borderRadius: 99,
                  padding: '1px 7px',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {TAB_COUNTS[key]}
              </span>
            </button>
          ))}
        </div>

        {/* ── Main Layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selectedCourier ? '1fr 360px' : '1fr',
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
            {/* Col headers */}
            <div
              style={{
                display: 'flex',
                borderBottom: `2px solid ${C.border}`,
                background: '#FAFAFA',
              }}
            >
              {COL_HEADERS.map(({ key, label, w, flex: isFlex, right }) => (
                <div
                  key={key}
                  onClick={() => key !== '_actions' && handleSort(key)}
                  style={{
                    padding: '11px 12px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    cursor: key !== '_actions' ? 'pointer' : 'default',
                    width: isFlex ? undefined : w,
                    flex: isFlex ? 1 : undefined,
                    minWidth: w,
                    textAlign: right ? 'right' : 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    userSelect: 'none',
                    background: sortCol === key ? '#FFF7ED' : 'transparent',
                  }}
                >
                  {label}
                  {sortCol === key && (
                    <span style={{ fontSize: 8, color: C.orange }}>
                      {sortDir === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Rows */}
            {paged.length === 0 ? (
              <div
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: C.muted,
                  fontSize: 13,
                }}
              >
                🔍 Kuryer topilmadi
              </div>
            ) : (
              paged.map(courier => {
                const isSelected = selectedCourier?.id === courier.id
                return (
                  <div
                    key={courier.id}
                    onClick={() =>
                      setSelectedCourier(isSelected ? null : courier)
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      background: isSelected ? '#FFF7ED' : 'transparent',
                      borderLeft: `3px solid ${isSelected ? C.orange : 'transparent'}`,
                      transition: 'background .15s',
                    }}
                  >
                    {/* Name */}
                    <div
                      style={{
                        flex: 1,
                        padding: '12px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        minWidth: 0,
                      }}
                    >
                      <Avatar initials={courier.avatar} size={38} />
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: isSelected ? C.orange : C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {courier.name}
                        </div>
                        <div
                          style={{ fontSize: 10, color: C.muted, marginTop: 1 }}
                        >
                          {courier.id} · {courier.phone}
                        </div>
                      </div>
                    </div>
                    {/* Status */}
                    <div
                      style={{ width: 100, minWidth: 100, padding: '12px 8px' }}
                    >
                      <StatusBadge status={courier.status} />
                    </div>
                    {/* Transport */}
                    <div
                      style={{
                        width: 110,
                        minWidth: 110,
                        padding: '12px 10px',
                        fontSize: 12,
                        fontWeight: 600,
                        color: C.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>
                        {TRANSPORT_ICONS[courier.transport]}
                      </span>
                      {courier.transport}
                    </div>
                    {/* Area */}
                    <div
                      style={{
                        width: 120,
                        minWidth: 120,
                        padding: '12px 10px',
                        fontSize: 11,
                        color: C.muted,
                        fontWeight: 500,
                      }}
                    >
                      📍 {courier.area}
                    </div>
                    {/* Rating */}
                    <div
                      style={{
                        width: 90,
                        minWidth: 90,
                        padding: '12px 10px',
                        textAlign: 'right',
                        fontSize: 13,
                        fontWeight: 800,
                        color: C.amber,
                      }}
                    >
                      ★ {courier.rating}
                    </div>
                    {/* Load */}
                    <div
                      style={{
                        width: 140,
                        minWidth: 140,
                        padding: '12px 12px',
                      }}
                    >
                      <LoadBar value={courier.load} />
                    </div>
                    {/* Orders Today */}
                    <div
                      style={{
                        width: 90,
                        minWidth: 90,
                        padding: '12px 12px',
                        textAlign: 'right',
                      }}
                    >
                      <span
                        style={{
                          background: C.light,
                          borderRadius: 8,
                          padding: '4px 10px',
                          fontSize: 12,
                          fontWeight: 800,
                          color: C.text,
                        }}
                      >
                        {courier.ordersToday}
                      </span>
                    </div>
                    {/* Actions */}
                    <div
                      style={{
                        width: 80,
                        minWidth: 80,
                        padding: '12px 10px',
                        display: 'flex',
                        gap: 5,
                      }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        style={{
                          padding: '5px 8px',
                          borderRadius: 7,
                          border: `1px solid ${C.border}`,
                          background: C.card,
                          fontSize: 11,
                          fontWeight: 600,
                          color: C.text,
                          cursor: 'pointer',
                        }}
                      >
                        Ko'rish
                      </button>
                    </div>
                  </div>
                )
              })
            )}

            {/* Pagination */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderTop: `1px solid ${C.border}`,
              }}
            >
              <span style={{ fontSize: 12, color: C.muted }}>
                Jami <strong>{filtered.length}</strong> dan{' '}
                {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
                {Math.min(page * PAGE_SIZE, filtered.length)} ko'rsatilmoqda
              </span>
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: page === 1 ? C.light : C.card,
                    color: page === 1 ? C.muted : C.text,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: page === 1 ? 'default' : 'pointer',
                  }}
                >
                  ← Oldingi
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + Math.max(1, Math.min(page - 2, totalPages - 4))
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        border: `1px solid ${page === p ? C.orange : C.border}`,
                        background: page === p ? C.orange : C.card,
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
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: page === totalPages ? C.light : C.card,
                    color: page === totalPages ? C.muted : C.text,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: page === totalPages ? 'default' : 'pointer',
                  }}
                >
                  Keyingi →
                </button>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          {selectedCourier && (
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
                boxShadow: '0 4px 20px rgba(249,115,22,.12)',
              }}
            >
              <DetailPanel
                courier={selectedCourier}
                onClose={() => setSelectedCourier(null)}
              />
            </div>
          )}
        </div>

        {/* ── Bottom Metrics ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 10,
            marginTop: 14,
          }}
        >
          {[
            {
              title: 'Online kuryerlar',
              value: `${stats.online}`,
              sub: `Jami flot: ${stats.total}`,
              accent: C.emerald,
            },
            {
              title: "O'rtacha yetkazish vaqti",
              value: '18 daq',
              sub: 'Shahar markazi optimallashtirish',
              accent: C.blue,
            },
            {
              title: 'Kechikkan yetkazishlar',
              value: '3',
              sub: "Bugun e'tibor talab qiladi",
              accent: C.red,
            },
          ].map(({ title, value, sub, accent }) => (
            <div
              key={title}
              style={{
                background: C.card,
                borderRadius: 12,
                padding: '16px 18px',
                border: `1px solid ${C.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
              }}
            >
              <div>
                <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>
                  {title}
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: C.text,
                    letterSpacing: -1,
                    marginTop: 6,
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                  {sub}
                </div>
              </div>
              <div
                style={{
                  background: accent + '15',
                  borderRadius: 10,
                  padding: '6px 10px',
                  fontSize: 10,
                  fontWeight: 700,
                  color: accent,
                }}
              >
                Live
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
