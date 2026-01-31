---
title: Verwendung des Amortisationsmodus mit dem BAII Plus Taschenrechner
description: Lernen Sie, wie Sie den Amortisationsmodus des BAII Plus Taschenrechners für Darlehensberechnungen nutzen. Berechnen Sie Tilgungspläne, Zinszahlungen und Restschulden mit einfachen Schritten.
image: /images/post_amortization.jpg
tags: [tvm, financial calculator, cfa, frm]
datePublished: "2024-11-24"
schemaOrg:
  - "@type": "TechArticle"
    headline: "Verwendung des Amortisationsmodus mit dem BAII Plus Taschenrechner"
    description: "Lernen Sie, wie Sie den Amortisationsmodus des BAII Plus Taschenrechners für Darlehensberechnungen nutzen. Berechnen Sie Tilgungspläne, Zinszahlungen und Restschulden mit einfachen Schritten."
    about: {
      "@type": "Thing",
      "name": "Darlehensberechnung",
      "description": "Berechnung von Tilgungsplänen und Darlehenszahlungen"
    }
    image:
      "@type": "ImageObject"
      url: "https://baiiplus.com/images/post_amortization.jpg"
    author:
      "@type": "Person"
      name: "BAII Plus"
    publisher:
      "@type": "Organization"
      name: "BAII Plus"
      logo:
        "@type": "ImageObject"
        url: "https://baiiplus.com/logo.png"
    datePublished: "2024-11-24"
    dateModified: "2024-11-24"
    mainEntityOfPage:
      "@type": "WebPage"
      "@id": "https://baiiplus.com/de/post/how-to-use-amortization-mode"
---

![Amortisationsberechnung](/images/post_amortization.jpg){.mx-auto}

# Verwendung des Amortisationsmodus mit dem BAII Plus Taschenrechner

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200}

## I. Einführung

Der Amortisationsmodus des BAII Plus Taschenrechners ist ein leistungsstarkes Werkzeug für die Analyse von Darlehen und Hypotheken. Er ermöglicht die detaillierte Untersuchung von Zahlungsplänen, einschließlich der Aufteilung in Zins- und Tilgungsanteile.

## II. Grundlagen der Amortisation

Der Amortisationsmodus zeigt:
- Zinszahlungen für einen bestimmten Zeitraum
- Tilgungsbeträge für einen bestimmten Zeitraum
- Verbleibende Restschuld nach bestimmten Zahlungen
- Gesamtzahlungen über mehrere Perioden

## III. Zugriff auf den Amortisationsmodus

1. Geben Sie zuerst die TVM-Variablen ein:
   - N (Gesamtzahl der Zahlungen)
   - I/Y (Jahreszinssatz)
   - PV (Darlehensbetrag)
   - PMT (regelmäßige Zahlung)
   - FV (Restwert, normalerweise 0)

2. Drücken Sie [2nd]{.p-1 .rounded-md .bg-gray-200} + [0]{.p-1 .rounded-md .bg-gray-200} (AMORT)

## IV. Praktische Beispiele

**Beispiel 1: Analyse eines Hypothekendarlehens**

> Analysieren Sie ein Hypothekendarlehen mit folgenden Bedingungen:
> - Darlehensbetrag: 200.000 €
> - Laufzeit: 30 Jahre
> - Jahreszinssatz: 4,5%
> - Monatliche Zahlungen

1. Geben Sie die TVM-Variablen ein:
   - N = 360 (30 Jahre × 12 Monate)
   - I/Y = 4,5
   - PV = 200000
   - PMT (berechnen lassen)
   - FV = 0
   - P/Y = 12 (monatliche Zahlungen)
   - C/Y = 12 (monatliche Verzinsung)

2. Drücken Sie [PMT]{.p-1 .rounded-md .bg-gray-200} für die monatliche Zahlung

3. Drücken Sie [2nd]{.p-1 .rounded-md .bg-gray-200} + [0]{.p-1 .rounded-md .bg-gray-200} für den Amortisationsmodus

4. Geben Sie die zu analysierenden Zahlungen ein (z.B. 1-12 für das erste Jahr)

**Beispiel 2: Analyse bestimmter Zahlungsperioden**

> Untersuchen Sie die Zahlungen 13-24 (zweites Jahr):

1. Im Amortisationsmodus:
   - Geben Sie 13 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - Geben Sie 24 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - Drücken Sie [↓]{.p-1 .rounded-md .bg-gray-200} für:
     - BAL (Restschuld)
     - PRN (Tilgungsanteil)
     - INT (Zinsanteil)

**Beispiel 3: Kumulierte Zahlungen**

> Berechnen Sie die Gesamtzahlungen für die ersten fünf Jahre:

1. Im Amortisationsmodus:
   - Geben Sie 1 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - Geben Sie 60 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - Die Anzeige zeigt:
     - Gesamttilgung
     - Gesamtzinsen
     - Restschuld nach 5 Jahren

## V. Tipps und Fehlerbehebung

- **Zahlungseinstellungen:** Stellen Sie sicher, dass P/Y und C/Y korrekt eingestellt sind
- **Vorzeichenkonvention:** Achten Sie auf die korrekte Verwendung von positiven und negativen Zahlen
- **Datenüberprüfung:** Nutzen Sie die [↑]{.p-1 .rounded-md .bg-gray-200}/[↓]{.p-1 .rounded-md .bg-gray-200} Tasten zur Überprüfung aller Werte

## VI. Erweiterte Funktionen

**Teilzahlungsanalyse**
- Analysieren Sie einzelne Zahlungen innerhalb eines Zeitraums
- Vergleichen Sie verschiedene Zeiträume
- Berechnen Sie die Auswirkungen von Sondertilgungen

**Restschuldberechnung**
- Ermitteln Sie die Restschuld zu jedem Zeitpunkt
- Berechnen Sie die Auswirkungen vorzeitiger Tilgung
- Analysieren Sie verschiedene Tilgungsszenarien

## VII. Fazit

Der Amortisationsmodus des BAII Plus Taschenrechners ist ein unverzichtbares Werkzeug für die Analyse von Darlehen und Hypotheken. Mit regelmäßiger Übung können Sie schnell und präzise Tilgungspläne analysieren und fundierte Finanzentscheidungen treffen. Nutzen Sie die [Online-Version des BAII Plus](https://www.baiiplus.com/) für zusätzliche Übung und Verifizierung Ihrer Berechnungen. 