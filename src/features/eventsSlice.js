import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async thunk for getting events
export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/events");
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
// Async thunk for creating an event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/events", eventData);
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
// Async thunk for updating an event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/events/${eventId}`, eventData);
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
// Async thunk for deleting an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`);
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
// Async thunk for joining an event
export const joinEvent = createAsyncThunk(
  "events/joinEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/events/${eventId}/join`);
      return { eventId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to join event"
      );
    }
  }
);

// Async thunk for leaving an event
export const leaveEvent = createAsyncThunk(
  "events/leaveEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/events/${eventId}/leave`);
      return eventId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to leave event"
      );
    }
  }
);
// Async thunk for getting event details
export const getEventDetails = createAsyncThunk(
  "events/getEventDetails",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch event details"
      );
    }
  }
);

// create the slice

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        eventDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload;
        })
        .addCase(getEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events.push(action.payload);
        })
        .addCase(createEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateEvent.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.events.findIndex(
            (event) => event.id === action.payload.id
            );
            if (index !== -1) {
            state.events[index] = action.payload;
            }
        })
        .addCase(updateEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events = state.events.filter(
            (event) => event.id !== action.payload
            );
        })
        .addCase(deleteEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(joinEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(joinEvent.fulfilled, (state, action) => {
            state.loading = false;
            const event = state.events.find(
                (e) => e.id === action.payload.eventId
            );
            if (event) {
                event.joined = true; // Assuming the event object has a 'joined' property
            }
            state.eventDetails = action.payload; // Update event details with the response
        }
        )
        .addCase(joinEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(leaveEvent.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(leaveEvent.fulfilled, (state, action) => {
            state.loading = false;
            const event = state.events.find(
                (e) => e.id === action.payload
            );
            if (event) {
                event.joined = false; // Assuming the event object has a 'joined' property
            }
        })
        .addCase(leaveEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getEventDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEventDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.eventDetails = action.payload;
        })
        .addCase(getEventDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { actions, reducer } = eventsSlice;
export default reducer;