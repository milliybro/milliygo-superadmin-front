import { useEffect, useRef, useState } from 'react'

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

// Real Tashkent coordinates for demand zones [lat, lng, intensity]
const HEAT_ZONES = {
  all: [
    [41.2995, 69.2401, 1.0], // Chilonzor markazi
    [41.3051, 69.2285, 0.8], // Yunusobod
    [41.287, 69.255, 0.75], // Sergeli
    [41.32, 69.26, 0.65], // Mirzo Ulugbek
    [41.276, 69.22, 0.55], // Yakkasaroy
    [41.312, 69.21, 0.6], // Uchtepa
    [41.335, 69.28, 0.45], // Shayhontohur
    [41.265, 69.27, 0.5], // Bektemir
    [41.305, 69.27, 0.7], // Yashnobod
    [41.29, 69.235, 0.85], // Chilonzor 2
    [41.318, 69.245, 0.6], // Olmazor
    [41.278, 69.28, 0.4], // Zangiota
    [41.34, 69.25, 0.35], // Shayxontoxur 2
    [41.26, 69.21, 0.3], // Qibray
    [41.33, 69.22, 0.55], // Uchtepa 2
  ],
  food: [
    [41.2995, 69.2401, 1.0],
    [41.287, 69.255, 0.85],
    [41.29, 69.235, 0.9],
    [41.305, 69.27, 0.7],
    [41.312, 69.21, 0.6],
    [41.276, 69.22, 0.65],
    [41.318, 69.245, 0.55],
  ],
  taxi: [
    [41.3051, 69.2285, 0.9],
    [41.32, 69.26, 0.8],
    [41.335, 69.28, 0.7],
    [41.265, 69.27, 0.6],
    [41.34, 69.25, 0.5],
    [41.33, 69.22, 0.65],
    [41.278, 69.28, 0.45],
  ],
}

// Real Tashkent locations for couriers/taxis
const COURIERS = [
  { lat: 41.299, lng: 69.241, icon: '🛵', label: 'K-12', ok: true },
  { lat: 41.306, lng: 69.229, icon: '🚖', label: 'T-45', ok: true },
  { lat: 41.286, lng: 69.254, icon: '🛵', label: 'K-08', ok: false },
  { lat: 41.321, lng: 69.261, icon: '🚖', label: 'T-21', ok: true },
  { lat: 41.277, lng: 69.221, icon: '🛵', label: 'K-33', ok: true },
  { lat: 41.312, lng: 69.275, icon: '🛵', label: 'K-07', ok: true },
  { lat: 41.335, lng: 69.249, icon: '🚖', label: 'T-18', ok: false },
  { lat: 41.265, lng: 69.268, icon: '🛵', label: 'K-22', ok: true },
]

