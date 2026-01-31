---
title: 如何使用 BAII Plus 计算器的摊销模式
description: 摊销是一个重要的金融概念,它显示了贷款每期还款中本金和利息的明细。本教程将指导您使用 BA II Plus 的摊销功能。
image: /images/post_amortization.jpg
tags: [tvm, financial calculator, cfa, frm]
datePublished: "2024-11-24"
schemaOrg:
  - "@type": "TechArticle"
    headline: "如何使用 BAII Plus 计算器的摊销模式"
    description: "摊销是一个重要的金融概念,它显示了贷款每期还款中本金和利息的明细。本教程将指导您使用 BA II Plus 的摊销功能。"
    about: {
      "@type": "Thing",
      "name": "贷款摊销",
      "description": "分析贷款还款计划和利息/本金明细的金融计算"
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
      "@id": "https://baiiplus.com/zh/post/how-to-use-amortization-mode"
    proficiencyLevel: "Intermediate"
    dependencies: "BAII Plus 金融计算器"
    inLanguage: "zh"
    step:
      - "@type": "HowToStep"
        name: "进入摊销模式"
        text: "按 [2nd] 然后按 [PV] 进入AMORT模式"
      - "@type": "HowToStep"
        name: "输入贷款参数"
        text: "输入贷款金额、利率、期限和还款额"
      - "@type": "HowToStep"
        name: "设置摊销期间"
        text: "输入要分析的期间的P1（首次还款）和P2（末次还款）"
      - "@type": "HowToStep"
        name: "查看结果"
        text: "按 [CPT] 查看余额、已付本金和已付利息"
---

![货币时间价值](/images/post_amortization.jpg){.mx-auto}

# 如何使用 BAII Plus 计算器的摊销模式

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200}

摊销显示了贷款每期还款中本金和利息的明细。本教程将指导您使用 BA II Plus 的摊销功能。

## I. 进入摊销模式：

让我们首先打开 [BA II Plus 在线计算器](https://www.baiiplus.com/) 作为参考：

按 [2nd]{.p-1 .rounded-md .bg-gray-200} 然后按 [PV]{.p-1 .rounded-md .bg-gray-200}：这将进入 AMORT（摊销）功能。

![BA II Plus 计算器](/images/amortization.png){.mx-auto}

## II. 输入必要数据：

在使用 AMORT 功能之前,您必须输入贷款的关键参数。这些与货币时间价值（TVM）计算中使用的值相同：

- N（还款期数）：贷款期限内的总还款次数。
- I/Y（年利率）：年利率（以百分比表示）。重要提示：即使是按月还款,也要输入年利率。计算器会处理转换。
- PV（现值）：贷款金额（本金）。输入负数,因为它代表资金流出。
- PMT（还款额）：定期还款金额。输入正数。
- FV（终值）：标准贷款通常为0（贷款结束时余额为零）。

## III. 使用 AMORT 功能：

输入 TVM 变量后,您可以访问摊销功能：

P1（起始还款期数）：您要分析的期间的第一次还款。
P2（结束还款期数）：您要分析的期间的最后一次还款。

- 示例：

假设您有一笔30年期的20万元按揭贷款,年利率为6%,按月还款。我们想了解第一年（第1-12期还款）的本金和利息支付情况。

**输入 TVM 变量：**
* [N]{.p-1 .rounded-md .bg-gray-200}：360（30年 * 12个月还款）
* [I/Y]{.p-1 .rounded-md .bg-gray-200}：6（年利率）
* [PV]{.p-1 .rounded-md .bg-gray-200}：200000（贷款金额）
* [P/Y]{.p-1 .rounded-md .bg-gray-200}：12（每年12期）
* 按 [CPT] 然后按 [PMT]。您应该得到约1199.10

**输入摊销期间：**
按 [2nd]{.p-1 .rounded-md .bg-gray-200} 然后按 [PV]{.p-1 .rounded-md .bg-gray-200} 进入 AMORT 模式。
* [P1]{.p-1 .rounded-md .bg-gray-200}：1（年度第一次还款）
* [P2]{.p-1 .rounded-md .bg-gray-200}：12（年度最后一次还款）
* 计算摊销：按 [CPT]{.p-1 .rounded-md .bg-gray-200}

然后按下箭头显示数值
* [BAL]{.p-1 .rounded-md .bg-gray-200}：197543.99 显示 P2 还款后的贷款余额（第12次还款后）
* [PRN]{.p-1 .rounded-md .bg-gray-200}：-2456.01 显示 P1 到 P2 期间支付的总本金（第一年）
* [INTP]{.p-1 .rounded-md .bg-gray-200}：-11933.19 显示 P1 到 P2 期间支付的总利息（第一年）

**解读结果：**

在上述示例中,您会得到（具体数值可能会因计算器设置而略有不同）：

BAL：第12次还款后的剩余贷款余额。
INT：第一年支付的总利息。
PRN：第一年支付的总本金。

通过更改 P1 和 P2 的值,您可以分析贷款期限内的任何期间。例如,要分析第25-36期还款,您可以输入 P1 = 25 和 P2 = 36。

## IV. 清除 AMORT 功能：

完成摊销计算后,最好清除 AMORT 功能的内存。您可以通过按右下角的 [refresh]{.p-1 .rounded-md .bg-gray-200} 来实现。这不会清除您的 TVM 变量。

本教程提供了使用 BA II Plus 计算器摊销功能的全面指南。请记住通过不同场景进行练习,以熟练使用这个有价值的金融工具。始终记得仔细检查您的输入,以避免计算错误。 