import { designActions } from './designs'
import { creditActions } from './credits'

// Action registry - maps action handler strings to actual functions
export const actionRegistry = {
  // Design actions
  setAsTemplate: designActions.setAsTemplate,
  downloadPreview: designActions.downloadPreview,

  // Credit actions
  grantCreditToUser: creditActions.grantCreditToUser,

  // Add more actions here as needed
  // templateActions: templateActions.someAction,
  // userActions: userActions.someAction,
}

// Helper function to get action handler by name
export const getActionHandler = (handlerName: string) => {
  return actionRegistry[handlerName as keyof typeof actionRegistry]
}

// Type for action handler function - flexible to support different parameter types
export type ActionHandler = (item: any, data?: any) => Promise<any>

export default actionRegistry