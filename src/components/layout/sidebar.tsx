import { Divider } from 'antd'
import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Link, useLocation } from 'react-router'
// import { useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { ROUTE_PATHS } from '@/config/constants'

import ChartRingIcon from '../icons/chart-ring'
import Hotel2Icon from '../icons/hotel-2'
import ProjectLogo from '../icons/project-logo'
import SidebarLeftIcon from '../icons/sidebar-left'
import BeachIcon from '../icons/beach-icon'
import HomeIcon from '../icons/home-icon'
import TeachingIcon from '../icons/teaching-icon'
import TipsIcon from '../icons/tips-icon'
import UsersGroupIcon from '../icons/user-group-icon'
import WalletIcon from '../icons/wallet-icon'
import MegaPhoneIcon from '../icons/megaphone-icon'
import UserIcon from '../icons/user'
import useUserData from '@/hooks/use-user-data'
import SidebarItem from './sidebar-item'

const Sidebar = () => {
  // const { t } = useTranslation()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // const { pathname } = useLocation()
  const user = useUserData()

  const adminItems = [
    {
      label: 'routes.statistics',
      icon: ChartRingIcon,
      path: ROUTE_PATHS.MAIN,
      status: 'in progress',
      children: [
        {
          label: 'statistics.tourist_infracstructure',
          path: '/statistics/infrastructure',
        },
        {
          label: 'statistics.tourism_company',
        },
        {
          label: 'statistics.inbound_tourism',
        },
        {
          label: 'statistics.outbound_tourism',
        },
        {
          label: 'statistics.umehmon-active',
        },
      ],
    },
    {
      label: 'routes.placement-funds',
      icon: Hotel2Icon,
      path: ROUTE_PATHS.PLACEMENTS,
      status: 'in progress',
    },
    {
      label: 'routes.tourists',
      icon: UsersGroupIcon,
      path: ROUTE_PATHS.TOURISTS,
      status: 'finished',
    },
    {
      label: 'routes.landlords',
      icon: HomeIcon,
      path: ROUTE_PATHS.LANDLORDS,
      status: 'in progress',
    },
    {
      label: 'routes.service-providers',
      icon: TipsIcon,
      path: ROUTE_PATHS.SERVICE_PROVIDERS,
      status: 'in progress',
    },
    {
      label: 'routes.travel-agencies',
      icon: BeachIcon,
      path: ROUTE_PATHS.TRAVEL_AGENCIES,
      status: 'finished',
    },
    {
      label: 'routes.guides',
      icon: TeachingIcon,
      path: ROUTE_PATHS.GUIDES,
      status: 'finished',
    },
 {
    label: 'routes.billing',
    icon: WalletIcon,
    status: 'in progress',
    children: [
      {
        label: 'routes.reports',
        path: ROUTE_PATHS.BILLING_REPORTS,
        status: 'in progress',
      },
      {
        label: 'routes.directories',
        path: ROUTE_PATHS.BILLING_DIRECTORIES,
        status: 'in progress',
      },
      {
        label: 'routes.transactions',
        path: ROUTE_PATHS.BILLING_TRANSACTIONS,
        status: 'in progress',
      },
      {
        label: 'routes.integration',
        path: ROUTE_PATHS.BILLING_INTEGRATION,
        status: 'in progress',
      },
      {
        label: 'routes.registers',
        path: ROUTE_PATHS.BILLING_REGISTERS,
        status: 'in progress',
      },
      {
        label: 'routes.tourist-transactions',
        path: ROUTE_PATHS.BILLING_TOURIST_TRANSACTIONS,
        status: 'in progress',
      },
    ],
  },
    // {
    //   label: 'routes.bi-service',
    //   icon: AnalyticsIcon,
    //   path: ROUTE_PATHS.GUIDES,
    //   status: 'unstarted',
    // },

    {
      label: 'routes.content',
      icon: MegaPhoneIcon,
      path: ROUTE_PATHS.CONTENT,
      status: 'finished',
    },
    // {
    //   label: 'common.tenants',
    //   icon: MegaPhoneIcon,
    //   path: ROUTE_PATHS.TENANTS,
    //   status: 'in progress',
    // },
    // {
    //   label: 'routes.roles',
    //   icon: TimeManagementIcon,
    //   path: ROUTE_PATHS.ACCESS_ROLE,
    //   status: 'unstarted',
    // },
    {
      label: 'common.users',
      icon: UserIcon,
      path: ROUTE_PATHS.USERS,
      status: 'finished',
    },
    {
      label: 'common.action-history',
      icon: MegaPhoneIcon,
      path: ROUTE_PATHS.ACTION_HISTORY,
      status: 'finished',
    },
    // { label: 'common.clients', icon: IdIcon, path: ROUTE_PATHS.CLIENTS },
    // { label: 'common.complaints', icon: AlertIcon, path: ROUTE_PATHS.COMPLAINTS },
    // {
    //   label: 'common.call-center',
    //   icon: CustomerSupportIcon,
    //   path: ROUTE_PATHS.CALL_CENTER,
    // },
    // {
    //   label: 'common.facilities-and-services',
    //   icon: ServicesIcon,
    //   path: ROUTE_PATHS.SERVICES,
    // },
    // {
    //   label: 'common.main-content',
    //   icon: NodeEdit,
    //   path: ROUTE_PATHS.MAIN_CONTENT,
    // },
  ]
  const sidebarItems =
    user?.username === 'statistics_admin'
      ? [
          {
            label: 'routes.statistics',
            icon: ChartRingIcon,
            path: ROUTE_PATHS.MAIN,
            status: 'in progress',
          },
        ]
      : adminItems


  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }
  return (
    <aside
      className={twMerge(
        'flex h-screen flex-col border-r border-border bg-[#232E40] transition-all duration-300 dark:bg-dark-bg',
        isSidebarOpen ? 'w-[200px] 2xl:w-[230px]' : 'w-14',
      )}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#232E40] p-4">
        {isSidebarOpen && <ProjectLogo />}
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <SidebarLeftIcon className="text-2xl text-[#B7BFD5]" />
        </button>
      </div>

      {!isSidebarOpen && <Divider className="m-0" />}

      <nav className="flex-1 overflow-y-auto">
        <ul className={twMerge('space-y-2', isSidebarOpen ? 'p-3' : 'p-2')}>
          {sidebarItems.map((item, i) => {
            // const isActive = pathname === item.path
            // console.log({ isActive, pathname, p: item.path })

            return (
              <SidebarItem
                key={`routes-${i}`}
                item={item}
                isSidebarOpen={isSidebarOpen}
              />
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
