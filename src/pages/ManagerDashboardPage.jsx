import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  DialogContentText,
  Tooltip as MuiTooltip,
} from "@mui/material";
import {
  Diamond as DiamondIcon,
  Group as FollowersIcon,
  Person as PersonIcon,
  Campaign as CampaignIcon,
  PersonAdd as PersonAddIcon,
  GroupOutlined as CreatorsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as ValidDaysIcon,
  PlayCircle as LiveIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/layout/Layout";
import { getManagerStats } from "../features/managerDashboardSlice";
import CreatorsBonusTable from "../components/CreatorsBonusTable";
import { fetchCreatorsWithBonus, selectCreatorsWithBonus, selectBonusLoading, selectBonusErrors } from '../features/bonusSlice';
import { fetchMonthlyStats, selectMonthlyStats, fetchDiamondsTrend, selectDiamondsTrend } from '../features/managerDashboardSlice';
import axiosInstance from '../api/axiosInstance';

const ManagerDashboardPage = () => {
  const { t } = useTranslation();
  
  // Modal states
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
  
  // Reset dialog state
  const [resetDialog, setResetDialog] = useState({
    open: false,
    loading: false
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const dispatch = useDispatch();
  // Form states
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    assignedCreators: "",
  });

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Live Stream",
    maxParticipants: "",
  });

  const [creatorForm, setCreatorForm] = useState({
    username: "",
    tiktokId: "",
    email: "",
    phone: "",
    followers: "",
    category: "",
    tier: "Bronze",
  });

  // Modal handlers
  const handleCampaignSubmit = () => {
    setCampaignModalOpen(false);
    setCampaignForm({
      name: "",
      description: "",
      budget: "",
      startDate: "",
      endDate: "",
      assignedCreators: "",
    });
  };

  const handleEventSubmit = () => {
    setEventModalOpen(false);
    setEventForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "Live Stream",
      maxParticipants: "",
    });
  };

  const handleCreatorSubmit = () => {
    setCreatorModalOpen(false);
    setCreatorForm({
      username: "",
      tiktokId: "",
      email: "",
      phone: "",
      followers: "",
      category: "",
      tier: "Bronze",
    });
  };

  // Reset handlers
  const handleResetClick = () => {
    setResetDialog({ open: true, loading: false });
  };

  const handleResetClose = () => {
    setResetDialog({ open: false, loading: false });
  };

  const handleResetConfirm = async () => {
    setResetDialog({ open: true, loading: true });
    
    try {
      const response = await axiosInstance.post('/users/reset-creators-data');
      
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: 'success'
      });
      
      // Refresh the data after reset
      dispatch(fetchCreatorsWithBonus());
      dispatch(fetchMonthlyStats());
      dispatch(fetchDiamondsTrend());
      
      handleResetClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || t('managerDashboard.resetError'),
        severity: 'error'
      });
      setResetDialog({ open: true, loading: false });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const { creators: managerCreators = [], stats = {} } = useSelector(
    (state) => state.managerDashboard.managerData || {}
  );

  // Redux selectors for bonus data
  const creatorsWithBonus = useSelector(selectCreatorsWithBonus);
  const bonusLoading = useSelector(selectBonusLoading);
  const bonusError = useSelector(selectBonusErrors);

  // Redux selectors for monthly stats
  const monthlyStats = useSelector(selectMonthlyStats);
  const diamondsTrend = useSelector(selectDiamondsTrend);

  React.useEffect(() => {
    dispatch(getManagerStats());
    dispatch(fetchMonthlyStats());
    dispatch(fetchDiamondsTrend());
  }, [dispatch]);

  // Helper to format delta
  const formatDelta = (current, last) => {
    const diff = current - last;
    const sign = diff > 0 ? '+' : diff < 0 ? '-' : '';
    return `${sign}${Math.abs(diff).toLocaleString()}`;
  };

  // Helper to calculate growth rate
  const calculateGrowthRate = (current, last) => {
    if (last === 0) return current > 0 ? 100 : 0;
    return ((current - last) / last) * 100;
  };

  // Prepare chart data for diamonds per month using trend data
  const chartData = diamondsTrend.months.map((month, index) => ({
    month,
    diamonds: diamondsTrend.diamonds[index] || 0,
    target: diamondsTrend.targets[index] || 0,
  }));

  // Calculate monthly stats from creatorsWithBonus
  let totalCreators = 0;
  let totalFollowers = 0;
  let totalViews = 0;
  let totalDiamonds = 0;
  if ((creatorsWithBonus || []).length > 0) {
    totalCreators = (creatorsWithBonus || []).length;
    (creatorsWithBonus || []).forEach((creator) => {
      totalFollowers += creator.profile?.followers || 0;
      totalViews += creator.profile?.views || 0;
      totalDiamonds += creator.profile?.diamonds || 0;
    });
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can adjust default value

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const paginatedCreators = managerCreators?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return num;
    }
  }

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          {/* Page Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h4" component="h1">
              {t('managerDashboard.title')}
            </Typography>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<RefreshIcon />}
              onClick={handleResetClick}
              sx={{ 
                borderColor: 'warning.main',
                color: 'warning.main',
                '&:hover': {
                  borderColor: 'warning.dark',
                  backgroundColor: 'warning.light',
                  color: 'warning.dark'
                }
              }}
            >
              {t('managerDashboard.refresh')}
            </Button>
          </Box>

          {/* Main Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('managerDashboard.stats.totalDiamonds')}
                  </Typography>
                  <Typography variant="h4">
                    {formatNumber(stats?.diamonds)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('managerDashboard.stats.totalFollowers')}
                  </Typography>
                  <Typography variant="h4">
                    {formatNumber(stats?.followers)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <MuiTooltip title={t('managerDashboard.stats.activeCreators') + ' = valid hours in the last 7 days'}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('managerDashboard.stats.activeCreators')}
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {(creatorsWithBonus || []).filter(c => c.active).length}
                    </Typography>
                  </CardContent>
                </Card>
              </MuiTooltip>
            </Grid>
          </Grid>

          {/* Monthly Performance */}
          <Typography variant="h5" sx={{ mb: 3 }}>
            {t('managerDashboard.chart.monthlyPerformance')}
          </Typography>
          {monthlyStats.loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
              <CircularProgress />
            </Box>
          ) : monthlyStats.error ? (
            <Alert severity="error">{monthlyStats.error}</Alert>
          ) : (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    bgcolor: "#e3f2fd",
                    border: "1px solid #2196f3",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <PersonIcon sx={{ color: "#2196f3", fontSize: 40, mb: 1 }} />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#2196f3", fontWeight: "bold" }}
                    >
                      {t('managerDashboard.stats.totalCreatorsThisMonth')}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: "#1976d2", fontWeight: "bold" }}
                    >
                      {monthlyStats.current.totalCreators.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1565c0", mt: 1 }}>
                      {t('managerDashboard.stats.lastMonth')}: {monthlyStats.lastMonth.totalCreators.toLocaleString()} (<span style={{color: '#2196f3'}}>{formatDelta(monthlyStats.current.totalCreators, monthlyStats.lastMonth.totalCreators)}</span>)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    bgcolor: "#e8f5e8",
                    border: "1px solid #4caf50",
                    "&:hover": { boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <FollowersIcon
                      sx={{ color: "#4caf50", fontSize: 40, mb: 1 }}
                    />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#4caf50", fontWeight: "bold" }}
                    >
                      {t('managerDashboard.stats.totalFollowersThisMonth')}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: "#388e3c", fontWeight: "bold" }}
                    >
                      {monthlyStats.current.totalFollowers.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#2e7d32", mt: 1 }}>
                      {t('managerDashboard.chart.lastMonth')}: {monthlyStats.lastMonth.totalFollowers.toLocaleString()} (<span style={{color: '#4caf50'}}>{formatDelta(monthlyStats.current.totalFollowers, monthlyStats.lastMonth.totalFollowers)}</span>)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    bgcolor: "#fff3e0",
                    border: "1px solid #ff9800",
                    "&:hover": { boxShadow: "0 4px 12px rgba(255, 152, 0, 0.3)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#ff9800",
                        fontSize: 40,
                        mb: 1,
                        fontWeight: "bold",
                      }}
                    >
                      👁️
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#ff9800", fontWeight: "bold" }}
                    >
                      {t('managerDashboard.stats.totalViewsThisMonth')}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: "#f57c00", fontWeight: "bold" }}
                    >
                      {monthlyStats.current.totalViews.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ef6c00", mt: 1 }}>
                      {t('managerDashboard.chart.lastMonth')}: {monthlyStats.lastMonth.totalViews.toLocaleString()} (<span style={{color: '#ff9800'}}>{formatDelta(monthlyStats.current.totalViews, monthlyStats.lastMonth.totalViews)}</span>)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    bgcolor: "#fce4ec",
                    border: "1px solid #e91e63",
                    "&:hover": { boxShadow: "0 4px 12px rgba(233, 30, 99, 0.3)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <DiamondIcon sx={{ color: "#e91e63", fontSize: 40, mb: 1 }} />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#e91e63", fontWeight: "bold" }}
                    >
                      {t('managerDashboard.stats.totalDiamondsThisMonth')}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ color: "#c2185b", fontWeight: "bold" }}
                    >
                      {monthlyStats.current.totalDiamonds.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ad1457", mt: 1 }}>
                      {t('managerDashboard.chart.lastMonth')}: {monthlyStats.lastMonth.totalDiamonds.toLocaleString()} (<span style={{color: '#e91e63'}}>{formatDelta(monthlyStats.current.totalDiamonds, monthlyStats.lastMonth.totalDiamonds)}</span>)
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Total Diamonds per Month Chart */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('managerDashboard.stats.totalDiamondsPerMonth')}
          </Typography>
          <Paper sx={{ p: 3, mb: 4 }}>
            {diamondsTrend.loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
              </Box>
            ) : diamondsTrend.error ? (
              <Alert severity="error">{diamondsTrend.error}</Alert>
            ) : (
              <>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#e0e0e0" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      axisLine={{ stroke: "#e0e0e0" }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value.toLocaleString()}`,
                        name === "diamonds" ? t('managerDashboard.chart.actualDiamonds') : t('managerDashboard.chart.targetDiamonds'),
                      ]}
                      labelFormatter={(label) => `${t('managerDashboard.chart.month')}: ${label}`}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "20px" }} />
                    <Line
                      type="monotone"
                      dataKey="diamonds"
                      stroke="#2196f3"
                      strokeWidth={3}
                      dot={{ fill: "#2196f3", strokeWidth: 2, r: 6 }}
                      activeDot={{
                        r: 8,
                        stroke: "#2196f3",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                      name={t('managerDashboard.chart.actualDiamonds')}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#ff9800"
                      strokeWidth={2}
                      strokeDasharray="8 8"
                      dot={{ fill: "#ff9800", strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: "#ff9800",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                      name={t('managerDashboard.chart.targetDiamonds')}
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Chart Summary */}
                <Box sx={{ mt: 2, p: 2, bgcolor: "#f8f9fa", borderRadius: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        {t('managerDashboard.chart.currentMonth')}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#2196f3" }}>
                        💎{" "}
                        {monthlyStats.current.totalDiamonds.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        {t('managerDashboard.chart.monthlyTarget')}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#ff9800" }}>
                        🎯{" "}
                        {Math.round(monthlyStats.current.totalDiamonds * 1.1).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">
                        {t('managerDashboard.chart.growthRate')}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#4caf50" }}>
                        📈 {calculateGrowthRate(monthlyStats.current.totalDiamonds, monthlyStats.lastMonth.totalDiamonds).toFixed(1)}%
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Paper>

          {/* Bonus Information */}
          <Box mt={4}>
            <CreatorsBonusTable />
          </Box>

          {/* Recent Activity */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('managerDashboard.activity.recentActivity')}
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography>{t('managerDashboard.activity.noRecentActivity')}</Typography>
          </Paper>
        </Box>

        {/* Reset Confirmation Dialog */}
        <Dialog
          open={resetDialog.open}
          onClose={handleResetClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', color: 'warning.main' }}>
            <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
            {t('managerDashboard.confirmReset')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Alert severity="warning" sx={{ mb: 2 }}>
                {t('managerDashboard.resetWarning')}
              </Alert>
              {t('managerDashboard.resetDialog.areYouSure')}
              <br /><br />
              <strong>{t('managerDashboard.resetDialog.dataWillBeReset')}</strong>
              <ul>
                <li>{t('managerDashboard.resetDialog.diamonds')}</li>
                <li>{t('managerDashboard.resetDialog.followers')}</li>
                <li>{t('managerDashboard.resetDialog.validLiveDays')}</li>
                <li>{t('managerDashboard.resetDialog.liveDuration')}</li>
                <li>{t('managerDashboard.resetDialog.liveStreams')}</li>
                <li>{t('managerDashboard.resetDialog.matches')}</li>
                <li>{t('managerDashboard.resetDialog.otherMetrics')}</li>
              </ul>
              <br />
              {t('managerDashboard.resetDialog.thisActionWillAffect', { count: (creatorsWithBonus || []).length })}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleResetClose} disabled={resetDialog.loading}>
              {t('managerDashboard.cancel')}
            </Button>
            <Button
              onClick={handleResetConfirm}
              variant="contained"
              color="warning"
              disabled={resetDialog.loading}
              startIcon={resetDialog.loading ? <RefreshIcon /> : <WarningIcon />}
            >
              {resetDialog.loading ? t('common.loading', { defaultValue: 'Loading...' }) : t('managerDashboard.confirm')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Create Campaign Modal */}
        <Dialog
          open={campaignModalOpen}
          onClose={() => setCampaignModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ bgcolor: "#4caf50", color: "white", fontWeight: "bold" }}
          >
            <CampaignIcon sx={{ mr: 1 }} />
            {t('managerDashboard.modals.createCampaign')}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.campaignName')}
                  value={campaignForm.name}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, name: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.description')}
                  multiline
                  rows={3}
                  value={campaignForm.description}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      description: e.target.value,
                    })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.budget')}
                  type="number"
                  value={campaignForm.budget}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, budget: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.assignCreators')}
                  value={campaignForm.assignedCreators}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      assignedCreators: e.target.value,
                    })
                  }
                  margin="normal"
                  placeholder={t('managerDashboard.modals.assignCreatorsPlaceholder')}
                  helperText={t('managerDashboard.modals.assignCreatorsHelper')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.startDate')}
                  type="date"
                  value={campaignForm.startDate}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      startDate: e.target.value,
                    })
                  }
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.endDate')}
                  type="date"
                  value={campaignForm.endDate}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      endDate: e.target.value,
                    })
                  }
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setCampaignModalOpen(false)} color="inherit">
              {t('managerDashboard.modals.cancel')}
            </Button>
            <Button
              onClick={handleCampaignSubmit}
              variant="contained"
              sx={{ bgcolor: "#4caf50" }}
            >
              {t('managerDashboard.modals.save')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create Event Modal */}
        <Dialog
          open={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ bgcolor: "#ff9800", color: "white", fontWeight: "bold" }}
          >
            <EventIcon sx={{ mr: 1 }} />
            {t('managerDashboard.modals.createEvent')}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.eventTitle')}
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, title: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.description')}
                  multiline
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.date')}
                  type="date"
                  value={eventForm.date}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, date: e.target.value })
                  }
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.time')}
                  type="time"
                  value={eventForm.time}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, time: e.target.value })
                  }
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.location')}
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  margin="normal"
                  placeholder={t('managerDashboard.modals.location') + ' e.g., Online, Studio A, etc.'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>{t('managerDashboard.modals.eventType')}</InputLabel>
                  <Select
                    value={eventForm.type}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, type: e.target.value })
                    }
                    label={t('managerDashboard.modals.eventType')}
                  >
                    <MenuItem value="Live Stream">{t('managerDashboard.eventTypes.liveStream')}</MenuItem>
                    <MenuItem value="Workshop">{t('managerDashboard.eventTypes.workshop')}</MenuItem>
                    <MenuItem value="Meet & Greet">{t('managerDashboard.eventTypes.meetGreet')}</MenuItem>
                    <MenuItem value="Training">{t('managerDashboard.eventTypes.training')}</MenuItem>
                    <MenuItem value="Contest">{t('managerDashboard.eventTypes.contest')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.maxParticipants')}
                  type="number"
                  value={eventForm.maxParticipants}
                  // min 0 max 4
                  onInput={(e) => {
                    if (e.target.value < 0) {
                      e.target.value = 0;
                    } else if (e.target.value > 4) {
                      e.target.value = 4;
                    }
                  }}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      maxParticipants: e.target.value,
                    })
                  }
                  margin="normal"
                  placeholder={t('managerDashboard.modals.maxParticipantsPlaceholder')}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setEventModalOpen(false)} color="inherit">
              {t('managerDashboard.modals.cancel')}
            </Button>
            <Button
              onClick={handleEventSubmit}
              variant="contained"
              sx={{ bgcolor: "#ff9800" }}
            >
              {t('managerDashboard.modals.save')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Creator Modal */}
        <Dialog
          open={creatorModalOpen}
          onClose={() => setCreatorModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{ bgcolor: "#9c27b0", color: "white", fontWeight: "bold" }}
          >
            <PersonAddIcon sx={{ mr: 1 }} />
            {t('managerDashboard.modals.createCreator')}
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.username')}
                  value={creatorForm.username}
                  onChange={(e) =>
                    setCreatorForm({ ...creatorForm, username: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.tiktokId')}
                  value={creatorForm.tiktokId}
                  onChange={(e) =>
                    setCreatorForm({ ...creatorForm, tiktokId: e.target.value })
                  }
                  margin="normal"
                  placeholder="@username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.email')}
                  type="email"
                  value={creatorForm.email}
                  onChange={(e) =>
                    setCreatorForm({ ...creatorForm, email: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.phone')}
                  value={creatorForm.phone}
                  onChange={(e) =>
                    setCreatorForm({ ...creatorForm, phone: e.target.value })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.followersCount')}
                  type="number"
                  value={creatorForm.followers}
                  onChange={(e) =>
                    setCreatorForm({
                      ...creatorForm,
                      followers: e.target.value,
                    })
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('managerDashboard.modals.contentCategory')}
                  value={creatorForm.category}
                  onChange={(e) =>
                    setCreatorForm({ ...creatorForm, category: e.target.value })
                  }
                  margin="normal"
                  placeholder="e.g., Dance, Comedy, Fashion"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>{t('managerDashboard.modals.creatorTier')}</InputLabel>
                  <Select
                    value={creatorForm.tier}
                    onChange={(e) =>
                      setCreatorForm({ ...creatorForm, tier: e.target.value })
                    }
                    label={t('managerDashboard.modals.creatorTier')}
                  >
                    <MenuItem value="Bronze">{t('managerDashboard.tiers.bronze')}</MenuItem>
                    <MenuItem value="Silver">{t('managerDashboard.tiers.silver')}</MenuItem>
                    <MenuItem value="Gold">{t('managerDashboard.tiers.gold')}</MenuItem>
                    <MenuItem value="Platinum">{t('managerDashboard.tiers.platinum')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setCreatorModalOpen(false)} color="inherit">
              {t('managerDashboard.modals.cancel')}
            </Button>
            <Button
              onClick={handleCreatorSubmit}
              variant="contained"
              sx={{ bgcolor: "#9c27b0" }}
            >
              {t('managerDashboard.modals.save')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default ManagerDashboardPage;
