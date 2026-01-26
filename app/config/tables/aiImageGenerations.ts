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
        path: "/admin/aiImageGenerations/",
        param: "id"
      },
      sortable: true
    },
    {
      key: "userId",
      title: "User",
      type: "relation",
      relation: {
        table: "user",
        displayField: "email",
        valueField: "id"
      },
      sortable: true
    },
    {
      key: "assetId",
      title: "Preview",
      type: "image",
      relation: {
        table: "assets",
        displayField: "fileName",
        valueField: "id"
      },
      format: (value: number, item: any, relationData: any) => {
        if (!value) return null;
        const assets = relationData?.assets;
        if (!assets || !assets[value]) return null;
        const asset = assets[value];
        return getImageUrl(asset.fileName, 'sm', 'designs');
      },
      hoverPreview: (value: number, item: any, relationData: any) => {
        if (!value) return null;
        const assets = relationData?.assets;
        if (!assets || !assets[value]) return null;
        const asset = assets[value];
        return getImageUrl(asset.fileName, 'md', 'designs');
      },
      sortable: true
    },
    {
      key: "prompt",
      title: "Prompt",
      type: "text",
      format: (value: string) => {
        const maxLength = 50;
        if (value && value.length > maxLength) {
          return value.substring(0, maxLength) + '...';
        }
        return value;
      },
      tooltip: (value: string) => {
        if (value && value.length > 50) {
          return value;
        }
        return undefined;
      },
      sortable: true
    },
    {
      key: "style",
      title: "Style",
      type: "text",
      sortable: true
    },
    {
      key: "ratio",
      title: "Ratio",
      type: "text",
      sortable: true
    },
    {
      key: "modelCode",
      title: "Model",
      type: "relation",
      relation: {
        table: "aiModels",
        displayField: "name",
        valueField: "id"
      },
      sortable: true
    },
    {
      key: "cost",
      title: "Cost",
      type: "number",
      sortable: true
    },
    {
      key: "status",
      title: "Status",
      type: "text",
      sortable: true
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
      key: "status",
      title: "Status",
      type: "select",
      options: [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
        { value: "failed", label: "Failed" }
      ]
    },
    {
      key: "style",
      title: "Style",
      type: "select",
      options: [
        { value: "realistic", label: "Realistic" },
        { value: "artistic", label: "Artistic" },
        { value: "anime", label: "Anime" },
        { value: "3d", label: "3D" },
        { value: "minimalist", label: "Minimalist" }
      ]
    },
    {
      key: "ratio",
      title: "Ratio",
      type: "select",
      options: [
        { value: "1:1", label: "1:1 (Square)" },
        { value: "16:9", label: "16:9 (Landscape)" },
        { value: "9:16", label: "9:16 (Portrait)" },
        { value: "4:3", label: "4:3" },
        { value: "3:4", label: "3:4" }
      ]
    }
  ],
  defaultSort: {
    field: "createdAt",
    direction: "desc"
  },
  searchableFields: ["prompt", "style", "modelCode"],
  perPage: 20,

  detailFields: [
    { key: "id", label: "ID", type: "number", readOnly: true },
    { 
      key: "assetId", 
      label: "Generated Image", 
      type: "image", 
      readOnly: true,
      relation: {
        table: "assets",
        displayField: "fileName",
        valueField: "id"
      },
      format: (value: number, item: any, relationData: any) => {
        if (!value) return null;
        const assets = relationData?.assets;
        if (!assets || !assets[value]) return null;
        const asset = assets[value];
        return getImageUrl(asset.fileName, 'sm', 'designs');
      }
    },
    { key: "userId", label: "User", type: "relation", relation: { table: "user", displayField: "email", valueField: "id" }, readOnly: true },
    { key: "prompt", label: "Prompt", type: "textarea", rows: 4 },
    { key: "style", label: "Style", type: "text" },
    { key: "ratio", label: "Ratio", type: "text" },
    {
      key: "modelCode",
      label: "Model",
      type: "relation",
      relation: {
        table: "aiModels",
        displayField: "name",
        valueField: "id"
      },
      readOnly: true
    },
    { key: "cost", label: "Cost (credits)", type: "number", readOnly: true },
    { key: "designId", label: "Design ID", type: "text" },
    { key: "status", label: "Status", type: "text", readOnly: true },
    { key: "assetId", label: "Asset ID", type: "number", readOnly: true },
    { key: "attachments", label: "Attachments", type: "json" },
    { key: "metadata", label: "Metadata", type: "json" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true }
  ]
}

export default config
