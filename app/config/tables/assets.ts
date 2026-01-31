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
        path: "/admin/assets/",
        param: "id"
      },
      sortable: true
    },
    { 
      key: "filename", 
      title: "Preview",
      type: "image",
      format: (value: string, item: any) => {
        if (!value) return value;
        // Use designs target for assets preview with sm size
        return getImageUrl(value, 'sm', 'designs');
      },
      hoverPreview: (value: string, item: any) => {
        if (!value) return null;
        // Use designs target for assets preview with md size
        return getImageUrl(value, 'md', 'designs');
      }
    },
    { 
      key: "filename", 
      title: "Filename",
      format: (value: string) => {
        const maxLength = 30;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      }
    },
    { 
      key: "originalName", 
      title: "Original Name",
      format: (value: string) => {
        const maxLength = 25;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
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
      key: "assetType", 
      title: "Type",
      type: "text"
    },
    { 
      key: "mimeType", 
      title: "MIME Type",
      type: "text"
    },
    { 
      key: "fileSize", 
      title: "Size",
      format: (value: number) => {
        if (!value) return '0 B';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(value) / Math.log(1024));
        return Math.round(value / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
      },
      sortable: true
    },
    { 
      key: "width", 
      title: "Width",
      type: "number",
      sortable: true
    },
    { 
      key: "height", 
      title: "Height",
      type: "number",
      sortable: true
    },
    { 
      key: "source", 
      title: "Source",
      type: "text"
    },
    { 
      key: "hash", 
      title: "Hash",
      type: "text",
      format: (value: string) => {
        if (value && value.length > 16) {
          return value.substring(0, 16) + '...';
        }
        return value;
      }
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
      key: "userId",
      title: "User",
      type: "select"
    },
    {
      key: "assetType",
      title: "Asset Type",
      type: "select",
      options: [
        { value: "image", label: "Image" },
        { value: "font", label: "Font" },
        { value: "video", label: "Video" },
        { value: "audio", label: "Audio" }
      ]
    },
    {
      key: "source",
      title: "Source",
      type: "select",
      options: [
        { value: "upload", label: "Upload" },
        { value: "generated", label: "Generated" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["filename", "originalName", "tags"],
  perPage: 20,
  
  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { 
      key: "filename", 
      label: "Asset Preview", 
      type: "image", 
      readOnly: true,
      format: (value: string, item: any) => {
        if (!value) return value;
        // Use designs target for assets preview with sm size
        return getImageUrl(value, 'sm', 'designs');
      }
    },
    { 
      key: "filename", 
      label: "Full Size Preview", 
      type: "image", 
      readOnly: true,
      format: (value: string, item: any) => {
        if (!value) return value;
        // Use designs target for assets preview with raw size
        return getImageUrl(value, 'raw', 'designs');
      }
    },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, editComponent: "select", readOnly: true },
    { key: "filename", label: "Filename", type: "text", readOnly: true },
    { key: "originalName", label: "Original Name", type: "text", readOnly: true },
    { key: "mimeType", label: "MIME Type", type: "text", readOnly: true },
    { key: "fileSize", label: "File Size (bytes)", type: "number", readOnly: true },
    { key: "width", label: "Width", type: "number", readOnly: true },
    { key: "height", label: "Height", type: "number", readOnly: true },
    { key: "assetType", label: "Asset Type", type: "text" },
    { key: "source", label: "Source", type: "text" },
    { key: "hash", label: "Hash", type: "text", readOnly: true },
    { key: "tags", label: "Tags (JSON)", type: "textarea" },
    { key: "metadata", label: "Metadata (JSON)", type: "textarea" }
  ]
}

export default config