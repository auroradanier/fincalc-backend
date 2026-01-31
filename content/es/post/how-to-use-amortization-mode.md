---
title: Cómo usar el modo de amortización en la calculadora BAII Plus
description: La amortización es un concepto financiero crucial que muestra el desglose de cada pago de un préstamo en principal e intereses. Este tutorial le guiará a través del uso de las funciones de amortización de la BA II Plus.
image: /images/post_amortization.jpg
tags: [tvm, financial calculator, cfa, frm]
datePublished: "2024-11-24"
schemaOrg:
  - "@type": "TechArticle"
    headline: "Cómo usar el modo de amortización en la calculadora BAII Plus"
    description: "La amortización es un concepto financiero crucial que muestra el desglose de cada pago de un préstamo en principal e intereses. Este tutorial le guiará a través del uso de las funciones de amortización de la BA II Plus."
    about: {
      "@type": "Thing",
      "name": "Amortización de Préstamos",
      "description": "Cálculos financieros para analizar calendarios de pago de préstamos y desglose de intereses/principal"
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
      "@id": "https://baiiplus.com/es/post/how-to-use-amortization-mode"
    proficiencyLevel: "Intermediate"
    dependencies: "Calculadora Financiera BAII Plus"
    inLanguage: "es"
    step:
      - "@type": "HowToStep"
        name: "Acceder al Modo Amortización"
        text: "Presione [2nd] luego [PV] para entrar en modo AMORT"
      - "@type": "HowToStep"
        name: "Ingresar Parámetros del Préstamo"
        text: "Ingrese el monto del préstamo, tasa de interés, plazo y pago"
      - "@type": "HowToStep"
        name: "Establecer Período de Amortización"
        text: "Ingrese P1 (primer pago) y P2 (último pago) del período a analizar"
      - "@type": "HowToStep"
        name: "Ver Resultados"
        text: "Presione [CPT] para ver saldo, principal pagado e intereses pagados"
---

![Valor temporal del dinero](/images/post_amortization.jpg){.mx-auto}

# Cómo usar el modo de amortización en la calculadora BAII Plus

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200}

La amortización muestra el desglose de cada pago de un préstamo en principal e intereses. Este tutorial le guiará a través del uso de las funciones de amortización de la BA II Plus.

## I. Accediendo al Modo de Amortización:

Primero abramos la [BA II Plus Online](https://www.baiiplus.com/) como referencia:

Presione [2nd]{.p-1 .rounded-md .bg-gray-200} y luego [PV]{.p-1 .rounded-md .bg-gray-200}: Esto accede a la función AMORT.

![Calculadora BA II Plus](/images/amortization.png){.mx-auto}

## II. Ingresando los Datos Necesarios:

Antes de usar la función AMORT, debe ingresar los parámetros clave del préstamo. Estos son los mismos valores que usaría para un cálculo del Valor Temporal del Dinero (TVM):

- N (Número de Pagos): Número total de pagos durante la vida del préstamo.
- I/Y (Tasa de Interés Anual): Tasa de interés anual (como porcentaje). Importante: Ingrese la tasa anual, incluso si los pagos son mensuales. La calculadora manejará la conversión.
- PV (Valor Presente): El monto del préstamo (principal). Ingréselo como número negativo ya que representa dinero que sale.
- PMT (Pago): El monto del pago periódico. Ingréselo como número positivo.
- FV (Valor Futuro): Usualmente 0 para un préstamo estándar (el saldo del préstamo es cero al final).

## III. Usando la Función AMORT:

Una vez que sus variables TVM están ingresadas, puede acceder a las funciones de amortización:

P1 (Número del Primer Pago): El primer pago en el período que está analizando.
P2 (Número del Último Pago): El último pago en el período que está analizando.

- Ejemplo:

Supongamos que tiene una hipoteca de 200.000€ a 30 años con una tasa de interés anual del 6%, con pagos mensuales. Queremos averiguar el principal y los intereses pagados durante el primer año (pagos 1-12).

**Ingresar Variables TVM:**
* [N]{.p-1 .rounded-md .bg-gray-200}: 360 (30 años * 12 pagos mensuales)
* [I/Y]{.p-1 .rounded-md .bg-gray-200}: 6 (tasa de interés anual)
* [PV]{.p-1 .rounded-md .bg-gray-200}: 200000 (monto del préstamo)
* [P/Y]{.p-1 .rounded-md .bg-gray-200}: 12 (12 períodos por año)
* Presione [CPT] y luego [PMT]. Debería obtener aproximadamente 1.199,10€

**Ingresar Período de Amortización:**
Presione [2nd]{.p-1 .rounded-md .bg-gray-200} y luego [PV]{.p-1 .rounded-md .bg-gray-200} para entrar en modo AMORT.
* [P1]{.p-1 .rounded-md .bg-gray-200}: 1 (primer pago del año)
* [P2]{.p-1 .rounded-md .bg-gray-200}: 12 (último pago del año)
* Calcular Amortización: Presione [CPT]{.p-1 .rounded-md .bg-gray-200}

Luego presione la flecha hacia abajo para mostrar los valores
* [BAL]{.p-1 .rounded-md .bg-gray-200}: 197.543,99 Muestra el saldo del préstamo después del pago P2 (después del pago 12)
* [PRN]{.p-1 .rounded-md .bg-gray-200}: -2.456,01 Muestra el total de principal pagado durante los pagos P1 a P2 (primer año)
* [INTP]{.p-1 .rounded-md .bg-gray-200}: -11.933,19 Muestra el total de intereses pagados durante los pagos P1 a P2 (primer año)

**Interpretando los Resultados:**

En el ejemplo anterior, obtendrá (los valores aproximados pueden variar ligeramente según la configuración de su calculadora):

BAL: El saldo restante del préstamo después del pago 12.
INT: El total de intereses pagados durante el primer año.
PRN: El total de principal pagado durante el primer año.

Cambiando los valores de P1 y P2, puede analizar cualquier período dentro de la vida del préstamo. Por ejemplo, para analizar los pagos 25-36, ingresaría P1 = 25 y P2 = 36.

## IV. Limpiando la Función AMORT:

Después de terminar con los cálculos de amortización, es buena práctica limpiar la memoria de la función AMORT. Puede hacer esto presionando [refresh]{.p-1 .rounded-md .bg-gray-200} en la esquina inferior derecha. Esto no borrará sus variables TVM.

Este tutorial proporciona una guía completa para utilizar la función de amortización en su calculadora BA II Plus. Recuerde practicar con diferentes escenarios para volverse competente en el uso de esta valiosa herramienta financiera. Recuerde siempre verificar sus entradas para evitar errores en sus cálculos. 