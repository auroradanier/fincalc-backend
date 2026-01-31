---
title: Explicaciones del Valor Temporal del Dinero
description: Explicaciones de los diferentes tipos de cálculo del valor temporal del dinero
---

## Valor Presente (VP)

**Valor Presente (VP)** es el valor actual de una suma futura de dinero o una serie de pagos, dado un tipo de rendimiento específico.

El VP responde a la pregunta: *"¿Cuánto necesito invertir hoy para alcanzar mi objetivo futuro?"* o *"¿Cuál es el valor actual de mis pagos futuros?"*

La fórmula para calcular el VP con solo un valor futuro es:

$$
VP = \frac{VF}{(1 + r)^n}
$$

Si hay pagos periódicos (PMT) involucrados, la fórmula se amplía a:

$$
VP = \frac{VF}{(1 + r)^n} + PMT \times \frac{(1+r)^n - 1}{r(1+r)^n}
$$

Donde:
- VP = Valor Presente
- VF = Valor Futuro
- PMT = Pago por período
- r = Tasa de interés por período
- n = Número de períodos

## Valor Futuro (VF)

**Valor Futuro (VF)** representa el valor de un activo o efectivo en una fecha específica en el futuro, basado en una tasa de crecimiento asumida.

El VF responde a la pregunta: *"¿Cuánto valdrá mi inversión en el futuro?"* o *"¿Cuál será el valor futuro de mis pagos regulares?"*

La fórmula para calcular el VF con solo una inversión inicial es:

$$
VF = VP \times (1 + r)^n
$$

Si hay pagos periódicos (PMT) involucrados, la fórmula se amplía a:

$$
VF = VP \times (1 + r)^n + PMT \times \frac{(1+r)^n - 1}{r}
$$

Donde:
- VF = Valor Futuro
- VP = Valor Presente
- PMT = Pago por período
- r = Tasa de interés por período
- n = Número de períodos

## Pago (PMT)

**Pago (PMT)** es el monto del pago periódico en una anualidad.

PMT responde a la pregunta: *"¿Cuánto necesito pagar cada período para liquidar un préstamo?"* o *"¿Cuánto debo ahorrar regularmente para alcanzar mi objetivo?"*

La fórmula para calcular PMT con un valor presente (como un monto de préstamo) es:

$$
PMT = \frac{VP \times r \times (1 + r)^n}{(1 + r)^n - 1}
$$

Si también hay un objetivo de valor futuro, la fórmula se amplía a:

$$
PMT = \frac{VP \times r \times (1 + r)^n - VF \times r}{(1 + r)^n - 1}
$$

Donde:
- PMT = Pago por período
- VP = Valor Presente
- VF = Valor Futuro
- r = Tasa de interés por período
- n = Número de períodos

## Número de Períodos (N)

**Número de Períodos (N)** representa el número total de períodos de capitalización en una inversión o préstamo.

N responde a la pregunta: *"¿Cuánto tiempo tomará alcanzar mi objetivo financiero?"* o *"¿Cuántos pagos se necesitarán para liquidar mi préstamo?"*

La fórmula para calcular N sin pagos periódicos es:

$$
N = \frac{\ln(VF / VP)}{\ln(1 + r)}
$$

Cuando hay pagos involucrados, el cálculo se vuelve más complejo y típicamente requiere métodos numéricos para resolverse:

$$
VP(1+r)^N + PMT\frac{(1+r)^N-1}{r} = VF
$$

Donde:
- N = Número de períodos
- VF = Valor Futuro
- VP = Valor Presente
- PMT = Pago por período
- r = Tasa de interés por período
- ln = Logaritmo natural

## Tasa de Interés (I/A)

**Tasa de Interés (I/A)** es la tasa de interés anual de una inversión o préstamo, expresada como porcentaje.

I/A responde a la pregunta: *"¿Qué tasa de rendimiento estoy obteniendo en mi inversión?"* o *"¿Cuál es la tasa de interés de mi préstamo?"*

La fórmula para calcular I/A implica encontrar la tasa r que satisface la ecuación:

$$
VP(1+r)^N + PMT\frac{(1+r)^N-1}{r} = VF
$$

Esta ecuación típicamente requiere métodos de iteración para resolver r cuando PMT está involucrado.

Donde:
- I/A = Tasa de interés anual
- VF = Valor Futuro
- VP = Valor Presente
- PMT = Pago por período
- N = Número de períodos

## Frecuencia de Capitalización

La frecuencia de capitalización afecta cómo se acumula el interés con el tiempo. Una capitalización más frecuente generalmente resulta en tasas de interés efectivas más altas. Los cálculos anteriores asumen que la frecuencia de pago coincide con la frecuencia de capitalización, pero las fórmulas pueden ajustarse cuando estas frecuencias difieren. 