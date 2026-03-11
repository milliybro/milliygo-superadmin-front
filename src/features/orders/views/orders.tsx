import { useState, useMemo, useEffect, useRef } from "react";

const C = {
  food: "#F97316", taxi: "#7C3AED", mkt: "#059669", blue: "#2563EB",
  red: "#DC2626", amber: "#D97706", indigo: "#4F46E5", slate: "#0F172A",
  bg: "#F8FAFC", card: "#FFFFFF", border: "#E2E8F0", text: "#0F172A",
  muted: "#64748B", light: "#F1F5F9", green: "#16A34A",
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  { id: "MGO-88421", service: "Food", partner: "KFC Central", customer: "Anvar Rustamov", phone: "+998 90 123 45 67", courier: "Dilshod K.", courierAvatar: "DK", value: 124500, status: "In Transit", zone: "Chilonzor", created: "14:24", accepted: "14:26", eta: "14:55", address: "Chilonzor-3, 45-uy", rating: 4.9 },
  { id: "MGO-88420", service: "Market", partner: "Korzinka.uz", customer: "Madina Olimova", phone: "+998 97 445 67 89", courier: "Sardor J.", courierAvatar: "SJ", value: 450200, status: "Delivered", zone: "Yunusobod", created: "14:10", accepted: "14:12", eta: "14:40", address: "Yunusobod-13, 12-uy", rating: 4.7 },
  { id: "MGO-88419", service: "Taxi", partner: "MilliyGo Fleet", customer: "Jasur Aliev", phone: "+998 93 998 11 22", courier: "Otabek H.", courierAvatar: "OH", value: 35000, status: "Active", zone: "Yakkasaroy", created: "14:05", accepted: "14:06", eta: "14:30", address: "Yakkasaroy-2, 8-uy", rating: 4.8 },
  { id: "MGO-88418", service: "Food", partner: "Rayhon National Foods", customer: "Diyor S.", phone: "+998 90 777 22 33", courier: "Alijon M.", courierAvatar: "AM", value: 88000, status: "Pending", zone: "Sergeli", created: "14:01", accepted: null, eta: "14:50", address: "Sergeli-7, 3-uy", rating: null },
  { id: "MGO-88417", service: "Food", partner: "Burger King", customer: "Nilufar Yusupova", phone: "+998 91 234 56 78", courier: "Bobur T.", courierAvatar: "BT", value: 67000, status: "Delivered", zone: "Mirzo Ulugbek", created: "13:50", accepted: "13:52", eta: "14:20", address: "Mirzo Ulugbek-5, 19-uy", rating: 5.0 },
  { id: "MGO-88416", service: "Market", partner: "Makro Supermarket", customer: "Sherzod Xo'jayev", phone: "+998 94 555 66 77", courier: "Nodir R.", courierAvatar: "NR", value: 312000, status: "Cancelled", zone: "Olmazor", created: "13:45", accepted: null, eta: null, address: "Olmazor-11, 7-uy", rating: null },
  { id: "MGO-88415", service: "Taxi", partner: "Yandex Drive", customer: "Feruza Karimova", phone: "+998 90 888 99 00", courier: "Sanjar A.", courierAvatar: "SA", value: 48000, status: "Delivered", zone: "Uchtepa", created: "13:40", accepted: "13:41", eta: "14:05", address: "Uchtepa-6, 22-uy", rating: 4.6 },
  { id: "MGO-88414", service: "Food", partner: "Plov Center", customer: "Abdulloh Nazarov", phone: "+998 93 111 22 33", courier: "Ulugbek S.", courierAvatar: "US", value: 95000, status: "In Transit", zone: "Chilonzor", created: "13:35", accepted: "13:37", eta: "14:00", address: "Chilonzor-8, 30-uy", rating: null },
  { id: "MGO-88413", service: "Market", partner: "Next Supermarket", customer: "Gulnora Ibragimova", phone: "+998 97 333 44 55", courier: "Hamid O.", courierAvatar: "HO", value: 187500, status: "Active", zone: "Shayhontohur", created: "13:30", accepted: "13:32", eta: "13:58", address: "Shayxontohur-3, 15-uy", rating: null },
  { id: "MGO-88412", service: "Taxi", partner: "MilliyGo Fleet", customer: "Otabek Mirzayev", phone: "+998 90 444 55 66", courier: "Javlon K.", courierAvatar: "JK", value: 28000, status: "Delivered", zone: "Bektemir", created: "13:20", accepted: "13:21", eta: "13:45", address: "Bektemir-2, 9-uy", rating: 4.9 },
  { id: "MGO-88411", service: "Food", partner: "Tandirchi", customer: "Maftuna Xoliqova", phone: "+998 91 777 88 99", courier: "Akbar N.", courierAvatar: "AN", value: 54000, status: "Delivered", zone: "Yunusobod", created: "13:10", accepted: "13:12", eta: "13:40", address: "Yunusobod-8, 44-uy", rating: 4.8 },
  { id: "MGO-88410", service: "Market", partner: "Korzinka.uz", customer: "Lochinbek Tursunov", phone: "+998 93 222 33 44", courier: "Elmurod A.", courierAvatar: "EA", value: 275000, status: "Cancelled", zone: "Mirzo Ulugbek", created: "13:05", accepted: null, eta: null, address: "Mirzo Ulugbek-12, 5-uy", rating: null },
];

