import { useState, useRef, useEffect, useCallback } from "react";

// ─── TOKENS ───────────────────────────────────────────────────────────────────
const C = {
  orange:"#F97316", orangeD:"#C2410C", orangeL:"#FFF7ED", orangeB:"#FED7AA",
  blue:"#2563EB",   blueL:"#EFF6FF",   blueB:"#BFDBFE",
  emerald:"#059669",emeraldL:"#F0FDF4",
  violet:"#7C3AED", violetL:"#F5F3FF",
  sky:"#0EA5E9",    red:"#DC2626",     rose:"#F43F5E",
  amber:"#D97706",  amberL:"#FFFBEB",  green:"#16A34A",
  teal:"#0D9488",   pink:"#EC4899",    lime:"#65A30D",
  text:"#0F172A",   text2:"#1E293B",   muted:"#64748B",  muted2:"#94A3B8",
  border:"#E2E8F0", light:"#F1F5F9",   light2:"#F8FAFC",
  card:"#FFFFFF",   bg:"#F0F4F8",      dark:"#0F172A",   dark2:"#1E293B",
};

const SECTIONS = [
  { id:"platform",    icon:"🏢", label:"Platforma",         sub:"Umumiy ma'lumotlar"     },
  { id:"appearance",  icon:"🎨", label:"Ko'rinish",          sub:"Brend va dizayn"         },
  { id:"security",    icon:"🔐", label:"Xavfsizlik",         sub:"Kirish va autentifikatsiya"},
  { id:"payments",    icon:"💳", label:"To'lov sozlamalari", sub:"Komissiya va metodlar"   },
  { id:"services",    icon:"⚡", label:"Xizmat sozlamalari", sub:"Food, Market, Taxi, Cargo"},
  { id:"notifications",icon:"🔔",label:"Bildirishnomalar",   sub:"Kanal sozlamalari"       },
  { id:"integrations",icon:"🔗", label:"API & Integratsiya", sub:"Kalitlar va webhook"     },
  { id:"admins",      icon:"👥", label:"Adminlar",           sub:"Foydalanuvchi va ruxsat" },
  { id:"data",        icon:"🗄️", label:"Ma'lumotlar",        sub:"Backup va eksport"       },
  { id:"system",      icon:"⚙️", label:"Tizim",             sub:"Holat va texnik"          },
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
function Toggle({ value, onChange, accent = C.orange, size = "md" }) {
  const w = size === "sm" ? 34 : 42;
  const h = size === "sm" ? 19 : 24;
  const d = size === "sm" ? 13 : 17;
  const pad = size === "sm" ? 3 : 3.5;
  return (
    <div onClick={() => onChange(!value)}
      style={{ width:w, height:h, borderRadius:h, background:value?accent:"#CBD5E1",
        cursor:"pointer", position:"relative", transition:"background .2s", flexShrink:0 }}>
      <div style={{ width:d, height:d, borderRadius:"50%", background:"#fff",
        position:"absolute", top:pad, left:value?w-d-pad:pad,
        transition:"left .2s", boxShadow:"0 1px 4px rgba(0,0,0,.22)" }} />
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type="text", mono=false, prefix, suffix, note, error, disabled=false }) {
  return (
    <div>
      {label && <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:5, letterSpacing:.2 }}>{label}</div>}
      <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
        {prefix && <span style={{ position:"absolute", left:10, fontSize:12, color:C.muted, pointerEvents:"none", userSelect:"none" }}>{prefix}</span>}
        <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
          style={{ width:"100%", padding:`9px ${suffix?"38px":12}px 9px ${prefix?"32px":12}px`,
            borderRadius:9, border:`1.5px solid ${error?C.red:C.border}`,
            fontSize:12, fontWeight:600, color:disabled?C.muted:C.text,
            fontFamily: mono ? "monospace" : "inherit",
            outline:"none", background:disabled?"#F8FAFC":C.card,
            transition:"border-color .15s", letterSpacing: mono?.5:0 }}
          onFocus={e => { e.target.style.borderColor = error ? C.red : C.orange; e.target.style.boxShadow = `0 0 0 3px ${error?C.red:C.orange}18`; }}
          onBlur={e  => { e.target.style.borderColor = error ? C.red : C.border; e.target.style.boxShadow = "none"; }}
        />
        {suffix && <span style={{ position:"absolute", right:10, fontSize:12, color:C.muted, userSelect:"none" }}>{suffix}</span>}
      </div>
      {note  && !error && <div style={{ fontSize:10, color:C.muted2, marginTop:4 }}>{note}</div>}
      {error && <div style={{ fontSize:10, color:C.red, marginTop:4, fontWeight:600 }}>⚠ {error}</div>}
    </div>
  );
}

function Select({ label, value, onChange, options, note }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref}>
      {label && <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:5, letterSpacing:.2 }}>{label}</div>}
      <button onClick={() => setOpen(o=>!o)}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"9px 12px", borderRadius:9, border:`1.5px solid ${open?C.orange:C.border}`,
          background:C.card, fontSize:12, fontWeight:600, color:C.text,
          cursor:"pointer", outline:"none", fontFamily:"inherit",
          boxShadow:open?`0 0 0 3px ${C.orange}18`:"none", transition:"all .15s" }}>
        <span>{value}</span>
        <span style={{ fontSize:9, color:C.muted, transform:open?"rotate(180deg)":"none", transition:"transform .2s" }}>▼</span>
      </button>
      {open && (
        <div style={{ position:"absolute", zIndex:600, marginTop:4, background:C.card,
          border:`1px solid ${C.border}`, borderRadius:10, boxShadow:"0 8px 28px rgba(0,0,0,.13)",
          overflow:"hidden", maxHeight:220, overflowY:"auto", width:"100%" }}>
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              style={{ padding:"9px 14px", fontSize:12, fontWeight:value===opt?700:500,
                color:value===opt?C.orange:C.text, background:value===opt?C.orangeL:"transparent",
                cursor:"pointer", transition:"background .1s" }}>
              {opt}
            </div>
          ))}
        </div>
      )}
      {note && <div style={{ fontSize:10, color:C.muted2, marginTop:4 }}>{note}</div>}
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows=3, mono=false, note }) {
  return (
    <div>
      {label && <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:5 }}>{label}</div>}
      <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width:"100%", padding:"9px 12px", borderRadius:9, border:`1.5px solid ${C.border}`,
          fontSize:12, fontWeight:500, color:C.text, fontFamily:mono?"monospace":"inherit",
          outline:"none", resize:"vertical", background:C.card, lineHeight:1.6, transition:"border-color .15s" }}
        onFocus={e => { e.target.style.borderColor = C.orange; e.target.style.boxShadow = `0 0 0 3px ${C.orange}18`; }}
        onBlur={e  => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }} />
      {note && <div style={{ fontSize:10, color:C.muted2, marginTop:4 }}>{note}</div>}
    </div>
  );
}

function SettingRow({ label, sub, children, danger=false }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
      paddingBottom:16, marginBottom:16, borderBottom:`1px solid ${C.border}` }}>
      <div style={{ flex:1, marginRight:24 }}>
        <div style={{ fontSize:13, fontWeight:700, color:danger?C.red:C.text }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:C.muted, marginTop:3, lineHeight:1.5 }}>{sub}</div>}
      </div>
      <div style={{ flexShrink:0 }}>{children}</div>
    </div>
  );
}

function SectionCard({ title, icon, sub, children, danger=false }) {
  return (
    <div style={{ background:C.card, borderRadius:14, border:`1.5px solid ${danger?"#FECDD3":C.border}`,
      overflow:"hidden", marginBottom:16, boxShadow:"0 1px 6px rgba(0,0,0,.05)" }}>
      <div style={{ padding:"16px 22px 14px",
        background:danger?"linear-gradient(135deg,#FFF1F2,#fff)":`linear-gradient(135deg,${C.light2},#fff)`,
        borderBottom:`1px solid ${danger?"#FECDD3":C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10,
            background:danger?C.red+"15":C.orange+"15",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
            {icon}
          </div>
          <div>
            <div style={{ fontSize:14, fontWeight:900, color:danger?C.red:C.text, letterSpacing:-.3 }}>{title}</div>
            {sub && <div style={{ fontSize:11, color:C.muted, marginTop:1 }}>{sub}</div>}
          </div>
        </div>
      </div>
      <div style={{ padding:"20px 22px" }}>{children}</div>
    </div>
  );
}

function SliderInput({ label, value, onChange, min=0, max=100, step=1, suffix="%", note, color=C.orange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      {label && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.muted }}>{label}</div>
        <div style={{ fontSize:13, fontWeight:900, color }}>{value}{suffix}</div>
      </div>}
      <div style={{ position:"relative", height:6, background:C.light, borderRadius:99, cursor:"pointer" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${color}BB,${color})`, borderRadius:99, transition:"width .1s" }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}
          style={{ position:"absolute", inset:0, width:"100%", opacity:0, cursor:"pointer", height:"100%", margin:0 }} />
        <div style={{ position:"absolute", top:"50%", left:`${pct}%`, transform:"translate(-50%,-50%)",
          width:16, height:16, borderRadius:"50%", background:C.card, border:`2.5px solid ${color}`,
          boxShadow:`0 2px 8px ${color}44`, pointerEvents:"none", transition:"left .1s" }} />
      </div>
      {note && <div style={{ fontSize:10, color:C.muted2, marginTop:6 }}>{note}</div>}
    </div>
  );
}

