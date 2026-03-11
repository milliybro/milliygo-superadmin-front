import { useState, useMemo, useEffect, useRef } from 'react'

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
  green: '#16A34A',
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_PARTNERS = [
  {
    id: 'P-001',
    name: 'KFC Central',
    category: 'Food',
    type: 'Restoran',
    contact: 'Jamshid Umarov',
    phone: '+998 90 123 45 67',
    email: 'central@kfc.uz',
    zone: 'Chilonzor',
    status: 'Active',
    orders: 1420,
    revenue: 87500000,
    rating: 4.9,
    commission: 18,
    joined: '2021-03-15',
    lastOrder: '14:24',
  },
  {
    id: 'P-002',
    name: 'Korzinka.uz',
    category: 'Market',
    type: 'Supermarket',
    contact: 'Dilnoza Karimova',
    phone: '+998 97 445 67 89',
    email: 'ops@korzinka.uz',
    zone: 'Yunusobod',
    status: 'Active',
    orders: 3210,
    revenue: 245000000,
    rating: 4.7,
    commission: 12,
    joined: '2020-11-01',
    lastOrder: '14:10',
  },
  {
    id: 'P-003',
    name: 'MilliyGo Fleet',
    category: 'Taxi',
    type: 'Avtoprovayder',
    contact: 'Otabek Hasanov',
    phone: '+998 93 998 11 22',
    email: 'fleet@millygo.uz',
    zone: 'Barcha',
    status: 'Active',
    orders: 9870,
    revenue: 312000000,
    rating: 4.8,
    commission: 10,
    joined: '2020-01-10',
    lastOrder: '14:05',
  },
  {
    id: 'P-004',
    name: 'Rayhon National',
    category: 'Food',
    type: 'Restoran',
    contact: 'Sarvar Nazarov',
    phone: '+998 90 777 22 33',
    email: 'info@rayhon.uz',
    zone: 'Sergeli',
    status: 'Suspended',
    orders: 540,
    revenue: 32000000,
    rating: 4.2,
    commission: 18,
    joined: '2022-06-20',
    lastOrder: '13:01',
  },
  {
    id: 'P-005',
    name: 'Burger King UZ',
    category: 'Food',
    type: 'Restoran',
    contact: 'Nilufar Yusupova',
    phone: '+998 91 234 56 78',
    email: 'bk@operator.uz',
    zone: 'Mirzo Ulugbek',
    status: 'Active',
    orders: 2100,
    revenue: 98000000,
    rating: 5.0,
    commission: 18,
    joined: '2021-08-14',
    lastOrder: '13:50',
  },
  {
    id: 'P-006',
    name: 'Makro Supermarket',
    category: 'Market',
    type: 'Supermarket',
    contact: "Sherzod Xo'jayev",
    phone: '+998 94 555 66 77',
    email: 'partner@makro.uz',
    zone: 'Olmazor',
    status: 'Active',
    orders: 1870,
    revenue: 176000000,
    rating: 4.5,
    commission: 12,
    joined: '2021-12-01',
    lastOrder: '13:45',
  },
  {
    id: 'P-007',
    name: 'Yandex Drive UZ',
    category: 'Taxi',
    type: 'Avtoprovayder',
    contact: 'Feruza Karimova',
    phone: '+998 90 888 99 00',
    email: 'partners@yandex.uz',
    zone: 'Uchtepa',
    status: 'Pending',
    orders: 0,
    revenue: 0,
    rating: null,
    commission: 10,
    joined: '2024-09-30',
    lastOrder: null,
  },
  {
    id: 'P-008',
    name: 'Plov Center',
    category: 'Food',
    type: 'Restoran',
    contact: 'Abdulloh Nazarov',
    phone: '+998 93 111 22 33',
    email: 'plov@tashkent.uz',
    zone: 'Chilonzor',
    status: 'Active',
    orders: 3340,
    revenue: 143000000,
    rating: 4.8,
    commission: 18,
    joined: '2020-05-22',
    lastOrder: '13:35',
  },
  {
    id: 'P-009',
    name: 'Next Supermarket',
    category: 'Market',
    type: 'Supermarket',
    contact: 'Gulnora Ibragimova',
    phone: '+998 97 333 44 55',
    email: 'info@next.uz',
    zone: 'Shayhontohur',
    status: 'Active',
    orders: 1120,
    revenue: 94000000,
    rating: 4.6,
    commission: 12,
    joined: '2022-02-11',
    lastOrder: '13:30',
  },
  {
    id: 'P-010',
    name: 'Tandirchi',
    category: 'Food',
    type: 'Restoran',
    contact: 'Maftuna Xoliqova',
    phone: '+998 91 777 88 99',
    email: 'tandirchi@mail.uz',
    zone: 'Yunusobod',
    status: 'Active',
    orders: 870,
    revenue: 41000000,
    rating: 4.8,
    commission: 18,
    joined: '2022-09-05',
    lastOrder: '13:10',
  },
  {
    id: 'P-011',
    name: 'Orient Express',
    category: 'Taxi',
    type: 'Avtoprovayder',
    contact: 'Lochinbek Tursunov',
    phone: '+998 93 222 33 44',
    email: 'orient@fleet.uz',
    zone: 'Bektemir',
    status: 'Inactive',
    orders: 234,
    revenue: 8900000,
    rating: 4.1,
    commission: 10,
    joined: '2023-01-18',
    lastOrder: '10:22',
  },
  {
    id: 'P-012',
    name: 'Slam Dunk Cafe',
    category: 'Food',
    type: 'Kafe',
    contact: 'Jasur Aliev',
    phone: '+998 93 900 11 44',
    email: 'slam@cafe.uz',
    zone: 'Yakkasaroy',
    status: 'Active',
    orders: 680,
    revenue: 28000000,
    rating: 4.7,
    commission: 18,
    joined: '2023-03-12',
    lastOrder: '14:00',
  },
]

