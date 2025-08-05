import { Form } from 'antd'
import { useRef, useState } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

import request from '@/utils/axios'

import type { INominatimResponse } from '../../types'

interface YandexMapPickerProps {
  onCoordsChange?: (coords: [number, number]) => void
}

export default function YandexMapPicker({
  onCoordsChange,
}: YandexMapPickerProps) {
  const mapRef = useRef<any>(null)
  const form = Form.useFormInstance()

  const [coords, setCoords] = useState<[number, number]>([41.3111, 69.2797])

  const getNominalByCoords = async (
    latitude: number,
    longitude: number,
  ): Promise<void> => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`

    try {
      const response = await request.get<
        INominatimResponse,
        INominatimResponse
      >(url)

      if (response?.display_name) {
        const formattedAddress = [
          response?.address?.city,
          response?.address?.county,
          response?.address?.suburb,
          response?.address?.road,
          response?.address?.neighbourhood,
          response?.address?.hamlet,
          response?.address?.amenity,
          response?.address?.house_number,
        ]
          .filter(Boolean)
          .join(', ')
        form.setFieldValue('location', formattedAddress)
        form.setFieldValue('lon', longitude)
        form.setFieldValue('lat', latitude)
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error)
    }
  }

  const handleMapClick = (e: any) => {
    const newCoords: [number, number] = e.get('coords')
    setCoords(newCoords)
    getNominalByCoords(newCoords[0], newCoords[1])
    onCoordsChange?.(newCoords)
  }

  return (
    <YMaps query={{ lang: 'ru_RU' }}>
      <Map
        defaultState={{ center: coords, zoom: 12 }}
        width="100%"
        height="584px"
        onClick={handleMapClick}
        instanceRef={mapRef}
      >
        <Placemark
          geometry={coords}
          onDragEnd={(e: any) => {
            const newCoords = e.get('target').geometry.getCoordinates()
            setCoords(newCoords)
          }}
          options={{
            iconLayout: 'default#image',
            iconImageHref: '/location-icon.svg',
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -48],
            hideIconOnBalloonOpen: false,
            openHintOnHover: true,
            draggable: true,
          }}
        />
      </Map>
    </YMaps>
  )
}
