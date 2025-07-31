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
        <Box display="flex" alignItems="center" mb={3}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h3">
            Programme de Bonus
          </Typography>
        </Box>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <DiamondIcon sx={{ mr: 1 }} />
                    Diamant
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ScheduleIcon sx={{ mr: 1 }} />
                    Valide day
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ScheduleIcon sx={{ mr: 1 }} />
                    Hours
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <StarIcon sx={{ mr: 1 }} />
                    Programme
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <TrendingUpIcon sx={{ mr: 1 }} />
                    Taux
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    {bonus.diamonds?.toLocaleString() || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="secondary.main">
                    {bonus.validDays || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="info.main">
                    {bonus.hoursFormatted || (bonus.hours + 'h') || '0h'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center" justifyContent="center">
                    {getProgramIcon(bonus.program)}
                    <Chip 
                      label={bonus.program || 'Aucun'} 
                      color={getProgramColor(bonus.program)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    {bonus.rateFormatted || bonus.ratePercentage || '0%'}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Bonus Actuel */}
        <Box 
          sx={{ 
            mt: 3, 
            p: 2, 
            bgcolor: 'success.light', 
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
            <MoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Bonus actuel : {bonus.bonusAmountFormatted || '0 $'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatorBonusCard; 