import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Container
} from '@mui/material';
import {
  SupportAgent,
  NavigateNext
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SupportTicket from '../components/support/SupportTicket';

const SupportPage = () => {
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
            <SupportAgent sx={{ mr: 0.5 }} fontSize="inherit" />
{t('navigation.dashboard')}
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <SupportAgent sx={{ mr: 0.5 }} fontSize="inherit" />
{t('navigation.support')}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            background: 'linear-gradient(90deg, #FF0050 0%, #25F4EE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
{t('pages.support.title')}
          </Typography>
          
          <Typography variant="body1" gutterBottom>
{t('pages.support.description')}
          </Typography>
        </Paper>

        <SupportTicket />
      </Box>
    </Container>
  );
};

export default SupportPage; 

