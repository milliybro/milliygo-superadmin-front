import { createImageStore } from '@/helpers/create-image-store'

interface DiscoverImage {
  file: File | null
  resized?: File
  url: string
}

export const useDiscoverImage = createImageStore<DiscoverImage>('single')
