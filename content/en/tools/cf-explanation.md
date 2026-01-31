---
title: Cash Flow Analysis Explanations
description: Explanations of different cash flow calculation methods
---

## Net Present Value (NPV)

**Net Present Value (NPV)** is the difference between the present value of cash inflows and the present value of cash outflows over a period of time.

NPV answers the question: *"Is this investment worth making in today's dollars?"* or *"What is the current value of my future cash flows?"*

The formula for calculating NPV is:

$$
NPV = \sum_{t=0}^{n} \frac{CF_t}{(1+r)^t}
$$

Where:
- NPV = Net Present Value
- CF_t = Cash flow at time t
- r = Discount rate (required rate of return)
- n = Total number of periods
- t = Time period

A positive NPV indicates a potentially profitable investment, while a negative NPV suggests the investment may result in a net loss.

**Example:** 
> Consider an investment that requires an initial outlay of $10,000 (negative cash flow) and is expected to generate $4,000, $4,000, and $5,000 in the next three years. With a discount rate of 10%:
>
> $$
> NPV = -10,000 + \frac{4,000}{(1+0.1)^1} + \frac{4,000}{(1+0.1)^2} + \frac{5,000}{(1+0.1)^3} = 679.12
> $$
>
> Since the NPV is positive, this investment is projected to be profitable.

## Internal Rate of Return (IRR)

**Internal Rate of Return (IRR)** is the discount rate that makes the net present value of all cash flows equal to zero.

IRR answers the question: *"What is the rate of return on my investment?"* or *"What interest rate am I effectively earning?"*

The formula for calculating IRR involves finding the rate r that satisfies the equation:

$$
\sum_{t=0}^{n} \frac{CF_t}{(1+r)^t} = 0
$$

Where:
- CF_t = Cash flow at time t
- r = Internal Rate of Return
- n = Total number of periods
- t = Time period

IRR can be used to rank several prospective investments or projects. Higher IRR values indicate more desirable investments, assuming all other factors are equal.

**Example:**
> Using the same investment from the NPV example: initial outlay of $10,000 with returns of $4,000, $4,000, and $5,000 over three years. The IRR would be the rate r that satisfies:
>
> $$
> -10,000 + \frac{4,000}{(1+r)^1} + \frac{4,000}{(1+r)^2} + \frac{5,000}{(1+r)^3} = 0
> $$
>
> Solving this equation yields an IRR of approximately 14.3%, meaning the investment provides a 14.3% annual return.

## Modified Internal Rate of Return (MIRR)

**Modified Internal Rate of Return (MIRR)** improves upon the IRR by addressing the reinvestment rate assumption and the possibility of multiple IRRs.

MIRR answers the question: *"What is my rate of return if negative cash flows are financed at a financing rate and positive cash flows are reinvested at a reinvestment rate?"*

The formula for calculating MIRR is:

$$
MIRR = \sqrt[n]{\frac{FV(\text{positive cash flows, reinvestment rate})}{PV(\text{negative cash flows, financing rate})}} - 1
$$

Or expressed differently:

$$
MIRR = \left(\frac{\sum_{t=0}^{n} CF_t^+ \times (1+r_r)^{n-t}}{-\sum_{t=0}^{n} \frac{CF_t^-}{(1+r_f)^t}}\right)^{\frac{1}{n}} - 1
$$

Where:
- MIRR = Modified Internal Rate of Return
- CF_t^+ = Positive cash flows at time t
- CF_t^- = Negative cash flows at time t
- r_r = Reinvestment rate
- r_f = Financing rate
- n = Total number of periods
- t = Time period

**Example:**
> Continuing with our investment scenario, if the reinvestment rate is 8% and the financing rate is 10%:
>
> Future value of positive cash flows: $4,000(1+0.08)^2 + $4,000(1+0.08)^1 + $5,000 = $13,648
>
> Present value of negative cash flows: $10,000
>
> $$
> MIRR = \left(\frac{13,648}{10,000}\right)^{\frac{1}{3}} - 1 = 10.9\%
> $$
>
> This MIRR of 10.9% is lower than the IRR of 14.3%, reflecting the more realistic assumption that returns are reinvested at 8% rather than at the IRR.

## Net Future Value (NFV)

**Net Future Value (NFV)** represents the value of all cash flows at the end of the investment period, assuming they are compounded at a given interest rate.

