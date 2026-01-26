import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/creditTransactions/",
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
      key: "creditPackageId", 
      title: "Credit Package ID",
      type: "number",
      sortable: true
    },
    { 
      key: "amount", 
      title: "Amount",
      type: "number",
      sortable: true,
      format: (value: any) => {
        const num = Number(value);
        return num > 0 ? `+${num}` : `${num}`;
      }
    },
    { 
      key: "type", 
      title: "Type",
      type: "text",
      sortable: true
    },
    { 
      key: "category", 
      title: "Category",
      type: "text",
      sortable: true
    },
    { 
      key: "description", 
      title: "Description",
      type: "text"
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
      key: "type",
      title: "Type",
      type: "select",
      options: [
        { value: "grant", label: "Grant" },
        { value: "usage", label: "Usage" },
        { value: "refund", label: "Refund" },
        { value: "expiration", label: "Expiration" },
        { value: "admin_adjustment", label: "Admin Adjustment" }
      ]
    },
    {
      key: "category",
      title: "Category",
      type: "select",
      options: [
        { value: "ai_generation", label: "AI Generation" },
        { value: "template_download", label: "Template Download" },
        { value: "export", label: "Export" },
        { value: "premium_feature", label: "Premium Feature" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["userId", "description"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "userId", label: "User ID", type: "text" },
    { key: "creditPackageId", label: "Credit Package ID", type: "number" },
    { key: "amount", label: "Amount", type: "number" },
    { key: "type", label: "Type", type: "text", editComponent: "select", options: [
      { value: "grant", label: "Grant" },
      { value: "usage", label: "Usage" },
      { value: "refund", label: "Refund" },
      { value: "expiration", label: "Expiration" },
      { value: "admin_adjustment", label: "Admin Adjustment" }
    ] },
    { key: "category", label: "Category", type: "text", editComponent: "select", options: [
      { value: "ai_generation", label: "AI Generation" },
      { value: "template_download", label: "Template Download" },
      { value: "export", label: "Export" },
      { value: "premium_feature", label: "Premium Feature" }
    ] },
    { key: "description", label: "Description", type: "textarea", rows: 3 },
    { key: "metadata", label: "Metadata", type: "json" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true }
  ]
}

export default config