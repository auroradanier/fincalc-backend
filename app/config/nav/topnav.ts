export interface TopNavItem {
  name: string
  action?: string
  href?: string
  emit?: string
}

const topnavConfig: TopNavItem[] = [
  {
    name: 'Assistant',
    action: 'toggle-chat',
    emit: 'toggle-chat'
  }
]

export default topnavConfig
