// API Service - Frontend Only Implementation
// Backend functionality removed, returning empty data or errors

import axiosInstance from "../api/axiosInstance";

// API implementations
const api = {
  // Creator endpoints
  async getCreators() {
    try {
      const response = await axiosInstance.get("/creators");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty creators list");
      return { users: [] };
    }
  },

  async getCreatorById(id) {
    try {
      const response = await axiosInstance.get(`/creators/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, creator not found");
      throw new Error("Creator not found");
    }
  },

  async createCreator(creatorData) {
    try {
      const response = await axiosInstance.post("/creators", creatorData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot create creator");
      throw new Error("Cannot create creator - backend not available");
    }
  },

  async updateCreator(id, userData) {
    try {
      const response = await axiosInstance.put(`/creators/${id}`, userData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot update creator");
      throw new Error("Cannot update creator - backend not available");
    }
  },

  async deleteCreator(id) {
    try {
      await axiosInstance.delete(`/creators/${id}`);
      return { success: true };
    } catch (error) {
      console.warn("Backend not available, cannot delete creator");
      throw new Error("Cannot delete creator - backend not available");
    }
  },

  // Support ticket endpoints
  async getSupportTickets() {
    return { tickets: [] };
  },

  async getSupportTicketById(id) {
    try {
      const response = await axiosInstance.get(`/support/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, ticket not found");
      throw new Error("Ticket not found");
    }
  },

  async getTicketsByCreator(creatorId) {
    try {
      const response = await axiosInstance.get(
        `/support/tickets/creator/${creatorId}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty tickets list");
      return { tickets: [] };
    }
  },

  async getTicketsByManager(managerId) {
    try {
      const response = await axiosInstance.get(
        `/support/tickets/manager/${managerId}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty tickets list");
      return { tickets: [] };
    }
  },

  async createSupportTicket(ticketData) {
    try {
      const response = await axiosInstance.post("/support/tickets", ticketData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot create ticket");
      throw new Error("Cannot create ticket - backend not available");
    }
  },

  async updateSupportTicket(id, ticketData) {
    try {
      const response = await axiosInstance.put(
        `/support/tickets/${id}`,
        ticketData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot update ticket");
      throw new Error("Cannot update ticket - backend not available");
    }
  },

  async deleteSupportTicket(id) {
    try {
      await axiosInstance.delete(`/support/tickets/${id}`);
      return { success: true };
    } catch (error) {
      console.warn("Backend not available, cannot delete ticket");
      throw new Error("Cannot delete ticket - backend not available");
    }
  },

  async addTicketMessage(ticketId, messageData) {
    try {
      const response = await axiosInstance.post(
        `/support/tickets/${ticketId}/messages`,
        messageData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot add message");
      throw new Error("Cannot add message - backend not available");
    }
  },

  // Analytics endpoints
  async getAnalytics(params) {
    try {
      const response = await axiosInstance.get("/analytics", { params });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty analytics");
      return { data: null };
    }
  },

  async getMonthlyStats() {
    try {
      // Use the new endpoint for manager analytics
      const response = await axiosInstance.get("/users/monthly-stats");
      return response.data.data;
    } catch (error) {
      console.warn("Backend not available, returning empty monthly stats");
      return {
        current: { totalCreators: 0, totalFollowers: 0, totalViews: 0, totalDiamonds: 0 },
        lastMonth: { totalCreators: 0, totalFollowers: 0, totalViews: 0, totalDiamonds: 0 },
      };
    }
  },

  async getPerformanceMetrics(params) {
    try {
      const response = await axiosInstance.get("/analytics/performance", {
        params,
      });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty metrics");
      return { metrics: [] };
    }
  },

  async getRealtimeMetrics(params) {
    try {
      const response = await axiosInstance.get("/analytics/realtime", {
        params,
      });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty realtime data");
      return { data: [] };
    }
  },

  async getCampaignMetrics(campaignId) {
    try {
      const response = await axiosInstance.get(
        `/analytics/campaigns/${campaignId}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty campaign metrics");
      return { metrics: {} };
    }
  },

  async getDashboardData() {
    try {
      const response = await axiosInstance.get("/dashboard");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty dashboard data");
      return { data: {} };
    }
  },

  async uploadFile(file, path) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);

      const response = await axiosInstance.post("/upload", formData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot upload file");
      throw new Error("Cannot upload file - backend not available");
    }
  },

  async exportData(type, format) {
    try {
      const response = await axiosInstance.get(`/export/${type}`, {
        params: { format },
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot export data");
      throw new Error("Cannot export data - backend not available");
    }
  },

  // Authentication endpoints
  async login(email, password) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, login failed");
      throw new Error("Login failed - backend not available");
    }
  },

  async register(userData) {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, registration failed");
      throw new Error("Registration failed - backend not available");
    }
  },

  async refreshToken() {
    try {
      const response = await axiosInstance.post("/auth/refresh");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, token refresh failed");
      throw new Error("Token refresh failed - backend not available");
    }
  },

  async getCurrentUser() {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot get current user");
      return { user: null };
    }
  },

  async getUsers() {
    try {
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty users list");
      return { users: [] };
    }
  },

  async getUsersByRole(role) {
    try {
      const response = await axiosInstance.get("/users", { params: { role } });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty users list");
      return { users: [] };
    }
  },

  async updateUserProfile(userData) {
    try {
      const response = await axiosInstance.put("/users/profile", userData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot update profile");
      throw new Error("Cannot update profile - backend not available");
    }
  },

  async changePassword(passwordData) {
    try {
      const response = await axiosInstance.put("/users/password", passwordData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot change password");
      throw new Error("Cannot change password - backend not available");
    }
  },

  // Notification endpoints
  async getNotifications(userId) {
    try {
      const response = await axiosInstance.get(`/notifications/${userId}`);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty notifications");
      return { notifications: [] };
    }
  },

  async createNotification(notificationData) {
    try {
      const response = await axiosInstance.post(
        "/notifications",
        notificationData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot create notification");
      throw new Error("Cannot create notification - backend not available");
    }
  },

  async markNotificationAsRead(notificationId) {
    try {
      const response = await axiosInstance.put(
        `/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot mark notification as read");
      throw new Error(
        "Cannot mark notification as read - backend not available"
      );
    }
  },

  async clearNotifications(userId) {
    try {
      const response = await axiosInstance.delete(`/notifications/${userId}`);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot clear notifications");
      throw new Error("Cannot clear notifications - backend not available");
    }
  },
};

export default api;

// Named exports for specific API modules
export const authAPI = {
  login: api.login,
  register: api.register,
  refreshToken: api.refreshToken,
  getCurrentUser: api.getCurrentUser,
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  loginWithTikTok: async (authCode) => {
    try {
      const response = await axiosInstance.post("/auth/tiktok", { authCode });
      return response.data;
    } catch (error) {
      console.warn("Backend not available, TikTok login failed");
      throw new Error("TikTok login failed - backend not available");
    }
  },
};

export const creatorsAPI = {
  getCreators: api.getCreators,
  getCreatorById: api.getCreatorById,
  createCreator: api.createCreator,
  updateCreator: api.updateCreator,
  deleteCreator: api.deleteCreator,
};

export const ticketsAPI = {
  getSupportTickets: api.getSupportTickets,
  getSupportTicketById: api.getSupportTicketById,
  getTicketsByCreator: api.getTicketsByCreator,
  getTicketsByManager: api.getTicketsByManager,
  createSupportTicket: api.createSupportTicket,
  updateSupportTicket: api.updateSupportTicket,
  deleteSupportTicket: api.deleteSupportTicket,
  addTicketMessage: api.addTicketMessage,
};

export const eventsAPI = {
  getEvents: async () => {
    try {
      const response = await axiosInstance.get("/events");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty events list");
      return { events: [] };
    }
  },
  createEvent: async (eventData) => {
    try {
      const response = await axiosInstance.post("/events", eventData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot create event");
      throw new Error("Cannot create event - backend not available");
    }
  },
  updateEvent: async (id, eventData) => {
    try {
      const response = await axiosInstance.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot update event");
      throw new Error("Cannot update event - backend not available");
    }
  },
  deleteEvent: async (id) => {
    try {
      await axiosInstance.delete(`/events/${id}`);
      return { success: true };
    } catch (error) {
      console.warn("Backend not available, cannot delete event");
      throw new Error("Cannot delete event - backend not available");
    }
  },
};

export const campaignsAPI = {
  getCampaigns: async () => {
    try {
      const response = await axiosInstance.get("/campaigns");
      return response.data;
    } catch (error) {
      console.warn("Backend not available, returning empty campaigns list");
      return { campaigns: [] };
    }
  },
  createCampaign: async (campaignData) => {
    try {
      const response = await axiosInstance.post("/campaigns", campaignData);
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot create campaign");
      throw new Error("Cannot create campaign - backend not available");
    }
  },
  updateCampaign: async (id, campaignData) => {
    try {
      const response = await axiosInstance.put(
        `/campaigns/${id}`,
        campaignData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend not available, cannot update campaign");
      throw new Error("Cannot update campaign - backend not available");
    }
  },
  deleteCampaign: async (id) => {
    try {
      await axiosInstance.delete(`/campaigns/${id}`);
      return { success: true };
    } catch (error) {
      console.warn("Backend not available, cannot delete campaign");
      throw new Error("Cannot delete campaign - backend not available");
    }
  },
};
