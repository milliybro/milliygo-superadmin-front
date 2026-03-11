import { useState, useMemo, useRef, useEffect } from 'react'

const C = {
  brand: '#4F46E5',
  brandD: '#3730A3',
  brandL: '#EEF2FF',
  brandB: '#C7D2FE',
  orange: '#F97316',
  blue: '#2563EB',
  emerald: '#059669',
  violet: '#7C3AED',
  sky: '#0EA5E9',
  rose: '#F43F5E',
  amber: '#D97706',
  teal: '#0D9488',
  red: '#DC2626',
  green: '#16A34A',
  pink: '#EC4899',
  lime: '#65A30D',
  text: '#0F172A',
  muted: '#64748B',
  muted2: '#94A3B8',
  border: '#E2E8F0',
  light: '#F1F5F9',
  light2: '#F8FAFC',
  card: '#FFFFFF',
  bg: '#F0F4F8',
  dark: '#0F172A',
  dark2: '#1E293B',
}

const NOTIF_TYPE = {
  Push: { icon: '🔔', color: C.brand, bg: C.brandL, label: 'Push' },
  SMS: { icon: '💬', color: C.emerald, bg: '#F0FDF4', label: 'SMS' },
  Email: { icon: '📧', color: C.blue, bg: '#EFF6FF', label: 'Email' },
  InApp: { icon: '📱', color: C.violet, bg: '#F5F3FF', label: 'In-App' },
  Webhook: { icon: '🔗', color: C.teal, bg: '#F0FDFA', label: 'Webhook' },
}

const NOTIF_STATUS = {
  Sent: { bg: '#F0FDF4', color: '#15803D', dot: '#22C55E', label: 'Yuborildi' },
  Scheduled: {
    bg: '#EFF6FF',
    color: '#1D4ED8',
    dot: '#60A5FA',
    label: 'Rejalashgan',
  },
  Draft: { bg: '#F1F5F9', color: '#64748B', dot: '#94A3B8', label: 'Qoralama' },
  Failed: { bg: '#FFF1F2', color: '#BE123C', dot: '#F43F5E', label: 'Xato' },
  Sending: {
    bg: '#FFF7ED',
    color: '#C2410C',
    dot: '#FB923C',
    label: 'Yuborilmoqda',
  },
}

const NOTIF_CAT = {
  System: { icon: '⚙️', color: C.muted, label: 'Tizim' },
  Promo: { icon: '🎉', color: C.pink, label: 'Promo' },
  Order: { icon: '📦', color: C.orange, label: 'Buyurtma' },
  Payment: { icon: '💳', color: C.blue, label: "To'lov" },
  Courier: { icon: '🛵', color: C.violet, label: 'Kuryer' },
  Security: { icon: '🔐', color: C.red, label: 'Xavfsizlik' },
  Marketing: { icon: '📢', color: C.brand, label: 'Marketing' },
  Alert: { icon: '⚠️', color: C.amber, label: 'Ogohlantirish' },
}

const TARGET_SEG = {
  Barcha: { icon: '👥', color: C.muted },
  'Yangi foydalanuvchi': { icon: '🆕', color: C.emerald },
  'VIP mijozlar': { icon: '👑', color: C.amber },
  'Faolsiz (7+ kun)': { icon: '💤', color: C.violet },
  Haydovchilar: { icon: '🚖', color: C.teal },
  Kuryerlar: { icon: '🛵', color: C.orange },
  Hamkorlar: { icon: '🤝', color: C.blue },
}

