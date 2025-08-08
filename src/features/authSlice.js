import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { setLoading } from "./loadingSlice";
import { setToken, removeToken } from "../utils/tokenManager";

const initialState = {
  user: null,
  token: null,
  profile: null,
  isLoading: false,
  error: null,
};

// Sign-in logic
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post("/auth/login", {
        email,
        password
      });
      const { token } = response.data;
      setToken(token); // Save token to localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Sign-up logic
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post("/auth/register", {
        ...data,
      });
      const { token } = response.data;
      setToken(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// TikTok login logic
export const signInWithTikTok = createAsyncThunk(
  "auth/signInWithTikTok",
  async (authCode, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post("/auth/tiktok", {
        authCode
      });
      const { token } = response.data;
      setToken(token); // Save token to localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "TikTok login failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const subscribeToNotifications = createAsyncThunk(
  "auth/subscribeToNotifications",
  async (subscription, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/users/userSubscription",
        subscription
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);
 // "/user/profile/:tikTokId",

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (tikTokId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/profile/${tikTokId}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      removeToken(); // Remove token from localStorage
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add these for direct use
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      removeToken();
    },
    // clearError already exists above, but for clarity:
    // clearError: (state) => {
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(subscribeToNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(subscribeToNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle successful subscription if needed
        state.error = null;
      })
      .addCase(subscribeToNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload; // Store profile data
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signInWithTikTok.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithTikTok.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signInWithTikTok.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAction, clearError, logout } = authSlice.actions;
export default authSlice.reducer;

