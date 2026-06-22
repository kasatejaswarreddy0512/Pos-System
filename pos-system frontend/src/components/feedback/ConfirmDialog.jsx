import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

export default function ConfirmDialog({
    open,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'Delete',
    cancelText = 'Cancel',
    onClose,
    onConfirm,
    loading,
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} variant="outlined" disabled={loading}>
                    {cancelText}
                </Button>

                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Please wait...' : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}