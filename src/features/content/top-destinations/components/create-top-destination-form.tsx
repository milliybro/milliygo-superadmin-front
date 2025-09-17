import ArrowDownIcon from '@/components/icons/arrow-down'
import { Button, Divider, Form, Input, Select, Typography } from 'antd'
import { useState } from 'react'
import YouTubeEmbed from '../../components/youtube-embed'
import useTopDestinationsContext from '../hooks/use-top-destinations'
import PopularSpotsList from './popular-spots-list'
import TopDestinationGallery from './top-destination-gallery'
import { useTranslation } from 'react-i18next'

export default function CreateTopDestinationForm() {
  const form = Form.useFormInstance()
  const [checkingEmbed, setCheckingEmbed] = useState<boolean>(false)
  const youtubeUrl = Form.useWatch('youtube_url', form)
  const { t } = useTranslation()

  const {
    regions: { data: regions },
  } = useTopDestinationsContext()

  return (
    <div className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          {t('common.preview')}
        </Typography.Title>
        <Divider className="m-0" />
        <Form.Item name="title" label={t('fields.title.label')}>
          <Input placeholder={t('fields.title.placeholder')} size="large" />
        </Form.Item>
        <Form.Item name="region" label={t('fields.region.label')}>
          <Select
            placeholder={t('fields.region.placeholder')}
            options={regions?.results?.map(reg => ({
              label: reg?.name,
              value: reg?.id,
            }))}
            size="large"
            suffixIcon={<ArrowDownIcon className="text-xl" />}
          />
        </Form.Item>

        <TopDestinationGallery />

        <Form.Item name="youtube_url" label={t('fields.youtube_url.label')}>
          <Input
            size="large"
            placeholder={t('fields.youtube_url.placeholder')}
            suffix={
              <Button
                type="primary"
                size="small"
                onClick={() => setCheckingEmbed(true)}
              >
                {t('common.check')}
              </Button>
            }
            onChange={() => {
              setCheckingEmbed(false)
            }}
          />
        </Form.Item>
        {checkingEmbed && <YouTubeEmbed url={youtubeUrl} />}
      </div>
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          {t('content.top_destinations.add_attractions')}
        </Typography.Title>

        <PopularSpotsList />
      </div>
    </div>
  )
}
