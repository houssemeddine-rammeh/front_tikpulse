import React, { useState } from 'react';
import {
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  Paper,
  Typography,
  Tooltip,
  Button
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Close as CloseIcon,
  DoneAll
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Safe timestamp formatting function
const formatTimeAgo = (timestamp) => {
  try {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Just now';
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  } catch (error) {
    console.warn('Invalid timestamp for formatting:', timestamp, error);
    return 'Just now';
  }
};

const getNotificationIcon = (type) => {
  switch (type) {
    case 'info':
      return <InfoIcon sx={{ color: 'info.main' }} />;
    case 'success':
      return <SuccessIcon sx={{ color: 'success.main' }} />;
    case 'warning':
      return <WarningIcon sx={{ color: 'warning.main' }} />;
    case 'error':
      return <ErrorIcon sx={{ color: 'error.main' }} />;
    default:
      return <InfoIcon sx={{ color: 'info.main' }} />;
  }
};

const NotificationItem = ({ notification, onClose }) => {
  const { markAsRead, removeNotification } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
      onClose();
    }
  };

  return (
    <ListItem
      sx={{
        bgcolor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
        borderRadius: 1,
        mb: 1,
        '&:hover': {
          bgcolor: 'rgba(25, 118, 210, 0.15)',
        },
        cursor: notification.link ? 'pointer' : 'default',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      <Box sx={{ mr: 2 }}>{getNotificationIcon(notification.type)}</Box>
      <ListItemText
        primary={
          <Typography variant="subtitle2" component="div">
            {notification.title}
          </Typography>
        }
        secondary={
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {notification.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatTimeAgo(notification.timestamp)}
            </Typography>
          </>
        }
      />
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          removeNotification(notification.id);
        }}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </ListItem>
  );
};

const NotificationCenter = () => {
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useNotifications();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleClick}
          size="large"
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 1,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 360,
            maxWidth: 400,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <Button size="small" onClick={markAllAsRead} startIcon={<DoneAll />}>
              Mark all as read
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ overflow: 'auto', maxHeight: '60vh', p: 2 }}>
          {notifications.length > 0 ? (
            <List sx={{ p: 0 }}>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClose={handleClose}
                />
              ))}
            </List>
          ) : (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: 'transparent'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No notifications yet
              </Typography>
            </Paper>
          )}
        </Box>
        {notifications.length > 0 && (
          <>
            <Divider />
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                size="small"
                onClick={() => {
                  clearNotifications();
                  handleClose();
                }}
              >
                Clear all
              </Button>
            </Box>
          </>
        )}
      </Menu>
    </>
  );
};

export default NotificationCenter; 

