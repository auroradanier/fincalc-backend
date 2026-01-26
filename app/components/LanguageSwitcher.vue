<template>
  <i18n-switcher
    :customLabels="{
      en: 'English',
      zh: '简体中文',
      'zh-Hant': '繁體中文',
      ja: '日本語',
      ko: '한국어',
      es: 'Español',
      fr: 'Français'
    }"
    :customWrapperStyle="{
      display: 'inline-block',
      position: 'relative'
    }"
    :customButtonStyle="{
      background: 'transparent',
      border: 'none',
      padding: '0.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'inherit'
    }"
    :customDropdownStyle="{
      position: 'absolute',
      top: '100%',
      right: '0',
      backgroundColor: '#fff8e7',
      borderRadius: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      minWidth: '120px',
      zIndex: '50',
      border: '1px solid #fed7aa'
    }"
    :customItemStyle="{
      padding: '0.125rem'
    }"
    :customLinkStyle="{
      display: 'block',
      padding: '0.375rem 0.75rem',
      textDecoration: 'none',
      color: '#374151',
      fontSize: '0.875rem',
      textAlign: 'center'
    }"
    :customActiveLinkStyle="{
      backgroundColor: '#fff0f0',
      color: '#db2777'
    }"
  >
    <template #before-selected-locale>
      <IconsLanguage />
    </template>
  </i18n-switcher>
</template> 