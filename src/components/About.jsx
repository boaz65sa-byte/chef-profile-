import { useContent } from '../context/ContentContext'

export default function About() {
  const { content, t } = useContent()
  const { title, body, imageUrl, quote } = content.about

  return (
    <section id="about" className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <img
                src={imageUrl}
                alt="Chef Boaz Saada"
                className="w-full h-[560px] object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-gold/30 pointer-events-none" />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 start-8 bg-black border border-gold/40 px-8 py-5">
              <p className="font-serif text-4xl text-gold leading-none">20+</p>
              <p className="text-gray-400 text-xs tracking-widest uppercase mt-1">{t.about.yearsLabel}</p>
            </div>
          </div>

          {/* Text */}
          <div className="lg:ps-8">
            <p className="section-label">{t.about.label}</p>
            <h2 className="section-title mb-4">{title}</h2>
            <div className="gold-divider" />

            <p className="text-gray-300 text-base leading-relaxed mb-8 font-light">{body}</p>

            {quote && (
              <blockquote className="border-s-2 border-gold ps-6 my-8">
                <p className="font-serif text-xl text-gold italic leading-snug">{quote}</p>
              </blockquote>
            )}

            {/* Credentials strip */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-gray-800">
              {t.about.credentials.map((item) => (
                <div key={item.label}>
                  <p className="text-gold text-xs tracking-widest uppercase font-semibold mb-1">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
