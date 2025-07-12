// src/utils/socket.js

import { io } from "socket.io-client";

let socket = null;
const messageHandlers = {}; // Move this outside the functions
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

export const subscribeToTicketMessages = (ticketId, handler) => {
  if (!socket) return;

  // Only subscribe if not already subscribed
  if (!messageHandlers[ticketId]) {
    socket.emit("joinTicketRoom", { ticketId });
    socket.on("newMessage", handler);
    messageHandlers[ticketId] = handler;
  }
};

export const unsubscribeFromTicketMessages = (ticketId) => {
  if (!socket || !messageHandlers[ticketId]) return;

  socket.off("newMessage", messageHandlers[ticketId]);
  delete messageHandlers[ticketId];
  socket.emit("leaveTicketRoom", { ticketId });
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
