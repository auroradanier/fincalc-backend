---
title: Time Value of Money Explanations
description: Explanations of different TVM calculation types
---

## Present Value (PV)

**Present Value (PV)** is the current value of a future sum of money or a series of payments, given a specified rate of return.

PV answers the question: *"How much do I need to invest today to reach my future goal?"* or *"What is the current value of my future payments?"*

The formula for calculating PV with a future value only is:

$$
PV = \frac{FV}{(1 + r)^n}
$$

If there are periodic payments (PMT) involved, the formula expands to:

$$
PV = \frac{FV}{(1 + r)^n} + PMT \times \frac{(1+r)^n - 1}{r(1+r)^n}
$$

Where:
- PV = Present Value
- FV = Future Value
- PMT = Payment per period
- r = Interest rate per period
- n = Number of periods

## Future Value (FV)

**Future Value (FV)** represents the value of an asset or cash at a specified date in the future, based on an assumed growth rate.

FV answers the question: *"How much will my investment be worth in the future?"* or *"What will be the future value of my regular payments?"*

The formula for calculating FV with only an initial investment is:

$$
FV = PV \times (1 + r)^n
$$

If there are periodic payments (PMT) involved, the formula expands to:

$$
FV = PV \times (1 + r)^n + PMT \times \frac{(1+r)^n - 1}{r}
$$

Where:
- FV = Future Value
- PV = Present Value
- PMT = Payment per period
- r = Interest rate per period
- n = Number of periods

## Payment (PMT)

**Payment (PMT)** is the periodic payment amount in an annuity.

PMT answers the question: *"How much do I need to pay each period to pay off a loan?"* or *"How much should I save regularly to reach my target?"*

The formula for calculating PMT with a present value (such as a loan amount) is:

$$
PMT = \frac{PV \times r \times (1 + r)^n}{(1 + r)^n - 1}
$$

If there's also a future value target, the formula expands to:

$$
PMT = \frac{PV \times r \times (1 + r)^n - FV \times r}{(1 + r)^n - 1}
$$

Where:
- PMT = Payment per period
- PV = Present Value
- FV = Future Value
- r = Interest rate per period
- n = Number of periods

## Number of Periods (N)

**Number of Periods (N)** represents the total number of compounding periods in an investment or loan.

N answers the question: *"How long will it take to reach my financial goal?"* or *"How many payments will it take to pay off my loan?"*

The formula for calculating N without periodic payments is:

$$
N = \frac{\ln(FV / PV)}{\ln(1 + r)}
$$

When payments are involved, the calculation becomes more complex and typically requires numeric methods to solve:

$$
PV(1+r)^N + PMT\frac{(1+r)^N-1}{r} = FV
$$

Where:
- N = Number of periods
- FV = Future Value
- PV = Present Value
- PMT = Payment per period
- r = Interest rate per period
- ln = Natural logarithm

## Interest Rate (I/Y)

**Interest Rate (I/Y)** is the annual interest rate of an investment or loan, expressed as a percentage.

I/Y answers the question: *"What rate of return am I getting on my investment?"* or *"What is the interest rate on my loan?"*

The formula for calculating I/Y involves finding the rate r that satisfies the equation:

$$
PV(1+r)^N + PMT\frac{(1+r)^N-1}{r} = FV
$$

This equation typically requires iteration methods to solve for r when PMT is involved.

Where:
- I/Y = Annual interest rate
- FV = Future Value
- PV = Present Value
- PMT = Payment per period
- N = Number of periods

## Compounding Frequency

Compounding frequency affects how interest accumulates over time. More frequent compounding generally results in higher effective interest rates. The calculations above assume that payment frequency matches compounding frequency, but the formulas can be adjusted when these frequencies differ. 