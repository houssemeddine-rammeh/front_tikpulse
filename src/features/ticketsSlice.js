import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import {
  subscribeToTicketMessages,
  unsubscribeFromTicketMessages,
  sendMessageToTicket,
  isSocketConnected,
} from "../api/socketInstance";

// Async thunks
const activeSubscriptions = {};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/tickets");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchTicket = createAsyncThunk(
  "tickets/fetchTicket",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/tickets/${ticketId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/tickets", ticketData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "tickets/sendMessage",
  async ({ ticketId, message }, { rejectWithValue, getState }) => {
    try {
      // Check if socket is connected
      if (!isSocketConnected()) {
        throw new Error("Socket not connected. Please refresh the page.");
      }

      // Send message via WebSocket with acknowledgment
      const result = await sendMessageToTicket(ticketId, message);
      
      // Return the message for immediate state update
      return {
        sender: getState().auth.user._id, // Use actual user ID from state
        content: message,
        createdAt: new Date(),
        _id: result._id || `temp-${Date.now()}`, // Use server-generated ID or temp ID
      };
    } catch (error) {
      console.error("Failed to send message:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const subscribeToMessages = createAsyncThunk(
  "tickets/subscribeToMessages",
  async (ticketId, { rejectWithValue }) => {
    try {
      if (!isSocketConnected()) {
        throw new Error("Socket not connected");
      }

      // Only subscribe if not already subscribed
      if (!activeSubscriptions[ticketId]) {
        const success = subscribeToTicketMessages(ticketId, (message) => {
          // This will be handled by the reducer
          console.log("Received message:", message);
        });
        
        if (success) {
          activeSubscriptions[ticketId] = true;
        }
      }
      
      return { ticketId, success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unsubscribeFromMessages = createAsyncThunk(
  "tickets/unsubscribeFromMessages",
  async (ticketId, { rejectWithValue }) => {
    try {
      unsubscribeFromTicketMessages(ticketId);
      delete activeSubscriptions[ticketId];
      return { ticketId, success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tickets: [],
  ticket: null,
  loading: false,
  error: null,
  messageStatus: "idle", // idle, sending, success, error
  socketStatus: "disconnected", // disconnected, connecting, connected
};

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSocketStatus: (state, action) => {
      state.socketStatus = action.payload;
    },
    addMessage: (state, action) => {
      const { ticketId, message } = action.payload;
      const ticket = state.tickets.find(t => t._id === ticketId);
      if (ticket) {
        ticket.messages.push(message);
      }
      if (state.ticket && state.ticket._id === ticketId) {
        state.ticket.messages.push(message);
      }
    },
    updateMessageStatus: (state, action) => {
      state.messageStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tickets
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single ticket
      .addCase(fetchTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
      })
      .addCase(fetchTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.unshift(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.messageStatus = "sending";
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messageStatus = "success";
        // Add message to the current ticket if it matches
        if (state.ticket) {
          state.ticket.messages.push(action.payload);
        }
        // Also add to the tickets list if it exists there
        const ticketInList = state.tickets.find(t => t._id === state.ticket?._id);
        if (ticketInList) {
          ticketInList.messages.push(action.payload);
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.messageStatus = "error";
        state.error = action.payload;
      })
      // Subscribe to messages
      .addCase(subscribeToMessages.fulfilled, (state, action) => {
        console.log("Subscribed to messages for ticket:", action.payload.ticketId);
      })
      .addCase(subscribeToMessages.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Unsubscribe from messages
      .addCase(unsubscribeFromMessages.fulfilled, (state, action) => {
        console.log("Unsubscribed from messages for ticket:", action.payload.ticketId);
      });
  },
});

export const { clearError, setSocketStatus, addMessage, updateMessageStatus } = ticketsSlice.actions;
export default ticketsSlice.reducer;
