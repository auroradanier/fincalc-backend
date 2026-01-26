import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/verification/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "identifier", 
      title: "Identifier",
      type: "text"
    },
    { 
      key: "value", 
      title: "Value",
      type: "text",
      format: (value: string) => {
        // Truncate long verification codes for display
        const maxLength = 20;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "expiresAt", 
      title: "Expires At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
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
      key: "identifier",
      title: "Identifier Type",
      type: "select",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "reset", label: "Password Reset" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["identifier", "value"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "identifier", label: "Identifier", type: "text", readOnly: true },
    { key: "value", label: "Value", type: "textarea", readOnly: true },
    { key: "expiresAt", label: "Expires At", type: "datetime", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config