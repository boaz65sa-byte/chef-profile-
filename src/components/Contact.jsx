import { useState } from 'react'
import { useContent } from '../context/ContentContext'

export default function Contact() {
  const { content, t } = useContent()
  const { title, subtitle, email, phone, location } = content.contact

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    // TODO: wire to Supabase Edge Function or email provider
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1200)
  }

  const contactItems = [
    {
      label: t.contact.email,
      value: email,
      href: `mailto:${email}`,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.74a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: t.contact.message,
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
    {
      label: 'Location',
      value: location,
      href: null,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left column */}
          <div className="lg:col-span-2">
            <p className="section-label">Contact</p>
            <h2 className="section-title mb-4">{title}</h2>
            <div className="gold-divider" />
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-10">{subtitle}</p>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 border border-gray-700 flex items-center justify-center text-gold flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs tracking-widest uppercase mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white text-sm hover:text-gold transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-500 text-xs tracking-widest uppercase mb-2">{t.contact.name}</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t.contact.namePlaceholder}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs tracking-widest uppercase mb-2">{t.contact.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs tracking-widest uppercase mb-2">{t.contact.subject}</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder={t.contact.subjectPlaceholder}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-xs tracking-widest uppercase mb-2">{t.contact.message}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={t.contact.messagePlaceholder}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex items-center gap-6 flex-wrap">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-azure disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t.contact.sending : t.contact.send}
                </button>

                {status === 'success' && (
                  <p className="text-gold text-sm">{t.contact.success}</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
