import { useState, useEffect } from 'react'
import { useContent } from '../context/ContentContext'

export default function Navbar() {
  const { lang, setLang, t } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.gallery,  href: '#gallery' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="font-serif text-xl text-white tracking-wider">
          {lang === 'he' ? (
            <>שף <span className="text-gold">בועז סעדה</span></>
          ) : (
            <>Chef <span className="text-gold">Boaz Saada</span></>
          )}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-gray-300 hover:text-gold text-sm tracking-widest uppercase transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
            className="flex items-center gap-1 border border-gray-700 hover:border-gold px-3 py-1.5 transition-colors duration-200"
            title={lang === 'en' ? 'Switch to Hebrew' : 'עבור לאנגלית'}
          >
            <span className={`text-xs font-semibold tracking-widest transition-colors ${lang === 'en' ? 'text-gold' : 'text-gray-500'}`}>EN</span>
            <span className="text-gray-700 mx-1">|</span>
            <span className={`text-xs font-semibold tracking-widest transition-colors ${lang === 'he' ? 'text-gold' : 'text-gray-500'}`}>HE</span>
          </button>
          <a href="#contact" className="btn-gold text-xs py-2 px-6">
            {t.nav.hire}
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile lang toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'he' : 'en')}
            className="text-gray-400 hover:text-gold text-xs font-bold tracking-widest transition-colors"
          >
            {lang === 'en' ? 'HE' : 'EN'}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-gray-300 hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/98 border-t border-gray-800 px-6 py-6 space-y-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 hover:text-gold text-sm tracking-widest uppercase transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-gold text-xs py-2 px-6 mt-2 inline-flex">
            {t.nav.hire}
          </a>
        </div>
      )}
    </nav>
  )
}
