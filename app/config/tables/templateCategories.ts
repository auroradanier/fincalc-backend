import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/templateCategories/",
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
      key: "parentCategoryId", 
      title: "Parent Category",
      type: "relation",
      relation: {
        table: "templateCategories",
        displayField: "name",
        valueField: "id",
        filter: true
      }
    },
    { 
      key: "level", 
      title: "Level",
      type: "number",
      sortable: true
    },
    { 
      key: "sortOrder", 
      title: "Sort Order",
      type: "number",
      sortable: true
    },
    { 
      key: "isActive", 
      title: "Active",
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
      key: "parentCategoryId",
      title: "Parent Category",
      type: "select"
    },
    {
      key: "level",
      title: "Level",
      type: "select",
      options: [
        { value: 0, label: "Root (0)" },
        { value: 1, label: "Level 1" },
        { value: 2, label: "Level 2" },
        { value: 3, label: "Level 3" }
      ]
    },
    {
      key: "isActive",
      title: "Active",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    }
  ],
  defaultSort: {
    field: "sortOrder",
    direction: "asc"
  },
  searchableFields: ["name", "slug", "description"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "name", label: "Name", type: "text" },
    { key: "slug", label: "Slug", type: "text", readOnly: true },
    { key: "description", label: "Description", type: "textarea" },
    { key: "icon", label: "Icon", type: "text" },
    { key: "parentCategoryId", label: "Parent Category", type: "relation", relation: { table: "templateCategories", displayField: "name", valueField: "id" }, editComponent: "select" },
    { key: "level", label: "Level", type: "number" },
    { key: "sortOrder", label: "Sort Order", type: "number" },
    { key: "isActive", label: "Active", type: "boolean", },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config