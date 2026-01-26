import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/oauthAccessToken/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "accessToken", 
      title: "Access Token",
      type: "text",
      format: (value: string) => {
        const maxLength = 20;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "clientId", 
      title: "Client ID",
      type: "text"
    },
    { 
      key: "userId", 
      title: "User ID",
      type: "text"
    },
    { 
      key: "scopes", 
      title: "Scopes",
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
      key: "accessTokenExpiresAt", 
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
      key: "clientId",
      title: "Client",
      type: "text"
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["accessToken", "clientId", "userId"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "accessToken", label: "Access Token", type: "textarea", rows: 3 },
    { key: "refreshToken", label: "Refresh Token", type: "textarea", rows: 3 },
    { key: "accessTokenExpiresAt", label: "Access Token Expires At", type: "datetime" },
    { key: "refreshTokenExpiresAt", label: "Refresh Token Expires At", type: "datetime" },
    { key: "clientId", label: "Client ID", type: "text" },
    { key: "userId", label: "User ID", type: "text" },
    { key: "scopes", label: "Scopes", type: "text" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config