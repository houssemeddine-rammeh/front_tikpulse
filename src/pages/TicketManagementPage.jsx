import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  NavigateNext,
  Dashboard,
  Search,
  FilterList,
  Visibility,
  Sort,
  Save
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { ticketsAPI } from '../services/api';
import { UserRole } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axiosInstance from '../api/axiosInstance';

// Ticket status types and colors
const ticketStatusColors = {
  open: '#2196f3',       // Blue
  in_progress: '#ff9800', // Orange
  resolved: '#4caf50',   // Green
  closed: '#9e9e9e'      // Gray
};

// Ticket priority colors
const ticketPriorityColors = {
  low: '#c5e1a5',        // Light green
  medium: '#fff176',     // Light yellow
  high: '#ffb74d',       // Light orange
  urgent: '#ef5350'      // Light red
};

// Ticket category types and colors
const ticketCategoryColors = {
  match_planning: '#6200ea',   // Purple
  bug_report: '#f44336',      // Red
  ban_report: '#ff9800',      // Orange
  departure_request: '#2196f3', // Blue
  general: '#9e9e9e'          // Gray
};

const TicketManagementPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === UserRole.ADMIN;
  const isManager = user?.role === UserRole.MANAGER || user?.role === UserRole.SUB_MANAGER;
  
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Status update state
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/tickets');
      setTickets(response.data.data || []);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to load tickets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (ticketId, newStatus) => {
    if (!isManager && !isAdmin) return;
    
    setUpdatingStatus(prev => ({ ...prev, [ticketId]: true }));
    
    try {
      const response = await axiosInstance.put(`/tickets/${ticketId}`, {
        status: newStatus
      });
      
      // Update the ticket in local state
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket._id === ticketId 
            ? { ...ticket, status: newStatus }
            : ticket
        )
      );
      
      setSnackbar({
        open: true,
        message: 'Ticket status updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update ticket status',
        severity: 'error'
      });
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [ticketId]: false }));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...tickets];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        (ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }
    
    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = a.updatedAt ? a.updatedAt.getTime() : 
                    (a.updated_at ? new Date(a.updated_at).getTime() : 0);
      const dateB = b.updatedAt ? b.updatedAt.getTime() : 
                    (b.updated_at ? new Date(b.updated_at).getTime() : 0);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter, categoryFilter, sortOrder]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };
  
  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };
  
  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => prevOrder === 'newest' ? 'oldest' : 'newest');
  };
  
  const formatDateTime = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    return format(dateObj, 'dd MMM yyyy HH:mm', { locale: fr });
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in_progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };
  
  const getPriorityText = (priority) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };
  
  const getCategoryText = (category) => {
    switch (category) {
      case 'match_planning':
        return 'Match Planning';
      case 'bug_report':
        return 'Bug Report';
      case 'ban_report':
        return 'Ban Report';
      case 'departure_request':
        return 'Departure Request';
      case 'general':
        return 'General Inquiry';
      default:
        return category;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Ticket Management
          </Typography>
        </Box>

        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
          <Link color="inherit" href="/">
            <Dashboard sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Typography color="text.primary">Tickets</Typography>
        </Breadcrumbs>

        {/* Filters */}
        <Paper elevation={1} sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: 2 }
            }}
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              onChange={handlePriorityFilterChange}
              label="Priority"
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              label="Category"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="general">General</MenuItem>
              <MenuItem value="match_planning">Match Planning</MenuItem>
              <MenuItem value="bug_report">Bug Report</MenuItem>
              <MenuItem value="ban_report">Ban Report</MenuItem>
              <MenuItem value="departure_request">Departure Request</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            onClick={handleSortOrderChange}
            startIcon={<Sort />}
            size="medium"
            sx={{ ml: 'auto' }}
          >
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
          </Button>
        </Paper>

        {/* Tickets Table */}
        <Paper elevation={2} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Creator</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Updated</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Loading tickets...</TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No tickets found matching your criteria.</TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket._id} hover>
                      <TableCell>{ticket._id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.sender?.username || 'Unknown'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={getCategoryText(ticket.category)} 
                          size="small" 
                          sx={{ 
                            bgcolor: `${ticketCategoryColors[ticket.category] || ticketCategoryColors.general}20`, 
                            color: ticketCategoryColors[ticket.category] || ticketCategoryColors.general,
                            fontWeight: 500
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getPriorityText(ticket.priority)} 
                          size="small" 
                          sx={{ 
                            bgcolor: ticketPriorityColors[ticket.priority] || ticketPriorityColors.medium,
                            color: '#333',
                            fontWeight: 500
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        {isManager || isAdmin ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {updatingStatus[ticket._id] ? (
                              <CircularProgress size={16} />
                            ) : (
                              <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                  value={ticket.status || 'open'}
                                  onChange={(e) => handleStatusUpdate(ticket._id, e.target.value)}
                                  sx={{ 
                                    height: 32,
                                    '& .MuiSelect-select': { 
                                      py: 0.5,
                                      px: 1,
                                      fontSize: '0.75rem',
                                      fontWeight: 500,
                                      color: ticketStatusColors[ticket.status] || ticketStatusColors.open
                                    }
                                  }}
                                >
                                  <MenuItem value="open">Open</MenuItem>
                                  <MenuItem value="in_progress">In Progress</MenuItem>
                                  <MenuItem value="resolved">Resolved</MenuItem>
                                  <MenuItem value="closed">Closed</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          </Box>
                        ) : (
                          <Chip 
                            label={getStatusText(ticket.status)} 
                            size="small" 
                            sx={{ 
                              bgcolor: `${ticketStatusColors[ticket.status] || ticketStatusColors.open}20`,
                              color: ticketStatusColors[ticket.status] || ticketStatusColors.open,
                              fontWeight: 500
                            }} 
                          />
                        )}
                      </TableCell>
                      <TableCell>{formatDateTime(ticket.updatedAt)}</TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          component={RouterLink} 
                          to={`${location.pathname}/${ticket._id}`}
                          sx={{ color: '#1976d2' }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TicketManagementPage; 

