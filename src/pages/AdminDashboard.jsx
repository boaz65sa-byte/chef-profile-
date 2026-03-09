import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../context/ContentContext'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { contentEn, contentHe, updateSection, lang: siteLang, setLang: setSiteLang, t } = useContent()

  const [activeTab, setActiveTab] = useState('hero')
  const [editLang, setEditLang] = useState('he') // which language is being edited
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const sourceContent = editLang === 'he' ? contentHe : contentEn
  const [draft, setDraft] = useState({
    en: JSON.parse(JSON.stringify(contentEn)),
    he: JSON.parse(JSON.stringify(contentHe)),
  })

  function handleDraftChange(section, key, value) {
    setDraft((prev) => ({
      ...prev,
      [editLang]: {
        ...prev[editLang],
        [section]: { ...prev[editLang][section], [key]: value },
      },
    }))
  }

  function handleServiceChange(idx, field, value) {
    const items = JSON.parse(draft[editLang].services.items)
    items[idx][field] = value
    handleDraftChange('services', 'items', JSON.stringify(items))
  }

  function handleGalleryChange(idx, field, value) {
    const images = JSON.parse(draft[editLang].gallery.images)
    images[idx][field] = value
    handleDraftChange('gallery', 'images', JSON.stringify(images))
  }

  async function handleSave() {
    setSaving(true)
    try {
      ;['en', 'he'].forEach((l) => {
        Object.entries(draft[l]).forEach(([section, fields]) => {
          Object.entries(fields).forEach(([key, value]) => {
            updateSection(section, key, value, l)
          })
        })
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setSaving(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_authenticated')
    navigate('/admin')
  }

  const tabs = [
    { id: 'hero',     label: 'Hero' },
    { id: 'about',   label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery',  label: 'Gallery' },
    { id: 'contact',  label: 'Contact' },
  ]

  const d = draft[editLang]
  const services = JSON.parse(d.services.items)
  const galleryImages = JSON.parse(d.gallery.images)
  const isRtl = editLang === 'he'

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="font-serif text-white">
              Chef <span className="text-gold">Boaz Saada</span>
            </p>
            <span className="text-gray-700">|</span>
            <p className="text-gray-500 text-xs tracking-widest uppercase">CMS Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Site language toggle */}
            <div className="flex items-center gap-2 border border-gray-800 px-3 py-1.5">
              <span className="text-gray-500 text-xs">Site:</span>
              <button onClick={() => setSiteLang('en')} className={`text-xs font-bold tracking-widest transition-colors ${siteLang === 'en' ? 'text-gold' : 'text-gray-600 hover:text-white'}`}>EN</button>
              <span className="text-gray-700">|</span>
              <button onClick={() => setSiteLang('he')} className={`text-xs font-bold tracking-widest transition-colors ${siteLang === 'he' ? 'text-gold' : 'text-gray-600 hover:text-white'}`}>HE</button>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gold text-xs tracking-widest uppercase transition-colors">View Site ↗</a>
            <button onClick={handleLogout} className="text-gray-500 hover:text-red-400 text-xs tracking-widest uppercase transition-colors">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Page title + controls */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-3xl text-white">Content Editor</h1>
            <p className="text-gray-500 text-sm mt-1">Changes are applied live to the landing page.</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Edit language toggle */}
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded px-4 py-2">
              <span className="text-gray-500 text-xs tracking-widest uppercase me-2">Editing:</span>
              <button
                onClick={() => setEditLang('en')}
                className={`px-3 py-1 text-xs font-bold tracking-widest rounded transition-colors ${editLang === 'en' ? 'bg-gold text-black' : 'text-gray-500 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setEditLang('he')}
                className={`px-3 py-1 text-xs font-bold tracking-widest rounded transition-colors ${editLang === 'he' ? 'bg-gold text-black' : 'text-gray-500 hover:text-white'}`}
              >
                עברית
              </button>
            </div>

            {saved && <span className="text-gold text-sm animate-pulse">✓ Saved</span>}
            <button onClick={handleSave} disabled={saving} className="btn-azure text-sm py-2 px-6 disabled:opacity-50">
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* RTL notice */}
        {isRtl && (
          <div className="mb-6 px-4 py-3 bg-gold/10 border border-gold/30 text-gold text-xs rounded flex items-center gap-2">
            <span>✦</span>
            <span>עורך עברית — הטקסט יוצג מימין לשמאל באתר</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id ? 'text-gold border-b-2 border-gold -mb-px' : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Hero ───────────────────────────────────────── */}
        {activeTab === 'hero' && (
          <AdminSection title="Hero Section">
            <AdminField label="Headline" hint={isRtl ? 'השתמש ב-\\n לשבירת שורה' : 'Use \\n for a line break'}>
              <textarea value={d.hero.title} onChange={(e) => handleDraftChange('hero', 'title', e.target.value)} rows={3} className={`admin-input resize-none ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="Sub-headline">
              <textarea value={d.hero.subtitle} onChange={(e) => handleDraftChange('hero', 'subtitle', e.target.value)} rows={3} className={`admin-input resize-none ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="CTA Button Text">
              <input value={d.hero.cta} onChange={(e) => handleDraftChange('hero', 'cta', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="Background Image URL">
              <input value={d.hero.backgroundUrl} onChange={(e) => handleDraftChange('hero', 'backgroundUrl', e.target.value)} className="admin-input font-mono text-xs" placeholder="https://..." dir="ltr" />
              <ImagePreview url={d.hero.backgroundUrl} />
            </AdminField>
          </AdminSection>
        )}

        {/* ── About ──────────────────────────────────────── */}
        {activeTab === 'about' && (
          <AdminSection title="About Section">
            <AdminField label="Section Title">
              <input value={d.about.title} onChange={(e) => handleDraftChange('about', 'title', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="Biography">
              <textarea value={d.about.body} onChange={(e) => handleDraftChange('about', 'body', e.target.value)} rows={6} className={`admin-input resize-none ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="Pull Quote">
              <input value={d.about.quote} onChange={(e) => handleDraftChange('about', 'quote', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="Chef Photo URL">
              <input value={d.about.imageUrl} onChange={(e) => handleDraftChange('about', 'imageUrl', e.target.value)} className="admin-input font-mono text-xs" placeholder="https://..." dir="ltr" />
              <ImagePreview url={d.about.imageUrl} className="w-40 h-52 object-cover object-top" />
            </AdminField>
          </AdminSection>
        )}

        {/* ── Services ───────────────────────────────────── */}
        {activeTab === 'services' && (
          <AdminSection title="Services Section">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <AdminField label="Section Title">
                <input value={d.services.title} onChange={(e) => handleDraftChange('services', 'title', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
              </AdminField>
              <AdminField label="Section Subtitle">
                <input value={d.services.subtitle} onChange={(e) => handleDraftChange('services', 'subtitle', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
              </AdminField>
            </div>
            <div className="space-y-6">
              {services.map((service, idx) => (
                <div key={service.id} className="bg-gray-900 border border-gray-800 rounded p-6">
                  <p className="text-gold text-xs tracking-widest uppercase font-semibold mb-4">Service {idx + 1}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <AdminField label="Icon (emoji)">
                      <input value={service.icon} onChange={(e) => handleServiceChange(idx, 'icon', e.target.value)} className="admin-input" />
                    </AdminField>
                    <AdminField label="Title">
                      <input value={service.title} onChange={(e) => handleServiceChange(idx, 'title', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
                    </AdminField>
                  </div>
                  <AdminField label="Description">
                    <textarea value={service.description} onChange={(e) => handleServiceChange(idx, 'description', e.target.value)} rows={3} className={`admin-input resize-none ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
                  </AdminField>
                </div>
              ))}
            </div>
          </AdminSection>
        )}

        {/* ── Gallery ────────────────────────────────────── */}
        {activeTab === 'gallery' && (
          <AdminSection title="Gallery Section">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <AdminField label="Section Title">
                <input value={d.gallery.title} onChange={(e) => handleDraftChange('gallery', 'title', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
              </AdminField>
              <AdminField label="Section Subtitle">
                <input value={d.gallery.subtitle} onChange={(e) => handleDraftChange('gallery', 'subtitle', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
              </AdminField>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={img.id} className="bg-gray-900 border border-gray-800 rounded p-5">
                  <p className="text-gold text-xs tracking-widest uppercase font-semibold mb-4">Image {idx + 1}</p>
                  <AdminField label="Caption">
                    <input value={img.caption} onChange={(e) => handleGalleryChange(idx, 'caption', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
                  </AdminField>
                  <AdminField label="Image URL">
                    <input value={img.url} onChange={(e) => handleGalleryChange(idx, 'url', e.target.value)} className="admin-input font-mono text-xs" placeholder="https://..." dir="ltr" />
                  </AdminField>
                  <ImagePreview url={img.url} className="w-full h-36 object-cover mt-3 rounded" />
                </div>
              ))}
            </div>
          </AdminSection>
        )}

        {/* ── Contact ────────────────────────────────────── */}
        {activeTab === 'contact' && (
          <AdminSection title="Contact Section">
            <AdminField label="Section Title">
              <input value={d.contact.title} onChange={(e) => handleDraftChange('contact', 'title', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <AdminField label="Subtitle / Description">
              <textarea value={d.contact.subtitle} onChange={(e) => handleDraftChange('contact', 'subtitle', e.target.value)} rows={3} className={`admin-input resize-none ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
            </AdminField>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AdminField label="Email Address">
                <input type="email" value={d.contact.email} onChange={(e) => handleDraftChange('contact', 'email', e.target.value)} className="admin-input" dir="ltr" />
              </AdminField>
              <AdminField label="Phone Number">
                <input value={d.contact.phone} onChange={(e) => handleDraftChange('contact', 'phone', e.target.value)} className="admin-input" dir="ltr" />
              </AdminField>
              <AdminField label="Location">
                <input value={d.contact.location} onChange={(e) => handleDraftChange('contact', 'location', e.target.value)} className={`admin-input ${isRtl ? 'text-right' : ''}`} dir={isRtl ? 'rtl' : 'ltr'} />
              </AdminField>
            </div>
          </AdminSection>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AdminSection({ title, children }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-serif text-2xl text-white">{title}</h2>
        <div className="flex-1 h-px bg-gray-800" />
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function AdminField({ label, hint, children }) {
  return (
    <div>
      <label className="admin-label">
        {label}
        {hint && <span className="ml-2 text-gray-600 normal-case tracking-normal font-normal">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

function ImagePreview({ url, className = 'w-full h-40 object-cover mt-3 rounded' }) {
  const [error, setError] = useState(false)

  if (!url || error) {
    return (
      <div className={`${className} mt-3 bg-gray-800 flex items-center justify-center`}>
        <p className="text-gray-600 text-xs">No preview</p>
      </div>
    )
  }

  return (
    <img src={url} alt="Preview" onError={() => setError(true)} className={`${className} mt-3`} />
  )
}
