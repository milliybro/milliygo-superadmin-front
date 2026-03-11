import { create } from 'zustand'
import type { IBreadCrumbsStore } from '@/types'

const useBreadCrumbsStore = create<IBreadCrumbsStore>(set => ({
  breadCrumbs: [],
  setBreadCrumbs: newBreadCrumbs =>
    set(() => ({ breadCrumbs: newBreadCrumbs })),
}))

export default useBreadCrumbsStore
