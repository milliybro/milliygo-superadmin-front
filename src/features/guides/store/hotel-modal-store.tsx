import { create } from 'zustand'

interface ModalStore {
  isGuideModalOpen: boolean
  openGuideModal: () => void
  closeGuideModal: () => void
}

const useGuideModalStore = create<ModalStore>(set => ({
  isGuideModalOpen: false,
  openGuideModal: () => set({ isGuideModalOpen: true }),
  closeGuideModal: () => set({ isGuideModalOpen: false }),
}))

export default useGuideModalStore
