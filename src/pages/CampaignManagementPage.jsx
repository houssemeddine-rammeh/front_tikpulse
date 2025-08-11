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

const CampaignManagementPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/dashboard" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <DashboardOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowForwardOutlined sx={{ mr: 0.5 }} fontSize="inherit" />
            Campaign Management
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
            Campaign Management
          </Typography>
          
          <Typography variant="body1">
            Create and manage all campaigns for the agency.
          </Typography>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            This page is under development
          </Typography>
          <Typography variant="body1">
            The Campaign Management page will provide a complete overview of all campaigns across the agency. 
            Administrators will be able to create, edit, and monitor all campaign activities, with detailed reporting and performance metrics.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default CampaignManagementPage; 

