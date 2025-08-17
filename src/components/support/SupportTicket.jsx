import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Stack
} from '@mui/material';
import {
  Send,
  Support as SupportIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Constants for ticket system
const TICKET_STATUSES = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress', 
  RESOLVED: 'resolved',
  CLOSED: 'closed'
};

const TICKET_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high', 
  URGENT: 'urgent'
};

const TICKET_CATEGORIES = {
  ACCOUNT_ISSUE: 'account_issue',
  PAYMENT: 'payment',
  TECHNICAL: 'technical',
  CONTENT: 'content',
  OTHER: 'other'
};

const SupportTicket = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: TICKET_PRIORITIES.MEDIUM
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Ticket submitted:', formData);
    // Here you would typically submit to an API
    alert(t('messages.createSuccess'));
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: TICKET_PRIORITIES.MEDIUM
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      {/* Create Ticket Form */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: '#FF0050',
            fontWeight: 'bold'
          }}>
            <SupportIcon sx={{ mr: 1 }} />
{t('tickets.create')}
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label={t('tickets.ticketTitle')}
                value={formData.title}
                onChange={handleInputChange('title')}
                required
                variant="outlined"
              />
              
              <TextField
                fullWidth
                label={t('tickets.detailedDescription')}
                value={formData.description}
                onChange={handleInputChange('description')}
                required
                multiline
                rows={4}
                variant="outlined"
              />
              
              <FormControl fullWidth required>
                <InputLabel>{t('forms.labels.category')}</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleInputChange('category')}
                  label={t('forms.labels.category')}
                >
                  <MenuItem value={TICKET_CATEGORIES.ACCOUNT_ISSUE}>{t('tickets.categories.accountIssue')}</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.PAYMENT}>{t('tickets.categories.payment')}</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.TECHNICAL}>{t('tickets.categories.technical')}</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.CONTENT}>{t('tickets.categories.content')}</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.OTHER}>{t('tickets.categories.other')}</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>{t('forms.labels.priority')}</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={handleInputChange('priority')}
                  label={t('forms.labels.priority')}
                >
                  <MenuItem value={TICKET_PRIORITIES.LOW}>{t('tickets.priorities.low')}</MenuItem>
                  <MenuItem value={TICKET_PRIORITIES.MEDIUM}>{t('tickets.priorities.medium')}</MenuItem>
                  <MenuItem value={TICKET_PRIORITIES.HIGH}>{t('tickets.priorities.high')}</MenuItem>
                  <MenuItem value={TICKET_PRIORITIES.URGENT}>{t('tickets.priorities.urgent')}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </CardContent>
        
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Send />}
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#FF0050',
              '&:hover': { backgroundColor: '#e6004a' }
            }}
          >
{t('tickets.submit')}
          </Button>
        </CardActions>
      </Card>
      
      {/* Recent Tickets */}
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ 
            color: '#25F4EE',
            fontWeight: 'bold'
          }}>
{t('pages.support.recentTickets')}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
{t('pages.support.noTickets')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SupportTicket; 