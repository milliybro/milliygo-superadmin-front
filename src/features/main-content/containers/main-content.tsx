import { Divider, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import DestinationsItem from '../components/destinations'
import RecreationItem from '../components/recreation'
import DestinationModal from '../components/destinations-modal'
import RecreationModal from '../components/recreation-modal'
import VideoUploader from '../components/video-uploader'
import { useQuery } from '@tanstack/react-query'
import { getRecreationList } from '../api'

const Content = () => {
  const { t } = useTranslation()
  const { data: destinationsData } = useQuery({
    queryKey: ['destination-data'],
    queryFn: async () => {
      const res = await getRecreationList()
      return res
    },
    // keepPreviousData: true,
  })

  const destinations = [
    {},
    {
      name: 'Хива',
    },
    {
      name: 'Ташкент',
    },
    {
      name: 'Джизак',
    },
  ]

  const sizes = [
    'col-span-1 row-span-2',
    'col-span-1 row-span-2',
    'col-span-2 row-span-1',
    'col-span-2 row-span-1',
  ]

  return (
    <>
      <Form layout="vertical" className="flex flex-col gap-6">
        <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
          {t('home-content.video-home')}
          <Divider />
          <div className="flex items-center gap-6 mb-6">
            <VideoUploader />
          </div>
        </div>
        <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
          {t('home-content.destinations')}
          <Divider />
          <div className="flex  justify-center gap-4">
            {destinations.map((destination, index) => (
              <DestinationsItem key={index} destination={destination} />
            ))}
          </div>
        </div>
        <div className="bg-white border flex-col p-6 overflow-hidden border-border rounded-[16px]">
          {t('home-content.recreating')}
          <Divider />
          <div className="container grid grid-cols-4 grid-rows-2 gap-4 py-4 h-[500px]">
            {destinationsData?.results
              .slice(0, 4)
              .map((category, index: number) => (
                <RecreationItem
                  key={index}
                  category={{ ...category, size: sizes[index] }}
                />
              ))}
          </div>
        </div>
      </Form>
      <DestinationModal />
      <RecreationModal />
    </>
  )
}

export default Content
