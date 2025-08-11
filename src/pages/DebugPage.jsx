import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const DebugPage = () => {
  const { user, logout } = useAuth();
  
  const handleResetLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#000000', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#25F4EE' }}>
        Authentication Debug
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#161823', color: 'white' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF0050' }}>
          Current User
        </Typography>
        {user ? (
          <Box>
            <pre style={{ 
              background: '#0a0a0a', 
              padding: '10px', 
              borderRadius: '4px', 
              overflow: 'auto',
              color: '#25F4EE'
            }}>
              {JSON.stringify(user, null, 2)}
            </pre>
            
            <Typography variant="subtitle1" sx={{ mt: 2, color: '#FF0050' }}>
              Role Analysis:
            </Typography>
            <ul style={{ color: '#ffffff' }}>
              <li>Role value: {String(user.role)}</li>
              <li>Role type: {typeof user.role}</li>
              <li>Role === 'admin'? {String(user.role === 'admin')}</li>
              <li>Role === 'manager'? {String(user.role === 'manager')}</li>
              <li>Role === 'creator'? {String(user.role === 'creator')}</li>
              <li>Role === 'super_admin'? {String(user.role === 'super_admin')}</li>
            </ul>
          </Box>
        ) : (
          <Typography sx={{ color: '#ffffff' }}>No user is logged in</Typography>
        )}
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#161823', color: 'white' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF0050' }}>
          Local Storage
        </Typography>
        <pre style={{ 
          background: '#0a0a0a', 
          padding: '10px', 
          borderRadius: '4px', 
          overflow: 'auto',
          color: '#25F4EE'
        }}>
          {JSON.stringify({
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
            token: localStorage.getItem('token')
          }, null, 2)}
        </pre>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#161823', color: 'white' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#FF0050' }}>
          Available User Roles
        </Typography>
        <pre style={{ 
          background: '#0a0a0a', 
          padding: '10px', 
          borderRadius: '4px', 
          overflow: 'auto',
          color: '#25F4EE'
        }}>
          {JSON.stringify({
            ADMIN: 'admin',
            MANAGER: 'manager', 
            SUB_MANAGER: 'sub_manager',
            CREATOR: 'creator',
            SUPER_ADMIN: 'super_admin'
          }, null, 2)}
        </pre>
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleResetLocalStorage}
          sx={{ 
            backgroundColor: '#FF0050',
            '&:hover': { backgroundColor: '#e6004a' }
          }}
        >
          Clear Local Storage & Reload
        </Button>
        <Button 
          variant="outlined" 
          onClick={logout}
          sx={{ 
            borderColor: '#25F4EE',
            color: '#25F4EE',
            '&:hover': { borderColor: '#1dd1c1', backgroundColor: 'rgba(37, 244, 238, 0.1)' }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default DebugPage; 

