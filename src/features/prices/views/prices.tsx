import { useState, useMemo, useRef, useEffect } from 'react'

const C = {
  orange: '#F97316',
  emerald: '#059669',
  slate: '#0F172A',
  blue: '#2563EB',
  red: '#DC2626',
  amber: '#D97706',
  violet: '#7C3AED',
  sky: '#0284C7',
  teal: '#0D9488',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  light: '#F1F5F9',
  green: '#16A34A',
  indigo: '#4F46E5',
}

const SERVICE_META = {
  Food: {
    icon: '🍔',
    color: C.orange,
    bg: '#FFF7ED',
    border: '#FED7AA',
    label: 'Food Delivery',
  },
  Market: {
    icon: '🛒',
    color: C.emerald,
    bg: '#F0FDF4',
    border: '#BBF7D0',
    label: 'Market',
  },
  Taxi: {
    icon: '🚖',
    color: C.violet,
    bg: '#F5F3FF',
    border: '#DDD6FE',
    label: 'Taxi',
  },
  Cargo: {
    icon: '📦',
    color: C.sky,
    bg: '#F0F9FF',
    border: '#BAE6FD',
    label: 'Cargo / Courier',
  },
}

const ZONES = [
  'Barcha zonalar',
  'Chilonzor',
  'Yunusobod',
  'Mirzo Ulugbek',
  'Olmazor',
  'Yakkasaroy',
  'Sergeli',
  'Shayhontohur',
  'Bektemir',
  'Uchtepa',
  'City Center',
  'Airport Zone',
]

