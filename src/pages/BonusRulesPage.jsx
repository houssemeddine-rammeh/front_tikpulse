import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import BonusRules from '../components/BonusRules';
import CreatorsBonusTable from '../components/CreatorsBonusTable';
import { useAuth } from '../contexts/AuthContext';

const BonusRulesPage = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="xl">
      <Box py={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Programme de Bonus
        </Typography>
        
        <Grid container spacing={3}>
          {/* Bonus Rules */}
          <Grid item xs={12} lg={6}>
            <BonusRules />
          </Grid>
          
          {/* Creators Bonus Table - Only for managers */}
          {user?.role === 'manager' && (
            <Grid item xs={12} lg={6}>
              <CreatorsBonusTable />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default BonusRulesPage; 

