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
import { createEvent, getEvents } from "../features/eventsSlice";
import moment from "moment";

const EventsPage = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");
  const [error, setError] = useState(null); // Define error state

  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);

  const fetchEvents = async () => {
    try {
      await dispatch(getEvents());
    } catch (err) {
      console.error("❌ Error fetching events:", err);
      setError("Failed to fetch events. Please try again later."); // Set error message
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
      await dispatch(createEvent(data)); // Wait for the dispatch to complete
      console.log("✅ Event created/updated successfully");
      closeDialogs();
      await fetchEvents(); // Refresh the events list
    } catch (err) {
      console.error("❌ Error creating/updating event:", err);
      setError("Failed to create or update the event. Please try again."); // Set error message
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
      setSelectedEvent({
        start: slotInfo.start,
        end: slotInfo.end,
      });
      setOpenCreateDialog(true);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
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
    switch (type) {
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
              Events & Tournaments
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Join tournaments, challenges, and community events
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
                Calendar
              </ToggleButton>
              <ToggleButton value="list">
                <ListIcon sx={{ mr: 1 }} />
                List
              </ToggleButton>
            </ToggleButtonGroup>

            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              color="primary"
              title="Refresh events"
            >
              <RefreshIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
              size="large"
            >
              Create Event
            </Button>
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
          />
        ) : /* List View */
        events.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <EventIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No events yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first event to get started
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateDialog(true)}
            >
              Create First Event
            </Button>
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
                        label={event.type}
                        size="small"
                        sx={{
                          backgroundColor: event.color || "#1976d2",
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
                        {moment(event.start).format("MMM D, YYYY h:mm A")}{" "}
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

                    {event.prize && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <TrophyIcon
                          sx={{ fontSize: 16, mr: 1, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Prize: {event.prize}
                        </Typography>
                      </Box>
                    )}

                    <Chip
                      label={event.status}
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
                  label={selectedEvent.type}
                  size="small"
                  sx={{
                    backgroundColor: selectedEvent.color || "#1976d2",
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
                    📅 Date & Time
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(selectedEvent.date)}
                    {selectedEvent.endDate &&
                      ` - ${formatDate(selectedEvent.endDate)}`}
                  </Typography>
                </Box>

                {selectedEvent.location && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      📍 Location
                    </Typography>
                    <Typography variant="body2">
                      {selectedEvent.location}
                    </Typography>
                  </Box>
                )}

                {selectedEvent.prize && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      🏆 Prize
                    </Typography>
                    <Typography variant="body2">
                      {selectedEvent.prize}
                    </Typography>
                  </Box>
                )}

                {selectedEvent.maxParticipants &&
                  selectedEvent.maxParticipants > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        👥 Participants
                      </Typography>
                      <Typography variant="body2">
                        Max: {selectedEvent.maxParticipants}
                        {selectedEvent.currentParticipants &&
                          ` | Current: ${selectedEvent.currentParticipants}`}
                      </Typography>
                    </Box>
                  )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    📊 Status
                  </Typography>
                  <Chip
                    label={selectedEvent.status}
                    size="small"
                    color={getStatusColor(selectedEvent.status)}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEventDialog(false)}>Close</Button>
                {(selectedEvent.type === "tournament" ||
                  selectedEvent.type === "challenge") && (
                  <Button variant="contained" color="primary">
                    Join {selectedEvent.type}
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
            {selectedEvent?._id ? "Edit Event" : "Create New Event"}
          </DialogTitle>
          <DialogContent>
            <EventForm
              onEventCreated={handleEventCreated}
              selectedEvent={selectedEvent}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialogs()}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default EventsPage;
