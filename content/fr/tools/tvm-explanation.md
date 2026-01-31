---
title: Explications sur la Valeur Temporelle de l'Argent
description: Explications des différents types de calcul de la valeur temporelle de l'argent
---

## Valeur Présente (VP)

**Valeur Présente (VP)** est la valeur actuelle d'une somme future d'argent ou d'une série de paiements, compte tenu d'un taux de rendement spécifié.

La VP répond à la question : *« Combien dois-je investir aujourd'hui pour atteindre mon objectif futur ? »* ou *« Quelle est la valeur actuelle de mes paiements futurs ? »*

La formule pour calculer la VP avec seulement une valeur future est :

$$
VP = \frac{VF}{(1 + r)^n}
$$

Si des paiements périodiques (PMT) sont impliqués, la formule s'étend à :

$$
VP = \frac{VF}{(1 + r)^n} + PMT \times \frac{(1+r)^n - 1}{r(1+r)^n}
$$

Où :
- VP = Valeur Présente
- VF = Valeur Future
- PMT = Paiement par période
- r = Taux d'intérêt par période
- n = Nombre de périodes

## Valeur Future (VF)

**Valeur Future (VF)** représente la valeur d'un actif ou de liquidités à une date future spécifiée, basée sur un taux de croissance assumé.

La VF répond à la question : *« Combien vaudra mon investissement à l'avenir ? »* ou *« Quelle sera la valeur future de mes paiements réguliers ? »*

La formule pour calculer la VF avec seulement un investissement initial est :

$$
VF = VP \times (1 + r)^n
$$

Si des paiements périodiques (PMT) sont impliqués, la formule s'étend à :

$$
VF = VP \times (1 + r)^n + PMT \times \frac{(1+r)^n - 1}{r}
$$

Où :
- VF = Valeur Future
- VP = Valeur Présente
- PMT = Paiement par période
- r = Taux d'intérêt par période
- n = Nombre de périodes

## Paiement (PMT)

**Paiement (PMT)** est le montant du paiement périodique dans une annuité.

PMT répond à la question : *« Combien dois-je payer à chaque période pour rembourser un prêt ? »* ou *« Combien dois-je épargner régulièrement pour atteindre mon objectif ? »*

La formule pour calculer PMT avec une valeur présente (comme un montant de prêt) est :

$$
PMT = \frac{VP \times r \times (1 + r)^n}{(1 + r)^n - 1}
$$

S'il y a également un objectif de valeur future, la formule s'étend à :

$$
PMT = \frac{VP \times r \times (1 + r)^n - VF \times r}{(1 + r)^n - 1}
$$

Où :
- PMT = Paiement par période
- VP = Valeur Présente
- VF = Valeur Future
- r = Taux d'intérêt par période
- n = Nombre de périodes

## Nombre de Périodes (N)

**Nombre de Périodes (N)** représente le nombre total de périodes de capitalisation dans un investissement ou un prêt.

N répond à la question : *« Combien de temps faudra-t-il pour atteindre mon objectif financier ? »* ou *« Combien de paiements seront nécessaires pour rembourser mon prêt ? »*

La formule pour calculer N sans paiements périodiques est :

$$
N = \frac{\ln(VF / VP)}{\ln(1 + r)}
$$

Lorsque des paiements sont impliqués, le calcul devient plus complexe et nécessite généralement des méthodes numériques pour être résolu :

$$
VP(1+r)^N + PMT\frac{(1+r)^N-1}{r} = VF
$$

Où :
- N = Nombre de périodes
- VF = Valeur Future
- VP = Valeur Présente
- PMT = Paiement par période
- r = Taux d'intérêt par période
- ln = Logarithme naturel

## Taux d'Intérêt (I/A)

**Taux d'Intérêt (I/A)** est le taux d'intérêt annuel d'un investissement ou d'un prêt, exprimé en pourcentage.

I/A répond à la question : *« Quel taux de rendement est-ce que j'obtiens sur mon investissement ? »* ou *« Quel est le taux d'intérêt de mon prêt ? »*

La formule pour calculer I/A implique de trouver le taux r qui satisfait l'équation :

$$
VP(1+r)^N + PMT\frac{(1+r)^N-1}{r} = VF
$$

Cette équation nécessite généralement des méthodes d'itération pour résoudre r lorsque PMT est impliqué.

Où :
- I/A = Taux d'intérêt annuel
- VF = Valeur Future
- VP = Valeur Présente
- PMT = Paiement par période
- N = Nombre de périodes

## Fréquence de Capitalisation

La fréquence de capitalisation affecte comment les intérêts s'accumulent avec le temps. Une capitalisation plus fréquente résulte généralement en des taux d'intérêt effectifs plus élevés. Les calculs ci-dessus supposent que la fréquence de paiement correspond à la fréquence de capitalisation, mais les formules peuvent être ajustées lorsque ces fréquences diffèrent. 