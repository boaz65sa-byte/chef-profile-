import { useContent } from '../context/ContentContext'

export default function Hero() {
  const { content, t } = useContent()
  const { title, subtitle, cta, backgroundUrl } = content.hero

  const titleLines = title.split('\n')

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={backgroundUrl}
          alt="Chef at work"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Gold accent line */}
      <div className="absolute start-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold to-transparent hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-24 lg:pb-32">
        <div className="max-w-3xl">
          <p className="section-label mb-6">
            {/* Keep section label consistent — doesn't change with lang as it's decorative */}
            Executive Culinary Consulting
          </p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-8">
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-gold">{line}</span> : line}
              </span>
            ))}
          </h1>

          <div className="gold-divider" />

          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#services" className="btn-gold">
              {cta}
            </a>
            <a href="#contact" className="btn-azure">
              {t.hero.secondCta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs tracking-widest uppercase">{t.hero.scrollLabel}</span>
        <div className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
