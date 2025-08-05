import ArrowDownIcon from '@/components/icons/arrow-down'
import { Button, Divider, Form, Input, Select, Typography } from 'antd'
import { useState } from 'react'
import YouTubeEmbed from '../../components/youtube-embed'
import useTopDestinationsContext from '../hooks/use-top-destinations'
import PopularSpotsList from './popular-spots-list'
import TopDestinationGallery from './top-destination-gallery'

export default function CreateTopDestinationForm() {
  const [form] = Form.useForm()
  const [checkingEmbed, setCheckingEmbed] = useState<boolean>(false)
  const youtubeUrl = Form.useWatch('youtube_url', form)

  const {
    regions: { data: regions },
    coords,
  } = useTopDestinationsContext()

  return (
    <Form
      className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6"
      form={form}
      layout="vertical"
      onFinish={values => console.log(values, coords)}
      requiredMark={false}
    >
      <div className="flex flex-col gap-4 rounded-2xl border p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          Предпросмотр
        </Typography.Title>
        <Divider className="m-0" />
        <Form.Item name="title" label="Название">
          <Input placeholder="Введите название" size="large" />
        </Form.Item>
        <Form.Item name="region" label="Регион">
          <Select
            options={regions?.results?.map(reg => ({
              label: reg.name,
              value: reg.id,
            }))}
            size="large"
            suffixIcon={<ArrowDownIcon className="text-xl" />}
          />
        </Form.Item>

        <TopDestinationGallery />

        <Form.Item name="youtube_url" label="YouTube URL">
          <Input
            size="large"
            suffix={
              <Button
                type="primary"
                size="small"
                onClick={() => setCheckingEmbed(true)}
              >
                Проверить
              </Button>
            }
            onChange={() => {
              setCheckingEmbed(false)
            }}
          />
        </Form.Item>
        {checkingEmbed && <YouTubeEmbed url={youtubeUrl} />}
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          Добавить популярные места
        </Typography.Title>

        <PopularSpotsList />
      </div>
    </Form>
  )
}
