# Delayed Capture — Technisches Konzept

> Autorisierung beim Einchecken → Abbuchung nach Service

## Übersicht

Delayed Capture (auch "Authorization Hold" oder "Pre-Auth") ist ein Zahlungsverfahren, bei dem der Betrag zunächst nur **autorisiert** (reserviert) wird, aber erst **später tatsächlich abgebucht** wird. Dies ist ideal für Dienstleistungen, bei denen der finale Betrag erst nach Erbringung der Leistung feststeht.

## Use Cases

| Branche | Szenario |
|---------|----------|
| **Außendienst / Feldhub** | Kunde bucht Service → Autorisierung beim Check-in → Capture nach Abschluss |
| **Gastgewerbe** | Hotel reserviert Kreditkarte → Capture beim Checkout (Extras, Minibar) |
| **Werkstatt / Reparatur** | Kostenvoranschlag autorisiert → Capture nach Reparatur (evtl. geänderter Betrag) |
| **Veranstaltungen** | Ticket autorisiert → Capture nach erfolgreichem Event |

## Stripe Implementation

### PaymentIntent mit capture_method=manual

```typescript
// 1. Autorisierung erstellen (beim Check-in / Buchung)
const paymentIntent = await stripe.paymentIntents.create({
  amount: 15000, // €150.00 in Cents
  currency: 'eur',
  capture_method: 'manual', // ← Schlüssel!
  customer: 'cus_xxx',
  payment_method: 'pm_xxx',
  confirm: true,
  metadata: {
    orderId: 'order-123',
    merchantId: 'merchant-456',
    service: 'Aufforstung Fläche A',
  }
});

// Status: requires_capture
// Der Betrag ist jetzt autorisiert/reserviert
```

```typescript
// 2. Capture ausführen (nach Service-Abschluss)
const capturedPayment = await stripe.paymentIntents.capture(
  paymentIntent.id,
  {
    amount_to_capture: 14500, // Optional: weniger capturen als autorisiert
  }
);

// Status: succeeded
// Geld wird jetzt abgebucht und an Merchant überwiesen
```

### Zeitlimit

⚠️ **Wichtig:** Stripe autorisierte Beträge verfallen nach **7 Tagen**.

- Nach 7 Tagen wird die Autorisierung automatisch aufgehoben
- Der Kunde sieht keine Abbuchung mehr auf der Karte
- Bei längeren Services: Neue Autorisierung erforderlich oder sofortige Capture

### Fehlerbehandlung

```typescript
// Autorisierung kann fehlschlagen
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 15000,
    currency: 'eur',
    capture_method: 'manual',
    // ...
  });
} catch (error) {
  if (error.code === 'card_declined') {
    // Karte abgelehnt - Kunde informieren
  }
}
```

## API-Flows

### Flow 1: Check-in → Service → Capture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Kunde     │      │   Zipayo    │      │   Stripe    │
│  (App/Web)  │      │   Backend   │      │    API      │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                    │
       │ 1. Check-in        │                    │
       │    (Zahlungsdaten) │                    │
       │───────────────────>│                    │
       │                    │                    │
       │                    │ 2. POST /authorize │
       │                    │ capture_method=    │
       │                    │ manual             │
       │                    │───────────────────>│
       │                    │                    │
       │                    │ 3. PaymentIntent   │
       │                    │    requires_capture│
       │                    │<───────────────────│
       │                    │                    │
       │ 4. ✅ Autorisiert  │                    │
       │<───────────────────│                    │
       │                    │                    │
       │    ⏳ SERVICE WIRD ERBRACHT ⏳         │
       │                    │                    │
       │ 5. Service fertig  │                    │
       │    → Checkout      │                    │
       │───────────────────>│                    │
       │                    │                    │
       │                    │ 6. POST /capture   │
       │                    │    (finaler Betrag)│
       │                    │───────────────────>│
       │                    │                    │
       │                    │ 7. succeeded       │
       │                    │<───────────────────│
       │                    │                    │
       │ 8. 💰 Bezahlt!     │                    │
       │<───────────────────│                    │
       │                    │                    │
```

### Flow 2: Autorisierung abbrechen

```typescript
// Wenn Service nicht stattfindet oder abgebrochen wird
await stripe.paymentIntents.cancel(paymentIntent.id);

// Autorisierung wird sofort aufgehoben
// Kunde sieht keine "ausstehende" Buchung mehr
```

## Zipayo API Endpoints

### POST /api/pay/authorize

Erstellt eine Autorisierung (Delayed Capture).

**Request:**
```json
{
  "merchantId": "merchant-456",
  "amount": 15000,
  "currency": "eur",
  "customerId": "cus_xxx",
  "paymentMethodId": "pm_xxx",
  "metadata": {
    "orderId": "order-123",
    "service": "Aufforstung Fläche A"
  }
}
```

**Response:**
```json
{
  "success": true,
  "paymentIntentId": "pi_xxx",
  "status": "requires_capture",
  "expiresAt": "2026-04-07T12:30:00Z",
  "clientSecret": "pi_xxx_secret_xxx"
}
```

### POST /api/pay/capture

Führt die finale Abbuchung durch.

**Request:**
```json
{
  "paymentIntentId": "pi_xxx",
  "amountToCapture": 14500
}
```

**Response:**
```json
{
  "success": true,
  "status": "succeeded",
  "amountCaptured": 14500,
  "netAmount": 14065,
  "fee": 435
}
```

### POST /api/pay/cancel

Bricht eine Autorisierung ab.

**Request:**
```json
{
  "paymentIntentId": "pi_xxx",
  "reason": "service_cancelled"
}
```

**Response:**
```json
{
  "success": true,
  "status": "canceled"
}
```

## Vorteile für Merchants

1. **Flexibilität:** Finaler Betrag kann angepasst werden (niedriger als autorisiert)
2. **Vertrauen:** Kunde zahlt erst nach Leistungserbringung
3. **Weniger Rückbuchungen:** Keine Disputes wegen "nicht erbrachter Leistung"
4. **Feldhub-Integration:** Perfekt für Außendienst-Services (Aufforstung, Landschaftsbau, etc.)

## Vorteile für Kunden

1. **Sicherheit:** Nur autorisiert, nicht sofort abgebucht
2. **Transparenz:** Finaler Betrag erst nach Abschluss
3. **Einfachheit:** Nur einmal Zahlungsdaten eingeben

## Stripe Connect Express Integration

Bei Zipayo mit Stripe Connect Express:

```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 15000,
  currency: 'eur',
  capture_method: 'manual',
  application_fee_amount: 435, // Zipayo-Gebühr: 2.9%
  transfer_data: {
    destination: 'acct_merchant_xxx', // Merchant's Connect Account
  },
  // ...
});
```

Der autorisierte Betrag wird beim Capture direkt an den Merchant (minus Gebühren) überwiesen.

## Zusammenfassung

| Schritt | Stripe Status | Kundensicht | Geldfluss |
|---------|---------------|-------------|-----------|
| Autorisierung | `requires_capture` | "Ausstehend" auf Karte | Kein Transfer |
| Capture | `succeeded` | Abgebucht | → Merchant (T+2) |
| Abbruch | `canceled` | Reservierung aufgehoben | Kein Transfer |
| Timeout (7d) | `canceled` | Automatisch aufgehoben | Kein Transfer |

---

*Dokumentation: Amadeus · 31.03.2026 · Zipayo Platform*
