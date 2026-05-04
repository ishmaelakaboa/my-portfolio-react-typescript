import React, { useEffect, useState, useRef, useCallback } from 'react'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : original
    return () => { document.body.style.overflow = original }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    NAV_LINKS.forEach(({ href }) => {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const cleanup = setupObserver()
    return () => cleanup?.()
  }, [setupObserver])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out border-b ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/50 shadow-lg shadow-black/[0.04] dark:shadow-black/20'
            : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-transparent'
        }`}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a
              href="#home"
              className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Ishmael<span className="text-indigo-600 dark:text-indigo-400">.</span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const id = href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <a
                    key={href}
                    href={href}
                    className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 ease-out ${
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                      }`}
                    />
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-[0.5px] active:translate-y-0"
              >
                Get in touch
              </a>

              <button
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                <span className="sr-only">Open menu</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!open}
        className={`${open ? 'pointer-events-auto' : 'pointer-events-none'} fixed inset-0 z-50`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`${open ? 'opacity-100' : 'opacity-0'} fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300`}
        />

        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 h-full w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-700/50 p-4">
            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => {
              const id = href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`relative block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-[3px] before:rounded-full before:bg-indigo-600 dark:before:bg-indigo-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {label}
                </a>
              )
            })}

            <div className="pt-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Get in touch
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </>
  )
}

export default Navbar