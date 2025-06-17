import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  People as FollowingIcon,
  VideoLibrary as VideosIcon,
  Group as FollowersIcon,
  Favorite as LikesIcon,
  Visibility as ViewsIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Diamond as DiamondIcon,
  MonetizationOn as MoneyIcon,
  AccountBalance as BankIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../components/LoadingScreen';
import Layout from "../components/layout/Layout";

const CreatorProfilePage = () => {
  const { user } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Mock profile data - in real app, this would come from API
  const [profileData, setProfileData] = useState({
    creatorId: '123-4567',
    displayName: 'Sarah Johnson',
    username: '@sarahjohnson_official',
    email: 'creator@tikpulse.com',
    avatar: '/api/placeholder/150/150',
    bio: 'Content creator passionate about lifestyle, fashion, and travel. Inspiring others to live their best life! ✨',
    category: 'Lifestyle',
    phone: '+33 6 12 34 56 78',
    joinDate: 'Jan 2024',
    following: '1.2K',
    videos: '234',
    followers: '850K',
    likes: '15.6M',
    views: '89.4M',
    // Contract Details
    contractStart: 'January 15, 2024',
    contractDuration: '12 months',
    daysWithAgency: '145',
    diamondsCollected: '75,800',
    // Payment Details
    bankAccount: 'FR76 3000 4000 0100 0000 1234 567',
    paypalAccount: 'creator@tikpulse.com'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEditClick = () => {
    setEditData(profileData);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setEditDialogOpen(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setEditDialogOpen(false);
  };

  const StatItem = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - Profile Info */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                borderRadius: 3,
                overflow: 'visible',
                position: 'relative'
              }}
            >
              {/* Edit Button */}
              <IconButton
                onClick={handleEditClick}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': {
                    bgcolor: 'grey.100'
                  }
                }}
              >
                <EditIcon />
              </IconButton>

              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                {/* Profile Picture */}
                <Avatar
                  src={profileData.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>

                {/* Profile Header */}
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {profileData.displayName}
                </Typography>
                
                {/* Creator ID */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    fontFamily: 'monospace',
                    bgcolor: '#f5f5f5',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    display: 'inline-block',
                    fontWeight: 'bold',
                    color: 'primary.main'
                  }}
                >
                  ID: {profileData.creatorId}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    {profileData.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">•</Typography>
                  <Chip 
                    label={profileData.category} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      fontWeight: 'bold'
                    }} 
                  />
                </Box>

                {/* Bio */}
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {profileData.bio}
                </Typography>

                {/* Stats */}
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <StatItem 
                      icon={<CalendarIcon fontSize="small" />}
                      label="Joined"
                      value={profileData.joinDate}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatItem 
                      icon={<FollowingIcon fontSize="small" />}
                      label="Following"
                      value={profileData.following}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatItem 
                      icon={<VideosIcon fontSize="small" />}
                      label="Videos"
                      value={profileData.videos}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatItem 
                      icon={<FollowersIcon fontSize="small" />}
                      label="Followers"
                      value={profileData.followers}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatItem 
                      icon={<LikesIcon fontSize="small" />}
                      label="Likes"
                      value={profileData.likes}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <StatItem 
                      icon={<ViewsIcon fontSize="small" />}
                      label="Views"
                      value={profileData.views}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StatItem 
                      icon={<PhoneIcon fontSize="small" />}
                      label="Phone"
                      value={profileData.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StatItem 
                      icon={<EmailIcon fontSize="small" />}
                      label="Email"
                      value={profileData.email}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Contract & Payment Details */}
          <Grid item xs={12} md={8}>
            {/* Contract Details */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Contract Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CalendarIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Contract Start
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.contractStart}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'success.main', 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <WorkIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.contractDuration}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'info.main', 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CalendarIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Days with Agency
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.daysWithAgency} days
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'warning.main', 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <DiamondIcon />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Diamonds Collected
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.diamondsCollected}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Details */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Payment Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'secondary.main', 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <BankIcon />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Bank Account
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'monospace' }}>
                        {profileData.bankAccount}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MoneyIcon />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        PayPal Account
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.paypalAccount}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleCancel} maxWidth="md" fullWidth>
          <DialogTitle>
            <Typography variant="h5" fontWeight="bold">
              Edit Profile
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Display Name"
                  value={editData.displayName}
                  onChange={(e) => setEditData({ ...editData, displayName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Bio"
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bank Account"
                  value={editData.bankAccount}
                  onChange={(e) => setEditData({ ...editData, bankAccount: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="PayPal Account"
                  value={editData.paypalAccount}
                  onChange={(e) => setEditData({ ...editData, paypalAccount: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button
              onClick={handleCancel}
              variant="outlined"
              startIcon={<CancelIcon />}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ textTransform: 'none' }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default CreatorProfilePage; 

