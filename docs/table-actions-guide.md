# Table Actions Guide

This guide explains how to implement and organize table actions in the admin interface.

## Overview

Table actions are custom operations that can be performed on individual table rows. They are defined in table configuration files and implemented in dedicated action modules.

## Architecture

The action system follows a modular architecture:

```
app/
├── config/
│   ├── tables/           # Table configurations
│   │   ├── designs.ts    # Defines actions metadata
│   │   └── ...
│   └── actions/          # Action implementations
│       ├── index.ts      # Action registry
│       ├── designs.ts    # Design-specific actions
│       └── common.ts     # Shared actions
```

## Defining Actions in Table Config

Actions are defined in the table configuration file using the `actions` property:

```typescript
import type { TableConfig } from '../types'

const config: TableConfig = {
  // ... other config properties
  actions: [
    {
      key: "setAsTemplate",
      title: "Set as Template",
      type: "button",
      variant: "primary",
      handler: "setAsTemplate",
      confirm: {
        title: "Set as Template",
        message: "Are you sure you want to set this design as a template?"
      }
    }
  ]
}
```

### Action Configuration Properties

- `key`: Unique identifier for the action
- `title`: Display text for the action button
- `type`: Always "button" for now
- `variant`: Button style ("primary", "secondary", "danger")
- `handler`: String reference to the action handler function
- `icon`: Optional icon name
- `confirm`: Optional confirmation dialog configuration

## Implementing Action Handlers

### 1. Create Action Module

Create a new file in `app/config/actions/` for your table-specific actions:

```typescript
// app/config/actions/designs.ts
import type { H3Event } from 'h3'

export const designActions = {
  async setAsTemplate(item: any, event?: H3Event) {
    try {
      // Your action logic here
      const result = await performAction(item)
      
      return {
        success: true,
        message: 'Action completed successfully!',
        data: result
      }
    } catch (error) {
      console.error('Action failed:', error)
      throw error
    }
  }
}

export default designActions
```

### 2. Register Actions

Add your actions to the action registry in `app/config/actions/index.ts`:

```typescript
import { designActions } from './designs'

export const actionRegistry = {
  // Design actions
  setAsTemplate: designActions.setAsTemplate,
  
  // Add more actions here
}
```

## Action Handler Function Signature

```typescript
type ActionHandler = (item: any, event?: H3Event) => Promise<{
  success: boolean
  message?: string
  data?: any
}>
```

### Parameters

- `item`: The table row data object
- `event`: Optional H3Event for server-side context

### Return Value

Action handlers should return a promise that resolves to:

- `success`: Boolean indicating if the action succeeded
- `message`: Optional success message to display to the user
- `data`: Optional additional data from the action

## Best Practices

### 1. Error Handling

Always wrap your action logic in try-catch blocks:

```typescript
async myAction(item: any) {
  try {
    // Action logic
    return { success: true, message: 'Success!' }
  } catch (error) {
    console.error('Action failed:', error)
    throw error // Let the UI handle the error display
  }
}
```

### 2. Data Validation

Validate input data before processing:

```typescript
async myAction(item: any) {
  if (!item.id) {
    throw new Error('Item ID is required')
  }
  
  // Continue with action logic
}
```

### 3. API Calls

Use the existing API endpoints when possible:

```typescript
// Good: Use existing endpoints
const response = await fetch(`/api/v1/templates`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

### 4. Data Cleaning

When processing sensitive data, clean it appropriately:

```typescript
const cleanData = (data: any): any => {
  if (data && typeof data === 'object') {
    const cleaned: any = {}
    for (const [key, value] of Object.entries(data)) {
      // Set sensitive fields to empty instead of removing
      if (['id', 'author', 'userId'].includes(key)) {
        cleaned[key] = ''
      } else {
        cleaned[key] = typeof value === 'object' ? cleanData(value) : value
      }
    }
    return cleaned
  }
  return data
}
```

## Example: Complete Action Implementation

### Table Config (designs.ts)

```typescript
actions: [
  {
    key: "duplicate",
    title: "Duplicate",
    type: "button",
    variant: "secondary",
    handler: "duplicateDesign",
    confirm: {
      title: "Duplicate Design",
      message: "Create a copy of this design?"
    }
  }
]
```

### Action Implementation (actions/designs.ts)

```typescript
export const designActions = {
  async duplicateDesign(item: any) {
    try {
      const duplicateData = {
        ...item,
        id: undefined, // Remove ID for new record
        title: `${item.title} (Copy)`,
        createdAt: undefined,
        updatedAt: undefined
      }
      
      const response = await fetch('/api/v1/designs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to duplicate design')
      }
      
      const newDesign = await response.json()
      
      return {
        success: true,
        message: 'Design duplicated successfully!',
        data: newDesign
      }
    } catch (error) {
      console.error('Duplicate failed:', error)
      throw error
    }
  }
}
```

### Registry Update (actions/index.ts)

```typescript
export const actionRegistry = {
  setAsTemplate: designActions.setAsTemplate,
  duplicateDesign: designActions.duplicateDesign,
}
```

## Troubleshooting

### Action Not Found

If you get "Action handler not found" errors:

1. Check that the handler name in config matches the registry
2. Ensure the action is properly exported from the action module
3. Verify the action is registered in `actions/index.ts`

### Import Errors

If you get import errors:

1. Use the correct path: `~/config/actions`
2. Ensure the action module exports are correct
3. Check for TypeScript compilation errors

### Action Fails Silently

If actions don't work:

1. Check browser console for errors
2. Verify API endpoints are working
3. Ensure proper error handling in action functions
4. Check network tab for failed requests

## Migration from Inline Actions

If you have existing inline actions in Vue components:

1. Move the action logic to a dedicated action module
2. Update the `handleAction` function to use the action registry
3. Remove the inline action functions from the component
4. Test the migrated actions thoroughly

This modular approach provides better organization, reusability, and maintainability for your table actions.