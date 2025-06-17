import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
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
  Dashboard as DashboardIcon,
  Upload as UploadIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const CompanyManagementPage = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    email: '',
    website: '',
    phone: '',
    industry: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
    brandCharter: '',
    logo: ''
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/companies`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const companiesData = await response.json();
          setCompanies(companiesData);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewCompany({
      name: '',
      email: '',
      website: '',
      phone: '',
      industry: '',
      description: ''
    });
    setFormErrors({
      name: '',
      description: '',
      brandCharter: '',
      logo: ''
    });
  };

  const handleInputChange = (field) => (event) => {
    setNewCompany({
      ...newCompany,
      [field]: event.target.value
    });
    
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  const handleSubmit = () => {
    // Validate form
    const errors = {
      name: !newCompany.name ? 'Name is required' : '',
      description: !newCompany.description ? 'Description is required' : '',
      brandCharter: !newCompany.brandCharter ? 'Brand Charter is required' : '',
      logo: !newCompany.logo ? 'Logo is required' : ''
    };

    if (Object.values(errors).some(error => error)) {
      setFormErrors(errors);
      return;
    }

    // Add new company
    const companyId = `c${Date.now()}`;
    const companyToAdd = {
      id: companyId,
      ...newCompany,
      logo: newCompany.logo || `https://via.placeholder.com/150?text=${newCompany.name.substring(0, 2).toUpperCase()}`
    };

    setCompanies([...companies, companyToAdd]);
    handleDialogClose();
    
    // In a real app, you would make an API call to persist the company
    console.log('Company added:', companyToAdd);
  };

  const handleFileUpload = (field) => () => {
    // In a real app, this would trigger a file upload
    alert(`File upload for ${field} would happen here`);
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
          <Typography color="text.primary">Company Management</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Company Management
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
            Add Company
          </Button>
        </Box>

        {/* Companies Table */}
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Logo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Brand Charter</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id} hover>
                    <TableCell>
                      <Avatar 
                        src={company.logo} 
                        alt={company.name}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                    </TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.description}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => window.open(company.brandCharter, '_blank')}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      {company.brandCharter.split('/').pop()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small" sx={{ color: '#1976d2' }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#f44336' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Add Company Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  value={newCompany.name}
                  onChange={handleInputChange('name')}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={newCompany.description}
                  onChange={handleInputChange('description')}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Brand Charter URL"
                  value={newCompany.brandCharter}
                  onChange={handleInputChange('brandCharter')}
                  error={!!formErrors.brandCharter}
                  helperText={formErrors.brandCharter}
                  InputProps={{
                    endAdornment: (
                      <Button 
                        startIcon={<UploadIcon />}
                        onClick={handleFileUpload('brandCharter')}
                        size="small"
                      >
                        Upload
                      </Button>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Logo URL"
                  value={newCompany.logo}
                  onChange={handleInputChange('logo')}
                  error={!!formErrors.logo}
                  helperText={formErrors.logo}
                  InputProps={{
                    endAdornment: (
                      <Button 
                        startIcon={<UploadIcon />}
                        onClick={handleFileUpload('logo')}
                        size="small"
                      >
                        Upload
                      </Button>
                    )
                  }}
                />
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
            Add Company
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CompanyManagementPage; 

