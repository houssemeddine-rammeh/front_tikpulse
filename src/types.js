// User roles
export const UserRole = {
  ADMIN: "admin",
  MANAGER: "manager",
  SUB_MANAGER: "sub_manager",
  CREATOR: "creator",
  SUPER_ADMIN: "super_admin"
};

// Helper functions for user roles
export const stringToUserRole = (role) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return UserRole.ADMIN;
    case 'manager':
      return UserRole.MANAGER;
    case 'sub_manager':
      return UserRole.SUB_MANAGER;
    case 'super_admin':
      return UserRole.SUPER_ADMIN;
    case 'creator':
    default:
      return UserRole.CREATOR;
  }
};

export const isValidUserRole = (role) => {
  return Object.values(UserRole).includes(role);
};

// Campaign status constants
export const CampaignStatus = {
  DRAFT: "draft",
  ACTIVE: "active",
  PAUSED: "paused",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};

// Agency subscription plans
export const SubscriptionPlan = {
  BASIC: "basic",
  PREMIUM: "premium",
  ENTERPRISE: "enterprise"
};

// Agency subscription status
export const SubscriptionStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  TRIAL: "trial"
};

// Agency status
export const AgencyStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended"
};

// Creator status
export const CreatorStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
  SUSPENDED: "suspended"
};

// Payment types
export const PaymentType = {
  BANK_ACCOUNT: "bank_account",
  PAYPAL: "paypal",
  CRYPTO: "crypto",
  OTHER: "other"
};

// Contract tiers
export const ContractTier = {
  BRONZE: "bronze",
  SILVER: "silver",
  GOLD: "gold",
  PLATINUM: "platinum"
};

// Message types
export const MessageType = {
  TEXT: "text",
  IMAGE: "image",
  FILE: "file",
  SYSTEM: "system"
};

// Message status
export const MessageStatus = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
  FAILED: "failed"
};

// Event types
export const EventType = {
  MATCH: "match",
  CHALLENGE: "challenge", 
  TOURNAMENT: "tournament",
  OTHER: "other"
};

// Event status
export const EventStatus = {
  UPCOMING: "upcoming",
  ACTIVE: "active",
  COMPLETED: "completed"
};

// Ticket categories
export const TicketCategory = {
  TECHNICAL: "technical",
  BILLING: "billing",
  GENERAL: "general",
  FEATURE_REQUEST: "feature_request"
};

// Ticket status
export const TicketStatus = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed"
};

// Ticket priority
export const TicketPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent"
};

// Helper functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('en-US', {
    ...defaultOptions,
    ...options
  }).format(new Date(date));
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Validation helpers
export const isValidRole = (role) => {
  return Object.values(UserRole).includes(role);
};

export const isValidStatus = (status, statusObject) => {
  return Object.values(statusObject).includes(status);
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Default values for entities
export const defaultUser = {
  id: '',
  username: '',
  email: '',
  role: UserRole.CREATOR,
  profile_image: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const defaultAgency = {
  id: '',
  name: '',
  description: '',
  email: '',
  phone: '',
  address: '',
  website: '',
  logo: null,
  status: AgencyStatus.ACTIVE,
  stats: {
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    totalCreators: 0,
    totalManagers: 0
  },
  subscription: {
    plan: SubscriptionPlan.BASIC,
    status: SubscriptionStatus.TRIAL,
    startDate: new Date().toISOString()
  },
  settings: {
    timezone: 'UTC',
    currency: 'USD',
    language: 'en'
  }
};

export const defaultCreator = {
  id: '',
  username: '',
  email: '',
  category: '',
  followers: 0,
  diamonds: 0,
  status: CreatorStatus.PENDING,
  agency: '',
  manager: '',
  tikTokId: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const defaultCampaign = {
  id: '',
  title: '',
  description: '',
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  status: CampaignStatus.DRAFT,
  client_name: '',
  budget: 0,
  creators: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const defaultTicket = {
  id: '',
  subject: '',
  description: '',
  category: TicketCategory.GENERAL,
  status: TicketStatus.OPEN,
  priority: TicketPriority.MEDIUM,
  creator_id: '',
  creator_name: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  messages: []
};

export const defaultEvent = {
  id: '',
  title: '',
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  all_day: false,
  type: EventType.OTHER,
  status: EventStatus.UPCOMING,
  created_by: '',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}; 