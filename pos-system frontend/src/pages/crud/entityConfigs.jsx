import { Chip } from "@mui/material";

import { PAYMENT_TYPES, ROLES } from "../../constants/roles.js";
import {
    branchSchema,
    categorySchema,
    customerSchema,
    employeeSchema,
    inventorySchema,
    productSchema,
    refundSchema,
    storeSchema,
} from "../../validations/entityValidation.js";

import {
    formatCurrency,
    formatDateTime,
} from "../../utils/formatters.js";

import { statusChip } from "../../components/data/DataTable.jsx";

const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

/* -------------------------
   FIELD CONFIGURATIONS
-------------------------- */

export const storeFields = [
    { name: "brand", label: "Store Name" },
    { name: "storeType", label: "Store Type" },
    { name: "contact.email", label: "Store Email" },
    { name: "contact.phone", label: "Store Phone" },
    {
        name: "description",
        label: "Description",
        fullWidth: true,
        multiline: true,
    },
    {
        name: "contact.address",
        label: "Address",
        fullWidth: true,
        multiline: true,
    },
];

export const branchFields = [
    { name: "name", label: "Branch Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "openTime", label: "Open Time", type: "time" },
    { name: "closeTime", label: "Close Time", type: "time" },
    {
        name: "workingDays",
        label: "Working Days",
        type: "multi-select",
        options: days.map((d) => ({
            label: d,
            value: d,
        })),
    },
    {
        name: "address",
        label: "Address",
        fullWidth: true,
        multiline: true,
    },
];

export const categoryFields = [
    { name: "name", label: "Category Name" },
];

export const productFields = (categoryOptions = []) => [
    {
        name: "name",
        label: "Product Name",
        fullWidth: true,
    },
    { name: "sku", label: "SKU" },
    { name: "brand", label: "Brand" },
    { name: "mrp", label: "MRP", type: "number" },
    {
        name: "sellingPrice",
        label: "Selling Price",
        type: "number",
    },
    {
        name: "categoryId",
        label: "Category",
        type: "select",
        options: categoryOptions,
    },
    {
        name: "image",
        label: "Image URL",
        fullWidth: true,
    },
    {
        name: "description",
        label: "Description",
        fullWidth: true,
        multiline: true,
    },
];

export const customerFields = [
    { name: "fullName", label: "Full Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
];

export const employeeFields = [
    { name: "fullName", label: "Full Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    {
        name: "password",
        label: "Password",
        type: "password",
    },
    {
        name: "role",
        label: "Role",
        type: "select",
        options: Object.values(ROLES).map((r) => ({
            label: r.replace("ROLE_", "").replaceAll("_", " "),
            value: r,
        })),
    },
    {
        name: "branchId",
        label: "Branch",
        type: "select",
        placeholder: "Select Branch",
        options: [],
    },
];

export const inventoryFields = (
    branchOptions = [],
    productOptions = []
) => [
        {
            name: "branchId",
            label: "Branch",
            type: "select",
            options: branchOptions,
        },
        {
            name: "productId",
            label: "Product",
            type: "select",
            options: productOptions,
        },
        {
            name: "quantity",
            label: "Quantity",
            type: "number",
        },
    ];

export const refundFields = (orderOptions = []) => [
    {
        name: "orderId",
        label: "Order",
        type: "select",
        options: orderOptions,
    },
    { name: "reason", label: "Reason" },
    {
        name: "paymentType",
        label: "Payment Type",
        type: "select",
        options: PAYMENT_TYPES.map((p) => ({
            label: p,
            value: p,
        })),
    },
    {
        name: "amount",
        label: "Amount",
        type: "number",
    },
];

/* -------------------------
   TABLE HELPERS
-------------------------- */

const imgCell = (p) =>
    p.value ? (
        <img
            src={p.value}
            alt=""
            style={{
                width: 42,
                height: 42,
                objectFit: "cover",
                borderRadius: 8,
            }}
        />
    ) : (
        "-"
    );

/* -------------------------
   TABLE COLUMNS
-------------------------- */

export const tableColumns = {
    stores: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "brand",
            headerName: "Store",
            flex: 1,
        },
        {
            field: "storeType",
            headerName: "Type",
            width: 140,
        },
        {
            field: "status",
            headerName: "Status",
            width: 140,
            renderCell: (p) => statusChip(p.value),
        },
        {
            field: "createdAt",
            headerName: "Created",
            width: 180,
            valueGetter: (_, row) =>
                formatDateTime(row.createdAt),
        },
    ],

    branches: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "name",
            headerName: "Branch",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
    ],

    categories: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "name",
            headerName: "Category",
            flex: 1,
        },
    ],

    products: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "image",
            headerName: "Image",
            width: 90,
            renderCell: imgCell,
        },
        {
            field: "name",
            headerName: "Product",
            flex: 1,
        },
        { field: "sku", headerName: "SKU", width: 170 },
        {
            field: "category",
            headerName: "Category",
            width: 150,
            renderCell: (p) =>
                p.value?.name ||
                p.row?.categoryName ||
                "-",
        },
        {
            field: "sellingPrice",
            headerName: "Price",
            width: 130,
            valueGetter: (_, row) =>
                formatCurrency(row.sellingPrice),
        },
    ],

    customers: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "fullName",
            headerName: "Customer",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created",
            width: 180,
            valueGetter: (_, row) =>
                formatDateTime(row.createdAt),
        },
    ],

    employees: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "fullName",
            headerName: "Employee",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },
        {
            field: "role",
            headerName: "Role",
            width: 180,
            renderCell: (p) => (
                <Chip
                    size="small"
                    label={p.value || "-"}
                />
            ),
        },
    ],

    inventory: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "product",
            headerName: "Product",
            flex: 1,
            renderCell: (p) =>
                p.value?.name ||
                p.row?.productName ||
                "-",
        },
        {
            field: "branch",
            headerName: "Branch",
            flex: 1,
            renderCell: (p) =>
                p.value?.name ||
                p.row?.branchName ||
                "-",
        },
        {
            field: "quantity",
            headerName: "Qty",
            width: 120,
        },
        {
            field: "lastUpdate",
            headerName: "Last Update",
            width: 180,
            valueGetter: (_, row) =>
                formatDateTime(row.lastUpdate),
        },
    ],

    orders: [
        {
            field: "id",
            headerName: "Order ID",
            width: 110,
        },
        {
            field: "createdAt",
            headerName: "Date/Time",
            width: 190,
            valueGetter: (_, row) =>
                formatDateTime(row.createdAt),
        },
        {
            field: "customer",
            headerName: "Customer",
            flex: 1,
            renderCell: (p) =>
                p.value?.fullName ||
                p.row?.customerName ||
                "-",
        },
        {
            field: "totalAmount",
            headerName: "Amount",
            width: 150,
            valueGetter: (_, row) =>
                formatCurrency(row.totalAmount),
        },
        {
            field: "paymentType",
            headerName: "Payment Mode",
            width: 150,
        },
        {
            field: "orderStatus",
            headerName: "Status",
            width: 150,
            renderCell: (p) =>
                statusChip(p.value),
        },
    ],

    refunds: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "order",
            headerName: "Order",
            width: 120,
            renderCell: (p) =>
                p.value?.id || p.row?.orderId || "-",
        },
        {
            field: "cashier",
            headerName: "Cashier",
            flex: 1,
            renderCell: (p) =>
                p.value?.fullName ||
                p.row?.cashierName ||
                "-",
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 150,
            valueGetter: (_, row) =>
                formatCurrency(row.amount),
        },
        {
            field: "paymentType",
            headerName: "Payment",
            width: 130,
        },
        {
            field: "reason",
            headerName: "Reason",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "Created",
            width: 180,
            valueGetter: (_, row) =>
                formatDateTime(row.createdAt),
        },
    ],

    shifts: [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "cashier",
            headerName: "Cashier",
            flex: 1,
            renderCell: (p) =>
                p.value?.fullName ||
                p.row?.cashierName ||
                "-",
        },
        {
            field: "shiftStart",
            headerName: "Start",
            width: 180,
            valueGetter: (_, row) =>
                formatDateTime(row.shiftStart),
        },
        {
            field: "shiftEnd",
            headerName: "End",
            width: 180,
            valueGetter: (_, row) =>
                row.shiftEnd
                    ? formatDateTime(row.shiftEnd)
                    : "Ongoing",
        },
        {
            field: "totalSales",
            headerName: "Sales",
            width: 140,
            valueGetter: (_, row) =>
                formatCurrency(row.totalSales),
        },
        {
            field: "netSales",
            headerName: "Net Sales",
            width: 150,
            valueGetter: (_, row) =>
                formatCurrency(row.netSales),
        },
    ],
};

/* -------------------------
   SCHEMAS
-------------------------- */

export const schemas = {
    store: storeSchema,
    branch: branchSchema,
    category: categorySchema,
    product: productSchema,
    customer: customerSchema,
    employee: employeeSchema,
    inventory: inventorySchema,
    refund: refundSchema,
};