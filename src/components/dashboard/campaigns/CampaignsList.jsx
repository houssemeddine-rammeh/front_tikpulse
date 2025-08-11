import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      // Mock data for now
      const mockCampaigns = [
        {
          id: 1,
          title: 'Summer Campaign 2024',
          startDate: '2024-06-01',
          endDate: '2024-08-31',
          status: 'active',
          creators: [],
          createdBy: 'Admin User'
        }
      ];
      setCampaigns(mockCampaigns);
    } catch (error) {
      setError('Erreur lors du chargement des campagnes');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (mode, campaign = null) => {
    setFormMode(mode);
    setCurrentCampaign(campaign);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentCampaign(null);
  };

  const handleDeleteClick = (campaign) => {
    setCampaignToDelete(campaign);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete logic here
      console.log('Deleting campaign:', campaignToDelete);
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const getCampaignStatusChip = (campaign) => {
    return <Chip label="Active" color="success" size="small" />;
  };

  if (loading) {
    return <Typography>Chargement des campagnes...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" component="h1">
          Campagnes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenForm('create')}
          size={isMobile ? "small" : "medium"}
          fullWidth={isMobile}
          sx={{ 
            backgroundColor: '#FF0050',
            '&:hover': { backgroundColor: '#e6004a' }
          }}
        >
          Nouvelle Campagne
        </Button>
      </Box>

      {campaigns.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Aucune campagne trouvée
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Créez votre première campagne pour commencer.
          </Typography>
        </Paper>
      ) : (
        <>
          {/* Mobile/Tablet Card View */}
          {isMobile ? (
            <Grid container spacing={2}>
              {campaigns.map((campaign) => (
                <Grid item xs={12} key={campaign.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h2">
                          {campaign.title}
                        </Typography>
                        {getCampaignStatusChip(campaign)}
                      </Box>
                      
                      <Stack spacing={1} sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Période:</strong> {campaign.startDate} - {campaign.endDate}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          <strong>Créateurs:</strong> {campaign.creators?.length || 0} créateurs
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          <strong>Créé par:</strong> {campaign.createdBy}
                        </Typography>
                      </Stack>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Tooltip title="Voir">
                          <IconButton size="small" onClick={() => handleOpenForm('edit', campaign)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifier">
                          <IconButton size="small" onClick={() => handleOpenForm('edit', campaign)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton size="small" onClick={() => handleDeleteClick(campaign)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            /* Desktop Table View */
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Période</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Créateurs</TableCell>
                    <TableCell>Créé par</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.title}</TableCell>
                      <TableCell>{campaign.startDate} - {campaign.endDate}</TableCell>
                      <TableCell>{getCampaignStatusChip(campaign)}</TableCell>
                      <TableCell>{campaign.creators?.length || 0} créateurs</TableCell>
                      <TableCell>{campaign.createdBy}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Voir">
                          <IconButton size="small" onClick={() => handleOpenForm('edit', campaign)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Modifier">
                          <IconButton size="small" onClick={() => handleOpenForm('edit', campaign)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton size="small" onClick={() => handleDeleteClick(campaign)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {/* Dialog de confirmation de suppression */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        fullScreen={isMobile}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer la campagne "{campaignToDelete?.title}" ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 1 } }}>
          <Button onClick={() => setDeleteDialogOpen(false)} fullWidth={isMobile}>
            Annuler
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            autoFocus
            fullWidth={isMobile}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignsList; 

