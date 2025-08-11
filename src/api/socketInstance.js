// src/utils/socket.js

import { io } from "socket.io-client";

let socket = null;
const messageHandlers = {}; // Move this outside the functions
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 1000; // Start with 1 second

/**
 * Initializes the socket connection once, after token is available
 */
export const connectSocket = (token) => {
  if (socket?.connected) {
    console.log("Socket already connected, returning existing instance");
    return socket;
  }

  if (!token) {
    console.warn("No token provided for socket connection.");
    return null;
  }

  // Disconnect existing socket if it exists
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const socketUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;
  console.log("Connecting to Socket.IO server:", socketUrl);

  socket = io(socketUrl, {
    auth: { token },
    transports: ["websocket", "polling"], // Allow fallback to polling
    timeout: 20000, // 20 seconds timeout
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: maxReconnectAttempts,
    reconnectionDelay: reconnectDelay,
    reconnectionDelayMax: 5000,
    maxReconnectionAttempts: maxReconnectAttempts,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
    reconnectAttempts = 0; // Reset reconnect attempts on successful connection
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
    
    if (reason === "io server disconnect") {
      // Server disconnected us, try to reconnect
      console.log("Server disconnected, attempting to reconnect...");
      socket.connect();
    }
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
    reconnectAttempts++;
    
    if (reconnectAttempts >= maxReconnectAttempts) {
      console.error("Max reconnection attempts reached, giving up");
    }
  });

  socket.on("reconnect", (attemptNumber) => {
    console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
    reconnectAttempts = 0;
  });

  socket.on("reconnect_attempt", (attemptNumber) => {
    console.log("🔄 Socket reconnection attempt:", attemptNumber);
  });

  socket.on("reconnect_error", (error) => {
    console.error("❌ Socket reconnection error:", error);
  });

  socket.on("reconnect_failed", () => {
    console.error("❌ Socket reconnection failed after all attempts");
  });

  // Handle authentication errors
  socket.on("error", (error) => {
    console.error("❌ Socket error:", error);
    if (error.message?.includes("Authentication")) {
      console.error("Authentication failed, token may be invalid");
      // Optionally trigger re-authentication
    }
  });

  return socket;
};

/**
 * Send a message to a specific ticket room with acknowledgment
 */
export const sendMessageToTicket = (ticketId, content) => {
  if (!socket?.connected) {
    console.error("Socket not connected, cannot send message");
    throw new Error("Socket not connected");
  }

  if (!ticketId || !content?.trim()) {
    console.error("Invalid message data:", { ticketId, content });
    throw new Error("Invalid message data");
  }

  return new Promise((resolve, reject) => {
    console.log("📤 Sending message to ticket:", { ticketId, content: content.substring(0, 50) + "..." });
    
    socket.emit("sendMessage", { ticketId, content }, (error, payload) => {
      if (error) {
        console.error("❌ Message send failed:", error);
        reject(new Error(error));
      } else {
        console.log("✅ Message sent successfully:", payload);
        resolve(payload);
      }
    });

    // Add timeout for acknowledgment
    setTimeout(() => {
      reject(new Error("Message send timeout"));
    }, 10000); // 10 second timeout
  });
};

export const subscribeToTicketMessages = (ticketId, handler) => {
  if (!socket?.connected) {
    console.error("Socket not connected, cannot subscribe to messages");
    return false;
  }

  if (!ticketId) {
    console.error("No ticketId provided for subscription");
    return false;
  }

  // Only subscribe if not already subscribed
  if (!messageHandlers[ticketId]) {
    console.log("📡 Subscribing to ticket messages:", ticketId);
    
    socket.emit("joinTicketRoom", { ticketId }, (error) => {
      if (error) {
        console.error("Failed to join ticket room:", error);
      } else {
        console.log("Successfully joined ticket room:", ticketId);
      }
    });

    socket.on("newMessage", handler);
    messageHandlers[ticketId] = handler;
    
    return true;
  } else {
    console.log("Already subscribed to ticket:", ticketId);
    return true;
  }
};

export const unsubscribeFromTicketMessages = (ticketId) => {
  if (!socket || !messageHandlers[ticketId]) {
    console.log("No subscription found for ticket:", ticketId);
    return;
  }

  console.log("📡 Unsubscribing from ticket messages:", ticketId);
  
  socket.off("newMessage", messageHandlers[ticketId]);
  delete messageHandlers[ticketId];
  
  // Leave the room
  socket.emit("leaveTicketRoom", { ticketId });
};

/**
 * Disconnect the socket manually (e.g. on logout)
 */
export const disconnectSocket = () => {
  if (socket) {
    console.log("🔌 Disconnecting socket manually");
    socket.disconnect();
    socket = null;
    // Clear message handlers
    Object.keys(messageHandlers).forEach(key => delete messageHandlers[key]);
  }
};

/**
 * Get socket instance
 */
export const getSocket = () => socket;

/**
 * Check if socket is connected
 */
export const isSocketConnected = () => {
  return socket?.connected || false;
};

/**
 * Get connection status
 */
export const getSocketStatus = () => {
  if (!socket) return "disconnected";
  return socket.connected ? "connected" : "disconnected";
};
