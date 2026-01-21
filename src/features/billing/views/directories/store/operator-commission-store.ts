import { create } from 'zustand'

interface ModalStore {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  id: number | null
  setId: (id: number) => void
  clearId: () => void
}

const useOperatorCommissionModalStore = create<ModalStore>(set => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  id: null,
  setId: (id: number) => set({ id }),
  clearId: () => set({ id: null })
}))

export default useOperatorCommissionModalStore
