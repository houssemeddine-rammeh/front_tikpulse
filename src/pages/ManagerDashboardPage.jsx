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
} from "@mui/icons-material";
import { useSelector } from "react-redux";
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
import { useDispatch } from "react-redux";
import { getManagerStats } from "../features/managerDashboardSlice";

const ManagerDashboardPage = () => {
  // Modal states
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);
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

  // Creators data
  const creators = [
    {
      id: 1,
      name: "Emma Chen",
      followers: 800000,
      diamonds: 45000,
      status: "active",
    },
    {
      id: 2,
      name: "Liam Wong",
      followers: 750000,
      diamonds: 38000,
      status: "active",
    },
    {
      id: 3,
      name: "Sophia Kim",
      followers: 1200000,
      diamonds: 52000,
      status: "active",
    },
    {
      id: 4,
      name: "Noah Park",
      followers: 650000,
      diamonds: 31000,
      status: "inactive",
    },
    {
      id: 5,
      name: "Olivia Liu",
      followers: 900000,
      diamonds: 41000,
      status: "active",
    },
  ];

  // Diamonds data per month for the chart
  const diamondsData = [
    { month: "Jan", diamonds: 180000, target: 200000 },
    { month: "Feb", diamonds: 195000, target: 200000 },
    { month: "Mar", diamonds: 210000, target: 200000 },
    { month: "Apr", diamonds: 198000, target: 200000 },
    { month: "May", diamonds: 225000, target: 220000 },
    { month: "Jun", diamonds: 240000, target: 220000 },
    { month: "Jul", diamonds: 255000, target: 240000 },
    { month: "Aug", diamonds: 270000, target: 240000 },
    { month: "Sep", diamonds: 285000, target: 260000 },
    { month: "Oct", diamonds: 295000, target: 260000 },
    { month: "Nov", diamonds: 310000, target: 280000 },
    { month: "Dec", diamonds: 325000, target: 280000 },
  ];

  // Statistics
  const totalDiamonds = creators.reduce(
    (sum, creator) => sum + creator.diamonds,
    0
  );
  const totalFollowers = creators.reduce(
    (sum, creator) => sum + creator.followers,
    0
  );
  const activeCreators = creators.filter(
    (creator) => creator.status === "active"
  ).length;

  // Monthly statistics
  const monthlyStats = {
    creatorsLastMonth: 12,
    followersLastMonth: 850000,
    viewsLastMonth: 45200000,
    diamondsThisMonth: 285000,
  };

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
  const { creators: managerCreators = [], stats = {} } = useSelector(
    (state) => state.managerDashboard.managerData || {}
  );

  React.useEffect(() => {
    dispatch(getManagerStats());
  }, [dispatch]);

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
              Manager Dashboard
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CreatorsIcon sx={{ fontSize: 40, color: "#2e7d32" }} />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total Creators
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {managerCreators?.length || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <LiveIcon sx={{ fontSize: 40 }} />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total Live duration
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {stats?.liveDuration || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ValidDaysIcon sx={{ fontSize: 40, color: "#0288d1" }} />
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#0288d1" }}
                      >
                        Valid Days ({">"}1h)
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                    {stats?.validLiveDays || 0} Days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Main Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Diamonds
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
                    Total Followers
                  </Typography>
                  <Typography variant="h4">
                    {formatNumber(stats?.followers)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Active Creators
                  </Typography>
                  <Typography variant="h4">{stats?.activeCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Monthly Performance */}
          <Typography variant="h5" sx={{ mb: 3 }}>
            Monthly Performance
          </Typography>
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
                    Total Creators from Last Month
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: "#1976d2", fontWeight: "bold" }}
                  >
                    ----
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#1565c0", mt: 1 }}>
                    Active creators last month
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
                    Total Followers from Last Month
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: "#388e3c", fontWeight: "bold" }}
                  >
                    ---
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#2e7d32", mt: 1 }}>
                    Followers gained last month
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
                    Total Views from Last Month
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: "#f57c00", fontWeight: "bold" }}
                  >
                    ----
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ef6c00", mt: 1 }}>
                    Total Valid days form last month
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
                    Total Diamonds from last Month
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ color: "#c2185b", fontWeight: "bold" }}
                  >
                    ----
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#ad1457", mt: 1 }}>
                    Diamonds collected this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Total Diamonds per Month Chart */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Total Diamonds per Month
          </Typography>
          <Paper sx={{ p: 3, mb: 4 }}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={diamondsData}
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
                    name === "diamonds" ? "Actual Diamonds" : "Target Diamonds",
                  ]}
                  labelFormatter={(label) => `Month: ${label}`}
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
                  name="Actual Diamonds"
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
                  name="Target Diamonds"
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Chart Summary */}
            <Box sx={{ mt: 2, p: 2, bgcolor: "#f8f9fa", borderRadius: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Current Month
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#2196f3" }}>
                    💎{" "}
                    {diamondsData[
                      diamondsData.length - 1
                    ].diamonds.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Target
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#ff9800" }}>
                    🎯{" "}
                    {diamondsData[
                      diamondsData.length - 1
                    ].target.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="body2" color="text.secondary">
                    Growth Rate
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#4caf50" }}>
                    📈 +8.5%
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Creators Table */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            My Creators
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Followers</TableCell>
                  <TableCell>Diamonds</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCreators?.map((creator) => (
                  <TableRow key={creator?._id}>
                    <TableCell>{creator.name}</TableCell>
                    <TableCell>{creator.username}</TableCell>
                    <TableCell>{creator?.profile?.followers || 0}</TableCell>
                    <TableCell>{creator?.profile?.diamonds || 0}</TableCell>
                    <TableCell>
                      {creator?.isActive ? (
                        <span style={{ color: "green" }}>Active</span>
                      ) : (
                        <span style={{ color: "red" }}>Inactive</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={managerCreators?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />

          {/* Recent Activity */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            Recent Activity
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography>No recent activity to display.</Typography>
          </Paper>
        </Box>

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
            Create New Campaign
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Campaign Name"
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
                  label="Description"
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
                  label="Budget ($)"
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
                  label="Assign Creators"
                  value={campaignForm.assignedCreators}
                  onChange={(e) =>
                    setCampaignForm({
                      ...campaignForm,
                      assignedCreators: e.target.value,
                    })
                  }
                  margin="normal"
                  placeholder="e.g., Emma Chen, Liam Wong, Sophia Kim"
                  helperText="Enter creator names separated by commas"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
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
                  label="End Date"
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
              Cancel
            </Button>
            <Button
              onClick={handleCampaignSubmit}
              variant="contained"
              sx={{ bgcolor: "#4caf50" }}
            >
              Create Campaign
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
            Create New Event
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
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
                  label="Description"
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
                  label="Date"
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
                  label="Time"
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
                  label="Location"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, location: e.target.value })
                  }
                  margin="normal"
                  placeholder="e.g., Online, Studio A, etc."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={eventForm.type}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, type: e.target.value })
                    }
                    label="Event Type"
                  >
                    <MenuItem value="Live Stream">Live Stream</MenuItem>
                    <MenuItem value="Workshop">Workshop</MenuItem>
                    <MenuItem value="Meet & Greet">Meet & Greet</MenuItem>
                    <MenuItem value="Training">Training</MenuItem>
                    <MenuItem value="Contest">Contest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Max Participants"
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
                  placeholder="Leave empty for unlimited"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setEventModalOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleEventSubmit}
              variant="contained"
              sx={{ bgcolor: "#ff9800" }}
            >
              Create Event
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
            Add New Creator
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
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
                  label="TikTok ID"
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
                  label="Email"
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
                  label="Phone"
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
                  label="Followers Count"
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
                  label="Content Category"
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
                  <InputLabel>Creator Tier</InputLabel>
                  <Select
                    value={creatorForm.tier}
                    onChange={(e) =>
                      setCreatorForm({ ...creatorForm, tier: e.target.value })
                    }
                    label="Creator Tier"
                  >
                    <MenuItem value="Bronze">Bronze</MenuItem>
                    <MenuItem value="Silver">Silver</MenuItem>
                    <MenuItem value="Gold">Gold</MenuItem>
                    <MenuItem value="Platinum">Platinum</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setCreatorModalOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleCreatorSubmit}
              variant="contained"
              sx={{ bgcolor: "#9c27b0" }}
            >
              Add Creator
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default ManagerDashboardPage;
