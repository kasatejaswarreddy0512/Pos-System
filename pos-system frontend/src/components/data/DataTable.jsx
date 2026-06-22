import {
    Box,
    Card,
    CardContent,
    Chip,
    IconButton,
    Stack,
    Tooltip,
} from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import EmptyState from '../feedback/EmptyState.jsx';

export const statusChip = (value) => {
    const color =
        value === 'ACTIVE' || value === 'COMPLETE'
            ? 'success'
            : value === 'PENDING'
                ? 'warning'
                : value === 'BLOCKED' || value === 'REJECTED'
                    ? 'error'
                    : 'default';

    return <Chip label={value || '-'} color={color} size="small" />;
};

export default function DataTable({
    rows = [],
    columns = [],
    loading,
    onView,
    onEdit,
    onDelete,
    getRowId = (row) => row.id,
}) {
    const actionColumn = {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <Stack direction="row" spacing={0.5}>
                {onView ? (
                    <Tooltip title="View">
                        <IconButton
                            size="small"
                            onClick={() => onView(params.row)}
                        >
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ) : null}

                {onEdit ? (
                    <Tooltip title="Edit">
                        <IconButton
                            size="small"
                            onClick={() => onEdit(params.row)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ) : null}

                {onDelete ? (
                    <Tooltip title="Delete">
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => onDelete(params.row)}
                        >
                            <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </Stack>
        ),
    };

    return (
        <Card variant="outlined">
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                <Box sx={{ width: '100%', minHeight: 430 }}>
                    <DataGrid
                        rows={rows}
                        columns={[...columns, actionColumn]}
                        getRowId={getRowId}
                        loading={loading}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 25, 50]}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 0 },
                            },
                        }}
                        slots={{
                            noRowsOverlay: () => <EmptyState />,
                        }}
                        sx={{ border: 0 }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}