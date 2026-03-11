import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

<<<<<<< HEAD
=======
import { colors } from '@/config/colors'

>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
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
<<<<<<< HEAD
      <ol className="flex items-center gap-1">
        {items?.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li
              key={index}
              className="flex items-center gap-1"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item?.href ? (
                <Link
                  to={item.href}
                  itemProp="item"
                  className={`rounded-md px-2 py-1 text-[13px] font-medium leading-none transition-all duration-150 ${
                    isLast
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-white/5 dark:hover:text-slate-300'
                  } `}
                >
                  <span itemProp="name">
                    {item.noTranslate ? item.title : item.title || ''}
                  </span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  className="rounded-md bg-indigo-50 px-2 py-1 text-[13px] font-semibold leading-none text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                >
                  {item.noTranslate ? item.title : item.title || ''}
                </span>
              )}

              {!isLast && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="flex-shrink-0 text-slate-300 dark:text-slate-600"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <meta itemProp="position" content={String(index + 1)} />
              {item.href ? <meta itemProp="item" content={item.href} /> : null}
            </li>
          )
        })}
=======
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
>>>>>>> 604b09de6d53a6999377a4fdac73ef1255d1e972
      </ol>
    </nav>
  )
}

export default Breadcrumbs
