import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

import { colors } from '@/config/colors'

import type { FC } from 'react'

interface IProps {
  items: { title: string | undefined; href?: string; noTranslate?: boolean }[]
  className?: string
}

const Breadcrumbs: FC<IProps> = ({ items, className }) => {
  return (
    <nav
      className={twMerge('dlg:hidden container', className)}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center text-sm text-gray-500">
        {items?.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-base"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {item?.href ? (
              <Link
                to={item.href}
                className={`text-[#4B5563] duration-200 hover:bg-secondary-light/20 hover:text-primary-dark ${
                  index === items.length - 1
                    ? 'font-medium text-primary-dark'
                    : ''
                }`}
                itemProp="item"
              >
                <span itemProp="name">
                  {item.noTranslate ? item?.title : item?.title || ''}
                </span>
              </Link>
            ) : (
              <span className="font-medium text-primary-dark" itemProp="name">
                {item.noTranslate ? item?.title : item?.title || ''}
              </span>
            )}

            {index < items.length - 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="mx-4"
              >
                <path
                  d="M6 12L9.29289 8.70711C9.62623 8.37377 9.79289 8.20711 9.79289 8C9.79289 7.79289 9.62623 7.62623 9.29289 7.29289L6 4"
                  stroke={colors.secondary}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}

            <meta itemProp="position" content={String(index + 1)} />
            {item.href ? <meta itemProp="item" content={item.href} /> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
