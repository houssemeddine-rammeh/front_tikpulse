import React, { useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Chip
} from '@mui/material';
import {
  Support as SupportIcon,
  Notifications,
  PriorityHigh,
  Schedule
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const TicketNotificationBadge = ({
  size = 'medium',
  color = 'inherit'
}) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadTickets, setUnreadTickets] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  useEffect(() => {
    // Load unread tickets from API
    const fetchUnreadTickets = async () => {
      if (!user) return;

      try {
        const response = await api.getSupportTickets();
        const tickets = response.tickets || [];
        
        // Filter for unread tickets based on user role
        const unread = tickets.filter(ticket => {
          if (user.role === 'creator') {
            return ticket.creator_id === user.id && ticket.has_unread_messages;
          } else if (user.role === 'manager' || user.role === 'admin') {
            return ticket.manager_id === user.id && ticket.has_unread_messages;
          }
          return false;
        });

        setUnreadTickets(unread);
        setUnreadCount(unread.length);
      } catch (error) {
        console.warn('Failed to fetch ticket notifications:', error);
        // Set empty state if API fails
        setUnreadTickets([]);
        setUnreadCount(0);
      }
    };

    fetchUnreadTickets();

    // Set up polling for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadTickets, 30000);

    return () => clearInterval(interval);
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTicketClick = async (ticketId) => {
    try {
      // Mark ticket as read when clicked
      await api.updateSupportTicket(ticketId, { has_unread_messages: false });
      
      // Update local state
      setUnreadTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Navigate to ticket
      navigate(`/support/tickets/${ticketId}`);
      handleClose();
    } catch (error) {
      console.warn('Failed to mark ticket as read:', error);
      // Still navigate even if API call fails
      navigate(`/support/tickets/${ticketId}`);
      handleClose();
    }
  };

  const handleViewAllTickets = () => {
    navigate('/support');
    handleClose();
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <>
      <IconButton
        size={size}
        color={color}
        onClick={handleClick}
        aria-label="support ticket notifications"
      >
        <Badge badgeContent={unreadCount} color="error">
          <SupportIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 400,
            width: 320,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notifications fontSize="small" />
            Ticket Notifications
          </Typography>
        </Box>

        {unreadTickets.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No unread notifications
            </Typography>
          </MenuItem>
        ) : (
          unreadTickets.slice(0, 5).map((ticket) => (
            <MenuItem
              key={ticket.id}
              onClick={() => handleTicketClick(ticket.id)}
              sx={{ 
                flexDirection: 'column', 
                alignItems: 'flex-start',
                whiteSpace: 'normal',
                py: 1.5
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                <Typography variant="subtitle2" noWrap sx={{ maxWidth: '70%' }}>
                  {ticket.subject || 'No Subject'}
                </Typography>
                <Chip
                  icon={<PriorityHigh fontSize="small" />}
                  label={ticket.priority || 'Medium'}
                  size="small"
                  color={getPriorityColor(ticket.priority)}
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {ticket.description?.substring(0, 60)}
                {ticket.description?.length > 60 ? '...' : ''}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Schedule fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(ticket.updated_at || ticket.created_at)}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}

        {unreadTickets.length > 5 && (
          <>
            <Divider />
            <MenuItem onClick={handleViewAllTickets}>
              <Typography variant="body2" color="primary">
                View {unreadTickets.length - 5} more notifications
              </Typography>
            </MenuItem>
          </>
        )}

        <Divider />
        <MenuItem onClick={handleViewAllTickets}>
          <Typography variant="body2" color="primary">
            View All Support Tickets
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TicketNotificationBadge; 