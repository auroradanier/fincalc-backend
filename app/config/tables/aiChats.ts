import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/aiChats/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "title", 
      title: "Title",
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
      key: "sessionId", 
      title: "Session ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/aiChatMessages?sessionId=",
        param: "sessionId"
      },
      format: (value: string) => {
        if (value && value.length > 12) {
          return value.substring(0, 12) + '...';
        }
        return value;
      }
    },
    { 
      key: "designId", 
      title: "Design",
      type: "relation",
      relation: {
        table: "designs",
        displayField: "title",
        valueField: "id",
        filter: true
      }
    },
    { 
      key: "isDeleted", 
      title: "Deleted",
      type: "boolean"
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
      key: "userId",
      title: "User",
      type: "select"
    },
    {
      key: "designId",
      title: "Design",
      type: "select"
    },
    {
      key: "isDeleted",
      title: "Deleted",
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
  searchableFields: ["title", "sessionId"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "title", label: "Title", type: "text" },
    { key: "sessionId", label: "Session ID", type: "text" },
    { key: "designId", label: "Design", type: "relation", relation: { table: "designs", displayField: "title", valueField: "id" }, editComponent: "select" },
    { key: "isDeleted", label: "Deleted", type: "boolean" }
  ]
}

export default config