function TagInput({ label, tags, onAdd, onRemove, placeholder, color=C.orange }) {
  const [inp, setInp] = useState("");
  return (
    <div>
      {label && <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:5 }}>{label}</div>}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:"8px 10px", borderRadius:9,
        border:`1.5px solid ${C.border}`, background:C.card, minHeight:42 }}>
        {tags.map(t => (
          <span key={t} style={{ display:"inline-flex", alignItems:"center", gap:5, background:color+"15",
            color, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, border:`1px solid ${color}33` }}>
            {t}
            <span onClick={() => onRemove(t)} style={{ cursor:"pointer", fontSize:13, lineHeight:1, opacity:.7 }}>×</span>
          </span>
        ))}
        <input value={inp} onChange={e=>setInp(e.target.value)}
          onKeyDown={e => { if ((e.key==="Enter"||e.key===",") && inp.trim()) { onAdd(inp.trim()); setInp(""); e.preventDefault(); } }}
          placeholder={placeholder} style={{ border:"none", outline:"none", fontSize:12, color:C.text, background:"transparent", minWidth:80, flex:1 }} />
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const cfg = { online:{ bg:"#F0FDF4",color:"#15803D",dot:"#22C55E",label:"Online" }, degraded:{ bg:"#FFFBEB",color:"#B45309",dot:"#FBBF24",label:"Degraded" }, offline:{ bg:"#FFF1F2",color:"#BE123C",dot:"#F43F5E",label:"Offline" } };
  const c = cfg[status] || cfg.online;
  return <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:c.bg, color:c.color, fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99 }}><span style={{ width:6, height:6, borderRadius:"50%", background:c.dot }} />{c.label}</span>;
}

function SaveBar({ dirty, onSave, onDiscard }) {
  if (!dirty) return null;
  return (
    <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", zIndex:900,
      background:C.dark, borderRadius:14, padding:"12px 20px", display:"flex", alignItems:"center", gap:14,
      boxShadow:"0 8px 32px rgba(0,0,0,.35)", border:"1px solid #334155", animation:"slideUp .25s ease" }}>
      <span style={{ fontSize:12, fontWeight:600, color:"#CBD5E1" }}>⚠ Saqlangan o'zgarishlar mavjud</span>
      <button onClick={onDiscard} style={{ padding:"7px 16px", borderRadius:8, border:"1px solid #334155",
        background:"transparent", color:"#94A3B8", fontSize:11, fontWeight:700, cursor:"pointer" }}>
        Bekor qilish
      </button>
      <button onClick={onSave} style={{ padding:"7px 18px", borderRadius:8, border:"none",
        background:C.orange, color:"#fff", fontSize:11, fontWeight:800, cursor:"pointer",
        boxShadow:`0 4px 12px ${C.orange}66` }}>
        ✓ Saqlash
      </button>
    </div>
  );
}

// ─── SECTION COMPONENTS ───────────────────────────────────────────────────────

function PlatformSection({ setDirty }) {
  const [name,setName]       = useState("MilliyGo");
  const [tagline,setTagline] = useState("O'zbekiston superappi");
  const [desc,setDesc]       = useState("Food, Market, Taxi va Cargo xizmatlarini bir joyda taqdim etuvchi O'zbekiston raqamli platformasi.");
  const [tz,setTz]           = useState("Asia/Tashkent (UTC+5)");
  const [lang,setLang]       = useState("O'zbek (UZ)");
  const [currency,setCurrency] = useState("UZS — O'zbek so'mi");
  const [country,setCountry] = useState("O'zbekiston");
  const [supportEmail,setSupportEmail] = useState("support@milliygo.uz");
  const [supportPhone,setSupportPhone] = useState("+998 71 200 00 00");
  const [website,setWebsite] = useState("https://milliygo.uz");
  const [minOrder,setMinOrder] = useState("15000");
  const [maxOrder,setMaxOrder] = useState("5000000");

  const mark = () => setDirty(true);

  return (
    <>
      <SectionCard title="Platforma haqida" icon="🏢" sub="Asosiy nomi, tavsifi va mintaqaviy sozlamalar">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <Input label="Platforma nomi" value={name} onChange={v=>{setName(v);mark();}} placeholder="MilliyGo" />
          <Input label="Qisqa tavsif" value={tagline} onChange={v=>{setTagline(v);mark();}} placeholder="Superapp tagline" />
        </div>
        <div style={{ marginBottom:16 }}>
          <Textarea label="To'liq tavsif" value={desc} onChange={v=>{setDesc(v);mark();}} rows={2} placeholder="Platforma haqida to'liq ma'lumot..." />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={{ position:"relative" }}>
            <Select label="Vaqt mintaqasi" value={tz} onChange={v=>{setTz(v);mark();}}
              options={["Asia/Tashkent (UTC+5)","Europe/Moscow (UTC+3)","UTC+0"]} />
          </div>
          <div style={{ position:"relative" }}>
            <Select label="Asosiy til" value={lang} onChange={v=>{setLang(v);mark();}}
              options={["O'zbek (UZ)","Русский (RU)","English (EN)"]} />
          </div>
          <div style={{ position:"relative" }}>
            <Select label="Valyuta" value={currency} onChange={v=>{setCurrency(v);mark();}}
              options={["UZS — O'zbek so'mi","USD — Dollar","EUR — Euro"]} />
          </div>
          <div style={{ position:"relative" }}>
            <Select label="Faoliyat mamlakati" value={country} onChange={v=>{setCountry(v);mark();}}
              options={["O'zbekiston","Qozog'iston","Qirg'iziston","Tojikiston"]} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Aloqa ma'lumotlari" icon="📞" sub="Qo'llab-quvvatlash va rasmiy kontaktlar">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <Input label="Qo'llab-quvvatlash Email" value={supportEmail} onChange={v=>{setSupportEmail(v);mark();}} type="email" />
          <Input label="Qo'llab-quvvatlash Telefon" value={supportPhone} onChange={v=>{setSupportPhone(v);mark();}} prefix="📞" />
        </div>
        <Input label="Rasmiy veb-sayt" value={website} onChange={v=>{setWebsite(v);mark();}} prefix="🌐" />
      </SectionCard>

      <SectionCard title="Buyurtma chegaralari" icon="📦" sub="Minimal va maksimal buyurtma summasi">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <Input label="Minimal buyurtma (UZS)" value={minOrder} onChange={v=>{setMinOrder(v);mark();}} suffix="UZS" note="Barcha xizmatlar uchun minimal summa" />
          <Input label="Maksimal buyurtma (UZS)" value={maxOrder} onChange={v=>{setMaxOrder(v);mark();}} suffix="UZS" note="Bitta buyurtmada maksimal summa" />
        </div>
      </SectionCard>
    </>
  );
}

