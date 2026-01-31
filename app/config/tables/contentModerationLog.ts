import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    {
      key: "id",
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/contentModerationLog/",
        param: "id"
      },
      sortable: true
    },
    {
      key: "contentId",
      title: "Content ID",
      type: "text"
    },
    {
      key: "contentType",
      title: "Content Type",
      type: "text",
      sortable: true
    },
    {
      key: "userId",
      title: "Moderator",
      type: "relation",
      relation: {
        table: "user",
        displayField: "name",
        valueField: "id"
      }
    },
    {
      key: "action",
      title: "Action",
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
      key: "contentType",
      title: "Content Type",
      type: "select",
      options: [
        { value: "article", label: "Article" },
        { value: "comment", label: "Comment" }
      ]
    },
    {
      key: "action",
      title: "Action",
      type: "select",
      options: [
        { value: "submitted", label: "Submitted" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "deleted", label: "Deleted" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["contentId", "action"],
  perPage: 20,

  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "contentId", label: "Content ID", type: "text", readOnly: true },
    { key: "contentType", label: "Content Type", type: "text", readOnly: true },
    { key: "userId", label: "Moderator", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, readOnly: true },
    { key: "action", label: "Action", type: "text", readOnly: true },
    { key: "metadata", label: "Metadata (JSON)", type: "textarea", rows: 5 },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true }
  ]
}

export default config
