import { create } from 'zustand'

interface IMapCoordsStore {
  coords: [number, number][] | null
  setCoords: (coords: [number, number][] | null) => void
  removeCoord: (index: number) => void
  updatedCoords: (index: number, newCoords: [number, number]) => void
  addCoord: (coords?: [number, number]) => void
}

export const useMapCoordsStore = create<IMapCoordsStore>(set => ({
  coords: null,
  setCoords: coords => set({ coords }),
  removeCoord: (index: number) =>
    set(state => {
      if (state.coords) {
        const updatedCoords = [...state.coords]
        updatedCoords.splice(index, 1)
        return { coords: updatedCoords }
      }
      return state
    }),
  updatedCoords: (index: number, newCoords: [number, number]) =>
    set(state => {
      if (state.coords) {
        const updatedCoords = [...state.coords]
        updatedCoords[index] = newCoords
        return { coords: updatedCoords }
      }
      return state
    }),
  addCoord: (newCoords = [41.3111, 69.2797]) =>
    set(state => {
      return { coords: [...(state.coords || []), newCoords] }
    }),
}))
