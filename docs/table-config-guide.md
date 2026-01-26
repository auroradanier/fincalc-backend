# Table Configuration Guide

This guide explains how to create and configure table configuration files for the admin interface.

## Overview

Table configuration files define how data tables are displayed and managed in the admin interface. Each table in your database should have a corresponding configuration file in `/app/config/tables/`.

## File Structure

Configuration files should be named after the table they represent (e.g., `users.ts`, `designs.ts`) and follow this structure:

```typescript
import type { TableConfig } from '../types'

const config: TableConfig = {
  // Configuration options here
}

export default config
```

## Configuration Options

### Basic Structure

```typescript
interface TableConfig {
  columns: ColumnConfig[];
  defaultSort?: { field: string; direction: 'asc' | 'desc' };
  searchableFields?: string[];
  perPage?: number;
  filters?: FilterConfig[];
  detailFields?: DetailFieldConfig[];
  excludeFieldsInDetail?: string[];
}
```

### Columns Configuration

The `columns` array defines how data is displayed in the table list view:

```typescript
columns: [
  {
    key: "id",           // Database field name
    title: "ID",         // Display title
    type: "link",        // Optional: text, number, boolean, date, link, relation
    link: {              // For link type
      type: "internal",
      path: "/admin/users/",
      param: "id"
    },
    sortable: true       // Enable sorting
  },
  {
    key: "email",
    title: "Email Address",
    format: (value: string) => {  // Custom formatting function
      return value.toLowerCase();
    }
  }
]
```

#### Column Types

- **text**: Plain text display
- **number**: Numeric values
- **boolean**: True/false values (displayed as checkmarks)
- **date**: Timestamp values (automatically formatted)
- **link**: Creates clickable links
- **relation**: Shows related data from another table

#### Link Configuration

```typescript
link: {
  type: "internal" | "external",
  path: "/admin/users/",     // For internal links
  param: "id",               // Field to use as parameter
  externalUrl: "https://..." // For external links
}
```

#### Relation Configuration

```typescript
relation: {
  table: "categories",        // Related table name
  displayField: "name",      // Field to display
  valueField: "id",          // Field to use as value
  filter: true               // Enable filtering by this relation
}
```

### Filters Configuration

Filters allow users to narrow down the displayed data:

```typescript
filters: [
  {
    key: "status",
    title: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" }
    ]
  },
  {
    key: "categoryId",
    title: "Category",
    type: "select"  // Options will be loaded from relation
  }
]
```

#### Filter Types

- **select**: Dropdown selection
- **boolean**: True/false toggle
- **text**: Text input (for search)

### Detail Fields Configuration

The `detailFields` array defines how individual records are displayed and edited:

```typescript
detailFields: [
  {
    key: "id",
    label: "ID",
    type: "number",
    readOnly: true
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    rows: 5
  },
  {
    key: "categoryId",
    label: "Category",
    type: "relation",
    relation: {
      table: "categories",
      displayField: "name",
      valueField: "id"
    },
    editComponent: "select"
  }
]
```

#### Detail Field Types

- **text**: Single-line text input
- **textarea**: Multi-line text input
- **number**: Numeric input
- **boolean**: Checkbox
- **date**: Date picker
- **datetime**: Date and time picker
- **relation**: Related data selector

#### Edit Components

- **text**: Text input
- **textarea**: Textarea
- **number**: Number input
- **boolean**: Checkbox
- **select**: Dropdown (for relations)
- **autocomplete**: Autocomplete input
- **datepicker**: Date picker
- **timefield**: Time input

### Inline Editing Configuration

Inline editing allows users to edit field values directly in the table list view without navigating to a separate edit page. When a field has inline editing enabled, it will automatically be made read-only in the edit page to prevent conflicts.

#### Configuring Inline Editing in Columns

To enable inline editing for a column, add the `editComponent` property to the column configuration:

```typescript
columns: [
  {
    key: "title",
    title: "Title",
    type: "text",
    editComponent: "text"  // Enables inline text editing
  },
  {
    key: "price",
    title: "Price",
    type: "number",
    editComponent: "number"  // Enables inline number editing
  },
  {
    key: "isActive",
    title: "Active",
    type: "boolean",
    editComponent: "boolean"  // Enables inline boolean toggle
  },
  {
    key: "status",
    title: "Status",
    type: "text",
    editComponent: "select"  // Enables inline select dropdown
  },
  {
    key: "tags",
    title: "Tags",
    type: "text",
    editComponent: "multiselect"  // Enables inline multiselect
  }
]
```

#### Available Inline Edit Components

