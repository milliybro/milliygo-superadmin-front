import { useMemo } from 'react'

import { formatAmount } from '@/helpers/format-amount'
import StatisticsCard from '../components/statistics-card'

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
        title: 'Всего пользователей',
        value: staticItems.room.total,
      },
      {
        // icon: BedDoubleIcon,
        title: 'Общее количество бронирований',
        value: staticItems.daily_room_stats.available,
        out_of: staticItems.daily_room_stats?.booked,
      },
      {
        // icon: BedDoubleIcon,
        title: 'Онлайн пользователи',
        value: staticItems.guests.today,
        direction: staticItems.guests.direction,
        change: staticItems.guests.change,
        yesterday_date: staticItems.guests.yesterday_date,
      },
      {
        // icon: LoginIcon,
        title: 'Общее количество отелей',
        value: staticItems.monthly_room_stats.busy,
        change: staticItems.monthly_room_stats.change,
        direction: staticItems.monthly_room_stats.direction,
        yesterday_date: staticItems.monthly_room_stats.yesterday,
        unit: '%',
      },
      {
        // icon: LogoutIcon,
        title: 'Загруженность',
        value: formatAmount(staticItems.this_month_prices.price),
        unit: 'UZS',
        change: staticItems.this_month_prices.change,
        direction: staticItems.this_month_prices.direction,
        last_month: staticItems.this_month_prices.last_month,
      },
      {
        // icon: WrenchIcon,
        title: 'Количество активных туристических агентств',
        value: formatAmount(staticItems.avg_checks.price),
        unit: 'UZS',
        change: staticItems.avg_checks.change,
        direction: staticItems.avg_checks.direction,
        last_month: staticItems.avg_checks.last_month,
      },
      {
        // icon: PieChartIcon,
        title: 'Общее количество организованных туров',
        value: formatAmount(staticItems.incomes.price),
        unit: 'UZS',
        change: staticItems.incomes.change,
        direction: staticItems.incomes.direction,
        yesterday: staticItems.incomes.yesterday,
      },
      {
        // icon: PieChartIcon,
        title: 'Средняя продолжительность проживания (в разрезе ночей)',
        value: formatAmount(staticItems.nights.count),
        change: staticItems.nights.change,
        direction: staticItems.nights.direction,
        last_month: staticItems.nights.last_month,
      },
    ]
  }, [])

  return (
    <>
      {formattedStats.map((val, i) => (
        <StatisticsCard key={`statistics-card-${i}`} {...(val as any)} />
      ))}
    </>
  )
}

export default StatisticsList
