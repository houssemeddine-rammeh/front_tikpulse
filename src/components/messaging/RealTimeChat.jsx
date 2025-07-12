import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  TextField,
  IconButton,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Chip,
  Divider,
  Badge,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Send, AttachFile } from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import {
  sendMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} from "../../features/ticketsSlice";

const RealTimeChat = ({ ticket }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState({});
  const messagesEndRef = useRef(null);

  // Subscribe to real-time messages
  useEffect(() => {
    if (ticket?._id) {
      dispatch(subscribeToMessages(ticket._id));
    }

    return () => {
      if (ticket?._id) {
        dispatch(unsubscribeFromMessages(ticket._id));
      }
    };
  }, [dispatch, ticket?._id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [ticket]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      dispatch(
        sendMessage({ ticketId: ticket._id, message: newMessage.trim() })
      );
      setNewMessage("");
    }
  }, [dispatch, newMessage, ticket._id]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isCurrentUser = (userId) => userId === user._id;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Chat Header */}
      <Box sx={{ p: 2, backgroundColor: "#667eea", color: "white" }}>
        <Typography variant="h6">{ticket.title}</Typography>
        <Typography variant="body2">
          Chat between {ticket.sender.username} and {ticket.receiver.firstName}{" "}
          {ticket.receiver.username}
        </Typography>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{ flex: 1, overflowY: "auto", p: 2, backgroundColor: "#f8fafc" }}
      >
        <List>
          {ticket?.messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: isCurrentUser(message.sender._id)
                  ? "row-reverse"
                  : "row",
                alignItems: "flex-start",
                gap: 1,
                mb: 1,
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {isCurrentUser(message.sender._id)
                    ? "You"
                    : message?.sender?.username?.charAt(0) || "S"}
                </Avatar>
              </ListItemAvatar>

              <Box
                sx={{
                  backgroundColor: isCurrentUser(message.sender._id)
                    ? "#667eea"
                    : "#ffffff",
                  color: isCurrentUser(message.sender._id)
                    ? "#ffffff"
                    : "#000000",
                  borderRadius: 2,
                  p: 1,
                  minWidth: "120px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <Typography fontWeight="bold" variant="body2">
                  {isCurrentUser(message.sender._id)
                    ? "You"
                    : message.sender.username}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {message.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    textAlign: "right",
                    opacity: 0.6,
                    mt: 0.5,
                  }}
                >
                  {formatTime(message.createdAt)}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box sx={{ p: 2, backgroundColor: "white", borderTop: "1px solid #ddd" }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Send">
                  <IconButton onClick={handleSendMessage}>
                    <Send />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default RealTimeChat;
