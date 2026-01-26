import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/aiChatMessages/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "sessionId", 
      title: "Session ID",
      type: "text",
      format: (value: string) => {
        if (value && value.length > 12) {
          return value.substring(0, 12) + '...';
        }
        return value;
      }
    },
    { 
      key: "runId", 
      title: "Run ID",
      type: "text",
      format: (value: string) => {
        if (value && value.length > 12) {
          return value.substring(0, 12) + '...';
        }
        return value;
      }
    },
    { 
      key: "role", 
      title: "Role",
      type: "text"
    },
    { 
      key: "content", 
      title: "Content",
      type: "text",
      format: (value: string) => {
        const maxLength = 100;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "messageType", 
      title: "Message Type",
      type: "text"
    },
    { 
      key: "parentMessageId", 
      title: "Parent Message",
      type: "relation",
      relation: {
        table: "aiChatMessages",
        displayField: "id",
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
    }
  ],
  filters: [
    {
      key: "sessionId",
      title: "Session",
      type: "text"
    },
    {
      key: "runId",
      title: "Run ID",
      type: "text"
    },
    {
      key: "role",
      title: "Role",
      type: "select",
      options: [
        { value: "user", label: "User" },
        { value: "assistant", label: "Assistant" },
        { value: "system", label: "System" }
      ]
    },
    {
      key: "messageType",
      title: "Message Type",
      type: "text"
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
  searchableFields: ["content", "sessionId", "runId", "role"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "sessionId", label: "Session ID", type: "text" },
    { key: "runId", label: "Run ID", type: "text" },
    { key: "role", label: "Role", type: "text" },
    { key: "content", label: "Content", type: "textarea", rows: 5 },
    { key: "messageType", label: "Message Type", type: "text" },
    { key: "metadata", label: "Metadata", type: "textarea", rows: 3 },
    { key: "parentMessageId", label: "Parent Message", type: "relation", relation: { table: "aiChatMessages", displayField: "id", valueField: "id" }, editComponent: "select" },
    { key: "isDeleted", label: "Deleted", type: "boolean" }
  ]
}

export default config