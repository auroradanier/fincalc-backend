---
title: Erklärungen zur Cashflow-Analyse
description: Erklärungen verschiedener Methoden zur Cashflow-Berechnung
---

## Kapitalwert (NPV)

**Der Kapitalwert (NPV)** ist die Differenz zwischen dem Barwert der Einzahlungen und dem Barwert der Auszahlungen über einen bestimmten Zeitraum.

Der NPV beantwortet die Frage: *"Lohnt sich diese Investition in heutigen Dollar?"* oder *"Was ist der heutige Wert meiner zukünftigen Cashflows?"*

Die Formel zur Berechnung des NPV lautet:

$$
NPV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t}
$$

Wobei:
- NPV = Kapitalwert (Net Present Value)
- CF_t = Cashflow zum Zeitpunkt t
- r = Diskontierungssatz (erforderliche Rendite)
- n = Gesamtzahl der Perioden
- t = Zeitperiode

Ein positiver NPV deutet auf eine potenziell profitable Investition hin, während ein negativer NPV darauf hindeutet, dass die Investition zu einem Nettoverlust führen könnte.

**Beispiel:**
> Betrachten Sie eine Investition, die eine Anfangsinvestition von 10.000 $ (negativer Cashflow) erfordert und voraussichtlich 4.000 $, 4.000 $ und 5.000 $ in den nächsten drei Jahren generieren wird. Bei einem Diskontierungssatz von 10%:
>
> $$
> NPV = -10.000 + \frac{4.000}{(1+0,1)^1} + \frac{4.000}{(1+0,1)^2} + \frac{5.000}{(1+0,1)^3} = 679,12
> $$
>
> Da der NPV positiv ist, wird diese Investition voraussichtlich profitabel sein.

## Interner Zinsfuß (IRR)

**Der Interne Zinsfuß (IRR)** ist der Diskontierungssatz, bei dem der Kapitalwert aller Cashflows gleich null ist.

Der IRR beantwortet die Frage: *"Wie hoch ist die Rendite meiner Investition?"* oder *"Welchen Zinssatz erziele ich effektiv?"*

Die Formel zur Berechnung des IRR besteht darin, den Zinssatz r zu finden, der die Gleichung erfüllt:

$$
\sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} = 0
$$

Wobei:
- CF_t = Cashflow zum Zeitpunkt t
- r = Interner Zinsfuß
- n = Gesamtzahl der Perioden
- t = Zeitperiode

Der IRR kann zur Bewertung mehrerer potenzieller Investitionen oder Projekte verwendet werden. Höhere IRR-Werte deuten auf wünschenswertere Investitionen hin, vorausgesetzt, alle anderen Faktoren sind gleich.

**Beispiel:**
> Unter Verwendung der gleichen Investition wie im NPV-Beispiel: Anfangsinvestition von 10.000 $ mit Erträgen von 4.000 $, 4.000 $ und 5.000 $ über drei Jahre. Der IRR wäre der Zinssatz r, der erfüllt:
>
> $$
> -10.000 + \frac{4.000}{(1+r)^1} + \frac{4.000}{(1+r)^2} + \frac{5.000}{(1+r)^3} = 0
> $$
>
> Die Lösung dieser Gleichung ergibt einen IRR von etwa 14,3%, was bedeutet, dass die Investition eine jährliche Rendite von 14,3% bietet.

## Modifizierter Interner Zinsfuß (MIRR)

**Der Modifizierte Interne Zinsfuß (MIRR)** verbessert den IRR, indem er die Annahme des Reinvestitionssatzes und die Möglichkeit mehrerer IRRs berücksichtigt.

Der MIRR beantwortet die Frage: *"Wie hoch ist meine Rendite, wenn negative Cashflows zu einem Finanzierungssatz finanziert und positive Cashflows zu einem Reinvestitionssatz reinvestiert werden?"*

Die Formel zur Berechnung des MIRR lautet:

$$
MIRR = \sqrt[n]{\frac{ZW(\text{positive Cashflows, Reinvestitionssatz})}{BW(\text{negative Cashflows, Finanzierungssatz})}} - 1
$$

