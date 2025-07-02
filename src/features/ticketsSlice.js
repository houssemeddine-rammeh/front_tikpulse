import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import {
  subscribeToTicketMessages,
  unsubscribeFromTicketMessages,
  sendMessageToTicket,
} from "../api/socketInstance";

// Async thunks
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

export const sendMessage = createAsyncThunk(
  "tickets/sendMessage",
  async ({ ticketId, message }, { rejectWithValue }) => {
    try {
      // Send message via WebSocket
      sendMessageToTicket(ticketId, message);
      // Return the message for immediate state update
      return {
        sender: "currentUser", // Replace with actual sender info if available
        content: message,
        createdAt: new Date(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add a thunk for real-time message subscription
export const subscribeToMessages = createAsyncThunk(
  "tickets/subscribeToMessages",
  async (ticketId, { dispatch }) => {
    subscribeToTicketMessages(ticketId, (message) => {
      dispatch(addMessageToTicket(message)); // Dispatch the message to the Redux store
    });
  }
);

// Add a thunk for unsubscribing
export const unsubscribeFromMessages = createAsyncThunk(
  "tickets/unsubscribeFromMessages",
  async (ticketId) => {
    unsubscribeFromTicketMessages(ticketId);
  }
);

// Slice
const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    ticket: null,
    loading: false,
    error: null,
  },
  reducers: {
    addMessageToTicket: (state, action) => {
      if (action.payload) {
        // Update the messages for the ticket in the tickets list
        state.tickets = state.tickets.map((ticket) => {
          if (ticket._id === action.payload._id) {
            return {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  sender: action.payload.sender,
                  content: action.payload.content,
                  createdAt: action.payload.timestamp,
                  _id: action.payload._id,
                },
              ],
            };
          }
          return ticket;
        });

        // Update the messages for the currently selected ticket
        if (state.ticket && state.ticket._id === action.payload._id) {
          state.ticket.messages.push({
            sender: action.payload.sender,
            content: action.payload.content,
            createdAt: action.payload.timestamp,
            _id: action.payload._id,
          });
        }
      }

      // Clear error and set loading to false
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
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
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessageToTicket, clearError } = ticketsSlice.actions;

export default ticketsSlice.reducer;
