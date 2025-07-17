import { create } from 'zustand'

interface ImageItem {
  id: number
  file?: File | null
  image?: string
  is_main?: boolean
}

interface ImageStoreState {
  images: ImageItem[]
}

interface ImageStoreAction {
  addImage: (image: Omit<ImageItem, 'id'>) => void
  removeImage: (index: number) => void
  setMainImage: (index: number | null) => void
  setImages: (images: ImageItem[], urls?: string[]) => void
}

export const useTourImageStore = create<ImageStoreAction & ImageStoreState>(
  set => ({
    images: [],
    addImage: image =>
      set(state => ({
        images: [
          ...state.images,
          {
            ...image,
            id: state.images[state.images.length - 1]?.id + 1 || Date.now(),
          },
        ],
      })),
    removeImage: index =>
      set(state => ({
        images: state.images.filter((_, i) => i !== index),
      })),
    setImages: (images, localUrls) => set(() => ({ images, localUrls })),
    setMainImage: index =>
      set(state => ({
        images: state.images.map((image, i) => ({
          ...image,
          is_main: i === index,
        })),
      })),
  }),
)
