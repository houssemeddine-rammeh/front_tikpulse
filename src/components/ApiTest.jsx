import React, { useState } from 'react';
import { Button, Typography, Box, Paper, Alert } from '@mui/material';
import { buildApiUrl, getApiHeaders } from '../config/api';

const ApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setResult('');
    
    try {
      // Test backend health
      const healthResponse = await fetch(buildApiUrl('/health'), {
        headers: getApiHeaders()
      });
      
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        
        // Test creating an event
        const eventData = {
          title: `Test Event ${new Date().getTime()}`,
          description: 'Testing from frontend',
          date: '2024-12-01',
          location: 'Frontend Test'
        };
        
        const createResponse = await fetch(buildApiUrl('/api/v1/events'), {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify(eventData)
        });
        
        const createResult = await createResponse.json();
        
        // Test retrieving events
        const getResponse = await fetch(buildApiUrl('/api/v1/events'), {
          headers: getApiHeaders()
        });
        
        const getResult = await getResponse.json();
        
        const testResults = {
          health: healthData,
          eventCreated: createResult,
          eventsRetrieved: getResult,
          timestamp: new Date().toISOString()
        };
        
        setResult(JSON.stringify(testResults, null, 2));
      } else {
        setResult(`Health check failed: ${healthResponse.status}`);
      }
    } catch (error) {
      setResult(`Connection Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        API Connection Test
      </Typography>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        This component tests the connection to your backend API. Click the button below to run a comprehensive test.
      </Alert>
      
      <Button 
        variant="contained" 
        onClick={testApi} 
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Testing...' : 'Test Real API Connection'}
      </Button>
      
      {result && (
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom>
            Test Results:
          </Typography>
          <Typography 
            component="pre" 
            sx={{ 
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {result}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ApiTest; 

