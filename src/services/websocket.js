// WebSocket Service - Real Implementation
// Connects to actual WebSocket server when available

import { WS_URL } from '../config/api';

// Simple EventEmitter implementation for browser compatibility
class SimpleEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener.apply(this, args));
    }
  }

  removeListener(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
}

class WebSocketService extends SimpleEventEmitter {
  constructor(url) {
    super();
    this.url = url || WS_URL;
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000; // 3 seconds
    this.messageHistory = new Map(); // Store message history by channel
  }

  connect(userId, userRole) {
    try {
      console.log('Attempting to connect to WebSocket server:', this.url);
      
      this.socket = new WebSocket(`${this.url}?userId=${userId}&role=${userRole}`);

      this.socket.onopen = () => {
        console.log('✅ WebSocket connected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.emit('connected', { userId, userRole });
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📨 WebSocket message received:', data);
          
          // Store message in history
          if (data.channel) {
            this.saveMessageToHistory(data.channel, data);
          }
          
          // Emit specific events based on message type
          if (data.type) {
            this.emit(data.type, data);
          } else {
            this.emit('message', data);
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      this.socket.onclose = (event) => {
        console.log('🔌 WebSocket connection closed:', event.code, event.reason);
        this.isConnected = false;
        this.emit('disconnected', event);
        
        // Attempt to reconnect if it wasn't a manual close
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.attemptReconnect(userId, userRole);
        }
      };

      this.socket.onerror = (error) => {
        console.error('❌ WebSocket connection error:', error);
        this.emit('error', error);
      };

    } catch (error) {
      console.error('❌ Failed to create WebSocket connection:', error);
      this.emit('error', error);
    }
  }

  attemptReconnect(userId, userRole) {
    this.reconnectAttempts++;
    console.log(`🔄 Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    setTimeout(() => {
      this.connect(userId, userRole);
    }, this.reconnectInterval);
  }

  sendMessage(message) {
    if (!this.isConnected || !this.socket) {
      console.warn('❌ WebSocket is not connected. Message not sent:', message);
      throw new Error('WebSocket not connected');
    }

    try {
      const messageData = {
        ...message,
        timestamp: new Date().toISOString(),
        messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };

      console.log('📤 Sending WebSocket message:', messageData);
      this.socket.send(JSON.stringify(messageData));
      
      // Store sent message in history
      if (messageData.channel) {
        this.saveMessageToHistory(messageData.channel, messageData);
      }
      
      return messageData;
    } catch (error) {
      console.error('❌ Error sending WebSocket message:', error);
      throw error;
    }
  }

  // Channel-specific methods
  joinChannel(channel) {
    return this.sendMessage({
      type: 'join_channel',
      channel: channel
    });
  }

  leaveChannel(channel) {
    return this.sendMessage({
      type: 'leave_channel',
      channel: channel
    });
  }

  sendChatMessage(channel, content, messageType = 'text') {
    return this.sendMessage({
      type: 'chat_message',
      channel: channel,
      content: content,
      messageType: messageType
    });
  }

  // Support ticket specific methods
  joinTicketChannel(ticketId) {
    return this.joinChannel(`ticket-${ticketId}`);
  }

  sendTicketMessage(ticketId, content, attachments = []) {
    return this.sendMessage({
      type: 'ticket_message',
      channel: `ticket-${ticketId}`,
      ticketId: ticketId,
      content: content,
      attachments: attachments
    });
  }

  // Message history methods
  saveMessageToHistory(channel, message) {
    if (!this.messageHistory.has(channel)) {
      this.messageHistory.set(channel, []);
    }
    
    const channelHistory = this.messageHistory.get(channel);
    channelHistory.push(message);
    
    // Keep only last 100 messages per channel
    if (channelHistory.length > 100) {
      channelHistory.shift();
    }
  }

  getMessageHistory(channel) {
    return this.messageHistory.get(channel) || [];
  }

  clearMessageHistory(channel) {
    if (channel) {
      this.messageHistory.delete(channel);
    } else {
      this.messageHistory.clear();
    }
  }

  // Connection status
  isConnectedToServer() {
    return this.isConnected && this.socket && this.socket.readyState === WebSocket.OPEN;
  }

  disconnect() {
    if (this.socket) {
      console.log('🔌 Manually disconnecting WebSocket');
      this.isConnected = false;
      this.socket.close(1000, 'Manual disconnect'); // Normal closure
      this.socket = null;
    }
  }

  // Utility methods
  ping() {
    return this.sendMessage({
      type: 'ping',
      timestamp: new Date().toISOString()
    });
  }

  getConnectionState() {
    if (!this.socket) return 'DISCONNECTED';
    
    switch (this.socket.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'CONNECTED';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  }
}

// Create and export a singleton instance
export const webSocketService = new WebSocketService();
export default WebSocketService; 