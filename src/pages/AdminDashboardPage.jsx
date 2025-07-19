import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Divider,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar
} from '@mui/material';
import {
  AdminPanelSettingsOutlined,
  PersonAddOutlined,
  DashboardOutlined,
  EmojiNatureOutlined,
  BarChartOutlined,
  AutoAwesomeOutlined,
  GroupOutlined as CreatorsIcon,
  EventOutlined,
  AssignmentOutlined,
  Storage,
  Upload,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as FollowersIcon,
  Visibility as ValidDaysIcon,
  PlayCircle as LiveIcon,
  Schedule,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Diamond as DiamondIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from "../components/layout/Layout";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [uploadStats] = useState({
    totalCreators: 187,
    totalManagers: 24,
    lastUpdated: new Date().toLocaleDateString()
  });

  // Bonus Rules State Management
  const [bonusRules, setBonusRules] = useState([
    { 
      id: '1', 
      program: 'Bronze', 
      validDay: '≥7', 
      hours: '≥15', 
      rate: '0.03%' 
    },
    { 
      id: '2', 
      program: 'Silver', 
      validDay: '≥15', 
      hours: '≥40', 
      rate: '0.04%' 
    },
    { 
      id: '3', 
      program: 'Gold', 
      validDay: '≥20', 
      hours: '≥80', 
      rate: '0.05%' 
    },
    { 
      id: '4', 
      program: 'Platinum', 
      validDay: '≥22', 
      hours: '≥100', 
      rate: '0.06%' 
    }
  ]);
  
  const [editingRule, setEditingRule] = useState(null);
  const [editedRule, setEditedRule] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRule, setNewRule] = useState({
    program: '',
    validDay: '',
    hours: '',
    rate: ''
  });
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // Stats data
  const totalManagers = 12;
  const totalCreators = 87;

  // Bonus Rules Functions
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
    if (newRule.program && newRule.validDay && newRule.hours && newRule.rate) {
      const id = Date.now().toString();
      setBonusRules(prev => [...prev, { ...newRule, id }]);
      setNewRule({
        program: '',
        validDay: '',
        hours: '',
        rate: ''
      });
      setShowAddDialog(false);
      setSnackbar({ 
        open: true, 
        message: 'Rule added successfully!', 
        severity: 'success' 
      });
    }
  };

  const getProgramColor = (program) => {
    switch (program.toLowerCase()) {
      case 'platinum': return 'primary';
      case 'gold': return 'warning';
      case 'silver': return 'info';
      case 'bronze': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back, {user?.name || 'Admin'}! Here's your platform overview.
            </Typography>
          </Box>

          {/* Platform Overview */}
          <Typography variant="h5" sx={{ mb: 3 }}>
            Platform Overview
          </Typography>

          {/* Editable Bonus Rules Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              💎 Bonus Rules Management
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setShowAddDialog(true)}
              sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#45a049' } }}
            >
              Add New Rule
            </Button>
          </Box>
          
          <TableContainer component={Paper} sx={{ mb: 4, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Program</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Valid Days</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Hours Required</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rate</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bonusRules.map((rule) => (
                  <TableRow key={rule.id} sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}>
                    <TableCell>
                      {editingRule === rule.id ? (
                        <TextField
                          value={editedRule?.program || ''}
                          onChange={(e) => setEditedRule({...editedRule, program: e.target.value})}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        <Chip 
                          label={rule.program} 
                          color={getProgramColor(rule.program)}
                          sx={{ fontWeight: 'bold' }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRule === rule.id ? (
                        <TextField
                          value={editedRule?.validDay || ''}
                          onChange={(e) => setEditedRule({...editedRule, validDay: e.target.value})}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        rule.validDay
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRule === rule.id ? (
                        <TextField
                          value={editedRule?.hours || ''}
                          onChange={(e) => setEditedRule({...editedRule, hours: e.target.value})}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        rule.hours
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRule === rule.id ? (
                        <TextField
                          value={editedRule?.rate || ''}
                          onChange={(e) => setEditedRule({...editedRule, rate: e.target.value})}
                          size="small"
                          fullWidth
                        />
                      ) : (
                        <Typography sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                          {rule.rate}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingRule === rule.id ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            onClick={handleSaveRule}
                            color="primary"
                            size="small"
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton 
                            onClick={handleCancelEdit}
                            color="secondary"
                            size="small"
                          >
                            <CancelIcon />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton 
                            onClick={() => handleEditRule(rule)}
                            color="primary"
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDeleteRule(rule.id)}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Quick Actions */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
            🚀 Quick Actions
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <DashboardOutlined sx={{ fontSize: 48, color: '#1976d2', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Manager Management
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/admin/managers"
                    fullWidth
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <DashboardOutlined sx={{ fontSize: 48, color: '#2e7d32', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Creator Management
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/admin/creators"
                    fullWidth
                    sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <BarChartOutlined sx={{ fontSize: 48, color: '#ed6c02', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Analytics & Reports
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/admin/analytics"
                    fullWidth
                    sx={{ bgcolor: '#ed6c02', '&:hover': { bgcolor: '#e65100' } }}
                  >
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ textAlign: 'center', p: 2, '&:hover': { boxShadow: 4 } }}>
                <CardContent>
                  <AdminPanelSettingsOutlined sx={{ fontSize: 48, color: '#9c27b0', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    System Settings
                  </Typography>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/admin/settings"
                    fullWidth
                    sx={{ bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2' } }}
                  >
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Add Rule Dialog */}
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Bonus Rule</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                label="Program Name"
                value={newRule.program}
                onChange={(e) => setNewRule({...newRule, program: e.target.value})}
                fullWidth
              />
              <TextField
                label="Valid Days Required"
                value={newRule.validDay}
                onChange={(e) => setNewRule({...newRule, validDay: e.target.value})}
                fullWidth
                placeholder="e.g., ≥7"
              />
              <TextField
                label="Hours Required"
                value={newRule.hours}
                onChange={(e) => setNewRule({...newRule, hours: e.target.value})}
                fullWidth
                placeholder="e.g., ≥15"
              />
              <TextField
                label="Rate"
                value={newRule.rate}
                onChange={(e) => setNewRule({...newRule, rate: e.target.value})}
                fullWidth
                placeholder="e.g., 0.03%"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddRule} variant="contained">Add Rule</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          <Alert 
            onClose={() => setSnackbar({...snackbar, open: false})} 
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

export default AdminDashboardPage;