const STATUS_CONFIG = {
  "In Transit": { bg: "#DBEAFE", color: "#1D4ED8", label: "Yo'lda", dot: "#3B82F6" },
  "Delivered":  { bg: "#DCFCE7", color: "#15803D", label: "Yetkazildi", dot: "#22C55E" },
  "Active":     { bg: "#FEF3C7", color: "#D97706", label: "Faol", dot: "#F59E0B" },
  "Pending":    { bg: "#F3F4F6", color: "#6B7280", label: "Kutmoqda", dot: "#9CA3AF" },
  "Cancelled":  { bg: "#FEE2E2", color: "#DC2626", label: "Bekor", dot: "#EF4444" },
};

const SERVICE_CONFIG = {
  Food:   { icon: "🍔", color: C.food, bg: "#FFF7ED" },
  Market: { icon: "🛒", color: C.mkt,  bg: "#F0FDF4" },
  Taxi:   { icon: "🚖", color: C.taxi, bg: "#F5F3FF" },
};

const ZONES = ["Barcha zonalar", "Chilonzor", "Yunusobod", "Yakkasaroy", "Mirzo Ulugbek", "Sergeli", "Olmazor", "Uchtepa", "Shayhontohur", "Bektemir"];
const SERVICES = ["Barcha xizmatlar", "Food", "Market", "Taxi"];
const STATUSES = ["Barcha holat", "Active", "In Transit", "Pending", "Delivered", "Cancelled"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat("uz-UZ").format(n) + " UZS";

// ─── Components ──────────────────────────────────────────────────────────────
function Select({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{label}</div>
      <button onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 6, background: C.card,
        border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 10px",
        fontSize: 12, fontWeight: 600, color: C.text, cursor: "pointer",
        minWidth: 130, justifyContent: "space-between",
        boxShadow: open ? `0 0 0 2px ${C.blue}33` : "none",
      }}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</span>
        <span style={{ fontSize: 8, color: C.muted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 200,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: "100%", overflow: "hidden",
        }}>
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setOpen(false); }} style={{
              padding: "8px 12px", fontSize: 12, fontWeight: value === opt ? 700 : 500,
              color: value === opt ? C.blue : C.text, cursor: "pointer",
              background: value === opt ? "#EFF6FF" : "transparent",
            }}>{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function Avatar({ initials, color, size = 30 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22", border: `2px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 800, color, flexShrink: 0,
    }}>{initials}</div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_CONFIG[status] || STATUS_CONFIG["Pending"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: s.bg, color: s.color, fontSize: 10, fontWeight: 700,
      padding: "3px 8px", borderRadius: 20,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {s.label}
    </span>
  );
}

