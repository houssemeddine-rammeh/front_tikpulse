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
import SupportTicket from '../components/support/SupportTicket';

const SupportPage = () => {
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
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <SupportAgent sx={{ mr: 0.5 }} fontSize="inherit" />
            Support
          </Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            background: (theme) => theme.palette.mode === 'light' 
              ? 'linear-gradient(90deg, #FF0050 0%, #25F4EE 100%)'
              : 'linear-gradient(90deg, #FF4081 0%, #40E0D0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // Fallback for browsers that don't support gradient text
            color: (theme) => theme.palette.mode === 'light' ? '#FF0050' : '#FF4081',
            backgroundClip: 'text',
          }}>
            Centre de Support
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            Besoin d'aide ? Créez un ticket de support et notre équipe vous assistera dans les plus brefs délais.
          </Typography>
        </Paper>

        <SupportTicket />
      </Box>
    </Container>
  );
};

export default SupportPage; 

