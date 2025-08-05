import request from '@/utils/axios'

export async function deleteTopDestination(id: number | string) {
  return await request({
    url: `/site-content/top_destinations/${id}`,
    method: 'DELETE',
  })
}

export async function createTopDestination(data: FormData) {
  return await request({
    url: '/site-content/top_destinations',
    method: 'post',
    data,
  })
}

export async function editTopDestination(id: number | string, data: FormData) {
  return await request({
    url: `/site-content/top_destinations/${id}`,
    method: 'patch',
    data,
  })
}
