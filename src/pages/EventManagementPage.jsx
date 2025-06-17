import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  FormControlLabel,
  Switch,
  OutlinedInput,
  Alert
} from '@mui/material';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { 
  Add,
  Edit,
  Delete,
  NavigateNext,
  Dashboard,
  Event,
  LocationOn,
  Link as LinkIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { eventsAPI, creatorsAPI } from '../services/api';
import { UserRole } from '../types';

const eventTypes = [
  { value: 'match', label: 'Match' },
  { value: 'event', label: 'Événement' },
  { value: 'tournament', label: 'Tournoi' },
  { value: 'challenge', label: 'Challenge' },
  { value: 'other', label: 'Autre' }
];

const eventStatusOptions = [
  { value: 'upcoming', label: 'À venir', color: '#3f51b5' },
  { value: 'active', label: 'En cours', color: '#4caf50' },
  { value: 'completed', label: 'Terminé', color: '#9e9e9e' },
  { value: 'cancelled', label: 'Annulé', color: '#f44336' }
];

const EventManagementPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start_date: new Date().toISOString().substring(0, 16),
    end_date: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().substring(0, 16),
    all_day: false,
    type: 'event',
    location: '',
    link: '',
    status: 'upcoming',
    participants: []
  });
  
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false
  });

  useEffect(() => {
    fetchEvents();
    fetchCreators();
  }, []);

  // Check if user has permission to manage events (admin or manager)
  if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.MANAGER && user.role !== UserRole.SUB_MANAGER)) {
    return <Navigate to="/events" replace />;
  }

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await eventsAPI.getAll();
      if (response.events) {
        setEvents(response.events);
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const fetchCreators = async () => {
    try {
      const response = await creatorsAPI.getAll();
      if (response.success && response.users) {
        setCreators(response.users.filter(user => user.role === UserRole.CREATOR));
      }
    } catch (err) {
      console.error('Failed to fetch creators:', err);
    }
  };

  const handleDialogOpen = (event = null) => {
    if (event) {
      // Convert string dates to Date objects for the form
      setEditingEvent(event);
      setNewEvent({
        title: event.title || '',
        description: event.description || '',
        start_date: new Date(event.start_date).toISOString().substring(0, 16),
        end_date: new Date(event.end_date).toISOString().substring(0, 16),
        all_day: event.all_day,
        type: event.type,
        location: event.location || '',
        link: event.link || '',
        status: event.status,
        participants: event.participants?.map(p => p.user_id) || []
      });
    } else {
      setEditingEvent(null);
      setNewEvent({
        title: '',
        description: '',
        start_date: new Date().toISOString().substring(0, 16),
        end_date: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString().substring(0, 16),
        all_day: false,
        type: 'event',
        location: '',
        link: '',
        status: 'upcoming',
        participants: []
      });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormErrors({
      title: false,
      description: false
    });
  };

  const handleInputChange = (field) => (e) => {
    setNewEvent({
      ...newEvent,
      [field]: e.target.value
    });
    
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: false
      });
    }
  };

  const handleDateChange = (field) => (e) => {
    setNewEvent({
      ...newEvent,
      [field]: e.target.value
    });
    
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: false
      });
    }
  };

  const handleTypeChange = (event) => {
    setNewEvent({
      ...newEvent,
      type: event.target.value
    });
  };

  const handleStatusChange = (event) => {
    setNewEvent({
      ...newEvent,
      status: event.target.value
    });
  };

  const handleAllDayChange = (event) => {
    setNewEvent({
      ...newEvent,
      all_day: event.target.checked
    });
  };

  const handleParticipantsChange = (event) => {
    const value = event.target.value;
    setNewEvent({
      ...newEvent,
      participants: Array.isArray(value) ? value : [value]
    });
  };

  const getStatusChip = (status) => {
    const statusOption = eventStatusOptions.find(option => option.value === status);
    return (
      <Chip 
        label={statusOption?.label || status}
        size="small"
        sx={{ 
          bgcolor: statusOption?.color || '#e3f2fd', 
          color: statusOption?.color ? '#1976d2' : 'textSecondary',
          fontWeight: 500
        }} 
      />
    );
  };

  const formatDateRange = (startDate, endDate, allDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const dateOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric'
    };
    
    const timeOptions = { 
      hour: '2-digit', 
      minute: '2-digit'
    };
    
    // Same day event
    if (start.toDateString() === end.toDateString()) {
      if (allDay) {
        return start.toLocaleDateString('fr-FR', dateOptions) + ' (toute la journée)';
      } else {
        return start.toLocaleDateString('fr-FR', dateOptions) + ' • ' + 
               start.toLocaleTimeString('fr-FR', timeOptions) + ' - ' + 
               end.toLocaleTimeString('fr-FR', timeOptions);
      }
    } else {
      // Multi-day event
      if (allDay) {
        return start.toLocaleDateString('fr-FR', dateOptions) + ' - ' + 
               end.toLocaleDateString('fr-FR', dateOptions) + ' (toute la journée)';
      } else {
        return start.toLocaleDateString('fr-FR', dateOptions) + ' ' + 
               start.toLocaleTimeString('fr-FR', timeOptions) + ' - ' + 
               end.toLocaleDateString('fr-FR', dateOptions) + ' ' + 
               end.toLocaleTimeString('fr-FR', timeOptions);
      }
    }
  };

  const validateForm = () => {
    const errors = {
      title: !newEvent.title.trim(),
      start_date: !newEvent.start_date,
      end_date: !newEvent.end_date
    };
    
    // Check if end date is after start date
    if (newEvent.start_date && newEvent.end_date && new Date(newEvent.end_date) < new Date(newEvent.start_date)) {
      errors.end_date = 'La date de fin doit être après la date de début';
    }
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        start_date: new Date(newEvent.start_date).toISOString(),
        end_date: new Date(newEvent.end_date).toISOString(),
        all_day: newEvent.all_day,
        type: newEvent.type,
        location: newEvent.location,
        link: newEvent.link,
        status: newEvent.status,
        created_by: user?.id || '1', // Fallback to 1 if user is not available
        participants: newEvent.participants
      };
      
      if (editingEvent) {
        // Update existing event
        await eventsAPI.update(editingEvent.id, eventData);
      } else {
        // Create new event
        await eventsAPI.create(eventData);
      }
      
      handleDialogClose();
      fetchEvents(); // Refresh event list
      
    } catch (err) {
      console.error('Failed to save event:', err);
      setError(err instanceof Error ? err.message : 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      await eventsAPI.delete(id);
      fetchEvents(); // Refresh event list
    } catch (err) {
      console.error('Failed to delete event:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            Gestion des Événements
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleDialogOpen()}
            sx={{ bgcolor: '#6200ea', '&:hover': { bgcolor: '#3700b3' } }}
          >
            Nouvel Événement
          </Button>
        </Box>

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Events Table */}
        <Paper elevation={2} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <TableContainer>
            {loading ? (
              <Box sx={{ p: 2 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Participants</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>{event.title}</Typography>
                        {event.description && (
                          <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                            {event.description.length > 50 ? event.description.substring(0, 50) + '...' : event.description}
                          </Typography>
                        )}
                        {event.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LocationOnIcon color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="caption" color="textSecondary">
                              {event.location}
                            </Typography>
                          </Box>
                        )}
                        {event.link && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <LinkIcon color="action" sx={{ mr: 0.5 }} />
                            <Typography variant="caption" color="textSecondary">
                              {event.link}
                            </Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={eventTypes.find(t => t.value === event.type)?.label || event.type} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#e3f2fd', 
                            color: '#1976d2',
                            fontWeight: 500
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        {formatDateRange(event.start_date, event.end_date, event.all_day)}
                      </TableCell>
                      <TableCell>
                        {getStatusChip(event.status)}
                      </TableCell>
                      <TableCell>
                        {event.participants && event.participants.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {event.participants.map(participant => (
                              <Chip 
                                key={participant.user_id} 
                                label={participant.username} 
                                size="small" 
                                sx={{ bgcolor: '#e3f2fd', mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        ) : (
                          <Typography variant="caption" color="textSecondary">
                            Aucun participant
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          size="small" 
                          sx={{ color: '#1976d2' }}
                          onClick={() => handleDialogOpen(event)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ color: '#f44336' }}
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Paper>
      </Box>

      {/* Add/Edit Event Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingEvent ? 'Modifier l\'événement' : 'Nouvel événement'}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Titre"
                  value={newEvent.title}
                  onChange={handleInputChange('title')}
                  error={!!formErrors.title}
                  helperText={formErrors.title ? 'Le titre est requis' : ''}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={newEvent.description}
                  onChange={handleInputChange('description')}
                  multiline
                  rows={3}
                  error={!!formErrors.description}
                  helperText={formErrors.description ? 'La description est requise' : ''}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type d'événement</InputLabel>
                  <Select
                    value={newEvent.type}
                    label="Type d'événement"
                    onChange={handleTypeChange}
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Statut</InputLabel>
                  <Select
                    value={newEvent.status}
                    label="Statut"
                    onChange={handleStatusChange}
                  >
                    {eventStatusOptions.map((status) => (
                      <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newEvent.all_day}
                      onChange={handleAllDayChange}
                    />
                  }
                  label="Toute la journée"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date et heure de début"
                  type="datetime-local"
                  fullWidth
                  required
                  value={newEvent.start_date}
                  onChange={handleDateChange('start_date')}
                  error={!!formErrors.start_date}
                  helperText={formErrors.start_date ? 'La date de début est requise' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date et heure de fin"
                  type="datetime-local"
                  fullWidth
                  required
                  value={newEvent.end_date}
                  onChange={handleDateChange('end_date')}
                  error={!!formErrors.end_date}
                  helperText={formErrors.end_date ? 'La date de fin est requise' : ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lieu"
                  value={newEvent.location}
                  onChange={handleInputChange('location')}
                  placeholder="Adresse ou lieu virtuel"
                  InputProps={{
                    startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lien"
                  value={newEvent.link}
                  onChange={handleInputChange('link')}
                  placeholder="URL pour l'événement (ex)"
                  InputProps={{
                    startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Participants</InputLabel>
                  <Select
                    multiple
                    value={newEvent.participants}
                    onChange={handleParticipantsChange}
                    input={<OutlinedInput label="Participants" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selected.map((value) => {
                          const creator = creators.find(c => c.id === value);
                          return (
                            <Chip key={value} label={creator ? creator.username : value} size="small" sx={{ bgcolor: '#e3f2fd', mr: 0.5, mb: 0.5 }} />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {creators.map((creator) => (
                      <MenuItem key={creator.id} value={creator.id}>
                        {creator.username}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button onClick={handleDialogClose}>Annuler</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{ 
              bgcolor: '#6200ea',
              '&:hover': { bgcolor: '#3700b3' }
            }}
          >
            {loading ? <CircularProgress size={24} /> : (editingEvent ? 'Mettre à jour' : 'Créer')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventManagementPage; 

