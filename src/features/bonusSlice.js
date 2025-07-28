import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

// Async thunk for fetching bonus rules
export const fetchBonusRules = createAsyncThunk(
  'bonus/fetchBonusRules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/bonus-rules');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch bonus rules'
      );
    }
  }
);

// Async thunk for fetching creators with bonus (for managers)
export const fetchCreatorsWithBonus = createAsyncThunk(
  'bonus/fetchCreatorsWithBonus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/creators-with-bonus');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch creators with bonus'
      );
    }
  }
);

// Async thunk for fetching creator bonus
export const fetchCreatorBonus = createAsyncThunk(
  'bonus/fetchCreatorBonus',
  async (tikTokId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/creator-bonus/${tikTokId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch creator bonus'
      );
    }
  }
);

const initialState = {
  rules: [],
  creatorsWithBonus: [],
  creatorBonus: null,
  totalBonus: 0,
  loading: {
    rules: false,
    creators: false,
    creator: false
  },
  error: {
    rules: null,
    creators: null,
    creator: null
  }
};

const bonusSlice = createSlice({
  name: 'bonus',
  initialState,
  reducers: {
    clearBonusData: (state) => {
      state.creatorsWithBonus = [];
      state.creatorBonus = null;
      state.totalBonus = 0;
    },
    clearErrors: (state) => {
      state.error = {
        rules: null,
        creators: null,
        creator: null
      };
    }
  },
  extraReducers: (builder) => {
    // Fetch bonus rules
    builder
      .addCase(fetchBonusRules.pending, (state) => {
        state.loading.rules = true;
        state.error.rules = null;
      })
      .addCase(fetchBonusRules.fulfilled, (state, action) => {
        state.loading.rules = false;
        state.rules = action.payload.data;
        state.error.rules = null;
      })
      .addCase(fetchBonusRules.rejected, (state, action) => {
        state.loading.rules = false;
        state.error.rules = action.payload;
      });

    // Fetch creators with bonus
    builder
      .addCase(fetchCreatorsWithBonus.pending, (state) => {
        state.loading.creators = true;
        state.error.creators = null;
      })
      .addCase(fetchCreatorsWithBonus.fulfilled, (state, action) => {
        state.loading.creators = false;
        // Accept both array and object responses
        state.creatorsWithBonus = Array.isArray(action.payload.data)
          ? action.payload.data
          : action.payload.data.creators || [];
        // Recalculate totalBonus if needed
        state.totalBonus = Array.isArray(state.creatorsWithBonus)
          ? state.creatorsWithBonus.reduce((sum, c) => sum + (c.bonus?.bonusAmount || 0), 0)
          : 0;
        state.error.creators = null;
      })
      .addCase(fetchCreatorsWithBonus.rejected, (state, action) => {
        state.loading.creators = false;
        state.error.creators = action.payload;
      });

    // Fetch creator bonus
    builder
      .addCase(fetchCreatorBonus.pending, (state) => {
        state.loading.creator = true;
        state.error.creator = null;
      })
      .addCase(fetchCreatorBonus.fulfilled, (state, action) => {
        state.loading.creator = false;
        state.creatorBonus = action.payload.data;
        state.error.creator = null;
      })
      .addCase(fetchCreatorBonus.rejected, (state, action) => {
        state.loading.creator = false;
        state.error.creator = action.payload;
      });
  }
});

export const { clearBonusData, clearErrors } = bonusSlice.actions;

// Selectors
export const selectBonusRules = (state) => state.bonus.rules;
export const selectCreatorsWithBonus = (state) => state.bonus.creatorsWithBonus;
export const selectCreatorBonus = (state) => state.bonus.creatorBonus;
export const selectTotalBonus = (state) => state.bonus.totalBonus;
export const selectBonusLoading = (state) => state.bonus.loading;
export const selectBonusErrors = (state) => state.bonus.error;

export default bonusSlice.reducer; 