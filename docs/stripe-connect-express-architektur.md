# Stripe Connect Express — Architektur Dokumentation

> **Produkt:** Zipayo Payment Plattform  
> **Stand:** 30.03.2026  
> **Autor:** Amadeus (Auto-Loop)

---

## Übersicht

Zipayo nutzt **Stripe Connect Express** als Payment-Infrastruktur. Dieses Modell ermöglicht es, eine Zahlungsplattform für Merchants (z.B. Friseure, Cafés, lokale Dienstleister) zu betreiben, ohne selbst eine Zahlungslizenz zu benötigen.

### Warum Express statt Standard/Custom?

| Merkmal | Express | Standard | Custom |
|---------|---------|----------|--------|
| KYC-Verantwortung | **Stripe** | Merchant selbst | Plattform |
| Onboarding-UI | **Stripe Hosted** | Merchant Portal | Selbst gebaut |
| Compliance-Aufwand | **Minimal** | Mittel | Hoch |
| Branding | Stripe + Co-Branding | Merchant | Voll-Custom |
| Risiko-Management | **Stripe** | Merchant | Plattform |

**→ Express ist optimal für Zipayo:** Minimaler Compliance-Aufwand, schnelles Onboarding, Stripe übernimmt KYC und Risiko.

---

## Merchant-Onboarding-Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     ZIPAYO MERCHANT ONBOARDING                   │
└─────────────────────────────────────────────────────────────────┘

1. Merchant registriert sich auf zipayo.de
   └→ Zipayo erstellt Stripe Connect Account (Express)
      POST /v1/accounts { type: "express", country: "DE", ... }

2. Zipayo generiert Onboarding-Link
   └→ POST /v1/account_links { account: "acct_xxx", type: "account_onboarding" }
   └→ Merchant wird zu Stripe Hosted Onboarding weitergeleitet

3. Stripe Hosted Onboarding (KYC)
   ├→ Persönliche Daten (Name, Geburtsdatum, Adresse)
   ├→ Unternehmenstyp (Einzelunternehmer, GmbH, etc.)
   ├→ Bankverbindung (IBAN für Auszahlungen)
   ├→ Identitätsverifizierung (Ausweis-Upload)
   └→ AGB + Datenschutz-Zustimmung

4. Webhook: account.updated
   └→ Zipayo aktualisiert Merchant-Status in DB
      { stripe_account_id, charges_enabled: true, payouts_enabled: true }

5. Merchant kann Zahlungen empfangen ✓
```

### API-Beispiel: Account erstellen

```javascript
const account = await stripe.accounts.create({
  type: 'express',
  country: 'DE',
  email: 'merchant@example.com',
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: 'individual', // oder 'company'
  metadata: {
    zipayo_merchant_id: 'merch_123'
  }
});

// Onboarding-Link generieren
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: 'https://zipayo.de/onboarding/refresh',
  return_url: 'https://zipayo.de/onboarding/complete',
  type: 'account_onboarding',
});

// → Merchant an accountLink.url weiterleiten
```

---

## Payout-Timing (T+2)

### Standard-Auszahlungsrhythmus

| Event | Zeitpunkt |
|-------|-----------|
| Zahlung eingegangen | Tag 0 (T) |
| Clearing bei Stripe | T+1 |
| **Auszahlung auf Merchant-Konto** | **T+2** |

### Konfigurierbare Optionen

```javascript
// Stripe Account Settings
{
  settings: {
    payouts: {
      schedule: {
        interval: 'daily',     // 'daily' | 'weekly' | 'monthly'
        delay_days: 2,         // Standard für DE: 2 Tage
        weekly_anchor: 'friday' // nur bei interval: 'weekly'
      }
    }
  }
}
```

### Sofort-Auszahlungen (Instant Payouts)

- Verfügbar für verifizierte Merchants
- Zusätzliche Gebühr: 1% des Betrags (min. €0,50)
- Gutschrift in Minuten statt Tagen
- Optional als Premium-Feature für Zipayo anbieten

---

## Chargeback-Handling

### Stripe übernimmt:

| Aufgabe | Stripe | Zipayo | Merchant |
|---------|--------|--------|----------|
| Dispute-Benachrichtigung | ✅ Webhook | — | — |
| Beweismaterial sammeln | Teilweise | — | ✅ |
| Dispute-Antwort einreichen | ✅ Plattform | — | — |
| Geldeinzug bei verlorenem Dispute | ✅ | — | Belastung |
| Fraud-Detection (Radar) | ✅ | — | — |

### Webhook-Events für Disputes

```javascript
// Relevante Webhooks
'charge.dispute.created'   // Neuer Dispute eröffnet
'charge.dispute.updated'   // Status-Update
'charge.dispute.closed'    // Dispute abgeschlossen (won/lost)