Oder anders ausgedrückt:

$$
MIRR = \left(\frac{\sum_{t=0}^{n} CF_t^+ \times (1+r_r)^{n-t}}{-\sum_{t=0}^{n} \frac{CF_t^-}{(1+r_f)^t}}\right)^{\frac{1}{n}} - 1
$$

Wobei:
- MIRR = Modifizierter Interner Zinsfuß
- CF_t^+ = Positive Cashflows zum Zeitpunkt t
- CF_t^- = Negative Cashflows zum Zeitpunkt t
- r_r = Reinvestitionssatz
- r_f = Finanzierungssatz
- n = Gesamtzahl der Perioden
- t = Zeitperiode

**Beispiel:**
> Fortsetzung unseres Investitionsszenarios, wenn der Reinvestitionssatz 8% und der Finanzierungssatz 10% beträgt:
>
> Zukunftswert der positiven Cashflows: 4.000 $(1+0,08)^2 + 4.000 $(1+0,08)^1 + 5.000 $ = 13.648 $
>
> Barwert der negativen Cashflows: 10.000 $
>
> $$
> MIRR = \left(\frac{13.648}{10.000}\right)^{\frac{1}{3}} - 1 = 10,9\%
> $$
>
> Dieser MIRR von 10,9% ist niedriger als der IRR von 14,3%, was die realistischere Annahme widerspiegelt, dass Erträge zu 8% statt zum IRR reinvestiert werden.

## Nettobarwert (NFV)

**Der Nettobarwert (NFV)** stellt den Wert aller Cashflows am Ende der Investitionsperiode dar, unter der Annahme, dass sie zu einem bestimmten Zinssatz aufgezinst werden.

Der NFV beantwortet die Frage: *"Was wird der zukünftige Wert aller meiner Cashflows am Ende des Investitionshorizonts sein?"*

Die Formel zur Berechnung des NFV lautet:

$$
NFV = \sum_{t=0}^{n} CF_t \times (1+r)^{n-t}
$$

Wobei:
- NFV = Nettobarwert (Net Future Value)
- CF_t = Cashflow zum Zeitpunkt t
- r = Zinssatz
- n = Gesamtzahl der Perioden
- t = Zeitperiode

**Beispiel:**
> Unter Verwendung unseres Investitionsszenarios mit einem Zinssatz von 10%:
>
> $$
> NFV = -10.000 \times (1+0,1)^3 + 4.000 \times (1+0,1)^2 + 4.000 \times (1+0,1)^1 + 5.000 = 900,40
> $$
>
> Dies bedeutet, dass am Ende der 3-Jahres-Periode der Nettowert aller Cashflows, einschließlich der Anfangsinvestition und aller zu 10% aufgezinsten Erträge, 900,40 $ betragen würde.

## Amortisationszeit

**Die Amortisationszeit** ist die Zeit, die benötigt wird, um die Anfangsinvestition in einem Projekt zurückzugewinnen.

Die Amortisationszeit beantwortet die Frage: *"Wie lange dauert es, bis ich mein Geld zurückbekomme?"*

Für unregelmäßige Cashflows lautet die Formel:

$$
\text{Amortisationszeit} = A + \frac{B}{C}
$$

Wobei:
- A = Letzte Periode mit negativem kumulierten Cashflow
- B = Absolutwert des kumulierten Cashflows am Ende der Periode A
- C = Cashflow während der Periode nach A

Eine kürzere Amortisationszeit bedeutet, dass die Investition liquider und weniger riskant ist.