const STATUS_CONFIG = {
  Active: { bg: '#DCFCE7', color: '#15803D', label: 'Faol', dot: '#22C55E' },
  Pending: {
    bg: '#F3F4F6',
    color: '#6B7280',
    label: 'Kutmoqda',
    dot: '#9CA3AF',
  },
  Suspended: {
    bg: '#FEF3C7',
    color: '#D97706',
    label: "To'xtatildi",
    dot: '#F59E0B',
  },
  Inactive: {
    bg: '#FEE2E2',
    color: '#DC2626',
    label: 'Nofaol',
    dot: '#EF4444',
  },
}

const CATEGORY_CONFIG = {
  Food: { icon: '🍔', color: C.food, bg: '#FFF7ED' },
  Market: { icon: '🛒', color: C.mkt, bg: '#F0FDF4' },
  Taxi: { icon: '🚖', color: C.taxi, bg: '#F5F3FF' },
}

const ZONES = [
  'Barcha zonalar',
  'Chilonzor',
  'Yunusobod',
  'Yakkasaroy',
  'Mirzo Ulugbek',
  'Sergeli',
  'Olmazor',
  'Uchtepa',
  'Shayhontohur',
  'Bektemir',
]
const CATEGORIES = ['Barcha kategoriya', 'Food', 'Market', 'Taxi']
const STATUSES = ['Barcha holat', 'Active', 'Pending', 'Suspended', 'Inactive']

const fmtShort = n =>
  n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + 'M'
    : n >= 1_000
      ? (n / 1_000).toFixed(0) + 'K'
      : String(n)

// ─── Select ───────────────────────────────────────────────────────────────────
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
          minWidth: 150,
          justifyContent: 'space-between',
          boxShadow: open ? `0 0 0 2px ${C.blue}33` : 'none',
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
            transition: 'transform 0.2s',
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
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
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
                color: value === opt ? C.blue : C.text,
                cursor: 'pointer',
                background: value === opt ? '#EFF6FF' : 'transparent',
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

