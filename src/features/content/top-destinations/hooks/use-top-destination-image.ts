import { createImageStore } from '@/helpers/create-image-store'

type TopDestinationImage = {
  id: number | null
  file: File | null
  resized?: File | null
  url: string
} | null

export const useTopDestinationImage =
  createImageStore<TopDestinationImage>('multiple')
