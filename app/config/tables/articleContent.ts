import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    {
      key: "id",
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/articleContent/",
        param: "id"
      },
      sortable: true
    },
    {
      key: "articleId",
      title: "Article",
      type: "text"
    },
    {
      key: "locale",
      title: "Locale",
      type: "text",
      sortable: true
    },
    {
      key: "title",
      title: "Title",
      type: "text"
    },
    {
      key: "description",
      title: "Description",
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
    field: "id",
    direction: "asc"
  },
  searchableFields: ["title", "description", "content"],
  perPage: 20,

  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "articleId", label: "Article ID", type: "text", readOnly: true },
    { key: "locale", label: "Locale", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", rows: 3 },
    { key: "content", label: "Content (Markdown)", type: "textarea", rows: 15 },
    { key: "metadata", label: "Metadata (JSON)", type: "textarea", rows: 5 }
  ]
}

export default config
