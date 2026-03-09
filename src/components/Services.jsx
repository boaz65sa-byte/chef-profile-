import { useContent } from '../context/ContentContext'

export default function Services() {
  const { content, t } = useContent()
  const { title, subtitle } = content.services
  const items = JSON.parse(content.services.items)

  return (
    <section id="services" className="py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="section-label">What I Offer</p>
          <h2 className="section-title mb-4">{title}</h2>
          <div className="gold-divider" />
          <p className="text-gray-400 font-light">{subtitle}</p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
          {items.map((service, idx) => (
            <div
              key={service.id}
              className="bg-black p-10 group hover:bg-gray-900 transition-all duration-300 relative overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute top-6 end-8 font-serif text-7xl text-gray-900 group-hover:text-gray-800 transition-colors select-none">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                <span className="text-3xl mb-5 block">{service.icon}</span>
                <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <div className="w-8 h-px bg-gold mb-4 transition-all duration-300 group-hover:w-12" />
                <p className="text-gray-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-sm mb-6">{t.services.ctaHint}</p>
          <a href="#contact" className="btn-gold">
            {t.services.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