**Beispiel:**
> Für unsere Investition mit einer Anfangsinvestition von 10.000 $ und jährlichen Erträgen von 4.000 $, 4.000 $ und 5.000 $:
>
> Jahr 0: -10.000 $  
> Jahr 1: -6.000 $ (10.000 $ - 4.000 $)  
> Jahr 2: -2.000 $ (6.000 $ - 4.000 $)  
> Jahr 3: +3.000 $ (2.000 $ + 5.000 $)  
>
> Die letzte Periode mit negativem kumulierten Cashflow ist Jahr 2, mit einem verbleibenden Defizit von 2.000 $. Der Cashflow der nächsten Periode beträgt 5.000 $.
>
> $$
> \text{Amortisationszeit} = 2 + \frac{2.000}{5.000} = 2,4 \text{ Jahre}
> $$
>
> Es würde also 2,4 Jahre dauern, um die Anfangsinvestition zurückzugewinnen.

## Diskontierte Amortisationszeit

**Die diskontierte Amortisationszeit** ähnelt der regulären Amortisationszeit, verwendet jedoch diskontierte Cashflows statt nominaler Cashflows.

Die diskontierte Amortisationszeit beantwortet die Frage: *"Wie lange dauert es, um meine Investition in Barwertbegriffen zurückzugewinnen?"*

Die Berechnung besteht darin, den Punkt zu finden, an dem die kumulierten diskontierten Cashflows positiv werden:

$$
\sum_{t=0}^{DAZ} \frac{CF_t}{(1+r)^t} = 0
$$

Wobei:
- DAZ = Diskontierte Amortisationszeit
- CF_t = Cashflow zum Zeitpunkt t
- r = Diskontierungssatz
- t = Zeitperiode

**Beispiel:**
> Für unser Beispiel mit einem Diskontierungssatz von 10%:
>
> Jahr 0: -10.000 $  
> Jahr 1: 4.000 $ ÷ 1,10 = 3.636,36 $  
> Jahr 2: 4.000 $ ÷ 1,21 = 3.305,79 $  
> Jahr 3: 5.000 $ ÷ 1,33 = 3.759,40 $  
>
> Kumulierte diskontierte Cashflows:  
> Jahr 0: -10.000 $  
> Jahr 1: -6.363,64 $  
> Jahr 2: -3.057,85 $  
> Jahr 3: +701,55 $  
>
> Die letzte Periode mit negativem kumulierten diskontierten Cashflow ist Jahr 2, mit einem verbleibenden Defizit von 3.057,85 $. Der diskontierte Cashflow der nächsten Periode beträgt 3.759,40 $.
>
> $$
> \text{Diskontierte Amortisationszeit} = 2 + \frac{3.057,85}{3.759,40} = 2,81 \text{ Jahre}
> $$
>
> Es würde also 2,81 Jahre dauern, um die Anfangsinvestition in Barwertbegriffen zurückzugewinnen, was länger ist als die reguläre Amortisationszeit von 2,4 Jahren.

## Häufigkeit in Cashflows

In der Cashflow-Analyse bezieht sich die Häufigkeit darauf, wie oft ein bestimmter Cashflow in einem bestimmten Zeitraum wiederholt wird. Dies ist besonders nützlich, wenn die gleiche Zahlung mehrmals hintereinander erfolgt, was eine prägnantere Darstellung wiederkehrender Cashflows ermöglicht.

Wenn ein Cashflow eine Häufigkeit größer als 1 hat, berücksichtigen die Berechnungsformeln diese Wiederholung durch:

$$
CF_{\text{Gesamt}} = CF_{\text{Betrag}} \times \text{Häufigkeit}
$$

Dieser Häufigkeitsfaktor ist in alle oben diskutierten Cashflow-Berechnungen integriert.

**Beispiel:**
> Anstatt drei identische jährliche Zahlungen von 5.000 $ in den Perioden 1, 2 und 3 einzugeben, könnten Sie einen einzelnen Cashflow von 5.000 $ mit einer Häufigkeit von 3 in Periode 1 eingeben. Der Rechner würde dies dann wie folgt behandeln:
>
> Periode 1: 5.000 $  
> Periode 2: 5.000 $  
> Periode 3: 5.000 $  
>
> Dies vereinfacht die Dateneingabe und macht den Cashflow-Zeitplan lesbarer, insbesondere für komplexe Investitionsszenarien mit mehreren wiederkehrenden Zahlungen. 