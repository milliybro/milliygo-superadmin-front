import ArrowDownIcon from '@/components/icons/arrow-down'
import {
  Button,
  Divider,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import YouTubeEmbed from '../../components/youtube-embed'
import PopularSpotsList from './popular-spots-list'
import TopDestinationGallery from './top-destination-gallery'
import { useTranslation } from 'react-i18next'
import { useRegions } from '../hooks/use-regions'
import { useLocation } from 'react-router'
import TranslateIcon from '@/components/icons/translate-icon'
import QuillEditor from '../../components/quill-editor'

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
  const { pathname } = useLocation()

  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname])

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

  const allOptions = LANGUAGES.map(([value, label]) => ({
    label,
    value,
  }))

  // 👉 Edit bo‘lmasa faqat EN
  const languageOptions = useMemo(() => {
    if (!isEdit) {
      return [
        {
          label: 'English',
          value: 'en',
        },
      ]
    }
    return allOptions
  }, [isEdit])

  // 👉 Create holatda avtomatik EN
  useEffect(() => {
    if (!isEdit) {
      setLanguage('en')
    }
  }, [isEdit])

  return (
    <div className="flex w-1/2 flex-shrink-0 basis-1/2 flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-6">
        <Typography.Title level={5} className="text-xl font-medium">
          {t('common.preview')}
        </Typography.Title>

        <div className="flex items-center">
          <div className="flex items-center justify-between gap-2">
            {isEdit && (
              <div className="flex items-center gap-6 rounded-[8px] border border-[#E5E7EB] px-4 py-2">
                <Typography.Text>Keshni yangilash</Typography.Text>
                <Form.Item
                  name="refresh_cache"
                  valuePropName="checked"
                  noStyle
                  initialValue={false}
                >
                  <Switch />
                </Form.Item>
              </div>
            )}

            {isEdit && (
              <div className="flex items-center gap-6 rounded-[8px] border border-[#E5E7EB] px-4 py-2">
                <Typography.Text>{t('common.auto-translate')}</Typography.Text>

                <div className="flex items-center gap-3">
                  <Form.Item
                    name="translate_all"
                    valuePropName="checked"
                    noStyle
                    initialValue={false}
                  >
                    <Switch />
                  </Form.Item>

                  <Tooltip
                    title={
                      <>
                        <b>{t('common.auto-trans')}</b>
                        <br />
                        {t('common.auto-trans-desc')}
                      </>
                    }
                    overlayInnerStyle={{
                      padding: '12px',
                      backgroundColor: '#232E40',
                      color: '#fff',
                      width: '320px',
                    }}
                  >
                    <div className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border border-[#777E90] text-[12px] text-[#777E90]">
                      ?
                    </div>
                  </Tooltip>
                </div>
              </div>
            )}

            {/* 🌍 Language Select */}
            <Select
              showSearch={isEdit}
              placeholder="Select language"
              optionFilterProp="label"
              size="large"
              style={{ width: 200 }}
              options={languageOptions}
              value={language}
              onChange={val => setLanguage(val)}
              prefix={<TranslateIcon />}
              disabled={!isEdit}
            />
          </div>
        </div>

        <Divider className="m-0" />

        <Form.Item name="title" label={t('fields.title.label')}>
          <QuillEditor placeholder={t('fields.title.placeholder')} />
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
            onChange={() => setCheckingEmbed(false)}
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
