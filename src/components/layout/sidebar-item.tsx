import { Link, useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { SidebarItemType } from '@/types'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import ArrowDownIcon from '../icons/arrow-down'

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
    if (isChildActive) {
      setIsChildrenOpen(true)
    }
  }, [isChildActive])

  const items: MenuProps['items'] = item?.children?.map((child, i) => ({
    label: <Link to={child.path || '#'}>{t(child.label)}</Link>,
    key: i,
  })) as MenuProps['items']

  if (item?.path && !item.children) {
    return (
      <li>
        <Link
          to={item.path || '#'}
          className={twMerge(
            'flex items-center gap-2 rounded p-2 font-medium hover:bg-[#2563EB4D]',
            isSidebarOpen ? '' : 'justify-center',
            isActive ? 'bg-[#2563EB4D]' : '',
          )}
        >
          {item?.icon && (
            <item.icon
              className={twMerge(
                'text-2xl transition',
                isActive ? 'text-primary' : 'text-[#69757A]',
              )}
            />
          )}

          {isSidebarOpen && (
            <span
              className={twMerge(
                'line-clamp-1 flex flex-1 items-center',
                isActive ? 'text-white' : 'text-[#FFFFFF]',
              )}
            >
              {t(item.label)}
            </span>
          )}
        </Link>
      </li>
    )
  }

  return (
    <li className="flex flex-col gap-2">
      {isSidebarOpen ? (
        <button
          onClick={onHandleChildren}
          className={twMerge(
            'flex w-full items-center gap-2 rounded p-2 font-medium hover:bg-[#2563EB4D]',
            'justify-between',
            isParentActive ? 'bg-[#2563EB4D]' : '',
            isChildActive ? '' : '',
          )}
        >
          {item?.icon && (
            <item.icon
              className={twMerge(
                'text-2xl transition',
                isActive ? 'text-primary' : 'text-[#69757A]',
              )}
            />
          )}

          {isSidebarOpen && (
            <span
              className={twMerge(
                'line-clamp-1 flex flex-1 items-center',
                isActive ? 'text-primary-dark text-white' : 'text-[#69757A]',
              )}
            >
              {t(item.label)}
            </span>
          )}

          {isSidebarOpen && (
            <div className={isChildrenOpen ? 'rotate-180' : ''}>
              <ArrowDownIcon className="text-white" />
            </div>
          )}
        </button>
      ) : (
        <Dropdown menu={{ items }} trigger={['click']}>
          <button
            onClick={onHandleChildren}
            className={twMerge(
              'flex w-full items-center gap-2 rounded p-2 font-medium hover:bg-[#F8F8FA]',
              'justify-center',
              isActive ? '' : '',
            )}
          >
            {item?.icon && (
              <item.icon
                className={twMerge(
                  'text-2xl transition',
                  isActive ? 'text-primary' : 'text-[#69757A]',
                )}
              />
            )}
          </button>
        </Dropdown>
      )}

      {isChildrenOpen && isSidebarOpen && (
        <div className="relative">
          <div
            className={twMerge(
              'absolute left-2.5 top-0 h-[calc(100%-10px)] w-0.5 rounded',
              isChildActive ? 'bg-[#777E90]' : 'bg-border',
            )}
          />

          <ul className="ml-9 space-y-2">
            {item?.children?.map(childItem => {
              const childActive = pathname === childItem.path

              return (
                <li key={childItem.path} className="relative">
                  {childActive && (
                    <span className="absolute -left-[2px] top-1/2 h-[14px] w-[2px] -translate-y-1/2 rounded-bl rounded-tl bg-primary" />
                  )}
                  <Link
                    to={childItem.path || '#'}
                    className={twMerge(
                      'flex items-center gap-2 rounded p-2 font-medium hover:bg-[#2563EB4D]',
                      childActive ? 'bg-[#2563EB4D] text-white' : '',
                    )}
                  >
                    {isSidebarOpen && (
                      <span
                        className={twMerge(
                          'border-r-3 divide-x-3 line-clamp-1 flex flex-1 items-center border-[#777E90]',
                          childActive
                            ? 'text-primary-dark text-white'
                            : 'text-[#FFFFFF]',
                        )}
                      >
                        {t(childItem.label)}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </li>
  )
}

export default SidebarItem
