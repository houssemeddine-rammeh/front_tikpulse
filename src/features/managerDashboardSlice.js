import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// ==================== MANAGER PROFILE ====================

// Get manager profile
export const getManagerProfile = createAsyncThunk(
  "managerDashboard/getManagerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/manager/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch manager profile"
      );
    }
  }
);

// Update manager profile
export const updateManagerProfile = createAsyncThunk(
  "managerDashboard/updateManagerProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/manager/profile", profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update manager profile"
      );
    }
  }
);

// ==================== DASHBOARD STATS ====================

// Get manager dashboard stats
export const getManagerStats = createAsyncThunk(
  "managerDashboard/getManagerStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/statsManager");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch manager stats"
      );
    }
  }
);

// ==================== CAMPAIGNS CRUD ====================

// Get all campaigns
export const getCampaigns = createAsyncThunk(
  "managerDashboard/getCampaigns",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/manager/campaigns", {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch campaigns"
      );
    }
  }
);

// Create campaign
export const createCampaign = createAsyncThunk(
  "managerDashboard/createCampaign",
  async (campaignData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/manager/campaigns",
        campaignData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create campaign"
      );
    }
  }
);

// Update campaign
export const updateCampaign = createAsyncThunk(
  "managerDashboard/updateCampaign",
  async ({ campaignId, campaignData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/manager/campaigns/${campaignId}`,
        campaignData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update campaign"
      );
    }
  }
);

// Delete campaign
export const deleteCampaign = createAsyncThunk(
  "managerDashboard/deleteCampaign",
  async (campaignId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/manager/campaigns/${campaignId}`);
      return campaignId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete campaign"
      );
    }
  }
);

// ==================== CREATORS CRUD ====================

// Get all creators
export const getCreators = createAsyncThunk(
  "managerDashboard/getCreators",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/manager/creators", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch creators"
      );
    }
  }
);

// Create creator
export const createCreator = createAsyncThunk(
  "managerDashboard/createCreator",
  async (creatorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/createUser_manager",
        creatorData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create creator"
      );
    }
  }
);

// Update creator
export const updateCreator = createAsyncThunk(
  "managerDashboard/updateCreator",
  async ({ creatorId, creatorData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/users/updateUser_manager/${creatorId}`,
        creatorData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update creator"
      );
    }
  }
);

// Delete creator
export const deleteCreator = createAsyncThunk(
  "managerDashboard/deleteCreator",
  async (creatorId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/manager/creators/${creatorId}`);
      return creatorId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete creator"
      );
    }
  }
);

// ==================== COMPANIES CRUD ====================

// Get all companies
export const getCompanies = createAsyncThunk(
  "managerDashboard/getCompanies",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/manager/companies", {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch companies"
      );
    }
  }
);

// Create company
export const createCompany = createAsyncThunk(
  "managerDashboard/createCompany",
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/manager/companies",
        companyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create company"
      );
    }
  }
);

// Update company
export const updateCompany = createAsyncThunk(
  "managerDashboard/updateCompany",
  async ({ companyId, companyData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/manager/companies/${companyId}`,
        companyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update company"
      );
    }
  }
);

// Delete company
export const deleteCompany = createAsyncThunk(
  "managerDashboard/deleteCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/manager/companies/${companyId}`);
      return companyId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete company"
      );
    }
  }
);

// ==================== ANALYTICS ====================

// Get analytics data
export const getAnalytics = createAsyncThunk(
  "managerDashboard/getAnalytics",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/manager/analytics", {
        params,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch analytics"
      );
    }
  }
);

// ==================== EVENTS ====================

// Get events
export const getEvents = createAsyncThunk(
  "managerDashboard/getEvents",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/manager/events", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch events"
      );
    }
  }
);

// Create event
export const createEvent = createAsyncThunk(
  "managerDashboard/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/manager/events", eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create event"
      );
    }
  }
);

// Update event
export const updateEvent = createAsyncThunk(
  "managerDashboard/updateEvent",
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/manager/events/${eventId}`,
        eventData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update event"
      );
    }
  }
);

// Delete event
export const deleteEvent = createAsyncThunk(
  "managerDashboard/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/manager/events/${eventId}`);
      return eventId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete event"
      );
    }
  }
);

// Initial state
const initialState = {
  managerData: null,
  loading: false,
  error: null,
};