function TimelineStep({ label, time, done, active, last }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
          background: done ? C.green : active ? C.blue : "#E2E8F0",
          border: active ? `2px solid ${C.blue}` : done ? `2px solid ${C.green}` : "2px solid #CBD5E1",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {done && <span style={{ fontSize: 8, color: "#fff" }}>✓</span>}
          {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "block" }} />}
        </div>
        {!last && <div style={{ width: 2, height: 28, background: done ? C.green : "#E2E8F0", marginTop: 2 }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: done || active ? C.text : C.muted }}>{label}</div>
        {time && <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{time}</div>}
      </div>
    </div>
  );
}

function MiniMap({ courier }) {
  return (
    <div style={{ height: 110, background: "#DDE8F0", borderRadius: 10, position: "relative", overflow: "hidden", border: `1px solid ${C.border}` }}>
      <svg width="100%" height="100%" viewBox="0 0 300 110" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <rect width="300" height="110" fill="#D4E1EC" />
        {[[0,35,300,35],[0,70,300,70]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8CCDA" strokeWidth="10"/>)}
        {[[60,0,60,110],[150,0,150,110],[240,0,240,110]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B8CCDA" strokeWidth="8"/>)}
        {[[65,10,75,20],[80,10,55,20],[155,12,75,18],[250,10,80,18],[65,45,75,20],[80,45,55,20],[155,45,75,18],[65,78,75,22],[80,78,55,20],[155,78,75,18],[250,78,80,20]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} fill="#C0D4E0" rx="2"/>
        ))}
        {/* Route line */}
        <path d="M 60,52 Q 100,30 150,52 Q 200,72 240,52" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="5,4" fill="none" opacity="0.7"/>
        {/* Destination */}
        <circle cx="240" cy="52" r="7" fill="#DC262640" stroke="#DC2626" strokeWidth="1.5"/>
        <text x="240" y="55.5" textAnchor="middle" fontSize="8" fill="#DC2626">📍</text>
        {/* Courier */}
        <circle cx="140" cy="52" r="9" fill="#3B82F6" stroke="#fff" strokeWidth="2"/>
        <text x="140" y="55.5" textAnchor="middle" fontSize="9">🛵</text>
      </svg>
      <div style={{ position: "absolute", top: 6, left: 6, background: "rgba(255,255,255,0.9)", borderRadius: 6, padding: "2px 7px", fontSize: 9, fontWeight: 700, color: C.blue }}>
        {courier} · Yo'lda
      </div>
      <div style={{ position: "absolute", bottom: 6, right: 6, background: C.slate, color: "#fff", borderRadius: 6, padding: "2px 7px", fontSize: 9, fontWeight: 700 }}>
        ~8 daq qoldi
      </div>
    </div>
  );
}

function DetailPanel({ order, onClose }) {
  if (!order) return null;
  const sc = SERVICE_CONFIG[order.service];
  const st = STATUS_CONFIG[order.status];
  const isDone = order.status === "Delivered";
  const isCancelled = order.status === "Cancelled";
  const isTransit = order.status === "In Transit";
  const isActive = order.status === "Active";
  const isPending = order.status === "Pending";

  const timeline = [
    { label: "Buyurtma yaratildi", time: order.created ? `Bugun, ${order.created} PM` : null, done: true },
    { label: `${order.partner} tomonidan qabul qilindi`, time: order.accepted ? `${order.accepted} PM` : null, done: !!order.accepted, active: !order.accepted && !isCancelled },
    { label: isTransit ? "Yo'lda — kurier yetib bormoqda" : isActive ? "Jarayonda" : isDone ? "Yetkazildi" : isCancelled ? "Bekor qilindi" : "Yetkazilmoqda", time: isTransit ? `Kurier ${order.courier} yo'lda` : isDone ? order.eta + " PM" : null, done: isDone, active: isTransit || isActive },
    { label: "Yetkazildi", time: isDone ? "✓ Muvaffaqiyatli" : `Mo'ljal: ${order.eta || "—"} PM`, done: isDone, active: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 14px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 4 }}>Buyurtma tafsilotlari</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.text, letterSpacing: -0.5 }}>#{order.id}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>Bugun, {order.created} PM</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StatusBadge status={order.status} />
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", background: C.light, border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted }}>✕</button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {/* Service + Partner */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, background: sc.bg, borderRadius: 10, padding: "10px 12px", border: `1px solid ${sc.color}22` }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Xizmat turi</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 16 }}>{sc.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: sc.color }}>{order.service}</span>
            </div>
          </div>
          <div style={{ flex: 2, background: C.light, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Hamkor</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{order.partner}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{order.zone} tumani</div>
          </div>
        </div>

        {/* Customer + Courier */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          <div style={{ background: C.light, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Mijoz</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Avatar initials={order.customer.slice(0, 2)} color={C.blue} size={28} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{order.customer}</div>
                <div style={{ fontSize: 10, color: C.muted }}>{order.phone}</div>
              </div>
            </div>
          </div>
          <div style={{ background: C.light, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Kurier</div>
            {order.courier ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar initials={order.courierAvatar} color={C.food} size={28} />
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{order.courier}</div>
                  {order.rating && <div style={{ fontSize: 10, color: C.amber }}>★ {order.rating}</div>}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 11, color: C.muted, fontStyle: "italic" }}>Tayinlanmagan</div>
            )}
          </div>
        </div>

        {/* Address + Value */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, marginBottom: 16 }}>
          <div style={{ background: C.light, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>📍 Manzil</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{order.address}</div>
          </div>
          <div style={{ background: C.slate, borderRadius: 10, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 9, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>Summa</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", whiteSpace: "nowrap" }}>{fmt(order.value)}</div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Jonli vaqt chizig'i</div>
          {timeline.map((step, i) => (
            <TimelineStep key={i} {...step} last={i === timeline.length - 1} />
          ))}
        </div>

        {/* Mini Map */}
        {(isTransit || isActive) && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Kurier joylashuvi</div>
            <MiniMap courier={order.courier} />
          </div>
        )}

        {/* Action buttons */}
        {!isCancelled && !isDone && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Qo'llab-quvvatlash amaliyotlari</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              {[
                { icon: "🔄", label: "Qayta tayinlash", color: C.blue },
                { icon: "✕", label: "Bekor qilish", color: C.red },
                { icon: "📞", label: "Qo'llab-quvvatlash", color: C.mkt },
                { icon: "📋", label: "To'liq log", color: C.muted },
              ].map(({ icon, label, color }) => (
                <button key={label} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                  padding: "10px 8px", borderRadius: 10, border: `1px solid ${C.border}`,
                  background: C.card, cursor: "pointer", transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {!isCancelled && !isDone && (
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
          <button style={{
            width: "100%", padding: "12px", borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${C.blue}, ${C.indigo})`,
            color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer",
            boxShadow: `0 4px 14px ${C.blue}44`, letterSpacing: 0.2,
          }}>
            💬 Kurier bilan jonli chat
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [serviceFilter, setServiceFilter] = useState("Barcha xizmatlar");
  const [zoneFilter, setZoneFilter] = useState("Barcha zonalar");
  const [statusFilter, setStatusFilter] = useState("Barcha holat");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const PAGE_SIZE = 8;

  const filtered = useMemo(() => {
    let data = [...MOCK_ORDERS];
    if (serviceFilter !== "Barcha xizmatlar") data = data.filter(o => o.service === serviceFilter);
    if (zoneFilter !== "Barcha zonalar") data = data.filter(o => o.zone === zoneFilter);
    if (statusFilter !== "Barcha holat") data = data.filter(o => o.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.partner.toLowerCase().includes(q) ||
        o.courier?.toLowerCase().includes(q)
      );
    }
    return data;
  }, [serviceFilter, zoneFilter, statusFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const stats = {
    total: MOCK_ORDERS.length,
    active: MOCK_ORDERS.filter(o => o.status === "Active" || o.status === "In Transit").length,
    delivered: MOCK_ORDERS.filter(o => o.status === "Delivered").length,
    cancelled: MOCK_ORDERS.filter(o => o.status === "Cancelled").length,
    revenue: MOCK_ORDERS.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.value, 0),
  };

  const COL_HEADERS = [
    { key: "id", label: "Buyurtma ID", w: 100 },
    { key: "service", label: "Xizmat", w: 80 },
    { key: "partner", label: "Hamkor", w: 140 },
    { key: "customer", label: "Mijoz", w: 140 },
    { key: "courier", label: "Kurier", w: 110 },
    { key: "value", label: "Summa", w: 120, right: true },
    { key: "status", label: "Holat", w: 110 },
    { key: "zone", label: "Zona", w: 100 },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Outfit','Inter',sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
        button:hover { opacity: 0.85; }
      `}</style>

      <div style={{ padding: "20px 24px" }}>
        {/* ── Page Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: C.text, letterSpacing: -0.5, margin: 0 }}>Order Management Center</h1>
            <p style={{ fontSize: 12, color: C.muted, margin: "4px 0 0" }}>Barcha vertikal xizmatlar bo'yicha real vaqt logistika monitoringi</p>
          </div>
          <button style={{
            display: "flex", alignItems: "center", gap: 7,
            background: C.slate, color: "#fff", border: "none",
            borderRadius: 10, padding: "9px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            ⬇ Ma'lumotlarni eksport
          </button>
        </div>

        {/* ── Stats Strip ── */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          {[
            { label: "Jami buyurtmalar", value: stats.total, color: C.indigo, icon: "📦" },
            { label: "Faol / Yo'lda", value: stats.active, color: C.blue, icon: "🔄" },
            { label: "Yetkazildi", value: stats.delivered, color: C.green, icon: "✅" },
            { label: "Bekor qilindi", value: stats.cancelled, color: C.red, icon: "✕" },
            { label: "Jami daromad", value: fmt(stats.revenue), color: C.food, icon: "💰" },
          ].map(({ label, value, color, icon }) => (
            <div key={label} style={{ flex: 1, background: C.card, borderRadius: 12, padding: "12px 14px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div style={{ background: C.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
            <Select label="Xizmat turi" value={serviceFilter} onChange={(v) => { setServiceFilter(v); setPage(1); }} options={SERVICES} />
            <Select label="Zona tanlash" value={zoneFilter} onChange={(v) => { setZoneFilter(v); setPage(1); }} options={ZONES} />
            <Select label="Buyurtma holati" value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} options={STATUSES} />
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Qidirish</div>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="ID, mijoz, hamkor, kurier..."
                style={{
                  width: "100%", padding: "7px 10px 7px 32px", borderRadius: 8, fontSize: 12,
                  border: `1px solid ${C.border}`, background: C.card, color: C.text,
                  outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
            <div style={{ marginBottom: 0 }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Sana oralig'i</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 10px", fontSize: 12, color: C.text, fontWeight: 600 }}>
                📅 Oct 24 – Oct 30
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Layout: Table + Detail Panel ── */}
        <div style={{ display: "grid", gridTemplateColumns: selectedOrder ? "1fr 360px" : "1fr", gap: 14 }}>

          {/* Table */}
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "flex", padding: "0 0", borderBottom: `2px solid ${C.border}` }}>
              {COL_HEADERS.map(({ key, label, w, right }) => (
                <div key={key} onClick={() => handleSort(key)} style={{
                  padding: "11px 12px", fontSize: 10, fontWeight: 700, color: C.muted,
                  textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer",
                  width: key === "partner" || key === "customer" ? undefined : w,
                  flex: key === "partner" || key === "customer" ? 1 : undefined,
                  minWidth: w, textAlign: right ? "right" : "left",
                  display: "flex", alignItems: "center", gap: 4, userSelect: "none",
                  background: sortCol === key ? "#F8FAFF" : "transparent",
                }}>
                  {label}
                  {sortCol === key && <span style={{ fontSize: 8 }}>{sortDir === "asc" ? "▲" : "▼"}</span>}
                </div>
              ))}
            </div>

            {/* Rows */}
            {paged.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: C.muted, fontSize: 13 }}>
                🔍 Buyurtmalar topilmadi
              </div>
            ) : paged.map((order) => {
              const sc = SERVICE_CONFIG[order.service];
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div key={order.id} onClick={() => setSelectedOrder(isSelected ? null : order)} style={{
                  display: "flex", alignItems: "center", cursor: "pointer",
                  borderBottom: `1px solid ${C.border}`,
                  background: isSelected ? "#EFF6FF" : "transparent",
                  transition: "background 0.15s",
                  borderLeft: isSelected ? `3px solid ${C.blue}` : "3px solid transparent",
                }}>
                  {/* ID */}
                  <div style={{ width: 100, minWidth: 100, padding: "12px 12px", fontFamily: "monospace", fontSize: 11, fontWeight: 800, color: isSelected ? C.blue : C.text }}>
                    #{order.id}
                  </div>
                  {/* Service */}
                  <div style={{ width: 80, minWidth: 80, padding: "12px 8px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: sc.bg, borderRadius: 6, padding: "2px 7px", fontSize: 11, fontWeight: 700, color: sc.color }}>
                      {sc.icon} {order.service}
                    </span>
                  </div>
                  {/* Partner */}
                  <div style={{ flex: 1, minWidth: 140, padding: "12px 10px", fontSize: 12, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {order.partner}
                  </div>
                  {/* Customer */}
                  <div style={{ flex: 1, minWidth: 140, padding: "12px 10px" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.customer}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>{order.phone.slice(0, 14)}...</div>
                  </div>
                  {/* Courier */}
                  <div style={{ width: 110, minWidth: 110, padding: "12px 10px" }}>
                    {order.courier ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Avatar initials={order.courierAvatar} color={C.food} size={24} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{order.courier}</span>
                      </div>
                    ) : <span style={{ fontSize: 11, color: C.muted }}>—</span>}
                  </div>
                  {/* Value */}
                  <div style={{ width: 120, minWidth: 120, padding: "12px 12px", textAlign: "right", fontSize: 12, fontWeight: 800, color: C.text }}>
                    {new Intl.NumberFormat("uz-UZ").format(order.value)}<br/>
                    <span style={{ fontSize: 9, color: C.muted, fontWeight: 500 }}>UZS</span>
                  </div>
                  {/* Status */}
                  <div style={{ width: 110, minWidth: 110, padding: "12px 10px" }}>
                    <StatusBadge status={order.status} />
                  </div>
                  {/* Zone */}
                  <div style={{ width: 100, minWidth: 100, padding: "12px 10px", fontSize: 11, color: C.muted, fontWeight: 500 }}>
                    {order.zone}
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 12, color: C.muted }}>
                Jami <strong>{filtered.length}</strong> buyurtmadan {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} ko'rsatilmoqda
              </span>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${C.border}`, background: page === 1 ? C.light : C.card, color: page === 1 ? C.muted : C.text, fontSize: 12, fontWeight: 600, cursor: page === 1 ? "default" : "pointer" }}>
                  ← Oldingi
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + Math.max(1, Math.min(page - 2, totalPages - 4));
                  return (
                    <button key={p} onClick={() => setPage(p)} style={{
                      width: 30, height: 30, borderRadius: 7, border: `1px solid ${page===p ? C.blue : C.border}`,
                      background: page===p ? C.blue : C.card, color: page===p ? "#fff" : C.text,
                      fontSize: 12, fontWeight: 700, cursor: "pointer",
                    }}>{p}</button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${C.border}`, background: page === totalPages ? C.light : C.card, color: page === totalPages ? C.muted : C.text, fontSize: 12, fontWeight: 600, cursor: page === totalPages ? "default" : "pointer" }}>
                  Keyingi →
                </button>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          {selectedOrder && (
            <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", position: "sticky", top: 10, maxHeight: "calc(100vh - 40px)", display: "flex", flexDirection: "column" }}>
              <DetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}