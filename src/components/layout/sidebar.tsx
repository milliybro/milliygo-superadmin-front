import { Divider } from 'antd'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import IdIcon from '../icons/id'
import AlertIcon from '../icons/alert'
import Hotel2Icon from '../icons/hotel-2'
import ProjectLogo from '../icons/project-logo'
import ChartRingIcon from '../icons/chart-ring'
import SidebarLeftIcon from '../icons/sidebar-left'
import UserMultipleIcon from '../icons/user-multiple'
import TimeManagementIcon from '../icons/time-management'
import CustomerSupportIcon from '../icons/customer-support'
import ServicesIcon from '../icons/services-icon'
import AccommodationsIcon from '../icons/accommodations-icon'
import NodeEdit from '../icons/node-edit'
import FlagIcon from '../icons/flag-icon'
import UserCircleIcon from '../icons/user-circle'
import NotificationIcon from '../icons/notification'
import FileIcon from '../icons/file-icon'
import depositIcon from '../icons/deposit-icon'

const adminItems = [
  { label: 'common.statistics', icon: ChartRingIcon, path: ROUTE_PATHS.MAIN },
  { label: 'common.users', icon: UserMultipleIcon, path: ROUTE_PATHS.USERS },
  { label: 'common.hotels', icon: Hotel2Icon, path: ROUTE_PATHS.HOTELS },
  {
    label: 'common.accommodations',
    icon: AccommodationsIcon,
    path: ROUTE_PATHS.ACCOMMODATIONS,
  },
  { label: 'common.clients', icon: IdIcon, path: ROUTE_PATHS.CLIENTS },
  {
    label: 'common.access-role',
    icon: TimeManagementIcon,
    path: ROUTE_PATHS.ACCESS_ROLE,
  },
  { label: 'common.complaints', icon: AlertIcon, path: ROUTE_PATHS.COMPLAINTS },
  {
    label: 'common.call-center',
    icon: CustomerSupportIcon,
    path: ROUTE_PATHS.CALL_CENTER,
  },
  {
    label: 'common.facilities-and-services',
    icon: ServicesIcon,
    path: ROUTE_PATHS.SERVICES,
  },
  { label: 'common.tenants', icon: Hotel2Icon, path: ROUTE_PATHS.TENANTS },
  {
    label: 'common.main-content',
    icon: NodeEdit,
    path: ROUTE_PATHS.MAIN_CONTENT,
  },
  { label: 'guides.guides', icon: FlagIcon, path: ROUTE_PATHS.GUIDES },
]

const supplierItems = [
  { label: 'Мой профиль', icon: UserCircleIcon, path: ROUTE_PATHS.UPROFILE },
  {
    label: 'Мои лицензии',
    icon: depositIcon,
    path: ROUTE_PATHS.MYLICENSES,
  },
  { label: 'Мои контракты', icon: FileIcon, path: ROUTE_PATHS.MYCONTRACTS },
  {
    label: 'Контроль счетов-фактур',
    icon: AccommodationsIcon,
    path: ROUTE_PATHS.INVOICECONTROL,
  },
  { label: 'Уведомления', icon: NotificationIcon, path: ROUTE_PATHS.CLIENTS },
]

const Sidebar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { pathname } = useLocation()
  // const { role } = useAuthContext()
  const role = 'admin'

  const sidebarItems = adminItems

  console.log('role:', role)
  console.log('sidebarItems:', sidebarItems)

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <aside
      className={twMerge(
        'bg-white dark:bg-dark-bg transition-all border-border border-r duration-300',
        isSidebarOpen ? 'w-[219px]' : 'w-14',
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
            const isActive = pathname.includes(item.path)
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
                  <item.icon className="text-primary-dark text-[24px]" />
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
