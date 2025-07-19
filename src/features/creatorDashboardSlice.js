import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async thunk for getting creator profile information
export const getCreatorProfile = createAsyncThunk(
  "creatorDashboard/getCreatorProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch creator profile"
      );
    }
  }
);

// Async thunk for updating creator profile
export const updateCreatorProfile = createAsyncThunk(
  "creatorDashboard/updateCreatorProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/auth/profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update creator profile"
      );
    }
  }
);

// Async thunk for getting creator dashboard stats
export const getCreatorStats = createAsyncThunk(
  "creatorDashboard/getCreatorStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/creator/stats");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch creator stats"
      );
    }
  }
);

// Async thunk for joining an event
export const joinEvent = createAsyncThunk(
  "creatorDashboard/joinEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/events/${eventId}/join`);
      return { eventId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to join event"
      );
    }
  }
);

// Async thunk for joining a campaign
export const joinCampaign = createAsyncThunk(
  "creatorDashboard/joinCampaign",
  async (campaignId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/campaigns/${campaignId}/join`
      );
      return { campaignId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to join campaign"
      );
    }
  }
);

// Async thunk for getting available events
export const getAvailableEvents = createAsyncThunk(
  "creatorDashboard/getAvailableEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/events/available");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch available events"
      );
    }
  }
);

// Async thunk for getting available campaigns
export const getAvailableCampaigns = createAsyncThunk(
  "creatorDashboard/getAvailableCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/campaigns/available");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch available campaigns"
      );
    }
  }
);

// Initial state
const initialState = {
  creator: {},
  loading: false,
  error: null,
};

// Creator Dashboard Slice
const creatorDashboardSlice = createSlice({
  name: "creatorDashboard",
  initialState,
  reducers: {
    // UI actions
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },

    setShowJoinModal: (state, action) => {
      state.showJoinModal = action.payload;
    },

    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = {
        profile: null,
        stats: null,
        events: null,
        campaigns: null,
        joining: null,
      };
    },

    // Clear profile data (for logout)
    clearProfile: (state) => {
      state.profile = null;
      state.stats = initialState.stats;
      state.availableEvents = [];
      state.joinedEvents = [];
      state.availableCampaigns = [];
      state.joinedCampaigns = [];
    },

    // Update profile locally
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    // Update stats locally
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    // Get Creator Profile
    builder
      .addCase(getCreatorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCreatorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.creator = action.payload.user;
        state.error = null;
      })
      .addCase(getCreatorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Creator Profile
    builder
      .addCase(updateCreatorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCreatorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.creator = { ...state.creator, ...action.payload.user };
        state.error = null;
      })
      .addCase(updateCreatorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Creator Stats
    builder
      .addCase(getCreatorStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(getCreatorStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = { ...state.stats, ...action.payload };
        state.error.stats = null;
      })
      .addCase(getCreatorStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload;
      });

    // Get Available Events
    builder
      .addCase(getAvailableEvents.pending, (state) => {
        state.loading.events = true;
        state.error.events = null;
      })
      .addCase(getAvailableEvents.fulfilled, (state, action) => {
        state.loading.events = false;
        state.availableEvents = action.payload;
        state.error.events = null;
      })
      .addCase(getAvailableEvents.rejected, (state, action) => {
        state.loading.events = false;
        state.error.events = action.payload;
      });

    // Get Available Campaigns
    builder
      .addCase(getAvailableCampaigns.pending, (state) => {
        state.loading.campaigns = true;
        state.error.campaigns = null;
      })
      .addCase(getAvailableCampaigns.fulfilled, (state, action) => {
        state.loading.campaigns = false;
        state.availableCampaigns = action.payload;
        state.error.campaigns = null;
      })
      .addCase(getAvailableCampaigns.rejected, (state, action) => {
        state.loading.campaigns = false;
        state.error.campaigns = action.payload;
      });

    // Join Event
    builder
      .addCase(joinEvent.pending, (state) => {
        state.loading.joining = true;
        state.error.joining = null;
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        state.loading.joining = false;
        // Update the event in available events
        state.availableEvents = state.availableEvents.filter(
          (event) => event._id !== action.payload.eventId
        );
        state.joinedEvents.push(action.payload);
        state.error.joining = null;
      })
      .addCase(joinEvent.rejected, (state, action) => {
        state.loading.joining = false;
        state.error.joining = action.payload;
      });

    // Join Campaign
    builder
      .addCase(joinCampaign.pending, (state) => {
        state.loading.joining = true;
        state.error.joining = null;
      })
      .addCase(joinCampaign.fulfilled, (state, action) => {
        state.loading.joining = false;
        // Update the campaign in available campaigns
        state.availableCampaigns = state.availableCampaigns.filter(
          (campaign) => campaign._id !== action.payload.campaignId
        );
        state.joinedCampaigns.push(action.payload);
        state.error.joining = null;
      })
      .addCase(joinCampaign.rejected, (state, action) => {
        state.loading.joining = false;
        state.error.joining = action.payload;
      });
  },
});

export const {
  setSelectedTab,
  setShowJoinModal,
  setSelectedItem,
  clearErrors,
  clearProfile,
  updateProfile,
  updateStats,
} = creatorDashboardSlice.actions;

export default creatorDashboardSlice.reducer;

// Selectors
export const selectCreatorProfile = (state) => state.creatorDashboard.profile;
export const selectCreatorStats = (state) => state.creatorDashboard.stats;
export const selectAvailableEvents = (state) =>
  state.creatorDashboard.availableEvents;
export const selectJoinedEvents = (state) =>
  state.creatorDashboard.joinedEvents;
export const selectAvailableCampaigns = (state) =>
  state.creatorDashboard.availableCampaigns;
export const selectJoinedCampaigns = (state) =>
  state.creatorDashboard.joinedCampaigns;
export const selectCreatorLoading = (state) => state.creatorDashboard.loading;
export const selectCreatorErrors = (state) => state.creatorDashboard.error;
export const selectSelectedTab = (state) => state.creatorDashboard.selectedTab;
export const selectShowJoinModal = (state) =>
  state.creatorDashboard.showJoinModal;
export const selectSelectedItem = (state) =>
  state.creatorDashboard.selectedItem;
