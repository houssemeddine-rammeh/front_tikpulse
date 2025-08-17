import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
  IconButton,
  Fade,
  Slide,
  Zoom,
  keyframes,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  People as PeopleIcon,
  MonetizationOn as MonetizationOnIcon,
  Analytics,
  Campaign,
  Security,
  ArrowForward as ArrowForwardIcon,
  PlayArrow as PlayArrowIcon,
  Star,
  VideoCall,
  Speed as SpeedIcon,
  Shield as ShieldIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  AutoGraph as AutoGraphIcon,
  Rocket as RocketIcon,
  Language,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

// Icon for DASHTRACER (using a generic video icon as substitute)
const TikTokIcon = () => <VideoCall />;

// Animation keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideInFromLeft = keyframes`
  from { 
    opacity: 0;
    transform: translateX(-100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from { 
    opacity: 0;
    transform: translateX(100px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
`;

const LandingPage = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#FF0050' }} />,
      title: t('landingPage.features.aiAnalytics.title'),
      description: t('landingPage.features.aiAnalytics.description'),
      gradient: 'linear-gradient(135deg, #FF0050, #FF4081)',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: '#25F4EE' }} />,
      title: t('landingPage.features.creatorEcosystem.title'),
      description: t('landingPage.features.creatorEcosystem.description'),
      gradient: 'linear-gradient(135deg, #25F4EE, #00D9FF)',
    },
    {
      icon: <RocketIcon sx={{ fontSize: 40, color: '#FE2C55' }} />,
      title: t('landingPage.features.growthAcceleration.title'),
      description: t('landingPage.features.growthAcceleration.description'),
      gradient: 'linear-gradient(135deg, #FE2C55, #FF6B9D)',
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40, color: '#8B5CF6' }} />,
      title: t('landingPage.features.enterpriseSecurity.title'),
      description: t('landingPage.features.enterpriseSecurity.description'),
      gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: '#10B981' }} />,
      title: t('landingPage.features.campaignAutomation.title'),
      description: t('landingPage.features.campaignAutomation.description'),
      gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#F59E0B' }} />,
      title: t('landingPage.features.lightningFast.title'),
      description: t('landingPage.features.lightningFast.description'),
      gradient: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
    },
  ];

  const stats = [
    { value: '1.2M+', label: t('landingPage.stats.activeCreators'), icon: <PeopleIcon /> },
    { value: '50M+', label: t('landingPage.stats.contentViews'), icon: <TikTokIcon /> },
    { value: '$15M+', label: t('landingPage.stats.revenueGenerated'), icon: <MonetizationOnIcon /> },
    { value: '99.9%', label: t('landingPage.stats.uptime'), icon: <SpeedIcon /> },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Top DASHTRACER Creator • 2.3M Followers',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'DASHTRACER completely transformed my content strategy. My engagement rate jumped from 3% to 12% in just 6 weeks! The AI recommendations are incredibly accurate.',
      verified: true,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Agency CEO • 50+ Creators',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Managing 50+ creators was a nightmare before DASHTRACER. Now everything is automated and our revenue has increased by 340%. Best investment we ever made!',
      verified: true,
    },
    {
      name: 'Emma Williams',
      role: 'Brand Marketing Director',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'The campaign management tools are game-changing. We launched 25 successful campaigns last quarter with 10x better ROI than traditional platforms.',
      verified: true,
    },
  ];

  const handleGetStarted = () => {
    if (user) {
      // Redirect to appropriate dashboard based on role
      switch (user.role) {
        case 'creator':
          navigate('/creator/dashboard');
          break;
        case 'brand':
        case 'agency':
        case 'manager':
          navigate('/manager/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'super_admin':
          navigate('/superadmin/dashboard');
          break;
        default:
          navigate('/creator/dashboard'); // Default fallback
      }
    } else {
      navigate('/login');
    }
  };

  const handleWatchDemo = () => {
    // Navigate to demo or open modal
    console.log('Watch demo clicked');
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* DASHTRACER Logo - Fixed Top Left */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 0, sm: 12, md: 16, lg: 20 }, // Progressive responsive positioning
          left: { xs: 8, sm: 12, md: 16, lg: 20 }, // Progressive responsive positioning
          zIndex: 9999, // High z-index to stay above everything
          width: { xs: 90, sm: 110, md: 140, lg: 160, xl: 180 }, // Progressive sizing
          height: 'auto',
          maxWidth: { xs: '20vw', sm: '22vw', md: '25vw' }, // Responsive max width
          minWidth: { xs: '80px', sm: '100px' }, // Minimum size for readability
        }}
      >
        <img
          src="/Dashly2.png"
          alt="DASHTRACER"
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
            cursor: 'pointer',
            display: 'block',
            objectFit: 'contain', // Ensure proper scaling
          }}
          onClick={() => navigate('/')}
        />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF0050, #25F4EE)',
            opacity: 0.1,
            animation: `${float} 6s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FE2C55, #8B5CF6)',
            opacity: 0.08,
            animation: `${float} 8s ease-in-out infinite reverse`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25F4EE, #FF0050)',
            opacity: 0.05,
            animation: `${pulse} 10s ease-in-out infinite`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box sx={{ animation: `${slideInFromLeft} 1s ease-out` }}>
                  <Chip
                    label={t('landingPage.hero.chip')}
                    sx={{
                      mb: 3,
                      bgcolor: 'rgba(255, 0, 80, 0.1)',
                      color: '#FF0050',
                      border: '1px solid rgba(255, 0, 80, 0.3)',
                      fontWeight: 'bold',
                    }}
                  />
                  <Typography
                    variant={isMobile ? 'h3' : 'h1'}
                    component="h1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                      background: 'linear-gradient(135deg, #FFFFFF, #FF0050, #25F4EE)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                      lineHeight: 1.1,
                    }}
                  >
                    {t('landingPage.hero.title')}
                    <br />
                      {t('landingPage.hero.titleHighlight')}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontWeight: 400,
                      color: '#E2E8F0',
                      lineHeight: 1.6,
                      maxWidth: '500px',
                    }}
                  >
                    {t('landingPage.hero.subtitle')}
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGetStarted}
                      sx={{
                        background: 'linear-gradient(135deg, #FF0050, #FE2C55)',
                        color: 'white',
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: 3,
                        textTransform: 'none',
                        boxShadow: '0 8px 32px rgba(255, 0, 80, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E6004A, #E8284F)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(255, 0, 80, 0.5)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      endIcon={<ArrowForwardIcon />}
                    >
                      {user ? t('landingPage.hero.goToDashboard') : t('landingPage.hero.startFreeTrial')}
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleWatchDemo}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        borderRadius: 3,
                        textTransform: 'none',
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                          borderColor: '#25F4EE',
                          backgroundColor: 'rgba(37, 244, 238, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      startIcon={<PlayArrowIcon />}
                    >
                      {t('landingPage.hero.watchDemo')}
                    </Button>
                  </Stack>
                  
                  {/* Language Selector */}
                  <Box sx={{ mb: 6, maxWidth: '300px' }}>
                    <FormControl fullWidth size="small">
                      <InputLabel id="language-select-label" sx={{ display: "flex", alignItems: "center", color: 'rgba(255, 255, 255, 0.8)' }}>
                        <Language sx={{ mr: 1, fontSize: 18 }} />
                        {t('landingPage.hero.languageSelector')}
                      </InputLabel>
                      <Select
                        labelId="language-select-label"
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        label={t('landingPage.hero.languageSelector')}
                        sx={{
                          borderRadius: 2,
                          "& .MuiSelect-select": {
                            display: "flex",
                            alignItems: "center",
                            color: 'white',
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: '#25F4EE',
                          },
                          "& .MuiSvgIcon-root": {
                            color: 'white',
                          }
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: 'rgba(15, 15, 35, 0.95)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }
                          }
                        }}
                      >
                        <MenuItem value="en" sx={{ display: "flex", alignItems: "center", color: 'white' }}>
                          <Box component="span" sx={{ fontSize: "1.2rem", mr: 2 }}>🇺🇸</Box>
                          English
                        </MenuItem>
                        <MenuItem value="fr" sx={{ display: "flex", alignItems: "center", color: 'white' }}>
                          <Box component="span" sx={{ fontSize: "1.2rem", mr: 2 }}>🇫🇷</Box>
                          Français
                        </MenuItem>
                        <MenuItem value="ar" sx={{ display: "flex", alignItems: "center", color: 'white' }}>
                          <Box component="span" sx={{ fontSize: "1.2rem", mr: 2 }}>🇸🇦</Box>
                          العربية
                        </MenuItem>
                        <MenuItem value="it" sx={{ display: "flex", alignItems: "center", color: 'white' }}>
                          <Box component="span" sx={{ fontSize: "1.2rem", mr: 2 }}>🇮🇹</Box>
                          Italiano
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  
                  <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Zoom in={isVisible} timeout={1500 + index * 200}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF0050', mb: 1 }}>
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                              {stat.label}
                            </Typography>
                          </Box>
                        </Zoom>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Fade in={isVisible} timeout={1200}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    animation: `${slideInFromRight} 1s ease-out`,
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '100%', md: '500px' },
                      height: { xs: '300px', md: '400px' },
                      background: 'linear-gradient(135deg, rgba(255, 0, 80, 0.1), rgba(37, 244, 238, 0.1))',
                      borderRadius: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white', textAlign: 'center' }}>
                    {t('landingPage.dashboardPreview')}
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 3, color: '#1a202c' }}>
              {t('landingPage.features.title')}
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', maxWidth: '600px', mx: 'auto' }}>
              {t('landingPage.features.subtitle')}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1a202c' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            {t('landingPage.cta.title')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            {t('landingPage.cta.subtitle')}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                background: 'linear-gradient(135deg, #FF0050, #FE2C55)',
                color: 'white',
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(255, 0, 80, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E6004A, #E8284F)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(255, 0, 80, 0.5)',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              {user ? t('landingPage.hero.goToDashboard') : t('landingPage.cta.startYourFreeTrial')}
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 

