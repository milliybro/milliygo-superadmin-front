import {
  Divider,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import DiscoverGallery from './discover-gallery'
import SocialsList from './socials-list'
import { useTranslation } from 'react-i18next'
import TranslateIcon from '@/components/icons/translate-icon'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import QuillEditor from '../../components/quill-editor'

export default function CreateDiscoverForm({ language, setLanguage }: any) {
  const { t } = useTranslation()
  const form = Form.useFormInstance()
  const { pathname } = useLocation()
  const isEdit = useMemo(() => pathname.includes('/edit'), [pathname])
  const status = Form.useWatch('status', form)

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

  // 👉 Edit bo‘lmasa faqat English
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
    <div className="flex w-full flex-grow-0 basis-1/2 flex-col gap-4 rounded-2xl border bg-white p-6">
      <Typography.Title level={5} className="text-xl font-medium">
        {t('common.preview')}
      </Typography.Title>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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

          {/* 🌍 Language select */}
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

      <Form.Item name="name" label={t('fields.name.label')}>
        <QuillEditor placeholder={t('fields.name.placeholder')} />
      </Form.Item>

      <Form.Item name="description" label={t('fields.description.label')}>
        <QuillEditor placeholder={t('fields.description.placeholder')} />
      </Form.Item>

      <div className="flex items-end gap-5">
        <Form.Item label={t('fields.status.label')} name="status">
          <Switch />
        </Form.Item>

        <Tag color={status ? 'green' : 'red'} className="px-2 py-2 text-sm">
          {status ? t('common.active') : t('common.inactive')}
        </Tag>
      </div>

      <Typography.Text className="select-none text-sm">
        {t('content.discover.social-links')}
      </Typography.Text>

      <SocialsList />
      <DiscoverGallery />
    </div>
  )
}
