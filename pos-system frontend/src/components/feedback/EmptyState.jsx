import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

export default function EmptyState({
    title = 'No data found',
    subtitle = 'Create a new record to get started.',
}) {
    return (
        <Box
            sx={{
                py: 8,
                textAlign: 'center',
                color: 'text.secondary',
            }}
        >
            <InboxIcon
                sx={{
                    fontSize: 56,
                    opacity: 0.35,
                    mb: 1,
                }}
            />

            <Typography variant="h6" color="text.primary">
                {title}
            </Typography>

            <Typography variant="body2">
                {subtitle}
            </Typography>
        </Box>
    );
}