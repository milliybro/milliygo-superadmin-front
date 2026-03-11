import { useState, useMemo, useRef, useEffect, useCallback } from 'react'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  orange: '#F97316',
  orangeD: '#C2410C',
  orangeL: '#FFF7ED',
  blue: '#2563EB',
  blueL: '#EFF6FF',
  emerald: '#059669',
  emeraldL: '#F0FDF4',
  violet: '#7C3AED',
  violetL: '#F5F3FF',
  sky: '#0EA5E9',
  skyL: '#F0F9FF',
  rose: '#F43F5E',
  roseL: '#FFF1F2',
  amber: '#D97706',
  amberL: '#FFFBEB',
  teal: '#0D9488',
  tealL: '#F0FDFA',
  pink: '#EC4899',
  pinkL: '#FDF2F8',
  lime: '#65A30D',
  limeL: '#F7FEE7',
  text: '#0F172A',
  text2: '#1E293B',
  muted: '#64748B',
  muted2: '#94A3B8',
  border: '#E2E8F0',
  light: '#F1F5F9',
  light2: '#F8FAFC',
  card: '#FFFFFF',
  bg: '#F0F4F8',
  dark: '#0F172A',
  dark2: '#1E293B',
  dark3: '#334155',
  green: '#16A34A',
  red: '#DC2626',
}

const SVC = {
  Food: { color: C.orange, light: C.orangeL, icon: '🍔', label: 'Food' },
  Market: { color: C.emerald, light: C.emeraldL, icon: '🛒', label: 'Market' },
  Taxi: { color: C.violet, light: C.violetL, icon: '🚖', label: 'Taxi' },
  Cargo: { color: C.sky, light: C.skyL, icon: '📦', label: 'Cargo' },
}

const RANGES = [
  'Bugun',
  'Kecha',
  '7 kun',
  '30 kun',
  'Bu oy',
  "O'tgan oy",
  'Maxsus',
]

// ─── MOCK DATA GENERATORS ─────────────────────────────────────────────────────
const seed = (s: any) => {
  let x = s
  return () => {
    x = Math.sin(x) * 10000
    return Math.abs(x % 1)
  }
}

function genRevenue(days = 30) {
  const r = seed(42)
  return Array.from({ length: days }, (_, i) => {
    const trend = 1 + i * 0.015
    const noise = 0.8 + r() * 0.4
    const weekend = [0, 6].includes(
      new Date(Date.now() - (days - 1 - i) * 86400000).getDay(),
    )
      ? 1.25
      : 1
    return {
      day: i,
      label: new Date(
        Date.now() - (days - 1 - i) * 86400000,
      ).toLocaleDateString('uz', { month: 'short', day: 'numeric' }),
      Food: Math.round(28000000 * trend * noise * weekend * (0.8 + r() * 0.4)),
      Market: Math.round(18000000 * trend * noise * (0.7 + r() * 0.6)),
      Taxi: Math.round(12000000 * trend * noise * (0.6 + r() * 0.8)),
      Cargo: Math.round(8000000 * trend * noise * (0.5 + r() * 1.0)),
    }
  })
}

function genHourly() {
  const r = seed(99)
  return Array.from({ length: 24 }, (_, h) => {
    const base =
      h < 7
        ? 0.05
        : h < 10
          ? 0.6
          : h < 13
            ? 0.9
            : h < 15
              ? 0.7
              : h < 19
                ? 1.0
                : h < 22
                  ? 0.8
                  : 0.2
    return Array.from({ length: 7 }, (_, d) => {
      const wknd = [0, 6].includes(d) ? 1.2 : 1
      return Math.round(base * wknd * (0.7 + r() * 0.6) * 100)
    })
  })
}

function genCities() {
  return [
    {
      name: 'Toshkent',
      x: 68,
      y: 44,
      revenue: 3840000000,
      orders: 18420,
      users: 94200,
      growth: +12.4,
    },
    {
      name: 'Samarqand',
      x: 54,
      y: 55,
      revenue: 820000000,
      orders: 3210,
      users: 18400,
      growth: +8.1,
    },
    {
      name: 'Namangan',
      x: 72,
      y: 32,
      revenue: 680000000,
      orders: 2780,
      users: 15200,
      growth: +14.2,
    },
    {
      name: 'Andijon',
      x: 80,
      y: 36,
      revenue: 590000000,
      orders: 2340,
      users: 13100,
      growth: +9.8,
    },
    {
      name: "Farg'ona",
      x: 77,
      y: 40,
      revenue: 520000000,
      orders: 2080,
      users: 11600,
      growth: +6.3,
    },
    {
      name: 'Buxoro',
      x: 42,
      y: 52,
      revenue: 410000000,
      orders: 1640,
      users: 9200,
      growth: -2.1,
    },
    {
      name: "Qo'qon",
      x: 74,
      y: 42,
      revenue: 290000000,
      orders: 1180,
      users: 6400,
      growth: +18.7,
    },
    {
      name: 'Nukus',
      x: 18,
      y: 28,
      revenue: 180000000,
      orders: 720,
      users: 4100,
      growth: +22.3,
    },
  ]
}

function genFunnel() {
  return [
    { label: 'Ilova ochdillar', val: 142800, pct: 100, color: C.blue },
    { label: "Mahsulot ko'rdi", val: 98400, pct: 68.9, color: C.violet },
    { label: "Savatga qo'shdi", val: 54200, pct: 37.9, color: C.orange },
    { label: 'Buyurtma berdi', val: 38640, pct: 27.1, color: C.emerald },
    { label: "To'lov qildi", val: 34180, pct: 23.9, color: C.teal },
  ]
}

function genCohort() {
  const r = seed(77)
  const weeks = [
    '1-hafta',
    '2-hafta',
    '3-hafta',
    '4-hafta',
    '5-hafta',
    '6-hafta',
  ]
  const cols = ['W0', 'W1', 'W2', 'W3', 'W4', 'W5']
  return weeks.map((wk, i) => ({
    week: wk,
    users: Math.round(4200 * (1 - i * 0.08) * (0.85 + r() * 0.3)),
    retention: cols.map((c, j) => {
      if (j > cols.length - 1 - i) return null
      if (j === 0) return 100
      const base = [100, 42, 28, 22, 18, 15][j]
      return Math.round(base * (0.88 + r() * 0.24))
    }),
  }))
}

