import { useState, useMemo, useRef, useEffect } from 'react'

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  brand: '#0D9488',
  brandD: '#0F766E',
  brandL: '#F0FDFA',
  brandB: '#99F6E4',
  orange: '#F97316',
  blue: '#2563EB',
  emerald: '#059669',
  violet: '#7C3AED',
  sky: '#0EA5E9',
  rose: '#F43F5E',
  amber: '#D97706',
  lime: '#65A30D',
  red: '#DC2626',
  green: '#16A34A',
  indigo: '#4F46E5',
  pink: '#EC4899',
  text: '#0F172A',
  muted: '#64748B',
  muted2: '#94A3B8',
  border: '#E2E8F0',
  light: '#F1F5F9',
  light2: '#F8FAFC',
  card: '#FFFFFF',
  bg: '#F0F4F8',
  dark: '#0F172A',
}

const SVC = {
  Food: { color: C.orange, light: '#FFF7ED', icon: '🍔' },
  Market: { color: C.emerald, light: '#F0FDF4', icon: '🛒' },
  Taxi: { color: C.violet, light: '#F5F3FF', icon: '🚖' },
  Cargo: { color: C.sky, light: '#F0F9FF', icon: '📦' },
}

const ZONE_STATUS = {
  Active: { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', label: 'Faol' },
  Partial: { bg: '#FFFBEB', color: '#B45309', dot: '#FBBF24', label: 'Qisman' },
  Inactive: {
    bg: '#F1F5F9',
    color: '#64748B',
    dot: '#94A3B8',
    label: 'Faolsiz',
  },
  Planned: {
    bg: '#EFF6FF',
    color: '#1D4ED8',
    dot: '#60A5FA',
    label: 'Rejalashgan',
  },
}

const ZONE_TYPE = {
  Viloyat: { icon: '🗺️', color: C.brand },
  Shahar: { icon: '🏙️', color: C.blue },
  Tuman: { icon: '📍', color: C.violet },
  Maxsus: { icon: '⭐', color: C.amber },
}

const fmt = n => new Intl.NumberFormat('uz-UZ').format(n)
const fmtM = n =>
  n >= 1e9
    ? `${(n / 1e9).toFixed(2)}mlrd`
    : n >= 1e6
      ? `${(n / 1e6).toFixed(1)}mln`
      : n >= 1e3
        ? `${(n / 1e3).toFixed(0)}ming`
        : String(n)

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const REGIONS = [
  {
    id: 'RGN-01',
    code: 'TSH',
    name: 'Toshkent shahri',
    type: 'Shahar',
    status: 'Active',
    capital: 'Toshkent',
    area: 335,
    population: 3200000,
    districts: 11,
    coords: { x: 68, y: 44 },
    mapSize: 38,
    services: ['Food', 'Market', 'Taxi', 'Cargo'],
    couriers: 284,
    partners: 1840,
    users: 94200,
    activeOrders: 1240,
    revenue: 3840000000,
    orders: 18420,
    avgDelivery: 24,
    rating: 4.8,
    growth: 12.4,
    coverage: 98,
    slaRate: 96.2,
    zones: [
      { name: 'Yunusobod', couriers: 48, orders: 3120, status: 'Active' },
      { name: 'Chilonzor', couriers: 42, orders: 2840, status: 'Active' },
      { name: "Mirzo Ulug'bek", couriers: 38, orders: 2680, status: 'Active' },
      { name: 'Shayxontohur', couriers: 35, orders: 2420, status: 'Active' },
      { name: 'Yakkasaroy', couriers: 30, orders: 2100, status: 'Active' },
    ],
    hourly: [
      20, 8, 5, 4, 4, 6, 18, 42, 65, 80, 88, 92, 75, 82, 88, 95, 100, 96, 88,
      72, 58, 42, 32, 24,
    ],
    weeklyRev: [520, 480, 610, 570, 640, 720, 680],
  },
  {
    id: 'RGN-02',
    code: 'SAM',
    name: 'Samarqand viloyati',
    type: 'Viloyat',
    status: 'Active',
    capital: 'Samarqand',
    area: 16773,
    population: 3920000,
    districts: 14,
    coords: { x: 54, y: 55 },
    mapSize: 24,
    services: ['Food', 'Market', 'Taxi'],
    couriers: 68,
    partners: 420,
    users: 18400,
    activeOrders: 142,
    revenue: 820000000,
    orders: 3210,
    avgDelivery: 32,
    rating: 4.6,
    growth: 8.1,
    coverage: 72,
    slaRate: 91.4,
    zones: [
      { name: 'Samarqand sh.', couriers: 28, orders: 1420, status: 'Active' },
      { name: "Kattaqo'rg'on", couriers: 18, orders: 980, status: 'Active' },
      { name: 'Ishtixon', couriers: 12, orders: 540, status: 'Partial' },
      { name: 'Urgut', couriers: 10, orders: 270, status: 'Partial' },
    ],
    hourly: [
      12, 5, 3, 2, 3, 5, 14, 35, 52, 68, 74, 78, 62, 70, 76, 82, 86, 80, 72, 58,
      44, 32, 22, 16,
    ],
    weeklyRev: [108, 98, 124, 116, 132, 148, 138],
  },
  {
    id: 'RGN-03',
    code: 'NAM',
    name: 'Namangan viloyati',
    type: 'Viloyat',
    status: 'Active',
    capital: 'Namangan',
    area: 7900,
    population: 2780000,
    districts: 11,
    coords: { x: 72, y: 32 },
    mapSize: 20,
    services: ['Food', 'Market', 'Taxi', 'Cargo'],
    couriers: 52,
    partners: 310,
    users: 15200,
    activeOrders: 98,
    revenue: 680000000,
    orders: 2780,
    avgDelivery: 29,
    rating: 4.7,
    growth: 14.2,
    coverage: 65,
    slaRate: 93.1,
    zones: [
      { name: 'Namangan sh.', couriers: 24, orders: 1340, status: 'Active' },
      { name: 'Chortoq', couriers: 14, orders: 780, status: 'Active' },
      { name: 'Uychi', couriers: 8, orders: 380, status: 'Partial' },
      { name: 'Pop', couriers: 6, orders: 280, status: 'Planned' },
    ],
    hourly: [
      10, 4, 2, 2, 3, 5, 12, 32, 48, 62, 70, 74, 58, 66, 72, 78, 82, 76, 68, 54,
      40, 28, 18, 12,
    ],
    weeklyRev: [90, 84, 106, 98, 112, 126, 116],
  },
  {
    id: 'RGN-04',
    code: 'AND',
    name: 'Andijon viloyati',
    type: 'Viloyat',
    status: 'Active',
    capital: 'Andijon',
    area: 4200,
    population: 3060000,
    districts: 14,
    coords: { x: 80, y: 36 },
    mapSize: 18,
    services: ['Food', 'Market', 'Taxi'],
    couriers: 44,
    partners: 248,
    users: 13100,
    activeOrders: 84,
    revenue: 590000000,
    orders: 2340,
    avgDelivery: 31,
    rating: 4.5,
    growth: 9.8,
    coverage: 58,
    slaRate: 89.6,
    zones: [
      { name: 'Andijon sh.', couriers: 20, orders: 1120, status: 'Active' },
      { name: 'Asaka', couriers: 12, orders: 680, status: 'Active' },
      { name: "Xo'jaobod", couriers: 8, orders: 360, status: 'Partial' },
      { name: 'Shahrixon', couriers: 4, orders: 180, status: 'Planned' },
    ],
    hourly: [
      8, 3, 2, 1, 2, 4, 10, 28, 44, 56, 64, 68, 54, 60, 66, 72, 76, 70, 62, 48,
      36, 24, 14, 10,
    ],
    weeklyRev: [78, 72, 94, 88, 100, 112, 104],
  },
  {
    id: 'RGN-05',
    code: 'FAR',
    name: "Farg'ona viloyati",
    type: 'Viloyat',
    status: 'Active',
    capital: "Farg'ona",
    area: 6800,
    population: 3780000,
    districts: 15,
    coords: { x: 77, y: 40 },
    mapSize: 20,
    services: ['Food', 'Market', 'Taxi'],
    couriers: 46,
    partners: 268,
    users: 11600,
    activeOrders: 76,
    revenue: 520000000,
    orders: 2080,
    avgDelivery: 33,
    rating: 4.6,
    growth: 6.3,
    coverage: 55,
    slaRate: 88.4,
    zones: [
      { name: "Farg'ona sh.", couriers: 22, orders: 1020, status: 'Active' },
      { name: "Marg'ilon", couriers: 14, orders: 640, status: 'Active' },
      { name: "Qo'shtepa", couriers: 6, orders: 280, status: 'Partial' },
      { name: 'Rishton', couriers: 4, orders: 140, status: 'Planned' },
    ],
    hourly: [
      8, 3, 2, 1, 2, 4, 10, 26, 42, 54, 62, 66, 52, 58, 64, 70, 74, 68, 60, 46,
      34, 22, 14, 10,
    ],
    weeklyRev: [68, 62, 84, 78, 88, 100, 92],
  },
  {
    id: 'RGN-06',
    code: 'BUX',
    name: 'Buxoro viloyati',
    type: 'Viloyat',
    status: 'Partial',
    capital: 'Buxoro',
    area: 39400,
    population: 1960000,
    districts: 11,
    coords: { x: 42, y: 52 },
    mapSize: 18,
    services: ['Food', 'Taxi'],
    couriers: 28,
    partners: 142,
    users: 9200,
    activeOrders: 42,
    revenue: 410000000,
    orders: 1640,
    avgDelivery: 38,
    rating: 4.4,
    growth: -2.1,
    coverage: 42,
    slaRate: 84.2,
    zones: [
      { name: 'Buxoro sh.', couriers: 18, orders: 980, status: 'Active' },
      { name: "G'ijduvon", couriers: 6, orders: 420, status: 'Partial' },
      { name: 'Kogon', couriers: 4, orders: 240, status: 'Partial' },
    ],
    hourly: [
      6, 2, 1, 1, 1, 3, 8, 22, 36, 46, 52, 56, 44, 50, 54, 60, 64, 58, 52, 40,
      28, 18, 10, 8,
    ],
    weeklyRev: [52, 48, 62, 58, 68, 76, 70],
  },
  {
    id: 'RGN-07',
    code: 'QQN',
    name: "Qo'qon tumani",
    type: 'Tuman',
    status: 'Active',
    capital: "Qo'qon",
    area: 120,
    population: 240000,
    districts: 3,
    coords: { x: 74, y: 42 },
    mapSize: 12,
    services: ['Food', 'Market', 'Taxi'],
    couriers: 18,
    partners: 98,
    users: 6400,
    activeOrders: 32,
    revenue: 290000000,
    orders: 1180,
    avgDelivery: 27,
    rating: 4.7,
    growth: 18.7,
    coverage: 80,
    slaRate: 94.8,
    zones: [
      { name: 'Markaziy', couriers: 10, orders: 680, status: 'Active' },
      { name: 'Janubiy', couriers: 5, orders: 320, status: 'Active' },
      { name: 'Shimoliy', couriers: 3, orders: 180, status: 'Partial' },
    ],
    hourly: [
      6, 2, 1, 1, 1, 3, 8, 22, 34, 44, 50, 54, 42, 48, 52, 58, 62, 56, 50, 38,
      26, 16, 10, 8,
    ],
    weeklyRev: [38, 34, 46, 42, 50, 56, 52],
  },
  {
    id: 'RGN-08',
    code: 'NUK',
    name: 'Nukus shahri',
    type: 'Shahar',
    status: 'Partial',
    capital: 'Nukus',
    area: 200,
    population: 340000,
    districts: 4,
    coords: { x: 18, y: 28 },
    mapSize: 14,
    services: ['Food', 'Taxi'],
    couriers: 14,
    partners: 72,
    users: 4100,
    activeOrders: 18,
    revenue: 180000000,
    orders: 720,
    avgDelivery: 35,
    rating: 4.3,
    growth: 22.3,
    coverage: 38,
    slaRate: 82.6,
    zones: [
      { name: 'Markaziy', couriers: 8, orders: 420, status: 'Active' },
      { name: "G'arbiy", couriers: 4, orders: 200, status: 'Partial' },
      { name: 'Sharqiy', couriers: 2, orders: 100, status: 'Planned' },
    ],
    hourly: [
      4, 2, 1, 1, 1, 2, 6, 16, 26, 34, 38, 42, 32, 38, 40, 46, 50, 44, 40, 30,
      20, 12, 8, 6,
    ],
    weeklyRev: [22, 20, 28, 24, 30, 36, 32],
  },
  {
    id: 'RGN-09',
    code: 'SRX',
    name: 'Sirdaryo viloyati',
    type: 'Viloyat',
    status: 'Planned',
    capital: 'Guliston',
    area: 5100,
    population: 880000,
    districts: 8,
    coords: { x: 60, y: 38 },
    mapSize: 14,
    services: [],
    couriers: 0,
    partners: 0,
    users: 0,
    activeOrders: 0,
    revenue: 0,
    orders: 0,
    avgDelivery: 0,
    rating: 0,
    growth: 0,
    coverage: 0,
    slaRate: 0,
    zones: [],
    hourly: Array(24).fill(0),
    weeklyRev: Array(7).fill(0),
  },
  {
    id: 'RGN-10',
    code: 'QSH',
    name: 'Qashqadaryo viloyati',
    type: 'Viloyat',
    status: 'Planned',
    capital: 'Qarshi',
    area: 28400,
    population: 3260000,
    districts: 14,
    coords: { x: 52, y: 66 },
    mapSize: 18,
    services: [],
    couriers: 0,
    partners: 0,
    users: 0,
    activeOrders: 0,
    revenue: 0,
    orders: 0,
    avgDelivery: 0,
    rating: 0,
    growth: 0,
    coverage: 0,
    slaRate: 0,
    zones: [],
    hourly: Array(24).fill(0),
    weeklyRev: Array(7).fill(0),
  },
]

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────
function Dropdown({
  label,
  value,
  onChange,
  options,
  accent = C.brand,
  minW = 140,
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
            top: 'calc(100%+4px)',
            left: 0,
            zIndex: 500,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            boxShadow: '0 8px 28px rgba(0,0,0,.13)',
            minWidth: '100%',
            overflow: 'hidden',
            maxHeight: 240,
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

function Badge({ s, cfg }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: cfg.bg,
        color: cfg.color,
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
          background: cfg.dot,
        }}
      />
      {cfg.label}
    </span>
  )
}

