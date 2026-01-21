import { createImageStore } from '@/helpers/create-image-store'

type HollyTourismImage = {
  id: number | null
  file: File | null
  resized?: File | null
  url: string
  is_main: boolean
} | null

export const useHollyTourismImage =
  createImageStore<HollyTourismImage>('multiple')