function genTopPartners() {
  return [
    {
      rank: 1,
      name: 'Makdonalds Toshkent',
      service: 'Food',
      revenue: 184200000,
      orders: 2840,
      rating: 4.8,
      growth: +14.2,
      city: 'Toshkent',
    },
    {
      rank: 2,
      name: 'Korzinka Market',
      service: 'Market',
      revenue: 162800000,
      orders: 3120,
      rating: 4.7,
      growth: +8.4,
      city: 'Toshkent',
    },
    {
      rank: 3,
      name: 'KFC Samarqand',
      service: 'Food',
      revenue: 128400000,
      orders: 1980,
      rating: 4.6,
      growth: +21.1,
      city: 'Samarqand',
    },
    {
      rank: 4,
      name: 'Carrefour Chilonzor',
      service: 'Market',
      revenue: 118600000,
      orders: 2240,
      rating: 4.9,
      growth: +5.7,
      city: 'Toshkent',
    },
    {
      rank: 5,
      name: 'Burger King Yunusobod',
      service: 'Food',
      revenue: 108200000,
      orders: 1760,
      rating: 4.5,
      growth: -3.2,
      city: 'Toshkent',
    },
    {
      rank: 6,
      name: 'Anhor Cargo Express',
      service: 'Cargo',
      revenue: 94800000,
      orders: 1420,
      rating: 4.7,
      growth: +32.4,
      city: 'Toshkent',
    },
    {
      rank: 7,
      name: 'Dodo Pizza',
      service: 'Food',
      revenue: 88400000,
      orders: 1640,
      rating: 4.8,
      growth: +9.6,
      city: 'Toshkent',
    },
  ]
}

// ─── FORMATTERS ───────────────────────────────────────────────────────────────
const fmtN = (n: any) => new Intl.NumberFormat('uz-UZ').format(n)
const fmtM = (n: any) =>
  n >= 1e9
    ? `${(n / 1e9).toFixed(2)} mlrd`
    : n >= 1e6
      ? `${(n / 1e6).toFixed(1)} mln`
      : n >= 1e3
        ? `${(n / 1e3).toFixed(0)} ming`
        : String(n)
const fmtPct = (v: any, prev: any) => {
  const d = prev ? ((v - prev) / prev) * 100 : 0
  return { val: Math.abs(d).toFixed(1), up: d >= 0 }
}

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Btn({
  children,
  active = false,
  onClick,
  accent = C.orange,
  small = false,
  outline = false,
}:any) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: small ? '5px 11px' : '8px 16px',
        borderRadius: 8,
        border: `1px solid ${active ? accent : C.border}`,
        background: active ? accent : outline ? C.card : C.card,
        color: active ? '#fff' : C.text,
        fontSize: small ? 10 : 12,
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: active ? `0 4px 12px ${accent}44` : 'none',
        transition: 'all .15s',
        outline: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

function Chip({ label, color, bg, small }:any) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: bg,
        color,
        fontSize: small ? 9 : 10,
        fontWeight: 700,
        padding: `${small ? 2 : 3}px ${small ? 7 : 9}px`,
        borderRadius: 99,
      }}
    >
      {label}
    </span>
  )
}

function Trend({ val, up, suffix = '%' }:any) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        color: up ? C.green : C.red,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {up ? '▲' : '▼'} {val}
      {suffix}
    </span>
  )
}

