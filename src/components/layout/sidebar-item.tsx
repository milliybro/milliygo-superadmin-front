import { Link, useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { SidebarItemType } from '@/types'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

type SidebarItemProps = {
  item: SidebarItemType
  isSidebarOpen: boolean
}

const SidebarItem = ({ item, isSidebarOpen }: SidebarItemProps) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [isChildrenOpen, setIsChildrenOpen] = useState(false)

  const onHandleChildren = useCallback(
    () => setIsChildrenOpen(prev => !prev),
    [],
  )

  const isParentActive = pathname === item.path
  const isChildActive = item.children?.some(child => pathname === child.path)
  const isActive = isParentActive || isChildActive

  useEffect(() => {
    if (isChildActive) setIsChildrenOpen(true)
  }, [isChildActive])

  const dropdownItems: MenuProps['items'] = item?.children?.map((child, i) => ({
    label: <Link to={child.path || '#'}>{t(child.label)}</Link>,
    key: i,
  })) as MenuProps['items']

  /* ── Shared item styles ── */
  const baseItemClass = twMerge(
    'group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left transition-all duration-150',
    'text-slate-500 hover:bg-indigo-50/60 hover:text-slate-700',
    'dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200',
    !isSidebarOpen && 'justify-center px-0',
  )

  const activeItemClass = twMerge(
    'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700',
    'dark:bg-indigo-500/10 dark:text-indigo-400',
  )

  const iconClass = (active: boolean) =>
    twMerge(
      'flex-shrink-0 transition-colors',
      active
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-slate-400 dark:text-slate-500',
    )

  /* ── Simple link ── */
  if (item?.path && !item.children) {
    return (
      <li>
        <Link
          to={item.path}
          className={twMerge(baseItemClass, isActive && activeItemClass)}
        >
          {/* Active indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500" />
          )}
          {item?.icon && (
            <span className={iconClass(isActive as any)}>
              <item.icon />
            </span>
          )}
          {isSidebarOpen && (
            <span className="line-clamp-1 flex-1 text-[13.5px] font-medium leading-none tracking-[-0.01em]">
              {t(item.label)}
            </span>
          )}
        </Link>
      </li>
    )
  }

  /* ── With children (open sidebar) ── */
  return (
    <li className="flex flex-col">
      {isSidebarOpen ? (
        <button
          onClick={onHandleChildren}
          className={twMerge(
            baseItemClass,
            'justify-between',
            isActive && !isChildrenOpen && activeItemClass,
          )}
        >
          <span className="flex items-center gap-2.5">
            {isActive && !isChildrenOpen && (
              <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500" />
            )}
            {item?.icon && (
              <span className={iconClass(isActive as any)}>
                <item.icon />
              </span>
            )}
            <span className="line-clamp-1 text-[13.5px] font-medium tracking-[-0.01em]">
              {t(item.label)}
            </span>
          </span>

          <span
            className={twMerge(
              'flex flex-shrink-0 text-slate-300 transition-transform duration-200',
              isChildrenOpen && 'rotate-180',
            )}
          >
            <ChevronDown />
          </span>
        </button>
      ) : (
        /* ── Collapsed: dropdown ── */
        <Dropdown
          menu={{ items: dropdownItems }}
          trigger={['click']}
          placement="topRight"
        >
          <button
            className={twMerge(baseItemClass, isActive && activeItemClass)}
          >
            {item?.icon && (
              <span className={iconClass(isActive as any)}>
                <item.icon />
              </span>
            )}
          </button>
        </Dropdown>
      )}

      {/* ── Children list ── */}
      {isChildrenOpen && isSidebarOpen && (
        <ul
          className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-slate-100 pl-3 dark:border-white/5"
          style={{ animation: 'sidebarChildIn 0.18s ease' }}
        >
          <style>{`
            @keyframes sidebarChildIn {
              from { opacity: 0; transform: translateY(-4px); }
              to   { opacity: 1; transform: none; }
            }
          `}</style>

          {item?.children?.map(childItem => {
            const childActive = pathname === childItem.path
            return (
              <li key={childItem.path}>
                <Link
                  to={childItem.path || '#'}
                  className={twMerge(
                    'flex items-center rounded-md px-2.5 py-[6px] text-[13px] transition-all duration-150',
                    'font-medium text-slate-400 hover:bg-indigo-50/60 hover:text-slate-600',
                    'dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-300',
                    childActive &&
                      'bg-indigo-50 font-semibold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
                  )}
                >
                  {childActive && (
                    <span className="mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                  )}
                  <span className="line-clamp-1 tracking-[-0.01em]">
                    {t(childItem.label)}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default SidebarItem
