import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Alert,
  Box,
  Chip,
  Skeleton,
  TablePagination
} from '@mui/material';
import { 
  Star as StarIcon,
  Diamond as DiamondIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { fetchCreatorsWithBonus, selectCreatorsWithBonus, selectTotalBonus, selectBonusLoading, selectBonusErrors } from '../features/bonusSlice';

const CreatorsBonusTable = () => {
  const dispatch = useDispatch();
  const creators = useSelector(selectCreatorsWithBonus);
  const totalBonus = useSelector(selectTotalBonus);
  const loading = useSelector(selectBonusLoading);
  const error = useSelector(selectBonusErrors);

  useEffect(() => {
    dispatch(fetchCreatorsWithBonus());
  }, [dispatch]);

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

  if (loading.creators) {
    return (
      <Card>
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

  if (error.creators) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{error.creators}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h5" component="h2">
              Bonus des Créateurs
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ bgcolor: 'success.light', p: 1, borderRadius: 1, color: 'white' }}>
            <MoneyIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Total: ${totalBonus.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {creators.length === 0 ? (
          <Alert severity="info">
            Aucun créateur trouvé ou aucun créateur n'a de données de bonus disponibles.
          </Alert>
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TrendingUpIcon sx={{ mr: 1 }} />
                      Créateur
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <DiamondIcon sx={{ mr: 1 }} />
                      Diamants
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <ScheduleIcon sx={{ mr: 1 }} />
                      Jours
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <ScheduleIcon sx={{ mr: 1 }} />
                      Heures
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <StarIcon sx={{ mr: 1 }} />
                      Programme
                    </Box>
                  </TableCell>
                  <TableCell align="center">Taux</TableCell>
                  <TableCell align="center">
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <MoneyIcon sx={{ mr: 1 }} />
                      Bonus
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creators.map((creator) => (
                  <TableRow key={creator._id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {creator.username}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {creator.tikTokId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight="bold">
                        {creator.bonus.diamonds?.toLocaleString() || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {creator.bonus.validDays || 0}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {creator.bonus.hours || 0}h
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" alignItems="center" justifyContent="center">
                        {getProgramIcon(creator.bonus.program)}
                        <Chip 
                          label={creator.bonus.program} 
                          color={getProgramColor(creator.bonus.program)}
                          size="small"
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={creator.bonus.ratePercentage} 
                        color="success"
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight="bold" color="success.main">
                        {creator.bonus.bonusAmountFormatted}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatorsBonusTable; 