// ─── CHART PRIMITIVES ─────────────────────────────────────────────────────────
function Sparkline({ data, color, w = 80, h = 28, fill = true }:any) {
  if (!data || data.length < 2) return null
  const mn = Math.min(...data),
    mx = Math.max(...data),
    rng = mx - mn || 1
  const pts = data.map((v: number, i: number) => [
    (i / (data.length - 1)) * w,
    h - 4 - ((v - mn) / rng) * (h - 8),
  ])
  const path = pts
    .map(
      (p: [number, number], i: number) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`,
    )
    .join(' ')
  const area = `${path} L${w},${h} L0,${h} Z`
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {fill && <path d={area} fill={`url(#spk-${color.slice(1)})`} />}
      <defs>
        <linearGradient
          id={`spk-${color.slice(1)}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AreaChart({
  data,
  keys,
  colors,
  w = 600,
  h = 200,
  labels,
  activeKey,
  onHover,
}:any) {
  const [hover, setHover] = useState(null)
  const maxVal = useMemo(
    () => Math.max(...data.map((d: any) => keys.reduce((s: number, k: string) => s + d[k], 0))),
    [data, keys],
  )
  const svgRef = useRef(null)
  const padL = 48,
    padR = 16,
    padT = 12,
    padB = 32
  const cw = w - padL - padR,
    ch = h - padT - padB

  const getY = useCallback(
    (val: number) => padT + ch - (val / maxVal) * ch,
    [ch, maxVal, padT],
  )
  const getX = useCallback(
    (i: number) => padL + i * (cw / (data.length - 1)),
    [cw, data.length, padL],
  )

  // stacked area paths
  const stackedPaths = useMemo(() => {
    return keys.map((k: string, ki: number) => {
      const prevKeys = keys.slice(0, ki)
      const pts = data.map((d: any, i: number) => {
        const base = prevKeys.reduce((s: number, pk: string) => s + d[pk], 0)
        return [getX(i), getY(base + d[k]), getY(base)]
      })
      const topPath = pts
        .map(
          (p: [number, number], i: number) =>
            `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`,
        )
        .join(' ')
      const areaPath = `${topPath} L${getX(data.length - 1)},${getY(0)} L${getX(0)},${getY(0)} Z`
      return { k, topPath, areaPath }
    })
  }, [data, keys, getX, getY])

  const yTicks = 5
  const hoverX = hover !== null ? getX(hover) : null

  return (
    <div
      style={{ position: 'relative' }}
      onMouseLeave={() => {
        setHover(null)
        onHover && onHover(null)
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        onMouseMove={e => {
          const rect = svgRef.current?.getBoundingClientRect()
          if (!rect) return
          const rx = ((e.clientX - rect.left) / rect.width) * w
          const idx = Math.round(((rx - padL) / cw) * (data.length - 1))
          const clamped = Math.max(0, Math.min(data.length - 1, idx))
          setHover(clamped as any)
          onHover && onHover(clamped)
        }}
      >
        <defs>
          {keys.map((k: string, i: number) => (
            <linearGradient key={k} id={`ag-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[i]} stopOpacity=".5" />
              <stop offset="100%" stopColor={colors[i]} stopOpacity=".04" />
            </linearGradient>
          ))}
        </defs>

        {/* Y-grid */}
        {Array.from({ length: yTicks + 1 }, (_, i) => {
          const y = padT + i * (ch / yTicks)
          const val = maxVal * (1 - i / yTicks)
          return (
            <g key={i}>
              <line
                x1={padL}
                y1={y}
                x2={w - padR}
                y2={y}
                stroke={C.border}
                strokeDasharray="3 3"
                strokeWidth=".8"
              />
              <text
                x={padL - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="9"
                fill={C.muted2}
              >
                {fmtM(val)}
              </text>
            </g>
          )
        })}

        {/* X-labels */}
        {data
          .filter(
            (_: any, i: number) =>
              i % (Math.floor(data.length / 7) + 1) === 0 ||
              i === data.length - 1,
          )
          .map((d: any, _: any, arr: any) => {
            const i = data.indexOf(d)
            return (
              <text
                key={i}
                x={getX(i)}
                y={h - 8}
                textAnchor="middle"
                fontSize="9"
                fill={C.muted2}
              >
                {d.label}
              </text>
            )
          })}

        {/* Area fills */}
        {[...stackedPaths].reverse().map(({ k, areaPath }, i) => (
          <path
            key={k}
            d={areaPath}
            fill={`url(#ag-${k})`}
            opacity={activeKey && activeKey !== k ? 0.3 : 1}
            style={{ transition: 'opacity .2s' }}
          />
        ))}

        {/* Lines */}
        {stackedPaths.map(({ k, topPath }:any, i:number) => (
          <path
            key={k}
            d={topPath}
            fill="none"
            stroke={colors[i]}
            strokeWidth={activeKey === k ? 2.5 : 1.5}
            opacity={activeKey && activeKey !== k ? 0.3 : 1}
            style={{ transition: 'all .2s' }}
          />
        ))}

        {/* Hover crosshair */}
        {hover !== null && (
          <>
            <line
              x1={hoverX}
              y1={padT}
              x2={hoverX}
              y2={padT + ch}
              stroke={C.border}
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            {keys.map((k, ki) => {
              const prevKeys = keys.slice(0, ki)
              const base = prevKeys.reduce((s, pk) => s + data[hover][pk], 0)
              const cy = getY(base + data[hover][k])
              return (
                <circle
                  key={k}
                  cx={hoverX}
                  cy={cy}
                  r="4"
                  fill={colors[ki]}
                  stroke="#fff"
                  strokeWidth="2"
                />
              )
            })}
          </>
        )}
      </svg>

      {/* Tooltip */}
      {hover !== null && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            left: hover > data.length * 0.65 ? 8 : undefined,
            right: hover <= data.length * 0.65 ? 8 : undefined,
            background: C.dark,
            borderRadius: 10,
            padding: '10px 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,.25)',
            zIndex: 10,
            minWidth: 150,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: '#94A3B8',
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {data[hover]?.label}
          </div>
          {keys.map((k, i) => (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 3,
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  color: '#CBD5E1',
                  fontSize: 11,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: colors[i],
                    flexShrink: 0,
                  }}
                />
                {k}
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>
                {fmtM(data[hover][k])}
              </span>
            </div>
          ))}
          <div
            style={{
              borderTop: '1px solid #334155',
              marginTop: 6,
              paddingTop: 6,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 10, color: '#64748B' }}>Jami</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: C.orange }}>
              {fmtM(keys.reduce((s, k) => s + data[hover][k], 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function BarChart({
  data,
  valueKey = 'val',
  colorKey,
  color = C.orange,
  h = 120,
  label,
  maxVal: maxValProp,
}) {
  const [hover, setHover] = useState(null)
  const maxV = maxValProp || Math.max(...data.map(d => d[valueKey]))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: h }}>
      {data.map((d, i) => {
        const pct = (d[valueKey] / maxV) * 100
        const c = colorKey ? d[colorKey] : color
        return (
          <div
            key={i}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              height: '100%',
              justifyContent: 'flex-end',
            }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === i && (
              <div
                style={{
                  position: 'absolute',
                  background: C.dark,
                  color: '#fff',
                  fontSize: 10,
                  padding: '4px 8px',
                  borderRadius: 6,
                  whiteSpace: 'nowrap',
                  zIndex: 20,
                  marginBottom: 2,
                  pointerEvents: 'none',
                }}
              >
                {d.label}: {fmtN(d[valueKey])}
              </div>
            )}
            <div
              style={{
                width: '100%',
                height: `${pct}%`,
                minHeight: 3,
                background: hover === i ? c : c + 'CC',
                borderRadius: '3px 3px 0 0',
                transition: 'height .4s,background .15s',
                position: 'relative',
              }}
            />
            {label && (
              <span
                style={{
                  fontSize: 8,
                  color: C.muted2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: '100%',
                  textAlign: 'center',
                }}
              >
                {d.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function DonutChart({ segments, size = 120, stroke = 22, label, sublabel }) {
  const total = segments.reduce((s, g) => s + g.val, 0)
  let cum = 0
  const r = (size - stroke) / 2,
    cx = size / 2,
    cy = size / 2
  const circumference = 2 * Math.PI * r
  const [hov, setHov] = useState(null)
  return (
    <div
      style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {segments.map((seg, i) => {
          const pct = seg.val / total
          const offset = circumference * (1 - pct)
          const dashOffset = circumference * cum
          cum += pct
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={hov === i ? stroke + 3 : stroke}
              strokeDasharray={`${circumference * pct} ${circumference * (1 - pct)}`}
              strokeDashoffset={
                dashOffset === 0 ? 0 : -circumference * (1 - cum + pct)
              }
              style={{ transition: 'stroke-width .2s', cursor: 'pointer' }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              transform={`rotate(${(cum - pct) * 360 - 360} ${cx} ${cy})`}
            />
          )
        })}
        <circle cx={cx} cy={cy} r={r - stroke / 2 - 4} fill={C.card} />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {hov !== null ? (
          <>
            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                color: segments[hov].color,
                lineHeight: 1,
              }}
            >
              {((segments[hov].val / total) * 100).toFixed(1)}%
            </div>
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                marginTop: 2,
                textAlign: 'center',
                maxWidth: size * 0.55,
              }}
            >
              {segments[hov].label}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                fontSize: label?.length > 6 ? 11 : 14,
                fontWeight: 900,
                color: C.text,
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {label}
            </div>
            {sublabel && (
              <div
                style={{
                  fontSize: 9,
                  color: C.muted,
                  marginTop: 2,
                  textAlign: 'center',
                }}
              >
                {sublabel}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function HeatCell({ val, max, color }) {
  const pct = val / max
  const bg =
    pct < 0.01
      ? '#F8FAFC'
      : pct < 0.2
        ? color + '22'
        : pct < 0.5
          ? color + '55'
          : pct < 0.8
            ? color + '99'
            : color
  const tc = pct > 0.6 ? '#fff' : C.muted2
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={`${val}%`}
      style={{
        height: 18,
        borderRadius: 3,
        background: hov ? color : bg,
        transition: 'background .15s',
        cursor: 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 8,
        color: hov ? '#fff' : tc,
        fontWeight: 600,
      }}
    >
      {val > 5 ? val : ''}
    </div>
  )
}

function HeatMap({ data, color = C.orange }) {
  const days = ['Du', 'Se', 'Ch', 'Pa', 'Sh', 'Ya', 'Yak']
  const max = Math.max(...data.flat())
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i < 10 ? '0' + i : i}:00`,
  )
  return (
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '32px repeat(7,1fr)',
          gap: 2,
          minWidth: 300,
        }}
      >
        <div />
        {days.map(d => (
          <div
            key={d}
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: C.muted,
              textAlign: 'center',
              padding: '2px 0',
            }}
          >
            {d}
          </div>
        ))}
        {data.map((row, h) => (
          <>
            <div
              key={`h${h}`}
              style={{
                fontSize: 8,
                color: C.muted2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 4,
                whiteSpace: 'nowrap',
              }}
            >
              {h % 3 === 0 ? hours[h] : ''}
            </div>
            {row.map((val, d) => (
              <HeatCell key={d} val={val} max={max} color={color} />
            ))}
          </>
        ))}
      </div>
    </div>
  )
}

function FunnelChart({ steps }) {
  const max = steps[0].val
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {steps.map((s, i) => {
        const pct = (s.val / max) * 100
        const dropPct =
          i > 0
            ? (((steps[i - 1].val - s.val) / steps[i - 1].val) * 100).toFixed(1)
            : null
        return (
          <div key={i} style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 3,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                {s.label}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {dropPct && (
                  <span style={{ fontSize: 9, color: C.red, fontWeight: 600 }}>
                    −{dropPct}%
                  </span>
                )}
                <span style={{ fontSize: 11, fontWeight: 800, color: s.color }}>
                  {fmtN(s.val)}
                </span>
              </span>
            </div>
            <div
              style={{
                height: 28,
                background: C.light,
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: `linear-gradient(90deg,${s.color},${s.color}BB)`,
                  borderRadius: 6,
                  transition: 'width .5s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 8,
                }}
              >
                {pct > 15 && (
                  <span
                    style={{ fontSize: 10, fontWeight: 800, color: '#fff' }}
                  >
                    {pct.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CohortTable({ data }) {
  const heatColor = v => {
    if (v === null) return 'transparent'
    if (v === 100) return C.orange
    if (v >= 60) return C.orange + 'CC'
    if (v >= 40) return C.orange + '88'
    if (v >= 25) return C.orange + '55'
    if (v >= 15) return C.orange + '33'
    return C.orange + '1A'
  }
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: 'left',
                padding: '6px 8px',
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.4,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              Hafta
            </th>
            <th
              style={{
                textAlign: 'right',
                padding: '6px 8px',
                fontSize: 9,
                color: C.muted,
                fontWeight: 700,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              Foydalanuvchilar
            </th>
            {['W0', 'W1', 'W2', 'W3', 'W4', 'W5'].map(w => (
              <th
                key={w}
                style={{
                  textAlign: 'center',
                  padding: '6px 8px',
                  fontSize: 9,
                  color: C.muted,
                  fontWeight: 700,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td
                style={{
                  padding: '5px 8px',
                  fontSize: 10,
                  fontWeight: 600,
                  color: C.text,
                  borderBottom: `1px solid ${C.border}`,
                  whiteSpace: 'nowrap',
                }}
              >
                {row.week}
              </td>
              <td
                style={{
                  padding: '5px 8px',
                  textAlign: 'right',
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.muted,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {fmtN(row.users)}
              </td>
              {row.retention.map((v, j) => (
                <td
                  key={j}
                  style={{
                    padding: '3px',
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {v !== null ? (
                    <div
                      style={{
                        background: heatColor(v),
                        color: v >= 40 ? '#fff' : v >= 20 ? C.orangeD : C.muted,
                        borderRadius: 5,
                        padding: '4px 2px',
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        border: `1px solid ${v === 100 ? C.orange : v >= 40 ? C.orange + '44' : 'transparent'}`,
                      }}
                    >
                      {v}%
                    </div>
                  ) : (
                    <div style={{ height: 28 }} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MilliyGoAnalyticsPage() {
  const [range, setRange] = useState('30 kun')
  const [svcTab, setSvcTab] = useState('Barcha')
  const [activeKey, setActiveKey] = useState(null)
  const [chartHover, setChartHover] = useState(null)
  const [metricView, setMetricView] = useState('revenue')

  const revData = useMemo(
    () => genRevenue(range === '7 kun' ? 7 : range === 'Bugun' ? 1 : 30),
    [range],
  )
  const hourData = useMemo(() => genHourly(), [])
  const cities = useMemo(() => genCities(), [])
  const funnel = useMemo(() => genFunnel(), [])
  const cohort = useMemo(() => genCohort(), [])
  const partners = useMemo(() => genTopPartners(), [])

  // aggregated KPIs
  const totalRev = useMemo(
    () => revData.reduce((s, d) => s + d.Food + d.Market + d.Taxi + d.Cargo, 0),
    [revData],
  )
  const prevRev = totalRev * 0.881
  const totalOrd = Math.round(totalRev / 75000)
  const totalUsr = 142800
  const avgOrder = Math.round(totalRev / totalOrd)
  const commission = Math.round(totalRev * 0.12)

  // service totals
  const svcTotals = useMemo(() => {
    return Object.keys(SVC).map(k => ({
      k,
      total: revData.reduce((s, d) => s + d[k], 0),
      orders: Math.round(revData.reduce((s, d) => s + d[k], 0) / 75000),
    }))
  }, [revData])

  // payment methods
  const payments = [
    { label: 'Click', val: 38, color: '#1DA1F2' },
    { label: 'Payme', val: 28, color: C.orange },
    { label: 'Uzum Pay', val: 14, color: C.violet },
    { label: 'Karta', val: 12, color: C.sky },
    { label: 'Naqd', val: 5, color: C.emerald },
    { label: 'Boshqa', val: 3, color: C.muted2 },
  ]

  // platform
  const platforms = [
    { label: 'Android', val: 58, color: C.emerald, icon: '🤖' },
    { label: 'iOS', val: 34, color: C.text, icon: '🍎' },
    { label: 'Web', val: 8, color: C.blue, icon: '🌐' },
  ]

  // hourly orders bar
  const hourlyTotals = hourData.map((row, h) => ({
    label: `${h}:00`,
    val: row.reduce((s, v) => s + v, 0),
    color: h >= 11 && h <= 20 ? C.orange : C.muted2 + '66',
  }))

  const svcKeys = Object.keys(SVC)
  const svcColors = svcKeys.map(k => SVC[k].color)

  // current day metrics from chart hover
  const hoverData =
    chartHover !== null && revData[chartHover] ? revData[chartHover] : null

  return (
    <div
      style={{
        background: C.bg,
        minHeight: '100vh',
        fontFamily: "'Outfit','Inter',sans-serif",
        paddingBottom: 40,
      }}
    >
      <style>{`
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px;}
        button:hover{opacity:.88;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes countUp{from{opacity:0}to{opacity:1}}
        .card{background:#fff;border-radius:14px;border:1px solid #E2E8F0;box-shadow:0 1px 4px rgba(0,0,0,.04);}
        .section-title{font-size:13px;font-weight:800;color:#0F172A;margin-bottom:0;}
        .section-sub{font-size:11px;color:#64748B;margin-top:2px;}
      `}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* ═══ HEADER ═══════════════════════════════════════════════════════ */}
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
                background: '#FFF7ED',
                border: `1px solid ${C.orange}44`,
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 10,
                fontWeight: 700,
                color: C.orangeD,
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
                lineHeight: 1.2,
              }}
            >
              Analitika va Hisobotlar
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Platforma ko'rsatkichlari · Real vaqt monitoring · Biznes
              razvedkasi
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Date range */}
            <div
              style={{
                display: 'flex',
                gap: 4,
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: 4,
              }}
            >
              {RANGES.slice(0, 6).map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: 7,
                    border: 'none',
                    background: range === r ? C.orange : 'transparent',
                    color: range === r ? '#fff' : C.muted,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r}
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
                padding: '8px 14px',
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
                gap: 6,
                background: C.orange,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '8px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 4px 12px ${C.orange}44`,
              }}
            >
              📊 Hisobot
            </button>
          </div>
        </div>

        {/* ═══ KPI STRIP ════════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 10,
            marginBottom: 16,
          }}
        >
          {[
            {
              label: 'Jami daromad',
              val: fmtM(totalRev),
              sub: 'UZS',
              color: C.orange,
              icon: '💰',
              trend: { val: '13.5', up: true },
              spark: [
                40,
                55,
                48,
                72,
                65,
                88,
                76,
                95,
                82,
                110,
                98,
                (totalRev / 1e9) * 12,
              ],
            },
            {
              label: 'Buyurtmalar',
              val: fmtN(totalOrd),
              sub: 'ta buyurtma',
              color: C.blue,
              icon: '📦',
              trend: { val: '9.2', up: true },
              spark: [
                30,
                45,
                38,
                56,
                52,
                68,
                60,
                78,
                70,
                88,
                80,
                totalOrd / 100,
              ],
            },
            {
              label: 'Faol foydalanuvchi',
              val: fmtM(totalUsr),
              sub: 'oyda',
              color: C.violet,
              icon: '👥',
              trend: { val: '4.8', up: true },
              spark: [80, 88, 84, 92, 90, 98, 95, 102, 99, 108, 104, 115],
            },
            {
              label: "O'rtacha buyurtma",
              val: fmtM(avgOrder),
              sub: 'UZS',
              color: C.emerald,
              icon: '🛒',
              trend: { val: '2.1', up: false },
              spark: [
                68,
                72,
                70,
                75,
                73,
                76,
                74,
                78,
                75,
                80,
                77,
                avgOrder / 1000,
              ],
            },
            {
              label: 'Platforma ulushi',
              val: fmtM(commission),
              sub: 'UZS (12%)',
              color: C.teal,
              icon: '🏦',
              trend: { val: '13.5', up: true },
              spark: [
                35,
                48,
                42,
                60,
                54,
                72,
                66,
                82,
                74,
                90,
                82,
                commission / 1e8,
              ],
            },
          ].map(({ label, val, sub, color, icon, trend, spark }, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '15px 16px',
                animation: `fadeIn .3s ease ${i * 0.06}s both`,
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
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: color + '15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <Sparkline data={spark} color={color} w={70} h={28} />
              </div>
              <div
                style={{
                  fontSize: 22,
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
                  fontSize: 10,
                  color: C.muted,
                  marginTop: 2,
                  marginBottom: 6,
                }}
              >
                {label} <span style={{ color: C.muted2 }}>· {sub}</span>
              </div>
              <Trend val={trend.val} up={trend.up} />
            </div>
          ))}
        </div>

        {/* ═══ SERVICE TABS ═════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginBottom: 14,
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => {
              setSvcTab('Barcha')
              setActiveKey(null)
            }}
            style={{
              padding: '7px 16px',
              borderRadius: 9,
              border: `1px solid ${svcTab === 'Barcha' ? C.orange : C.border}`,
              background: svcTab === 'Barcha' ? C.orange : C.card,
              color: svcTab === 'Barcha' ? '#fff' : C.muted,
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all .15s',
            }}
          >
            🏢 Barcha xizmatlar
          </button>
          {svcTotals.map(({ k, total, orders }) => {
            const s = SVC[k]
            const active = svcTab === k
            return (
              <button
                key={k}
                onClick={() => {
                  setSvcTab(k)
                  setActiveKey(active ? null : k)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 16px',
                  borderRadius: 9,
                  border: `1px solid ${active ? s.color : C.border}`,
                  background: active ? s.color : C.card,
                  color: active ? '#fff' : C.text,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <span>{s.label}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    background: active
                      ? 'rgba(255,255,255,.25)'
                      : s.color + '15',
                    color: active ? '#fff' : s.color,
                    padding: '2px 8px',
                    borderRadius: 99,
                  }}
                >
                  {fmtM(total)}
                </span>
              </button>
            )
          })}
        </div>

        {/* ═══ MAIN CHART ROW ═══════════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* Revenue Area Chart */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 16,
              }}
            >
              <div>
                <div className="section-title">
                  {hoverData
                    ? `${hoverData.label} — ${fmtM(Object.keys(SVC).reduce((s, k) => s + hoverData[k], 0))} UZS`
                    : `Daromad dinamikasi`}
                </div>
                <div className="section-sub">
                  {range} · xizmatlar bo'yicha to'plangan
                </div>
              </div>
              <div style={{ display: 'flex', gap: 5 }}>
                {[
                  ['revenue', '💰 Daromad'],
                  ['orders', '📦 Buyurtma'],
                ].map(([v, l]) => (
                  <Btn
                    key={v}
                    small
                    active={metricView === v}
                    onClick={() => setMetricView(v)}
                    accent={C.orange}
                  >
                    {l}
                  </Btn>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              {svcKeys.map((k, i) => (
                <button
                  key={k}
                  onClick={() => setActiveKey(activeKey === k ? null : k)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    opacity: activeKey && activeKey !== k ? 0.4 : 1,
                    transition: 'opacity .2s',
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 3,
                      borderRadius: 99,
                      background: svcColors[i],
                      display: 'block',
                    }}
                  />
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: C.text }}
                  >
                    {SVC[k].icon} {k}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: SVC[k].color,
                      fontWeight: 800,
                    }}
                  >
                    {fmtM(svcTotals[i].total)}
                  </span>
                </button>
              ))}
            </div>

            <AreaChart
              data={revData}
              keys={svcKeys}
              colors={svcColors}
              w={680}
              h={200}
              activeKey={activeKey}
              onHover={setChartHover}
            />
          </div>

          {/* Donut + stats */}
          <div
            className="card"
            style={{
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div>
              <div className="section-title">Xizmat ulushi</div>
              <div className="section-sub">Daromad bo'yicha</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DonutChart
                segments={svcTotals.map(({ k, total }) => ({
                  label: SVC[k].label,
                  val: total,
                  color: SVC[k].color,
                }))}
                size={130}
                stroke={24}
                label={fmtM(totalRev)}
                sublabel="jami UZS"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {svcTotals.map(({ k, total, orders }, i) => {
                const pct = ((total / totalRev) * 100).toFixed(1)
                return (
                  <div
                    key={k}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span style={{ fontSize: 15, flexShrink: 0 }}>
                      {SVC[k].icon}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 3,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.text,
                          }}
                        >
                          {k}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: SVC[k].color,
                          }}
                        >
                          {pct}%
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
                            width: `${pct}%`,
                            background: SVC[k].color,
                            borderRadius: 99,
                            transition: 'width .5s',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ═══ MIDDLE ROW: Hourly + Funnel + Payments ═══════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 0.9fr',
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* Hourly heatmap */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 14,
              }}
            >
              <div>
                <div className="section-title">Soatlik faollik xaritasi</div>
                <div className="section-sub">
                  7 kun × 24 soat · buyurtmalar %
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 1 }}>
                  {[0.05, 0.2, 0.4, 0.7, 1].map((v, i) => (
                    <div
                      key={i}
                      style={{
                        width: 14,
                        height: 8,
                        borderRadius: 2,
                        background: `${C.orange}${Math.round(v * 255)
                          .toString(16)
                          .padStart(2, '0')}`,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 9, color: C.muted }}>
                  past → yuqori
                </span>
              </div>
            </div>
            <HeatMap data={hourData} color={C.orange} />

            {/* Peak hours summary */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 6,
                marginTop: 14,
                paddingTop: 14,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              {[
                { label: 'Eng band soat', val: '12:00–14:00', color: C.orange },
                { label: 'Top kun', val: 'Shanba', color: C.violet },
                { label: 'Eng past soat', val: '03:00–05:00', color: C.muted },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  style={{
                    textAlign: 'center',
                    background: C.light,
                    borderRadius: 8,
                    padding: '8px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: C.muted,
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div style={{ marginBottom: 14 }}>
              <div className="section-title">Konversiya funnel</div>
              <div className="section-sub">
                Foydalanuvchi yo'li · bugungi kun
              </div>
            </div>
            <FunnelChart steps={funnel} />
            <div
              style={{
                marginTop: 14,
                paddingTop: 14,
                borderTop: `1px solid ${C.border}`,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              {[
                {
                  label: 'Umumiy konversiya',
                  val: `${((funnel[4].val / funnel[0].val) * 100).toFixed(1)}%`,
                  color: C.emerald,
                },
                {
                  label: "Savatdan to'lov",
                  val: `${((funnel[4].val / funnel[2].val) * 100).toFixed(1)}%`,
                  color: C.blue,
                },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  style={{
                    background: color + '0F',
                    borderRadius: 9,
                    padding: '10px 12px',
                    border: `1px solid ${color}22`,
                  }}
                >
                  <div style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}>
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color,
                      marginTop: 3,
                    }}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment methods */}
          <div className="card" style={{ padding: '18px 16px' }}>
            <div style={{ marginBottom: 14 }}>
              <div className="section-title">To'lov usullari</div>
              <div className="section-sub">Buyurtmalar soni bo'yicha</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 14,
              }}
            >
              <DonutChart
                segments={payments.map(p => ({
                  label: p.label,
                  val: p.val,
                  color: p.color,
                }))}
                size={110}
                stroke={20}
                label="To'lov"
                sublabel="usullari"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {payments.map(p => (
                <div
                  key={p.label}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: p.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: 11,
                      fontWeight: 600,
                      color: C.text,
                    }}
                  >
                    {p.label}
                  </span>
                  <div
                    style={{
                      width: 50,
                      height: 4,
                      background: C.light,
                      borderRadius: 99,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${p.val}%`,
                        background: p.color,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: p.color,
                      minWidth: 30,
                      textAlign: 'right',
                    }}
                  >
                    {p.val}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ GEOGRAPHY ROW ════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* City bubble map (SVG) */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 14,
              }}
            >
              <div>
                <div className="section-title">Geografik taqsimot</div>
                <div className="section-sub">Shaharlar bo'yicha daromad</div>
              </div>
              <Chip label="O'zbekiston" color={C.orange} bg={C.orangeL} />
            </div>
            {/* SVG map placeholder with city bubbles */}
            <div
              style={{
                position: 'relative',
                background: `linear-gradient(135deg,#EFF6FF,#F0FDF4)`,
                borderRadius: 12,
                height: 200,
                overflow: 'hidden',
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Grid lines */}
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
                {Array.from({ length: 10 }, (_, i) => (
                  <g key={i}>
                    <line
                      x1={i * 10}
                      y1={0}
                      x2={i * 10}
                      y2={100}
                      stroke="#E2E8F0"
                      strokeWidth=".3"
                    />
                    <line
                      x1={0}
                      y1={i * 10}
                      x2={100}
                      y2={i * 10}
                      stroke="#E2E8F0"
                      strokeWidth=".3"
                    />
                  </g>
                ))}
                {/* O'zbekiston outline (simplified) */}
                <path
                  d="M15 45 Q20 30 30 25 Q45 20 60 22 Q75 24 85 30 Q90 38 88 50 Q85 60 78 65 Q70 72 60 75 Q50 78 40 74 Q30 70 22 62 Q14 55 15 45Z"
                  fill="#DBEAFE"
                  stroke="#93C5FD"
                  strokeWidth=".8"
                  opacity=".5"
                />
              </svg>
              {/* City bubbles */}
              {cities.map((c, i) => {
                const maxR = cities[0].revenue
                const r = 8 + Math.sqrt(c.revenue / maxR) * 22
                return (
                  <div
                    key={c.name}
                    title={`${c.name}: ${fmtM(c.revenue)}`}
                    style={{
                      position: 'absolute',
                      left: `${c.x}%`,
                      top: `${c.y}%`,
                      transform: 'translate(-50%,-50%)',
                      width: r,
                      height: r,
                      borderRadius: '50%',
                      background: c.growth < 0 ? C.red + 'CC' : C.orange + 'CC',
                      border: `2px solid ${c.growth < 0 ? C.red : C.orange}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: i === 0 ? 10 : 5,
                      boxShadow: `0 2px 8px ${c.growth < 0 ? C.red : C.orange}44`,
                      transition: 'transform .2s',
                    }}
                  >
                    {r > 20 && (
                      <span
                        style={{
                          fontSize: Math.max(7, r * 0.22),
                          fontWeight: 800,
                          color: '#fff',
                          textAlign: 'center',
                          lineHeight: 1,
                          userSelect: 'none',
                        }}
                      >
                        {c.name.slice(0, 3)}
                      </span>
                    )}
                  </div>
                )
              })}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  display: 'flex',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'rgba(255,255,255,.9)',
                    borderRadius: 6,
                    padding: '3px 8px',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: C.orange,
                    }}
                  />
                  <span
                    style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}
                  >
                    O'sish
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    background: 'rgba(255,255,255,.9)',
                    borderRadius: 6,
                    padding: '3px 8px',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: C.red,
                    }}
                  />
                  <span
                    style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}
                  >
                    Pasayish
                  </span>
                </div>
              </div>
            </div>

            {/* City table */}
            <div style={{ marginTop: 12 }}>
              {cities.slice(0, 5).map((c, i) => {
                const maxR = cities[0].revenue
                const pct = (c.revenue / maxR) * 100
                return (
                  <div
                    key={c.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 7,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: C.muted2,
                        minWidth: 16,
                        textAlign: 'right',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.text,
                        flex: 1,
                      }}
                    >
                      {c.name}
                    </span>
                    <div
                      style={{
                        width: 80,
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
                          background: c.growth < 0 ? C.red : C.orange,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: C.text,
                        minWidth: 60,
                        textAlign: 'right',
                      }}
                    >
                      {fmtM(c.revenue)}
                    </span>
                    <Trend
                      val={Math.abs(c.growth).toFixed(1)}
                      up={c.growth > 0}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* City detail table */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div style={{ marginBottom: 14 }}>
              <div className="section-title">Shaharlar to'liq statistikasi</div>
              <div className="section-sub">
                Buyurtma, foydalanuvchi, daromad
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {[
                      'Shahar',
                      'Buyurtma',
                      'Foydalanuvchi',
                      'Daromad',
                      "O'sish",
                    ].map(h => (
                      <th
                        key={h}
                        style={{
                          textAlign: h === 'Shahar' ? 'left' : 'right',
                          padding: '8px 10px',
                          fontSize: 9,
                          color: C.muted,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: 0.4,
                          borderBottom: `2px solid ${C.border}`,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cities.map((c, i) => (
                    <tr
                      key={c.name}
                      style={{ borderBottom: `1px solid ${C.border}` }}
                    >
                      <td
                        style={{
                          padding: '10px 10px',
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.text,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 7,
                          }}
                        >
                          <span
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background:
                                c.growth < 0 ? C.red + '15' : C.orange + '15',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                            }}
                          >
                            {i === 0
                              ? '🥇'
                              : i === 1
                                ? '🥈'
                                : i === 2
                                  ? '🥉'
                                  : '📍'}
                          </span>
                          {c.name}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: '10px 10px',
                          textAlign: 'right',
                          fontSize: 11,
                          fontWeight: 700,
                          color: C.blue,
                        }}
                      >
                        {fmtN(c.orders)}
                      </td>
                      <td
                        style={{
                          padding: '10px 10px',
                          textAlign: 'right',
                          fontSize: 11,
                          fontWeight: 700,
                          color: C.violet,
                        }}
                      >
                        {fmtN(c.users)}
                      </td>
                      <td
                        style={{
                          padding: '10px 10px',
                          textAlign: 'right',
                          fontSize: 12,
                          fontWeight: 800,
                          color: C.orange,
                        }}
                      >
                        {fmtM(c.revenue)}
                      </td>
                      <td style={{ padding: '10px 10px', textAlign: 'right' }}>
                        <Trend
                          val={Math.abs(c.growth).toFixed(1)}
                          up={c.growth > 0}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM ROW: Cohort + Partners + Platform ═════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* Retention Cohort */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 14,
              }}
            >
              <div>
                <div className="section-title">
                  Foydalanuvchi ushlab qolish (Retention)
                </div>
                <div className="section-sub">Haftalik kohort tahlili</div>
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0.08, 0.2, 0.4, 0.65, 1].map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: 16,
                      height: 12,
                      borderRadius: 3,
                      background: `${C.orange}${Math.round(v * 255)
                        .toString(16)
                        .padStart(2, '0')}`,
                    }}
                  />
                ))}
                <span style={{ fontSize: 9, color: C.muted, marginLeft: 2 }}>
                  %
                </span>
              </div>
            </div>
            <CohortTable data={cohort} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 8,
                marginTop: 14,
                paddingTop: 14,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              {[
                {
                  label: '1-hafta retention',
                  val: '42%',
                  color: C.orange,
                  icon: '📌',
                },
                {
                  label: "O'rtacha 4-hafta",
                  val: '18%',
                  color: C.violet,
                  icon: '📈',
                },
                { label: 'Churn rate', val: '58%', color: C.red, icon: '📉' },
              ].map(({ label, val, color, icon }) => (
                <div
                  key={label}
                  style={{
                    background: color + '0F',
                    borderRadius: 9,
                    padding: '10px 12px',
                    border: `1px solid ${color}22`,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 16 }}>{icon}</div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color,
                      marginTop: 4,
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
          </div>

          {/* Right column: Top Partners + Platform */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Platform split */}
            <div className="card" style={{ padding: '16px 18px' }}>
              <div style={{ marginBottom: 12 }}>
                <div className="section-title">Platforma bo'yicha</div>
                <div className="section-sub">Foydalanuvchi taqsimoti</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <DonutChart
                  segments={platforms.map(p => ({
                    label: p.label,
                    val: p.val,
                    color: p.color,
                  }))}
                  size={90}
                  stroke={18}
                  label="Platforma"
                />
                <div style={{ flex: 1 }}>
                  {platforms.map(p => (
                    <div
                      key={p.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{p.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 3,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: C.text,
                            }}
                          >
                            {p.label}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 900,
                              color: p.color,
                            }}
                          >
                            {p.val}%
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
                              width: `${p.val}%`,
                              background: p.color,
                              borderRadius: 99,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hourly bar */}
            <div className="card" style={{ padding: '16px 18px', flex: 1 }}>
              <div style={{ marginBottom: 12 }}>
                <div className="section-title">Buyurtmalar soat bo'yicha</div>
                <div className="section-sub">O'rtacha kunlik taqsimot</div>
              </div>
              <div style={{ position: 'relative' }}>
                <BarChart
                  data={hourlyTotals.filter((_, i) => i % 2 === 0)}
                  valueKey="val"
                  colorKey="color"
                  h={80}
                  label
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
              >
                <span style={{ fontSize: 9, color: C.muted }}>00:00</span>
                <span style={{ fontSize: 9, color: C.orange, fontWeight: 700 }}>
                  Peak: 12–14
                </span>
                <span style={{ fontSize: 9, color: C.muted }}>22:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TOP PARTNERS TABLE ═══════════════════════════════════════════ */}
        <div
          className="card"
          style={{ padding: '18px 20px', marginBottom: 12 }}
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
              <div className="section-title">Top hamkorlar</div>
              <div className="section-sub">Daromad bo'yicha — {range}</div>
            </div>
            <button
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: C.card,
                fontSize: 11,
                fontWeight: 700,
                color: C.muted,
                cursor: 'pointer',
              }}
            >
              Barchasini ko'rish →
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 2fr 100px 110px 100px 100px 90px 80px',
              gap: 0,
            }}
          >
            {[
              '#',
              'Hamkor',
              'Xizmat',
              'Daromad',
              'Buyurtma',
              'Reyting',
              "O'sish",
              'Shahar',
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 10px',
                  fontSize: 9,
                  fontWeight: 700,
                  color: C.muted,
                  textTransform: 'uppercase',
                  letterSpacing: 0.4,
                  borderBottom: `2px solid ${C.border}`,
                  background: '#FAFAFA',
                  borderRadius:
                    i === 0 ? '8px 0 0 0' : i === 7 ? '0 8px 0 0' : 'none',
                }}
              >
                {h}
              </div>
            ))}
            {partners.map((p, i) => {
              const svc = SVC[p.service] || SVC.Food
              return (
                <div key={p.rank} style={{ display: 'contents' }}>
                  <div
                    style={{
                      padding: '11px 10px',
                      fontSize: 12,
                      fontWeight: 900,
                      color: i < 3 ? C.orange : C.muted,
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : p.rank}
                  </div>
                  <div
                    style={{
                      padding: '11px 10px',
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.text,
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      padding: '11px 8px',
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        background: svc.light,
                        color: svc.color,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {svc.icon} {p.service}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: '11px 10px',
                      fontSize: 12,
                      fontWeight: 800,
                      color: C.orange,
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {fmtM(p.revenue)}
                  </div>
                  <div
                    style={{
                      padding: '11px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.blue,
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {fmtN(p.orders)}
                  </div>
                  <div
                    style={{
                      padding: '11px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.amber,
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    ★ {p.rating}
                  </div>
                  <div
                    style={{
                      padding: '11px 10px',
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Trend
                      val={Math.abs(p.growth).toFixed(1)}
                      up={p.growth > 0}
                    />
                  </div>
                  <div
                    style={{
                      padding: '11px 10px',
                      fontSize: 11,
                      color: C.muted,
                      borderBottom: `1px solid ${C.border}`,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {p.city}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ═══ SUMMARY METRICS ROW ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 12,
          }}
        >
          {[
            {
              title: 'Yetkazish vaqti',
              icon: '⏱',
              items: [
                { label: "O'rtacha vaqt", val: '28 daq', color: C.orange },
                { label: 'Minimal', val: '12 daq', color: C.green },
                { label: 'Maksimal', val: '67 daq', color: C.red },
                { label: 'SLA (≤45 daq)', val: '94.2%', color: C.blue },
              ],
            },
            {
              title: 'Foydalanuvchi aktivligi',
              icon: '👤',
              items: [
                { label: 'Yangi (bu oy)', val: '12 840', color: C.emerald },
                { label: 'Faol (haftalik)', val: '48 200', color: C.blue },
                { label: 'Qaytgan', val: '68%', color: C.violet },
                { label: 'Churn', val: '4.2%', color: C.red },
              ],
            },
            {
              title: 'Buyurtma sifati',
              icon: '⭐',
              items: [
                { label: "O'rtacha reyting", val: '4.72', color: C.amber },
                { label: '5★ ulushi', val: '62%', color: C.green },
                { label: 'Shikoyat darajasi', val: '1.8%', color: C.red },
                { label: 'Qayta buyurtma', val: '41%', color: C.orange },
              ],
            },
            {
              title: "Texnik ko'rsatkichlar",
              icon: '🔧',
              items: [
                { label: 'App uptime', val: '99.94%', color: C.emerald },
                { label: 'API latency', val: '142ms', color: C.blue },
                { label: 'Xato darajasi', val: '0.12%', color: C.red },
                { label: 'Crash-free', val: '99.8%', color: C.green },
              ],
            },
          ].map(({ title, icon, items }) => (
            <div key={title} className="card" style={{ padding: '16px 18px' }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: C.text,
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                <span style={{ fontSize: 18 }}>{icon}</span>
                {title}
              </div>
              {items.map(({ label, val, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 10,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 800, color }}>
                    {val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
