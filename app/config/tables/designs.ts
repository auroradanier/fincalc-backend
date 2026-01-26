import type { TableConfig } from '../types'
import { getImageUrl } from '~~/shared/utils/imageTools'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/designs/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "title", 
      title: "Title",
      format: (value: string) => {
        const maxLength = 40;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "thumbnail", 
      title: "Preview",
      type: "image",
      format: (value: string) => {
        if (!value) return value;
        // Use the new getImageUrl function which handles both filenames and full URLs
        return getImageUrl(value, 'xs', 'design-thumbnail');
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
      key: "width", 
      title: "Width",
      type: "number"
    },
    { 
      key: "height", 
      title: "Height",
      type: "number"
    },
    { 
      key: "isPublic", 
      title: "Public",
      type: "boolean"
    },
    { key: "viewCount", title: "Views", sortable: true },
    { 
      key: "createdAt", 
      title: "Created At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
      sortable: true
    },
    { 
      key: "isDeleted", 
      title: "Deleted",
      type: "boolean"
    },
    { 
      key: "uuid", 
      title: "UUID",
      type: "text"
    }
  ],
  filters: [
    {
      key: "userId",
      title: "User",
      type: "select"
    },
    {
      key: "isPublic",
      title: "Public",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    },
    {
      key: "isDeleted",
      title: "Deleted",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    },
    {
      key: "templateId",
      title: "From Template",
      type: "select"
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["title", "description", "tags"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "uuid", label: "UUID", type: "text", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "thumbnail", label: "Thumbnail", type: "image", uploadTarget: "design-thumbnail", format: function(value: string) {
      if (!value) return value;
      // Use the new getImageUrl function which handles both filenames and full URLs
      return getImageUrl(value, 'sm', this.uploadTarget);
    } },
    { key: "width", label: "Width", type: "number" },
    { key: "height", label: "Height", type: "number" },
    { key: "isPublic", label: "Public", type: "boolean" },
    { key: "templateId", label: "Template", type: "relation", relation: { table: "templates", displayField: "title", valueField: "id" }, editComponent: "select" },
    { key: "tags", label: "Tags (JSON)", type: "json" },
    { key: "viewCount", label: "View Count", type: "number", readOnly: true },
    { key: "version", label: "Version", type: "number" },
    { key: "isDeleted", label: "Is Deleted", type: "boolean" },
    { key: "designData", label: "Design Data (JSON)", type: "json" }
  ],
  
  // Actions Configuration
  actions: [
    {
      key: "setAsTemplate",
      title: "Set as Template",
      type: "button",
      variant: "primary",
      handler: "setAsTemplate",
      confirm: {
        title: "Set as Template",
        message: "Are you sure you want to set this design as a template? This will create a new template and remove IDs and timestamps from the design data."
      }
    },
    {
      key: "downloadPreview",
      title: "Download Preview",
      type: "button",
      variant: "secondary",
      handler: "downloadPreview",
      download: true,
      showInList: false
    }
  ]
}

export default config