import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';
import {
  LiveTv as LiveIcon,
  Diamond as DiamondIcon,
  MonetizationOn as MoneyIcon,
  ReportProblem as ReportIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const DashboardDetailsPage = () => {
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openReportIssue, setOpenReportIssue] = useState(false);
  const [reportForm, setReportForm] = useState({
    category: '',
    description: '',
    files: []
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/creators/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch creator data');
        }
        
        const creatorData = await response.json();
        setCreator(creatorData);
      } catch (error) {
        console.error('Error fetching creator data:', error);
        setCreator(null);
      }
    };

    if (id) {
      fetchCreatorData();
    }
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography variant="h6">Loading creator details...</Typography>
        </Box>
      </Container>
    );
  }

  if (!creator) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Creator not found
          </Typography>
        </Box>
      </Container>
    );
  }

  const totalBonus = 1000; // Calculate based on your logic

  const handleReportSubmit = () => {
    if (!reportForm.category) {
      return;
    }
    
    console.log('Report submitted:', reportForm);
    setOpenReportIssue(false);
    setSnackbarOpen(true);
    setReportForm({
      category: '',
      description: '',
      files: []
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setReportForm(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const removeFile = (index) => {
    setReportForm(prev => ({
      ...prev,
      files: prev.files.filter((file, i) => i !== index)
    }));
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Creator Dashboard Details
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Detailed overview for {creator.username}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold'
            }}
            startIcon={<ReportIcon />}
            onClick={() => setOpenReportIssue(true)}
          >
            Report Issue
          </Button>
        </Box>

        {/* Creator Info Section */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>
              Creator Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ color: '#1976d2', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Username</Typography>
                    <Typography variant="h6">{creator.username}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ color: '#1976d2', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="h6">{creator.email}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ color: '#1976d2', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="h6">{creator.phone}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarIcon sx={{ color: '#1976d2', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Joined</Typography>
                    <Typography variant="h6">{creator.daysSinceJoining} days ago</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Live Sessions Section */}
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>Live Sessions Overview</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#fce4ec', border: '1px solid #f8bbd9' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LiveIcon sx={{ color: '#e91e63', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#e91e63' }}>Live sessions</Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#e91e63', fontWeight: 'bold' }}>
                  18
                </Typography>
                <Typography variant="body2" sx={{ color: '#e91e63', mt: 1 }}>
                  {creator?.validLiveDays ?? 15} valid days (&gt;1h)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#e8f5e8', border: '1px solid #c8e6c9' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DiamondIcon sx={{ color: '#4caf50', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#4caf50' }}>Diamonds this month</Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                  2400
                </Typography>
                <Typography variant="body2" sx={{ color: '#4caf50', mt: 1 }}>
                  +18% compared to last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: '#fff3e0', border: '1px solid #ffcc02' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MoneyIcon sx={{ color: '#ff9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ff9800' }}>Projected bonus</Typography>
                </Box>
                <Typography variant="h3" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                  €{totalBonus}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff9800', mt: 1 }}>
                  Based on current performance
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Performance Metrics */}
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>Performance Metrics</Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#2196f3', fontWeight: 'bold' }}>
                  {creator.followers.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">Followers</Typography>
                <TrendingUpIcon sx={{ color: '#4caf50', mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                  {creator.videos}
                </Typography>
                <Typography variant="body2" color="text.secondary">Videos</Typography>
                <TrendingUpIcon sx={{ color: '#4caf50', mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#e91e63', fontWeight: 'bold' }}>
                  {(creator.likes / 1000000).toFixed(1)}M
                </Typography>
                <Typography variant="body2" color="text.secondary">Likes</Typography>
                <TrendingUpIcon sx={{ color: '#4caf50', mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                  {(creator.views / 1000000).toFixed(1)}M
                </Typography>
                <Typography variant="body2" color="text.secondary">Views</Typography>
                <TrendingUpIcon sx={{ color: '#4caf50', mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Agency Program Table */}
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>Program Agency</Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="agency program table">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Diamant</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Valide day</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Hours</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Taux</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {creator?.diamonds?.toLocaleString() || '1,090,780'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {creator?.validLiveDays || '22'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {creator?.liveDuration || '60'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                      {((creator?.contractDetails?.rate || 0.04) * 100).toFixed(2)}%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            <Box sx={{ 
              p: 2, 
              bgcolor: '#e8f5e8', 
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <Typography variant="h6" sx={{ color: '#4caf50', mb: 1 }}>
                Current Tier: {creator.contractDetails.tier}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly Goal: {creator.contractDetails.monthlyDiamondGoal.toLocaleString()} diamonds
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rate: {(creator.contractDetails.rate * 100).toFixed(2)}% per diamond
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Agency Details */}
        <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>Agency Information</Typography>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>{agencyDetails.name}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {agencyDetails.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2"><strong>Agency ID:</strong> {agencyDetails.id}</Typography>
                <Typography variant="body2"><strong>Manager:</strong> {agencyDetails.managerName}</Typography>
                <Typography variant="body2"><strong>Region:</strong> {agencyDetails.region}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2"><strong>Join Date:</strong> {agencyDetails.joinDate.toLocaleDateString()}</Typography>
                <Typography variant="body2"><strong>Support Email:</strong> {agencyDetails.supportEmail}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={creator.contractDetails.tier} 
                    color="primary" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label={`${creator.daysSinceJoining} days active`} 
                    color="success" 
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Report Issue Dialog */}
      <Dialog open={openReportIssue} onClose={() => setOpenReportIssue(false)} maxWidth="md" fullWidth>
        <DialogTitle>Report an Issue</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Issue Category</InputLabel>
              <Select
                value={reportForm.category}
                onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
                label="Issue Category"
              >
                <MenuItem value="payment">Payment Issue</MenuItem>
                <MenuItem value="technical">Technical Problem</MenuItem>
                <MenuItem value="contract">Contract Concern</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={reportForm.description}
              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
              placeholder="Please describe the issue in detail..."
            />
            
            <Box>
              <input
                accept="*/*"
                style={{ display: 'none' }}
                id="file-upload"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <Button variant="outlined" component="span" startIcon={<UploadIcon />}>
                  Upload Files
                </Button>
              </label>
              
              {reportForm.files.length > 0 && (
                <List>
                  {reportForm.files.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={file.name} />
                      <IconButton onClick={() => removeFile(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReportIssue(false)}>Cancel</Button>
          <Button onClick={handleReportSubmit} variant="contained" disabled={!reportForm.category}>
            Submit Report
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Report submitted successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardDetailsPage; 

