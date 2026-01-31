import type { TableConfig } from '../types'

const config: TableConfig = {
  columns: [
    {
      key: "id",
      title: "ID",
      type: "link",
      link: {
        type: "internal",
        path: "/admin/user/",
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
      key: "email",
      title: "Email",
      type: "text"
    },
    {
      key: "emailVerified",
      title: "Email Verified",
      type: "boolean"
    },
    {
      key: "image",
      title: "Avatar",
      type: "image",
      format: (value: string) => {
        if (!value) return value;
        return value;
      },
      hoverPreview: (value: string) => {
        if (!value) return null;
        return value;
      }
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
      key: "role",
      title: "Role",
      type: "text",
      sortable: true
    },
    {
      key: "lang",
      title: "Language",
      type: "text"
    },
    {
      key: "currentPlanId",
      title: "Current Plan ID",
      type: "number",
      sortable: true
    },
    {
      key: "banned",
      title: "Banned",
      type: "boolean",
      sortable: true
    },
    {
      key: "banReason",
      title: "Ban Reason",
      type: "text"
    },
    {
      key: "banExpires",
      title: "Ban Expires",
      type: "date",
      format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A'
    }
  ],
  filters: [
    {
      key: "emailVerified",
      title: "Email Verified",
      type: "select",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" }
      ]
    },
    {
      key: "role",
      title: "Role",
      type: "select",
      options: [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" }
      ]
    },
    {
      key: "banned",
      title: "Banned",
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
  searchableFields: ["name", "email"],
  perPage: 20,

  // Detail View Configuration
  detailFields: [
    { key: "id", label: "ID", type: "text", readOnly: true },
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "emailVerified", label: "Email Verified", type: "boolean" },
    { key: "image", label: "Avatar", type: "image", format: (value: string) => {
      if (!value) return value;
      return value;
    }, hoverPreview: (value: string) => {
      if (!value) return null;
      return value;
    } },
    { key: "role", label: "Role", type: "text", inlineEdit: true, editComponent: "multiselect",       options: [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" }
      ]
    },
    { key: "lang", label: "Language", type: "text" },
    { key: "currentPlanId", label: "Current Plan ID", type: "number" },
    { key: "banned", label: "Banned", type: "boolean" },
    { key: "banReason", label: "Ban Reason", type: "text" },
    { key: "banExpires", label: "Ban Expires", type: "datetime" },
    { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
    { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
  ],

  // Row Actions Configuration
  actions: [
    {
      key: "grantCredit",
      title: "Grant Credit",
      type: "button",
      variant: "primary",
      icon: "plus",
      handler: "grantCreditToUser",
      modal: {
        title: "Grant Credits",
        fields: [
          {
            key: "amount",
            type: "number",
            label: "Credit Amount",
            required: true,
            placeholder: "Enter credit amount",
            defaultValue: 1000,
            min: 1,
            step: 1
          },
          {
            key: "description",
            type: "textarea",
            label: "Description",
            placeholder: "Enter a description for this credit grant",
            defaultValue: "Admin credit grant",
            rows: 3
          },
          {
            key: "shouldExpire",
            type: "checkbox",
            label: "Credits should expire in 1 year",
            description: "If unchecked, credits will never expire",
            defaultValue: true
          }
        ],
        submitText: "Grant Credits",
        cancelText: "Cancel",
        submittingText: "Granting..."
      }
    }
  ]
}

export default config