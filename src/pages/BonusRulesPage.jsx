import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import {
  MonetizationOn,
  Star,
  Diamond,
  Edit,
  Save,
  Cancel,
  Add,
  Delete,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import Layout from "../components/layout/Layout";

const BonusRulesPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === UserRole.ADMIN;

  const [bonusRules, setBonusRules] = useState([
    {
      id: '1',
      programme: 'Platinum',
      validDay: '20',
      hours: '80',
      taux: '15%'
    },
    {
      id: '2', 
      programme: 'Gold',
      validDay: '15',
      hours: '60',
      taux: '12%'
    },
    {
      id: '3',
      programme: 'Silver', 
      validDay: '10',
      hours: '40',
      taux: '8%'
    },
    {
      id: '4',
      programme: 'Bronze',
      validDay: '5',
      hours: '20', 
      taux: '5%'
    }
  ]);

  // Admin editing state
  const [editingRule, setEditingRule] = useState(null);
  const [editedRule, setEditedRule] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRule, setNewRule] = useState({
    programme: '',
    validDay: '',
    hours: '',
    taux: ''
  });
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '',
    severity: 'success'
  });

  // Admin functions
  const handleEditRule = (rule) => {
    setEditingRule(rule.id);
    setEditedRule({ ...rule });
  };

  const handleSaveRule = () => {
    if (editedRule) {
      setBonusRules(prev => prev.map(rule => 
        rule.id === editedRule.id ? editedRule : rule
      ));
      setEditingRule(null);
      setEditedRule(null);
      setSnackbar({ 
        open: true, 
        message: 'Rule updated successfully!',
        severity: 'success'
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setEditedRule(null);
  };

  const handleDeleteRule = (id) => {
    setBonusRules(prev => prev.filter(rule => rule.id !== id));
    setSnackbar({ 
      open: true, 
      message: 'Rule deleted successfully!',
      severity: 'success'
    });
  };

  const handleAddRule = () => {
    if (newRule.programme && newRule.validDay && newRule.hours && newRule.taux) {
      const id = Date.now().toString();
      setBonusRules(prev => [...prev, { ...newRule, id }]);
      setNewRule({ 
        programme: '',
        validDay: '',
        hours: '',
        taux: ''
      });
      setShowAddDialog(false);
      setSnackbar({ 
        open: true, 
        message: 'Rule added successfully!',
        severity: 'success'
      });
    }
  };

  const getProgramColor = (programme) => {
    switch (programme.toLowerCase()) {
      case 'platinum': return 'primary';
      case 'gold': return 'warning';
      case 'silver': return 'info';
      case 'bronze': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ 
                fontWeight: 'bold', 
                background: 'linear-gradient(45deg, #2196f3, #4caf50)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                💎 Bonus Rules
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Performance-based bonus structure for creators
              </Typography>
            </Box>
            
            {isAdmin && (
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={() => setShowAddDialog(true)}
                sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
              >
                Add New Rule
              </Button>
            )}
          </Box>

          {/* Admin Notice */}
          {isAdmin && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AdminPanelSettings sx={{ mr: 1 }} />
                You are viewing as an admin. You can edit and manage bonus rules.
              </Box>
            </Alert>
          )}

          {/* Description Card */}
          <Card sx={{ mb: 4, bgcolor: '#e8f5e8', border: '1px solid #4caf50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Diamond sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  Creator Bonus Program
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: '#2e7d32', mb: 2 }}>
                Our bonus program rewards creators based on their performance tier. Each tier has specific requirements for valid days and streaming hours, with corresponding bonus rates.
              </Typography>
              <Typography variant="body2" sx={{ color: '#1b5e20' }}>
                <strong>Valid Day:</strong> A day with at least 1 hour of live streaming<br />
                <strong>Hours:</strong> Total streaming hours per month<br />
                <strong>Taux:</strong> Bonus rate applied to your diamond earnings
              </Typography>
            </CardContent>
          </Card>

          {/* Bonus Rules Table */}
          <Paper sx={{ mb: 4, overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#1976d2' }}>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      color: 'white', 
                      fontSize: '1.1rem',
                      textAlign: 'center'
                    }}>
                      Programme
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      color: 'white', 
                      fontSize: '1.1rem',
                      textAlign: 'center'
                    }}>
                      Valide day
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      color: 'white', 
                      fontSize: '1.1rem',
                      textAlign: 'center'
                    }}>
                      Hours
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 'bold', 
                      color: 'white', 
                      fontSize: '1.1rem',
                      textAlign: 'center'
                    }}>
                      Taux
                    </TableCell>
                    {isAdmin && (
                      <TableCell sx={{ 
                        fontWeight: 'bold', 
                        color: 'white', 
                        fontSize: '1.1rem',
                        textAlign: 'center'
                      }}>
                        Actions
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bonusRules.map((rule, index) => (
                    <TableRow 
                      key={rule.id}
                      sx={{ 
                        bgcolor: index % 2 === 0 ? '#f8f9fa' : 'white',
                        '&:hover': { 
                          bgcolor: '#e3f2fd',
                          transform: 'scale(1.01)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        },
                        borderLeft: index < 3 ? `4px solid ${index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32'}` : 'none',
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      <TableCell sx={{ textAlign: 'center', py: 2 }}>
                        {isAdmin && editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.programme || ''}
                            onChange={(e) => setEditedRule(prev => prev ? { ...prev, programme: e.target.value } : null)}
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            label={rule.programme}
                            color={getProgramColor(rule.programme)}
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '0.9rem',
                              minWidth: '80px'
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {isAdmin && editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.validDay || ''}
                            onChange={(e) => setEditedRule(prev => prev ? { ...prev, validDay: e.target.value } : null)}
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Typography sx={{ 
                            fontSize: '1rem', 
                            fontWeight: 'medium',
                            color: '#333'
                          }}>
                            {rule.validDay}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {isAdmin && editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.hours || ''}
                            onChange={(e) => setEditedRule(prev => prev ? { ...prev, hours: e.target.value } : null)}
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Typography sx={{ 
                            fontSize: '1rem', 
                            fontWeight: 'medium',
                            color: '#333'
                          }}>
                            {rule.hours}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {isAdmin && editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.taux || ''}
                            onChange={(e) => setEditedRule(prev => prev ? { ...prev, taux: e.target.value } : null)}
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Typography sx={{ 
                            fontSize: '1rem', 
                            fontWeight: 'bold',
                            color: '#4caf50'
                          }}>
                            {rule.taux}
                          </Typography>
                        )}
                      </TableCell>
                      {isAdmin && (
                        <TableCell sx={{ textAlign: 'center' }}>
                          {editingRule === rule.id ? (
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              <IconButton 
                                size="small" 
                                onClick={handleSaveRule}
                                sx={{ color: '#4caf50' }}
                              >
                                <Save />
                              </IconButton>
                              <IconButton 
                                size="small" 
                                onClick={handleCancelEdit}
                                sx={{ color: '#f44336' }}
                              >
                                <Cancel />
                              </IconButton>
                            </Box>
                          ) : (
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              <IconButton 
                                size="small"
                                onClick={() => handleEditRule(rule)}
                                sx={{ color: '#2196f3' }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton 
                                size="small"
                                onClick={() => handleDeleteRule(rule.id)}
                                sx={{ color: '#f44336' }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Info Cards */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Card sx={{ flex: 1, minWidth: 300, bgcolor: '#e3f2fd', border: '1px solid #2196f3' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
                  📈 How to Earn Bonuses
                </Typography>
                <Typography variant="body2" sx={{ color: '#1565c0', lineHeight: 1.6 }}>
                  1. Stream consistently to meet the valid day requirements<br />
                  2. Accumulate the required hours for your target tier<br />
                  3. Your bonus rate will be applied to your diamond earnings<br />
                  4. Bonuses are calculated monthly based on your performance
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1, minWidth: 300, bgcolor: '#fff3e0', border: '1px solid #ff9800' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 'bold', mb: 2 }}>
                  💡 Pro Tips
                </Typography>
                <Typography variant="body2" sx={{ color: '#ef6c00', lineHeight: 1.6 }}>
                  • Plan your streaming schedule to maximize valid days<br />
                  • Aim for longer sessions to reach hour requirements<br />
                  • Track your progress throughout the month<br />
                  • Higher tiers offer significantly better bonus rates
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Add Rule Dialog */}
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
            Add New Bonus Rule
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Programme"
              fullWidth
              variant="outlined"
              value={newRule.programme}
              onChange={(e) => setNewRule(prev => ({ ...prev, programme: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Valid Day"
              fullWidth
              variant="outlined"
              value={newRule.validDay}
              onChange={(e) => setNewRule(prev => ({ ...prev, validDay: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Hours"
              fullWidth
              variant="outlined"
              value={newRule.hours}
              onChange={(e) => setNewRule(prev => ({ ...prev, hours: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              label="Taux"
              fullWidth
              variant="outlined"
              value={newRule.taux}
              onChange={(e) => setNewRule(prev => ({ ...prev, taux: e.target.value }))}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={() => setShowAddDialog(false)}
              sx={{ color: '#666' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddRule}
              variant="contained"
              sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
            >
              Add Rule
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default BonusRulesPage; 

