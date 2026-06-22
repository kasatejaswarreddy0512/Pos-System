import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';

import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_MENU, MENU_BY_ROLE } from '../../constants/menuItems.js';
import { ROLES, ROLE_LABELS } from '../../constants/roles.js';
import { useAuth } from '../../hooks/useAuth.js';

const getBrand = (role) =>
    role === ROLES.ADMIN
        ? 'Super Admin'
        : role === ROLES.BRANCH_MANAGER
            ? 'Branch Manager'
            : role === ROLES.BRANCH_CASHIER
                ? 'POS System'
                : 'POS Admin';

export default function Sidebar({
    drawerWidth,
    mobileOpen,
    onClose,
    variant,
}) {
    const { user, role, logout } = useAuth();
    const nav = useNavigate();
    const loc = useLocation();

    const menu = MENU_BY_ROLE[role] || DEFAULT_MENU;

    const content = (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,

            }}
        >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {role === ROLES.BRANCH_CASHIER ? (
                        <PointOfSaleIcon />
                    ) : (
                        <StoreMallDirectoryIcon />
                    )}
                </Avatar>

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                        {getBrand(role)}
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        {ROLE_LABELS[role] || 'POS User'}
                    </Typography>
                </Box>
            </Stack>

            {user?.branch?.name || user?.store?.brand ? (
                <Box
                    sx={{
                        p: 2,
                        bgcolor: 'action.hover',
                        borderRadius: 3,
                        mb: 2,
                    }}
                >
                    <Typography fontWeight={800}>
                        {user?.branch?.name || user?.store?.brand}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {user?.branch?.address ||
                            user?.store?.contact?.address ||
                            user?.email}
                    </Typography>
                </Box>
            ) : null}

            <List sx={{ flexGrow: 1 }}>
                {menu.map((item) => {
                    const Icon = item.icon;

                    const selected =
                        loc.pathname === item.path ||
                        loc.pathname.startsWith(`${item.path}/`);

                    return (
                        <ListItemButton
                            key={item.path}
                            selected={selected}
                            onClick={() => {
                                nav(item.path);
                                if (variant === 'temporary') onClose();
                            }}
                            sx={{
                                borderRadius: 2,
                                mb: 0.6,
                            }}
                        >
                            <ListItemIcon>
                                <Icon color={selected ? 'primary' : 'inherit'} />
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: selected ? 800 : 600,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ my: 2 }} />

            <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<LogoutIcon />}
                onClick={() => logout(nav)}
            >
                Logout
            </Button>
            <Divider sx={{ my: 2 }} />
        </Box>
    );

    return (
        <Drawer
            variant={variant}
            open={variant === 'permanent' || mobileOpen}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
            }}
        >
            {content}
        </Drawer>
    );
}