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
      { name: 'Verification', href: '/admin/verification' }
    ]
  },
  {
    name: 'Article Management',
    items: [
      { name: 'Articles', href: '/admin/articles' },
      { name: 'Article Content', href: '/admin/articleContent' },
      { name: 'Article Comments', href: '/admin/articleComments' },
      { name: 'Article Categories', href: '/admin/articleCategories' },
      { name: 'Content Moderation Log', href: '/admin/contentModerationLog' }
    ]
  },
  {
    name: 'Content Management',
    items: [
      { name: 'Assets', href: '/admin/assets' }
    ]
  }
]

export default sidenavConfig
