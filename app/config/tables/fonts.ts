import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "id", 
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/fonts/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "name", 
      title: "Name",
      type: "text",
      sortable: true,
      sortSubKey: "en",
      sortLower: true,
      format: (value: any) => {
        const maxLength = 30;
        const fullText = (() => {
          if (typeof value === 'object' && value !== null) {
            // Handle JSONB name field - show all language names
            return Object.entries(value)
              .map(([lang, name]) => `${name} (${lang})`)
              .join(', ') || 'Unknown';
          }
          return value || 'Unknown';
        })();
        
        if (fullText.length > maxLength) {
          return fullText.substring(0, maxLength) + '...';
        }
        return fullText;
      },
      tooltip: (value: any) => {
        // Reuse the same logic as format but without truncation
        if (typeof value === 'object' && value !== null) {
          return Object.entries(value)
            .map(([lang, name]) => `${name} (${lang})`)
            .join(', ') || 'Unknown';
        }
        return value || 'Unknown';
      }
    },
    { 
      key: "family", 
      title: "Family",
      type: "text",
      sortable: true
    },
    {
      key: "variants",
      title: "Variants",
      type: "text",
      format: (value: any) => {
        if (Array.isArray(value)) {
          return `${value.length} variant${value.length !== 1 ? 's' : ''}`;
        }
        return 'No variants';
      }
    },
    {
      key: "category",
      title: "Category",
      type: "text",
    },
    {
      key: "language",
      title: "Language",
      type: "text",
    },
    {
      key: "source",
      title: "Source",
      type: "text",
    },
    { 
      key: "isPremium", 
      title: "Premium",
      type: "boolean"
    },
    { 
      key: "isActive", 
      title: "Active",
      type: "boolean"
    },
    { 
      key: "isFeatured", 
      title: "Featured",
      type: "boolean"
    },
    { 
      key: "usageCount", 
      title: "Usage Count",
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
      key: "category",
      title: "Category",
      type: "select",
      options: [
        { value: "sans-serif", label: "Sans Serif" },
        { value: "serif", label: "Serif" },
        { value: "cursive", label: "Cursive" },
        { value: "monospace", label: "Monospace" },
        { value: "system", label: "System" }
      ]
    },
    {
      key: "language",
      title: "Language",
      type: "select",
      options: [
        { value: "english", label: "English" },
        { value: "chinese-simplified", label: "Chinese Simplified" },
        { value: "chinese-traditional", label: "Chinese Traditional" },
        { value: "japanese", label: "Japanese" },
        { value: "korean", label: "Korean" },
        { value: "arabic", label: "Arabic" }
      ]
    },
    {
      key: "source",
      title: "Source",
      type: "select",
      options: [
        { value: "bunny", label: "Bunny" },
        { value: "google", label: "Google" },
        { value: "custom", label: "Custom" },
        { value: "system", label: "System" },
        { value: "zeo", label: "Zeo" },
        { value: "fontsource", label: "Fontsource" }
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
    field: "id",
    direction: "asc"
  },
  searchableFields: ["name", "family", "description"],
  perPage: 20,
  
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true },
    { key: "name", label: "Name", type: "json" },
    { key: "family", label: "Family", type: "text" },
    { key: "variants", label: "Variants", type: "json" },
    { key: "category", label: "Category", type: "text" },
    { key: "language", label: "Language", type: "text" },
    { key: "source", label: "Source", type: "text" },
    { key: "description", label: "Description", type: "textarea", rows: 3 },
    { key: "isPremium", label: "Premium", type: "boolean" },
    { key: "isActive", label: "Active", type: "boolean" },
    { key: "isFeatured", label: "Featured", type: "boolean" },
    { key: "usageCount", label: "Usage Count", type: "number", readOnly: true },
    { key: "sortOrder", label: "Sort Order", type: "number" }
  ]
}

export default config