---
title: Explications sur l'analyse des flux de trésorerie
description: Explications des différentes méthodes de calcul des flux de trésorerie
---

## Valeur Actuelle Nette (VAN)

**La Valeur Actuelle Nette (VAN)** est la différence entre la valeur actuelle des entrées de trésorerie et la valeur actuelle des sorties de trésorerie sur une période donnée.

La VAN répond à la question : *"Cet investissement vaut-il la peine d'être réalisé en dollars d'aujourd'hui ?"* ou *"Quelle est la valeur actuelle de mes flux de trésorerie futurs ?"*

La formule pour calculer la VAN est :

$$
VAN = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t}
$$

Où :
- VAN = Valeur Actuelle Nette
- CF_t = Flux de trésorerie à la période t
- r = Taux d'actualisation (taux de rendement requis)
- n = Nombre total de périodes
- t = Période

Une VAN positive indique un investissement potentiellement rentable, tandis qu'une VAN négative suggère que l'investissement pourrait entraîner une perte nette.

**Exemple :**
> Considérons un investissement nécessitant une mise de fonds initiale de 10 000 $ (flux de trésorerie négatif) et qui devrait générer 4 000 $, 4 000 $ et 5 000 $ au cours des trois prochaines années. Avec un taux d'actualisation de 10 % :
>
> $$
> VAN = -10 000 + \frac{4 000}{(1+0,1)^1} + \frac{4 000}{(1+0,1)^2} + \frac{5 000}{(1+0,1)^3} = 679,12
> $$
>
> Comme la VAN est positive, cet investissement devrait être rentable.

## Taux de Rendement Interne (TRI)

**Le Taux de Rendement Interne (TRI)** est le taux d'actualisation qui rend la valeur actuelle nette de tous les flux de trésorerie égale à zéro.

Le TRI répond à la question : *"Quel est le taux de rendement de mon investissement ?"* ou *"Quel taux d'intérêt j'obtiens effectivement ?"*

La formule pour calculer le TRI consiste à trouver le taux r qui satisfait l'équation :

$$
\sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} = 0
$$

Où :
- CF_t = Flux de trésorerie à la période t
- r = Taux de Rendement Interne
- n = Nombre total de périodes
- t = Période

Le TRI peut être utilisé pour classer plusieurs investissements ou projets potentiels. Des valeurs de TRI plus élevées indiquent des investissements plus souhaitables, toutes choses égales par ailleurs.

**Exemple :**
> En utilisant le même investissement que dans l'exemple de la VAN : mise de fonds initiale de 10 000 $ avec des rendements de 4 000 $, 4 000 $ et 5 000 $ sur trois ans. Le TRI serait le taux r qui satisfait :
>
> $$
> -10 000 + \frac{4 000}{(1+r)^1} + \frac{4 000}{(1+r)^2} + \frac{5 000}{(1+r)^3} = 0
> $$
>
> La résolution de cette équation donne un TRI d'environ 14,3 %, ce qui signifie que l'investissement fournit un rendement annuel de 14,3 %.

## Taux de Rendement Interne Modifié (TRIM)

**Le Taux de Rendement Interne Modifié (TRIM)** améliore le TRI en tenant compte de l'hypothèse de taux de réinvestissement et de la possibilité de TRI multiples.

Le TRIM répond à la question : *"Quel est mon taux de rendement si les flux de trésorerie négatifs sont financés à un taux de financement et les flux de trésorerie positifs sont réinvestis à un taux de réinvestissement ?"*

La formule pour calculer le TRIM est :

$$
TRIM = \sqrt[n]{\frac{VF(\text{flux de trésorerie positifs, taux de réinvestissement})}{VA(\text{flux de trésorerie négatifs, taux de financement})}} - 1
$$

Ou exprimé différemment :

$$
TRIM = \left(\frac{\sum_{t=0}^{n} CF_t^+ \times (1+r_r)^{n-t}}{-\sum_{t=0}^{n} \frac{CF_t^-}{(1+r_f)^t}}\right)^{\frac{1}{n}} - 1
$$

Où :
- TRIM = Taux de Rendement Interne Modifié
- CF_t^+ = Flux de trésorerie positifs à la période t
- CF_t^- = Flux de trésorerie négatifs à la période t
- r_r = Taux de réinvestissement
- r_f = Taux de financement
- n = Nombre total de périodes
- t = Période

**Exemple :**
> En continuant avec notre scénario d'investissement, si le taux de réinvestissement est de 8 % et le taux de financement de 10 % :
>
> Valeur future des flux de trésorerie positifs : 4 000 $(1+0,08)^2 + 4 000 $(1+0,08)^1 + 5 000 $ = 13 648 $
>
> Valeur actuelle des flux de trésorerie négatifs : 10 000 $
>
> $$
> TRIM = \left(\frac{13 648}{10 000}\right)^{\frac{1}{3}} - 1 = 10,9\%
> $$
>
> Ce TRIM de 10,9 % est inférieur au TRI de 14,3 %, reflétant l'hypothèse plus réaliste que les rendements sont réinvestis à 8 % plutôt qu'au TRI.

## Valeur Future Nette (VFN)

**La Valeur Future Nette (VFN)** représente la valeur de tous les flux de trésorerie à la fin de la période d'investissement, en supposant qu'ils sont capitalisés à un taux d'intérêt donné.

La VFN répond à la question : *"Quelle sera la valeur future de tous mes flux de trésorerie à la fin de l'horizon d'investissement ?"*

La formule pour calculer la VFN est :

