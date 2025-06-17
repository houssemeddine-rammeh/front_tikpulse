import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  Chip,
  Badge,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack,
  NotificationImportant,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Message as MessageIcon,
  MarkEmailRead as ReadIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const importantMessages = [
  { 
    id: '1', 
    title: 'New Match Opportunity', 
    content: 'There\'s a new match opportunity for you next weekend! You\'ve been invited to participate in a special event with potential brand partnerships. Please check your calendar and confirm your availability.',
    type: 'info',
    date: new Date(2024, 0, 15),
    read: false
  },
  { 
    id: '2', 
    title: 'Bonus Achieved', 
    content: 'Congratulations! You reached your monthly diamond goal and qualified for the Silver tier bonus. Your bonus has been calculated and will be paid at the end of the month.',
    type: 'success',
    date: new Date(2024, 0, 12),
    read: false
  },
  { 
    id: '3', 
    title: 'Contract Update', 
    content: 'Your contract has been reviewed and updated with new terms. Please review the updated contract terms in your profile section and confirm acceptance.',
    type: 'warning',
    date: new Date(2024, 0, 10),
    read: true
  },
  {
    id: '4',
    title: 'Payment Information Verified',
    content: 'Your PayPal payment information has been successfully verified and is now active for receiving bonus payments.',
    type: 'success',
    date: new Date(2024, 0, 8),
    read: true
  },
  {
    id: '5',
    title: 'Live Session Performance',
    content: 'Great job on your recent live sessions! You\'ve exceeded the minimum requirements for this month and are on track for the maximum bonus.',
    type: 'info',
    date: new Date(2024, 0, 5),
    read: false
  },
  {
    id: '6',
    title: 'Sponsorship Opportunity',
    content: 'A new sponsorship opportunity from Fashion Brand X is available. Check your analytics section for more details about the partnership terms.',
    type: 'info',
    date: new Date(2024, 0, 3),
    read: true
  }
];

const CreatorMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = () => {
      setLoading(true);
      setTimeout(() => {
        setMessages(importantMessages);
        setLoading(false);
      }, 500);
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckIcon sx={{ color: '#4caf50' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: '#ff9800' }} />;
      case 'error':
        return <WarningIcon sx={{ color: '#f44336' }} />;
      default:
        return <InfoIcon sx={{ color: '#2196f3' }} />;
    }
  };

  const getMessageColor = (type) => {
    switch (type) {
      case 'success':
        return '#e8f5e8';
      case 'warning':
        return '#fff3e0';
      case 'error':
        return '#ffebee';
      default:
        return '#e3f2fd';
    }
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Messages
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Stay updated with important notifications and messages
            </Typography>
          </Box>
          <Badge badgeContent={unreadCount} color="error">
            <MessageIcon sx={{ fontSize: 40, color: '#1976d2' }} />
          </Badge>
        </Box>

        {/* ========== NAVIGATION HUB ========== */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
            🏠 Quick Navigation
          </Typography>
          
          <Grid container spacing={3}>
            {/* Dashboard Link */}
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

            {/* Profile Link */}
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

            {/* Analytics Link */}
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                component={Link}
                to="/creator-analytics"
                sx={{ 
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: '#fff8f0',
                  border: '2px solid #ffe0b2',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.2)',
                    bgcolor: '#ffe0b2'
                  }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 1 }}>
                  <Typography variant="h4" sx={{ color: '#ff9800', mb: 1 }}>📈</Typography>
                  <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                    Analytics
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Events Link */}
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
        </Box>

        {/* ========== INCENTIVES SECTION ========== */}
        <Card sx={{ mb: 4, bgcolor: '#f1f8e9', border: '2px solid #c8e6c9' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              alignItems: 'center', 
              justifyContent: 'space-between',
              gap: 3
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold', mb: 2 }}>
                  💎 Diamond Bonus Program
                </Typography>
                <Typography variant="body1" sx={{ color: '#388e3c', lineHeight: 1.6, mb: 2 }}>
                  Maximize your earnings! Reach your monthly diamond goals and unlock bonus payments. 
                  The more diamonds you earn, the higher your tier and bonus percentage!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label="Bronze: 2% bonus" 
                    color="warning" 
                    variant="outlined" 
                  />
                  <Chip 
                    label="Silver: 4% bonus" 
                    color="default" 
                    variant="outlined" 
                  />
                  <Chip 
                    label="Gold: 6% bonus" 
                    color="warning" 
                    variant="filled" 
                  />
                </Box>
              </Box>
              <Box sx={{ 
                minWidth: 200, 
                textAlign: 'center',
                bgcolor: 'white',
                borderRadius: 2,
                p: 3,
                border: '1px solid #c8e6c9'
              }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#4caf50' }}>
                  🎯 Current Progress
                </Typography>
                <Typography variant="h3" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 1 }}>
                  85%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  towards Silver tier
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* ========== MOTIVATION SECTION ========== */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#4caf50' }}>
            ⭐ Keep Going! You're Doing Amazing! ⭐
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: '#fff3e0', border: '1px solid #ffcc02' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#f57c00', mb: 1 }}>🔥</Typography>
                  <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold' }}>
                    Consistency
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    You've been live for 18 days this month! Consistency is key to building a loyal audience and maximizing your diamond earnings.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: '#e8f5e8', border: '1px solid #c8e6c9' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#4caf50', mb: 1 }}>📈</Typography>
                  <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                    Growth
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    Your diamond earnings increased by 24% compared to last month. You're on the right track!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ bgcolor: '#fce4ec', border: '1px solid #f8bbd9' }}>
                <CardContent>
                  <Typography variant="h4" sx={{ color: '#e91e63', mb: 1 }}>🎯</Typography>
                  <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 'bold' }}>
                    Goal
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    Only 15% more to reach the Silver tier! Push through and unlock higher bonus rates.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* ========== TIPS SECTION ========== */}
        <Card sx={{ mb: 4, bgcolor: '#e3f2fd', border: '2px solid #90caf9' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', textAlign: 'center' }}>
              💡 Pro Tips for Success
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>🎥 Content Strategy</Typography>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                  • Go live during peak hours (7-10 PM) for maximum engagement<br/>
                  • Interact with your audience frequently - respond to comments<br/>
                  • Create themed content days (Music Monday, Fun Friday)<br/>
                  • Use trending hashtags and sounds
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>💎 Diamond Optimization</Typography>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                  • Encourage gifting through interactive games<br/>
                  • Thank supporters by name during streams<br/>
                  • Set daily diamond goals and share progress<br/>
                  • Collaborate with other creators for cross-promotion
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Messages Section */}
        <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          📬 Important Messages ({unreadCount} unread)
        </Typography>
        
        <Grid container spacing={3}>
          {messages.map((message) => (
            <Grid item xs={12} key={message.id}>
              <Card 
                sx={{ 
                  bgcolor: getMessageColor(message.type),
                  border: message.read ? '1px solid #e0e0e0' : '2px solid #1976d2',
                  opacity: message.read ? 0.8 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getMessageIcon(message.type)}
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {message.title}
                      </Typography>
                      {!message.read && (
                        <Chip size="small" label="NEW" color="primary" />
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {message.date.toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {message.content}
                  </Typography>
                  
                  {!message.read && (
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ReadIcon />}
                      onClick={() => handleMarkAsRead(message.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Mark as Read
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Back to Dashboard */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            component={Link}
            to="/dashboard-details"
            variant="contained"
            startIcon={<ArrowBack />}
            sx={{ 
              bgcolor: '#1976d2',
              '&:hover': { bgcolor: '#1565c0' },
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreatorMessagesPage; 

