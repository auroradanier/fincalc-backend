import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/userCredits/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "userId", 
      title: "User",
      type: "relation",
      relation: {
        table: "user",
        displayField: "email",
        valueField: "id"
      },
      link: {
        type: "internal",
        path: "/admin/user/",
        param: "userId"
      },
      sortable: true
    },
    { 
      key: "amount", 
      title: "Initial Amount",
      type: "number",
      sortable: true
    },
    { 
      key: "remaining", 
      title: "Remaining",
      type: "number",
      sortable: true
    },
    { 
      key: "source", 
      title: "Source",
      type: "text",
      sortable: true
    },
    { 
      key: "expiresAt", 
      title: "Expires At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'Never',
      sortable: true
    },
    { 
      key: "isExpired", 
      title: "Expired",
      type: "boolean",
      sortable: true
    },
    { 
      key: "createdAt", 
      title: "Created At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
      sortable: true
    }
  ],
  filters: [
    {
      key: "source",
      title: "Source",
      type: "select",
      options: [
        { value: "purchase", label: "Purchase" },
        { value: "bonus", label: "Bonus" },
        { value: "refund", label: "Refund" },
        { value: "admin_grant", label: "Admin Grant" },
        { value: "promotion", label: "Promotion" }
      ]
    },
    {
      key: "isExpired",
      title: "Expired",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["userId"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "userId", label: "User ID", type: "text" },
    { key: "amount", label: "Initial Amount", type: "number" },
    { key: "remaining", label: "Remaining Credits", type: "number" },
    { key: "source", label: "Source", type: "text", editComponent: "select", options: [
      { value: "purchase", label: "Purchase" },
      { value: "bonus", label: "Bonus" },
      { value: "refund", label: "Refund" },
      { value: "admin_grant", label: "Admin Grant" },
      { value: "promotion", label: "Promotion" }
    ] },
    { key: "expiresAt", label: "Expires At", type: "datetime" },
    { key: "isExpired", label: "Is Expired", type: "boolean" },
    { key: "metadata", label: "Metadata", type: "json" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true }
  ]
}

export default config