import { ListResponse } from '@/types'
import request from '@/utils/axios'
import { IVideoBackground } from '../types'

export async function getBackgrounds(): Promise<
  ListResponse<IVideoBackground[]>
> {
  return await request({
    url: '/site-content/background_video_main_page/',
    method: 'GET',
  })
}

export async function getBackground(
  id: number | string,
): Promise<IVideoBackground> {
  return await request({
    url: `/site-content/background_video_main_page/${id}/`,
    method: 'GET',
  })
}

export async function createBackground(
  data: FormData,
): Promise<IVideoBackground> {
  return await request({
    url: '/site-content/background_video_main_page/',
    method: 'POST',
    data,
  })
}

export async function editBackground(
  id: number | string,
  data: FormData,
): Promise<IVideoBackground> {
  return await request({
    url: `/site-content/background_video_main_page/${id}/`,
    method: 'PATCH',
    data,
  })
}

export async function deleteBackground(
  id: number | string,
): Promise<IVideoBackground> {
  return await request({
    url: `/site-content/background_video_main_page/${id}/`,
    method: 'DELETE',
  })
}
