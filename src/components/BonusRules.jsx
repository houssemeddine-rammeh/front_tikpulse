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
  Chip
} from '@mui/material';
import { 
  Star as StarIcon,
  TrendingUp as TrendingUpIcon 
} from '@mui/icons-material';
import { fetchBonusRules, selectBonusRules, selectBonusLoading, selectBonusErrors } from '../features/bonusSlice';
import { useTranslation } from 'react-i18next';

const BonusRules = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rules = useSelector(selectBonusRules);
  const loading = useSelector(selectBonusLoading);
  const error = useSelector(selectBonusErrors);

  useEffect(() => {
    dispatch(fetchBonusRules());
  }, [dispatch]);

  if (loading.rules) {
    return (
      <Card>
        <CardContent>
          <Typography>{t('bonusRules.loading')}</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error.rules) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{error.rules}</Alert>
        </CardContent>
      </Card>
    );
  }

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

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="h2">
            {t('bonusRules.title')}
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          {t('bonusRules.description')}
        </Typography>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <StarIcon sx={{ mr: 1 }} />
                    {t('bonusRules.program')}
                  </Box>
                </TableCell>
                <TableCell align="center">{t('bonusRules.validDays')}</TableCell>
                <TableCell align="center">{t('bonusRules.hours')}</TableCell>
                <TableCell align="center">{t('bonusRules.rate')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.program} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {getProgramIcon(rule.program)}
                      <Chip 
                        label={rule.program} 
                        color={getProgramColor(rule.program)}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="bold">
                      ≥{rule.validDays}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight="bold">
                      ≥{rule.hours}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={rule.ratePercentage} 
                      color="success"
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            {t('bonusRules.calculationFormula')}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph dangerouslySetInnerHTML={{
            __html: t('bonusRules.formulaDescription')
          }} />
          <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{
            __html: t('bonusRules.example')
          }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default BonusRules; 