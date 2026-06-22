import { Card, CardContent, Typography } from "@mui/material";

import PageHeader from "../../components/common/PageHeader.jsx";

export default function PlaceholderPage({
    title = "Coming Soon",
}) {
    return (
        <>
            <PageHeader
                title={title}
                subtitle="This screen is ready for backend integration."
            />

            <Card variant="outlined">
                <CardContent>
                    <Typography color="text.secondary">
                        Connect the related API endpoint and add the required
                        table/form config.
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}