// Manager Dashboard Slice
const managerDashboardSlice = createSlice({
  name: "managerDashboard",
  initialState,
  reducers: {
    // UI actions
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },

    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },

    setShowCreateModal: (state, action) => {
      state.showCreateModal = action.payload;
    },

    setShowEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },

    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },

    setModalType: (state, action) => {
      state.modalType = action.payload;
    },

    // Filter actions
    setCampaignFilters: (state, action) => {
      state.filters.campaigns = action.payload;
    },

    setCreatorFilters: (state, action) => {
      state.filters.creators = action.payload;
    },

    setCompanyFilters: (state, action) => {
      state.filters.companies = action.payload;
    },

    setEventFilters: (state, action) => {
      state.filters.events = action.payload;
    },

    // Pagination actions
    setCampaignPagination: (state, action) => {
      state.pagination.campaigns = {
        ...state.pagination.campaigns,
        ...action.payload,
      };
    },

    setCreatorPagination: (state, action) => {
      state.pagination.creators = {
        ...state.pagination.creators,
        ...action.payload,
      };
    },

    setCompanyPagination: (state, action) => {
      state.pagination.companies = {
        ...state.pagination.companies,
        ...action.payload,
      };
    },

    setEventPagination: (state, action) => {
      state.pagination.events = {
        ...state.pagination.events,
        ...action.payload,
      };
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = {
        profile: null,
        stats: null,
        campaigns: null,
        creators: null,
        companies: null,
        events: null,
        analytics: null,
        creating: null,
        updating: null,
        deleting: null,
      };
    },

    // Clear all data (for logout)
    clearAllData: (state) => {
      return { ...initialState };
    },

    // Reset specific error
    clearError: (state, action) => {
      const errorType = action.payload;
      if (state.error[errorType] !== undefined) {
        state.error[errorType] = null;
      }
    },
  },

  extraReducers: (builder) => {
    // ==================== PROFILE ====================
    builder
      .addCase(getManagerProfile.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
      })
      .addCase(getManagerProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.profile = action.payload;
        state.error.profile = null;
      })
      .addCase(getManagerProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.error.profile = action.payload;
      });

    // Update Profile
    builder
      .addCase(updateManagerProfile.pending, (state) => {
        state.loading.updating = true;
        state.error.updating = null;
      })
      .addCase(updateManagerProfile.fulfilled, (state, action) => {
        state.loading.updating = false;
        state.profile = { ...state.profile, ...action.payload };
        state.error.updating = null;
      })
      .addCase(updateManagerProfile.rejected, (state, action) => {
        state.loading.updating = false;
        state.error.updating = action.payload;
      });

    // ==================== STATS ====================
    builder
      .addCase(getManagerStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getManagerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.managerData = action.payload;
        state.error = null;
      })
      .addCase(getManagerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==================== CAMPAIGNS ====================
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.loading.campaigns = true;
        state.error.campaigns = null;
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.loading.campaigns = false;
        state.campaigns = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.campaigns = action.payload.pagination;
        }
        state.error.campaigns = null;
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.loading.campaigns = false;
        state.error.campaigns = action.payload;
      });

    // Create Campaign
    builder
      .addCase(createCampaign.pending, (state) => {
        state.loading.creating = true;
        state.error.creating = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading.creating = false;
        state.campaigns.unshift(action.payload);
        state.stats.totalCampaigns += 1;
        state.showCreateModal = false;
        state.error.creating = null;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading.creating = false;
        state.error.creating = action.payload;
      });

    // Update Campaign
    builder
      .addCase(updateCampaign.pending, (state) => {
        state.loading.updating = true;
        state.error.updating = null;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading.updating = false;
        const index = state.campaigns.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.campaigns[index] = action.payload;
        }
        state.showEditModal = false;
        state.selectedItem = null;
        state.error.updating = null;
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading.updating = false;
        state.error.updating = action.payload;
      });

    // Delete Campaign
    builder
      .addCase(deleteCampaign.pending, (state) => {
        state.loading.deleting = true;
        state.error.deleting = null;
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.loading.deleting = false;
        state.campaigns = state.campaigns.filter(
          (c) => c.id !== action.payload
        );
        state.stats.totalCampaigns -= 1;
        state.showDeleteModal = false;
        state.selectedItem = null;
        state.error.deleting = null;
      })
      .addCase(deleteCampaign.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error.deleting = action.payload;
      });

    // ==================== CREATORS ====================
    builder
      .addCase(getCreators.pending, (state) => {
        state.loading.creators = true;
        state.error.creators = null;
      })
      .addCase(getCreators.fulfilled, (state, action) => {
        state.loading.creators = false;
        state.creators = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.creators = action.payload.pagination;
        }
        state.error.creators = null;
      })
      .addCase(getCreators.rejected, (state, action) => {
        state.loading.creators = false;
        state.error.creators = action.payload;
      });

    // Create Creator

    builder.addCase(createCreator.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createCreator.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createCreator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Creator
    builder.addCase(updateCreator.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCreator.fulfilled, (state) => {
     state.loading = false;
     state.error = null;
    });
    builder.addCase(updateCreator.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete Creator
    builder.addCase(deleteCreator.fulfilled, (state, action) => {
      state.creators = state.creators.filter((c) => c.id !== action.payload);
      state.stats.totalCreators -= 1;
      state.showDeleteModal = false;
      state.selectedItem = null;
    });

    // ==================== COMPANIES ====================
    builder
      .addCase(getCompanies.pending, (state) => {
        state.loading.companies = true;
        state.error.companies = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading.companies = false;
        state.companies = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.companies = action.payload.pagination;
        }
        state.error.companies = null;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading.companies = false;
        state.error.companies = action.payload;
      });

    // Create Company
    builder.addCase(createCompany.fulfilled, (state, action) => {
      state.companies.unshift(action.payload);
      state.stats.totalCompanies += 1;
      state.showCreateModal = false;
    });

    // Update Company
    builder.addCase(updateCompany.fulfilled, (state, action) => {
      const index = state.companies.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
      state.showEditModal = false;
      state.selectedItem = null;
    });

    // Delete Company
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.companies = state.companies.filter((c) => c.id !== action.payload);
      state.stats.totalCompanies -= 1;
      state.showDeleteModal = false;
      state.selectedItem = null;
    });

    // ==================== EVENTS ====================
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading.events = true;
        state.error.events = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading.events = false;
        state.events = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.events = action.payload.pagination;
        }
        state.error.events = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading.events = false;
        state.error.events = action.payload;
      });

    // Create Event
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.events.unshift(action.payload);
      state.stats.totalEvents += 1;
      state.showCreateModal = false;
    });

    // Update Event
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
      state.showEditModal = false;
      state.selectedItem = null;
    });

    // Delete Event
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
      state.stats.totalEvents -= 1;
      state.showDeleteModal = false;
      state.selectedItem = null;
    });

    // ==================== ANALYTICS ====================
    builder
      .addCase(getAnalytics.pending, (state) => {
        state.loading.analytics = true;
        state.error.analytics = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading.analytics = false;
        state.analytics = action.payload;
        state.error.analytics = null;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading.analytics = false;
        state.error.analytics = action.payload;
      });
  },
});