function AppearanceSection({ setDirty }) {
  const [primary,setPrimary]     = useState("#F97316");
  const [secondary,setSecondary] = useState("#0F172A");
  const [accent,setAccent]       = useState("#059669");
  const [darkMode,setDarkMode]   = useState(false);
  const [logoUrl,setLogoUrl]     = useState("https://milliygo.uz/logo.png");
  const [favicon,setFavicon]     = useState("https://milliygo.uz/favicon.ico");
  const [splashBg,setSplashBg]   = useState("#F97316");
  const [fontHead,setFontHead]   = useState("Outfit");
  const [fontBody,setFontBody]   = useState("Inter");
  const [borderRadius,setBorderRadius] = useState(12);
  const mark = () => setDirty(true);

  const colorSwatches = ["#F97316","#6366F1","#EC4899","#10B981","#0EA5E9","#8B5CF6","#EF4444","#F59E0B","#0D9488"];

  return (
    <>
      <SectionCard title="Brend ranglari" icon="🎨" sub="Asosiy rang palitrasini sozlash">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16 }}>
          {[
            { label:"Asosiy rang", val:primary, set:setPrimary },
            { label:"Ikkilamchi rang", val:secondary, set:setSecondary },
            { label:"Accent rang", val:accent, set:setAccent },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:6 }}>{label}</div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:val, border:`2px solid ${C.border}`, cursor:"pointer", flexShrink:0, position:"relative", overflow:"hidden" }}>
                  <input type="color" value={val} onChange={e=>{set(e.target.value);mark();}}
                    style={{ position:"absolute", inset:0, width:"160%", height:"160%", cursor:"pointer", opacity:0 }} />
                </div>
                <Input value={val} onChange={v=>{set(v);mark();}} mono />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:8 }}>Tez ranglar</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {colorSwatches.map(c => (
              <button key={c} onClick={() => { setPrimary(c); mark(); }}
                style={{ width:28, height:28, borderRadius:7, background:c, border:`2px solid ${primary===c?C.text:"transparent"}`, cursor:"pointer", transition:"border-color .15s" }} />
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Logo va ikonalar" icon="🖼️" sub="Platforma logo va favicon">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <Input label="Logo URL" value={logoUrl} onChange={v=>{setLogoUrl(v);mark();}} prefix="🔗" />
          <Input label="Favicon URL" value={favicon} onChange={v=>{setFavicon(v);mark();}} prefix="🔗" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[
            { label:"Joriy logo", url:logoUrl, size:60 },
            { label:"Splash ekrani foni", url:null, bg:splashBg, size:60 },
          ].map(({ label, url, bg, size }) => (
            <div key={label} style={{ background:C.light, borderRadius:10, padding:"12px", border:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, color:C.muted, fontWeight:600, marginBottom:8 }}>{label}</div>
              <div style={{ width:size, height:size, borderRadius:12, background:bg||"#F1F5F9",
                display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${C.border}` }}>
                {url ? <div style={{ fontSize:10, color:C.muted }}>IMG</div>
                  : <div style={{ width:"100%", height:"100%", borderRadius:12, background:splashBg }} />}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Tipografiya va UI" icon="✍️" sub="Shrift va interfeys sozlamalari">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div style={{ position:"relative" }}>
            <Select label="Sarlavha shrifti" value={fontHead} onChange={v=>{setFontHead(v);mark();}}
              options={["Outfit","Sora","Plus Jakarta Sans","DM Sans","Nunito"]} />
          </div>
          <div style={{ position:"relative" }}>
            <Select label="Matn shrifti" value={fontBody} onChange={v=>{setFontBody(v);mark();}}
              options={["Inter","DM Sans","Manrope","IBM Plex Sans","Source Sans"]} />
          </div>
        </div>
        <SliderInput label="Burchak yumaloqligi (border-radius)" value={borderRadius} onChange={v=>{setBorderRadius(v);mark();}} min={0} max={24} suffix="px" color={C.orange}
          note="Kartalar va tugmachalar uchun standart radius" />
        <div style={{ marginTop:16 }}>
          <SettingRow label="Qorong'i rejim (Dark mode)" sub="Platforma admin panelida dark theme">
            <Toggle value={darkMode} onChange={v=>{setDarkMode(v);mark();}} />
          </SettingRow>
        </div>
      </SectionCard>
    </>
  );
}

function SecuritySection({ setDirty }) {
  const [twoFA,setTwoFA]         = useState(true);
  const [sessionTimeout,setSessionTimeout] = useState(60);
  const [maxAttempts,setMaxAttempts] = useState(5);
  const [lockDuration,setLockDuration] = useState(15);
  const [minPassLen,setMinPassLen] = useState(8);
  const [requireUpper,setRequireUpper] = useState(true);
  const [requireNum,setRequireNum]   = useState(true);
  const [requireSymbol,setRequireSymbol] = useState(false);
  const [passExpiry,setPassExpiry]   = useState(90);
  const [ipWhitelist,setIpWhitelist] = useState(["127.0.0.1","10.0.0.0/8","192.168.1.0/24"]);
  const [ipEnabled,setIpEnabled]     = useState(false);
  const [auditLog,setAuditLog]       = useState(true);
  const [recaptcha,setRecaptcha]     = useState(true);
  const [ssoEnabled,setSsoEnabled]   = useState(false);
  const [recaptchaKey,setRecaptchaKey] = useState("6Lc8x9UUAAAAA...");
  const mark = () => setDirty(true);

  const auditRows = [
    { action:"Admin kirdi", user:"admin@milliygo.uz", ip:"92.63.104.11", time:"14:32:08", ok:true },
    { action:"Sozlama o'zgartirildi", user:"ops@milliygo.uz", ip:"92.63.104.12", time:"13:18:44", ok:true },
    { action:"Noto'g'ri parol (5x)", user:"unknown", ip:"198.51.100.5", time:"12:05:21", ok:false },
    { action:"API kaliti yangilandi", user:"admin@milliygo.uz", ip:"92.63.104.11", time:"11:42:57", ok:true },
  ];

  return (
    <>
      <SectionCard title="Autentifikatsiya" icon="🔐" sub="Ikki faktorli autentifikatsiya va seans sozlamalari">
        <SettingRow label="Ikki faktorli autentifikatsiya (2FA)" sub="TOTP (Google Authenticator / Authy) orqali qo'shimcha himoya">
          <Toggle value={twoFA} onChange={v=>{setTwoFA(v);mark();}} />
        </SettingRow>
        <SettingRow label="reCAPTCHA himoyasi" sub="Brute-force hujumlaridan himoya">
          <Toggle value={recaptcha} onChange={v=>{setRecaptcha(v);mark();}} />
        </SettingRow>
        <SettingRow label="SSO (Single Sign-On)" sub="SAML / OAuth2 orqali korporativ kirish">
          <Toggle value={ssoEnabled} onChange={v=>{setSsoEnabled(v);mark();}} />
        </SettingRow>
        {recaptcha && (
          <div style={{ marginTop:4 }}>
            <Input label="reCAPTCHA Site Key" value={recaptchaKey} onChange={v=>{setRecaptchaKey(v);mark();}} mono />
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:16 }}>
          <Input label="Seans muddati (daqiqa)" value={String(sessionTimeout)} onChange={v=>{setSessionTimeout(Number(v));mark();}} suffix="daq" type="number" note="Faolsizlikdan keyin avtomatik chiqish" />
          <Input label="Parol amal qilish muddati" value={String(passExpiry)} onChange={v=>{setPassExpiry(Number(v));mark();}} suffix="kun" type="number" note="0 = cheksiz" />
        </div>
      </SectionCard>

      <SectionCard title="Parol siyosati" icon="🔑" sub="Kuchli parol talablari">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <Input label="Minimal uzunlik" value={String(minPassLen)} onChange={v=>{setMinPassLen(Number(v));mark();}} suffix="belgi" type="number" />
          <Input label="Bloklash muddati" value={String(lockDuration)} onChange={v=>{setLockDuration(Number(v));mark();}} suffix="daq" type="number" note={`${maxAttempts} marta xato kirishdan keyin`} />
        </div>
        <div style={{ marginBottom:4 }}>
          <Input label="Maksimal urinishlar" value={String(maxAttempts)} onChange={v=>{setMaxAttempts(Number(v));mark();}} suffix="marta" type="number" />
        </div>
        <div style={{ marginTop:16 }}>
          {[
            { label:"Katta harflar (A–Z)", val:requireUpper, set:setRequireUpper },
            { label:"Raqamlar (0–9)", val:requireNum, set:setRequireNum },
            { label:"Maxsus belgilar (!@#$%)", val:requireSymbol, set:setRequireSymbol },
          ].map(({ label, val, set }) => (
            <SettingRow key={label} label={label} sub="">
              <Toggle value={val} onChange={v=>{set(v);mark();}} size="sm" />
            </SettingRow>
          ))}
        </div>
        <div style={{ background:C.light, borderRadius:10, padding:"10px 14px", marginTop:4 }}>
          <div style={{ fontSize:11, fontWeight:700, color:C.text, marginBottom:6 }}>Parol kuchi ko'rsatkichi</div>
          <div style={{ display:"flex", gap:4 }}>
            {[C.red, C.amber, C.amber, C.green, C.green].map((col, i) => (
              <div key={i} style={{ flex:1, height:5, borderRadius:99, background:(requireUpper&&requireNum&&requireSymbol&&minPassLen>=10)?col:i<2?col:C.border, transition:"background .3s" }} />
            ))}
          </div>
          <div style={{ fontSize:10, color:C.muted, marginTop:5 }}>
            {requireUpper&&requireNum&&requireSymbol&&minPassLen>=10?"💪 Kuchli":"⚠ Parol siyosatini kuchaytiring"}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="IP Whitelist" icon="🛡️" sub="Faqat ruxsat etilgan IP manzillardan kirish">
        <SettingRow label="IP Whitelist rejimi" sub="Faqat ro'yxatdagi IP'lardan kirish mumkin bo'ladi">
          <Toggle value={ipEnabled} onChange={v=>{setIpEnabled(v);mark();}} />
        </SettingRow>
        {ipEnabled && (
          <div style={{ marginTop:8 }}>
            <TagInput label="Ruxsat etilgan IP manzillar" tags={ipWhitelist}
              onAdd={ip=>{setIpWhitelist(p=>[...p,ip]);mark();}}
              onRemove={ip=>{setIpWhitelist(p=>p.filter(x=>x!==ip));mark();}}
              placeholder="IP yoki CIDR qo'shing..." />
          </div>
        )}
      </SectionCard>

      <SectionCard title="Audit log" icon="📋" sub="Admin harakatlari tarixi">
        <SettingRow label="Audit logni yoqish" sub="Barcha admin harakatlari qayd etiladi">
          <Toggle value={auditLog} onChange={v=>{setAuditLog(v);mark();}} />
        </SettingRow>
        {auditLog && (
          <div style={{ marginTop:12 }}>
            <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}` }}>
              <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 80px 60px", background:"#FAFAFA", borderBottom:`1px solid ${C.border}` }}>
                {["Harakat","Foydalanuvchi","IP manzil","Vaqt","Holat"].map(h => (
                  <div key={h} style={{ padding:"8px 12px", fontSize:9, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:.4 }}>{h}</div>
                ))}
              </div>
              {auditRows.map((r, i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 80px 60px", borderBottom:i<auditRows.length-1?`1px solid ${C.border}`:"none", background:r.ok?"transparent":"#FFF5F5" }}>
                  <div style={{ padding:"9px 12px", fontSize:11, fontWeight:700, color:C.text }}>{r.action}</div>
                  <div style={{ padding:"9px 12px", fontSize:10, color:C.muted, fontFamily:"monospace" }}>{r.user}</div>
                  <div style={{ padding:"9px 12px", fontSize:10, color:C.muted, fontFamily:"monospace" }}>{r.ip}</div>
                  <div style={{ padding:"9px 12px", fontSize:10, color:C.muted }}>{r.time}</div>
                  <div style={{ padding:"9px 12px" }}>
                    <span style={{ fontSize:10, fontWeight:700, color:r.ok?C.green:C.red }}>{r.ok?"✓ OK":"✗ Xato"}</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ marginTop:8, padding:"6px 14px", borderRadius:7, border:`1px solid ${C.border}`, background:C.card, fontSize:10, fontWeight:700, color:C.muted, cursor:"pointer" }}>
              Barchasini ko'rish →
            </button>
          </div>
        )}
      </SectionCard>
    </>
  );
}

function PaymentsSection({ setDirty }) {
  const [commFood,setCommFood]     = useState(12);
  const [commMarket,setCommMarket] = useState(10);
  const [commTaxi,setCommTaxi]     = useState(15);
  const [commCargo,setCommCargo]   = useState(8);
  const [vatRate,setVatRate]       = useState(12);
  const [payoutDelay,setPayoutDelay] = useState(3);
  const [minPayout,setMinPayout]   = useState("50000");
  const [maxPayout,setMaxPayout]   = useState("50000000");
  const [payClick,setPayClick]     = useState(true);
  const [payPayme,setPayPayme]     = useState(true);
  const [payUzum,setPayUzum]       = useState(true);
  const [payCard,setPayCard]       = useState(true);
  const [payCash,setPayCash]       = useState(true);
  const [surgeEnabled,setSurgeEnabled] = useState(true);
  const [surgeMax,setSurgeMax]     = useState(2.5);
  const mark = () => setDirty(true);

  const svcComm = [
    { label:"Food 🍔", val:commFood, set:setCommFood, color:C.orange },
    { label:"Market 🛒", val:commMarket, set:setCommMarket, color:C.emerald },
    { label:"Taxi 🚖", val:commTaxi, set:setCommTaxi, color:C.violet },
    { label:"Cargo 📦", val:commCargo, set:setCommCargo, color:C.sky },
  ];

  return (
    <>
      <SectionCard title="Komissiya stavkalari" icon="💰" sub="Xizmatlar bo'yicha platforma komissiyasi">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {svcComm.map(({ label, val, set, color }) => (
            <SliderInput key={label} label={label} value={val} onChange={v=>{set(v);mark();}} min={1} max={30} step={.5} color={color}
              note={`Platforma ${val}% — hamkor ${100-val}% oladi`} />
          ))}
        </div>
        <div style={{ marginTop:20 }}>
          <SliderInput label="QQS (VAT) stavkasi" value={vatRate} onChange={v=>{setVatRate(v);mark();}} min={0} max={25} color={C.amber}
            note="O'zbekiston soliq qonunchiligiga asosan" />
        </div>
      </SectionCard>

      <SectionCard title="To'lov metodlari" icon="💳" sub="Qabul qilinadigan to'lov usullari">
        {[
          { icon:"🔵", label:"Click", sub:"Click.uz to'lov tizimi", val:payClick, set:setPayClick },
          { icon:"🟠", label:"Payme", sub:"Payme.uz to'lov tizimi", val:payPayme, set:setPayPayme },
          { icon:"🟣", label:"Uzum Pay", sub:"Uzum Bank to'lov tizimi", val:payUzum, set:setPayUzum },
          { icon:"💳", label:"Visa / Mastercard", sub:"Xalqaro plastik kartalar", val:payCard, set:setPayCard },
          { icon:"💵", label:"Naqd pul", sub:"Yetkazib berganda to'lov", val:payCash, set:setPayCash },
        ].map(({ icon, label, sub, val, set }) => (
          <SettingRow key={label} label={`${icon} ${label}`} sub={sub}>
            <Toggle value={val} onChange={v=>{set(v);mark();}} />
          </SettingRow>
        ))}
      </SectionCard>

      <SectionCard title="To'lov chiqarish (Payout)" icon="🏦" sub="Hamkorlar va kuryer to'lovlari">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16 }}>
          <Input label="Minimal chiqarish (UZS)" value={minPayout} onChange={v=>{setMinPayout(v);mark();}} suffix="UZS" />
          <Input label="Maksimal chiqarish (UZS)" value={maxPayout} onChange={v=>{setMaxPayout(v);mark();}} suffix="UZS" />
          <Input label="Chiqarish kechikishi" value={String(payoutDelay)} onChange={v=>{setPayoutDelay(Number(v));mark();}} suffix="kun" type="number" note="Buyurtmadan keyin" />
        </div>
      </SectionCard>

      <SectionCard title="Surge pricing" icon="⚡" sub="Talabga qarab narxni oshirish">
        <SettingRow label="Surge pricing rejimi" sub="Band vaqtda narxni avtomatik oshirish">
          <Toggle value={surgeEnabled} onChange={v=>{setSurgeEnabled(v);mark();}} />
        </SettingRow>
        {surgeEnabled && (
          <div style={{ marginTop:12 }}>
            <SliderInput label="Maksimal surge koeffitsienti" value={surgeMax} onChange={v=>{setSurgeMax(v);mark();}} min={1} max={5} step={.1} suffix="×"
              note={`Narx maksimum ${surgeMax}× oshirilishi mumkin`} color={C.red} />
          </div>
        )}
      </SectionCard>
    </>
  );
}