NFV answers the question: *"What will be the future value of all my cash flows at the end of the investment horizon?"*

The formula for calculating NFV is:

$$
NFV = \sum_{t=0}^{n} CF_t \times (1+r)^{n-t}
$$

Where:
- NFV = Net Future Value
- CF_t = Cash flow at time t
- r = Interest rate
- n = Total number of periods
- t = Time period

**Example:**
> Using our investment scenario with a 10% interest rate:
>
> $$
> NFV = -10,000 \times (1+0.1)^3 + 4,000 \times (1+0.1)^2 + 4,000 \times (1+0.1)^1 + 5,000 = 900.40
> $$
>
> This means that at the end of the 3-year period, the net value of all cash flows, including the initial investment and all returns compounded at 10%, would be $900.40.

## Payback Period

**Payback Period** is the time required to recover the initial investment in a project.

Payback Period answers the question: *"How long will it take to get my money back?"*

For uneven cash flows, the formula is:

$$
\text{Payback Period} = A + \frac{B}{C}
$$

Where:
- A = Last period with a negative cumulative cash flow
- B = Absolute value of cumulative cash flow at the end of period A
- C = Cash flow during the period after A

A shorter payback period means the investment is more liquid and less risky.

**Example:**
> For our investment with an initial outlay of $10,000 and annual returns of $4,000, $4,000, and $5,000:
>
> Year 0: -$10,000  
> Year 1: -$6,000 ($10,000 - $4,000)  
> Year 2: -$2,000 ($6,000 - $4,000)  
> Year 3: +$3,000 ($2,000 + $5,000)  
>
> The last period with a negative cumulative cash flow is Year 2, with a remaining deficit of $2,000. The cash flow in the next period is $5,000.
>
> $$
> \text{Payback Period} = 2 + \frac{2,000}{5,000} = 2.4 \text{ years}
> $$
>
> So it would take 2.4 years to recover the initial investment.

## Discounted Payback Period

**Discounted Payback Period** is similar to the regular payback period but uses discounted cash flows instead of nominal cash flows.

Discounted Payback Period answers the question: *"How long will it take to recover my investment in present value terms?"*

The calculation involves finding the point at which the cumulative discounted cash flows become positive:

$$
\sum_{t=0}^{DPP} \frac{CF_t}{(1+r)^t} = 0
$$

Where:
- DPP = Discounted Payback Period
- CF_t = Cash flow at time t
- r = Discount rate
- t = Time period

**Example:**
> For our example with a 10% discount rate:
>
> Year 0: -$10,000  
> Year 1: $4,000 ÷ 1.10 = $3,636.36  
> Year 2: $4,000 ÷ 1.21 = $3,305.79  
> Year 3: $5,000 ÷ 1.33 = $3,759.40  
>
> Cumulative discounted cash flows:  
> Year 0: -$10,000  
> Year 1: -$6,363.64  
> Year 2: -$3,057.85  
> Year 3: +$701.55  
>
> The last period with a negative cumulative discounted cash flow is Year 2, with a remaining deficit of $3,057.85. The discounted cash flow in the next period is $3,759.40.
>
> $$
> \text{Discounted Payback Period} = 2 + \frac{3,057.85}{3,759.40} = 2.81 \text{ years}
> $$
>
> So it would take 2.81 years to recover the initial investment in present value terms, which is longer than the regular payback period of 2.4 years.

## Frequency in Cash Flows

In cash flow analysis, frequency refers to how many times a particular cash flow repeats at a given period. This is particularly useful when the same payment occurs multiple times in succession, allowing for more concise representation of recurring cash flows.

When a cash flow has a frequency greater than 1, the calculation formulas account for this repetition by:

$$
CF_{\text{total}} = CF_{\text{amount}} \times \text{Frequency}
$$

This frequency factor is integrated into all the cash flow calculations discussed above.

**Example:**
> Instead of entering three identical annual payments of $5,000 at periods 1, 2, and 3, you could enter a single cash flow of $5,000 with a frequency of 3 at period 1. The calculator would then treat this as:
>
> Period 1: $5,000  
> Period 2: $5,000  
> Period 3: $5,000  
>
> This simplifies data entry and makes the cash flow timeline more readable, especially for complex investment scenarios with multiple recurring payments. 