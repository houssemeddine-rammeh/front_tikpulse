import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  useTheme,
  alpha,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  Dashboard,
  Business,
  Add,
  GetApp,
  Visibility,
  Edit,
  Delete,
  TrendingUp,
  People,
  AttachMoney,
  Assessment,
  NavigateNext,
  Download,
  CloudDownload,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import Layout from "../components/layout/Layout";

const SuperAdminDashboardPage = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addAgencyOpen, setAddAgencyOpen] = useState(false);
  const [newAgency, setNewAgency] = useState({
    name: '',
    email: '',
    description: '',
    website: '',
    phone: ''
  });

  // Fetch agencies from API
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/agencies`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch agencies');
        }
        
        const agenciesData = await response.json();
        setAgencies(agenciesData);
      } catch (error) {
        console.error('Error fetching agencies:', error);
        setAgencies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgencies();
  }, [user?.id]);

  const handleAddAgency = () => {
    if (newAgency.name && newAgency.email) {
      const agency = {
        id: Date.now().toString(),
        name: newAgency.name,
        email: newAgency.email,
        description: newAgency.description,
        website: newAgency.website,
        phone: newAgency.phone,
        address: {
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
        },
        settings: {
          timezone: 'UTC',
          currency: 'USD',
          language: 'en',
        },
        subscription: {
          plan: 'basic',
          status: 'trial',
          startDate: new Date(),
          features: ['basic_analytics'],
        },
        stats: {
          totalUsers: 0,
          totalCreators: 0,
          totalManagers: 0,
          totalRevenue: 0,
          activeUsers: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        createdBy: user?.id || '',
        status: 'active',
      };

      setAgencies([...agencies, agency]);
      setNewAgency({ 
        name: '',
        email: '',
        description: '',
        website: '',
        phone: ''
      });
      setAddAgencyOpen(false);
    }
  };

  const handleExportData = async (format) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin/export?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      const blob = await response.blob();
      const filename = `super_admin_export_${new Date().toISOString().split('T')[0]}.${format}`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.palette.success.main;
      case 'inactive': return theme.palette.warning.main;
      case 'suspended': return theme.palette.error.main;
      default: return theme.palette.grey[400];
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'enterprise': return theme.palette.primary.main;
      case 'premium': return theme.palette.secondary.main;
      case 'basic': return theme.palette.info.main;
      default: return theme.palette.grey[400];
    }
  };

  const totalStats = {
    totalAgencies: agencies.length,
    totalUsers: agencies.reduce((sum, agency) => sum + agency.stats.totalUsers, 0),
    totalRevenue: agencies.reduce((sum, agency) => sum + agency.stats.totalRevenue, 0),
    averageUsers: Math.round(agencies.reduce((sum, agency) => sum + agency.stats.totalUsers, 0) / agencies.length) || 0,
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <LinearProgress sx={{ width: '300px' }} />
        </Box>
      </Container>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
            <Link color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="text.primary">Super Admin</Typography>
          </Breadcrumbs>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                Super Admin Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage agencies and monitor system-wide performance
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<CloudDownload />}
              onClick={() => handleExportData('json')}
            >
              Export Data
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setAddAgencyOpen(true)}
              sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
            >
              Add Agency
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {totalStats.totalAgencies}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Total Agencies
                    </Typography>
                  </Box>
                  <Business sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {totalStats.totalUsers.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Total Users
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      ${totalStats.totalRevenue.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Total Revenue
                    </Typography>
                  </Box>
                  <AttachMoney sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {totalStats.averageUsers}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Avg Users/Agency
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 48, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Export Options */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Data Export Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={() => handleExportData('csv')}
                  sx={{ py: 1.5 }}
                >
                  Export CSV
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<CloudDownload />}
                  onClick={() => handleExportData('json')}
                  sx={{ py: 1.5 }}
                >
                  Export JSON
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Assessment />}
                  onClick={() => handleExportData('pdf')}
                  sx={{ py: 1.5 }}
                >
                  Export Report (PDF)
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Agencies Table */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Agencies Management
              </Typography>
              <Chip label={`${agencies.length} Total`} color="primary" />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Agency</TableCell>
                    <TableCell>Plan</TableCell>
                    <TableCell>Users</TableCell>
                    <TableCell>Revenue</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agencies.map((agency) => (
                    <TableRow key={agency.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ mr: 2 }}>
                            <Business />
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {agency.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {agency.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={agency.subscription.plan.toUpperCase()}
                          sx={{
                            bgcolor: alpha(getPlanColor(agency.subscription.plan), 0.1),
                            color: getPlanColor(agency.subscription.plan),
                            fontWeight: 600,
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {agency.stats.totalUsers}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {agency.stats.activeUsers} active
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          ${agency.stats.totalRevenue.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={agency.status.toUpperCase()}
                          sx={{
                            bgcolor: alpha(getStatusColor(agency.status), 0.1),
                            color: getStatusColor(agency.status),
                            fontWeight: 600,
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {agency.createdAt ? agency.createdAt.toLocaleDateString() : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" color="primary">
                            <Visibility />
                          </IconButton>
                          <IconButton size="small" color="secondary">
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <Delete />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Add Agency Dialog */}
        <Dialog open={addAgencyOpen} onClose={() => setAddAgencyOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Add New Agency</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Agency Name"
                  value={newAgency.name}
                  onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newAgency.email}
                  onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={newAgency.description}
                  onChange={(e) => setNewAgency({ ...newAgency, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Website"
                  value={newAgency.website}
                  onChange={(e) => setNewAgency({ ...newAgency, website: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={newAgency.phone}
                  onChange={(e) => setNewAgency({ ...newAgency, phone: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddAgencyOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAgency} variant="contained">
              Add Agency
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default SuperAdminDashboardPage; 

