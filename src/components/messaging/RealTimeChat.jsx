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

  const isCurrentUser = (userId) => {
    // Handle both string IDs and object IDs
    const currentUserId =
      typeof user._id === "string" ? user._id : user._id.toString();
    const messageUserId =
      typeof userId === "string" ? userId : userId.toString();
    return currentUserId === messageUserId;
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Chat Header */}
      <Box sx={{ p: 2, backgroundColor: "#667eea", color: "white" }}>
        <Typography variant="h6">{ticket.title}</Typography>
        <Typography variant="body2">
          Chat between {ticket.sender?.username || ticket.sender?.firstName} and{" "}
          {ticket.receiver?.firstName || ticket.receiver?.username}
        </Typography>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{ flex: 1, overflowY: "auto", p: 2, backgroundColor: "#f8fafc" }}
      >
        <List sx={{ p: 0 }}>
          {ticket?.messages?.map((message, index) => {
            const isOwnMessage = isCurrentUser(
              message.sender?._id || message.sender
            );

            return (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: isOwnMessage ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 2,
                  px: 0,
                }}
              >
                {/* Avatar - only show for other users */}
                {!isOwnMessage && (
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar
                      sx={{ width: 32, height: 32, fontSize: "0.875rem" }}
                    >
                      {message?.sender?.username?.charAt(0) ||
                        message?.sender?.firstName?.charAt(0) ||
                        "U"}
                    </Avatar>
                  </ListItemAvatar>
                )}

                {/* Message Container */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                    alignItems: isOwnMessage ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Sender Name */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#666",
                      mb: 0.5,
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  >
                    {isOwnMessage
                      ? "You"
                      : message?.sender?.username ||
                        message?.sender?.firstName ||
                        "Unknown"}
                  </Typography>

                  {/* Message Bubble */}
                  <Box
                    sx={{
                      backgroundColor: isOwnMessage ? "#1976d2" : "#ffffff",
                      color: isOwnMessage ? "#ffffff" : "#000000",
                      borderRadius: 2,
                      p: 1.5,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      border: isOwnMessage ? "none" : "1px solid #e0e0e0",
                      position: "relative",
                      wordBreak: "break-word",
                      maxWidth: "100%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.4,
                      }}
                    >
                      {message.content}
                    </Typography>

                    {/* Time */}
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: isOwnMessage ? "right" : "left",
                        opacity: 0.7,
                        mt: 0.5,
                        fontSize: "0.7rem",
                      }}
                    >
                      {formatTime(message.createdAt || message.timestamp)}
                    </Typography>
                  </Box>
                </Box>

                {/* Avatar for own messages - positioned on the right */}
              </ListItem>
            );
          })}
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
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Send">
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    sx={{
                      color: newMessage.trim() ? "#1976d2" : "#ccc",
                      "&:hover": {
                        backgroundColor: newMessage.trim()
                          ? "rgba(25, 118, 210, 0.1)"
                          : "transparent",
                      },
                    }}
                  >
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
