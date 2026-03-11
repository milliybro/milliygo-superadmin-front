import { useState, useMemo, useRef, useEffect } from 'react'

const C = {
  brand: '#6366F1',
  brandDark: '#4338CA',
  brandLight: '#EEF2FF',
  brandBorder: '#C7D2FE',
  orange: '#F97316',
  emerald: '#059669',
  blue: '#2563EB',
  sky: '#0EA5E9',
  red: '#DC2626',
  rose: '#F43F5E',
  amber: '#D97706',
  violet: '#7C3AED',
  teal: '#0D9488',
  pink: '#EC4899',
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

const PRIORITY = {
  Critical: {
    bg: '#FFF1F2',
    color: '#BE123C',
    dot: '#F43F5E',
    label: 'Kritik',
    order: 0,
  },
  High: {
    bg: '#FFF7ED',
    color: '#C2410C',
    dot: '#FB923C',
    label: 'Yuqori',
    order: 1,
  },
  Medium: {
    bg: '#FFFBEB',
    color: '#B45309',
    dot: '#FBBF24',
    label: "O'rta",
    order: 2,
  },
  Low: {
    bg: '#F0FDF4',
    color: '#15803D',
    dot: '#4ADE80',
    label: 'Past',
    order: 3,
  },
}

const STATUS_T = {
  Open: { bg: '#EFF6FF', color: '#1D4ED8', dot: '#60A5FA', label: 'Ochiq' },
  InProgress: {
    bg: '#F5F3FF',
    color: '#6D28D9',
    dot: '#A78BFA',
    label: 'Jarayonda',
  },
  Pending: {
    bg: '#FFFBEB',
    color: '#B45309',
    dot: '#FBBF24',
    label: 'Javob kutilmoqda',
  },
  Resolved: {
    bg: '#F0FDF4',
    color: '#15803D',
    dot: '#4ADE80',
    label: 'Hal qilindi',
  },
  Closed: { bg: '#F1F5F9', color: '#64748B', dot: '#94A3B8', label: 'Yopildi' },
  Escalated: {
    bg: '#FFF1F2',
    color: '#BE123C',
    dot: '#F43F5E',
    label: 'Eskalatsiya',
  },
}

const CATEGORY = {
  "To'lov muammosi": { icon: '💳', color: C.blue },
  'Yetkazib berish': { icon: '🚚', color: C.orange },
  'Buyurtma bekor': { icon: '❌', color: C.red },
  'Texnik nosozlik': { icon: '🔧', color: C.violet },
  'Hisobga kirish': { icon: '🔐', color: C.indigo },
  'Kuryer shikoyati': { icon: '🛵', color: C.amber },
  "Refund so'rovi": { icon: '↩️', color: '#8B5CF6' },
  Boshqa: { icon: '📋', color: C.muted },
}

const SERVICE = {
  Food: { icon: '🍔', color: C.orange, bg: '#FFF7ED' },
  Market: { icon: '🛒', color: C.emerald, bg: '#F0FDF4' },
  Taxi: { icon: '🚖', color: C.violet, bg: '#F5F3FF' },
  Cargo: { icon: '📦', color: C.sky, bg: '#F0F9FF' },
  Umumiy: { icon: '🏢', color: C.muted, bg: C.light },
}

const AGENTS = [
  {
    id: 'AG-01',
    name: 'Kamola Nazarova',
    avatar: 'KN',
    status: 'Online',
    tickets: 12,
    resolved: 8,
    rating: 4.9,
    specialty: "To'lov",
  },
  {
    id: 'AG-02',
    name: 'Bobur Toshmatov',
    avatar: 'BT',
    status: 'Online',
    tickets: 9,
    resolved: 6,
    rating: 4.7,
    specialty: 'Yetkazish',
  },
  {
    id: 'AG-03',
    name: 'Zilola Rahimova',
    avatar: 'ZR',
    status: 'Busy',
    tickets: 15,
    resolved: 10,
    rating: 4.8,
    specialty: 'Texnik',
  },
  {
    id: 'AG-04',
    name: 'Jasur Ergashev',
    avatar: 'JE',
    status: 'Away',
    tickets: 5,
    resolved: 4,
    rating: 4.6,
    specialty: 'Umumiy',
  },
  {
    id: 'AG-05',
    name: 'Nodira Yusupova',
    avatar: 'NY',
    status: 'Offline',
    tickets: 0,
    resolved: 18,
    rating: 4.9,
    specialty: 'Refund',
  },
]

const TICKETS = [
  {
    id: 'TKT-5521',
    orderId: 'MGO-88421',
    service: 'Food',
    customer: 'Anvar Rustamov',
    phone: '+998 90 123 45 67',
    avatar: 'AR',
    category: "To'lov muammosi",
    priority: 'Critical',
    status: 'Escalated',
    agent: 'KN',
    agentName: 'Kamola N.',
    subject: "To'lov ikki marta yechildi — qaytarilmadi",
    created: '2025-10-30 14:26',
    updated: '2025-10-30 14:55',
    sla: 30,
    slaPassed: 44,
    city: 'Tashkent',
    messages: [
      {
        from: 'customer',
        text: "Assalomu alaykum! Mening kartamdan 124 500 so'm ikki marta yechildi. Iltimos, bitta to'lovni qaytaring!",
        time: '14:26',
        read: true,
      },
      {
        from: 'agent',
        text: "Salom Anvar aka! Muammoingiz uchun uzr so'raymiz. Tranzaksiyalaringizni tekshirib ko'rmoqdamiz.",
        time: '14:32',
        read: true,
      },
      {
        from: 'customer',
        text: "Tez bo'ling iltimos, menga bu pul kerak!",
        time: '14:45',
        read: true,
      },
      {
        from: 'agent',
        text: 'Ikkinchi tranzaksiya tasdiqlandi — 124 500 UZS 3–5 ish kuni ichida qaytariladi.',
        time: '14:55',
        read: false,
      },
    ],
  },
  {
    id: 'TKT-5520',
    orderId: 'MGO-88419',
    service: 'Taxi',
    customer: 'Jasur Aliev',
    phone: '+998 93 998 11 22',
    avatar: 'JA',
    category: 'Yetkazib berish',
    priority: 'High',
    status: 'InProgress',
    agent: 'BT',
    agentName: 'Bobur T.',
    subject: "Haydovchi 20 daqiqa kechikdi, tushuntirish yo'q",
    created: '2025-10-30 14:06',
    updated: '2025-10-30 14:40',
    sla: 60,
    slaPassed: 34,
    city: 'Tashkent',
    messages: [
      {
        from: 'customer',
        text: 'Haydovchim 20 daqiqa kechikdi va hech qanday xabar bermadi!',
        time: '14:06',
        read: true,
      },
      {
        from: 'agent',
        text: "Jasur aka, kechirasiz! Haydovchi bilan bog'lanib ahvolni aniqlaymiz.",
        time: '14:15',
        read: true,
      },
      {
        from: 'customer',
        text: "Allaqachon taksiga tushdim, lekin pul to'lashni istamayman.",
        time: '14:35',
        read: false,
      },
    ],
  },
  {
    id: 'TKT-5519',
    orderId: 'MGO-88416',
    service: 'Market',
    customer: "Sherzod Xo'jayev",
    phone: '+998 94 555 66 77',
    avatar: 'SX',
    category: 'Buyurtma bekor',
    priority: 'Medium',
    status: 'Pending',
    agent: 'ZR',
    agentName: 'Zilola R.',
    subject: "Bekor qilish so'rovi — mahsulot yetib kelmadi",
    created: '2025-10-30 13:48',
    updated: '2025-10-30 14:00',
    sla: 120,
    slaPassed: 42,
    city: 'Tashkent',
    messages: [
      {
        from: 'customer',
        text: "Buyurtmam 2 soatdan beri yo'lda. Iltimos bekor qiling va pulimni qaytaring.",
        time: '13:48',
        read: true,
      },
      {
        from: 'agent',
        text: 'Sherzod aka, buyurtmangiz holati tekshirilmoqda. 10 daqiqada javob beramiz.',
        time: '13:55',
        read: true,
      },
    ],
  },
  {
    id: 'TKT-5518',
    orderId: 'MGO-88413',
    service: 'Market',
    customer: 'Gulnora Ibragimova',
    phone: '+998 97 333 44 55',
    avatar: 'GI',
    category: 'Texnik nosozlik',
    priority: 'High',
    status: 'Open',
    agent: null,
    agentName: null,
    subject: 'Ilova ochilmayapti — iOS 17.2 versiyada xato',
    created: '2025-10-30 13:32',
    updated: '2025-10-30 13:32',
    sla: 240,
    slaPassed: 28,
    city: 'Namangan',
    messages: [
      {
        from: 'customer',
        text: 'Ilovani yangilaganimdan keyin ochilmayapti. Telefon: iPhone 14, iOS 17.2. Xato kodi: 0x8A2.',
        time: '13:32',
        read: false,
      },
    ],
  },
  {
    id: 'TKT-5517',
    orderId: 'MGO-88408',
    service: 'Taxi',
    customer: 'Zulfiya Rahimova',
    phone: '+998 97 100 22 33',
    avatar: 'ZR',
    category: 'Kuryer shikoyati',
    priority: 'Critical',
    status: 'Escalated',
    agent: 'KN',
    agentName: 'Kamola N.',
    subject: 'Haydovchi madaniyatsiz muomala qildi',
    created: '2025-10-29 12:40',
    updated: '2025-10-30 09:10',
    sla: 60,
    slaPassed: 200,
    city: 'Tashkent',
    messages: [
      {
        from: 'customer',
        text: "Kechagi haydovchi menga juda yomon muomala qildi. Uni ogohlantirish yoki ishdan bo'shatish kerak.",
        time: '12:40',
        read: true,
      },
      {
        from: 'agent',
        text: "Zulfiya opa, bu muammo uchun chuqur uzr so'raymiz. Haydovchi haqida rasmiy shikoyat qabul qilindi.",
        time: '09:10',
        read: false,
      },
    ],
  },
  {
    id: 'TKT-5516',
    orderId: 'MGO-88405',
    service: 'Food',
    customer: 'Shohruh Qodirov',
    phone: '+998 91 500 11 22',
    avatar: 'SQ',
    category: "Refund so'rovi",
    priority: 'Medium',
    status: 'Resolved',
    agent: 'NY',
    agentName: 'Nodira Y.',
    subject: "Ovqat sovuq keldi — 50% chegirma so'rayman",
    created: '2025-10-29 11:45',
    updated: '2025-10-29 14:20',
    sla: 120,
    slaPassed: 115,
    city: "Qo'qon",
    messages: [
      {
        from: 'customer',
        text: 'Pizzam mutlaqo sovuq keldi. Rasmini yuborayapman.',
        time: '11:45',
        read: true,
      },
      {
        from: 'agent',
        text: "Shohruh aka, rasm uchun rahmat. Hamkorga xabar berdik. Bonusni tekshirib ko'ring.",
        time: '12:30',
        read: true,
      },
      {
        from: 'customer',
        text: 'Rahmat, bonus maqbul.',
        time: '14:20',
        read: true,
      },
      {
        from: 'system',
        text: 'Tiket hal qilindi ✓',
        time: '14:20',
        read: true,
      },
    ],
  },
  {
    id: 'TKT-5515',
    orderId: 'MGO-88403',
    service: 'Food',
    customer: 'Mirzo Ergashev',
    phone: '+998 97 200 33 44',
    avatar: 'ME',
    category: "To'lov muammosi",
    priority: 'Low',
    status: 'Closed',
    agent: 'JE',
    agentName: 'Jasur E.',
    subject: 'Chek yuborilmadi email manziliga',
    created: '2025-10-29 11:10',
    updated: '2025-10-29 15:00',
    sla: 480,
    slaPassed: 230,
    city: 'Samarqand',
    messages: [
      {
        from: 'customer',
        text: "To'lovdan keyin email chek kelmadi.",
        time: '11:10',
        read: true,
      },
      {
        from: 'agent',
        text: 'Spam papkangizni tekshiring. Qayta yuborildi.',
        time: '11:45',
        read: true,
      },
      {
        from: 'customer',
        text: 'Topildim, rahmat!',
        time: '15:00',
        read: true,
      },
      { from: 'system', text: 'Tiket yopildi ✓', time: '15:00', read: true },
    ],
  },
  {
    id: 'TKT-5514',
    orderId: 'MGO-88402',
    service: 'Cargo',
    customer: 'Nodir Botirov',
    phone: '+998 90 600 77 88',
    avatar: 'NB',
    category: 'Yetkazib berish',
    priority: 'High',
    status: 'Open',
    agent: null,
    agentName: null,
    subject: "Yuk zararlanib yetib keldi — sug'urta talab",
    created: '2025-10-28 17:30',
    updated: '2025-10-28 17:30',
    sla: 60,
    slaPassed: 780,
    city: 'Namangan',
    messages: [
      {
        from: 'customer',
        text: "Yukimning bir qismi singan holda yetib keldi. Sug'urta kompensatsiyasi talab qilaman. Rasm yuborayapman.",
        time: '17:30',
        read: false,
      },
    ],
  },
  {
    id: 'TKT-5513',
    orderId: 'MGO-88401',
    service: 'Market',
    customer: 'Barno Tojiboyeva',
    phone: '+998 91 700 99 00',
    avatar: 'BT2',
    category: 'Hisobga kirish',
    priority: 'Medium',
    status: 'InProgress',
    agent: 'ZR',
    agentName: 'Zilola R.',
    subject: 'Parolni unutdim — SMS kelmayapti',
    created: '2025-10-28 16:55',
    updated: '2025-10-30 10:00',
    sla: 240,
    slaPassed: 170,
    city: 'Tashkent',
    messages: [
      {
        from: 'customer',
        text: 'Parolni tiklashga urinayapman lekin SMS kelmayapti.',
        time: '16:55',
        read: true,
      },
      {
        from: 'agent',
        text: 'Barno opa, telefon raqamingizni tasdiqlang, boshqa kanal orqali yuboramiz.',
        time: '10:00',
        read: false,
      },
    ],
  },
  {
    id: 'TKT-5512',
    orderId: 'MGO-88400',
    service: 'Umumiy',
    customer: 'Eldor Mirzaev',
    phone: '+998 91 555 11 22',
    avatar: 'EM',
    category: 'Boshqa',
    priority: 'Low',
    status: 'Closed',
    agent: 'JE',
    agentName: 'Jasur E.',
    subject: 'Ilova UX haqida taklif',
    created: '2025-10-28 12:30',
    updated: '2025-10-28 18:00',
    sla: 1440,
    slaPassed: 330,
    city: 'Tashkent',
    messages: [
      {
        from: 'customer',
        text: "Buyurtma tarixini eksport qilish imkoniyatini qo'shsangiz yaxshi bo'lardi.",
        time: '12:30',
        read: true,
      },
      {
        from: 'agent',
        text: 'Eldor aka, taklifingiz uchun rahmat! Mahsulot jamoasiga yetkazamiz.',
        time: '18:00',
        read: true,
      },
      { from: 'system', text: 'Tiket yopildi ✓', time: '18:00', read: true },
    ],
  },
]

const fmt = n => new Intl.NumberFormat('uz-UZ').format(n)

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Dropdown({
  label,
  value,
  onChange,
  options,
  accent = C.brand,
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

function PriorityBadge({ p }) {
  const cfg = PRIORITY[p] || PRIORITY.Low
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
        padding: '2px 8px',
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
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  )
}
function StatusBadge({ s }) {
  const cfg = STATUS_T[s] || STATUS_T.Open
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
        padding: '2px 8px',
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
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  )
}

function Avatar({ initials, size = 32, color = C.brand }) {
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
        fontSize: size * 0.33,
        fontWeight: 800,
        color,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

function SlaBar({ sla, passed }) {
  const pct = Math.min((passed / sla) * 100, 100)
  const over = passed > sla
  const color = over ? C.red : pct > 75 ? C.amber : C.green
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 3,
        }}
      >
        <span style={{ fontSize: 9, color: C.muted, fontWeight: 600 }}>
          SLA
        </span>
        <span style={{ fontSize: 9, fontWeight: 700, color }}>
          {over ? `+${passed - sla} daq o'tdi` : `${sla - passed} daq qoldi`}
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
            width: `${pct}%`,
            background: color,
            borderRadius: 99,
            transition: 'width .4s',
          }}
        />
      </div>
    </div>
  )
}

