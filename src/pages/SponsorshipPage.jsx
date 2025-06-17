import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  NavigateNext,
  Description,
  Search,
  Visibility,
  Edit,
  Delete,
  Add,
  Business,
  Email,
  Phone,
  Language,
  TrendingUp,
  Group,
  AttachMoney
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const companiesData = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    logo: 'https://ui-avatars.com/api/?name=TechCorp&background=6366f1&color=fff',
    industry: 'Technology',
    website: 'www.techcorp.com',
    email: 'partnerships@techcorp.com',
    phone: '+1-555-0123',
    contactPerson: 'Sarah Johnson',
    status: 'Active',
    partnershipType: 'Gold',
    campaigns: 5,
    totalBudget: 250000,
    description: 'Leading technology solutions provider specializing in AI and cloud services.',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Fashion Forward',
    logo: 'https://ui-avatars.com/api/?name=Fashion+Forward&background=ec4899&color=fff',
    industry: 'Fashion',
    website: 'www.fashionforward.com',
    email: 'brand@fashionforward.com',
    phone: '+1-555-0124',
    contactPerson: 'Michael Chen',
    status: 'Active',
    partnershipType: 'Silver',
    campaigns: 3,
    totalBudget: 150000,
    description: 'Trendsetting fashion brand focused on sustainable and eco-friendly clothing.',
    joinDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'HealthPlus Nutrition',
    logo: 'https://ui-avatars.com/api/?name=HealthPlus&background=10b981&color=fff',
    industry: 'Health & Wellness',
    website: 'www.healthplus.com',
    email: 'marketing@healthplus.com',
    phone: '+1-555-0125',
    contactPerson: 'Dr. Emily Rodriguez',
    status: 'Negotiating',
    partnershipType: 'Bronze',
    campaigns: 2,
    totalBudget: 75000,
    description: 'Premium health and nutrition supplements for active lifestyle enthusiasts.',
    joinDate: '2023-03-10'
  },
  {
    id: 4,
    name: 'GameZone Entertainment',
    logo: 'https://ui-avatars.com/api/?name=GameZone&background=f59e0b&color=fff',
    industry: 'Gaming',
    website: 'www.gamezone.com',
    email: 'partnerships@gamezone.com',
    phone: '+1-555-0126',
    contactPerson: 'Alex Thompson',
    status: 'Active',
    partnershipType: 'Premium',
    campaigns: 8,
    totalBudget: 500000,
    description: 'Top gaming company developing mobile and console games with global reach.',
    joinDate: '2022-11-05'
  },
  {
    id: 5,
    name: 'Eco Home Products',
    logo: 'https://ui-avatars.com/api/?name=Eco+Home&background=059669&color=fff',
    industry: 'Home & Garden',
    website: 'www.ecohome.com',
    email: 'collaborate@ecohome.com',
    phone: '+1-555-0127',
    contactPerson: 'Lisa Wang',
    status: 'Pending',
    partnershipType: 'Silver',
    campaigns: 1,
    totalBudget: 80000,
    description: 'Sustainable home products and eco-friendly household solutions.',
    joinDate: '2023-04-01'
  },
  {
    id: 6,
    name: 'FitLife Athletics',
    logo: 'https://ui-avatars.com/api/?name=FitLife&background=dc2626&color=fff',
    industry: 'Sports & Fitness',
    website: 'www.fitlife.com',
    email: 'brand@fitlife.com',
    phone: '+1-555-0128',
    contactPerson: 'David Miller',
    status: 'Active',
    partnershipType: 'Gold',
    campaigns: 6,
    totalBudget: 300000,
    description: 'Athletic wear and fitness equipment for professional and amateur athletes.',
    joinDate: '2023-01-30'
  },
  {
    id: 7,
    name: 'Beauty Essentials',
    logo: 'https://ui-avatars.com/api/?name=Beauty&background=db2777&color=fff',
    industry: 'Beauty & Cosmetics',
    website: 'www.beautyessentials.com',
    email: 'partnerships@beautyessentials.com',
    phone: '+1-555-0129',
    contactPerson: 'Amanda Clarke',
    status: 'Active',
    partnershipType: 'Silver',
    campaigns: 4,
    totalBudget: 180000,
    description: 'Premium beauty and cosmetics brand with natural and organic products.',
    joinDate: '2023-03-22'
  },
  {
    id: 8,
    name: 'Auto Elite Parts',
    logo: 'https://ui-avatars.com/api/?name=Auto+Elite&background=374151&color=fff',
    industry: 'Automotive',
    website: 'www.autoelite.com',
    email: 'marketing@autoelite.com',
    phone: '+1-555-0130',
    contactPerson: 'Robert Kim',
    status: 'Negotiating',
    partnershipType: 'Bronze',
    campaigns: 2,
    totalBudget: 90000,
    description: 'High-quality automotive parts and accessories for car enthusiasts.',
    joinDate: '2023-04-15'
  }
];

const SponsorshipPage = () => {
  const [companies] = useState(companiesData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Pending': return 'warning';
      case 'Inactive': return 'error';
      case 'Negotiating': return 'info';
      default: return 'default';
    }
  };

  const getPartnershipColor = (type) => {
    switch (type) {
      case 'Premium': return '#6366f1';
      case 'Gold': return '#f59e0b';
      case 'Silver': return '#6b7280';
      case 'Bronze': return '#92400e';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
  };

  const paginatedCompanies = filteredCompanies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
          <RouterLink to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            Dashboard
          </RouterLink>
          <Typography color="text.primary">Sponsorship Management</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Sponsorship Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ bgcolor: '#6366f1', '&:hover': { bgcolor: '#4f46e5' } }}
          >
            Add Company
          </Button>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="All">All Statuses</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Negotiating">Negotiating</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Companies Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>Industry</TableCell>
                  <TableCell>Contact Person</TableCell>
                  <TableCell>Partnership Type</TableCell>
                  <TableCell>Campaigns</TableCell>
                  <TableCell>Total Budget</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCompanies.map((company) => (
                  <TableRow key={company.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={company.logo}
                          alt={company.name}
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {company.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {company.website}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{company.industry}</TableCell>
                    <TableCell>{company.contactPerson}</TableCell>
                    <TableCell>
                      <Chip
                        label={company.partnershipType}
                        sx={{
                          bgcolor: getPartnershipColor(company.partnershipType),
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      />
                    </TableCell>
                    <TableCell>{company.campaigns}</TableCell>
                    <TableCell>{formatCurrency(company.totalBudget)}</TableCell>
                    <TableCell>
                      <Chip
                        label={company.status}
                        color={getStatusColor(company.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleViewCompany(company)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredCompanies.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>

        {/* Company Details Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          {selectedCompany && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                    sx={{ width: 48, height: 48, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{selectedCompany.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedCompany.industry}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Company Information
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Description
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {selectedCompany.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Website
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {selectedCompany.website}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Join Date
                          </Typography>
                          <Typography variant="body1">
                            {new Date(selectedCompany.joinDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          <Group sx={{ mr: 1, verticalAlign: 'middle' }} />
                          Contact & Performance
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Contact Person
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {selectedCompany.contactPerson}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {selectedCompany.email}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Phone
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {selectedCompany.phone}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Campaigns
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {selectedCompany.campaigns}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Budget
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {formatCurrency(selectedCompany.totalBudget)}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
                <Button variant="contained" startIcon={<Edit />}>
                  Edit Company
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
};

export default SponsorshipPage; 

