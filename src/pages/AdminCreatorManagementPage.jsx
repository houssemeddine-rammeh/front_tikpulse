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
  DialogActions,
  Divider,
  CircularProgress
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
import ApiTest from '../components/ApiTest';
import { creatorsAPI } from '../services/api';
import { useTranslation } from 'react-i18next';

const AdminCreatorManagementPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [creators, setCreators] = useState([]);
  const [categories, setCategories] = useState([]);
  const [managers, setManagers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [creatorToDelete, setCreatorToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [newCreator, setNewCreator] = useState({
    username: '',
    category: '',
    manager: '',
    agency: ''
  });
  const [formErrors, setFormErrors] = useState({
    username: '',
    category: '',
    manager: '',
    agency: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCreators();
    fetchCategoriesData();
    fetchManagersData();
    fetchAgenciesData();
  }, []);

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const response = await creatorsAPI.getAll();
      setCreators(response.users || []);
    } catch (error) {
      console.error('Failed to fetch creators:', error);
      setCreators([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await creatorsAPI.getUsersByRole('manager');
      return response.users || [];
    } catch (error) {
      console.error('Failed to fetch managers:', error);
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await creatorsAPI.getCategories();
      return response.categories || [];
    } catch (error) {
      console.warn('Failed to fetch categories, using default:', error);
      return [
        { id: 'lifestyle', name: t('creators.categories.lifestyle') },
        { id: 'comedy', name: t('creators.categories.comedy') },
        { id: 'dance', name: t('creators.categories.dance') },
        { id: 'beauty', name: t('creators.categories.beauty') },
        { id: 'fitness', name: t('creators.categories.fitness') },
        { id: 'food', name: t('creators.categories.food') },
        { id: 'gaming', name: t('creators.categories.gaming') },
        { id: 'education', name: t('creators.categories.education') }
      ];
    }
  };

  const fetchAgencies = async () => {
    try {
      const response = await creatorsAPI.getAgencies();
      return response.agencies || [];
    } catch (error) {
      console.warn('Failed to fetch agencies, using default:', error);
      return [
        { id: 'tikplus', name: 'TikPlus Agency' },
        { id: 'creative', name: 'Creative Collective' },
        { id: 'viral', name: 'Viral Media' }
      ];
    }
  };

  const fetchCategoriesData = async () => {
    const categoryData = await fetchCategories();
    setCategories(categoryData);
  };

  const fetchManagersData = async () => {
    const managerData = await fetchManagers();
    setManagers(managerData);
  };

  const fetchAgenciesData = async () => {
    const agencyData = await fetchAgencies();
    setAgencies(agencyData);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewCreator({
      username: '',
      category: '',
      manager: '',
      agency: ''
    });
    setFormErrors({
      username: '',
      category: '',
      manager: '',
      agency: ''
    });
  };

  const handleInputChange = (field) => (event) => {
    setNewCreator({
      ...newCreator,
      [field]: event.target.value
    });
    
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: ''
      });
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const errors = {
      username: !newCreator.username ? t('creators.validation.usernameRequired') : '',
      category: !newCreator.category ? t('creators.validation.categoryRequired') : '',
      manager: !newCreator.manager ? t('creators.validation.managerRequired') : '',
      agency: !newCreator.agency ? t('creators.validation.agencyRequired') : ''
    };

    if (Object.values(errors).some(error => error)) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Generate random password
      const randomPassword = Math.random().toString(36).slice(-8);
      
      // Find manager ID from name
      const manager = await fetchManagers().then(managers => managers.find(m => m.name === newCreator.manager));
      
      // Prepare creator data
      const creatorData = {
        username: newCreator.username,
        email: `${newCreator.username.toLowerCase().replace(/\s+/g, '.')}@${newCreator.agency.toLowerCase().replace(/\s+/g, '')}.com`,
        password: randomPassword,
        role: 'creator',
        tikTokId: newCreator.username,
        manager_id: manager?.id || null,
        agency: newCreator.agency,
        category: newCreator.category
      };
      
      // Call API to create the user with creator data
      const result = await creatorsAPI.create(creatorData);
      
      handleDialogClose();
      
      // Show success message
      alert(t('creators.addedSuccessfully', { name: newCreator.username }));
      
      // Refresh creators list
      fetchCreators();
      
    } catch (error) {
      console.error('Error adding creator:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
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
{t('navigation.dashboard')}
            </Box>
          </MuiLink>
          <Typography color="text.primary">{t('creators.management')}</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
{t('creators.management')}
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
            {t('creators.add')}
          </Button>
        </Box>

        {/* Error message */}
        {error && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: '#ffebee' }}>
            <Typography color="error">{error}</Typography>
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              sx={{ mt: 1 }}
              onClick={fetchCreators}
            >
              {t('creators.retry')}
            </Button>
          </Paper>
        )}

        {/* Creators Table */}
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            {loading ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>{t('creators.loadingCreators')}</Typography>
              </Box>
            ) : (
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('creators.username')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('creators.category')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('creators.manager')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{t('creators.agency')}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align="right">{t('creators.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {creators?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography color="textSecondary">{t('creators.noCreatorsFound')}</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    creators.map((creator) => (
                      <TableRow key={creator.id} hover>
                        <TableCell>{creator.username}</TableCell>
                        <TableCell>
                          <Chip 
                            label={creator.category} 
                            size="small" 
                            sx={{ 
                              bgcolor: '#e3f2fd', 
                              color: '#1976d2',
                              fontWeight: 500
                            }} 
                          />
                        </TableCell>
                        <TableCell>{creator.manager}</TableCell>
                        <TableCell>{creator.agency}</TableCell>
                        <TableCell align="right">
                          <IconButton size="small" sx={{ color: '#1976d2' }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: '#f44336' }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>
      </Box>

      {/* Add Creator Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('creators.addNew')}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label={t('creators.username')}
                  value={newCreator.username}
                  onChange={handleInputChange('username')}
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.category}>
                  <InputLabel>{t('creators.category')}</InputLabel>
                  <Select
                    value={newCreator.category}
                    label={t('creators.category')}
                    onChange={(e) => {
                      setNewCreator({
                        ...newCreator,
                        category: e.target.value 
                      });
                      setFormErrors({
                        ...formErrors,
                        category: ''
                      });
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={typeof category === 'string' ? category : category.id} value={typeof category === 'string' ? category : category.name}>
                        {typeof category === 'string' ? category : category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.category && (
                    <Typography variant="caption" color="error">
                      {formErrors.category}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.manager}>
                  <InputLabel>{t('creators.manager')}</InputLabel>
                  <Select
                    value={newCreator.manager}
                    label={t('creators.manager')}
                    onChange={(e) => {
                      setNewCreator({
                        ...newCreator,
                        manager: e.target.value
                      });
                      setFormErrors({
                        ...formErrors,
                        manager: ''
                      });
                    }}
                  >
                    {managers.map((manager) => (
                      <MenuItem key={manager.id} value={manager.name}>{manager.name}</MenuItem>
                    ))}
                  </Select>
                  {formErrors.manager && (
                    <Typography variant="caption" color="error">
                      {formErrors.manager}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!formErrors.agency}>
                  <InputLabel>{t('creators.agency')}</InputLabel>
                  <Select
                    value={newCreator.agency}
                    label={t('creators.agency')}
                    onChange={(e) => {
                      setNewCreator({
                        ...newCreator,
                        agency: e.target.value
                      });
                      setFormErrors({
                        ...formErrors,
                        agency: ''
                      });
                    }}
                  >
                    {agencies.map((agency) => (
                      <MenuItem key={typeof agency === 'string' ? agency : agency.id} value={typeof agency === 'string' ? agency : agency.name}>
                        {typeof agency === 'string' ? agency : agency.name}
                      </MenuItem>
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
          <Button onClick={handleDialogClose}>{t('creators.cancel')}</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ 
              bgcolor: '#6200ea',
              '&:hover': { bgcolor: '#3700b3' }
            }}
          >
            {t('creators.add')}
          </Button>
        </DialogActions>
      </Dialog>
      
      <Divider sx={{ my: 3 }} />
      
      <ApiTest />
    </Container>
  );
};

export default AdminCreatorManagementPage; 