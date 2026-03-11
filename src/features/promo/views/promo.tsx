import { useState, useMemo, useRef, useEffect } from "react";

const C = {
  brand:"#EC4899", brandDark:"#BE185D", brandLight:"#FDF2F8", brandBorder:"#FBCFE8",
  orange:"#F97316", emerald:"#059669", blue:"#2563EB", sky:"#0EA5E9",
  red:"#DC2626", rose:"#F43F5E", amber:"#D97706", violet:"#7C3AED",
  teal:"#0D9488", yellow:"#CA8A04", lime:"#65A30D",
  text:"#0F172A", muted:"#64748B", light:"#F1F5F9", border:"#E2E8F0",
  card:"#FFFFFF", bg:"#F8FAFC", slate:"#0F172A",
  green:"#16A34A", indigo:"#4F46E5",
};

const PROMO_TYPE = {
  Foiz:         { icon:"🏷️",  color:C.brand,   bg:"#FDF2F8",  label:"% Chegirma"      },
  Belgilangan:  { icon:"💵",  color:C.emerald,  bg:"#F0FDF4",  label:"Belgilangan summa"},
  BepulYetkazish:{ icon:"🚚", color:C.blue,     bg:"#EFF6FF",  label:"Bepul yetkazish"  },
  Cashback:     { icon:"💸",  color:C.violet,   bg:"#F5F3FF",  label:"Cashback"         },
  BonusBall:    { icon:"⭐",  color:C.amber,    bg:"#FFFBEB",  label:"Bonus ball"       },
  Sovga:       { icon:"🎁",  color:C.orange,   bg:"#FFF7ED",  label:"Sovg'a"           },
};

const STATUS_P = {
  Active:    { bg:"#F0FDF4", color:"#15803D", dot:"#22C55E", label:"Faol"        },
  Scheduled: { bg:"#EFF6FF", color:"#1D4ED8", dot:"#60A5FA", label:"Rejalashgan" },
  Paused:    { bg:"#FFFBEB", color:"#B45309", dot:"#FBBF24", label:"To'xtatilgan"},
  Draft:     { bg:"#F1F5F9", color:"#64748B", dot:"#94A3B8", label:"Qoralama"    },
  Expired:   { bg:"#FFF1F2", color:"#BE123C", dot:"#F43F5E", label:"Muddati tugagan"},
};

const TARGET = {
  "Barcha foydalanuvchilar":{ icon:"👥", color:C.blue   },
  "Yangi foydalanuvchilar": { icon:"🆕", color:C.emerald },
  "VIP mijozlar":           { icon:"👑", color:C.amber   },
  "Faolsiz mijozlar":       { icon:"💤", color:C.violet  },
  "Tug'ilgan kun":          { icon:"🎂", color:C.brand   },
  "Hamkorlar":              { icon:"🤝", color:C.orange  },
};

const SERVICE_CFG = {
  Hammasi:{ icon:"🏢", color:C.muted,  bg:C.light     },
  Food:   { icon:"🍔", color:C.orange, bg:"#FFF7ED"   },
  Market: { icon:"🛒", color:C.emerald,bg:"#F0FDF4"   },
  Taxi:   { icon:"🚖", color:C.violet, bg:"#F5F3FF"   },
  Cargo:  { icon:"📦", color:C.sky,    bg:"#F0F9FF"   },
};

