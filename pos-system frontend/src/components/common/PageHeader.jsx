import { Box, Button, Typography } from '@mui/material';

export default function PageHeader({
    title,
    subtitle,
    actionLabel,
    actionIcon,
    onAction,
    children,
}) {
    return (
        <Box
            className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center"
            sx={{ mb: 3 }}
        >
            <Box>
                <Typography variant="h4" component="h1">
                    {title}
                </Typography>

                {subtitle ? (
                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {subtitle}
                    </Typography>
                ) : null}
            </Box>

            <Box className="d-flex gap-2">
                {children}

                {actionLabel ? (
                    <Button
                        startIcon={actionIcon}
                        variant="contained"
                        onClick={onAction}
                    >
                        {actionLabel}
                    </Button>
                ) : null}
            </Box>
        </Box>
    );
}