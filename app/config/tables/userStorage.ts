import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    { 
      key: "userId", 
      title: "User ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/user/",
        param: "userId"
      },
      sortable: true
    },
    { 
      key: "limitBytes", 
      title: "Limit (Bytes)",
      type: "number",
      sortable: true,
      format: (value: any) => {
        if (!value) return '0';
        const bytes = Number(value);
        const mb = (bytes / (1024 * 1024)).toFixed(2);
        return `${mb} MB`;
      }
    },
    { 
      key: "usedBytes", 
      title: "Used (Bytes)",
      type: "number",
      sortable: true,
      format: (value: any) => {
        if (!value) return '0';
        const bytes = Number(value);
        const mb = (bytes / (1024 * 1024)).toFixed(2);
        return `${mb} MB`;
      }
    },
    { 
      key: "updatedAt", 
      title: "Updated At",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
      sortable: true
    }
  ],
  defaultSort: {
    field: "userId",
    direction: "asc"
  },
  searchableFields: ["userId"],
  perPage: 20,
  
  detailFields: [
    { key: "userId", label: "User ID", type: "text", readOnly: true },
    { key: "limitBytes", label: "Limit (Bytes)", type: "number" },
    { key: "usedBytes", label: "Used (Bytes)", type: "number" },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ]
}

export default config