function StatusBadge({ status }) {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG['Pending']
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
        padding: '3px 8px',
        borderRadius: 20,
      }}
    >
      <span
        style={{ width: 5, height: 5, borderRadius: '50%', background: s.dot }}
      />
      {s.label}
    </span>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ partner, onClose }) {
  if (!partner) return null
  const cc = CATEGORY_CONFIG[partner.category]
  const isSuspended =
    partner.status === 'Suspended' || partner.status === 'Inactive'

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
          padding: '16px 20px 14px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
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
                fontSize: 11,
                color: C.muted,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Hamkor tafsilotlari
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.5,
              }}
            >
              {partner.name}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>
              {partner.id} · {partner.type}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StatusBadge status={partner.status} />
            <button
              onClick={onClose}
              style={{
                width: 28,
                height: 28,
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
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Category + Zone */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <div
            style={{
              flex: 1,
              background: cc.bg,
              borderRadius: 10,
              padding: '10px 12px',
              border: `1px solid ${cc.color}22`,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Kategoriya
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>{cc.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: cc.color }}>
                {partner.category}
              </span>
            </div>
          </div>
          <div
            style={{
              flex: 2,
              background: C.light,
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Hudud
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
              📍 {partner.zone}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
              Xizmat zonasi
            </div>
          </div>
        </div>

        {/* Contact */}
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
              fontSize: 9,
              color: C.muted,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            Mas'ul shaxs
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                {partner.contact}
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                {partner.phone}
              </div>
              <div style={{ fontSize: 11, color: C.blue, marginTop: 1 }}>
                {partner.email}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['📞', '✉️'].map(icon => (
                <button
                  key={icon}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    cursor: 'pointer',
                    fontSize: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics */}
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
              label: 'Jami buyurtmalar',
              value: partner.orders.toLocaleString(),
              icon: '📦',
            },
            {
              label: 'Jami daromad',
              value: fmtShort(partner.revenue) + ' UZS',
              icon: '💰',
            },
            { label: 'Komissiya', value: partner.commission + '%', icon: '📊' },
            {
              label: 'Reyting',
              value: partner.rating ? '★ ' + partner.rating : '—',
              icon: '⭐',
            },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '12px 14px',
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {icon} {label}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Commission bar */}
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
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
              Komissiya foizi
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.indigo }}>
              {partner.commission}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: '#E2E8F0',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(partner.commission / 25) * 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${C.blue}, ${C.indigo})`,
                borderRadius: 3,
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4,
            }}
          >
            <span style={{ fontSize: 9, color: C.muted }}>0%</span>
            <span style={{ fontSize: 9, color: C.muted }}>25%</span>
          </div>
        </div>

        {/* Dates */}
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
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Qo'shilgan sana
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
              {partner.joined}
            </div>
          </div>
          <div
            style={{
              background: C.light,
              borderRadius: 10,
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              Oxirgi buyurtma
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>
              {partner.lastOrder ? 'Bugun, ' + partner.lastOrder : '—'}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
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
            Boshqaruv amaliyotlari
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          >
            {[
              { icon: '✏️', label: 'Tahrirlash', color: C.blue },
              { icon: '📋', label: 'Shartnoma', color: C.mkt },
              { icon: '📊', label: 'Hisobot', color: C.indigo },
              {
                icon: isSuspended ? '▶️' : '⏸️',
                label: isSuspended ? 'Faollashtirish' : "To'xtatish",
                color: isSuspended ? C.green : C.amber,
              },
            ].map(({ icon, label, color }) => (
              <button
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                  padding: '10px 8px',
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                  background: C.card,
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
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
            background: `linear-gradient(135deg, ${C.slate}, #1E3A5F)`,
            color: '#fff',
            fontSize: 13,
            fontWeight: 800,
            cursor: 'pointer',
            letterSpacing: 0.2,
          }}
        >
          📦 Buyurtmalar tarixini ko'rish
        </button>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Partners() {
  const [selected, setSelected] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('Barcha kategoriya')
  const [zoneFilter, setZoneFilter] = useState('Barcha zonalar')
  const [statusFilter, setStatusFilter] = useState('Barcha holat')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sortCol, setSortCol] = useState('orders')
  const [sortDir, setSortDir] = useState('desc')
  const PAGE_SIZE = 8

  const filtered = useMemo(() => {
    let data = [...MOCK_PARTNERS]
    if (categoryFilter !== 'Barcha kategoriya')
      data = data.filter(p => p.category === categoryFilter)
    if (zoneFilter !== 'Barcha zonalar')
      data = data.filter(p => p.zone === zoneFilter || p.zone === 'Barcha')
    if (statusFilter !== 'Barcha holat')
      data = data.filter(p => p.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.contact.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q),
      )
    }
    data.sort((a, b) => {
      let av = a[sortCol] ?? (sortDir === 'asc' ? Infinity : -Infinity)
      let bv = b[sortCol] ?? (sortDir === 'asc' ? Infinity : -Infinity)
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : av < bv ? 1 : -1
    })
    return data
  }, [categoryFilter, zoneFilter, statusFilter, search, sortCol, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortCol(col)
      setSortDir('desc')
    }
  }

  const totalRevenue = MOCK_PARTNERS.filter(p => p.status === 'Active').reduce(
    (s, p) => s + p.revenue,
    0,
  )

  const COL_HEADERS = [
    { key: 'id', label: 'Hamkor ID', w: 80 },
    { key: 'name', label: 'Nomi', flex: true },
    { key: 'category', label: 'Kategoriya', w: 100 },
    { key: 'contact', label: "Mas'ul", w: 150 },
    { key: 'zone', label: 'Zona', w: 120 },
    { key: 'orders', label: 'Buyurtmalar', w: 110, right: true },
    { key: 'revenue', label: 'Daromad', w: 120, right: true },
    { key: 'rating', label: 'Reyting', w: 80, right: true },
    { key: 'status', label: 'Holat', w: 110 },
  ]

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        fontFamily: "'Outfit','Inter',sans-serif",
      }}
    >
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 5px; height: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; } button:hover { opacity: 0.85; }`}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 18,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.5,
                margin: 0,
              }}
            >
              Hamkorlar boshqaruvi
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              MilliyGo ekotizimidagi barcha xizmat hamkorlari monitoringi
            </p>
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: C.slate,
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '9px 16px',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            + Yangi hamkor qo'shish
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {[
            {
              label: 'Jami hamkorlar',
              value: MOCK_PARTNERS.length,
              color: C.indigo,
              icon: '🤝',
            },
            {
              label: 'Faol',
              value: MOCK_PARTNERS.filter(p => p.status === 'Active').length,
              color: C.green,
              icon: '✅',
            },
            {
              label: 'Kutmoqda',
              value: MOCK_PARTNERS.filter(p => p.status === 'Pending').length,
              color: C.muted,
              icon: '⏳',
            },
            {
              label: "To'xtatilgan",
              value: MOCK_PARTNERS.filter(
                p => p.status === 'Suspended' || p.status === 'Inactive',
              ).length,
              color: C.red,
              icon: '⚠️',
            },
            {
              label: 'Faol hamkorlar daromadi',
              value: fmtShort(totalRevenue) + ' UZS',
              color: C.food,
              icon: '💰',
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
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color }}>
                  {value}
                </div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          style={{
            background: C.card,
            borderRadius: 12,
            padding: '14px 16px',
            border: `1px solid ${C.border}`,
            marginBottom: 14,
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
              label="Kategoriya"
              value={categoryFilter}
              onChange={v => {
                setCategoryFilter(v)
                setPage(1)
              }}
              options={CATEGORIES}
            />
            <Select
              label="Zona tanlash"
              value={zoneFilter}
              onChange={v => {
                setZoneFilter(v)
                setPage(1)
              }}
              options={ZONES}
            />
            <Select
              label="Hamkor holati"
              value={statusFilter}
              onChange={v => {
                setStatusFilter(v)
                setPage(1)
              }}
              options={STATUSES}
            />
            <div style={{ flex: 1, minWidth: 180 }}>
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
              <input
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder="ID, nomi, mas'ul shaxs..."
                style={{
                  width: '100%',
                  padding: '7px 10px',
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
                Eksport
              </div>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  padding: '7px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                  cursor: 'pointer',
                }}
              >
                ⬇ Excel
              </button>
            </div>
          </div>
        </div>

        {/* Table + Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selected ? '1fr 360px' : '1fr',
            gap: 14,
          }}
        >
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
            }}
          >
            {/* Col headers */}
            <div
              style={{ display: 'flex', borderBottom: `2px solid ${C.border}` }}
            >
              {COL_HEADERS.map(({ key, label, w, flex: isFlex, right }) => (
                <div
                  key={key}
                  onClick={() => handleSort(key)}
                  style={{
                    padding: '11px 12px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    cursor: 'pointer',
                    width: isFlex ? undefined : w,
                    flex: isFlex ? 1 : undefined,
                    minWidth: w,
                    textAlign: right ? 'right' : 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: right ? 'flex-end' : 'flex-start',
                    gap: 4,
                    userSelect: 'none',
                    background: sortCol === key ? '#F8FAFF' : 'transparent',
                  }}
                >
                  {label}
                  {sortCol === key && (
                    <span style={{ fontSize: 8 }}>
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
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: C.muted,
                  fontSize: 13,
                }}
              >
                🔍 Hamkorlar topilmadi
              </div>
            ) : (
              paged.map(partner => {
                const cc = CATEGORY_CONFIG[partner.category]
                const isSelected = selected?.id === partner.id
                return (
                  <div
                    key={partner.id}
                    onClick={() => setSelected(isSelected ? null : partner)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      background: isSelected ? '#EFF6FF' : 'transparent',
                      transition: 'background 0.15s',
                      borderLeft: isSelected
                        ? `3px solid ${C.blue}`
                        : '3px solid transparent',
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        minWidth: 80,
                        padding: '13px 12px',
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: 800,
                        color: isSelected ? C.blue : C.muted,
                      }}
                    >
                      {partner.id}
                    </div>
                    <div
                      style={{ flex: 1, minWidth: 140, padding: '13px 10px' }}
                    >
                      <div
                        style={{ fontSize: 12, fontWeight: 700, color: C.text }}
                      >
                        {partner.name}
                      </div>
                      <div
                        style={{ fontSize: 10, color: C.muted, marginTop: 1 }}
                      >
                        {partner.type}
                      </div>
                    </div>
                    <div
                      style={{ width: 100, minWidth: 100, padding: '13px 8px' }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: cc.bg,
                          borderRadius: 6,
                          padding: '2px 7px',
                          fontSize: 11,
                          fontWeight: 700,
                          color: cc.color,
                        }}
                      >
                        {cc.icon} {partner.category}
                      </span>
                    </div>
                    <div
                      style={{
                        width: 150,
                        minWidth: 150,
                        padding: '13px 10px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.text,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {partner.contact}
                      </div>
                      <div style={{ fontSize: 10, color: C.muted }}>
                        {partner.phone.slice(0, 15)}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 120,
                        minWidth: 120,
                        padding: '13px 10px',
                        fontSize: 11,
                        color: C.muted,
                        fontWeight: 500,
                      }}
                    >
                      📍 {partner.zone}
                    </div>
                    <div
                      style={{
                        width: 110,
                        minWidth: 110,
                        padding: '13px 12px',
                        textAlign: 'right',
                      }}
                    >
                      <div
                        style={{ fontSize: 12, fontWeight: 800, color: C.text }}
                      >
                        {partner.orders.toLocaleString()}
                      </div>
                      <div style={{ fontSize: 9, color: C.muted }}>
                        buyurtma
                      </div>
                    </div>
                    <div
                      style={{
                        width: 120,
                        minWidth: 120,
                        padding: '13px 12px',
                        textAlign: 'right',
                      }}
                    >
                      <div
                        style={{ fontSize: 12, fontWeight: 800, color: C.text }}
                      >
                        {fmtShort(partner.revenue)}
                      </div>
                      <div style={{ fontSize: 9, color: C.muted }}>UZS</div>
                    </div>
                    <div
                      style={{
                        width: 80,
                        minWidth: 80,
                        padding: '13px 10px',
                        textAlign: 'right',
                      }}
                    >
                      {partner.rating ? (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.amber,
                          }}
                        >
                          ★ {partner.rating}
                        </span>
                      ) : (
                        <span style={{ fontSize: 11, color: C.muted }}>—</span>
                      )}
                    </div>
                    <div
                      style={{
                        width: 110,
                        minWidth: 110,
                        padding: '13px 10px',
                      }}
                    >
                      <StatusBadge status={partner.status} />
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
                Jami <strong>{filtered.length}</strong> hamkordan{' '}
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
                        border: `1px solid ${page === p ? C.blue : C.border}`,
                        background: page === p ? C.blue : C.card,
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
              }}
            >
              <DetailPanel
                partner={selected}
                onClose={() => setSelected(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
