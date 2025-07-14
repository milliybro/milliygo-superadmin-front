import { Divider } from 'antd'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

import { ROUTE_PATHS } from '@/config/constants'

import IdIcon from '../../icons/id'
import Hotel2Icon from '../../icons/hotel-2'
import ProjectLogo from '../../icons/project-logo'
import SidebarLeftIcon from '../../icons/sidebar-left'
import UserMultipleIcon from '../../icons/user-multiple'
import AccommodationsIcon from '../../icons/accommodations-icon'
import UserCircleIcon from '@/components/icons/user-circle'

const items = [
  {
    label: 'Мой профиль',
    icon: UserCircleIcon,
    path: ROUTE_PATHS.UPROFILE,
    // disabled: true,
  },
  {
    label: 'Мои лицензии',
    icon: UserMultipleIcon,
    path: ROUTE_PATHS.MYLICENSES,
  },
  {
    label: 'Мои контракты',
    icon: Hotel2Icon,
    path: ROUTE_PATHS.MYCONTRACTS,
  },
  {
    label: 'Контроль счетов-фактур',
    icon: AccommodationsIcon,
    path: ROUTE_PATHS.INVOICECONTROL,
  },
  {
    label: 'Уведомления',
    icon: IdIcon,
    path: ROUTE_PATHS.CLIENTS,
  },
]

const SupplierSidebar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { pathname } = useLocation()

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <aside
      className={twMerge(
        'bg-white dark:bg-dark-bg transition-all border-border border-r duration-300 ',
        isSidebarOpen ? 'w-[219px]' : 'w-14',
      )}
    >
      <div className="p-4 flex justify-between items-center">
        {isSidebarOpen ? <ProjectLogo /> : null}
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <SidebarLeftIcon className="text-[24px] text-[#B7BFD5]" />
        </button>
      </div>

      {isSidebarOpen ? null : <Divider className="m-0" />}

      <nav>
        <ul className={twMerge('space-y-2', isSidebarOpen ? 'p-3' : 'p-2')}>
          {items.map((val, i) => (
            <li key={`routes-${i}`}>
              <Link
                to={val.path || '#'}
                className={twMerge(
                  'flex items-center p-2 gap-2 hover:bg-[#F8F8FA] rounded',
                  isSidebarOpen ? '' : 'justify-center',
                  pathname.includes(val.path) ? 'bg-[#F8F8FA]' : '',
                )}
              >
                <val.icon className="text-primary-dark text-[24px]" />
                {isSidebarOpen ? (
                  <span
                    className={twMerge(
                      'flex-1 line-clamp-1',
                      pathname === val.path
                        ? 'text-primary-dark'
                        : 'text-[#69757A]',
                    )}
                  >
                    {t(val.label)}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default SupplierSidebar