const STATUS_CFG = {
  Active: { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E' },
  Draft: { bg: '#F8FAFC', color: '#64748B', dot: '#94A3B8' },
  Pending: { bg: '#FFFBEB', color: '#D97706', dot: '#F59E0B' },
  Archived: { bg: '#FEF2F2', color: '#B91C1C', dot: '#EF4444' },
}

const MOCK_RULES = [
  // FOOD
  {
    id: 'PR-F001',
    service: 'Food',
    name: 'Asosiy tariflar',
    zone: 'City Center',
    baseFare: 5000,
    perKm: 1500,
    minOrder: 15000,
    surge: 1.0,
    peakSurge: 1.5,
    freeDeliveryFrom: 50000,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-28',
  },
  {
    id: 'PR-F002',
    service: 'Food',
    name: 'Kecha tarifi',
    zone: 'City Center',
    baseFare: 6000,
    perKm: 2000,
    minOrder: 15000,
    surge: 1.3,
    peakSurge: 1.8,
    freeDeliveryFrom: 60000,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-27',
  },
  {
    id: 'PR-F003',
    service: 'Food',
    name: 'Chekka hudud',
    zone: 'Sergeli',
    baseFare: 7000,
    perKm: 2000,
    minOrder: 20000,
    surge: 1.0,
    peakSurge: 1.6,
    freeDeliveryFrom: 70000,
    status: 'Active',
    updatedBy: 'Ops',
    updatedAt: '2025-10-25',
  },
  {
    id: 'PR-F004',
    service: 'Food',
    name: 'Yangi tarif testi',
    zone: 'Yunusobod',
    baseFare: 4500,
    perKm: 1200,
    minOrder: 12000,
    surge: 1.0,
    peakSurge: 1.4,
    freeDeliveryFrom: 45000,
    status: 'Draft',
    updatedBy: 'Admin',
    updatedAt: '2025-10-30',
  },
  {
    id: 'PR-F005',
    service: 'Food',
    name: 'Aeroport zonasi',
    zone: 'Airport Zone',
    baseFare: 9000,
    perKm: 2500,
    minOrder: 25000,
    surge: 1.2,
    peakSurge: 2.0,
    freeDeliveryFrom: 90000,
    status: 'Pending',
    updatedBy: 'Ops',
    updatedAt: '2025-10-29',
  },
  // MARKET
  {
    id: 'PR-M001',
    service: 'Market',
    name: 'Standart',
    zone: 'City Center',
    baseFare: 8000,
    perKm: 1800,
    minOrder: 30000,
    surge: 1.0,
    peakSurge: 1.3,
    freeDeliveryFrom: 100000,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-26',
  },
  {
    id: 'PR-M002',
    service: 'Market',
    name: 'Express',
    zone: 'City Center',
    baseFare: 12000,
    perKm: 2500,
    minOrder: 50000,
    surge: 1.2,
    peakSurge: 1.6,
    freeDeliveryFrom: 150000,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-24',
  },
  {
    id: 'PR-M003',
    service: 'Market',
    name: 'Uzoq hudud',
    zone: 'Bektemir',
    baseFare: 10000,
    perKm: 2200,
    minOrder: 40000,
    surge: 1.0,
    peakSurge: 1.4,
    freeDeliveryFrom: 120000,
    status: 'Active',
    updatedBy: 'Ops',
    updatedAt: '2025-10-22',
  },
  {
    id: 'PR-M004',
    service: 'Market',
    name: 'Arxivlangan',
    zone: 'Olmazor',
    baseFare: 7000,
    perKm: 1600,
    minOrder: 25000,
    surge: 1.0,
    peakSurge: 1.2,
    freeDeliveryFrom: 80000,
    status: 'Archived',
    updatedBy: 'Admin',
    updatedAt: '2025-09-15',
  },
  // TAXI
  {
    id: 'PR-T001',
    service: 'Taxi',
    name: 'Economy',
    zone: 'Barcha zonalar',
    baseFare: 6000,
    perKm: 1200,
    minOrder: 8000,
    surge: 1.0,
    peakSurge: 2.0,
    freeDeliveryFrom: 0,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-28',
  },
  {
    id: 'PR-T002',
    service: 'Taxi',
    name: 'Comfort',
    zone: 'Barcha zonalar',
    baseFare: 10000,
    perKm: 2000,
    minOrder: 12000,
    surge: 1.0,
    peakSurge: 1.8,
    freeDeliveryFrom: 0,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-20',
  },
  {
    id: 'PR-T003',
    service: 'Taxi',
    name: 'Business',
    zone: 'Barcha zonalar',
    baseFare: 18000,
    perKm: 3500,
    minOrder: 25000,
    surge: 1.0,
    peakSurge: 1.5,
    freeDeliveryFrom: 0,
    status: 'Active',
    updatedBy: 'Ops',
    updatedAt: '2025-10-18',
  },
  {
    id: 'PR-T004',
    service: 'Taxi',
    name: 'Aeroport Express',
    zone: 'Airport Zone',
    baseFare: 25000,
    perKm: 3000,
    minOrder: 30000,
    surge: 1.0,
    peakSurge: 1.3,
    freeDeliveryFrom: 0,
    status: 'Pending',
    updatedBy: 'Admin',
    updatedAt: '2025-10-30',
  },
  // CARGO
  {
    id: 'PR-C001',
    service: 'Cargo',
    name: 'Mini (0–5 kg)',
    zone: 'City Center',
    baseFare: 15000,
    perKm: 2000,
    minOrder: 15000,
    surge: 1.0,
    peakSurge: 1.4,
    freeDeliveryFrom: 0,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-27',
  },
  {
    id: 'PR-C002',
    service: 'Cargo',
    name: 'Standart (5–20)',
    zone: 'City Center',
    baseFare: 25000,
    perKm: 3000,
    minOrder: 25000,
    surge: 1.0,
    peakSurge: 1.5,
    freeDeliveryFrom: 0,
    status: 'Active',
    updatedBy: 'Admin',
    updatedAt: '2025-10-25',
  },
  {
    id: 'PR-C003',
    service: 'Cargo',
    name: 'Yuk (20–100 kg)',
    zone: 'Barcha zonalar',
    baseFare: 60000,
    perKm: 5000,
    minOrder: 60000,
    surge: 1.0,
    peakSurge: 1.3,
    freeDeliveryFrom: 0,
    status: 'Active',
    updatedBy: 'Ops',
    updatedAt: '2025-10-20',
  },
  {
    id: 'PR-C004',
    service: 'Cargo',
    name: 'Shahar tashqari',
    zone: 'Airport Zone',
    baseFare: 80000,
    perKm: 4500,
    minOrder: 80000,
    surge: 1.0,
    peakSurge: 1.2,
    freeDeliveryFrom: 0,
    status: 'Draft',
    updatedBy: 'Admin',
    updatedAt: '2025-10-30',
  },
]

const fmt = n => new Intl.NumberFormat('uz-UZ').format(n)

// ── Select ────────────────────────────────────────────────────────────────────
function Select({ label, value, onChange, options, accent = C.orange }) {
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
          minWidth: 140,
          justifyContent: 'space-between',
          outline: 'none',
          boxShadow: open ? `0 0 0 3px ${accent}20` : 'none',
          transition: 'all .15s',
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
            zIndex: 300,
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            boxShadow: '0 8px 28px rgba(0,0,0,.13)',
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

// ── StatusBadge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = STATUS_CFG[status] || STATUS_CFG.Draft
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
      {status}
    </span>
  )
}

