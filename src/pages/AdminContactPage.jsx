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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Avatar,
  Fab,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Badge,
  ListItemButton,
} from "@mui/material";
import {
  ContactSupport,
  NavigateNext,
  Add,
  ConfirmationNumber,
  CheckCircle,
  Schedule,
  DoNotDisturb,
  Email,
  Search,
  Sort,
  Person,
  ArrowForward,
  Chat,
  Save,
  Event,
  CalendarToday,
  LocationOn,
  Group,
  AccessTime,
  Refresh as RefreshIcon,
  ViewDay,
  ViewWeek,
  ViewModule,
  Close,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types";
import RealTimeChat from "../components/messaging/RealTimeChat";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../utils/tokenManager";
import axiosInstance from "../api/axiosInstance";
import { useTheme } from "../contexts/ThemeContext";

import {
  createTicket,
  fetchTickets,
  fetchTicket,
} from "../features/ticketsSlice";
import { connectSocket, disconnectSocket, getSocket } from "../api/socketInstance";
import { useTranslation } from 'react-i18next';

// Ticket status types and colors
const ticketStatusColors = {
  open: "#2196f3", // Blue
  inProgress: "#ff9800", // Orange
  resolved: "#4caf50", // Green
  closed: "#9e9e9e", // Gray
};

// Ticket category types and colors
const ticketCategoryColors = {
  match_planning: "#6200ea", // Purple
  bug_report: "#f44336", // Red
  ban_report: "#ff9800", // Orange
  departure_request: "#2196f3", // Blue
  general: "#9e9e9e", // Gray
};

const AdminContactPage = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { mode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [eventsView, setEventsView] = useState('calendar'); // 'calendar' or 'list'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  // Form state for creating new tickets
  const [newTicketDialog, setNewTicketDialog] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  });

  // Tickets state - use Redux for tickets, local state for filtering
  const tickets = useSelector((state) => state.tickets.tickets);
  const { ticket: selectedTicket } = useSelector((state) => state.tickets);
  
  // Debug logging
  useEffect(() => {
    console.log('Admin tickets state:', tickets);
    console.log('Admin selected ticket:', selectedTicket);
  }, [tickets, selectedTicket]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Events state
  const [agencyEvents, setAgencyEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [eventSortOrder, setEventSortOrder] = useState("newest");

  // Status update state
  const [updatingStatus, setUpdatingStatus] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [loading, setLoading] = useState({
    tickets: false,
    events: false
  });

  // Chat state
  const [currentChatTicketId, setCurrentChatTicketId] = useState(null);

  // Load tickets and events on component mount
  useEffect(() => {
    fetchAgencyTickets();
    fetchAgencyEvents();
  }, []);

  const token = getToken();

  // Connect socket when component mounts
  useEffect(() => {
    if (token) {
      connectSocket(token);
    }

    return () => {
      disconnectSocket();
    };
  }, [token]);

  // Listen for real-time messages and update Redux state
  useEffect(() => {
    const handleNewMessage = (message) => {
      console.log('Admin received new message:', message);
      console.log('Current selected ticket:', selectedTicket);
      
      // Only add message if it's not from the current user (to avoid duplicates)
      const currentUserId = user?._id?.toString();
      const messageSenderId = message.sender?._id?.toString() || message.sender?.toString();
      
      if (currentUserId !== messageSenderId) {
        // The backend sends message._id as the ticket ID, not the message ID
        const ticketId = message._id;
        const messageData = {
          _id: `temp-${Date.now()}`,
          sender: message.sender,
          content: message.content,
          createdAt: message.timestamp || message.createdAt || new Date(),
        };
        
        console.log('Adding message to ticket:', ticketId, messageData);
        
        // Update Redux state with new message
        dispatch({ 
          type: 'tickets/addMessage', 
          payload: { 
            ticketId: ticketId,
            message: messageData
          }
        });
      } else {
        console.log('Skipping own message to avoid duplicate');
      }
    };

    // Get socket instance and listen for new messages
    const socket = getSocket();
    if (socket) {
      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [dispatch]);

  const fetchAgencyTickets = async () => {
    setLoading(prev => ({ ...prev, tickets: true }));
    try {
      const response = await axiosInstance.get('/tickets/agency');
      // Update Redux state with agency tickets
      dispatch({ type: 'tickets/fetchTickets/fulfilled', payload: response.data.data || [] });
    } catch (error) {
      console.error('Error fetching agency tickets:', error);
      setSnackbar({
        open: true,
        message: t('contact.failedToFetchTickets'),
        severity: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, tickets: false }));
    }
  };

  const fetchAgencyEvents = async () => {
    setLoading(prev => ({ ...prev, events: true }));
    try {
      const response = await axiosInstance.get('/events/agency');
      setAgencyEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching agency events:', error);
      setSnackbar({
        open: true,
        message: t('contact.failedToFetchEvents'),
        severity: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  };

  // Filter tickets when search or filter criteria change
  useEffect(() => {
    let filtered = tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || ticket.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || ticket.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort tickets
    filtered.sort((a, b) => {
      const aTime = new Date(a.updated_at || a.updatedAt).getTime();
      const bTime = new Date(b.updated_at || b.updatedAt).getTime();
      if (sortOrder === "newest") {
        return bTime - aTime;
      } else {
        return aTime - bTime;
      }
    });

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, categoryFilter, sortOrder]);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEventSearchChange = (event) => {
    setEventSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const handleEventSortOrderChange = () => {
    setEventSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const handleTicketClick = (ticket) => {
    dispatch(fetchTicket(ticket._id));
    setCurrentChatTicketId(ticket._id);
  };

  const handleNewTicketOpen = () => {
    setNewTicketDialog(true);
  };

  const handleNewTicketClose = () => {
    setNewTicketDialog(false);
    setNewTicketData({
      subject: "",
      description: "",
      category: "general",
      priority: "medium",
    });
  };

  const handleNewTicketSubmit = async () => {
    if (!newTicketData.subject || !newTicketData.description) {
      return;
    }

    try {
      const newTicketPayload = {
        title: newTicketData.subject,
        description: newTicketData.description,
        category: newTicketData.category,
        priority: newTicketData.priority,
      };

      await dispatch(createTicket(newTicketPayload));
      handleNewTicketClose();
      fetchAgencyTickets(); // Refresh tickets
      setSnackbar({
        open: true,
        message: t('contact.ticketCreatedSuccessfully'),
        severity: 'success'
      });
    } catch (error) {
      console.error("Failed to create ticket:", error);
      setSnackbar({
        open: true,
        message: t('contact.failedToCreateTicket'),
        severity: 'error'
      });
    }
  };

  // Handle status update
  const handleStatusUpdate = async (ticketId, newStatus) => {
    setUpdatingStatus(prev => ({ ...prev, [ticketId]: true }));
    
    try {
      await axiosInstance.put(`/tickets/${ticketId}`, {
        status: newStatus
      });
      
      // Update the ticket in Redux state
      dispatch({ 
        type: 'tickets/fetchTickets/fulfilled', 
        payload: tickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      });
      
      setSnackbar({
        open: true,
        message: t('contact.ticketStatusUpdated'),
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || t('contact.failedToUpdateStatus'),
        severity: 'error'
      });
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [ticketId]: false }));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return (
          <Schedule fontSize="small" sx={{ color: ticketStatusColors.open }} />
        );
      case "inProgress":
        return (
          <Person
            fontSize="small"
            sx={{ color: ticketStatusColors.inProgress }}
          />
        );
      case "resolved":
        return (
          <CheckCircle
            fontSize="small"
            sx={{ color: ticketStatusColors.resolved }}
          />
        );
      case "closed":
        return (
          <DoNotDisturb
            fontSize="small"
            sx={{ color: ticketStatusColors.closed }}
          />
        );
      default:
        return <ConfirmationNumber fontSize="small" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return t('contact.status.open');
      case "inProgress":
        return t('contact.status.inProgress');
      case "resolved":
        return t('contact.status.resolved');
      case "closed":
        return t('contact.status.closed');
      default:
        return status;
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case "match_planning":
        return t('contact.categories.matchPlanning');
      case "bug_report":
        return t('contact.categories.bugReport');
      case "ban_report":
        return t('contact.categories.banReport');
      case "departure_request":
        return t('contact.categories.departureRequest');
      case "general":
        return t('contact.categories.generalInquiry');
      default:
        return category;
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  const handleEventDialogClose = () => {
    setEventDialogOpen(false);
    setSelectedEvent(null);
  };

  // Calendar view functions
  const getCurrentMonthEvents = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
  };

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
        {/* Calendar header */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
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
        </Grid>

        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Grid item xs={12/7} key={day}>
            <Box sx={{ 
              p: 1, 
              textAlign: 'center', 
              fontWeight: 'bold',
              bgcolor: mode === 'light' ? 'grey.100' : 'grey.800',
              color: mode === 'light' ? 'text.primary' : 'grey.100',
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
                border: mode === 'light' ? '1px solid #e0e0e0' : '1px solid #424242',
                borderRadius: 1,
                bgcolor: dayData 
                  ? (mode === 'light' ? 'white' : 'grey.900')
                  : (mode === 'light' ? 'grey.50' : 'grey.800'),
                cursor: dayData ? 'pointer' : 'default',
                '&:hover': dayData ? { 
                  bgcolor: mode === 'light' ? 'grey.50' : 'grey.700' 
                } : {},
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
          <Card sx={{ 
            height: "100%",
            bgcolor: 'background.paper',
            boxShadow: mode === 'light' 
              ? '0 2px 8px rgba(0, 0, 0, 0.1)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 4px 16px rgba(0, 0, 0, 0.15)'
                : '0 4px 16px rgba(0, 0, 0, 0.4)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease'
          }}>
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

  const renderTicketsTab = () => (
    <Grid container spacing={3}>
      {/* Tickets List */}
      <Grid item xs={12} md={5} lg={4}>
        <Paper elevation={2} sx={{ 
          borderRadius: 2, 
          overflow: "hidden",
          bgcolor: 'background.paper',
          boxShadow: mode === 'light'
            ? '0 4px 6px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
          <Box sx={{ 
            bgcolor: mode === 'light' ? "#f5f5f5" : "grey.800", 
            p: 2 
          }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h6">
{t('contact.agencySupportTickets')}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={fetchAgencyTickets}
                    disabled={loading.tickets}
                    startIcon={loading.tickets ? <CircularProgress size={16} /> : <RefreshIcon />}
                  >
{t('contact.refresh')}
                  </Button>
                </Box>

            {/* Search and filters */}
            <TextField
              fullWidth
placeholder={t('contact.searchTickets')}
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
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

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>{t('forms.labels.status')}</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  label="Status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="inProgress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="match_planning">Match Planning</MenuItem>
                  <MenuItem value="bug_report">Bug Report</MenuItem>
                  <MenuItem value="ban_report">Ban Report</MenuItem>
                  <MenuItem value="departure_request">Departure Request</MenuItem>
                </Select>
              </FormControl>

              <Tooltip
                title={
                  sortOrder === "newest"
                    ? "Sort by oldest first"
                    : "Sort by newest first"
                }
              >
                <IconButton
                  onClick={handleSortOrderChange}
                  size="small"
                  sx={{ 
                    bgcolor: mode === 'light' ? "white" : "grey.700", 
                    boxShadow: 1,
                    '&:hover': {
                      bgcolor: mode === 'light' ? "grey.100" : "grey.600"
                    }
                  }}
                >
                  <Sort />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider />

          {/* Tickets list */}
          <List sx={{ p: 0, maxHeight: "600px", overflowY: "auto" }}>
            {loading.tickets ? (
              <ListItem>
                <CircularProgress size={20} />
                <ListItemText primary={t('contact.loadingTickets')} />
              </ListItem>
            ) : filteredTickets.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary={t('contact.noTicketsFound')}
                  secondary={t('contact.tryChangeFilters')}
                />
              </ListItem>
            ) : (
              filteredTickets.map((ticket, index) => (
                <React.Fragment key={ticket._id}>
                  {index > 0 && <Divider />}
                  <ListItem
                    component={Button}
                    onClick={() => handleTicketClick(ticket)}
                    sx={{
                      py: 2,
                      bgcolor:
                        selectedTicket?._id === ticket._id
                          ? "rgba(98, 0, 234, 0.05)"
                          : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(98, 0, 234, 0.05)",
                      },
                    }}
                  >
                    <ListItemIcon>
                      {getStatusIcon(ticket.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            noWrap
                            sx={{
                              fontWeight: ticket.status === "open" ? "bold" : "normal",
                              color: ticket.status === "open" ? "text.primary" : "text.secondary",
                            }}
                          >
                            {ticket.title || ticket.subject}
                          </Typography>
                          {ticket.priority && (
                            <Chip
                              label={ticket.priority}
                              size="small"
                              sx={{
                                bgcolor: `${
                                  ticket.priority === "urgent"
                                    ? "#f44336"
                                    : ticket.priority === "high"
                                    ? "#ff9800"
                                    : ticket.priority === "medium"
                                    ? "#2196f3"
                                    : ticket.priority === "low"
                                    ? "#4caf50"
                                    : "#9e9e9e"
                                }20`,
                                color:
                                  ticket.priority === "urgent"
                                    ? "#f44336"
                                    : ticket.priority === "high"
                                    ? "#ff9800"
                                    : ticket.priority === "medium"
                                    ? "#2196f3"
                                    : ticket.priority === "low"
                                    ? "#4caf50"
                                    : "#9e9e9e",
                                fontWeight: 500,
                              }}
                              icon={<ConfirmationNumber fontSize="small" />}
                            />
                          )}
                          <Chat fontSize="small" sx={{ color: "#6200ea" }} />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {updatingStatus[ticket._id] ? (
                                <CircularProgress size={16} />
                              ) : (
                                <FormControl size="small" sx={{ minWidth: 100 }}>
                                  <Select
                                    value={ticket.status || 'open'}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      handleStatusUpdate(ticket._id, e.target.value);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{ 
                                      height: 24,
                                      '& .MuiSelect-select': { 
                                        py: 0.25,
                                        px: 0.5,
                                        fontSize: '0.7rem',
                                        fontWeight: 500,
                                        color: ticketStatusColors[ticket.status] || "#9e9e9e"
                                      }
                                    }}
                                  >
                                    <MenuItem value="open">Open</MenuItem>
                                    <MenuItem value="inProgress">In Progress</MenuItem>
                                    <MenuItem value="resolved">Resolved</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                  </Select>
                                </FormControl>
                              )}
                            </Box>
                            <Chip
                              label={getCategoryText(ticket.category)}
                              size="small"
                              sx={{
                                bgcolor: `${
                                  ticketCategoryColors[ticket.category] || "#9e9e9e"
                                }10`,
                                color: ticketCategoryColors[ticket.category] || "#9e9e9e",
                                fontWeight: 500,
                              }}
                            />
                            <Chip
                              label={t('contact.realTime')}
                              size="small"
                              sx={{
                                bgcolor: "#e8f5e8",
                                color: "#2e7d32",
                                fontWeight: 500,
                              }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(ticket.updated_at || ticket.updatedAt)}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleTicketClick(ticket)}
                        sx={{ color: "#6200ea" }}
                      >
                        <ArrowForward />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      </Grid>

      {/* Chat Area */}
      <Grid item xs={12} md={7} lg={8}>
        {selectedTicket ? (
          <Paper elevation={1} sx={{ 
            borderRadius: 2, 
            overflow: "hidden", 
            height: "600px",
            bgcolor: 'background.paper',
            boxShadow: mode === 'light'
              ? '0 2px 4px rgba(0, 0, 0, 0.1)'
              : '0 2px 4px rgba(0, 0, 0, 0.25)'
          }}>
            <Box sx={{ 
              p: 2, 
              bgcolor: mode === 'light' ? "#f8f9fa" : "grey.800", 
              borderBottom: mode === 'light' ? "1px solid #e0e0e0" : "1px solid #424242" 
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {updatingStatus[selectedTicket._id] ? (
                    <CircularProgress size={16} />
                  ) : (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={selectedTicket.status || 'open'}
                        onChange={(e) => handleStatusUpdate(selectedTicket._id, e.target.value)}
                        sx={{ 
                          height: 32,
                          '& .MuiSelect-select': { 
                            py: 0.5,
                            px: 1,
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: ticketStatusColors[selectedTicket.status] || "#9e9e9e"
                          }
                        }}
                      >
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="inProgress">In Progress</MenuItem>
                        <MenuItem value="resolved">Resolved</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
                <Chip
                  label={getCategoryText(selectedTicket.category)}
                  size="small"
                  sx={{
                    bgcolor: `${
                      ticketCategoryColors[selectedTicket.category] || "#9e9e9e"
                    }10`,
                    color: ticketCategoryColors[selectedTicket.category] || "#9e9e9e",
                    fontWeight: 500,
                  }}
                />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedTicket.title || selectedTicket.subject}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedTicket?.description}
              </Typography>
            </Box>

                                {/* Real-time chat component */}
                    <RealTimeChat 
                      key={selectedTicket?._id + (selectedTicket?.messages?.length || 0)} 
                      ticket={selectedTicket} 
                      currentUser={user} 
                    />
          </Paper>
        ) : (
          <Paper
            elevation={1}
            sx={{
              borderRadius: 2,
              height: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: mode === 'light' ? "#f8f9fa" : "grey.900",
              boxShadow: mode === 'light'
                ? '0 2px 4px rgba(0, 0, 0, 0.1)'
                : '0 2px 4px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              <Chat sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" gutterBottom>
{t('contact.selectTicketToChat')}
              </Typography>
              <Typography variant="body2">
{t('contact.chooseTicketDescription')}
              </Typography>
            </Box>
          </Paper>
        )}
      </Grid>
    </Grid>
  );

  const renderEventsTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ 
          borderRadius: 2, 
          overflow: "hidden",
          bgcolor: 'background.paper',
          boxShadow: mode === 'light'
            ? '0 4px 6px rgba(0, 0, 0, 0.1)'
            : '0 4px 6px rgba(0, 0, 0, 0.3)'
        }}>
          <Box sx={{ 
            bgcolor: mode === 'light' ? "#f5f5f5" : "grey.800", 
            p: 2 
          }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Agency Events
            </Typography>

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
                  sx={{ 
                    bgcolor: mode === 'light' ? "white" : "grey.700", 
                    boxShadow: 1,
                    '&:hover': {
                      bgcolor: mode === 'light' ? "grey.100" : "grey.600"
                    }
                  }}
                >
                  <Sort />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ 
            p: 2,
            bgcolor: 'background.paper'
          }}>
            {loading.events ? (
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
      </Grid>
    </Grid>
  );

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ my: 2 }}>
          {/* Header */}
          <Paper elevation={1} sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: mode === 'light'
              ? '0 2px 4px rgba(0, 0, 0, 0.1)'
              : '0 2px 4px rgba(0, 0, 0, 0.25)'
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <ContactSupport sx={{ fontSize: 40, color: "#6200ea" }} />
                  <Box>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
{t('contact.title')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
{t('contact.description')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                  <Link color="inherit" href="/admin/dashboard">
{t('navigation.dashboard')}
                  </Link>
                  <Typography color="text.primary">{t('contact.agencyManagement')}</Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>
          </Paper>

          {/* Tabs */}
          <Paper elevation={2} sx={{ 
            borderRadius: 2, 
            mb: 3,
            bgcolor: 'background.paper',
            boxShadow: mode === 'light'
              ? '0 4px 6px rgba(0, 0, 0, 0.1)'
              : '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ContactSupport fontSize="small" />
{t('contact.supportTickets')}
                  </Box>
                }
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Event fontSize="small" />
{t('navigation.events')}
                  </Box>
                }
              />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {activeTab === 0 && renderTicketsTab()}
              {activeTab === 1 && renderEventsTab()}
            </Box>
          </Paper>
        </Box>

        {/* New Ticket Dialog */}
        <Dialog
          open={newTicketDialog}
          onClose={handleNewTicketClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Create New Support Ticket</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Subject"
              fullWidth
              variant="outlined"
              value={newTicketData.subject}
              onChange={(e) =>
                setNewTicketData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={newTicketData.description}
              onChange={(e) =>
                setNewTicketData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newTicketData.category}
                    onChange={(e) =>
                      setNewTicketData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    label="Category"
                  >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="match_planning">Match Planning</MenuItem>
                    <MenuItem value="bug_report">Bug Report</MenuItem>
                    <MenuItem value="ban_report">Ban Report</MenuItem>
                    <MenuItem value="departure_request">Departure Request</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={newTicketData.priority}
                    onChange={(e) =>
                      setNewTicketData((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewTicketClose}>Cancel</Button>
            <Button
              onClick={handleNewTicketSubmit}
              variant="contained"
              disabled={
                !newTicketData.subject ||
                !newTicketData.description ||
                !newTicketData.category ||
                !newTicketData.priority
              }
            >
              Create Ticket
            </Button>
          </DialogActions>
        </Dialog>

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
      </Container>
    </Layout>
  );
};

export default AdminContactPage; 