// Zipayo-Aktion bei Dispute:
// 1. Merchant per Email benachrichtigen
// 2. Beweismaterial anfordern (Quittung, Unterschrift, etc.)
// 3. An Stripe übermitteln via API
```

### Dispute-Gebühren

- Dispute-Gebühr: **€15** pro Fall (wird bei Gewinn erstattet)
- Bei Verlust: Gesamtbetrag wird vom Merchant-Balance abgezogen
- Stripe zieht ggf. vom nächsten Payout ab

---

## BaFin-Relevanz (Deutschland)

### Kernanfrage: Braucht Zipayo eine BaFin-Lizenz?

**Kurze Antwort: Sehr wahrscheinlich NEIN**

### Begründung

| Kriterium | Zipayo mit Stripe Connect | Konsequenz |
|-----------|--------------------------|------------|
| Geld halten? | ❌ Nein, Gelder fließen direkt zu Stripe | Kein E-Geld-Institut |
| Zahlungsabwicklung? | ❌ Stripe ist der Zahlungsdienstleister | Kein Zahlungsinstitut |
| Kreditvergabe? | ❌ Nein | Kein Kreditinstitut |
| Eigenhandel? | ❌ Nein | Kein Finanzdienstleister |

### Zipayo's Rolle = Technischer Vermittler

Zipayo ist lediglich ein **Software-Anbieter**, der:
- Merchants mit Stripe Connect verbindet
- QR-Codes und UI bereitstellt
- Keine Gelder empfängt oder hält

### Relevante Regulierung

| Regulierung | Anwendbar? | Begründung |
|-------------|------------|------------|
| ZAG (Zahlungsaufsichtsgesetz) | ❌ Nein | Zipayo ist kein Zahlungsdienstleister |
| PSD2 | ❌ Nein | Keine Kontoinformationsdienste |
| BaFin-Erlaubnis | ❌ Nein | Keine erlaubnispflichtige Tätigkeit |
| Gewerbeanmeldung | ✅ Ja | Standard für Software-Unternehmen |
| Impressumspflicht | ✅ Ja | Standard für Webseiten |

### Disclaimer

> **Wichtig:** Diese Einschätzung ersetzt keine Rechtsberatung. Bei Unsicherheit sollte ein auf Finanzregulierung spezialisierter Anwalt konsultiert werden, insbesondere wenn:
> - Das Geschäftsmodell sich ändert (z.B. eigene Wallet-Funktion)
> - Zipayo selbst Gelder zwischenhält
> - Grenzüberschreitende Zahlungen angeboten werden

---

## Gebührenstruktur

### Zipayo Platform Fee

```
Zahlungsbetrag: €100,00
├── Stripe Gebühr (1,5% + €0,25): -€1,75
├── Zipayo Platform Fee (0,15%): -€0,15
└── Merchant erhält: €98,10
```

### Konfiguration in Stripe

```javascript
// Bei PaymentIntent-Erstellung
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000, // €100,00 in Cents
  currency: 'eur',
  application_fee_amount: 15, // €0,15 Zipayo-Fee
  transfer_data: {
    destination: 'acct_merchant_xxx', // Merchant Account
  },
}, {
  stripeAccount: 'acct_merchant_xxx', // On behalf of
});
```

### Transparenz für Merchants

| Posten | Betrag | Wer erhält |
|--------|--------|-----------|
| Transaktionsbetrag | €100,00 | — |
| Stripe Gebühr | -€1,75 | Stripe |
| Zipayo Platform Fee | -€0,15 | Zipayo |
| **Netto an Merchant** | **€98,10** | Merchant |

---

## Delayed Capture (für Service-Betriebe)

### Use Case

Friseur-Szenario:
1. Kunde checkt ein → Karte wird autorisiert (€50 reserviert)
2. Service wird durchgeführt (45 Min)
3. Am Ende: tatsächlicher Betrag wird abgebucht (€47 oder €53)

### API-Flow

```javascript
// 1. Autorisierung beim Check-in
const paymentIntent = await stripe.paymentIntents.create({
  amount: 5000, // Max. geschätzter Betrag
  currency: 'eur',
  capture_method: 'manual', // ← Delayed Capture
  payment_method: 'pm_xxx',
  confirm: true,
  application_fee_amount: 15,
  transfer_data: { destination: 'acct_merchant_xxx' },
});
// Status: requires_capture

