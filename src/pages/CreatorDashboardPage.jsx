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
import Profile from "./profile";
import moment from "moment";

const CreatorDashboardPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
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
                      {moment(creator?.joinedDate).format("MMM D, YYYY h:mm A")}
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
                    {creator?.manager?.agency?.name}

                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Person sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      Manager: {creator?.manager?.username}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Email sx={{ mr: 1, color: "#1976d2" }} />
                    <Typography variant="body1">
                      {creator?.manager?.email}
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
