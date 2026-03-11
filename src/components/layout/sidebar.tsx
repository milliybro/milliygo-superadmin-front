import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ROUTE_PATHS } from '@/config/constants'
import getUserData from '@/utils/get-user-data'
import SidebarItem from './sidebar-item'

// ── Inline SVG icons (replaces old icon components) ──────────────
export const SidebarIcons = {
  Dashboard: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Orders: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
    </svg>
  ),
  Partners: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 0a3 3 0 0 1 0-6m5 16v-2a4 4 0 0 0-3-3.87" />
    </svg>
  ),
  Couriers: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
      <rect x="9" y="11" width="14" height="10" rx="2" />
      <circle cx="12" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
    </svg>
  ),
  Prices: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Payments: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h.01M10 15h4" />
    </svg>
  ),
  Support: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
    </svg>
  ),
  Promo: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  Analytics: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Regions: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z" />
    </svg>
  ),
  Notifications: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Settings: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  CollapseLeft: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
}

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const user = getUserData()

  const adminItems = [
    {
      label: 'Dashboard',
      icon: SidebarIcons.Dashboard,
      path: ROUTE_PATHS.MAIN,
      // children: [
      //   {
      //     label: 'statistics.tourist_infracstructure',
      //     path: '/statistics/infrastructure',
      //   },
      //   { label: 'statistics.tourism_company', path: '/statistics/company' },
      //   { label: 'statistics.inbound_tourism', path: '/statistics/inbound' },
      //   { label: 'statistics.outbound_tourism', path: '/statistics/outbound' },
      //   { label: 'statistics.umehmon-active', path: '/statistics/u-mehmon' },
      // ],
    },
    {
      label: 'Buyurtmalar',
      icon: SidebarIcons.Orders,
      path: ROUTE_PATHS.ORDERS,
    },
    {
      label: 'Hamkorlar',
      icon: SidebarIcons.Partners,
      path: ROUTE_PATHS.PARTNERS,
    },
    {
      label: 'Kuryerlar',
      icon: SidebarIcons.Couriers,
      path: ROUTE_PATHS.COURIERS,
    },
    {
      label: 'Narxlar',
      icon: SidebarIcons.Prices,
      path: ROUTE_PATHS.PRICES,
    },
    {
      label: "To'lovlar",
      icon: SidebarIcons.Payments,
      path: ROUTE_PATHS.PAYMENTS,
    },
    {
      label: "Qo'llab-quvvatlash",
      icon: SidebarIcons.Support,
      path: ROUTE_PATHS.SUPPORT,
    },
    {
      label: 'Promo',
      icon: SidebarIcons.Promo,
      path: ROUTE_PATHS.PROMO,
    },
    {
      label: 'Analitika',
      icon: SidebarIcons.Analytics,
      path: ROUTE_PATHS.ANALITICS,
    },
    {
      label: 'Hududlar',
      icon: SidebarIcons.Regions,
      path: ROUTE_PATHS.REGIONS,
    },
    {
      label: 'Bildirishnomalar',
      icon: SidebarIcons.Notifications,
      path: ROUTE_PATHS.NOTIFICATION,
    },
    {
      label: 'Sozlamalar',
      icon: SidebarIcons.Settings,
      path: ROUTE_PATHS.SETTINGS,
    },
  ]

  const sidebarItems =
    user?.username === 'statistics_admin'
      ? [
          {
            label: 'routes.statistics',
            icon: SidebarIcons.Analytics,
            path: ROUTE_PATHS.MAIN,
            children: [
              {
                label: 'statistics.tourist_infracstructure',
                path: '/statistics/infrastructure',
              },
              {
                label: 'statistics.tourism_company',
                path: '/statistics/company',
              },
              {
                label: 'statistics.inbound_tourism',
                path: '/statistics/inbound',
              },
              {
                label: 'statistics.outbound_tourism',
                path: '/statistics/outbound',
              },
              {
                label: 'statistics.umehmon-active',
                path: '/statistics/u-mehmon',
              },
            ],
          },
        ]
      : adminItems

  return (
    <aside
      className={twMerge(
        'flex h-screen flex-col border-r border-slate-100 bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-white/5 dark:bg-dark-bg',
        isSidebarOpen ? 'w-[220px] 2xl:w-[240px]' : 'w-[60px]',
      )}
      style={{ boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}
    >
      {/* ── Logo + Toggle ── */}
      <div
        className={twMerge(
          'flex items-center border-b border-slate-50 dark:border-white/5',
          isSidebarOpen
            ? 'justify-between px-3.5 py-4'
            : 'flex-col gap-2 px-0 py-4',
        )}
      >
        {isSidebarOpen ? (
          <div className="flex items-center gap-2.5">
            {/* Logo mark */}
            <div
              className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-[9px]"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-slate-800 dark:text-white">
              Admin Panel
            </span>
          </div>
        ) : (
          <div
            className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 2px 8px rgba(99,102,241,0.4)',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        )}

        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-slate-100 text-slate-400 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-slate-600 dark:border-white/10 dark:hover:bg-white/5"
          aria-label="Toggle Sidebar"
        >
          <span
            className="flex transition-transform duration-300"
            style={{ transform: isSidebarOpen ? 'none' : 'rotate(180deg)' }}
          >
            <SidebarIcons.CollapseLeft />
          </span>
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto">
        {isSidebarOpen && (
          <p className="px-3.5 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Navigatsiya
          </p>
        )}
        <ul
          className={twMerge(
            'flex flex-col gap-0.5',
            isSidebarOpen ? 'px-2 pb-3' : 'px-1.5 py-2',
          )}
        >
          {sidebarItems.map((item, i) => (
            <SidebarItem
              key={`sidebar-${i}`}
              item={item}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </ul>
      </nav>

      {/* ── User footer ── */}
      <div
        className={twMerge(
          'flex items-center border-t border-slate-50 dark:border-white/5',
          isSidebarOpen ? 'gap-2.5 px-3.5 py-3' : 'justify-center py-3',
        )}
      >
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[9px] text-[12px] font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            boxShadow: '0 2px 6px rgba(102,126,234,0.35)',
          }}
        >
          MA
        </div>
        {isSidebarOpen && (
          <div className="min-w-0">
            <p className="font-600 truncate text-[13px] leading-tight tracking-tight text-slate-800 dark:text-white">
              Muhammad Ali
            </p>
            <p className="text-[11px] text-slate-400">SuperAdmin</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
