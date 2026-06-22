import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
} from '@mui/material';

export default function DetailsDialog({
    open,
    title,
    item,
    fields = [],
    onClose,
}) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent dividers>
                <Grid container spacing={2}>
                    {fields.map((f) => {
                        const value = f.render ? f.render(item) : item?.[f.name];

                        return (
                            <Grid
                                item
                                xs={12}
                                md={f.fullWidth ? 12 : 6}
                                key={f.name}
                            >
                                <Typography variant="caption" color="text.secondary">
                                    {f.label}
                                </Typography>

                                <Typography fontWeight={700}>
                                    {value || '-'}
                                </Typography>

                                <Divider sx={{ mt: 1 }} />
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}