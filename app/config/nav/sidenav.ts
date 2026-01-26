export interface NavItem {
  name: string
  href?: string
  items?: NavItem[]
}

export interface NavCategory {
  name: string
  items: NavItem[]
}

const sidenavConfig: NavCategory[] = [
  {
    name: 'User Management',
    items: [
      { name: 'Users', href: '/admin/user' },
      { name: 'Sessions', href: '/admin/session' },
      { name: 'Accounts', href: '/admin/account' },
      { name: 'Verification', href: '/admin/verification' },
      { name: 'User Storage', href: '/admin/userStorage' }
    ]
  },
  {
    name: 'OAuth Management',
    items: [
      { name: 'OAuth Applications', href: '/admin/oauthApplication' },
      { name: 'Access Tokens', href: '/admin/oauthAccessToken' },
      { name: 'OAuth Consent', href: '/admin/oauthConsent' }
    ]
  },
  {
    name: 'Content Management',
    items: [
      { name: 'Designs', href: '/admin/designs' },
      { name: 'Templates', href: '/admin/templates' },
      { name: 'Template Categories', href: '/admin/templateCategories' },
      { name: 'Assets', href: '/admin/assets' },
      { name: 'Fonts', href: '/admin/fonts' }
    ]
  },
  {
    name: 'Chat Management',
    items: [
      { name: 'AI Chats', href: '/admin/aiChats' },
      { name: 'Chat Messages', href: '/admin/aiChatMessages' },
      { name: 'AI Image Generations', href: '/admin/aiImageGenerations' },
      { name: 'AI Models', href: '/admin/aiModels' }
    ]
  },
  {
    name: 'Credit Management',
    items: [
      { name: 'User Credits', href: '/admin/userCredits' },
      { name: 'Credit Transactions', href: '/admin/creditTransactions' }
    ]
  },
  {
    name: 'Billing & Subscriptions',
    items: [
      { name: 'Pricing Plans', href: '/admin/pricingPlans' },
      { name: 'User Subscriptions', href: '/admin/userSubscriptions' },
      { name: 'Orders', href: '/admin/orders' }
    ]
  }
]

export default sidenavConfig
