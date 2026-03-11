import { Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { getNominalByLatLng } from '../api'

const AddressCell = ({
  lat,
  lon,
  lang = 'uz',
}: {
  lat: number
  lon: number
  lang?: string
}) => {
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    if (lat && lon) {
      getNominalByLatLng(lat, lon, lang).then(setAddress)
    }
  }, [lat, lon, lang])

  if (!lat || !lon) return <div className="text-center">-</div>

  return address ? (
    <Tooltip
      color="white"
      overlayInnerStyle={{
        color: '#3276FF',
        textAlign: 'center',
        textDecoration: 'underline',
      }}
      title={address}
    >
      <a
        style={{ textDecoration: 'underline' }}
        className="line-clamp-2 text-[#3276FF]"
      >
        {address}
      </a>
    </Tooltip>
  ) : (
    <div className="text-center text-gray-400">Yuklanmoqda...</div>
  )
}

export default AddressCell
