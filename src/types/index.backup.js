export enum UserRole {
  CREATOR = 'creator',
  MANAGER = 'manager',
  SUB_MANAGER = 'sub_manager',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// Helper function to convert string to UserRole
export function stringToUserRole(roleStr): UserRole {
  const normalizedRole = roleStr.toLowerCase();
  
  switch (normalizedRole) {
    case 'super_admin':
      return UserRole.SUPER_ADMIN;
    case 'admin':
      return UserRole.ADMIN;
    case 'manager':
      return UserRole.MANAGER;
    case 'sub_manager':
      return UserRole.SUB_MANAGER;
    case 'creator':
      return UserRole.CREATOR;
    default:
      console.warn(`Unknown role);
      return UserRole.CREATOR;
  }
}

// Helper function to check if a string matches a UserRole
export function isValidUserRole(roleStr): boolean {
  const normalizedRole = roleStr.toLowerCase();
  return Object.values(UserRole).some(role => role.toLowerCase() === normalizedRole);
}

export 

export ;
  paymentDetails: {
    type: 'bank' | 'paypal';
    details;
  };
  contractDetails: {
    startDate;
    duration; // in months
    monthlyDiamondGoal;
    tier?;
    rate?;
  };
  resume: {
    bio?;
    niche?;
    skills?;
    achievements?;
    education?;
    portfolioLinks?;
    collaborations?;
    contactInfo: {
      email?;
      phone?;
      social: {
        platform;
        url;
      }[];
    };
    workHistory: {
      title;
      company?;
      startDate;
      endDate?;
      description?;
    }[];
    portfolio: {
      title;
      url;
      description?;
      thumbnail?;
    }[];
  };
  
  // Statistics and metrics
  avgEngagement?;
  engagementRate?;
  conversionRate?;
  lastActive?;
}

export 

export 

export 

export ;
  settings: {
    timezone;
    currency;
    language;
  };
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'suspended' | 'cancelled';
    startDate;
    endDate?;
    features;
  };
  stats: {
    totalUsers;
    totalCreators;
    totalManagers;
    totalRevenue;
    activeUsers;
  };
  createdAt;
  updatedAt;
  createdBy; // Super Admin ID
  status: 'active' | 'inactive' | 'suspended';
}

export 

export 

export [];
}

export 

export ;
  }[];
  createdBy;
  createdAt;
}

export ;
      scheduledTime?;
    }[];
  }[];
  participants: {
    creatorId;
    joinedAt;
    status: 'active' | 'eliminated' | 'winner';
    currentRound?;
  }[];
  createdBy;
  createdAt;
}

export [];
  participants: {
    creatorId;
    status: 'invited' | 'accepted' | 'declined' | 'completed';
    compensation;
    deliverables: {
      url;
      submittedAt;
      approved;
      feedback?;
    }[];
  }[];
}

export ;
  reward: {
    type: 'percentage' | 'fixed';
    value;
  };
  active;
  createdAt;
  updatedAt;
  createdBy;
}

export 

export ;
  rankings: {
    category: 'diamonds' | 'followers' | 'live_time' | 'engagement';
    creators: {
      creatorId;
      rank;
      value;
    }[];
  }[];
  createdAt;
  updatedAt;
}

export >;
}

export 

export 

export 

export  

