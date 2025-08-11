import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const ManagerManagementPage = () => {
  const { user } = useAuth();
  const [managers, setManagers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    role: UserRole.MANAGER,
    agency: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    role: '',
    agency: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [managersResponse, agenciesResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE_URL}/managers`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/agencies`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (!managersResponse.ok || !agenciesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const managersData = await managersResponse.json();
        const agenciesData = await agenciesResponse.json();
        
        setManagers(managersData);
        setAgencies(agenciesData.map(agency => agency.name));
      } catch (error) {
        console.error('Error fetching data:', error);
        setManagers([]);
        setAgencies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewManager({
      name: '',
      email: '',
      role: UserRole.MANAGER,
      agency: ''
    });
    setFormErrors({
      name: '',
      email: '',
      role: '',
      agency: ''
    });
  };

  const handleInputChange = (field) => (event) => {
    setNewManager({
      ...newManager,
      [field]: event.target.value
    });
    
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    // Validate form
    const errors = {
      name: !newManager.name ? 'Name is required' : '',
      email: !newManager.email ? 'Email is required' : 
             !validateEmail(newManager.email) ? 'Invalid email format' : '',
      role: !newManager.role ? 'Role is required' : '',
      agency: !newManager.agency ? 'Agency is required' : ''
    };

    if (Object.values(errors).some(error => error)) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/managers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newManager),
      });

      if (!response.ok) {
        throw new Error('Failed to create manager');
      }

      const createdManager = await response.json();
      setManagers([...managers, createdManager]);
      handleDialogClose();
    } catch (error) {
      console.error('Error creating manager:', error);
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case UserRole.MANAGER:
        return 'Manager';
      case UserRole.SUB_MANAGER:
        return 'Sub Manager';
      default:
        return 'Unknown';
    }
  };

  const getRoleChipColor = (role) => {
    switch (role) {
      case UserRole.MANAGER:
        return { bg: '#e8f5e9', color: '#2e7d32' };
      case UserRole.SUB_MANAGER:
        return { bg: '#fff8e1', color: '#ff8f00' };
      default:
        return { bg: '#e0e0e0', color: '#616161' };
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <MuiLink component={Link} to="/admin/dashboard" underline="hover" color="inherit">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DashboardIcon sx={{ mr: 0.5 }} fontSize="small" />
              Dashboard
            </Box>
          </MuiLink>
          <Typography color="text.primary">Manager Management</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Manager Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleDialogOpen}
            sx={{ 
              bgcolor: '#6200ea',
              '&:hover': { bgcolor: '#3700b3' }
            }}
          >
            Add Manager
          </Button>
        </Box>

        {/* Managers Table */}
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Agency</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {managers.map((manager) => {
                  const roleColor = getRoleChipColor(manager.role);
                  return (
                    <TableRow key={manager.id} hover>
                      <TableCell>{manager.name}</TableCell>
                      <TableCell>{manager.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={getRoleLabel(manager.role)} 
                          size="small" 
                          sx={{ 
                            bgcolor: roleColor.bg, 
                            color: roleColor.color,
                            fontWeight: 500
                          }} 
                        />
                      </TableCell>
                      <TableCell>{manager.agency}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" sx={{ color: '#1976d2' }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#f44336' }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Add Manager Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Manager</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  value={newManager.name}
                  onChange={handleInputChange('name')}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={newManager.email}
                  onChange={handleInputChange('email')}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={newManager.role}
                    label="Role"
                    onChange={(e) => {
                      setNewManager({
                        ...newManager,
                        role: e.target.value
                      });
                      setFormErrors({
                        ...formErrors,
                        role: ''
                      });
                    }}
                  >
                    <MenuItem value={UserRole.MANAGER}>Manager</MenuItem>
                    <MenuItem value={UserRole.SUB_MANAGER}>Sub Manager</MenuItem>
                  </Select>
                  {formErrors.role && (
                    <Typography variant="caption" color="error">
                      {formErrors.role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.agency}>
                  <InputLabel>Agency</InputLabel>
                  <Select
                    value={newManager.agency}
                    label="Agency"
                    onChange={(e) => {
                      setNewManager({
                        ...newManager,
                        agency: e.target.value
                      });
                      setFormErrors({
                        ...formErrors,
                        agency: ''
                      });
                    }}
                  >
                    {agencies.map((agency) => (
                      <MenuItem key={agency} value={agency}>{agency}</MenuItem>
                    ))}
                  </Select>
                  {formErrors.agency && (
                    <Typography variant="caption" color="error">
                      {formErrors.agency}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ 
              bgcolor: '#6200ea',
              '&:hover': { bgcolor: '#3700b3' }
            }}
          >
            Add Manager
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManagerManagementPage; 
