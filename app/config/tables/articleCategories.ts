import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    {
      key: "id",
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/articleCategories/",
        param: "id"
      },
      sortable: true
    },
    {
      key: "name",
      title: "Name",
      type: "text"
    },
    {
      key: "slug",
      title: "Slug",
      type: "text"
    },
    {
      key: "parentId",
      title: "Parent ID",
      type: "text"
    },
    {
      key: "locale",
      title: "Locale",
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
      key: "locale",
      title: "Locale",
      type: "select",
      options: [
        { value: "en", label: "English" },
        { value: "de", label: "German" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
        { value: "ja", label: "Japanese" },
        { value: "ko", label: "Korean" },
        { value: "zh", label: "Chinese (Simplified)" },
        { value: "zh-Hant", label: "Chinese (Traditional)" }
      ]
    }
  ],
  defaultSort: {
    field: "name",
    direction: "asc"
  },
  searchableFields: ["name", "slug", "description"],
  perPage: 20,

  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "name", label: "Name", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "description", label: "Description", type: "textarea", rows: 3 },
    { key: "parentId", label: "Parent Category ID", type: "text" },
    { key: "locale", label: "Locale", type: "text" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config
