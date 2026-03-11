import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Map, Placemark, Polygon, YMaps } from '@pbe/react-yandex-maps'

type FilterType = 'Hammasi' | 'Yetkazish' | 'Taksi'
type MapType = 'yandex#map' | 'yandex#hybrid' | 'yandex#satellite'
type VehicleType = 'courier' | 'taxi'
type CourierStatus = 'idle' | 'busy' | 'offline'
type LngLat = [number, number]

type ActiveOrder = {
  id: string
  pickup: LngLat
  dropoff: LngLat
  pickupLabel: string
  dropoffLabel: string
}

type CourierItem = {
  id: string
  lat: number
  lng: number
  label: string
  vehicleType: VehicleType
  status: CourierStatus
  speed: string
  ordersToday: number
  activeOrder?: ActiveOrder
}

type HeatZone = [number, number, number]

type Props = {
  filter?: FilterType
  height?: number
}

const C = {
  orange: '#F97316',
  purple: '#7C3AED',
  green: '#22C55E',
  red: '#EF4444',
  blue: '#2563EB',
  amber: '#F59E0B',
  slate: '#0F172A',
  text: '#0F172A',
  muted: '#64748B',
  border: '#E2E8F0',
  light: '#F8FAFC',
  white: '#FFFFFF',
  gray: '#94A3B8',
}

const API_KEY = import.meta.env.VITE_YANDEX_MAP_API_KEY as string | undefined

// G'allaorol markazi
const CENTER: LngLat = [40.021389, 67.5975]

const SERVICE_ZONE: LngLat[] = [
  [40.04725302352517, 67.5966595951889],
  [40.04121988546365, 67.58091169438163],
  [40.03608171518766, 67.57041610430406],
  [40.02882724935941, 67.57129062941908],
  [40.025253045906396, 67.56108905098458],
  [40.01911482492437, 67.5648778985535],
  [40.01911598607418, 67.572602453701],
  [40.02112676030191, 67.58032853227456],
  [40.01610087268898, 67.56473216687056],
  [40.006611809197494, 67.57158366329577],
  [39.99712725811605, 67.57785041132999],
  [39.99077309759562, 67.57231741409325],
  [39.98386061276858, 67.58760451212916],
  [39.99099476923209, 67.59270388143946],
  [39.9969055404093, 67.59795010055058],
  [40.00371032517762, 67.6002878436642],
  [40.008062882163074, 67.60641099531063],
  [40.0120809336382, 67.61326045849839],
  [40.01665665596184, 67.61369729031142],
  [40.02379871311132, 67.61632026447754],
  [40.033519490375426, 67.61750594600522],
  [40.03440659809161, 67.60015172656625],
  [40.04725302352517, 67.5966595951889],
]

const HOT_ZONE: LngLat[] = [
  [40.01063244783484, 67.59111570335091],
  [40.01560928499259, 67.59714593915538],
  [40.025098543522034, 67.59852264646682],
  [40.02987690303209, 67.59685759352794],
  [40.03274744433921, 67.59543476893819],
  [40.03647994084818, 67.59621699176552],
  [40.03479583571314, 67.58701753454474],
  [40.03613088344116, 67.58656358952337],
  [40.03509065225586, 67.57867085416274],
  [40.027116205323466, 67.57989315813242],
  [40.02446136985907, 67.57453523003329],
  [40.02080529034069, 67.5762261721444],
  [40.01237603394205, 67.58045037236755],
  [40.013732601253054, 67.58314730742146],
  [40.00931181410806, 67.5877698937615],
  [40.01063244783484, 67.59111570335091],
]

