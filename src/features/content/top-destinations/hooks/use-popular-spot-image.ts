import { createImageStore } from '@/helpers/create-image-store'

type PopularSpotImage = {
  file: File | null
  url: string
} | null

export const usePopularSpotImages =
  createImageStore<PopularSpotImage>('multiple')
