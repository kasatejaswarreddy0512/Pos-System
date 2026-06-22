import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';

export default function StatCard({
    title,
    value,
    helper,
    icon: Icon,
    color = 'primary',
}) {
    return (
        <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing={1}>
                        <Typography color="text.secondary">{title}</Typography>

                        <Typography variant="h4">{value}</Typography>

                        {helper ? (
                            <Typography variant="body2" color="success.main">
                                {helper}
                            </Typography>
                        ) : null}
                    </Stack>

                    {Icon ? (
                        <Avatar
                            sx={{
                                bgcolor: `${color}.light`,
                                color: `${color}.main`,
                                width: 58,
                                height: 58,
                            }}
                        >
                            <Icon />
                        </Avatar>
                    ) : null}
                </Stack>
            </CardContent>
        </Card>
    );
}