// Export actions
export const {
  setSelectedTab,
  setSelectedItem,
  setShowCreateModal,
  setShowEditModal,
  setShowDeleteModal,
  setModalType,
  setCampaignFilters,
  setCreatorFilters,
  setCompanyFilters,
  setEventFilters,
  setCampaignPagination,
  setCreatorPagination,
  setCompanyPagination,
  setEventPagination,
  clearErrors,
  clearAllData,
  clearError,
} = managerDashboardSlice.actions;

// Selectors
export const selectManagerProfile = (state) => state.managerDashboard.profile;
export const selectManagerStats = (state) => state.managerDashboard.stats;
export const selectCampaigns = (state) => state.managerDashboard.campaigns;
export const selectCreators = (state) => state.managerDashboard.creators;
export const selectCompanies = (state) => state.managerDashboard.companies;
export const selectEvents = (state) => state.managerDashboard.events;
export const selectAnalytics = (state) => state.managerDashboard.analytics;
export const selectManagerLoading = (state) => state.managerDashboard.loading;
export const selectManagerErrors = (state) => state.managerDashboard.error;
export const selectManagerSelectedTab = (state) =>
  state.managerDashboard.selectedTab;
export const selectManagerSelectedItem = (state) =>
  state.managerDashboard.selectedItem;
export const selectManagerPagination = (state) =>
  state.managerDashboard.pagination;
export const selectManagerFilters = (state) => state.managerDashboard.filters;
export const selectManagerModals = (state) => ({
  showCreateModal: state.managerDashboard.showCreateModal,
  showEditModal: state.managerDashboard.showEditModal,
  showDeleteModal: state.managerDashboard.showDeleteModal,
  modalType: state.managerDashboard.modalType,
});

// Export reducer
export default managerDashboardSlice.reducer;
