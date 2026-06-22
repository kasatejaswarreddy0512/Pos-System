import { Alert, Snackbar } from '@mui/material';
import { useAppState } from '../../hooks/useAppState.js';

export default function AppSnackbar() {
    const { snackbar, closeSnackbar } = useAppState();

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={3500}
            onClose={closeSnackbar}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Alert
                onClose={closeSnackbar}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}