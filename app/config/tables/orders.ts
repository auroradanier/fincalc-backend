import type { TableConfig } from '../types'

const config: TableConfig = {
    columns: [
        {
            key: "id",
            title: "ID",
            type: "link",
            link: {
                type: "internal",
                path: "/admin/orders/",
                param: "id"
            },
            sortable: true
        },
        {
            key: "orderNumber",
            title: "Order Number",
            type: "text",
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
            key: "type",
            title: "Type",
            type: "text",
            sortable: true
        },
        {
            key: "status",
            title: "Status",
            type: "text",
            sortable: true
        },
        {
            key: "amount",
            title: "Amount",
            type: "number",
            format: (value: any) => {
                if (!value) return '$0.00';
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
            key: "paymentProvider",
            title: "Payment Provider",
            type: "text",
            sortable: true
        },
        {
            key: "paymentMethod",
            title: "Payment Method",
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
            key: "type",
            title: "Type",
            type: "select",
            options: [
                { value: "subscription", label: "Subscription" },
                { value: "top_up", label: "Top-up" },
                { value: "upgrade", label: "Upgrade" }
            ]
        },
        {
            key: "status",
            title: "Status",
            type: "select",
            options: [
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
                { value: "failed", label: "Failed" },
                { value: "refunded", label: "Refunded" },
                { value: "canceled", label: "Canceled" }
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
    searchableFields: ["orderNumber", "userId", "externalOrderId"],
    perPage: 20,

    // Detail View Configuration
    detailFields: [
        { key: "id", label: "ID", type: "text", readOnly: true },
        { key: "orderNumber", label: "Order Number", type: "text", readOnly: true },
        { key: "userId", label: "User ID", type: "text", required: true },
        {
            key: "type",
            label: "Type",
            type: "text",
            required: true,
            editComponent: "select",
            options: [
                { value: "subscription", label: "Subscription" },
                { value: "top_up", label: "Top-up" },
                { value: "upgrade", label: "Upgrade" }
            ]
        },
        {
            key: "status",
            label: "Status",
            type: "text",
            required: true,
            editComponent: "select",
            options: [
                { value: "pending", label: "Pending" },
                { value: "completed", label: "Completed" },
                { value: "failed", label: "Failed" },
                { value: "refunded", label: "Refunded" },
                { value: "canceled", label: "Canceled" }
            ]
        },
        { key: "amount", label: "Amount in cents (e.g., 1999 = $19.99)", type: "number", required: true },
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
            key: "paymentProvider",
            label: "Payment Provider",
            type: "text",
            editComponent: "select",
            options: [
                { value: "stripe", label: "Stripe" },
                { value: "paypal", label: "PayPal" }
            ]
        },
        {
            key: "paymentMethod",
            label: "Payment Method",
            type: "text",
            editComponent: "select",
            options: [
                { value: "card", label: "Card" },
                { value: "paypal", label: "PayPal" }
            ]
        },
        { key: "externalOrderId", label: "External Order ID", type: "text" },
        { key: "externalPaymentId", label: "External Payment ID", type: "text" },
        { key: "planId", label: "Plan ID", type: "number" },
        { key: "subscriptionId", label: "Subscription ID", type: "number" },
        { key: "creditPackageId", label: "Credit Package ID", type: "number" },
        { key: "items", label: "Items", type: "json" },
        { key: "billingDetails", label: "Billing Details", type: "json" },
        { key: "refundedAt", label: "Refunded At", type: "datetime" },
        { key: "refundAmount", label: "Refund amount in cents (e.g., 1999 = $19.99)", type: "number" },
        { key: "refundReason", label: "Refund Reason", type: "textarea", rows: 3 },
        { key: "metadata", label: "Metadata", type: "json" },
        { key: "createdAt", label: "Created At", type: "datetime", readOnly: true },
        { key: "updatedAt", label: "Updated At", type: "datetime", readOnly: true }
    ]
}

export default config
