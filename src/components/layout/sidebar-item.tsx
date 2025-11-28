import { Link, useLocation } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { SidebarItemType } from '@/types'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'

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

  const items: MenuProps['items'] = item?.children?.map((item, i) => {
    return {
      label: <Link to={item.path || '#'}>{t(item.label)}</Link>,
      key: i,
    }
  }) as MenuProps['items']

  if (item?.path) {
    const isActive = pathname === item.path

    return (
      <li>
        <Link
          to={item.path || '#'}
          className={twMerge(
            'flex items-center gap-2 rounded p-2 font-medium hover:bg-[#F8F8FA]',
            isSidebarOpen ? '' : 'justify-center',
            isActive ? 'bg-[#F8F8FA]' : '',
          )}
        >
          {item?.icon && (
            <item.icon
              className={twMerge(
                'text-2xl',
                isActive ? 'text-primary-dark' : 'text-[#69757A]',
              )}
            />
          )}
          {isSidebarOpen && (
            <span
              className={twMerge(
                'line-clamp-1 flex flex-1 items-center justify-between',
                isActive ? 'text-primary-dark' : 'text-[#69757A]',
              )}
            >
              {t(item.label)}
            </span>
          )}
        </Link>
      </li>
    )
  }
  const isActive = pathname.includes('billing')

  return (
    <li className="flex flex-col gap-2">
      {isSidebarOpen ? (
        <button
          onClick={onHandleChildren}
          className={twMerge(
            'flex w-full items-center gap-2 rounded p-2 font-medium hover:bg-[#F8F8FA]',
            isSidebarOpen ? 'justify-between' : 'justify-center',
            isActive ? 'bg-[#F8F8FA]' : '',
          )}
        >
          {item?.icon && (
            <item.icon
              className={twMerge(
                'text-2xl',
                isActive ? 'text-primary-dark' : 'text-[#69757A]',
              )}
            />
          )}
          {isSidebarOpen && (
            <span
              className={twMerge(
                'line-clamp-1 flex flex-1 items-center justify-between',
                isActive ? 'text-primary-dark' : 'text-[#69757A]',
              )}
            >
              {t(item.label)}
            </span>
          )}

          {isSidebarOpen && (
            <div className={isChildrenOpen ? 'rotate-180' : ''}>
              <DownOutlined />
            </div>
          )}
        </button>
      ) : (
        <Dropdown menu={{ items }} trigger={['click']}>
          <button
            onClick={onHandleChildren}
            className={twMerge(
              'flex w-full items-center gap-2 rounded p-2 font-medium hover:bg-[#F8F8FA]',
              isSidebarOpen ? 'justify-between' : 'justify-center',
              isActive ? 'bg-[#F8F8FA]' : '',
            )}
          >
            {item?.icon && (
              <item.icon
                className={twMerge(
                  'text-2xl',
                  isActive ? 'text-primary-dark' : 'text-[#69757A]',
                )}
              />
            )}
            {isSidebarOpen && (
              <span
                className={twMerge(
                  'line-clamp-1 flex flex-1 items-center justify-between',
                  isActive ? 'text-primary-dark' : 'text-[#69757A]',
                )}
              >
                {t(item.label)}
              </span>
            )}

            {isSidebarOpen && (
              <div className={isChildrenOpen ? 'rotate-180' : ''}>
                <DownOutlined />
              </div>
            )}
          </button>
        </Dropdown>
      )}

      {isChildrenOpen && isSidebarOpen && (
        <div className="relative">
          <div className="absolute left-2.5 top-2 h-[calc(100%-16px)] w-0.5 bg-border" />
          <ul className="ml-5 space-y-2">
            {item?.children?.map(childItem => {
              const isActive = pathname === childItem.path

              return (
                <li>
                  <Link
                    to={childItem.path || '#'}
                    className={twMerge(
                      'flex items-center gap-2 rounded p-2 font-medium hover:bg-[#F8F8FA]',
                      isSidebarOpen ? '' : 'justify-center',
                      isActive ? 'bg-[#F8F8FA]' : '',
                    )}
                  >
                    {isSidebarOpen && (
                      <span
                        className={twMerge(
                          'line-clamp-1 flex flex-1 items-center justify-between',
                          isActive ? 'text-primary-dark' : 'text-[#69757A]',
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
