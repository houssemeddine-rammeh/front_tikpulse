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
    alert('Ticket soumis avec succès!');
    
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
            Créer un Ticket de Support
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Titre du ticket"
                value={formData.title}
                onChange={handleInputChange('title')}
                required
                variant="outlined"
              />
              
              <TextField
                fullWidth
                label="Description détaillée"
                value={formData.description}
                onChange={handleInputChange('description')}
                required
                multiline
                rows={4}
                variant="outlined"
              />
              
              <FormControl fullWidth required>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  value={formData.category}
                  onChange={handleInputChange('category')}
                  label="Catégorie"
                >
                  <MenuItem value={TICKET_CATEGORIES.ACCOUNT_ISSUE}>Problème de compte</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.PAYMENT}>Paiement</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.TECHNICAL}>Technique</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.CONTENT}>Contenu</MenuItem>
                  <MenuItem value={TICKET_CATEGORIES.OTHER}>Autre</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Priorité</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={handleInputChange('priority')}
                  label="Priorité"
                >
                  <MenuItem value={TICKET_PRIORITIES.LOW}>Faible</MenuItem>
                  <MenuItem value={TICKET_PRIORITIES.MEDIUM}>Moyenne</MenuItem>
                  <MenuItem value={TICKET_PRIORITIES.HIGH}>Élevée</MenuItem>
                  <MenuItem value={TICKET_PRIORITIES.URGENT}>Urgente</MenuItem>
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
            Envoyer le Ticket
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
            Mes Tickets Récents
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Aucun ticket trouvé. Créez votre premier ticket ci-dessus.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SupportTicket; 