// ── NumberInput ───────────────────────────────────────────────────────────────
function NumberInput({ label, value, onChange, suffix, accent = C.orange }) {
  return (
    <div>
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
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          overflow: 'hidden',
          background: C.card,
        }}
      >
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            flex: 1,
            padding: '7px 10px',
            fontSize: 12,
            fontWeight: 700,
            color: C.text,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'inherit',
            width: 0,
          }}
        />
        {suffix && (
          <span
            style={{
              padding: '0 10px',
              fontSize: 10,
              fontWeight: 600,
              color: C.muted,
              borderLeft: `1px solid ${C.border}`,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              background: C.light,
              whiteSpace: 'nowrap',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange, accent = C.orange }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 40,
        height: 22,
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
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: 3,
          left: value ? 21 : 3,
          transition: 'left .2s',
          boxShadow: '0 1px 4px rgba(0,0,0,.2)',
        }}
      />
    </div>
  )
}

// ── SurgeSlider ───────────────────────────────────────────────────────────────
function SurgeSlider({ value, onChange, accent }) {
  const pct = ((value - 1) / (3 - 1)) * 100
  const color = value >= 2 ? C.red : value >= 1.5 ? C.amber : C.emerald
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: C.muted,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 0.4,
          }}
        >
          Surge Multiplier
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            color,
            background: color + '15',
            padding: '2px 8px',
            borderRadius: 6,
          }}
        >
          ×{value.toFixed(1)}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max="3"
        step="0.1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: color, cursor: 'pointer' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 9,
          color: C.muted,
          marginTop: 3,
        }}
      >
        <span>×1.0 Normal</span>
        <span>×2.0 Yuqori</span>
        <span>×3.0 Max</span>
      </div>
    </div>
  )
}

