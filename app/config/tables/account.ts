import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/account/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "accountId", 
      title: "Account ID",
      type: "text"
    },
    { 
      key: "providerId", 
      title: "Provider",
      type: "text"
    },
    { 
      key: "userId", 
      title: "User ID",
      type: "text"
    },
    { 
      key: "scope", 
      title: "Scope",
      type: "text"
    },
    { 
      key: "createdAt", 
      title: "Created At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
      sortable: true
    },
    { 
      key: "updatedAt", 
      title: "Updated At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
      sortable: true
    }
  ],
  filters: [
    {
      key: "providerId",
      title: "Provider",
      type: "select",
      options: [
        { value: "google", label: "Google" },
        { value: "github", label: "GitHub" },
        { value: "discord", label: "Discord" },
        { value: "email", label: "Email" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["accountId", "userId", "providerId"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "accountId", label: "Account ID", type: "text", readOnly: true },
    { key: "providerId", label: "Provider ID", type: "text", readOnly: true },
    { key: "userId", label: "User ID", type: "text", readOnly: true },
    { key: "accessToken", label: "Access Token", type: "textarea", readOnly: true },
    { key: "refreshToken", label: "Refresh Token", type: "textarea", readOnly: true },
    { key: "idToken", label: "ID Token", type: "textarea", readOnly: true },
    { key: "accessTokenExpiresAt", label: "Access Token Expires At", type: "datetime", readOnly: true },
    { key: "refreshTokenExpiresAt", label: "Refresh Token Expires At", type: "datetime", readOnly: true },
    { key: "scope", label: "Scope", type: "text", readOnly: true },
    { key: "password", label: "Password", type: "text", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ],
  
  excludeFieldsInDetail: ["accessToken", "refreshToken", "idToken", "password"]
}

export default config