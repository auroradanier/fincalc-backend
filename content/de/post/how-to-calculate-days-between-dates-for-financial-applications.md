---
title: Berechnung von Tagen zwischen Daten für Finanzanwendungen
description: Der Datumsmodus des Finanzrechners ermöglicht es Ihnen, Tage zwischen Daten zu berechnen, zukünftige oder vergangene Daten zu bestimmen und zwischen der tatsächlichen (365-Tage) und der 360-Tage-Berechnungsmethode zu wechseln. Erfahren Sie, wie Sie die Funktionen DT1, DT2, DBD und DAY effektiv nutzen.
image: /images/post_date_mode.jpg
tags: [Datumsberechnungen, Tage zwischen Daten, Finanzrechner, cfa, frm]
datePublished: "2025-06-06"
schemaOrg:
  - "@type": "TechArticle"
    headline: "Berechnung von Tagen zwischen Daten für Finanzanwendungen"
    description: "Der Datumsmodus des Finanzrechners ermöglicht es Ihnen, Tage zwischen Daten zu berechnen, zukünftige oder vergangene Daten zu bestimmen und zwischen der tatsächlichen (365-Tage) und der 360-Tage-Berechnungsmethode zu wechseln. Erfahren Sie, wie Sie die Funktionen DT1, DT2, DBD und DAY effektiv nutzen."
    about: {
      "@type": "Thing",
      "name": "Datumsberechnungen",
      "description": "Finanzberechnungen zur Bestimmung von Tagen zwischen Daten und zukünftigen/vergangenen Daten"
    }
    image:
      "@type": "ImageObject"
      url: "https://baiiplus.com/images/post_date_mode.jpg"
    author:
      "@type": "Person"
      name: "BAII Plus"
    publisher:
      "@type": "Organization"
      name: "BAII Plus"
      logo:
        "@type": "ImageObject"
        url: "https://baiiplus.com/logo.png"
    datePublished: "2025-06-06"
    dateModified: "2025-06-06"
    mainEntityOfPage:
      "@type": "WebPage"
      "@id": "https://baiiplus.com/de/post/how-to-calculate-days-between-dates"
    proficiencyLevel: "Beginner"
    dependencies: "BAII Plus Finanzrechner"
    step:
      - "@type": "HowToStep"
        name: "Datumsmodus aufrufen"
        text: "Drücken Sie [2nd] dann [DATE], um in den Datumsmodus zu gelangen"
      - "@type": "HowToStep"
        name: "Erstes Datum eingeben"
        text: "Geben Sie das erste Datum (DT1) im entsprechenden Format ein"
      - "@type": "HowToStep"
        name: "Zweites Datum eingeben"
        text: "Geben Sie das zweite Datum (DT2) im entsprechenden Format ein"
      - "@type": "HowToStep"
        name: "Tage zwischen Daten berechnen"
        text: "Navigieren Sie zu DBD und drücken Sie [CPT], um die Tage zwischen den Daten zu berechnen"
      - "@type": "HowToStep"
        name: "Berechnungsmethode umschalten"
        text: "Navigieren Sie zu DAY und drücken Sie [CPT], um zwischen der tatsächlichen und der 360-Tage-Methode zu wechseln"

---

![Datumsmodus-Header](/images/post_date_mode.jpg){.mx-auto}

# Berechnung von Tagen zwischen Daten für Finanzanwendungen

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200} 

Der Datumsmodus des Finanzrechners ist ein leistungsstarkes Werkzeug für Finanzexperten, die Tage zwischen Daten berechnen oder zukünftige/vergangene Daten basierend auf einem bekannten Datum und einer Anzahl von Tagen bestimmen müssen. Dieses Tutorial führt Sie durch die effektive Nutzung des Datumsmodus, einschließlich des Verständnisses des Unterschieds zwischen der tatsächlichen und der 360-Tage-Berechnungsmethode.

## 1. Grundlagen des Datumsmodus verstehen:

Der Datumsmodus im Finanzrechner hat vier Hauptkomponenten:

**DT1:** Das erste Datum in Ihrer Berechnung.

**DT2:** Das zweite Datum in Ihrer Berechnung.

**DBD:** Tage zwischen Daten - die Anzahl der Tage zwischen DT1 und DT2.

**DAY:** Die Berechnungsmethode - entweder Tatsächlich (365-Tage-Jahr) oder 360 (30-Tage-Monate).

## 2. Aufrufen des Datumsmodus:

