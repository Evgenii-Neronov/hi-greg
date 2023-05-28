import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Grid, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';

const CategoryForms = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [textInput, setTextInput] = useState("");
    const [checks, setChecks] = useState([]);
    const [userData, setUserData] = useState(null);

    const handleAddCategory = () => {
        if (newCategory.trim() !== "") {
            setCategories([...categories, newCategory]);
            setNewCategory("");
        }
    };

    const handleDeleteCategory = (index) => {
        const newCategories = [...categories];
        newCategories.splice(index, 1);
        setCategories(newCategories);
    };

    const handleCheckCategory = async () => {
        try {

            let cats = categories;
            let queryString = `text=${encodeURIComponent(textInput)}` +
                cats.map(cat => `&cats=${encodeURIComponent(cat)}`).join('');

            const response = await axios.get(`/api/cat?${queryString}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
            });
            
            const check = {
                date: new Date().toLocaleString(),
                text: textInput,
                result: response.data.cat,
            };
            setChecks([check, ...checks]);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', gap: '10px' }}>
            <Box sx={{ flexBasis: '30%', height: '100%' }}>
                <Paper sx={{ p: 2, bgcolor: '#333366', color: '#fff' }}>
                    <Typography variant="h6">Category</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        InputProps={{
                            style: { color: '#fff' },
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddCategory}>Add category</Button>
                    <List>
                        {categories.map((category, index) => (
                            <ListItem key={index} sx={{ color: '#fff' }}>
                                <ListItemText primary={category} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(index)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>

            <Box sx={{ flexBasis: '70%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Box sx={{ flexGrow: '50%' }}>
                    <Box sx={{ flexBasis: '25%' }}>
                        <Paper sx={{ p: 2, bgcolor: '#333366', color: '#fff' }}>
                            <Typography variant="h6">Text</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                margin="normal"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleCheckCategory}>Check</Button>
                        </Paper>
                    </Box>
                </Box>

                <Box sx={{ flexBasis: '50%' }}>
                    <Paper sx={{ p: 2, bgcolor: '#333366', color: '#fff' }}>
                        <Typography variant="h6">History</Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Text</TableCell>
                                        <TableCell>Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checks.map((check, index) => (
                                        <TableRow key={index} sx={{ color: '#fff' }}>
                                            <TableCell>{check.date}</TableCell>
                                            <TableCell>{check.text}</TableCell>
                                            <TableCell>{check.result}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </Box>
        </Box>

    );
};

export default CategoryForms;
