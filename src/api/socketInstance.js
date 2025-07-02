import { io } from "socket.io-client";
import {store} from "../app/store"; // Import the Redux store
import { addMessageToTicket } from "../features/ticketsSlice"; // Import the action

let socket = null;

export const connectSocket = (token) => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};

export const sendMessageToTicket = (ticketId, content) => {
  if (socket) {
    socket.emit("sendMessage", { ticketId, content });
  }
};


export const subscribeToTicketMessages = (ticketId) => {
  if (socket) {
    socket.emit("joinTicketRoom", { ticketId });
    socket.on("newMessage", (message) => {
      store.dispatch(addMessageToTicket(message));
    });
  }
};


export const unsubscribeFromTicketMessages = (ticketId) => {
  if (socket) {
    socket.off("newMessage");
    socket.emit("leaveTicketRoom", { ticketId });
  }
};
