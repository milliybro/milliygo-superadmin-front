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
    <div className="flex justify-between text-sm">
      <span className="text-primary-dark">{label}</span>
      <span
        className={twMerge(
          'flex items-center gap-2 text-end text-primary-dark',
          valueClass,
        )}
      >
        {value}
        {flagUrl && (
          <img src={flagUrl} alt="flag" className="h-3 w-5 object-cover" />
        )}
      </span>
    </div>
  )
}

export default CountryRow
