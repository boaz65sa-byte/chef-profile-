import { useState } from 'react'
import { useContent } from '../context/ContentContext'

export default function Gallery() {
  const { content } = useContent()
  const { title, subtitle } = content.gallery
  const images = JSON.parse(content.gallery.images)
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label">{subtitle}</p>
          <h2 className="section-title mb-4">{title}</h2>
          <div className="gold-divider mx-auto" />
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={`relative overflow-hidden cursor-pointer group ${
                idx === 0 || idx === 3 ? 'md:row-span-2' : ''
              }`}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.url}
                alt={img.caption}
                className={`w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                  idx === 0 || idx === 3 ? 'h-[400px] md:h-full' : 'h-[200px] md:h-[240px]'
                }`}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  {img.caption}
                </p>
              </div>
              {/* Gold corner accent */}
              <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-gold/0 group-hover:border-gold/80 transition-all duration-300" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-gold/0 group-hover:border-gold/80 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-gray-400 hover:text-gold text-sm tracking-widest uppercase transition-colors"
            >
              Close ✕
            </button>
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              className="w-full max-h-[80vh] object-contain"
            />
            <p className="text-center text-gray-400 text-sm mt-4 tracking-widest uppercase">
              {lightbox.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
