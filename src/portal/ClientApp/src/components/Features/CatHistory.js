import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export const CatHistoryTable = () => {
    const [catHistories, setCatHistories] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    useEffect(() => {
        const fetchCatHistories = async () => {
            try {
                const response = await axios.get('/api/cat/list', {
                    params: {
                        currentPage: currentPage,
                        pageSize: pageSize
                    },
                    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
                });

                setCatHistories(response.data.items);
                setTotalItems(response.data.totalItems);
            } catch (error) {
                console.error('Error fetching cat histories:', error);
            }
        };

        fetchCatHistories();

        const interval = setInterval(fetchCatHistories, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [currentPage, pageSize]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{ p: '7px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Request</TableCell>
                            <TableCell>Response</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {catHistories.map((catHistory) => (
                            <TableRow key={catHistory.id}>
                                <TableCell>{catHistory.id}</TableCell>
                                <TableCell>{catHistory.userId}</TableCell>
                                <TableCell>{catHistory.createdDate}</TableCell>
                                <TableCell>{catHistory.request}</TableCell>
                                <TableCell>{catHistory.response}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination sx={{ p: '7px' }}
                count={Math.ceil(totalItems / pageSize)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
            />
        </div>
    );
};

export default CatHistoryTable;