const PROMOS = [
  {
    id:"PRO-1001", code:"MILLIY20", name:"Bahor chegirmasi", type:"Foiz",
    value:20, minOrder:50000, maxDiscount:30000, usageLimit:500, usedCount:312,
    status:"Active", target:"Barcha foydalanuvchilar", service:"Food",
    startDate:"2025-10-01", endDate:"2025-11-01",
    revenue:38400000, orders:312, avgOrder:123000,
    description:"Barcha food buyurtmalarida 20% chegirma. Maksimal 30 000 UZS.",
    conditions:["Minimal buyurtma: 50 000 UZS","Faqat Food xizmati","Bir foydalanuvchi 1 marta"],
    cities:["Tashkent","Samarqand","Namangan"],
    createdBy:"Admin", createdAt:"2025-09-28",
  },
  {
    id:"PRO-1002", code:"FREESHIP", name:"Bepul yetkazish haftaligi", type:"BepulYetkazish",
    value:100, minOrder:30000, maxDiscount:15000, usageLimit:1000, usedCount:887,
    status:"Active", target:"Barcha foydalanuvchilar", service:"Hammasi",
    startDate:"2025-10-25", endDate:"2025-11-01",
    revenue:52200000, orders:887, avgOrder:58900,
    description:"Hafta davomida barcha xizmatlar uchun bepul yetkazish.",
    conditions:["Minimal buyurtma: 30 000 UZS","Barcha xizmatlar","Cheksiz foydalanish"],
    cities:["Barcha shaharlar"],
    createdBy:"Marketing", createdAt:"2025-10-20",
  },
  {
    id:"PRO-1003", code:"VIP30", name:"VIP mijozlar chegirmasi", type:"Foiz",
    value:30, minOrder:100000, maxDiscount:50000, usageLimit:200, usedCount:45,
    status:"Active", target:"VIP mijozlar", service:"Hammasi",
    startDate:"2025-10-15", endDate:"2025-12-31",
    revenue:6750000, orders:45, avgOrder:150000,
    description:"VIP mijozlarga eksklyuziv 30% chegirma. Yil oxirigacha amal qiladi.",
    conditions:["VIP status talab etiladi","Minimal buyurtma: 100 000 UZS","Oyiga 3 martagacha"],
    cities:["Barcha shaharlar"],
    createdBy:"Admin", createdAt:"2025-10-10",
  },
  {
    id:"PRO-1004", code:"NEWUSER15", name:"Yangi foydalanuvchi bonusi", type:"Belgilangan",
    value:15000, minOrder:20000, maxDiscount:15000, usageLimit:0, usedCount:1204,
    status:"Active", target:"Yangi foydalanuvchilar", service:"Hammasi",
    startDate:"2025-01-01", endDate:"2025-12-31",
    revenue:90300000, orders:1204, avgOrder:75000,
    description:"Birinchi buyurtmada 15 000 UZS chegirma. Cheksiz foydalanuvchi.",
    conditions:["Faqat birinchi buyurtma","Minimal buyurtma: 20 000 UZS","Ro'yxatdan o'tganidan 30 kun ichida"],
    cities:["Barcha shaharlar"],
    createdBy:"Admin", createdAt:"2024-12-28",
  },
  {
    id:"PRO-1005", code:"TAXIFREE", name:"Taksi tekin — Shanba", type:"BepulYetkazish",
    value:100, minOrder:0, maxDiscount:20000, usageLimit:300, usedCount:0,
    status:"Scheduled", target:"Barcha foydalanuvchilar", service:"Taxi",
    startDate:"2025-11-02", endDate:"2025-11-02",
    revenue:0, orders:0, avgOrder:0,
    description:"Shanba kuni taksi xizmatida bitta bepul safar. Maks. 20 000 UZS.",
    conditions:["Faqat Shanba","Bir foydalanuvchi 1 marta","Maksimal chegirma: 20 000 UZS"],
    cities:["Tashkent"],
    createdBy:"Marketing", createdAt:"2025-10-28",
  },
  {
    id:"PRO-1006", code:"CASHBACK10", name:"10% Cashback Market", type:"Cashback",
    value:10, minOrder:80000, maxDiscount:20000, usageLimit:600, usedCount:234,
    status:"Active", target:"Faolsiz mijozlar", service:"Market",
    startDate:"2025-10-20", endDate:"2025-10-31",
    revenue:18720000, orders:234, avgOrder:80000,
    description:"Market xaridlarida 10% cashback. Hisobingizga qaytariladi.",
    conditions:["Minimal buyurtma: 80 000 UZS","Faqat Market xizmati","30 kun ichida foydalanilmagan mijozlar"],
    cities:["Tashkent","Buxoro"],
    createdBy:"Admin", createdAt:"2025-10-18",
  },
  {
    id:"PRO-1007", code:"CARGO25", name:"Kargo chegirmasi", type:"Foiz",
    value:25, minOrder:60000, maxDiscount:40000, usageLimit:150, usedCount:67,
    status:"Active", target:"Barcha foydalanuvchilar", service:"Cargo",
    startDate:"2025-10-15", endDate:"2025-11-15",
    revenue:8040000, orders:67, avgOrder:120000,
    description:"Cargo xizmatida 25% chegirma. Og'ir yuklar uchun maxsus taklif.",
    conditions:["Minimal buyurtma: 60 000 UZS","Faqat Cargo xizmati","Bir foydalanuvchi 2 martagacha"],
    cities:["Barcha shaharlar"],
    createdBy:"Ops", createdAt:"2025-10-12",
  },
  {
    id:"PRO-1008", code:"BIRTHDAY50", name:"Tug'ilgan kun sovg'asi", type:"Sovg'a",
    value:50000, minOrder:0, maxDiscount:50000, usageLimit:0, usedCount:89,
    status:"Active", target:"Tug'ilgan kun", service:"Hammasi",
    startDate:"2025-01-01", endDate:"2025-12-31",
    revenue:4450000, orders:89, avgOrder:50000,
    description:"Tug'ilgan kuningizda 50 000 UZS sovg'a. Avtomatik ravishda beriladi.",
    conditions:["Faqat tug'ilgan kunda","Bir yilda bir marta","Barcha xizmatlar"],
    cities:["Barcha shaharlar"],
    createdBy:"Admin", createdAt:"2024-12-30",
  },
  {
    id:"PRO-1009", code:"STAR500", name:"500 ball bonus", type:"BonusBall",
    value:500, minOrder:100000, maxDiscount:0, usageLimit:1000, usedCount:156,
    status:"Paused", target:"VIP mijozlar", service:"Hammasi",
    startDate:"2025-10-01", endDate:"2025-10-31",
    revenue:15600000, orders:156, avgOrder:100000,
    description:"100 000 UZS dan yuqori buyurtmalarda 500 bonus ball.",
    conditions:["Minimal buyurtma: 100 000 UZS","VIP status talab etiladi","Oyiga 5 martagacha"],
    cities:["Barcha shaharlar"],
    createdBy:"Marketing", createdAt:"2025-09-25",
  },
  {
    id:"PRO-1010", code:"RAMADAN30", name:"Ramazon aksiyasi", type:"Foiz",
    value:30, minOrder:40000, maxDiscount:35000, usageLimit:2000, usedCount:0,
    status:"Draft", target:"Barcha foydalanuvchilar", service:"Food",
    startDate:"2026-03-01", endDate:"2026-04-01",
    revenue:0, orders:0, avgOrder:0,
    description:"Ramazon oyi davomida barcha food buyurtmalarida 30% chegirma.",
    conditions:["Minimal buyurtma: 40 000 UZS","Faqat Food xizmati","Iftorlik vaqtida 2x bonus"],
    cities:["Barcha shaharlar"],
    createdBy:"Admin", createdAt:"2025-10-30",
  },
];

const fmt  = n => new Intl.NumberFormat("uz-UZ").format(n);
const fmtM = n => n>=1_000_000?(n/1_000_000).toFixed(1)+"M":n>=1_000?(n/1_000).toFixed(0)+"K":String(n);

const STATUSES_F = ["Barcha","Active","Scheduled","Paused","Draft","Expired"];
const TYPES_F    = ["Barcha tur","Foiz","Belgilangan","BepulYetkazish","Cashback","BonusBall","Sovg'a"];
const SERVICES_F = ["Barcha xizmat","Hammasi","Food","Market","Taxi","Cargo"];
const TARGETS_F  = ["Barcha target","Barcha foydalanuvchilar","Yangi foydalanuvchilar","VIP mijozlar","Faolsiz mijozlar","Tug'ilgan kun","Hamkorlar"];

