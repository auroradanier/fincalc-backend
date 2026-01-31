import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    {
      key: "id",
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/articles/",
        param: "id"
      },
      sortable: true
    },
    {
      key: "slug",
      title: "Slug",
      type: "text"
    },
    {
      key: "userId",
      title: "Author",
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
      key: "status",
      title: "Status",
      type: "text",
      sortable: true
    },
    {
      key: "primaryLocale",
      title: "Language",
      type: "text"
    },
    {
      key: "categorySlug",
      title: "Category",
      type: "text"
    },
    {
      key: "titles",
      title: "Titles",
      type: "text",
      format: (value: any) => {
        if (!value) return 'N/A';
        const obj = typeof value === 'string' ? JSON.parse(value) : value;
        return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(', ');
      }
    },
    {
      key: "descriptions",
      title: "Descriptions",
      type: "text",
      format: (value: any) => {
        if (!value) return 'N/A';
        const obj = typeof value === 'string' ? JSON.parse(value) : value;
        const firstValue = Object.values(obj)[0];
        if (!firstValue || typeof firstValue !== 'string') return 'N/A';
        return firstValue.substring(0, 50) + '...';
      }
    },
    {
      key: "allowComments",
      title: "Comments",
      type: "boolean"
    },
    {
      key: "isFeatured",
      title: "Featured",
      type: "boolean",
      sortable: true
    },
    {
      key: "isPinned",
      title: "Pinned",
      type: "boolean",
      sortable: true
    },
    {
      key: "moderationStatus",
      title: "Moderation",
      type: "text",
      sortable: true
    },
    {
      key: "commentCount",
      title: "Comments",
      type: "number",
      sortable: true
    },
    {
      key: "viewCount",
      title: "Views",
      type: "number",
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
      key: "status",
      title: "Status",
      type: "select",
      options: [
        { value: "draft", label: "Draft" },
        { value: "published", label: "Published" },
        { value: "private", label: "Private" }
      ]
    },
    {
      key: "moderationStatus",
      title: "Moderation Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
        { value: "rejected", label: "Rejected" },
        { value: "deleted", label: "Deleted" }
      ]
    },
    {
      key: "isFeatured",
      title: "Featured",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    },
    {
      key: "isPinned",
      title: "Pinned",
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
  searchableFields: ["slug", "userName", "titles", "descriptions"],
  perPage: 20,

  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "titles", label: "Titles (JSONB - Multilingual)", type: "textarea", rows: 5 },
    { key: "descriptions", label: "Descriptions (JSONB - Multilingual)", type: "textarea", rows: 8 },
    { key: "slug", label: "Slug", type: "text", editOnly: true, description: "Auto-generated from English title on create, editable after create" },
    { key: "userId", label: "Author", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "userName", label: "Author Name", type: "text", readOnly: true },
    { key: "status", label: "Status", type: "text", editComponent: "select", options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
      { value: "private", label: "Private" }
    ]},
    { key: "categorySlug", label: "Category", type: "text" },
    { key: "allowComments", label: "Allow Comments", type: "boolean" },
    { key: "isFeatured", label: "Featured", type: "boolean" },
    { key: "isPinned", label: "Pinned", type: "boolean" },
    { key: "moderationStatus", label: "Moderation Status", type: "text" },
    { key: "commentCount", label: "Comment Count", type: "number", readOnly: true },
    { key: "viewCount", label: "View Count", type: "number", readOnly: true },
    { key: "primaryLocale", label: "Primary Locale", type: "text" },
    { key: "categorySlug", label: "Category Slug", type: "text" },
    { key: "metadata", label: "Metadata (JSON)", type: "textarea", rows: 5 },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config
