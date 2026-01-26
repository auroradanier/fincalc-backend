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
        path: "/admin/templates/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "title", 
      title: "Title",
      format: (value: string) => {
        const maxLength = 50;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "designUuid", 
      title: "Design UUID",
      type: "text",
      format: (value: string) => {
        if (value && value.length > 8) {
          return value.substring(0, 8) + '...';
        }
        return value || 'N/A';
      }
    },
    { 
      key: "thumbnail", 
      title: "Preview",
      type: "image",
      format: (value: string) => {
        if (!value) return value;
        // Use the new getImageUrl function which handles both filenames and full URLs
        return getImageUrl(value, 'xs', 'template-thumbnail');
      },
      hoverPreview: (value: string) => {
        if (!value) return null;
        // Use getImageUrl function with sm size for hover preview
        return getImageUrl(value, 'sm', 'template-thumbnail');
      }
    },
    { 
      key: "slug", 
      title: "Slug",
      type: "text"
    },
    { 
      key: "aspectRatio", 
      title: "Ratio",
      type: "text"
    },
    { 
      key: "templateType", 
      title: "Type",
      type: "text"
    },
    { 
      key: "isPremium", 
      title: "Premium",
      type: "boolean"
    },
    { 
      key: "categoryId", 
      title: "Category",
      type: "relation",
      relation: {
        table: "templateCategories",
        displayField: "name",
        valueField: "id",
        filter: true
      }
    },
    { 
      key: "isFeatured", 
      title: "Featured",
      type: "boolean"
    },
    { 
      key: "viewCount", 
      title: "Views",
      type: "number",
      sortable: true
    },
    { 
      key: "usageCount", 
      title: "Usage",
      type: "number",
      sortable: true
    },
    { 
      key: "likeCount", 
      title: "Likes",
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
    },
    { 
      key: "isActive", 
      title: "Active",
      type: "boolean"
    }
  ],
  filters: [
    {
      key: "categoryId",
      title: "Category",
      type: "select"
    },
    {
      key: "isActive",
      title: "Active",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
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
      key: "isFeatured",
      title: "Featured",
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
  searchableFields: ["title", "description", "tags"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true },
    { key: "designUuid", label: "Design UUID", type: "text", readOnly: true },
    { key: "title", label: "Title", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "thumbnail", label: "Thumbnail", type: "image", uploadTarget: "template-thumbnail", format: function(value: string) {
      if (!value) return value;
      // Use getImageUrl function which handles both filenames and full URLs
      return getImageUrl(value, 'sm', this.uploadTarget);
    }, hoverPreview: function(value: string) {
      if (!value) return null;
      // Use getImageUrl function with md size for hover preview
      return getImageUrl(value, 'md', this.uploadTarget);
    } },
    { key: "designData", label: "Design Data (JSON)", type: "json", readOnly: true },
    { key: "width", label: "Width", type: "number" , readOnly: true },
    { key: "height", label: "Height", type: "number" , readOnly: true },
    { key: "aspectRatio", label: "Aspect Ratio", type: "text" },
    { key: "templateType", label: "Template Type", type: "text", editComponent: "select", options: [
      { value: "blank", label: "Blank" },
      { value: "design", label: "Design" }
    ] },
    { key: "prompt", label: "AI Prompt", type: "textarea" },
    { key: "categoryId", label: "Category", type: "relation", relation: { table: "templateCategories", displayField: "name", valueField: "id" }, editComponent: "select" },
    { key: "tags", label: "Tags", type: "text" },
    { key: "isPremium", label: "Premium", type: "boolean" },
    { key: "isActive", label: "Active", type: "boolean", editOnly: true },
    { key: "isFeatured", label: "Featured", type: "boolean" },
    { key: "viewCount", label: "View Count", type: "number", readOnly: true },
    { key: "usageCount", label: "Usage Count", type: "number", readOnly: true },
    { key: "likeCount", label: "Like Count", type: "number", readOnly: true },
    { key: "metadata", label: "Metadata", type: "json", readOnly: true },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "sortOrder", label: "Sort Order", type: "number" }
  ]
}

export default config