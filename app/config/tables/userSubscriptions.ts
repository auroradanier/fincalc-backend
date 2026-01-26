import type { TableConfig } from '../types'

const config: TableConfig = {
    columns: [
        {
            key: "id",
            title: "ID",
            type: "link",
            link: {
                type: "internal",
                path: "/admin/userSubscriptions/",
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
            link: {
                type: "internal",
                path: "/admin/user/",
                param: "userId"
            },
            sortable: true
        },
        {
            key: "planId",
            title: "Plan",
            type: "relation",
            relation: {
                table: "pricingPlans",
                displayField: "name",
                valueField: "id"
            },
            link: {
                type: "internal",
                path: "/admin/pricingPlans/",
                param: "planId"
            },
            sortable: true
        },
        {
            key: "planId",
            title: "Plan Type",
            type: "relation",
            relation: {
                table: "pricingPlans",
                displayField: "type",
                valueField: "id"
            },
            sortable: true
        },
        {
            key: "planId",
            title: "Billing Period",
            type: "relation",
            relation: {
                table: "pricingPlans",
                displayField: "billingPeriod",
                valueField: "id"
            },
            sortable: true
        },
        {
            key: "status",
            title: "Status",
            type: "text",
            sortable: true
        },
        {
            key: "startDate",
            title: "Start Date",
            type: "date",
            format: (value: any) => value ? new Date(value).toLocaleString() : 'N/A',
            sortable: true
        },
        {
            key: "endDate",
            title: "End Date",
            type: "date",
            format: (value: any) => value ? new Date(value).toLocaleString() : 'Lifetime',
            sortable: true
        },
        {
            key: "autoRenew",
            title: "Auto Renew",
            type: "boolean",
            sortable: true
        },
        {
            key: "paymentProvider",
            title: "Payment Provider",
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
                { value: "active", label: "Active" },
                { value: "canceled", label: "Canceled" },
                { value: "expired", label: "Expired" },
                { value: "past_due", label: "Past Due" }
            ]
        },
        {
            key: "autoRenew",
            title: "Auto Renew",
            type: "select",
            options: [
                { value: true, label: "Yes" },
                { value: false, label: "No" }
            ]
        },
        {
            key: "paymentProvider",
            title: "Payment Provider",
            type: "select",
            options: [
                { value: "stripe", label: "Stripe" },
                { value: "paypal", label: "PayPal" }
            ]
        }
    ],
    defaultSort: {
        field: "createdAt",
        direction: "desc"
    },
    searchableFields: ["userId", "planId", "externalSubscriptionId"],
    perPage: 20,

    // Detail View Configuration
    detailFields: [
        { key: "id", label: "ID", type: "text", readOnly: true },
        { key: "userId", label: "User ID", type: "text", required: true },
        { key: "planId", label: "Plan ID", type: "number", required: true },
        {
            key: "status",
            label: "Status",
            type: "text",
            required: true,
            editComponent: "select",
            options: [
                { value: "active", label: "Active" },
                { value: "canceled", label: "Canceled" },
                { value: "expired", label: "Expired" },
                { value: "past_due", label: "Past Due" }
            ]
        },
        { key: "startDate", label: "Start Date", type: "datetime", required: true },
        { key: "endDate", label: "End Date", type: "datetime" },
        { key: "canceledAt", label: "Canceled At", type: "datetime" },
        { key: "cancelReason", label: "Cancel Reason", type: "textarea", rows: 3 },
        { key: "autoRenew", label: "Auto Renew", type: "boolean" },
        {
            key: "paymentProvider",
            label: "Payment Provider",
            type: "text",
            editComponent: "select",
            options: [
                { value: "stripe", label: "Stripe" },
                { value: "paypal", label: "PayPal" }
            ]
        },
        { key: "externalSubscriptionId", label: "External Subscription ID", type: "text" },
        { key: "metadata", label: "Metadata", type: "json" },
        { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
        { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
    ]
}

export default config