**Finanzrechner öffnen:**
Öffnen wir zunächst den [Finanzrechner Online](https://www.baiiplus.com/)

Drücken Sie [2nd]{.p-1 .rounded-md .bg-gray-200} und dann [DATE]{.p-1 .rounded-md .bg-gray-200} (die DATE-Funktion befindet sich über der 1-Taste). Dadurch gelangen Sie in den Datumsmodus. Es wird "DT1=" angezeigt, zusammen mit dem aktuellen Wert für DT1.

![Datumsmodus-Oberfläche](/images/calculator_date_mode.png){.mx-auto}

## 3. Navigieren zwischen DT1, DT2, DBD und DAY:

Verwenden Sie die Aufwärtspfeil- (▲) und Abwärtspfeil- (▼) Tasten, um zwischen den vier Variablen zu wechseln:

- Drücken Sie [▼]{.p-1 .rounded-md .bg-gray-200} einmal von DT1, um zu DT2 zu wechseln
- Drücken Sie [▼]{.p-1 .rounded-md .bg-gray-200} erneut, um zu DBD zu wechseln
- Drücken Sie [▼]{.p-1 .rounded-md .bg-gray-200} noch einmal, um zu DAY zu wechseln
- Verwenden Sie [▲]{.p-1 .rounded-md .bg-gray-200}, um in die entgegengesetzte Richtung zu wechseln

## 4. Daten eingeben:

Wenn DT1= oder DT2= angezeigt wird:

1. Geben Sie das Datum im Format MM-DD-YYYY ein
2. Drücken Sie [ENTER]{.p-1 .rounded-md .bg-gray-200} zur Bestätigung

**Beispiel:** Um den 15. Januar 2024 im US-Format einzugeben, tippen Sie: `01-15-2024` und drücken Sie [ENTER]{.p-1 .rounded-md .bg-gray-200}

## 5. Tage zwischen Daten berechnen (DBD):

Nachdem Sie sowohl DT1 als auch DT2 eingegeben haben:

1. Navigieren Sie mit den Pfeiltasten zu DBD
2. Drücken Sie [CPT]{.p-1 .rounded-md .bg-gray-200}, um die Anzahl der Tage zwischen den beiden Daten zu berechnen
3. Das Ergebnis wird basierend auf der aktuellen Berechnungsmethode (Tatsächlich oder 360) angezeigt

**Beispiel:** Wenn DT1 der 15.01.2024 und DT2 der 15.02.2024 ist, zeigt das Drücken von [CPT]{.p-1 .rounded-md .bg-gray-200} bei DBD 31 Tage im tatsächlichen Modus oder 30 Tage im 360-Modus an.

## 6. Tatsächliche vs. 360-Tage-Methoden verstehen:

Der BAII Plus Rechner bietet zwei Methoden zur Berechnung von Tagen zwischen Daten:

**Tatsächlich:** Verwendet den tatsächlichen Kalender mit 365 Tagen pro Jahr (366 in Schaltjahren). Dies ist die Standardkalendermethode.

**360:** Verwendet einen vereinfachten Finanzkalender mit 30 Tagen pro Monat und 360 Tagen pro Jahr. Diese Methode wird häufig in einigen Finanzberechnungen verwendet, insbesondere bei Anleihen- und Zinsberechnungen.

Um zwischen diesen Methoden zu wechseln:

1. Navigieren Sie mit den Pfeiltasten zu DAY
2. Drücken Sie [CPT]{.p-1 .rounded-md .bg-gray-200}, um zwischen "Tatsächlich" und "360" zu wechseln

Alternativ können Sie auf dem DAY-Bildschirm [2nd]{.p-1 .rounded-md .bg-gray-200} + [ENTER]{.p-1 .rounded-md .bg-gray-200} drücken, um zwischen den Methoden zu wechseln.

## 7. Zukünftige oder vergangene Daten berechnen:

Im tatsächlichen Modus können Sie ein zukünftiges oder vergangenes Datum basierend auf einem bekannten Datum und einer Anzahl von Tagen berechnen:

**Um DT1 zu berechnen (vergangenes Datum):**
1. Geben Sie DT2 ein (das bekannte Datum)
2. Geben Sie DBD ein (die Anzahl der Tage)
3. Navigieren Sie zu DT1
4. Drücken Sie [CPT]{.p-1 .rounded-md .bg-gray-200}, um das Datum zu berechnen, das DBD Tage vor DT2 liegt

**Um DT2 zu berechnen (zukünftiges Datum):**
1. Geben Sie DT1 ein (das bekannte Datum)
2. Geben Sie DBD ein (die Anzahl der Tage)
3. Navigieren Sie zu DT2
4. Drücken Sie [CPT]{.p-1 .rounded-md .bg-gray-200}, um das Datum zu berechnen, das DBD Tage nach DT1 liegt

**Hinweis:** Im 360-Modus funktioniert die CPT-Funktion nicht zur Berechnung von DT1 oder DT2.

## 8. Wichtige Hinweise zum 360-Tage-Modus:

Bei Verwendung der 360-Tage-Berechnungsmethode:

- Jeder Monat wird als genau 30 Tage behandelt
- Das Jahr wird als genau 360 Tage behandelt
- Wenn DT1 und DT2 dasselbe Datum sind, gibt DBD 0 zurück

## 9. Praktische Anwendungen:

Der Datumsmodus ist besonders nützlich für:

- Anleiheberechnungen, bei denen Sie Tage zwischen Emission und Fälligkeit bestimmen müssen
- Zinsabgrenzungsberechnungen
- Projektzeitplanung
- Kreditlaufzeitberechnungen
- Finanzberichterstattung, bei der spezifische Tageszählungen erforderlich sind

Durch die Beherrschung des Datumsmodus in Ihrem Finanzrechner können Sie genaue datumsbasierte Berechnungen durchführen, die für viele Finanzanwendungen, von der Anleihebewertung bis zu Zinsberechnungen, unerlässlich sind. 