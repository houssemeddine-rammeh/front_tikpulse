import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import RealTimeChat from './RealTimeChat';
import { UserRole } from '../../types';

const ChatDemo = () => {
  // Demo participants (Admin, Manager, Creator)
  const participants = [
    {
      id: 'admin-demo',
      username: 'System Admin',
      role: UserRole.ADMIN,
      email: 'admin@tiktok-agency.com',
      isOnline,
      createdAt: new Date()
    },
    {
      id: 'manager-demo',
      username: 'Support Manager',
      role: UserRole.MANAGER,
      email: 'manager@tiktok-agency.com',
      isOnline,
      createdAt: new Date()
    },
    {
      id: 'creator-demo',
      username: 'Content Creator',
      role: UserRole.CREATOR,
      email: 'creator@tiktok-agency.com',
      isOnline,
      createdAt: new Date()
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py);
};

export default ChatDemo; 

