import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IVideoBackground } from '../types'

export async function getBackgrounds(): Promise<
  ListResponse<IVideoBackground[]>
> {
  return await request({
    url: '/site-content/background_video_main_page',
    method: 'GET',
  })
}
