import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Toolbar, IconButton, Typography, createTheme, ThemeProvider, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Category as CategoryIcon, History as HistoryIcon } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import Me from "../Auth/Me"


const drawerWidth = 240;
const drawerMinWidth = 75;
var isLoading = true;

export const LayoutAdmin = ({ children }) => {

    const currentUser = useAuth();
    const [darkMode, setDarkMode] = useState(true);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); 

    const handleDrawerOpen = () => {  
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetchRefreshToken() {
            try {
                var res = await currentUser.refresh();

                if (!res.isSuccess) {
                    isLoading = false;
                    navigate('/sign-in');
                }
            } catch (error) {
                console.error(error);
                isLoading = false;
                navigate('/sign-in');
            }
            isLoading = false;
        }

        fetchRefreshToken();
    }, []);

    if (currentUser.isNotLogged())
        navigate('/sign-in');
        
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
    

    if (isLoading) {
        return (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </div>); }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                height: '100vh',
                overflowX: 'auto',
                display: 'flex', backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', backgroundImage: 'url(background.jpg)' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={open ? handleDrawerClose : handleDrawerOpen}>  
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                        <Button color="inherit" onClick={handleThemeChange}>
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </Button>
                        <Box sx={{ marginLeft: 'auto', display: 'flex', marginTop: 'auto' }}>
                            <Me />
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: open ? drawerWidth : drawerMinWidth,  // Modify this line
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: open ? drawerWidth : drawerMinWidth, boxSizing: 'border-box' },  // Modify this line
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem component={Link} to='/cat' button key='Сategorizer' sx={{ justifyContent: 'center' }}>
                            <ListItemIcon sx={{ minWidth: 'auto' }}>
                            <CategoryIcon />
                            </ListItemIcon>
                                {open && <ListItemText primary='Categorizer' />}
                            </ListItem>

                            <ListItem component={Link} to='/history' button key='History' sx={{ justifyContent: 'center' }}>
                                <ListItemIcon sx={{ minWidth: 'auto' }}>
                                    <HistoryIcon />
                                </ListItemIcon>
                                {open && <ListItemText primary='History' />}
                            </ListItem>
                        </List>
                        <Button
                    color="inherit"
                    startIcon={<ExitToAppIcon />}
                    onClick={handleLogout}
                    sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
                    >
                    {open && <span>Log Out</span>} 
                        </Button>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LayoutAdmin;