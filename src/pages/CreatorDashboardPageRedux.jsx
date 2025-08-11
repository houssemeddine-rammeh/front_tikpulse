import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
  CircularProgress,
  Avatar,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  LinearProgress,
} from '@mui/material';
import {
  Diamond,
  Videocam,
  Today,
  AttachMoney,
  Person,
  Email,
  Phone,
  CalendarToday,
  Business,
  Report as ReportIcon,
  Event as EventIcon,
  Campaign as CampaignIcon,
  TrendingUp,
  VideoLibrary,
  Visibility,
  People,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCreatorDashboard } from '../hooks/useCreatorDashboard';
import { useNotifications } from '../contexts/NotificationContext';
import Layout from "../components/layout/Layout";

const CreatorDashboardPageRedux = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { addNotification } = useNotifications();

  // Redux state and actions
  const {
    profile,
    stats,
    availableEvents,
    joinedEvents,
    availableCampaigns,
    joinedCampaigns,
    loading,
    errors,
    selectedTab,
    showJoinModal,
    selectedItem,
    initializeDashboard,
    handleJoinEvent,
    handleJoinCampaign,
    showEventJoinModal,
    showCampaignJoinModal,
    closeJoinModal,
    setSelectedTab,
    isEventJoined,
    isCampaignJoined,
    fetchProfile,
    fetchStats,
    fetchAvailableEvents,
    fetchAvailableCampaigns,
    setSelectedItem,
    setShowJoinModal,
    clearErrors,
  } = useCreatorDashboard();

  // Local state for report dialog
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reportData, setReportData] = useState({
    title: '',
    description: '',
    category: 'technical'
  });

  // Fetch all data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        await Promise.all([
          fetchProfile(),
          fetchStats(),
          fetchAvailableEvents(),
          fetchAvailableCampaigns(),
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, [fetchProfile, fetchStats, fetchAvailableEvents, fetchAvailableCampaigns]);

  const handleReportDialogOpen = () => {
    setReportDialogOpen(true);
  };

  const handleReportDialogClose = () => {
    setReportDialogOpen(false);
    setReportData({
      title: '',
      description: '',
      category: 'technical'
    });
  };

  const handleReportInputChange = (field) => (event) => {
    setReportData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleReportSubmit = async () => {
    setSubmitLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addNotification({
        type: 'success',
        message: 'Report submitted successfully'
      });
      
      handleReportDialogClose();
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Error submitting report'
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!selectedItem) return;

    try {
      if (selectedTab === 0) {
        // Joining an event
        await handleJoinEvent(selectedItem.id);
      } else {
        // Joining a campaign
        await handleJoinCampaign(selectedItem.id);
      }
    } catch (error) {
      console.error('Error joining:', error);
    }
  };

  if (loading.profile || loading.stats) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading dashboard data...
            </Typography>
          </Box>
        </Container>
      </Layout>
    );
  }

  if (errors.profile) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading profile: {errors.profile}
            <Button 
              onClick={() => { clearErrors(); fetchProfile(); }} 
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

  if (!profile) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No profile data available
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Creator Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome back, {profile.username}! Here's your performance overview.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ReportIcon />}
              onClick={handleReportDialogOpen}
              sx={{ textTransform: 'none' }}
            >
              Report Issue
            </Button>
          </Box>

          {/* Creator Info Card */}
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }}>
                      <Person sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {profile.username}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {profile.tikTokId}
                      </Typography>
                      <Chip 
                        label={profile.contractDetails?.tier || 'Bronze'} 
                        size="small"
                        sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Followers</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {profile.followers?.toLocaleString() || '0'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Videos</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {profile.videos || 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Views</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {profile.views ? (profile.views / 1000000).toFixed(1) + 'M' : '0'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>Days Active</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {profile.daysSinceJoining || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Diamond sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                  <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    {loading.stats ? <CircularProgress size={24} /> : (profile.diamonds?.toLocaleString() || '0')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Total Diamonds</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#f3e5f5' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Videocam sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
                  <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                    {profile.validLiveDays || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Valid Live Days</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#e8f5e8' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Today sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                  <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    {profile.liveDuration || 0}h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Live Duration</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#fff3e0' }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <AttachMoney sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                  <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                    €0
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Total Bonus</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Events and Campaigns Tabs */}
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
                <Tab 
                  label={`Available Events (${availableEvents?.length || 0})`} 
                  icon={<EventIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Available Campaigns (${availableCampaigns?.length || 0})`} 
                  icon={<CampaignIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Joined Events (${joinedEvents?.length || 0})`} 
                  icon={<EventIcon />}
                  iconPosition="start"
                />
                <Tab 
                  label={`Joined Campaigns (${joinedCampaigns?.length || 0})`} 
                  icon={<CampaignIcon />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
              {/* Loading State */}
              {(loading.events || loading.campaigns) && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {loading.events ? 'Loading events...' : 'Loading campaigns...'}
                  </Typography>
                </Box>
              )}

              {/* Error States */}
              {errors.events && selectedTab < 2 && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Error loading events: {errors.events}
                  <Button 
                    onClick={() => { clearErrors(); fetchAvailableEvents(); }} 
                    variant="outlined" 
                    size="small" 
                    sx={{ ml: 2 }}
                  >
                    Retry
                  </Button>
                </Alert>
              )}

              {errors.campaigns && (selectedTab === 1 || selectedTab === 3) && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Error loading campaigns: {errors.campaigns}
                  <Button 
                    onClick={() => { clearErrors(); fetchAvailableCampaigns(); }} 
                    variant="outlined" 
                    size="small" 
                    sx={{ ml: 2 }}
                  >
                    Retry
                  </Button>
                </Alert>
              )}

              {/* Available Events Tab */}
              {selectedTab === 0 && (
                <Grid container spacing={2}>
                  {availableEvents?.length > 0 ? (
                    availableEvents.map((event) => (
                      <Grid item xs={12} md={6} key={event.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {event.title || event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {event.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                              <Chip label={event.category || 'General'} size="small" />
                              <Chip 
                                label={`${event.reward || 0} diamonds`} 
                                size="small" 
                                color="primary" 
                              />
                            </Box>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSelectedItem(event);
                                setShowJoinModal(true);
                              }}
                              disabled={loading.joining}
                            >
                              Join Event
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary" textAlign="center">
                        No available events at the moment.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Available Campaigns Tab */}
              {selectedTab === 1 && (
                <Grid container spacing={2}>
                  {availableCampaigns?.length > 0 ? (
                    availableCampaigns.map((campaign) => (
                      <Grid item xs={12} md={6} key={campaign.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {campaign.title || campaign.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {campaign.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                              <Chip label={campaign.brand || 'Brand'} size="small" />
                              <Chip 
                                label={`$${campaign.budget || 0}`} 
                                size="small" 
                                color="secondary" 
                              />
                            </Box>
                            <Button
                              variant="contained"
                              onClick={() => {
                                setSelectedItem(campaign);
                                setShowJoinModal(true);
                              }}
                              disabled={loading.joining}
                            >
                              Join Campaign
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary" textAlign="center">
                        No available campaigns at the moment.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Joined Events Tab */}
              {selectedTab === 2 && (
                <Grid container spacing={2}>
                  {joinedEvents?.length > 0 ? (
                    joinedEvents.map((event) => (
                      <Grid item xs={12} md={6} key={event.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {event.title || event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {event.description}
                            </Typography>
                            <Chip label="Joined" color="success" size="small" />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary" textAlign="center">
                        You haven't joined any events yet.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Joined Campaigns Tab */}
              {selectedTab === 3 && (
                <Grid container spacing={2}>
                  {joinedCampaigns?.length > 0 ? (
                    joinedCampaigns.map((campaign) => (
                      <Grid item xs={12} md={6} key={campaign.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {campaign.title || campaign.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {campaign.description}
                            </Typography>
                            <Chip label="Joined" color="success" size="small" />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="text.secondary" textAlign="center">
                        You haven't joined any campaigns yet.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Paper>

          {/* Contact & Support */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                📞 Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Creator Details</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 1, color: '#1976d2' }} />
                    <Typography variant="body1">{profile.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ mr: 1, color: '#1976d2' }} />
                    <Typography variant="body1">{profile.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1, color: '#1976d2' }} />
                    <Typography variant="body1">
                      Joined {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Agency Support</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ mr: 1, color: '#1976d2' }} />
                    <Typography variant="body1">Agency Name</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 1, color: '#1976d2' }} />
                    <Typography variant="body1">Manager: Manager Name</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 1, color: '#1976d2' }} />
                    <Typography variant="body1">support@agency.com</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Join Confirmation Modal */}
          <Dialog open={showJoinModal} onClose={() => setShowJoinModal(false)}>
            <DialogTitle>
              Confirm Join {selectedTab === 0 || selectedTab === 2 ? 'Event' : 'Campaign'}
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to join "{selectedItem?.title || selectedItem?.name}"?
              </Typography>
              {errors.joining && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.joining}
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowJoinModal(false)}>Cancel</Button>
              <Button 
                onClick={handleJoin} 
                variant="contained" 
                disabled={loading.joining}
              >
                {loading.joining ? <CircularProgress size={20} /> : 'Join'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Report Issue Dialog */}
          <Dialog open={reportDialogOpen} onClose={handleReportDialogClose} maxWidth="sm" fullWidth>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 1 }}>
                <TextField
                  select
                  fullWidth
                  label="Issue Category"
                  value={reportData.category}
                  onChange={handleReportInputChange('category')}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="technical">Technical Issue</MenuItem>
                  <MenuItem value="payment">Payment Issue</MenuItem>
                  <MenuItem value="contract">Contract Issue</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                
                <TextField
                  fullWidth
                  label="Issue Title"
                  value={reportData.title}
                  onChange={handleReportInputChange('title')}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={reportData.description}
                  onChange={handleReportInputChange('description')}
                  placeholder="Please describe the issue in detail..."
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReportDialogClose}>Cancel</Button>
              <Button 
                onClick={handleReportSubmit} 
                variant="contained" 
                disabled={!reportData.title || submitLoading}
              >
                {submitLoading ? <CircularProgress size={20} /> : 'Submit Report'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Layout>
  );
};

export default CreatorDashboardPageRedux; 