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
      topDiamonds: null,
      topViews: null,
      topEngagement: null,
      topGrowth: null
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
                        {formatNumber(topPerformers.topDiamonds?.diamonds)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topDiamonds?.username}
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
                        {formatNumber(topPerformers.topViews?.totalViews)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topViews?.username}
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
                        {topPerformers.topEngagement?.engagementRate}%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topEngagement?.username}
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
                        {topPerformers.topGrowth?.monthlyGrowth}%
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {topPerformers.topGrowth?.username}
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
                  {/* The original topCreators array was removed, so this loop will not render anything */}
                  {/* This section will be empty or show a message if topCreators is not defined */}
                  {/* For now, we'll just show a placeholder message */}
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      No data available for the Top Creators Leaderboard.
                    </TableCell>
                  </TableRow>
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

