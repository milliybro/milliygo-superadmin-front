import { create } from 'zustand'

interface ModalStore {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useCurrenciesModalStore = create<ModalStore>(set => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export default useCurrenciesModalStore
