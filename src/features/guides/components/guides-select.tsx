import ArrowDownIcon from '@/components/icons/arrow-down'
import EraserIcon from '@/components/icons/eraser-icon'
import { Button, Checkbox, Dropdown, Form } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { twMerge } from 'tailwind-merge'

type Option = { value: string; label: string }

function getArrParam(sp: URLSearchParams, key: string) {
  const raw = sp.get(key)
  if (!raw) return []
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

function setArrParam(sp: URLSearchParams, key: string, values: string[]) {
  if (!values || values.length === 0) sp.delete(key)
  else sp.set(key, values.join(','))
}

function FilterSelect({
  title,
  queryKey,
  options,
  widthClass = 'w-[190px]',
}: {
  title: string
  queryKey: string
  options: Option[]
  widthClass?: string
}) {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const selected = useMemo(
    () => getArrParam(searchParams, queryKey),
    [searchParams, queryKey],
  )

  const content = (
    <div className="w-[260px] rounded-[12px] bg-white p-3 shadow-lg">
      <Checkbox
        className={`w-full px-3 py-2 ${
          selected.length === 0 ? 'rounded-[8px] bg-[#F3F3F6]' : ''
        }`}
        checked={selected.length === 0}
        onChange={() => {
          const p = new URLSearchParams(searchParams)
          setArrParam(p, queryKey, [])
          p.set('page', '1')
          setSearchParams(p)
        }}
      >
        {t('guides.all')}
      </Checkbox>

      <div className="mt-2" />

      <Checkbox.Group
        className="flex flex-col gap-1"
        value={selected}
        onChange={vals => {
          const p = new URLSearchParams(searchParams)
          setArrParam(p, queryKey, vals as string[])
          p.set('page', '1')
          setSearchParams(p)
        }}
      >
        {options.map(opt => (
          <Checkbox
            key={opt.value}
            value={opt.value}
            className={`w-full px-3 py-2 ${
              selected.includes(opt.value) ? 'rounded-[8px] bg-[#F3F3F6]' : ''
            }`}
          >
            {opt.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  )

  return (
    <Dropdown trigger={['click']} dropdownRender={() => content}>
      <button
        type="button"
        className={twMerge(
          widthClass,
          'flex h-[44px] items-center justify-between rounded-[10px] border border-border bg-white px-3',
        )}
      >
        <span className="truncate text-sm">
          <span className="text-primary">{title}: </span>
          <span className="">
            {selected.length
              ? selected
                  .map(v => options.find(o => o.value === v)?.label)
                  .join(', ')
              : t('guides.not-selected')}
          </span>
        </span>

        <ArrowDownIcon />
      </button>
    </Dropdown>
  )
}

const GuidesFilters = () => {
  const CATEGORY = [
    { value: 'highest', label: 'Высшая категория' },
    { value: 'first', label: '1-я категория' },
    { value: 'second', label: '2-я категория' },
    { value: 'none', label: 'Без категории' },
  ]

  const REGION = [
    { value: 'andijan', label: 'Андижанская область' },
    { value: 'bukhara', label: 'Бухарская область' },
    { value: 'samarkand', label: 'Самаркандская область' },
  ]

  const SPEC = [
    { value: 'excursion', label: 'Экскурсовод' },
    { value: 'guide', label: 'Гид' },
  ]

  const GENDER = [
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ]

  const STATUS = [
    { value: 'active', label: 'Действующий' },
    { value: 'expired', label: 'Истёк' },
  ]

  const LANG = [
    { value: 'ru', label: 'Русский' },
    { value: 'en', label: 'English' },
  ]

  const RATING = [
    { value: '5', label: '⭐ 5.0' },
    { value: '4', label: '⭐ 4.0' },
  ]
const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const handleReset = () => {
    const p = new URLSearchParams(searchParams)

    const keysToReset = [
      'category',
      'region',
      'spec',
      'gender',
      'status',
      'lang',
      'rating',
      'search',
    ]

    keysToReset.forEach(k => p.delete(k))

    p.set('page', '1')

    if (!p.get('guide_status')) p.set('guide_status', 'accepted')

    setSearchParams(p)
  }

  return (
    <Form layout="vertical" className="w-full pb-4">
      <div className="flex justify-between gap-3">
        <Form.Item className="mb-0">
          <FilterSelect
            title={t('guides.filter.category')}
            queryKey="category"
            options={CATEGORY}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect title={t('guides.filter.region')} queryKey="region" options={REGION} />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect title={t('guides.filter.spec')} queryKey="spec" options={SPEC} />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect
            title={t('guides.filter.gender')}
            queryKey="gender"
            options={GENDER}
            widthClass=""
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect title={t('guides.filter.status')} queryKey="status" options={STATUS} />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect
            title={t('guides.filter.lang')}
            queryKey="lang"
            options={LANG}
            widthClass=""
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect
            title={t('guides.filter.rating')}
            queryKey="rating"
            options={RATING}
            widthClass=""
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            onClick={handleReset}
            type="default"
            className="h-[44px] rounded-[14px] bg-[#F3F4F6] px-5 font-semibold text-[#1F2937] shadow-none hover:bg-[#E5E7EB]"
          >
            <span className="mr-2 inline-flex items-center justify-center">
              <EraserIcon className="text-[16px] text-[#111827]" />
            </span>
            {t('guides.reset')}
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default GuidesFilters
