import ArrowDownIcon from '@/components/icons/arrow-down'
import EraserIcon from '@/components/icons/eraser-icon'
import { Button, Checkbox, DatePicker, Dropdown, Form } from 'antd'
import dayjs from 'dayjs'
import { useMemo, useRef, useState } from 'react'
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
  widthClass = 'w-[250px]',
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
        className={twMerge(
          'w-full px-3 py-2',
          selected.length === 0 && 'rounded-[8px] bg-[#F3F3F6]',
        )}
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
            className={twMerge(
              'w-full px-3 py-2',
              selected.includes(opt.value) && 'rounded-[8px] bg-[#F3F3F6]',
            )}
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
          <span>
            {selected.length
              ? selected
                  .map(v => options.find(o => o.value === v)?.label)
                  .filter(Boolean)
                  .join(', ')
              : t('guides.not-selected')}
          </span>
        </span>

        <ArrowDownIcon />
      </button>
    </Dropdown>
  )
}

function DateFilter({
  title,
  queryKey = 'date',
  widthClass = 'w-[250px]',
}: {
  title: string
  queryKey?: string
  widthClass?: string
}) {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  const value = useMemo(() => {
    const raw = searchParams.get(queryKey)
    return raw ? dayjs(raw) : null
  }, [searchParams, queryKey])

  const label = value ? value.format('DD MMM, YYYY') : t('guides.not-selected')

  return (
    <div ref={wrapRef} className={twMerge(widthClass, 'relative')}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={twMerge(
          'flex h-[44px] w-full items-center justify-between rounded-[10px] border border-border bg-white px-3',
        )}
      >
        <span className="truncate text-sm">
          <span className="text-primary">{title}: </span>
          <span>{label}</span>
        </span>

        <ArrowDownIcon />
      </button>

      <DatePicker
        value={value}
        open={open}
        onOpenChange={setOpen}
        onChange={d => {
          const p = new URLSearchParams(searchParams)
          if (d) p.set(queryKey, d.format('YYYY-MM-DD'))
          else p.delete(queryKey)
          p.set('page', '1')
          setSearchParams(p)
          setOpen(false)
        }}
        getPopupContainer={() => wrapRef.current ?? document.body}
        popupClassName="rounded-[12px] shadow-lg mt-4"
        panelRender={panel => (
          <div className="rounded-[12px] bg-white">
            <div className="px-2 pb-2">{panel}</div>
          </div>
        )}
        className="absolute left-0 top-6 h-0 w-0 overflow-hidden opacity-0"
        inputReadOnly
      />
    </div>
  )
}

const ProviderItemFilters = () => {
  const STATUS: Option[] = [
    { value: 'active', label: 'Действующий' },
    { value: 'expired', label: 'Истёк' },
  ]

  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleReset = () => {
    const p = new URLSearchParams(searchParams)

    const keysToReset = ['category', 'status', 'date']
    keysToReset.forEach(k => p.delete(k))

    p.set('page', '1')
    if (!p.get('guide_status')) p.set('guide_status', 'accepted')

    setSearchParams(p)
  }

  return (
    <Form layout="vertical" className="w-full pb-4 pt-4">
      <div className="flex flex-wrap justify-start gap-3">
        <Form.Item className="mb-0">
          <DateFilter
            title={t('fields.date.label') ?? 'Дата'}
            queryKey="date"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <FilterSelect
            title={t('guides.filter.status')}
            queryKey="status"
            options={STATUS}
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

export default ProviderItemFilters
