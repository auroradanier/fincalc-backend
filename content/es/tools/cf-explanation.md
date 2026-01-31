---
title: Explicaciones sobre el análisis de flujo de efectivo
description: Explicaciones de los diferentes métodos de cálculo de flujo de efectivo
---

## Valor Presente Neto (VPN)

**El Valor Presente Neto (VPN)** es la diferencia entre el valor presente de las entradas de efectivo y el valor presente de las salidas de efectivo durante un período determinado.

El VPN responde a la pregunta: *"¿Vale la pena realizar esta inversión en dólares de hoy?"* o *"¿Cuál es el valor presente de mis flujos de efectivo futuros?"*

La fórmula para calcular el VPN es:

$$
VPN = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t}
$$

Donde:
- VPN = Valor Presente Neto
- CF_t = Flujo de efectivo en el período t
- r = Tasa de descuento (tasa de rendimiento requerida)
- n = Número total de períodos
- t = Período

Un VPN positivo indica una inversión potencialmente rentable, mientras que un VPN negativo sugiere que la inversión podría resultar en una pérdida neta.

**Ejemplo:**
> Considere una inversión que requiere un desembolso inicial de $10,000 (flujo de efectivo negativo) y se espera que genere $4,000, $4,000 y $5,000 en los próximos tres años. Con una tasa de descuento del 10%:
>
> $$
> VPN = -10,000 + \frac{4,000}{(1+0.1)^1} + \frac{4,000}{(1+0.1)^2} + \frac{5,000}{(1+0.1)^3} = 679.12
> $$
>
> Dado que el VPN es positivo, se espera que esta inversión sea rentable.

## Tasa Interna de Retorno (TIR)

**La Tasa Interna de Retorno (TIR)** es la tasa de descuento que hace que el valor presente neto de todos los flujos de efectivo sea igual a cero.

La TIR responde a la pregunta: *"¿Cuál es la tasa de rendimiento de mi inversión?"* o *"¿Qué tasa de interés estoy obteniendo efectivamente?"*

La fórmula para calcular la TIR implica encontrar la tasa r que satisface la ecuación:

$$
\sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} = 0
$$

Donde:
- CF_t = Flujo de efectivo en el período t
- r = Tasa Interna de Retorno
- n = Número total de períodos
- t = Período

La TIR se puede utilizar para clasificar varias inversiones o proyectos potenciales. Valores de TIR más altos indican inversiones más deseables, asumiendo que todos los demás factores son iguales.

**Ejemplo:**
> Usando la misma inversión del ejemplo del VPN: desembolso inicial de $10,000 con retornos de $4,000, $4,000 y $5,000 durante tres años. La TIR sería la tasa r que satisface:
>
> $$
> -10,000 + \frac{4,000}{(1+r)^1} + \frac{4,000}{(1+r)^2} + \frac{5,000}{(1+r)^3} = 0
> $$
>
> Resolviendo esta ecuación se obtiene una TIR de aproximadamente 14.3%, lo que significa que la inversión proporciona un retorno anual del 14.3%.

## Tasa Interna de Retorno Modificada (TIRM)

**La Tasa Interna de Retorno Modificada (TIRM)** mejora la TIR al considerar la suposición de tasa de reinversión y la posibilidad de múltiples TIR.

La TIRM responde a la pregunta: *"¿Cuál es mi tasa de retorno si los flujos de efectivo negativos se financian a una tasa de financiamiento y los flujos de efectivo positivos se reinvierten a una tasa de reinversión?"*

La fórmula para calcular la TIRM es:

$$
TIRM = \sqrt[n]{\frac{VF(\text{flujos de efectivo positivos, tasa de reinversión})}{VP(\text{flujos de efectivo negativos, tasa de financiamiento})}} - 1
$$

O expresada de manera diferente:

$$
TIRM = \left(\frac{\sum_{t=0}^{n} CF_t^+ \times (1+r_r)^{n-t}}{-\sum_{t=0}^{n} \frac{CF_t^-}{(1+r_f)^t}}\right)^{\frac{1}{n}} - 1
$$

Donde:
- TIRM = Tasa Interna de Retorno Modificada
- CF_t^+ = Flujos de efectivo positivos en el período t
- CF_t^- = Flujos de efectivo negativos en el período t
- r_r = Tasa de reinversión
- r_f = Tasa de financiamiento
- n = Número total de períodos
- t = Período

**Ejemplo:**
> Continuando con nuestro escenario de inversión, si la tasa de reinversión es del 8% y la tasa de financiamiento es del 10%:
>
> Valor futuro de los flujos de efectivo positivos: $4,000(1+0.08)^2 + $4,000(1+0.08)^1 + $5,000 = $13,648
>
> Valor presente de los flujos de efectivo negativos: $10,000
>
> $$
> TIRM = \left(\frac{13,648}{10,000}\right)^{\frac{1}{3}} - 1 = 10.9\%
> $$
>
> Esta TIRM del 10.9% es menor que la TIR del 14.3%, reflejando la suposición más realista de que los retornos se reinvierten al 8% en lugar de a la TIR.

## Valor Futuro Neto (VFN)

**El Valor Futuro Neto (VFN)** representa el valor de todos los flujos de efectivo al final del período de inversión, asumiendo que se capitalizan a una tasa de interés dada.

