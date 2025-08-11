import React from 'react';
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Paper
} from '@mui/material';
import {
  Person as ResumeIcon,
  Description,
  NavigateNext
} from '@mui/icons-material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import CreatorResume from '../components/creator/CreatorResume';
import { useAuth } from '../contexts/AuthContext';

const CreatorResumePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  const isOwnResume = !id || id === user?.id;
  const isEditable = isOwnResume || user?.role === 'admin' || user?.role === 'manager';

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
            <ResumeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <ResumeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {isOwnResume ? 'My Resume' : 'Creator Resume'}
          </Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            background: 'linear-gradient(90deg, #FF0050 0%, #25F4EE 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {isOwnResume ? 'My Creator Resume' : 'Creator Resume'}
          </Typography>
          
          <Typography variant="body1" gutterBottom>
            {isOwnResume 
              ? 'Manage your professional profile and showcase your achievements to brands and partners.'
              : 'View and manage creator profiles, achievements and statistics.'}
          </Typography>
        </Paper>

        <CreatorResume creatorId={id} editable={isEditable} />
      </Box>
    </Container>
  );
};

export default CreatorResumePage; 

