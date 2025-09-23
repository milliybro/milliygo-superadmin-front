import { createImageStore } from '@/helpers/create-image-store'

interface ExpertAdviceImage {
  file: File | null
  resized?: File
  url: string
}

export const useExpertAdviceImage =
  createImageStore<ExpertAdviceImage>('single')
