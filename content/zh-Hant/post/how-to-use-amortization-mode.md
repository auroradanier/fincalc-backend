---
title: 使用 BAII Plus 計算機的攤銷模式
description: 學習如何使用 BAII Plus 計算機的攤銷模式進行貸款計算。透過簡單的步驟計算攤銷表、利息支付和剩餘餘額。
image: /images/post_amortization.jpg
tags: [tvm, financial calculator, cfa, frm]
datePublished: "2024-11-24"
schemaOrg:
  - "@type": "TechArticle"
    headline: "使用 BAII Plus 計算機的攤銷模式"
    description: "學習如何使用 BAII Plus 計算機的攤銷模式進行貸款計算。透過簡單的步驟計算攤銷表、利息支付和剩餘餘額。"
    about: {
      "@type": "Thing",
      "name": "貸款計算",
      "description": "計算攤銷表和貸款支付"
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
      "@id": "https://baiiplus.com/zh-TW/post/how-to-use-amortization-mode"
---

![攤銷計算](/images/post_amortization.jpg){.mx-auto}

# 使用 BAII Plus 計算機的攤銷模式

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200}

## 一、簡介

BAII Plus 計算機的攤銷模式是分析貸款和抵押的強大工具。它能夠詳細檢查付款時程表,包括本金和利息的分配。

## 二、攤銷基本原理

攤銷模式顯示：
- 特定期間的利息支付
- 特定期間的本金償還金額
- 特定付款後的剩餘餘額
- 多個期間的總付款

## 三、進入攤銷模式

1. 首先輸入 TVM 變數：
   - N（總付款次數）
   - I/Y（年利率）
   - PV（貸款金額）
   - PMT（定期付款）
   - FV（終值,通常為 0）

2. 按 [2nd]{.p-1 .rounded-md .bg-gray-200} + [0]{.p-1 .rounded-md .bg-gray-200}（AMORT）

## 四、實際範例

**範例一：房貸分析**

> 分析具有以下條件的房貸：
> - 貸款金額：200萬元
> - 期限：30年
> - 年利率：4.5%
> - 每月付款

1. 輸入 TVM 變數：
   - N = 360（30年 × 12個月）
   - I/Y = 4.5
   - PV = 2000000
   - PMT（待計算）
   - FV = 0
   - P/Y = 12（每月付款）
   - C/Y = 12（每月計息）

2. 按 [PMT]{.p-1 .rounded-md .bg-gray-200} 計算每月付款

3. 按 [2nd]{.p-1 .rounded-md .bg-gray-200} + [0]{.p-1 .rounded-md .bg-gray-200} 進入攤銷模式

4. 輸入要分析的付款（例如,1-12 代表第一年）

**範例二：特定付款期間分析**

> 檢查第 13-24 期付款（第二年）：

1. 在攤銷模式中：
   - 輸入 13 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - 輸入 24 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - 按 [↓]{.p-1 .rounded-md .bg-gray-200} 查看：
     - BAL（剩餘餘額）
     - PRN（已償還本金）
     - INT（已付利息）

**範例三：累計付款**

> 計算前五年的總付款：

1. 在攤銷模式中：
   - 輸入 1 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - 輸入 60 [ENTER]{.p-1 .rounded-md .bg-gray-200}
   - 顯示畫面會顯示：
     - 總償還本金
     - 總支付利息
     - 5年後餘額

## 五、提示和故障排除

- **付款設定：** 確保正確設定 P/Y 和 C/Y
- **符號慣例：** 注意正確使用正負數
- **資料驗證：** 使用 [↑]{.p-1 .rounded-md .bg-gray-200}/[↓]{.p-1 .rounded-md .bg-gray-200} 鍵檢查所有值

## 六、進階功能

**部分付款分析**
- 分析期間內的個別付款
- 比較不同期間
- 計算額外付款的影響

**剩餘餘額計算**
- 隨時確定餘額
- 計算提前還款的影響
- 分析不同的攤銷情境

## 七、結論

BAII Plus 計算機的攤銷模式是分析貸款和抵押的重要工具。透過定期練習,您可以快速準確地分析攤銷時程表並做出明智的財務決策。使用 [BAII Plus 線上版](https://www.baiiplus.com/) 進行額外練習和驗證您的計算。 