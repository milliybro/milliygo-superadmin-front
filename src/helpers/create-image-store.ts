import { create, StoreApi, UseBoundStore } from 'zustand'

type ImageItem = {
  file: File
  url: string
}

type MultipleImageStore<T = ImageItem> = {
  images: T[]
  setImages: (images: T[]) => void
  addImage: (image: T) => void
  removeImage: (index: number) => void
  updateImage: (index: number, newImage: T) => void
}

type SingleImageStore<T = ImageItem> = {
  image: T | null
  setImage: (image: T | null) => void
  removeImage: () => void
}

export function createImageStore<T = ImageItem>(
  type: 'single',
): UseBoundStore<StoreApi<SingleImageStore<T>>>
export function createImageStore<T = ImageItem>(
  type: 'multiple',
): UseBoundStore<StoreApi<MultipleImageStore<T>>>
export function createImageStore<T = ImageItem>(
  type: 'single' | 'multiple' = 'multiple',
) {
  if (type === 'single') {
    return create<SingleImageStore<T>>(set => ({
      image: null,
      setImage: image => set({ image }),
      removeImage: () => set({ image: null }),
    }))
  }

  return create<MultipleImageStore<T>>(set => ({
    images: [],
    setImages: images => set({ images }),
    addImage: image => set(state => ({ images: [...state.images, image] })),
    removeImage: index =>
      set(state => ({
        images: state.images.filter((_, i) => i !== index),
      })),
    updateImage: (index, newImage) =>
      set(state => ({
        images: state.images.map((img, i) => (i === index ? newImage : img)),
      })),
  }))
}
