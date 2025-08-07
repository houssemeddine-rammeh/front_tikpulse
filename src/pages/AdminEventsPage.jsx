import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Container,
  Grid,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Event,
  NavigateNext,
  Search,
  Sort,
  CalendarToday,
  LocationOn,
  Group,
  AccessTime,
  Schedule,
  ViewDay,
  ViewModule,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";
import { getToken } from "../utils/tokenManager";
import axiosInstance from "../api/axiosInstance";

const AdminEventsPage = () => {
  const { user } = useAuth();
  const [eventsView, setEventsView] = useState('calendar'); // 'calendar' or 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [agencyEvents, setAgencyEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [eventSortOrder, setEventSortOrder] = useState("newest");
  const [loading, setLoading] = useState(false);

  // Load events on component mount
  useEffect(() => {
    fetchAgencyEvents();
  }, []);

  const fetchAgencyEvents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/events/agency');
      setAgencyEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching agency events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter events when search criteria change
  useEffect(() => {
    let filtered = agencyEvents.filter((event) => {
      const matchesSearch =
        event.title?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event.location?.toLowerCase().includes(eventSearchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort events
    filtered.sort((a, b) => {
      const aTime = new Date(a.start).getTime();
      const bTime = new Date(b.start).getTime();
      if (eventSortOrder === "newest") {
        return bTime - aTime;
      } else {
        return aTime - bTime;
      }
    });

    setFilteredEvents(filtered);
  }, [agencyEvents, eventSearchTerm, eventSortOrder]);

  const handleEventSearchChange = (event) => {
    setEventSearchTerm(event.target.value);
  };

  const handleEventSortOrderChange = () => {
    setEventSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  const handleEventDialogClose = () => {
    setEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const formatEventDate = (date) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  };

  // Calendar view functions
  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendarView = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const eventsForDay = getEventsForDate(date);
      calendarDays.push({ date, events: eventsForDay });
    }

    return (
      <Grid container spacing={1}>
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs={12/7} key={day}>
            <Box sx={{ 
              p: 1, 
              textAlign: 'center', 
              fontWeight: 'bold',
              bgcolor: 'grey.100',
              borderRadius: 1
            }}>
              {day}
            </Box>
          </Grid>
        ))}

        {/* Calendar days */}
        {calendarDays.map((dayData, index) => (
          <Grid item xs={12/7} key={index}>
            <Box
              sx={{
                minHeight: 100,
                p: 1,
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                bgcolor: dayData ? 'white' : 'grey.50',
                cursor: dayData ? 'pointer' : 'default',
                '&:hover': dayData ? { bgcolor: 'grey.50' } : {},
              }}
            >
              {dayData && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {dayData.date.getDate()}
                  </Typography>
                  
                  {dayData.events.map((event, eventIndex) => (
                    <Box
                      key={event._id}
                      sx={{
                        p: 0.5,
                        mb: 0.5,
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 0.5,
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'primary.dark' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      {event.title}
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderListView = () => (
    <Grid container spacing={2}>
      {filteredEvents.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event._id}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <CalendarToday fontSize="small" color="primary" />
                <Typography variant="h6" component="div" noWrap>
                  {event.title}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {event.description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {formatEventDate(event.start)}
                </Typography>
              </Box>

              {event.location && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
              )}

              {event.participants && event.participants.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Group fontSize="small" color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {event.participants.length} participants
                  </Typography>
                </Box>
              )}

              <Chip
                label={event.type || "General"}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleEventClick(event)}
                startIcon={<Event />}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ my: 2 }}>
          {/* Header */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Event sx={{ fontSize: 40, color: "#6200ea" }} />
                  <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
                      Agency Events
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      View all events from your agency managers
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                  <Link color="inherit" href="/admin/dashboard">
                    Dashboard
                  </Link>
                  <Typography color="text.primary">Events</Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>
          </Paper>

          {/* Main Content */}
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "#f5f5f5", p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                               <Typography variant="h6">
                 {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
               </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    variant={eventsView === 'calendar' ? 'contained' : 'outlined'}
                    onClick={() => setEventsView('calendar')}
                    startIcon={<ViewModule />}
                  >
                    Calendar
                  </Button>
                  <Button
                    size="small"
                    variant={eventsView === 'list' ? 'contained' : 'outlined'}
                    onClick={() => setEventsView('list')}
                    startIcon={<ViewDay />}
                  >
                    List
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search events..."
                  value={eventSearchTerm}
                  onChange={handleEventSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 2 },
                  }}
                  variant="outlined"
                  size="small"
                />

                <Tooltip
                  title={
                    eventSortOrder === "newest"
                      ? "Sort by oldest first"
                      : "Sort by newest first"
                  }
                >
                  <IconButton
                    onClick={handleEventSortOrderChange}
                    size="small"
                    sx={{ bgcolor: "white", boxShadow: 1 }}
                  >
                    <Sort />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ p: 2 }}>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : filteredEvents.length === 0 ? (
                <Box sx={{ textAlign: "center", p: 4, color: "text.secondary" }}>
                  <Event sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" gutterBottom>
                    No events found
                  </Typography>
                  <Typography variant="body2">
                    No events have been created by managers in your agency yet
                  </Typography>
                </Box>
              ) : (
                eventsView === 'calendar' ? renderCalendarView() : renderListView()
              )}
            </Box>
          </Paper>
        </Box>

        {/* Event Details Dialog */}
        <Dialog
          open={eventDialogOpen}
          onClose={handleEventDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Event color="primary" />
              Event Details
            </Box>
          </DialogTitle>
          <DialogContent>
            {selectedEvent && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                  {selectedEvent.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {selectedEvent.description}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <AccessTime color="action" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Start Time
                        </Typography>
                        <Typography variant="body1">
                          {formatEventDate(selectedEvent.start)}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {selectedEvent.end && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Schedule color="action" />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            End Time
                          </Typography>
                          <Typography variant="body1">
                            {formatEventDate(selectedEvent.end)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}

                  {selectedEvent.location && (
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <LocationOn color="action" />
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Location
                          </Typography>
                          <Typography variant="body1">
                            {selectedEvent.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Event color="action" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Type
                        </Typography>
                        <Chip
                          label={selectedEvent.type || "General"}
                          size="small"
                          color="primary"
                        />
                      </Box>
                    </Box>
                  </Grid>

                  {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Group color="action" />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Participants ({selectedEvent.participants.length})
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {selectedEvent.participants.map((participant, index) => (
                              <Chip
                                key={participant._id || index}
                                label={participant.username || participant.firstName || `Participant ${index + 1}`}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEventDialogClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default AdminEventsPage; 