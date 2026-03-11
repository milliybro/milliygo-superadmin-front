export interface IHollyTourism {
  id: number
  title: string
  slug: string
  status: boolean
  content: string
  image: string
  images: {
    id: number
    is_main: boolean
    image: string
  }[]
}

export interface IHollyTourismForm {
  title: string
  content: string
  status: boolean
  translate_all: boolean
  refresh_cache: boolean
}
