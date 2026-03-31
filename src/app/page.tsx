'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || ''
  const FALLBACK_EMAIL = 'waitlist@zipayo.de'

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !email.includes('@')) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      return
    }

    setIsSubmitting(true)

    // If Formspree ID is configured, use it
    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'zipayo-landing-waitlist' })
        })
        if (res.ok) {
          setIsSubmitted(true)
          setEmail('')
        } else {
          setError('Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.')
        }
      } catch {
        setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
      }
    } else {
      // Fallback: open mailto link
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=Zipayo Waitlist&body=Bitte fügen Sie mich zur Zipayo Waitlist hinzu: ${encodeURIComponent(email)}`
      setIsSubmitted(true)
      setEmail('')
    }

    setIsSubmitting(false)
  }
  return (
    <div className="bg-surface-bright font-body text-on-surface">

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-emerald-600 font-headline tracking-tight">Zipayo</div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-emerald-600 border-b-2 border-emerald-500 pb-1 font-semibold tracking-tight" href="#">Features</a>
            <a className="text-slate-600 hover:text-emerald-500 transition-colors font-semibold tracking-tight" href="#">Pricing</a>
            <a className="text-slate-600 hover:text-emerald-500 transition-colors font-semibold tracking-tight" href="#">Login</a>
            <button className="bg-primary hover:opacity-90 text-on-primary px-6 py-2 rounded-full font-bold text-sm tracking-wide">Start Now</button>
          </div>
          <button className="md:hidden text-on-surface"><span className="material-symbols-outlined">menu</span></button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-on-surface font-headline leading-[1.1] tracking-tighter mb-6">
              Bezahlen so einfach <br className="hidden md:block"/>wie ein <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Tipp</span>.
            </h1>
            <p className="text-xl text-secondary mb-10 max-w-lg leading-relaxed">Akzeptieren Sie bargeldlose Zahlungen in Sekunden – ganz ohne teure Hardware. Die smarte Lösung für moderne Unternehmen.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">Jetzt kostenlos starten</button>
              <button className="border border-outline-variant/30 text-on-surface px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-container-low transition-all">Mehr erfahren</button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-fixed-dim/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-surface-container-lowest p-4 rounded-[2rem] editorial-shadow lg:rotate-3 border border-outline-variant/10">
              <img className="rounded-[1.5rem] w-full h-auto object-cover aspect-[4/5]" src="/images/hero-phone.png" alt="Modern contactless payment — tap to pay"/>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight mb-4">Core Capabilities</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 bg-primary-fixed-dim/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">qr_code_2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">QR-Zahlung</h3>
              <p className="text-secondary leading-relaxed">Generieren Sie dynamische QR-Codes für blitzschnelle Transaktionen direkt am Point of Sale.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 bg-primary-fixed-dim/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">contactless</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Tap to Pay</h3>
              <p className="text-secondary leading-relaxed">Verwandeln Sie Ihr Smartphone in ein vollwertiges Kartenterminal ohne zusätzliche Hardware.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 bg-primary-fixed-dim/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">point_of_sale</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Terminal-Integration</h3>
              <p className="text-secondary leading-relaxed">Verknüpfen Sie bestehende Kassensysteme nahtlos mit der Zipayo Zahlungs-Plattform.</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 bg-primary-fixed-dim/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">api</span>
              </div>
              <h3 className="text-xl font-bold mb-3 font-headline">Plattform-Integration</h3>
              <p className="text-secondary leading-relaxed">Nutzen Sie unsere mächtige API für individuelle E-Commerce- und Shop-Lösungen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* So funktioniert's — Delayed Capture */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tight mb-4">So funktioniert's</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">Autorisierung beim Einchecken — Abbuchung erst nach dem Service. Perfekt für Dienstleister.</p>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mt-6"></div>
          </div>
          
          {/* 3-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-surface-container p-8 rounded-2xl border border-outline-variant/10 h-full">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary font-black text-xl mb-6">1</div>
                <h3 className="text-xl font-bold mb-3 font-headline">Check-in & Autorisierung</h3>
                <p className="text-secondary leading-relaxed">Ihr Kunde scannt den QR-Code oder tippt "Bezahlen". Der Betrag wird <strong>nur autorisiert</strong> — noch keine Abbuchung.</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-primary font-semibold">
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Betrag reserviert
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <span className="material-symbols-outlined text-3xl text-outline-variant">arrow_forward</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-surface-container p-8 rounded-2xl border border-outline-variant/10 h-full">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary font-black text-xl mb-6">2</div>
                <h3 className="text-xl font-bold mb-3 font-headline">Service erbringen</h3>
                <p className="text-secondary leading-relaxed">Führen Sie Ihre Dienstleistung in Ruhe durch. Ob Reparatur, Beratung oder Außendienst — der Kunde hat bereits "eingecheckt".</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-secondary font-semibold">
                  <span className="material-symbols-outlined text-lg">engineering</span>
                  Arbeit läuft...
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <span className="material-symbols-outlined text-3xl text-outline-variant">arrow_forward</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="bg-surface-container p-8 rounded-2xl border border-primary/30 h-full">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary font-black text-xl mb-6">3</div>
                <h3 className="text-xl font-bold mb-3 font-headline">Checkout & Abbuchung</h3>
                <p className="text-secondary leading-relaxed">Nach Abschluss lösen Sie die Zahlung aus. Der finale Betrag kann auch <strong>niedriger</strong> sein als autorisiert — flexibel für Kostenvoranschläge.</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-primary font-semibold">
                  <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  Bezahlt!
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits Box */}
          <div className="bg-inverse-surface text-inverse-on-surface p-8 md:p-12 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-black font-headline mb-4">Warum Delayed Capture?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-0.5">verified</span>
                    <span><strong>Vertrauen:</strong> Kunden zahlen erst nach erbrachter Leistung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-0.5">payments</span>
                    <span><strong>Flexibilität:</strong> Finaler Betrag anpassbar (Kostenvoranschlag → Endpreis)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-0.5">shield</span>
                    <span><strong>Weniger Disputes:</strong> Keine Rückbuchungen wegen "nicht erbrachter Leistung"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-0.5">timer</span>
                    <span><strong>7 Tage Zeit:</strong> Autorisierung bleibt bis zu 7 Tage gültig</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="bg-surface-container-lowest text-on-surface p-6 rounded-2xl max-w-xs text-center">
                  <div className="text-sm font-semibold text-primary tracking-wide uppercase mb-3">Ideal für</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="bg-primary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Handwerker</span>
                    <span className="bg-primary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Außendienst</span>
                    <span className="bg-primary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Werkstätten</span>
                    <span className="bg-primary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Hotels</span>
                    <span className="bg-primary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Events</span>
                    <span className="bg-primary-fixed-dim/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Beratung</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Zipayo? */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-8 leading-tight">Warum Zipayo?</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">speed</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Maximale Geschwindigkeit</h4>
                    <p className="text-secondary">Zahlungen werden in Echtzeit verarbeitet, damit Ihr Cashflow niemals ins Stocken gerät.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">PCI-Konforme Sicherheit</h4>
                    <p className="text-secondary">Höchste Sicherheitsstandards schützen jede einzelne Transaktion und die Daten Ihrer Kunden.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-highest rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">visibility</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Volle Transparenz</h4>
                    <p className="text-secondary">Keine versteckten Gebühren. Behalten Sie alle Umsätze über das Dashboard im Blick.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] editorial-shadow border border-outline-variant/10 text-center">
                <div className="mb-8">
                  <h5 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Zahlung Bestätigt</h5>
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-5xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    </div>
                  </div>
                  <div className="text-4xl font-black mb-2">€ 42,00</div>
                  <p className="text-secondary text-sm">Transaktions-ID: #ZIP-98234</p>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-center">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">qr_code_2</span>
                  <p className="text-xs font-medium text-on-surface-variant">QR-CODE SCANNEN ZUM BEZAHLEN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-surface-container">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black font-headline tracking-tight mb-4">Einfache Preisgestaltung</h2>
            <p className="text-secondary text-lg">Wählen Sie den passenden Plan für Ihr Unternehmen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 flex flex-col">
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <p className="text-secondary text-sm">Ideal für Einsteiger</p>
              </div>
              <div className="text-4xl font-black mb-10">0€ <span className="text-lg font-normal text-secondary">/ Monat</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Bis zu 1.000€ Umsatz</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Standard Support</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Alle Basis-Features</span></li>
              </ul>
              <button className="w-full border border-outline text-on-surface py-3 rounded-full font-bold hover:bg-white transition-all">Plan wählen</button>
            </div>
            {/* Pro */}
            <div className="bg-surface-container-lowest p-10 rounded-2xl editorial-shadow border border-primary/20 flex flex-col relative md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Beliebt</div>
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-secondary text-sm">Für wachsende Teams</p>
              </div>
              <div className="text-4xl font-black mb-10">29€ <span className="text-lg font-normal text-secondary">/ Monat</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Unbegrenzter Umsatz</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Priorisierter Support</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Erweiterte Statistiken</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Individuelle QR-Branding</span></li>
              </ul>
              <button className="w-full bg-primary text-on-primary py-3 rounded-full font-bold hover:opacity-90 transition-all shadow-md">Jetzt starten</button>
            </div>
            {/* Business */}
            <div className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 flex flex-col">
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-2">Business</h3>
                <p className="text-secondary text-sm">Enterprise Lösungen</p>
              </div>
              <div className="text-4xl font-black mb-10">99€ <span className="text-lg font-normal text-secondary">/ Monat</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Multi-Account Management</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>24/7 VIP Support</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>API & Webhook Support</span></li>
                <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-xl">check_circle</span><span>Maßgeschneiderte Gebühren</span></li>
              </ul>
              <button className="w-full border border-outline text-on-surface py-3 rounded-full font-bold hover:bg-white transition-all">Kontakt aufnehmen</button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA + Waitlist */}
      <section className="py-24 bg-inverse-surface text-inverse-on-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-8 leading-tight">Bereit für die Zukunft des Bezahlens?</h2>
          <p className="text-xl text-surface-variant/70 mb-12 max-w-2xl mx-auto">Starten Sie noch heute mit Zipayo und bieten Sie Ihren Kunden ein modernes Bezahlerlebnis ohne Kompromisse.</p>
          
          {/* Waitlist Form */}
          <div className="max-w-xl mx-auto">
            {isSubmitted ? (
              <div className="bg-primary-container/20 p-8 rounded-2xl">
                <span className="material-symbols-outlined text-5xl text-primary-container mb-4" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                <h3 className="text-2xl font-bold mb-2">Willkommen auf der Waitlist!</h3>
                <p className="text-surface-variant/70">Wir melden uns, sobald Zipayo für Sie bereit ist.</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ihre E-Mail-Adresse"
                    className="w-full px-6 py-4 rounded-full text-on-surface bg-surface-container-lowest border border-outline-variant/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">rocket_launch</span>
                      Auf die Waitlist
                    </>
                  )}
                </button>
              </form>
            )}
            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}
            <p className="mt-6 text-sm text-surface-variant/50">Kein Spam. Nur Updates zum Launch.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 w-full py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-xl font-black text-slate-900 mb-4 font-headline tracking-tight">Zipayo</div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">Die Zukunft des bargeldlosen Bezahlens für kleine und große Unternehmen.</p>
            </div>
            <div className="flex flex-col space-y-3">
              <h5 className="font-bold mb-2">Features</h5>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">QR-Zahlung</a>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Tap to Pay</a>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Integrationen</a>
            </div>
            <div className="flex flex-col space-y-3">
              <h5 className="font-bold mb-2">Unternehmen</h5>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Über uns</a>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Kontakt</a>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Partner</a>
            </div>
            <div className="flex flex-col space-y-3">
              <h5 className="font-bold mb-2">Rechtliches</h5>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Impressum</a>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">Datenschutz</a>
              <a className="text-slate-500 hover:text-emerald-500 text-sm" href="#">AGB</a>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2025 Zipayo. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
