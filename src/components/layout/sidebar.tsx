import { Divider } from 'antd'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import Hotel2Icon from '../icons/hotel-2'
import ProjectLogo from '../icons/project-logo'
import ChartRingIcon from '../icons/chart-ring'
import SidebarLeftIcon from '../icons/sidebar-left'
import TimeManagementIcon from '../icons/time-management'
import UsersGroupIcon from '../icons/user-group-icon'
import HomeIcon from '../icons/home-icon'
import TipsIcon from '../icons/tips-icon'
import BeachIcon from '../icons/beach-icon'
import TeachingIcon from '../icons/teaching-icon'
import WalletIcon from '../icons/wallet-icon'
import AnalyticsIcon from '../icons/analytics-icon'
import MegaPhoneIcon from '../icons/megaphone-icon'

const adminItems = [
  { label: 'routes.statistics', icon: ChartRingIcon, path: ROUTE_PATHS.MAIN },
  {
    label: 'routes.placement-funds',
    icon: Hotel2Icon,
    path: ROUTE_PATHS.HOTELS,
  },
  { label: 'routes.tourists', icon: UsersGroupIcon, path: ROUTE_PATHS.USERS },
  { label: 'routes.landlords', icon: HomeIcon, path: ROUTE_PATHS.TENANTS },
  {
    label: 'routes.service-providers',
    icon: TipsIcon,
    path: ROUTE_PATHS.ACCOMMODATIONS,
  },
  {
    label: 'routes.travel-agencies',
    icon: BeachIcon,
    path: ROUTE_PATHS.TENANTS,
  },
  { label: 'routes.guides', icon: TeachingIcon, path: ROUTE_PATHS.GUIDES },
  { label: 'routes.billing', icon: WalletIcon, path: ROUTE_PATHS.GUIDES },
  { label: 'routes.bi-service', icon: AnalyticsIcon, path: ROUTE_PATHS.GUIDES },

  {
    label: 'routes.content',
    icon: MegaPhoneIcon,
    path: ROUTE_PATHS.HOTELS,
  },
  {
    label: 'routes.roles',
    icon: TimeManagementIcon,
    path: ROUTE_PATHS.ACCESS_ROLE,
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

const Sidebar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { pathname } = useLocation()

  const sidebarItems = adminItems

  console.log('sidebarItems:', sidebarItems)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <aside
      className={twMerge(
        'bg-white dark:bg-dark-bg transition-all border-border border-r duration-300',
        isSidebarOpen ? 'w-[260px]' : 'w-14',
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {isSidebarOpen && <ProjectLogo />}
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <SidebarLeftIcon className="text-[24px] text-[#B7BFD5]" />
        </button>
      </div>

      {!isSidebarOpen && <Divider className="m-0" />}

      <nav>
        <ul className={twMerge('space-y-2', isSidebarOpen ? 'p-3' : 'p-2')}>
          {sidebarItems.map((item, i) => {
            const isActive = pathname === item.path
            return (
              <li key={`routes-${i}`}>
                <Link
                  to={item.path || '#'}
                  className={twMerge(
                    'flex items-center p-2 gap-2 hover:bg-[#F8F8FA] rounded',
                    isSidebarOpen ? '' : 'justify-center',
                    isActive ? 'bg-[#F8F8FA]' : '',
                  )}
                >
                  <item.icon
                    className={twMerge(
                      'text-[24px]',
                      isActive ? 'text-primary-dark' : 'text-[#69757A]',
                    )}
                  />
                  {isSidebarOpen && (
                    <span
                      className={twMerge(
                        'flex-1 line-clamp-1',
                        isActive ? 'text-primary-dark' : 'text-[#69757A]',
                      )}
                    >
                      {t(item.label)}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
