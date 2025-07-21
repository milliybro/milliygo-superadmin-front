import { useMemo } from 'react'

import { formatAmount } from '@/helpers/format-amount'
import StatisticsCard from '../components/statistics-card'

// import DoorIcon from '@/components/icons/door'
// import LoginIcon from '@/components/icons/login'
// import LogoutIcon from '@/components/icons/logout'
// import WrenchIcon from '@/components/icons/wrench'
// import PieChartIcon from '@/components/icons/pie-chart'
// import BedDoubleIcon from '@/components/icons/bed-double'

const staticItems = {
  room: {
    total: 320,
  },
  daily_room_stats: {
    available: 240,
    booked: 80,
  },
  guests: {
    today: 520,
    direction: 'up',
    change: 12,
    yesterday_date: '2025-07-15',
  },
  monthly_room_stats: {
    busy: 75,
    change: 5,
    direction: 'up',
    yesterday: '2025-07-15',
  },
  this_month_prices: {
    price: 125000000,
    change: -8,
    direction: 'down',
    last_month: '2025-06',
  },
  avg_checks: {
    price: 390000,
    change: 4,
    direction: 'up',
    last_month: '2025-06',
  },
  incomes: {
    price: 210000000,
    change: 7,
    direction: 'up',
    yesterday: '2025-07-15',
  },
  nights: {
    count: 2.6,
    change: 0.2,
    direction: 'up',
    last_month: '2025-06',
  },
}

const StatisticsList = () => {
  const formattedStats = useMemo(() => {
    return [
      {
        // icon: DoorIcon,
        title: 'total-room-numbers',
        value: staticItems.room.total,
      },
      {
        // icon: BedDoubleIcon,
        title: 'available-occupied-rooms',
        value: staticItems.daily_room_stats.available,
        out_of: staticItems.daily_room_stats?.booked,
      },
      {
        // icon: BedDoubleIcon,
        title: 'guests-in-rooms',
        value: staticItems.guests.today,
        direction: staticItems.guests.direction,
        change: staticItems.guests.change,
        yesterday_date: staticItems.guests.yesterday_date,
      },
      {
        // icon: LoginIcon,
        title: 'hotel-occupancy-monthly',
        value: staticItems.monthly_room_stats.busy,
        change: staticItems.monthly_room_stats.change,
        direction: staticItems.monthly_room_stats.direction,
        yesterday_date: staticItems.monthly_room_stats.yesterday,
        unit: '%',
      },
      {
        // icon: LogoutIcon,
        title: 'current-month-revenue',
        value: formatAmount(staticItems.this_month_prices.price),
        unit: 'UZS',
        change: staticItems.this_month_prices.change,
        direction: staticItems.this_month_prices.direction,
        last_month: staticItems.this_month_prices.last_month,
      },
      {
        // icon: WrenchIcon,
        title: 'average-receipt',
        value: formatAmount(staticItems.avg_checks.price),
        unit: 'UZS',
        change: staticItems.avg_checks.change,
        direction: staticItems.avg_checks.direction,
        last_month: staticItems.avg_checks.last_month,
      },
      {
        // icon: PieChartIcon,
        title: 'expected-revenue',
        value: formatAmount(staticItems.incomes.price),
        unit: 'UZS',
        change: staticItems.incomes.change,
        direction: staticItems.incomes.direction,
        yesterday: staticItems.incomes.yesterday,
      },
      {
        // icon: PieChartIcon,
        title: 'average-stay-nights',
        value: formatAmount(staticItems.nights.count),
        change: staticItems.nights.change,
        direction: staticItems.nights.direction,
        last_month: staticItems.nights.last_month,
      },
    ]
  }, [])

  return (
    <div className="grid grid-cols-4 gap-6 col-span-full">
      {formattedStats.map((val, i) => (
        <StatisticsCard key={`statistics-card-${i}`} {...(val as any)} />
      ))}
    </div>
  )
}

export default StatisticsList
