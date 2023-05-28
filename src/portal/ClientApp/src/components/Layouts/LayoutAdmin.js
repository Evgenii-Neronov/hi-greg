import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Toolbar, IconButton, Typography, createTheme, ThemeProvider, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from 'react-router-dom';
import { Refresh } from "../Auth/Refresh"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const drawerWidth = 240;

export const LayoutAdmin = () => {

    const currentUser = useAuth();
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRefreshToken() {
            try {
                await currentUser.refresh();

                if (!currentUser) {
                    navigate('/sign-in');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchRefreshToken();
    }, []);

    //const {isSuccess, accessToken, refreshToken} = await Refresh();
    
    /*
    if (!currentUser) {
        return (<Navigate to="/sign-in" />);
    }*/

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            ...(darkMode ? {
                primary: {
                    main: '#473ab7',
                },
                secondary: {
                    main: '#aa68c8',
                },
                background: {
                    default: '#12112b',
                    paper: '#12112b',
                },
            } : {}),
        },
    });


    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    }

    const handleLogout = async () => {
        currentUser.signOut();
        navigate('/sign-in');
    };

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
                        <Button
                    color="inherit"
                    startIcon={<ExitToAppIcon />}
                    onClick={handleLogout}
                    sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
                    >
                    Log Out
                        </Button>
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
