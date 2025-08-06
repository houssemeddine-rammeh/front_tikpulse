import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Safe timestamp utility function
  const safeTimestamp = (timestamp) => {
    try {
      if (!timestamp) return new Date().toISOString();
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
    } catch (error) {
      console.warn('Invalid timestamp provided:', timestamp);
      return new Date().toISOString();
    }
  };
  
  // Safely get auth context with error handling
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    console.warn('AuthContext not available, NotificationProvider will work in limited mode');
    authContext = { user: null };
  }
  
  const { user } = authContext;

  useEffect(() => {
    if (user?._id || user?.id) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [user?._id, user?.id]);

  // Initialize WebSocket connection for real-time notifications
  useEffect(() => {
    let wsService = null;
    
    const initializeWebSocket = async () => {
      try {
        const userId = user?._id || user?.id;
        if (!userId) return;

        // Import WebSocket service dynamically
        const { default: WebSocketService } = await import('../services/websocket');
        wsService = new WebSocketService();
        
        // Listen for notification events
        wsService.on('notification', (data) => {
          console.log('📨 New notification received:', data);
          const newNotification = {
            id: data.id || Date.now().toString(),
            title: data.title,
            message: data.message || data.body,
            type: data.type || 'info',
            timestamp: safeTimestamp(data.timestamp),
            read: false,
            link: data.actionUrl || data.link
          };
          
          // Add notification to the beginning of the list
          setNotifications(prev => [newNotification, ...prev]);
        });

        wsService.on('event_notification', (data) => {
          console.log('📅 New event notification received:', data);
          const eventNotification = {
            id: data.id || `event-${Date.now()}`,
            title: data.title || 'Nouvel événement',
            message: data.message || data.body,
            type: 'info',
            timestamp: safeTimestamp(data.timestamp),
            read: false,
            link: data.actionUrl || '/events'
          };
          
          setNotifications(prev => [eventNotification, ...prev]);
        });

        // Listen for manager-created events (specifically for creators)
        wsService.on('manager_event_created', (data) => {
          console.log('📅 Manager created new event for creators:', data);
          const eventNotification = {
            id: `manager-event-${Date.now()}`,
            title: 'New Event Available',
            message: `Manager created a new ${data.eventType || 'event'}: ${data.eventTitle || 'Untitled Event'}`,
            type: 'info',
            timestamp: safeTimestamp(data.timestamp),
            read: false,
            link: '/events',
            metadata: {
              eventId: data.eventId,
              eventType: data.eventType,
              eventTitle: data.eventTitle,
              eventStart: data.eventStart,
              createdBy: data.createdBy
            }
          };
          
          setNotifications(prev => [eventNotification, ...prev]);
          
          // Show browser notification if permission is granted
          if (Notification.permission === 'granted') {
            new Notification(eventNotification.title, {
              body: eventNotification.message,
              icon: '/favicon.ico',
              tag: `event-${data.eventId}`,
              requireInteraction: false
            });
          }
        });

        wsService.on('message_notification', (data) => {
          console.log('💬 New message notification received:', data);
          const messageNotification = {
            id: data.id || `msg-${Date.now()}`,
            title: data.title || 'Nouveau message',
            message: data.message || data.body,
            type: 'info',
            timestamp: safeTimestamp(data.timestamp),
            read: false,
            link: data.actionUrl || `/tickets/${data.ticketId}`
          };
          
          setNotifications(prev => [messageNotification, ...prev]);
        });

        wsService.on('connected', () => {
          console.log('🔌 WebSocket connected for notifications');
        });

        wsService.on('error', (error) => {
          console.warn('❌ WebSocket error in notifications:', error);
        });

        // Connect to WebSocket
        wsService.connect(userId, user.role);
        
      } catch (error) {
        console.warn('Failed to initialize WebSocket for notifications:', error);
      }
    };

    if (user) {
      initializeWebSocket();
    }

    // Cleanup function
    return () => {
      if (wsService) {
        wsService.disconnect();
      }
    };
  }, [user]);

  const fetchNotifications = async () => {
    const userId = user?._id || user?.id;
    if (!userId) {
      setNotifications([]);
      return;
    }

    try {
      setLoading(true);
      // Lazy import to avoid initialization issues
      const api = await import('../services/api');
      const response = await api.default.getNotifications(userId);
      setNotifications(response.notifications || []);
    } catch (error) {
      console.warn('Failed to fetch notifications, using empty state:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const addNotification = async (notification) => {
    try {
      const newNotification = {
        id: Date.now().toString(),
        timestamp: safeTimestamp(notification.timestamp),
        read: false,
        ...notification
      };

      // Add to local state immediately (optimistic update)
      setNotifications(prev => [newNotification, ...prev]);

      // Try to save to API in background
      const userId = user?._id || user?.id;
      if (userId) {
        try {
          const api = await import('../services/api');
          await api.default.createNotification(newNotification);
        } catch (error) {
          console.warn('Failed to save notification to API, keeping local only:', error);
        }
      }
    } catch (error) {
      console.warn('Failed to add notification:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      // Update locally immediately
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );

      // Try to update API in background
      const userId = user?._id || user?.id;
      if (userId) {
        try {
          const api = await import('../services/api');
          await api.default.markNotificationAsRead(notificationId);
        } catch (error) {
          console.warn('Failed to mark notification as read in API:', error);
        }
      }
    } catch (error) {
      console.warn('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Update all notifications to read locally immediately
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );

      // Try to update API in background
      const userId = user?._id || user?.id;
      if (userId) {
        try {
          const api = await import('../services/api');
          // Mark all notifications as read for this user
          const unreadNotifications = notifications.filter(n => !n.read);
          await Promise.all(
            unreadNotifications.map(notification =>
              api.default.markNotificationAsRead(notification.id)
            )
          );
        } catch (error) {
          console.warn('Failed to mark all notifications as read in API:', error);
        }
      }
    } catch (error) {
      console.warn('Failed to mark all notifications as read:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      // Clear locally immediately
      setNotifications([]);

      // Try to clear API in background
      const userId = user?._id || user?.id;
      if (userId) {
        try {
          const api = await import('../services/api');
          await api.default.clearNotifications(userId);
        } catch (error) {
          console.warn('Failed to clear notifications in API:', error);
        }
      }
    } catch (error) {
      console.warn('Failed to clear notifications:', error);
    }
  };

  // Compute unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  const value = {
    notifications,
    loading,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 

