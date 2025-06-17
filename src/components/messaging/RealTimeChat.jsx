import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Menu,
  MenuItem,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  Circle,
  Phone,
  VideoCall,
  CloudOff
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { webSocketService } from '../../services/websocket';
import { UserRole } from '../../types';

// Add CSS animations
const animationStyles = `
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

// Insert styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = animationStyles;
  if (!document.head.querySelector('[data-chat-animations]')) {
    styleElement.setAttribute('data-chat-animations', 'true');
    document.head.appendChild(styleElement);
  }
}

const RealTimeChat = ({ ticketId = 'default', participants }) => {
  const { user, setUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState({});
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const messagesEndRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const typingTimeoutRef = useRef(null);
  const [demoUser, setDemoUser] = useState(user?.role || 'creator');

  // Demo users for testing
  const demoUsers = {
    creator: {
      id: 'creator-1',
      username: 'Content Creator',
      role: UserRole.CREATOR,
      email: 'creator@tiktok-agency.com',
      createdAt: new Date()
    },
    manager: {
      id: 'manager-1', 
      username: 'Support Manager',
      role: UserRole.MANAGER,
      email: 'manager@tiktok-agency.com',
      createdAt: new Date()
    },
    admin: {
      id: 'admin-1',
      username: 'System Admin', 
      role: UserRole.ADMIN,
      email: 'admin@tiktok-agency.com',
      createdAt: new Date()
    }
  };

  // Handle demo user switching
  const handleUserSwitch = (newRole) => {
    const newUser = demoUsers[newRole];
    if (newUser && setUser) {
      // Disconnect current user
      webSocketService.disconnect();
      
      // Switch to new user
      setUser(newUser);
      setDemoUser(newRole);
      
      // Clear messages for demo purposes
      setMessages([]);
      
      // Small delay before reconnecting
      setTimeout(() => {
        webSocketService.connect(newUser.id);
        webSocketService.joinRoom(ticketId);
      }, 500);
    }
  };

  // Load message history when component mounts
  useEffect(() => {
    console.log('📚 Loading message history for ticket:', ticketId);
    const history = webSocketService.getMessageHistory(ticketId);
    console.log('📚 Loaded messages from history:', history);
    
    if (history && history.length > 0) {
      const formattedMessages = history.map((msg) => ({
        ...msg,
        id: msg.id || Date.now().toString(),
        isRead: true // Mark historical messages
      }));
      setMessages(formattedMessages);
    }
  }, [ticketId]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (user?.id) {
      console.log('🚀 Initializing WebSocket for user:', user.id, user.username);
      
      // Connect to WebSocket
      webSocketService.connect(user.id);

      // Join the ticket room
      webSocketService.joinRoom(ticketId);
      console.log('📍 Joined room:', ticketId);

      // Set up event listeners
      const handleConnected = () => {
        console.log('✅ WebSocket connected successfully');
        setIsConnected(true);
        setConnectionError(null);
        webSocketService.requestOnlineUsers(ticketId);
      };

      const handleDisconnected = () => {
        console.log('❌ WebSocket disconnected');
        setIsConnected(false);
      };

      const handleError = (data) => {
        console.log('🚨 WebSocket error:', data.error);
        setConnectionError('Connection error occurred');
        console.error('WebSocket error:', data.error);
      };

      const handleChatMessage = (data) => {
        console.log('💬 Received chat message:', data);
        console.log('Current ticket ID:', ticketId, 'Message ticket ID:', data.ticketId);
        console.log('Current user ID:', user.id, 'Message user ID:', data.userId);
        
        if (data.ticketId === ticketId && data.userId !== user.id) {
          console.log('✨ Adding new message to chat');
          const newMsg = {
            id: data.messageId || Date.now().toString(),
            userId: data.userId,
            username: data.username,
            role: data.role,
            message: data.message,
            timestamp: new Date(data.timestamp),
            isRead: false
          };
          
          setMessages(prev => [...prev, newMsg]);
        }
      };

      const handleTypingIndicator = (data) => {
        console.log('⌨️ Received typing indicator:', data);
        if (data.ticketId === ticketId && data.userId !== user.id) {
          setIsTyping(prev => ({
            ...prev,
            [data.userId]: data.isTyping
          }));

          // Clear typing indicator after a timeout
          if (data.isTyping) {
            setTimeout(() => {
              setIsTyping(prev => ({
                ...prev,
                [data.userId]: false
              }));
            }, 3000);
          }
        }
      };

      const handleOnlineUsers = (data) => {
        console.log('👥 Received online users update:', data);
        if (data.ticketId === ticketId) {
          setOnlineUsers(new Set(data.userIds));
        }
      };

      // Register event listeners
      webSocketService.on('connected', handleConnected);
      webSocketService.on('disconnected', handleDisconnected);
      webSocketService.on('error', handleError);
      webSocketService.on('chat_message', handleChatMessage);
      webSocketService.on('typing_indicator', handleTypingIndicator);
      webSocketService.on('online_users', handleOnlineUsers);

      // Initially set all participants (for demo)
      setOnlineUsers(new Set(participants.map(p => p.id)));

      // Cleanup function
      return () => {
        console.log('🧹 Cleaning up WebSocket listeners');
        webSocketService.off('connected', handleConnected);
        webSocketService.off('disconnected', handleDisconnected);
        webSocketService.off('error', handleError);
        webSocketService.off('chat_message', handleChatMessage);
        webSocketService.off('typing_indicator', handleTypingIndicator);
        webSocketService.off('online_users', handleOnlineUsers);
        webSocketService.leaveRoom(ticketId);
      };
    }
  }, [user?.id, user?.username, ticketId, participants]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = useCallback(() => {
    console.log('📤 Attempting to send message:', newMessage.trim());
    console.log('User:', user);
    console.log('Is connected:', isConnected);
    
    if (newMessage.trim() && user && isConnected) {
      const message = {
        id: Date.now().toString(),
        userId: user.id || 'current-user',
        username: user.username || 'You',
        role: user.role || 'user',
        message: newMessage.trim(),
        timestamp: new Date(),
        isRead: true
      };

      console.log('✅ Creating message object:', message);

      // Add message to local state immediately
      setMessages(prev => {
        console.log('Adding to local state. Previous count:', prev.length);
        return [...prev, message];
      });
      
      // Send message via WebSocket
      const recipientIds = participants
        .filter(p => p.id !== user.id)
        .map(p => p.id);
      
      console.log('📡 Sending via WebSocket to recipients:', recipientIds);
      webSocketService.sendChatMessage(ticketId, newMessage.trim(), recipientIds);
      
      setNewMessage('');
      
      // Stop typing indicator
      webSocketService.sendTypingIndicator(ticketId, false, recipientIds);
    } else {
      console.log('❌ Cannot send message:', {
        hasMessage: !!newMessage.trim(),
        hasUser: !!user,
        isConnected
      });
    }
  }, [newMessage, user, isConnected, ticketId, participants]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = useCallback((typing) => {
    if (user && isConnected) {
      const recipientIds = participants
        .filter(p => p.id !== user.id)
        .map(p => p.id);
      
      webSocketService.sendTypingIndicator(ticketId, typing, recipientIds);
      
      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set timeout to stop typing indicator
      if (typing) {
        typingTimeoutRef.current = setTimeout(() => {
          webSocketService.sendTypingIndicator(ticketId, false, recipientIds);
        }, 1000);
      }
    }
  }, [user, isConnected, ticketId, participants]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserColor = (role) => {
    if (!role) return '#9e9e9e';
    
    // Convert role to string and normalize
    let roleString;
    if (typeof role === 'string') {
      roleString = role;
    } else {
      // Handle UserRole enum values
      roleString = role;
    }
    
    switch (roleString.toLowerCase()) {
      case 'admin': return '#f44336';
      case 'manager': return '#2196f3';
      case 'creator': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const isCurrentUser = (userId) => userId === user?.id;

  const clearChatHistory = () => {
    setMessages([]);
    webSocketService.clearMessageHistory(ticketId);
    setAnchorEl(null);
  };

  const exportChat = () => {
    const chatData = messages.map(msg => ({
      timestamp: msg.timestamp.toISOString(),
      user: msg.username,
      role: msg.role,
      message: msg.message
    }));
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-${ticketId}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    setAnchorEl(null);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.2)'
      }}
    >
      {/* Chat Header */}
      <CardContent 
        sx={{ 
          pb: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              💬 Real-Time Support Chat
            </Typography>
            <Chip 
              size="small" 
              label={`${participants.length} participants`}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 500
              }}
            />
            <Chip 
              size="small" 
              label={`${messages.length} messages`}
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 500
              }}
            />
            {/* Connection Status */}
            <Chip
              size="small"
              icon={isConnected ? <OnlineIcon /> : <OfflineIcon />}
              label={isConnected ? 'Connected' : 'Connecting...'}
              sx={{
                bgcolor: isConnected ? 'rgba(76,175,80,0.2)' : 'rgba(255,152,0,0.2)',
                color: 'white',
                fontWeight,
                '& .MuiChip-icon': {
                  color: isConnected ? '#4caf50' : '#ff9800'
                }
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap, flexWrap: 'wrap' }}>
            {/* Demo User Switcher */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Demo as</InputLabel>
              <Select
                value={demoUser}
                label="Demo as"
                onChange={(e) => handleUserSwitch(e.target.value)}
                sx={{ 
                  fontSize: '0.875rem',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.3)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.5)'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                <MenuItem value="creator">🎨 Creator</MenuItem>
                <MenuItem value="manager">👔 Manager</MenuItem>
                <MenuItem value="admin">⚡ Admin</MenuItem>
              </Select>
            </FormControl>
            
            {/* Debug Test Button */}
            <Tooltip title="Test Real-time Communication">
              <IconButton 
                size="small" 
                onClick={() => {
                  const testKey = 'tiktok_agency_messages';
                  const testMessage = {
                    type: 'chat_message',
                    messageId: Date.now().toString(),
                    userId: 'test-user',
                    username: 'Test User',
                    role: 'admin',
                    message: 'Test message from other tab at ' + new Date().toLocaleTimeString(),
                    timestamp: new Date().toISOString(),
                    ticketId: ticketId
                  };
                  console.log('🧪 Storing test message:', testMessage);
                  localStorage.setItem(testKey, JSON.stringify(testMessage));
                }}
                sx={{ 
                  bgcolor: 'rgba(255,152,0,0.2)', 
                  color: 'white',
                  border: '1px solid rgba(255,152,0,0.3)',
                  '&:hover': { 
                    bgcolor: 'rgba(255,152,0,0.3)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                🧪
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Voice Call">
              <IconButton 
                size="small" 
                disabled={!isConnected}
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  '&:hover': { color: 'white' }
                }}
              >
                <PhoneIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Video Call">
              <IconButton 
                size="small" 
                disabled={!isConnected}
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  '&:hover': { color: 'white' }
                }}
              >
                <VideoIcon />
              </IconButton>
            </Tooltip>
            <IconButton 
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                '&:hover': { color: 'white' }
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Participants */}
        <Box sx={{ display: 'flex', gap, mt, flexWrap: 'wrap' }}>
          {participants.map((participant) => (
            <Tooltip 
              key={participant.id}
              title={`${participant.username} (${participant.role}) - ${
                onlineUsers.has(participant.id) ? 'Online' : 'Offline'
              }`}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  onlineUsers.has(participant.id) ? (
                    <Box sx={{
                      width: 12,
                      height: 12,
                      bgcolor: 'text.secondary',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }} />
                  ) : null
                }
              >
                <Avatar 
                  sx={{ 
                    width: 36,
                    height: 36,
                    bgcolor: getUserColor(participant.role),
                    opacity: onlineUsers.has(participant.id) ? 1 : 0.6,
                    border: '2px solid rgba(255,255,255,0.3)',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  {participant.username?.charAt(0)?.toUpperCase() || '?'}
                </Avatar>
              </Badge>
            </Tooltip>
          ))}
        </Box>
      </CardContent>

      {/* Messages Area */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        p: 2,
        maxHeight: '450px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0,0,0,0.05)'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '3px',
          '&:hover': {
            background: 'rgba(0,0,0,0.3)'
          }
        }
      }}>
        {messages.length === 0 ? (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            mb: 2
          }}>
            💬
          </Box>
        ) : (
          <List sx={{ py: 0 }}>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  display: isCurrentUser(message.userId) ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  mb: 1,
                  px: 0
                }}
              >
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: getUserColor(message.role),
                      width: 36,
                      height: 36,
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {message.username?.charAt(0)?.toUpperCase() || '?'}
                  </Avatar>
                </ListItemAvatar>
                
                <Box
                  sx={{
                    maxWidth: '75%',
                    backgroundColor: isCurrentUser(message.userId) 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'white',
                    color: isCurrentUser(message.userId) 
                      ? 'white' 
                      : 'text.primary',
                    borderRadius: 1,
                    p: 1,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    position: 'relative',
                    border: isCurrentUser(message.userId) 
                      ? 'none' 
                      : '1px solid rgba(0,0,0,0.08)',
                    background: isCurrentUser(message.userId) 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'white'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {isCurrentUser(message.userId) ? 'You' : message.username}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={message.role} 
                      sx={{ 
                        height: 20, 
                        fontSize: '0.65rem',
                        fontWeight,
                        bgcolor: isCurrentUser(message.userId) 
                          ? 'rgba(255,255,255,0.2)' 
                          : getUserColor(message.role),
                        color: isCurrentUser(message.userId) 
                          ? 'white' 
                          : 'white'
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ 
                    wordBreak: 'break-word',
                    lineHeight: 1.5,
                    mb: 1
                  }}>
                    {message.message}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      opacity: 0.7,
                      display: 'block',
                      textAlign: 'right',
                      fontSize: '0.7rem'
                    }}
                  >
                    {formatTime(message.timestamp)}
                    {!message.isRead && isCurrentUser(message.userId) && ' • Sent'}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
        
        {/* Typing Indicators */}
        {Object.entries(isTyping).map(([userId, typing]) => 
          typing && userId !== user?.id && (
            <Box key={userId} sx={{ 
              p: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1
            }}>
              <Avatar 
                sx={{ 
                  width: 24,
                  height: 24,
                  bgcolor: getUserColor(participants.find(p => p.id === userId)?.role || 'default')
                }}
              >
                {participants.find(p => p.id === userId)?.username?.charAt(0)?.toUpperCase() || '?'}
              </Avatar>
              <Typography variant="caption" sx={{ 
                fontStyle: 'italic',
                color: 'text.secondary',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}>
                {participants.find(p => p.id === userId)?.username} is typing
                <Box sx={{ display: 'flex', gap: 0.3 }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: 'text.secondary', borderRadius: '50%', animation: 'bounce 1.4s ease-in-out infinite' }} />
                  <Box sx={{ width: 8, height: 8, bgcolor: 'text.secondary', borderRadius: '50%', animation: 'bounce 1.4s ease-in-out infinite 0.16s' }} />
                  <Box sx={{ width: 8, height: 8, bgcolor: 'text.secondary', borderRadius: '50%', animation: 'bounce 1.4s ease-in-out infinite 0.32s' }} />
                </Box>
              </Typography>
            </Box>
          )
        )}
      </Box>

      <Divider />

      {/* Message Input */}
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'white',
        borderTop: '1px solid rgba(0,0,0,0.08)'
      }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping(e.target.value.length > 0);
          }}
          onKeyPress={handleKeyPress}
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
          variant="outlined"
          size="small"
          disabled={!isConnected}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              backgroundColor: '#f8fafc',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#667eea'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#667eea'
              }
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Attach File">
                  <IconButton 
                    size="small" 
                    disabled={!isConnected}
                    sx={{ 
                      color: isConnected ? 'primary' : 'text.secondary',
                      '&:hover': {
                        color: isConnected ? 'primary.main' : 'text.primary'
                      },
                      '&:disabled': {
                        color: 'text.disabled'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={clearChatHistory}>
          Clear Chat History
        </MenuItem>
        <MenuItem onClick={exportChat}>
          Export Chat
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          Chat Settings
        </MenuItem>
      </Menu>

      {/* Connection Error Snackbar */}
      <Snackbar
        open={!!connectionError}
        autoHideDuration={6000}
        onClose={() => setConnectionError(null)}
      >
        <Alert severity="error" onClose={() => setConnectionError(null)}>
          {connectionError}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default RealTimeChat; 

