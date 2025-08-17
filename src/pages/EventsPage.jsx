// EventsPage component with react-i18next integration
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Add as AddIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon,
  CalendarMonth as CalendarIcon,
  ViewList as ListIcon,
  EmojiEvents as TrophyIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import EventForm from "../components/EventForm/EventForm";
import EventCalendar from "../components/calendar/EventCalendar";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import {
  createEvent,
  getEvents,
  getUsersEvents,
} from "../features/eventsSlice";
import moment from "moment";
import { useNotifications } from "../contexts/NotificationContext";
import { useTranslation } from "react-i18next";

const EventsPage = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(null);
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { events, loading, partcipants } = useSelector((state) => state.events);

  const fetchEvents = async () => {
    try {
      await dispatch(getEvents());
      if (user?.role === "manager") {
        await dispatch(getUsersEvents());
      }
      if (user?.role === "creator") {
        console.log("📅 Fetching events for creator:", user.username);
      }
    } catch (err) {
      console.error("❌ Error fetching events:", err);
      setError(t('events.failedToFetch'));
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
  };

  const closeDialogs = () => {
    setOpenCreateDialog(false);
    setOpenEventDialog(false);
    setSelectedEvent(null);
  };

  const handleEventCreated = async (data) => {
    console.log("📅 Creating or updating event:", data);
    try {
      await dispatch(createEvent(data));
      console.log("✅ Event created/updated successfully");
      closeDialogs();
      
      if (user?.role === "manager") {
        console.log("📅 Manager created event, notifying all users...");
        localStorage.setItem('new_event_notification', Date.now().toString());
        setTimeout(() => localStorage.removeItem('new_event_notification'), 2000);
      }
      
      await fetchEvents();
    } catch (err) {
      console.error("❌ Error creating/updating event:", err);
      setError(t('events.failedToCreate'));
    }
  };

  const handleEventSelect = (event) => {
    console.log("📅 Event selected from calendar:", event);
    setSelectedEvent(event);
    setOpenEventDialog(true);
  };

  const handleSlotSelect = (slotInfo) => {
    console.log("📅 Calendar slot selected:", slotInfo);

    const existingEvent = events.find(
      (event) =>
        new Date(event.start).getTime() ===
          new Date(slotInfo.start).getTime() &&
        new Date(event.end).getTime() === new Date(slotInfo.end).getTime()
    );

    if (existingEvent) {
      setSelectedEvent(existingEvent);
      setOpenEventDialog(true);
    } else {
      if (user?.role === "manager") {
        setSelectedEvent({
          start: slotInfo.start,
          end: slotInfo.end,
        });
        setOpenCreateDialog(true);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [dispatch]);

  // Real-time event updates for creators
  useEffect(() => {
    if (user?.role === "creator") {
      const handleEventCreated = () => {
        console.log("📅 New event detected, refreshing for creator...");
        fetchEvents();
        
        addNotification({
          title: t('events.newEventAvailable'),
          message: t('events.newEventMessage'),
          type: "info",
          link: "/events"
        });
      };

      const handleStorageChange = (e) => {
        if (e.key === 'new_event_notification') {
          handleEventCreated();
        }
      };

      const checkForNewEvents = () => {
        const newEventFlag = localStorage.getItem('new_event_notification');
        if (newEventFlag) {
          console.log('📅 New event flag detected for creator...');
          localStorage.removeItem('new_event_notification');
          handleEventCreated();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      const interval = setInterval(checkForNewEvents, 1000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [user, addNotification, t]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "primary";
      case "active":
        return "success";
      case "completed":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "tournament":
        return <TrophyIcon />;
      case "challenge":
        return <FlagIcon />;
      case "meeting":
        return <EventIcon />;
      case "match":
        return <EventIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventTypeColor = (type) => {
    const typeMap = {
      "live stream": "#FF6347",
      "workshop": "#8A2BE2",
      "meet & greet": "#FF69B4",
      "training": "#00CED1",
      "contest": "#FFD700",
      "tournament": "#FFD700",
      "challenge": "#FF4500",
      "meeting": "#1E90FF",
      "match": "#32CD32",
    };
    
    return typeMap[type?.toLowerCase()] || "#1976d2";
  };

  const translateEventType = (type) => {
    const typeTranslations = {
      'tournament': t('events.types.tournament'),
      'challenge': t('events.types.challenge'),
      'meeting': t('events.types.meeting'),
      'match': t('events.types.match'),
      'live stream': t('events.types.liveStream'),
      'workshop': t('events.types.workshop'),
      'meet & greet': t('events.types.meetGreet'),
      'training': t('events.types.training'),
      'contest': t('events.types.contest'),
    };
    
    return typeTranslations[type?.toLowerCase()] || type;
  };

  const translateStatus = (status) => {
    const statusTranslations = {
      'scheduled': t('events.statuses.scheduled'),
      'active': t('events.statuses.active'),
      'completed': t('events.statuses.completed'),
      'cancelled': t('events.statuses.cancelled'),
    };
    
    return statusTranslations[status?.toLowerCase()] || status;
  };

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {t('events.pageTitle')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {t('events.pageSubtitle')}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              size="small"
            >
              <ToggleButton value="calendar">
                <CalendarIcon sx={{ mr: 1 }} />
                {t('events.calendar')}
              </ToggleButton>
              <ToggleButton value="list">
                <ListIcon sx={{ mr: 1 }} />
                {t('events.list')}
              </ToggleButton>
            </ToggleButtonGroup>

            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              color="primary"
              title={t('events.refresh')}
            >
              <RefreshIcon />
            </IconButton>
            {user?.role === "manager" && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenCreateDialog(true)}
                size="large"
              >
                {t('events.createEvent')}
              </Button>
            )}
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* View Content */}
        {viewMode === "calendar" ? (
          <EventCalendar
            loading={loading}
            events={events}
            onEventSelect={handleEventSelect}
            onEventCreate={handleSlotSelect}
            userRole={user?.role}
          />
        ) : /* List View */
        events.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <EventIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {t('events.noEvents')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {t('events.noEventsDescription')}
            </Typography>
            {user?.role === "manager" && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenCreateDialog(true)}
              >
                {t('events.createFirstEvent')}
              </Button>
            )}
          </Box>
        ) : (
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} md={6} lg={4} key={event._id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => handleEventSelect(event)}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {getEventTypeIcon(event.type)}
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ flexGrow: 1 }}
                        >
                          {event.title}
                        </Typography>
                      </Box>
                      <Chip
                        label={translateEventType(event.type)}
                        size="small"
                        sx={{
                          backgroundColor: getEventTypeColor(event.type),
                          color: "white",
                        }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {event.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <TimeIcon
                        sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {moment(event.start).format("MMM D, YYYY h:mm A")}
                      </Typography>
                    </Box>

                    {event.location && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocationIcon
                          sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                    )}

                    {event?.participants?.length > 0 && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {t('events.participants')}:{" "}
                          {event.participants.map((p) => p.username).join(", ")}
                        </Typography>
                      </Box>
                    )}

                    {event.prize && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <TrophyIcon
                          sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {t('events.prize')}: {event.prize}
                        </Typography>
                      </Box>
                    )}

                    <Chip
                      label={translateStatus(event.status)}
                      size="small"
                      color={getStatusColor(event.status)}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Event Details Dialog */}
        <Dialog
          open={openEventDialog}
          onClose={() => setOpenEventDialog(false)}
          maxWidth="md"
          fullWidth
        >
          {selectedEvent && (
            <>
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {selectedEvent.title}
                <Chip
                  label={translateEventType(selectedEvent.type)}
                  size="small"
                  sx={{
                    backgroundColor: getEventTypeColor(selectedEvent.type),
                    color: "white",
                  }}
                />
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1" paragraph>
                  {selectedEvent.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    📅 {t('events.dateTime')}
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(selectedEvent.start)}
                    {selectedEvent.end && ` - ${formatDate(selectedEvent.end)}`}
                  </Typography>
                </Box>

                {selectedEvent.location && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      📍 {t('events.location')}
                    </Typography>
                    <Typography variant="body2">
                      {selectedEvent.location}
                    </Typography>
                  </Box>
                )}

                {selectedEvent.prize && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      🏆 {t('events.prize')}
                    </Typography>
                    <Typography variant="body2">
                      {selectedEvent.prize}
                    </Typography>
                  </Box>
                )}

                {selectedEvent.participants &&
                  selectedEvent.participants.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        👥 {t('events.participants')}
                      </Typography>
                      <Typography variant="body2">
                        {selectedEvent.participants
                          .map((p) => p.username)
                          .join(", ")}
                      </Typography>
                    </Box>
                  )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    📊 {t('events.status')}
                  </Typography>
                  <Chip
                    label={translateStatus(selectedEvent.status)}
                    size="small"
                    color={getStatusColor(selectedEvent.status)}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEventDialog(false)}>
                  {t('events.close')}
                </Button>
                {(selectedEvent.type === "tournament" ||
                  selectedEvent.type === "challenge") && (
                  <Button variant="contained" color="primary">
                    {selectedEvent.type === "tournament" 
                      ? t('events.joinTournament') 
                      : t('events.joinChallenge')}
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Create Event Dialog */}
        <Dialog
          open={openCreateDialog}
          onClose={() => closeDialogs()}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>
            {selectedEvent?._id ? t('events.editEvent') : t('events.createNewEvent')}
          </DialogTitle>
          <DialogContent>
            <EventForm
              onEventCreated={handleEventCreated}
              selectedEvent={selectedEvent}
              participantsList={partcipants}
              loading={loading}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialogs()}>
              {t('events.cancel')}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default EventsPage;