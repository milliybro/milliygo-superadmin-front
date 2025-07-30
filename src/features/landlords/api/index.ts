import { ListResponse } from '@/types'
import { IApartmentsTable } from '../types'
import requestAuth from '@/utils/authRequest'
import axios from 'axios'

export async function getApartmentsList(
  params?: any,
): Promise<ListResponse<IApartmentsTable[]>> {
  const res: ListResponse<IApartmentsTable[]> = await requestAuth({
    url: '/apartments/',
    method: 'get',
    params,
  })

  return res
}

export async function getApartmentItem(
  id?: number,
): Promise<ListResponse<IApartmentsTable[]>> {
  const res: ListResponse<IApartmentsTable[]> = await requestAuth({
    url: `/apartments/${id}`,
    method: 'get',
  })

  return res
}

export const getNominalByLatLng = async (
  lat: number,
  lon: number,
  lang = 'en',
): Promise<string | null> => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat,
          lon,
          format: 'json',
        },
        headers: {
          'Accept-Language': lang,
          'User-Agent': 'your-app-name',
        },
      },
    )

    return response.data.display_name || null
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return null
  }
}
