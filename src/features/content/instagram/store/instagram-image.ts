import { createImageStore } from '@/helpers/create-image-store'

interface InstagramImageItem {
  url: string
  file: File | null
}

export const useInstagramImage = createImageStore<InstagramImageItem>('single')