function Sparkline({ data, color, w = 72, h = 28 }) {
  if (!data || data.length < 2) return null
  const mn = Math.min(...data),
    mx = Math.max(...data),
    rng = mx - mn || 1
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((v - mn) / rng) * (h - 8),
  ])
  const path = pts
    .map(
      (p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`,
    )
    .join(' ')
  const area = `${path} L${w},${h} L0,${h} Z`
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={`sk${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sk${color.slice(1)})`} />
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MiniBarChart({ data, color, h = 48 }) {
  const mx = Math.max(...data) || 1
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: h }}>
      {data.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${(v / mx) * 100}%`,
            minHeight: 2,
            background: i === data.length - 1 ? color : color + '66',
            borderRadius: '2px 2px 0 0',
            transition: 'height .4s',
          }}
        />
      ))}
    </div>
  )
}

function CoverageRing({ pct, color, size = 56 }) {
  const r = (size - 8) / 2,
    cx = size / 2,
    cy = size / 2
  const circ = 2 * Math.PI * r
  const dash = circ * (pct / 100)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: 'rotate(-90deg)' }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={C.light}
        strokeWidth="7"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray .6s ease' }}
      />
    </svg>
  )
}

function Toggle({ value, onChange, accent = C.brand }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 38,
        height: 21,
        borderRadius: 11,
        background: value ? accent : '#CBD5E1',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background .2s',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 15,
          height: 15,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: value ? 20 : 3,
          transition: 'left .2s',
          boxShadow: '0 1px 4px rgba(0,0,0,.2)',
        }}
      />
    </div>
  )
}

