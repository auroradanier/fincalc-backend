---
title: BAII Plus 계산기의 상각 모드 사용 방법
description: 상각은 대출 상환금에서 원금과 이자의 내역을 보여주는 중요한 금융 개념입니다. 이 튜토리얼에서는 BA II Plus의 상각 기능 사용 방법을 안내합니다.
image: /images/post_amortization.jpg
tags: [tvm, financial calculator, cfa, frm]
datePublished: "2024-11-24"
schemaOrg:
  - "@type": "TechArticle"
    headline: "BAII Plus 계산기의 상각 모드 사용 방법"
    description: "상각은 대출 상환금에서 원금과 이자의 내역을 보여주는 중요한 금융 개념입니다. 이 튜토리얼에서는 BA II Plus의 상각 기능 사용 방법을 안내합니다."
    about: {
      "@type": "Thing",
      "name": "대출 상각",
      "description": "대출 상환 일정과 이자/원금 내역을 분석하는 금융 계산"
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
      "@id": "https://baiiplus.com/ko/post/how-to-use-amortization-mode"
    proficiencyLevel: "Intermediate"
    dependencies: "BAII Plus 금융 계산기"
    inLanguage: "ko"
    step:
      - "@type": "HowToStep"
        name: "상각 모드 진입"
        text: "[2nd]를 누른 다음 [PV]를 눌러 AMORT 모드로 들어갑니다"
      - "@type": "HowToStep"
        name: "대출 매개변수 입력"
        text: "대출 금액, 이자율, 기간, 상환액을 입력합니다"
      - "@type": "HowToStep"
        name: "상각 기간 설정"
        text: "분석할 기간의 P1(첫 번째 상환)과 P2(마지막 상환)를 입력합니다"
      - "@type": "HowToStep"
        name: "결과 확인"
        text: "[CPT]를 눌러 잔액, 상환된 원금, 상환된 이자를 확인합니다"
---

![화폐의 시간 가치](/images/post_amortization.jpg){.mx-auto}

# BAII Plus 계산기의 상각 모드 사용 방법

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200}

상각은 대출 상환금에서 원금과 이자의 내역을 보여줍니다. 이 튜토리얼에서는 BA II Plus의 상각 기능 사용 방법을 안내합니다.

## I. 상각 모드 접근:

먼저 [BA II Plus 온라인](https://www.baiiplus.com/)을 참조로 열어보겠습니다:

[2nd]{.p-1 .rounded-md .bg-gray-200}를 누른 다음 [PV]{.p-1 .rounded-md .bg-gray-200}를 누릅니다: 이렇게 하면 AMORT(상각) 기능에 접근합니다.

![BA II Plus 계산기](/images/amortization.png){.mx-auto}

## II. 필요한 데이터 입력:

AMORT 기능을 사용하기 전에 대출의 주요 매개변수를 입력해야 합니다. 이는 화폐의 시간 가치(TVM) 계산에 사용되는 값과 동일합니다:

- N(상환 횟수): 대출 기간 동안의 총 상환 횟수.
- I/Y(연이율): 연이율(퍼센트로 표시). 중요: 월 상환이더라도 연이율을 입력하세요. 계산기가 변환을 처리합니다.
- PV(현재 가치): 대출 금액(원금). 자금 유출을 나타내므로 음수로 입력합니다.
- PMT(상환액): 정기 상환액. 양수로 입력합니다.
- FV(미래 가치): 일반적인 대출의 경우 보통 0입니다(대출 종료 시 잔액이 0).

## III. AMORT 기능 사용:

TVM 변수 입력 후, 상각 기능에 접근할 수 있습니다:

P1(시작 상환 횟수): 분석하려는 기간의 첫 번째 상환.
P2(종료 상환 횟수): 분석하려는 기간의 마지막 상환.

- 예시:

30년 만기, 연이율 6%, 월 상환 조건의 2억 원 주택담보대출이 있다고 가정해 보겠습니다. 첫 해(1-12회차 상환)의 원금과 이자 상환 내역을 확인하고 싶습니다.

**TVM 변수 입력:**
* [N]{.p-1 .rounded-md .bg-gray-200}: 360(30년 * 12회 월 상환)
* [I/Y]{.p-1 .rounded-md .bg-gray-200}: 6(연이율)
* [PV]{.p-1 .rounded-md .bg-gray-200}: 200000(대출 금액)
* [P/Y]{.p-1 .rounded-md .bg-gray-200}: 12(연 12회)
* [CPT]를 누른 다음 [PMT]를 누릅니다. 약 1,199,100원이 표시될 것입니다

**상각 기간 입력:**
[2nd]{.p-1 .rounded-md .bg-gray-200}를 누른 다음 [PV]{.p-1 .rounded-md .bg-gray-200}를 눌러 AMORT 모드로 들어갑니다.
* [P1]{.p-1 .rounded-md .bg-gray-200}: 1(연도의 첫 번째 상환)
* [P2]{.p-1 .rounded-md .bg-gray-200}: 12(연도의 마지막 상환)
* 상각 계산: [CPT]{.p-1 .rounded-md .bg-gray-200}를 누릅니다

그런 다음 아래 화살표를 눌러 값을 표시
* [BAL]{.p-1 .rounded-md .bg-gray-200}: 197,543.99 P2회차 상환 후의 대출 잔액 표시(12회차 상환 후)
* [PRN]{.p-1 .rounded-md .bg-gray-200}: -2,456.01 P1에서 P2 기간 동안 상환된 총 원금 표시(1년차)
* [INTP]{.p-1 .rounded-md .bg-gray-200}: -11,933.19 P1에서 P2 기간 동안 상환된 총 이자 표시(1년차)

**결과 해석:**

위의 예시에서는 다음과 같은 결과를 얻게 됩니다(구체적인 값은 계산기 설정에 따라 약간 다를 수 있습니다):

BAL: 12회차 상환 후의 남은 대출 잔액.
INT: 1년차에 상환된 총 이자.
PRN: 1년차에 상환된 총 원금.

P1과 P2의 값을 변경하여 대출 기간 중 어느 기간이든 분석할 수 있습니다. 예를 들어, 25-36회차 상환을 분석하려면 P1 = 25, P2 = 36을 입력합니다.

## IV. AMORT 기능 초기화:

상각 계산이 끝나면 AMORT 기능의 메모리를 초기화하는 것이 좋습니다. 오른쪽 하단의 [refresh]{.p-1 .rounded-md .bg-gray-200}를 눌러 이를 실행할 수 있습니다. 이는 TVM 변수를 초기화하지 않습니다.

이 튜토리얼에서는 BA II Plus 계산기의 상각 기능 사용에 대한 포괄적인 안내를 제공했습니다. 이 유용한 금융 도구에 숙달되기 위해 다양한 시나리오로 연습하는 것을 잊지 마세요. 계산 오류를 피하기 위해 항상 입력을 신중하게 확인하는 것을 잊지 마세요. 