function ServicesSection({ setDirty }) {
  const mark = () => setDirty(true);
  const services = [
    { key:"food",   icon:"🍔", label:"Food",   color:C.orange, active:true,  radius:3, eta:45, maxItems:50  },
    { key:"market", icon:"🛒", label:"Market", color:C.emerald,active:true,  radius:5, eta:60, maxItems:100 },
    { key:"taxi",   icon:"🚖", label:"Taxi",   color:C.violet, active:true,  radius:15,eta:20, maxItems:4   },
    { key:"cargo",  icon:"📦", label:"Cargo",  color:C.sky,    active:true,  radius:50,eta:120,maxItems:10  },
  ];

  const [svcState, setSvcState] = useState(services.reduce((acc, s) => ({ ...acc, [s.key]:{ ...s } }), {}));
  const [ratings,setRatings] = useState({ minCourier:"4.0", minPartner:"3.5", minBoth:"3.8" });

  return (
    <>
      {services.map(s => {
        const st = svcState[s.key];
        return (
          <SectionCard key={s.key} title={`${s.icon} ${s.label} xizmati`} icon="" sub={`${s.label} xizmati sozlamalari`}>
            <SettingRow label={`${s.label} xizmatini yoqish`} sub="Bu xizmatni barcha hududlarda faollashtirish">
              <Toggle value={st.active} onChange={v=>{ setSvcState(p=>({...p,[s.key]:{...p[s.key],active:v}})); mark(); }} accent={s.color} />
            </SettingRow>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              <Input label="Yetkazish radiusi (km)" value={String(st.radius)} onChange={v=>{setSvcState(p=>({...p,[s.key]:{...p[s.key],radius:Number(v)}}));mark();}} suffix="km" type="number" />
              <Input label="O'rt. yetkazish vaqti (daq)" value={String(st.eta)} onChange={v=>{setSvcState(p=>({...p,[s.key]:{...p[s.key],eta:Number(v)}}));mark();}} suffix="daq" type="number" />
              <Input label={s.key==="taxi"?"Maks. yo'lovchi":"Maks. mahsulot"} value={String(st.maxItems)} onChange={v=>{setSvcState(p=>({...p,[s.key]:{...p[s.key],maxItems:Number(v)}}));mark();}} type="number" />
            </div>
          </SectionCard>
        );
      })}

      <SectionCard title="Reyting chegaralari" icon="⭐" sub="Minimal reyting talablari">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          <Input label="Minimal kuryer reytingi" value={ratings.minCourier} onChange={v=>{setRatings(p=>({...p,minCourier:v}));mark();}} suffix="/ 5.0" note="Bu reytingdan past kuryerlar bloklanganda" />
          <Input label="Minimal hamkor reytingi" value={ratings.minPartner} onChange={v=>{setRatings(p=>({...p,minPartner:v}));mark();}} suffix="/ 5.0" />
          <Input label="Umumiy minimal reyting" value={ratings.minBoth} onChange={v=>{setRatings(p=>({...p,minBoth:v}));mark();}} suffix="/ 5.0" />
        </div>
      </SectionCard>
    </>
  );
}