function CityMap({ filter = 'Hammasi' }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const heatLayerRef = useRef(null)
  const markersRef = useRef([])
  const [loaded, setLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState('default')

  // Load Leaflet + plugins
  useEffect(() => {
    const loadScript = src =>
      new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) return res()
        const s = document.createElement('script')
        s.src = src
        s.onload = res
        s.onerror = rej
        document.head.appendChild(s)
      })

    const loadCSS = href => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const l = document.createElement('link')
      l.rel = 'stylesheet'
      l.href = href
      document.head.appendChild(l)
    }

    const init = async () => {
      loadCSS(
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
      )
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
      )
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js',
      )
      setLoaded(true)
    }
    init()
  }, [])

  // Init map
  useEffect(() => {
    if (!loaded || !mapRef.current) return
    const L = window.L
    if (mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      center: [41.2995, 69.2401],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    })

    // Custom dark tile layer for better contrast
    const tiles = {
      default: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      satellite:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }

    L.tileLayer(tiles.default, { maxZoom: 19 }).addTo(map)
    mapInstanceRef.current = map

    // Custom zoom control
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [loaded])

  // Update heat layer on filter change
  useEffect(() => {
    if (!loaded || !mapInstanceRef.current) return
    const L = window.L
    const map = mapInstanceRef.current

    // Remove old heat layer
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
    }

    const key =
      filter === 'Yetkazish' ? 'food' : filter === 'Taksi' ? 'taxi' : 'all'
    const heatColor =
      filter === 'Taksi'
        ? {
            gradient: {
              0.2: '#4338CA',
              0.5: '#7C3AED',
              0.8: '#A855F7',
              1.0: '#C084FC',
            },
          }
        : {
            gradient: {
              0.2: '#0369A1',
              0.5: '#F97316',
              0.8: '#DC2626',
              1.0: '#7f0000',
            },
          }

    heatLayerRef.current = L.heatLayer(HEAT_ZONES[key], {
      radius: 45,
      blur: 30,
      maxZoom: 14,
      max: 1.0,
      minOpacity: 0.35,
      ...heatColor,
    }).addTo(map)

    // Remove old markers
    markersRef.current.forEach(m => map.removeLayer(m))
    markersRef.current = []

    // Add courier markers
    const filtered = COURIERS.filter(c => {
      if (filter === 'Yetkazish') return c.icon === '🛵'
      if (filter === 'Taksi') return c.icon === '🚖'
      return true
    })

    filtered.forEach(c => {
      const el = document.createElement('div')
      el.innerHTML = `
        <div style="
          background: white;
          border-radius: 20px;
          padding: 4px 10px 4px 6px;
          display: flex;
          align-items: center;
          gap: 5px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.2);
          border: 2px solid ${c.ok ? '#22C55E44' : '#E2E8F044'};
          font-family: 'Outfit','Inter',sans-serif;
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.15s;
        ">
          <span style="font-size:14px">${c.icon}</span>
          <span style="font-size:10px;font-weight:700;color:#0F172A">${c.label}</span>
          <span style="width:6px;height:6px;border-radius:50%;background:${c.ok ? '#22C55E' : '#94A3B8'};display:inline-block;${c.ok ? 'box-shadow:0 0 0 2px #dcfce7' : ''}"></span>
        </div>
      `

      el.firstElementChild.addEventListener('mouseenter', e => {
        e.currentTarget.style.transform = 'scale(1.08)'
      })
      el.firstElementChild.addEventListener('mouseleave', e => {
        e.currentTarget.style.transform = 'scale(1)'
      })

      const icon = L.divIcon({
        html: el.innerHTML,
        className: '',
        iconAnchor: [40, 18],
      })
      const marker = L.marker([c.lat, c.lng], { icon }).addTo(map)

      marker.bindPopup(
        `
        <div style="font-family:'Outfit','Inter',sans-serif;min-width:160px;padding:4px">
          <div style="font-size:14px;font-weight:800;color:#0F172A;margin-bottom:6px">${c.icon} ${c.label}</div>
          <div style="font-size:11px;color:#64748B;margin-bottom:3px">Holat: <span style="color:${c.ok ? '#059669' : '#94A3B8'};font-weight:700">${c.ok ? 'Faol' : 'Offline'}</span></div>
          <div style="font-size:11px;color:#64748B">Tur: ${c.icon === '🛵' ? 'Kurier (Yetkazish)' : 'Taksi'}</div>
        </div>
      `,
        { maxWidth: 200 },
      )

      markersRef.current.push(marker)
    })
  }, [loaded, filter])

  return (
    <div
      style={{
        position: 'relative',
        height: 300,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
      }}
    >
      {/* Map container */}
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {/* Loading overlay */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: C.light,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 24 }}>🗺</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>
            Xarita yuklanmoqda...
          </div>
        </div>
      )}

      {/* Style switcher */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          display: 'flex',
          gap: 4,
          zIndex: 1000,
        }}
      >
        {[
          ['🗺 Oddiy', 'default'],
          ['🌙 Tungi', 'dark'],
        ].map(([label, key]) => (
          <button
            key={key}
            onClick={() => {
              if (!mapInstanceRef.current) return
              const L = window.L
              const map = mapInstanceRef.current
              map.eachLayer(l => {
                if (l._url) map.removeLayer(l)
              })
              const urls = {
                default:
                  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
              }
              L.tileLayer(urls[key], { maxZoom: 19 }).addTo(map)
              setMapStyle(key)
            }}
            style={{
              background: mapStyle === key ? C.slate : 'rgba(255,255,255,0.95)',
              color: mapStyle === key ? '#fff' : C.text,
              border: 'none',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* LIVE badge */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: C.slate,
          color: '#fff',
          borderRadius: 20,
          padding: '3px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 10,
          fontWeight: 700,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#22C55E',
            display: 'inline-block',
            boxShadow: '0 0 0 2px #15803d44',
          }}
        />
        JONLI
      </div>

      {/* Info card */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: 10,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 10,
          padding: '9px 13px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          zIndex: 1000,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: C.muted,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          Issiqlik indeksi
        </div>
        <div
          style={{ fontSize: 13, fontWeight: 800, color: C.text, marginTop: 2 }}
        >
          Chilonzor tumani
        </div>
        <div style={{ fontSize: 10, color: C.muted }}>
          Yuqori talab · 34 buyurtma
        </div>
        <div
          style={{
            display: 'flex',
            gap: 2,
            marginTop: 6,
            height: 5,
            width: 108,
          }}
        >
          {['#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444'].map(
            (c, i) => (
              <div
                key={i}
                style={{ flex: 1, background: c, borderRadius: 3 }}
              />
            ),
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 2,
          }}
        >
          <span style={{ fontSize: 8, color: C.muted }}>Kam</span>
          <span style={{ fontSize: 8, color: C.muted }}>Ko'p</span>
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 28,
          right: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          zIndex: 1000,
        }}
      >
        {[
          ['#EF4444', 'Yuqori talab'],
          ['#F97316', "O'rta talab"],
          ['#7C3AED', 'Taksi zonasi'],
          ['#22C55E', 'Faol haydovchi'],
        ].map(([c, l]) => (
          <div
            key={l}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 6,
              padding: '2px 7px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: c,
              }}
            />
            <span style={{ fontSize: 9, color: C.text, fontWeight: 500 }}>
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Leaflet attribution override */}
      <style>{`
        .leaflet-control-attribution { display: none !important; }
        .leaflet-popup-content-wrapper { border-radius: 10px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important; }
        .leaflet-popup-tip { display: none !important; }
        .leaflet-zoom-control { bottom: 60px !important; }
      `}</style>
    </div>
  )
}

export default CityMap
