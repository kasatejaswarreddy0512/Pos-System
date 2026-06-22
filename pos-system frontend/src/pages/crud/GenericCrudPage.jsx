import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../components/common/PageHeader.jsx";
import SearchToolbar from "../../components/common/SearchToolbar.jsx";
import DataTable from "../../components/data/DataTable.jsx";
import DetailsDialog from "../../components/data/DetailsDialog.jsx";
import ConfirmDialog from "../../components/feedback/ConfirmDialog.jsx";
import DynamicForm from "../../components/forms/DynamicForm.jsx";

import { useAppState } from "../../hooks/useAppState.js";
import { getApiErrorMessage } from "../../utils/error.js";

const filterRows = (rows, search) =>
    !search
        ? rows
        : rows.filter((row) =>
            Object.values(row).some((v) =>
                JSON.stringify(v || "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        );

export default function GenericCrudPage({
    title,
    subtitle,
    columns,
    fields,
    initialValues,
    validationSchema,
    loadData,
    createData,
    updateData,
    deleteData,
    normalizePayload = (v) => v,
    disableCreate = false,
}) {
    const { notify } = useAppState();

    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const fetchRows = async () => {
        setLoading(true);
        try {
            const data = await loadData();
            setRows(Array.isArray(data) ? data : []);
        } catch (e) {
            notify(getApiErrorMessage(e), "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRows();
    }, []);

    const visibleRows = useMemo(
        () => filterRows(rows, search),
        [rows, search]
    );

    const submit = async (values) => {
        setLoading(true);
        try {
            const payload = normalizePayload(values);

            if (selected?.id) {
                await updateData(selected.id, payload);
                notify(`${title} updated successfully`);
            } else {
                await createData(payload);
                notify(`${title} created successfully`);
            }

            setFormOpen(false);
            setSelected(null);
            await fetchRows();
        } catch (e) {
            notify(getApiErrorMessage(e), "error");
        } finally {
            setLoading(false);
        }
    };

    const remove = async () => {
        setLoading(true);
        try {
            await deleteData(selected.id);
            notify(`${title} deleted successfully`);
            setDeleteOpen(false);
            setSelected(null);
            await fetchRows();
        } catch (e) {
            notify(getApiErrorMessage(e), "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <PageHeader
                title={title}
                subtitle={subtitle}
                actionLabel={
                    disableCreate ? undefined : `Add ${title}`
                }
                actionIcon={<AddIcon />}
                onAction={() => {
                    setSelected(null);
                    setFormOpen(true);
                }}
            />

            <SearchToolbar
                value={search}
                onChange={setSearch}
                onRefresh={fetchRows}
            />

            <DataTable
                rows={visibleRows}
                columns={columns}
                loading={loading}
                onView={(r) => {
                    setSelected(r);
                    setDetailsOpen(true);
                }}
                onEdit={
                    updateData
                        ? (r) => {
                            setSelected(r);
                            setFormOpen(true);
                        }
                        : undefined
                }
                onDelete={
                    deleteData
                        ? (r) => {
                            setSelected(r);
                            setDeleteOpen(true);
                        }
                        : undefined
                }
            />

            <DynamicForm
                open={formOpen}
                title={
                    selected
                        ? `Edit ${title}`
                        : `Create ${title}`
                }
                fields={fields}
                initialValues={
                    selected || initialValues
                }
                validationSchema={validationSchema}
                onClose={() => {
                    setFormOpen(false);
                    setSelected(null);
                }}
                onSubmit={submit}
                loading={loading}
            />

            <DetailsDialog
                open={detailsOpen}
                title={`${title} Details`}
                item={selected}
                fields={columns.map((c) => ({
                    name: c.field,
                    label: c.headerName,
                    render: (item) => {
                        const v = item?.[c.field];

                        if (
                            typeof v === "object" &&
                            v !== null
                        ) {
                            return (
                                v.name ||
                                v.fullName ||
                                v.brand ||
                                v.id ||
                                "-"
                            );
                        }

                        return v || "-";
                    },
                }))}
                onClose={() => setDetailsOpen(false)}
            />

            <ConfirmDialog
                open={deleteOpen}
                title={`Delete ${title}`}
                message={`Are you sure you want to delete this ${title.toLowerCase()}?`}
                onClose={() => setDeleteOpen(false)}
                onConfirm={remove}
                loading={loading}
            />
        </Box>
    );
}