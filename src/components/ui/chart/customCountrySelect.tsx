import { useState, useRef, useEffect } from 'react'
import { Checkbox } from 'antd'
import ArrowDownIcon from '@/components/icons/arrow-down'
import { useTranslation } from 'react-i18next'

interface CountryOption {
  label: string
  value: string | number
}

interface CustomCountrySelectProps {
  options: CountryOption[]
  value: (string | number)[]
  onChange: (values: (string | number)[]) => void
  placeholder?: string
  maxTagCount?: 'responsive' | number
  loading?: boolean
}

export const CustomCountrySelect = ({
  options = [],
  value = [],
  onChange,
  placeholder = 'Все страны',
  maxTagCount = 'responsive',
  loading = false,
}: CustomCountrySelectProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter(opt =>
    (opt.label ?? '').toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const allSelected = value.length === 0 || value.length === options.length

  const someSelected = value.length > 0 && value.length < options.length

  const handleSelectAll = () => {
    onChange([])
  }

  const handleToggleOption = (optionValue: string | number) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-[250px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 transition-colors hover:border-gray-400"
        disabled={loading}
      >
        <span className="truncate text-sm font-medium text-gray-700">
          {t('statistics.all-country')}
        </span>
        <div className="ml-2">
          {isOpen ? (
            <ArrowDownIcon className="text-gray-500" />
          ) : (
            <ArrowDownIcon className="text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full z-50 mt-0 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
          <div className="max-h-64 overflow-y-auto">
            <div className="border-gray-200 p-3 pb-0">
              <Checkbox
                indeterminate={someSelected}
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-full"
              >
                <span className="ml-0 text-sm font-medium text-gray-700">
                  {t('statistics.all-country')}
                </span>
              </Checkbox>
            </div>

            <div className="space-y-3 p-3">
              {filteredOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <Checkbox
                    checked={value.includes(option.value)}
                    onChange={() => handleToggleOption(option.value)}
                  />
                  <span
                    onClick={() => handleToggleOption(option.value)}
                    className="ml-2 flex-1 cursor-pointer text-sm text-gray-700"
                  >
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
