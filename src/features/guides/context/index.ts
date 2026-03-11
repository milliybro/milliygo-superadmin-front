import { createContext } from 'react'
import { IGuideContextType } from '../types'

export const GuideContext = createContext<IGuideContextType | undefined>(
  undefined,
)
