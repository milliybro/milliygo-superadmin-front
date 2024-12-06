import ClientsItemHotelCard from '../components/clients-item-hotel-card'

const ClientsItemBooking = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((_, i) => (
        <ClientsItemHotelCard key={'clients-item-' + i} />
      ))}
    </div>
  )
}

export default ClientsItemBooking
