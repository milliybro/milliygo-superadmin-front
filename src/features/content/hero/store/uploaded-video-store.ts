import { create } from 'zustand'

interface IUploadedStore {
  uploadedVideo: {
    video: File
    preview: File
  } | null
  setUploadedVideo: (files: { video: File; preview: File }) => void
  removeUploadedVideo: () => void
}

export const useUploadedVideoStore = create<IUploadedStore>(set => ({
  uploadedVideo: null,
  setUploadedVideo: ({ video, preview }) =>
    set({ uploadedVideo: { video, preview } }),
  removeUploadedVideo: () => set({ uploadedVideo: null }),
}))
