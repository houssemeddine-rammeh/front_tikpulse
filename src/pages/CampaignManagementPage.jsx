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
  ArrowForwardOutlined,
  DashboardOutlined
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CampaignManagementPage = () => {
  const { t } = useTranslation();
  
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/dashboard" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <DashboardOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
{t('navigation.dashboard')}
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowForwardOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
            {t('pages.campaigns.title')}
          </Typography>
        </Breadcrumbs>
        
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
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {t('pages.campaigns.title')}
          </Typography>
          
          <Typography variant="body1">
            {t('pages.campaigns.description')}
          </Typography>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            {t('pages.campaigns.underDevelopment')}
          </Typography>
          <Typography variant="body1">
            {t('pages.campaigns.description')}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default CampaignManagementPage; 