$$
VFN = \sum_{t=0}^{n} CF_t \times (1+r)^{n-t}
$$

Où :
- VFN = Valeur Future Nette
- CF_t = Flux de trésorerie à la période t
- r = Taux d'intérêt
- n = Nombre total de périodes
- t = Période

**Exemple :**
> En utilisant notre scénario d'investissement avec un taux d'intérêt de 10 % :
>
> $$
> VFN = -10 000 \times (1+0,1)^3 + 4 000 \times (1+0,1)^2 + 4 000 \times (1+0,1)^1 + 5 000 = 900,40
> $$
>
> Cela signifie qu'à la fin de la période de 3 ans, la valeur nette de tous les flux de trésorerie, y compris l'investissement initial et tous les rendements capitalisés à 10 %, serait de 900,40 $.

## Délai de Récupération

**Le Délai de Récupération** est le temps nécessaire pour récupérer l'investissement initial dans un projet.

Le Délai de Récupération répond à la question : *"Combien de temps faudra-t-il pour récupérer mon argent ?"*

Pour des flux de trésorerie irréguliers, la formule est :

$$
\text{Délai de Récupération} = A + \frac{B}{C}
$$

Où :
- A = Dernière période avec un flux de trésorerie cumulé négatif
- B = Valeur absolue du flux de trésorerie cumulé à la fin de la période A
- C = Flux de trésorerie pendant la période suivant A

Un délai de récupération plus court signifie que l'investissement est plus liquide et moins risqué.

**Exemple :**
> Pour notre investissement avec une mise de fonds initiale de 10 000 $ et des rendements annuels de 4 000 $, 4 000 $ et 5 000 $ :
>
> Année 0 : -10 000 $  
> Année 1 : -6 000 $ (10 000 $ - 4 000 $)  
> Année 2 : -2 000 $ (6 000 $ - 4 000 $)  
> Année 3 : +3 000 $ (2 000 $ + 5 000 $)  
>
> La dernière période avec un flux de trésorerie cumulé négatif est l'année 2, avec un déficit restant de 2 000 $. Le flux de trésorerie de la période suivante est de 5 000 $.
>
> $$
> \text{Délai de Récupération} = 2 + \frac{2 000}{5 000} = 2,4 \text{ ans}
> $$
>
> Il faudrait donc 2,4 ans pour récupérer l'investissement initial.

## Délai de Récupération Actualisé

**Le Délai de Récupération Actualisé** est similaire au délai de récupération régulier mais utilise des flux de trésorerie actualisés au lieu des flux de trésorerie nominaux.

Le Délai de Récupération Actualisé répond à la question : *"Combien de temps faudra-t-il pour récupérer mon investissement en termes de valeur actuelle ?"*

Le calcul consiste à trouver le point où les flux de trésorerie actualisés cumulés deviennent positifs :

$$
\sum_{t=0}^{DRA} \frac{CF_t}{(1+r)^t} = 0
$$

Où :
- DRA = Délai de Récupération Actualisé
- CF_t = Flux de trésorerie à la période t
- r = Taux d'actualisation
- t = Période

**Exemple :**
> Pour notre exemple avec un taux d'actualisation de 10 % :
>
> Année 0 : -10 000 $  
> Année 1 : 4 000 $ ÷ 1,10 = 3 636,36 $  
> Année 2 : 4 000 $ ÷ 1,21 = 3 305,79 $  
> Année 3 : 5 000 $ ÷ 1,33 = 3 759,40 $  
>
> Flux de trésorerie actualisés cumulés :  
> Année 0 : -10 000 $  
> Année 1 : -6 363,64 $  
> Année 2 : -3 057,85 $  
> Année 3 : +701,55 $  
>
> La dernière période avec un flux de trésorerie actualisé cumulé négatif est l'année 2, avec un déficit restant de 3 057,85 $. Le flux de trésorerie actualisé de la période suivante est de 3 759,40 $.
>
> $$
> \text{Délai de Récupération Actualisé} = 2 + \frac{3 057,85}{3 759,40} = 2,81 \text{ ans}
> $$
>
> Il faudrait donc 2,81 ans pour récupérer l'investissement initial en termes de valeur actuelle, ce qui est plus long que le délai de récupération régulier de 2,4 ans.

## Fréquence dans les Flux de Trésorerie

Dans l'analyse des flux de trésorerie, la fréquence fait référence au nombre de fois qu'un flux de trésorerie particulier se répète sur une période donnée. Ceci est particulièrement utile lorsqu'un même paiement se produit plusieurs fois de suite, permettant une représentation plus concise des flux de trésorerie récurrents.

Lorsqu'un flux de trésorerie a une fréquence supérieure à 1, les formules de calcul tiennent compte de cette répétition par :

$$
CF_{\text{total}} = CF_{\text{montant}} \times \text{Fréquence}
$$

Ce facteur de fréquence est intégré dans tous les calculs de flux de trésorerie discutés ci-dessus.

**Exemple :**
> Au lieu d'entrer trois paiements annuels identiques de 5 000 $ aux périodes 1, 2 et 3, vous pourriez entrer un seul flux de trésorerie de 5 000 $ avec une fréquence de 3 à la période 1. Le calculateur traiterait alors cela comme :
>
> Période 1 : 5 000 $  
> Période 2 : 5 000 $  
> Période 3 : 5 000 $  
>
> Cela simplifie la saisie des données et rend la chronologie des flux de trésorerie plus lisible, particulièrement pour les scénarios d'investissement complexes avec plusieurs paiements récurrents. 