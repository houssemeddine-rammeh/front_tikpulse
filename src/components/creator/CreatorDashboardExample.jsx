import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Event as EventIcon,
  Campaign as CampaignIcon,
  Diamond as DiamondIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useCreatorDashboard } from '../../hooks/useCreatorDashboard';

const CreatorDashboardExample = () => {
  const {
    // Data
    profile,
    stats,
    availableEvents,
    joinedEvents,
    availableCampaigns,
    joinedCampaigns,
    
    // UI State
    showJoinModal,
    selectedItem,
    
    // Loading & Error states
    loading,
    errors,
    
    // Actions
    initializeDashboard,
    handleJoinEvent,
    handleJoinCampaign,
    showEventJoinModal,
    showCampaignJoinModal,
    closeJoinModal,
    isEventJoined,
    isCampaignJoined,
  } = useCreatorDashboard();

  // Initialize dashboard data on component mount
  useEffect(() => {
    initializeDashboard();
  }, []);

  // Handle joining from modal
  const handleConfirmJoin = async () => {
    if (!selectedItem) return;

    if (selectedItem.type === 'event') {
      const result = await handleJoinEvent(selectedItem.data.id);
      if (result.success) {
        console.log('Successfully joined event!');
      } else {
        console.error('Failed to join event:', result.error);
      }
    } else if (selectedItem.type === 'campaign') {
      const result = await handleJoinCampaign(selectedItem.data.id);
      if (result.success) {
        console.log('Successfully joined campaign!');
      } else {
        console.error('Failed to join campaign:', result.error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Creator Dashboard Redux Example
      </Typography>

      {/* Profile Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          {loading.profile ? (
            <CircularProgress size={24} />
          ) : errors.profile ? (
            <Alert severity="error">{errors.profile}</Alert>
          ) : profile ? (
            <Box>
              <Typography>Name: {profile.name}</Typography>
              <Typography>Username: {profile.username}</Typography>
              <Typography>Email: {profile.email}</Typography>
            </Box>
          ) : (
            <Typography color="text.secondary">No profile data available</Typography>
          )}
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dashboard Stats
          </Typography>
          {loading.stats ? (
            <CircularProgress size={24} />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <PeopleIcon color="primary" />
                  <Box>
                    <Typography variant="h6">{stats.totalFollowers.toLocaleString()}</Typography>
                    <Typography variant="caption">Followers</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <VisibilityIcon color="secondary" />
                  <Box>
                    <Typography variant="h6">{stats.totalViews.toLocaleString()}</Typography>
                    <Typography variant="caption">Views</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <DiamondIcon color="warning" />
                  <Box>
                    <Typography variant="h6">{stats.totalDiamonds.toLocaleString()}</Typography>
                    <Typography variant="caption">Diamonds</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <TrendingUpIcon color="success" />
                  <Box>
                    <Typography variant="h6">${stats.monthlyEarnings.toLocaleString()}</Typography>
                    <Typography variant="caption">Monthly Earnings</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Available Events Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Available Events ({availableEvents.length})
          </Typography>
          {loading.events ? (
            <CircularProgress size={24} />
          ) : errors.events ? (
            <Alert severity="error">{errors.events}</Alert>
          ) : availableEvents.length > 0 ? (
            <List>
              {availableEvents.map((event) => (
                <ListItem
                  key={event.id}
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => showEventJoinModal(event)}
                      disabled={isEventJoined(event.id)}
                    >
                      {isEventJoined(event.id) ? 'Joined' : 'Join'}
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={event.title}
                    secondary={event.description}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">No events available</Typography>
          )}
        </CardContent>
      </Card>

      {/* Available Campaigns Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Available Campaigns ({availableCampaigns.length})
          </Typography>
          {loading.campaigns ? (
            <CircularProgress size={24} />
          ) : errors.campaigns ? (
            <Alert severity="error">{errors.campaigns}</Alert>
          ) : availableCampaigns.length > 0 ? (
            <List>
              {availableCampaigns.map((campaign) => (
                <ListItem
                  key={campaign.id}
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => showCampaignJoinModal(campaign)}
                      disabled={isCampaignJoined(campaign.id)}
                    >
                      {isCampaignJoined(campaign.id) ? 'Joined' : 'Join'}
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <CampaignIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={campaign.title}
                    secondary={campaign.description}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">No campaigns available</Typography>
          )}
        </CardContent>
      </Card>

      {/* Joined Items Summary */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Joined Events ({joinedEvents.length})
              </Typography>
              {joinedEvents.map((event) => (
                <Chip key={event.id} label={event.title} sx={{ mr: 1, mb: 1 }} />
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Joined Campaigns ({joinedCampaigns.length})
              </Typography>
              {joinedCampaigns.map((campaign) => (
                <Chip key={campaign.id} label={campaign.title} sx={{ mr: 1, mb: 1 }} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Join Confirmation Modal */}
      <Dialog open={showJoinModal} onClose={closeJoinModal}>
        <DialogTitle>
          {selectedItem?.type === 'event' ? 'Join Event' : 'Join Campaign'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to join "{selectedItem?.data?.title}"?
          </Typography>
          {selectedItem?.data?.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {selectedItem.data.description}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeJoinModal}>Cancel</Button>
          <Button
            onClick={handleConfirmJoin}
            variant="contained"
            disabled={loading.joining}
          >
            {loading.joining ? <CircularProgress size={20} /> : 'Join'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreatorDashboardExample; 