// ── EditPanel ─────────────────────────────────────────────────────────────────
function EditPanel({ rule, onClose, onSave, isNew = false }) {
  const sm = SERVICE_META[rule.service] || SERVICE_META.Food
  const [form, setForm] = useState({ ...rule })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

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
          background: `linear-gradient(135deg, ${sm.bg}, #fff)`,
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
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 20 }}>{sm.icon}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: sm.color,
                  background: sm.bg,
                  border: `1px solid ${sm.border}`,
                  borderRadius: 6,
                  padding: '2px 8px',
                }}
              >
                {sm.label}
              </span>
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.4,
              }}
            >
              {isNew ? 'Yangi narx qoidasi' : form.name}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
              {isNew
                ? 'Yangi qoida yaratish'
                : `ID: ${form.id} · Oxirgi yangilash: ${form.updatedAt}`}
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
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* Rule name */}
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
            Qoida nomi
          </div>
          <input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              fontSize: 12,
              fontWeight: 700,
              color: C.text,
              outline: 'none',
              fontFamily: 'inherit',
              background: C.card,
            }}
          />
        </div>

        {/* Zone + Status */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 14,
          }}
        >
          <Select
            label="Zona"
            value={form.zone}
            onChange={v => set('zone', v)}
            options={ZONES.slice(1)}
            accent={sm.color}
          />
          <Select
            label="Holat"
            value={form.status}
            onChange={v => set('status', v)}
            options={['Active', 'Draft', 'Pending', 'Archived']}
            accent={sm.color}
          />
        </div>

        {/* Base fare / per km */}
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
              fontSize: 10,
              color: C.muted,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            Asosiy narxlar
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
          >
            <NumberInput
              label="Boshlang'ich narx"
              value={form.baseFare}
              onChange={v => set('baseFare', v)}
              suffix="UZS"
              accent={sm.color}
            />
            <NumberInput
              label="Km uchun"
              value={form.perKm}
              onChange={v => set('perKm', v)}
              suffix="UZS/km"
              accent={sm.color}
            />
          </div>
        </div>

        {/* Min order / free delivery */}
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
              fontSize: 10,
              color: C.muted,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 10,
            }}
          >
            Limit va chegirmalar
          </div>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
          >
            <NumberInput
              label="Minimal buyurtma"
              value={form.minOrder}
              onChange={v => set('minOrder', v)}
              suffix="UZS"
              accent={sm.color}
            />
            {form.service !== 'Taxi' && form.service !== 'Cargo' && (
              <NumberInput
                label="Bepul yetkazish"
                value={form.freeDeliveryFrom}
                onChange={v => set('freeDeliveryFrom', v)}
                suffix="UZS dan"
                accent={sm.color}
              />
            )}
          </div>
        </div>

        {/* Surge */}
        <div
          style={{
            background: C.light,
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 14,
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <SurgeSlider
              value={form.surge}
              onChange={v => set('surge', v)}
              accent={sm.color}
            />
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
            <div
              style={{
                fontSize: 10,
                color: C.muted,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.4,
                marginBottom: 8,
              }}
            >
              Peak Surge (avtomat)
            </div>
            <SurgeSlider
              value={form.peakSurge}
              onChange={v => set('peakSurge', v)}
              accent={sm.color}
            />
          </div>
        </div>

        {/* Preview calc */}
        <div
          style={{
            background: sm.bg,
            border: `1px solid ${sm.border}`,
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 14,
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
            💡 Hisoblash ko'rgazmasi (5 km masofa)
          </div>
          {[
            {
              label: 'Normal narx',
              fare: form.baseFare + form.perKm * 5,
              mult: form.surge,
            },
            {
              label: 'Peak narx',
              fare: form.baseFare + form.perKm * 5,
              mult: form.peakSurge,
            },
          ].map(({ label, fare, mult }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: sm.color }}>
                {fmt(Math.round(fare * mult))}{' '}
                <span style={{ fontSize: 9, color: C.muted, fontWeight: 500 }}>
                  UZS
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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
          onClick={onClose}
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
          Bekor qilish
        </button>
        <button
          onClick={() => onSave(form)}
          style={{
            flex: 2,
            padding: '11px',
            borderRadius: 10,
            border: 'none',
            background: sm.color,
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: `0 4px 14px ${sm.color}44`,
          }}
        >
          {isNew ? '✓ Saqlash' : '✓ Yangilash'}
        </button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MilliyGoSuperadminPricesPage() {
  const [rules, setRules] = useState(MOCK_RULES)
  const [activeService, setActiveService] = useState('Food')
  const [zoneFilter, setZoneFilter] = useState('Barcha zonalar')
  const [statusFilter, setStatusFilter] = useState('Barcha holat')
  const [search, setSearch] = useState('')
  const [selectedRule, setSelectedRule] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 6
  const sm = SERVICE_META[activeService]

  const filtered = useMemo(() => {
    let data = rules.filter(r => r.service === activeService)
    if (zoneFilter !== 'Barcha zonalar')
      data = data.filter(r => r.zone === zoneFilter)
    if (statusFilter !== 'Barcha holat')
      data = data.filter(r => r.status === statusFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter(
        r =>
          r.name.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.zone.toLowerCase().includes(q),
      )
    }
    return data
  }, [rules, activeService, zoneFilter, statusFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSave = updated => {
    if (isNew) {
      setRules(r => [
        ...r,
        {
          ...updated,
          id: `PR-NEW-${Date.now()}`,
          updatedAt: new Date().toISOString().slice(0, 10),
          updatedBy: 'Admin',
        },
      ])
    } else {
      setRules(r =>
        r.map(x =>
          x.id === updated.id
            ? { ...updated, updatedAt: new Date().toISOString().slice(0, 10) }
            : x,
        ),
      )
      setSelectedRule(updated)
    }
    setIsNew(false)
  }

  const handleDelete = id => {
    setRules(r => r.map(x => (x.id === id ? { ...x, status: 'Archived' } : x)))
    if (selectedRule?.id === id) setSelectedRule(null)
  }

  const handleNew = () => {
    setIsNew(true)
    setSelectedRule({
      id: '',
      service: activeService,
      name: '',
      zone: 'City Center',
      baseFare: 5000,
      perKm: 1500,
      minOrder: 15000,
      surge: 1.0,
      peakSurge: 1.5,
      freeDeliveryFrom: 50000,
      status: 'Draft',
      updatedBy: 'Admin',
      updatedAt: '',
    })
  }

  const stats = {
    total: rules.filter(r => r.service === activeService).length,
    active: rules.filter(
      r => r.service === activeService && r.status === 'Active',
    ).length,
    pending: rules.filter(
      r => r.service === activeService && r.status === 'Pending',
    ).length,
    draft: rules.filter(
      r => r.service === activeService && r.status === 'Draft',
    ).length,
    avgBase: rules
      .filter(r => r.service === activeService && r.status === 'Active')
      .reduce((s, r, _, a) => s + r.baseFare / a.length, 0),
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
        input[type=range] { height: 4px; border-radius: 4px; }
        button:hover { opacity: .88; }
        .row-hover:hover { background: ${sm.bg} !important; }
      `}</style>

      <div style={{ padding: '20px 24px' }}>
        {/* ── Header ── */}
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
                background: sm.bg,
                border: `1px solid ${sm.border}`,
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 10,
                fontWeight: 700,
                color: sm.color,
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
              Narxlarni Boshqarish
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Barcha xizmatlar bo'yicha tariflar, zonalar va surge
              multiplierlarni boshqarish
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
              ⬇ Eksport
            </button>
            <button
              onClick={handleNew}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: sm.color,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '9px 16px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${sm.color}44`,
              }}
            >
              ＋ Yangi qoida
            </button>
          </div>
        </div>

        {/* ── Service Tabs ── */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 18,
            flexWrap: 'wrap',
          }}
        >
          {Object.entries(SERVICE_META).map(([key, meta]) => {
            const cnt = rules.filter(
              r => r.service === key && r.status === 'Active',
            ).length
            const isActive = activeService === key
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveService(key)
                  setSelectedRule(null)
                  setIsNew(false)
                  setPage(1)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 18px',
                  borderRadius: 12,
                  border: `2px solid ${isActive ? meta.color : C.border}`,
                  background: isActive ? meta.bg : C.card,
                  cursor: 'pointer',
                  transition: 'all .2s',
                  boxShadow: isActive
                    ? `0 4px 14px ${meta.color}22`
                    : '0 1px 4px rgba(0,0,0,.04)',
                }}
              >
                <span style={{ fontSize: 20 }}>{meta.icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: isActive ? meta.color : C.text,
                    }}
                  >
                    {meta.label}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
                    {cnt} faol qoida
                  </div>
                </div>
                {isActive && (
                  <span
                    style={{
                      marginLeft: 4,
                      background: meta.color,
                      color: '#fff',
                      borderRadius: 99,
                      padding: '1px 7px',
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {rules.filter(r => r.service === key).length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Stats Strip ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          {[
            {
              label: 'Jami qoidalar',
              value: stats.total,
              color: sm.color,
              icon: '📋',
            },
            { label: 'Faol', value: stats.active, color: C.green, icon: '✅' },
            {
              label: 'Kutmoqda',
              value: stats.pending,
              color: C.amber,
              icon: '⏳',
            },
            {
              label: 'Qoralama',
              value: stats.draft,
              color: C.muted,
              icon: '✏️',
            },
            {
              label: "Avg. boshlang'ich",
              value:
                stats.avgBase > 0
                  ? `${fmt(Math.round(stats.avgBase))} UZS`
                  : '—',
              color: C.blue,
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
              label="Zona"
              value={zoneFilter}
              onChange={v => {
                setZoneFilter(v)
                setPage(1)
              }}
              options={ZONES}
              accent={sm.color}
            />
            <Select
              label="Holat"
              value={statusFilter}
              onChange={v => {
                setStatusFilter(v)
                setPage(1)
              }}
              options={[
                'Barcha holat',
                'Active',
                'Draft',
                'Pending',
                'Archived',
              ]}
              accent={sm.color}
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
                  placeholder="Qoida nomi, ID, zona..."
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
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 6,
                paddingBottom: 0,
              }}
            >
              {filtered.length !==
                rules.filter(r => r.service === activeService).length && (
                <button
                  onClick={() => {
                    setZoneFilter('Barcha zonalar')
                    setStatusFilter('Barcha holat')
                    setSearch('')
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
                  ✕ Filtrni tozalash
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selectedRule || isNew ? '1fr 380px' : '1fr',
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
                display: 'grid',
                gridTemplateColumns:
                  '1.8fr 1.2fr 1fr 1fr 1fr 1.4fr 100px 100px',
                borderBottom: `2px solid ${C.border}`,
                background: '#FAFAFA',
                padding: '0',
              }}
            >
              {[
                'Qoida nomi',
                'Zona',
                "Boshlang'ich",
                'Km narxi',
                'Min buyurtma',
                'Surge / Peak',
                'Holat',
                '',
              ].map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: '11px 12px',
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {paged.length === 0 ? (
              <div
                style={{
                  padding: '48px',
                  textAlign: 'center',
                  color: C.muted,
                  fontSize: 13,
                }}
              >
                🔍 Qoida topilmadi
              </div>
            ) : (
              paged.map(rule => {
                const isSelected = selectedRule?.id === rule.id && !isNew
                const surgeColor =
                  rule.surge >= 1.5
                    ? C.red
                    : rule.surge >= 1.2
                      ? C.amber
                      : C.green
                return (
                  <div
                    key={rule.id}
                    className="row-hover"
                    onClick={() => {
                      setIsNew(false)
                      setSelectedRule(isSelected ? null : rule)
                    }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '1.8fr 1.2fr 1fr 1fr 1fr 1.4fr 100px 100px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      background: isSelected ? sm.bg : 'transparent',
                      borderLeft: `3px solid ${isSelected ? sm.color : 'transparent'}`,
                      transition: 'background .15s',
                    }}
                  >
                    {/* Name */}
                    <div style={{ padding: '13px 12px' }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: isSelected ? sm.color : C.text,
                        }}
                      >
                        {rule.name}
                      </div>
                      <div
                        style={{ fontSize: 10, color: C.muted, marginTop: 1 }}
                      >
                        {rule.id}
                      </div>
                    </div>
                    {/* Zone */}
                    <div
                      style={{
                        padding: '13px 12px',
                        fontSize: 11,
                        color: C.muted,
                        fontWeight: 500,
                      }}
                    >
                      📍 {rule.zone}
                    </div>
                    {/* Base */}
                    <div
                      style={{
                        padding: '13px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.text,
                      }}
                    >
                      {fmt(rule.baseFare)}{' '}
                      <span style={{ fontSize: 9, color: C.muted }}>UZS</span>
                    </div>
                    {/* Per KM */}
                    <div
                      style={{
                        padding: '13px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.text,
                      }}
                    >
                      {fmt(rule.perKm)}{' '}
                      <span style={{ fontSize: 9, color: C.muted }}>UZS</span>
                    </div>
                    {/* Min order */}
                    <div
                      style={{
                        padding: '13px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.text,
                      }}
                    >
                      {fmt(rule.minOrder)}{' '}
                      <span style={{ fontSize: 9, color: C.muted }}>UZS</span>
                    </div>
                    {/* Surge */}
                    <div
                      style={{
                        padding: '13px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: surgeColor,
                          background: surgeColor + '15',
                          padding: '1px 6px',
                          borderRadius: 5,
                          display: 'inline-block',
                          width: 'fit-content',
                        }}
                      >
                        ×{rule.surge.toFixed(1)}
                      </span>
                      <span style={{ fontSize: 10, color: C.muted }}>
                        Peak: ×{rule.peakSurge.toFixed(1)}
                      </span>
                    </div>
                    {/* Status */}
                    <div style={{ padding: '13px 10px' }}>
                      <StatusBadge status={rule.status} />
                    </div>
                    {/* Actions */}
                    <div
                      style={{ padding: '13px 10px', display: 'flex', gap: 4 }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setIsNew(false)
                          setSelectedRule(rule)
                        }}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: `1px solid ${C.border}`,
                          background: C.card,
                          fontSize: 10,
                          fontWeight: 600,
                          color: C.text,
                          cursor: 'pointer',
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(rule.id)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: `1px solid ${C.border}`,
                          background: C.card,
                          fontSize: 10,
                          fontWeight: 600,
                          color: C.red,
                          cursor: 'pointer',
                        }}
                      >
                        🗑
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
                Jami <strong>{filtered.length}</strong> qoidadan{' '}
                {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
                {Math.min(page * PAGE_SIZE, filtered.length)} ko'rsatilmoqda
              </span>
              <div style={{ display: 'flex', gap: 5 }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '5px 10px',
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
                {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
                  const p = i + Math.max(1, Math.min(page - 1, totalPages - 3))
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 7,
                        border: `1px solid ${page === p ? sm.color : C.border}`,
                        background: page === p ? sm.color : C.card,
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
                    padding: '5px 10px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: page === totalPages ? C.light : C.card,
                    color: page === totalPages ? C.muted : C.text,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: page === totalPages ? 'default' : 'pointer',
                  }}
                >
                  Keyingi →
                </button>
              </div>
            </div>
          </div>

          {/* Edit Panel */}
          {(selectedRule || isNew) && (
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
                boxShadow: `0 4px 20px ${sm.color}22`,
              }}
            >
              <EditPanel
                rule={selectedRule}
                isNew={isNew}
                onClose={() => {
                  setSelectedRule(null)
                  setIsNew(false)
                }}
                onSave={handleSave}
              />
            </div>
          )}
        </div>

        {/* ── Bottom Summary ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 10,
            marginTop: 14,
          }}
        >
          {Object.entries(SERVICE_META).map(([key, meta]) => {
            const srvRules = rules.filter(
              r => r.service === key && r.status === 'Active',
            )
            const avgFare = srvRules.length
              ? srvRules.reduce((s, r) => s + r.baseFare, 0) / srvRules.length
              : 0
            const maxSurge = srvRules.length
              ? Math.max(...srvRules.map(r => r.peakSurge))
              : 0
            return (
              <div
                key={key}
                style={{
                  background: C.card,
                  borderRadius: 12,
                  padding: '14px 16px',
                  border: `1px solid ${activeService === key ? meta.color : C.border}`,
                  boxShadow:
                    activeService === key
                      ? `0 4px 14px ${meta.color}18`
                      : '0 1px 4px rgba(0,0,0,.04)',
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
                onClick={() => {
                  setActiveService(key)
                  setSelectedRule(null)
                  setIsNew(false)
                  setPage(1)
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
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <span style={{ fontSize: 20 }}>{meta.icon}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: meta.color,
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <span
                    style={{
                      background: meta.bg,
                      color: meta.color,
                      borderRadius: 99,
                      padding: '1px 7px',
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    {srvRules.length} faol
                  </span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.muted,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.3,
                      }}
                    >
                      Avg boshlang'ich
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: C.text,
                        marginTop: 2,
                      }}
                    >
                      {avgFare ? `${fmt(Math.round(avgFare))}` : '—'}{' '}
                      <span style={{ fontSize: 9, color: C.muted }}>UZS</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.muted,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.3,
                      }}
                    >
                      Max surge
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color:
                          maxSurge >= 1.8
                            ? C.red
                            : maxSurge >= 1.4
                              ? C.amber
                              : C.green,
                        marginTop: 2,
                      }}
                    >
                      ×{maxSurge.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
