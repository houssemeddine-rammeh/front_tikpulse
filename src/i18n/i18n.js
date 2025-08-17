import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define resources inline to avoid JSON import issues
const resources = {
  en: {
    translation: {
      "app": {
        "name": "DASHTRACER",
        "tagline": "Creator Management Platform",
        "description": "Empowering creators, streamlining success"
      },
      "auth": {
        "welcomeBack": "Welcome Back",
        "signInDescription": "Sign in to your account to continue",
        "continueWithTikTok": "Continue with TikTok",
        "or": "OR",
        "emailOrTikTokId": "Email Address / TikTok ID",
        "password": "Password",
        "signingIn": "Signing In...",
        "login": "Sign In",
        "needHelp": "Need help? Contact your team administrator",
        "fillAllFields": "Please fill in all fields",
        "invalidCredentials": "Invalid credentials",
        "logout": "Logout"
      },
      "common": {
        "dashboard": "Dashboard",
        "knowledgeBase": "Knowledge Base",
        "lightMode": "Light Mode",
          "darkMode": "Dark Mode",
          "toggleTheme": "Toggle Theme",
          "language": "Language",
          "changeLanguage": "Change Language",
          "user": "User",
          "logout": "Logout",
          "home": "Home",
          "management": "Management",
          "administration": "Administration"
        },
        "notifications": {
          "title": "Notifications",
          "markAllAsRead": "Mark all as read",
          "clearAll": "Clear all",
          "noNotifications": "No notifications yet",
          "justNow": "Just now",
          "timeAgo": {
            "about": "about {{time}}",
            "over": "over {{time}}",
            "almost": "almost {{time}}",
            "lessThan": "less than {{time}}"
          }
        },
        "ticketNotifications": {
          "title": "Ticket Notifications",
          "noUnreadNotifications": "No unread notifications",
          "noSubject": "No Subject",
          "justNow": "Just now",
          "minutesAgo": "{{count}}m ago",
          "hoursAgo": "{{count}}h ago",
          "daysAgo": "{{count}}d ago",
          "viewMoreNotifications": "View {{count}} more notifications",
          "viewAllTickets": "View All Support Tickets",
          "priority": {
            "high": "High",
            "medium": "Medium",
            "low": "Low"
          }
        },
        "profile": {
          "title": "My Profile",
          "settings": "Profile Settings",
          "personalInfo": "Personal Information",
          "changePassword": "Change Password",
          "editProfile": "Edit Profile",
          "saveChanges": "Save Changes",
          "saving": "Saving...",
          "cancel": "Cancel",
          "firstName": "First Name",
          "lastName": "Last Name",
          "username": "Username",
          "email": "Email Address",
          "phone": "Phone Number",
          "currentPassword": "Current Password",
          "newPassword": "New Password",
          "confirmPassword": "Confirm New Password",
          "roles": {
            "admin": "Administrator",
            "manager": "Manager",
            "sub_manager": "Sub-Manager",
            "creator": "Creator"
          },
          "messages": {
            "updateSuccess": "Profile updated successfully!",
            "updateError": "Failed to update profile",
            "emailUsernameRequired": "Email and username are required",
            "invalidEmail": "Please enter a valid email address",
            "currentPasswordRequired": "Current password is required to change password",
            "newPasswordRequired": "New password is required",
            "passwordTooShort": "New password must be at least 6 characters long",
            "passwordsNotMatch": "New passwords do not match"
          },
          "passwordNote": "Leave password fields empty if you don't want to change your password."
        },
        "header": {
          "profileSettings": "Profile Settings",
          "managerDashboard": "Manager Dashboard",
          "logout": "Logout",
          "viewAllCreators": "View All Creators",
          "addCreator": "Add Creator",
          "activeCreators": "active creators"
        },
        "managerDashboard": {
          "title": "Manager Dashboard",
          "refresh": "Reset Data",
          "confirmReset": "Are you sure you want to reset all creator data?",
          "resetWarning": "This action will reset all creator statistics and data. This action cannot be undone.",
          "cancel": "Cancel",
          "confirm": "Confirm Reset",
          "resetSuccess": "Data has been successfully reset",
          "resetError": "Error occurred during reset",
          "stats": {
            "totalDiamonds": "Total Diamonds",
            "totalFollowers": "Total Followers", 
            "activeCreators": "Active Creators",
            "totalCreatorsThisMonth": "Total Creators (This Month)",
            "totalFollowersThisMonth": "Total Followers (This Month)",
            "totalViewsThisMonth": "Total Views (This Month)",
            "totalDiamondsThisMonth": "Total Diamonds (This Month)",
            "lastMonth": "Last Month",
            "totalDiamondsPerMonth": "Total Diamonds per Month"
          },
          "chart": {
            "actualDiamonds": "Actual Diamonds",
            "targetDiamonds": "Target Diamonds"
          },
          "modals": {
            "createCampaign": "Create New Campaign",
            "createEvent": "Create New Event", 
            "createCreator": "Create New Creator",
            "campaignName": "Campaign Name",
            "description": "Description",
            "budget": "Budget",
            "assignCreators": "Assign Creators",
            "assignCreatorsHelper": "Enter creator names separated by commas",
            "assignCreatorsPlaceholder": "e.g., Emma Chen, Liam Wong, Sophia Kim",
            "startDate": "Start Date",
            "endDate": "End Date",
            "eventTitle": "Event Title",
            "date": "Date",
            "time": "Time",
            "location": "Location",
            "eventType": "Event Type",
            "maxParticipants": "Max Participants",
            "maxParticipantsPlaceholder": "Leave empty for unlimited",
            "username": "Username",
            "tiktokId": "TikTok ID",
            "email": "Email",
            "phone": "Phone",
            "followersCount": "Followers Count",
            "contentCategory": "Content Category",
            "creatorTier": "Creator Tier",
            "save": "Save",
            "cancel": "Cancel"
          },
          "eventTypes": {
            "liveStream": "Live Stream",
            "workshop": "Workshop",
            "meetGreet": "Meet & Greet", 
            "training": "Training",
            "contest": "Contest"
          },
          "tiers": {
            "bronze": "Bronze",
            "silver": "Silver",
            "gold": "Gold",
                       "platinum": "Platinum"
         },
         "chart": {
           "monthlyPerformance": "Monthly Performance",
           "currentMonth": "Current Month",
           "monthlyTarget": "Monthly Target",
           "growthRate": "Growth Rate",
           "lastMonth": "Last Month",
           "month": "Month"
         },
         "activity": {
           "recentActivity": "Recent Activity",
           "noRecentActivity": "No recent activity to display."
         },
         "resetDialog": {
           "areYouSure": "Are you sure you want to reset all your creators' profile data?",
           "dataWillBeReset": "Data that will be reset:",
           "diamonds": "Diamonds: 0",
           "followers": "Followers: 0",
           "validLiveDays": "Valid live days: 0",
           "liveDuration": "Live duration: 0h 0m",
           "liveStreams": "Live streams: 0",
           "matches": "Matches: 0",
           "otherMetrics": "And all other metrics...",
           "thisActionWillAffect": "This action will affect {{count}} creator(s)."
         },
         "creatorsBonusTable": {
           "title": "Creators Bonus",
           "total": "Total",
           "searchPlaceholder": "Search by name, TikTok ID or program...",
           "noCreatorsFound": "No creators found or no creators have bonus data available.",
           "tableHeaders": {
             "creator": "Creator",
             "diamonds": "Diamonds",
             "days": "Days",
             "hours": "Hours",
             "program": "Program",
             "rate": "Rate",
             "bonus": "Bonus",
             "active": "Active",
             "actions": "Actions"
           },
           "pagination": {
             "rowsPerPage": "Rows per page",
             "displayedRows": "{{from}}-{{to}} of {{count}}"
           },
           "tooltips": {
             "activeTooltip": "Active in the last 7 days",
             "inactiveTooltip": "No valid hours in the last 7 days"
           },
           "actions": {
             "message": "Message",
             "sendMessage": "Send a message to {{name}}",
             "cancel": "Cancel",
             "send": "Send",
             "sending": "Sending..."
           },
           "dialog": {
             "messageLabel": "Message",
             "messagePlaceholder": "Enter your message here..."
           },
           "notifications": {
             "enterMessage": "Please enter a message",
             "messageSentSuccess": "Message sent successfully!",
             "messageSentError": "Failed to send message"
           }
         }
      },
      "wiki": {
        "knowledgeBase": "Knowledge Base",
        "dashboardKnowledgeBase": "Dashboard Knowledge Base",
        "everythingYouNeedToKnow": "Everything you need to know about working with our agency and succeeding on TikTok",
        "searchArticles": "Search articles, guides, and tutorials...",
        "allContent": "All Content",
        "agencyInfo": "Agency Info",
        "tiktokGuides": "TikTok Guides",
        "readFullArticle": "Read Full Article"
      },
      "pages": {
        "landing": {
          "title": "The Future of DASHTRACER",
          "subtitle": "Harness AI-powered analytics, automate creator management, and scale your agency to new heights with the most advanced DASHTRACER management platform.",
          "shopIntegration": "🚀 Now Supporting DASHTRACER Shop Integration",
          "getStarted": "Get Started",
          "learnMore": "Learn More"
        },
        "dashboard": {
          "title": "Dashboard",
          "welcome": "Welcome back",
          "overview": "Overview",
          "analytics": "Analytics",
          "notifications": "Notifications"
        },
        "profile": {
          "title": "Profile",
          "personalInfo": "Personal Information",
          "settings": "Settings",
          "edit": "Edit Profile",
          "save": "Save Changes",
          "cancel": "Cancel"
        },
        "support": {
          "title": "Support Center",
          "description": "Need help? Create a support ticket and our team will assist you as soon as possible.",
          "createTicket": "Create Support Ticket",
          "recentTickets": "My Recent Tickets",
          "noTickets": "No tickets found. Create your first ticket above."
        },
        "campaigns": {
          "title": "Campaign Management",
          "underDevelopment": "This page is under development",
          "description": "The Campaign Management page will provide a complete overview of all campaigns across the agency. Administrators will be able to create, edit, and monitor all campaign activities, with detailed reporting and performance metrics."
        },
        "rules": {
          "title": "Rules Management",
          "bonusRulesManagement": "Bonus Rules Management",
          "description": "Create and manage bonus rules for creators.",
          "underDevelopment": "This page is under development",
          "fullDescription": "The Rules Management page will allow administrators to create, modify, and delete bonus rules for creators. The interface will provide a complete view of all rules, with the ability to define conditions and rewards for each rule."
        },
        "dataManagement": {
          "title": "Data Management",
          "accessDenied": "Access Denied",
          "noPermission": "You do not have permission to access this page.",
          "batchImportMode": "Batch Import Mode (Multiple Files)",
          "uploadMultipleFiles": "Upload multiple files at once for bulk processing",
          "uploadOneFile": "Upload and process one file at a time with field mapping",
          "selectDataType": "Select Data Type",
          "requiredFields": "required fields",
          "template": "Template",
          "uploadFiles": "Upload Files",
          "processBatch": "Process Batch",
          "uploadFile": "Upload File",
          "mapFields": "Map Fields",
          "reviewImport": "Review & Import"
        },
                 "creators": {
           "title": "Creators",
           "management": "Creator Management",
           "profile": "Creator Profile",
           "analytics": "Creator Analytics",
           "add": "Add Creator",
           "edit": "Edit Creator",
           "delete": "Delete Creator",
           "addNew": "Add New Creator",
           "username": "Username",
           "category": "Category",
           "manager": "Manager",
           "agency": "Agency",
           "actions": "Actions",
           "noCreatorsFound": "No creators found",
           "loadingCreators": "Loading creators...",
           "retry": "Retry",
           "cancel": "Cancel",
           "addedSuccessfully": "Creator {{name}} added successfully!",
           "validation": {
             "usernameRequired": "Username is required",
             "categoryRequired": "Category is required",
             "managerRequired": "Manager is required",
             "agencyRequired": "Agency is required"
           },
           "categories": {
             "lifestyle": "Lifestyle",
             "comedy": "Comedy",
             "dance": "Dance",
             "beauty": "Beauty",
             "fitness": "Fitness",
             "food": "Food",
             "gaming": "Gaming",
             "education": "Education"
           }
         },
        "admin": {
          "dashboard": {
            "title": "Admin Dashboard",
            "welcome": "Welcome back, {{name}}! 🚀 Manage your platform overview",
            "totalCreators": "Total Creators",
            "totalManagers": "Total Managers",
            "platformHealth": "Platform Health",
            "bonusRules": {
              "title": "💎 Bonus Rules Management",
              "description": "Configure and manage creator bonus programs",
              "addNewRule": "Add New Rule",
              "program": "Program",
              "validDays": "Valid Days",
              "hoursRequired": "Hours Required",
              "rate": "Rate",
              "actions": "Actions",
              "addRuleDialog": "Add New Bonus Rule",
              "programName": "Program Name",
              "validDaysRequired": "Valid Days Required",
              "hoursRequiredField": "Hours Required",
              "rateField": "Rate",
              "ruleUpdated": "Rule updated successfully!",
              "ruleDeleted": "Rule deleted successfully!",
              "ruleAdded": "Rule added successfully!"
            },
            "managersCreators": {
              "title": "👥 Managers & Their Creators",
              "description": "Overview of all managers and their assigned creators",
              "managerUsername": "Manager Username",
              "email": "Email",
              "phone": "Phone",
              "creators": "Creators",
              "creatorUsername": "Creator Username",
              "liveDays": "Live Days",
              "diamonds": "Diamonds",
              "hours": "Hours",
              "bonus": "Bonus",
              "creatorsCount": "{{count}} creators",
              "managersPerPage": "Managers per page",
              "creatorsPerPage": "Creators per page"
            },
            "upload": {
              "title": "📊 Upload Creator Data",
              "description": "Import creator data from Excel files (.xlsx, .xls)",
              "dragDrop": "Drag & drop an Excel file here, or click to select",
              "dropping": "📁 Drop the Excel file here...",
              "supportedFormats": "Supported formats: .xlsx, .xls",
              "confirmUpload": "Confirm Upload",
              "confirmMessage": "Are you sure you want to upload this file?",
              "fileDetails": "File Details:",
              "fileName": "Name: {{name}}",
              "fileSize": "Size: {{size}} MB",
              "fileType": "Type: {{type}}",
              "upload": "Upload",
              "uploading": "Uploading..."
            }
          }
        }
      },
      "forms": {
        "labels": {
          "email": "Email Address",
          "password": "Password",
          "username": "Username",
          "firstName": "First Name",
          "lastName": "Last Name",
          "phone": "Phone Number",
          "title": "Title",
          "description": "Description",
          "category": "Category",
          "priority": "Priority",
          "status": "Status"
        },
        "placeholders": {
          "enterEmail": "Enter your email",
          "enterPassword": "Enter your password",
          "enterUsername": "Enter username",
          "searchPlaceholder": "Search..."
        },
        "buttons": {
          "submit": "Submit",
          "cancel": "Cancel",
          "save": "Save",
          "edit": "Edit",
          "delete": "Delete",
          "create": "Create",
          "update": "Update",
          "send": "Send",
          "close": "Close",
          "back": "Back",
          "next": "Next",
          "previous": "Previous"
        }
      },
      "tickets": {
        "title": "Ticket",
        "create": "Create Ticket",
        "submit": "Submit Ticket",
        "ticketTitle": "Ticket Title",
        "detailedDescription": "Detailed Description",
        "categories": {
          "accountIssue": "Account Issue",
          "payment": "Payment",
          "technical": "Technical",
          "content": "Content",
          "other": "Other"
        },
        "priorities": {
          "low": "Low",
          "medium": "Medium",
          "high": "High",
          "urgent": "Urgent"
        },
        "statuses": {
          "open": "Open",
          "inProgress": "In Progress",
          "resolved": "Resolved",
          "closed": "Closed"
        }
      },
              "navigation": {
          "home": "Home",
          "dashboard": "Dashboard",
          "profile": "Profile",
          "creators": "Creators",
          "events": "Events",
          "wiki": "Wiki",
          "contact": "Contact",
          "support": "Support",
          "admin": "Administration",
          "management": "Management",
          "tickets": "Tickets",
          "campaigns": "Campaigns",
          "rules": "Rules",
          "analytics": "Analytics",
          "manageManagers": "Manage Managers",
          "dataManagement": "Data Management"
        },
        "userRoles": {
          "administrator": "Administrator",
          "manager": "Manager",
          "subManager": "Sub-Manager",
          "creator": "Creator",
          "myCreators": "My Creators",
          "assignedCreators": "Assigned Creators",
          "allCreators": "All Creators"
        },
        "events": {
          "title": "Agency Events",
          "description": "View all events from your agency managers",
          "calendar": "Calendar",
          "list": "List",
          "searchEvents": "Search events...",
          "sortByOldest": "Sort by oldest first",
          "sortByNewest": "Sort by newest first",
          "noEventsFound": "No events found",
          "noEventsDescription": "No events have been created by managers in your agency yet",
          "viewDetails": "View Details",
          "eventDetails": "Event Details",
          "startTime": "Start Time",
          "endTime": "End Time",
          "location": "Location",
          "type": "Type",
          "general": "General",
          "participants": "Participants",
          "participantsCount": "Participants ({{count}})",
          "close": "Close",
          "dayNames": {
            "sun": "Sun",
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat"
          }
        },
        "contact": {
          "title": "Agency Management Center",
          "description": "Manage support tickets and events from your agency",
          "agencyManagement": "Agency Management",
          "supportTickets": "Support Tickets",
          "agencySupportTickets": "Agency Support Tickets",
          "refresh": "Refresh",
          "searchTickets": "Search tickets...",
          "loadingTickets": "Loading tickets...",
          "noTicketsFound": "No tickets found",
          "tryChangeFilters": "Try changing your search or filters",
          "selectTicketToChat": "Select a ticket to start chatting",
          "chooseTicketDescription": "Choose a support ticket from the list to view the conversation",
          "createNewTicket": "Create New Support Ticket",
          "subject": "Subject",
          "description": "Description",
          "category": "Category",
          "priority": "Priority",
          "createTicket": "Create Ticket",
          "cancel": "Cancel",
          "ticketCreatedSuccessfully": "Ticket created successfully!",
          "failedToCreateTicket": "Failed to create ticket",
          "failedToFetchTickets": "Failed to fetch tickets",
          "failedToFetchEvents": "Failed to fetch events",
          "ticketStatusUpdated": "Ticket status updated successfully!",
          "failedToUpdateStatus": "Failed to update ticket status",
          "realTime": "Real-time",
          "status": {
            "all": "All Statuses",
            "open": "Open",
            "inProgress": "In Progress",
            "resolved": "Resolved",
            "closed": "Closed"
          },
          "categories": {
            "all": "All Categories",
            "general": "General",
            "generalInquiry": "General Inquiry",
            "matchPlanning": "Match Planning",
            "bugReport": "Bug Report",
            "banReport": "Ban Report",
            "departureRequest": "Departure Request"
          },
          "priorities": {
            "low": "Low",
            "medium": "Medium",
            "high": "High",
            "urgent": "Urgent"
          }
        },
      "status": {
        "loading": "Loading...",
        "error": "Error",
        "success": "Success",
        "warning": "Warning",
        "info": "Information",
        "notFound": "Not Found",
        "unauthorized": "Unauthorized",
        "forbidden": "Forbidden"
      },
      "messages": {
        "welcome": "Welcome to DASHTRACER",
        "loginSuccess": "Login successful",
        "logoutSuccess": "Logout successful",
        "saveSuccess": "Saved successfully",
        "deleteSuccess": "Deleted successfully",
        "updateSuccess": "Updated successfully",
        "createSuccess": "Created successfully",
        "errorOccurred": "An error occurred",
        "noDataFound": "No data found",
        "confirmDelete": "Are you sure you want to delete this item?",
        "unsavedChanges": "You have unsaved changes. Are you sure you want to leave?"
      },
      "creatorManagement": {
        "title": "Creator Management",
        "allCreatorsManagement": "All Creators Management",
        "description": "Manage and monitor your TikTok creators",
        "allCreatorsDescription": "Manage and monitor all TikTok creators across the platform",
        "addCreator": "Add Creator",
        "editCreator": "Edit Creator",
        "addNewCreator": "Add New Creator",
        "updateCreator": "Update Creator",
        "deleteCreator": "Delete Creator",
        "confirmDeleteCreator": "Are you sure you want to delete creator \"{{name}}\"?",
        "searchPlaceholder": "Search creators by name or category...",
        "searchPlaceholderAdmin": "Search creators by name, category, or manager...",
        "totalCreators": "Total Creators",
        "noCreatorsFound": "No creators found",
        "noCreatorsFoundDescription": "Try adjusting your search terms or clear the search to see all creators",
        "noCreatorsFoundEmpty": "Get started by adding your first creator to the platform",
        "addFirstCreator": "Add Your First Creator",
        "loadingCreators": "Loading creators...",
        "loadingCreatorsDescription": "Please wait while we fetch your creators",
        "categories": {
          "Gaming": "Gaming",
          "Beauty": "Beauty", 
          "Lifestyle": "Lifestyle",
          "Comedy": "Comedy",
          "Education": "Education",
          "Music": "Music",
          "Dance": "Dance",
          "Food": "Food",
          "General": "General"
        },
        "fields": {
          "username": "Username",
          "tikTokId": "TikTok ID",
          "category": "Category",
          "followers": "Followers",
          "diamonds": "Diamonds",
          "liveDuration": "Live Duration",
          "validLiveDays": "Valid Live Days", 
          "matches": "Matches",
          "status": "Status",
          "manager": "Manager",
          "email": "Email",
          "phone": "Phone",
          "actions": "Actions"
        },
        "status": {
          "active": "Active",
          "inactive": "Inactive",
          "suspended": "Suspended"
        },
        "validation": {
          "usernameRequired": "Username is required",
          "tikTokIdRequired": "TikTok ID is required",
          "categoryRequired": "Category is required",
          "followersRequired": "Followers count is required",
          "diamondsRequired": "Diamonds count is required"
        },
        "actions": {
          "retry": "Retry",
          "refresh": "Refresh"
        }
      },
      "eventCalendar": {
        "title": "Events Calendar",
        "loadingCalendar": "Loading calendar...",
        "viewOnlyMode": "View-only mode: You can see events created by managers",
        "noDescription": "No description",
        "legend": {
          "tournament": "Tournament",
          "challenge": "Challenge", 
          "meeting": "Meeting",
          "match": "Match"
        },
        "stats": {
          "tournaments": "Tournaments",
          "challenges": "Challenges",
          "meetings": "Meetings",
          "matches": "Matches"
        },
        "eventTypes": {
          "liveStream": "Live Stream",
          "workshop": "Workshop",
          "meetGreet": "Meet & Greet",
          "training": "Training",
          "contest": "Contest",
          "tournament": "Tournament",
          "challenge": "Challenge",
          "meeting": "Meeting",
          "match": "Match"
        }
      },
      "events": {
        "pageTitle": "Events & Tournaments",
        "pageSubtitle": "Join tournaments, challenges, and community events",
        "createEvent": "Create Event",
        "createFirstEvent": "Create First Event",
        "refresh": "Refresh events",
        "calendar": "Calendar",
        "list": "List",
        "close": "Close",
        "cancel": "Cancel",
        "joinTournament": "Join tournament",
        "joinChallenge": "Join challenge",
        "dateTime": "Date & Time",
        "location": "Location",
        "prize": "Prize",
        "participants": "Participants",
        "status": "Status",
        "types": {
          "tournament": "tournament",
          "challenge": "challenge",
          "meeting": "meeting",
          "match": "match",
          "liveStream": "live stream",
          "workshop": "workshop",
          "meetGreet": "meet & greet",
          "training": "training",
          "contest": "contest"
        },
        "statuses": {
          "scheduled": "scheduled",
          "active": "active",
          "completed": "completed",
          "cancelled": "cancelled"
        },
        "noEvents": "No events yet",
        "noEventsDescription": "Create your first event to get started",
        "newEventAvailable": "New Event Available",
        "newEventMessage": "A new event has been created by the manager. Check your calendar!",
        "failedToFetch": "Failed to fetch events. Please try again later.",
        "failedToCreate": "Failed to create or update the event. Please try again.",
        "editEvent": "Edit Event",
        "createNewEvent": "Create New Event"
      },
      "contact": {
        "pageTitle": "Support Center",
        "pageSubtitle": "Get help and manage your support tickets",
        "dashboard": "Dashboard",
        "support": "Support",
        "contactManager": "Contact Manager",
        "newTicket": "New Ticket",
        "realTimeSupport": "Real-Time Support Tickets",
        "searchTickets": "Search tickets...",
        "status": "Status",
        "category": "Category",
        "allStatuses": "All Statuses",
        "allCategories": "All Categories",
        "sortNewest": "Sort by oldest first",
        "sortOldest": "Sort by newest first",
        "noTicketsFound": "No tickets found",
        "noTicketsDescription": "Try changing your search or filters",
        "selectTicket": "Select a ticket to start chatting",
        "selectTicketDescription": "Choose a support ticket from the list to view the conversation",
        "createTicketTitle": "Create New Support Ticket",
        "subject": "Subject",
        "description": "Description",
        "priority": "Priority",
        "cancel": "Cancel",
        "createTicket": "Create Ticket",
        "contactManagerTitle": "Contact Your Manager",
        "contactManagerDescription": "Send a direct message to your manager:",
        "supportManager": "Support Manager",
        "message": "Message",
        "messagePlaceholder": "Type your message here...",
        "sendMessage": "Send Message",
        "ticketStatusUpdated": "Ticket status updated successfully!",
        "ticketUpdateFailed": "Failed to update ticket status",
        "realTime": "Real-time",
        "statuses": {
          "open": "Open",
          "inProgress": "In Progress",
          "resolved": "Resolved",
          "closed": "Closed"
        },
        "categories": {
          "general": "General Inquiry",
          "matchPlanning": "Match Planning",
          "bugReport": "Bug Report",
          "banReport": "Ban Report",
          "departureRequest": "Departure Request"
        },
        "priorities": {
          "low": "Low",
          "medium": "Medium",
          "high": "High",
          "urgent": "Urgent"
        }
      },
      "creatorDashboard": {
        "title": "Creator Dashboard",
        "welcome": "Welcome back, {{username}}! Here's your performance overview.",
        "reportIssue": "Report Issue",
        "contactInformation": "📞 Contact Information",
        "creatorDetails": "Creator Details",
        "agencySupport": "Agency Support",
        "joined": "Joined",
        "manager": "Manager:",
        "createTicketTitle": "Create New Support Ticket",
        "subject": "Subject",
        "description": "Description",
        "category": "Category",
        "priority": "Priority",
        "cancel": "Cancel",
        "submitting": "Submitting...",
        "createTicket": "Create Ticket",
        "creatorDataNotFound": "Creator data not found",
        "ticketCreatedSuccess": "Ticket created successfully!",
        "ticketCreatedFailed": "Failed to create ticket.",
        "subjectDescriptionRequired": "Subject and description are required.",
        "categories": {
          "general": "General",
          "matchPlanning": "Match Planning",
          "bugReport": "Bug Report",
          "banReport": "Ban Report",
          "departureRequest": "Departure Request"
        },
        "priorities": {
          "low": "Low",
          "medium": "Medium",
          "high": "High",
          "urgent": "Urgent"
        }
      },
      "bonusRules": {
        "title": "Agency Bonus Program",
        "description": "The bonus program rules are based on the number of valid days and streaming hours.",
        "loading": "Loading bonus rules...",
        "program": "Program",
        "validDays": "Valid Days",
        "hours": "Hours",
        "rate": "Rate",
        "calculationFormula": "Calculation Formula",
        "formulaDescription": "The bonus is calculated according to the formula: <strong>Applicable Rate × Number of diamonds = Bonus amount in dollars</strong>",
        "example": "<strong>Example:</strong> A creator with 1M diamonds and a rate of 0.03% = $300 bonus"
      },
      "creatorBonusCard": {
        "title": "Bonus Program",
        "subtitle": "Your performance and rewards",
        "noDataAvailable": "No bonus information available",
        "diamond": "Diamond",
        "validDay": "Valid Day",
        "hours": "Hours",
        "rate": "Rate",
        "currentBonus": "Current Bonus"
      },
      "landingPage": {
        "hero": {
          "chip": "🚀 Now Supporting DASHTRACER Shop Integration",
          "title": "The Future of",
          "titleHighlight": "DASHTRACER",
          "subtitle": "Harness AI-powered analytics, automate creator management, and scale your agency to new heights with the most advanced DASHTRACER management platform.",
          "startFreeTrial": "Start Free Trial",
          "goToDashboard": "Go to Dashboard",
          "watchDemo": "Watch Demo",
          "languageSelector": "Select Language"
        },
        "stats": {
          "activeCreators": "Active Creators",
          "contentViews": "Content Views",
          "revenueGenerated": "Revenue Generated",
          "uptime": "Uptime"
        },
        "features": {
          "title": "Powerful Features for Modern Agencies",
          "subtitle": "Everything you need to manage, grow, and optimize your DASHTRACER creator agency",
          "aiAnalytics": {
            "title": "AI-Powered Analytics",
            "description": "Advanced machine learning algorithms to predict content performance and optimize your strategy in real-time."
          },
          "creatorEcosystem": {
            "title": "Creator Ecosystem",
            "description": "Connect with top-tier DASHTRACER creators worldwide and manage collaborations effortlessly."
          },
          "growthAcceleration": {
            "title": "Growth Acceleration",
            "description": "Turbocharge your agency growth with our proven strategies and automated tools."
          },
          "enterpriseSecurity": {
            "title": "Enterprise Security",
            "description": "Bank-level security with end-to-end encryption to protect your valuable data and creator relationships."
          },
          "campaignAutomation": {
            "title": "Campaign Automation",
            "description": "Automate your entire campaign lifecycle from planning to execution and performance tracking."
          },
          "lightningFast": {
            "title": "Lightning Fast",
            "description": "Experience blazing-fast performance with our optimized infrastructure and real-time data processing."
          }
        },
        "cta": {
          "title": "Ready to Transform Your Agency?",
          "subtitle": "Join thousands of successful creators and agencies already using DASHTRACER",
          "startYourFreeTrial": "Start Your Free Trial"
        },
        "dashboardPreview": "DASHTRACER Dashboard Preview"
      },
      "loginPage": {
        "title": "DASHTRACER",
        "subtitle": "Creator Management Platform",
        "tagline": "Empowering creators, streamlining success",
        "welcomeBack": "Welcome Back",
        "signInMessage": "Sign in to your account to continue",
        "continueWithTikTok": "Continue with TikTok",
        "or": "OR",
        "emailLabel": "Email Address / TikTok ID",
        "passwordLabel": "Password",
        "signingIn": "Signing In...",
        "signIn": "Sign In",
        "needHelp": "Need help? Contact your team administrator",
        "languageSelector": "Select Language",
        "features": {
          "analytics": {
            "title": "Analytics",
            "description": "Real-time performance tracking"
          },
          "teamManagement": {
            "title": "Team Management",
            "description": "Collaborate with creators"
          },
          "contentPlanning": {
            "title": "Content Planning",
            "description": "Schedule and organize content"
          }
        },
        "errors": {
          "fillAllFields": "Please fill in all fields",
          "invalidCredentials": "Invalid credentials"
        }
      },
      "creatorProfile": {
        "title": "Creator Profile",
        "editProfile": "Edit Profile",
        "saving": "Saving...",
        "save": "Save",
        "cancel": "Cancel",
        "notFound": "Not Found!",
        "contractDetails": "Contract Details",
        "paymentInformation": "Payment Information",
        "editProfileInformation": "Edit Profile Information",
        "changePassword": "Change Password",
        "fields": {
          "id": "ID",
          "displayName": "Display Name",
          "username": "Username",
          "email": "Email",
          "phone": "Phone",
          "tikTokId": "TikTok ID",
          "category": "Category",
          "bio": "Bio",
          "joined": "Joined",
          "following": "Following",
          "videos": "Videos",
          "followers": "Followers",
          "likes": "Likes",
          "views": "Views",
          "contractStart": "Contract Start",
          "duration": "Duration",
          "daysWithAgency": "Days with Agency",
          "diamondsCollected": "Diamonds Collected",
          "ribBankAccount": "RIB (Bank Account)",
          "paypalAccount": "PayPal Account",
          "currentPassword": "Current Password",
          "newPassword": "New Password",
          "confirmNewPassword": "Confirm New Password"
        },
        "categories": {
          "lifestyle": "Lifestyle",
          "fashion": "Fashion",
          "beauty": "Beauty",
          "fitness": "Fitness",
          "food": "Food",
          "travel": "Travel",
          "tech": "Tech",
          "gaming": "Gaming",
          "music": "Music",
          "dance": "Dance",
          "comedy": "Comedy",
          "education": "Education",
          "business": "Business",
          "health": "Health",
          "parenting": "Parenting",
          "pets": "Pets",
          "sports": "Sports",
          "art": "Art",
          "diy": "DIY",
          "automotive": "Automotive",
          "finance": "Finance",
          "other": "Other"
        },
        "placeholders": {
          "enterBankAccount": "Enter bank account details"
        },
        "helperTexts": {
          "note": "Note",
          "tikTokIdNotEditable": "TikTok ID cannot be edited for security reasons",
          "contactManagerForTikTokId": "Contact your manager if you need to update your TikTok ID",
          "leavePasswordFieldsEmpty": "Leave password fields empty if you don't want to change your password",
          "onlyEditOwnProfile": "You can only edit your own profile"
        },
        "errors": {
          "currentPasswordRequired": "Current password is required to change password",
          "newPasswordRequired": "New password is required",
          "newPasswordTooShort": "New password must be at least 6 characters long",
          "passwordsDoNotMatch": "New passwords do not match",
          "failedToUpdate": "Failed to update profile"
        },
        "success": {
          "profileUpdated": "Profile updated successfully!"
        },
        "daysUnit": "{{count}} days",
        "unknownUser": "Unknown User"
      },
      "wikiPage": {
        "dashboard": "Dashboard",
        "knowledgeBase": "Knowledge Base",
        "title": "Dashboard Knowledge Base",
        "subtitle": "Everything you need to know about working with our agency and succeeding on TikTok",
        "searchPlaceholder": "Search articles, guides, and tutorials...",
        "tabs": {
          "allContent": "All Content",
          "agencyInfo": "Agency Info",
          "tiktokGuides": "TikTok Guides"
        },
        "categories": "Categories",
        "searchResults": "Found {{count}} result{{plural}} for \"{{term}}\"",
        "readFullArticle": "Read Full Article",
        "noArticlesFound": "No articles found",
        "noArticlesFoundDescription": "Try adjusting your search terms or browse different categories.",
        "noArticlesInCategory": "No articles available in this category yet.",
        "clearSearch": "Clear Search",
        "agencyCategories": {
          "gettingStarted": {
            "title": "Getting Started",
            "description": "Learn about our agency, how we work and what we offer to creators."
          },
          "revenue": {
            "title": "Revenue & Payments",
            "description": "Understand how payment works, our bonus system, and revenue sharing."
          },
          "campaigns": {
            "title": "Brand Campaigns",
            "description": "How to participate in brand campaigns and maximize your earnings."
          },
          "policies": {
            "title": "Agency Policies",
            "description": "Important policies and guidelines that all creators should follow."
          }
        },
        "tiktokCategories": {
          "tiktokBasics": {
            "title": "TikTok Basics",
            "description": "Essential information about TikTok features and functionality."
          },
          "contentStrategy": {
            "title": "Content Strategy",
            "description": "Best practices for creating engaging content that performs well."
          },
          "liveStreaming": {
            "title": "Live Streaming",
            "description": "Tips and tricks for successful TikTok live streams and earning diamonds."
          },
          "tiktokLiveWiki": {
            "title": "TikTok LIVE Wiki for Creators",
            "description": "Comprehensive guide to TikTok LIVE streaming, eligibility, rules, monetization and more."
          },
          "tiktokAlgorithm": {
            "title": "Algorithm & Trends",
            "description": "Understanding how the TikTok algorithm works and staying on top of trends."
          }
        },
        "articles": {
          "tiktokLiveEligibility": {
            "title": "Eligibility Requirements for TikTok LIVE",
            "summary": "Learn about age and follower requirements to qualify for TikTok LIVE streaming.",
            "content": "<h2>Eligibility Requirements for a TikTok LIVE</h2><h3>How to become eligible to go LIVE on TikTok?</h3><h4>How To:</h4><ul><li><strong>Be 18 years old:</strong> Make sure you're at least 18 years old. This is the minimum age to start a LIVE.</li><li><strong>Reach 1,000 followers:</strong> Get at least 1,000 followers on your account. This is the general threshold to unlock the LIVE feature.</li><li><strong>Be 18+ for Gifting:</strong> If you want to send or receive Gifts during a LIVE, you must be 18 or older (or 19 in South Korea).</li></ul><h4>What Not To Do:</h4><ul><li><strong>Don't try to bypass age restrictions:</strong> Any attempt to fake your age will be detected and could lead to account suspension.</li><li><strong>Don't expect to go LIVE without enough followers:</strong> The LIVE feature won't be active if you haven't met the required follower count.</li></ul>"
          },
          "tiktokLiveContentRules": {
            "title": "TikTok LIVE Content: Rules to Follow",
            "summary": "Guidelines and rules for creating compliant TikTok LIVE content and avoiding penalties.",
            "content": "<h2>TikTok LIVE Content: Rules to Follow (and Avoid)</h2><h3>How to create content that complies with TikTok's guidelines and avoid penalties?</h3><h4>How To:</h4><ul><li><strong>Be authentic and live:</strong> Show yourself live, interact, and ensure your visible presence on screen.</li><li><strong>Respect copyrights:</strong> Only use content (music, images) for which you have the rights.</li><li><strong>Maintain positive behavior:</strong> Use respectful language and appropriate conduct.</li></ul><h4>What Not To Do:</h4><ul><li><strong>Don't broadcast pre-recorded content:</strong> LIVEs must be real-time broadcasts.</li><li><strong>Don't use blank or static screens:</strong> Avoid black screens, still images, or QR codes without interaction.</li><li><strong>Don't be absent for too long:</strong> Stay present and engaged with your audience.</li><li><strong>Don't redirect off TikTok:</strong> Avoid displaying links or information that push users to other platforms.</li><li><strong>Don't violate sensitive content rules:</strong> Strict prohibition of nudity, sexual acts, violence, harassment, hate speech, misinformation, or promotion of regulated products (alcohol, drugs, weapons, etc.).</li></ul>"
          },
          "tiktokLiveMonetization": {
            "title": "Monetizing Your TikTok LIVE: How It Works",
            "summary": "Learn how LIVE Gifts can become a source of income and maximize your earnings.",
            "content": "<h2>Monetizing Your TikTok LIVE: How It Works</h2><h3>How can LIVE Gifts become a source of income?</h3><h4>How To:</h4><ul><li><strong>Encourage Gifts:</strong> Engage your audience and create quality content to encourage viewers to send you gifts.</li><li><strong>Thank donors:</strong> Express your gratitude live to people who give you gifts.</li><li><strong>Create valuable content:</strong> The more interesting and entertaining your LIVE is, the more likely you are to receive gifts.</li></ul><h4>What Not To Do:</h4><ul><li><strong>Don't force donations:</strong> Avoid aggressive or repetitive begging for gifts.</li><li><strong>Don't violate rules for monetization:</strong> Any violation of guidelines will make your LIVE ineligible for monetization.</li><li><strong>Don't produce low-quality content:</strong> Inauthentic or low-quality LIVEs will not be monetized.</li></ul><h2>Exploring Other Monetization Avenues on TikTok LIVE</h2><h3>How to diversify your income beyond LIVE Gifts?</h3><h4>How To:</h4><ul><li><strong>Use TikTok Shop in LIVE:</strong> If you sell products, integrate TikTok Shop into your LIVE for live demonstrations and direct sales.</li><li><strong>Seek brand partnerships:</strong> Collaborate with brands for sponsored LIVEs or product placements.</li><li><strong>Engage in affiliate marketing:</strong> Promote other brands' products using a unique link to earn a commission on sales.</li><li><strong>Utilize the Creator Rewards Program:</strong> Create videos longer than one minute to potentially generate income based on views and engagement.</li><li><strong>Offer LIVE Subscriptions:</strong> Provide exclusive content to your most loyal fans via a paid subscription.</li></ul><h4>What Not To Do:</h4><ul><li><strong>Don't stick to a single revenue stream:</strong> Explore and diversify your monetization options.</li><li><strong>Don't promote irrelevant products:</strong> Ensure products align with your niche and audience interest.</li><li><strong>Don't violate transparency rules:</strong> Always disclose sponsored or affiliate content.</li></ul>"
          },
          "tiktokLiveBestPractices": {
            "title": "TikTok LIVE: Best Practices for Success",
            "summary": "Essential tips and strategies to make your TikTok LIVE streams more engaging and successful.",
            "content": "<h2>TikTok LIVE: Best Practices for Success</h2><h3>How to maximize engagement and success during your LIVE streams?</h3><h4>Before Going LIVE:</h4><ul><li><strong>Plan your content:</strong> Have a rough idea of what you want to talk about or do during your stream.</li><li><strong>Announce your LIVE in advance:</strong> Use regular posts to let your followers know when you'll be going LIVE.</li><li><strong>Choose optimal timing:</strong> Stream when your audience is most active (check your analytics).</li><li><strong>Prepare your setup:</strong> Ensure good lighting, clear audio, and a stable internet connection.</li></ul><h4>During Your LIVE:</h4><ul><li><strong>Greet viewers by name:</strong> Welcome people as they join to create a personal connection.</li><li><strong>Read and respond to comments:</strong> Active engagement keeps viewers interested and encourages participation.</li><li><strong>Keep the energy high:</strong> Be enthusiastic and maintain an upbeat demeanor throughout the stream.</li><li><strong>Use interactive features:</strong> Polls, Q&As, and challenges can boost engagement.</li><li><strong>Collaborate with other creators:</strong> Multi-user LIVEs can expand your reach.</li></ul><h4>What Not To Do:</h4><ul><li><strong>Don't ignore your audience:</strong> Failing to interact with viewers will cause them to leave.</li><li><strong>Don't have long periods of silence:</strong> Keep talking even when there are few viewers.</li><li><strong>Don't end abruptly:</strong> Give viewers a warning before ending your stream and thank them for watching.</li><li><strong>Don't multitask excessively:</strong> Stay focused on your audience rather than doing other activities.</li></ul><h4>Post-LIVE:</h4><ul><li><strong>Save highlights:</strong> Create short clips from your LIVE to post as regular content.</li><li><strong>Thank your audience:</strong> Post a follow-up thanking viewers and gift senders.</li><li><strong>Analyze performance:</strong> Review your LIVE analytics to improve future streams.</li></ul>"
          },
          "agencyRevenueSharing": {
            "title": "Understanding Revenue Sharing",
            "summary": "Learn how our revenue sharing model works and how to maximize your earnings.",
            "content": "<h2>Understanding Revenue Sharing</h2><p>Our agency operates on a transparent revenue-sharing model designed to reward creators fairly while supporting agency operations and growth initiatives.</p><h3>Revenue Split Breakdown:</h3><ul><li><strong>Creator Share: 70%</strong> - The majority goes directly to you</li><li><strong>Agency Support: 20%</strong> - Covers management, marketing, and technical support</li><li><strong>Platform Fees: 10%</strong> - Standard industry platform processing fees</li></ul><h3>How Payments Work:</h3><p>Payments are processed monthly, with earnings from the previous month paid out by the 15th of the current month. All payments are tracked transparently in your creator dashboard.</p>"
          },
          "brandCampaignParticipation": {
            "title": "How to Participate in Brand Campaigns",
            "summary": "Step-by-step guide to joining and succeeding in brand partnership campaigns.",
            "content": "<h2>How to Participate in Brand Campaigns</h2><p>Brand campaigns are one of the most lucrative opportunities for creators in our agency. Here's how to get involved and succeed.</p><h3>Getting Selected for Campaigns:</h3><ul><li>Maintain consistent, high-quality content</li><li>Keep your audience engagement rates high</li><li>Follow all agency guidelines and policies</li><li>Respond promptly to campaign invitations</li></ul><h3>Campaign Requirements:</h3><ul><li>Meet minimum follower counts (varies by campaign)</li><li>Demonstrate brand alignment with your content</li><li>Commit to delivery deadlines</li><li>Maintain professional communication</li></ul>"
          }
        }
      }
    }
  },
  fr: {
    translation: {
      "app": {
        "name": "DASHTRACER",
        "tagline": "Plateforme de Gestion des Créateurs",
        "description": "Autonomiser les créateurs, rationaliser le succès"
      },
      "auth": {
        "welcomeBack": "Bon Retour",
        "signInDescription": "Connectez-vous à votre compte pour continuer",
        "continueWithTikTok": "Continuer avec TikTok",
        "or": "OU",
        "emailOrTikTokId": "Adresse E-mail / ID TikTok",
        "password": "Mot de Passe",
        "signingIn": "Connexion...",
        "login": "Se Connecter",
        "needHelp": "Besoin d'aide ? Contactez votre administrateur d'équipe",
        "fillAllFields": "Veuillez remplir tous les champs",
        "invalidCredentials": "Identifiants invalides",
        "logout": "Déconnexion"
      },
      "common": {
        "dashboard": "Tableau de Bord",
        "knowledgeBase": "Base de Connaissances",
        "lightMode": "Mode Clair",
        "darkMode": "Mode Sombre",
        "toggleTheme": "Basculer le thème",
        "language": "Langue",
        "changeLanguage": "Changer de langue",
        "user": "Utilisateur",
        "logout": "Déconnexion",
        "home": "Accueil",
        "management": "Gestion",
        "administration": "Administration"
      },
      "notifications": {
        "title": "Notifications",
        "markAllAsRead": "Marquer tout comme lu",
        "clearAll": "Tout effacer",
        "noNotifications": "Aucune notification pour le moment",
        "justNow": "À l'instant",
        "timeAgo": {
          "about": "environ {{time}}",
          "over": "plus de {{time}}",
          "almost": "presque {{time}}",
          "lessThan": "moins de {{time}}"
        }
      },
      "ticketNotifications": {
        "title": "Notifications de Tickets",
        "noUnreadNotifications": "Aucune notification non lue",
        "noSubject": "Aucun Sujet",
        "justNow": "À l'instant",
        "minutesAgo": "il y a {{count}}m",
        "hoursAgo": "il y a {{count}}h",
        "daysAgo": "il y a {{count}}j",
        "viewMoreNotifications": "Voir {{count}} notifications de plus",
        "viewAllTickets": "Voir Tous les Tickets de Support",
        "priority": {
          "high": "Élevée",
          "medium": "Moyenne",
          "low": "Faible"
        }
      },
      "profile": {
        "title": "Mon Profil",
        "settings": "Paramètres de Profil",
        "personalInfo": "Informations Personnelles",
        "changePassword": "Changer le Mot de Passe",
        "editProfile": "Modifier le Profil",
        "saveChanges": "Sauvegarder les Modifications",
        "saving": "Sauvegarde...",
        "cancel": "Annuler",
        "firstName": "Prénom",
        "lastName": "Nom de Famille",
        "username": "Nom d'Utilisateur",
        "email": "Adresse Email",
        "phone": "Numéro de Téléphone",
        "currentPassword": "Mot de Passe Actuel",
        "newPassword": "Nouveau Mot de Passe",
        "confirmPassword": "Confirmer le Nouveau Mot de Passe",
        "roles": {
          "admin": "Administrateur",
          "manager": "Gestionnaire",
          "sub_manager": "Sous-Gestionnaire",
          "creator": "Créateur"
        },
        "messages": {
          "updateSuccess": "Profil mis à jour avec succès !",
          "updateError": "Échec de la mise à jour du profil",
          "emailUsernameRequired": "L'email et le nom d'utilisateur sont requis",
          "invalidEmail": "Veuillez entrer une adresse email valide",
          "currentPasswordRequired": "Le mot de passe actuel est requis pour changer le mot de passe",
          "newPasswordRequired": "Un nouveau mot de passe est requis",
          "passwordTooShort": "Le nouveau mot de passe doit contenir au moins 6 caractères",
          "passwordsNotMatch": "Les nouveaux mots de passe ne correspondent pas"
        },
        "passwordNote": "Laissez les champs de mot de passe vides si vous ne voulez pas changer votre mot de passe."
      },
      "header": {
        "profileSettings": "Paramètres de Profil",
        "managerDashboard": "Tableau de Bord Gestionnaire",
        "logout": "Déconnexion",
        "viewAllCreators": "Voir Tous les Créateurs",
        "addCreator": "Ajouter un Créateur",
        "activeCreators": "créateurs actifs"
      },
      "managerDashboard": {
        "title": "Tableau de Bord Gestionnaire",
        "refresh": "Réinitialiser les Données",
        "confirmReset": "Êtes-vous sûr de vouloir réinitialiser toutes les données des créateurs ?",
        "resetWarning": "Cette action réinitialisera toutes les statistiques et données des créateurs. Cette action ne peut pas être annulée.",
        "cancel": "Annuler",
        "confirm": "Confirmer la Réinitialisation",
        "resetSuccess": "Les données ont été réinitialisées avec succès",
        "resetError": "Erreur lors de la réinitialisation",
        "stats": {
          "totalDiamonds": "Total Diamants",
          "totalFollowers": "Total Abonnés",
          "activeCreators": "Créateurs Actifs",
          "totalCreatorsThisMonth": "Total Créateurs (Ce Mois)",
          "totalFollowersThisMonth": "Total Abonnés (Ce Mois)",
          "totalViewsThisMonth": "Total Vues (Ce Mois)",
          "totalDiamondsThisMonth": "Total Diamants (Ce Mois)",
          "lastMonth": "Mois Dernier",
          "totalDiamondsPerMonth": "Total Diamants par Mois"
        },
        "chart": {
          "actualDiamonds": "Diamants Réels",
          "targetDiamonds": "Diamants Cibles"
        },
        "modals": {
          "createCampaign": "Créer une Nouvelle Campagne",
          "createEvent": "Créer un Nouvel Événement",
          "createCreator": "Créer un Nouveau Créateur",
          "campaignName": "Nom de la Campagne",
          "description": "Description",
          "budget": "Budget",
          "assignCreators": "Assigner des Créateurs",
          "assignCreatorsHelper": "Entrez les noms des créateurs séparés par des virgules",
          "assignCreatorsPlaceholder": "ex: Emma Chen, Liam Wong, Sophia Kim",
          "startDate": "Date de Début",
          "endDate": "Date de Fin",
          "eventTitle": "Titre de l'Événement",
          "date": "Date",
          "time": "Heure",
          "location": "Lieu",
          "eventType": "Type d'Événement",
          "maxParticipants": "Participants Maximum",
          "maxParticipantsPlaceholder": "Laisser vide pour illimité",
          "username": "Nom d'Utilisateur",
          "tiktokId": "ID TikTok",
          "email": "Email",
          "phone": "Téléphone",
          "followersCount": "Nombre d'Abonnés",
          "contentCategory": "Catégorie de Contenu",
          "creatorTier": "Niveau du Créateur",
          "save": "Sauvegarder",
          "cancel": "Annuler"
        },
        "eventTypes": {
          "liveStream": "Diffusion en Direct",
          "workshop": "Atelier",
          "meetGreet": "Rencontre et Salutation",
          "training": "Formation",
          "contest": "Concours"
        },
        "tiers": {
          "bronze": "Bronze",
          "silver": "Argent",
          "gold": "Or",
                     "platinum": "Platine"
         },
         "chart": {
           "monthlyPerformance": "Performance Mensuelle",
           "currentMonth": "Mois Actuel",
           "monthlyTarget": "Objectif Mensuel",
           "growthRate": "Taux de Croissance",
           "lastMonth": "Mois Dernier",
           "month": "Mois"
         },
         "activity": {
           "recentActivity": "Activité Récente",
           "noRecentActivity": "Aucune activité récente à afficher."
         },
         "resetDialog": {
           "areYouSure": "Êtes-vous sûr de vouloir réinitialiser toutes les données de profil de vos créateurs ?",
           "dataWillBeReset": "Données qui seront réinitialisées :",
           "diamonds": "Diamants : 0",
           "followers": "Followers : 0",
           "validLiveDays": "Jours de live valides : 0",
           "liveDuration": "Durée de live : 0h 0m",
           "liveStreams": "Streams de live : 0",
           "matches": "Matches : 0",
           "otherMetrics": "Et toutes les autres métriques...",
           "thisActionWillAffect": "Cette action affectera {{count}} créateur(s)."
         },
         "creatorsBonusTable": {
           "title": "Bonus des Créateurs",
           "total": "Total",
           "searchPlaceholder": "Rechercher par nom, TikTok ID ou programme...",
           "noCreatorsFound": "Aucun créateur trouvé ou aucun créateur n'a de données de bonus disponibles.",
           "tableHeaders": {
             "creator": "Créateur",
             "diamonds": "Diamants",
             "days": "Jours",
             "hours": "Heures",
             "program": "Programme",
             "rate": "Taux",
             "bonus": "Bonus",
             "active": "Active",
             "actions": "Actions"
           },
           "pagination": {
             "rowsPerPage": "Lignes par page",
             "displayedRows": "{{from}}-{{to}} sur {{count}}"
           },
           "tooltips": {
             "activeTooltip": "Actif dans les 7 derniers jours",
             "inactiveTooltip": "Aucune heure valide dans les 7 derniers jours"
           },
           "actions": {
             "message": "Message",
             "sendMessage": "Envoyer un message à {{name}}",
             "cancel": "Annuler",
             "send": "Envoyer",
             "sending": "Envoi..."
           },
           "dialog": {
             "messageLabel": "Message",
             "messagePlaceholder": "Entrez votre message ici..."
           },
           "notifications": {
             "enterMessage": "Veuillez entrer un message",
             "messageSentSuccess": "Message envoyé avec succès !",
             "messageSentError": "Échec de l'envoi du message"
           }
         }
      },
      "wiki": {
        "knowledgeBase": "Base de Connaissances",
        "dashboardKnowledgeBase": "Base de Connaissances du Tableau de Bord",
        "everythingYouNeedToKnow": "Tout ce que vous devez savoir sur le travail avec notre agence et le succès sur TikTok",
        "searchArticles": "Rechercher des articles, guides et tutoriels...",
        "allContent": "Tout le Contenu",
        "agencyInfo": "Info Agence",
        "tiktokGuides": "Guides TikTok",
        "readFullArticle": "Lire l'Article Complet"
      },
      "pages": {
        "landing": {
          "title": "L'Avenir de DASHTRACER",
          "subtitle": "Exploitez l'analytique alimentée par l'IA, automatisez la gestion des créateurs et développez votre agence vers de nouveaux sommets avec la plateforme de gestion DASHTRACER la plus avancée.",
          "shopIntegration": "🚀 Maintenant avec Support pour l'Intégration DASHTRACER Shop",
          "getStarted": "Commencer",
          "learnMore": "En Savoir Plus"
        },
        "dashboard": {
          "title": "Tableau de Bord",
          "welcome": "Bon retour",
          "overview": "Aperçu",
          "analytics": "Analytique",
          "notifications": "Notifications"
        },
        "profile": {
          "title": "Profil",
          "personalInfo": "Informations Personnelles",
          "settings": "Paramètres",
          "edit": "Modifier le Profil",
          "save": "Sauvegarder les Modifications",
          "cancel": "Annuler"
        },
        "support": {
          "title": "Centre de Support",
          "description": "Besoin d'aide ? Créez un ticket de support et notre équipe vous assistera dans les plus brefs délais.",
          "createTicket": "Créer un Ticket de Support",
          "recentTickets": "Mes Tickets Récents",
          "noTickets": "Aucun ticket trouvé. Créez votre premier ticket ci-dessus."
        },
        "campaigns": {
          "title": "Gestion des Campagnes",
          "underDevelopment": "Cette page est en développement",
          "description": "La page de Gestion des Campagnes fournira un aperçu complet de toutes les campagnes de l'agence. Les administrateurs pourront créer, modifier et surveiller toutes les activités de campagne, avec des rapports détaillés et des métriques de performance."
        },
        "rules": {
          "title": "Gestion des Règles",
          "bonusRulesManagement": "Gestion des Règles de Bonus",
          "description": "Créer et gérer les règles de bonus pour les créateurs.",
          "underDevelopment": "Cette page est en développement",
          "fullDescription": "La page de Gestion des Règles permettra aux administrateurs de créer, modifier et supprimer les règles de bonus pour les créateurs. L'interface fournira une vue complète de toutes les règles, avec la possibilité de définir les conditions et les récompenses pour chaque règle."
        },
        "dataManagement": {
          "title": "Gestion des Données",
          "accessDenied": "Accès Refusé",
          "noPermission": "Vous n'avez pas la permission d'accéder à cette page.",
          "batchImportMode": "Mode d'Importation par Lot (Fichiers Multiples)",
          "uploadMultipleFiles": "Téléchargez plusieurs fichiers à la fois pour un traitement en lot",
          "uploadOneFile": "Téléchargez et traitez un fichier à la fois avec mappage des champs",
          "selectDataType": "Sélectionner le Type de Données",
          "requiredFields": "champs requis",
          "template": "Modèle",
          "uploadFiles": "Télécharger les Fichiers",
          "processBatch": "Traiter le Lot",
          "uploadFile": "Télécharger le Fichier",
          "mapFields": "Mapper les Champs",
          "reviewImport": "Réviser et Importer"
        },
                 "creators": {
           "title": "Créateurs",
           "management": "Gestion des Créateurs",
           "profile": "Profil du Créateur",
           "analytics": "Analytique du Créateur",
           "add": "Ajouter un Créateur",
           "edit": "Modifier le Créateur",
           "delete": "Supprimer le Créateur",
           "addNew": "Ajouter un Nouveau Créateur",
           "username": "Nom d'utilisateur",
           "category": "Catégorie",
           "manager": "Gestionnaire",
           "agency": "Agence",
           "actions": "Actions",
           "noCreatorsFound": "Aucun créateur trouvé",
           "loadingCreators": "Chargement des créateurs...",
           "retry": "Réessayer",
           "cancel": "Annuler",
           "addedSuccessfully": "Créateur {{name}} ajouté avec succès!",
           "validation": {
             "usernameRequired": "Le nom d'utilisateur est requis",
             "categoryRequired": "La catégorie est requise",
             "managerRequired": "Le gestionnaire est requis",
             "agencyRequired": "L'agence est requise"
           },
           "categories": {
             "lifestyle": "Style de vie",
             "comedy": "Comédie",
             "dance": "Danse",
             "beauty": "Beauté",
             "fitness": "Fitness",
             "food": "Cuisine",
             "gaming": "Jeux vidéo",
             "education": "Éducation"
           }
         },
        "admin": {
          "dashboard": {
            "title": "Tableau de Bord Admin",
            "welcome": "Bon retour, {{name}}! 🚀 Gérez votre vue d'ensemble de la plateforme",
            "totalCreators": "Total des Créateurs",
            "totalManagers": "Total des Gestionnaires",
            "platformHealth": "Santé de la Plateforme",
            "bonusRules": {
              "title": "💎 Gestion des Règles de Bonus",
              "description": "Configurer et gérer les programmes de bonus des créateurs",
              "addNewRule": "Ajouter une Nouvelle Règle",
              "program": "Programme",
              "validDays": "Jours Valides",
              "hoursRequired": "Heures Requises",
              "rate": "Taux",
              "actions": "Actions",
              "addRuleDialog": "Ajouter une Nouvelle Règle de Bonus",
              "programName": "Nom du Programme",
              "validDaysRequired": "Jours Valides Requis",
              "hoursRequiredField": "Heures Requises",
              "rateField": "Taux",
              "ruleUpdated": "Règle mise à jour avec succès!",
              "ruleDeleted": "Règle supprimée avec succès!",
              "ruleAdded": "Règle ajoutée avec succès!"
            },
            "managersCreators": {
              "title": "👥 Gestionnaires et Leurs Créateurs",
              "description": "Aperçu de tous les gestionnaires et de leurs créateurs assignés",
              "managerUsername": "Nom d'utilisateur du Gestionnaire",
              "email": "Email",
              "phone": "Téléphone",
              "creators": "Créateurs",
              "creatorUsername": "Nom d'utilisateur du Créateur",
              "liveDays": "Jours en Direct",
              "diamonds": "Diamants",
              "hours": "Heures",
              "bonus": "Bonus",
              "creatorsCount": "{{count}} créateurs",
              "managersPerPage": "Gestionnaires par page",
              "creatorsPerPage": "Créateurs par page"
            },
            "upload": {
              "title": "📊 Télécharger les Données des Créateurs",
              "description": "Importer les données des créateurs depuis des fichiers Excel (.xlsx, .xls)",
              "dragDrop": "Faites glisser et déposez un fichier Excel ici, ou cliquez pour sélectionner",
              "dropping": "📁 Déposez le fichier Excel ici...",
              "supportedFormats": "Formats supportés: .xlsx, .xls",
              "confirmUpload": "Confirmer le Téléchargement",
              "confirmMessage": "Êtes-vous sûr de vouloir télécharger ce fichier?",
              "fileDetails": "Détails du Fichier:",
              "fileName": "Nom: {{name}}",
              "fileSize": "Taille: {{size}} MB",
              "fileType": "Type: {{type}}",
              "upload": "Télécharger",
              "uploading": "Téléchargement en cours..."
            }
          }
        }
      },
      "forms": {
        "labels": {
          "email": "Adresse E-mail",
          "password": "Mot de Passe",
          "username": "Nom d'utilisateur",
          "firstName": "Prénom",
          "lastName": "Nom",
          "phone": "Numéro de Téléphone",
          "title": "Titre",
          "description": "Description",
          "category": "Catégorie",
          "priority": "Priorité",
          "status": "Statut"
        },
        "placeholders": {
          "enterEmail": "Entrez votre email",
          "enterPassword": "Entrez votre mot de passe",
          "enterUsername": "Entrez le nom d'utilisateur",
          "searchPlaceholder": "Rechercher..."
        },
        "buttons": {
          "submit": "Soumettre",
          "cancel": "Annuler",
          "save": "Sauvegarder",
          "edit": "Modifier",
          "delete": "Supprimer",
          "create": "Créer",
          "update": "Mettre à jour",
          "send": "Envoyer",
          "close": "Fermer",
          "back": "Retour",
          "next": "Suivant",
          "previous": "Précédent"
        }
      },
      "tickets": {
        "title": "Ticket",
        "create": "Créer un Ticket",
        "submit": "Envoyer le Ticket",
        "ticketTitle": "Titre du Ticket",
        "detailedDescription": "Description Détaillée",
        "categories": {
          "accountIssue": "Problème de Compte",
          "payment": "Paiement",
          "technical": "Technique",
          "content": "Contenu",
          "other": "Autre"
        },
        "priorities": {
          "low": "Faible",
          "medium": "Moyenne",
          "high": "Élevée",
          "urgent": "Urgente"
        },
        "statuses": {
          "open": "Ouvert",
          "inProgress": "En Cours",
          "resolved": "Résolu",
          "closed": "Fermé"
        }
      },
      "navigation": {
        "home": "Accueil",
        "dashboard": "Tableau de Bord",
        "profile": "Profil",
        "creators": "Créateurs",
        "events": "Événements",
        "wiki": "Wiki",
        "contact": "Contact",
        "support": "Support",
        "admin": "Administration",
        "management": "Gestion",
        "tickets": "Tickets",
        "campaigns": "Campagnes",
        "rules": "Règles",
        "analytics": "Analytique",
        "manageManagers": "Gérer les Gestionnaires",
        "dataManagement": "Gestion des Données"
      },
      "userRoles": {
        "administrator": "Administrateur",
        "manager": "Gestionnaire",
        "subManager": "Sous-Gestionnaire",
        "creator": "Créateur",
        "myCreators": "Mes Créateurs",
        "assignedCreators": "Créateurs Assignés",
        "allCreators": "Tous les Créateurs"
      },
              "events": {
          "title": "Événements de l'Agence",
          "description": "Voir tous les événements de vos gestionnaires d'agence",
          "calendar": "Calendrier",
          "list": "Liste",
          "searchEvents": "Rechercher des événements...",
          "sortByOldest": "Trier par le plus ancien",
          "sortByNewest": "Trier par le plus récent",
          "noEventsFound": "Aucun événement trouvé",
          "noEventsDescription": "Aucun événement n'a encore été créé par les gestionnaires de votre agence",
          "viewDetails": "Voir les Détails",
          "eventDetails": "Détails de l'Événement",
          "startTime": "Heure de Début",
          "endTime": "Heure de Fin",
          "location": "Lieu",
          "type": "Type",
          "general": "Général",
          "participants": "Participants",
          "participantsCount": "Participants ({{count}})",
          "close": "Fermer",
          "dayNames": {
            "sun": "Dim",
            "mon": "Lun",
            "tue": "Mar",
            "wed": "Mer",
            "thu": "Jeu",
            "fri": "Ven",
            "sat": "Sam"
          }
        },
        "contact": {
          "title": "Centre de Gestion d'Agence",
          "description": "Gérer les tickets de support et les événements de votre agence",
          "agencyManagement": "Gestion d'Agence",
          "supportTickets": "Tickets de Support",
          "agencySupportTickets": "Tickets de Support d'Agence",
          "refresh": "Actualiser",
          "searchTickets": "Rechercher des tickets...",
          "loadingTickets": "Chargement des tickets...",
          "noTicketsFound": "Aucun ticket trouvé",
          "tryChangeFilters": "Essayez de modifier votre recherche ou vos filtres",
          "selectTicketToChat": "Sélectionnez un ticket pour commencer à discuter",
          "chooseTicketDescription": "Choisissez un ticket de support dans la liste pour voir la conversation",
          "createNewTicket": "Créer un Nouveau Ticket de Support",
          "subject": "Sujet",
          "description": "Description",
          "category": "Catégorie",
          "priority": "Priorité",
          "createTicket": "Créer un Ticket",
          "cancel": "Annuler",
          "ticketCreatedSuccessfully": "Ticket créé avec succès!",
          "failedToCreateTicket": "Échec de la création du ticket",
          "failedToFetchTickets": "Échec du chargement des tickets",
          "failedToFetchEvents": "Échec du chargement des événements",
          "ticketStatusUpdated": "Statut du ticket mis à jour avec succès!",
          "failedToUpdateStatus": "Échec de la mise à jour du statut du ticket",
          "realTime": "Temps réel",
          "status": {
            "all": "Tous les Statuts",
            "open": "Ouvert",
            "inProgress": "En Cours",
            "resolved": "Résolu",
            "closed": "Fermé"
          },
          "categories": {
            "all": "Toutes les Catégories",
            "general": "Général",
            "generalInquiry": "Demande Générale",
            "matchPlanning": "Planification de Match",
            "bugReport": "Rapport de Bug",
            "banReport": "Rapport de Bannissement",
            "departureRequest": "Demande de Départ"
          },
          "priorities": {
            "low": "Faible",
            "medium": "Moyen",
            "high": "Élevé",
            "urgent": "Urgent"
          }
        },
      "status": {
        "loading": "Chargement...",
        "error": "Erreur",
        "success": "Succès",
        "warning": "Avertissement",
        "info": "Information",
        "notFound": "Non Trouvé",
        "unauthorized": "Non Autorisé",
        "forbidden": "Interdit"
      },
      "messages": {
        "welcome": "Bienvenue sur DASHTRACER",
        "loginSuccess": "Connexion réussie",
        "logoutSuccess": "Déconnexion réussie",
        "saveSuccess": "Sauvegardé avec succès",
        "deleteSuccess": "Supprimé avec succès",
        "updateSuccess": "Mis à jour avec succès",
        "createSuccess": "Créé avec succès",
        "errorOccurred": "Une erreur s'est produite",
        "noDataFound": "Aucune donnée trouvée",
        "confirmDelete": "Êtes-vous sûr de vouloir supprimer cet élément?",
        "unsavedChanges": "Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir partir?"
      },
      "creatorManagement": {
        "title": "Gestion des Créateurs",
        "allCreatorsManagement": "Gestion de Tous les Créateurs",
        "description": "Gérer et surveiller vos créateurs TikTok",
        "allCreatorsDescription": "Gérer et surveiller tous les créateurs TikTok de la plateforme",
        "addCreator": "Ajouter un Créateur",
        "editCreator": "Modifier le Créateur",
        "addNewCreator": "Ajouter un Nouveau Créateur",
        "updateCreator": "Mettre à Jour le Créateur",
        "deleteCreator": "Supprimer le Créateur",
        "confirmDeleteCreator": "Êtes-vous sûr de vouloir supprimer le créateur \"{{name}}\" ?",
        "searchPlaceholder": "Rechercher des créateurs par nom ou catégorie...",
        "searchPlaceholderAdmin": "Rechercher des créateurs par nom, catégorie ou manager...",
        "totalCreators": "Total des Créateurs",
        "noCreatorsFound": "Aucun créateur trouvé",
        "noCreatorsFoundDescription": "Essayez d'ajuster vos termes de recherche ou effacez la recherche pour voir tous les créateurs",
        "noCreatorsFoundEmpty": "Commencez par ajouter votre premier créateur à la plateforme",
        "addFirstCreator": "Ajouter Votre Premier Créateur",
        "loadingCreators": "Chargement des créateurs...",
        "loadingCreatorsDescription": "Veuillez patienter pendant que nous récupérons vos créateurs",
        "categories": {
          "Gaming": "Jeux",
          "Beauty": "Beauté",
          "Lifestyle": "Style de Vie",
          "Comedy": "Comédie",
          "Education": "Éducation",
          "Music": "Musique",
          "Dance": "Danse",
          "Food": "Nourriture",
          "General": "Général"
        },
        "fields": {
          "username": "Nom d'utilisateur",
          "tikTokId": "ID TikTok",
          "category": "Catégorie",
          "followers": "Abonnés",
          "diamonds": "Diamants",
          "liveDuration": "Durée Live",
          "validLiveDays": "Jours Live Valides",
          "matches": "Matchs",
          "status": "Statut",
          "manager": "Manager",
          "email": "E-mail",
          "phone": "Téléphone",
          "actions": "Actions"
        },
        "status": {
          "active": "Actif",
          "inactive": "Inactif",
          "suspended": "Suspendu"
        },
        "validation": {
          "usernameRequired": "Le nom d'utilisateur est requis",
          "tikTokIdRequired": "L'ID TikTok est requis",
          "categoryRequired": "La catégorie est requise",
          "followersRequired": "Le nombre d'abonnés est requis",
          "diamondsRequired": "Le nombre de diamants est requis"
        },
        "actions": {
          "retry": "Réessayer",
          "refresh": "Actualiser"
        }
      },
      "eventCalendar": {
        "title": "Calendrier des Événements",
        "loadingCalendar": "Chargement du calendrier...",
        "viewOnlyMode": "Mode lecture seule : Vous pouvez voir les événements créés par les managers",
        "noDescription": "Aucune description",
        "legend": {
          "tournament": "Tournoi",
          "challenge": "Défi", 
          "meeting": "Réunion",
          "match": "Match"
        },
        "stats": {
          "tournaments": "Tournois",
          "challenges": "Défis",
          "meetings": "Réunions",
          "matches": "Matchs"
        },
        "eventTypes": {
          "liveStream": "Diffusion en Direct",
          "workshop": "Atelier",
          "meetGreet": "Rencontre et Salutation",
          "training": "Entraînement",
          "contest": "Concours",
          "tournament": "Tournoi",
          "challenge": "Défi",
          "meeting": "Réunion",
          "match": "Match"
        }
      },
      "events": {
        "pageTitle": "Événements et Tournois",
        "pageSubtitle": "Rejoignez des tournois, défis et événements communautaires",
        "createEvent": "Créer Événement",
        "createFirstEvent": "Créer Premier Événement",
        "refresh": "Actualiser les événements",
        "calendar": "Calendrier",
        "list": "Liste",
        "close": "Fermer",
        "cancel": "Annuler",
        "joinTournament": "Rejoindre le tournoi",
        "joinChallenge": "Rejoindre le défi",
        "dateTime": "Date et Heure",
        "location": "Lieu",
        "prize": "Prix",
        "participants": "Participants",
        "status": "Statut",
        "types": {
          "tournament": "tournoi",
          "challenge": "défi",
          "meeting": "réunion",
          "match": "match",
          "liveStream": "diffusion en direct",
          "workshop": "atelier",
          "meetGreet": "rencontre et salutation",
          "training": "entraînement",
          "contest": "concours"
        },
        "statuses": {
          "scheduled": "programmé",
          "active": "actif",
          "completed": "terminé",
          "cancelled": "annulé"
        },
        "noEvents": "Aucun événement pour le moment",
        "noEventsDescription": "Créez votre premier événement pour commencer",
        "newEventAvailable": "Nouvel Événement Disponible",
        "newEventMessage": "Un nouvel événement a été créé par le manager. Vérifiez votre calendrier!",
        "failedToFetch": "Échec de récupération des événements. Veuillez réessayer plus tard.",
        "failedToCreate": "Échec de création ou mise à jour de l'événement. Veuillez réessayer.",
        "editEvent": "Modifier Événement",
        "createNewEvent": "Créer Nouvel Événement"
      },
      "contact": {
        "pageTitle": "Centre de Support",
        "pageSubtitle": "Obtenez de l'aide et gérez vos tickets de support",
        "dashboard": "Tableau de bord",
        "support": "Support",
        "contactManager": "Contacter le Manager",
        "newTicket": "Nouveau Ticket",
        "realTimeSupport": "Tickets de Support en Temps Réel",
        "searchTickets": "Rechercher des tickets...",
        "status": "Statut",
        "category": "Catégorie",
        "allStatuses": "Tous les Statuts",
        "allCategories": "Toutes les Catégories",
        "sortNewest": "Trier par plus ancien en premier",
        "sortOldest": "Trier par plus récent en premier",
        "noTicketsFound": "Aucun ticket trouvé",
        "noTicketsDescription": "Essayez de modifier votre recherche ou vos filtres",
        "selectTicket": "Sélectionnez un ticket pour commencer à discuter",
        "selectTicketDescription": "Choisissez un ticket de support dans la liste pour voir la conversation",
        "createTicketTitle": "Créer un Nouveau Ticket de Support",
        "subject": "Sujet",
        "description": "Description",
        "priority": "Priorité",
        "cancel": "Annuler",
        "createTicket": "Créer le Ticket",
        "contactManagerTitle": "Contacter Votre Manager",
        "contactManagerDescription": "Envoyer un message direct à votre manager :",
        "supportManager": "Manager de Support",
        "message": "Message",
        "messagePlaceholder": "Tapez votre message ici...",
        "sendMessage": "Envoyer le Message",
        "ticketStatusUpdated": "Statut du ticket mis à jour avec succès !",
        "ticketUpdateFailed": "Échec de la mise à jour du statut du ticket",
        "realTime": "Temps réel",
        "statuses": {
          "open": "Ouvert",
          "inProgress": "En Cours",
          "resolved": "Résolu",
          "closed": "Fermé"
        },
        "categories": {
          "general": "Demande Générale",
          "matchPlanning": "Planification de Match",
          "bugReport": "Rapport de Bug",
          "banReport": "Rapport de Bannissement",
          "departureRequest": "Demande de Départ"
        },
        "priorities": {
          "low": "Faible",
          "medium": "Moyen",
          "high": "Élevé",
          "urgent": "Urgent"
        }
      },
      "creatorDashboard": {
        "title": "Tableau de Bord Créateur",
        "welcome": "Bienvenue {{username}} ! Voici un aperçu de vos performances.",
        "reportIssue": "Signaler un Problème",
        "contactInformation": "📞 Informations de Contact",
        "creatorDetails": "Détails du Créateur",
        "agencySupport": "Support de l'Agence",
        "joined": "Rejoint",
        "manager": "Manager :",
        "createTicketTitle": "Créer un Nouveau Ticket de Support",
        "subject": "Sujet",
        "description": "Description",
        "category": "Catégorie",
        "priority": "Priorité",
        "cancel": "Annuler",
        "submitting": "En cours d'envoi...",
        "createTicket": "Créer le Ticket",
        "creatorDataNotFound": "Données du créateur non trouvées",
        "ticketCreatedSuccess": "Ticket créé avec succès !",
        "ticketCreatedFailed": "Échec de la création du ticket.",
        "subjectDescriptionRequired": "Le sujet et la description sont requis.",
        "categories": {
          "general": "Général",
          "matchPlanning": "Planification de Match",
          "bugReport": "Rapport de Bug",
          "banReport": "Rapport de Bannissement",
          "departureRequest": "Demande de Départ"
        },
        "priorities": {
          "low": "Faible",
          "medium": "Moyen",
          "high": "Élevé",
          "urgent": "Urgent"
        }
      },
      "bonusRules": {
        "title": "Programme de Bonus Agence",
        "description": "Les règles du programme de bonus sont basées sur le nombre de jours valides et d'heures de diffusion.",
        "loading": "Chargement des règles de bonus...",
        "program": "Programme",
        "validDays": "Jours Valides",
        "hours": "Heures",
        "rate": "Taux",
        "calculationFormula": "Formule de Calcul",
        "formulaDescription": "Le bonus est calculé selon la formule : <strong>Taux applicable × Nombre de diamants = Montant bonus en dollars</strong>",
        "example": "<strong>Exemple :</strong> Un créateur avec 1M de diamants et un taux de 0.03% = 300$ de bonus"
      },
      "creatorBonusCard": {
        "title": "Programme de Bonus",
        "subtitle": "Vos performances et récompenses",
        "noDataAvailable": "Aucune information de bonus disponible",
        "diamond": "Diamant",
        "validDay": "Valide day",
        "hours": "Hours",
        "rate": "Taux",
        "currentBonus": "Bonus Actuel"
      },
      "landingPage": {
        "hero": {
          "chip": "🚀 Maintenant avec l'Intégration DASHTRACER Shop",
          "title": "L'Avenir de",
          "titleHighlight": "DASHTRACER",
          "subtitle": "Exploitez l'analytique IA, automatisez la gestion des créateurs et faites évoluer votre agence vers de nouveaux sommets avec la plateforme de gestion DASHTRACER la plus avancée.",
          "startFreeTrial": "Commencer l'Essai Gratuit",
          "goToDashboard": "Aller au Tableau de Bord",
          "watchDemo": "Voir la Démo",
          "languageSelector": "Sélectionner la Langue"
        },
        "stats": {
          "activeCreators": "Créateurs Actifs",
          "contentViews": "Vues de Contenu",
          "revenueGenerated": "Revenus Générés",
          "uptime": "Temps de Fonctionnement"
        },
        "features": {
          "title": "Fonctionnalités Puissantes pour les Agences Modernes",
          "subtitle": "Tout ce dont vous avez besoin pour gérer, développer et optimiser votre agence de créateurs DASHTRACER",
          "aiAnalytics": {
            "title": "Analytique IA",
            "description": "Algorithmes d'apprentissage automatique avancés pour prédire les performances du contenu et optimiser votre stratégie en temps réel."
          },
          "creatorEcosystem": {
            "title": "Écosystème de Créateurs",
            "description": "Connectez-vous avec les créateurs DASHTRACER de premier plan dans le monde entier et gérez les collaborations sans effort."
          },
          "growthAcceleration": {
            "title": "Accélération de Croissance",
            "description": "Boostez la croissance de votre agence avec nos stratégies éprouvées et nos outils automatisés."
          },
          "enterpriseSecurity": {
            "title": "Sécurité Entreprise",
            "description": "Sécurité de niveau bancaire avec chiffrement de bout en bout pour protéger vos données précieuses et relations créateurs."
          },
          "campaignAutomation": {
            "title": "Automatisation de Campagnes",
            "description": "Automatisez l'ensemble du cycle de vie de vos campagnes, de la planification à l'exécution et au suivi des performances."
          },
          "lightningFast": {
            "title": "Ultra Rapide",
            "description": "Expérimentez des performances ultra-rapides avec notre infrastructure optimisée et le traitement de données en temps réel."
          }
        },
        "cta": {
          "title": "Prêt à Transformer Votre Agence ?",
          "subtitle": "Rejoignez des milliers de créateurs et d'agences qui utilisent déjà DASHTRACER avec succès",
          "startYourFreeTrial": "Commencez Votre Essai Gratuit"
        },
        "dashboardPreview": "Aperçu du Tableau de Bord DASHTRACER"
      },
      "loginPage": {
        "title": "DASHTRACER",
        "subtitle": "Plateforme de Gestion de Créateurs",
        "tagline": "Autonomiser les créateurs, rationaliser le succès",
        "welcomeBack": "Bon Retour",
        "signInMessage": "Connectez-vous à votre compte pour continuer",
        "continueWithTikTok": "Continuer avec TikTok",
        "or": "OU",
        "emailLabel": "Adresse E-mail / ID TikTok",
        "passwordLabel": "Mot de Passe",
        "signingIn": "Connexion...",
        "signIn": "Se Connecter",
        "needHelp": "Besoin d'aide ? Contactez votre administrateur d'équipe",
        "languageSelector": "Sélectionner la Langue",
        "features": {
          "analytics": {
            "title": "Analyses",
            "description": "Suivi des performances en temps réel"
          },
          "teamManagement": {
            "title": "Gestion d'Équipe",
            "description": "Collaborer avec les créateurs"
          },
          "contentPlanning": {
            "title": "Planification de Contenu",
            "description": "Planifier et organiser le contenu"
          }
        },
        "errors": {
          "fillAllFields": "Veuillez remplir tous les champs",
          "invalidCredentials": "Identifiants invalides"
        }
      },
      "creatorProfile": {
        "title": "Profil Créateur",
        "editProfile": "Modifier le Profil",
        "saving": "Enregistrement...",
        "save": "Enregistrer",
        "cancel": "Annuler",
        "notFound": "Non Trouvé !",
        "contractDetails": "Détails du Contrat",
        "paymentInformation": "Informations de Paiement",
        "editProfileInformation": "Modifier les Informations du Profil",
        "changePassword": "Changer le Mot de Passe",
        "fields": {
          "id": "ID",
          "displayName": "Nom d'Affichage",
          "username": "Nom d'Utilisateur",
          "email": "E-mail",
          "phone": "Téléphone",
          "tikTokId": "ID TikTok",
          "category": "Catégorie",
          "bio": "Biographie",
          "joined": "Rejoint",
          "following": "Abonnements",
          "videos": "Vidéos",
          "followers": "Abonnés",
          "likes": "J'aime",
          "views": "Vues",
          "contractStart": "Début du Contrat",
          "duration": "Durée",
          "daysWithAgency": "Jours avec l'Agence",
          "diamondsCollected": "Diamants Collectés",
          "ribBankAccount": "RIB (Compte Bancaire)",
          "paypalAccount": "Compte PayPal",
          "currentPassword": "Mot de Passe Actuel",
          "newPassword": "Nouveau Mot de Passe",
          "confirmNewPassword": "Confirmer le Nouveau Mot de Passe"
        },
        "categories": {
          "lifestyle": "Style de Vie",
          "fashion": "Mode",
          "beauty": "Beauté",
          "fitness": "Fitness",
          "food": "Cuisine",
          "travel": "Voyage",
          "tech": "Technologie",
          "gaming": "Jeux",
          "music": "Musique",
          "dance": "Danse",
          "comedy": "Comédie",
          "education": "Éducation",
          "business": "Business",
          "health": "Santé",
          "parenting": "Parentalité",
          "pets": "Animaux",
          "sports": "Sports",
          "art": "Art",
          "diy": "Bricolage",
          "automotive": "Automobile",
          "finance": "Finance",
          "other": "Autre"
        },
        "placeholders": {
          "enterBankAccount": "Entrez les détails du compte bancaire"
        },
        "helperTexts": {
          "note": "Note",
          "tikTokIdNotEditable": "L'ID TikTok ne peut pas être modifié pour des raisons de sécurité",
          "contactManagerForTikTokId": "Contactez votre manager si vous devez mettre à jour votre ID TikTok",
          "leavePasswordFieldsEmpty": "Laissez les champs de mot de passe vides si vous ne voulez pas changer votre mot de passe",
          "onlyEditOwnProfile": "Vous ne pouvez modifier que votre propre profil"
        },
        "errors": {
          "currentPasswordRequired": "Le mot de passe actuel est requis pour changer le mot de passe",
          "newPasswordRequired": "Un nouveau mot de passe est requis",
          "newPasswordTooShort": "Le nouveau mot de passe doit contenir au moins 6 caractères",
          "passwordsDoNotMatch": "Les nouveaux mots de passe ne correspondent pas",
          "failedToUpdate": "Échec de la mise à jour du profil"
        },
        "success": {
          "profileUpdated": "Profil mis à jour avec succès !"
        },
        "daysUnit": "{{count}} jours",
        "unknownUser": "Utilisateur Inconnu"
      },
      "wikiPage": {
        "dashboard": "Tableau de Bord",
        "knowledgeBase": "Base de Connaissances",
        "title": "Base de Connaissances du Tableau de Bord",
        "subtitle": "Tout ce que vous devez savoir sur le travail avec notre agence et le succès sur TikTok",
        "searchPlaceholder": "Rechercher des articles, guides et tutoriels...",
        "tabs": {
          "allContent": "Tout le Contenu",
          "agencyInfo": "Info Agence",
          "tiktokGuides": "Guides TikTok"
        },
        "categories": "Catégories",
        "searchResults": "{{count}} résultat{{plural}} trouvé{{plural}} pour \"{{term}}\"",
        "readFullArticle": "Lire l'Article Complet",
        "noArticlesFound": "Aucun article trouvé",
        "noArticlesFoundDescription": "Essayez d'ajuster vos termes de recherche ou parcourez différentes catégories.",
        "noArticlesInCategory": "Aucun article disponible dans cette catégorie pour le moment.",
        "clearSearch": "Effacer la Recherche",
        "agencyCategories": {
          "gettingStarted": {
            "title": "Commencer",
            "description": "Apprenez-en plus sur notre agence, comment nous travaillons et ce que nous offrons aux créateurs."
          },
          "revenue": {
            "title": "Revenus et Paiements",
            "description": "Comprenez comment les paiements fonctionnent, notre système de bonus et le partage des revenus."
          },
          "campaigns": {
            "title": "Campagnes de Marque",
            "description": "Comment participer aux campagnes de marque et maximiser vos gains."
          },
          "policies": {
            "title": "Politiques de l'Agence",
            "description": "Politiques et directives importantes que tous les créateurs doivent suivre."
          }
        },
        "tiktokCategories": {
          "tiktokBasics": {
            "title": "Bases TikTok",
            "description": "Informations essentielles sur les fonctionnalités et fonctionnalités de TikTok."
          },
          "contentStrategy": {
            "title": "Stratégie de Contenu",
            "description": "Meilleures pratiques pour créer du contenu engageant qui fonctionne bien."
          },
          "liveStreaming": {
            "title": "Diffusion en Direct",
            "description": "Conseils et astuces pour des diffusions en direct TikTok réussies et gagner des diamants."
          },
          "tiktokLiveWiki": {
            "title": "Wiki TikTok LIVE pour Créateurs",
            "description": "Guide complet de la diffusion TikTok LIVE, éligibilité, règles, monétisation et plus."
          },
          "tiktokAlgorithm": {
            "title": "Algorithme et Tendances",
            "description": "Comprendre comment fonctionne l'algorithme TikTok et rester au top des tendances."
          }
        },
        "articles": {
          "tiktokLiveEligibility": {
            "title": "Exigences d'Éligibilité pour TikTok LIVE",
            "summary": "Apprenez les exigences d'âge et de followers pour qualifier pour la diffusion TikTok LIVE.",
            "content": "<h2>Exigences d'Éligibilité pour un TikTok LIVE</h2><h3>Comment devenir éligible pour aller en LIVE sur TikTok ?</h3><h4>Comment Faire :</h4><ul><li><strong>Avoir 18 ans :</strong> Assurez-vous d'avoir au moins 18 ans. C'est l'âge minimum pour commencer un LIVE.</li><li><strong>Atteindre 1 000 followers :</strong> Obtenez au moins 1 000 followers sur votre compte. C'est le seuil général pour débloquer la fonctionnalité LIVE.</li><li><strong>Être 18+ pour les Cadeaux :</strong> Si vous voulez envoyer ou recevoir des Cadeaux pendant un LIVE, vous devez avoir 18 ans ou plus (ou 19 en Corée du Sud).</li></ul><h4>Ce Qu'il Ne Faut Pas Faire :</h4><ul><li><strong>N'essayez pas de contourner les restrictions d'âge :</strong> Toute tentative de falsifier votre âge sera détectée et pourrait entraîner une suspension de compte.</li><li><strong>Ne vous attendez pas à aller en LIVE sans assez de followers :</strong> La fonctionnalité LIVE ne sera pas active si vous n'avez pas atteint le nombre de followers requis.</li></ul>"
          },
          "tiktokLiveContentRules": {
            "title": "Contenu TikTok LIVE : Règles à Suivre",
            "summary": "Directives et règles pour créer du contenu TikTok LIVE conforme et éviter les pénalités.",
            "content": "<h2>Contenu TikTok LIVE : Règles à Suivre (et à Éviter)</h2><h3>Comment créer du contenu qui respecte les directives de TikTok et éviter les pénalités ?</h3><h4>Comment Faire :</h4><ul><li><strong>Être authentique et en direct :</strong> Montrez-vous en direct, interagissez et assurez votre présence visible à l'écran.</li><li><strong>Respecter les droits d'auteur :</strong> N'utilisez que du contenu (musique, images) pour lequel vous avez les droits.</li><li><strong>Maintenir un comportement positif :</strong> Utilisez un langage respectueux et une conduite appropriée.</li></ul><h4>Ce Qu'il Ne Faut Pas Faire :</h4><ul><li><strong>Ne diffusez pas de contenu pré-enregistré :</strong> Les LIVEs doivent être des diffusions en temps réel.</li><li><strong>N'utilisez pas d'écrans vides ou statiques :</strong> Évitez les écrans noirs, les images fixes ou les codes QR sans interaction.</li><li><strong>Ne soyez pas absent trop longtemps :</strong> Restez présent et engagé avec votre audience.</li><li><strong>Ne redirigez pas hors de TikTok :</strong> Évitez d'afficher des liens ou des informations qui poussent les utilisateurs vers d'autres plateformes.</li><li><strong>Ne violez pas les règles de contenu sensible :</strong> Interdiction stricte de nudité, actes sexuels, violence, harcèlement, discours de haine, désinformation ou promotion de produits réglementés (alcool, drogues, armes, etc.).</li></ul>"
          },
          "tiktokLiveMonetization": {
            "title": "Monétiser Votre TikTok LIVE : Comment Ça Marche",
            "summary": "Apprenez comment les Cadeaux LIVE peuvent devenir une source de revenus et maximiser vos gains.",
            "content": "<h2>Monétiser Votre TikTok LIVE : Comment Ça Marche</h2><h3>Comment les Cadeaux LIVE peuvent-ils devenir une source de revenus ?</h3><h4>Comment Faire :</h4><ul><li><strong>Encourager les Cadeaux :</strong> Engagez votre audience et créez du contenu de qualité pour encourager les spectateurs à vous envoyer des cadeaux.</li><li><strong>Remercier les donateurs :</strong> Exprimez votre gratitude en direct aux personnes qui vous offrent des cadeaux.</li><li><strong>Créer du contenu de valeur :</strong> Plus votre LIVE est intéressant et divertissant, plus vous avez de chances de recevoir des cadeaux.</li></ul><h4>Ce Qu'il Ne Faut Pas Faire :</h4><ul><li><strong>Ne forcez pas les donations :</strong> Évitez les demandes agressives ou répétitives de cadeaux.</li><li><strong>Ne violez pas les règles de monétisation :</strong> Toute violation des directives rendra votre LIVE inéligible à la monétisation.</li><li><strong>Ne produisez pas de contenu de faible qualité :</strong> Les LIVEs inauthentiques ou de faible qualité ne seront pas monétisés.</li></ul><h2>Explorer d'Autres Avenues de Monétisation sur TikTok LIVE</h2><h3>Comment diversifier vos revenus au-delà des Cadeaux LIVE ?</h3><h4>Comment Faire :</h4><ul><li><strong>Utiliser TikTok Shop en LIVE :</strong> Si vous vendez des produits, intégrez TikTok Shop dans votre LIVE pour des démonstrations en direct et des ventes directes.</li><li><strong>Rechercher des partenariats de marque :</strong> Collaborez avec des marques pour des LIVEs sponsorisés ou des placements de produits.</li><li><strong>S'engager dans le marketing d'affiliation :</strong> Faites la promotion des produits d'autres marques en utilisant un lien unique pour gagner une commission sur les ventes.</li><li><strong>Utiliser le Programme de Récompenses Créateur :</strong> Créez des vidéos de plus d'une minute pour potentiellement générer des revenus basés sur les vues et l'engagement.</li><li><strong>Offrir des Abonnements LIVE :</strong> Fournissez du contenu exclusif à vos fans les plus fidèles via un abonnement payant.</li></ul><h4>Ce Qu'il Ne Faut Pas Faire :</h4><ul><li><strong>Ne vous en tenez pas à une seule source de revenus :</strong> Explorez et diversifiez vos options de monétisation.</li><li><strong>Ne faites pas la promotion de produits non pertinents :</strong> Assurez-vous que les produits correspondent à votre niche et à l'intérêt de votre audience.</li><li><strong>Ne violez pas les règles de transparence :</strong> Divulguez toujours le contenu sponsorisé ou d'affiliation.</li></ul>"
          },
          "tiktokLiveBestPractices": {
            "title": "TikTok LIVE : Meilleures Pratiques pour le Succès",
            "summary": "Conseils et stratégies essentiels pour rendre vos diffusions TikTok LIVE plus engageantes et réussies.",
            "content": "<h2>TikTok LIVE : Meilleures Pratiques pour le Succès</h2><h3>Comment maximiser l'engagement et le succès pendant vos diffusions LIVE ?</h3><h4>Avant de Passer en LIVE :</h4><ul><li><strong>Planifiez votre contenu :</strong> Ayez une idée approximative de ce dont vous voulez parler ou faire pendant votre diffusion.</li><li><strong>Annoncez votre LIVE à l'avance :</strong> Utilisez des publications régulières pour informer vos followers de quand vous passerez en LIVE.</li><li><strong>Choisissez le timing optimal :</strong> Diffusez quand votre audience est la plus active (vérifiez vos analyses).</li><li><strong>Préparez votre configuration :</strong> Assurez-vous d'avoir un bon éclairage, un audio clair et une connexion internet stable.</li></ul><h4>Pendant Votre LIVE :</h4><ul><li><strong>Saluez les spectateurs par leur nom :</strong> Accueillez les personnes qui rejoignent pour créer une connexion personnelle.</li><li><strong>Lisez et répondez aux commentaires :</strong> L'engagement actif maintient l'intérêt des spectateurs et encourage la participation.</li><li><strong>Gardez l'énergie haute :</strong> Soyez enthousiaste et maintenez une attitude positive tout au long de la diffusion.</li><li><strong>Utilisez les fonctionnalités interactives :</strong> Les sondages, Q&R et défis peuvent augmenter l'engagement.</li><li><strong>Collaborez avec d'autres créateurs :</strong> Les LIVEs multi-utilisateurs peuvent étendre votre portée.</li></ul><h4>Ce Qu'il Ne Faut Pas Faire :</h4><ul><li><strong>N'ignorez pas votre audience :</strong> Ne pas interagir avec les spectateurs les fera partir.</li><li><strong>N'ayez pas de longues périodes de silence :</strong> Continuez à parler même quand il y a peu de spectateurs.</li><li><strong>Ne terminez pas brusquement :</strong> Prévenez les spectateurs avant de terminer votre diffusion et remerciez-les d'avoir regardé.</li><li><strong>Ne faites pas trop de multitâches :</strong> Restez concentré sur votre audience plutôt que de faire d'autres activités.</li></ul><h4>Après le LIVE :</h4><ul><li><strong>Sauvegardez les moments forts :</strong> Créez de courts clips de votre LIVE à publier en tant que contenu régulier.</li><li><strong>Remerciez votre audience :</strong> Publiez un suivi remerciant les spectateurs et les donateurs de cadeaux.</li><li><strong>Analysez les performances :</strong> Examinez vos analyses LIVE pour améliorer les futures diffusions.</li></ul>"
          },
          "agencyRevenueSharing": {
            "title": "Comprendre le Partage des Revenus",
            "summary": "Apprenez comment fonctionne notre modèle de partage des revenus et comment maximiser vos gains.",
            "content": "<h2>Comprendre le Partage des Revenus</h2><p>Notre agence fonctionne sur un modèle de partage des revenus transparent conçu pour récompenser équitablement les créateurs tout en soutenant les opérations et les initiatives de croissance de l'agence.</p><h3>Répartition des Revenus :</h3><ul><li><strong>Part du Créateur : 70%</strong> - La majorité vous revient directement</li><li><strong>Support Agence : 20%</strong> - Couvre la gestion, le marketing et le support technique</li><li><strong>Frais de Plateforme : 10%</strong> - Frais de traitement de plateforme standard de l'industrie</li></ul><h3>Comment Fonctionnent les Paiements :</h3><p>Les paiements sont traités mensuellement, avec les gains du mois précédent versés avant le 15 du mois courant. Tous les paiements sont suivis de manière transparente dans votre tableau de bord créateur.</p>"
          },
          "brandCampaignParticipation": {
            "title": "Comment Participer aux Campagnes de Marque",
            "summary": "Guide étape par étape pour rejoindre et réussir dans les campagnes de partenariat de marque.",
            "content": "<h2>Comment Participer aux Campagnes de Marque</h2><p>Les campagnes de marque sont l'une des opportunités les plus lucratives pour les créateurs de notre agence. Voici comment s'impliquer et réussir.</p><h3>Être Sélectionné pour les Campagnes :</h3><ul><li>Maintenir un contenu cohérent et de haute qualité</li><li>Garder des taux d'engagement d'audience élevés</li><li>Suivre toutes les directives et politiques de l'agence</li><li>Répondre rapidement aux invitations de campagne</li></ul><h3>Exigences de Campagne :</h3><ul><li>Respecter les nombres minimum de followers (varie selon la campagne)</li><li>Démontrer l'alignement de la marque avec votre contenu</li><li>S'engager à respecter les délais de livraison</li><li>Maintenir une communication professionnelle</li></ul>"
          }
        }
      }
    }
  },
  ar: {
    translation: {
      "app": {
        "name": "DASHTRACER",
        "tagline": "منصة إدارة المبدعين",
        "description": "تمكين المبدعين، تبسيط النجاح"
      },
      "auth": {
        "welcomeBack": "مرحباً بعودتك",
        "signInDescription": "سجل الدخول إلى حسابك للمتابعة",
        "continueWithTikTok": "المتابعة مع TikTok",
        "or": "أو",
        "emailOrTikTokId": "عنوان البريد الإلكتروني / معرف TikTok",
        "password": "كلمة المرور",
        "signingIn": "جاري تسجيل الدخول...",
        "login": "تسجيل الدخول",
        "needHelp": "تحتاج مساعدة؟ اتصل بمدير فريقك",
        "fillAllFields": "يرجى ملء جميع الحقول",
        "invalidCredentials": "بيانات اعتماد غير صحيحة",
        "logout": "تسجيل الخروج"
      },
      "common": {
        "dashboard": "لوحة التحكم",
        "knowledgeBase": "قاعدة المعرفة",
        "lightMode": "الوضع الفاتح",
        "darkMode": "الوضع المظلم",
        "toggleTheme": "تبديل المظهر",
        "language": "اللغة",
        "changeLanguage": "تغيير اللغة",
        "user": "المستخدم",
        "logout": "تسجيل الخروج",
        "home": "الرئيسية",
        "management": "الإدارة",
        "administration": "الإدارة"
      },
      "notifications": {
        "title": "الإشعارات",
        "markAllAsRead": "تحديد الكل كمقروء",
        "clearAll": "مسح الكل",
        "noNotifications": "لا توجد إشعارات حتى الآن",
        "justNow": "الآن",
        "timeAgo": {
          "about": "حوالي {{time}}",
          "over": "أكثر من {{time}}",
          "almost": "تقريبا {{time}}",
          "lessThan": "أقل من {{time}}"
        }
      },
      "ticketNotifications": {
        "title": "إشعارات التذاكر",
        "noUnreadNotifications": "لا توجد إشعارات غير مقروءة",
        "noSubject": "لا يوجد موضوع",
        "justNow": "الآن",
        "minutesAgo": "منذ {{count}}د",
        "hoursAgo": "منذ {{count}}س",
        "daysAgo": "منذ {{count}}ي",
        "viewMoreNotifications": "عرض {{count}} إشعارات أخرى",
        "viewAllTickets": "عرض جميع تذاكر الدعم",
        "priority": {
          "high": "عالية",
          "medium": "متوسطة",
          "low": "منخفضة"
        }
      },
      "profile": {
        "title": "ملفي الشخصي",
        "settings": "إعدادات الملف الشخصي",
        "personalInfo": "المعلومات الشخصية",
        "changePassword": "تغيير كلمة المرور",
        "editProfile": "تعديل الملف الشخصي",
        "saveChanges": "حفظ التغييرات",
        "saving": "جاري الحفظ...",
        "cancel": "إلغاء",
        "firstName": "الاسم الأول",
        "lastName": "اسم العائلة",
        "username": "اسم المستخدم",
        "email": "عنوان البريد الإلكتروني",
        "phone": "رقم الهاتف",
        "currentPassword": "كلمة المرور الحالية",
        "newPassword": "كلمة المرور الجديدة",
        "confirmPassword": "تأكيد كلمة المرور الجديدة",
        "roles": {
          "admin": "مدير",
          "manager": "مدير",
          "sub_manager": "مدير فرعي",
          "creator": "منشئ محتوى"
        },
        "messages": {
          "updateSuccess": "تم تحديث الملف الشخصي بنجاح!",
          "updateError": "فشل في تحديث الملف الشخصي",
          "emailUsernameRequired": "البريد الإلكتروني واسم المستخدم مطلوبان",
          "invalidEmail": "يرجى إدخال عنوان بريد إلكتروني صحيح",
          "currentPasswordRequired": "كلمة المرور الحالية مطلوبة لتغيير كلمة المرور",
          "newPasswordRequired": "كلمة المرور الجديدة مطلوبة",
          "passwordTooShort": "يجب أن تحتوي كلمة المرور الجديدة على 6 أحرف على الأقل",
          "passwordsNotMatch": "كلمات المرور الجديدة غير متطابقة"
        },
        "passwordNote": "اترك حقول كلمة المرور فارغة إذا كنت لا تريد تغيير كلمة المرور."
      },
      "header": {
        "profileSettings": "إعدادات الملف الشخصي",
        "managerDashboard": "لوحة تحكم المدير",
        "logout": "تسجيل الخروج",
        "viewAllCreators": "عرض جميع المنشئين",
        "addCreator": "إضافة منشئ",
        "activeCreators": "منشئين نشطين"
      },
      "managerDashboard": {
        "title": "لوحة تحكم المدير",
        "refresh": "إعادة تعيين البيانات",
        "confirmReset": "هل أنت متأكد من أنك تريد إعادة تعيين جميع بيانات المنشئين؟",
        "resetWarning": "هذا الإجراء سيعيد تعيين جميع إحصائيات وبيانات المنشئين. لا يمكن التراجع عن هذا الإجراء.",
        "cancel": "إلغاء",
        "confirm": "تأكيد إعادة التعيين",
        "resetSuccess": "تم إعادة تعيين البيانات بنجاح",
        "resetError": "حدث خطأ أثناء إعادة التعيين",
        "stats": {
          "totalDiamonds": "إجمالي الماس",
          "totalFollowers": "إجمالي المتابعين",
          "activeCreators": "المنشئين النشطين",
          "totalCreatorsThisMonth": "إجمالي المنشئين (هذا الشهر)",
          "totalFollowersThisMonth": "إجمالي المتابعين (هذا الشهر)",
          "totalViewsThisMonth": "إجمالي المشاهدات (هذا الشهر)",
          "totalDiamondsThisMonth": "إجمالي الماس (هذا الشهر)",
          "lastMonth": "الشهر الماضي",
          "totalDiamondsPerMonth": "إجمالي الماس شهرياً"
        },
        "chart": {
          "actualDiamonds": "الماس الفعلي",
          "targetDiamonds": "الماس المستهدف"
        },
        "modals": {
          "createCampaign": "إنشاء حملة جديدة",
          "createEvent": "إنشاء حدث جديد",
          "createCreator": "إنشاء منشئ جديد",
          "campaignName": "اسم الحملة",
          "description": "الوصف",
          "budget": "الميزانية",
          "assignCreators": "تعيين المنشئين",
          "assignCreatorsHelper": "أدخل أسماء المنشئين مفصولة بفواصل",
          "assignCreatorsPlaceholder": "مثلاً: Emma Chen, Liam Wong, Sophia Kim",
          "startDate": "تاريخ البداية",
          "endDate": "تاريخ النهاية",
          "eventTitle": "عنوان الحدث",
          "date": "التاريخ",
          "time": "الوقت",
          "location": "الموقع",
          "eventType": "نوع الحدث",
          "maxParticipants": "الحد الأقصى للمشاركين",
          "maxParticipantsPlaceholder": "اتركه فارغاً لعدد غير محدود",
          "username": "اسم المستخدم",
          "tiktokId": "معرف TikTok",
          "email": "البريد الإلكتروني",
          "phone": "الهاتف",
          "followersCount": "عدد المتابعين",
          "contentCategory": "فئة المحتوى",
          "creatorTier": "مستوى المنشئ",
          "save": "حفظ",
          "cancel": "إلغاء"
        },
        "eventTypes": {
          "liveStream": "بث مباشر",
          "workshop": "ورشة عمل",
          "meetGreet": "لقاء وترحيب",
          "training": "تدريب",
          "contest": "مسابقة"
        },
        "tiers": {
          "bronze": "برونزي",
          "silver": "فضي",
          "gold": "ذهبي",
                     "platinum": "بلاتيني"
         },
         "chart": {
           "monthlyPerformance": "الأداء الشهري",
           "currentMonth": "الشهر الحالي",
           "monthlyTarget": "الهدف الشهري",
           "growthRate": "معدل النمو",
           "lastMonth": "الشهر الماضي",
           "month": "الشهر"
         },
         "activity": {
           "recentActivity": "النشاط الأخير",
           "noRecentActivity": "لا يوجد نشاط حديث للعرض."
         },
         "resetDialog": {
           "areYouSure": "هل أنت متأكد من أنك تريد إعادة تعيين جميع بيانات ملف تعريف المبدعين الخاصين بك؟",
           "dataWillBeReset": "البيانات التي سيتم إعادة تعيينها:",
           "diamonds": "الماس: 0",
           "followers": "المتابعون: 0",
           "validLiveDays": "أيام البث المباشر الصالحة: 0",
           "liveDuration": "مدة البث المباشر: 0س 0د",
           "liveStreams": "بث مباشر: 0",
           "matches": "المباريات: 0",
           "otherMetrics": "وجميع المقاييس الأخرى...",
           "thisActionWillAffect": "هذا الإجراء سيؤثر على {{count}} مبدع (مبدعين)."
         },
         "creatorsBonusTable": {
           "title": "مكافآت المبدعين",
           "total": "الإجمالي",
           "searchPlaceholder": "البحث بالاسم أو معرف TikTok أو البرنامج...",
           "noCreatorsFound": "لم يتم العثور على مبدعين أو لا يوجد لدى المبدعين بيانات مكافآت متاحة.",
           "tableHeaders": {
             "creator": "المبدع",
             "diamonds": "الماس",
             "days": "الأيام",
             "hours": "الساعات",
             "program": "البرنامج",
             "rate": "المعدل",
             "bonus": "المكافأة",
             "active": "نشط",
             "actions": "الإجراءات"
           },
           "pagination": {
             "rowsPerPage": "الصفوف لكل صفحة",
             "displayedRows": "{{from}}-{{to}} من {{count}}"
           },
           "tooltips": {
             "activeTooltip": "نشط في آخر 7 أيام",
             "inactiveTooltip": "لا توجد ساعات صالحة في آخر 7 أيام"
           },
           "actions": {
             "message": "رسالة",
             "sendMessage": "إرسال رسالة إلى {{name}}",
             "cancel": "إلغاء",
             "send": "إرسال",
             "sending": "جاري الإرسال..."
           },
           "dialog": {
             "messageLabel": "الرسالة",
             "messagePlaceholder": "أدخل رسالتك هنا..."
           },
           "notifications": {
             "enterMessage": "يرجى إدخال رسالة",
             "messageSentSuccess": "تم إرسال الرسالة بنجاح!",
             "messageSentError": "فشل في إرسال الرسالة"
           }
         }
      },
      "wiki": {
        "knowledgeBase": "قاعدة المعرفة",
        "dashboardKnowledgeBase": "قاعدة معرفة لوحة التحكم",
        "everythingYouNeedToKnow": "كل ما تحتاج لمعرفته حول العمل مع وكالتنا والنجاح على TikTok",
        "searchArticles": "البحث في المقالات والأدلة والبرامج التعليمية...",
        "allContent": "جميع المحتويات",
        "agencyInfo": "معلومات الوكالة",
        "tiktokGuides": "أدلة TikTok",
        "readFullArticle": "قراءة المقال كاملاً"
      },
      "pages": {
        "landing": {
          "title": "مستقبل DASHTRACER",
          "subtitle": "استغل التحليلات المدعومة بالذكاء الاصطناعي، وأتمت إدارة المبدعين، ووسع وكالتك إلى آفاق جديدة مع أكثر منصات إدارة DASHTRACER تقدماً.",
          "shopIntegration": "🚀 الآن مع دعم تكامل DASHTRACER Shop",
          "getStarted": "ابدأ الآن",
          "learnMore": "اعرف المزيد"
        },
        "dashboard": {
          "title": "لوحة التحكم",
          "welcome": "مرحباً بعودتك",
          "overview": "نظرة عامة",
          "analytics": "التحليلات",
          "notifications": "الإشعارات"
        },
        "profile": {
          "title": "الملف الشخصي",
          "personalInfo": "المعلومات الشخصية",
          "settings": "الإعدادات",
          "edit": "تعديل الملف الشخصي",
          "save": "حفظ التغييرات",
          "cancel": "إلغاء"
        },
        "support": {
          "title": "مركز الدعم",
          "description": "تحتاج مساعدة؟ أنشئ تذكرة دعم وسيساعدك فريقنا في أقرب وقت ممكن.",
          "createTicket": "إنشاء تذكرة دعم",
          "recentTickets": "تذاكري الأخيرة",
          "noTickets": "لم يتم العثور على تذاكر. أنشئ تذكرتك الأولى أعلاه."
        },
        "campaigns": {
          "title": "إدارة الحملات",
          "underDevelopment": "هذه الصفحة قيد التطوير",
          "description": "ستوفر صفحة إدارة الحملات نظرة عامة كاملة على جميع الحملات عبر الوكالة. سيتمكن المديرون من إنشاء وتحرير ومراقبة جميع أنشطة الحملة، مع تقارير مفصلة ومقاييس الأداء."
        },
        "rules": {
          "title": "إدارة القواعد",
          "bonusRulesManagement": "إدارة قواعد المكافآت",
          "description": "إنشاء وإدارة قواعد المكافآت للمبدعين.",
          "underDevelopment": "هذه الصفحة قيد التطوير",
          "fullDescription": "ستسمح صفحة إدارة القواعد للمديرين بإنشاء وتعديل وحذف قواعد المكافآت للمبدعين. ستوفر الواجهة عرضًا كاملاً لجميع القواعد، مع القدرة على تحديد الشروط والمكافآت لكل قاعدة."
        },
        "dataManagement": {
          "title": "إدارة البيانات",
          "accessDenied": "الوصول مرفوض",
          "noPermission": "ليس لديك إذن للوصول إلى هذه الصفحة.",
          "batchImportMode": "وضع الاستيراد المجمع (ملفات متعددة)",
          "uploadMultipleFiles": "رفع ملفات متعددة في وقت واحد للمعالجة المجمعة",
          "uploadOneFile": "رفع ومعالجة ملف واحد في كل مرة مع تخطيط الحقول",
          "selectDataType": "اختر نوع البيانات",
          "requiredFields": "الحقول المطلوبة",
          "template": "النموذج",
          "uploadFiles": "رفع الملفات",
          "processBatch": "معالجة المجموعة",
          "uploadFile": "رفع الملف",
          "mapFields": "تخطيط الحقول",
          "reviewImport": "مراجعة والاستيراد"
        },
                 "creators": {
           "title": "المبدعون",
           "management": "إدارة المبدعين",
           "profile": "ملف المبدع الشخصي",
           "analytics": "تحليلات المبدع",
           "add": "إضافة مبدع",
           "edit": "تحرير المبدع",
           "delete": "حذف المبدع",
           "addNew": "إضافة مبدع جديد",
           "username": "اسم المستخدم",
           "category": "الفئة",
           "manager": "المدير",
           "agency": "الوكالة",
           "actions": "الإجراءات",
           "noCreatorsFound": "لم يتم العثور على مبدعين",
           "loadingCreators": "جاري تحميل المبدعين...",
           "retry": "إعادة المحاولة",
           "cancel": "إلغاء",
           "addedSuccessfully": "تم إضافة المبدع {{name}} بنجاح!",
           "validation": {
             "usernameRequired": "اسم المستخدم مطلوب",
             "categoryRequired": "الفئة مطلوبة",
             "managerRequired": "المدير مطلوب",
             "agencyRequired": "الوكالة مطلوبة"
           },
           "categories": {
             "lifestyle": "نمط الحياة",
             "comedy": "كوميديا",
             "dance": "رقص",
             "beauty": "جمال",
             "fitness": "لياقة بدنية",
             "food": "طعام",
             "gaming": "ألعاب",
             "education": "تعليم"
           }
         },
        "admin": {
          "dashboard": {
            "title": "لوحة تحكم الإدارة",
            "welcome": "مرحباً بعودتك، {{name}}! 🚀 أدر نظرة عامة على منصتك",
            "totalCreators": "إجمالي المبدعين",
            "totalManagers": "إجمالي المديرين",
            "platformHealth": "صحة المنصة",
            "bonusRules": {
              "title": "💎 إدارة قواعد المكافآت",
              "description": "تكوين وإدارة برامج مكافآت المبدعين",
              "addNewRule": "إضافة قاعدة جديدة",
              "program": "البرنامج",
              "validDays": "الأيام الصالحة",
              "hoursRequired": "الساعات المطلوبة",
              "rate": "المعدل",
              "actions": "الإجراءات",
              "addRuleDialog": "إضافة قاعدة مكافأة جديدة",
              "programName": "اسم البرنامج",
              "validDaysRequired": "الأيام الصالحة المطلوبة",
              "hoursRequiredField": "الساعات المطلوبة",
              "rateField": "المعدل",
              "ruleUpdated": "تم تحديث القاعدة بنجاح!",
              "ruleDeleted": "تم حذف القاعدة بنجاح!",
              "ruleAdded": "تم إضافة القاعدة بنجاح!"
            },
            "managersCreators": {
              "title": "👥 المديرون ومبدعوهم",
              "description": "نظرة عامة على جميع المديرين والمبدعين المعينين لهم",
              "managerUsername": "اسم مستخدم المدير",
              "email": "البريد الإلكتروني",
              "phone": "الهاتف",
              "creators": "المبدعون",
              "creatorUsername": "اسم مستخدم المبدع",
              "liveDays": "أيام البث المباشر",
              "diamonds": "الماس",
              "hours": "الساعات",
              "bonus": "المكافأة",
              "creatorsCount": "{{count}} مبدعين",
              "managersPerPage": "المديرون في الصفحة",
              "creatorsPerPage": "المبدعون في الصفحة"
            },
            "upload": {
              "title": "📊 رفع بيانات المبدعين",
              "description": "استيراد بيانات المبدعين من ملفات Excel (.xlsx, .xls)",
              "dragDrop": "اسحب وأفلت ملف Excel هنا، أو انقر للاختيار",
              "dropping": "📁 أفلت ملف Excel هنا...",
              "supportedFormats": "الصيغ المدعومة: .xlsx, .xls",
              "confirmUpload": "تأكيد الرفع",
              "confirmMessage": "هل أنت متأكد من أنك تريد رفع هذا الملف؟",
              "fileDetails": "تفاصيل الملف:",
              "fileName": "الاسم: {{name}}",
              "fileSize": "الحجم: {{size}} ميجابايت",
              "fileType": "النوع: {{type}}",
              "upload": "رفع",
              "uploading": "جاري الرفع..."
            }
          }
        }
      },
      "forms": {
        "labels": {
          "email": "عنوان البريد الإلكتروني",
          "password": "كلمة المرور",
          "username": "اسم المستخدم",
          "firstName": "الاسم الأول",
          "lastName": "اسم العائلة",
          "phone": "رقم الهاتف",
          "title": "العنوان",
          "description": "الوصف",
          "category": "الفئة",
          "priority": "الأولوية",
          "status": "الحالة"
        },
        "placeholders": {
          "enterEmail": "أدخل بريدك الإلكتروني",
          "enterPassword": "أدخل كلمة المرور",
          "enterUsername": "أدخل اسم المستخدم",
          "searchPlaceholder": "بحث..."
        },
        "buttons": {
          "submit": "إرسال",
          "cancel": "إلغاء",
          "save": "حفظ",
          "edit": "تحرير",
          "delete": "حذف",
          "create": "إنشاء",
          "update": "تحديث",
          "send": "إرسال",
          "close": "إغلاق",
          "back": "رجوع",
          "next": "التالي",
          "previous": "السابق"
        }
      },
      "tickets": {
        "title": "تذكرة",
        "create": "إنشاء تذكرة",
        "submit": "إرسال التذكرة",
        "ticketTitle": "عنوان التذكرة",
        "detailedDescription": "وصف مفصل",
        "categories": {
          "accountIssue": "مشكلة في الحساب",
          "payment": "الدفع",
          "technical": "تقني",
          "content": "المحتوى",
          "other": "أخرى"
        },
        "priorities": {
          "low": "منخفضة",
          "medium": "متوسطة",
          "high": "عالية",
          "urgent": "عاجلة"
        },
        "statuses": {
          "open": "مفتوحة",
          "inProgress": "قيد التنفيذ",
          "resolved": "محلولة",
          "closed": "مغلقة"
        }
      },
      "navigation": {
        "home": "الرئيسية",
        "dashboard": "لوحة التحكم",
        "profile": "الملف الشخصي",
        "creators": "المبدعون",
        "events": "الأحداث",
        "wiki": "الويكي",
        "contact": "اتصل بنا",
        "support": "الدعم",
        "admin": "الإدارة",
        "management": "الإدارة",
        "tickets": "التذاكر",
        "campaigns": "الحملات",
        "rules": "القواعد",
        "analytics": "التحليلات",
        "manageManagers": "إدارة المديرين",
        "dataManagement": "إدارة البيانات"
      },
      "userRoles": {
        "administrator": "مدير",
        "manager": "مدير",
        "subManager": "مدير فرعي",
        "creator": "مبدع",
        "myCreators": "مبدعوني",
        "assignedCreators": "المبدعون المعينون",
        "allCreators": "جميع المبدعين"
      },
              "events": {
          "title": "أحداث الوكالة",
          "description": "عرض جميع الأحداث من مديري وكالتك",
          "calendar": "التقويم",
          "list": "القائمة",
          "searchEvents": "البحث في الأحداث...",
          "sortByOldest": "ترتيب حسب الأقدم أولاً",
          "sortByNewest": "ترتيب حسب الأحدث أولاً",
          "noEventsFound": "لم يتم العثور على أحداث",
          "noEventsDescription": "لم يتم إنشاء أي أحداث من قبل مديري وكالتك بعد",
          "viewDetails": "عرض التفاصيل",
          "eventDetails": "تفاصيل الحدث",
          "startTime": "وقت البداية",
          "endTime": "وقت النهاية",
          "location": "الموقع",
          "type": "النوع",
          "general": "عام",
          "participants": "المشاركون",
          "participantsCount": "المشاركون ({{count}})",
          "close": "إغلاق",
          "dayNames": {
            "sun": "الأحد",
            "mon": "الإثنين",
            "tue": "الثلاثاء",
            "wed": "الأربعاء",
            "thu": "الخميس",
            "fri": "الجمعة",
            "sat": "السبت"
          }
        },
        "contact": {
          "title": "مركز إدارة الوكالة",
          "description": "إدارة تذاكر الدعم والأحداث من وكالتك",
          "agencyManagement": "إدارة الوكالة",
          "supportTickets": "تذاكر الدعم",
          "agencySupportTickets": "تذاكر دعم الوكالة",
          "refresh": "تحديث",
          "searchTickets": "البحث في التذاكر...",
          "loadingTickets": "جاري تحميل التذاكر...",
          "noTicketsFound": "لم يتم العثور على تذاكر",
          "tryChangeFilters": "جرب تغيير البحث أو المرشحات",
          "selectTicketToChat": "اختر تذكرة لبدء المحادثة",
          "chooseTicketDescription": "اختر تذكرة دعم من القائمة لعرض المحادثة",
          "createNewTicket": "إنشاء تذكرة دعم جديدة",
          "subject": "الموضوع",
          "description": "الوصف",
          "category": "الفئة",
          "priority": "الأولوية",
          "createTicket": "إنشاء تذكرة",
          "cancel": "إلغاء",
          "ticketCreatedSuccessfully": "تم إنشاء التذكرة بنجاح!",
          "failedToCreateTicket": "فشل في إنشاء التذكرة",
          "failedToFetchTickets": "فشل في تحميل التذاكر",
          "failedToFetchEvents": "فشل في تحميل الأحداث",
          "ticketStatusUpdated": "تم تحديث حالة التذكرة بنجاح!",
          "failedToUpdateStatus": "فشل في تحديث حالة التذكرة",
          "realTime": "وقت فعلي",
          "status": {
            "all": "جميع الحالات",
            "open": "مفتوح",
            "inProgress": "قيد التنفيذ",
            "resolved": "محلول",
            "closed": "مغلق"
          },
          "categories": {
            "all": "جميع الفئات",
            "general": "عام",
            "generalInquiry": "استفسار عام",
            "matchPlanning": "تخطيط المباراة",
            "bugReport": "تقرير خطأ",
            "banReport": "تقرير حظر",
            "departureRequest": "طلب مغادرة"
          },
          "priorities": {
            "low": "منخفض",
            "medium": "متوسط",
            "high": "عالي",
            "urgent": "عاجل"
          }
        },
      "status": {
        "loading": "جاري التحميل...",
        "error": "خطأ",
        "success": "نجح",
        "warning": "تحذير",
        "info": "معلومات",
        "notFound": "غير موجود",
        "unauthorized": "غير مخول",
        "forbidden": "محظور"
      },
      "messages": {
        "welcome": "مرحباً بك في DASHTRACER",
        "loginSuccess": "تم تسجيل الدخول بنجاح",
        "logoutSuccess": "تم تسجيل الخروج بنجاح",
        "saveSuccess": "تم الحفظ بنجاح",
        "deleteSuccess": "تم الحذف بنجاح",
        "updateSuccess": "تم التحديث بنجاح",
        "createSuccess": "تم الإنشاء بنجاح",
        "errorOccurred": "حدث خطأ",
        "noDataFound": "لم يتم العثور على بيانات",
        "confirmDelete": "هل أنت متأكد من أنك تريد حذف هذا العنصر؟",
        "unsavedChanges": "لديك تغييرات غير محفوظة. هل أنت متأكد من أنك تريد المغادرة؟"
      },
      "creatorManagement": {
        "title": "إدارة المبدعين",
        "allCreatorsManagement": "إدارة جميع المبدعين",
        "description": "إدارة ومراقبة مبدعي TikTok الخاصين بك",
        "allCreatorsDescription": "إدارة ومراقبة جميع مبدعي TikTok عبر المنصة",
        "addCreator": "إضافة مبدع",
        "editCreator": "تحرير المبدع",
        "addNewCreator": "إضافة مبدع جديد",
        "updateCreator": "تحديث المبدع",
        "deleteCreator": "حذف المبدع",
        "confirmDeleteCreator": "هل أنت متأكد من أنك تريد حذف المبدع \"{{name}}\"؟",
        "searchPlaceholder": "البحث في المبدعين بالاسم أو الفئة...",
        "searchPlaceholderAdmin": "البحث في المبدعين بالاسم أو الفئة أو المدير...",
        "totalCreators": "إجمالي المبدعين",
        "noCreatorsFound": "لم يتم العثور على مبدعين",
        "noCreatorsFoundDescription": "حاول تعديل مصطلحات البحث أو امسح البحث لرؤية جميع المبدعين",
        "noCreatorsFoundEmpty": "ابدأ بإضافة أول مبدع لك إلى المنصة",
        "addFirstCreator": "أضف مبدعك الأول",
        "loadingCreators": "جاري تحميل المبدعين...",
        "loadingCreatorsDescription": "يرجى الانتظار بينما نجلب مبدعيك",
        "categories": {
          "Gaming": "الألعاب",
          "Beauty": "الجمال",
          "Lifestyle": "نمط الحياة",
          "Comedy": "الكوميديا",
          "Education": "التعليم",
          "Music": "الموسيقى",
          "Dance": "الرقص",
          "Food": "الطعام",
          "General": "عام"
        },
        "fields": {
          "username": "اسم المستخدم",
          "tikTokId": "معرف TikTok",
          "category": "الفئة",
          "followers": "المتابعون",
          "diamonds": "الماس",
          "liveDuration": "مدة البث المباشر",
          "validLiveDays": "أيام البث المباشر الصالحة",
          "matches": "المباريات",
          "status": "الحالة",
          "manager": "المدير",
          "email": "البريد الإلكتروني",
          "phone": "الهاتف",
          "actions": "الإجراءات"
        },
        "status": {
          "active": "نشط",
          "inactive": "غير نشط",
          "suspended": "معلق"
        },
        "validation": {
          "usernameRequired": "اسم المستخدم مطلوب",
          "tikTokIdRequired": "معرف TikTok مطلوب",
          "categoryRequired": "الفئة مطلوبة",
          "followersRequired": "عدد المتابعين مطلوب",
          "diamondsRequired": "عدد الماس مطلوب"
        },
        "actions": {
          "retry": "إعادة المحاولة",
          "refresh": "تحديث"
        }
      },
      "eventCalendar": {
        "title": "تقويم الأحداث",
        "loadingCalendar": "جاري تحميل التقويم...",
        "viewOnlyMode": "وضع القراءة فقط: يمكنك رؤية الأحداث التي أنشأها المديرون",
        "noDescription": "لا يوجد وصف",
        "legend": {
          "tournament": "بطولة",
          "challenge": "تحدي", 
          "meeting": "اجتماع",
          "match": "مباراة"
        },
        "stats": {
          "tournaments": "بطولات",
          "challenges": "تحديات",
          "meetings": "اجتماعات",
          "matches": "مباريات"
        },
        "eventTypes": {
          "liveStream": "بث مباشر",
          "workshop": "ورشة عمل",
          "meetGreet": "لقاء وتحية",
          "training": "تدريب",
          "contest": "مسابقة",
          "tournament": "بطولة",
          "challenge": "تحدي",
          "meeting": "اجتماع",
          "match": "مباراة"
        }
      },
      "events": {
        "pageTitle": "الأحداث والبطولات",
        "pageSubtitle": "انضم إلى البطولات والتحديات وأحداث المجتمع",
        "createEvent": "إنشاء حدث",
        "createFirstEvent": "إنشاء أول حدث",
        "refresh": "تحديث الأحداث",
        "calendar": "التقويم",
        "list": "القائمة",
        "close": "إغلاق",
        "cancel": "إلغاء",
        "joinTournament": "انضم للبطولة",
        "joinChallenge": "انضم للتحدي",
        "dateTime": "التاريخ والوقت",
        "location": "الموقع",
        "prize": "الجائزة",
        "participants": "المشاركون",
        "status": "الحالة",
        "types": {
          "tournament": "بطولة",
          "challenge": "تحدي",
          "meeting": "اجتماع",
          "match": "مباراة",
          "liveStream": "بث مباشر",
          "workshop": "ورشة عمل",
          "meetGreet": "لقاء وتحية",
          "training": "تدريب",
          "contest": "مسابقة"
        },
        "statuses": {
          "scheduled": "مجدول",
          "active": "نشط",
          "completed": "مكتمل",
          "cancelled": "ملغي"
        },
        "noEvents": "لا توجد أحداث بعد",
        "noEventsDescription": "أنشئ حدثك الأول للبدء",
        "newEventAvailable": "حدث جديد متاح",
        "newEventMessage": "تم إنشاء حدث جديد من قبل المدير. تحقق من تقويمك!",
        "failedToFetch": "فشل في جلب الأحداث. يرجى المحاولة مرة أخرى لاحقاً.",
        "failedToCreate": "فشل في إنشاء أو تحديث الحدث. يرجى المحاولة مرة أخرى.",
        "editEvent": "تعديل الحدث",
        "createNewEvent": "إنشاء حدث جديد"
      },
      "contact": {
        "pageTitle": "مركز الدعم",
        "pageSubtitle": "احصل على المساعدة وإدارة تذاكر الدعم الخاصة بك",
        "dashboard": "لوحة التحكم",
        "support": "الدعم",
        "contactManager": "اتصل بالمدير",
        "newTicket": "تذكرة جديدة",
        "realTimeSupport": "تذاكر الدعم في الوقت الفعلي",
        "searchTickets": "البحث في التذاكر...",
        "status": "الحالة",
        "category": "الفئة",
        "allStatuses": "جميع الحالات",
        "allCategories": "جميع الفئات",
        "sortNewest": "ترتيب حسب الأقدم أولاً",
        "sortOldest": "ترتيب حسب الأحدث أولاً",
        "noTicketsFound": "لم يتم العثور على تذاكر",
        "noTicketsDescription": "جرب تغيير البحث أو المرشحات",
        "selectTicket": "اختر تذكرة لبدء المحادثة",
        "selectTicketDescription": "اختر تذكرة دعم من القائمة لعرض المحادثة",
        "createTicketTitle": "إنشاء تذكرة دعم جديدة",
        "subject": "الموضوع",
        "description": "الوصف",
        "priority": "الأولوية",
        "cancel": "إلغاء",
        "createTicket": "إنشاء التذكرة",
        "contactManagerTitle": "اتصل بمديرك",
        "contactManagerDescription": "إرسال رسالة مباشرة إلى مديرك:",
        "supportManager": "مدير الدعم",
        "message": "الرسالة",
        "messagePlaceholder": "اكتب رسالتك هنا...",
        "sendMessage": "إرسال الرسالة",
        "ticketStatusUpdated": "تم تحديث حالة التذكرة بنجاح!",
        "ticketUpdateFailed": "فشل في تحديث حالة التذكرة",
        "realTime": "الوقت الفعلي",
        "statuses": {
          "open": "مفتوح",
          "inProgress": "قيد التنفيذ",
          "resolved": "محلول",
          "closed": "مغلق"
        },
        "categories": {
          "general": "استفسار عام",
          "matchPlanning": "تخطيط المباراة",
          "bugReport": "تقرير خطأ",
          "banReport": "تقرير حظر",
          "departureRequest": "طلب مغادرة"
        },
        "priorities": {
          "low": "منخفض",
          "medium": "متوسط",
          "high": "عالي",
          "urgent": "عاجل"
        }
      },
      "creatorDashboard": {
        "title": "لوحة تحكم المبدع",
        "welcome": "مرحباً بعودتك {{username}}! إليك نظرة عامة على أدائك.",
        "reportIssue": "الإبلاغ عن مشكلة",
        "contactInformation": "📞 معلومات الاتصال",
        "creatorDetails": "تفاصيل المبدع",
        "agencySupport": "دعم الوكالة",
        "joined": "انضم",
        "manager": "المدير:",
        "createTicketTitle": "إنشاء تذكرة دعم جديدة",
        "subject": "الموضوع",
        "description": "الوصف",
        "category": "الفئة",
        "priority": "الأولوية",
        "cancel": "إلغاء",
        "submitting": "جاري الإرسال...",
        "createTicket": "إنشاء التذكرة",
        "creatorDataNotFound": "لم يتم العثور على بيانات المبدع",
        "ticketCreatedSuccess": "تم إنشاء التذكرة بنجاح!",
        "ticketCreatedFailed": "فشل في إنشاء التذكرة.",
        "subjectDescriptionRequired": "الموضوع والوصف مطلوبان.",
        "categories": {
          "general": "عام",
          "matchPlanning": "تخطيط المباراة",
          "bugReport": "تقرير خطأ",
          "banReport": "تقرير حظر",
          "departureRequest": "طلب مغادرة"
        },
        "priorities": {
          "low": "منخفض",
          "medium": "متوسط",
          "high": "عالي",
          "urgent": "عاجل"
        }
      },
      "bonusRules": {
        "title": "برنامج مكافآت الوكالة",
        "description": "قواعد برنامج المكافآت تعتمد على عدد الأيام الصالحة وساعات البث.",
        "loading": "جاري تحميل قواعد المكافآت...",
        "program": "البرنامج",
        "validDays": "الأيام الصالحة",
        "hours": "الساعات",
        "rate": "المعدل",
        "calculationFormula": "صيغة الحساب",
        "formulaDescription": "يتم حساب المكافأة وفقاً للصيغة: <strong>المعدل المطبق × عدد الماسات = مبلغ المكافأة بالدولار</strong>",
        "example": "<strong>مثال:</strong> مبدع لديه مليون ماسة ومعدل 0.03% = 300$ مكافأة"
      },
      "creatorBonusCard": {
        "title": "برنامج المكافآت",
        "subtitle": "أداؤك ومكافآتك",
        "noDataAvailable": "لا توجد معلومات مكافآت متاحة",
        "diamond": "ماسة",
        "validDay": "يوم صالح",
        "hours": "ساعات",
        "rate": "المعدل",
        "currentBonus": "المكافأة الحالية"
      },
      "landingPage": {
        "hero": {
          "chip": "🚀 الآن مع دعم تكامل متجر DASHTRACER",
          "title": "مستقبل",
          "titleHighlight": "DASHTRACER",
          "subtitle": "استخدم التحليلات المدعومة بالذكاء الاصطناعي، وأتمت إدارة المبدعين، وطور وكالتك إلى آفاق جديدة مع منصة إدارة DASHTRACER الأكثر تقدماً.",
          "startFreeTrial": "ابدأ التجربة المجانية",
          "goToDashboard": "اذهب إلى لوحة التحكم",
          "watchDemo": "شاهد العرض التوضيحي",
          "languageSelector": "اختر اللغة"
        },
        "stats": {
          "activeCreators": "المبدعون النشطون",
          "contentViews": "مشاهدات المحتوى",
          "revenueGenerated": "الإيرادات المولدة",
          "uptime": "وقت التشغيل"
        },
        "features": {
          "title": "ميزات قوية للوكالات الحديثة",
          "subtitle": "كل ما تحتاجه لإدارة وتنمية وتحسين وكالة مبدعي DASHTRACER الخاصة بك",
          "aiAnalytics": {
            "title": "التحليلات المدعومة بالذكاء الاصطناعي",
            "description": "خوارزميات التعلم الآلي المتقدمة للتنبؤ بأداء المحتوى وتحسين استراتيجيتك في الوقت الفعلي."
          },
          "creatorEcosystem": {
            "title": "نظام المبدعين البيئي",
            "description": "تواصل مع مبدعي DASHTRACER من الطراز الأول حول العالم وأدر التعاونات بسهولة."
          },
          "growthAcceleration": {
            "title": "تسريع النمو",
            "description": "عزز نمو وكالتك باستراتيجياتنا المُثبتة والأدوات الآلية."
          },
          "enterpriseSecurity": {
            "title": "أمان المؤسسات",
            "description": "أمان على مستوى البنوك مع التشفير من طرف إلى طرف لحماية بياناتك القيمة وعلاقات المبدعين."
          },
          "campaignAutomation": {
            "title": "أتمتة الحملات",
            "description": "أتمت دورة حياة حملتك بالكامل من التخطيط إلى التنفيذ وتتبع الأداء."
          },
          "lightningFast": {
            "title": "سريع كالبرق",
            "description": "استمتع بأداء فائق السرعة مع بنيتنا المحسنة ومعالجة البيانات في الوقت الفعلي."
          }
        },
        "cta": {
          "title": "مستعد لتحويل وكالتك؟",
          "subtitle": "انضم إلى آلاف المبدعين والوكالات الناجحة التي تستخدم DASHTRACER بالفعل",
          "startYourFreeTrial": "ابدأ تجربتك المجانية"
        },
        "dashboardPreview": "معاينة لوحة تحكم DASHTRACER"
      },
      "loginPage": {
        "title": "DASHTRACER",
        "subtitle": "منصة إدارة المبدعين",
        "tagline": "تمكين المبدعين، تبسيط النجاح",
        "welcomeBack": "مرحباً بعودتك",
        "signInMessage": "سجل الدخول إلى حسابك للمتابعة",
        "continueWithTikTok": "المتابعة مع تيك توك",
        "or": "أو",
        "emailLabel": "عنوان البريد الإلكتروني / معرف تيك توك",
        "passwordLabel": "كلمة المرور",
        "signingIn": "جاري تسجيل الدخول...",
        "signIn": "تسجيل الدخول",
        "needHelp": "تحتاج مساعدة؟ اتصل بمسؤول فريقك",
        "languageSelector": "اختر اللغة",
        "features": {
          "analytics": {
            "title": "التحليلات",
            "description": "تتبع الأداء في الوقت الفعلي"
          },
          "teamManagement": {
            "title": "إدارة الفريق",
            "description": "التعاون مع المبدعين"
          },
          "contentPlanning": {
            "title": "تخطيط المحتوى",
            "description": "جدولة وتنظيم المحتوى"
          }
        },
        "errors": {
          "fillAllFields": "يرجى ملء جميع الحقول",
          "invalidCredentials": "بيانات اعتماد غير صحيحة"
        }
      },
      "creatorProfile": {
        "title": "ملف المبدع",
        "editProfile": "تعديل الملف الشخصي",
        "saving": "جاري الحفظ...",
        "save": "حفظ",
        "cancel": "إلغاء",
        "notFound": "غير موجود!",
        "contractDetails": "تفاصيل العقد",
        "paymentInformation": "معلومات الدفع",
        "editProfileInformation": "تعديل معلومات الملف الشخصي",
        "changePassword": "تغيير كلمة المرور",
        "fields": {
          "id": "المعرف",
          "displayName": "اسم العرض",
          "username": "اسم المستخدم",
          "email": "البريد الإلكتروني",
          "phone": "الهاتف",
          "tikTokId": "معرف تيك توك",
          "category": "الفئة",
          "bio": "السيرة الذاتية",
          "joined": "انضم",
          "following": "المتابَعون",
          "videos": "الفيديوهات",
          "followers": "المتابعون",
          "likes": "الإعجابات",
          "views": "المشاهدات",
          "contractStart": "بداية العقد",
          "duration": "المدة",
          "daysWithAgency": "الأيام مع الوكالة",
          "diamondsCollected": "الماس المجمع",
          "ribBankAccount": "RIB (الحساب البنكي)",
          "paypalAccount": "حساب PayPal",
          "currentPassword": "كلمة المرور الحالية",
          "newPassword": "كلمة المرور الجديدة",
          "confirmNewPassword": "تأكيد كلمة المرور الجديدة"
        },
        "categories": {
          "lifestyle": "نمط الحياة",
          "fashion": "الموضة",
          "beauty": "الجمال",
          "fitness": "اللياقة البدنية",
          "food": "الطعام",
          "travel": "السفر",
          "tech": "التكنولوجيا",
          "gaming": "الألعاب",
          "music": "الموسيقى",
          "dance": "الرقص",
          "comedy": "الكوميديا",
          "education": "التعليم",
          "business": "الأعمال",
          "health": "الصحة",
          "parenting": "الأبوة والأمومة",
          "pets": "الحيوانات الأليفة",
          "sports": "الرياضة",
          "art": "الفن",
          "diy": "اصنع بنفسك",
          "automotive": "السيارات",
          "finance": "المال",
          "other": "أخرى"
        },
        "placeholders": {
          "enterBankAccount": "أدخل تفاصيل الحساب البنكي"
        },
        "helperTexts": {
          "note": "ملاحظة",
          "tikTokIdNotEditable": "لا يمكن تعديل معرف تيك توك لأسباب أمنية",
          "contactManagerForTikTokId": "اتصل بمديرك إذا كنت بحاجة لتحديث معرف تيك توك",
          "leavePasswordFieldsEmpty": "اترك حقول كلمة المرور فارغة إذا كنت لا تريد تغيير كلمة المرور",
          "onlyEditOwnProfile": "يمكنك فقط تعديل ملفك الشخصي"
        },
        "errors": {
          "currentPasswordRequired": "كلمة المرور الحالية مطلوبة لتغيير كلمة المرور",
          "newPasswordRequired": "كلمة مرور جديدة مطلوبة",
          "newPasswordTooShort": "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل",
          "passwordsDoNotMatch": "كلمات المرور الجديدة لا تتطابق",
          "failedToUpdate": "فشل في تحديث الملف الشخصي"
        },
        "success": {
          "profileUpdated": "تم تحديث الملف الشخصي بنجاح!"
        },
        "daysUnit": "{{count}} يوم",
        "unknownUser": "مستخدم غير معروف"
      },
      "wikiPage": {
        "dashboard": "لوحة التحكم",
        "knowledgeBase": "قاعدة المعرفة",
        "title": "قاعدة معرفة لوحة التحكم",
        "subtitle": "كل ما تحتاج لمعرفته حول العمل مع وكالتنا والنجاح على تيك توك",
        "searchPlaceholder": "البحث في المقالات والأدلة والدروس...",
        "tabs": {
          "allContent": "جميع المحتويات",
          "agencyInfo": "معلومات الوكالة",
          "tiktokGuides": "أدلة تيك توك"
        },
        "categories": "الفئات",
        "searchResults": "تم العثور على {{count}} نتيجة لـ \"{{term}}\"",
        "readFullArticle": "قراءة المقال كاملاً",
        "noArticlesFound": "لم يتم العثور على مقالات",
        "noArticlesFoundDescription": "جرب تعديل مصطلحات البحث أو تصفح فئات مختلفة.",
        "noArticlesInCategory": "لا توجد مقالات متاحة في هذه الفئة حتى الآن.",
        "clearSearch": "مسح البحث",
        "agencyCategories": {
          "gettingStarted": {
            "title": "البدء",
            "description": "تعرف على وكالتنا وكيف نعمل وما نقدمه للمبدعين."
          },
          "revenue": {
            "title": "الإيرادات والمدفوعات",
            "description": "فهم كيفية عمل المدفوعات ونظام المكافآت وتقاسم الإيرادات."
          },
          "campaigns": {
            "title": "حملات العلامات التجارية",
            "description": "كيفية المشاركة في حملات العلامات التجارية وزيادة أرباحك."
          },
          "policies": {
            "title": "سياسات الوكالة",
            "description": "السياسات والإرشادات المهمة التي يجب على جميع المبدعين اتباعها."
          }
        },
        "tiktokCategories": {
          "tiktokBasics": {
            "title": "أساسيات تيك توك",
            "description": "معلومات أساسية حول ميزات ووظائف تيك توك."
          },
          "contentStrategy": {
            "title": "استراتيجية المحتوى",
            "description": "أفضل الممارسات لإنشاء محتوى جذاب يحقق أداءً جيداً."
          },
          "liveStreaming": {
            "title": "البث المباشر",
            "description": "نصائح وحيل للبث المباشر الناجح على تيك توك وكسب الماس."
          },
          "tiktokLiveWiki": {
            "title": "ويكي تيك توك لايف للمبدعين",
            "description": "دليل شامل للبث المباشر على تيك توك والأهلية والقواعد والربح والمزيد."
          },
          "tiktokAlgorithm": {
            "title": "الخوارزمية والاتجاهات",
            "description": "فهم كيفية عمل خوارزمية تيك توك والبقاء في المقدمة في الاتجاهات."
          }
        },
        "articles": {
          "tiktokLiveEligibility": {
            "title": "متطلبات الأهلية لتيك توك لايف",
            "summary": "تعرف على متطلبات العمر والمتابعين للتأهل للبث المباشر على تيك توك.",
            "content": "<h2>متطلبات الأهلية للبث المباشر على تيك توك</h2><h3>كيف تصبح مؤهلاً للبث المباشر على تيك توك؟</h3><h4>ما يجب فعله:</h4><ul><li><strong>كن عمرك 18 سنة:</strong> تأكد من أن عمرك 18 سنة على الأقل. هذا هو الحد الأدنى للعمر لبدء البث المباشر.</li><li><strong>وصل إلى 1000 متابع:</strong> احصل على 1000 متابع على الأقل في حسابك. هذا هو العتبة العامة لفتح ميزة البث المباشر.</li><li><strong>كن 18+ للهدايا:</strong> إذا كنت تريد إرسال أو استقبال الهدايا أثناء البث المباشر، يجب أن تكون 18 سنة أو أكبر (أو 19 في كوريا الجنوبية).</li></ul><h4>ما لا يجب فعله:</h4><ul><li><strong>لا تحاول تجاوز قيود العمر:</strong> أي محاولة لتزييف عمرك سيتم اكتشافها وقد تؤدي إلى تعليق الحساب.</li><li><strong>لا تتوقع البث المباشر بدون متابعين كافيين:</strong> ميزة البث المباشر لن تكون نشطة إذا لم تحقق عدد المتابعين المطلوب.</li></ul>"
          },
          "tiktokLiveContentRules": {
            "title": "محتوى تيك توك لايف: القواعد التي يجب اتباعها",
            "summary": "الإرشادات والقواعد لإنشاء محتوى تيك توك لايف متوافق وتجنب العقوبات.",
            "content": "<h2>محتوى تيك توك لايف: القواعد التي يجب اتباعها (وتجنبها)</h2><h3>كيف تنشئ محتوى يتوافق مع إرشادات تيك توك وتتجنب العقوبات؟</h3><h4>ما يجب فعله:</h4><ul><li><strong>كن أصيلاً ومباشراً:</strong> أظهر نفسك مباشرة، تفاعل وتأكد من حضورك المرئي على الشاشة.</li><li><strong>احترم حقوق الطبع والنشر:</strong> استخدم فقط المحتوى (الموسيقى، الصور) الذي تملك حقوقه.</li><li><strong>حافظ على سلوك إيجابي:</strong> استخدم لغة محترمة وسلوك مناسب.</li></ul><h4>ما لا يجب فعله:</h4><ul><li><strong>لا تبث محتوى مسجل مسبقاً:</strong> البث المباشر يجب أن يكون بث فوري وحقيقي.</li><li><strong>لا تستخدم شاشات فارغة أو ثابتة:</strong> تجنب الشاشات السوداء أو الصور الثابتة أو رموز QR بدون تفاعل.</li><li><strong>لا تغب لفترة طويلة:</strong> ابق حاضراً ومتفاعلاً مع جمهورك.</li><li><strong>لا تعيد التوجيه خارج تيك توك:</strong> تجنب عرض روابط أو معلومات تدفع المستخدمين إلى منصات أخرى.</li><li><strong>لا تنتهك قواعد المحتوى الحساس:</strong> منع صارم للعري والأعمال الجنسية والعنف والمضايقة وخطاب الكراهية والمعلومات المضللة أو الترويج للمنتجات المنظمة (الكحول والمخدرات والأسلحة وما إلى ذلك).</li></ul>"
          },
          "tiktokLiveMonetization": {
            "title": "ربح المال من تيك توك لايف: كيف يعمل",
            "summary": "تعلم كيف يمكن أن تصبح هدايا البث المباشر مصدر دخل وزيادة أرباحك.",
            "content": "<h2>ربح المال من تيك توك لايف: كيف يعمل</h2><h3>كيف يمكن أن تصبح هدايا البث المباشر مصدر دخل؟</h3><h4>ما يجب فعله:</h4><ul><li><strong>شجع الهدايا:</strong> تفاعل مع جمهورك وأنشئ محتوى عالي الجودة لتشجيع المشاهدين على إرسال الهدايا لك.</li><li><strong>اشكر المتبرعين:</strong> اعبر عن امتنانك مباشرة للأشخاص الذين يقدمون لك الهدايا.</li><li><strong>أنشئ محتوى قيم:</strong> كلما كان بثك المباشر أكثر إثارة وتسلية، زادت احتمالية تلقي الهدايا.</li></ul><h4>ما لا يجب فعله:</h4><ul><li><strong>لا تجبر التبرعات:</strong> تجنب الطلبات العدوانية أو المتكررة للهدايا.</li><li><strong>لا تنتهك قواعد الربح:</strong> أي انتهاك للإرشادات سيجعل بثك المباشر غير مؤهل للربح.</li><li><strong>لا تنتج محتوى منخفض الجودة:</strong> البث المباشر غير الأصيل أو منخفض الجودة لن يتم ربحه.</li></ul><h2>استكشاف طرق ربح أخرى على تيك توك لايف</h2><h3>كيف تنوع دخلك خارج هدايا البث المباشر؟</h3><h4>ما يجب فعله:</h4><ul><li><strong>استخدم متجر تيك توك في البث المباشر:</strong> إذا كنت تبيع منتجات، ادمج متجر تيك توك في بثك المباشر للعروض التوضيحية المباشرة والمبيعات المباشرة.</li><li><strong>ابحث عن شراكات العلامات التجارية:</strong> تعاون مع العلامات التجارية للبث المباشر المدعوم أو وضع المنتجات.</li><li><strong>انخرط في التسويق بالعمولة:</strong> روج لمنتجات العلامات التجارية الأخرى باستخدام رابط فريد لكسب عمولة على المبيعات.</li><li><strong>استخدم برنامج مكافآت المبدعين:</strong> أنشئ فيديوهات أطول من دقيقة واحدة لتوليد دخل محتمل بناءً على المشاهدات والتفاعل.</li><li><strong>قدم اشتراكات البث المباشر:</strong> قدم محتوى حصري لأكثر معجبيك إخلاصاً عبر اشتراك مدفوع.</li></ul><h4>ما لا يجب فعله:</h4><ul><li><strong>لا تلتزم بمصدر دخل واحد:</strong> استكشف ونوع خيارات الربح الخاصة بك.</li><li><strong>لا تروج لمنتجات غير ذات صلة:</strong> تأكد من أن المنتجات تتماشى مع مجالك واهتمام جمهورك.</li><li><strong>لا تنتهك قواعد الشفافية:</strong> اكشف دائماً عن المحتوى المدعوم أو بالعمولة.</li></ul>"
          },
          "tiktokLiveBestPractices": {
            "title": "تيك توك لايف: أفضل الممارسات للنجاح",
            "summary": "نصائح واستراتيجيات أساسية لجعل بثك المباشر على تيك توك أكثر جاذبية ونجاحاً.",
            "content": "<h2>تيك توك لايف: أفضل الممارسات للنجاح</h2><h3>كيف تزيد التفاعل والنجاح أثناء البث المباشر؟</h3><h4>قبل البث المباشر:</h4><ul><li><strong>خطط لمحتواك:</strong> احصل على فكرة تقريبية عما تريد التحدث عنه أو فعله أثناء البث.</li><li><strong>أعلن عن بثك المباشر مسبقاً:</strong> استخدم المنشورات العادية لإعلام متابعيك عن موعد بثك المباشر.</li><li><strong>اختر التوقيت الأمثل:</strong> ابث عندما يكون جمهورك أكثر نشاطاً (تحقق من تحليلاتك).</li><li><strong>اعد إعدادك:</strong> تأكد من الإضاءة الجيدة والصوت الواضح واتصال إنترنت مستقر.</li></ul><h4>أثناء البث المباشر:</h4><ul><li><strong>رحب بالمشاهدين بأسمائهم:</strong> رحب بالأشخاص الذين ينضمون لخلق اتصال شخصي.</li><li><strong>اقرأ وارد على التعليقات:</strong> التفاعل النشط يحافظ على اهتمام المشاهدين ويشجع المشاركة.</li><li><strong>حافظ على الطاقة العالية:</strong> كن متحمساً واحتفظ بموقف إيجابي طوال البث.</li><li><strong>استخدم الميزات التفاعلية:</strong> الاستطلاعات والأسئلة والأجوبة والتحديات يمكن أن تزيد التفاعل.</li><li><strong>تعاون مع مبدعين آخرين:</strong> البث المباشر متعدد المستخدمين يمكن أن يوسع نطاق وصولك.</li></ul><h4>ما لا يجب فعله:</h4><ul><li><strong>لا تتجاهل جمهورك:</strong> عدم التفاعل مع المشاهدين سيجعلهم يغادرون.</li><li><strong>لا تكن صامتاً لفترات طويلة:</strong> استمر في التحدث حتى عندما يكون هناك مشاهدون قليلون.</li><li><strong>لا تنه البث فجأة:</strong> احذر المشاهدين قبل إنهاء بثك واشكرهم على المشاهدة.</li><li><strong>لا تقم بمهام متعددة مفرطة:</strong> ابق مركزاً على جمهورك بدلاً من القيام بأنشطة أخرى.</li></ul><h4>بعد البث المباشر:</h4><ul><li><strong>احفظ اللحظات المميزة:</strong> أنشئ مقاطع قصيرة من بثك المباشر لنشرها كمحتوى عادي.</li><li><strong>اشكر جمهورك:</strong> انشر متابعة تشكر فيها المشاهدين ومرسلي الهدايا.</li><li><strong>حلل الأداء:</strong> راجع تحليلات بثك المباشر لتحسين البث المستقبلي.</li></ul>"
          },
          "agencyRevenueSharing": {
            "title": "فهم تقاسم الإيرادات",
            "summary": "تعلم كيف يعمل نموذج تقاسم الإيرادات لدينا وكيفية زيادة أرباحك.",
            "content": "<h2>فهم تقاسم الإيرادات</h2><p>تعمل وكالتنا على نموذج تقاسم إيرادات شفاف مصمم لمكافأة المبدعين بعدالة مع دعم عمليات الوكالة ومبادرات النمو.</p><h3>تفصيل تقسيم الإيرادات:</h3><ul><li><strong>حصة المبدع: 70%</strong> - الأغلبية تذهب إليك مباشرة</li><li><strong>دعم الوكالة: 20%</strong> - يغطي الإدارة والتسويق والدعم التقني</li><li><strong>رسوم المنصة: 10%</strong> - رسوم معالجة المنصة القياسية في الصناعة</li></ul><h3>كيف تعمل المدفوعات:</h3><p>تتم معالجة المدفوعات شهرياً، مع دفع أرباح الشهر السابق بحلول 15 من الشهر الحالي. يتم تتبع جميع المدفوعات بشفافية في لوحة تحكم المبدع الخاصة بك.</p>"
          },
          "brandCampaignParticipation": {
            "title": "كيفية المشاركة في حملات العلامات التجارية",
            "summary": "دليل خطوة بخطوة للانضمام والنجاح في حملات شراكة العلامات التجارية.",
            "content": "<h2>كيفية المشاركة في حملات العلامات التجارية</h2><p>حملات العلامات التجارية هي واحدة من أكثر الفرص ربحية للمبدعين في وكالتنا. إليك كيفية المشاركة والنجاح.</p><h3>الحصول على الاختيار للحملات:</h3><ul><li>حافظ على محتوى عالي الجودة ومتسق</li><li>اجعل معدلات تفاعل جمهورك عالية</li><li>اتبع جميع إرشادات وسياسات الوكالة</li><li>رد بسرعة على دعوات الحملات</li></ul><h3>متطلبات الحملة:</h3><ul><li>حقق أعداد المتابعين الدنيا (يختلف حسب الحملة)</li><li>أظهر توافق العلامة التجارية مع محتواك</li><li>التزم بمواعيد التسليم</li><li>حافظ على التواصل المهني</li></ul>"
          }
        }
      }
    }
  },
  it: {
    translation: {
      "app": {
        "name": "DASHTRACER",
        "tagline": "Piattaforma di Gestione Creatori",
        "description": "Potenziare i creatori, semplificare il successo"
      },
      "auth": {
        "welcomeBack": "Bentornato",
        "signInDescription": "Accedi al tuo account per continuare",
        "continueWithTikTok": "Continua con TikTok",
        "or": "O",
        "emailOrTikTokId": "Indirizzo Email / ID TikTok",
        "password": "Password",
        "signingIn": "Accesso in corso...",
        "login": "Accedi",
        "needHelp": "Hai bisogno di aiuto? Contatta il tuo amministratore del team",
        "fillAllFields": "Si prega di compilare tutti i campi",
        "invalidCredentials": "Credenziali non valide",
        "logout": "Logout"
      },
      "common": {
        "dashboard": "Dashboard",
        "knowledgeBase": "Base di Conoscenza",
        "lightMode": "Modalità Chiara",
        "darkMode": "Modalità Scura",
        "toggleTheme": "Cambia tema",
        "language": "Lingua",
        "changeLanguage": "Cambia lingua",
        "user": "Utente",
        "logout": "Disconnetti",
        "home": "Home",
        "management": "Gestione",
        "administration": "Amministrazione"
      },
      "notifications": {
        "title": "Notifiche",
        "markAllAsRead": "Segna tutto come letto",
        "clearAll": "Cancella tutto",
        "noNotifications": "Nessuna notifica ancora",
        "justNow": "Proprio ora",
        "timeAgo": {
          "about": "circa {{time}}",
          "over": "oltre {{time}}",
          "almost": "quasi {{time}}",
          "lessThan": "meno di {{time}}"
        }
      },
      "ticketNotifications": {
        "title": "Notifiche Ticket",
        "noUnreadNotifications": "Nessuna notifica non letta",
        "noSubject": "Nessun Oggetto",
        "justNow": "Proprio ora",
        "minutesAgo": "{{count}}m fa",
        "hoursAgo": "{{count}}h fa",
        "daysAgo": "{{count}}g fa",
        "viewMoreNotifications": "Visualizza altre {{count}} notifiche",
        "viewAllTickets": "Visualizza Tutti i Ticket di Supporto",
        "priority": {
          "high": "Alta",
          "medium": "Media",
          "low": "Bassa"
        }
      },
      "profile": {
        "title": "Il Mio Profilo",
        "settings": "Impostazioni Profilo",
        "personalInfo": "Informazioni Personali",
        "changePassword": "Cambia Password",
        "editProfile": "Modifica Profilo",
        "saveChanges": "Salva Modifiche",
        "saving": "Salvataggio...",
        "cancel": "Annulla",
        "firstName": "Nome",
        "lastName": "Cognome",
        "username": "Nome Utente",
        "email": "Indirizzo Email",
        "phone": "Numero di Telefono",
        "currentPassword": "Password Attuale",
        "newPassword": "Nuova Password",
        "confirmPassword": "Conferma Nuova Password",
        "roles": {
          "admin": "Amministratore",
          "manager": "Manager",
          "sub_manager": "Sub-Manager",
          "creator": "Creatore"
        },
        "messages": {
          "updateSuccess": "Profilo aggiornato con successo!",
          "updateError": "Aggiornamento del profilo fallito",
          "emailUsernameRequired": "Email e nome utente sono richiesti",
          "invalidEmail": "Inserisci un indirizzo email valido",
          "currentPasswordRequired": "La password attuale è richiesta per cambiare la password",
          "newPasswordRequired": "È richiesta una nuova password",
          "passwordTooShort": "La nuova password deve contenere almeno 6 caratteri",
          "passwordsNotMatch": "Le nuove password non corrispondono"
        },
        "passwordNote": "Lascia vuoti i campi password se non vuoi cambiare la tua password."
      },
      "header": {
        "profileSettings": "Impostazioni Profilo",
        "managerDashboard": "Dashboard Manager",
        "logout": "Logout",
        "viewAllCreators": "Visualizza Tutti i Creatori",
        "addCreator": "Aggiungi Creatore",
        "activeCreators": "creatori attivi"
      },
      "managerDashboard": {
        "title": "Dashboard Manager",
        "refresh": "Ripristina Dati",
        "confirmReset": "Sei sicuro di voler ripristinare tutti i dati dei creatori?",
        "resetWarning": "Questa azione ripristinerà tutte le statistiche e i dati dei creatori. Questa azione non può essere annullata.",
        "cancel": "Annulla",
        "confirm": "Conferma Ripristino",
        "resetSuccess": "I dati sono stati ripristinati con successo",
        "resetError": "Errore durante il ripristino",
        "stats": {
          "totalDiamonds": "Diamanti Totali",
          "totalFollowers": "Follower Totali",
          "activeCreators": "Creatori Attivi",
          "totalCreatorsThisMonth": "Creatori Totali (Questo Mese)",
          "totalFollowersThisMonth": "Follower Totali (Questo Mese)",
          "totalViewsThisMonth": "Visualizzazioni Totali (Questo Mese)",
          "totalDiamondsThisMonth": "Diamanti Totali (Questo Mese)",
          "lastMonth": "Mese Scorso",
          "totalDiamondsPerMonth": "Diamanti Totali per Mese"
        },
        "chart": {
          "actualDiamonds": "Diamanti Effettivi",
          "targetDiamonds": "Diamanti Obiettivo"
        },
        "modals": {
          "createCampaign": "Crea Nuova Campagna",
          "createEvent": "Crea Nuovo Evento",
          "createCreator": "Crea Nuovo Creatore",
          "campaignName": "Nome Campagna",
          "description": "Descrizione",
          "budget": "Budget",
          "assignCreators": "Assegna Creatori",
          "assignCreatorsHelper": "Inserisci i nomi dei creatori separati da virgole",
          "assignCreatorsPlaceholder": "es: Emma Chen, Liam Wong, Sophia Kim",
          "startDate": "Data Inizio",
          "endDate": "Data Fine",
          "eventTitle": "Titolo Evento",
          "date": "Data",
          "time": "Ora",
          "location": "Località",
          "eventType": "Tipo Evento",
          "maxParticipants": "Partecipanti Massimi",
          "maxParticipantsPlaceholder": "Lascia vuoto per illimitato",
          "username": "Nome Utente",
          "tiktokId": "ID TikTok",
          "email": "Email",
          "phone": "Telefono",
          "followersCount": "Numero Follower",
          "contentCategory": "Categoria Contenuti",
          "creatorTier": "Livello Creatore",
          "save": "Salva",
          "cancel": "Annulla"
        },
        "eventTypes": {
          "liveStream": "Diretta Streaming",
          "workshop": "Workshop",
          "meetGreet": "Incontro e Saluto",
          "training": "Formazione",
          "contest": "Concorso"
        },
        "tiers": {
          "bronze": "Bronzo",
          "silver": "Argento",
          "gold": "Oro",
                     "platinum": "Platino"
         },
         "chart": {
           "monthlyPerformance": "Performance Mensile",
           "currentMonth": "Mese Corrente",
           "monthlyTarget": "Obiettivo Mensile",
           "growthRate": "Tasso di Crescita",
           "lastMonth": "Mese Scorso",
           "month": "Mese"
         },
         "activity": {
           "recentActivity": "Attività Recente",
           "noRecentActivity": "Nessuna attività recente da visualizzare."
         },
         "resetDialog": {
           "areYouSure": "Sei sicuro di voler ripristinare tutti i dati del profilo dei tuoi creator?",
           "dataWillBeReset": "Dati che verranno ripristinati:",
           "diamonds": "Diamanti: 0",
           "followers": "Follower: 0",
           "validLiveDays": "Giorni live validi: 0",
           "liveDuration": "Durata live: 0h 0m",
           "liveStreams": "Stream live: 0",
           "matches": "Match: 0",
           "otherMetrics": "E tutte le altre metriche...",
           "thisActionWillAffect": "Questa azione influenzerà {{count}} creator."
         },
         "creatorsBonusTable": {
           "title": "Bonus Creatori",
           "total": "Totale",
           "searchPlaceholder": "Cerca per nome, ID TikTok o programma...",
           "noCreatorsFound": "Nessun creatore trovato o nessun creatore ha dati bonus disponibili.",
           "tableHeaders": {
             "creator": "Creatore",
             "diamonds": "Diamanti",
             "days": "Giorni",
             "hours": "Ore",
             "program": "Programma",
             "rate": "Tasso",
             "bonus": "Bonus",
             "active": "Attivo",
             "actions": "Azioni"
           },
           "pagination": {
             "rowsPerPage": "Righe per pagina",
             "displayedRows": "{{from}}-{{to}} di {{count}}"
           },
           "tooltips": {
             "activeTooltip": "Attivo negli ultimi 7 giorni",
             "inactiveTooltip": "Nessuna ora valida negli ultimi 7 giorni"
           },
           "actions": {
             "message": "Messaggio",
             "sendMessage": "Invia un messaggio a {{name}}",
             "cancel": "Annulla",
             "send": "Invia",
             "sending": "Invio..."
           },
           "dialog": {
             "messageLabel": "Messaggio",
             "messagePlaceholder": "Inserisci qui il tuo messaggio..."
           },
           "notifications": {
             "enterMessage": "Inserisci un messaggio",
             "messageSentSuccess": "Messaggio inviato con successo!",
             "messageSentError": "Invio del messaggio fallito"
           }
         }
      },
      "wiki": {
        "knowledgeBase": "Base di Conoscenza",
        "dashboardKnowledgeBase": "Base di Conoscenza del Dashboard",
        "everythingYouNeedToKnow": "Tutto quello che devi sapere sul lavoro con la nostra agenzia e sul successo su TikTok",
        "searchArticles": "Cerca articoli, guide e tutorial...",
        "allContent": "Tutto il Contenuto",
        "agencyInfo": "Info Agenzia",
        "tiktokGuides": "Guide TikTok",
        "readFullArticle": "Leggi Articolo Completo"
      },
      "pages": {
        "landing": {
          "title": "Il Futuro di DASHTRACER",
          "subtitle": "Sfrutta l'analitica alimentata dall'IA, automatizza la gestione dei creatori e scala la tua agenzia verso nuove altezze con la piattaforma di gestione DASHTRACER più avanzata.",
          "shopIntegration": "🚀 Ora con Supporto per l'Integrazione DASHTRACER Shop",
          "getStarted": "Inizia Ora",
          "learnMore": "Scopri di Più"
        },
        "dashboard": {
          "title": "Dashboard",
          "welcome": "Bentornato",
          "overview": "Panoramica",
          "analytics": "Analitiche",
          "notifications": "Notifiche"
        },
        "profile": {
          "title": "Profilo",
          "personalInfo": "Informazioni Personali",
          "settings": "Impostazioni",
          "edit": "Modifica Profilo",
          "save": "Salva Modifiche",
          "cancel": "Annulla"
        },
        "support": {
          "title": "Centro di Supporto",
          "description": "Hai bisogno di aiuto? Crea un ticket di supporto e il nostro team ti assisterà il prima possibile.",
          "createTicket": "Crea Ticket di Supporto",
          "recentTickets": "I Miei Ticket Recenti",
          "noTickets": "Nessun ticket trovato. Crea il tuo primo ticket sopra."
        },
        "campaigns": {
          "title": "Gestione Campagne",
          "underDevelopment": "Questa pagina è in sviluppo",
          "description": "La pagina di Gestione Campagne fornirà una panoramica completa di tutte le campagne dell'agenzia. Gli amministratori potranno creare, modificare e monitorare tutte le attività delle campagne, con report dettagliati e metriche delle prestazioni."
        },
        "rules": {
          "title": "Gestione Regole",
          "bonusRulesManagement": "Gestione Regole Bonus",
          "description": "Crea e gestisci le regole bonus per i creator.",
          "underDevelopment": "Questa pagina è in sviluppo",
          "fullDescription": "La pagina di Gestione Regole consentirà agli amministratori di creare, modificare ed eliminare le regole bonus per i creator. L'interfaccia fornirà una vista completa di tutte le regole, con la possibilità di definire condizioni e ricompense per ogni regola."
        },
        "dataManagement": {
          "title": "Gestione Dati",
          "accessDenied": "Accesso Negato",
          "noPermission": "Non hai il permesso di accedere a questa pagina.",
          "batchImportMode": "Modalità Importazione Batch (File Multipli)",
          "uploadMultipleFiles": "Carica più file contemporaneamente per l'elaborazione batch",
          "uploadOneFile": "Carica ed elabora un file alla volta con mappatura dei campi",
          "selectDataType": "Seleziona Tipo di Dati",
          "requiredFields": "campi obbligatori",
          "template": "Template",
          "uploadFiles": "Carica File",
          "processBatch": "Elabora Batch",
          "uploadFile": "Carica File",
          "mapFields": "Mappa Campi",
          "reviewImport": "Rivedi e Importa"
        },
                 "creators": {
           "title": "Creatori",
           "management": "Gestione Creatori",
           "profile": "Profilo Creatore",
           "analytics": "Analitiche Creatore",
           "add": "Aggiungi Creatore",
           "edit": "Modifica Creatore",
           "delete": "Elimina Creatore",
           "addNew": "Aggiungi Nuovo Creatore",
           "username": "Nome Utente",
           "category": "Categoria",
           "manager": "Manager",
           "agency": "Agenzia",
           "actions": "Azioni",
           "noCreatorsFound": "Nessun creatore trovato",
           "loadingCreators": "Caricamento creatori...",
           "retry": "Riprova",
           "cancel": "Annulla",
           "addedSuccessfully": "Creatore {{name}} aggiunto con successo!",
           "validation": {
             "usernameRequired": "Nome utente è richiesto",
             "categoryRequired": "Categoria è richiesta",
             "managerRequired": "Manager è richiesto",
             "agencyRequired": "Agenzia è richiesta"
           },
           "categories": {
             "lifestyle": "Lifestyle",
             "comedy": "Commedia",
             "dance": "Danza",
             "beauty": "Bellezza",
             "fitness": "Fitness",
             "food": "Cibo",
             "gaming": "Gaming",
             "education": "Educazione"
           }
         },
        "admin": {
          "dashboard": {
            "title": "Dashboard Admin",
            "welcome": "Bentornato, {{name}}! 🚀 Gestisci la panoramica della tua piattaforma",
            "totalCreators": "Totale Creatori",
            "totalManagers": "Totale Manager",
            "platformHealth": "Salute della Piattaforma",
            "bonusRules": {
              "title": "💎 Gestione Regole Bonus",
              "description": "Configura e gestisci i programmi bonus dei creatori",
              "addNewRule": "Aggiungi Nuova Regola",
              "program": "Programma",
              "validDays": "Giorni Validi",
              "hoursRequired": "Ore Richieste",
              "rate": "Tasso",
              "actions": "Azioni",
              "addRuleDialog": "Aggiungi Nuova Regola Bonus",
              "programName": "Nome Programma",
              "validDaysRequired": "Giorni Validi Richiesti",
              "hoursRequiredField": "Ore Richieste",
              "rateField": "Tasso",
              "ruleUpdated": "Regola aggiornata con successo!",
              "ruleDeleted": "Regola eliminata con successo!",
              "ruleAdded": "Regola aggiunta con successo!"
            },
            "managersCreators": {
              "title": "👥 Manager e i Loro Creatori",
              "description": "Panoramica di tutti i manager e i loro creatori assegnati",
              "managerUsername": "Nome Utente Manager",
              "email": "Email",
              "phone": "Telefono",
              "creators": "Creatori",
              "creatorUsername": "Nome Utente Creatore",
              "liveDays": "Giorni Live",
              "diamonds": "Diamanti",
              "hours": "Ore",
              "bonus": "Bonus",
              "creatorsCount": "{{count}} creatori",
              "managersPerPage": "Manager per pagina",
              "creatorsPerPage": "Creatori per pagina"
            },
            "upload": {
              "title": "📊 Carica Dati Creatori",
              "description": "Importa dati creatori da file Excel (.xlsx, .xls)",
              "dragDrop": "Trascina e rilascia un file Excel qui, o clicca per selezionare",
              "dropping": "📁 Rilascia il file Excel qui...",
              "supportedFormats": "Formati supportati: .xlsx, .xls",
              "confirmUpload": "Conferma Caricamento",
              "confirmMessage": "Sei sicuro di voler caricare questo file?",
              "fileDetails": "Dettagli File:",
              "fileName": "Nome: {{name}}",
              "fileSize": "Dimensione: {{size}} MB",
              "fileType": "Tipo: {{type}}",
              "upload": "Carica",
              "uploading": "Caricamento in corso..."
            }
          }
        }
      },
      "forms": {
        "labels": {
          "email": "Indirizzo Email",
          "password": "Password",
          "username": "Nome Utente",
          "firstName": "Nome",
          "lastName": "Cognome",
          "phone": "Numero di Telefono",
          "title": "Titolo",
          "description": "Descrizione",
          "category": "Categoria",
          "priority": "Priorità",
          "status": "Stato"
        },
        "placeholders": {
          "enterEmail": "Inserisci la tua email",
          "enterPassword": "Inserisci la password",
          "enterUsername": "Inserisci nome utente",
          "searchPlaceholder": "Cerca..."
        },
        "buttons": {
          "submit": "Invia",
          "cancel": "Annulla",
          "save": "Salva",
          "edit": "Modifica",
          "delete": "Elimina",
          "create": "Crea",
          "update": "Aggiorna",
          "send": "Invia",
          "close": "Chiudi",
          "back": "Indietro",
          "next": "Successivo",
          "previous": "Precedente"
        }
      },
      "tickets": {
        "title": "Ticket",
        "create": "Crea Ticket",
        "submit": "Invia Ticket",
        "ticketTitle": "Titolo Ticket",
        "detailedDescription": "Descrizione Dettagliata",
        "categories": {
          "accountIssue": "Problema Account",
          "payment": "Pagamento",
          "technical": "Tecnico",
          "content": "Contenuto",
          "other": "Altro"
        },
        "priorities": {
          "low": "Bassa",
          "medium": "Media",
          "high": "Alta",
          "urgent": "Urgente"
        },
        "statuses": {
          "open": "Aperto",
          "inProgress": "In Corso",
          "resolved": "Risolto",
          "closed": "Chiuso"
        }
      },
      "navigation": {
        "home": "Home",
        "dashboard": "Dashboard",
        "profile": "Profilo",
        "creators": "Creatori",
        "events": "Eventi",
        "wiki": "Wiki",
        "contact": "Contatto",
        "support": "Supporto",
        "admin": "Amministrazione",
        "management": "Gestione",
        "tickets": "Ticket",
        "campaigns": "Campagne",
        "rules": "Regole",
        "analytics": "Analitiche",
        "manageManagers": "Gestisci Manager",
        "dataManagement": "Gestione Dati"
      },
      "userRoles": {
        "administrator": "Amministratore",
        "manager": "Manager",
        "subManager": "Sub-Manager",
        "creator": "Creatore",
        "myCreators": "I Miei Creatori",
        "assignedCreators": "Creatori Assegnati",
        "allCreators": "Tutti i Creatori"
      },
              "events": {
          "title": "Eventi Agenzia",
          "description": "Visualizza tutti gli eventi dai tuoi manager dell'agenzia",
          "calendar": "Calendario",
          "list": "Lista",
          "searchEvents": "Cerca eventi...",
          "sortByOldest": "Ordina dal più vecchio",
          "sortByNewest": "Ordina dal più recente",
          "noEventsFound": "Nessun evento trovato",
          "noEventsDescription": "Nessun evento è stato ancora creato dai manager della tua agenzia",
          "viewDetails": "Visualizza Dettagli",
          "eventDetails": "Dettagli Evento",
          "startTime": "Ora di Inizio",
          "endTime": "Ora di Fine",
          "location": "Posizione",
          "type": "Tipo",
          "general": "Generale",
          "participants": "Partecipanti",
          "participantsCount": "Partecipanti ({{count}})",
          "close": "Chiudi",
          "dayNames": {
            "sun": "Dom",
            "mon": "Lun",
            "tue": "Mar",
            "wed": "Mer",
            "thu": "Gio",
            "fri": "Ven",
            "sat": "Sab"
          }
        },
        "contact": {
          "title": "Centro Gestione Agenzia",
          "description": "Gestisci ticket di supporto ed eventi dalla tua agenzia",
          "agencyManagement": "Gestione Agenzia",
          "supportTickets": "Ticket di Supporto",
          "agencySupportTickets": "Ticket di Supporto Agenzia",
          "refresh": "Aggiorna",
          "searchTickets": "Cerca ticket...",
          "loadingTickets": "Caricamento ticket...",
          "noTicketsFound": "Nessun ticket trovato",
          "tryChangeFilters": "Prova a cambiare la tua ricerca o i filtri",
          "selectTicketToChat": "Seleziona un ticket per iniziare a chattare",
          "chooseTicketDescription": "Scegli un ticket di supporto dalla lista per vedere la conversazione",
          "createNewTicket": "Crea Nuovo Ticket di Supporto",
          "subject": "Oggetto",
          "description": "Descrizione",
          "category": "Categoria",
          "priority": "Priorità",
          "createTicket": "Crea Ticket",
          "cancel": "Annulla",
          "ticketCreatedSuccessfully": "Ticket creato con successo!",
          "failedToCreateTicket": "Creazione ticket fallita",
          "failedToFetchTickets": "Caricamento ticket fallito",
          "failedToFetchEvents": "Caricamento eventi fallito",
          "ticketStatusUpdated": "Stato ticket aggiornato con successo!",
          "failedToUpdateStatus": "Aggiornamento stato ticket fallito",
          "realTime": "Tempo reale",
          "status": {
            "all": "Tutti gli Stati",
            "open": "Aperto",
            "inProgress": "In Corso",
            "resolved": "Risolto",
            "closed": "Chiuso"
          },
          "categories": {
            "all": "Tutte le Categorie",
            "general": "Generale",
            "generalInquiry": "Richiesta Generale",
            "matchPlanning": "Pianificazione Match",
            "bugReport": "Segnalazione Bug",
            "banReport": "Segnalazione Ban",
            "departureRequest": "Richiesta Partenza"
          },
          "priorities": {
            "low": "Bassa",
            "medium": "Media",
            "high": "Alta",
            "urgent": "Urgente"
          }
        },
      "status": {
        "loading": "Caricamento...",
        "error": "Errore",
        "success": "Successo",
        "warning": "Avviso",
        "info": "Informazione",
        "notFound": "Non Trovato",
        "unauthorized": "Non Autorizzato",
        "forbidden": "Vietato"
      },
      "messages": {
        "welcome": "Benvenuto in DASHTRACER",
        "loginSuccess": "Login effettuato con successo",
        "logoutSuccess": "Logout effettuato con successo",
        "saveSuccess": "Salvato con successo",
        "deleteSuccess": "Eliminato con successo",
        "updateSuccess": "Aggiornato con successo",
        "createSuccess": "Creato con successo",
        "errorOccurred": "Si è verificato un errore",
        "noDataFound": "Nessun dato trovato",
        "confirmDelete": "Sei sicuro di voler eliminare questo elemento?",
        "unsavedChanges": "Hai modifiche non salvate. Sei sicuro di voler uscire?"
      },
      "creatorManagement": {
        "title": "Gestione Creatori",
        "allCreatorsManagement": "Gestione di Tutti i Creatori",
        "description": "Gestisci e monitora i tuoi creatori TikTok",
        "allCreatorsDescription": "Gestisci e monitora tutti i creatori TikTok della piattaforma",
        "addCreator": "Aggiungi Creatore",
        "editCreator": "Modifica Creatore",
        "addNewCreator": "Aggiungi Nuovo Creatore",
        "updateCreator": "Aggiorna Creatore",
        "deleteCreator": "Elimina Creatore",
        "confirmDeleteCreator": "Sei sicuro di voler eliminare il creatore \"{{name}}\"?",
        "searchPlaceholder": "Cerca creatori per nome o categoria...",
        "searchPlaceholderAdmin": "Cerca creatori per nome, categoria o manager...",
        "totalCreators": "Creatori Totali",
        "noCreatorsFound": "Nessun creatore trovato",
        "noCreatorsFoundDescription": "Prova a modificare i termini di ricerca o cancella la ricerca per vedere tutti i creatori",
        "noCreatorsFoundEmpty": "Inizia aggiungendo il tuo primo creatore alla piattaforma",
        "addFirstCreator": "Aggiungi il Tuo Primo Creatore",
        "loadingCreators": "Caricamento creatori...",
        "loadingCreatorsDescription": "Attendi mentre recuperiamo i tuoi creatori",
        "categories": {
          "Gaming": "Gaming",
          "Beauty": "Bellezza",
          "Lifestyle": "Stile di Vita",
          "Comedy": "Commedia",
          "Education": "Educazione",
          "Music": "Musica",
          "Dance": "Danza",
          "Food": "Cibo",
          "General": "Generale"
        },
        "fields": {
          "username": "Nome Utente",
          "tikTokId": "ID TikTok",
          "category": "Categoria",
          "followers": "Follower",
          "diamonds": "Diamanti",
          "liveDuration": "Durata Live",
          "validLiveDays": "Giorni Live Validi",
          "matches": "Partite",
          "status": "Stato",
          "manager": "Manager",
          "email": "Email",
          "phone": "Telefono",
          "actions": "Azioni"
        },
        "status": {
          "active": "Attivo",
          "inactive": "Inattivo",
          "suspended": "Sospeso"
        },
        "validation": {
          "usernameRequired": "Il nome utente è richiesto",
          "tikTokIdRequired": "L'ID TikTok è richiesto",
          "categoryRequired": "La categoria è richiesta",
          "followersRequired": "Il numero di follower è richiesto",
          "diamondsRequired": "Il numero di diamanti è richiesto"
        },
        "actions": {
          "retry": "Riprova",
          "refresh": "Aggiorna"
        }
      },
      "eventCalendar": {
        "title": "Calendario Eventi",
        "loadingCalendar": "Caricamento calendario...",
        "viewOnlyMode": "Modalità sola lettura: Puoi vedere gli eventi creati dai manager",
        "noDescription": "Nessuna descrizione",
        "legend": {
          "tournament": "Torneo",
          "challenge": "Sfida", 
          "meeting": "Riunione",
          "match": "Partita"
        },
        "stats": {
          "tournaments": "Tornei",
          "challenges": "Sfide",
          "meetings": "Riunioni",
          "matches": "Partite"
        },
        "eventTypes": {
          "liveStream": "Streaming Live",
          "workshop": "Workshop",
          "meetGreet": "Incontro e Saluto",
          "training": "Allenamento",
          "contest": "Concorso",
          "tournament": "Torneo",
          "challenge": "Sfida",
          "meeting": "Riunione",
          "match": "Partita"
        }
      },
      "events": {
        "pageTitle": "Eventi e Tornei",
        "pageSubtitle": "Partecipa a tornei, sfide ed eventi della comunità",
        "createEvent": "Crea Evento",
        "createFirstEvent": "Crea Primo Evento",
        "refresh": "Aggiorna eventi",
        "calendar": "Calendario",
        "list": "Lista",
        "close": "Chiudi",
        "cancel": "Annulla",
        "joinTournament": "Partecipa al torneo",
        "joinChallenge": "Partecipa alla sfida",
        "dateTime": "Data e Ora",
        "location": "Posizione",
        "prize": "Premio",
        "participants": "Partecipanti",
        "status": "Stato",
        "types": {
          "tournament": "torneo",
          "challenge": "sfida",
          "meeting": "riunione",
          "match": "partita",
          "liveStream": "streaming live",
          "workshop": "workshop",
          "meetGreet": "incontro e saluto",
          "training": "allenamento",
          "contest": "concorso"
        },
        "statuses": {
          "scheduled": "programmato",
          "active": "attivo",
          "completed": "completato",
          "cancelled": "annullato"
        },
        "noEvents": "Nessun evento ancora",
        "noEventsDescription": "Crea il tuo primo evento per iniziare",
        "newEventAvailable": "Nuovo Evento Disponibile",
        "newEventMessage": "Un nuovo evento è stato creato dal manager. Controlla il tuo calendario!",
        "failedToFetch": "Impossibile recuperare gli eventi. Riprova più tardi.",
        "failedToCreate": "Impossibile creare o aggiornare l'evento. Riprova.",
        "editEvent": "Modifica Evento",
        "createNewEvent": "Crea Nuovo Evento"
      },
      "contact": {
        "pageTitle": "Centro di Supporto",
        "pageSubtitle": "Ottieni aiuto e gestisci i tuoi ticket di supporto",
        "dashboard": "Dashboard",
        "support": "Supporto",
        "contactManager": "Contatta il Manager",
        "newTicket": "Nuovo Ticket",
        "realTimeSupport": "Ticket di Supporto in Tempo Reale",
        "searchTickets": "Cerca ticket...",
        "status": "Stato",
        "category": "Categoria",
        "allStatuses": "Tutti gli Stati",
        "allCategories": "Tutte le Categorie",
        "sortNewest": "Ordina per più vecchi prima",
        "sortOldest": "Ordina per più recenti prima",
        "noTicketsFound": "Nessun ticket trovato",
        "noTicketsDescription": "Prova a cambiare la ricerca o i filtri",
        "selectTicket": "Seleziona un ticket per iniziare a chattare",
        "selectTicketDescription": "Scegli un ticket di supporto dalla lista per vedere la conversazione",
        "createTicketTitle": "Crea Nuovo Ticket di Supporto",
        "subject": "Oggetto",
        "description": "Descrizione",
        "priority": "Priorità",
        "cancel": "Annulla",
        "createTicket": "Crea Ticket",
        "contactManagerTitle": "Contatta il Tuo Manager",
        "contactManagerDescription": "Invia un messaggio diretto al tuo manager:",
        "supportManager": "Manager di Supporto",
        "message": "Messaggio",
        "messagePlaceholder": "Digita il tuo messaggio qui...",
        "sendMessage": "Invia Messaggio",
        "ticketStatusUpdated": "Stato del ticket aggiornato con successo!",
        "ticketUpdateFailed": "Impossibile aggiornare lo stato del ticket",
        "realTime": "Tempo reale",
        "statuses": {
          "open": "Aperto",
          "inProgress": "In Corso",
          "resolved": "Risolto",
          "closed": "Chiuso"
        },
        "categories": {
          "general": "Richiesta Generale",
          "matchPlanning": "Pianificazione Partita",
          "bugReport": "Segnalazione Bug",
          "banReport": "Segnalazione Ban",
          "departureRequest": "Richiesta di Partenza"
        },
        "priorities": {
          "low": "Bassa",
          "medium": "Media",
          "high": "Alta",
          "urgent": "Urgente"
        }
      },
      "creatorDashboard": {
        "title": "Dashboard Creatore",
        "welcome": "Bentornato {{username}}! Ecco una panoramica delle tue performance.",
        "reportIssue": "Segnala Problema",
        "contactInformation": "📞 Informazioni di Contatto",
        "creatorDetails": "Dettagli Creatore",
        "agencySupport": "Supporto Agenzia",
        "joined": "Iscritto",
        "manager": "Manager:",
        "createTicketTitle": "Crea Nuovo Ticket di Supporto",
        "subject": "Oggetto",
        "description": "Descrizione",
        "category": "Categoria",
        "priority": "Priorità",
        "cancel": "Annulla",
        "submitting": "Invio in corso...",
        "createTicket": "Crea Ticket",
        "creatorDataNotFound": "Dati del creatore non trovati",
        "ticketCreatedSuccess": "Ticket creato con successo!",
        "ticketCreatedFailed": "Impossibile creare il ticket.",
        "subjectDescriptionRequired": "Oggetto e descrizione sono richiesti.",
        "categories": {
          "general": "Generale",
          "matchPlanning": "Pianificazione Partita",
          "bugReport": "Segnalazione Bug",
          "banReport": "Segnalazione Ban",
          "departureRequest": "Richiesta di Partenza"
        },
        "priorities": {
          "low": "Bassa",
          "medium": "Media",
          "high": "Alta",
          "urgent": "Urgente"
        }
      },
      "bonusRules": {
        "title": "Programma Bonus Agenzia",
        "description": "Le regole del programma bonus si basano sul numero di giorni validi e ore di streaming.",
        "loading": "Caricamento regole bonus...",
        "program": "Programma",
        "validDays": "Giorni Validi",
        "hours": "Ore",
        "rate": "Tasso",
        "calculationFormula": "Formula di Calcolo",
        "formulaDescription": "Il bonus è calcolato secondo la formula: <strong>Tasso applicabile × Numero di diamanti = Importo bonus in dollari</strong>",
        "example": "<strong>Esempio:</strong> Un creatore con 1M di diamanti e un tasso dello 0.03% = $300 di bonus"
      },
      "creatorBonusCard": {
        "title": "Programma Bonus",
        "subtitle": "Le tue prestazioni e ricompense",
        "noDataAvailable": "Nessuna informazione sui bonus disponibile",
        "diamond": "Diamante",
        "validDay": "Giorno Valido",
        "hours": "Ore",
        "rate": "Tasso",
        "currentBonus": "Bonus Attuale"
      },
      "landingPage": {
        "hero": {
          "chip": "🚀 Ora con Integrazione DASHTRACER Shop",
          "title": "Il Futuro di",
          "titleHighlight": "DASHTRACER",
          "subtitle": "Sfrutta l'analisi basata sull'IA, automatizza la gestione dei creator e porta la tua agenzia a nuove vette con la piattaforma di gestione DASHTRACER più avanzata.",
          "startFreeTrial": "Inizia Prova Gratuita",
          "goToDashboard": "Vai alla Dashboard",
          "watchDemo": "Guarda la Demo",
          "languageSelector": "Seleziona Lingua"
        },
        "stats": {
          "activeCreators": "Creator Attivi",
          "contentViews": "Visualizzazioni Contenuti",
          "revenueGenerated": "Entrate Generate",
          "uptime": "Tempo di Attività"
        },
        "features": {
          "title": "Funzionalità Potenti per Agenzie Moderne",
          "subtitle": "Tutto ciò di cui hai bisogno per gestire, far crescere e ottimizzare la tua agenzia di creator DASHTRACER",
          "aiAnalytics": {
            "title": "Analisi IA",
            "description": "Algoritmi avanzati di machine learning per prevedere le prestazioni dei contenuti e ottimizzare la tua strategia in tempo reale."
          },
          "creatorEcosystem": {
            "title": "Ecosistema Creator",
            "description": "Connettiti con i creator DASHTRACER di alto livello in tutto il mondo e gestisci le collaborazioni senza sforzo."
          },
          "growthAcceleration": {
            "title": "Accelerazione Crescita",
            "description": "Potenzia la crescita della tua agenzia con le nostre strategie comprovate e strumenti automatizzati."
          },
          "enterpriseSecurity": {
            "title": "Sicurezza Enterprise",
            "description": "Sicurezza a livello bancario con crittografia end-to-end per proteggere i tuoi dati preziosi e le relazioni con i creator."
          },
          "campaignAutomation": {
            "title": "Automazione Campagne",
            "description": "Automatizza l'intero ciclo di vita delle tue campagne dalla pianificazione all'esecuzione e al monitoraggio delle prestazioni."
          },
          "lightningFast": {
            "title": "Veloce come un Fulmine",
            "description": "Sperimenta prestazioni ultra-veloci con la nostra infrastruttura ottimizzata e l'elaborazione dati in tempo reale."
          }
        },
        "cta": {
          "title": "Pronto a Trasformare la Tua Agenzia?",
          "subtitle": "Unisciti a migliaia di creator e agenzie di successo che utilizzano già DASHTRACER",
          "startYourFreeTrial": "Inizia la Tua Prova Gratuita"
        },
        "dashboardPreview": "Anteprima Dashboard DASHTRACER"
      },
      "loginPage": {
        "title": "DASHTRACER",
        "subtitle": "Piattaforma di Gestione Creator",
        "tagline": "Potenziare i creator, semplificare il successo",
        "welcomeBack": "Bentornato",
        "signInMessage": "Accedi al tuo account per continuare",
        "continueWithTikTok": "Continua con TikTok",
        "or": "OPPURE",
        "emailLabel": "Indirizzo Email / ID TikTok",
        "passwordLabel": "Password",
        "signingIn": "Accesso in corso...",
        "signIn": "Accedi",
        "needHelp": "Hai bisogno di aiuto? Contatta l'amministratore del tuo team",
        "languageSelector": "Seleziona Lingua",
        "features": {
          "analytics": {
            "title": "Analisi",
            "description": "Tracciamento delle prestazioni in tempo reale"
          },
          "teamManagement": {
            "title": "Gestione Team",
            "description": "Collabora con i creator"
          },
          "contentPlanning": {
            "title": "Pianificazione Contenuti",
            "description": "Programma e organizza i contenuti"
          }
        },
        "errors": {
          "fillAllFields": "Compila tutti i campi",
          "invalidCredentials": "Credenziali non valide"
        }
      },
      "creatorProfile": {
        "title": "Profilo Creator",
        "editProfile": "Modifica Profilo",
        "saving": "Salvataggio...",
        "save": "Salva",
        "cancel": "Annulla",
        "notFound": "Non Trovato!",
        "contractDetails": "Dettagli Contratto",
        "paymentInformation": "Informazioni Pagamento",
        "editProfileInformation": "Modifica Informazioni Profilo",
        "changePassword": "Cambia Password",
        "fields": {
          "id": "ID",
          "displayName": "Nome Visualizzato",
          "username": "Username",
          "email": "Email",
          "phone": "Telefono",
          "tikTokId": "ID TikTok",
          "category": "Categoria",
          "bio": "Biografia",
          "joined": "Iscritto",
          "following": "Seguiti",
          "videos": "Video",
          "followers": "Follower",
          "likes": "Mi piace",
          "views": "Visualizzazioni",
          "contractStart": "Inizio Contratto",
          "duration": "Durata",
          "daysWithAgency": "Giorni con l'Agenzia",
          "diamondsCollected": "Diamanti Raccolti",
          "ribBankAccount": "RIB (Conto Bancario)",
          "paypalAccount": "Account PayPal",
          "currentPassword": "Password Attuale",
          "newPassword": "Nuova Password",
          "confirmNewPassword": "Conferma Nuova Password"
        },
        "categories": {
          "lifestyle": "Stile di Vita",
          "fashion": "Moda",
          "beauty": "Bellezza",
          "fitness": "Fitness",
          "food": "Cibo",
          "travel": "Viaggi",
          "tech": "Tecnologia",
          "gaming": "Gaming",
          "music": "Musica",
          "dance": "Danza",
          "comedy": "Commedia",
          "education": "Educazione",
          "business": "Business",
          "health": "Salute",
          "parenting": "Genitorialità",
          "pets": "Animali",
          "sports": "Sport",
          "art": "Arte",
          "diy": "Fai da Te",
          "automotive": "Automotive",
          "finance": "Finanza",
          "other": "Altro"
        },
        "placeholders": {
          "enterBankAccount": "Inserisci i dettagli del conto bancario"
        },
        "helperTexts": {
          "note": "Nota",
          "tikTokIdNotEditable": "L'ID TikTok non può essere modificato per motivi di sicurezza",
          "contactManagerForTikTokId": "Contatta il tuo manager se devi aggiornare il tuo ID TikTok",
          "leavePasswordFieldsEmpty": "Lascia vuoti i campi password se non vuoi cambiare la tua password",
          "onlyEditOwnProfile": "Puoi modificare solo il tuo profilo"
        },
        "errors": {
          "currentPasswordRequired": "La password attuale è richiesta per cambiare la password",
          "newPasswordRequired": "È richiesta una nuova password",
          "newPasswordTooShort": "La nuova password deve essere di almeno 6 caratteri",
          "passwordsDoNotMatch": "Le nuove password non corrispondono",
          "failedToUpdate": "Aggiornamento del profilo fallito"
        },
        "success": {
          "profileUpdated": "Profilo aggiornato con successo!"
        },
        "daysUnit": "{{count}} giorni",
        "unknownUser": "Utente Sconosciuto"
      },
      "wikiPage": {
        "dashboard": "Dashboard",
        "knowledgeBase": "Base di Conoscenza",
        "title": "Base di Conoscenza del Dashboard",
        "subtitle": "Tutto quello che devi sapere sul lavoro con la nostra agenzia e il successo su TikTok",
        "searchPlaceholder": "Cerca articoli, guide e tutorial...",
        "tabs": {
          "allContent": "Tutti i Contenuti",
          "agencyInfo": "Info Agenzia",
          "tiktokGuides": "Guide TikTok"
        },
        "categories": "Categorie",
        "searchResults": "Trovati {{count}} risultato{{plural}} per \"{{term}}\"",
        "readFullArticle": "Leggi Articolo Completo",
        "noArticlesFound": "Nessun articolo trovato",
        "noArticlesFoundDescription": "Prova ad aggiustare i termini di ricerca o naviga categorie diverse.",
        "noArticlesInCategory": "Nessun articolo disponibile in questa categoria al momento.",
        "clearSearch": "Cancella Ricerca",
        "agencyCategories": {
          "gettingStarted": {
            "title": "Iniziare",
            "description": "Scopri la nostra agenzia, come lavoriamo e cosa offriamo ai creatori."
          },
          "revenue": {
            "title": "Ricavi e Pagamenti",
            "description": "Comprendi come funzionano i pagamenti, il nostro sistema bonus e la condivisione dei ricavi."
          },
          "campaigns": {
            "title": "Campagne Brand",
            "description": "Come partecipare alle campagne brand e massimizzare i tuoi guadagni."
          },
          "policies": {
            "title": "Politiche Agenzia",
            "description": "Politiche e linee guida importanti che tutti i creatori dovrebbero seguire."
          }
        },
        "tiktokCategories": {
          "tiktokBasics": {
            "title": "Basi TikTok",
            "description": "Informazioni essenziali sulle funzionalità e caratteristiche di TikTok."
          },
          "contentStrategy": {
            "title": "Strategia Contenuti",
            "description": "Migliori pratiche per creare contenuti coinvolgenti che performano bene."
          },
          "liveStreaming": {
            "title": "Live Streaming",
            "description": "Suggerimenti e trucchi per live streaming TikTok di successo e guadagnare diamanti."
          },
          "tiktokLiveWiki": {
            "title": "TikTok LIVE Wiki per Creatori",
            "description": "Guida completa al live streaming TikTok, eligibilità, regole, monetizzazione e altro."
          },
          "tiktokAlgorithm": {
            "title": "Algoritmo e Tendenze",
            "description": "Capire come funziona l'algoritmo TikTok e rimanere al top delle tendenze."
          }
        },
        "articles": {
          "tiktokLiveEligibility": {
            "title": "Requisiti di Eligibilità per TikTok LIVE",
            "summary": "Scopri i requisiti di età e follower per qualificarti per il live streaming TikTok.",
            "content": "<h2>Requisiti di Eligibilità per un TikTok LIVE</h2><h3>Come diventare idoneo per andare LIVE su TikTok?</h3><h4>Come Fare:</h4><ul><li><strong>Avere 18 anni:</strong> Assicurati di avere almeno 18 anni. Questa è l'età minima per iniziare un LIVE.</li><li><strong>Raggiungere 1.000 follower:</strong> Ottieni almeno 1.000 follower sul tuo account. Questa è la soglia generale per sbloccare la funzione LIVE.</li><li><strong>Essere 18+ per i Regali:</strong> Se vuoi inviare o ricevere Regali durante un LIVE, devi avere 18 anni o più (o 19 in Corea del Sud).</li></ul><h4>Cosa Non Fare:</h4><ul><li><strong>Non cercare di aggirare le restrizioni di età:</strong> Qualsiasi tentativo di falsificare la tua età verrà rilevato e potrebbe portare alla sospensione dell'account.</li><li><strong>Non aspettarti di andare LIVE senza abbastanza follower:</strong> La funzione LIVE non sarà attiva se non hai raggiunto il numero di follower richiesto.</li></ul>"
          },
          "tiktokLiveContentRules": {
            "title": "Contenuto TikTok LIVE: Regole da Seguire",
            "summary": "Linee guida e regole per creare contenuto TikTok LIVE conforme ed evitare penalità.",
            "content": "<h2>Contenuto TikTok LIVE: Regole da Seguire (ed Evitare)</h2><h3>Come creare contenuto che rispetta le linee guida di TikTok ed evitare penalità?</h3><h4>Come Fare:</h4><ul><li><strong>Essere autentici e dal vivo:</strong> Mostrati dal vivo, interagisci e assicura la tua presenza visibile sullo schermo.</li><li><strong>Rispettare i diritti d'autore:</strong> Usa solo contenuto (musica, immagini) per cui hai i diritti.</li><li><strong>Mantenere un comportamento positivo:</strong> Usa un linguaggio rispettoso e una condotta appropriata.</li></ul><h4>Cosa Non Fare:</h4><ul><li><strong>Non trasmettere contenuto pre-registrato:</strong> I LIVE devono essere trasmissioni in tempo reale.</li><li><strong>Non usare schermi vuoti o statici:</strong> Evita schermi neri, immagini ferme o codici QR senza interazione.</li><li><strong>Non essere assente troppo a lungo:</strong> Rimani presente e coinvolto con il tuo pubblico.</li><li><strong>Non reindirizzare fuori da TikTok:</strong> Evita di mostrare link o informazioni che spingono gli utenti verso altre piattaforme.</li><li><strong>Non violare le regole sui contenuti sensibili:</strong> Divieto rigoroso di nudità, atti sessuali, violenza, molestie, discorsi d'odio, disinformazione o promozione di prodotti regolamentati (alcol, droghe, armi, ecc.).</li></ul>"
          },
          "tiktokLiveMonetization": {
            "title": "Monetizzare il tuo TikTok LIVE: Come Funziona",
            "summary": "Scopri come i Regali LIVE possono diventare una fonte di reddito e massimizza i tuoi guadagni.",
            "content": "<h2>Monetizzare il tuo TikTok LIVE: Come Funziona</h2><h3>Come possono i Regali LIVE diventare una fonte di reddito?</h3><h4>Come Fare:</h4><ul><li><strong>Incoraggia i Regali:</strong> Coinvolgi il tuo pubblico e crea contenuto di qualità per incoraggiare gli spettatori a inviarti regali.</li><li><strong>Ringrazia i donatori:</strong> Esprimi la tua gratitudine dal vivo alle persone che ti fanno regali.</li><li><strong>Crea contenuto di valore:</strong> Più il tuo LIVE è interessante e divertente, più è probabile che riceverai regali.</li></ul><h4>Cosa Non Fare:</h4><ul><li><strong>Non forzare le donazioni:</strong> Evita richieste aggressive o ripetitive di regali.</li><li><strong>Non violare le regole per la monetizzazione:</strong> Qualsiasi violazione delle linee guida renderà il tuo LIVE non idoneo per la monetizzazione.</li><li><strong>Non produrre contenuto di bassa qualità:</strong> LIVE non autentici o di bassa qualità non verranno monetizzati.</li></ul><h2>Esplorare Altre Strade di Monetizzazione su TikTok LIVE</h2><h3>Come diversificare il tuo reddito oltre i Regali LIVE?</h3><h4>Come Fare:</h4><ul><li><strong>Usa TikTok Shop nel LIVE:</strong> Se vendi prodotti, integra TikTok Shop nel tuo LIVE per dimostrazioni dal vivo e vendite dirette.</li><li><strong>Cerca partnership con brand:</strong> Collabora con brand per LIVE sponsorizzati o posizionamenti di prodotti.</li><li><strong>Impegnati nel marketing di affiliazione:</strong> Promuovi prodotti di altri brand usando un link unico per guadagnare una commissione sulle vendite.</li><li><strong>Utilizza il Programma Ricompense Creator:</strong> Crea video più lunghi di un minuto per potenzialmente generare reddito basato su visualizzazioni e coinvolgimento.</li><li><strong>Offri Abbonamenti LIVE:</strong> Fornisci contenuto esclusivo ai tuoi fan più fedeli tramite un abbonamento a pagamento.</li></ul><h4>Cosa Non Fare:</h4><ul><li><strong>Non limitarti a un'unica fonte di reddito:</strong> Esplora e diversifica le tue opzioni di monetizzazione.</li><li><strong>Non promuovere prodotti irrilevanti:</strong> Assicurati che i prodotti si allineino con la tua nicchia e l'interesse del pubblico.</li><li><strong>Non violare le regole di trasparenza:</strong> Comunica sempre contenuto sponsorizzato o di affiliazione.</li></ul>"
          },
          "tiktokLiveBestPractices": {
            "title": "TikTok LIVE: Migliori Pratiche per il Successo",
            "summary": "Suggerimenti e strategie essenziali per rendere i tuoi live streaming TikTok più coinvolgenti e di successo.",
            "content": "<h2>TikTok LIVE: Migliori Pratiche per il Successo</h2><h3>Come massimizzare il coinvolgimento e il successo durante i tuoi stream LIVE?</h3><h4>Prima di Andare LIVE:</h4><ul><li><strong>Pianifica il tuo contenuto:</strong> Abbi un'idea approssimativa di cosa vuoi parlare o fare durante il tuo stream.</li><li><strong>Annuncia il tuo LIVE in anticipo:</strong> Usa post regolari per far sapere ai tuoi follower quando andrai LIVE.</li><li><strong>Scegli il timing ottimale:</strong> Trasmetti quando il tuo pubblico è più attivo (controlla le tue analisi).</li><li><strong>Prepara la tua configurazione:</strong> Assicurati di avere una buona illuminazione, audio chiaro e una connessione internet stabile.</li></ul><h4>Durante il tuo LIVE:</h4><ul><li><strong>Saluta gli spettatori per nome:</strong> Accogli le persone che si uniscono per creare una connessione personale.</li><li><strong>Leggi e rispondi ai commenti:</strong> Il coinvolgimento attivo mantiene gli spettatori interessati e incoraggia la partecipazione.</li><li><strong>Mantieni l'energia alta:</strong> Sii entusiasta e mantieni un atteggiamento positivo durante tutto lo stream.</li><li><strong>Usa funzioni interattive:</strong> Sondaggi, Q&A e sfide possono aumentare il coinvolgimento.</li><li><strong>Collabora con altri creator:</strong> LIVE multi-utente possono espandere la tua portata.</li></ul><h4>Cosa Non Fare:</h4><ul><li><strong>Non ignorare il tuo pubblico:</strong> Non riuscire a interagire con gli spettatori li farà andare via.</li><li><strong>Non avere lunghi periodi di silenzio:</strong> Continua a parlare anche quando ci sono pochi spettatori.</li><li><strong>Non finire bruscamente:</strong> Avvisa gli spettatori prima di terminare il tuo stream e ringraziali per aver guardato.</li><li><strong>Non fare troppe cose contemporaneamente:</strong> Rimani concentrato sul tuo pubblico piuttosto che fare altre attività.</li></ul><h4>Post-LIVE:</h4><ul><li><strong>Salva i momenti salienti:</strong> Crea clip brevi dal tuo LIVE da pubblicare come contenuto normale.</li><li><strong>Ringrazia il tuo pubblico:</strong> Pubblica un follow-up ringraziando gli spettatori e chi ha inviato regali.</li><li><strong>Analizza le prestazioni:</strong> Rivedi le analisi del tuo LIVE per migliorare i stream futuri.</li></ul>"
          },
          "agencyRevenueSharing": {
            "title": "Comprendere la Condivisione dei Ricavi",
            "summary": "Scopri come funziona il nostro modello di condivisione dei ricavi e come massimizzare i tuoi guadagni.",
            "content": "<h2>Comprendere la Condivisione dei Ricavi</h2><p>La nostra agenzia opera su un modello di condivisione dei ricavi trasparente progettato per ricompensare i creator equamente supportando le operazioni dell'agenzia e le iniziative di crescita.</p><h3>Ripartizione della Divisione dei Ricavi:</h3><ul><li><strong>Quota Creator: 70%</strong> - La maggioranza va direttamente a te</li><li><strong>Supporto Agenzia: 20%</strong> - Copre gestione, marketing e supporto tecnico</li><li><strong>Commissioni Piattaforma: 10%</strong> - Commissioni di elaborazione piattaforma standard del settore</li></ul><h3>Come Funzionano i Pagamenti:</h3><p>I pagamenti vengono elaborati mensilmente, con i guadagni del mese precedente pagati entro il 15 del mese corrente. Tutti i pagamenti sono tracciati trasparentemente nella tua dashboard creator.</p>"
          },
          "brandCampaignParticipation": {
            "title": "Come Partecipare alle Campagne Brand",
            "summary": "Guida passo-passo per unirti e avere successo nelle campagne di partnership brand.",
            "content": "<h2>Come Partecipare alle Campagne Brand</h2><p>Le campagne brand sono una delle opportunità più lucrative per i creator nella nostra agenzia. Ecco come essere coinvolti e avere successo.</p><h3>Essere Selezionati per le Campagne:</h3><ul><li>Mantieni contenuto consistente e di alta qualità</li><li>Mantieni alti i tassi di coinvolgimento del pubblico</li><li>Segui tutte le linee guida e politiche dell'agenzia</li><li>Rispondi prontamente agli inviti delle campagne</li></ul><h3>Requisiti delle Campagne:</h3><ul><li>Soddisfa i conteggi minimi di follower (varia per campagna)</li><li>Dimostra allineamento del brand con il tuo contenuto</li><li>Impegnati a rispettare le scadenze di consegna</li><li>Mantieni comunicazione professionale</li></ul>"
          }
        }
      }
    }
  }
};

console.log('Initializing i18n with resources:', Object.keys(resources));

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    debug: true,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    ns: ['translation'],
    defaultNS: 'translation',
    supportedLngs: ['en', 'fr', 'ar', 'it'],
    
    saveMissing: true,
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: ${key} for language: ${lng}`);
    },
  }, (err, t) => {
    if (err) {
      console.error('i18n initialization error:', err);
    } else {
      console.log('i18n initialized successfully!');
      console.log('Available languages:', i18n.languages);
      console.log('Current language:', i18n.language);
      console.log('Test translation:', t('app.name'));
    }
  });

export default i18n;

