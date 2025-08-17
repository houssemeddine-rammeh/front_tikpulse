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
  FormControl,
  InputLabel,
  Select,
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
import BonusRules from '../components/BonusRules';
import CreatorBonusCard from '../components/CreatorBonusCard';
import { createTicket } from '../features/ticketsSlice';
import { useTranslation } from "react-i18next";

const CreatorDashboardPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [sponsorships, setSponsorships] = useState([]);
  const [agencyBonus, setAgencyBonus] = useState(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [reportData, setReportData] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  });
  const [reportError, setReportError] = useState("");
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
      subject: "",
      description: "",
      category: "general",
      priority: "medium",
    });
    setReportError("");
  };

  const handleReportInputChange = (field) => (event) => {
    setReportData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleReportSubmit = async () => {
    if (!reportData.subject || !reportData.description) {
      setReportError(t('creatorDashboard.subjectDescriptionRequired'));
      return;
    }
    setSubmitLoading(true);
    setReportError("");
    try {
      const newTicketPayload = {
        title: reportData.subject,
        description: reportData.description,
        category: reportData.category,
        priority: reportData.priority,
      };
      await dispatch(createTicket(newTicketPayload)).unwrap();
      setReportDialogOpen(false);
      setReportData({
        subject: "",
        description: "",
        category: "general",
        priority: "medium",
      });
      addNotification({
        type: "success",
        message: t('creatorDashboard.ticketCreatedSuccess'),
      });
    } catch (error) {
      setReportError(error?.message || t('creatorDashboard.ticketCreatedFailed'));
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
            {t('creatorDashboard.creatorDataNotFound')}
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
                {t('creatorDashboard.title')}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('creatorDashboard.welcome', { username: creator?.username })}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ReportIcon />}
              onClick={handleReportDialogOpen}
              sx={{ textTransform: "none" }}
            >
              {t('creatorDashboard.reportIssue')}
            </Button>
          </Box>

          {/* Bonus Rules and My Bonus */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <BonusRules />
            </Grid>
            <Grid item xs={12} md={6}>
              <CreatorBonusCard tikTokId={creator?.tikTokId || creator?.tikTokID || creator?.tiktokId || creator?.tiktokID || creator?.id} />
            </Grid>
          </Grid>

          {/* Agency Bonus Details */}
    

          {/* Sponsorship Earnings */}
     

          {/* Contact & Support */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#1976d2", fontWeight: "bold" }}
              >
                {t('creatorDashboard.contactInformation')}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    {t('creatorDashboard.creatorDetails')}
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
                      {t('creatorDashboard.joined')}{" "}
                      {moment(creator?.joinedDate).format("MMM D, YYYY h:mm A")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    {t('creatorDashboard.agencySupport')}
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
                      {t('creatorDashboard.manager')} {creator?.manager?.username}
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
   

          {/* Report an Issue Dialog */}
          <Dialog
            open={reportDialogOpen}
            onClose={handleReportDialogClose}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>{t('creatorDashboard.createTicketTitle')}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label={t('creatorDashboard.subject')}
                fullWidth
                variant="outlined"
                value={reportData.subject}
                onChange={handleReportInputChange("subject")}
              />
              <TextField
                margin="dense"
                label={t('creatorDashboard.description')}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={reportData.description}
                onChange={handleReportInputChange("description")}
              />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('creatorDashboard.category')}</InputLabel>
                    <Select
                      value={reportData.category}
                      onChange={handleReportInputChange("category")}
                      label={t('creatorDashboard.category')}
                    >
                      <MenuItem value="general">{t('creatorDashboard.categories.general')}</MenuItem>
                      <MenuItem value="match_planning">{t('creatorDashboard.categories.matchPlanning')}</MenuItem>
                      <MenuItem value="bug_report">{t('creatorDashboard.categories.bugReport')}</MenuItem>
                      <MenuItem value="ban_report">{t('creatorDashboard.categories.banReport')}</MenuItem>
                      <MenuItem value="departure_request">{t('creatorDashboard.categories.departureRequest')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>{t('creatorDashboard.priority')}</InputLabel>
                    <Select
                      value={reportData.priority}
                      onChange={handleReportInputChange("priority")}
                      label={t('creatorDashboard.priority')}
                    >
                      <MenuItem value="low">{t('creatorDashboard.priorities.low')}</MenuItem>
                      <MenuItem value="medium">{t('creatorDashboard.priorities.medium')}</MenuItem>
                      <MenuItem value="high">{t('creatorDashboard.priorities.high')}</MenuItem>
                      <MenuItem value="urgent">{t('creatorDashboard.priorities.urgent')}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              {reportError && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {reportError}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleReportDialogClose} disabled={submitLoading}>
                {t('creatorDashboard.cancel')}
              </Button>
              <Button
                onClick={handleReportSubmit}
                variant="contained"
                disabled={
                  !reportData.subject ||
                  !reportData.description ||
                  !reportData.category ||
                  !reportData.priority ||
                  submitLoading
                }
              >
                {submitLoading ? t('creatorDashboard.submitting') : t('creatorDashboard.createTicket')}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Layout>
  );
};

export default CreatorDashboardPage;
