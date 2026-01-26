import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/oauthApplication/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "clientId", 
      title: "Client ID",
      type: "text"
    },
    { 
      key: "name", 
      title: "Name",
      type: "text"
    },
    { 
      key: "type", 
      title: "Type",
      type: "text"
    },
    { 
      key: "disabled", 
      title: "Disabled",
      type: "boolean"
    },
    { 
      key: "redirectURLs", 
      title: "Redirect URLs",
      type: "text",
      format: (value: string) => {
        const maxLength = 50;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
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
        { value: "web", label: "Web" },
        { value: "mobile", label: "Mobile" }
      ]
    },
    {
      key: "disabled",
      title: "Disabled",
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
  searchableFields: ["clientId", "name"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "clientId", label: "Client ID", type: "text" },
    { key: "clientSecret", label: "Client Secret", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "redirectURLs", label: "Redirect URLs", type: "textarea", rows: 3 },
    { key: "metadata", label: "Metadata", type: "textarea", rows: 3 },
    { key: "type", label: "Type", type: "text" },
    { key: "disabled", label: "Disabled", type: "boolean" },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config