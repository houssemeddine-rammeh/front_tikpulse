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

const RulesManagementPage = () => {
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
            Dashboard
          </Link>
          <Typography color="text.primary">Rules Management</Typography>
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
            Bonus Rules Management
          </Typography>
          
          <Typography variant="body1">
            Create and manage bonus rules for creators.
          </Typography>
        </Paper>
        
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            This page is under development
          </Typography>
          <Typography variant="body1">
            The Rules Management page will allow administrators to create, modify, and delete bonus rules for creators. 
            The interface will provide a complete view of all rules, with the ability to define conditions and rewards for each rule.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RulesManagementPage; 

