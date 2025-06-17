import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';


// ==================== AGENCY PROFILE ====================

// Get agency profile
export const getAgencyProfile = createAsyncThunk(
  'agencyManager/getAgencyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Update agency profile
export const updateAgencyProfile = createAsyncThunk(
  'agencyManager/updateAgencyProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(profileData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY STATS ====================

// Get agency dashboard stats
export const getAgencyStats = createAsyncThunk(
  'agencyManager/getAgencyStats',
  async (_, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY CREATORS CRUD ====================

// Get all agency creators
export const getAgencyCreators = createAsyncThunk(
  'agencyManager/getAgencyCreators',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/creators?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Add creator to agency
export const addCreatorToAgency = createAsyncThunk(
  'agencyManager/addCreatorToAgency',
  async (creatorData, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/creators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(creatorData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Update agency creator
export const updateAgencyCreator = createAsyncThunk(
  'agencyManager/updateAgencyCreator',
  async ({ creatorId, creatorData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/creators/${creatorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(creatorData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Remove creator from agency
export const removeCreatorFromAgency = createAsyncThunk(
  'agencyManager/removeCreatorFromAgency',
  async (creatorId, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/creators/${creatorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return creatorId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY CAMPAIGNS CRUD ====================

// Get all agency campaigns
export const getAgencyCampaigns = createAsyncThunk(
  'agencyManager/getAgencyCampaigns',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/campaigns?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Create agency campaign
export const createAgencyCampaign = createAsyncThunk(
  'agencyManager/createAgencyCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(campaignData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Update agency campaign
export const updateAgencyCampaign = createAsyncThunk(
  'agencyManager/updateAgencyCampaign',
  async ({ campaignId, campaignData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/campaigns/${campaignId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(campaignData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Delete agency campaign
export const deleteAgencyCampaign = createAsyncThunk(
  'agencyManager/deleteAgencyCampaign',
  async (campaignId, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/campaigns/${campaignId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return campaignId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY CONTRACTS CRUD ====================

// Get all agency contracts
export const getAgencyContracts = createAsyncThunk(
  'agencyManager/getAgencyContracts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/contracts?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Create agency contract
export const createAgencyContract = createAsyncThunk(
  'agencyManager/createAgencyContract',
  async (contractData, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(contractData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Update agency contract
export const updateAgencyContract = createAsyncThunk(
  'agencyManager/updateAgencyContract',
  async ({ contractId, contractData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/contracts/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(contractData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Delete agency contract
export const deleteAgencyContract = createAsyncThunk(
  'agencyManager/deleteAgencyContract',
  async (contractId, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/contracts/${contractId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return contractId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY PAYOUTS CRUD ====================

// Get all agency payouts
export const getAgencyPayouts = createAsyncThunk(
  'agencyManager/getAgencyPayouts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/payouts?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Create agency payout
export const createAgencyPayout = createAsyncThunk(
  'agencyManager/createAgencyPayout',
  async (payoutData, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/payouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(payoutData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Update agency payout
export const updateAgencyPayout = createAsyncThunk(
  'agencyManager/updateAgencyPayout',
  async ({ payoutId, payoutData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/payouts/${payoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(payoutData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Delete agency payout
export const deleteAgencyPayout = createAsyncThunk(
  'agencyManager/deleteAgencyPayout',
  async (payoutId, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/payouts/${payoutId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return payoutId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY EVENTS CRUD ====================

// Get all agency events
export const getAgencyEvents = createAsyncThunk(
  'agencyManager/getAgencyEvents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/events?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Create agency event
export const createAgencyEvent = createAsyncThunk(
  'agencyManager/createAgencyEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(eventData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Update agency event
export const updateAgencyEvent = createAsyncThunk(
  'agencyManager/updateAgencyEvent',
  async ({ eventId, eventData }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(eventData),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Delete agency event
export const deleteAgencyEvent = createAsyncThunk(
  'agencyManager/deleteAgencyEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return eventId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY ANALYTICS ====================

// Get agency analytics
export const getAgencyAnalytics = createAsyncThunk(
  'agencyManager/getAgencyAnalytics',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/analytics?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// ==================== AGENCY REPORTS ====================

// Generate agency report
export const generateAgencyReport = createAsyncThunk(
  'agencyManager/generateAgencyReport',
  async (reportParams, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${API_BASE_URL}/agency/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(reportParams),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Get agency reports
export const getAgencyReports = createAsyncThunk(
  'agencyManager/getAgencyReports',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { auth } = getState();
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/agency/reports?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'API request failed');
    }
  }
);

// Initial state
const initialState = {
  // Agency profile
  profile: null,
  
  // Agency stats
  stats: {
    totalCreators: 0,
    activeCreators: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalPayouts: 0,
    pendingPayouts: 0,
    totalContracts: 0,
    activeContracts: 0,
    totalEvents: 0,
    totalViews: 0,
    totalEngagement: 0,
  },
  
  // Data collections
  creators: [],
  campaigns: [],
  contracts: [],
  payouts: [],
  events: [],
  analytics: null,
  reports: [],
  
  // Pagination & filtering
  pagination: {
    creators: { page: 1, limit: 10, total: 0 },
    campaigns: { page: 1, limit: 10, total: 0 },
    contracts: { page: 1, limit: 10, total: 0 },
    payouts: { page: 1, limit: 10, total: 0 },
    events: { page: 1, limit: 10, total: 0 },
    reports: { page: 1, limit: 10, total: 0 },
  },
  
  filters: {
    creators: {},
    campaigns: {},
    contracts: {},
    payouts: {},
    events: {},
    reports: {},
  },
  
  // Loading states
  loading: {
    profile: false,
    stats: false,
    creators: false,
    campaigns: false,
    contracts: false,
    payouts: false,
    events: false,
    analytics: false,
    reports: false,
    creating: false,
    updating: false,
    deleting: false,
    generating: false,
  },
  
  // Error states
  error: {
    profile: null,
    stats: null,
    creators: null,
    campaigns: null,
    contracts: null,
    payouts: null,
    events: null,
    analytics: null,
    reports: null,
    creating: null,
    updating: null,
    deleting: null,
    generating: null,
  },
  
  // UI state
  selectedTab: 0,
  selectedItem: null,
  showCreateModal: false,
  showEditModal: false,
  showDeleteModal: false,
  modalType: null, // 'creator', 'campaign', 'contract', 'payout', 'event'
};

// Agency Manager Slice
const agencyManagerSlice = createSlice({
  name: 'agencyManager',
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
    setCreatorFilters: (state, action) => {
      state.filters.creators = action.payload;
    },
    
    setCampaignFilters: (state, action) => {
      state.filters.campaigns = action.payload;
    },
    
    setContractFilters: (state, action) => {
      state.filters.contracts = action.payload;
    },
    
    setPayoutFilters: (state, action) => {
      state.filters.payouts = action.payload;
    },
    
    setEventFilters: (state, action) => {
      state.filters.events = action.payload;
    },
    
    setReportFilters: (state, action) => {
      state.filters.reports = action.payload;
    },
    
    // Pagination actions
    setCreatorPagination: (state, action) => {
      state.pagination.creators = { ...state.pagination.creators, ...action.payload };
    },
    
    setCampaignPagination: (state, action) => {
      state.pagination.campaigns = { ...state.pagination.campaigns, ...action.payload };
    },
    
    setContractPagination: (state, action) => {
      state.pagination.contracts = { ...state.pagination.contracts, ...action.payload };
    },
    
    setPayoutPagination: (state, action) => {
      state.pagination.payouts = { ...state.pagination.payouts, ...action.payload };
    },
    
    setEventPagination: (state, action) => {
      state.pagination.events = { ...state.pagination.events, ...action.payload };
    },
    
    setReportPagination: (state, action) => {
      state.pagination.reports = { ...state.pagination.reports, ...action.payload };
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.error = {
        profile: null,
        stats: null,
        creators: null,
        campaigns: null,
        contracts: null,
        payouts: null,
        events: null,
        analytics: null,
        reports: null,
        creating: null,
        updating: null,
        deleting: null,
        generating: null,
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
      .addCase(getAgencyProfile.pending, (state) => {
        state.loading.profile = true;
        state.error.profile = null;
      })
      .addCase(getAgencyProfile.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.profile = action.payload;
        state.error.profile = null;
      })
      .addCase(getAgencyProfile.rejected, (state, action) => {
        state.loading.profile = false;
        state.error.profile = action.payload;
      })

    // Update Profile
    builder
      .addCase(updateAgencyProfile.pending, (state) => {
        state.loading.updating = true;
        state.error.updating = null;
      })
      .addCase(updateAgencyProfile.fulfilled, (state, action) => {
        state.loading.updating = false;
        state.profile = { ...state.profile, ...action.payload };
        state.error.updating = null;
      })
      .addCase(updateAgencyProfile.rejected, (state, action) => {
        state.loading.updating = false;
        state.error.updating = action.payload;
      })

    // ==================== STATS ====================
    builder
      .addCase(getAgencyStats.pending, (state) => {
        state.loading.stats = true;
        state.error.stats = null;
      })
      .addCase(getAgencyStats.fulfilled, (state, action) => {
        state.loading.stats = false;
        state.stats = { ...state.stats, ...action.payload };
        state.error.stats = null;
      })
      .addCase(getAgencyStats.rejected, (state, action) => {
        state.loading.stats = false;
        state.error.stats = action.payload;
      })

    // ==================== CREATORS ====================
    builder
      .addCase(getAgencyCreators.pending, (state) => {
        state.loading.creators = true;
        state.error.creators = null;
      })
      .addCase(getAgencyCreators.fulfilled, (state, action) => {
        state.loading.creators = false;
        state.creators = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.creators = action.payload.pagination;
        }
        state.error.creators = null;
      })
      .addCase(getAgencyCreators.rejected, (state, action) => {
        state.loading.creators = false;
        state.error.creators = action.payload;
      })

    // Add Creator
    builder
      .addCase(addCreatorToAgency.pending, (state) => {
        state.loading.creating = true;
        state.error.creating = null;
      })
      .addCase(addCreatorToAgency.fulfilled, (state, action) => {
        state.loading.creating = false;
        state.creators.unshift(action.payload);
        state.stats.totalCreators += 1;
        state.showCreateModal = false;
        state.error.creating = null;
      })
      .addCase(addCreatorToAgency.rejected, (state, action) => {
        state.loading.creating = false;
        state.error.creating = action.payload;
      })

    // Update Creator
    builder
      .addCase(updateAgencyCreator.pending, (state) => {
        state.loading.updating = true;
        state.error.updating = null;
      })
      .addCase(updateAgencyCreator.fulfilled, (state, action) => {
        state.loading.updating = false;
        const index = state.creators.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.creators[index] = action.payload;
        }
        state.showEditModal = false;
        state.selectedItem = null;
        state.error.updating = null;
      })
      .addCase(updateAgencyCreator.rejected, (state, action) => {
        state.loading.updating = false;
        state.error.updating = action.payload;
      })

    // Remove Creator
    builder
      .addCase(removeCreatorFromAgency.pending, (state) => {
        state.loading.deleting = true;
        state.error.deleting = null;
      })
      .addCase(removeCreatorFromAgency.fulfilled, (state, action) => {
        state.loading.deleting = false;
        state.creators = state.creators.filter(c => c.id !== action.payload);
        state.stats.totalCreators -= 1;
        state.showDeleteModal = false;
        state.selectedItem = null;
        state.error.deleting = null;
      })
      .addCase(removeCreatorFromAgency.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error.deleting = action.payload;
      })

    // ==================== CAMPAIGNS ====================
    builder
      .addCase(getAgencyCampaigns.pending, (state) => {
        state.loading.campaigns = true;
        state.error.campaigns = null;
      })
      .addCase(getAgencyCampaigns.fulfilled, (state, action) => {
        state.loading.campaigns = false;
        state.campaigns = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.campaigns = action.payload.pagination;
        }
        state.error.campaigns = null;
      })
      .addCase(getAgencyCampaigns.rejected, (state, action) => {
        state.loading.campaigns = false;
        state.error.campaigns = action.payload;
      })

    // Create Campaign
    builder
      .addCase(createAgencyCampaign.fulfilled, (state, action) => {
        state.campaigns.unshift(action.payload);
        state.stats.totalCampaigns += 1;
        state.showCreateModal = false;
      })

    // Update Campaign
    builder
      .addCase(updateAgencyCampaign.fulfilled, (state, action) => {
        const index = state.campaigns.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.campaigns[index] = action.payload;
        }
        state.showEditModal = false;
        state.selectedItem = null;
      })

    // Delete Campaign
    builder
      .addCase(deleteAgencyCampaign.fulfilled, (state, action) => {
        state.campaigns = state.campaigns.filter(c => c.id !== action.payload);
        state.stats.totalCampaigns -= 1;
        state.showDeleteModal = false;
        state.selectedItem = null;
      })

    // ==================== CONTRACTS ====================
    builder
      .addCase(getAgencyContracts.pending, (state) => {
        state.loading.contracts = true;
        state.error.contracts = null;
      })
      .addCase(getAgencyContracts.fulfilled, (state, action) => {
        state.loading.contracts = false;
        state.contracts = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.contracts = action.payload.pagination;
        }
        state.error.contracts = null;
      })
      .addCase(getAgencyContracts.rejected, (state, action) => {
        state.loading.contracts = false;
        state.error.contracts = action.payload;
      })

    // Create Contract
    builder
      .addCase(createAgencyContract.fulfilled, (state, action) => {
        state.contracts.unshift(action.payload);
        state.stats.totalContracts += 1;
        state.showCreateModal = false;
      })

    // Update Contract
    builder
      .addCase(updateAgencyContract.fulfilled, (state, action) => {
        const index = state.contracts.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.contracts[index] = action.payload;
        }
        state.showEditModal = false;
        state.selectedItem = null;
      })

    // Delete Contract
    builder
      .addCase(deleteAgencyContract.fulfilled, (state, action) => {
        state.contracts = state.contracts.filter(c => c.id !== action.payload);
        state.stats.totalContracts -= 1;
        state.showDeleteModal = false;
        state.selectedItem = null;
      })

    // ==================== PAYOUTS ====================
    builder
      .addCase(getAgencyPayouts.pending, (state) => {
        state.loading.payouts = true;
        state.error.payouts = null;
      })
      .addCase(getAgencyPayouts.fulfilled, (state, action) => {
        state.loading.payouts = false;
        state.payouts = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.payouts = action.payload.pagination;
        }
        state.error.payouts = null;
      })
      .addCase(getAgencyPayouts.rejected, (state, action) => {
        state.loading.payouts = false;
        state.error.payouts = action.payload;
      })

    // Create Payout
    builder
      .addCase(createAgencyPayout.fulfilled, (state, action) => {
        state.payouts.unshift(action.payload);
        state.stats.totalPayouts += 1;
        state.showCreateModal = false;
      })

    // Update Payout
    builder
      .addCase(updateAgencyPayout.fulfilled, (state, action) => {
        const index = state.payouts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.payouts[index] = action.payload;
        }
        state.showEditModal = false;
        state.selectedItem = null;
      })

    // Delete Payout
    builder
      .addCase(deleteAgencyPayout.fulfilled, (state, action) => {
        state.payouts = state.payouts.filter(p => p.id !== action.payload);
        state.stats.totalPayouts -= 1;
        state.showDeleteModal = false;
        state.selectedItem = null;
      })

    // ==================== EVENTS ====================
    builder
      .addCase(getAgencyEvents.pending, (state) => {
        state.loading.events = true;
        state.error.events = null;
      })
      .addCase(getAgencyEvents.fulfilled, (state, action) => {
        state.loading.events = false;
        state.events = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.events = action.payload.pagination;
        }
        state.error.events = null;
      })
      .addCase(getAgencyEvents.rejected, (state, action) => {
        state.loading.events = false;
        state.error.events = action.payload;
      })

    // Create Event
    builder
      .addCase(createAgencyEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
        state.stats.totalEvents += 1;
        state.showCreateModal = false;
      })

    // Update Event
    builder
      .addCase(updateAgencyEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.showEditModal = false;
        state.selectedItem = null;
      })

    // Delete Event
    builder
      .addCase(deleteAgencyEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e.id !== action.payload);
        state.stats.totalEvents -= 1;
        state.showDeleteModal = false;
        state.selectedItem = null;
      })

    // ==================== ANALYTICS ====================
    builder
      .addCase(getAgencyAnalytics.pending, (state) => {
        state.loading.analytics = true;
        state.error.analytics = null;
      })
      .addCase(getAgencyAnalytics.fulfilled, (state, action) => {
        state.loading.analytics = false;
        state.analytics = action.payload;
        state.error.analytics = null;
      })
      .addCase(getAgencyAnalytics.rejected, (state, action) => {
        state.loading.analytics = false;
        state.error.analytics = action.payload;
      })

    // ==================== REPORTS ====================
    builder
      .addCase(getAgencyReports.pending, (state) => {
        state.loading.reports = true;
        state.error.reports = null;
      })
      .addCase(getAgencyReports.fulfilled, (state, action) => {
        state.loading.reports = false;
        state.reports = action.payload.data || action.payload;
        if (action.payload.pagination) {
          state.pagination.reports = action.payload.pagination;
        }
        state.error.reports = null;
      })
      .addCase(getAgencyReports.rejected, (state, action) => {
        state.loading.reports = false;
        state.error.reports = action.payload;
      })

    // Generate Report
    builder
      .addCase(generateAgencyReport.pending, (state) => {
        state.loading.generating = true;
        state.error.generating = null;
      })
      .addCase(generateAgencyReport.fulfilled, (state, action) => {
        state.loading.generating = false;
        state.reports.unshift(action.payload);
        state.error.generating = null;
      })
      .addCase(generateAgencyReport.rejected, (state, action) => {
        state.loading.generating = false;
        state.error.generating = action.payload;
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
  setCreatorFilters,
  setCampaignFilters,
  setContractFilters,
  setPayoutFilters,
  setEventFilters,
  setReportFilters,
  setCreatorPagination,
  setCampaignPagination,
  setContractPagination,
  setPayoutPagination,
  setEventPagination,
  setReportPagination,
  clearErrors,
  clearAllData,
  clearError,
} = agencyManagerSlice.actions;

// Selectors
export const selectAgencyProfile = (state) => state.agencyManager.profile;
export const selectAgencyStats = (state) => state.agencyManager.stats;
export const selectAgencyCreators = (state) => state.agencyManager.creators;
export const selectAgencyCampaigns = (state) => state.agencyManager.campaigns;
export const selectAgencyContracts = (state) => state.agencyManager.contracts;
export const selectAgencyPayouts = (state) => state.agencyManager.payouts;
export const selectAgencyEvents = (state) => state.agencyManager.events;
export const selectAgencyAnalytics = (state) => state.agencyManager.analytics;
export const selectAgencyReports = (state) => state.agencyManager.reports;
export const selectAgencyLoading = (state) => state.agencyManager.loading;
export const selectAgencyErrors = (state) => state.agencyManager.error;
export const selectAgencySelectedTab = (state) => state.agencyManager.selectedTab;
export const selectAgencySelectedItem = (state) => state.agencyManager.selectedItem;
export const selectAgencyPagination = (state) => state.agencyManager.pagination;
export const selectAgencyFilters = (state) => state.agencyManager.filters;
export const selectAgencyModals = (state) => ({
  showCreateModal: state.agencyManager.showCreateModal,
  showEditModal: state.agencyManager.showEditModal,
  showDeleteModal: state.agencyManager.showDeleteModal,
  modalType: state.agencyManager.modalType,
});

// Export reducer
export default agencyManagerSlice.reducer;
