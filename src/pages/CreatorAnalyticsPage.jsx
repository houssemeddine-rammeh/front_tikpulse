import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  ArrowBack,
  Diamond,
  TrendingUp,
  AttachMoney,
  People,
  Videocam,
  Visibility,
  ThumbUp,
  CalendarToday,
  Star
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Agency bonus calculation rules
const agencyBonusRules = {
  bronze: { minValidDays: 15, minHours: 30, rate: 0.03, baseBonus: 200 },
  silver: { minValidDays: 20, minHours: 50, rate: 0.04, baseBonus: 400 },
  gold: { minValidDays: 25, minHours: 70, rate: 0.05, baseBonus: 600 },
  platinum: { minValidDays: 30, minHours: 100, rate: 0.06, baseBonus: 800 }
};

const CreatorAnalyticsPage = () => {
  const { user } = useAuth();
  const [creator, setCreator] = useState(null);
  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agencyBonus, setAgencyBonus] = useState({ amount: 0, tier: 'none', qualified: false });
  const [sponsorshipEarnings, setSponsorshipEarnings] = useState({ total: 0, count: 0, sponsorships: [] });
  const [totalBonus, setTotalBonus] = useState(0);

  // Bonus calculation functions
  const calculateAgencyBonus = (creator) => {
    if (!creator) return { amount: 0, tier: 'none', qualified: false };

    const validDays = creator.validLiveDays || 0;
    const hours = creator.liveDuration || 0;
    const diamonds = creator.diamondsLastMonth || 0;
    const tier = creator.contractDetails?.tier?.toLowerCase() || 'bronze';

    const rules = agencyBonusRules[tier] || agencyBonusRules.bronze;
    
    const meetsRequirements = validDays >= rules.minValidDays && hours >= rules.minHours;
    
    if (!meetsRequirements) {
      return { amount: 0, tier, qualified: false, requirements: rules };
    }

    // Calculate bonus: base bonus + percentage of diamonds
    const diamondBonus = diamonds * rules.rate;
    const totalAgencyBonus = rules.baseBonus + diamondBonus;

    return { 
      amount: Math.round(totalAgencyBonus), 
      tier, 
      qualified: true, 
      requirements: rules,
      breakdown: {
        baseBonus: rules.baseBonus,
        diamondBonus: Math.round(diamondBonus),
        diamonds: diamonds
      }
    };
  };

  const calculateSponsorshipEarnings = () => {
    const activeSponsorships = sponsorships.filter(s => s.status === 'active');
    const totalSponsorshipAmount = activeSponsorships.reduce((total, sponsor) => total + sponsor.amount, 0);
    
    return {
      total: totalSponsorshipAmount,
      count: activeSponsorships.length,
      sponsorships: activeSponsorships
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [creatorResponse, sponsorshipsResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE_URL}/creators/${user?.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/creators/${user?.id}/sponsorships`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (creatorResponse.ok) {
          const creatorData = await creatorResponse.json();
          setCreator(creatorData);
        }

        if (sponsorshipsResponse.ok) {
          const sponsorshipsData = await sponsorshipsResponse.json();
          setSponsorships(sponsorshipsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCreator(null);
        setSponsorships([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (!creator) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Creator data not found
          </Typography>
        </Box>
      </Container>
    );
  }

  const completionPercentage = Math.min((creator.diamondsLastMonth / creator.contractDetails.monthlyDiamondGoal) * 100, 100);

  const activeSponsorships = sponsorships.filter(s => s.status === 'active');

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Analytics & Earnings
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Detailed performance metrics and bonus calculations for {creator.username}
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/dashboard-details"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{ textTransform: 'none' }}
          >
            Back to Dashboard
          </Button>
        </Box>

        {/* Quick Navigation */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              component={Link}
              to="/dashboard-details"
              sx={{ 
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f8faff',
                border: '2px solid #e3f2fd',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                    bgcolor: '#e3f2fd'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 1 }}>
                  <Typography variant="h4" sx={{ color: '#1976d2', mb: 1 }}>📊</Typography>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    Dashboard
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card 
                component={Link}
                to="/creator-profile"
                sx={{ 
                height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#faf4ff',
                  border: '2px solid #f3e5f5',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.2)',
                    bgcolor: '#f3e5f5'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 1 }}>
                  <Typography variant="h4" sx={{ color: '#9c27b0', mb: 1 }}>👤</Typography>
                  <Typography variant="h6" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                    Profile
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card 
                component={Link}
                to="/creator-messages"
                sx={{ 
                height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#f1f8e9',
                  border: '2px solid #c8e6c9',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                    bgcolor: '#c8e6c9'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 1 }}>
                  <Typography variant="h4" sx={{ color: '#4caf50', mb: 1 }}>📬</Typography>
                  <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    Messages
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              component={Link}
              to="/events"
              sx={{ 
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#fff4e6',
                border: '2px solid #ffcc02',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(255, 204, 2, 0.2)',
                  bgcolor: '#ffe4a3'
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 1 }}>
                <Typography variant="h4" sx={{ color: '#f57c00', mb: 1 }}>🎉</Typography>
                <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                  Events
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Performance Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Diamond sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {creator.diamonds.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">Total Diamonds</Typography>
                <Typography variant="caption" sx={{ color: '#4caf50', mt: 1 }}>
                  +{creator.diamondsLastMonth.toLocaleString()} this month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', bgcolor: '#f3e5f5' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <People sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                  {(creator.followers / 1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">Followers</Typography>
                <Typography variant="caption" sx={{ color: '#4caf50', mt: 1 }}>
                  +{creator.newFollowersLastMonth.toLocaleString()} this month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', bgcolor: '#e8f5e8' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Visibility sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                  {(creator.views / 1000000).toFixed(1)}M
                </Typography>
                <Typography variant="body2" color="text.secondary">Total Views</Typography>
                <Typography variant="caption" sx={{ color: '#4caf50', mt: 1 }}>
                  {creator.videos} videos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', bgcolor: '#fff3e0' }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <AttachMoney sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                  €{totalBonus}
                </Typography>
                <Typography variant="body2" color="text.secondary">Total Bonus</Typography>
                <Typography variant="caption" sx={{ color: '#4caf50', mt: 1 }}>
                  This month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Monthly Goal Progress */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              💎 Monthly Diamond Goal Progress
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {creator.diamondsLastMonth.toLocaleString()} / {creator.contractDetails.monthlyDiamondGoal.toLocaleString()} diamonds
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={completionPercentage} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6,
                    bgcolor: '#f5f5f5',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: completionPercentage >= 100 ? '#4caf50' : '#1976d2'
                    }
                  }} 
                />
                <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                  {completionPercentage.toFixed(1)}% completed
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Chip 
                    label={completionPercentage >= 100 ? 'Goal Achieved!' : `${(100 - completionPercentage).toFixed(1)}% remaining`}
                    color={completionPercentage >= 100 ? 'success' : 'primary'}
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {creator.contractDetails.tier} Tier • {(creator.contractDetails.rate * 100).toFixed(2)}% rate
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Bonus Breakdown */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  🏢 Agency Bonus
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    €{agencyBonus.amount}
                  </Typography>
                  <Chip 
                    label={agencyBonus.qualified ? 'Qualified' : 'Not Qualified'} 
                    color={agencyBonus.qualified ? 'success' : 'error'} 
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Requirements:</strong>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Valid Days: {creator.validLiveDays}/{agencyBonus.requirements?.minValidDays || 20}
                    </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • Live Hours: {creator.liveDuration}h/{agencyBonus.requirements?.minHours || 50}h
                    </Typography>
                    <Typography variant="body2">
                  • Tier: {creator.contractDetails.tier}
                    </Typography>
              </CardContent>
            </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  🤝 Sponsorship Earnings
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    €{sponsorshipEarnings.total}
                  </Typography>
                  <Chip 
                    label={`${sponsorshipEarnings.count} Active`} 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Active Sponsorships:</strong>
                </Typography>
                {sponsorshipEarnings.sponsorships.slice(0, 3).map((sponsor, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {sponsor.brand}: €{sponsor.amount}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Live Session Analytics */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              📹 Live Session Performance
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#fce4ec', borderRadius: 1 }}>
                  <Videocam sx={{ fontSize: 40, color: '#e91e63', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#e91e63', fontWeight: 'bold' }}>
                    {creator.validLiveDays}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Valid Live Days</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f3e5f5', borderRadius: 1 }}>
                  <CalendarToday sx={{ fontSize: 40, color: '#9c27b0', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                    {creator.liveDuration}h
                    </Typography>
                  <Typography variant="body2" color="text.secondary">Total Duration</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#e8f5e8', borderRadius: 1 }}>
                  <ThumbUp sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    {(creator.likes / 1000000).toFixed(1)}M
                    </Typography>
                  <Typography variant="body2" color="text.secondary">Total Likes</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
                  <Star sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
                  <Typography variant="h5" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                    {(creator.liveDuration / creator.validLiveDays).toFixed(1)}h
                    </Typography>
                  <Typography variant="body2" color="text.secondary">Avg per Day</Typography>
                  </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Sponsorship Details Table */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
              📋 Sponsorship Details
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table sx={{ minWidth: 650 }} aria-label="sponsorship table">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Brand</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeSponsorships.map((sponsorship) => (
                    <TableRow key={sponsorship.id}>
                      <TableCell component="th" scope="row">
                        {sponsorship.brand}
                      </TableCell>
                      <TableCell>€{sponsorship.amount}</TableCell>
                      <TableCell>
                        <Chip 
                          label={sponsorship.status} 
                          color={sponsorship.status === 'active' ? 'success' : 'warning'} 
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{sponsorship.endDate.toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CreatorAnalyticsPage; 