function NotificationsSection({ setDirty }) {
  const mark = () => setDirty(true);
  const [firebaseKey,setFirebaseKey]   = useState("AAAAbcXYZ...");
  const [firebaseEnabled,setFirebaseEnabled] = useState(true);
  const [smsProvider,setSmsProvider]   = useState("Eskiz.uz");
  const [smsApiKey,setSmsApiKey]       = useState("sk-sms-••••••••••••••••");
  const [smsSender,setSmsSender]       = useState("MILLIYGO");
  const [smsEnabled,setSmsEnabled]     = useState(true);
  const [smtpHost,setSmtpHost]         = useState("smtp.gmail.com");
  const [smtpPort,setSmtpPort]         = useState("587");
  const [smtpUser,setSmtpUser]         = useState("noreply@milliygo.uz");
  const [smtpPass,setSmtpPass]         = useState("••••••••••••");
  const [emailEnabled,setEmailEnabled] = useState(true);
  const [orderNotif,setOrderNotif]     = useState(true);
  const [promoNotif,setPromoNotif]     = useState(true);
  const [systemNotif,setSystemNotif]   = useState(true);
  const [securityNotif,setSecurityNotif]=useState(true);

  return (
    <>
      <SectionCard title="Firebase Cloud Messaging (Push)" icon="🔔" sub="Mobil push bildirishnomalar uchun FCM sozlamalari">
        <SettingRow label="FCM Push xabarlari" sub="iOS va Android qurilmalarga push yuborish">
          <Toggle value={firebaseEnabled} onChange={v=>{setFirebaseEnabled(v);mark();}} />
        </SettingRow>
        <Input label="Firebase Server Key" value={firebaseKey} onChange={v=>{setFirebaseKey(v);mark();}} mono note="Firebase Console → Project Settings → Cloud Messaging" />
      </SectionCard>

      <SectionCard title="SMS Gateway" icon="💬" sub="SMS bildirishnomalar uchun provayder sozlamalari">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <SettingRow label="SMS xizmati" sub="SMS yuborishni yoqish">
            <Toggle value={smsEnabled} onChange={v=>{setSmsEnabled(v);mark();}} />
          </SettingRow>
          <div style={{ position:"relative" }}>
            <Select label="SMS Provayder" value={smsProvider} onChange={v=>{setSmsProvider(v);mark();}}
              options={["Eskiz.uz","Playmobile","Infobip","Twilio"]} />
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <Input label="API Kalit" value={smsApiKey} onChange={v=>{setSmsApiKey(v);mark();}} mono />
          <Input label="Yuboruvchi nomi" value={smsSender} onChange={v=>{setSmsSender(v);mark();}} note="Maks. 11 belgi, lotin harflar" />
        </div>
      </SectionCard>

      <SectionCard title="Email (SMTP)" icon="📧" sub="Email bildirishnomalar uchun SMTP sozlamalari">
        <SettingRow label="Email xizmati" sub="Tranzaksiya va marketing emaillarini yoqish">
          <Toggle value={emailEnabled} onChange={v=>{setEmailEnabled(v);mark();}} />
        </SettingRow>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr .5fr 1fr 1fr", gap:12 }}>
          <Input label="SMTP Host" value={smtpHost} onChange={v=>{setSmtpHost(v);mark();}} mono />
          <Input label="Port" value={smtpPort} onChange={v=>{setSmtpPort(v);mark();}} mono />
          <Input label="Foydalanuvchi" value={smtpUser} onChange={v=>{setSmtpUser(v);mark();}} />
          <Input label="Parol" value={smtpPass} onChange={v=>{setSmtpPass(v);mark();}} type="password" />
        </div>
        <button style={{ marginTop:12, padding:"7px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:C.card, fontSize:11, fontWeight:700, color:C.muted, cursor:"pointer" }}>
          📤 Test email yuborish
        </button>
      </SectionCard>

      <SectionCard title="Bildirishnoma turlari" icon="📢" sub="Qaysi voqealar uchun xabar yuborilsin">
        {[
          { label:"Buyurtma holati o'zgarishi", sub:"Tasdiqlandi, yo'lda, yetdi va hokazo", val:orderNotif, set:setOrderNotif },
          { label:"Promo va marketing", sub:"Aksiyalar va maxsus takliflar", val:promoNotif, set:setPromoNotif },
          { label:"Tizim xabarlari", sub:"Texnik ishlar va yangilanishlar", val:systemNotif, set:setSystemNotif },
          { label:"Xavfsizlik ogohlantirishlari", sub:"Noma'lum kirish va boshqalar", val:securityNotif, set:setSecurityNotif },
        ].map(({ label, sub, val, set }) => (
          <SettingRow key={label} label={label} sub={sub}>
            <Toggle value={val} onChange={v=>{set(v);mark();}} />
          </SettingRow>
        ))}
      </SectionCard>
    </>
  );
}

function IntegrationsSection({ setDirty }) {
  const mark = () => setDirty(true);
  const [apiKey,setApiKey]           = useState("mg_live_sk_8f7d2c9e1a3b5f6d4e2a8c0b7e9f1d3c");
  const [apiKeyTest,setApiKeyTest]   = useState("mg_test_sk_2d4f6e8a0c2e4f6a8b0d2f4e6a8c0e2f");
  const [webhookUrl,setWebhookUrl]   = useState("https://partner.example.com/webhooks/milliygo");
  const [webhookSecret,setWebhookSecret] = useState("whs_••••••••••••••••••••••••");
  const [webhookEvents,setWebhookEvents] = useState(["order.created","payment.completed","order.delivered"]);
  const [mapsProvider,setMapsProvider] = useState("Google Maps");
  const [mapsKey,setMapsKey]         = useState("AIzaSy••••••••••••••••••••••••••••••");
  const [analyticsId,setAnalyticsId] = useState("G-XXXXXXXXXX");
  const [sentryDsn,setSentryDsn]     = useState("https://••••@sentry.io/12345");
  const [slackWebhook,setSlackWebhook] = useState("");
  const [telegramBot,setTelegramBot] = useState("");

  const allEvents = ["order.created","order.accepted","order.picked_up","order.delivered","order.cancelled",
    "payment.completed","payment.failed","payment.refunded","courier.assigned","courier.arrived","user.registered"];

  const toggleEvent = (ev) => {
    setWebhookEvents(p => p.includes(ev) ? p.filter(x=>x!==ev) : [...p, ev]);
    mark();
  };

  return (
    <>
      <SectionCard title="API Kalitlari" icon="🔑" sub="Live va test muhit uchun API kalitlari">
        <div style={{ marginBottom:14 }}>
          <Input label="Live API Kaliti" value={apiKey} onChange={v=>{setApiKey(v);mark();}} mono
            note="Faqat ishlab chiqarish muhitida foydalaning" />
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            <button style={{ padding:"6px 12px", borderRadius:7, border:`1px solid ${C.border}`, background:C.card, fontSize:10, fontWeight:700, color:C.muted, cursor:"pointer" }}>
              📋 Nusxa olish
            </button>
            <button style={{ padding:"6px 12px", borderRadius:7, border:`1px solid ${C.rose}44`, background:"#FFF1F2", fontSize:10, fontWeight:700, color:C.rose, cursor:"pointer" }}>
              🔄 Yangilash
            </button>
          </div>
        </div>
        <Input label="Test API Kaliti" value={apiKeyTest} onChange={v=>{setApiKeyTest(v);mark();}} mono
          note="Faqat sinov muhitida foydalaning. Haqiqiy pul ishlatilmaydi" />
      </SectionCard>

      <SectionCard title="Webhook sozlamalari" icon="🔗" sub="Tashqi tizimlarga hodisalar yuborish">
        <div style={{ marginBottom:12 }}>
          <Input label="Webhook URL" value={webhookUrl} onChange={v=>{setWebhookUrl(v);mark();}} mono prefix="🌐" />
        </div>
        <div style={{ marginBottom:16 }}>
          <Input label="Webhook Maxfiy kalit (Secret)" value={webhookSecret} onChange={v=>{setWebhookSecret(v);mark();}} mono type="password" note="HMAC-SHA256 imzolash uchun ishlatiladi" />
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:C.muted, marginBottom:8 }}>Webhook hodisalari</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {allEvents.map(ev => {
              const sel = webhookEvents.includes(ev);
              return (
                <button key={ev} onClick={() => toggleEvent(ev)}
                  style={{ padding:"4px 11px", borderRadius:99, border:`1px solid ${sel?C.orange:C.border}`,
                    background:sel?C.orangeL:C.card, color:sel?C.orangeD:C.muted,
                    fontSize:9, fontWeight:700, cursor:"pointer", fontFamily:"monospace", transition:"all .15s" }}>
                  {ev}
                </button>
              );
            })}
          </div>
        </div>
        <button style={{ marginTop:12, padding:"7px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:C.card, fontSize:11, fontWeight:700, color:C.muted, cursor:"pointer" }}>
          📤 Test webhook yuborish
        </button>
      </SectionCard>

      <SectionCard title="Tashqi xizmatlar" icon="🌐" sub="Xarita, analitika va monitoring integratsiyalari">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div style={{ position:"relative" }}>
            <Select label="Xarita provayderi" value={mapsProvider} onChange={v=>{setMapsProvider(v);mark();}}
              options={["Google Maps","Yandex Maps","OpenStreetMap","HERE Maps"]} />
          </div>
          <Input label="Xarita API Kaliti" value={mapsKey} onChange={v=>{setMapsKey(v);mark();}} mono />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <Input label="Google Analytics ID" value={analyticsId} onChange={v=>{setAnalyticsId(v);mark();}} mono note="GA4 o'lchov identifikatori" />
          <Input label="Sentry DSN" value={sentryDsn} onChange={v=>{setSentryDsn(v);mark();}} mono note="Xato monitoring platformasi" />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <Input label="Slack Webhook" value={slackWebhook} onChange={v=>{setSlackWebhook(v);mark();}} placeholder="https://hooks.slack.com/..." note="Ogohlantirishlarni Slack'ga yuborish" />
          <Input label="Telegram Bot Token" value={telegramBot} onChange={v=>{setTelegramBot(v);mark();}} placeholder="5555555555:AAF..." mono note="Tizim xabarlari uchun" />
        </div>
      </SectionCard>
    </>
  );
}

function AdminsSection({ setDirty }) {
  const [admins] = useState([
    { id:1, name:"Sardor Yusupov",    email:"sardor@milliygo.uz",    role:"Super Admin",  status:"Active",  last:"2025-10-30 14:32", avatar:"SY" },
    { id:2, name:"Kamola Nazarova",   email:"kamola@milliygo.uz",    role:"Admin",        status:"Active",  last:"2025-10-30 12:18", avatar:"KN" },
    { id:3, name:"Bobur Toshmatov",   email:"bobur@milliygo.uz",     role:"Ops Manager",  status:"Active",  last:"2025-10-29 18:44", avatar:"BT" },
    { id:4, name:"Zilola Rahimova",   email:"zilola@milliygo.uz",    role:"Support Lead", status:"Active",  last:"2025-10-30 11:05", avatar:"ZR" },
    { id:5, name:"Jasur Ergashev",    email:"jasur@milliygo.uz",     role:"Analyst",      status:"Inactive",last:"2025-10-25 09:30", avatar:"JE" },
  ]);

  const roles = [
    { name:"Super Admin",  color:C.rose,    perms:["Barcha ruxsatlar"] },
    { name:"Admin",        color:C.orange,  perms:["Boshqaruv","Sozlashlar","Hisobotlar"] },
    { name:"Ops Manager",  color:C.violet,  perms:["Operatsiyalar","Kuryerlar","Buyurtmalar"] },
    { name:"Support Lead", color:C.blue,    perms:["Tiketlar","Foydalanuvchilar"] },
    { name:"Analyst",      color:C.teal,    perms:["Faqat o'qish","Hisobotlar"] },
  ];

  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole]   = useState("Admin");

  return (
    <>
      <SectionCard title="Admin foydalanuvchilar" icon="👥" sub="Tizimga kirish huquqi bor adminlar">
        <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}`, marginBottom:16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr 140px 80px 140px 80px", background:"#FAFAFA", borderBottom:`1px solid ${C.border}` }}>
            {["Ism","Email","Rol","Holat","Oxirgi kirish",""].map(h => (
              <div key={h} style={{ padding:"9px 12px", fontSize:9, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:.4 }}>{h}</div>
            ))}
          </div>
          {admins.map((a, i) => {
            const roleC = roles.find(r=>r.name===a.role)?.color || C.muted;
            return (
              <div key={a.id} style={{ display:"grid", gridTemplateColumns:"200px 1fr 140px 80px 140px 80px", alignItems:"center", borderBottom:i<admins.length-1?`1px solid ${C.border}`:"none", background:a.status==="Inactive"?"#FAFAFA":"transparent" }}>
                <div style={{ padding:"10px 12px", display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:roleC+"1A", border:`1px solid ${roleC}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:roleC, flexShrink:0 }}>
                    {a.avatar}
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color:a.status==="Inactive"?C.muted:C.text }}>{a.name}</span>
                </div>
                <div style={{ padding:"10px 12px", fontSize:11, color:C.muted, fontFamily:"monospace" }}>{a.email}</div>
                <div style={{ padding:"10px 12px" }}>
                  <span style={{ background:roleC+"15", color:roleC, fontSize:10, fontWeight:700, padding:"3px 9px", borderRadius:99 }}>{a.role}</span>
                </div>
                <div style={{ padding:"10px 12px" }}>
                  <span style={{ fontSize:10, fontWeight:700, color:a.status==="Active"?C.green:C.muted }}>{a.status==="Active"?"● Faol":"○ Nofaol"}</span>
                </div>
                <div style={{ padding:"10px 12px", fontSize:10, color:C.muted }}>{a.last}</div>
                <div style={{ padding:"10px 12px", display:"flex", gap:5 }}>
                  <button style={{ width:26, height:26, borderRadius:6, border:`1px solid ${C.border}`, background:C.card, cursor:"pointer", fontSize:11, display:"flex", alignItems:"center", justifyContent:"center" }}>✏️</button>
                  {a.role!=="Super Admin" && <button style={{ width:26, height:26, borderRadius:6, border:`1px solid #FECDD3`, background:"#FFF1F2", cursor:"pointer", fontSize:11, display:"flex", alignItems:"center", justifyContent:"center" }}>🗑</button>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Invite */}
        <div style={{ background:C.orangeL, borderRadius:10, padding:"14px", border:`1px solid ${C.orangeB}` }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.orangeD, marginBottom:10 }}>+ Yangi admin taklif qilish</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:10, alignItems:"end" }}>
            <Input label="Email manzil" value={newEmail} onChange={setNewEmail} placeholder="user@company.com" />
            <div style={{ position:"relative" }}>
              <Select label="Rol" value={newRole} onChange={setNewRole} options={roles.map(r=>r.name)} />
            </div>
            <button style={{ padding:"9px 16px", borderRadius:9, border:"none", background:C.orange, color:"#fff", fontSize:11, fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" }}>
              📨 Taklif yuborish
            </button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Rollar va ruxsatlar" icon="🔒" sub="Har bir rol uchun kirish huquqlari">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
          {roles.map(({ name, color, perms }) => (
            <div key={name} style={{ background:color+"08", borderRadius:10, padding:"12px", border:`1px solid ${color}22` }}>
              <div style={{ width:32, height:32, borderRadius:8, background:color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, marginBottom:8 }}>
                {name.includes("Super")?"👑":name.includes("Admin")?"⚙️":name.includes("Ops")?"🔧":name.includes("Support")?"🎧":"📊"}
              </div>
              <div style={{ fontSize:11, fontWeight:900, color, marginBottom:6 }}>{name}</div>
              {perms.map(p => (
                <div key={p} style={{ fontSize:9, color:C.muted, marginBottom:3, display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ color }}>✓</span>{p}
                </div>
              ))}
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}

function DataSection({ setDirty }) {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFreq, setBackupFreq] = useState("Har kecha");
  const [retentionDays, setRetentionDays] = useState(90);
  const [encryptBackup, setEncryptBackup] = useState(true);
  const [gdprMode, setGdprMode] = useState(true);
  const [anonAfter, setAnonAfter] = useState(365);
  const mark = () => setDirty(true);

  const backups = [
    { name:"backup_2025-10-30_03-00.sql.gz", size:"284 MB", status:"ok",  time:"03:00" },
    { name:"backup_2025-10-29_03-00.sql.gz", size:"281 MB", status:"ok",  time:"03:00" },
    { name:"backup_2025-10-28_03-00.sql.gz", size:"279 MB", status:"ok",  time:"03:00" },
    { name:"backup_2025-10-27_03-00.sql.gz", size:"276 MB", status:"warn",time:"03:14" },
  ];

  return (
    <>
      <SectionCard title="Zaxira nusxalash (Backup)" icon="💾" sub="Avtomatik ma'lumotlar zaxirasi">
        <SettingRow label="Avtomatik backup" sub="Ma'lumotlar bazasini avtomatik saqlab borish">
          <Toggle value={autoBackup} onChange={v=>{setAutoBackup(v);mark();}} />
        </SettingRow>
        <SettingRow label="Backupni shifrlash" sub="AES-256 shifrlash bilan himoyalash">
          <Toggle value={encryptBackup} onChange={v=>{setEncryptBackup(v);mark();}} />
        </SettingRow>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div style={{ position:"relative" }}>
            <Select label="Backup chastotasi" value={backupFreq} onChange={v=>{setBackupFreq(v);mark();}}
              options={["Har kecha","Har 6 soat","Har soat","Haftada bir"]} />
          </div>
          <Input label="Saqlash muddati" value={String(retentionDays)} onChange={v=>{setRetentionDays(Number(v));mark();}} suffix="kun" type="number" note="0 = cheksiz" />
        </div>

        <div style={{ borderRadius:10, overflow:"hidden", border:`1px solid ${C.border}` }}>
          <div style={{ padding:"10px 14px", background:"#FAFAFA", borderBottom:`1px solid ${C.border}`, fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:.4 }}>
            So'nggi backuplar
          </div>
          {backups.map((b, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 14px", borderBottom:i<backups.length-1?`1px solid ${C.border}`:"none" }}>
              <span style={{ fontSize:18 }}>💾</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, fontWeight:700, color:C.text, fontFamily:"monospace", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{b.name}</div>
                <div style={{ fontSize:9, color:C.muted, marginTop:1 }}>{b.size} · {b.time}</div>
              </div>
              <span style={{ fontSize:10, fontWeight:700, color:b.status==="ok"?C.green:C.amber }}>{b.status==="ok"?"✓ OK":"⚠ Kech"}</span>
              <button style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${C.border}`, background:C.card, fontSize:9, fontWeight:700, color:C.muted, cursor:"pointer" }}>⬇ Yuklab olish</button>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          <button style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${C.orange}44`, background:C.orangeL, fontSize:11, fontWeight:700, color:C.orangeD, cursor:"pointer" }}>
            🔄 Hozir backup qilish
          </button>
          <button style={{ padding:"8px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:C.card, fontSize:11, fontWeight:700, color:C.muted, cursor:"pointer" }}>
            📥 Backup yuklash
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Ma'lumotlarni eksport qilish" icon="📤" sub="Tizim ma'lumotlarini CSV / JSON formatida yuklab olish">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {[
            { label:"Foydalanuvchilar", icon:"👥", count:"94 200" },
            { label:"Buyurtmalar", icon:"📦", count:"185 420" },
            { label:"To'lovlar", icon:"💳", count:"184 200" },
            { label:"Kuryerlar", icon:"🛵", count:"484" },
            { label:"Hamkorlar", icon:"🤝", count:"2 980" },
            { label:"Analitika", icon:"📊", count:"30 kun" },
          ].map(({ label, icon, count }) => (
            <button key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"12px 8px", borderRadius:10, border:`1px solid ${C.border}`, background:C.light, cursor:"pointer", transition:"all .15s" }}>
              <span style={{ fontSize:22 }}>{icon}</span>
              <span style={{ fontSize:11, fontWeight:700, color:C.text }}>{label}</span>
              <span style={{ fontSize:9, color:C.muted }}>{count} yozuv</span>
              <span style={{ fontSize:9, fontWeight:700, color:C.orange }}>⬇ CSV / JSON</span>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="GDPR va maxfiylik" icon="🛡️" sub="Ma'lumotlar himoyasi va anonimlashtirish">
        <SettingRow label="GDPR muvofiqlik rejimi" sub="Foydalanuvchi ma'lumotlarini himoya qilish talablari">
          <Toggle value={gdprMode} onChange={v=>{setGdprMode(v);mark();}} />
        </SettingRow>
        <Input label="Hisobni o'chirishdan keyin anonim qilish (kun)" value={String(anonAfter)} onChange={v=>{setAnonAfter(Number(v));mark();}} suffix="kun" type="number" note="O'chirilgan hisob ma'lumotlari shu kundan keyin anonimlanadi" />
      </SectionCard>

      <SectionCard title="Ma'lumotlarni tozalash" icon="🗑️" sub="Test va eski ma'lumotlarni o'chirish" danger>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {[
            { label:"Test ma'lumotlarini tozalash", sub:"Test buyurtma va to'lovlarni o'chirish" },
            { label:"Kesh tozalash", sub:"Redis va tizim keshini tozalash" },
            { label:"Log fayllarni tozalash", sub:"30+ kunlik log fayllarni o'chirish" },
            { label:"Barcha ma'lumotlarni RESET", sub:"⚠️ QAYTARIB BO'LMAYDI!" },
          ].map(({ label, sub }) => (
            <button key={label} style={{ padding:"10px 14px", borderRadius:9, border:`1px solid #FECDD3`, background:"#FFF1F2", cursor:"pointer", textAlign:"left" }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.red }}>{label}</div>
              <div style={{ fontSize:9, color:C.muted, marginTop:3 }}>{sub}</div>
            </button>
          ))}
        </div>
      </SectionCard>
    </>
  );
}

function SystemSection({ setDirty }) {
  const [maintenance, setMaintenance] = useState(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState("Tizimda texnik ishlar olib borilmoqda. Iltimos, keyinroq urinib ko'ring.");
  const [debugMode, setDebugMode]   = useState(false);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [rateLimit, setRateLimit]   = useState(100);
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [cacheTtl, setCacheTtl]     = useState(300);
  const [logLevel, setLogLevel]     = useState("Info");
  const mark = () => setDirty(true);

  const sysMetrics = [
    { label:"API Server",       status:"online",   ping:"42ms",  load:"38%" },
    { label:"Ma'lumotlar bazasi",status:"online",   ping:"8ms",   load:"24%" },
    { label:"Redis Cache",      status:"online",   ping:"2ms",   load:"12%" },
    { label:"FCM Gateway",      status:"online",   ping:"128ms", load:"—"   },
    { label:"SMS Gateway",      status:"degraded", ping:"340ms", load:"—"   },
    { label:"CDN",              status:"online",   ping:"18ms",  load:"6%"  },
  ];

  return (
    <>
      <SectionCard title="Tizim holati" icon="💻" sub="Real vaqt server va xizmat monitoringi">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
          {sysMetrics.map(m => (
            <div key={m.label} style={{ background:m.status==="degraded"?C.amberL:C.light, borderRadius:10, padding:"12px 14px", border:`1px solid ${m.status==="degraded"?C.amber:C.border}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                <span style={{ fontSize:11, fontWeight:700, color:C.text }}>{m.label}</span>
                <StatusPill status={m.status} />
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <div><div style={{ fontSize:9, color:C.muted }}>Ping</div><div style={{ fontSize:11, fontWeight:700, color:C.text }}>{m.ping}</div></div>
                {m.load!=="—" && <div><div style={{ fontSize:9, color:C.muted }}>Yuk</div><div style={{ fontSize:11, fontWeight:700, color:Number(m.load)>80?C.red:C.green }}>{m.load}</div></div>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {[
            { label:"Uptime", val:"99.94%", color:C.green, icon:"⬆️" },
            { label:"Bugungi so'rovlar", val:"2.84M", color:C.blue, icon:"🔄" },
            { label:"Xato darajasi", val:"0.12%", color:C.amber, icon:"⚠️" },
            { label:"O'rtacha javob", val:"142ms", color:C.teal, icon:"⚡" },
          ].map(({ label, val, color, icon }) => (
            <div key={label} style={{ background:color+"0D", borderRadius:10, padding:"10px 12px", border:`1px solid ${color}22`, textAlign:"center" }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
              <div style={{ fontSize:16, fontWeight:900, color, letterSpacing:-.4 }}>{val}</div>
              <div style={{ fontSize:9, color:C.muted, marginTop:2, fontWeight:600 }}>{label}</div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Texnik xizmat rejimi" icon="🔧" sub="Texnik ishlar uchun vaqtinchalik to'xtatish" danger={maintenance}>
        <SettingRow label="Texnik xizmat rejimi" sub="Aktiv bo'lganda foydalanuvchilar platformaga kira olmaydi">
          <Toggle value={maintenance} onChange={v=>{setMaintenance(v);mark();}} accent={C.red} />
        </SettingRow>
        {maintenance && (
          <div style={{ marginTop:8 }}>
            <Textarea label="Texnik xizmat xabari" value={maintenanceMsg} onChange={v=>{setMaintenanceMsg(v);mark();}} rows={2}
              note="Foydalanuvchilar bu xabarni ko'radi" />
          </div>
        )}
      </SectionCard>

      <SectionCard title="Kesh va unumdorlik" icon="⚡" sub="Redis kesh va tizim optimizatsiyasi">
        <SettingRow label="Kesh yoqish" sub="Ma'lumotlarni Redis'da kesh qilish">
          <Toggle value={cacheEnabled} onChange={v=>{setCacheEnabled(v);mark();}} />
        </SettingRow>
        {cacheEnabled && (
          <div style={{ marginTop:8 }}>
            <Input label="Kesh amal qilish muddati (TTL)" value={String(cacheTtl)} onChange={v=>{setCacheTtl(Number(v));mark();}} suffix="soniya" type="number" />
          </div>
        )}
        <div style={{ display:"flex", gap:8, marginTop:12 }}>
          <button style={{ padding:"7px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:C.card, fontSize:11, fontWeight:700, color:C.muted, cursor:"pointer" }}>
            🗑 Keshni tozalash
          </button>
          <button style={{ padding:"7px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:C.card, fontSize:11, fontWeight:700, color:C.muted, cursor:"pointer" }}>
            📊 Kesh statistikasi
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Tizim loglari" icon="📋" sub="Log darajasi va monitoring">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          <div style={{ position:"relative" }}>
            <Select label="Log darajasi" value={logLevel} onChange={v=>{setLogLevel(v);mark();}}
              options={["Error","Warn","Info","Debug","Trace"]} />
          </div>
          <Input label="API Rate Limit (so'rov/min)" value={String(rateLimit)} onChange={v=>{setRateLimit(Number(v));mark();}} suffix="/min" type="number" />
        </div>
        <SettingRow label="Rate Limiting" sub="IP boshiga so'rov chegarasini qo'llash">
          <Toggle value={rateLimitEnabled} onChange={v=>{setRateLimitEnabled(v);mark();}} />
        </SettingRow>
        <SettingRow label="Debug rejimi" sub="Batafsil log va xato ma'lumotlari (faqat ishlab chiqishda)">
          <Toggle value={debugMode} onChange={v=>{setDebugMode(v);mark();}} accent={C.amber} />
        </SettingRow>
        {debugMode && (
          <div style={{ background:C.amberL, borderRadius:9, padding:"10px 14px", border:`1px solid ${C.amber}44`, fontSize:11, color:C.amber, fontWeight:700 }}>
            ⚠ Debug rejimi ishlayapti. Ishlab chiqarish muhitida o'chiring!
          </div>
        )}
      </SectionCard>
    </>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MilliyGoSettingsPage() {
  const [active, setActive] = useState("platform");
  const [dirty, setDirty]   = useState(false);
  const [saved, setSaved]   = useState(false);

  const handleSave = () => {
    setSaved(true); setDirty(false);
    setTimeout(() => setSaved(false), 2500);
  };
  const handleDiscard = () => setDirty(false);

  const renderSection = () => {
    switch (active) {
      case "platform":      return <PlatformSection setDirty={setDirty} />;
      case "appearance":    return <AppearanceSection setDirty={setDirty} />;
      case "security":      return <SecuritySection setDirty={setDirty} />;
      case "payments":      return <PaymentsSection setDirty={setDirty} />;
      case "services":      return <ServicesSection setDirty={setDirty} />;
      case "notifications": return <NotificationsSection setDirty={setDirty} />;
      case "integrations":  return <IntegrationsSection setDirty={setDirty} />;
      case "admins":        return <AdminsSection setDirty={setDirty} />;
      case "data":          return <DataSection setDirty={setDirty} />;
      case "system":        return <SystemSection setDirty={setDirty} />;
      default: return null;
    }
  };

  const current = SECTIONS.find(s => s.id === active);

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Outfit','Inter',sans-serif", display:"flex", flexDirection:"column" }}>
      <style>{`
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px;}
        button:hover{opacity:.88;}
        textarea,input,select{font-family:inherit;}
        .nav-item:hover{background:#FFF7ED !important;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        @keyframes slideUp{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}
        @keyframes toastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      `}</style>

      {/* Toast */}
      {saved && (
        <div style={{ position:"fixed", top:24, right:24, zIndex:1000, background:C.emerald, color:"#fff",
          borderRadius:10, padding:"10px 20px", fontSize:12, fontWeight:700,
          boxShadow:`0 4px 16px ${C.emerald}44`, animation:"toastIn .25s ease", display:"flex", alignItems:"center", gap:8 }}>
          ✓ Barcha o'zgarishlar saqlandi
        </div>
      )}

      {/* Top Header */}
      <div style={{ background:C.card, borderBottom:`1px solid ${C.border}`, padding:"16px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:C.orangeL, border:`1px solid ${C.orangeB}`, borderRadius:8, padding:"4px 10px", fontSize:10, fontWeight:700, color:C.orangeD, letterSpacing:.5, textTransform:"uppercase", marginBottom:6 }}>
            MilliyGo Superadmin
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <h1 style={{ fontSize:20, fontWeight:900, color:C.text, letterSpacing:-.5, margin:0 }}>⚙ Umumiy Sozlamalar</h1>
            {dirty && <span style={{ fontSize:10, fontWeight:700, color:C.orange, background:C.orangeL, padding:"3px 9px", borderRadius:99, border:`1px solid ${C.orangeB}` }}>● Saqlang ish</span>}
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={handleDiscard} disabled={!dirty}
            style={{ padding:"8px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.card, color:dirty?C.text:C.muted, fontSize:12, fontWeight:700, cursor:dirty?"pointer":"default", opacity:dirty?1:.5 }}>
            Bekor qilish
          </button>
          <button onClick={handleSave}
            style={{ padding:"8px 18px", borderRadius:9, border:"none", background:dirty?C.orange:"#CBD5E1", color:"#fff", fontSize:12, fontWeight:800, cursor:dirty?"pointer":"default",
              boxShadow:dirty?`0 4px 14px ${C.orange}44`:"none", transition:"all .2s" }}>
            ✓ Saqlash
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* ── SIDEBAR ── */}
        <div style={{ width:256, flexShrink:0, background:C.card, borderRight:`1px solid ${C.border}`, overflowY:"auto", padding:"12px 10px" }}>
          {/* Search */}
          <div style={{ position:"relative", marginBottom:12 }}>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:C.muted }}>🔍</span>
            <input placeholder="Qidirish..." style={{ width:"100%", padding:"8px 10px 8px 30px", borderRadius:9, border:`1px solid ${C.border}`, fontSize:11, color:C.text, outline:"none", background:C.light }} />
          </div>

          {SECTIONS.map(s => {
            const isActive = active === s.id;
            return (
              <button key={s.id} className="nav-item" onClick={() => setActive(s.id)}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10,
                  border:`1px solid ${isActive?C.orangeB:"transparent"}`,
                  background:isActive?C.orangeL:"transparent",
                  cursor:"pointer", transition:"all .15s", marginBottom:2, textAlign:"left",
                  boxShadow:isActive?`0 1px 6px ${C.orange}18`:"none" }}>
                <div style={{ width:30, height:30, borderRadius:8, flexShrink:0,
                  background:isActive?C.orange+"20":C.light,
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, transition:"background .15s" }}>
                  {s.icon}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:isActive?800:600, color:isActive?C.orangeD:C.text, letterSpacing:-.2 }}>{s.label}</div>
                  <div style={{ fontSize:9, color:C.muted2, marginTop:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.sub}</div>
                </div>
                {isActive && <span style={{ fontSize:10, color:C.orange, flexShrink:0 }}>›</span>}
              </button>
            );
          })}

          {/* App version */}
          <div style={{ margin:"16px 4px 4px", padding:"10px 12px", background:C.light, borderRadius:10, border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:9, color:C.muted2, fontWeight:600, textTransform:"uppercase", letterSpacing:.5, marginBottom:4 }}>Tizim versiyasi</div>
            <div style={{ fontSize:11, fontWeight:800, color:C.text }}>MilliyGo Admin v2.4.1</div>
            <div style={{ fontSize:9, color:C.muted, marginTop:2 }}>Build 2025.10.30 · Stable</div>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:6 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:C.green }} />
              <span style={{ fontSize:9, color:C.green, fontWeight:600 }}>Yangilangan</span>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>
          {/* Breadcrumb */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
            <span style={{ fontSize:11, color:C.muted }}>Sozlamalar</span>
            <span style={{ fontSize:11, color:C.muted2 }}>›</span>
            <span style={{ fontSize:11, fontWeight:700, color:C.text }}>{current?.label}</span>
            {dirty && <span style={{ width:7, height:7, borderRadius:"50%", background:C.orange, marginLeft:4 }} />}
          </div>

          {/* Section header */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, paddingBottom:20, borderBottom:`2px solid ${C.border}` }}>
            <div style={{ width:48, height:48, borderRadius:14, background:C.orangeL, border:`1px solid ${C.orangeB}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
              {current?.icon}
            </div>
            <div>
              <h2 style={{ fontSize:18, fontWeight:900, color:C.text, letterSpacing:-.4, margin:0, lineHeight:1 }}>{current?.label}</h2>
              <p style={{ fontSize:12, color:C.muted, margin:"5px 0 0" }}>{current?.sub}</p>
            </div>
          </div>

          {/* Dynamic section */}
          <div style={{ animation:"fadeIn .25s ease", maxWidth:900 }}>
            {renderSection()}
          </div>

          {/* Bottom save bar (inline) */}
          {dirty && (
            <div style={{ maxWidth:900, marginTop:8 }}>
              <div style={{ background:C.orangeL, border:`1px solid ${C.orangeB}`, borderRadius:12, padding:"14px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>💾</span>
                  <div>
                    <div style={{ fontSize:12, fontWeight:800, color:C.orangeD }}>Saqlangan o'zgarishlar mavjud</div>
                    <div style={{ fontSize:10, color:C.orange }}>O'zgarishlar saqlanmagan. Sahifadan chiqmang.</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={handleDiscard} style={{ padding:"8px 16px", borderRadius:8, border:`1px solid ${C.orangeB}`, background:"transparent", color:C.orange, fontSize:11, fontWeight:700, cursor:"pointer" }}>
                    Bekor qilish
                  </button>
                  <button onClick={handleSave} style={{ padding:"8px 18px", borderRadius:8, border:"none", background:C.orange, color:"#fff", fontSize:11, fontWeight:800, cursor:"pointer", boxShadow:`0 4px 12px ${C.orange}44` }}>
                    ✓ Barcha o'zgarishlarni saqlash
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{ height:40 }} />
        </div>
      </div>

      <SaveBar dirty={dirty} onSave={handleSave} onDiscard={handleDiscard} />
    </div>
  );
}