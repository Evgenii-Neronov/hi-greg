import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://neu-api.tech/">
                neu api
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export function SignUp() {
    const currentUser = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validateName = (name) => {
        const namePattern = /^[a-zA-Z\s]+$/;
        return namePattern.test(name);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        if (!validateEmail(data.get('email'))) {
            setError('Email is not valid.');
            return;
        }

        if (!validateName(data.get('forename'))) {
            setError('Name is not valid.');
            return;
        }

        if (!validateName(data.get('surname'))) {
            setError('Last Name is not valid.');
            return;
        }

        if (data.get('password') != data.get('repeat_password')) {
            setError('Passwords mismatch.');
            return;
        }

        const formData = {
            email: data.get('email'),
            password: data.get('password'),
            forename: data.get('forename'),
            surname: data.get('surname'),
        };

        try {
            const response = await axios.post('/api/auth/sign-up', formData);
            console.log(response.data); 
            
            if (response.status === 200) {
                currentUser.signUp(formData.email, formData.password);
                currentUser.signIn(formData.email, formData.password);
                navigate('/');
            } else {
                setError('An error occurred during registration. Please try again.');
            }
        } catch (error) {
            setError(error.response?.data || 'An error occurred while sending the request. Please try again.');
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="forename"
                                    required
                                    fullWidth
                                    id="forename"
                                    label="First Name"
                                    autoFocus
                                    inputProps={{
                                        maxLength: 30,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Last Name"
                                    name="surname"
                                    autoComplete="family-name"
                                    inputProps={{
                                        maxLength: 30,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    inputProps={{
                                        maxLength: 40,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    inputProps={{
                                        maxLength: 45,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="repeat_password"
                                    label="Repeat password"
                                    type="password"
                                    id="repeat_password"
                                    autoComplete="repeat-password"
                                    inputProps={{
                                        maxLength: 45,
                                    }}
                                />
                            </Grid>
                            {error && (
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="error" align="right">
                                        You can't sign up. {error}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}

export default SignUp