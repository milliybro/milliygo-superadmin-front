import { ReactNode } from "react"

interface ISevicesTable {
  key: string
  id: number
  icon: ReactNode
  name_uz: string
  name_ru: string
  name_en: string
  created_at: string
  status: boolean
}

export type { ISevicesTable }
