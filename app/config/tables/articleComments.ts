import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    {
      key: "id",
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/articleComments/",
        param: "id"
      },
      sortable: true
    },
    {
      key: "articleId",
      title: "Article ID",
      type: "text"
    },
    {
      key: "userId",
      title: "User",
      type: "relation",
      relation: {
        table: "user",
        displayField: "name",
        valueField: "id"
      }
    },
    {
      key: "userName",
      title: "Author Name",
      type: "text"
    },
    {
      key: "content",
      title: "Content",
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
      key: "parentId",
      title: "Parent ID",
      type: "text"
    },
    {
      key: "threadLevel",
      title: "Thread Level",
      type: "number",
      sortable: true
    },
    {
      key: "moderationStatus",
      title: "Moderation",
      type: "text",
      sortable: true
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
      key: "moderationStatus",
      title: "Moderation Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "spam", label: "Spam" },
        { value: "deleted", label: "Deleted" }
      ]
    },
    {
      key: "threadLevel",
      title: "Thread Level",
      type: "select",
      options: [
        { value: 0, label: "Top Level" },
        { value: 1, label: "Level 1" },
        { value: 2, label: "Level 2" },
        { value: 3, label: "Level 3+" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["userName", "content"],
  perPage: 20,

  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "articleId", label: "Article ID", type: "text", readOnly: true },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "userName", label: "User Name", type: "text", readOnly: true },
    { key: "content", label: "Content", type: "textarea", rows: 5 },
    { key: "parentId", label: "Parent Comment ID", type: "text" },
    { key: "threadLevel", label: "Thread Level", type: "number" },
    { key: "moderationStatus", label: "Moderation Status", type: "text" },
    { key: "metadata", label: "Metadata (JSON)", type: "textarea", rows: 5 },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config
