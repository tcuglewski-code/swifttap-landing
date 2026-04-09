import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preise — Zipayo',
  description: 'Transparente Preise für Zipayo. Starter kostenlos, Pro ab 29€/Monat, Business ab 79€/Monat.',
}

const plans = [
  {
    name: 'Starter',
    price: '0€',
    subtitle: 'Kostenlos bis 1.000€ Umsatz/Monat',
    highlight: false,
    cta: 'Kostenlos starten',
    ctaLink: '/register',
    features: {
      'QR-Zahlung': true,
      'Tap-to-Pay': true,
      'Dashboard & Statistiken': true,
      'E-Mail-Quittungen': true,
      'API-Zugang': false,
      'Team-Mitglieder': false,
      'Multi-Standort': false,
      'Individuelles Branding': false,
      'Priorisierter Support': false,
      'Dedizierter Account Manager': false,
    },
  },
  {
    name: 'Pro',
    price: '29€',
    subtitle: 'Für wachsende Unternehmen',
    highlight: true,
    cta: 'Kostenlos starten',
    ctaLink: '/register',
    features: {
      'QR-Zahlung': true,
      'Tap-to-Pay': true,
      'Dashboard & Statistiken': true,
      'E-Mail-Quittungen': true,
      'API-Zugang': true,
      'Team-Mitglieder': 'Bis 5',
      'Multi-Standort': 'Bis 3',
      'Individuelles Branding': true,
      'Priorisierter Support': true,
      'Dedizierter Account Manager': false,
    },
  },
  {
    name: 'Business',
    price: '79€',
    subtitle: 'Enterprise-Lösungen',
    highlight: false,
    cta: 'Kostenlos starten',
    ctaLink: '/register',
    features: {
      'QR-Zahlung': true,
      'Tap-to-Pay': true,
      'Dashboard & Statistiken': true,
      'E-Mail-Quittungen': true,
      'API-Zugang': true,
      'Team-Mitglieder': 'Unbegrenzt',
      'Multi-Standort': 'Unbegrenzt',
      'Individuelles Branding': true,
      'Priorisierter Support': true,
      'Dedizierter Account Manager': true,
    },
  },
]

const featureKeys = Object.keys(plans[0].features) as (keyof typeof plans[0]['features'])[]

export default function PricingPage() {
  return (
    <div className="bg-surface-bright font-body text-on-surface min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a href="/" className="text-2xl font-black text-emerald-600 font-headline tracking-tight">Zipayo</a>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-slate-600 hover:text-emerald-500 transition-colors font-semibold tracking-tight" href="/">Features</a>
            <a className="text-emerald-600 border-b-2 border-emerald-500 pb-1 font-semibold tracking-tight" href="/pricing">Pricing</a>
            <a className="text-slate-600 hover:text-emerald-500 transition-colors font-semibold tracking-tight" href="#">Login</a>
            <a href="/register" className="bg-primary hover:opacity-90 text-on-primary px-6 py-2 rounded-full font-bold text-sm tracking-wide inline-block">Start Now</a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-44 md:pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter mb-6">Einfache, transparente Preise</h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Keine versteckten Gebühren. Transaktionskosten: <strong>1,4% + 0,25€</strong> pro Zahlung (Stripe-Gebühren, transparent weitergereicht).
          </p>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-10 rounded-2xl flex flex-col relative ${
                  plan.highlight
                    ? 'bg-surface-container-lowest editorial-shadow border border-primary/20 md:-translate-y-4'
                    : 'bg-surface-container-low border border-outline-variant/10'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    Beliebt
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-secondary text-sm">{plan.subtitle}</p>
                </div>
                <div className="text-4xl font-black mb-8">
                  {plan.price} <span className="text-lg font-normal text-secondary">/ Monat</span>
                </div>
                <ul className="space-y-3 mb-10 flex-grow">
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <li key={feature} className="flex items-center gap-3">
                      {value === false ? (
                        <span className="material-symbols-outlined text-slate-300 text-xl">close</span>
                      ) : (
                        <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                      )}
                      <span className={value === false ? 'text-slate-400' : ''}>
                        {feature}{typeof value === 'string' ? ` (${value})` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaLink}
                  className={`w-full py-3 rounded-full font-bold text-center block ${
                    plan.highlight
                      ? 'bg-primary text-on-primary hover:opacity-90 shadow-md'
                      : 'border border-outline text-on-surface hover:bg-white'
                  } transition-all`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black font-headline tracking-tight text-center mb-12">Feature-Vergleich</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/20">
                  <th className="py-4 pr-4 font-bold text-sm uppercase tracking-wider text-secondary">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="py-4 px-4 font-bold text-center">{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-4 pr-4 text-sm font-medium">Monatspreis</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 px-4 text-center font-bold">{plan.price}</td>
                  ))}
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-4 pr-4 text-sm font-medium">Transaktionsgebühr</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="py-4 px-4 text-center text-sm">1,4% + 0,25€</td>
                  ))}
                </tr>
                {featureKeys.map((feature) => (
                  <tr key={feature} className="border-b border-outline-variant/10">
                    <td className="py-4 pr-4 text-sm font-medium">{feature}</td>
                    {plans.map((plan) => {
                      const val = plan.features[feature]
                      return (
                        <td key={plan.name} className="py-4 px-4 text-center">
                          {val === true ? (
                            <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                          ) : val === false ? (
                            <span className="material-symbols-outlined text-slate-300 text-xl">close</span>
                          ) : (
                            <span className="text-sm font-medium">{val}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-inverse-surface text-inverse-on-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black font-headline tracking-tighter mb-6">Bereit loszulegen?</h2>
          <p className="text-lg text-surface-variant/70 mb-10 max-w-xl mx-auto">Starten Sie kostenlos und upgraden Sie jederzeit, wenn Ihr Geschäft wächst.</p>
          <a href="/register" className="bg-primary-container text-on-primary-container px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-2xl inline-block">
            Kostenlos starten
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 w-full py-10 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 Zipayo. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-emerald-500">Impressum</a>
            <a href="#" className="hover:text-emerald-500">Datenschutz</a>
            <a href="#" className="hover:text-emerald-500">AGB</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
