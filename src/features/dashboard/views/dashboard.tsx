import { useState } from 'react'
import KpiCard from '../components/KpiCard'
import Dot from '../components/Dot'
import Donut from '../components/Donut'
import OrderRow from '../components/OrderRow'
import BarChart from '../components/BarChart'
import CityMap from '../components/CityMap'

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



export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('Hammasi')
  const [activeOrderTab, setActiveOrderTab] = useState('Barchasi')

  const kpis = [
    {
      title: 'Jami GMV (bugun)',
      value: '128,430',
      prefix: '$',
      change: 12.5,
      color: C.mkt,
      spark: [62, 70, 68, 82, 75, 90, 85, 94, 88, 105, 100, 115],
    },
    {
      title: 'Faol buyurtmalar',
      value: '1,452',
      change: -2.1,
      color: C.blue,
      spark: [190, 210, 195, 220, 205, 230, 215, 240, 225, 210, 220, 215],
    },
    {
      title: 'Online haydovchilar',
      value: '842',
      change: 5.4,
      color: C.food,
      spark: [120, 130, 125, 140, 138, 145, 142, 150, 148, 155, 152, 160],
    },
    {
      title: "O'rtacha yetkazish",
      value: '24:15',
      change: -3.2,
      color: C.indigo,
      spark: [32, 30, 28, 29, 27, 26, 28, 25, 24, 26, 25, 24],
    },
    {
      title: 'Muvaffaqiyat darajasi',
      value: '96.8%',
      change: 1.2,
      color: C.amber,
      spark: [93, 94, 94, 95, 95, 96, 95, 96, 97, 96, 97, 97],
    },
  ]

  const orders = [
    {
      id: '8921',
      restaurant: 'KFC Chilonzor',
      amount: '24.50',
      status: "Yo'lda",
      time: 'Hozir',
    },
    {
      id: '8920',
      restaurant: 'Pizza House',
      amount: '18.90',
      status: 'Tayyorlanmoqda',
      time: '2 daq',
    },
    {
      id: '8919',
      restaurant: 'Korzinka',
      amount: '67.20',
      status: 'Yetkazildi',
      time: '8 daq',
    },
    {
      id: '8918',
      restaurant: 'Osh Markazi',
      amount: '14.00',
      status: 'Bekor qilindi',
      time: '12 daq',
    },
    {
      id: '8917',
      restaurant: 'Tandirchi',
      amount: '31.50',
      status: 'Yetkazildi',
      time: '18 daq',
    },
    {
      id: '8916',
      restaurant: 'Fuji Sushi',
      amount: '52.00',
      status: "Yo'lda",
      time: '22 daq',
    },
  ]

  const filteredOrders =
    activeOrderTab === 'Barchasi'
      ? orders
      : activeOrderTab === 'Aktiv'
        ? orders.filter(
            o => o.status === "Yo'lda" || o.status === 'Tayyorlanmoqda',
          )
        : orders.filter(
            o => o.status === 'Yetkazildi' || o.status === 'Bekor qilindi',
          )

  const drivers = [
    {
      name: 'Murod Abdurov',
      type: '🛵',
      rating: '4.9',
      orders: 38,
      status: 'Faol',
    },
    {
      name: 'Jasur Karimov',
      type: '🚖',
      rating: '4.8',
      orders: 22,
      status: "Yo'lda",
    },
    {
      name: 'Akbar Xasanov',
      type: '🛵',
      rating: '4.7',
      orders: 41,
      status: 'Faol',
    },
    {
      name: 'Bobur Toshev',
      type: '🛵',
      rating: '4.6',
      orders: 29,
      status: "Yo'lda",
    },
    {
      name: 'Sherzod Yusupov',
      type: '🚖',
      rating: '4.9',
      orders: 18,
      status: 'Offline',
    },
    {
      name: 'Nodir Rahimov',
      type: '🚖',
      rating: '4.8',
      orders: 33,
      status: 'Faol',
    },
  ]

  const alerts = [
    {
      icon: '⚠️',
      title: "To'lov kechikishi",
      desc: 'Stripe > 5s · Food segment',
      time: '2 daq',
      border: '#FCA5A5',
      c: C.red,
    },
    {
      icon: '📉',
      title: 'Bekor qilishlar oshdi',
      desc: 'B zonada +15% cancellation',
      time: '12 daq',
      border: '#FCD34D',
      c: C.amber,
    },
    {
      icon: '🛵',
      title: 'Kurier tanqisligi',
      desc: 'Chilonzor: 8 buyurtma kutmoqda',
      time: '18 daq',
      border: '#FDBA74',
      c: C.food,
    },
    {
      icon: '⚡',
      title: 'Surge pricing aktiv',
      desc: 'Yakkasaroy: 3× tarif',
      time: '25 daq',
      border: '#C4B5FD',
      c: C.taxi,
    },
  ]

  const barData = [
    { label: 'Du', values: [320, 180] },
    { label: 'Se', values: [410, 220] },
    { label: 'Ch', values: [390, 195] },
    { label: 'Pa', values: [520, 280] },
    { label: 'Ju', values: [480, 260] },
    { label: 'Sh', values: [610, 340] },
    { label: 'Ya', values: [750, 410] },
  ]

  const zones = [
    { zone: 'Chilonzor', pct: 85, count: 124, color: C.food },
    { zone: 'Yakkasaroy', pct: 67, count: 98, color: C.taxi },
    { zone: 'Yunusobod', pct: 52, count: 76, color: C.mkt },
    { zone: "Mirzo Ulug'bek", pct: 37, count: 54, color: C.indigo },
    { zone: 'Sergeli', pct: 24, count: 36, color: C.amber },
  ]

  const donutSegs = [
    { value: 642, color: C.food },
    { value: 418, color: C.mkt },
    { value: 128, color: C.taxi },
  ]

  const dStatusColor = { Faol: C.mkt, "Yo'lda": C.blue, Offline: C.muted }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.bg,
        fontFamily: "'Outfit','Inter',sans-serif",
      }}
    >
      <style>{`
        @keyframes ping{75%,100%{transform:scale(1.9);opacity:0}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px}
      `}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* Page header */}

        {/* KPI Row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {kpis.map((k, i) => (
            <KpiCard key={i} {...k} />
          ))}
        </div>

        {/* Map + Alerts row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 310px',
            gap: 14,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: 18,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15 }}>🗺</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                  Xizmat Puls Xaritasi
                </span>
                <span
                  style={{
                    background: '#DCFCE7',
                    color: '#15803D',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 20,
                  }}
                >
                  JONLI
                </span>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {['Hammasi', 'Yetkazish', 'Taksi'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    style={{
                      padding: '4px 11px',
                      borderRadius: 20,
                      border: 'none',
                      background: activeFilter === tab ? C.slate : C.light,
                      color: activeFilter === tab ? '#fff' : C.muted,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <CityMap filter={activeFilter} />
            <div
              style={{
                display: 'flex',
                marginTop: 14,
                gap: 0,
                borderTop: `1px solid ${C.border}`,
                paddingTop: 12,
              }}
            >
              {[
                {
                  label: 'Faol kurierlar',
                  value: '124',
                  icon: '🛵',
                  color: C.food,
                },
                {
                  label: 'Faol takschilar',
                  value: '67',
                  icon: '🚖',
                  color: C.taxi,
                },
                {
                  label: 'Surge zonalar',
                  value: '3',
                  icon: '🔥',
                  color: C.red,
                },
                {
                  label: "O'rtacha ETA",
                  value: '18 daq',
                  icon: '⏱',
                  color: C.indigo,
                },
              ].map(({ label, value, icon, color }, i, arr) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px',
                    borderRight:
                      i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ fontSize: 14 }}>{icon}</div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color,
                      marginTop: 2,
                    }}
                  >
                    {value}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts + Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                background: C.card,
                borderRadius: 14,
                padding: 16,
                border: `1px solid ${C.border}`,
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Dot color={C.red} pulse />
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: C.text }}
                  >
                    Kritik ogohlantirishlar
                  </span>
                  <span
                    style={{
                      background: '#FEE2E2',
                      color: C.red,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 20,
                    }}
                  >
                    4
                  </span>
                </div>
                <button
                  style={{
                    fontSize: 10,
                    color: C.blue,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Barchasi →
                </button>
              </div>
              {alerts.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 9,
                    padding: '7px 0',
                    borderBottom:
                      i < alerts.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: a.c + '15',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      flexShrink: 0,
                      border: `1px solid ${a.border}44`,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: 11, fontWeight: 700, color: C.text }}
                    >
                      {a.title}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                      {a.desc}
                    </div>
                  </div>
                  <span style={{ fontSize: 9, color: C.muted, flexShrink: 0 }}>
                    {a.time}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: C.card,
                borderRadius: 14,
                padding: 16,
                border: `1px solid ${C.border}`,
                flex: 1,
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
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                  So'nggi faoliyat
                </span>
                <span style={{ fontSize: 9, color: C.muted }}>real vaqt</span>
              </div>
              {[
                {
                  icon: '🍔',
                  bg: '#FEF3C7',
                  title: 'Yangi buyurtma #8921',
                  sub: 'KFC · $24.50',
                  time: 'Hozir',
                },
                {
                  icon: '✅',
                  bg: '#D1FAE5',
                  title: 'Kurier tayinlandi',
                  sub: 'M. Abdurov · 4.9★',
                  time: '4 daq',
                },
                {
                  icon: '📦',
                  bg: '#FEE2E2',
                  title: 'Buyurtma kechikdi',
                  sub: 'Korzinka · Trafik',
                  time: '9 daq',
                },
                {
                  icon: '🚖',
                  bg: '#EDE9FE',
                  title: 'Taksi tayinlandi',
                  sub: 'J. Karimov · A4',
                  time: '11 daq',
                },
                {
                  icon: '⭐',
                  bg: '#FEF9C3',
                  title: 'Yangi baho',
                  sub: 'Pizza House · 4.8',
                  time: '15 daq',
                },
              ].map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '6px 0',
                    borderBottom: i < 4 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: a.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {a.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.text,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {a.title}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>{a.sub}</div>
                  </div>
                  <span style={{ fontSize: 9, color: C.muted, flexShrink: 0 }}>
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom 3 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 14,
            marginBottom: 14,
          }}
        >
          {/* Orders */}
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: 18,
              border: `1px solid ${C.border}`,
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
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                  Buyurtmalar
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
                  Jonli monitoring
                </div>
              </div>
              <button
                style={{
                  fontSize: 11,
                  color: C.blue,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Barchasini ko'rish →
              </button>
            </div>
            <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
              {['Barchasi', 'Aktiv', 'Yakunlangan'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveOrderTab(tab)}
                  style={{
                    padding: '4px 11px',
                    borderRadius: 20,
                    border: 'none',
                    background: activeOrderTab === tab ? C.slate : C.light,
                    color: activeOrderTab === tab ? '#fff' : C.muted,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 10,
                padding: '6px 0',
                borderBottom: `2px solid ${C.border}`,
                marginBottom: 2,
              }}
            >
              {[
                ['ID', 48],
                ['Restoran', null],
                ['Summa', 52],
                ['Holat', 105],
                ['Vaqt', 44],
              ].map(([h, w], i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    flex: h === 'Restoran' ? 1 : undefined,
                    width: w || undefined,
                    textAlign: h === 'Summa' || h === 'Vaqt' ? 'right' : 'left',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            {filteredOrders.map((o, i) => (
              <OrderRow key={i} {...o} />
            ))}
          </div>

          {/* Zone performance */}
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: 18,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Zona samaradorligi
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>
              Kurier taqsimoti
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                paddingBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <Donut segments={donutSegs} size={72} />
              <div style={{ flex: 1 }}>
                {[
                  ['🍔 Yetkazish', 642, C.food],
                  ['🏪 Bozor', 418, C.mkt],
                  ['🚖 Taksi', 128, C.taxi],
                ].map(([label, val, color]) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 11, color: C.muted }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color }}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {zones.map(({ zone, pct, count, color }) => (
              <div
                key={zone}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 9,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 11, color: C.text, flex: 1 }}>
                  {zone}
                </span>
                <div
                  style={{
                    width: 60,
                    height: 5,
                    background: C.light,
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: color,
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.text,
                    width: 22,
                    textAlign: 'right',
                  }}
                >
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Drivers */}
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: 18,
              border: `1px solid ${C.border}`,
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
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                  Haydovchilar
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
                  {drivers.filter(d => d.status !== 'Offline').length} ta aktiv
                </div>
              </div>
              <button
                style={{
                  fontSize: 11,
                  color: C.blue,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Barchasini →
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 0,
                marginBottom: 14,
                background: C.light,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {[
                {
                  label: 'Faol',
                  value: drivers.filter(d => d.status === 'Faol').length,
                  color: C.mkt,
                },
                {
                  label: "Yo'lda",
                  value: drivers.filter(d => d.status === "Yo'lda").length,
                  color: C.blue,
                },
                {
                  label: 'Offline',
                  value: drivers.filter(d => d.status === 'Offline').length,
                  color: C.muted,
                },
              ].map(({ label, value, color }, i, arr) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px 4px',
                    borderRight:
                      i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 800, color }}>
                    {value}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted }}>{label}</div>
                </div>
              ))}
            </div>
            {drivers.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '7px 0',
                  borderBottom:
                    i < drivers.length - 1 ? `1px solid ${C.border}` : 'none',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: `${d.type === '🛵' ? C.food : C.taxi}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {d.type}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
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
                    {d.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.muted,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <span style={{ color: '#F59E0B' }}>★</span>
                    {d.rating} · {d.orders} ta
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Dot
                    color={dStatusColor[d.status]}
                    pulse={d.status === 'Faol'}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: dStatusColor[d.status],
                    }}
                  >
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts row */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
        >
          {/* Weekly bar chart */}
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: 18,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 16,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                  Haftalik dinamika
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  Buyurtmalar va daromad
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>
                  $128,430
                </div>
                <div style={{ fontSize: 11, color: C.mkt }}>
                  ↑ 12.5% bu hafta
                </div>
              </div>
            </div>
            <BarChart data={barData} colors={[C.blue, C.food]} height={115} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 20,
                marginTop: 12,
              }}
            >
              {[
                [C.blue, 'Buyurtmalar'],
                [C.food, 'Daromad ($×10)'],
              ].map(([color, label]) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: color,
                    }}
                  />
                  <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
                </div>
              ))}
            </div>
            {/* Bottom stats */}
            <div
              style={{
                display: 'flex',
                marginTop: 16,
                borderTop: `1px solid ${C.border}`,
                paddingTop: 14,
                gap: 0,
              }}
            >
              {[
                { label: "O'rtacha buyurtma", value: '$18.40', color: C.blue },
                { label: 'Eng faol soat', value: '18–19', color: C.food },
                { label: 'Qaytarilgan', value: '3.2%', color: C.red },
              ].map(({ label, value, color }, i, arr) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    borderRight:
                      i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 800, color }}>
                    {value}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance metrics */}
          <div
            style={{
              background: C.card,
              borderRadius: 14,
              padding: 18,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Samaradorlik ko'rsatkichlari
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 14 }}>
              Bugungi natijalar
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}
            >
              {[
                {
                  label: 'Muvaffaqiyatli yetkazish',
                  value: '96.8%',
                  color: C.mkt,
                  icon: '✅',
                  prev: '95.2%',
                },
                {
                  label: "O'rtacha baholash",
                  value: '4.78★',
                  color: C.amber,
                  icon: '⭐',
                  prev: '4.72★',
                },
                {
                  label: 'Yangi foydalanuvchilar',
                  value: '248',
                  color: C.blue,
                  icon: '👥',
                  prev: '215',
                },
                {
                  label: 'Qaytarilgan buyurtmalar',
                  value: '3.2%',
                  color: C.red,
                  icon: '↩️',
                  prev: '4.1%',
                },
                {
                  label: 'Eng faol soat',
                  value: '18:00–19:00',
                  color: C.indigo,
                  icon: '📈',
                  prev: '17–18',
                },
                {
                  label: "Promo qo'llanildi",
                  value: '312',
                  color: C.food,
                  icon: '🎁',
                  prev: '287',
                },
              ].map(({ label, value, color, icon, prev }) => (
                <div
                  key={label}
                  style={{
                    background: C.light,
                    borderRadius: 10,
                    padding: '11px 13px',
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      marginBottom: 5,
                    }}
                  >
                    <span style={{ fontSize: 13 }}>{icon}</span>
                    <span
                      style={{ fontSize: 10, color: C.muted, fontWeight: 500 }}
                    >
                      {label}
                    </span>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color }}>
                    {value}
                  </div>
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
                    oldingi: {prev}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            padding: '18px 0 6px',
            fontSize: 10,
            color: C.muted,
          }}
        >
          DeliControl Superadmin · v2.4.1 · Ma'lumotlar har 30 soniyada
          yangilanadi
        </div>
      </div>
    </div>
  )
}
