import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/oauthConsent/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "userId", 
      title: "User ID",
      type: "text"
    },
    { 
      key: "clientId", 
      title: "Client ID",
      type: "text"
    },
    { 
      key: "scopes", 
      title: "Scopes",
      type: "text",
      format: (value: string) => {
        const maxLength = 40;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "consentGiven", 
      title: "Consent Given",
      type: "boolean"
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
      key: "consentGiven",
      title: "Consent Status",
      type: "select",
      options: [
        { value: true, label: "Granted" },
        { value: false, label: "Denied" }
      ]
    },
    {
      key: "clientId",
      title: "Client",
      type: "text"
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["userId", "clientId"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "userId", label: "User ID", type: "text" },
    { key: "clientId", label: "Client ID", type: "text" },
    { key: "scopes", label: "Scopes", type: "text" },
    { key: "consentGiven", label: "Consent Given", type: "boolean" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config