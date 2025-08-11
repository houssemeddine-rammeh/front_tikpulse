import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { Campaign } from '../../../types';
import { creatorsAPI, Creator } from '../../../services/api';



const CampaignForm = ({ campaign, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [objectives, setObjectives] = useState('');
  const [bonus, setBonus] = useState('');
  const [selectedCreators, setSelectedCreators] = useState([]);
  
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Fetch creators on component mount
  useEffect(() => {
    fetchCreators();
    
    // If editing, populate form with campaign data
    if (campaign) {
      setTitle(campaign.title);
      setDescription(campaign.description || '');
      
      // Handle both startDate and start_date
      const startDateValue = campaign.startDate 
        ? new Date(campaign.startDate) 
        : (campaign.start_date ? new Date(campaign.start_date) : new Date());
      setStartDate(startDateValue);
      
      // Handle both endDate and end_date
      const endDateValue = campaign.endDate 
        ? new Date(campaign.endDate) 
        : (campaign.end_date ? new Date(campaign.end_date) : new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
      setEndDate(endDateValue);
      
      setObjectives(campaign.objectives || '');
      setBonus(campaign.bonus || '');
      
      if (campaign.creators) {
        setSelectedCreators(campaign.creators.map(creator => creator.id));
      }
    }
  }, [campaign]);
  
  const fetchCreators = async () => {
    setLoading(true);
    try {
      const response = await creatorsAPI.getAll();
      if (response.success && response.users) {
        setCreators(response.users[]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des créateurs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!startDate) {
      newErrors.startDate = 'La date de début est requise';
    }
    
    if (!endDate) {
      newErrors.endDate = 'La date de fin est requise';
    } else if (startDate && endDate && endDate < startDate) {
      newErrors.endDate = 'La date de fin doit être postérieure à la date de début';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCreatorChange = (event) => {
    const { value } = event.target;
    setSelectedCreators(typeof value === 'string' ? value.split(',') );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    const campaignData = {
      title,
      description,
      start_date: startDate ? startDate.toISOString().split('T')[0] : '',
      end_date: endDate ? endDate.toISOString().split('T')[0] : '',
      objectives: objectives || null,
      bonus: bonus || null,
      creator_ids: selectedCreators
    };
    
    onSave(campaignData);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              required
              margin="normal"
            />
          </Grid>
          
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              required
            />
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
            <DatePicker
              label="Date de début"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              slotProps={{
                textField: {
                  fullWidth,
                  required,
                  error: !!errors.startDate,
                  helperText: errors.startDate
                }
              }}
            />
          </Grid>
          
          <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
            <DatePicker
              label="Date de fin"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              slotProps={{
                textField: {
                  fullWidth,
                  required,
                  error: !!errors.endDate,
                  helperText: errors.endDate
                }
              }}
            />
          </Grid>
          
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              fullWidth
              label="Objectifs"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid sx={{ gridColumn: 'span 12' }}>
            <TextField
              fullWidth
              label="Bonus"
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid sx={{ gridColumn: 'span 12' }}>
            <FormControl fullWidth>
              <InputLabel id="creators-select-label">Créateurs assignés</InputLabel>
              <Select
                labelId="creators-select-label"
                multiple
                value={selectedCreators}
                onChange={handleCreatorChange}
                input={<OutlinedInput label="Créateurs assignés" />}
                renderValue={(selected) => (
                  <Box sx={{ display) => {
                      const creator = creators.find(c => c.id === value);
                      return (
                        <Chip key={value} label={creator ? creator.username );
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
              <FormHelperText>Sélectionnez les créateurs qui participeront à cette campagne</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid sx={{ gridColumn: 'span 12', mt, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onCancel} sx={{ mr: 1 }}>
              Annuler
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {campaign ? 'Mettre à jour' : 'Créer'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default CampaignForm; 