// ── Shared UI ─────────────────────────────────────────────────────────────────
function Dropdown({ label, value, onChange, options, accent=C.brand, minW=150 }) {
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};
    document.addEventListener("mousedown",h); return ()=>document.removeEventListener("mousedown",h);
  },[]);
  return (
    <div ref={ref} style={{position:"relative"}}>
      {label&&<div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>{label}</div>}
      <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:6,background:C.card,border:`1px solid ${open?accent:C.border}`,borderRadius:8,padding:"7px 10px",fontSize:12,fontWeight:600,color:C.text,cursor:"pointer",minWidth:minW,justifyContent:"space-between",boxShadow:open?`0 0 0 3px ${accent}18`:"none",transition:"all .15s",outline:"none"}}>
        <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{value}</span>
        <span style={{fontSize:8,color:C.muted,transform:open?"rotate(180deg)":"none",transition:"transform .2s",flexShrink:0,marginLeft:4}}>▼</span>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",left:0,zIndex:400,background:C.card,border:`1px solid ${C.border}`,borderRadius:10,boxShadow:"0 8px 28px rgba(0,0,0,.13)",minWidth:"100%",overflow:"hidden",maxHeight:240,overflowY:"auto"}}>
          {options.map(opt=>(
            <div key={opt} onClick={()=>{onChange(opt);setOpen(false);}} style={{padding:"8px 14px",fontSize:12,fontWeight:value===opt?700:500,color:value===opt?accent:C.text,cursor:"pointer",background:value===opt?accent+"12":"transparent",transition:"background .1s"}}>{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({s}){
  const cfg=STATUS_P[s]||STATUS_P.Draft;
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,background:cfg.bg,color:cfg.color,fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,whiteSpace:"nowrap"}}><span style={{width:5,height:5,borderRadius:"50%",background:cfg.dot,flexShrink:0}}/>{cfg.label}</span>;
}

function Toggle({value,onChange,accent=C.brand}){
  return(
    <div onClick={()=>onChange(!value)} style={{width:40,height:22,borderRadius:11,background:value?accent:"#CBD5E1",cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
      <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:value?21:3,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/>
    </div>
  );
}

function Sparkline({data,color,h=28,w=80}){
  const max=Math.max(...data),min=Math.min(...data),rng=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/rng)*(h-4)-2}`).join(" ");
  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:"block"}}>
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color+"22"} stroke="none"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function UsageBar({used,limit,color}){
  const pct=limit>0?Math.min((used/limit)*100,100):100;
  const barColor=pct>=90?C.red:pct>=70?C.amber:color;
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:9,color:C.muted,fontWeight:600}}>{fmt(used)} {limit>0?`/ ${fmt(limit)}`:""}</span>
        <span style={{fontSize:9,fontWeight:700,color:barColor}}>{limit>0?`${Math.round(pct)}%`:"∞"}</span>
      </div>
      <div style={{height:5,background:C.light,borderRadius:99,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:barColor,borderRadius:99,transition:"width .4s"}}/>
      </div>
    </div>
  );
}

// ── Create / Edit Panel ───────────────────────────────────────────────────────
function PromoPanel({promo,isNew,onClose,onSave}){
  const [form,setForm]=useState(promo?{...promo}:{
    id:"",code:"",name:"",type:"Foiz",value:10,minOrder:0,maxDiscount:0,
    usageLimit:100,usedCount:0,status:"Draft",target:"Barcha foydalanuvchilar",
    service:"Hammasi",startDate:"",endDate:"",description:"",
    conditions:[""],cities:["Barcha shaharlar"],createdBy:"Admin",
    revenue:0,orders:0,avgOrder:0,createdAt:new Date().toISOString().slice(0,10),
  });
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const tc=PROMO_TYPE[form.type]||PROMO_TYPE.Foiz;
  const preview5km=form.type==="Foiz"?Math.min(100000*form.value/100,form.maxDiscount||9999999):form.type==="Belgilangan"?form.value:form.type==="BepulYetkazish"?8000:form.type==="Cashback"?Math.min(100000*form.value/100,form.maxDiscount||9999999):form.value;
  const [tab,setTab]=useState("asosiy");

  const genCode=()=>{
    const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const c=Array.from({length:8},()=>chars[Math.floor(Math.random()*chars.length)]).join("");
    set("code",c);
  };

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"16px 20px 12px",borderBottom:`1px solid ${C.border}`,flexShrink:0,background:`linear-gradient(135deg,${C.brandLight},#fff)`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
              <span style={{fontSize:18}}>{tc.icon}</span>
              <span style={{fontSize:10,fontWeight:700,color:tc.color,background:tc.bg,padding:"2px 8px",borderRadius:6}}>{tc.label}</span>
              {!isNew&&<StatusBadge s={form.status}/>}
            </div>
            <div style={{fontSize:16,fontWeight:900,color:C.text,letterSpacing:-.4}}>{isNew?"Yangi promo yaratish":form.name}</div>
            {!isNew&&<div style={{fontSize:10,color:C.muted,marginTop:2}}>{form.id} · {form.createdAt}</div>}
          </div>
          <button onClick={onClose} style={{width:28,height:28,borderRadius:"50%",background:C.light,border:"none",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",color:C.muted,flexShrink:0}}>✕</button>
        </div>
        <div style={{display:"flex",gap:2}}>
          {[["asosiy","⚙ Asosiy"],["shartlar","📋 Shartlar"],["analitika","📊 Analitika"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${tab===k?C.brand:C.border}`,background:tab===k?C.brandLight:C.card,color:tab===k?C.brandDark:C.muted,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all .15s"}}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>

        {/* ── TAB: ASOSIY ── */}
        {tab==="asosiy"&&(
          <>
            {/* Promo code */}
            <div style={{background:C.slate,borderRadius:12,padding:"14px 16px",marginBottom:14,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-20,right:-20,width:80,height:80,borderRadius:"50%",background:tc.color+"22"}}/>
              <div style={{fontSize:9,color:"#94A3B8",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Promo kod</div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input value={form.code} onChange={e=>set("code",e.target.value.toUpperCase())}
                  style={{flex:1,padding:"8px 12px",borderRadius:8,border:"1px solid #334155",background:"#1E293B",color:"#fff",fontSize:18,fontWeight:900,outline:"none",fontFamily:"monospace",letterSpacing:2}}
                  placeholder="PROMO2025"/>
                <button onClick={genCode} style={{padding:"8px 12px",borderRadius:8,border:"none",background:C.brand,color:"#fff",fontSize:10,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>🎲 Auto</button>
              </div>
            </div>

            {/* Name + Type */}
            <div style={{marginBottom:12}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.4,marginBottom:4}}>Promo nomi</div>
              <input value={form.name} onChange={e=>set("name",e.target.value)}
                style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}
                placeholder="Masalan: Bahor chegirmasi"/>
            </div>

            {/* Type selector */}
            <div style={{marginBottom:14}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.4,marginBottom:8}}>Promo turi</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                {Object.entries(PROMO_TYPE).map(([k,v])=>(
                  <button key={k} onClick={()=>set("type",k)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:9,border:`1px solid ${form.type===k?v.color:C.border}`,background:form.type===k?v.bg:C.card,cursor:"pointer",transition:"all .15s"}}>
                    <span style={{fontSize:16}}>{v.icon}</span>
                    <span style={{fontSize:10,fontWeight:700,color:form.type===k?v.color:C.muted}}>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Value config */}
            <div style={{background:C.light,borderRadius:10,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Chegirma qiymati</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                <div>
                  <div style={{fontSize:10,color:C.muted,fontWeight:600,marginBottom:4}}>{form.type==="Foiz"||form.type==="Cashback"?"Foiz (%)":"Summa (UZS)"}</div>
                  <input type="number" value={form.value} onChange={e=>set("value",Number(e.target.value))}
                    style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:14,fontWeight:800,color:tc.color,outline:"none",fontFamily:"inherit",background:C.card}}/>
                </div>
                {(form.type==="Foiz"||form.type==="Cashback")&&(
                  <div>
                    <div style={{fontSize:10,color:C.muted,fontWeight:600,marginBottom:4}}>Maks. chegirma (UZS)</div>
                    <input type="number" value={form.maxDiscount} onChange={e=>set("maxDiscount",Number(e.target.value))}
                      style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:14,fontWeight:800,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}/>
                  </div>
                )}
                <div>
                  <div style={{fontSize:10,color:C.muted,fontWeight:600,marginBottom:4}}>Min buyurtma (UZS)</div>
                  <input type="number" value={form.minOrder} onChange={e=>set("minOrder",Number(e.target.value))}
                    style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}/>
                </div>
                <div>
                  <div style={{fontSize:10,color:C.muted,fontWeight:600,marginBottom:4}}>Foydalanish chegarasi</div>
                  <input type="number" value={form.usageLimit} onChange={e=>set("usageLimit",Number(e.target.value))}
                    style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}
                    placeholder="0 = cheksiz"/>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div style={{background:tc.bg,border:`1px solid ${tc.color}33`,borderRadius:10,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>💡 Mijoz ko'radigan chegirma (namunaviy)</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:11,color:C.muted}}>100 000 UZS buyurtma uchun</div>
                  <div style={{fontSize:20,fontWeight:900,color:tc.color,marginTop:4}}>−{fmt(preview5km)} UZS</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:C.muted}}>Mijoz to'laydi</div>
                  <div style={{fontSize:20,fontWeight:900,color:C.green,marginTop:4}}>{fmt(Math.max(0,100000-preview5km))} UZS</div>
                </div>
              </div>
            </div>

            {/* Target + Service */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <Dropdown label="Target auditoriya" value={form.target} onChange={v=>set("target",v)} options={Object.keys(TARGET)} accent={tc.color} minW={130}/>
              <Dropdown label="Xizmat" value={form.service} onChange={v=>set("service",v)} options={Object.keys(SERVICE_CFG)} accent={tc.color} minW={110}/>
            </div>

            {/* Dates */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <div>
                <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.4,marginBottom:4}}>Boshlanish sanasi</div>
                <input type="date" value={form.startDate} onChange={e=>set("startDate",e.target.value)}
                  style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:600,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}/>
              </div>
              <div>
                <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.4,marginBottom:4}}>Tugash sanasi</div>
                <input type="date" value={form.endDate} onChange={e=>set("endDate",e.target.value)}
                  style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:600,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}/>
              </div>
            </div>

            {/* Status */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
              {Object.entries(STATUS_P).map(([k,cfg])=>(
                <button key={k} onClick={()=>set("status",k)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 10px",borderRadius:9,border:`1px solid ${form.status===k?cfg.dot:C.border}`,background:form.status===k?cfg.bg:C.card,cursor:"pointer",transition:"all .15s"}}>
                  <span style={{width:7,height:7,borderRadius:"50%",background:cfg.dot,flexShrink:0}}/>
                  <span style={{fontSize:11,fontWeight:700,color:form.status===k?cfg.color:C.muted}}>{cfg.label}</span>
                </button>
              ))}
            </div>

            {/* Description */}
            <div style={{marginBottom:4}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.4,marginBottom:4}}>Tavsif</div>
              <textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={2}
                style={{width:"100%",padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,color:C.text,outline:"none",resize:"none",fontFamily:"inherit",background:C.card}}
                placeholder="Promo tavsifi..."/>
            </div>
          </>
        )}

        {/* ── TAB: SHARTLAR ── */}
        {tab==="shartlar"&&(
          <>
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>Foydalanish shartlari</div>
                <button onClick={()=>set("conditions",[...form.conditions,""])} style={{fontSize:11,fontWeight:700,color:tc.color,background:tc.bg,border:"none",cursor:"pointer",padding:"3px 10px",borderRadius:6}}>+ Qo'shish</button>
              </div>
              {form.conditions.map((c,i)=>(
                <div key={i} style={{display:"flex",gap:8,marginBottom:8,alignItems:"center"}}>
                  <span style={{fontSize:14,flexShrink:0}}>📌</span>
                  <input value={c} onChange={e=>{const nc=[...form.conditions];nc[i]=e.target.value;set("conditions",nc);}}
                    style={{flex:1,padding:"8px 10px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:12,fontWeight:500,color:C.text,outline:"none",fontFamily:"inherit",background:C.card}}
                    placeholder="Shart kiriting..."/>
                  <button onClick={()=>set("conditions",form.conditions.filter((_,j)=>j!==i))}
                    style={{width:28,height:28,borderRadius:7,border:`1px solid ${C.border}`,background:C.light,cursor:"pointer",fontSize:12,color:C.red,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                </div>
              ))}
            </div>

            {/* Cities */}
            <div style={{background:C.light,borderRadius:10,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>🌍 Amal qiluvchi shaharlar</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {["Barcha shaharlar","Tashkent","Samarqand","Namangan","Buxoro","Andijon","Farg'ona","Qo'qon"].map(city=>{
                  const sel=form.cities.includes(city);
                  return(
                    <button key={city} onClick={()=>set("cities",sel?form.cities.filter(c=>c!==city):[...form.cities,city])}
                      style={{padding:"4px 12px",borderRadius:99,border:`1px solid ${sel?tc.color:C.border}`,background:sel?tc.bg:C.card,color:sel?tc.color:C.muted,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all .15s"}}>
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Advanced rules */}
            <div style={{background:C.light,borderRadius:10,padding:"12px 14px"}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:12}}>⚙ Qo'shimcha qoidalar</div>
              {[
                ["Bir foydalanuvchi bir marta",true],
                ["Boshqa promolar bilan birga ishlatish",false],
                ["Faqat mobil ilova orqali",true],
                ["Hamkor ruxsati talab etiladi",false],
              ].map(([label,defaultVal],i)=>(
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:i<3?12:0}}>
                  <span style={{fontSize:12,fontWeight:600,color:C.text}}>{label}</span>
                  <Toggle value={defaultVal} onChange={()=>{}} accent={tc.color}/>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── TAB: ANALITIKA ── */}
        {tab==="analitika"&&(
          <>
            {isNew?(
              <div style={{textAlign:"center",padding:"40px 20px",color:C.muted}}>
                <div style={{fontSize:40,marginBottom:12}}>📊</div>
                <div style={{fontSize:13,fontWeight:700}}>Promo yaratilgandan keyin analitika ko'rinadi</div>
              </div>
            ):(
              <>
                {/* Revenue block */}
                <div style={{background:C.slate,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
                  <div style={{fontSize:9,color:"#94A3B8",fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Umumiy natija</div>
                  <div style={{fontSize:24,fontWeight:900,color:"#fff",letterSpacing:-.5}}>{fmt(promo.revenue)} <span style={{fontSize:12,color:"#94A3B8",fontWeight:400}}>UZS</span></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:12,paddingTop:12,borderTop:"1px solid #1E293B"}}>
                    {[
                      {label:"Foydalanildi",val:fmt(promo.usedCount)+" marta",color:"#60A5FA"},
                      {label:"Buyurtmalar",  val:fmt(promo.orders)+" ta",      color:"#4ADE80"},
                      {label:"O'rt. buyurtma",val:fmtM(promo.avgOrder)+" UZS",color:tc.color},
                    ].map(({label,val,color})=>(
                      <div key={label}>
                        <div style={{fontSize:9,color:"#64748B",fontWeight:600,textTransform:"uppercase",letterSpacing:.3}}>{label}</div>
                        <div style={{fontSize:13,fontWeight:800,color,marginTop:3}}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage progress */}
                <div style={{background:C.light,borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                  <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Foydalanish holati</div>
                  <UsageBar used={promo.usedCount} limit={promo.usageLimit} color={tc.color}/>
                  {promo.usageLimit>0&&(
                    <div style={{fontSize:10,color:C.muted,marginTop:6}}>
                      {promo.usageLimit-promo.usedCount} ta foydalanish qoldi
                    </div>
                  )}
                </div>

                {/* Daily trend (mock) */}
                <div style={{background:C.light,borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                  <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>Haftalik trend</div>
                  <div style={{display:"flex",gap:5,alignItems:"flex-end",height:60}}>
                    {[12,28,19,45,38,67,promo.orders>0?Math.min(promo.orders,70):0].map((h,i)=>(
                      <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                        <div style={{width:"100%",height:Math.max(3,Math.min(h,50)),background:i===6?tc.color:C.border,borderRadius:"3px 3px 0 0",transition:"height .3s"}}/>
                        <span style={{fontSize:8,color:i===6?tc.color:C.muted,fontWeight:i===6?700:400}}>
                          {["Du","Se","Ch","Pa","Sh","Ya","Bu"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  {[
                    {label:"Konversiya",     val:`${promo.usageLimit>0?Math.round(promo.usedCount/promo.usageLimit*100):100}%`, color:tc.color, icon:"🎯"},
                    {label:"ROI",            val:promo.revenue>0?`${Math.round(promo.revenue/(promo.usedCount*(promo.type==="Foiz"?100000*promo.value/100:promo.value)||1)*10)/10}x`:"—", color:C.green, icon:"📈"},
                  ].map(({label,val,color,icon})=>(
                    <div key={label} style={{background:color+"10",borderRadius:10,padding:"12px",textAlign:"center",border:`1px solid ${color}22`}}>
                      <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                      <div style={{fontSize:20,fontWeight:900,color}}>{val}</div>
                      <div style={{fontSize:10,color:C.muted,marginTop:2,fontWeight:600}}>{label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{padding:"12px 20px",borderTop:`1px solid ${C.border}`,flexShrink:0,display:"flex",gap:8}}>
        <button onClick={onClose} style={{flex:1,padding:"11px",borderRadius:10,border:`1px solid ${C.border}`,background:C.card,color:C.text,fontSize:12,fontWeight:700,cursor:"pointer"}}>
          Bekor qilish
        </button>
        <button onClick={()=>onSave(form)} style={{flex:2,padding:"11px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${C.brand},${C.brandDark})`,color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",boxShadow:`0 4px 14px ${C.brand}44`}}>
          {isNew?"✨ Promo yaratish":"✓ Saqlash"}
        </button>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MilliyGoPromoPage() {
  const [promos,setPromos]     = useState(PROMOS);
  const [selected,setSelected] = useState(null);
  const [isNew,setIsNew]       = useState(false);
  const [statusF,setStatusF]   = useState("Barcha");
  const [typeF,setTypeF]       = useState("Barcha tur");
  const [serviceF,setServiceF] = useState("Barcha xizmat");
  const [targetF,setTargetF]   = useState("Barcha target");
  const [q,setQ]               = useState("");
  const [page,setPage]         = useState(1);
  const PAGE = 6;

  const filtered = useMemo(()=>{
    let d=[...promos];
    if(statusF!=="Barcha")         d=d.filter(p=>p.status===statusF);
    if(typeF!=="Barcha tur")       d=d.filter(p=>p.type===typeF);
    if(serviceF!=="Barcha xizmat") d=d.filter(p=>p.service===serviceF||p.service==="Hammasi");
    if(targetF!=="Barcha target")  d=d.filter(p=>p.target===targetF);
    if(q.trim()){
      const lq=q.toLowerCase();
      d=d.filter(p=>p.code.toLowerCase().includes(lq)||p.name.toLowerCase().includes(lq)||p.id.toLowerCase().includes(lq));
    }
    return d;
  },[promos,statusF,typeF,serviceF,targetF,q]);

  const pages=Math.max(1,Math.ceil(filtered.length/PAGE));
  const paged=filtered.slice((page-1)*PAGE,page*PAGE);

  const handleSave=(form)=>{
    if(isNew){
      const newP={...form,id:`PRO-${1011+promos.length}`,createdAt:new Date().toISOString().slice(0,10)};
      setPromos(prev=>[newP,...prev]);
      setSelected(newP); setIsNew(false);
    } else {
      setPromos(prev=>prev.map(p=>p.id===form.id?form:p));
      setSelected(form); setIsNew(false);
    }
  };

  const handleToggleStatus=(id)=>{
    setPromos(prev=>prev.map(p=>p.id!==id?p:{...p,status:p.status==="Active"?"Paused":"Active"}));
    if(selected?.id===id) setSelected(prev=>({...prev,status:prev.status==="Active"?"Paused":"Active"}));
  };

  const handleNewPromo=()=>{setIsNew(true);setSelected({type:"Foiz",value:10,minOrder:0,maxDiscount:0,usageLimit:100,usedCount:0,status:"Draft",target:"Barcha foydalanuvchilar",service:"Hammasi",startDate:"",endDate:"",description:"",conditions:[""],cities:["Barcha shaharlar"],code:"",name:"",revenue:0,orders:0,avgOrder:0,createdAt:"",createdBy:"Admin"});};

  // KPIs
  const activeCount  = promos.filter(p=>p.status==="Active").length;
  const totalRevenue = promos.reduce((s,p)=>s+p.revenue,0);
  const totalUsed    = promos.reduce((s,p)=>s+p.usedCount,0);
  const totalOrders  = promos.reduce((s,p)=>s+p.orders,0);
  const expiringSoon = promos.filter(p=>p.status==="Active"&&p.endDate&&new Date(p.endDate)-new Date()<3*24*3600*1000).length;
  const spark=[40,65,52,80,68,95,77,110,88,125,102,145];

  // Type breakdown
  const typeBkd=Object.entries(PROMO_TYPE).map(([k,v])=>({
    label:k,...v,count:promos.filter(p=>p.type===k).length,
    revenue:promos.filter(p=>p.type===k).reduce((s,p)=>s+p.revenue,0),
  })).filter(t=>t.count>0);

  // Service breakdown
  const svcBkd=Object.entries(SERVICE_CFG).filter(([k])=>k!=="Hammasi").map(([k,v])=>({
    label:k,...v,
    count:promos.filter(p=>p.service===k||p.service==="Hammasi").length,
    revenue:promos.filter(p=>p.service===k||p.service==="Hammasi").reduce((s,p)=>s+p.revenue,0),
  }));
  const svcMax=Math.max(...svcBkd.map(s=>s.revenue))||1;

  return(
    <div style={{background:C.bg,minHeight:"100vh",fontFamily:"'Outfit','Inter',sans-serif"}}>
      <style>{`
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:4px;}
        button:hover{opacity:.88;}
        textarea,input{font-family:inherit;}
        .prow:hover{background:#FDF2F8 !important;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
      `}</style>

      <div style={{padding:"20px 24px"}}>

        {/* ── Header ── */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.brandLight,border:`1px solid ${C.brandBorder}`,borderRadius:8,padding:"4px 10px",fontSize:10,fontWeight:700,color:C.brandDark,letterSpacing:.5,textTransform:"uppercase",marginBottom:8}}>
              MilliyGo Superadmin
            </div>
            <h1 style={{fontSize:22,fontWeight:900,color:C.text,letterSpacing:-.5,margin:0}}>Promo va Aksiyalar</h1>
            <p style={{fontSize:12,color:C.muted,margin:"4px 0 0"}}>
              Promo kodlar, chegirmalar, kampaniyalar va foydalanish analitikasi
            </p>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={{display:"flex",alignItems:"center",gap:7,background:C.card,color:C.text,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 16px",fontSize:12,fontWeight:700,cursor:"pointer",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
              ⬇ Eksport
            </button>
            <button onClick={handleNewPromo} style={{display:"flex",alignItems:"center",gap:7,background:`linear-gradient(135deg,${C.brand},${C.brandDark})`,color:"#fff",border:"none",borderRadius:10,padding:"9px 18px",fontSize:12,fontWeight:800,cursor:"pointer",boxShadow:`0 4px 16px ${C.brand}44`}}>
              ✨ Yangi promo
            </button>
          </div>
        </div>

        {/* ── KPI Strip ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10,marginBottom:18}}>
          {[
            {label:"Faol promolar",    val:activeCount,       sub:"Hozir ishlamoqda",    color:C.brand,  icon:"🎉", spark:spark},
            {label:"Jami daromad",     val:fmtM(totalRevenue),sub:"Promo orqali UZS",    color:C.green,  icon:"💰", spark:spark.map(v=>v*1.2)},
            {label:"Foydalanishlar",   val:fmtM(totalUsed),   sub:"Barcha promolar",     color:C.blue,   icon:"🎟️", spark:spark.map(v=>v*.8)},
            {label:"Buyurtmalar",      val:fmtM(totalOrders), sub:"Promo bilan",         color:C.violet, icon:"📦", spark:spark.map(v=>v*.9)},
            {label:"Rejalashgan",      val:promos.filter(p=>p.status==="Scheduled").length, sub:"Kelgusida", color:C.sky, icon:"📅", spark:null},
            {label:"Tez tugayotgan",   val:expiringSoon,      sub:"3 kun ichida",        color:expiringSoon>0?C.rose:C.muted, icon:"⏳", spark:null},
          ].map(({label,val,sub,color,icon,spark:sp})=>(
            <div key={label} style={{background:C.card,borderRadius:12,padding:"13px 14px",border:`1.5px solid ${color==="rose"&&val>0?C.rose:C.border}`,boxShadow:color===C.rose&&val>0?`0 4px 12px ${C.rose}18`:"0 1px 4px rgba(0,0,0,.04)",overflow:"hidden"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                <div style={{width:32,height:32,borderRadius:9,background:color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
                {sp&&<Sparkline data={sp} color={color} h={26} w={64}/>}
              </div>
              <div style={{fontSize:20,fontWeight:900,color,letterSpacing:-.5}}>{val}</div>
              <div style={{fontSize:11,color:C.text,fontWeight:700,marginTop:2}}>{label}</div>
              <div style={{fontSize:10,color:C.muted,marginTop:1}}>{sub}</div>
            </div>
          ))}
        </div>

        {/* ── Analytics Row ── */}
        <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr 0.9fr",gap:10,marginBottom:18}}>

          {/* Promo type breakdown */}
          <div style={{background:C.card,borderRadius:12,padding:"16px",border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:12,fontWeight:800,color:C.text,marginBottom:14}}>🏷️ Tur bo'yicha daromad</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {typeBkd.sort((a,b)=>b.revenue-a.revenue).map(t=>(
                <div key={t.label} onClick={()=>{setTypeF(typeF===t.label?"Barcha tur":t.label);setPage(1);}}
                  style={{background:t.bg,borderRadius:10,padding:"10px 12px",border:`1px solid ${t.color}22`,cursor:"pointer",transition:"all .15s",transform:typeF===t.label?"scale(1.02)":"none"}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                    <span style={{fontSize:18}}>{t.icon}</span>
                    <span style={{fontSize:10,fontWeight:700,color:t.color}}>{t.label}</span>
                  </div>
                  <div style={{fontSize:15,fontWeight:900,color:C.text}}>{fmtM(t.revenue)}</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:1}}>{t.count} promo</div>
                </div>
              ))}
            </div>
          </div>

          {/* Service revenue */}
          <div style={{background:C.card,borderRadius:12,padding:"16px",border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:12,fontWeight:800,color:C.text,marginBottom:14}}>🗂 Xizmat bo'yicha</div>
            {svcBkd.map(s=>(
              <div key={s.label} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:11,fontWeight:700,color:C.text,display:"flex",alignItems:"center",gap:5}}>
                    {s.icon} {s.label} <span style={{fontSize:9,color:C.muted}}>({s.count})</span>
                  </span>
                  <span style={{fontSize:11,fontWeight:800,color:s.color}}>{fmtM(s.revenue)}</span>
                </div>
                <div style={{height:6,background:C.light,borderRadius:99,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(s.revenue/svcMax)*100}%`,background:s.color,borderRadius:99,transition:"width .5s"}}/>
                </div>
              </div>
            ))}
          </div>

          {/* Status breakdown */}
          <div style={{background:C.card,borderRadius:12,padding:"16px",border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:12,fontWeight:800,color:C.text,marginBottom:14}}>📊 Holat statistikasi</div>
            {Object.entries(STATUS_P).map(([k,cfg])=>{
              const cnt=promos.filter(p=>p.status===k).length;
              const pct=promos.length?Math.round(cnt/promos.length*100):0;
              return(
                <div key={k} onClick={()=>{setStatusF(statusF===k?"Barcha":k);setPage(1);}}
                  style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,cursor:"pointer",opacity:statusF!=="Barcha"&&statusF!==k?.4:1,transition:"opacity .2s"}}>
                  <span style={{width:8,height:8,borderRadius:"50%",background:cfg.dot,flexShrink:0}}/>
                  <span style={{fontSize:11,fontWeight:600,color:C.text,flex:1}}>{cfg.label}</span>
                  <div style={{width:55,height:5,background:C.light,borderRadius:99,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${pct}%`,background:cfg.dot,borderRadius:99}}/>
                  </div>
                  <span style={{fontSize:12,fontWeight:800,color:cfg.color,minWidth:20,textAlign:"right"}}>{cnt}</span>
                </div>
              );
            })}

            {/* Top promo */}
            <div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>🏆 Top promo</div>
              {promos.sort((a,b)=>b.usedCount-a.usedCount).slice(0,2).map(p=>{
                const tc2=PROMO_TYPE[p.type]||PROMO_TYPE.Foiz;
                return(
                  <div key={p.id} onClick={()=>{setSelected(p);setIsNew(false);}} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7,cursor:"pointer"}}>
                    <span style={{fontSize:14}}>{tc2.icon}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.text}}>{p.code}</div>
                      <div style={{fontSize:9,color:C.muted}}>{fmt(p.usedCount)} foydalanish</div>
                    </div>
                    <span style={{fontSize:11,fontWeight:800,color:tc2.color}}>{fmtM(p.revenue)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <div style={{background:C.card,borderRadius:12,padding:"14px 16px",border:`1px solid ${C.border}`,marginBottom:14,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:10,flexWrap:"wrap"}}>
            <Dropdown label="Holat"   value={statusF}  onChange={v=>{setStatusF(v); setPage(1);}} options={STATUSES_F}   accent={C.brand}/>
            <Dropdown label="Tur"     value={typeF}    onChange={v=>{setTypeF(v);   setPage(1);}} options={TYPES_F}      accent={C.brand}/>
            <Dropdown label="Xizmat"  value={serviceF} onChange={v=>{setServiceF(v);setPage(1);}} options={SERVICES_F}   accent={C.brand}/>
            <Dropdown label="Target"  value={targetF}  onChange={v=>{setTargetF(v); setPage(1);}} options={TARGETS_F}    accent={C.brand} minW={180}/>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:4}}>Qidirish</div>
              <div style={{position:"relative"}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:C.muted}}>🔍</span>
                <input value={q} onChange={e=>{setQ(e.target.value);setPage(1);}} placeholder="Promo kodi, nomi, ID..."
                  style={{width:"100%",padding:"7px 10px 7px 30px",borderRadius:8,fontSize:12,border:`1px solid ${C.border}`,background:C.card,color:C.text,outline:"none"}}/>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:8}}>
              <span style={{fontSize:12,color:C.muted,fontWeight:600,paddingBottom:8}}><strong style={{color:C.text}}>{filtered.length}</strong> promo</span>
              {(statusF!=="Barcha"||typeF!=="Barcha tur"||serviceF!=="Barcha xizmat"||targetF!=="Barcha target"||q)&&(
                <button onClick={()=>{setStatusF("Barcha");setTypeF("Barcha tur");setServiceF("Barcha xizmat");setTargetF("Barcha target");setQ("");setPage(1);}}
                  style={{padding:"7px 12px",borderRadius:8,border:`1px solid ${C.border}`,background:C.light,color:C.muted,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                  ✕ Tozalash
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Table + Panel ── */}
        <div style={{display:"grid",gridTemplateColumns:(selected||isNew)?"1fr 400px":"1fr",gap:14}}>

          {/* Promo cards grid OR table */}
          <div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>

            {/* Col headers */}
            <div style={{display:"grid",gridTemplateColumns:"130px 1.6fr 110px 100px 120px 1fr 130px 90px 70px",borderBottom:`2px solid ${C.border}`,background:"#FAFAFA"}}>
              {["Kod","Nomi / Tavsif","Tur","Xizmat","Chegirma","Foydalanish","Holat","Daromad",""].map((h,i)=>(
                <div key={i} style={{padding:"11px 10px",fontSize:10,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.4,whiteSpace:"nowrap"}}>{h}</div>
              ))}
            </div>

            {paged.length===0?(
              <div style={{padding:"52px",textAlign:"center",color:C.muted}}>
                <div style={{fontSize:36,marginBottom:10}}>🎟️</div>
                <div style={{fontSize:13,fontWeight:700}}>Promo topilmadi</div>
              </div>
            ):paged.map(p=>{
              const isSel=(selected?.id===p.id)&&!isNew;
              const tc2=PROMO_TYPE[p.type]||PROMO_TYPE.Foiz;
              const svc=SERVICE_CFG[p.service]||SERVICE_CFG.Hammasi;
              const tgt=TARGET[p.target]||TARGET["Barcha foydalanuvchilar"];
              const expiring=p.status==="Active"&&p.endDate&&new Date(p.endDate)-new Date()<3*24*3600*1000;
              return(
                <div key={p.id} className="prow" onClick={()=>{setIsNew(false);setSelected(isSel?null:p);}}
                  style={{display:"grid",gridTemplateColumns:"130px 1.6fr 110px 100px 120px 1fr 130px 90px 70px",alignItems:"center",cursor:"pointer",borderBottom:`1px solid ${C.border}`,background:isSel?C.brandLight:expiring?"#FFF1F2":"transparent",borderLeft:`3px solid ${isSel?C.brand:expiring?C.rose:"transparent"}`,transition:"background .12s",animation:"fadeIn .2s"}}>

                  {/* Code */}
                  <div style={{padding:"13px 10px"}}>
                    <div style={{fontFamily:"monospace",fontSize:12,fontWeight:900,color:isSel?C.brandDark:C.slate,background:isSel?C.brandBorder:C.light,padding:"3px 8px",borderRadius:6,display:"inline-block",letterSpacing:1}}>
                      {p.code}
                    </div>
                    <div style={{fontSize:9,color:C.muted,marginTop:3}}>{p.id}</div>
                  </div>

                  {/* Name */}
                  <div style={{padding:"13px 10px",minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:800,color:isSel?C.brandDark:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                    <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
                      <span style={{fontSize:12}}>{tgt.icon}</span>
                      <span style={{fontSize:10,color:C.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.target}</span>
                    </div>
                    <div style={{fontSize:9,color:C.muted,marginTop:2}}>{p.startDate} → {p.endDate||"—"}</div>
                  </div>

                  {/* Type */}
                  <div style={{padding:"13px 8px"}}>
                    <span style={{display:"inline-flex",alignItems:"center",gap:4,background:tc2.bg,color:tc2.color,fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:7,whiteSpace:"nowrap"}}>
                      {tc2.icon} {tc2.label}
                    </span>
                  </div>

                  {/* Service */}
                  <div style={{padding:"13px 8px"}}>
                    <span style={{display:"inline-flex",alignItems:"center",gap:4,background:svc.bg,color:svc.color,fontSize:10,fontWeight:700,padding:"3px 7px",borderRadius:6}}>
                      {svc.icon} {p.service}
                    </span>
                  </div>

                  {/* Discount value */}
                  <div style={{padding:"13px 10px"}}>
                    <div style={{fontSize:15,fontWeight:900,color:tc2.color}}>
                      {p.type==="Foiz"||p.type==="Cashback"?`${p.value}%`:p.type==="BepulYetkazish"?"Bepul":`${fmtM(p.value)} UZS`}
                    </div>
                    {p.maxDiscount>0&&<div style={{fontSize:9,color:C.muted,marginTop:1}}>Maks: {fmtM(p.maxDiscount)}</div>}
                    {p.minOrder>0&&<div style={{fontSize:9,color:C.muted}}>Min: {fmtM(p.minOrder)}</div>}
                  </div>

                  {/* Usage */}
                  <div style={{padding:"13px 10px"}}>
                    <UsageBar used={p.usedCount} limit={p.usageLimit} color={tc2.color}/>
                  </div>

                  {/* Status + toggle */}
                  <div style={{padding:"13px 8px"}}>
                    <StatusBadge s={p.status}/>
                    {(p.status==="Active"||p.status==="Paused")&&(
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}} onClick={e=>{e.stopPropagation();handleToggleStatus(p.id);}}>
                        <Toggle value={p.status==="Active"} onChange={()=>handleToggleStatus(p.id)} accent={C.brand}/>
                        <span style={{fontSize:9,color:C.muted}}>On/Off</span>
                      </div>
                    )}
                  </div>

                  {/* Revenue */}
                  <div style={{padding:"13px 10px"}}>
                    <div style={{fontSize:13,fontWeight:800,color:C.green}}>{fmtM(p.revenue)}</div>
                    <div style={{fontSize:9,color:C.muted,marginTop:1}}>{fmt(p.orders)} buyurtma</div>
                  </div>

                  {/* Actions */}
                  <div style={{padding:"13px 8px",display:"flex",gap:4}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>{setIsNew(false);setSelected(p);}} style={{width:28,height:28,borderRadius:7,border:`1px solid ${C.border}`,background:C.card,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
                  </div>
                </div>
              );
            })}

            {/* Pagination */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderTop:`1px solid ${C.border}`,background:"#FAFAFA",flexWrap:"wrap",gap:8}}>
              <span style={{fontSize:12,color:C.muted}}>
                Jami <strong style={{color:C.text}}>{filtered.length}</strong> promodan {Math.min((page-1)*PAGE+1,filtered.length)}–{Math.min(page*PAGE,filtered.length)}
              </span>
              <div style={{display:"flex",gap:5}}>
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
                  style={{padding:"5px 11px",borderRadius:7,border:`1px solid ${C.border}`,background:page===1?C.light:C.card,color:page===1?C.muted:C.text,fontSize:11,fontWeight:600,cursor:page===1?"default":"pointer"}}>
                  ← Oldingi
                </button>
                {Array.from({length:Math.min(5,pages)},(_,i)=>{
                  const p2=i+Math.max(1,Math.min(page-2,pages-4));
                  return <button key={p2} onClick={()=>setPage(p2)} style={{width:30,height:30,borderRadius:7,border:`1px solid ${page===p2?C.brand:C.border}`,background:page===p2?C.brand:C.card,color:page===p2?"#fff":C.text,fontSize:12,fontWeight:700,cursor:"pointer"}}>{p2}</button>;
                })}
                <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages}
                  style={{padding:"5px 11px",borderRadius:7,border:`1px solid ${C.border}`,background:page===pages?C.light:C.card,color:page===pages?C.muted:C.text,fontSize:11,fontWeight:600,cursor:page===pages?"default":"pointer"}}>
                  Keyingi →
                </button>
              </div>
            </div>
          </div>

          {/* Edit / Create Panel */}
          {(selected||isNew)&&(
            <div style={{background:C.card,borderRadius:12,border:`1px solid ${C.border}`,overflow:"hidden",position:"sticky",top:10,maxHeight:"calc(100vh - 40px)",display:"flex",flexDirection:"column",boxShadow:`0 4px 24px ${C.brand}1E`}}>
              <PromoPanel promo={selected} isNew={isNew} onClose={()=>{setSelected(null);setIsNew(false);}} onSave={handleSave}/>
            </div>
          )}
        </div>

        {/* ── Bottom active promo cards ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:14}}>
          {promos.filter(p=>p.status==="Active").slice(0,4).map(p=>{
            const tc2=PROMO_TYPE[p.type]||PROMO_TYPE.Foiz;
            const daysLeft=p.endDate?Math.max(0,Math.ceil((new Date(p.endDate)-new Date())/(1000*60*60*24))):null;
            const usePct=p.usageLimit>0?Math.round(p.usedCount/p.usageLimit*100):0;
            return(
              <div key={p.id} onClick={()=>{setIsNew(false);setSelected(p);}}
                style={{background:C.card,borderRadius:14,padding:"16px",border:`2px solid ${tc2.color}22`,cursor:"pointer",transition:"all .2s",boxShadow:`0 4px 14px ${tc2.color}12`,position:"relative",overflow:"hidden"}}>
                {/* BG decoration */}
                <div style={{position:"absolute",top:-24,right:-24,width:80,height:80,borderRadius:"50%",background:tc2.color+"10"}}/>
                <div style={{position:"absolute",top:8,right:8,fontSize:24,opacity:.3}}>{tc2.icon}</div>

                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                  <div style={{background:tc2.bg,borderRadius:8,padding:"4px 8px",fontSize:13,fontWeight:900,color:tc2.color,fontFamily:"monospace",letterSpacing:1}}>{p.code}</div>
                  {daysLeft!==null&&daysLeft<=3&&<span style={{background:C.rose+"15",color:C.rose,fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:99}}>⏰ {daysLeft}k</span>}
                </div>

                <div style={{fontSize:13,fontWeight:800,color:C.text,marginBottom:3}}>{p.name}</div>
                <div style={{fontSize:10,color:C.muted,marginBottom:10}}>
                  {p.type==="Foiz"||p.type==="Cashback"?`${p.value}% chegirma`:p.type==="BepulYetkazish"?"Bepul yetkazish":`${fmtM(p.value)} UZS`}
                </div>

                <UsageBar used={p.usedCount} limit={p.usageLimit} color={tc2.color}/>

                <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
                  <div>
                    <div style={{fontSize:9,color:C.muted}}>Daromad</div>
                    <div style={{fontSize:13,fontWeight:800,color:C.green}}>{fmtM(p.revenue)}</div>
                  </div>
                  {daysLeft!==null&&(
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:9,color:C.muted}}>Tugaydi</div>
                      <div style={{fontSize:11,fontWeight:700,color:daysLeft<=3?C.rose:C.muted}}>{daysLeft} kun</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}