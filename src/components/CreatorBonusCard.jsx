import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Alert,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { 
  Star as StarIcon,
  Diamond as DiamondIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { fetchCreatorBonus, selectCreatorBonus, selectBonusLoading, selectBonusErrors } from '../features/bonusSlice';

const CreatorBonusCard = ({ tikTokId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bonus = useSelector(selectCreatorBonus);
  const loading = useSelector(selectBonusLoading);
  const error = useSelector(selectBonusErrors);

  useEffect(() => {
    if (tikTokId) {
      dispatch(fetchCreatorBonus(tikTokId));
    }
  }, [dispatch, tikTokId]);

  const getProgramColor = (program) => {
    switch (program) {
      case 'Platinum': return 'primary';
      case 'Gold': return 'warning';
      case 'Silver': return 'default';
      case 'Bronze': return 'secondary';
      default: return 'default';
    }
  };

  const getProgramIcon = (program) => {
    switch (program) {
      case 'Platinum': return <StarIcon color="primary" />;
      case 'Gold': return <StarIcon color="warning" />;
      case 'Silver': return <StarIcon color="default" />;
      case 'Bronze': return <StarIcon color="secondary" />;
      default: return <TrendingUpIcon />;
    }
  };

  if (loading.creator) {
    return (
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
          <Box mt={2}>
            <Skeleton variant="rectangular" height={200} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error.creator) {
    return (
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardContent>
          <Alert severity="error">{error.creator}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!bonus) {
    return (
      <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {t('creatorBonusCard.noDataAvailable')}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FFD700, #FF6B35, #4ECDC4, #45B7D1)',
          zIndex: 1
        }
      }}
    >
      <CardContent sx={{ p: 3, pt: 4, color: 'white' }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TrendingUpIcon sx={{ color: '#FFD700', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="h5" component="h3" fontWeight="bold" sx={{ color: 'white' }}>
              {t('creatorBonusCard.title')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 0.5 }}>
              {t('creatorBonusCard.subtitle')}
            </Typography>
          </Box>
        </Box>

        {/* Bonus Program Table - Beautiful Glass Style */}
        <TableContainer 
          component={Box} 
          sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            overflow: 'hidden',
            mb: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            }
          }}
        >
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow 
                sx={{ 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '0.9rem',
                    py: 2,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    '&::before': {
                      content: '"💎"',
                      position: 'absolute',
                      top: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                    },
                    pt: 3
                  }}
                >
                  {t('creatorBonusCard.diamond')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '0.9rem',
                    py: 2,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    '&::before': {
                      content: '"📅"',
                      position: 'absolute',
                      top: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                    },
                    pt: 3
                  }}
                >
                  {t('creatorBonusCard.validDay')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '0.9rem',
                    py: 2,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    '&::before': {
                      content: '"⏰"',
                      position: 'absolute',
                      top: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                    },
                    pt: 3
                  }}
                >
                  {t('creatorBonusCard.hours')}
                </TableCell>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold', 
                    fontSize: '0.9rem',
                    py: 2,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    '&::before': {
                      content: '"📊"',
                      position: 'absolute',
                      top: '4px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '12px',
                    },
                    pt: 3
                  }}
                >
                  {t('creatorBonusCard.rate')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow 
                sx={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <TableCell 
                  sx={{ 
                    py: 2.5,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#FFD700',
                    textShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
                    background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05))',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
                    }
                  }}
                >
                  {bonus.diamonds?.toLocaleString() || '1,090,780'}
                </TableCell>
                <TableCell 
                  sx={{ 
                    py: 2.5,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#4ECDC4',
                    textShadow: '0 2px 8px rgba(78, 205, 196, 0.3)',
                    background: 'linear-gradient(45deg, rgba(78, 205, 196, 0.1), rgba(78, 205, 196, 0.05))',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #4ECDC4, transparent)',
                    }
                  }}
                >
                  {bonus.validDays || '22'}
                </TableCell>
                <TableCell 
                  sx={{ 
                    py: 2.5,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#FF6B35',
                    textShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
                    background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 107, 53, 0.05))',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #FF6B35, transparent)',
                    }
                  }}
                >
                  {bonus.hours || '60'}
                </TableCell>
                <TableCell 
                  sx={{ 
                    py: 2.5,
                    px: 3,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#45B7D1',
                    textShadow: '0 2px 8px rgba(69, 183, 209, 0.3)',
                    background: 'linear-gradient(45deg, rgba(69, 183, 209, 0.1), rgba(69, 183, 209, 0.05))',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #45B7D1, transparent)',
                    }
                  }}
                >
                  {bonus.rateFormatted || bonus.ratePercentage || '0,04%'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Current Bonus Amount - Beautiful Style */}
        <Box 
          sx={{ 
            mt: 2,
            p: 3,
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.15) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            borderRadius: 4,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0 15px 35px rgba(255, 215, 0, 0.25)',
              border: '2px solid rgba(255, 215, 0, 0.5)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'conic-gradient(from 0deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
              animation: 'rotate 8s linear infinite',
              zIndex: 0,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '2px',
              left: '2px',
              right: '2px',
              bottom: '2px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '14px',
              zIndex: 1,
            },
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
              <MoneyIcon 
                sx={{ 
                  mr: 1, 
                  fontSize: 24,
                  color: '#FFD700',
                  filter: 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.4))',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                  }
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 'medium',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '0.75rem'
                }}
              >
                {t('creatorBonusCard.currentBonus')}
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                color: '#FFD700',
                textShadow: '0 2px 15px rgba(255, 215, 0, 0.5)',
                background: 'linear-gradient(45deg, #FFD700, #FFA000, #FFD700)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s ease-in-out infinite',
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                }
              }}
            >
              {bonus.bonusAmountFormatted || '436.3 $'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatorBonusCard; 