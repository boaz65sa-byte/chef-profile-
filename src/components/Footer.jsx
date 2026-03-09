import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'

export default function Footer() {
  const { lang, t } = useContent()
  const year = new Date().getFullYear()

  const navLinks = [
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.gallery,  href: '#gallery' },
    { label: t.nav.contact,  href: '#contact' },
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <p className="font-serif text-lg text-white tracking-wider">
              {lang === 'he' ? (
                <>שף <span className="text-gold">בועז סעדה</span></>
              ) : (
                <>Chef <span className="text-gold">Boaz Saada</span></>
              )}
            </p>
            <p className="text-gray-600 text-xs tracking-widest uppercase mt-1">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <ul className="flex flex-wrap items-center gap-6">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-gray-500 hover:text-gold text-xs tracking-widest uppercase transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Copy + Admin */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-600 text-xs">
              &copy; {year} Boaz Saada. All rights reserved.
            </p>
            <Link
              to="/admin"
              className="text-gray-700 hover:text-gold text-xs tracking-widest uppercase transition-colors"
            >
              ⚙ Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
