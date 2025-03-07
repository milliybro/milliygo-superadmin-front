import ClientsItemHotelCard from '../components/clients-item-hotel-card'
import NotFoundIcon from '@/components/icons/not-found'
import { useTranslation } from 'react-i18next'

const ClientsItemBooking = ({ bookings }: { bookings: any }) => {
  const { t } = useTranslation()
  return (
    <div className="h-full flex flex-col gap-4">
      {bookings?.count === 0 ? (
        <div className="w-full h-full flex text-center flex-col justify-center items-center">
          <div className="flex w-full flex-col justify-center gap-3 items-center">
            <NotFoundIcon />
          </div>
          <span className="text-[26px] font-semibold text-primary-dark">
            {t('users-page.not-found')}
          </span>
          <span className="text-secondary">
            {t('users-page.not-found-desc')}
          </span>
        </div>
      ) : (
        bookings?.results.map((item: any, i: number) => (
          <ClientsItemHotelCard items={item} key={'clients-item-' + i} />
        ))
      )}
    </div>
  )
}

export default ClientsItemBooking
