import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    // '@nuxtjs/i18n',
    '@kgierke/nuxt-basic-auth',
  ],

  css: ['~/assets/css/main.css'],

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    // Private keys (only available on server-side)
    googleAiApiKey: process.env.NUXT_GEMINI_API_KEY,
    googleModel: process.env.NUXT_GOOGLE_MODEL,
    infiniaiApiKey: process.env.NUXT_INFINIAI_API_KEY,
    infiniaiModel: process.env.NUXT_INFINIAI_MODEL,
    modelscopeApiKey: process.env.NUXT_MODELSCOPE_API_KEY,
    modelscopeImageModel: process.env.NUXT_MODELSCOPE_IMAGE_MODEL,
    modelscopeModel: process.env.NUXT_MODELSCOPE_MODEL,
    databaseUrl: process.env.NODE_ENV === 'production' 
      ? process.env.NUXT_DATABASE_URL_PROD 
      : process.env.NUXT_DATABASE_URL_DEV,
    s3Url: process.env.NUXT_S3_URL,
    s3KeyId: process.env.NUXT_S3_KEY_ID,
    s3AccessKey: process.env.NUXT_S3_ACCESS_KEY,
    s3BucketName: process.env.NUXT_S3_BUCKET_NAME,

    // Public keys that are exposed to the client
    public: {
      domain: 'localhost',
      siteUrl: process.env.NODE_ENV === 'production' 
        ? 'http://localhost:3000' 
        : 'http://localhost:3000',
      assetUrl: process.env.NUXT_ASSET_URL,
      googleAiApiKey: process.env.NUXT_GEMINI_API_KEY,
      googleModel: process.env.NUXT_GOOGLE_MODEL,
      modelscopeApiKey: process.env.NUXT_MODELSCOPE_API_KEY,
      modelscopeModel: process.env.NUXT_MODELSCOPE_MODEL,
      iflowApiKey: process.env.NUXT_IFLOW_API_KEY,
      iflowModel: process.env.NUXT_IFLOW_MODEL,
      openaiBaseUrl: process.env.NUXT_OPENAI_BASE_URL,
      agentUrl: process.env.NUXT_AGENT_URL,
    },
  },

  // https://devtools.nuxt.com
  // devtools: {
  //   enabled: true,
  //   timeline: {
  //     enabled: true,
  //   },
  // },

  compatibilityDate: '2025-10-05',

  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  basicAuth: {
    enabled: true,
    users: [
      {
        username: 'manager',
        password: 'listProtect0818',
      }
    ],
    allowedRoutes: [
      '^(?!/admin).*$',              // Allow all non-admin routes
      '^/admin/api/.*$',             // Allow admin API routes
      '^/admin/login/?$'             // Allow login page
    ]
  },

  // // Add i18n configuration
  // i18n: {
  //   locales: [
  //     { code: 'en', iso: 'en-US', dir: 'ltr' },
  //     { code: 'zh', iso: 'zh-CN', dir: 'ltr' }, // Simplified Chinese
  //   ],
  //   defaultLocale: 'en',
  //   translationDir: 'locales',
  //   meta: true,
  //   strategy: 'prefix_except_default', // URLs for default language (en) won't have prefix
  //   autoDetectLanguage: true, // Enable auto-detection of browser language
  //   fallbackLocale: 'en', // Fallback to English if translation is missing
  // },

  vite: {
    build: {
      target: 'esnext'
    },
    plugins: [
      tailwindcss(),
    ],
  },
  
})