const HEAT_ZONES: Record<'all' | 'food' | 'taxi', HeatZone[]> = {
  all: [
    [40.021389, 67.5975, 1.0],
    [40.0242, 67.6011, 0.88],
    [40.0188, 67.5934, 0.82],
    [40.0261, 67.5948, 0.72],
    [40.0167, 67.6002, 0.68],
    [40.0237, 67.5899, 0.62],
    [40.0281, 67.606, 0.55],
    [40.0148, 67.5888, 0.48],
    [40.0196, 67.6054, 0.76],
    [40.0221, 67.5924, 0.84],
    [40.0254, 67.5989, 0.67],
    [40.0179, 67.6038, 0.51],
  ],
  food: [
    [40.021389, 67.5975, 1.0],
    [40.0228, 67.5951, 0.92],
    [40.0194, 67.5998, 0.87],
    [40.0247, 67.6017, 0.75],
    [40.0182, 67.5937, 0.69],
    [40.0251, 67.5929, 0.63],
    [40.0169, 67.6009, 0.58],
  ],
  taxi: [
    [40.021389, 67.5975, 0.96],
    [40.0264, 67.6031, 0.85],
    [40.0176, 67.5908, 0.81],
    [40.0288, 67.5962, 0.73],
    [40.0149, 67.6027, 0.66],
    [40.0235, 67.6074, 0.61],
    [40.0192, 67.5889, 0.56],
  ],
}

const COURIERS: CourierItem[] = [
  {
    id: 'k-12',
    lat: 40.0218,
    lng: 67.5981,
    label: 'K-12',
    vehicleType: 'courier',
    status: 'busy',
    speed: '34 km/soat',
    ordersToday: 6,
    activeOrder: {
      id: 'ord-001',
      pickup: [40.0239, 67.6042],
      dropoff: [40.0284, 67.6008],
      pickupLabel: 'MilliyGo Market',
      dropoffLabel: 'Mijoz manzili',
    },
  },
  {
    id: 't-45',
    lat: 40.0245,
    lng: 67.6016,
    label: 'T-45',
    vehicleType: 'taxi',
    status: 'idle',
    speed: '51 km/soat',
    ordersToday: 9,
  },
  {
    id: 'k-08',
    lat: 40.0187,
    lng: 67.5942,
    label: 'K-08',
    vehicleType: 'courier',
    status: 'offline',
    speed: '0 km/soat',
    ordersToday: 0,
  },
  {
    id: 't-21',
    lat: 40.0262,
    lng: 67.5963,
    label: 'T-21',
    vehicleType: 'taxi',
    status: 'busy',
    speed: '48 km/soat',
    ordersToday: 4,
    activeOrder: {
      id: 'ord-002',
      pickup: [40.0196, 67.6054],
      dropoff: [40.0149, 67.6027],
      pickupLabel: 'Pickup point',
      dropoffLabel: 'Yo‘lovchi manzili',
    },
  },
  {
    id: 'k-33',
    lat: 40.0171,
    lng: 67.6006,
    label: 'K-33',
    vehicleType: 'courier',
    status: 'idle',
    speed: '29 km/soat',
    ordersToday: 5,
  },
  {
    id: 'k-07',
    lat: 40.0239,
    lng: 67.6042,
    label: 'K-07',
    vehicleType: 'courier',
    status: 'idle',
    speed: '31 km/soat',
    ordersToday: 7,
  },
  {
    id: 't-18',
    lat: 40.0274,
    lng: 67.5928,
    label: 'T-18',
    vehicleType: 'taxi',
    status: 'offline',
    speed: '0 km/soat',
    ordersToday: 1,
  },
  {
    id: 'k-22',
    lat: 40.0158,
    lng: 67.5897,
    label: 'K-22',
    vehicleType: 'courier',
    status: 'idle',
    speed: '27 km/soat',
    ordersToday: 3,
  },
]

