---
title: Erklärungen zum Zeitwert des Geldes
description: Erklärungen zu verschiedenen Berechnungstypen des Zeitwerts des Geldes
---

## Barwert (BW)

**Barwert (BW)** ist der aktuelle Wert einer zukünftigen Geldsumme oder einer Reihe von Zahlungen bei einer bestimmten Rendite.

Der BW beantwortet die Frage: *"Wie viel muss ich heute investieren, um mein zukünftiges Ziel zu erreichen?"* oder *"Was ist der aktuelle Wert meiner zukünftigen Zahlungen?"*

Die Formel zur Berechnung des BW mit nur einem Endwert ist:

$$
BW = \frac{EW}{(1 + r)^n}
$$

Wenn regelmäßige Zahlungen (ZLG) beteiligt sind, erweitert sich die Formel zu:

$$
BW = \frac{EW}{(1 + r)^n} + ZLG \times \frac{(1+r)^n - 1}{r(1+r)^n}
$$

Wobei:
- BW = Barwert
- EW = Endwert
- ZLG = Zahlung pro Periode
- r = Zinssatz pro Periode
- n = Anzahl der Perioden

## Endwert (EW)

**Endwert (EW)** repräsentiert den Wert eines Vermögenswerts oder von Bargeld zu einem bestimmten zukünftigen Zeitpunkt, basierend auf einer angenommenen Wachstumsrate.

Der EW beantwortet die Frage: *"Wie viel wird meine Investition in der Zukunft wert sein?"* oder *"Was wird der zukünftige Wert meiner regelmäßigen Zahlungen sein?"*

Die Formel zur Berechnung des EW mit nur einer Anfangsinvestition ist:

$$
EW = BW \times (1 + r)^n
$$

Wenn regelmäßige Zahlungen (ZLG) beteiligt sind, erweitert sich die Formel zu:

$$
EW = BW \times (1 + r)^n + ZLG \times \frac{(1+r)^n - 1}{r}
$$

Wobei:
- EW = Endwert
- BW = Barwert
- ZLG = Zahlung pro Periode
- r = Zinssatz pro Periode
- n = Anzahl der Perioden

## Zahlung (ZLG)

**Zahlung (ZLG)** ist der periodische Zahlungsbetrag in einer Annuität.

ZLG beantwortet die Frage: *"Wie viel muss ich in jeder Periode zahlen, um einen Kredit abzuzahlen?"* oder *"Wie viel sollte ich regelmäßig sparen, um mein Ziel zu erreichen?"*

Die Formel zur Berechnung von ZLG mit einem Barwert (wie einem Kreditbetrag) ist:

$$
ZLG = \frac{BW \times r \times (1 + r)^n}{(1 + r)^n - 1}
$$

Wenn auch ein Endwertziel vorhanden ist, erweitert sich die Formel zu:

$$
ZLG = \frac{BW \times r \times (1 + r)^n - EW \times r}{(1 + r)^n - 1}
$$

Wobei:
- ZLG = Zahlung pro Periode
- BW = Barwert
- EW = Endwert
- r = Zinssatz pro Periode
- n = Anzahl der Perioden

## Anzahl der Perioden (N)

**Anzahl der Perioden (N)** repräsentiert die Gesamtzahl der Zinsperioden in einer Investition oder einem Kredit.

N beantwortet die Frage: *"Wie lange wird es dauern, bis ich mein finanzielles Ziel erreiche?"* oder *"Wie viele Zahlungen werden benötigt, um meinen Kredit abzuzahlen?"*

Die Formel zur Berechnung von N ohne regelmäßige Zahlungen ist:

$$
N = \frac{\ln(EW / BW)}{\ln(1 + r)}
$$

Wenn Zahlungen beteiligt sind, wird die Berechnung komplexer und erfordert typischerweise numerische Methoden zur Lösung:

$$
BW(1+r)^N + ZLG\frac{(1+r)^N-1}{r} = EW
$$

Wobei:
- N = Anzahl der Perioden
- EW = Endwert
- BW = Barwert
- ZLG = Zahlung pro Periode
- r = Zinssatz pro Periode
- ln = Natürlicher Logarithmus

## Zinssatz (Z/J)

**Zinssatz (Z/J)** ist der jährliche Zinssatz einer Investition oder eines Kredits, ausgedrückt als Prozentsatz.

Z/J beantwortet die Frage: *"Welche Rendite erhalte ich auf meine Investition?"* oder *"Wie hoch ist der Zinssatz meines Kredits?"*

Die Formel zur Berechnung von Z/J beinhaltet das Finden des Zinssatzes r, der die Gleichung erfüllt:

$$
BW(1+r)^N + ZLG\frac{(1+r)^N-1}{r} = EW
$$

Diese Gleichung erfordert typischerweise Iterationsmethoden zur Lösung für r, wenn ZLG beteiligt ist.

Wobei:
- Z/J = Jährlicher Zinssatz
- EW = Endwert
- BW = Barwert
- ZLG = Zahlung pro Periode
- N = Anzahl der Perioden

## Zinsperioden

Die Häufigkeit der Zinszahlung beeinflusst, wie sich Zinsen im Laufe der Zeit ansammeln. Häufigere Verzinsung führt in der Regel zu höheren effektiven Zinssätzen. Die obigen Berechnungen setzen voraus, dass die Zahlungsfrequenz mit der Zinsfrequenz übereinstimmt, aber die Formeln können angepasst werden, wenn diese Frequenzen unterschiedlich sind. 