// 2. Capture nach Service (mit finalem Betrag)
await stripe.paymentIntents.capture(paymentIntent.id, {
  amount_to_capture: 4700, // Tatsächlicher Betrag: €47,00
});
// Differenz (€3,00) wird automatisch freigegeben
```

### Wichtige Limits

| Regel | Wert |
|-------|------|
| Max. Autorisierungsdauer | **7 Tage** |
| Capture muss erfolgen bis | 7 Tage nach Autorisierung |
| Sonst | Autorisierung verfällt automatisch |
| Partial Capture | ✅ Erlaubt (niedrigerer Betrag) |
| Over-Capture | ❌ Nicht erlaubt |

---

## Sicherheit & Compliance

### PCI-DSS

- **Stripe übernimmt PCI-Compliance** vollständig
- Zipayo speichert **keine Kartendaten**
- Stripe Elements/Checkout für sichere Eingabe
- SAQ-A (Self-Assessment Questionnaire) ausreichend

### DSGVO

| Daten | Verantwortlicher | Aufbewahrung |
|-------|------------------|--------------|
| Kartendaten | Stripe | Nach Stripe Policy |
| Transaktionsdaten | Stripe + Zipayo | 10 Jahre (HGB) |
| Merchant-Stammdaten | Zipayo | Vertragsdauer + 10 Jahre |
| Kunden-Email (Quittung) | Zipayo | 30 Tage oder Opt-in |

### Webhook-Sicherheit

```javascript
// Webhook-Signatur validieren
const event = stripe.webhooks.constructEvent(
  req.body,
  req.headers['stripe-signature'],
  process.env.STRIPE_WEBHOOK_SECRET
);
```

---

## Technische Entscheidungen

### Empfohlene Architektur

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Zipayo App/Web │────▶│  Zipayo Backend │────▶│  Stripe API     │
│  (Frontend)     │     │  (Next.js API)  │     │  (Connect)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │  Neon DB        │
                        │  (Postgres)     │
                        └─────────────────┘
```

### Datenbank-Schema (Auszug)

```sql
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_account_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  business_name VARCHAR(255),
  charges_enabled BOOLEAN DEFAULT false,
  payouts_enabled BOOLEAN DEFAULT false,
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'eur',
  platform_fee_cents INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  captured_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Zusammenfassung

| Aspekt | Status | Details |
|--------|--------|---------|
| **KYC/Compliance** | ✅ Stripe übernimmt | Hosted Onboarding, keine BaFin-Lizenz nötig |
| **Payouts** | ✅ T+2 Standard | Konfigurierbar, Instant optional |
| **Chargebacks** | ✅ Stripe managed | €15 Dispute-Fee, Beweispflicht beim Merchant |
| **Regulierung** | ✅ Minimal | Zipayo = Tech-Vermittler, keine Zahlungslizenz |
| **Delayed Capture** | ✅ Verfügbar | 7-Tage-Limit, ideal für Services |

---

## Referenzen

- [Stripe Connect Express Docs](https://stripe.com/docs/connect/express-accounts)
- [Stripe Delayed Capture](https://stripe.com/docs/payments/capture-later)
- [Stripe Disputes](https://stripe.com/docs/disputes)
- [BaFin ZAG](https://www.bafin.de/DE/Aufsicht/Zahlungsverkehr/zahlungsverkehr_node.html)

---

*Dokument erstellt: 30.03.2026 | Amadeus Auto-Loop | ZP002*
