import { createImageStore } from '@/helpers/create-image-store'

interface DiscoverImage {
  file: File | null
  url: string
}

export const useDiscoverImage = createImageStore<DiscoverImage>('single')
