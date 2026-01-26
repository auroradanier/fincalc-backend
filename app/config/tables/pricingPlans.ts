import type { TableConfig } from '../types'

const config: TableConfig = {
    columns: [
        {
            key: "id",
            title: "ID",
            type: "link",
            link: {
                type: "internal",
                path: "/admin/pricingPlans/",
                param: "id"
            },
            sortable: true
        },
        {
            key: "name",
            title: "Plan Name",
            type: "text",
            sortable: true
        },
        {
            key: "slug",
            title: "Slug",
            type: "text",
            sortable: true
        },
        {
            key: "type",
            title: "Type",
            type: "text",
            sortable: true
        },
        {
            key: "price",
            title: "Price",
            type: "number",
            format: (value: any) => {
                if (!value) return '$0.00';
                const dollars = (value / 100).toFixed(2);
                return `$${dollars}`;
            },
            sortable: true
        },
        {
            key: "regularPrice",
            title: "Regular Price",
            type: "number",
            format: (value: any) => {
                if (!value) return '-';
                const dollars = (value / 100).toFixed(2);
                return `$${dollars}`;
            },
            sortable: true
        },
        {
            key: "currency",
            title: "Currency",
            type: "text",
            sortable: true
        },
        {
            key: "billingPeriod",
            title: "Billing Period",
            type: "text",
            format: (value: any) => value || 'One-time',
            sortable: true
        },
        {
            key: "credits",
            title: "Credits",
            type: "number",
            sortable: true
        },
        {
            key: "storageLimit",
            title: "Storage Limit (MB)",
            type: "number",
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
        },
        { 
            key: "tier", 
            title: "Tier",
            type: "number",
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
            key: "type",
            title: "Type",
            type: "select",
            options: [
                { value: "subscription", label: "Subscription" },
                { value: "one_time", label: "One-time" },
                { value: "top_up", label: "Top-up" },
                { value: "permanent", label: "Permanent" }
            ]
        },
        {
            key: "billingPeriod",
            title: "Billing Period",
            type: "select",
            options: [
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "null", label: "One-time" }
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
    searchableFields: ["name", "slug"],
    perPage: 20,

    // Detail View Configuration
    detailFields: [
        { key: "id", label: "ID", type: "text", readOnly: true },
        { key: "name", label: "Plan Name", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        {
            key: "type",
            label: "Type",
            type: "text",
            required: true,
            editComponent: "select",
            options: [
                { value: "subscription", label: "Subscription" },
                { value: "one_time", label: "One-time" },
                { value: "top_up", label: "Top-up" },
                { value: "permanent", label: "Permanent" }
            ]
        },
        { key: "price", label: "Price in cents (e.g., 1999 = $19.99)", type: "number", required: true },
        { key: "regularPrice", label: "Regular Price in cents", type: "number" },
        {
            key: "currency",
            label: "Currency",
            type: "text",
            editComponent: "select",
            options: [
                { value: "USD", label: "USD" }
            ]
        },
        {
            key: "billingPeriod",
            label: "Billing Period",
            type: "text",
            editComponent: "select",
            options: [
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "null", label: "One-time (null)" }
            ]
        },
        { key: "credits", label: "Credits", type: "number" },
        { key: "storageLimit", label: "Storage Limit (MB)", type: "number" },
        { key: "features", label: "Features", type: "json" },
        { key: "isActive", label: "Active", type: "boolean" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "tier", label: "Tier Level", type: "number" },
        { key: "metadata", label: "Metadata", type: "json" },
        { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
        { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
    ]
}

export default config
