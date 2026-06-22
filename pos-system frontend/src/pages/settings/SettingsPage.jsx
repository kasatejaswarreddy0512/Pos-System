import {
    Card,
    CardContent,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentIcon from "@mui/icons-material/Payment";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import PageHeader from "../../components/common/PageHeader.jsx";

const tabs = [
    ["Store Settings", StoreIcon],
    ["Notification Settings", NotificationsIcon],
    ["Security Settings", SecurityIcon],
    ["Payment Settings", PaymentIcon],
    ["System Settings", SettingsIcon],
    ["Help & Support", SupportAgentIcon],
];

export default function SettingsPage() {
    return (
        <>
            <PageHeader
                title="Settings"
                subtitle="Configure store, security, payment and system options"
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                        <List>
                            {tabs.map(([label, Icon], i) => (
                                <ListItemButton
                                    selected={i === 0}
                                    key={label}
                                >
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>

                                    <ListItemText primary={label} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Card>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 3 }}>
                                Store Settings
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Store Name"
                                        fullWidth
                                        defaultValue="Rutikaa Shoppings"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Store Email"
                                        fullWidth
                                        defaultValue="rutika.store@gmail.com"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Store Phone"
                                        fullWidth
                                        defaultValue="8765981231"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Currency"
                                        fullWidth
                                        select
                                        defaultValue="INR"
                                    >
                                        <MenuItem value="INR">
                                            INR - Indian Rupee
                                        </MenuItem>
                                        <MenuItem value="USD">
                                            USD - US Dollar
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Tax Rate (%)"
                                        type="number"
                                        fullWidth
                                        defaultValue="18"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Timezone"
                                        fullWidth
                                        select
                                        defaultValue="IST"
                                    >
                                        <MenuItem value="IST">
                                            India Standard Time
                                        </MenuItem>
                                        <MenuItem value="ET">
                                            Eastern Time
                                        </MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Store Address"
                                        multiline
                                        rows={3}
                                        fullWidth
                                        defaultValue="Ambavadi chowk near ashok complex"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}