- **text**: Single-line text input
- **textarea**: Multi-line text input
- **number**: Numeric input with increment/decrement buttons
- **boolean**: Toggle switch or checkbox
- **select**: Dropdown selection (for relations or predefined options)
- **multiselect**: Multiple selection dropdown
- **autocomplete**: Autocomplete input with suggestions
- **datepicker**: Date selection widget
- **timefield**: Time input field

#### Best Practices for Inline Editing

1. **Use sparingly**: Only enable inline editing for frequently updated fields
2. **Simple fields only**: Avoid inline editing for complex fields like large text areas or file uploads
3. **Consistent UX**: Use inline editing consistently across similar field types
4. **Validation**: Ensure proper validation is in place for inline edits
5. **Feedback**: Provide clear visual feedback when inline edits are saved or fail

**Note**: When a field has inline editing enabled in the columns configuration, it will automatically be displayed as read-only in the edit page to prevent editing conflicts.

### Additional Options

#### Default Sorting

```typescript
defaultSort: {
  field: "createdAt",
  direction: "desc"
}
```

#### Searchable Fields

```typescript
searchableFields: ["title", "description", "tags"]
```

#### Pagination

```typescript
perPage: 20  // Number of items per page
```

#### Field Exclusions

```typescript
excludeFieldsInDetail: ["password", "internalNotes"]  // Completely hidden from detail, edit, and create forms
```

**Note**: To make a field read-only in the edit form, use the `readOnly: true` property on individual fields in the `detailFields` array.

## Complete Example

Here's a complete example for a `users` table:

```typescript
import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/users/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "email", 
      title: "Email",
      type: "text"
    },
    { 
      key: "isActive", 
      title: "Active",
      type: "boolean"
    },
    { 
      key: "createdAt", 
      title: "Created At",
      type: "date",
      format: (value: number) => new Date(value * 1000).toLocaleString(),
      sortable: true
    }
  ],
  filters: [
    {
      key: "isActive",
      title: "Status",
      type: "select",
      options: [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["email", "username", "displayName"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "email", label: "Email", type: "text" },
    { key: "username", label: "Username", type: "text" },
    { key: "displayName", label: "Display Name", type: "text" },
    { key: "isActive", label: "Active", type: "boolean" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true }
  ],
  
  excludeFieldsInDetail: ["password"]
}

export default config
```

## Actions Configuration

Actions allow you to add custom buttons to table rows for performing operations on individual records.

### Basic Action Configuration

```typescript
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
  },
  {
    key: "duplicate",
    title: "Duplicate",
    type: "button",
    variant: "secondary",
    handler: "duplicateRecord",
    icon: "copy"
  }
]
```

### Action Properties

- `key`: Unique identifier for the action
- `title`: Display text for the action button
- `type`: Always "button" for now
- `variant`: Button style ("primary", "secondary", "danger")
- `handler`: String reference to the action handler function
- `icon`: Optional icon name
- `confirm`: Optional confirmation dialog with title and message

### Action Implementation

Action handlers are implemented in separate modules in `/app/config/actions/`. See the [Table Actions Guide](./table-actions-guide.md) for detailed implementation instructions.

## Best Practices

1. **Always include an ID column** with a link to the detail view
2. **Use meaningful titles** that are user-friendly
3. **Format long text fields** to prevent table overflow
4. **Mark system fields as readOnly** (createdAt, updatedAt, etc.)
5. **Use relations** for foreign key fields to show meaningful data
6. **Add appropriate filters** for commonly searched fields
7. **Set reasonable pagination** (typically 10-50 items per page)
8. **Exclude sensitive fields** like passwords from detail views
9. **Use custom format functions** for better data presentation
10. **Test your configuration** to ensure all fields display correctly
11. **Organize actions logically** - put destructive actions last with "danger" variant
12. **Use confirmation dialogs** for irreversible actions
13. **Implement actions in separate modules** for better maintainability

## Troubleshooting

### Common Issues

1. **Field not displaying**: Check that the field key matches the database column name
2. **Relation not working**: Verify the related table name and field names
3. **Sorting not working**: Ensure the field is marked as `sortable: true`
4. **Filter not showing options**: Check that filter options are properly defined
5. **Edit form not working**: Verify detail fields configuration and types

### Debugging Tips

1. Check browser console for JavaScript errors
2. Verify database field names match configuration keys
3. Test with minimal configuration first, then add features
4. Use browser dev tools to inspect API responses
5. Check that all imported types are correct

## Adding New Tables

1. Create a new `.ts` file in `/app/config/tables/`
2. Follow the naming convention (table name + `.ts`)
3. Import and configure according to your table schema
4. Add the table to the admin navigation in `AdminNavbar.vue`
5. Test the configuration thoroughly

This configuration system provides a flexible way to manage how your data is displayed and edited in the admin interface without writing custom components for each table.