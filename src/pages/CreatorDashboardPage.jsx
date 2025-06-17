import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
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
  MenuItem,
  useMediaQuery,
  useTheme,
  Stack,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Diamond,
  Videocam,
  Today,
  AttachMoney,
  Error,
  Person,
  Email,
  Phone,
  CalendarToday,
  TrendingUp,
  Star,
  Business,
  Report as ReportIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ticketsAPI } from "../services/api";
import { useNotifications } from "../contexts/NotificationContext";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getCreatorProfile } from "../features/creatorDashboardSlice";
import moment from "moment";

// Agency bonus calculation rules
const agencyBonusRules = {
  bronze: { minValidDays: 15, minHours: 30, rate: 0.03, baseBonus: 200 },
  silver: { minValidDays: 20, minHours: 50, rate: 0.04, baseBonus: 400 },
  gold: { minValidDays: 25, minHours: 70, rate: 0.05, baseBonus: 600 },
  platinum: { minValidDays: 30, minHours: 100, rate: 0.06, baseBonus: 800 },
};

// Bonus calculation functions
const calculateAgencyBonus = (creator) => {
  if (!creator) return { amount: 0, tier: "none", qualified: false };

  const validDays = creator?.validLiveDays || 0;
  const hours = creator?.liveDuration || 0;
  const diamonds = creator?.diamondsLastMonth || 0;
  const tier = creator?.contractDetails?.tier?.toLowerCase() || "bronze";

  const rules = agencyBonusRules[tier] || agencyBonusRules.bronze;

  const meetsRequirements =
    validDays >= rules.minValidDays && hours >= rules.minHours;

  if (!meetsRequirements) {
    return { amount: 0, tier, qualified: false, requirements: rules };
  }

  // Calculate bonus: base bonus + percentage of diamonds
  const diamondBonus = diamonds * rules.rate;
  const totalAgencyBonus = rules.baseBonus + diamondBonus;

  return {
    amount: Math.round(totalAgencyBonus),
    tier,
    qualified: true,
    requirements: rules,
    breakdown: {
      baseBonus: rules.baseBonus,
      diamondBonus: Math.round(diamondBonus),
      diamonds: diamonds,
    },
  };
};

const importantMessages = [
  {
    id: "1",
    title: "New Match Opportunity",
    content: "There's a new match opportunity for you next weekend!",
  },
  {
    id: "2",
    title: "Bonus Achieved",
    content: "Congratulations! You reached your monthly diamond goal.",
  },
  {
    id: "3",
    title: "Contract Update",
    content: "Your contract has been reviewed. Check the updated terms.",
  },
];

// Agency details structure
const agencyDetails = {
  name: "TikPulse Digital Agency",
  id: "TDA-001",
  managerName: "Sarah Johnson",
  joinDate: new Date(2023, 0, 15),
  region: "Europe",
  supportEmail: "support@tikpulse.agency",
  description:
    "Leading digital talent agency specializing in TikTok creators and brand partnerships",
};

const CreatorDashboardPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const [sponsorships, setSponsorships] = useState([]);
  const [agencyBonus, setAgencyBonus] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reportData, setReportData] = useState({
    title: "",
    description: "",
    category: "technical",
  });
  const { addNotification } = useNotifications();
  const { loading: isLoading, creator } = useSelector(
    (state) => state.creatorDashboard
  );

  console.log("creatorData", creator);

  useEffect(() => {
    const fetchCreatorData = async () => {
      try {
        await dispatch(getCreatorProfile());
      } catch (error) {
        console.error("Error fetching creator data:", error);
      }
    };

    if (user?._id || user?.id) {
      fetchCreatorData();
    } else {
      // If no user ID, still show demo data
      const mockCreator = {
        username: "Demo Creator",
        tikTokId: "@demo_creator",
        email: "demo@example.com",
        phone: "+1 (555) 123-4567",
        followers: 125000,
        videos: 45,
        views: 2450000,
        daysSinceJoining: 120,
        diamonds: 15750,
        validLiveDays: 25,
        liveDuration: 85,
        diamondsLastMonth: 8500,
        contractDetails: {
          tier: "Gold",
          rate: 0.04,
          monthlyDiamondGoal: 10000,
        },
        joinedDate: new Date(2023, 5, 15),
      };
    }
  }, [user?._id, user?.id, user?.name, user?.email]);

  const handleReportDialogOpen = () => {
    setReportDialogOpen(true);
  };

  const handleReportDialogClose = () => {
    setReportDialogOpen(false);
    setReportData({
      title: "",
      description: "",
      category: "technical",
    });
  };

  const handleReportInputChange = (field) => (event) => {
    setReportData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleReportSubmit = async () => {
    setSubmitLoading(true);
    try {
      // In a real app, this would submit to an API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addNotification({
        type: "success",
        message: "Report submitted successfully",
      });

      handleReportDialogClose();
    } catch (error) {
      addNotification({
        type: "error",
        message: "Error submitting report",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl">
        <Box
          sx={{
            my: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (!creator) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Creator data not found
          </Typography>
        </Box>
      </Container>
    );
  }

  const activeSponsorships = sponsorships.filter((s) => s.status === "active");

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Creator Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome back, {creator?.username}! Here&apos;s your performance
                overview.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ReportIcon />}
              onClick={handleReportDialogOpen}
              sx={{ textTransform: "none" }}
            >
              Report Issue
            </Button>
          </Box>

          {/* Creator Info Card */}
          <Card
            sx={{
              mb: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: "rgba(255,255,255,0.2)",
                      }}
                    >
                      <Person sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {creator?.username}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {creator?.tikTokId}
                      </Typography>
                      <Chip
                        label={creator?.profile?.graduationStatus || undefined}
                        size="small"
                        sx={{
                          mt: 1,
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Followers
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {creator?.profile?.followers ?? 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Videos
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {creator?.profile?.videos ?? 0}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Total Views
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {creator?.profile?.views}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Days Active
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {creator?.profile?.daysSinceJoining ?? 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", bgcolor: "#e3f2fd" }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Diamond sx={{ fontSize: 40, color: "#1976d2", mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ color: "#1976d2", fontWeight: "bold" }}
                  >
                    {creator?.profile?.diamonds}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Diamonds
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", bgcolor: "#f3e5f5" }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Videocam sx={{ fontSize: 40, color: "#9c27b0", mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ color: "#9c27b0", fontWeight: "bold" }}
                  >
                    {creator?.profile?.validLiveDays}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Valid Live Days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", bgcolor: "#e8f5e8" }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Today sx={{ fontSize: 40, color: "#4caf50", mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ color: "#4caf50", fontWeight: "bold" }}
                  >
                    {creator?.profile?.liveDuration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Live Duration
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: "100%", bgcolor: "#fff3e0" }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <AttachMoney sx={{ fontSize: 40, color: "#ff9800", mb: 1 }} />
                  <Typography
                    variant="h4"
                    sx={{ color: "#ff9800", fontWeight: "bold" }}
                  >
                    €{agencyBonus?.amount ?? 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Bonus
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Agency Bonus Details */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                💎 Agency Bonus Program
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Current Status
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Chip
                      label={`${creator?.contractDetails?.tier ?? ""} Tier`}
                      color="primary"
                      variant="filled"
                    />
                    <Chip
                      label={
                        agencyBonus?.qualified ? "Qualified" : "Not Qualified"
                      }
                      color={agencyBonus?.qualified ? "success" : "error"}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Monthly Goal:</strong>{" "}
                    {creator?.contractDetails?.monthlyDiamondGoal ?? 0} diamonds
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Current Rate:</strong>{" "}
                    {(creator?.contractDetails?.rate * 100)?.toFixed?.(2) ??
                      "0.00"}
                    % per diamond
                  </Typography>
                  <Typography variant="body1">
                    <strong>Projected Bonus:</strong> €
                    {agencyBonus?.amount ?? 0}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Requirements Progress
                  </Typography>
                  <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Valid Live Days: {creator?.profile?.validLiveDays ?? 0}/
                      {agencyBonus?.requirements?.minValidDays ?? 20}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Live Hours: {creator?.liveDuration ?? 0}h/
                      {agencyBonus?.requirements?.minHours ?? 50}h
                    </Typography>
                    <Typography variant="body2">
                      Diamonds This Month: {creator?.diamondsLastMonth ?? 0}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Sponsorship Earnings */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                🤝 Sponsorship Earnings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#e8f5e8",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#4caf50", fontWeight: "bold" }}
                    >
                      €
                      {activeSponsorships.reduce(
                        (total, sponsor) => total + sponsor.amount,
                        0
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Earnings
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#f3e5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#9c27b0", fontWeight: "bold" }}
                    >
                      {activeSponsorships.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Sponsorships
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: "#fff3e0",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ color: "#ff9800", fontWeight: "bold" }}
                    >
                      {
                        sponsorships.filter((s) => s.status === "pending")
                          .length
                      }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Contact & Support */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                📞 Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Creator Details
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Email sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      {creator?.email ?? ""}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Phone sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      {creator?.phone ?? ""}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarToday sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      Joined{" "}
                      {moment(creator?.joinedDate).format(
                        "MMM D, YYYY h:mm A"
                      )}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Agency Support
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Business sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      {agencyDetails.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Person sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      Manager: {agencyDetails.managerName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Email sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      {agencyDetails.supportEmail}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    component={Link}
                    to="/creator-profile"
                    variant="outlined"
                    fullWidth
                    sx={{ py: 1.5, textTransform: "none" }}
                  >
                    View Profile
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    component={Link}
                    to="/creator-analytics"
                    variant="outlined"
                    fullWidth
                    sx={{ py: 1.5, textTransform: "none" }}
                  >
                    Analytics
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    component={Link}
                    to="/creator-messages"
                    variant="outlined"
                    fullWidth
                    sx={{ py: 1.5, textTransform: "none" }}
                  >
                    Messages
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Report Issue Dialog */}
          <Dialog
            open={reportDialogOpen}
            onClose={handleReportDialogClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 1 }}>
                <TextField
                  select
                  fullWidth
                  label="Issue Category"
                  value={reportData.category}
                  onChange={handleReportInputChange("category")}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="technical">Technical Issue</MenuItem>
                  <MenuItem value="payment">Payment Issue</MenuItem>
                  <MenuItem value="contract">Contract Issue</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Issue Title"
                  value={reportData.title}
                  onChange={handleReportInputChange("title")}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={reportData.description}
                  onChange={handleReportInputChange("description")}
                  placeholder="Please describe the issue in detail..."
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReportDialogClose}>Cancel</Button>
              <Button
                onClick={handleReportSubmit}
                variant="contained"
                disabled={!reportData.title || submitLoading}
              >
                {submitLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  "Submit Report"
                )}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Layout>
  );
};

export default CreatorDashboardPage;
