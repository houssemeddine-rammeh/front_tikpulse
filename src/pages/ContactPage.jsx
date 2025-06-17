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
  FormHelperText,
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
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../types";
import { ticketsAPI } from "../services/api";
import RealTimeChat from "../components/messaging/RealTimeChat";
import Layout from "../components/layout/Layout";

// Ticket status types and colors
const ticketStatusColors = {
  open: "#2196f3", // Blue
  in_progress: "#ff9800", // Orange
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

const ContactPage = () => {
  const { user } = useAuth();

  // Form state for creating new tickets
  const [newTicketDialog, setNewTicketDialog] = useState(false);
  const [newTicketData, setNewTicketData] = useState({
    subject: "",
    description: "",
    category: "general",
    priority: "medium",
  });

  // Tickets state
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [selectedTicket, setSelectedTicket] = useState(null);

  // Chat state
  const [currentChatTicketId, setCurrentChatTicketId] = useState(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);

  // Manager dialog state
  const [managerDialogOpen, setManagerDialogOpen] = useState(false);
  const [managerMessage, setManagerMessage] = useState("");
  const [managerSubject, setManagerSubject] = useState("");
  const [managerInfo, setManagerInfo] = useState(null);

  // Load tickets and manager info on component mount
  useEffect(() => {
    fetchTickets();
    if (user?.role === "creator") {
      fetchManagerInfo();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      // const response = await ticketsAPI.getSupportTickets();
      const tickets = [];
      setTickets(tickets);
      setFilteredTickets(tickets);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      setTickets([]);
      setFilteredTickets([]);
    }
  };

  const fetchManagerInfo = async () => {
    try {
      const response = await ticketsAPI.getAssignedManager(user.id);
      setManagerInfo(response.manager);
    } catch (error) {
      console.warn("Failed to fetch manager info:", error);
      setManagerInfo({
        id: "default-manager",
        name: "Support Manager",
        email: "support@tikplus.com",
        avatar: null,
      });
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setCurrentChatTicketId(ticket.id);
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

  const handleNewTicketSubmit = () => {
    if (!newTicketData.subject || !newTicketData.description) {
      return;
    }

    const newTicket = {
      id: Date.now().toString(),
      title: newTicketData.subject,
      subject: newTicketData.subject,
      description: newTicketData.description,
      category: newTicketData.category,
      status: "open",
      priority: newTicketData.priority,
      creator_id: user?.id || "creator-1",
      creator_name: user?.username || "Creator User",
      manager_id: "manager-1",
      manager_name: "John Manager",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      creatorId: user?.id || "creator-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          ticket_id: Date.now().toString(),
          user_id: user?.id || "creator-1",
          username: user?.username || "Creator User",
          role: user?.role?.toString() || UserRole.CREATOR.toString(),
          message: newTicketData.description,
          created_at: new Date().toISOString(),
          ticketId: Date.now().toString(),
          userId: user?.id || "creator-1",
          userRole: user?.role || UserRole.CREATOR,
          createdAt: new Date(),
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);
    handleNewTicketClose();
  };

  const handleEmailManager = () => {
    setManagerDialogOpen(true);
  };

  const handleManagerDialogClose = () => {
    setManagerDialogOpen(false);
    setManagerMessage("");
    setManagerSubject("");
  };

  const handleSendManagerEmail = async () => {
    try {
      await ticketsAPI.sendManagerMessage({
        managerId: managerInfo?.id,
        subject: managerSubject,
        message: managerMessage,
        fromUserId: user.id,
      });

      handleManagerDialogClose();
      // Show success message
    } catch (error) {
      console.error("Failed to send message to manager:", error);
      // Still close dialog but show error
      handleManagerDialogClose();
    }
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return (
          <Schedule fontSize="small" sx={{ color: ticketStatusColors.open }} />
        );
      case "in_progress":
        return (
          <Person
            fontSize="small"
            sx={{ color: ticketStatusColors.in_progress }}
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
        return "Open";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  const getCategoryText = (category) => {
    switch (category) {
      case "match_planning":
        return "Match Planning";
      case "bug_report":
        return "Bug Report";
      case "ban_report":
        return "Ban Report";
      case "departure_request":
        return "Departure Request";
      case "general":
        return "General Inquiry";
      default:
        return category;
    }
  };

  const getUserAvatar = (userRole) => {
    if (userRole === UserRole.MANAGER && managerInfo) {
      return (
        <Avatar
          src={managerInfo.avatar}
          alt={managerInfo.name}
          sx={{ bgcolor: "#6200ea", width: 32, height: 32 }}
        />
      );
    } else {
      return (
        <Avatar sx={{ bgcolor: "#2196f3", width: 32, height: 32 }}>
          {user?.username?.charAt(0)?.toUpperCase() || "U"}
        </Avatar>
      );
    }
  };

  const getUserName = (userRole) => {
    if (userRole === UserRole.MANAGER && managerInfo) {
      return managerInfo.name;
    } else {
      return user?.username || "You";
    }
  };

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{ mb: 2 }}
          >
            <Link
              component={RouterLink}
              to="/dashboard"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <ContactSupport sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Typography color="text.primary">Contact & Support</Typography>
          </Breadcrumbs>

          {/* Header */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Support Center
                </Typography>

                <Typography variant="body1">
                  {user?.role === UserRole.ADMIN
                    ? "View and monitor all support tickets across the platform. You have read-only access to all ticket conversations."
                    : "Need help with anything? Create a support ticket or contact your manager directly. Our support team is here to assist you."}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                  gap: 2,
                }}
              >
                {/* Contact Manager button for creators only */}
                {user?.role === UserRole.CREATOR && (
                  <Button
                    variant="contained"
                    startIcon={<Email />}
                    onClick={handleEmailManager}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    Contact Manager
                  </Button>
                )}
                {/* Hide New Ticket button for admins - they can only view */}
                {user?.role !== UserRole.ADMIN && (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleNewTicketOpen}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    New Ticket
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>

          {/* Main Content */}
          <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
            {/* Main Content - Direct Support Tickets with Real-Time Chat */}
            <Grid container spacing={3} sx={{ p: 3 }}>
              {/* Tickets List */}
              <Grid item xs={12} md={5} lg={4}>
                <Paper
                  elevation={2}
                  sx={{ borderRadius: 2, overflow: "hidden" }}
                >
                  <Box sx={{ bgcolor: "#f5f5f5", p: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Real-Time Support Tickets
                    </Typography>

                    {/* Search and filters */}
                    <TextField
                      fullWidth
                      placeholder="Search tickets..."
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
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={statusFilter}
                          onChange={handleStatusFilterChange}
                          label="Status"
                        >
                          <MenuItem value="all">All Statuses</MenuItem>
                          <MenuItem value="open">Open</MenuItem>
                          <MenuItem value="in_progress">In Progress</MenuItem>
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
                          <MenuItem value="match_planning">
                            Match Planning
                          </MenuItem>
                          <MenuItem value="bug_report">Bug Report</MenuItem>
                          <MenuItem value="ban_report">Ban Report</MenuItem>
                          <MenuItem value="departure_request">
                            Departure Request
                          </MenuItem>
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
                          sx={{ bgcolor: "white", boxShadow: 1 }}
                        >
                          <Sort />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Tickets list */}
                  <List sx={{ p: 0, maxHeight: "600px", overflowY: "auto" }}>
                    {filteredTickets.length === 0 ? (
                      <ListItem>
                        <ListItemText
                          primary="No tickets found"
                          secondary="Try changing your search or filters"
                        />
                      </ListItem>
                    ) : (
                      filteredTickets.map((ticket, index) => (
                        <React.Fragment key={ticket.id}>
                          {index > 0 && <Divider />}
                          <ListItem
                            component={Button}
                            onClick={() => handleTicketClick(ticket)}
                            sx={{
                              py: 2,
                              bgcolor:
                                selectedTicket?.id === ticket.id
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
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <Typography
                                    variant="subtitle1"
                                    component="div"
                                    noWrap
                                    sx={{
                                      fontWeight:
                                        ticket.status === "open"
                                          ? "bold"
                                          : "normal",
                                      color:
                                        ticket.status === "open"
                                          ? "text.primary"
                                          : "text.secondary",
                                    }}
                                  >
                                    {ticket.title || ticket.subject}
                                  </Typography>
                                  <Chat
                                    fontSize="small"
                                    sx={{ color: "#6200ea" }}
                                  />
                                </Box>
                              }
                              secondary={
                                <Box sx={{ mt: 0.5 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mb: 0.5,
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <Chip
                                      label={getStatusText(ticket.status)}
                                      size="small"
                                      sx={{
                                        bgcolor: `${
                                          ticketStatusColors[ticket.status] ||
                                          "#9e9e9e"
                                        }20`,
                                        color:
                                          ticketStatusColors[ticket.status] ||
                                          "#9e9e9e",
                                        fontWeight: 500,
                                      }}
                                    />
                                    <Chip
                                      label={getCategoryText(ticket.category)}
                                      size="small"
                                      sx={{
                                        bgcolor: `${
                                          ticketCategoryColors[
                                            ticket.category
                                          ] || "#9e9e9e"
                                        }10`,
                                        color:
                                          ticketCategoryColors[
                                            ticket.category
                                          ] || "#9e9e9e",
                                        fontWeight: 500,
                                      }}
                                    />
                                    <Chip
                                      label="Real-time"
                                      size="small"
                                      sx={{
                                        bgcolor: "#e8f5e8",
                                        color: "#2e7d32",
                                        fontWeight: 500,
                                      }}
                                    />
                                  </Box>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {formatDate(
                                      ticket.updated_at || ticket.updatedAt
                                    )}
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
                  <Paper
                    elevation={1}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      height: "600px",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#f8f9fa",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Chip
                          label={getStatusText(selectedTicket.status)}
                          size="small"
                          sx={{
                            bgcolor: `${
                              ticketStatusColors[selectedTicket.status] ||
                              "#9e9e9e"
                            }20`,
                            color:
                              ticketStatusColors[selectedTicket.status] ||
                              "#9e9e9e",
                            fontWeight: 500,
                          }}
                        />
                        <Chip
                          label={getCategoryText(selectedTicket.category)}
                          size="small"
                          sx={{
                            bgcolor: `${
                              ticketCategoryColors[selectedTicket.category] ||
                              "#9e9e9e"
                            }10`,
                            color:
                              ticketCategoryColors[selectedTicket.category] ||
                              "#9e9e9e",
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {selectedTicket.title || selectedTicket.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedTicket.description}
                      </Typography>
                    </Box>

                    {/* Real-time chat component */}
                    <RealTimeChat
                      ticketId={selectedTicket.id}
                      currentUser={user}
                      isReadOnly={user?.role === UserRole.ADMIN}
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
                      bgcolor: "#f8f9fa",
                    }}
                  >
                    <Box sx={{ textAlign: "center", color: "text.secondary" }}>
                      <Chat sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                      <Typography variant="h6" gutterBottom>
                        Select a ticket to start chatting
                      </Typography>
                      <Typography variant="body2">
                        Choose a support ticket from the list to view the
                        conversation
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </Grid>
            </Grid>
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
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
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
                <MenuItem value="general">General Inquiry</MenuItem>
                <MenuItem value="match_planning">Match Planning</MenuItem>
                <MenuItem value="bug_report">Bug Report</MenuItem>
                <MenuItem value="ban_report">Ban Report</MenuItem>
                <MenuItem value="departure_request">Departure Request</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
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
              placeholder="Please describe your issue or question in detail..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewTicketClose}>Cancel</Button>
            <Button
              onClick={handleNewTicketSubmit}
              variant="contained"
              disabled={!newTicketData.subject || !newTicketData.description}
              sx={{ bgcolor: "#6200ea", "&:hover": { bgcolor: "#3700b3" } }}
            >
              Create Ticket
            </Button>
          </DialogActions>
        </Dialog>

        {/* Manager Contact Dialog */}
        <Dialog
          open={managerDialogOpen}
          onClose={handleManagerDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Contact Your Manager</DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Send a direct message to your manager:{" "}
              {managerInfo?.name || "Support Manager"}
            </Typography>

            <TextField
              autoFocus
              margin="dense"
              label="Subject"
              fullWidth
              variant="outlined"
              value={managerSubject}
              onChange={(e) => setManagerSubject(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="dense"
              label="Message"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={managerMessage}
              onChange={(e) => setManagerMessage(e.target.value)}
              placeholder="Type your message here..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleManagerDialogClose}>Cancel</Button>
            <Button
              onClick={handleSendManagerEmail}
              variant="contained"
              disabled={!managerSubject || !managerMessage}
              sx={{ bgcolor: "#6200ea", "&:hover": { bgcolor: "#3700b3" } }}
            >
              Send Message
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default ContactPage;
