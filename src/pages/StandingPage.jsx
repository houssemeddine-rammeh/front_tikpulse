import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Tooltip,
  Button,
  Tab,
  Tabs,
  Badge,
  Divider
} from '@mui/material';
import {
  NavigateNext,
  Dashboard,
  EmojiEvents,
  Diamond,
  Visibility,
  Favorite,
  PlayArrow,
  TrendingUp,
  Star,
  WorkspacePremium,
  LocalFireDepartment,
  Speed,
  Group,
  VideoLibrary
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Layout from "../components/layout/Layout";

const topCreators = [
  {
    id: 1,
    username: '@sarah_creative',
    fullName: 'Sarah Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff',
    rank: 1,
    previousRank: 2,
    diamonds: 125500,
    totalViews: 2450000,
    totalLikes: 485000,
    videosPosted: 45,
    followers: 125000,
    engagementRate: 12.8,
    monthlyGrowth: 24.5,
    level: 'Diamond',
    isVerified: true,
    specialBadge: 'Top Performer',
    joinDate: '2023-01-15',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    username: '@mike_adventures',
    fullName: 'Mike Chen',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=ec4899&color=fff',
    rank: 2,
    previousRank: 3,
    diamonds: 112800,
    totalViews: 2150000,
    totalLikes: 425000,
    videosPosted: 38,
    followers: 98000,
    engagementRate: 15.2,
    monthlyGrowth: 31.2,
    level: 'Platinum',
    isVerified: true,
    specialBadge: 'Rising Star',
    joinDate: '2023-02-20',
    lastActive: '1 hour ago'
  },
  {
    id: 3,
    username: '@emma_lifestyle',
    fullName: 'Emma Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Rodriguez&background=10b981&color=fff',
    rank: 3,
    previousRank: 1,
    diamonds: 98750,
    totalViews: 1890000,
    totalLikes: 376000,
    videosPosted: 52,
    followers: 87500,
    engagementRate: 13.9,
    monthlyGrowth: 18.7,
    level: 'Platinum',
    isVerified: true,
    joinDate: '2023-01-08',
    lastActive: '30 minutes ago'
  },
  {
    id: 4,
    username: '@alex_tech',
    fullName: 'Alex Thompson',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Thompson&background=f59e0b&color=fff',
    rank: 4,
    previousRank: 5,
    diamonds: 87200,
    totalViews: 1650000,
    totalLikes: 298000,
    videosPosted: 41,
    followers: 76500,
    engagementRate: 14.6,
    monthlyGrowth: 22.1,
    level: 'Gold',
    isVerified: true,
    joinDate: '2023-03-12',
    lastActive: '4 hours ago'
  },
  {
    id: 5,
    username: '@lisa_fashion',
    fullName: 'Lisa Wang',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=db2777&color=fff',
    rank: 5,
    previousRank: 6,
    diamonds: 79600,
    totalViews: 1425000,
    totalLikes: 287000,
    videosPosted: 33,
    followers: 69800,
    engagementRate: 16.1,
    monthlyGrowth: 28.4,
    level: 'Gold',
    isVerified: true,
    specialBadge: 'Content Creator',
    joinDate: '2023-04-01',
    lastActive: '6 hours ago'
  },
  {
    id: 6,
    username: '@david_fitness',
    fullName: 'David Miller',
    avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=dc2626&color=fff',
    rank: 6,
    previousRank: 4,
    diamonds: 72150,
    totalViews: 1320000,
    totalLikes: 245000,
    videosPosted: 47,
    followers: 62500,
    engagementRate: 13.4,
    monthlyGrowth: 15.8,
    level: 'Gold',
    isVerified: true,
    joinDate: '2023-02-28',
    lastActive: '1 day ago'
  },
  {
    id: 7,
    username: '@anna_cooking',
    fullName: 'Anna Clarke',
    avatar: 'https://ui-avatars.com/api/?name=Anna+Clarke&background=374151&color=fff',
    rank: 7,
    previousRank: 8,
    diamonds: 65400,
    totalViews: 1150000,
    totalLikes: 198000,
    videosPosted: 29,
    followers: 54200,
    engagementRate: 12.1,
    monthlyGrowth: 19.3,
    level: 'Silver',
    isVerified: true,
    joinDate: '2023-03-22',
    lastActive: '8 hours ago'
  },
  {
    id: 8,
    username: '@ryan_music',
    fullName: 'Ryan Kim',
    avatar: 'https://ui-avatars.com/api/?name=Ryan+Kim&background=059669&color=fff',
    rank: 8,
    previousRank: 9,
    diamonds: 58750,
    totalViews: 985000,
    totalLikes: 176000,
    videosPosted: 35,
    followers: 48900,
    engagementRate: 14.8,
    monthlyGrowth: 25.7,
    level: 'Silver',
    isVerified: false,
    specialBadge: 'Trending Creator',
    joinDate: '2023-04-15',
    lastActive: '3 hours ago'
  }
];

const StandingPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Diamond': return '#6366f1';
      case 'Platinum': return '#64748b';
      case 'Gold': return '#f59e0b';
      case 'Silver': return '#94a3b8';
      default: return '#6b7280';
    }
  };

  const getRankChange = (rank, previousRank) => {
    if (rank < previousRank) {
      return { direction: 'up', change: previousRank - rank, color: '#10b981' };
    } else if (rank > previousRank) {
      return { direction: 'down', change: rank - previousRank, color: '#ef4444' };
    }
    return { direction: 'same', change: 0, color: '#6b7280' };
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getTopPerformers = () => {
    return {
      topDiamonds: topCreators.sort((a, b) => b.diamonds - a.diamonds)[0],
      topViews: topCreators.sort((a, b) => b.totalViews - a.totalViews)[0],
      topEngagement: topCreators.sort((a, b) => b.engagementRate - a.engagementRate)[0],
      topGrowth: topCreators.sort((a, b) => b.monthlyGrowth - a.monthlyGrowth)[0]
    };
  };

  const topPerformers = getTopPerformers();

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
            <Link component={RouterLink} to="/dashboard" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
              <Dashboard sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Typography color="text.primary">Creator Standing</Typography>
          </Breadcrumbs>

          {/* Header */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 2,
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  🏆 Creator Standing & Leaderboard
                </Typography>
                <Typography variant="body1">
                  Rankings based on diamonds earned, engagement rates, and overall performance metrics.
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<TrendingUp />}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                }}
              >
                View Analytics
              </Button>
            </Box>
          </Paper>

          {/* Top Performers Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderLeft: '4px solid #6366f1', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Top Diamonds
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {formatNumber(topPerformers.topDiamonds.diamonds)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topDiamonds.username}
                      </Typography>
                    </Box>
                    <Diamond sx={{ fontSize: 24, color: '#6366f1' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderLeft: '4px solid #10b981', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Top Views
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {formatNumber(topPerformers.topViews.totalViews)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topViews.username}
                      </Typography>
                    </Box>
                    <Visibility sx={{ fontSize: 24, color: '#10b981' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderLeft: '4px solid #f59e0b', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Top Engagement
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {topPerformers.topEngagement.engagementRate}%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topEngagement.username}
                      </Typography>
                    </Box>
                    <Favorite sx={{ fontSize: 24, color: '#f59e0b' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ borderLeft: '4px solid #ec4899', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        Top Growth
                      </Typography>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {topPerformers.topGrowth.monthlyGrowth}%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topGrowth.username}
                      </Typography>
                    </Box>
                    <TrendingUp sx={{ fontSize: 24, color: '#ec4899' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs for different views */}
          <Paper elevation={2} sx={{ borderRadius: 2, mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ 
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600
                }
              }}
            >
              <Tab label="Overall Ranking" icon={<Star />} iconPosition="start" />
              <Tab label="This Month" icon={<Speed />} iconPosition="start" />
              <Tab label="Rising Stars" icon={<Star />} iconPosition="start" />
            </Tabs>
          </Paper>

          {/* Top Creators Leaderboard */}
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <Box sx={{ p: 4, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star />
                Top Creators Leaderboard
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Based on overall performance, engagement, and diamond earnings
              </Typography>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8fafc' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Creator</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Level</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Diamonds</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Views</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Engagement</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Growth</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topCreators.map((creator, index) => {
                    const rankChange = getRankChange(creator.rank, creator.previousRank);
                    const performanceScore = (creator.engagementRate + creator.monthlyGrowth) / 2;
                    
                    return (
                      <TableRow 
                        key={creator.id} 
                        hover 
                        sx={{ 
                          '&:hover': { bgcolor: '#f8fafc' },
                          borderLeft: index < 3 ? `4px solid ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'}` : 'none'
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: index < 3 ? (index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32') : 'transparent',
                              color: index < 3 ? 'white' : 'inherit',
                              fontWeight: 'bold'
                            }}>
                              {index < 3 ? (
                                <Star sx={{ fontSize: 16 }} />
                              ) : (
                                creator.rank
                              )}
                            </Box>
                            {rankChange.direction !== 'same' && (
                              <Chip
                                size="small"
                                label={`${rankChange.direction === 'up' ? '↑' : '↓'}`}
                                sx={{ 
                                  ml: 1,
                                  bgcolor: rankChange.color,
                                  color: 'white'
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              badgeContent={
                                creator.isVerified ? (
                                  <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: 'white',
                                    border: '1px solid rgba(0,0,0,0.2)'
                                  }} />
                                ) : null
                              }
                            >
                              <Avatar 
                                src={creator.avatar} 
                                alt={creator.fullName}
                                sx={{ width: 40, height: 40 }}
                              />
                            </Badge>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {creator.fullName}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {creator.username}
                              </Typography>
                              {creator.specialBadge && (
                                <Chip 
                                  label={creator.specialBadge}
                                  size="small"
                                  sx={{ 
                                    ml: 1,
                                    bgcolor: getLevelColor(creator.level),
                                    color: 'white'
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={creator.level}
                            size="small"
                            sx={{ 
                              bgcolor: getLevelColor(creator.level),
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Diamond sx={{ fontSize: 16, color: '#6366f1' }} />
                            <Typography variant="body2" fontWeight="medium">
                              {formatNumber(creator.diamonds)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {formatNumber(creator.totalViews)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {creator.videosPosted} videos
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {creator.engagementRate}%
                            </Typography>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min(creator.engagementRate * 5, 100)} 
                              sx={{ 
                                mt: 0.5,
                                height: 10,
                                borderRadius: 5,
                                bgcolor: 'rgba(0,0,0,0.1)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: '#10b981'
                                }
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUp 
                              sx={{ 
                                fontSize: 16, 
                                color: creator.monthlyGrowth > 20 ? '#10b981' : '#f59e0b' 
                              }} />
                            <Typography 
                              variant="body2" 
                              fontWeight="medium"
                              sx={{ 
                                color: creator.monthlyGrowth > 20 ? '#10b981' : '#f59e0b'
                              }}
                            >
                              +{creator.monthlyGrowth}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.min(performanceScore * 3, 100)} 
                              sx={{ 
                                height: 10,
                                borderRadius: 5,
                                bgcolor: 'rgba(0,0,0,0.1)',
                                '& .MuiLinearProgress-bar': {
                                  bgcolor: performanceScore > 20 ? '#10b981' : performanceScore > 15 ? '#f59e0b' : '#ef4444'
                                }
                              }}
                            />
                            <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                              Score: {performanceScore.toFixed(1)}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
};

export default StandingPage; 