function CityMap({ filter = 'Hammasi', height = 460 }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any>(null)
  const ymapsRef = useRef<any>(null)
  const heatmapRef = useRef<any>(null)
  const routeRef = useRef<any>(null)
  const routeRequestIdRef = useRef(0)

  const [ready, setReady] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mapType, setMapType] = useState<MapType>('yandex#map')
  const [selectedCourierId, setSelectedCourierId] = useState<string | null>(
    null,
  )
  const [heatEnabled, setHeatEnabled] = useState(true)
  const [polygonEnabled, setPolygonEnabled] = useState(true)

  const heatKey = useMemo<'all' | 'food' | 'taxi'>(() => {
    if (filter === 'Yetkazish') return 'food'
    if (filter === 'Taksi') return 'taxi'
    return 'all'
  }, [filter])

  const filteredCouriers = useMemo(() => {
    return COURIERS.filter(c => {
      if (filter === 'Yetkazish') return c.vehicleType === 'courier'
      if (filter === 'Taksi') return c.vehicleType === 'taxi'
      return true
    })
  }, [filter])

  const selectedCourier = useMemo(() => {
    return filteredCouriers.find(c => c.id === selectedCourierId) ?? null
  }, [filteredCouriers, selectedCourierId])

  const summary = useMemo(() => {
    const online = filteredCouriers.filter(c => c.status !== 'offline').length
    const busy = filteredCouriers.filter(c => c.status === 'busy').length
    const offline = filteredCouriers.filter(c => c.status === 'offline').length
    return { online, busy, offline, total: filteredCouriers.length }
  }, [filteredCouriers])

  const heatPoints = useMemo(() => {
    return HEAT_ZONES[heatKey].map(([lat, lng, intensity]) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [lat, lng] },
      properties: { weight: intensity },
    }))
  }, [heatKey])

  const selectedRoutePoints = useMemo(() => {
    if (!selectedCourier?.activeOrder) return null
    return [
      [selectedCourier.lat, selectedCourier.lng],
      selectedCourier.activeOrder.pickup,
      selectedCourier.activeOrder.dropoff,
    ] as LngLat[]
  }, [selectedCourier])

  const fitViewport = () => {
    setTimeout(() => {
      if (mapRef.current?.container?.fitToViewport) {
        mapRef.current.container.fitToViewport()
      }
    }, 150)
  }

  const goToCenter = () => {
    if (!mapRef.current) return
    mapRef.current.setCenter(CENTER, 14, { duration: 250 })
  }

  const focusCourier = (courier: CourierItem) => {
    setSelectedCourierId(courier.id)
    if (!mapRef.current) return
    mapRef.current.setCenter([courier.lat, courier.lng], 15, { duration: 250 })
  }

  const toggleFullscreen = async () => {
    const el = wrapperRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  const getVehicleEmoji = (type: VehicleType) => {
    return type === 'taxi' ? '🚖' : '🛵'
  }

  const getMainColor = (courier: CourierItem) => {
    return courier.vehicleType === 'taxi' ? C.purple : C.orange
  }

  const getStatusColor = (status: CourierStatus) => {
    if (status === 'busy') return C.amber
    if (status === 'idle') return C.green
    return C.gray
  }

  const getStatusLabel = (status: CourierStatus) => {
    if (status === 'busy') return 'Band'
    if (status === 'idle') return 'Faol'
    return 'Offline'
  }

  const createCourierLayout = (
    ymaps: any,
    courier: CourierItem,
    active: boolean,
  ) => {
    if (!ymaps?.templateLayoutFactory) return null

    const mainColor = getMainColor(courier)
    const statusColor = getStatusColor(courier.status)
    const statusBg =
      courier.status === 'offline'
        ? '#E5E7EB'
        : courier.status === 'busy'
          ? '#FEF3C7'
          : '#DCFCE7'

    return ymaps.templateLayoutFactory.createClass(`
      <div style="
        position: relative;
        transform: translate(-50%, -100%);
        font-family: Inter, Arial, sans-serif;
        cursor: pointer;
        user-select: none;
      ">
        <div style="
          display:flex;
          align-items:center;
          gap:8px;
          background:rgba(255,255,255,0.98);
          border:1px solid ${active ? mainColor : C.border};
          border-radius:18px;
          padding:6px 10px 6px 6px;
          min-width:92px;
          box-shadow:${active ? `0 12px 30px ${mainColor}33` : '0 8px 20px rgba(15,23,42,0.12)'};
          backdrop-filter: blur(10px);
        ">
          <div style="
            width:30px;
            height:30px;
            border-radius:999px;
            background:${mainColor}14;
            border:1px solid ${mainColor}33;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:16px;
            flex-shrink:0;
          ">
            ${getVehicleEmoji(courier.vehicleType)}
          </div>

          <div style="display:flex;flex-direction:column;line-height:1;">
            <div style="
              font-size:11px;
              font-weight:800;
              color:${C.text};
              letter-spacing:0.2px;
            ">
              ${courier.label}
            </div>

            <div style="
              display:flex;
              align-items:center;
              gap:4px;
              margin-top:5px;
            ">
              <span style="
                width:7px;
                height:7px;
                border-radius:999px;
                background:${statusColor};
                box-shadow:0 0 0 2px ${statusBg};
                display:inline-block;
              "></span>

              <span style="
                font-size:9px;
                font-weight:700;
                color:${C.muted};
              ">
                ${getStatusLabel(courier.status)}
              </span>
            </div>
          </div>
        </div>

        <div style="
          position:absolute;
          left:50%;
          bottom:-7px;
          width:14px;
          height:14px;
          background:#fff;
          border-right:1px solid ${active ? mainColor : C.border};
          border-bottom:1px solid ${active ? mainColor : C.border};
          transform:translateX(-50%) rotate(45deg);
          box-sizing:border-box;
        "></div>
      </div>
    `)
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
      fitViewport()
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return
    mapRef.current.setType(mapType)
  }, [mapType])

  useEffect(() => {
    if (!filteredCouriers.length) {
      setSelectedCourierId(null)
      return
    }

    const selectedExists = filteredCouriers.some(
      c => c.id === selectedCourierId,
    )
    if (!selectedExists) {
      const busyFirst =
        filteredCouriers.find(c => c.status === 'busy') ?? filteredCouriers[0]
      setSelectedCourierId(busyFirst.id)
    }
  }, [filteredCouriers, selectedCourierId])

  // Heatmap
  useEffect(() => {
    const map = mapRef.current
    const ymaps = ymapsRef.current
    if (!map || !ymaps || !ready) return

    if (heatmapRef.current) {
      heatmapRef.current.setMap(null)
      heatmapRef.current = null
    }

    if (!heatEnabled) return

    ymaps.modules.require(['Heatmap'], (Heatmap: any) => {
      if (!mapRef.current) return

      const gradient =
        filter === 'Taksi'
          ? {
              0.2: '#4338CA',
              0.5: '#7C3AED',
              0.8: '#A855F7',
              1.0: '#C084FC',
            }
          : {
              0.2: '#0369A1',
              0.5: '#F97316',
              0.8: '#DC2626',
              1.0: '#7f0000',
            }

      const heatmap = new Heatmap(heatPoints, {
        radius: 28,
        opacity: 0.6,
        dissipating: false,
        intensityOfMidpoint: 0.35,
        gradient,
      })

      heatmap.setMap(mapRef.current)
      heatmapRef.current = heatmap
    })

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null)
        heatmapRef.current = null
      }
    }
  }, [ready, heatEnabled, heatPoints, filter])

  // Active route
  useEffect(() => {
    const map = mapRef.current
    const ymaps = ymapsRef.current
    if (!map || !ymaps || !ready) return

    if (routeRef.current) {
      map.geoObjects.remove(routeRef.current)
      routeRef.current = null
    }

    if (!selectedRoutePoints || selectedCourier?.status === 'offline') return

    const currentRequestId = ++routeRequestIdRef.current

    ymaps
      .route(selectedRoutePoints, { mapStateAutoApply: false })
      .then((route: any) => {
        if (!mapRef.current || currentRequestId !== routeRequestIdRef.current)
          return

        route.options.set({
          wayPointVisible: false,
          viaPointVisible: false,
          routeStrokeWidth: 5,
          routeStrokeColor:
            selectedCourier?.vehicleType === 'taxi' ? C.purple : C.orange,
          routeActiveStrokeWidth: 6,
          routeActiveStrokeColor:
            selectedCourier?.vehicleType === 'taxi' ? C.purple : C.orange,
        })

        mapRef.current.geoObjects.add(route)
        routeRef.current = route
      })
      .catch(() => {
        // route API ishlamasa jim fallback
      })

    return () => {
      if (mapRef.current && routeRef.current) {
        mapRef.current.geoObjects.remove(routeRef.current)
        routeRef.current = null
      }
    }
  }, [ready, selectedRoutePoints, selectedCourier])

  const canUseCustomLayout = Boolean(ymapsRef.current?.templateLayoutFactory)

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : height,
        borderRadius: isFullscreen ? 0 : 18,
        overflow: 'hidden',
        border: isFullscreen ? 'none' : `1px solid ${C.border}`,
        background: C.white,
      }}
    >
      <YMaps
        query={{
          lang: 'uz_UZ',
          load: 'package.full',
          apikey: API_KEY || '',
        }}
      >
        <Map
          instanceRef={(ref: any) => {
            mapRef.current = ref
          }}
          onLoad={(ymaps: any) => {
            ymapsRef.current = ymaps
            setReady(true)
          }}
          width="100%"
          height="100%"
          defaultState={{
            center: CENTER,
            zoom: 14,
            controls: ['zoomControl'],
            type: 'yandex#map',
          }}
          options={{
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true,
          }}
          modules={[
            'geoObject.addon.balloon',
            'geoObject.addon.hint',
            'templateLayoutFactory',
            'route',
          ]}
        >
          {polygonEnabled && (
            <>
              <Polygon
                geometry={[SERVICE_ZONE]}
                options={{
                  fillColor: 'rgba(37,99,235,0.10)',
                  strokeColor: C.blue,
                  strokeWidth: 2,
                  strokeStyle: 'shortdash',
                }}
                properties={{
                  hintContent: 'MilliyGo xizmat zonasi',
                }}
              />
              <Polygon
                geometry={[HOT_ZONE]}
                options={{
                  fillColor: 'rgba(249,115,22,0.18)',
                  strokeColor: C.orange,
                  strokeWidth: 2,
                }}
                properties={{
                  hintContent: 'Yuqori talab zonasi',
                }}
              />
            </>
          )}

          {selectedCourier?.activeOrder && (
            <>
              <Placemark
                geometry={selectedCourier.activeOrder.pickup}
                properties={{
                  hintContent: selectedCourier.activeOrder.pickupLabel,
                  balloonContent: `
                    <div style="font-family:Inter,Arial,sans-serif;padding:4px 6px">
                      <div style="font-weight:800;color:#0F172A">📦 ${selectedCourier.activeOrder.pickupLabel}</div>
                      <div style="font-size:11px;color:#64748B;margin-top:4px">Buyurtma olib ketish nuqtasi</div>
                    </div>
                  `,
                }}
                options={{
                  preset: 'islands#darkOrangeDotIcon',
                }}
              />
              <Placemark
                geometry={selectedCourier.activeOrder.dropoff}
                properties={{
                  hintContent: selectedCourier.activeOrder.dropoffLabel,
                  balloonContent: `
                    <div style="font-family:Inter,Arial,sans-serif;padding:4px 6px">
                      <div style="font-weight:800;color:#0F172A">🏁 ${selectedCourier.activeOrder.dropoffLabel}</div>
                      <div style="font-size:11px;color:#64748B;margin-top:4px">Yetkazib berish manzili</div>
                    </div>
                  `,
                }}
                options={{
                  preset: 'islands#redDotIcon',
                }}
              />
            </>
          )}

          {ready &&
            filteredCouriers.map(c => {
              const isActive = selectedCourierId === c.id
              const customLayout = canUseCustomLayout
                ? createCourierLayout(ymapsRef.current, c, isActive)
                : null

              return (
                <Placemark
                  key={c.id}
                  geometry={[c.lat, c.lng]}
                  properties={{
                    hintContent: c.label,
                    balloonContent: `
                      <div style="font-family:Inter,Arial,sans-serif;min-width:190px;padding:6px">
                        <div style="font-size:14px;font-weight:800;color:#0F172A;margin-bottom:8px">
                          ${getVehicleEmoji(c.vehicleType)} ${c.label}
                        </div>
                        <div style="font-size:11px;color:#64748B;margin-bottom:4px">
                          Holat:
                          <span style="color:${getStatusColor(c.status)};font-weight:700">
                            ${` ${getStatusLabel(c.status)}`}
                          </span>
                        </div>
                        <div style="font-size:11px;color:#64748B;margin-bottom:4px">
                          Tezlik: <span style="font-weight:700;color:#0F172A">${c.speed}</span>
                        </div>
                        <div style="font-size:11px;color:#64748B;margin-bottom:4px">
                          Bugungi buyurtmalar:
                          <span style="font-weight:700;color:#0F172A"> ${c.ordersToday}</span>
                        </div>
                        <div style="font-size:11px;color:#64748B">
                          Tur:
                          <span style="font-weight:700;color:#0F172A"> ${
                            c.vehicleType === 'taxi' ? ' Taksi' : ' Kurier'
                          }</span>
                        </div>
                      </div>
                    `,
                  }}
                  options={
                    customLayout
                      ? {
                          iconLayout: customLayout,
                          iconShape: {
                            type: 'Rectangle',
                            coordinates: [
                              [-52, -72],
                              [52, 8],
                            ],
                          },
                          hideIconOnBalloonOpen: false,
                        }
                      : {
                          preset:
                            c.vehicleType === 'taxi'
                              ? 'islands#violetIcon'
                              : 'islands#orangeIcon',
                          hideIconOnBalloonOpen: false,
                        }
                  }
                  modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                  events={{
                    click: () => focusCourier(c),
                  }}
                />
              )
            })}
        </Map>
      </YMaps>

      {!API_KEY && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2000,
            background: 'rgba(248,250,252,0.96)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🔑</div>
            <div style={{ fontWeight: 800, color: C.text }}>
              Yandex API key topilmadi
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
              `.env` ichiga `VITE_YANDEX_MAP_API_KEY=...` qo‘shing
            </div>
          </div>
        </div>
      )}

      {!ready && API_KEY && (
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
            zIndex: 1200,
          }}
        >
          <div style={{ fontSize: 28 }}>🗺</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700 }}>
            MilliyGo xarita yuklanmoqda...
          </div>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          display: 'flex',
          gap: 6,
          zIndex: 1000,
          flexWrap: 'wrap',
          maxWidth: '72%',
        }}
      >
        {[
          ['🗺 Oddiy', 'yandex#map'],
          ['🛰 Gibrid', 'yandex#hybrid'],
          ['🌍 Sputnik', 'yandex#satellite'],
        ].map(([label, key]) => (
          <button
            key={key}
            onClick={() => setMapType(key as MapType)}
            style={toolbarBtnStyle(mapType === key)}
          >
            {label}
          </button>
        ))}

        <button onClick={goToCenter} style={toolbarBtnStyle(false)}>
          ⌖ Markaz
        </button>

        <button
          onClick={() => setHeatEnabled(v => !v)}
          style={toolbarBtnStyle(heatEnabled)}
        >
          🔥 Heat
        </button>

        <button
          onClick={() => setPolygonEnabled(v => !v)}
          style={toolbarBtnStyle(polygonEnabled)}
        >
          ⬠ Zone
        </button>

        <button onClick={toggleFullscreen} style={toolbarBtnStyle(false)}>
          {isFullscreen ? '🗕 Kichraytirish' : '⛶ Butun ekran'}
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: C.slate,
          color: '#fff',
          borderRadius: 999,
          padding: '6px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 10,
          fontWeight: 800,
          zIndex: 1000,
          boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: C.green,
            display: 'inline-block',
            boxShadow: '0 0 0 2px #15803d44',
          }}
        />
        JONLI
      </div>

      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 14,
          padding: '12px 14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          zIndex: 1000,
          minWidth: 190,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            fontSize: 9,
            color: C.muted,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          Issiqlik indeksi
        </div>

        <div
          style={{ fontSize: 14, fontWeight: 800, color: C.text, marginTop: 4 }}
        >
          G‘allaorol markazi
        </div>

        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
          {filter === 'Taksi'
            ? 'Taksi talabi yuqori'
            : filter === 'Yetkazish'
              ? 'Yetkazish talabi yuqori'
              : 'Aralash talab zonasi'}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 3,
            marginTop: 8,
            height: 6,
            width: 120,
          }}
        >
          {['#3B82F6', '#22C55E', '#FBBF24', '#F97316', '#EF4444'].map(
            (c, i) => (
              <div
                key={i}
                style={{ flex: 1, background: c, borderRadius: 999 }}
              />
            ),
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 3,
          }}
        >
          <span style={{ fontSize: 8, color: C.muted }}>Kam</span>
          <span style={{ fontSize: 8, color: C.muted }}>Ko‘p</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 14,
          padding: '12px 14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          zIndex: 1000,
          minWidth: 250,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: C.muted,
            marginBottom: 8,
          }}
        >
          MILLIYGO FLEET
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 10,
          }}
        >
          <StatPill label="Jami" value={summary.total} color={C.slate} />
          <StatPill label="Online" value={summary.online} color={C.green} />
          <StatPill label="Band" value={summary.busy} color={C.amber} />
          <StatPill label="Offline" value={summary.offline} color={C.gray} />
        </div>

        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            color: C.muted,
            marginBottom: 8,
          }}
        >
          TANLANGAN KURYER
        </div>

        {selectedCourier ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  background:
                    selectedCourier.vehicleType === 'taxi'
                      ? '#7C3AED14'
                      : '#F9731614',
                  border: `1px solid ${
                    selectedCourier.vehicleType === 'taxi'
                      ? '#7C3AED33'
                      : '#F9731633'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                {getVehicleEmoji(selectedCourier.vehicleType)}
              </div>

              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>
                  {selectedCourier.label}
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>
                  {getStatusLabel(selectedCourier.status)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: 11, color: C.muted }}>
              Tezlik:{' '}
              <span style={{ color: C.text, fontWeight: 700 }}>
                {selectedCourier.speed}
              </span>
            </div>

            <div style={{ marginTop: 4, fontSize: 11, color: C.muted }}>
              Buyurtmalar:{' '}
              <span style={{ color: C.text, fontWeight: 700 }}>
                {selectedCourier.ordersToday}
              </span>
            </div>

            <div style={{ marginTop: 4, fontSize: 11, color: C.muted }}>
              Tur:{' '}
              <span style={{ color: C.text, fontWeight: 700 }}>
                {selectedCourier.vehicleType === 'taxi' ? 'Taksi' : 'Kurier'}
              </span>
            </div>

            {selectedCourier.activeOrder && (
              <div
                style={{
                  marginTop: 10,
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: 10,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 800, color: C.muted }}>
                  FAOL BUYURTMA
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.text,
                    marginTop: 6,
                    fontWeight: 700,
                  }}
                >
                  {selectedCourier.activeOrder.id}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                  Pickup: {selectedCourier.activeOrder.pickupLabel}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  Dropoff: {selectedCourier.activeOrder.dropoffLabel}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ fontSize: 11, color: C.muted }}>Kuryer tanlanmagan</div>
        )}
      </div>
    </div>
  )
}

function toolbarBtnStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? C.slate : 'rgba(255,255,255,0.96)',
    color: active ? '#fff' : C.text,
    border: 'none',
    borderRadius: 10,
    padding: '6px 10px',
    fontSize: 10,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
  }
}

function StatPill({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: '#F8FAFC',
        border: `1px solid ${C.border}`,
        borderRadius: 999,
        padding: '4px 8px',
        fontSize: 10,
        fontWeight: 700,
        color: C.text,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: color,
          display: 'inline-block',
        }}
      />
      <span>{label}</span>
      <span style={{ color: C.muted }}>{value}</span>
    </div>
  )
}

export default memo(CityMap)
