---
title: How to use amortization mode in the BAII Plus calculator
description: Amortization is a crucial financial concept that shows the breakdown of each payment on a loan into principal and interest. This tutorial will guide you through using the BA II Plus's amortization functions.
image: /images/post_amortization.jpg
tags: [tvm, financial calculator, cfa, frm]
datePublished: "2024-11-24"
schemaOrg:
  - "@type": "TechArticle"
    headline: "How to use amortization mode in the BAII Plus calculator"
    description: "Amortization is a crucial financial concept that shows the breakdown of each payment on a loan into principal and interest. This tutorial will guide you through using the BA II Plus's amortization functions."
    about: {
      "@type": "Thing",
      "name": "Loan Amortization",
      "description": "Financial calculations for analyzing loan payment schedules and interest/principal breakdown"
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
      "@id": "https://baiiplus.com/en/post/how-to-use-amortization-mode"
    proficiencyLevel: "Intermediate"
    dependencies: "BAII Plus Financial Calculator"
    step:
      - "@type": "HowToStep"
        name: "Access Amortization Mode"
        text: "Press [2nd] then [PV] to enter AMORT mode"
      - "@type": "HowToStep"
        name: "Enter Loan Parameters"
        text: "Input the loan amount, interest rate, term, and payment"
      - "@type": "HowToStep"
        name: "Set Amortization Period"
        text: "Enter P1 (first payment) and P2 (last payment) of the period to analyze"
      - "@type": "HowToStep"
        name: "View Results"
        text: "Press [CPT] to see balance, principal paid, and interest paid"
---

![Time value of money](/images/post_amortization.jpg){.mx-auto}

# How to use amortization mode in the BAII Plus calculator

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200} 

Amortization shows the breakdown of each payment on a loan into principal and interest. This tutorial will guide you through using the BA II Plus's amortization functions.

## I. Accessing the Amortization Mode:

Let's first open [BA II Plus Online](https://www.baiiplus.com/) as a reference:

Press [2nd]{.p-1 .rounded-md .bg-gray-200} then [PV]{.p-1 .rounded-md .bg-gray-200}: This accesses the AMORT function. 

![BA II Plus Calculator](/images/amortization.png){.mx-auto}

## II. Inputting the Necessary Data:

Before using the AMORT function, you must input the loan's key parameters. These are the same values you'd use for a Time Value of Money (TVM) calculation:

- N (Number of Payments): Total number of payments over the loan's life.
- I/Y (Interest Rate per Year): Annual interest rate (as a percentage). Important: Enter the annual rate, even if payments are monthly. The calculator will handle the conversion.
- PV (Present Value): The loan amount (principal). Enter as a negative number since it represents money going out.
- PMT (Payment): The periodic payment amount. Enter as a positive number.
- FV (Future Value): Usually 0 for a standard loan (the loan balance is zero at the end).

## III. Using the AMORT Function:

Once your TVM variables are entered, you can access the amortization features:

P1 (Beginning Payment Number): The first payment in the period you're analyzing.
P2 (Ending Payment Number): The last payment in the period you're analyzing.

- Example:

Let's say you have a 30-year mortgage for $200,000 at an annual interest rate of 6%, with monthly payments. We want to find out the principal and interest paid during the first year (payments 1-12).

**Input TVM Variables:**
* [N]{.p-1 .rounded-md .bg-gray-200}: 360 (30 years * 12 monthly payments)
* [I/Y]{.p-1 .rounded-md .bg-gray-200}: 6 (Annual interest rate)
* [PV]{.p-1 .rounded-md .bg-gray-200}: 200000 (Loan amount)
* [P/Y]{.p-1 .rounded-md .bg-gray-200}: 12 (12 periods per year) 
* Press [CPT] then [PMT]. You should get approximately 1199.10)

**Input Amortization Period:**
press Press [2nd]{.p-1 .rounded-md .bg-gray-200} then [PV]{.p-1 .rounded-md .bg-gray-200} to enter AMORT mode.
* [P1]{.p-1 .rounded-md .bg-gray-200}: 1 (First payment of the year)
* [P2]{.p-1 .rounded-md .bg-gray-200}: 12 (Last payment of the year)
* Calculate Amortization: Press [CPT]{.p-1 .rounded-md .bg-gray-200} 

Then press down to show the value
* [BAL]{.p-1 .rounded-md .bg-gray-200}: 197543.99 Shows the loan balance at the end of payment P2 (after the 12th payment)
* [PRN]{.p-1 .rounded-md .bg-gray-200}: -2456.01 Shows the total principal paid during payments P1 to P2 (the first year)
* [INTP]{.p-1 .rounded-md .bg-gray-200}: -11933.19 Shows the total interest paid during payments P1 to P2 (the first year)

**Interpreting the Results:**

In the example above, you would get (approximate values may vary slightly depending on your calculator's settings):

BAL: A balance remaining on the loan after the 12th payment.
INT: The total interest paid during the first year.
PRN: The total principal paid during the first year.

By changing the values of P1 and P2, you can analyze any period within the loan's lifespan. For instance, to analyze payments 25-36, you would enter P1 = 25 and P2 = 36.

## IV. Clearing the AMORT Function:

After you're finished with amortization calculations, it's good practice to clear the AMORT function's memory. You can do this by pressing [refresh]{.p-1 .rounded-md .bg-gray-200} at the bottom right corner. This will not clear your TVM variables.

This tutorial provides a comprehensive guide to utilizing the amortization feature on your BA II Plus calculator. Remember to practice with different scenarios to become proficient in using this valuable financial tool. Remember to always double-check your inputs to avoid errors in your calculations.