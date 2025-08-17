import React from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  NavigateNext,
  Dashboard
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RulesManagementPage = () => {
  const { t } = useTranslation();
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNext fontSize="small" />}
          sx={{ mb: 2 }}
        >
          <Link
            component={RouterLink}
            to="/dashboard"
            underline="hover"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Dashboard sx={{ mr: 0.5 }} fontSize="inherit" />
            {t('common.dashboard')}
          </Link>
          <Typography color="text.primary">{t('pages.rules.title')}</Typography>
        </Breadcrumbs>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t('pages.rules.bonusRulesManagement')}
          </Typography>
          
          <Typography variant="body1">
            {t('pages.rules.description')}
          </Typography>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('pages.rules.underDevelopment')}
          </Typography>
          <Typography variant="body1">
            {t('pages.rules.fullDescription')}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RulesManagementPage; 

