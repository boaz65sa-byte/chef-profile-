import { createContext, useContext, useState, useEffect } from 'react'

// ─── English content ──────────────────────────────────────────────────────────
export const defaultContentEn = {
  hero: {
    title: 'Culinary Mastery,\nRefined to Perfection',
    subtitle: 'Executive chef with 20+ years shaping world-class kitchens across Israel and beyond.',
    cta: 'Explore Services',
    backgroundUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2070&q=80',
  },
  about: {
    title: 'A Legacy Forged in Fire',
    body: 'Chef Boaz Saada brings over two decades of elite culinary experience to every engagement. Formerly executive chef at the prestigious Roxon Hotel, Boaz has led kitchens from concept to five-star operation — crafting menus that honour both tradition and innovation. His expertise spans kosher and non-kosher cuisines, international hospitality standards, and Israeli gastronomic culture.',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80',
    quote: '"Food is the art of bringing people together."',
  },
  services: {
    title: 'Professional Services',
    subtitle: 'End-to-end culinary consulting for the hospitality industry',
    items: JSON.stringify([
      { id: 1, icon: '🏥', title: 'MoH Preparation', description: 'Comprehensive Ministry of Health compliance audits, documentation, and staff training to ensure your kitchen passes with distinction.' },
      { id: 2, icon: '🍽️', title: 'Kitchen Opening', description: 'Full turnkey kitchen launch — from spatial planning and workflow design to team recruitment, training, and opening-day execution.' },
      { id: 3, icon: '🔧', title: 'Equipment Purchasing', description: 'Expert procurement consulting: selecting, sourcing, and vetting commercial kitchen equipment for performance, durability, and budget.' },
      { id: 4, icon: '📜', title: 'Kosher & Non-Kosher Menus', description: 'Bespoke menu development for both kosher-certified and non-kosher venues — from seasonal tasting menus to large-scale banquet programmes.' },
    ]),
  },
  gallery: {
    title: 'Gallery',
    subtitle: 'A glimpse into the craft',
    images: JSON.stringify([
      { id: 1, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', caption: 'Fine Dining Plating' },
      { id: 2, url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', caption: 'Seasonal Ingredients' },
      { id: 3, url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80', caption: 'Artisan Dishes' },
      { id: 4, url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80', caption: 'Kitchen Craft' },
      { id: 5, url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', caption: 'Gourmet Presentation' },
      { id: 6, url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80', caption: 'Modern Cuisine' },
    ]),
  },
  contact: {
    title: 'Begin the Conversation',
    subtitle: 'Available for consulting engagements, kitchen openings, and exclusive events.',
    email: 'boaz@chefboazsaada.com',
    phone: '+972 50 000 0000',
    location: 'Tel Aviv, Israel',
  },
}

// ─── Hebrew content ───────────────────────────────────────────────────────────
export const defaultContentHe = {
  hero: {
    title: 'שליטה קולינרית,\nמושלמת עד לפרט',
    subtitle: 'שף ראשי עם ניסיון של 20+ שנה בעיצוב מטבחים ברמה עולמית ברחבי ישראל ומעבר לה.',
    cta: 'גלה שירותים',
    backgroundUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2070&q=80',
  },
  about: {
    title: 'מורשת שנוצקה באש',
    body: 'שף בועז סעדה מביא למעלה משני עשורים של ניסיון קולינרי עילי לכל פרויקט. לשעבר שף ראשי במלון רוקסון היוקרתי, בועז הוביל מטבחים מהרעיון ועד לפעולה ברמת חמישה כוכבים — ויצר תפריטים המכבדים הן את המסורת והן את החדשנות. מומחיותו משתרעת על מטבחים כשרים ולא כשרים, סטנדרטים בינלאומיים של אירוח ותרבות הגסטרונומיה הישראלית.',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80',
    quote: '"אוכל הוא האמנות של חיבור אנשים."',
  },
  services: {
    title: 'שירותים מקצועיים',
    subtitle: 'ייעוץ קולינרי מקצה לקצה לתעשיית האירוח',
    items: JSON.stringify([
      { id: 1, icon: '🏥', title: 'הכנה לרישיון משרד הבריאות', description: 'ביקורות ציות מקיפות למשרד הבריאות, תיעוד והכשרת צוות להבטחת עמידה בדרישות ברמה הגבוהה ביותר.' },
      { id: 2, icon: '🍽️', title: 'פתיחת מטבח', description: 'השקת מטבח מקצה לקצה — מתכנון מרחבי ועיצוב זרימת עבודה ועד גיוס צוות, הכשרה וביצוע יום הפתיחה.' },
      { id: 3, icon: '🔧', title: 'רכש ציוד', description: 'ייעוץ רכש מקצועי: בחירה, מקור ובדיקה של ציוד מטבח מסחרי לביצועים, עמידות ותקציב.' },
      { id: 4, icon: '📜', title: 'תפריטים כשרים ולא כשרים', description: 'פיתוח תפריטים ייחודיים למסעדות כשרות ולא כשרות — ממנות טעימה עונתיות ועד תוכניות בנקווטים בקנה מידה גדול.' },
    ]),
  },
  gallery: {
    title: 'גלריה',
    subtitle: 'הצצה אל המלאכה',
    images: JSON.stringify([
      { id: 1, url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', caption: 'הגשה עדינה' },
      { id: 2, url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', caption: 'מרכיבים עונתיים' },
      { id: 3, url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80', caption: 'מנות אמנותיות' },
      { id: 4, url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80', caption: 'מלאכת מטבח' },
      { id: 5, url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80', caption: 'הגשה גורמה' },
      { id: 6, url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80', caption: 'מטבח מודרני' },
    ]),
  },
  contact: {
    title: 'בואו נשוחח',
    subtitle: 'זמין לפרויקטי ייעוץ, פתיחת מטבחים ואירועים בלעדיים.',
    email: 'boaz@chefboazsaada.com',
    phone: '+972 50 000 0000',
    location: 'תל אביב, ישראל',
  },
}

// Keep backward-compat alias
export const defaultContent = defaultContentEn

// ─── UI label translations ────────────────────────────────────────────────────
export const uiLabels = {
  en: {
    nav: { about: 'About', services: 'Services', gallery: 'Gallery', contact: 'Contact', hire: 'Hire Me' },
    footer: { tagline: 'Culinary Excellence · Since 2000' },
    contact: { name: 'Name', email: 'Email', subject: 'Subject', message: 'Message', send: 'Send Message', sending: 'Sending…', success: '✓ Message sent successfully.', namePlaceholder: 'Your full name', subjectPlaceholder: 'How can I help you?', messagePlaceholder: 'Tell me about your project…' },
    about: { label: 'About the Chef', yearsLabel: 'Years of Excellence', credentials: [{ label: 'Former Hotel', value: 'Roxon Hotel' }, { label: 'Specialisation', value: 'Fine Dining & Consulting' }, { label: 'Certifications', value: 'Kosher & MoH Certified' }, { label: 'Region', value: 'Israel & International' }] },
    services: { cta: 'Discuss Your Project', ctaHint: 'Need a tailored solution? Let\'s talk.' },
    hero: { secondCta: 'Get in Touch', scrollLabel: 'Scroll' },
    admin: { viewSite: 'View Site ↗', logout: 'Logout', title: 'Content Editor', subtitle: 'Changes are applied live to the landing page.', save: 'Save Changes', saving: 'Saving…', saved: '✓ Saved', langToggle: 'Editing language:' },
  },
  he: {
    nav: { about: 'אודות', services: 'שירותים', gallery: 'גלריה', contact: 'צור קשר', hire: 'שכור אותי' },
    footer: { tagline: 'מצוינות קולינרית · מאז 2000' },
    contact: { name: 'שם', email: 'אימייל', subject: 'נושא', message: 'הודעה', send: 'שלח הודעה', sending: 'שולח…', success: '✓ ההודעה נשלחה בהצלחה.', namePlaceholder: 'שם מלא', subjectPlaceholder: 'כיצד אוכל לעזור לך?', messagePlaceholder: 'ספר לי על הפרויקט שלך…' },
    about: { label: 'אודות השף', yearsLabel: 'שנות מצוינות', credentials: [{ label: 'מלון לשעבר', value: 'מלון רוקסון' }, { label: 'התמחות', value: 'Fine Dining וייעוץ' }, { label: 'הסמכות', value: 'כשרות ומשרד הבריאות' }, { label: 'אזור', value: 'ישראל ובינלאומי' }] },
    services: { cta: 'דבר איתי על הפרויקט', ctaHint: 'זקוק לפתרון מותאם? בואו נדבר.' },
    hero: { secondCta: 'צור קשר', scrollLabel: 'גלול' },
    admin: { viewSite: 'צפה באתר ↗', logout: 'התנתק', title: 'עורך תוכן', subtitle: 'השינויים מיושמים מיידית על דף הנחיתה.', save: 'שמור שינויים', saving: 'שומר…', saved: '✓ נשמר', langToggle: 'שפת עריכה:' },
  },
}

const ContentContext = createContext(null)

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function ContentProvider({ children }) {
  const [lang, setLangState] = useState('en')
  const [contentEn, setContentEn] = useState(() => loadFromStorage('siteContentEn', defaultContentEn))
  const [contentHe, setContentHe] = useState(() => loadFromStorage('siteContentHe', defaultContentHe))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('siteContentEn', JSON.stringify(contentEn)) } catch {}
  }, [contentEn])

  useEffect(() => {
    try { localStorage.setItem('siteContentHe', JSON.stringify(contentHe)) } catch {}
  }, [contentHe])

  // Apply RTL / LTR to document
  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  function setLang(l) {
    setLangState(l)
  }

  const content = lang === 'he' ? contentHe : contentEn
  const t = uiLabels[lang]

  function updateSection(section, key, value, targetLang) {
    const l = targetLang || lang
    if (l === 'he') {
      setContentHe((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
    } else {
      setContentEn((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
    }
  }

  return (
    <ContentContext.Provider value={{ content, contentEn, contentHe, loading, lang, setLang, t, updateSection }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
