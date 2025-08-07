export interface ITopDestinationForm {
  title: string
  description: string
  region: number
  youtube_url: string
  place_attractions: {
    name: string
    description: string
  }[]
}
