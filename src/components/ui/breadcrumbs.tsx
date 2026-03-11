import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'

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
      </ol>
    </nav>
  )
}

export default Breadcrumbs
