import { Box, CircularProgress } from '@mui/material';

export default function PageLoader() {
    return (
        <Box
            sx={{
                minHeight: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    );
}