import { createImageStore } from '@/helpers/create-image-store'

interface EventImage {
  file: File | null
  url: string | null
  resized: File | null
}

export const useEventImage = createImageStore<EventImage>('single')
