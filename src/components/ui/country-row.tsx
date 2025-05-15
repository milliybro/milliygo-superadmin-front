import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import countries from 'world-countries'

interface IProps {
  label: string
  value: ReactNode
  valueClass?: string
}

const getCountryCode = (countryName: string) => {
  const country = countries.find(c => c.name.common === countryName)
  return country ? country.cca2.toLowerCase() : ''
}

const CountryRow: FC<IProps> = ({ label, value, valueClass }: any) => {
  const countryCode = getCountryCode(value)
  const flagUrl = countryCode
    ? `https://flagcdn.com/w40/${countryCode}.png`
    : null

  return (
    <div className="flex justify-between text-[14px]">
      <span className="text-primary-dark">{label}</span>
      <span
        className={twMerge(
          'text-primary-dark text-end flex items-center gap-2',
          valueClass,
        )}
      >
        {value}
        {flagUrl && (
          <img src={flagUrl} alt="flag" className="w-5 h-3 object-cover" />
        )}
      </span>
    </div>
  )
}

export default CountryRow
