import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AppSnackbar from '../feedback/AppSnackbar.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

const drawerWidth = 280;

export default function AppShell({ title }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const isDesktop = useMediaQuery((theme) =>
        theme.breakpoints.up('lg')
    );

    const toggle = () => setMobileOpen((p) => !p);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Topbar
                drawerWidth={drawerWidth}
                onMenuClick={toggle}
                title={title}
            />

            <Sidebar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                onClose={toggle}
                variant={isDesktop ? 'permanent' : 'temporary'}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                }}
            >
                <Toolbar />

                <Box sx={{ p: { xs: 2, md: 3 } }}>
                    <Outlet />
                </Box>
            </Box>

            <AppSnackbar />
        </Box>
    );
}