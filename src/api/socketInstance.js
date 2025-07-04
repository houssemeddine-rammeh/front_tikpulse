// src/utils/socket.js

import { io } from "socket.io-client";
import { store } from "../app/store";
import { addMessageToTicket } from "../features/ticketsSlice";

let socket = null;

/**
 * Initializes the socket connection once, after token is available
 */
export const connectSocket = (token) => {
  if (socket) return socket; // Prevent double init

  if (!token) {
    console.warn("No token provided for socket connection.");
    return null;
  }

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
    transports: ["websocket"], // force only WebSocket (avoid polling issues)
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
  });

  return socket;
};

/**
 * Send a message to a specific ticket room
 */
export const sendMessageToTicket = (ticketId, content) => {
  if (!socket) return;
  socket.emit("sendMessage", { ticketId, content });
};

/**
 * Join a ticket room and subscribe to its messages
 */
export const subscribeToTicketMessages = (ticketId) => {
  if (!socket) return;

  socket.emit("joinTicketRoom", { ticketId });

  const handler = (message) => {
    store.dispatch(addMessageToTicket(message));
  };

  socket.on("newMessage", handler);

  // Store handler for future removal
  socket._messageHandlers = socket._messageHandlers || {};
  socket._messageHandlers[ticketId] = handler;
};

/**
 * Unsubscribe from a ticket room
 */
export const unsubscribeFromTicketMessages = (ticketId) => {
  if (!socket || !socket._messageHandlers?.[ticketId]) return;

  socket.off("newMessage", socket._messageHandlers[ticketId]);
  delete socket._messageHandlers[ticketId];

  socket.emit("leaveTicketRoom", { ticketId }); // Optional: depends on backend
};

/**
 * Disconnect the socket manually (e.g. on logout)
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Get socket instance
 */
export const getSocket = () => socket;
