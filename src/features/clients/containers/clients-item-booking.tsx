import ClientsItemHotelCard from '../components/clients-item-hotel-card'

const ClientsItemBooking = ({ bookings }: { bookings: any }) => {
  return (
    <div className="flex flex-col gap-4">
      {bookings?.results.map((item: any, i: number) => (
        <ClientsItemHotelCard items={item} key={'clients-item-' + i} />
      ))}
    </div>
  )
}

export default ClientsItemBooking
