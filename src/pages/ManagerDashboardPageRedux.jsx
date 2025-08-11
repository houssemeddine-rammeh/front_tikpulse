import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Dashboard,
  Campaign,
  People,
  Business,
  Event,
  Analytics,
  Add,
  Edit,
  Delete,
  Refresh,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getManagerProfile,
  getManagerStats,
  getCampaigns,
  getCreators,
  getCompanies,
  getEvents,
  getAnalytics,
  selectManagerProfile,
  selectManagerStats,
  selectCampaigns,
  selectCreators,
  selectCompanies,
  selectEvents,
  selectAnalytics,
  selectManagerLoading,
  selectManagerErrors,
} from '../features/managerDashboardSlice';
import Layout from '../components/layout/Layout';

const ManagerDashboardPageRedux = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);

  // Redux selectors
  const profile = useSelector(selectManagerProfile);
  const stats = useSelector(selectManagerStats);
  const campaigns = useSelector(selectCampaigns);
  const creators = useSelector(selectCreators);
  const companies = useSelector(selectCompanies);
  const events = useSelector(selectEvents);
  const analytics = useSelector(selectAnalytics);
  const loading = useSelector(selectManagerLoading);
  const errors = useSelector(selectManagerErrors);

  // Fetch data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await Promise.all([
          dispatch(getManagerProfile()),
          dispatch(getManagerStats()),
          dispatch(getCampaigns()),
          dispatch(getCreators()),
          dispatch(getCompanies()),
          dispatch(getEvents()),
          dispatch(getAnalytics()),
        ]);
      } catch (error) {
        console.error('Error loading manager dashboard data:', error);
      }
    };

    loadDashboardData();
  }, [dispatch]);

  // Handle refresh
  const handleRefresh = () => {
    setSelectedTab(0);
    dispatch(getManagerStats());
    dispatch(getCampaigns());
    dispatch(getCreators());
    dispatch(getCompanies());
    dispatch(getEvents());
  };

  // Show loading spinner while fetching initial data
  if (loading.profile || loading.stats) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading manager dashboard...
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  // Show error if profile fetch failed
  if (errors.profile) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading profile: {errors.profile}
            <Button 
              onClick={() => dispatch(getManagerProfile())} 
              variant="outlined" 
              size="small" 
              sx={{ ml: 2 }}
            >
              Retry
            </Button>
          </Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Manager Dashboard
            </Typography>
            {profile && (
              <Typography variant="subtitle1" color="text.secondary">
                Welcome back, {profile.name || profile.username || 'Manager'}!
              </Typography>
            )}
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={loading.stats}
          >
            Refresh
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Campaigns
                    </Typography>
                    <Typography variant="h4">
                      {stats?.totalCampaigns || '0'}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      {stats?.activeCampaigns || '0'} active
                    </Typography>
                  </Box>
                  <Campaign color="primary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Creators
                    </Typography>
                    <Typography variant="h4">
                      {stats?.totalCreators || '0'}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      {stats?.activeCreators || '0'} active
                    </Typography>
                  </Box>
                  <People color="secondary" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h4">
                      ${stats?.totalRevenue?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      ${stats?.monthlyRevenue?.toLocaleString() || '0'} this month
                    </Typography>
                  </Box>
                  <Analytics color="success" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Companies
                    </Typography>
                    <Typography variant="h4">
                      {stats?.totalCompanies || '0'}
                    </Typography>
                    <Typography variant="body2" color="info.main">
                      {stats?.totalEvents || '0'} events
                    </Typography>
                  </Box>
                  <Business color="warning" sx={{ fontSize: 40 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data Tables */}
        <Paper sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
              <Tab 
                label={`Campaigns (${campaigns?.length || 0})`} 
                icon={<Campaign />}
                iconPosition="start"
              />
              <Tab 
                label={`Creators (${creators?.length || 0})`} 
                icon={<People />}
                iconPosition="start"
              />
              <Tab 
                label={`Companies (${companies?.length || 0})`} 
                icon={<Business />}
                iconPosition="start"
              />
              <Tab 
                label={`Events (${events?.length || 0})`} 
                icon={<Event />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box sx={{ p: 3 }}>
            {/* Loading State */}
            {(loading.campaigns || loading.creators || loading.companies || loading.events) && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Loading data...
                </Typography>
              </Box>
            )}

            {/* Campaigns Tab */}
            {selectedTab === 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Campaigns Management</Typography>
                  <Button variant="contained" startIcon={<Add />}>
                    Add Campaign
                  </Button>
                </Box>
                
                {errors.campaigns ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading campaigns: {errors.campaigns}
                    <Button 
                      onClick={() => dispatch(getCampaigns())} 
                      variant="outlined" 
                      size="small" 
                      sx={{ ml: 2 }}
                    >
                      Retry
                    </Button>
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Budget</TableCell>
                          <TableCell>Created</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {campaigns && campaigns.length > 0 ? (
                          campaigns.map((campaign) => (
                            <TableRow key={campaign.id}>
                              <TableCell>{campaign.name || campaign.title}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={campaign.status || 'Active'} 
                                  color={campaign.status === 'Active' ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>${campaign.budget?.toLocaleString() || '0'}</TableCell>
                              <TableCell>
                                {campaign.createdAt ? 
                                  new Date(campaign.createdAt).toLocaleDateString() : 
                                  'N/A'
                                }
                              </TableCell>
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <Edit />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No campaigns available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* Creators Tab */}
            {selectedTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Creators Management</Typography>
                  <Button variant="contained" startIcon={<Add />}>
                    Add Creator
                  </Button>
                </Box>
                
                {errors.creators ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading creators: {errors.creators}
                    <Button 
                      onClick={() => dispatch(getCreators())} 
                      variant="outlined" 
                      size="small" 
                      sx={{ ml: 2 }}
                    >
                      Retry
                    </Button>
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Followers</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {creators && creators.length > 0 ? (
                          creators.map((creator) => (
                            <TableRow key={creator.id}>
                              <TableCell>{creator.name || creator.username}</TableCell>
                              <TableCell>{creator.email}</TableCell>
                              <TableCell>{creator.followers?.toLocaleString() || '0'}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={creator.status || 'Active'} 
                                  color={creator.status === 'Active' ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <Edit />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No creators available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* Companies Tab */}
            {selectedTab === 2 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Companies Management</Typography>
                  <Button variant="contained" startIcon={<Add />}>
                    Add Company
                  </Button>
                </Box>
                
                {errors.companies ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading companies: {errors.companies}
                    <Button 
                      onClick={() => dispatch(getCompanies())} 
                      variant="outlined" 
                      size="small" 
                      sx={{ ml: 2 }}
                    >
                      Retry
                    </Button>
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Industry</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {companies && companies.length > 0 ? (
                          companies.map((company) => (
                            <TableRow key={company.id}>
                              <TableCell>{company.name}</TableCell>
                              <TableCell>{company.industry || 'N/A'}</TableCell>
                              <TableCell>{company.email || company.contact}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={company.status || 'Active'} 
                                  color={company.status === 'Active' ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <Edit />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No companies available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* Events Tab */}
            {selectedTab === 3 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Events Management</Typography>
                  <Button variant="contained" startIcon={<Add />}>
                    Add Event
                  </Button>
                </Box>
                
                {errors.events ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Error loading events: {errors.events}
                    <Button 
                      onClick={() => dispatch(getEvents())} 
                      variant="outlined" 
                      size="small" 
                      sx={{ ml: 2 }}
                    >
                      Retry
                    </Button>
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Participants</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {events && events.length > 0 ? (
                          events.map((event) => (
                            <TableRow key={event.id}>
                              <TableCell>{event.name || event.title}</TableCell>
                              <TableCell>
                                {event.date ? 
                                  new Date(event.date).toLocaleDateString() : 
                                  'N/A'
                                }
                              </TableCell>
                              <TableCell>{event.participants || '0'}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={event.status || 'Upcoming'} 
                                  color={event.status === 'Active' ? 'success' : 'default'}
                                  size="small"
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton size="small" color="primary">
                                  <Edit />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No events available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ManagerDashboardPageRedux; 