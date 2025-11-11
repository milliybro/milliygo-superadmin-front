import ArrowDownIcon from '@/components/icons/arrow-down'
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Typography,
} from 'antd'
import { useState } from 'react'
import YouTubeEmbed from '../../components/youtube-embed'
import PopularSpotsList from './popular-spots-list'
import TopDestinationGallery from './top-destination-gallery'
import { useTranslation } from 'react-i18next'
import { useRegions } from '../hooks/use-regions'

export default function CreateTopDestinationForm({
  language,
  setLanguage,
}: any) {
  const form = Form.useFormInstance()
  const [checkingEmbed, setCheckingEmbed] = useState<boolean>(false)
  const youtubeUrl = Form.useWatch('youtube_url', form)
  const { t } = useTranslation()
  const activeStatus = Form.useWatch('status', form)
  const { data: regions } = useRegions()

  const LANGUAGES = [
    ['en', 'English'],
    ['ru', 'Russian'],
    ['uz-latin', 'Uzbek (Latin)'],
    ['uz-cyrillic', 'Ўзбек (Кирил)'],
    ['ko', 'Korean'],
    ['tr', 'Turkish'],
    ['de', 'Deutsch'],
    ['fr', 'French'],
    ['it', 'Italian'],
    ['es', 'Espanol'],
    ['pt', 'Portugal'],
    ['ar', 'Arabic'],
    ['zh-cn', 'Chinese'],
    ['ja', 'Japanese'],
    ['hi', 'Hindi'],
    ['ur', 'Urdu'],
    ['tg', 'Tajik'],
    ['kk', 'Kazakh'],
    ['ky', 'Kyrgyz'],
    ['tk', 'Turkmen'],
    ['az', 'Azerbaijan'],
  ]
  const options = LANGUAGES.map(([value, label]) => ({
    label,
    value,
  }))

  return (
    <div className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <Typography.Title level={5} className="text-xl font-medium">
            {t('common.preview')}
          </Typography.Title>
          <Select
            showSearch
            placeholder="Select language"
            optionFilterProp="label"
            size="large"
            style={{ width: 240 }}
            options={options}
            value={language}
            onChange={val => setLanguage(val)}
          />
        </div>
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
        <div className="flex items-end gap-5">
          <Form.Item label={t('fields.status.label')} name="status">
            <Switch />
          </Form.Item>
          <Tag
            color={activeStatus ? 'green' : 'red'}
            className="px-2 py-2 text-sm"
          >
            {activeStatus ? t('common.active') : t('common.inactive')}
          </Tag>
        </div>
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
