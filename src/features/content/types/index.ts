export interface IRegion {
  id: number
  name: string
  code: string | null
  parent: any
}

export interface ITopDestination {
  id: number
  title: string
  description: string
  region: IRegion
  images: {
    id: number
    is_main: boolean
    file_path: string
  }[]
  video_url: string | null
  created_at: string
  updated_at: string
}
