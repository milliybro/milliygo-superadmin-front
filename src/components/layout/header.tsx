import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useBreadCrumbsStore from '@/store/use-breadcrumbs-store'
import Breadcrumbs from '../ui/breadcrumbs'
import ProfilePopover from '../shared/profile-popover'
import dayjs from 'dayjs'
import 'dayjs/locale/uz'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/ru'
import queryClient from '@/utils/query-client'

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const Header = () => {
  const { i18n } = useTranslation()
  const { breadCrumbs } = useBreadCrumbsStore(store => store)
  const searchRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const [pulseKey, setPulseKey] = useState(0)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isHotkey = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'
      const t = e.target as HTMLElement | null
      const tag = t?.tagName?.toLowerCase()
      const isTyping =
        tag === 'input' || tag === 'textarea' || t?.isContentEditable

      if (isTyping && !isHotkey) return

      if (isHotkey) {
        e.preventDefault()
        setPulseKey(k => k + 1)
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        searchRef.current?.blur()
        setValue('')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const lang =
      i18n.language === 'uz'
        ? 'uz'
        : i18n.language === 'oz'
          ? 'uz-latn'
          : i18n.language
    dayjs.locale(lang)
  }, [i18n.language])

  const fmtTime = (d:any) =>
    d.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

  return (
    <>
      <style>{`
        @keyframes search-pulse {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.06); opacity: 0; }
        }
      `}</style>

      <header
        id="main-header"
        className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-black/[0.07] bg-white/85 px-7 py-1 backdrop-blur-md dark:border-white/[0.07] dark:bg-dark-bg/85"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      >
        <Breadcrumbs items={breadCrumbs} className="m-0 w-auto" />

        {/* Search */}
        <div className="relative">
          {/* Gradient glow border */}
          <div
            className="pointer-events-none absolute -inset-[1.5px] rounded-[13px] transition-opacity duration-300"
            style={{
              background:
                'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
              opacity: focused ? 1 : 0,
            }}
          />

          {/* Pulse ring on Ctrl+K */}
          {pulseKey > 0 && (
            <div
              key={pulseKey}
              className="pointer-events-none absolute -inset-[1.5px] rounded-[13px] border border-indigo-400"
              style={{
                animation:
                  'search-pulse 0.55s cubic-bezier(0.2,0.8,0.4,1) forwards',
              }}
            />
          )}

          {/* Input box */}
          <div
            className="relative flex items-center gap-[9px] rounded-[11.5px] bg-white px-3.5 dark:bg-dark-bg"
            style={{
              height: 40,
              minWidth: 440,
              boxShadow: focused
                ? '0 6px 24px rgba(99,102,241,0.14)'
                : '0 1px 4px rgba(0,0,0,0.07), inset 0 0 0 1px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.25s ease',
            }}
          >
            {/* Search icon */}
            <span
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                color: focused ? '#6366f1' : '#9ca3af',
                transform: focused ? 'scale(1.12)' : 'scale(1)',
                transition: 'color 0.2s, transform 0.2s',
              }}
            >
              <SearchIcon />
            </span>

            {/* Input */}
            <input
              ref={searchRef}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Qidiruv..."
              className="placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-600"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 13.5,
                letterSpacing: '-0.01em',
                fontFamily: 'inherit',
                color: '#0f172a',
                caretColor: '#6366f1',
              }}
            />

            {/* Clear button */}
            {value && (
              <button
                onMouseDown={e => {
                  e.preventDefault()
                  setValue('')
                  searchRef.current?.focus()
                }}
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
              >
                <CloseIcon />
              </button>
            )}

            {/* Ctrl+K badge */}
            <div
              className="flex flex-shrink-0 items-center gap-1 transition-opacity duration-150"
              style={{
                opacity: focused ? 0 : 1,
                pointerEvents: focused ? 'none' : 'auto',
              }}
            >
              {['Ctrl', 'K'].map(k => (
                <kbd
                  key={k}
                  style={{
                    padding: '2px 6px',
                    borderRadius: 5,
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    fontSize: 10.5,
                    color: '#94a3b8',
                    lineHeight: 1.7,
                  }}
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
        <span
          style={{
            fontSize: 14,
            color: '#475569',
            fontFamily: 'monospace',
            letterSpacing: 1,
          }}
        >
          {fmtTime(time)}
        </span>
          <ProfilePopover />
        </div>
      </header>
    </>
  )
}

export default Header
