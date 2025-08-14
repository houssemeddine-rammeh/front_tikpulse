import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#000000',
      }}
    >
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{ 
          color: '#FF0050',
          mb: 3
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#25F4EE',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Loading DASHTRACER...
      </Typography>
    </Box>
  );
};

export default LoadingScreen; 

