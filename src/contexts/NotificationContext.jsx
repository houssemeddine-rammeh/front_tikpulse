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
    if (user?.id) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [user?.id]);

  const fetchNotifications = async () => {
    if (!user?.id) {
      setNotifications([]);
      return;
    }

    try {
      setLoading(true);
      // Lazy import to avoid initialization issues
      const api = await import('../services/api');
      const response = await api.default.getNotifications(user.id);
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
        timestamp: new Date().toISOString(),
        read: false,
        ...notification
      };

      // Add to local state immediately (optimistic update)
      setNotifications(prev => [newNotification, ...prev]);

      // Try to save to API in background
      if (user?.id) {
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
      if (user?.id) {
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

  const clearNotifications = async () => {
    try {
      // Clear locally immediately
      setNotifications([]);

      // Try to clear API in background
      if (user?.id) {
        try {
          const api = await import('../services/api');
          await api.default.clearNotifications(user.id);
        } catch (error) {
          console.warn('Failed to clear notifications in API:', error);
        }
      }
    } catch (error) {
      console.warn('Failed to clear notifications:', error);
    }
  };

  const value = {
    notifications,
    loading,
    addNotification,
    markAsRead,
    clearNotifications,
    fetchNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 

