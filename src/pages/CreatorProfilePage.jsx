import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
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
  Work as WorkIcon,
  Diamond as DiamondIcon,
  MonetizationOn as MoneyIcon,
  AccountBalance as BankIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../features/authSlice';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/LoadingScreen';

const CreatorProfilePage = () => {
  const { id: tikTokId } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.auth);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (tikTokId) {
      dispatch(getProfile(tikTokId));
    }
  }, [tikTokId, dispatch]);

  useEffect(() => {
    if (profile) {
      setEditData({
        displayName: `${profile?.firstName} ${profile.lastName}`,
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar,
        bio: profile.bio,
        category: profile.category,
        phone: profile.phone,
        joinDate: new Date(profile.joinDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        following: profile.profile?.following || '0',
        videos: profile.profile?.videos || '0',
        followers: profile.profile?.followers || '0',
        likes: profile.profile?.likes || '0',
        views: profile.profile?.views || '0',
        contractStart: profile.joinDate
          ? new Date(profile.joinDate).toLocaleDateString()
          : 'N/A',
        contractDuration: '12 months',
        daysWithAgency: profile.profile?.daysSinceJoining || 0,
        diamondsCollected: profile.profile?.diamonds || 0,
        bankAccount: profile.rib || 'N/A',
        paypalAccount: profile.email || 'N/A',
        creatorId: profile._id,
      });
    }
  }, [profile]);

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

  if (loading) return <LoadingScreen />;
  if (error || !editData) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h4" align="center" color="error" fontWeight="bold">
            Not Found!
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, overflow: 'visible', position: 'relative' }}>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': { bgcolor: 'grey.100' },
                }}
              >
                <EditIcon />
              </IconButton>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  src={editData.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {editData?.displayName || editData?.username || 'Unknown User'}
                </Typography>
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
                    color: 'primary.main',
                  }}
                >
                  ID: {editData.creatorId}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    {editData.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                  <Chip
                    label={editData.category}
                    size="small"
                    sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}
                  />
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {editData.bio}
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}><StatItem icon={<CalendarIcon fontSize="small" />} label="Joined" value={editData.joinDate} /></Grid>
                  <Grid item xs={6}><StatItem icon={<FollowingIcon fontSize="small" />} label="Following" value={editData.following} /></Grid>
                  <Grid item xs={6}><StatItem icon={<VideosIcon fontSize="small" />} label="Videos" value={editData.videos} /></Grid>
                  <Grid item xs={6}><StatItem icon={<FollowersIcon fontSize="small" />} label="Followers" value={editData.followers} /></Grid>
                  <Grid item xs={6}><StatItem icon={<LikesIcon fontSize="small" />} label="Likes" value={editData.likes} /></Grid>
                  <Grid item xs={6}><StatItem icon={<ViewsIcon fontSize="small" />} label="Views" value={editData.views} /></Grid>
                  <Grid item xs={12}><StatItem icon={<PhoneIcon fontSize="small" />} label="Phone" value={editData.phone} /></Grid>
                  <Grid item xs={12}><StatItem icon={<EmailIcon fontSize="small" />} label="Email" value={editData.email} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Contract Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}><StatItem icon={<CalendarIcon />} label="Contract Start" value={editData.contractStart} /></Grid>
                <Grid item xs={12} sm={6}><StatItem icon={<WorkIcon />} label="Duration" value={editData.contractDuration} /></Grid>
                <Grid item xs={12} sm={6}><StatItem icon={<CalendarIcon />} label="Days with Agency" value={`${editData.daysWithAgency} days`} /></Grid>
                <Grid item xs={12} sm={6}><StatItem icon={<DiamondIcon />} label="Diamonds Collected" value={editData.diamondsCollected} /></Grid>
              </Grid>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Payment Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}><StatItem icon={<BankIcon />} label="Bank Account" value={editData.bankAccount} /></Grid>
                <Grid item xs={12}><StatItem icon={<MoneyIcon />} label="PayPal Account" value={editData.paypalAccount} /></Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CreatorProfilePage;
