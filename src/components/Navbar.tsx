import React, { useEffect, useState } from 'react'

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Lock body scroll when drawer is open
    const original = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : original
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="w-full bg-white/60 backdrop-blur-md dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="text-xl font-semibold text-slate-900 dark:text-white">Ishmael A.</a>

            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Home</a>
              <a href="#about" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">About</a>
              <a href="#projects" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Projects</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Contact</a>
            </nav>

            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden sm:inline-block rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">Get in touch</a>

              <button
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer + overlay */}
      <div aria-hidden={!open} className={`${open ? 'pointer-events-auto' : 'pointer-events-none'} fixed inset-0 z-40`}> 
        <div
          onClick={() => setOpen(false)}
          className={`${open ? 'opacity-100' : 'opacity-0'} fixed inset-0 bg-black/40 transition-opacity`}
        />

        <aside
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 h-full w-72 transform bg-white dark:bg-slate-900 shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="text-lg font-medium text-slate-900 dark:text-white">Menu</div>
            <button onClick={() => setOpen(false)} className="p-2 rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <nav className="p-4 space-y-3">
            <a onClick={() => setOpen(false)} href="#home" className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Home</a>
            <a onClick={() => setOpen(false)} href="#about" className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">About</a>
            <a onClick={() => setOpen(false)} href="#projects" className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Projects</a>
            <a onClick={() => setOpen(false)} href="#contact" className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Contact</a>
            <a onClick={() => setOpen(false)} href="#contact" className="mt-2 inline-block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700">Get in touch</a>
          </nav>
        </aside>
      </div>
    </>
  )
}

export default Navbar
