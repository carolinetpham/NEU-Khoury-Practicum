'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Menu, X} from 'lucide-react'

import {cn} from '@/lib/utils'

const navItems = [
  {label: 'About', href: '/about'},
  {label: 'Projects', href: '/projects'},
  {label: 'Students', href: '/students'},
  {label: 'Clients', href: '/clients'},
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<{
    from: string
    to: string
  } | null>(null)
  const displayedPath =
    pendingNavigation?.from === pathname ? pendingNavigation.to : pathname

  return (
    <header className="sticky top-0 z-50 bg-brand-white/70 shadow-[0_8px_30px_rgba(34,33,33,0.06)] backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          onNavigate={() => setPendingNavigation({from: pathname, to: '/'})}
          className="group flex items-center gap-2 py-1.5"
        >
          <span className="text-[15px] font-semibold leading-none tracking-tight text-brand-black transition-opacity duration-100 group-hover:opacity-65">
            Software Practicum
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 rounded-full border border-brand-black/10 bg-brand-white/82 p-1 shadow-sm backdrop-blur-md md:flex">
          {navItems.map((item) => {
            const active =
              displayedPath === item.href ||
              displayedPath.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                onNavigate={() =>
                  setPendingNavigation({from: pathname, to: item.href})
                }
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150',
                  'focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-red',
                  active
                    ? 'bg-brand-black text-brand-white'
                    : 'text-brand-black/55 hover:bg-brand-black/5 hover:text-brand-black',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-black/10 bg-brand-white-soft/90 text-brand-black md:hidden"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          'grid overflow-hidden border-t border-brand-black/10 bg-brand-white transition-[grid-template-rows] duration-200 ease-out md:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-6">
            {navItems.map((item) => {
              const active =
                displayedPath === item.href ||
                displayedPath.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onNavigate={() => {
                    setPendingNavigation({from: pathname, to: item.href})
                    setOpen(false)
                  }}
                  className={cn(
                    'rounded-lg px-3 py-3 text-base font-medium transition-colors',
                    active
                      ? 'text-brand-black'
                      : 'text-brand-black/60 hover:text-brand-black',
                  )}
                >
                  <span className="flex items-center">
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />}
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
