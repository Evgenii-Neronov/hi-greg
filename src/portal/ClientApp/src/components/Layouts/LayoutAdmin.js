import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Toolbar, IconButton, Typography, createTheme, ThemeProvider, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const drawerWidth = 240;

export const LayoutAdmin = () => {
    const [darkMode, setDarkMode] = useState(true);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            ...(darkMode ? {
                primary: {
                    main: '#473ab7', // Темно-фиолетовый цвет
                },
                secondary: {
                    main: '#aa68c8', // Темно-розовый цвет
                },
                background: {
                    default: '#12112b', // Темно-фиолетовый для фона
                    paper: '#12112b', // Немного светлее фиолетовый для поверхностей
                },
            } : {}),
        },
    });


    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
        height: '100vh',
        display: 'flex', backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', backgroundImage: 'url(background.jpg)' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" edge="start">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                        <Button color="inherit" onClick={handleThemeChange}>
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Categorize emails', 'Data examiner', 'Workflow assistent', 'Monitoring', 'Manage'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {/* Here goes your page content */}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LayoutAdmin;
