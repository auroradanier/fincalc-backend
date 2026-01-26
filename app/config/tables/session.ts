import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/session/",
        param: "id"
      },
      sortable: true,
      format: (value: string) => {
        if (value && value.length > 12) {
          return value.substring(0, 12) + '...';
        }
        return value;
      }
    },
    { 
      key: "userId", 
      title: "User",
      type: "relation",
      relation: {
        table: "user",
        displayField: "email",
        valueField: "id",
        filter: true
      }
    },
    { 
      key: "token", 
      title: "Token",
      type: "text",
      format: (value: string) => {
        if (value && value.length > 16) {
          return value.substring(0, 16) + '...';
        }
        return value;
      }
    },
    { 
      key: "ipAddress", 
      title: "IP Address",
      type: "text"
    },
    { 
      key: "userAgent", 
      title: "User Agent",
      type: "text",
      format: (value: string) => {
        const maxLength = 30;
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
      key: "userId",
      title: "User",
      type: "select"
    },
    {
      key: "ipAddress",
      title: "IP Address",
      type: "text"
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["token", "ipAddress", "userAgent"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "token", label: "Token", type: "text", readOnly: true },
    { key: "expiresAt", label: "Expires At", type: "datetime" },
    { key: "ipAddress", label: "IP Address", type: "text", readOnly: true },
    { key: "userAgent", label: "User Agent", type: "textarea", readOnly: true },
    { key: "impersonatedBy", label: "Impersonated By", type: "text" }
  ]
}

export default config