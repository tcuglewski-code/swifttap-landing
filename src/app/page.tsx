'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branche: '',
    groesse: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[#1e3a5f] font-bold text-lg tracking-tight">SwiftTap</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#vorteile" className="hover:text-[#1e3a5f] transition-colors">Vorteile</a>
            <a href="#preise" className="hover:text-[#1e3a5f] transition-colors">Preise</a>
            <a href="#branchen" className="hover:text-[#1e3a5f] transition-colors">Branchen</a>
            <a href="#so-funktionierts" className="hover:text-[#1e3a5f] transition-colors">So funktioniert&apos;s</a>
          </div>
          <a
            href="#waitlist"
            className="bg-[#22c55e] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-500 transition-colors"
          >
            Kostenlos testen
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/10 text-[#1e3a5f] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
            Jetzt in der Beta — erste 100 Betriebe kostenlos
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1e3a5f] leading-tight mb-6 text-balance">
            Bezahlung für den Außendienst.{' '}
            <span className="text-[#22c55e]">Einfach.</span>{' '}
            Günstig. Ohne Risiko.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            QR-Code oder Kartenterminal — SwiftTap macht Zahlungen zum Standard in deinem Betrieb.
            Keine Mindestlaufzeit. Keine versteckten Gebühren.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#waitlist"
              className="w-full sm:w-auto bg-[#22c55e] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5"
            >
              Kostenlos testen →
            </a>
            <a
              href="#waitlist"
              className="w-full sm:w-auto bg-white text-[#1e3a5f] font-semibold text-lg px-8 py-4 rounded-xl border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f]/40 transition-all"
            >
              Demo anfordern
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Powered by Stripe
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              DSGVO-konform
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              Keine Mindestlaufzeit
            </div>
          </div>
        </div>
      </section>

      {/* ── USPs ── */}
      <section id="vorteile" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">Warum SwiftTap?</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">Gebaut für Betriebe, die draußen arbeiten — nicht für Kassensysteme im Laden.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Kein Transaktionsrisiko',
                desc: 'Stripe übernimmt Zahlungsabwicklung, Chargeback-Schutz und Compliance vollständig. Du bekommst einfach dein Geld.',
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 3.5V17m-8-5.5V7m0 0a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Keine Hardware nötig',
                desc: 'QR-Code reicht für sofortige Zahlungen. Terminal optional — du entscheidest, was zu deinem Betrieb passt.',
              },
              {
                icon: (
                  <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                ),
                title: 'In dein System integriert',
                desc: 'AppFabrik-nativ und per API in bestehende Kassensysteme integrierbar. Keine Insellösung — SwiftTap wird Teil deines digitalen Betriebs.',
              },
            ].map((usp, i) => (
              <div key={i} className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 hover:border-[#22c55e]/30 hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-5">
                  {usp.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{usp.title}</h3>
                <p className="text-slate-600 leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="preise" className="py-20 px-4 sm:px-6 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">Transparent. Fair. Günstig.</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">
              Günstiger als SumUp und Nexi — ohne Kompromisse bei Funktionen.
            </p>
            <div className="inline-flex items-center gap-3 mt-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium px-4 py-2 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              Zum Vergleich: SumUp 1,69% · Nexi ~1,79% + €24/Monat
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* QR Basic */}
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-[#1e3a5f]/30 transition-all">
              <div className="mb-6">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">QR Basic</span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-5xl font-extrabold text-[#1e3a5f]">€19</span>
                  <span className="text-slate-500 mb-1">/Monat</span>
                </div>
                <p className="text-[#22c55e] font-semibold mt-1">+ 1,5% pro Transaktion</p>
                <p className="text-sm text-slate-500 mt-1">Keine Hardware nötig</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['QR-Code Zahlungen', 'Delayed Capture ✅', 'White-Label ✅', 'AppFabrik Integration ✅', 'E-Mail Support'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-700">
                    <svg className="w-5 h-5 text-[#22c55e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#waitlist" className="block w-full text-center bg-[#1e3a5f] text-white font-semibold py-3 rounded-xl hover:bg-[#1e3a5f]/90 transition-colors">
                Jetzt starten
              </a>
            </div>

            {/* Terminal Pro */}
            <div className="bg-[#1e3a5f] rounded-2xl p-8 border-2 border-[#1e3a5f] relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-full">BELIEBT</div>
              <div className="mb-6">
                <span className="text-sm font-semibold text-blue-200 uppercase tracking-wide">Terminal Pro</span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-5xl font-extrabold text-white">€39</span>
                  <span className="text-blue-200 mb-1">/Monat</span>
                </div>
                <p className="text-[#22c55e] font-semibold mt-1">+ 1,65% pro Transaktion</p>
                <p className="text-sm text-blue-200 mt-1">Stripe Reader M2 (€59 einmalig)</p>
              </div>

              <ul className="space-y-3 mb-8">
                {['QR-Code + Kartenterminal', 'Delayed Capture ✅', 'White-Label ✅', 'AppFabrik Integration ✅', 'Priority Support', 'Stripe Reader M2 optional'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-blue-100">
                    <svg className="w-5 h-5 text-[#22c55e] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#waitlist" className="block w-full text-center bg-[#22c55e] text-white font-bold py-3 rounded-xl hover:bg-green-500 transition-colors">
                Terminal freischalten
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRANCHEN ── */}
      <section id="branchen" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">Für deinen Betrieb gemacht</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">SwiftTap funktioniert überall dort, wo Arbeit vor Ort abgerechnet wird.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji: '✂️', name: 'Friseure' },
              { emoji: '🔧', name: 'Handwerk' },
              { emoji: '🌿', name: 'GaLaBau' },
              { emoji: '🧹', name: 'Reinigung' },
              { emoji: '🌲', name: 'Forst' },
              { emoji: '🚚', name: 'Lieferdienste' },
            ].map((b) => (
              <div key={b.name} className="bg-[#f8fafc] rounded-2xl p-6 text-center border border-slate-100 hover:border-[#22c55e]/40 hover:shadow-sm transition-all group">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{b.emoji}</div>
                <p className="font-semibold text-[#1e3a5f] text-sm">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="so-funktionierts" className="py-20 px-4 sm:px-6 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">In unter einer Stunde live</h2>
            <p className="text-slate-600 text-lg max-w-xl mx-auto">Kein technisches Know-how nötig. Kein Papierkram. Einfach starten.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Registrieren',
                desc: '5 Minuten KYC-Verifizierung über Stripe. Personalausweis, Betriebsdaten — fertig. Kein Papierkram.',
                icon: '📋',
              },
              {
                step: '02',
                title: 'QR-Code oder Terminal',
                desc: 'Sofort QR-Code nutzen oder Stripe Reader M2 bestellen. Beide Varianten funktionieren ab Tag 1.',
                icon: '💳',
              },
              {
                step: '03',
                title: 'Erste Zahlung in < 1h',
                desc: 'Nach der Aktivierung kannst du sofort kassieren. Auszahlung auf dein Konto innerhalb von 2 Werktagen.',
                icon: '⚡',
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#22c55e] to-transparent z-0 -translate-x-4"></div>
                )}
                <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-[#22c55e]/30 hover:shadow-md transition-all relative z-10">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-6xl font-black text-[#1e3a5f]/5 absolute top-4 right-6">{step.step}</div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="py-24 px-4 sm:px-6 bg-[#1e3a5f]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 text-[#22c55e] text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
              Beta — Begrenzte Plätze
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Jetzt auf die Warteliste</h2>
            <p className="text-blue-200 text-lg">Die ersten 100 Betriebe starten kostenlos. Sicher dir deinen Platz.</p>
          </div>

          {submitted ? (
            <div className="bg-[#22c55e]/20 border border-[#22c55e]/40 rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">Du bist dabei!</h3>
              <p className="text-blue-200">Wir melden uns sobald dein Platz freigeschaltet wird. Schau auch in deinen Spam-Ordner.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Max Mustermann"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-[#22c55e] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">E-Mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="max@betrieb.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-blue-300/50 focus:outline-none focus:border-[#22c55e] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Branche *</label>
                <select
                  required
                  value={formData.branche}
                  onChange={(e) => setFormData({ ...formData, branche: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors appearance-none"
                >
                  <option value="" className="text-slate-800">Bitte wählen...</option>
                  <option value="friseur" className="text-slate-800">Friseur / Kosmetik</option>
                  <option value="handwerk" className="text-slate-800">Handwerk</option>
                  <option value="galabau" className="text-slate-800">GaLaBau / Gartenbau</option>
                  <option value="reinigung" className="text-slate-800">Reinigung / Gebäudeservice</option>
                  <option value="forst" className="text-slate-800">Forstwirtschaft</option>
                  <option value="lieferdienst" className="text-slate-800">Lieferdienst / Logistik</option>
                  <option value="sonstiges" className="text-slate-800">Sonstiges</option>
                </select>
              </div>

              <div>
                <label className="block text-blue-200 text-sm font-medium mb-2">Unternehmensgröße</label>
                <select
                  value={formData.groesse}
                  onChange={(e) => setFormData({ ...formData, groesse: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#22c55e] transition-colors appearance-none"
                >
                  <option value="" className="text-slate-800">Bitte wählen...</option>
                  <option value="solo" className="text-slate-800">Solo-Selbständig</option>
                  <option value="2-5" className="text-slate-800">2–5 Mitarbeiter</option>
                  <option value="6-20" className="text-slate-800">6–20 Mitarbeiter</option>
                  <option value="20+" className="text-slate-800">Mehr als 20 Mitarbeiter</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#22c55e] text-white font-bold text-lg py-4 rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-900/30 hover:-translate-y-0.5 mt-2"
              >
                Platz sichern — Kostenlos →
              </button>

              <p className="text-blue-300/60 text-xs text-center">
                Kein Spam. Keine Weitergabe. Nur Infos zu SwiftTap.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f1f35] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1e3a5f] border border-white/20 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-white font-semibold">SwiftTap</span>
            <span className="text-slate-500 text-sm">by FELDWERK</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">AGB</a>
          </div>

          <p className="text-slate-500 text-sm">© 2026 FELDWERK UG</p>
        </div>
      </footer>
    </main>
  )
}
