import { useState, useRef, useEffect, useMemo } from 'react'
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
  loading?: boolean
}

export const CustomCountrySelect = ({
  options = [],
  value = [],
  onChange,
  placeholder,
  loading = false,
}: CustomCountrySelectProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOptions = useMemo(
    () => options.filter(opt => value.includes(opt.value)),
    [options, value],
  )

  const buttonLabel = useMemo(() => {
    if (value.length === 0 || value.length === options.length) {
      return t('statistics.all-country')
    }

    const count = selectedOptions.length

    if (count === 1) {
      return selectedOptions[0].label
    }

    if (count === 2) {
      return `${selectedOptions[0].label}, ${selectedOptions[1].label}`
    }

    return `${selectedOptions[0].label}, ${selectedOptions[1].label} +${count - 2}`
  }, [value, options.length, selectedOptions, t])

  const allSelected = value.length === 0 || value.length === options.length
  const someSelected = value.length > 0 && value.length < options.length

  const handleSelectAll = () => onChange([])

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
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        disabled={loading}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-[11.5px] hover:border-gray-400"
      >
        <span className="truncate text-sm font-medium text-gray-700">
          {buttonLabel}
        </span>
        <ArrowDownIcon
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-lg">
          <div className="max-h-64 space-y-3 overflow-y-auto p-3">
            <Checkbox
              indeterminate={someSelected}
              checked={allSelected}
              onChange={handleSelectAll}
              className="w-full"
            >
              {t('statistics.all-country')}
            </Checkbox>

            {options.map(option => (
              <div key={option.value} className="flex items-center">
                <Checkbox
                  checked={value.includes(option.value)}
                  onChange={() => handleToggleOption(option.value)}
                />
                <span
                  onClick={() => handleToggleOption(option.value)}
                  className="ml-2 cursor-pointer text-sm text-gray-700"
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
