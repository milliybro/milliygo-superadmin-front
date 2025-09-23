import { createImageStore } from '@/helpers/create-image-store'

type TopDestinationImage = {
  file: File | null
  resized?: File | null
  url: string
} | null

export const useTopDestinationImage =
  createImageStore<TopDestinationImage>('multiple')
