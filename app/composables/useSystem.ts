export const useSystem = () => {
  const sidebarCollapsed = useState('sidebar.collapsed', () => false)

  return {
    sidebarCollapsed
  }
}