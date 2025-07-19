import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Alert,
  Skeleton,
  Grid
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
      <Card>
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
          <Box mt={2}>
            <Skeleton variant="rectangular" height={100} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error.creator) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{error.creator}</Alert>
        </CardContent>
      </Card>
    );
  }

  if (!bonus) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Aucune information de bonus disponible
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h3">
            Programme de Bonus
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <DiamondIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2" color="text.secondary">
                Diamants:
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                {bonus.diamonds?.toLocaleString() || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <ScheduleIcon sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="body2" color="text.secondary">
                Jours Valides:
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                {bonus.validDays || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <ScheduleIcon sx={{ mr: 1, color: 'info.main' }} />
              <Typography variant="body2" color="text.secondary">
                Heures:
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                {bonus.hours || 0}h
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              {getProgramIcon(bonus.program)}
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Programme:
              </Typography>
              <Chip 
                label={bonus.program} 
                color={getProgramColor(bonus.program)}
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingUpIcon sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="body2" color="text.secondary">
                Taux:
              </Typography>
              <Chip 
                label={bonus.ratePercentage} 
                color="success"
                variant="outlined"
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              sx={{ 
                mt: 2, 
                p: 2, 
                bgcolor: 'success.light', 
                borderRadius: 1,
                color: 'white'
              }}
            >
              <MoneyIcon sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Bonus Actuel: {bonus.bonusAmountFormatted}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreatorBonusCard; 