// ─── UZB MAP SVG ─────────────────────────────────────────────────────────────
function UzbMap({ regions, selected, onSelect }) {
  const [hov, setHov] = useState(null)
  const maxRev = Math.max(...regions.map(r => r.revenue)) || 1

  return (
    <div
      style={{
        position: 'relative',
        background: `linear-gradient(135deg,#E0F2FE,#CCFBF1,#D1FAE5)`,
        borderRadius: 14,
        height: 320,
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
      }}
    >
      {/* Gradient mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 60% 45%,rgba(13,148,136,.06),transparent 70%)',
        }}
      />

      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Grid */}
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <line
              x1={i * 10}
              y1={0}
              x2={i * 10}
              y2={100}
              stroke="#B2E4DE"
              strokeWidth=".2"
            />
            <line
              x1={0}
              y1={i * 10}
              x2={100}
              y2={i * 10}
              stroke="#B2E4DE"
              strokeWidth=".2"
            />
          </g>
        ))}
        {/* Simplified Uzbekistan outline */}
        <path
          d="M10 42 Q14 30 22 24 Q32 18 44 16 Q58 14 70 18 Q80 20 86 28 Q92 36 90 48 Q88 58 82 64 Q75 72 65 76 Q55 80 44 78 Q34 76 26 70 Q16 62 12 52 Q10 48 10 42Z"
          fill="rgba(13,148,136,.08)"
          stroke="rgba(13,148,136,.3)"
          strokeWidth=".6"
        />
        {/* Rivers (decorative) */}
        <path
          d="M30 40 Q40 38 50 42 Q62 46 72 44"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth=".4"
          opacity=".6"
        />
        <path
          d="M20 48 Q30 50 38 54"
          fill="none"
          stroke="#7DD3FC"
          strokeWidth=".3"
          opacity=".5"
        />
      </svg>

      {/* Region bubbles */}
      {regions.map(r => {
        const sz = r.revenue > 0 ? 10 + Math.sqrt(r.revenue / maxRev) * 28 : 8
        const isSel = selected?.id === r.id
        const isHov = hov === r.id
        const stCfg = ZONE_STATUS[r.status] || ZONE_STATUS.Planned
        const dotColor =
          r.status === 'Active'
            ? C.brand
            : r.status === 'Partial'
              ? C.amber
              : r.status === 'Inactive'
                ? C.muted
                : C.blue

        return (
          <div
            key={r.id}
            onMouseEnter={() => setHov(r.id)}
            onMouseLeave={() => setHov(null)}
            onClick={() => onSelect(isSel ? null : r)}
            style={{
              position: 'absolute',
              left: `${r.coords.x}%`,
              top: `${r.coords.y}%`,
              transform: 'translate(-50%,-50%)',
              width: sz,
              height: sz,
              borderRadius: '50%',
              background: isSel
                ? C.brand
                : isHov
                  ? C.brand + 'CC'
                  : dotColor + '99',
              border: `${isSel ? 3 : 2}px solid ${isSel ? C.brandD : dotColor}`,
              cursor: 'pointer',
              zIndex: isSel ? 20 : isHov ? 15 : 5,
              boxShadow: isSel
                ? `0 0 0 6px ${C.brand}33,0 4px 16px ${C.brand}55`
                : isHov
                  ? `0 2px 8px ${dotColor}44`
                  : 'none',
              transition: 'all .2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {sz > 18 && (
              <span
                style={{
                  fontSize: Math.max(6, sz * 0.18),
                  fontWeight: 900,
                  color: '#fff',
                  userSelect: 'none',
                  lineHeight: 1,
                  textAlign: 'center',
                }}
              >
                {r.code}
              </span>
            )}
            {/* Pulse for active */}
            {r.status === 'Active' && !isSel && (
              <div
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  border: `2px solid ${C.brand}44`,
                  animation: 'mapPulse 2s infinite',
                }}
              />
            )}
          </div>
        )
      })}

      {/* Tooltip */}
      {hov &&
        !selected &&
        (() => {
          const r = regions.find(x => x.id === hov)
          if (!r) return null
          return (
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: C.dark,
                borderRadius: 10,
                padding: '10px 14px',
                zIndex: 50,
                minWidth: 160,
                pointerEvents: 'none',
                boxShadow: '0 4px 16px rgba(0,0,0,.3)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 4,
                }}
              >
                {r.name}
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginBottom: 6 }}>
                {ZONE_TYPE[r.type]?.icon} {r.type}
              </div>
              {r.revenue > 0 && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontSize: 10, color: '#64748B' }}>
                      Daromad
                    </span>
                    <span
                      style={{ fontSize: 10, fontWeight: 700, color: C.brand }}
                    >
                      {fmtM(r.revenue)}
                    </span>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontSize: 10, color: '#64748B' }}>
                      Kuryerlar
                    </span>
                    <span
                      style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}
                    >
                      {r.couriers}
                    </span>
                  </div>
                </>
              )}
            </div>
          )
        })()}

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(ZONE_STATUS).map(([k, v]) => (
          <div
            key={k}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(255,255,255,.85)',
              borderRadius: 6,
              padding: '3px 8px',
              backdropFilter: 'blur(4px)',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: v.dot,
              }}
            />
            <span style={{ fontSize: 9, color: C.text, fontWeight: 600 }}>
              {v.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scale */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: 'rgba(255,255,255,.8)',
          borderRadius: 7,
          padding: '4px 10px',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span style={{ fontSize: 9, color: C.text, fontWeight: 700 }}>
          🗺 O'zbekiston · {regions.length} hudud
        </span>
      </div>
    </div>
  )
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function RegionPanel({ region, onClose, onUpdate }) {
  const [tab, setTab] = useState('info')
  const [r, setR] = useState({ ...region })
  const [statusToggle, setStatusToggle] = useState(r.status === 'Active')
  const stCfg = ZONE_STATUS[r.status] || ZONE_STATUS.Planned
  const typeC = ZONE_TYPE[r.type] || ZONE_TYPE.Viloyat

  const weekDays = ['Du', 'Se', 'Ch', 'Pa', 'Sh', 'Ya', 'Yak']

  const handleToggle = val => {
    setStatusToggle(val)
    setR(prev => ({ ...prev, status: val ? 'Active' : 'Inactive' }))
  }

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
          padding: '16px 18px 12px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          background: `linear-gradient(135deg,${C.brandL},#fff)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: 5,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: 16 }}>{typeC.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: typeC.color,
                  background: typeC.color + '15',
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                {r.type}
              </span>
              <Badge s={r.status} cfg={stCfg} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  fontFamily: 'monospace',
                }}
              >
                {r.code}
              </span>
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.4,
                lineHeight: 1.2,
              }}
            >
              {r.name}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>
              Markaz: {r.capital} · {r.districts} ta tuman · {fmt(r.population)}{' '}
              aholi
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
              color: C.muted,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Status toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: statusToggle ? C.brandL : '#FFF1F2',
            borderRadius: 9,
            padding: '8px 12px',
            marginBottom: 10,
            border: `1px solid ${statusToggle ? C.brandB : '#FECDD3'}`,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: statusToggle ? C.brandD : C.red,
            }}
          >
            {statusToggle
              ? '✅ Hudud faol ishlayapti'
              : "⏸ Hudud to'xtatilgan"}
          </span>
          <Toggle
            value={statusToggle}
            onChange={handleToggle}
            accent={C.brand}
          />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2 }}>
          {[
            ['info', "📋 Ma'lumot"],
            ['zones', '📍 Zonalar'],
            ['stats', '📊 Statistika'],
            ['settings', '⚙ Sozlash'],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: '5px 10px',
                borderRadius: 7,
                border: `1px solid ${tab === k ? C.brand : C.border}`,
                background: tab === k ? C.brandL : C.card,
                color: tab === k ? C.brandD : C.muted,
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all .15s',
                whiteSpace: 'nowrap',
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
        {/* ── TAB: INFO ── */}
        {tab === 'info' && (
          <>
            {/* Hero metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 14,
              }}
            >
              {[
                {
                  label: 'Jami daromad',
                  val: fmtM(r.revenue),
                  color: C.brand,
                  icon: '💰',
                },
                {
                  label: 'Buyurtmalar',
                  val: fmt(r.orders),
                  color: C.blue,
                  icon: '📦',
                },
                {
                  label: 'Kuryerlar',
                  val: r.couriers + ' ta',
                  color: C.violet,
                  icon: '🛵',
                },
                {
                  label: 'Hamkorlar',
                  val: r.partners + ' ta',
                  color: C.orange,
                  icon: '🤝',
                },
              ].map(({ label, val, color, icon }) => (
                <div
                  key={label}
                  style={{
                    background: color + '0D',
                    borderRadius: 10,
                    padding: '11px 12px',
                    border: `1px solid ${color}22`,
                  }}
                >
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 900,
                      color,
                      letterSpacing: -0.4,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.muted,
                      marginTop: 2,
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Coverage ring */}
            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <CoverageRing pct={r.coverage} color={C.brand} size={60} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{ fontSize: 11, fontWeight: 900, color: C.brand }}
                  >
                    {r.coverage}%
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: C.text,
                    marginBottom: 4,
                  }}
                >
                  Qamrov darajasi
                </div>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 6 }}>
                  Xizmat ko'rsatiladigan hududlar
                </div>
                <div
                  style={{
                    height: 6,
                    background: C.border,
                    borderRadius: 99,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${r.coverage}%`,
                      background: `linear-gradient(90deg,${C.brand},${C.brandD})`,
                      borderRadius: 99,
                      transition: 'width .6s',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Detail meta */}
            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 12,
              }}
            >
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
                Hudud ma'lumotlari
              </div>
              {[
                ['Viloyat markazi', r.capital],
                ['Umumiy maydon', `${fmt(r.area)} km²`],
                ['Aholi soni', `${fmt(r.population)} kishi`],
                ['Tumanlar soni', `${r.districts} ta`],
                ['Faol foydalanuvchi', fmt(r.users)],
                ['Faol buyurtmalar', fmt(r.activeOrders)],
                [
                  "O'rtacha yetkazish",
                  r.avgDelivery ? `${r.avgDelivery} daqiqa` : '—',
                ],
                ['SLA bajarish', r.slaRate ? `${r.slaRate}%` : '—'],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 7,
                    marginBottom: 7,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}
                  >
                    {k}
                  </span>
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: C.text }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Active services */}
            <div style={{ marginBottom: 12 }}>
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
                Faol xizmatlar
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 6,
                }}
              >
                {Object.entries(SVC).map(([k, v]) => {
                  const active = r.services.includes(k)
                  return (
                    <div
                      key={k}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 10px',
                        borderRadius: 9,
                        border: `1px solid ${active ? v.color : C.border}`,
                        background: active ? v.light : C.card,
                        opacity: active ? 1 : 0.5,
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{v.icon}</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: active ? v.color : C.muted,
                        }}
                      >
                        {k}
                      </span>
                      {active && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: 10,
                            color: v.color,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Rating */}
            {r.rating > 0 && (
              <div
                style={{
                  background: C.light,
                  borderRadius: 10,
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: C.muted,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    Hudud reytingi
                  </div>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < Math.round(r.rating) ? C.amber : C.border,
                          fontSize: 16,
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: C.amber }}>
                  {r.rating}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── TAB: ZONES ── */}
        {tab === 'zones' && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>
                Ichki zonalar ({r.zones.length})
              </div>
              <button
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: C.brand,
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                + Zona qo'shish
              </button>
            </div>

            {r.zones.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: C.muted,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>
                  Hali zonalar yo'q
                </div>
                <div style={{ fontSize: 10, color: C.muted2, marginTop: 4 }}>
                  Yangi zona qo'shish uchun yuqoridagi tugmani bosing
                </div>
              </div>
            ) : (
              r.zones.map((z, i) => {
                const zst = ZONE_STATUS[z.status] || ZONE_STATUS.Planned
                return (
                  <div
                    key={i}
                    style={{
                      background: C.light,
                      borderRadius: 10,
                      padding: '12px 14px',
                      marginBottom: 8,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: C.text,
                          }}
                        >
                          {z.name}
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <span style={{ fontSize: 10, color: C.muted }}>
                            🛵 {z.couriers} kuryer
                          </span>
                          <span style={{ fontSize: 10, color: C.muted }}>
                            📦 {fmt(z.orders)} buyurtma
                          </span>
                        </div>
                      </div>
                      <Badge s={z.status} cfg={zst} />
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: C.border,
                        borderRadius: 99,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${(z.orders / r.zones[0].orders) * 100}%`,
                          background: C.brand,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                  </div>
                )
              })
            )}

            {/* Add zone form */}
            <div
              style={{
                background: C.brandL,
                borderRadius: 10,
                padding: '12px 14px',
                border: `1px dashed ${C.brandB}`,
                marginTop: 8,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: C.brandD,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                + Yangi zona qo'shish
              </div>
              <input
                placeholder="Zona nomi..."
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: 7,
                  border: `1px solid ${C.brandB}`,
                  fontSize: 11,
                  outline: 'none',
                  fontFamily: 'inherit',
                  background: C.card,
                  marginBottom: 6,
                }}
              />
              <button
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: 7,
                  border: 'none',
                  background: C.brand,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Qo'shish
              </button>
            </div>
          </>
        )}

        {/* ── TAB: STATISTICS ── */}
        {tab === 'stats' && (
          <>
            {r.revenue === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: C.muted,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>
                  Statistika mavjud emas
                </div>
                <div style={{ fontSize: 10, marginTop: 4 }}>
                  Hudud hali faol emas
                </div>
              </div>
            ) : (
              <>
                {/* Weekly revenue */}
                <div
                  style={{
                    background: C.light,
                    borderRadius: 10,
                    padding: '12px 14px',
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: C.text,
                      marginBottom: 10,
                    }}
                  >
                    Haftalik daromad
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 4,
                      height: 60,
                    }}
                  >
                    {r.weeklyRev.map((v, i) => {
                      const mx = Math.max(...r.weeklyRev)
                      const pct = (v / mx) * 100
                      return (
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
                              height: `${pct}%`,
                              minHeight: 4,
                              background: i === 6 ? C.brand : C.brand + '55',
                              borderRadius: '3px 3px 0 0',
                              transition: 'height .4s',
                            }}
                          />
                          <span
                            style={{
                              fontSize: 8,
                              color: i === 6 ? C.brand : C.muted,
                              fontWeight: i === 6 ? 700 : 400,
                            }}
                          >
                            {['Du', 'Se', 'Ch', 'Pa', 'Sh', 'Ya', 'Bu'][i]}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 8,
                    }}
                  >
                    <span style={{ fontSize: 10, color: C.muted }}>
                      Haftalik jami:
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: 800, color: C.brand }}
                    >
                      {fmtM(r.weeklyRev.reduce((s, v) => s + v * 1000000, 0))}{' '}
                      UZS
                    </span>
                  </div>
                </div>

                {/* Hourly activity */}
                <div
                  style={{
                    background: C.light,
                    borderRadius: 10,
                    padding: '12px 14px',
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: C.text,
                      marginBottom: 10,
                    }}
                  >
                    Soatlik faollik
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 1.5,
                      height: 44,
                    }}
                  >
                    {r.hourly.map((v, i) => {
                      const mx = Math.max(...r.hourly) || 1
                      const pct = (v / mx) * 100
                      const isPeak = i >= 11 && i <= 20
                      return (
                        <div
                          key={i}
                          title={`${i}:00 — ${v}%`}
                          style={{
                            flex: 1,
                            height: `${pct}%`,
                            minHeight: 2,
                            background: isPeak ? C.brand : C.brand + '44',
                            borderRadius: '2px 2px 0 0',
                            transition: 'height .3s',
                          }}
                        />
                      )
                    })}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 4,
                    }}
                  >
                    <span style={{ fontSize: 8, color: C.muted }}>00:00</span>
                    <span
                      style={{ fontSize: 8, color: C.brand, fontWeight: 700 }}
                    >
                      Peak: 11–20
                    </span>
                    <span style={{ fontSize: 8, color: C.muted }}>23:00</span>
                  </div>
                </div>

                {/* KPI grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {[
                    {
                      label: "O'sish",
                      val: `+${r.growth}%`,
                      color: r.growth > 0 ? C.green : C.red,
                      icon: '📈',
                    },
                    {
                      label: "O'rt. yetkazish",
                      val: `${r.avgDelivery} daq`,
                      color: C.blue,
                      icon: '⏱',
                    },
                    {
                      label: 'SLA darajasi',
                      val: `${r.slaRate}%`,
                      color: r.slaRate > 90 ? C.green : C.amber,
                      icon: '🎯',
                    },
                    {
                      label: 'Foydalanuvchi',
                      val: fmtM(r.users),
                      color: C.violet,
                      icon: '👥',
                    },
                  ].map(({ label, val, color, icon }) => (
                    <div
                      key={label}
                      style={{
                        background: color + '0D',
                        borderRadius: 9,
                        padding: '10px 12px',
                        border: `1px solid ${color}22`,
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: 18, marginBottom: 4 }}>
                        {icon}
                      </div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 900,
                          color,
                          letterSpacing: -0.3,
                        }}
                      >
                        {val}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          color: C.muted,
                          marginTop: 2,
                          fontWeight: 600,
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ── TAB: SETTINGS ── */}
        {tab === 'settings' && (
          <>
            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 12,
              }}
            >
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
                Asosiy ma'lumotlar
              </div>
              {[
                ['Hudud nomi', r.name],
                ['Kod', r.code],
                ['Markaz', r.capital],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ marginBottom: 10 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.muted,
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {lbl}
                  </div>
                  <input
                    defaultValue={val}
                    style={{
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.text,
                      outline: 'none',
                      fontFamily: 'inherit',
                      background: C.card,
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                Xizmatlarni yoqish/o'chirish
              </div>
              {Object.entries(SVC).map(([k, v]) => {
                const active = r.services.includes(k)
                return (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <span style={{ fontSize: 18 }}>{v.icon}</span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: active ? C.text : C.muted,
                        }}
                      >
                        {k}
                      </span>
                    </div>
                    <Toggle
                      value={active}
                      onChange={() => {}}
                      accent={v.color}
                    />
                  </div>
                )
              })}
            </div>

            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 12,
                }}
              >
                Qo'shimcha sozlamalar
              </div>
              {[
                ['Promo hududda faol', "Promo kodlar qo'llanilsin", true],
                ['SLA monitoring', 'Vaqt limitini kuzatish', true],
                ['Surge pricing', 'Talabga qarab narx oshirish', false],
                ['Geo-fence', 'Chegara chiqishini bloklash', true],
              ].map(([title, sub, def]) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 11, fontWeight: 700, color: C.text }}
                    >
                      {title}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
                      {sub}
                    </div>
                  </div>
                  <Toggle value={def} onChange={() => {}} accent={C.brand} />
                </div>
              ))}
            </div>

            {/* Danger zone */}
            <div
              style={{
                background: '#FFF1F2',
                borderRadius: 10,
                padding: '12px 14px',
                border: `1px solid #FECDD3`,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: C.red,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  marginBottom: 10,
                }}
              >
                ⚠ Xavfli zona
              </div>
              <button
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: 8,
                  border: `1px solid #FECDD3`,
                  background: C.card,
                  color: C.red,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginBottom: 6,
                }}
              >
                Hududni vaqtincha to'xtatish
              </button>
              <button
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: 8,
                  border: 'none',
                  background: C.red,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🗑 Hududni o'chirish
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '12px 18px',
          borderTop: `1px solid ${C.border}`,
          flexShrink: 0,
          display: 'flex',
          gap: 8,
        }}
      >
        <button
          onClick={onClose}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 9,
            border: `1px solid ${C.border}`,
            background: C.card,
            color: C.text,
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Bekor qilish
        </button>
        <button
          style={{
            flex: 2,
            padding: '10px',
            borderRadius: 9,
            border: 'none',
            background: `linear-gradient(135deg,${C.brand},${C.brandD})`,
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: `0 4px 14px ${C.brand}44`,
          }}
        >
          ✓ Saqlash
        </button>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MilliyGoRegionsPage() {
  const [regions, setRegions] = useState(REGIONS)
  const [selected, setSelected] = useState(null)
  const [statusF, setStatusF] = useState('Barcha')
  const [typeF, setTypeF] = useState('Barcha tur')
  const [serviceF, setServiceF] = useState('Barcha xizmat')
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('revenue')
  const [view, setView] = useState('table') // table | grid
  const [page, setPage] = useState(1)
  const PAGE = 6

  const filtered = useMemo(() => {
    let d = [...regions]
    if (statusF !== 'Barcha') d = d.filter(r => r.status === statusF)
    if (typeF !== 'Barcha tur') d = d.filter(r => r.type === typeF)
    if (serviceF !== 'Barcha xizmat')
      d = d.filter(r => r.services.includes(serviceF))
    if (q.trim()) {
      const lq = q.toLowerCase()
      d = d.filter(
        r =>
          r.name.toLowerCase().includes(lq) ||
          r.code.toLowerCase().includes(lq) ||
          r.capital.toLowerCase().includes(lq),
      )
    }
    return d.sort((a, b) =>
      sortBy === 'revenue'
        ? b.revenue - a.revenue
        : sortBy === 'orders'
          ? b.orders - a.orders
          : sortBy === 'couriers'
            ? b.couriers - a.couriers
            : b.coverage - a.coverage,
    )
  }, [regions, statusF, typeF, serviceF, q, sortBy])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))
  const paged = filtered.slice((page - 1) * PAGE, page * PAGE)

  // Aggregates
  const totalRev = regions.reduce((s, r) => s + r.revenue, 0)
  const totalOrders = regions.reduce((s, r) => s + r.orders, 0)
  const totalCouriers = regions.reduce((s, r) => s + r.couriers, 0)
  const totalPartners = regions.reduce((s, r) => s + r.partners, 0)
  const activeCount = regions.filter(r => r.status === 'Active').length
  const avgCoverage = Math.round(
    regions.filter(r => r.revenue > 0).reduce((s, r) => s + r.coverage, 0) /
      regions.filter(r => r.revenue > 0).length,
  )

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
        textarea,input,select{font-family:inherit;}
        .rrow:hover{background:#F0FDFA !important;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes mapPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:.2;transform:scale(1.5)}}
      `}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* ═══ HEADER ══════════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 18,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: C.brandL,
                border: `1px solid ${C.brandB}`,
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 10,
                fontWeight: 700,
                color: C.brandD,
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
              Hududlar boshqaruvi
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Viloyat, shahar va tuman zonalari · xizmat qamrovi · kuryer
              taqsimoti
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                display: 'flex',
                gap: 2,
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 9,
                padding: 3,
              }}
            >
              {[
                ['table', '☰'],
                ['grid', '⊞'],
              ].map(([v, icon]) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    width: 32,
                    height: 30,
                    borderRadius: 7,
                    border: 'none',
                    background: view === v ? C.brand : 'transparent',
                    color: view === v ? '#fff' : C.muted,
                    cursor: 'pointer',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .15s',
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: C.card,
                color: C.text,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '9px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ⬇ Eksport
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: `linear-gradient(135deg,${C.brand},${C.brandD})`,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '9px 18px',
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: `0 4px 16px ${C.brand}44`,
              }}
            >
              ＋ Yangi hudud
            </button>
          </div>
        </div>

        {/* ═══ KPI STRIP ═══════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {[
            {
              label: 'Faol hududlar',
              val: activeCount,
              sub: `${regions.length} ta jami`,
              color: C.brand,
              icon: '🗺️',
            },
            {
              label: 'Jami daromad',
              val: fmtM(totalRev),
              sub: 'UZS · barcha hududlar',
              color: C.orange,
              icon: '💰',
            },
            {
              label: 'Buyurtmalar',
              val: fmtM(totalOrders),
              sub: 'ta',
              color: C.blue,
              icon: '📦',
            },
            {
              label: 'Kuryerlar',
              val: fmt(totalCouriers),
              sub: 'faol xodimllar',
              color: C.violet,
              icon: '🛵',
            },
            {
              label: 'Hamkorlar',
              val: fmt(totalPartners),
              sub: "do'kon va restoran",
              color: C.emerald,
              icon: '🤝',
            },
            {
              label: "O'rtacha qamrov",
              val: `${avgCoverage}%`,
              sub: 'xizmat hududi',
              color: C.teal,
              icon: '📡',
            },
          ].map(({ label, val, sub, color, icon }, i) => (
            <div
              key={i}
              style={{
                background: C.card,
                borderRadius: 12,
                padding: '13px 14px',
                border: `1.5px solid ${C.border}`,
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                animation: `fadeIn .3s ease ${i * 0.05}s both`,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: color + '15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 17,
                  marginBottom: 8,
                }}
              >
                {icon}
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color,
                  letterSpacing: -0.5,
                  lineHeight: 1,
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.text,
                  fontWeight: 700,
                  marginTop: 3,
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

        {/* ═══ MAP + STATUS BREAKDOWN ══════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: 12,
            marginBottom: 14,
          }}
        >
          {/* Map */}
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: '16px 18px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>
                  Interaktiv xarita
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
                  Hududni bosib batafsil ko'ring
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {['Barcha', 'Active', 'Partial', 'Planned'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusF(statusF === s ? 'Barcha' : s)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 7,
                      border: `1px solid ${statusF === s ? C.brand : C.border}`,
                      background: statusF === s ? C.brandL : C.card,
                      color: statusF === s ? C.brandD : C.muted,
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    {s === 'Barcha' ? 'Hammasi' : ZONE_STATUS[s]?.label || s}
                  </button>
                ))}
              </div>
            </div>
            <UzbMap
              regions={regions}
              selected={selected}
              onSelect={r => {
                setSelected(r)
              }}
            />
          </div>

          {/* Side stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Status breakdown */}
            <div
              style={{
                background: C.card,
                borderRadius: 14,
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
                  marginBottom: 12,
                }}
              >
                Holat bo'yicha
              </div>
              {Object.entries(ZONE_STATUS).map(([k, v]) => {
                const cnt = regions.filter(r => r.status === k).length
                const pct = Math.round((cnt / regions.length) * 100)
                return (
                  <div
                    key={k}
                    onClick={() => setStatusF(statusF === k ? 'Barcha' : k)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 10,
                      cursor: 'pointer',
                      opacity: statusF !== 'Barcha' && statusF !== k ? 0.4 : 1,
                      transition: 'opacity .2s',
                    }}
                  >
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background: v.dot,
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
                      {v.label}
                    </span>
                    <div
                      style={{
                        width: 60,
                        height: 5,
                        background: C.light,
                        borderRadius: 99,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: v.dot,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: v.color,
                        minWidth: 22,
                        textAlign: 'right',
                      }}
                    >
                      {cnt}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Service coverage */}
            <div
              style={{
                background: C.card,
                borderRadius: 14,
                padding: '16px',
                border: `1px solid ${C.border}`,
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: C.text,
                  marginBottom: 12,
                }}
              >
                Xizmat qamrovi
              </div>
              {Object.entries(SVC).map(([k, v]) => {
                const cnt = regions.filter(r => r.services.includes(k)).length
                const pct = Math.round((cnt / regions.length) * 100)
                return (
                  <div key={k} style={{ marginBottom: 10 }}>
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
                        {v.icon} {k}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: v.color,
                        }}
                      >
                        {cnt} hudud
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: C.light,
                        borderRadius: 99,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: v.color,
                          borderRadius: 99,
                          transition: 'width .5s',
                        }}
                      />
                    </div>
                  </div>
                )
              })}

              {/* Top region */}
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                    marginBottom: 8,
                  }}
                >
                  🏆 Top 2 hudud
                </div>
                {regions
                  .sort((a, b) => b.revenue - a.revenue)
                  .slice(0, 2)
                  .map(r => (
                    <div
                      key={r.id}
                      onClick={() =>
                        setSelected(selected?.id === r.id ? null : r)
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 7,
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: 16 }}>📍</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.text,
                          }}
                        >
                          {r.name}
                        </div>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          {fmt(r.orders)} buyurtma
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: C.brand,
                        }}
                      >
                        {fmtM(r.revenue)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ FILTERS ═════════════════════════════════════════════════════ */}
        <div
          style={{
            background: C.card,
            borderRadius: 12,
            padding: '13px 16px',
            border: `1px solid ${C.border}`,
            marginBottom: 12,
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
              label="Holat"
              value={statusF}
              onChange={v => {
                setStatusF(v)
                setPage(1)
              }}
              options={['Barcha', ...Object.keys(ZONE_STATUS)]}
              accent={C.brand}
            />
            <Dropdown
              label="Tur"
              value={typeF}
              onChange={v => {
                setTypeF(v)
                setPage(1)
              }}
              options={['Barcha tur', ...Object.keys(ZONE_TYPE)]}
              accent={C.brand}
            />
            <Dropdown
              label="Xizmat"
              value={serviceF}
              onChange={v => {
                setServiceF(v)
                setPage(1)
              }}
              options={['Barcha xizmat', ...Object.keys(SVC)]}
              accent={C.brand}
            />
            <Dropdown
              label="Saralash"
              value={sortBy}
              onChange={v => setSortBy(v)}
              options={['revenue', 'orders', 'couriers', 'coverage']}
              accent={C.brand}
              minW={120}
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
                  value={q}
                  onChange={e => {
                    setQ(e.target.value)
                    setPage(1)
                  }}
                  placeholder="Hudud nomi, kodi, markaz..."
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
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  color: C.muted,
                  fontWeight: 600,
                  paddingBottom: 8,
                }}
              >
                <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
                hudud
              </span>
              {(statusF !== 'Barcha' ||
                typeF !== 'Barcha tur' ||
                serviceF !== 'Barcha xizmat' ||
                q) && (
                <button
                  onClick={() => {
                    setStatusF('Barcha')
                    setTypeF('Barcha tur')
                    setServiceF('Barcha xizmat')
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
                  }}
                >
                  ✕ Tozalash
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ═══ TABLE / GRID + PANEL ════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selected ? '1fr 420px' : '1fr',
            gap: 14,
          }}
        >
          {view === 'table' ? (
            /* ── TABLE VIEW ── */
            <div
              style={{
                background: C.card,
                borderRadius: 12,
                border: `1px solid ${C.border}`,
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(0,0,0,.04)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '70px 1.8fr 100px 110px 90px 90px 90px 120px 100px 80px',
                  borderBottom: `2px solid ${C.border}`,
                  background: '#FAFAFA',
                }}
              >
                {[
                  'Kod',
                  'Hudud nomi',
                  'Tur',
                  'Xizmatlar',
                  'Kuryerlar',
                  'Hamkorlar',
                  'Buyurtma',
                  'Daromad',
                  'Qamrov',
                  'Holat',
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
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🗺️</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    Hudud topilmadi
                  </div>
                </div>
              ) : (
                paged.map(r => {
                  const isSel = selected?.id === r.id
                  const stCfg = ZONE_STATUS[r.status] || ZONE_STATUS.Planned
                  const typeC = ZONE_TYPE[r.type] || ZONE_TYPE.Viloyat
                  return (
                    <div
                      key={r.id}
                      className="rrow"
                      onClick={() => setSelected(isSel ? null : r)}
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          '70px 1.8fr 100px 110px 90px 90px 90px 120px 100px 80px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderBottom: `1px solid ${C.border}`,
                        background: isSel ? C.brandL : 'transparent',
                        borderLeft: `3px solid ${isSel ? C.brand : 'transparent'}`,
                        transition: 'background .12s',
                      }}
                    >
                      {/* Code */}
                      <div style={{ padding: '13px 10px' }}>
                        <div
                          style={{
                            fontFamily: 'monospace',
                            fontSize: 11,
                            fontWeight: 900,
                            color: isSel ? C.brandD : C.muted,
                            background: isSel ? C.brandB + '55' : C.light,
                            padding: '2px 7px',
                            borderRadius: 5,
                            display: 'inline-block',
                          }}
                        >
                          {r.code}
                        </div>
                      </div>

                      {/* Name */}
                      <div style={{ padding: '13px 10px', minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: isSel ? C.brandD : C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {r.name}
                        </div>
                        <div
                          style={{ fontSize: 10, color: C.muted, marginTop: 2 }}
                        >
                          📍 {r.capital} · {fmt(r.population)} aholi
                        </div>
                      </div>

                      {/* Type */}
                      <div style={{ padding: '13px 8px' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            background: typeC.color + '15',
                            color: typeC.color,
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 6,
                          }}
                        >
                          {typeC.icon} {r.type}
                        </span>
                      </div>

                      {/* Services */}
                      <div
                        style={{
                          padding: '13px 8px',
                          display: 'flex',
                          gap: 3,
                          flexWrap: 'wrap',
                        }}
                      >
                        {r.services.length === 0 ? (
                          <span style={{ fontSize: 9, color: C.muted }}>—</span>
                        ) : (
                          r.services.map(s => (
                            <span key={s} title={s} style={{ fontSize: 14 }}>
                              {SVC[s]?.icon}
                            </span>
                          ))
                        )}
                      </div>

                      {/* Couriers */}
                      <div style={{ padding: '13px 10px' }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: C.violet,
                          }}
                        >
                          {r.couriers}
                        </div>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          ta kuryer
                        </div>
                      </div>

                      {/* Partners */}
                      <div style={{ padding: '13px 10px' }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: C.emerald,
                          }}
                        >
                          {r.partners}
                        </div>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          ta hamkor
                        </div>
                      </div>

                      {/* Orders */}
                      <div style={{ padding: '13px 10px' }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: C.blue,
                          }}
                        >
                          {r.orders > 0 ? fmtM(r.orders) : '—'}
                        </div>
                        {r.activeOrders > 0 && (
                          <div style={{ fontSize: 9, color: C.brand }}>
                            {r.activeOrders} faol
                          </div>
                        )}
                      </div>

                      {/* Revenue */}
                      <div style={{ padding: '13px 10px' }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: r.revenue > 0 ? C.orange : C.muted,
                          }}
                        >
                          {r.revenue > 0 ? fmtM(r.revenue) : '—'}
                        </div>
                        {r.growth !== 0 && (
                          <div
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: r.growth > 0 ? C.green : C.red,
                            }}
                          >
                            {r.growth > 0 ? '+' : ''}
                            {r.growth}%
                          </div>
                        )}
                      </div>

                      {/* Coverage */}
                      <div style={{ padding: '13px 10px' }}>
                        {r.coverage > 0 ? (
                          <>
                            <div
                              style={{
                                fontSize: 12,
                                fontWeight: 800,
                                color: C.brand,
                                marginBottom: 4,
                              }}
                            >
                              {r.coverage}%
                            </div>
                            <div
                              style={{
                                height: 4,
                                background: C.light,
                                borderRadius: 99,
                                overflow: 'hidden',
                                width: 60,
                              }}
                            >
                              <div
                                style={{
                                  height: '100%',
                                  width: `${r.coverage}%`,
                                  background:
                                    r.coverage >= 70
                                      ? C.brand
                                      : r.coverage >= 40
                                        ? C.amber
                                        : C.red,
                                  borderRadius: 99,
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <span style={{ fontSize: 11, color: C.muted }}>
                            —
                          </span>
                        )}
                      </div>

                      {/* Status */}
                      <div style={{ padding: '13px 8px' }}>
                        <Badge s={r.status} cfg={stCfg} />
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
                  background: '#FAFAFA',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 12, color: C.muted }}>
                  Jami{' '}
                  <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
                  hudud · {Math.min((page - 1) * PAGE + 1, filtered.length)}–
                  {Math.min(page * PAGE, filtered.length)}
                </span>
                <div style={{ display: 'flex', gap: 5 }}>
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
          ) : (
            /* ── GRID VIEW ── */
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
                  gap: 12,
                }}
              >
                {paged.map(r => {
                  const isSel = selected?.id === r.id
                  const stCfg = ZONE_STATUS[r.status] || ZONE_STATUS.Planned
                  const typeC = ZONE_TYPE[r.type] || ZONE_TYPE.Viloyat
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelected(isSel ? null : r)}
                      style={{
                        background: C.card,
                        borderRadius: 14,
                        padding: '16px',
                        border: `2px solid ${isSel ? C.brand : C.border}`,
                        cursor: 'pointer',
                        boxShadow: isSel
                          ? `0 4px 18px ${C.brand}22`
                          : '0 1px 4px rgba(0,0,0,.04)',
                        transition: 'all .2s',
                        position: 'relative',
                        overflow: 'hidden',
                        animation: 'fadeIn .25s ease both',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: -20,
                          right: -20,
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: C.brand + '08',
                        }}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 10,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ fontSize: 14 }}>{typeC.icon}</span>
                            <span
                              style={{
                                fontFamily: 'monospace',
                                fontSize: 10,
                                fontWeight: 900,
                                color: C.muted,
                                background: C.light,
                                padding: '2px 7px',
                                borderRadius: 5,
                              }}
                            >
                              {r.code}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 900,
                              color: isSel ? C.brandD : C.text,
                              lineHeight: 1.2,
                            }}
                          >
                            {r.name}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: C.muted,
                              marginTop: 2,
                            }}
                          >
                            📍 {r.capital}
                          </div>
                        </div>
                        <Badge s={r.status} cfg={stCfg} />
                      </div>

                      {r.revenue > 0 && (
                        <>
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr 1fr 1fr',
                              gap: 6,
                              marginBottom: 10,
                            }}
                          >
                            {[
                              { v: fmtM(r.revenue), l: 'daromad', c: C.orange },
                              { v: r.couriers, l: 'kuryer', c: C.violet },
                              { v: r.partners, l: 'hamkor', c: C.emerald },
                            ].map(({ v, l, c }) => (
                              <div
                                key={l}
                                style={{
                                  textAlign: 'center',
                                  background: c + '0D',
                                  borderRadius: 7,
                                  padding: '7px 4px',
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 900,
                                    color: c,
                                  }}
                                >
                                  {v}
                                </div>
                                <div
                                  style={{
                                    fontSize: 8,
                                    color: C.muted,
                                    marginTop: 1,
                                  }}
                                >
                                  {l}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div style={{ marginBottom: 8 }}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 3,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 9,
                                  color: C.muted,
                                  fontWeight: 600,
                                }}
                              >
                                Qamrov
                              </span>
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: C.brand,
                                }}
                              >
                                {r.coverage}%
                              </span>
                            </div>
                            <div
                              style={{
                                height: 5,
                                background: C.light,
                                borderRadius: 99,
                                overflow: 'hidden',
                              }}
                            >
                              <div
                                style={{
                                  height: '100%',
                                  width: `${r.coverage}%`,
                                  background: C.brand,
                                  borderRadius: 99,
                                }}
                              />
                            </div>
                          </div>

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div style={{ display: 'flex', gap: 3 }}>
                              {r.services.map(s => (
                                <span key={s} style={{ fontSize: 14 }}>
                                  {SVC[s]?.icon}
                                </span>
                              ))}
                            </div>
                            {r.growth !== 0 && (
                              <span
                                style={{
                                  fontSize: 10,
                                  fontWeight: 700,
                                  color: r.growth > 0 ? C.green : C.red,
                                }}
                              >
                                {r.growth > 0 ? '▲' : '▼'} {Math.abs(r.growth)}%
                              </span>
                            )}
                          </div>
                        </>
                      )}

                      {r.revenue === 0 && (
                        <div
                          style={{
                            textAlign: 'center',
                            padding: '12px 0',
                            color: C.muted,
                          }}
                        >
                          <div style={{ fontSize: 22, marginBottom: 4 }}>
                            🔜
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 600 }}>
                            Tez orada ishga tushadi
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Pagination for grid */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 5,
                  marginTop: 14,
                }}
              >
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      border: `1px solid ${page === i + 1 ? C.brand : C.border}`,
                      background: page === i + 1 ? C.brand : C.card,
                      color: page === i + 1 ? '#fff' : C.text,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

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
                boxShadow: `0 4px 24px ${C.brand}1E`,
              }}
            >
              <RegionPanel
                region={selected}
                onClose={() => setSelected(null)}
                onUpdate={r =>
                  setRegions(prev => prev.map(x => (x.id === r.id ? r : x)))
                }
              />
            </div>
          )}
        </div>

        {/* ═══ BOTTOM METRICS ══════════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 10,
            marginTop: 14,
          }}
        >
          {regions
            .filter(r => r.status === 'Active')
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 4)
            .map(r => {
              const stCfg = ZONE_STATUS[r.status]
              return (
                <div
                  key={r.id}
                  onClick={() => setSelected(selected?.id === r.id ? null : r)}
                  style={{
                    background: C.card,
                    borderRadius: 14,
                    padding: '15px 16px',
                    border: `2px solid ${C.brand}18`,
                    cursor: 'pointer',
                    boxShadow: `0 4px 14px ${C.brand}0C`,
                    transition: 'all .2s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: -16,
                      right: -16,
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: C.brand + '08',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: C.brandL,
                        border: `1px solid ${C.brandB}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {ZONE_TYPE[r.type]?.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: C.text,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {r.name}
                      </div>
                      <div style={{ fontSize: 9, color: C.muted }}>
                        {r.capital}
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        fontWeight: 800,
                        color: C.muted,
                      }}
                    >
                      {r.code}
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: C.brand,
                      letterSpacing: -0.5,
                      marginBottom: 4,
                    }}
                  >
                    {fmtM(r.revenue)}{' '}
                    <span
                      style={{ fontSize: 10, color: C.muted, fontWeight: 400 }}
                    >
                      UZS
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 6,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        background: C.light,
                        borderRadius: 7,
                        padding: '5px 8px',
                      }}
                    >
                      <div
                        style={{ fontSize: 11, fontWeight: 800, color: C.blue }}
                      >
                        {fmtM(r.orders)}
                      </div>
                      <div style={{ fontSize: 8, color: C.muted }}>
                        buyurtma
                      </div>
                    </div>
                    <div
                      style={{
                        background: C.light,
                        borderRadius: 7,
                        padding: '5px 8px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: C.violet,
                        }}
                      >
                        {r.couriers}
                      </div>
                      <div style={{ fontSize: 8, color: C.muted }}>kuryer</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 3,
                      }}
                    >
                      <span
                        style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}
                      >
                        Qamrov
                      </span>
                      <span
                        style={{ fontSize: 9, fontWeight: 700, color: C.brand }}
                      >
                        {r.coverage}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: C.light,
                        borderRadius: 99,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${r.coverage}%`,
                          background: `linear-gradient(90deg,${C.brand},${C.brandD})`,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', gap: 3 }}>
                      {r.services.map(s => (
                        <span key={s} style={{ fontSize: 13 }}>
                          {SVC[s]?.icon}
                        </span>
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: r.growth > 0 ? C.green : C.red,
                      }}
                    >
                      {r.growth > 0 ? '▲' : '▼'} {Math.abs(r.growth)}%
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
