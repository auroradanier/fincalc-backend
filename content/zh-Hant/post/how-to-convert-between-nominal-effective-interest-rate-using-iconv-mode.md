---
title: 使用 BAII Plus 計算機的 ICONV 模式轉換名目利率和實際利率
description: BAII Plus 計算機的利率轉換模式（ICONV）可以輕鬆地在名目利率（NOM）、實際利率（EFF）和年複利次數（C/Y）之間進行轉換。這對於比較不同複利頻率的投資至關重要。
image: /images/post_iconv.jpg
tags: [iconv, financial calculator, cfa, frm]
datePublished: "2024-11-16"
schemaOrg:
  - "@type": "TechArticle"
    headline: "使用 BAII Plus 計算機的 ICONV 模式轉換名目利率和實際利率"
    description: "BAII Plus 計算機的利率轉換模式（ICONV）可以輕鬆地在名目利率（NOM）、實際利率（EFF）和年複利次數（C/Y）之間進行轉換。這對於比較不同複利頻率的投資至關重要。"
    about: {
      "@type": "Thing",
      "name": "利率轉換",
      "description": "在名目利率和實際利率之間進行轉換的財務計算"
    }
    image:
      "@type": "ImageObject"
      url: "https://baiiplus.com/images/post_iconv.jpg"
    author:
      "@type": "Person"
      name: "BAII Plus"
    publisher:
      "@type": "Organization"
      name: "BAII Plus"
      logo:
        "@type": "ImageObject"
        url: "https://baiiplus.com/logo.png"
    datePublished: "2024-11-16"
    dateModified: "2024-11-16"
    mainEntityOfPage:
      "@type": "WebPage"
      "@id": "https://baiiplus.com/zh-TW/post/how-to-convert-between-nominal-effective-interest-rate-using-iconv-mode"
---

![利率轉換](/images/post_iconv.jpg){.mx-auto}

# 使用 BAII Plus 計算機的 ICONV 模式轉換名目利率和實際利率

[CFA]{.p-1 .text-xs .rounded-md .bg-gray-200} [FRM]{.p-1 .text-xs .rounded-md .bg-gray-200}

## 一、了解基本概念：

**名目利率 (NOM)：** 這是標示的年利率。它是公開顯示的利率,但沒有考慮複利的頻率。

**實際利率 (EFF)：** 這是考慮複利效應後實際獲得的年利率。它反映了您的投資在考慮利息計算和加入本金的頻率後的真實回報率。

## 二、進入利率轉換模式：

**開啟線上財務計算機：**
讓我們先開啟 [BAII Plus 線上計算機](https://www.baiiplus.com/) 作為參考：

![BA II Plus 計算機](/images/iconv_mode.jpg){.mx-auto}

按 [2nd]{.p-1 .rounded-md .bg-gray-200} 然後按 [2]{.p-1 .rounded-md .bg-gray-200}。這將進入 ICONV（利率轉換）模式。您將看到顯示 NOM、EFF 或 C/Y 其中之一。

## 三、在 NOM、EFF 和 C/Y 之間導航：

使用上箭頭 (▲) 和下箭頭 (▼) 在三個變數之間移動游標：

**NOM（名目利率）：** 標示的年利率。

**EFF（實際利率）：** 考慮複利後實際獲得的年利率。

**C/Y（年複利次數）：** 每年計算複利的次數（例如,每月複利為 12,每季複利為 4）。

## 四、輸入數值：

將游標移至所需變數（NOM、EFF 或 C/Y）,使用數字鍵輸入數值,然後按 [ENTER]{.p-1 .rounded-md .bg-gray-200}。

## 五、執行轉換：

利率轉換需要三個輸入值（NOM、EFF、C/Y）中的至少兩個。以下是執行轉換的方法：

**情境一：從 NOM 轉換到 EFF：**

輸入 NOM（名目利率）。
輸入 C/Y（年複利次數）。
使用箭頭鍵將游標移至 EFF。
按 [CPT]{.p-1 .rounded-md .bg-gray-200} 計算實際利率。

**情境二：從 EFF 轉換到 NOM：**

輸入 EFF（實際利率）。
輸入 C/Y（年複利次數）。
使用箭頭鍵將游標移至 NOM。
按 [CPT]{.p-1 .rounded-md .bg-gray-200} 計算名目利率。

## 六、範例：

**範例一：將名目利率轉換為實際利率**

假設您有一個每月複利的 6% 名目利率。要找出實際年利率：

按 [2nd]{.p-1 .rounded-md .bg-gray-200} [2]{.p-1 .rounded-md .bg-gray-200} 進入 ICONV 模式。
輸入 [6]{.p-1 .rounded-md .bg-gray-200} [ENTER]{.p-1 .rounded-md .bg-gray-200}（NOM = 6%）。
輸入 [12]{.p-1 .rounded-md .bg-gray-200} [ENTER]{.p-1 .rounded-md .bg-gray-200}（C/Y = 12）。
使用 ▼ 移至 EFF。
按 [CPT]{.p-1 .rounded-md .bg-gray-200}。計算機將顯示實際年利率（約 6.17%）。

**範例二：將實際利率轉換為名目利率**

假設您知道實際年利率為 7%,且是每季複利。要找出名目利率：

按 [2nd]{.p-1 .rounded-md .bg-gray-200} [2]{.p-1 .rounded-md .bg-gray-200} 進入 ICONV 模式。
輸入 [7]{.p-1 .rounded-md .bg-gray-200} [ENTER]{.p-1 .rounded-md .bg-gray-200}（EFF = 7%）。
輸入 [4]{.p-1 .rounded-md .bg-gray-200} [ENTER]{.p-1 .rounded-md .bg-gray-200}（C/Y = 4）。
使用 ▲ 移至 NOM。
按 [CPT]{.p-1 .rounded-md .bg-gray-200}。計算機將顯示名目年利率（約 6.77%）。

## 七、重要注意事項：

**重置計算機：** 在開始新的轉換之前,建議清除計算機的記憶體。按 [2nd]{.p-1 .rounded-md .bg-gray-200} 然後按 [FV]{.p-1 .rounded-md .bg-gray-200}（進入 CLR TVM）以清除可能會影響 ICONV 的貨幣時間價值暫存器。

**輸入百分比：** 計算機會自動處理百分比輸入。您不需要除以 100。只需輸入百分比值（例如,輸入 6 代表 6%）。

**錯誤訊息：** 如果出現錯誤訊息,請檢查您的輸入是否有效（例如,C/Y 必須是正整數）。

按照這些步驟,您可以有效地使用 BAII Plus 計算機的利率轉換模式來準確比較和分析不同的利率。請記得始終檢查您的輸入以確保結果的準確性。 