// ── Chat Panel ────────────────────────────────────────────────────────────────
function ChatPanel({ ticket, onClose, onUpdate }) {
  const [msg, setMsg] = useState('')
  const [tab, setTab] = useState('chat')
  const [assignAgent, setAssignAgent] = useState(ticket.agent)
  const [priority, setPriority] = useState(ticket.priority)
  const [status, setStatus] = useState(ticket.status)
  const [msgs, setMsgs] = useState(ticket.messages)
  const [note, setNote] = useState('')
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [msgs, tab])

  const svc = SERVICE[ticket.service] || SERVICE.Umumiy
  const cat = CATEGORY[ticket.category] || CATEGORY['Boshqa']
  const slaCfg = PRIORITY[ticket.priority]

  const sendMsg = () => {
    if (!msg.trim()) return
    setMsgs(prev => [
      ...prev,
      {
        from: 'agent',
        text: msg,
        time: new Date().toLocaleTimeString('uz', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        read: true,
      },
    ])
    setMsg('')
  }

  const handleStatusChange = ns => {
    setStatus(ns)
    if (ns === 'Resolved' || ns === 'Closed') {
      setMsgs(prev => [
        ...prev,
        {
          from: 'system',
          text: `Tiket ${STATUS_T[ns]?.label} ✓`,
          time: new Date().toLocaleTimeString('uz', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          read: true,
        },
      ])
    }
  }

  const unread = msgs.filter(m => !m.read && m.from === 'customer').length

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
          padding: '14px 18px 12px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          background: `linear-gradient(135deg,${C.brandLight},#fff)`,
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
                gap: 6,
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 14 }}>{svc.icon}</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: svc.color,
                  background: svc.bg,
                  padding: '2px 7px',
                  borderRadius: 6,
                }}
              >
                {ticket.service}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: cat.color }}>
                {cat.icon} {ticket.category}
              </span>
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: C.text,
                letterSpacing: -0.3,
                lineHeight: 1.3,
              }}
            >
              {ticket.subject}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>
              #{ticket.id} · {ticket.created}
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
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
        {/* Badges */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 10,
          }}
        >
          <PriorityBadge p={priority} />
          <StatusBadge s={status} />
          {unread > 0 && (
            <span
              style={{
                background: C.red,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 20,
              }}
            >
              {unread} yangi xabar
            </span>
          )}
        </div>
        <SlaBar sla={ticket.sla} passed={ticket.slaPassed} />
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, marginTop: 12 }}>
          {[
            ['chat', '💬 Chat'],
            ['details', '📋 Tafsilot'],
            ['actions', '⚡ Amallar'],
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

      {/* Tab: CHAT */}
      {tab === 'chat' && (
        <>
          <div
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {/* Customer info bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: C.light,
                borderRadius: 10,
                padding: '10px 12px',
                marginBottom: 4,
              }}
            >
              <Avatar initials={ticket.avatar} size={34} color={C.blue} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.text }}>
                  {ticket.customer}
                </div>
                <div style={{ fontSize: 10, color: C.muted }}>
                  {ticket.phone} · 📍 {ticket.city}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  style={{
                    padding: '5px 10px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.blue,
                    cursor: 'pointer',
                  }}
                >
                  📞
                </button>
                <button
                  style={{
                    padding: '5px 10px',
                    borderRadius: 7,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.emerald,
                    cursor: 'pointer',
                  }}
                >
                  📧
                </button>
              </div>
            </div>

            {msgs.map((m, i) => {
              const isAgent = m.from === 'agent'
              const isSystem = m.from === 'system'
              if (isSystem)
                return (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        fontSize: 10,
                        color: C.muted,
                        background: C.light,
                        padding: '3px 10px',
                        borderRadius: 99,
                      }}
                    >
                      {m.text} · {m.time}
                    </span>
                  </div>
                )
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: isAgent ? 'row-reverse' : 'row',
                    gap: 8,
                    alignItems: 'flex-end',
                  }}
                >
                  {!isAgent && (
                    <Avatar initials={ticket.avatar} size={26} color={C.blue} />
                  )}
                  {isAgent && (
                    <Avatar
                      initials={assignAgent || 'AG'}
                      size={26}
                      color={C.brand}
                    />
                  )}
                  <div style={{ maxWidth: '75%' }}>
                    <div
                      style={{
                        background: isAgent ? C.brand : C.card,
                        color: isAgent ? '#fff' : C.text,
                        padding: '9px 12px',
                        borderRadius: isAgent
                          ? '12px 12px 4px 12px'
                          : '12px 12px 12px 4px',
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: 1.5,
                        border: isAgent ? 'none' : `1px solid ${C.border}`,
                        boxShadow: isAgent
                          ? `0 2px 8px ${C.brand}33`
                          : '0 1px 3px rgba(0,0,0,.06)',
                      }}
                    >
                      {m.text}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: C.muted,
                        marginTop: 3,
                        textAlign: isAgent ? 'right' : 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        justifyContent: isAgent ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {m.time}
                      {isAgent && (
                        <span
                          style={{
                            color: m.read ? C.brand : C.muted,
                            fontSize: 10,
                          }}
                        >
                          ✓✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px 18px',
              borderTop: `1px solid ${C.border}`,
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMsg()
                    }
                  }}
                  placeholder="Javob yozing... (Enter — yuborish)"
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 10,
                    border: `1px solid ${C.border}`,
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    border: 'none',
                    background: C.light,
                    cursor: 'pointer',
                    fontSize: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Fayl biriktirish"
                >
                  📎
                </button>
                <button
                  onClick={sendMsg}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    border: 'none',
                    background: C.brand,
                    cursor: 'pointer',
                    fontSize: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 2px 8px ${C.brand}44`,
                  }}
                >
                  <span style={{ color: '#fff', fontSize: 14 }}>➤</span>
                </button>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 6,
                marginTop: 8,
                flexWrap: 'wrap',
              }}
            >
              {[
                'Tushundim, yordam beramiz',
                "Texnik jamoa bilan bog'lanamiz",
                'Qaytarish 3-5 ish kuni',
              ].map(t => (
                <button
                  key={t}
                  onClick={() => setMsg(t)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 99,
                    border: `1px solid ${C.border}`,
                    background: C.light,
                    fontSize: 10,
                    fontWeight: 600,
                    color: C.muted,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tab: DETAILS */}
      {tab === 'details' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
          {/* Ticket meta */}
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
              Tiket ma'lumotlari
            </div>
            {[
              ['Tiket ID', ticket.id],
              ['Buyurtma', `#${ticket.orderId}`],
              ['Xizmat', ticket.service],
              ['Toifa', ticket.category],
              ['Shahar', ticket.city],
              ['Yaratilgan', ticket.created],
              ['Yangilangan', ticket.updated],
              ['SLA muddati', `${ticket.sla} daqiqa`],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 7,
                  paddingBottom: 7,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>
                  {k}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.text,
                    fontFamily:
                      k.includes('ID') || k.includes('Buyurtma')
                        ? 'monospace'
                        : 'inherit',
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Assign agent */}
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
              Agent tayinlash
            </div>
            {AGENTS.filter(a => a.status !== 'Offline').map(a => {
              const isSel = assignAgent === a.id
              const dotColor =
                a.status === 'Online'
                  ? C.green
                  : a.status === 'Busy'
                    ? C.orange
                    : C.amber
              return (
                <div
                  key={a.id}
                  onClick={() => setAssignAgent(isSel ? null : a.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 10px',
                    borderRadius: 9,
                    border: `1px solid ${isSel ? C.brand : C.border}`,
                    background: isSel ? C.brandLight : C.card,
                    cursor: 'pointer',
                    marginBottom: 6,
                    transition: 'all .15s',
                  }}
                >
                  <Avatar initials={a.avatar} size={30} color={C.brand} />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: isSel ? C.brandDark : C.text,
                      }}
                    >
                      {a.name}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, marginTop: 1 }}>
                      {a.specialty} · {a.tickets} faol tiket
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: dotColor,
                      }}
                    />
                    <span
                      style={{ fontSize: 9, fontWeight: 700, color: C.amber }}
                    >
                      ★ {a.rating}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Internal note */}
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
              Ichki izoh
            </div>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              placeholder="Jamoa uchun ichki izoh..."
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                fontSize: 12,
                color: C.text,
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                background: C.card,
              }}
            />
            <button
              style={{
                marginTop: 8,
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: C.brand,
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Izohni saqlash
            </button>
          </div>
        </div>
      )}

      {/* Tab: ACTIONS */}
      {tab === 'actions' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px' }}>
          {/* Change status */}
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
              Holat o'zgartirish
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6,
              }}
            >
              {Object.entries(STATUS_T).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key)}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 9,
                    border: `1px solid ${status === key ? cfg.dot : C.border}`,
                    background: status === key ? cfg.bg : C.card,
                    color: status === key ? cfg.color : C.muted,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all .15s',
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
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Change priority */}
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
              Ustuvorlik
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6,
              }}
            >
              {Object.entries(PRIORITY).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setPriority(key)}
                  style={{
                    padding: '9px 12px',
                    borderRadius: 9,
                    border: `1px solid ${priority === key ? cfg.dot : C.border}`,
                    background: priority === key ? cfg.bg : C.card,
                    color: priority === key ? cfg.color : C.muted,
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'all .15s',
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
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick actions */}
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
              Tezkor amallar
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                {
                  icon: '🔼',
                  label: 'Eskalatsiya — yuqori darajaga',
                  color: C.red,
                  action: () => handleStatusChange('Escalated'),
                },
                {
                  icon: '🔄',
                  label: "Boshqa agentga o'tkazish",
                  color: C.blue,
                  action: () => setTab('details'),
                },
                {
                  icon: '📧',
                  label: 'Mijozga email yuborish',
                  color: C.green,
                  action: () => {},
                },
                {
                  icon: '🔗',
                  label: "Buyurtma sahifasiga o'tish",
                  color: C.brand,
                  action: () => {},
                },
                {
                  icon: '📊',
                  label: 'Hisobot sifatida belgilash',
                  color: C.amber,
                  action: () => {},
                },
                {
                  icon: '🗑',
                  label: 'Tiketni arxivlash',
                  color: C.muted,
                  action: () => {},
                },
              ].map(({ icon, label, color, action }) => (
                <button
                  key={label}
                  onClick={action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '11px 14px',
                    borderRadius: 9,
                    border: `1px solid ${C.border}`,
                    background: C.card,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    color,
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* SLA info */}
          <div
            style={{
              background: ticket.slaPassed > ticket.sla ? '#FFF1F2' : '#F0FDF4',
              border: `1px solid ${ticket.slaPassed > ticket.sla ? '#FECDD3' : '#BBF7D0'}`,
              borderRadius: 10,
              padding: '12px 14px',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: ticket.slaPassed > ticket.sla ? C.red : C.green,
                marginBottom: 8,
              }}
            >
              {ticket.slaPassed > ticket.sla
                ? "⚠ SLA muddati o'tdi!"
                : '✅ SLA muddati ichida'}
            </div>
            <SlaBar sla={ticket.sla} passed={ticket.slaPassed} />
            <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>
              Muammo turi SLA: {ticket.sla} daq · O'tgan vaqt:{' '}
              {ticket.slaPassed} daq
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MilliyGoSupportPage() {
  const [tickets, setTickets] = useState(TICKETS)
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('tickets')
  const [priorityF, setPriorityF] = useState('Barcha')
  const [statusF, setStatusF] = useState('Barcha')
  const [categoryF, setCategoryF] = useState('Barcha')
  const [serviceF, setServiceF] = useState('Barcha')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const PAGE = 6

  const filtered = useMemo(() => {
    let d = [...tickets]
    if (priorityF !== 'Barcha') d = d.filter(t => t.priority === priorityF)
    if (statusF !== 'Barcha') d = d.filter(t => t.status === statusF)
    if (categoryF !== 'Barcha') d = d.filter(t => t.category === categoryF)
    if (serviceF !== 'Barcha') d = d.filter(t => t.service === serviceF)
    if (q.trim()) {
      const lq = q.toLowerCase()
      d = d.filter(
        t =>
          t.id.toLowerCase().includes(lq) ||
          t.customer.toLowerCase().includes(lq) ||
          t.subject.toLowerCase().includes(lq) ||
          t.orderId.toLowerCase().includes(lq),
      )
    }
    return d.sort(
      (a, b) => PRIORITY[a.priority]?.order - PRIORITY[b.priority]?.order,
    )
  }, [tickets, priorityF, statusF, categoryF, serviceF, q])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))
  const paged = filtered.slice((page - 1) * PAGE, page * PAGE)

  // Stats
  const open = tickets.filter(t =>
    ['Open', 'InProgress', 'Pending', 'Escalated'].includes(t.status),
  ).length
  const critical = tickets.filter(t => t.priority === 'Critical').length
  const slaBreached = tickets.filter(t => t.slaPassed > t.sla).length
  const resolved = tickets.filter(t =>
    ['Resolved', 'Closed'].includes(t.status),
  ).length
  const unassigned = tickets.filter(t => !t.agent).length
  const avgResponse = 28

  // Category breakdown
  const catBreakdown = Object.entries(CATEGORY)
    .map(([k, v]) => ({
      label: k,
      ...v,
      count: tickets.filter(t => t.category === k).length,
    }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count)

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
        .trow:hover{background:#EEF2FF !important;}
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
              Qo'llab-quvvatlash Markazi
            </h1>
            <p style={{ fontSize: 12, color: C.muted, margin: '4px 0 0' }}>
              Mijoz murojaat tiketlari, agent boshqaruvi va real vaqtda SLA
              monitoring
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
              ＋ Yangi tiket
            </button>
          </div>
        </div>

        {/* ── KPI Strip ── */}
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
              label: 'Ochiq tiketlar',
              val: open,
              sub: 'Javob kutmoqda',
              color: C.brand,
              icon: '📩',
              urgent: false,
            },
            {
              label: 'Kritik',
              val: critical,
              sub: 'Darhol hal qilsin',
              color: C.red,
              icon: '🔴',
              urgent: critical > 0,
            },
            {
              label: 'SLA buzilgan',
              val: slaBreached,
              sub: "Muddati o'tgan",
              color: C.orange,
              icon: '⏰',
              urgent: slaBreached > 0,
            },
            {
              label: 'Hal qilingan',
              val: resolved,
              sub: 'Bugun',
              color: C.green,
              icon: '✅',
              urgent: false,
            },
            {
              label: 'Tayinlanmagan',
              val: unassigned,
              sub: "Agent yo'q",
              color: C.amber,
              icon: '👤',
              urgent: unassigned > 0,
            },
            {
              label: "O'rtacha javob",
              val: `${avgResponse} daq`,
              sub: 'Bugun',
              color: C.sky,
              icon: '⚡',
              urgent: false,
            },
          ].map(({ label, val, sub, color, icon, urgent }) => (
            <div
              key={label}
              style={{
                background: urgent ? color + '08' : C.card,
                borderRadius: 12,
                padding: '13px 14px',
                border: `1.5px solid ${urgent ? color + '44' : C.border}`,
                boxShadow: urgent
                  ? `0 4px 12px ${color}18`
                  : '0 1px 4px rgba(0,0,0,.04)',
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
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: color + '18',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                {urgent && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: color,
                      animation: 'pulse 2s infinite',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: 22,
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

        {/* ── Analytics Row ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 0.9fr',
            gap: 10,
            marginBottom: 18,
          }}
        >
          {/* Category breakdown */}
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
              🗂 Murojaat toifalari
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              {catBreakdown.map(c => (
                <div
                  key={c.label}
                  onClick={() => {
                    setCategoryF(categoryF === c.label ? 'Barcha' : c.label)
                    setPage(1)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 10px',
                    borderRadius: 8,
                    border: `1px solid ${categoryF === c.label ? c.color : C.border}`,
                    background:
                      categoryF === c.label ? c.color + '10' : C.light,
                    cursor: 'pointer',
                    transition: 'all .15s',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{c.icon}</span>
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
                      {c.label}
                    </div>
                    <div
                      style={{ fontSize: 12, fontWeight: 800, color: c.color }}
                    >
                      {c.count} ta
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent status */}
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
              👥 Agentlar holati
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {AGENTS.map(a => {
                const dotColor =
                  a.status === 'Online'
                    ? C.green
                    : a.status === 'Busy'
                      ? C.orange
                      : a.status === 'Away'
                        ? C.amber
                        : C.muted
                return (
                  <div
                    key={a.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <div style={{ position: 'relative' }}>
                      <Avatar initials={a.avatar} size={30} color={C.brand} />
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: dotColor,
                          border: '1.5px solid #fff',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontSize: 11, fontWeight: 700, color: C.text }}
                      >
                        {a.name}
                      </div>
                      <div style={{ fontSize: 9, color: C.muted }}>
                        {a.tickets} faol · ★ {a.rating}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: dotColor,
                          background: dotColor + '15',
                          padding: '2px 7px',
                          borderRadius: 99,
                        }}
                      >
                        {a.status}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Priority breakdown */}
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
              🎯 Ustuvorlik
            </div>
            {Object.entries(PRIORITY).map(([k, cfg]) => {
              const cnt = tickets.filter(t => t.priority === k).length
              const pct = tickets.length
                ? Math.round((cnt / tickets.length) * 100)
                : 0
              return (
                <div
                  key={k}
                  onClick={() => {
                    setPriorityF(priorityF === k ? 'Barcha' : k)
                    setPage(1)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 9,
                    cursor: 'pointer',
                    opacity:
                      priorityF !== 'Barcha' && priorityF !== k ? 0.5 : 1,
                    transition: 'opacity .2s',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: cfg.dot,
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
                    {cfg.label}
                  </span>
                  <div
                    style={{
                      width: 60,
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
                        background: cfg.dot,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: cfg.color,
                      minWidth: 22,
                      textAlign: 'right',
                    }}
                  >
                    {cnt}
                  </span>
                </div>
              )
            })}
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
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                Holat bo'yicha
              </div>
              {Object.entries(STATUS_T)
                .slice(0, 4)
                .map(([k, cfg]) => {
                  const cnt = tickets.filter(t => t.status === k).length
                  return (
                    <div
                      key={k}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: C.muted,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
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
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: cfg.color,
                        }}
                      >
                        {cnt}
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
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
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <Dropdown
              label="Ustuvorlik"
              value={priorityF}
              onChange={v => {
                setPriorityF(v)
                setPage(1)
              }}
              options={['Barcha', 'Critical', 'High', 'Medium', 'Low']}
              accent={C.brand}
            />
            <Dropdown
              label="Holat"
              value={statusF}
              onChange={v => {
                setStatusF(v)
                setPage(1)
              }}
              options={['Barcha', ...Object.keys(STATUS_T)]}
              accent={C.brand}
            />
            <Dropdown
              label="Xizmat"
              value={serviceF}
              onChange={v => {
                setServiceF(v)
                setPage(1)
              }}
              options={['Barcha', 'Food', 'Market', 'Taxi', 'Cargo', 'Umumiy']}
              accent={C.brand}
            />
            <Dropdown
              label="Toifa"
              value={categoryF}
              onChange={v => {
                setCategoryF(v)
                setPage(1)
              }}
              options={['Barcha', ...Object.keys(CATEGORY)]}
              accent={C.brand}
              minW={170}
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
                  placeholder="Tiket ID, mijoz, mavzu, buyurtma..."
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
                tiket
              </span>
              {(priorityF !== 'Barcha' ||
                statusF !== 'Barcha' ||
                serviceF !== 'Barcha' ||
                categoryF !== 'Barcha' ||
                q) && (
                <button
                  onClick={() => {
                    setPriorityF('Barcha')
                    setStatusF('Barcha')
                    setServiceF('Barcha')
                    setCategoryF('Barcha')
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

        {/* ── Table + Chat ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: selected ? '1fr 420px' : '1fr',
            gap: 14,
          }}
        >
          {/* Tickets Table */}
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
                  '90px 1.8fr 110px 100px 120px 110px 140px 120px 60px',
                borderBottom: `2px solid ${C.border}`,
                background: '#FAFAFA',
              }}
            >
              {[
                'ID',
                'Mavzu / Mijoz',
                'Xizmat',
                'Toifa',
                'Ustuvorlik',
                'Agent',
                'Holat',
                'SLA',
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

            {/* Rows */}
            {paged.length === 0 ? (
              <div
                style={{
                  padding: '52px',
                  textAlign: 'center',
                  color: C.muted,
                  fontSize: 13,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>🔍</div>Tiket
                topilmadi
              </div>
            ) : (
              paged.map(t => {
                const isSel = selected?.id === t.id
                const svc = SERVICE[t.service] || SERVICE.Umumiy
                const cat = CATEGORY[t.category] || CATEGORY['Boshqa']
                const pcfg = PRIORITY[t.priority] || PRIORITY.Low
                const slaOver = t.slaPassed > t.sla
                const unread = t.messages.filter(
                  m => !m.read && m.from === 'customer',
                ).length
                return (
                  <div
                    key={t.id}
                    className="trow"
                    onClick={() => setSelected(isSel ? null : t)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        '90px 1.8fr 110px 100px 120px 110px 140px 120px 60px',
                      alignItems: 'center',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      background: isSel
                        ? C.brandLight
                        : t.priority === 'Critical'
                          ? '#FFF5F5'
                          : 'transparent',
                      borderLeft: `3px solid ${isSel ? C.brand : t.priority === 'Critical' ? C.red : 'transparent'}`,
                      transition: 'background .12s',
                    }}
                  >
                    {/* ID */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: isSel ? C.brandDark : C.muted,
                          fontFamily: 'monospace',
                        }}
                      >
                        {t.id}
                      </div>
                      <div
                        style={{ fontSize: 9, color: C.muted, marginTop: 2 }}
                      >
                        {t.created.split(' ')[1]}
                      </div>
                    </div>

                    {/* Subject + customer */}
                    <div style={{ padding: '13px 10px', minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          marginBottom: 3,
                        }}
                      >
                        {unread > 0 && (
                          <span
                            style={{
                              background: C.red,
                              color: '#fff',
                              fontSize: 9,
                              fontWeight: 800,
                              padding: '1px 6px',
                              borderRadius: 99,
                              flexShrink: 0,
                            }}
                          >
                            {unread}
                          </span>
                        )}
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
                          {t.subject}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <Avatar initials={t.avatar} size={18} color={C.blue} />
                        <span
                          style={{
                            fontSize: 10,
                            color: C.muted,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {t.customer} · {t.city}
                        </span>
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
                        {svc.icon} {t.service}
                      </span>
                    </div>

                    {/* Category */}
                    <div
                      style={{
                        padding: '13px 8px',
                        fontSize: 11,
                        fontWeight: 600,
                        color: cat.color,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {cat.icon} {t.category.split(' ')[0]}
                    </div>

                    {/* Priority */}
                    <div style={{ padding: '13px 8px' }}>
                      <PriorityBadge p={t.priority} />
                    </div>

                    {/* Agent */}
                    <div style={{ padding: '13px 8px' }}>
                      {t.agent ? (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          <Avatar
                            initials={t.avatar.slice(0, 2)}
                            size={22}
                            color={C.brand}
                          />
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: C.text,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {t.agentName}
                          </span>
                        </div>
                      ) : (
                        <span
                          style={{
                            fontSize: 10,
                            color: C.rose,
                            fontWeight: 700,
                            background: '#FFF1F2',
                            padding: '2px 8px',
                            borderRadius: 99,
                          }}
                        >
                          Tayinlanmagan
                        </span>
                      )}
                    </div>

                    {/* Status */}
                    <div style={{ padding: '13px 8px' }}>
                      <StatusBadge s={t.status} />
                    </div>

                    {/* SLA */}
                    <div style={{ padding: '13px 10px' }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: slaOver ? C.red : C.green,
                          marginBottom: 3,
                        }}
                      >
                        {slaOver
                          ? `⚠ +${t.slaPassed - t.sla}daq`
                          : `✓ ${t.sla - t.slaPassed}daq`}
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
                            width: `${Math.min((t.slaPassed / t.sla) * 100, 100)}%`,
                            background: slaOver
                              ? C.red
                              : t.slaPassed / t.sla > 0.75
                                ? C.amber
                                : C.green,
                            borderRadius: 99,
                          }}
                        />
                      </div>
                    </div>

                    {/* Open btn */}
                    <div
                      style={{ padding: '13px 8px' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelected(isSel ? null : t)}
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
                        💬
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
                <strong style={{ color: C.text }}>{filtered.length}</strong>{' '}
                tiketdan {Math.min((page - 1) * PAGE + 1, filtered.length)}–
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

          {/* Chat / Detail panel */}
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
              <ChatPanel
                ticket={selected}
                onClose={() => setSelected(null)}
                onUpdate={t =>
                  setTickets(prev => prev.map(x => (x.id === t.id ? t : x)))
                }
              />
            </div>
          )}
        </div>

        {/* ── Agent performance cards ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5,1fr)',
            gap: 10,
            marginTop: 14,
          }}
        >
          {AGENTS.map(a => {
            const dotColor =
              a.status === 'Online'
                ? C.green
                : a.status === 'Busy'
                  ? C.orange
                  : a.status === 'Away'
                    ? C.amber
                    : C.muted
            const resolveRate =
              a.tickets + a.resolved > 0
                ? Math.round((a.resolved / (a.tickets + a.resolved)) * 100)
                : 0
            return (
              <div
                key={a.id}
                style={{
                  background: C.card,
                  borderRadius: 12,
                  padding: '14px 16px',
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 1px 4px rgba(0,0,0,.04)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <Avatar initials={a.avatar} size={36} color={C.brand} />
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: -1,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: dotColor,
                        border: '2px solid #fff',
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 12, fontWeight: 800, color: C.text }}
                    >
                      {a.name}
                    </div>
                    <div style={{ fontSize: 10, color: C.muted }}>
                      {a.specialty}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 6,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      background: C.light,
                      borderRadius: 7,
                      padding: '6px',
                    }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: 900, color: C.brand }}
                    >
                      {a.tickets}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted }}>Faol</div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      background: C.light,
                      borderRadius: 7,
                      padding: '6px',
                    }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: 900, color: C.green }}
                    >
                      {a.resolved}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted }}>Hal qildi</div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 10, color: C.muted }}>
                    Hal qilish %
                  </span>
                  <span
                    style={{ fontSize: 11, fontWeight: 800, color: C.green }}
                  >
                    {resolveRate}%
                  </span>
                </div>
                <div
                  style={{
                    height: 5,
                    background: C.light,
                    borderRadius: 99,
                    overflow: 'hidden',
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${resolveRate}%`,
                      background: C.green,
                      borderRadius: 99,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 10, color: C.amber }}>
                    ★ {a.rating}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: dotColor,
                      background: dotColor + '15',
                      padding: '2px 7px',
                      borderRadius: 99,
                    }}
                  >
                    {a.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  )
}