const fmt = n => new Intl.NumberFormat('uz-UZ').format(n)
const fmtM = n =>
  n >= 1e6
    ? `${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `${(n / 1e3).toFixed(0)}K`
      : String(n)
const timeAgo = mins =>
  mins < 1
    ? 'hozir'
    : mins < 60
      ? `${mins} daq`
      : mins < 1440
        ? `${Math.floor(mins / 60)} soat`
        : `${Math.floor(mins / 1440)} kun`

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 'NTF-8821',
    title: 'Bahor chegirmasi! 20% off',
    body: 'Bugun barcha food buyurtmalarida MILLIY20 kodi bilan 20% chegirma oling 🍔',
    type: 'Push',
    category: 'Promo',
    status: 'Sent',
    target: 'Barcha',
    sent: 148420,
    delivered: 141200,
    opened: 68400,
    clicked: 24800,
    failed: 7220,
    scheduled: null,
    sentAt: '2025-10-30 14:00',
    createdBy: 'Marketing',
    deepLink: '/promo/MILLIY20',
    image: true,
    sound: true,
    badge: true,
    tags: ['promo', 'food', 'discount'],
    priority: 'High',
  },
  {
    id: 'NTF-8820',
    title: "Buyurtmangiz yo'lda! 🛵",
    body: 'Kuryeringiz MGO-88421 buyurtmangizni olib ketdi. Taxminiy vaqt: 25 daqiqa.',
    type: 'Push',
    category: 'Order',
    status: 'Sent',
    target: 'Yangi foydalanuvchi',
    sent: 1,
    delivered: 1,
    opened: 1,
    clicked: 1,
    failed: 0,
    scheduled: null,
    sentAt: '2025-10-30 13:55',
    createdBy: 'System',
    deepLink: '/order/MGO-88421',
    image: false,
    sound: true,
    badge: true,
    tags: ['order', 'tracking'],
    priority: 'High',
  },
  {
    id: 'NTF-8819',
    title: "VIP Status! Siz VIP bo'ldingiz 👑",
    body: "Tabriklaymiz! Siz VIP darajasiga ko'tarildingiz. Endi 30% chegirma va bepul yetkazish siz uchun!",
    type: 'Push',
    category: 'Marketing',
    status: 'Sent',
    target: 'VIP mijozlar',
    sent: 4820,
    delivered: 4710,
    opened: 3840,
    clicked: 2920,
    failed: 110,
    scheduled: null,
    sentAt: '2025-10-30 12:00',
    createdBy: 'Admin',
    deepLink: '/profile/vip',
    image: true,
    sound: true,
    badge: true,
    tags: ['vip', 'loyalty'],
    priority: 'Medium',
  },
  {
    id: 'NTF-8818',
    title: "To'lovingiz tasdiqlandi ✅",
    body: "124 500 UZS to'lov muvaffaqiyatli amalga oshirildi. Tranzaksiya: TXN-55219.",
    type: 'Push',
    category: 'Payment',
    status: 'Sent',
    target: 'Barcha',
    sent: 1,
    delivered: 1,
    opened: 1,
    clicked: 0,
    failed: 0,
    scheduled: null,
    sentAt: '2025-10-30 14:26',
    createdBy: 'System',
    deepLink: '/payments/TXN-55219',
    image: false,
    sound: false,
    badge: false,
    tags: ['payment', 'receipt'],
    priority: 'High',
  },
  {
    id: 'NTF-8817',
    title: 'Ramazon aksiyasi — oldindan ogohlantirish 📢',
    body: "Ramazon oyi (1-mart)dan boshlab barcha food buyurtmalarida 30% chegirma bo'ladi!",
    type: 'Push',
    category: 'Promo',
    status: 'Scheduled',
    target: 'Barcha',
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    failed: 0,
    scheduled: '2025-11-01 09:00',
    sentAt: null,
    createdBy: 'Marketing',
    deepLink: '/promo/ramadan',
    image: true,
    sound: true,
    badge: true,
    tags: ['promo', 'ramadan'],
    priority: 'Medium',
  },
  {
    id: 'NTF-8816',
    title: 'Yangi xizmat: Cargo Express 📦',
    body: "MilliyGo'da yangi Cargo xizmati ishga tushdi! Og'ir yuklarni tez va arzon yetkazib beramiz.",
    type: 'Email',
    category: 'Marketing',
    status: 'Sent',
    target: 'Barcha',
    sent: 94200,
    delivered: 88400,
    opened: 32100,
    clicked: 8420,
    failed: 5800,
    scheduled: null,
    sentAt: '2025-10-29 10:00',
    createdBy: 'Marketing',
    deepLink: '/cargo',
    image: true,
    sound: false,
    badge: false,
    tags: ['new-feature', 'cargo', 'email'],
    priority: 'Medium',
  },
  {
    id: 'NTF-8815',
    title: 'Hisobingizga kirish urinishi ⚠️',
    body: "Noma'lum qurilmadan hisobingizga kirish urinildi. Siz emassiz? Darhol parolni o'zgartiring.",
    type: 'SMS',
    category: 'Security',
    status: 'Sent',
    target: 'Barcha',
    sent: 1,
    delivered: 1,
    opened: 1,
    clicked: 1,
    failed: 0,
    scheduled: null,
    sentAt: '2025-10-29 22:14',
    createdBy: 'System',
    deepLink: '/security',
    image: false,
    sound: true,
    badge: true,
    tags: ['security', 'alert'],
    priority: 'Critical',
  },
  {
    id: 'NTF-8814',
    title: 'Haftalik hisobot: 342 ta yetkazish ✅',
    body: 'Bu hafta siz 342 ta buyurtmani muvaffaqiyatli yetkazib berdingiz. Sizning reytingiz: 4.8 ⭐',
    type: 'Push',
    category: 'Courier',
    status: 'Sent',
    target: 'Kuryerlar',
    sent: 284,
    delivered: 276,
    opened: 198,
    clicked: 84,
    failed: 8,
    scheduled: null,
    sentAt: '2025-10-28 18:00',
    createdBy: 'System',
    deepLink: '/courier/stats',
    image: false,
    sound: false,
    badge: true,
    tags: ['courier', 'weekly-report'],
    priority: 'Low',
  },
  {
    id: 'NTF-8813',
    title: 'Qayta faollashish bonusi 🎁',
    body: "Sizi sog'indik! Qaytib kelung va keyingi 3 ta buyurtmada 15% chegirma oling.",
    type: 'Push',
    category: 'Marketing',
    status: 'Sending',
    target: 'Faolsiz (7+ kun)',
    sent: 12480,
    delivered: 11200,
    opened: 3840,
    clicked: 980,
    failed: 1280,
    scheduled: null,
    sentAt: '2025-10-30 15:00',
    createdBy: 'Marketing',
    deepLink: '/promo/comeback',
    image: true,
    sound: true,
    badge: true,
    tags: ['reactivation', 'promo'],
    priority: 'Medium',
  },
  {
    id: 'NTF-8812',
    title: "Yangi do'konlar qo'shildi 🛒",
    body: "Sizning mahallangizda 12 ta yangi do'kon Market xizmatida paydo bo'ldi!",
    type: 'InApp',
    category: 'Marketing',
    status: 'Draft',
    target: 'Barcha',
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    failed: 0,
    scheduled: null,
    sentAt: null,
    createdBy: 'Admin',
    deepLink: '/market/new',
    image: true,
    sound: false,
    badge: false,
    tags: ['market', 'new-stores'],
    priority: 'Low',
  },
  {
    id: 'NTF-8811',
    title: 'Tizim texnik ishlar 🔧',
    body: "10:00–11:00 oralig'ida tizimda qisqa tanaffus bo'ladi. Noqulaylik uchun uzr so'raymiz.",
    type: 'InApp',
    category: 'System',
    status: 'Scheduled',
    target: 'Barcha',
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    failed: 0,
    scheduled: '2025-10-31 09:30',
    sentAt: null,
    createdBy: 'Admin',
    deepLink: null,
    image: false,
    sound: false,
    badge: false,
    tags: ['maintenance', 'system'],
    priority: 'High',
  },
  {
    id: 'NTF-8810',
    title: "Webhook: yangi to'lov hodisasi",
    body: `{"event":"payment.completed","amount":124500,"currency":"UZS","txn":"TXN-55219"}`,
    type: 'Webhook',
    category: 'Payment',
    status: 'Sent',
    target: 'Hamkorlar',
    sent: 1840,
    delivered: 1820,
    opened: 1820,
    clicked: 0,
    failed: 20,
    scheduled: null,
    sentAt: '2025-10-30 14:26',
    createdBy: 'System',
    deepLink: null,
    image: false,
    sound: false,
    badge: false,
    tags: ['webhook', 'payment'],
    priority: 'High',
  },
]

const TEMPLATES = [
  {
    id: 'TPL-01',
    name: 'Buyurtma tasdiqlandi',
    category: 'Order',
    type: 'Push',
    uses: 18420,
    cr: 68.2,
  },
  {
    id: 'TPL-02',
    name: 'Yetkazib berildi',
    category: 'Order',
    type: 'Push',
    uses: 16840,
    cr: 72.4,
  },
  {
    id: 'TPL-03',
    name: 'Promo xabari',
    category: 'Promo',
    type: 'Push',
    uses: 12100,
    cr: 44.8,
  },
  {
    id: 'TPL-04',
    name: 'VIP tabrik',
    category: 'Marketing',
    type: 'Push',
    uses: 4820,
    cr: 79.6,
  },
  {
    id: 'TPL-05',
    name: 'Xavfsizlik ogohlantirish',
    category: 'Security',
    type: 'SMS',
    uses: 2840,
    cr: 92.1,
  },
  {
    id: 'TPL-06',
    name: 'Haftalik hisobot',
    category: 'Courier',
    type: 'Email',
    uses: 1240,
    cr: 34.2,
  },
]

const LIVE_FEED = [
  {
    id: 1,
    text: 'Anvar Rustamov buyurtma berdi',
    icon: '📦',
    color: C.orange,
    ago: 1,
  },
  {
    id: 2,
    text: 'NTF-8813 yuborish boshlandi',
    icon: '📤',
    color: C.brand,
    ago: 2,
  },
  {
    id: 3,
    text: '12 ta push notif yetkazilmadi',
    icon: '❌',
    color: C.red,
    ago: 3,
  },
  {
    id: 4,
    text: 'VIP xabari 4 710 ta qurilmaga yetdi',
    icon: '👑',
    color: C.amber,
    ago: 5,
  },
  {
    id: 5,
    text: 'Jasur Aliev xabardorlik ochdi',
    icon: '👁',
    color: C.emerald,
    ago: 7,
  },
  {
    id: 6,
    text: 'Webhook TXN-55219 yuborildi',
    icon: '🔗',
    color: C.teal,
    ago: 8,
  },
  {
    id: 7,
    text: 'Yangi template saqlandi',
    icon: '📝',
    color: C.violet,
    ago: 12,
  },
  {
    id: 8,
    text: 'Email kampaniya rejalashtirildi',
    icon: '📧',
    color: C.blue,
    ago: 15,
  },
]

// ─── SHARED UI ────────────────────────────────────────────────────────────────
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
          fontFamily: 'inherit',
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

function StatusBadge({ s }) {
  const cfg = NOTIF_STATUS[s] || NOTIF_STATUS.Draft
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

function Toggle({ value, onChange, accent = C.brand }) {
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

function Sparkline({ data, color, w = 72, h = 26 }) {
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
        <linearGradient id={`sp${color.slice(1)}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp${color.slice(1)})`} />
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

function DeliveryBar({ sent, delivered, opened, clicked, failed }) {
  const total = sent || 1
  const segs = [
    { val: clicked, color: C.brand, label: 'Bosildi' },
    { val: opened - clicked, color: C.sky, label: 'Ochildi' },
    { val: delivered - opened, color: C.emerald, label: 'Yetdi' },
    { val: failed, color: C.red, label: 'Xato' },
  ].filter(s => s.val > 0)
  return (
    <div>
      <div
        style={{
          display: 'flex',
          height: 7,
          borderRadius: 99,
          overflow: 'hidden',
          gap: 1,
          marginBottom: 6,
        }}
      >
        {segs.map((s, i) => (
          <div
            key={i}
            title={`${s.label}: ${fmt(s.val)}`}
            style={{
              flex: s.val / total,
              background: s.color,
              minWidth: s.val / total > 0 ? 3 : 0,
              transition: 'flex .5s',
            }}
          />
        ))}
        <div
          style={{
            flex: (sent - delivered - failed) / total || 0,
            background: C.light,
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {[
          { label: 'Yuborildi', val: sent, color: C.muted },
          { label: 'Yetdi', val: delivered, color: C.emerald },
          { label: 'Ochildi', val: opened, color: C.sky },
          { label: 'Bosildi', val: clicked, color: C.brand },
          ...(failed > 0 ? [{ label: 'Xato', val: failed, color: C.red }] : []),
        ].map(({ label, val, color }) => (
          <span
            key={label}
            style={{
              fontSize: 9,
              color,
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {label}: <strong>{fmtM(val)}</strong> (
            {((val / total) * 100).toFixed(1)}%)
          </span>
        ))}
      </div>
    </div>
  )
}

function PriorityDot({ p }) {
  const cfg = {
    Critical: { color: C.red, label: 'Kritik' },
    High: { color: C.orange, label: 'Yuqori' },
    Medium: { color: C.amber, label: "O'rta" },
    Low: { color: C.muted2, label: 'Past' },
  }
  const c = cfg[p] || cfg.Low
  return (
    <span
      title={c.label}
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: c.color,
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  )
}

// ─── COMPOSE / EDIT PANEL ─────────────────────────────────────────────────────
function ComposePanel({ notif, isNew, onClose, onSend }) {
  const [tab, setTab] = useState('compose')
  const [form, setForm] = useState(
    notif
      ? { ...notif }
      : {
          title: '',
          body: '',
          type: 'Push',
          category: 'Marketing',
          status: 'Draft',
          target: 'Barcha',
          priority: 'Medium',
          deepLink: '',
          image: false,
          sound: true,
          badge: true,
          scheduled: null,
          tags: [],
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          failed: 0,
        },
  )
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const tc = NOTIF_TYPE[form.type] || NOTIF_TYPE.Push
  const cat = NOTIF_CAT[form.category] || NOTIF_CAT.Marketing
  const tgt = TARGET_SEG[form.target] || TARGET_SEG['Barcha']

  const estReach =
    {
      Barcha: 94200,
      'Yangi foydalanuvchi': 12840,
      'VIP mijozlar': 4820,
      'Faolsiz (7+ kun)': 18200,
      Haydovchilar: 840,
      Kuryerlar: 284,
      Hamkorlar: 1840,
    }[form.target] || 0

  const charCount = form.body.length
  const titleCount = form.title.length

  const [preview, setPreview] = useState(false)

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
          padding: '16px 20px 12px',
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
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginBottom: 5,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: 18 }}>{tc.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: tc.color,
                  background: tc.bg,
                  padding: '2px 8px',
                  borderRadius: 6,
                }}
              >
                {tc.label}
              </span>
              <span style={{ fontSize: 12 }}>{cat.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: cat.color }}>
                {cat.label}
              </span>
              {!isNew && <StatusBadge s={form.status} />}
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.4,
              }}
            >
              {isNew ? 'Yangi bildirishnoma' : 'Tahrirlash'}
            </div>
            {!isNew && (
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                {form.id} · {form.sentAt || form.scheduled}
              </div>
            )}
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
        <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            ['compose', '✏️ Matn'],
            ['target', '🎯 Manzil'],
            ['settings', '⚙ Sozlama'],
            ['stats', '📊 Natija'],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              style={{
                padding: '5px 11px',
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

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {/* ── TAB: COMPOSE ── */}
        {tab === 'compose' && (
          <>
            {/* Type & Category */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 14,
              }}
            >
              <div>
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
                  Kanal
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                >
                  {Object.entries(NOTIF_TYPE).map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => set('type', k)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '7px 10px',
                        borderRadius: 8,
                        border: `1px solid ${form.type === k ? v.color : C.border}`,
                        background: form.type === k ? v.bg : C.card,
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{v.icon}</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: form.type === k ? v.color : C.muted,
                        }}
                      >
                        {v.label}
                      </span>
                      {form.type === k && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: 12,
                            color: v.color,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
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
                  Toifa
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 4,
                  }}
                >
                  {Object.entries(NOTIF_CAT).map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => set('category', k)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '6px 8px',
                        borderRadius: 7,
                        border: `1px solid ${form.category === k ? v.color : C.border}`,
                        background:
                          form.category === k ? v.color + '10' : C.card,
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{v.icon}</span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: form.category === k ? v.color : C.muted,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {v.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                  }}
                >
                  Sarlavha
                </div>
                <span
                  style={{
                    fontSize: 9,
                    color: titleCount > 65 ? C.red : C.muted,
                  }}
                >
                  {titleCount}/65
                </span>
              </div>
              <input
                value={form.title}
                onChange={e => set('title', e.target.value)}
                maxLength={65}
                placeholder="Qisqa, diqqat jalb qiluvchi sarlavha..."
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 9,
                  border: `1px solid ${titleCount > 65 ? C.red : C.border}`,
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.text,
                  outline: 'none',
                  fontFamily: 'inherit',
                  background: C.card,
                }}
              />
            </div>

            {/* Body */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: C.muted,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                  }}
                >
                  Matn
                </div>
                <span
                  style={{
                    fontSize: 9,
                    color: charCount > 240 ? C.red : C.muted,
                  }}
                >
                  {charCount}/240
                </span>
              </div>
              <textarea
                value={form.body}
                onChange={e => set('body', e.target.value)}
                maxLength={240}
                rows={3}
                placeholder="Bildirishnoma matni... {{user_name}} o'zgaruvchisini ishlatishingiz mumkin"
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 9,
                  border: `1px solid ${charCount > 240 ? C.red : C.border}`,
                  fontSize: 12,
                  color: C.text,
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit',
                  background: C.card,
                  lineHeight: 1.5,
                }}
              />
            </div>

            {/* Quick emojis + variables */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginBottom: 14,
                flexWrap: 'wrap',
              }}
            >
              {['🎉', '🔔', '📦', '💳', '🛵', '⭐', '💥', '🎁'].map(e => (
                <button
                  key={e}
                  onClick={() => set('body', form.body + e)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: C.light,
                    cursor: 'pointer',
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {e}
                </button>
              ))}
              <div
                style={{ width: 1, background: C.border, margin: '0 2px' }}
              />
              {['{{user_name}}', '{{order_id}}', '{{amount}}'].map(v => (
                <button
                  key={v}
                  onClick={() => set('body', form.body + v)}
                  style={{
                    padding: '5px 9px',
                    borderRadius: 7,
                    border: `1px solid ${C.brand}44`,
                    background: C.brandL,
                    color: C.brandD,
                    fontSize: 9,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Deep link */}
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
                Deep Link (ixtiyoriy)
              </div>
              <input
                value={form.deepLink || ''}
                onChange={e => set('deepLink', e.target.value)}
                placeholder="/promo/MILLIY20 yoki https://..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: `1px solid ${C.border}`,
                  fontSize: 11,
                  color: C.text,
                  outline: 'none',
                  fontFamily: 'monospace',
                  background: C.card,
                }}
              />
            </div>

            {/* Phone preview */}
            <div
              style={{
                background: C.dark2,
                borderRadius: 14,
                padding: '14px',
                marginBottom: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at 30% 0%,#4F46E533,transparent 70%)',
                }}
              />
              <div
                style={{
                  fontSize: 9,
                  color: '#64748B',
                  fontWeight: 600,
                  marginBottom: 8,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                📱 Ko'rinish (preview)
              </div>
              <div
                style={{
                  background: '#1E293B',
                  borderRadius: 10,
                  padding: '11px 13px',
                  border: '1px solid #334155',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: C.brand + '33',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                    }}
                  >
                    {tc.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: '#fff',
                        lineHeight: 1.2,
                      }}
                    >
                      {form.title || 'Sarlavha...'}
                    </div>
                    <div
                      style={{ fontSize: 9, color: '#64748B', marginTop: 1 }}
                    >
                      MilliyGo · hozir
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: '#CBD5E1',
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                  }}
                >
                  {form.body || 'Bildirishnoma matni...'}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── TAB: TARGET ── */}
        {tab === 'target' && (
          <>
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
                Maqsadli auditoriya
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {Object.entries(TARGET_SEG).map(([k, v]) => {
                  const reach =
                    {
                      Barcha: 94200,
                      'Yangi foydalanuvchi': 12840,
                      'VIP mijozlar': 4820,
                      'Faolsiz (7+ kun)': 18200,
                      Haydovchilar: 840,
                      Kuryerlar: 284,
                      Hamkorlar: 1840,
                    }[k] || 0
                  const isSel = form.target === k
                  return (
                    <button
                      key={k}
                      onClick={() => set('target', k)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 14px',
                        borderRadius: 10,
                        border: `1px solid ${isSel ? v.color : C.border}`,
                        background: isSel ? v.color + '10' : C.card,
                        cursor: 'pointer',
                        transition: 'all .15s',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{v.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: isSel ? v.color : C.text,
                          }}
                        >
                          {k}
                        </div>
                        <div style={{ fontSize: 10, color: C.muted }}>
                          ~{fmt(reach)} foydalanuvchi
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
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
                              width: `${(reach / 94200) * 100}%`,
                              background: v.color,
                              borderRadius: 99,
                            }}
                          />
                        </div>
                        {isSel && (
                          <span style={{ color: v.color, fontSize: 14 }}>
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Reach summary */}
            <div
              style={{
                background: `linear-gradient(135deg,${C.brandL},#fff)`,
                borderRadius: 12,
                padding: '14px 16px',
                border: `1px solid ${C.brandB}`,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      color: C.brandD,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      marginBottom: 4,
                    }}
                  >
                    Taxminiy qamrov
                  </div>
                  <div
                    style={{ fontSize: 26, fontWeight: 900, color: C.brand }}
                  >
                    ~{fmt(estReach)}
                  </div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>
                    foydalanuvchi qurilmasi
                  </div>
                </div>
                <div style={{ fontSize: 36 }}>🎯</div>
              </div>
              <div
                style={{
                  marginTop: 10,
                  height: 6,
                  background: '#C7D2FE',
                  borderRadius: 99,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${(estReach / 94200) * 100}%`,
                    background: C.brand,
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>

            {/* Scheduling */}
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
                📅 Yuborish vaqti
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['now', 'Hozir yuborish', '⚡'],
                  ['scheduled', 'Vaqt rejalashtirish', '🕐'],
                  ['optimal', 'Optimal vaqt (AI)', '🤖'],
                ].map(([k, l, icon]) => {
                  const isSel =
                    (k === 'now' && !form.scheduled) ||
                    (k === 'scheduled' && form.scheduled) ||
                    (k === 'optimal' && form.optimal)
                  return (
                    <button
                      key={k}
                      onClick={() => {
                        if (k === 'now') set('scheduled', null)
                        if (k === 'scheduled')
                          set('scheduled', '2025-11-01T09:00')
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 12px',
                        borderRadius: 9,
                        border: `1px solid ${isSel ? C.brand : C.border}`,
                        background: isSel ? C.brandL : C.card,
                        cursor: 'pointer',
                        transition: 'all .15s',
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{icon}</span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: isSel ? C.brandD : C.muted,
                        }}
                      >
                        {l}
                      </span>
                      {isSel && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            color: C.brand,
                            fontSize: 12,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              {form.scheduled && (
                <div style={{ marginTop: 10 }}>
                  <input
                    type="datetime-local"
                    value={form.scheduled || ''}
                    onChange={e => set('scheduled', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      fontSize: 12,
                      color: C.text,
                      outline: 'none',
                      fontFamily: 'inherit',
                      background: C.card,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Priority */}
            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
              }}
            >
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
                Ustuvorlik
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4,1fr)',
                  gap: 6,
                }}
              >
                {['Critical', 'High', 'Medium', 'Low'].map(p => {
                  const cfg = {
                    Critical: C.red,
                    High: C.orange,
                    Medium: C.amber,
                    Low: C.muted2,
                  }
                  const isSel = form.priority === p
                  return (
                    <button
                      key={p}
                      onClick={() => set('priority', p)}
                      style={{
                        padding: '7px 8px',
                        borderRadius: 8,
                        border: `1px solid ${isSel ? cfg[p] : C.border}`,
                        background: isSel ? cfg[p] + '15' : C.card,
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: cfg[p],
                          margin: '0 auto 4px',
                        }}
                      />
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: isSel ? cfg[p] : C.muted,
                          textAlign: 'center',
                        }}
                      >
                        {
                          {
                            Critical: 'Kritik',
                            High: 'Yuqori',
                            Medium: "O'rta",
                            Low: 'Past',
                          }[p]
                        }
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
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
                  marginBottom: 12,
                }}
              >
                Push sozlamalari
              </div>
              {[
                { k: 'sound', l: 'Tovush', s: 'Bildirishnoma tovushi' },
                { k: 'badge', l: 'Badge', s: 'Ilova ikonasidagi raqam' },
                { k: 'image', l: 'Rasm', s: 'Rich notification rasmi' },
              ].map(({ k, l, s }) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 12, fontWeight: 700, color: C.text }}
                    >
                      {l}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 2 }}>
                      {s}
                    </div>
                  </div>
                  <Toggle
                    value={!!form[k]}
                    onChange={v => set(k, v)}
                    accent={C.brand}
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
                Yuborish parametrlari
              </div>
              {[
                { l: 'A/B test rejimi', s: 'Ikki variant sinash', def: false },
                {
                  l: 'Personalizatsiya',
                  s: "{{user_name}} o'zgaruvchisi",
                  def: true,
                },
                {
                  l: 'Delivery hisobot',
                  s: 'Yetkazish statistikasi',
                  def: true,
                },
                { l: 'Click tracking', s: 'Bosilishni kuzatish', def: true },
                {
                  l: 'Qayta yuborish',
                  s: "Xato bo'lsa 3 marta urinish",
                  def: false,
                },
              ].map(({ l, s, def }) => (
                <div
                  key={l}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 12, fontWeight: 700, color: C.text }}
                    >
                      {l}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>
                      {s}
                    </div>
                  </div>
                  <Toggle value={def} onChange={() => {}} accent={C.brand} />
                </div>
              ))}
            </div>

            {/* Tags */}
            <div
              style={{
                background: C.light,
                borderRadius: 10,
                padding: '12px 14px',
              }}
            >
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
                Teglar
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                {[
                  'promo',
                  'order',
                  'system',
                  'marketing',
                  'alert',
                  'payment',
                  'courier',
                  'security',
                ].map(tag => {
                  const isSel = (form.tags || []).includes(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() =>
                        set(
                          'tags',
                          isSel
                            ? (form.tags || []).filter(t => t !== tag)
                            : [...(form.tags || []), tag],
                        )
                      }
                      style={{
                        padding: '4px 11px',
                        borderRadius: 99,
                        border: `1px solid ${isSel ? C.brand : C.border}`,
                        background: isSel ? C.brandL : C.card,
                        color: isSel ? C.brandD : C.muted,
                        fontSize: 10,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      #{tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* ── TAB: STATS ── */}
        {tab === 'stats' && (
          <>
            {isNew || !notif?.sent ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: C.muted,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  Natijalar yuborilgandan keyin
                </div>
                <div style={{ fontSize: 10, marginTop: 4 }}>
                  Bildirishnoma yuborilgach statistika ko'rinadi
                </div>
              </div>
            ) : (
              <>
                {/* Delivery breakdown */}
                <div
                  style={{
                    background: C.dark2,
                    borderRadius: 12,
                    padding: '14px 16px',
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: '#64748B',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      marginBottom: 8,
                    }}
                  >
                    Yetkazish natijalari
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4,1fr)',
                      gap: 8,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      {
                        l: 'Yuborildi',
                        val: notif.sent,
                        color: '#60A5FA',
                        pct: 100,
                      },
                      {
                        l: 'Yetdi',
                        val: notif.delivered,
                        color: '#4ADE80',
                        pct: ((notif.delivered / notif.sent) * 100).toFixed(1),
                      },
                      {
                        l: 'Ochildi',
                        val: notif.opened,
                        color: C.sky,
                        pct: ((notif.opened / notif.sent) * 100).toFixed(1),
                      },
                      {
                        l: 'Bosildi',
                        val: notif.clicked,
                        color: C.brand,
                        pct: ((notif.clicked / notif.sent) * 100).toFixed(1),
                      },
                    ].map(({ l, val, color, pct }) => (
                      <div key={l} style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 900,
                            color,
                            lineHeight: 1,
                          }}
                        >
                          {fmtM(val)}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: '#64748B',
                            marginTop: 3,
                          }}
                        >
                          {l}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color,
                            marginTop: 2,
                          }}
                        >
                          {pct}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <DeliveryBar {...notif} />
                </div>

                {/* Funnel */}
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
                    Konversiya funnel
                  </div>
                  {[
                    { l: 'Yuborildi', v: notif.sent, c: C.muted },
                    { l: 'Yetkazildi', v: notif.delivered, c: C.emerald },
                    { l: 'Ochildi', v: notif.opened, c: C.sky },
                    { l: 'Bosildi', v: notif.clicked, c: C.brand },
                  ].map(({ l, v, c }, i, arr) => {
                    const pct = (v / notif.sent) * 100
                    const drop =
                      i > 0
                        ? (((arr[i - 1].v - v) / arr[i - 1].v) * 100).toFixed(1)
                        : null
                    return (
                      <div key={l} style={{ marginBottom: 8 }}>
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
                            {l}
                          </span>
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            {drop && (
                              <span style={{ fontSize: 9, color: C.red }}>
                                −{drop}%
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color: c,
                              }}
                            >
                              {fmtM(v)}
                            </span>
                          </span>
                        </div>
                        <div
                          style={{
                            height: 22,
                            background: C.card,
                            borderRadius: 6,
                            overflow: 'hidden',
                            border: `1px solid ${C.border}`,
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${pct}%`,
                              background: `linear-gradient(90deg,${c},${c}BB)`,
                              borderRadius: 6,
                              transition: 'width .5s',
                              display: 'flex',
                              alignItems: 'center',
                              paddingLeft: 8,
                            }}
                          >
                            {pct > 12 && (
                              <span
                                style={{
                                  fontSize: 9,
                                  fontWeight: 800,
                                  color: '#fff',
                                }}
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

                {/* Failure reasons */}
                {notif.failed > 0 && (
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
                        fontSize: 11,
                        fontWeight: 800,
                        color: C.red,
                        marginBottom: 8,
                      }}
                    >
                      ⚠ Xato sabablari
                    </div>
                    {[
                      {
                        reason: 'Token eskirgan',
                        cnt: Math.round(notif.failed * 0.45),
                      },
                      {
                        reason: 'Qurilma offline',
                        cnt: Math.round(notif.failed * 0.32),
                      },
                      {
                        reason: "Ilova o'chirilgan",
                        cnt: Math.round(notif.failed * 0.18),
                      },
                      {
                        reason: 'Server xatosi',
                        cnt: Math.round(notif.failed * 0.05),
                      },
                    ].map(({ reason, cnt }) => (
                      <div
                        key={reason}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 6,
                        }}
                      >
                        <span style={{ fontSize: 10, color: C.muted }}>
                          {reason}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.red,
                          }}
                        >
                          {fmt(cnt)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '12px 20px',
          borderTop: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button
            onClick={() => set('status', 'Draft')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 9,
              border: `1px solid ${C.border}`,
              background: C.card,
              color: C.text,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            💾 Qoralama
          </button>
          <button
            onClick={() => set('status', 'Scheduled')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 9,
              border: `1px solid ${C.brand}`,
              background: C.brandL,
              color: C.brandD,
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            🕐 Rejalashtirish
          </button>
        </div>
        <button
          onClick={() => onSend(form)}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 9,
            border: 'none',
            background: `linear-gradient(135deg,${C.brand},${C.brandD})`,
            color: '#fff',
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: `0 4px 14px ${C.brand}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>📤</span> Hozir yuborish · ~
          {fmt(estReach)} qabul qiluvchi
        </button>
      </div>
    </div>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MilliyGoNotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS)
  const [selected, setSelected] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const [typeF, setTypeF] = useState('Barcha')
  const [statusF, setStatusF] = useState('Barcha')
  const [catF, setCatF] = useState('Barcha')
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('all')
  const [page, setPage] = useState(1)
  const [livePaused, setLivePaused] = useState(false)
  const [feedItems, setFeedItems] = useState(LIVE_FEED)
  const PAGE = 7

  // Simulate live feed
  useEffect(() => {
    if (livePaused) return
    const t = setInterval(() => {
      setFeedItems(prev => {
        const newItem = {
          id: Date.now(),
          text: [
            'Yangi push yuborildi',
            'Token yangilandi',
            'Delivery hisoboti keldi',
            'Foydalanuvchi xabardorlik ochdi',
          ][Math.floor(Math.random() * 4)],
          icon: ['📤', '🔄', '📊', '👁'][Math.floor(Math.random() * 4)],
          color: [C.brand, C.teal, C.emerald, C.sky][
            Math.floor(Math.random() * 4)
          ],
          ago: 0,
        }
        return [newItem, ...prev.slice(0, 11)]
      })
    }, 4000)
    return () => clearInterval(t)
  }, [livePaused])

  const filtered = useMemo(() => {
    let d = [...notifs]
    if (typeF !== 'Barcha') d = d.filter(n => n.type === typeF)
    if (statusF !== 'Barcha') d = d.filter(n => n.status === statusF)
    if (catF !== 'Barcha') d = d.filter(n => n.category === catF)
    if (tab === 'scheduled') d = d.filter(n => n.status === 'Scheduled')
    if (tab === 'draft') d = d.filter(n => n.status === 'Draft')
    if (tab === 'failed') d = d.filter(n => n.status === 'Failed')
    if (q.trim()) {
      const lq = q.toLowerCase()
      d = d.filter(
        n =>
          n.title.toLowerCase().includes(lq) ||
          n.id.toLowerCase().includes(lq) ||
          n.body.toLowerCase().includes(lq),
      )
    }
    return d
  }, [notifs, typeF, statusF, catF, tab, q])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))
  const paged = filtered.slice((page - 1) * PAGE, page * PAGE)

  // KPIs
  const totalSent = notifs.reduce((s, n) => s + n.sent, 0)
  const totalDelivered = notifs.reduce((s, n) => s + n.delivered, 0)
  const totalOpened = notifs.reduce((s, n) => s + n.opened, 0)
  const totalClicked = notifs.reduce((s, n) => s + n.clicked, 0)
  const totalFailed = notifs.reduce((s, n) => s + n.failed, 0)
  const scheduled = notifs.filter(n => n.status === 'Scheduled').length
  const delivRate = totalSent
    ? ((totalDelivered / totalSent) * 100).toFixed(1)
    : 0
  const openRate = totalDelivered
    ? ((totalOpened / totalDelivered) * 100).toFixed(1)
    : 0
  const ctr = totalOpened ? ((totalClicked / totalOpened) * 100).toFixed(1) : 0
  const spark = [42, 58, 48, 72, 64, 88, 76, 94, 82, 108, 96, 120]

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
        .nrow:hover{background:#EEF2FF !important;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes sendingPulse{0%,100%{box-shadow:0 0 0 0 #F9731644}50%{box-shadow:0 0 0 6px #F9731600}}
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
              Bildirishnomalar
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Push · SMS · Email · In-App · Webhook — barcha kanallar boshqaruvi
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
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
              📋 Shablonlar
            </button>
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
              onClick={() => {
                setIsNew(true)
                setSelected({
                  title: '',
                  body: '',
                  type: 'Push',
                  category: 'Marketing',
                  status: 'Draft',
                  target: 'Barcha',
                  priority: 'Medium',
                  deepLink: '',
                  image: false,
                  sound: true,
                  badge: true,
                  scheduled: null,
                  tags: [],
                  sent: 0,
                  delivered: 0,
                  opened: 0,
                  clicked: 0,
                  failed: 0,
                })
              }}
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
              ✨ Yangi bildirishnoma
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
              label: 'Jami yuborildi',
              val: fmtM(totalSent),
              sub: 'barcha kanallar',
              color: C.brand,
              icon: '📤',
              spark: spark,
            },
            {
              label: 'Yetkazish darajasi',
              val: `${delivRate}%`,
              sub: `${fmtM(totalDelivered)} qurilma`,
              color: C.emerald,
              icon: '✅',
              spark: spark.map(v => v * 0.95),
            },
            {
              label: 'Ochilish darajasi',
              val: `${openRate}%`,
              sub: `${fmtM(totalOpened)} ochdi`,
              color: C.sky,
              icon: '👁',
              spark: spark.map(v => v * 0.6),
            },
            {
              label: 'CTR',
              val: `${ctr}%`,
              sub: `${fmtM(totalClicked)} bosdi`,
              color: C.blue,
              icon: '👆',
              spark: spark.map(v => v * 0.3),
            },
            {
              label: 'Rejalashgan',
              val: scheduled,
              sub: 'kutilmoqda',
              color: C.amber,
              icon: '📅',
              spark: null,
            },
            {
              label: 'Xatolar',
              val: fmtM(totalFailed),
              sub: 'yetkazilmadi',
              color: totalFailed > 1000 ? C.red : C.muted,
              icon: '⚠️',
              spark: null,
            },
          ].map(({ label, val, sub, color, icon, spark: sp }, i) => (
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
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
                    fontSize: 16,
                  }}
                >
                  {icon}
                </div>
                {sp && <Sparkline data={sp} color={color} w={68} h={26} />}
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

        {/* ═══ ANALYTICS + LIVE FEED ═══════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 280px',
            gap: 12,
            marginBottom: 14,
          }}
        >
          {/* Channel breakdown */}
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
                fontSize: 13,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              📡 Kanal bo'yicha
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.entries(NOTIF_TYPE).map(([k, v]) => {
                const cnt = notifs.filter(n => n.type === k).length
                const sent = notifs
                  .filter(n => n.type === k)
                  .reduce((s, n) => s + n.sent, 0)
                const opened = notifs
                  .filter(n => n.type === k)
                  .reduce((s, n) => s + n.opened, 0)
                const rate = sent ? ((opened / sent) * 100).toFixed(0) : 0
                const pct = notifs.length
                  ? Math.round((cnt / notifs.length) * 100)
                  : 0
                return (
                  <div
                    key={k}
                    onClick={() => setTypeF(typeF === k ? 'Barcha' : k)}
                    style={{
                      cursor: 'pointer',
                      opacity: typeF !== 'Barcha' && typeF !== k ? 0.4 : 1,
                      transition: 'opacity .2s',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            background: v.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 16,
                          }}
                        >
                          {v.icon}
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: C.text,
                            }}
                          >
                            {v.label}
                          </div>
                          <div style={{ fontSize: 9, color: C.muted }}>
                            {cnt} ta · {fmtM(sent)} yuborildi
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: v.color,
                          }}
                        >
                          {rate}%
                        </div>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          open rate
                        </div>
                      </div>
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
                          background: v.color,
                          borderRadius: 99,
                          transition: 'width .5s',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category + templates */}
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
                fontSize: 13,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              🗂 Toifa va shablonlar
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 7,
                marginBottom: 14,
              }}
            >
              {Object.entries(NOTIF_CAT).map(([k, v]) => {
                const cnt = notifs.filter(n => n.category === k).length
                const isSel = catF === k
                return (
                  <div
                    key={k}
                    onClick={() => setCatF(isSel ? 'Barcha' : k)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '8px 10px',
                      borderRadius: 9,
                      border: `1px solid ${isSel ? v.color : C.border}`,
                      background: isSel ? v.color + '10' : C.light,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{v.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: isSel ? v.color : C.text,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {v.label}
                      </div>
                      <div style={{ fontSize: 9, color: C.muted }}>
                        {cnt} ta
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.text,
                  marginBottom: 8,
                }}
              >
                ⚡ Tez shablonlar
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {TEMPLATES.slice(0, 4).map(t => {
                  const tc = NOTIF_TYPE[t.type] || NOTIF_TYPE.Push
                  const cc = NOTIF_CAT[t.category] || NOTIF_CAT.System
                  return (
                    <div
                      key={t.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '7px 8px',
                        borderRadius: 7,
                        background: C.light,
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{cc.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {t.name}
                        </div>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          {fmtM(t.uses)} foydalanish · {t.cr}% CR
                        </div>
                      </div>
                      <span style={{ fontSize: 12 }}>{tc.icon}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Live feed */}
          <div
            style={{
              background: C.dark2,
              borderRadius: 14,
              padding: '16px',
              border: `1px solid #334155`,
              boxShadow: '0 1px 4px rgba(0,0,0,.1)',
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
                <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>
                  ⚡ Jonli lenta
                </div>
                <div style={{ fontSize: 10, color: '#64748B', marginTop: 1 }}>
                  Real vaqt hodisalari
                </div>
              </div>
              <button
                onClick={() => setLivePaused(p => !p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: `1px solid #334155`,
                  background: livePaused ? '#1E293B' : 'transparent',
                  color: livePaused ? '#60A5FA' : '#64748B',
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {livePaused ? '▶ Davom' : "⏸ To'xtat"}
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                maxHeight: 360,
                overflowY: 'auto',
              }}
            >
              {feedItems.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    animation: `slideIn .3s ease ${i === 0 ? 0.05 : 0}s both`,
                    opacity: i > 8 ? Math.max(0.3, 1 - (i - 8) * 0.12) : 1,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: item.color + '22',
                      border: `1px solid ${item.color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: '#CBD5E1',
                        lineHeight: 1.4,
                        wordBreak: 'break-word',
                      }}
                    >
                      {item.text}
                    </div>
                    <div
                      style={{ fontSize: 9, color: '#475569', marginTop: 2 }}
                    >
                      {timeAgo(item.ago)} oldin
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid #1E293B',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: livePaused ? C.amber : C.emerald,
                  animation: livePaused ? 'none' : 'pulse 1.5s infinite',
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: livePaused ? '#D97706' : '#4ADE80',
                  fontWeight: 600,
                }}
              >
                {livePaused ? "To'xtatildi" : 'Jonli kuzatuv'}
              </span>
              <span
                style={{ fontSize: 9, color: '#475569', marginLeft: 'auto' }}
              >
                {feedItems.length} hodisa
              </span>
            </div>
          </div>
        </div>

        {/* ═══ FILTERS + TABS ══════════════════════════════════════════════ */}
        <div
          style={{
            background: C.card,
            borderRadius: 12,
            padding: '12px 16px',
            border: `1px solid ${C.border}`,
            marginBottom: 12,
            boxShadow: '0 1px 4px rgba(0,0,0,.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 2,
              marginBottom: 12,
              flexWrap: 'wrap',
            }}
          >
            {[
              ['all', 'Barcha', '', ''],
              ['scheduled', 'Rejalashgan', '📅', C.blue],
              ['draft', 'Qoralamalar', '✏️', C.muted],
              ['failed', 'Xatolar', '⚠️', C.red],
            ].map(([k, l, icon, col]) => {
              const cnt =
                k === 'all'
                  ? notifs.length
                  : k === 'scheduled'
                    ? notifs.filter(n => n.status === 'Scheduled').length
                    : k === 'draft'
                      ? notifs.filter(n => n.status === 'Draft').length
                      : notifs.filter(n => n.status === 'Failed').length
              return (
                <button
                  key={k}
                  onClick={() => {
                    setTab(k)
                    setPage(1)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: `1px solid ${tab === k ? C.brand : C.border}`,
                    background: tab === k ? C.brandL : C.card,
                    color: tab === k ? C.brandD : C.muted,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  {icon && <span>{icon}</span>}
                  {l}
                  <span
                    style={{
                      background: tab === k ? C.brand : C.light,
                      color: tab === k ? '#fff' : C.muted,
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '1px 7px',
                      borderRadius: 99,
                    }}
                  >
                    {cnt}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <Dropdown
              label="Kanal"
              value={typeF}
              onChange={v => {
                setTypeF(v)
                setPage(1)
              }}
              options={['Barcha', ...Object.keys(NOTIF_TYPE)]}
              accent={C.brand}
            />
            <Dropdown
              label="Holat"
              value={statusF}
              onChange={v => {
                setStatusF(v)
                setPage(1)
              }}
              options={['Barcha', ...Object.keys(NOTIF_STATUS)]}
              accent={C.brand}
            />
            <Dropdown
              label="Toifa"
              value={catF}
              onChange={v => {
                setCatF(v)
                setPage(1)
              }}
              options={['Barcha', ...Object.keys(NOTIF_CAT)]}
              accent={C.brand}
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
                  placeholder="Sarlavha, ID, matn..."
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
                <strong style={{ color: C.text }}>{filtered.length}</strong> ta
              </span>
              {(typeF !== 'Barcha' ||
                statusF !== 'Barcha' ||
                catF !== 'Barcha' ||
                q) && (
                <button
                  onClick={() => {
                    setTypeF('Barcha')
                    setStatusF('Barcha')
                    setCatF('Barcha')
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

        {/* ═══ TABLE + COMPOSE PANEL ═══════════════════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selected || isNew ? '1fr 440px' : '1fr',
            gap: 14,
          }}
        >
          <div
            style={{
              background: C.card,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,.04)',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  '90px 1.6fr 90px 100px 120px 1fr 130px 70px',
                borderBottom: `2px solid ${C.border}`,
                background: '#FAFAFA',
              }}
            >
              {[
                'ID',
                'Sarlavha / Matn',
                'Kanal',
                'Toifa',
                'Manzil',
                'Yetkazish',
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
                style={{ padding: '52px', textAlign: 'center', color: C.muted }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>🔔</div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  Bildirishnoma topilmadi
                </div>
              </div>
            ) : (
              paged.map(n => {
                const isSel = selected?.id === n.id && !isNew
                const tc = NOTIF_TYPE[n.type] || NOTIF_TYPE.Push
                const cc = NOTIF_CAT[n.category] || NOTIF_CAT.System
                const tgt = TARGET_SEG[n.target] || TARGET_SEG['Barcha']
                const isSending = n.status === 'Sending'
                const delivPct =
                  n.sent > 0 ? ((n.delivered / n.sent) * 100).toFixed(0) : 0
                const openPct =
                  n.delivered > 0
                    ? ((n.opened / n.delivered) * 100).toFixed(0)
                    : 0

                return (
                  <div
                    key={n.id}
                    className="nrow"
                    onClick={() => {
                      setIsNew(false)
                      setSelected(isSel ? null : n)
                    }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '90px 1.6fr 90px 100px 120px 1fr 130px 70px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      background: isSel
                        ? C.brandL
                        : isSending
                          ? '#FFF7ED'
                          : 'transparent',
                      borderLeft: `3px solid ${isSel ? C.brand : isSending ? C.orange : 'transparent'}`,
                      transition: 'background .12s',
                      animation: 'fadeIn .2s ease both',
                    }}
                  >
                    {/* ID + Priority */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 3,
                        }}
                      >
                        <PriorityDot p={n.priority} />
                        <span
                          style={{
                            fontFamily: 'monospace',
                            fontSize: 9,
                            fontWeight: 800,
                            color: isSel ? C.brandD : C.muted,
                          }}
                        >
                          {n.id}
                        </span>
                      </div>
                      <div style={{ fontSize: 9, color: C.muted2 }}>
                        {n.sentAt
                          ? n.sentAt.split(' ')[1]
                          : n.scheduled?.split('T')[1] || '—'}
                      </div>
                    </div>

                    {/* Title + body */}
                    <div style={{ padding: '13px 10px', minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: isSel ? C.brandD : C.text,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginBottom: 2,
                        }}
                      >
                        {n.title}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: C.muted,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily:
                            n.type === 'Webhook' ? 'monospace' : 'inherit',
                        }}
                      >
                        {n.body.length > 60
                          ? n.body.slice(0, 60) + '…'
                          : n.body}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: 4,
                          marginTop: 4,
                          flexWrap: 'wrap',
                        }}
                      >
                        {(n.tags || []).slice(0, 3).map(t => (
                          <span
                            key={t}
                            style={{
                              fontSize: 8,
                              color: C.brand,
                              background: C.brandL,
                              padding: '1px 6px',
                              borderRadius: 99,
                              fontWeight: 600,
                            }}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Type */}
                    <div style={{ padding: '13px 8px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: tc.bg,
                          color: tc.color,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 7,
                        }}
                      >
                        {tc.icon} {n.type}
                      </span>
                    </div>

                    {/* Category */}
                    <div style={{ padding: '13px 8px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: cc.color + '10',
                          color: cc.color,
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 7,
                        }}
                      >
                        {cc.icon} {cc.label}
                      </span>
                    </div>

                    {/* Target */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 1,
                        }}
                      >
                        <span style={{ fontSize: 13 }}>{tgt.icon}</span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {n.target}
                        </span>
                      </div>
                      {n.sent > 0 && (
                        <div style={{ fontSize: 9, color: C.muted }}>
                          {fmtM(n.sent)} qabul qiluvchi
                        </div>
                      )}
                    </div>

                    {/* Delivery mini stats */}
                    <div style={{ padding: '13px 10px' }}>
                      {n.sent === 0 ? (
                        <span style={{ fontSize: 10, color: C.muted2 }}>—</span>
                      ) : (
                        <>
                          <div
                            style={{ display: 'flex', gap: 6, marginBottom: 4 }}
                          >
                            <span
                              style={{
                                fontSize: 9,
                                color: C.emerald,
                                fontWeight: 700,
                              }}
                            >
                              ✓{delivPct}%
                            </span>
                            <span
                              style={{
                                fontSize: 9,
                                color: C.sky,
                                fontWeight: 700,
                              }}
                            >
                              👁{openPct}%
                            </span>
                            {n.failed > 0 && (
                              <span
                                style={{
                                  fontSize: 9,
                                  color: C.red,
                                  fontWeight: 700,
                                }}
                              >
                                ✗{fmtM(n.failed)}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              height: 4,
                              background: C.light,
                              borderRadius: 99,
                              overflow: 'hidden',
                              width: '100%',
                            }}
                          >
                            <div style={{ height: '100%', display: 'flex' }}>
                              <div
                                style={{
                                  width: `${(n.clicked / n.sent) * 100}%`,
                                  background: C.brand,
                                  minWidth: n.clicked ? 2 : 0,
                                }}
                              />
                              <div
                                style={{
                                  width: `${((n.opened - n.clicked) / n.sent) * 100}%`,
                                  background: C.sky + 'BB',
                                  minWidth: n.opened > n.clicked ? 2 : 0,
                                }}
                              />
                              <div
                                style={{
                                  width: `${((n.delivered - n.opened) / n.sent) * 100}%`,
                                  background: C.emerald + '66',
                                  minWidth: n.delivered > n.opened ? 2 : 0,
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Status */}
                    <div style={{ padding: '13px 8px' }}>
                      <StatusBadge s={n.status} />
                      {isSending && (
                        <div
                          style={{
                            fontSize: 9,
                            color: C.orange,
                            fontWeight: 600,
                            marginTop: 4,
                            animation: 'pulse 1.2s infinite',
                          }}
                        >
                          ↑ {Math.round((n.delivered / n.sent) * 100)}% yetdi
                        </div>
                      )}
                    </div>

                    {/* Action */}
                    <div
                      style={{ padding: '13px 8px', display: 'flex', gap: 4 }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setIsNew(false)
                          setSelected(n)
                        }}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          border: `1px solid ${C.border}`,
                          background: C.card,
                          cursor: 'pointer',
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✏️
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
                background: '#FAFAFA',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 12, color: C.muted }}>
                Jami{' '}
                <strong style={{ color: C.text }}>{filtered.length}</strong> ta
                · {Math.min((page - 1) * PAGE + 1, filtered.length)}–
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

          {/* Compose / Edit Panel */}
          {(selected || isNew) && (
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
              <ComposePanel
                notif={selected}
                isNew={isNew}
                onClose={() => {
                  setSelected(null)
                  setIsNew(false)
                }}
                onSend={form => {
                  if (isNew) {
                    const nw = {
                      ...form,
                      id: `NTF-${8821 + notifs.length}`,
                      sentAt: new Date().toLocaleString('uz'),
                      status: 'Sending',
                    }
                    setNotifs(prev => [nw, ...prev])
                    setSelected(nw)
                    setIsNew(false)
                  } else {
                    const upd = {
                      ...form,
                      status: 'Sent',
                      sentAt: new Date().toLocaleString('uz'),
                    }
                    setNotifs(prev =>
                      prev.map(n => (n.id === form.id ? upd : n)),
                    )
                    setSelected(upd)
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* ═══ BOTTOM: TEMPLATES + SEND SUMMARY ═══════════════════════════ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 12,
            marginTop: 14,
          }}
        >
          {/* Templates */}
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
                marginBottom: 14,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>
                📋 Bildirishnoma shablonlari
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
                + Yangi shablon
              </button>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 8,
              }}
            >
              {TEMPLATES.map(t => {
                const tc = NOTIF_TYPE[t.type] || NOTIF_TYPE.Push
                const cc = NOTIF_CAT[t.category] || NOTIF_CAT.System
                return (
                  <div
                    key={t.id}
                    style={{
                      background: C.light,
                      borderRadius: 10,
                      padding: '12px',
                      border: `1px solid ${C.border}`,
                      cursor: 'pointer',
                      transition: 'all .2s',
                    }}
                    onClick={() => {
                      setIsNew(true)
                      setSelected({
                        title: t.name,
                        body: '',
                        type: t.type,
                        category: t.category,
                        status: 'Draft',
                        target: 'Barcha',
                        priority: 'Medium',
                        deepLink: '',
                        image: false,
                        sound: true,
                        badge: true,
                        scheduled: null,
                        tags: [],
                        sent: 0,
                        delivered: 0,
                        opened: 0,
                        clicked: 0,
                        failed: 0,
                      })
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
                      <span style={{ fontSize: 22 }}>{cc.icon}</span>
                      <span style={{ fontSize: 13 }}>{tc.icon}</span>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: C.text,
                        lineHeight: 1.3,
                        marginBottom: 4,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{ fontSize: 9, color: C.muted, marginBottom: 8 }}
                    >
                      {fmtM(t.uses)} foydalanish
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 9, color: C.muted }}>CR:</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color:
                            t.cr > 70 ? C.green : t.cr > 40 ? C.amber : C.muted,
                        }}
                      >
                        {t.cr}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: C.border,
                        borderRadius: 99,
                        overflow: 'hidden',
                        marginTop: 5,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${t.cr}%`,
                          background:
                            t.cr > 70 ? C.green : t.cr > 40 ? C.amber : C.muted,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Send summary + rate breakdown */}
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
                fontSize: 13,
                fontWeight: 800,
                color: C.text,
                marginBottom: 14,
              }}
            >
              📊 Umumiy yetkazish statistikasi
            </div>

            {/* Overall funnel */}
            <div
              style={{
                background: C.dark2,
                borderRadius: 12,
                padding: '14px',
                marginBottom: 14,
              }}
            >
              <DeliveryBar
                sent={totalSent}
                delivered={totalDelivered}
                opened={totalOpened}
                clicked={totalClicked}
                failed={totalFailed}
              />
            </div>

            {/* Metric grid */}
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
                  l: 'Yetkazish darajasi',
                  v: `${delivRate}%`,
                  color: C.emerald,
                  icon: '✅',
                },
                {
                  l: 'Ochilish darajasi',
                  v: `${openRate}%`,
                  color: C.sky,
                  icon: '👁',
                },
                {
                  l: 'CTR (bosildi)',
                  v: `${ctr}%`,
                  color: C.brand,
                  icon: '👆',
                },
                {
                  l: 'Xato darajasi',
                  v: `${totalSent ? ((totalFailed / totalSent) * 100).toFixed(1) : 0}%`,
                  color: C.red,
                  icon: '⚠️',
                },
              ].map(({ l, v, color, icon }) => (
                <div
                  key={l}
                  style={{
                    background: color + '0D',
                    borderRadius: 10,
                    padding: '10px 12px',
                    border: `1px solid ${color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 900,
                        color,
                        letterSpacing: -0.4,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.muted,
                        fontWeight: 600,
                        marginTop: 1,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's schedule */}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.text,
                  marginBottom: 8,
                }}
              >
                📅 Bugungi rejalashtirish
              </div>
              {notifs
                .filter(n => n.status === 'Scheduled')
                .slice(0, 3)
                .map(n => {
                  const tc = NOTIF_TYPE[n.type] || NOTIF_TYPE.Push
                  return (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 7,
                        padding: '7px 10px',
                        background: C.light,
                        borderRadius: 8,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{tc.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: C.text,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {n.title}
                        </div>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          {n.scheduled}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: C.blue,
                          background: C.blueL || '#EFF6FF',
                          padding: '2px 8px',
                          borderRadius: 99,
                        }}
                      >
                        📅
                      </span>
                    </div>
                  )
                })}
              {notifs.filter(n => n.status === 'Scheduled').length === 0 && (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '16px',
                    color: C.muted2,
                    fontSize: 11,
                  }}
                >
                  Hozircha rejalashtirilgan xabar yo'q
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