El VFN responde a la pregunta: *"¿Cuál será el valor futuro de todos mis flujos de efectivo al final del horizonte de inversión?"*

La fórmula para calcular el VFN es:

$$
VFN = \sum_{t=0}^{n} CF_t \times (1+r)^{n-t}
$$

Donde:
- VFN = Valor Futuro Neto
- CF_t = Flujo de efectivo en el período t
- r = Tasa de interés
- n = Número total de períodos
- t = Período

**Ejemplo:**
> Usando nuestro escenario de inversión con una tasa de interés del 10%:
>
> $$
> VFN = -10,000 \times (1+0.1)^3 + 4,000 \times (1+0.1)^2 + 4,000 \times (1+0.1)^1 + 5,000 = 900.40
> $$
>
> Esto significa que al final del período de 3 años, el valor neto de todos los flujos de efectivo, incluyendo la inversión inicial y todos los retornos capitalizados al 10%, sería de $900.40.

## Período de Recuperación

**El Período de Recuperación** es el tiempo necesario para recuperar la inversión inicial en un proyecto.

El Período de Recuperación responde a la pregunta: *"¿Cuánto tiempo tomará recuperar mi dinero?"*

Para flujos de efectivo irregulares, la fórmula es:

$$
\text{Período de Recuperación} = A + \frac{B}{C}
$$

Donde:
- A = Último período con un flujo de efectivo acumulado negativo
- B = Valor absoluto del flujo de efectivo acumulado al final del período A
- C = Flujo de efectivo durante el período después de A

Un período de recuperación más corto significa que la inversión es más líquida y menos riesgosa.

**Ejemplo:**
> Para nuestra inversión con un desembolso inicial de $10,000 y retornos anuales de $4,000, $4,000 y $5,000:
>
> Año 0: -$10,000  
> Año 1: -$6,000 ($10,000 - $4,000)  
> Año 2: -$2,000 ($6,000 - $4,000)  
> Año 3: +$3,000 ($2,000 + $5,000)  
>
> El último período con un flujo de efectivo acumulado negativo es el año 2, con un déficit restante de $2,000. El flujo de efectivo del período siguiente es de $5,000.
>
> $$
> \text{Período de Recuperación} = 2 + \frac{2,000}{5,000} = 2.4 \text{ años}
> $$
>
> Por lo tanto, tomaría 2.4 años recuperar la inversión inicial.

## Período de Recuperación Descontado

**El Período de Recuperación Descontado** es similar al período de recuperación regular pero utiliza flujos de efectivo descontados en lugar de flujos de efectivo nominales.

El Período de Recuperación Descontado responde a la pregunta: *"¿Cuánto tiempo tomará recuperar mi inversión en términos de valor presente?"*

El cálculo consiste en encontrar el punto donde los flujos de efectivo descontados acumulados se vuelven positivos:

$$
\sum_{t=0}^{PRD} \frac{CF_t}{(1+r)^t} = 0
$$

Donde:
- PRD = Período de Recuperación Descontado
- CF_t = Flujo de efectivo en el período t
- r = Tasa de descuento
- t = Período

**Ejemplo:**
> Para nuestro ejemplo con una tasa de descuento del 10%:
>
> Año 0: -$10,000  
> Año 1: $4,000 ÷ 1.10 = $3,636.36  
> Año 2: $4,000 ÷ 1.21 = $3,305.79  
> Año 3: $5,000 ÷ 1.33 = $3,759.40  
>
> Flujos de efectivo descontados acumulados:  
> Año 0: -$10,000  
> Año 1: -$6,363.64  
> Año 2: -$3,057.85  
> Año 3: +$701.55  
>
> El último período con un flujo de efectivo descontado acumulado negativo es el año 2, con un déficit restante de $3,057.85. El flujo de efectivo descontado del período siguiente es de $3,759.40.
>
> $$
> \text{Período de Recuperación Descontado} = 2 + \frac{3,057.85}{3,759.40} = 2.81 \text{ años}
> $$
>
> Por lo tanto, tomaría 2.81 años recuperar la inversión inicial en términos de valor presente, lo cual es más largo que el período de recuperación regular de 2.4 años.

## Frecuencia en los Flujos de Efectivo

En el análisis de flujos de efectivo, la frecuencia se refiere al número de veces que un flujo de efectivo particular se repite en un período dado. Esto es particularmente útil cuando el mismo pago ocurre múltiples veces en sucesión, permitiendo una representación más concisa de los flujos de efectivo recurrentes.

Cuando un flujo de efectivo tiene una frecuencia mayor que 1, las fórmulas de cálculo tienen en cuenta esta repetición mediante:

$$
CF_{\text{total}} = CF_{\text{monto}} \times \text{Frecuencia}
$$

Este factor de frecuencia se integra en todos los cálculos de flujos de efectivo discutidos anteriormente.

**Ejemplo:**
> En lugar de ingresar tres pagos anuales idénticos de $5,000 en los períodos 1, 2 y 3, podría ingresar un solo flujo de efectivo de $5,000 con una frecuencia de 3 en el período 1. La calculadora trataría esto como:
>
> Período 1: $5,000  
> Período 2: $5,000  
> Período 3: $5,000  
>
> Esto simplifica la entrada de datos y hace que la línea de tiempo de flujos de efectivo sea más legible, especialmente para escenarios de inversión complejos con múltiples pagos recurrentes. 