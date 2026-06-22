import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import { useColorMode } from "../../contexts/ColorModeContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export default function Topbar({
    drawerWidth,
    onMenuClick,
    title = "POS Pro",
}) {
    const { user } = useAuth();
    const { toggleMode } = useColorMode();

    const branchName =
        user?.branch?.name ||
        user?.branchName ||
        title;

    return (
        <AppBar
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
                width: { lg: `calc(100% - ${drawerWidth}px)` },
                ml: { lg: `${drawerWidth}px` },
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <IconButton
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ display: { lg: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 900,
                        display: { xs: "none", md: "block" },
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 350,
                    }}
                >
                    {branchName}
                </Typography>

                <Box sx={{ flexGrow: 1, maxWidth: 520, ml: { md: 2 } }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Search stores, products, users..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <IconButton onClick={toggleMode}>
                    <WbSunnyIcon />
                </IconButton>

                <IconButton>
                    <Badge badgeContent={3} color="secondary">
                        <NotificationsNoneIcon />
                    </Badge>
                </IconButton>

                <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                    {user?.fullName?.[0] || user?.email?.[0] || "U"}
                </Avatar>

                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography fontWeight={800}>
                        {user?.fullName || "User"}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        {user?.email}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}