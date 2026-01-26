import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/aiModels/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "name", 
      title: "Name",
      type: "text",
      sortable: true
    },
    { 
      key: "code", 
      title: "Code",
      type: "text",
      sortable: true
    },
    { 
      key: "category", 
      title: "Category",
      type: "text",
      sortable: true
    },
    { 
      key: "cost", 
      title: "Cost",
      type: "number",
      sortable: true
    },
    { 
      key: "isPremium", 
      title: "Premium",
      type: "boolean",
      sortable: true
    },
    { 
      key: "allowAttachments", 
      title: "Allow Attachments",
      type: "boolean",
      sortable: true
    },
    { 
      key: "isActive", 
      title: "Active",
      type: "boolean",
      sortable: true
    },
    { 
      key: "sortOrder", 
      title: "Sort Order",
      type: "number",
      sortable: true
    }
  ],
  filters: [
    {
      key: "category",
      title: "Category",
      type: "select",
      options: [
        { value: "text", label: "Text" },
        { value: "image", label: "Image" },
        { value: "audio", label: "Audio" },
        { value: "video", label: "Video" },
        { value: "multimodal", label: "Multimodal" }
      ]
    },
    {
      key: "isPremium",
      title: "Premium",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
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
    field: "id",
    direction: "asc"
  },
  searchableFields: ["name", "code", "category"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "name", label: "Name", type: "text" },
    { key: "code", label: "Code", type: "text" },
    { key: "description", label: "Description", type: "text" },
    {
      key: "category",
      label: "Category",
      type: "text",
      editComponent: "select",
      options: [
        { value: "text", label: "Text" },
        { value: "image", label: "Image" },
        { value: "audio", label: "Audio" },
        { value: "video", label: "Video" },
        { value: "multimodal", label: "Multimodal" }
      ]
    },
    { key: "cost", label: "Cost", type: "number" },
    { key: "isPremium", label: "Premium", type: "boolean" },
    { key: "allowAttachments", label: "Allow Attachments", type: "boolean" },
    { key: "isActive", label: "Active", type: "boolean" },
    { key: "sortOrder", label: "Sort Order", type: "number" },
    { key: "metadata", label: "Metadata", type: "json" }
  ]
}

export default config