import { create, StoreApi, UseBoundStore } from 'zustand'

type ImageItem = {
  file: File
  url: string
}

type ImageStore<T = ImageItem> = {
  images: T[]
  setImages: (images: T[]) => void
  addImage: (image: T) => void
  removeImage: (index: number) => void
  updateImage: (index: number, newImage: T) => void
}

type SignleImageStore<T = ImageItem> = {
  image: T | null
  setImage: (image: T | null) => void
  removeImage: () => void
}

export function createImageStore<T = ImageItem>(
  type: 'single',
): UseBoundStore<StoreApi<SignleImageStore<T>>>
export function createImageStore<T = ImageItem>(
  type: 'multiple',
): UseBoundStore<StoreApi<ImageStore<T>>>
export function createImageStore<T = ImageItem>(): UseBoundStore<
  StoreApi<ImageStore<T>>
>
export function createImageStore<T = ImageItem>(type?: 'single' | 'multiple') {
  if (type === 'single') {
    return create<SignleImageStore<T>>(set => ({
      image: null,
      setImage: image => set({ image }),
      removeImage: () => set({ image: null }),
    }))
  } else {
    return create<ImageStore<T>>(set => ({
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
}
