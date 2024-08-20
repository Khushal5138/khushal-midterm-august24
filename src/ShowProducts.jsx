import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb'; 
import { Box, Button, TextField, IconButton, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, MenuItem } from '@mui/material';
import { Search as SearchIcon, Visibility as ViewIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.grey[200],
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.grey[50],
    },
}));

const ShowProducts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortField, setSortField] = useState('created_at');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/v1/products');
                setData(response.data.products); 
            } catch (error) {
                alert('Server is not responding');
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handlePriceFilter = (event) => {
        setPriceFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusFilter = (event) => {
        setStatusFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleDateFilter = (event) => {
        setDateFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/products/${id}`);
            setData(data.filter(item => item._id !== id));
            if (selectedProduct && selectedProduct._id === id) {
                setSelectedProduct(null); 
            }
        } catch (error) {
            alert('Error deleting product');
        }
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
    };

    const formatDate = (date) => {
        return moment(date).format('Do MMMM YYYY'); 
    };

    const filteredData = data.filter(item =>
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase())) &&
        (priceFilter === '' || item.price === Number(priceFilter)) &&
        (statusFilter === '' || item.status === statusFilter) &&
        (dateFilter === '' || formatDate(item.created_at) === dateFilter)
    );

    const sortedData = filteredData.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    return (
        <Box p={3}>
            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">Product List</Typography>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                    sx={{ maxWidth: 300 }}
                />
            </Box>
            <Box mb={2} display="flex" alignItems="center" gap={2}>
                <TextField
                    select
                    label="$"
                    value={priceFilter}
                    onChange={handlePriceFilter}
                    variant="outlined"
                    size="small"
                    sx={{ maxWidth: 200 }}
                >
                    <MenuItem value="">All Prices</MenuItem>
                    <MenuItem value="1000">1000</MenuItem>
                    <MenuItem value="2000">2000</MenuItem>
                    <MenuItem value="3000">3000</MenuItem>
                </TextField>
                <TextField
                    select
                    label="Status Filter"
                    value={statusFilter}
                    onChange={handleStatusFilter}
                    variant="outlined"
                    size="small"
                    sx={{ maxWidth: 200 }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                </TextField>
                <TextField
                    type="date"
                    label=""
                    value={dateFilter}
                    onChange={handleDateFilter}
                    variant="outlined"
                    size="small"
                    sx={{ maxWidth: 200 }}
                />
            </Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell onClick={() => handleSort('_id')}>ID</StyledTableCell>
                                <StyledTableCell onClick={() => handleSort('name')}>Name</StyledTableCell>
                                <StyledTableCell onClick={() => handleSort('price')}>Price</StyledTableCell>
                                <StyledTableCell onClick={() => handleSort('created_at')}>Created At</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map(item => (
                                <StyledTableRow key={item._id}>
                                    <TableCell>{item._id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{formatDate(item.created_at)}</TableCell> 
                                    <TableCell>
                                        <IconButton onClick={() => handleViewDetails(item)} color="primary">
                                            <ViewIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(item._id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {selectedProduct && (
                <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius="8px">
                    <Typography variant="h6">Product Details</Typography>
                    <Typography><b>ID:</b> {selectedProduct._id}</Typography>
                    <Typography><b>Name:</b> {selectedProduct.name}</Typography>
                    <Typography><b>Price:</b> {selectedProduct.price}</Typography>
                    <Typography><b>Description:</b> {selectedProduct.excerpt}</Typography>
                    <Typography><b>Created At:</b> {formatDate(selectedProduct.created_at)}</Typography> 
                </Box>
            )}
            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Button
                    variant="outlined"
                    onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Typography variant="body1">Page {currentPage} of {totalPages}</Typography>
                <Button
                    variant="outlined"
                    onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default ShowProducts;
