import { create } from 'zustand'

interface ModalStore {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useUserModalStore = create<ModalStore>(set => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export default useUserModalStore
