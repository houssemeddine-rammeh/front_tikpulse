/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { connectSocket } from "./api/socketInstance";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import TikTokCallbackPage from "./pages/TikTokCallbackPage";
import CreatorDashboardPage from "./pages/CreatorDashboardPage";
import CreatorDashboardPageRedux from "./pages/CreatorDashboardPageRedux";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import { AuthProvider } from "./contexts/AuthContext";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
import CampaignManagementPage from "./pages/CampaignManagementPage";
import CreatorManagementPage from "./pages/CreatorManagementPage";
import CompanyManagementPage from "./pages/CompanyManagementPage";
import CreatorAnalyticsPage from "./pages/CreatorAnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import CreatorProfilePage from "./pages/CreatorProfilePage";
import CreatorResumePage from "./pages/CreatorResumePage";
import SupportPage from "./pages/SupportPage";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import DebugPage from "./pages/DebugPage";
import EventsPage from "./pages/EventsPage";
import WikiPage from "./pages/WikiPage";
import StandingPage from "./pages/StandingPage";
import BonusRulesPage from "./pages/BonusRulesPage";
import ContactPage from "./pages/ContactPage";
import LoadingScreen from "./components/LoadingScreen";
import Profile from "./pages/profile";
import { useSelector } from "react-redux";
import ManagerDashboardPageRedux from "./pages/ManagerDashboardPageRedux";
import NotificationPrompt from "./notificationPrompt";
// TikTok Theme Colors
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF0050", // TikTok Pink
      light: "#FF3366",
      dark: "#CC003D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#25F4EE", // TikTok Cyan
      light: "#4DF5F1",
      dark: "#1DC4BE",
      contrastText: "#000000",
    },
    background: {
      default: "#000000",
      paper: "#161823",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A8A8A8",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        },
      },
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useSelector((state) => state.auth);
  const userRole = user?.role;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const userRole = user?.role;

  if (token && userRole) {
    // Redirect to appropriate dashboard based on role
    switch (userRole) {
      case "creator":
        return <Navigate to="/creator/dashboard" replace />;
      case "manager":
      case "sub_manager":
        return <Navigate to="/manager/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "super_admin":
        return <Navigate to="/superadmin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  const UserRole = {
    ADMIN: "admin",
    MANAGER: "manager",
    SUB_MANAGER: "sub_manager",
    CREATOR: "creator",
    SUPER_ADMIN: "super_admin",
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      connectSocket(token);
    }
  }, []);

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(error => {
          console.log('SW registration failed: ', error);
        });
    });
  }

  return (
    <Provider store={store}>
      <NotificationPrompt></NotificationPrompt>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeProvider>
            <Router>
              <AuthProvider>
                <NotificationProvider>
                  <Routes>
                    {/* Public Routes */}
                    <Route
                      path="/"
                      element={
                        <PublicRoute>
                          <LandingPage />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <PublicRoute>
                          <LoginPage />
                        </PublicRoute>
                      }
                    />
                    <Route
                      path="/auth/tiktok/callback"
                      element={<TikTokCallbackPage />}
                    />

                    {/* Creator Routes */}
                    <Route
                      path="/creator/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <CreatorDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/creator/profile/:id"
                      element={
                        <ProtectedRoute allowedRoles={["creator", "manager"]}>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/creator/dashboard-redux"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <CreatorDashboardPageRedux />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/creator/profile"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <CreatorProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/creator/resume"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <CreatorResumePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/creator/analytics"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <CreatorAnalyticsPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Manager Routes (Brand/Agency) */}
                    <Route
                      path="/manager/dashboard"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager"]}
                        >
                          <ManagerDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/manager/campaigns"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager"]}
                        >
                          <CampaignManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/manager/creators"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager"]}
                        >
                          <CreatorManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/manager/companies"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager"]}
                        >
                          <CompanyManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/manager/analytics"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager"]}
                        >
                          <CreatorAnalyticsPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Routes */}
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/campaigns"
                      element={
                        <ProtectedRoute allowedRoles={["admin", "manager"]}>
                          <CampaignManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/creators"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <CreatorManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/companies"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <CompanyManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/analytics"
                      element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                          <CreatorAnalyticsPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Shared Routes - accessible by multiple roles */}
                    <Route
                      path="/events"
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            "creator",
                            "manager",
                            "sub_manager",
                            "admin",
                          ]}
                        >
                          <EventsPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/wiki"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <WikiPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/standing"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager", "admin"]}
                        >
                          <StandingPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/bonus-rules"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager", "admin"]}
                        >
                          <BonusRulesPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            "creator",
                            "manager",
                            "sub_manager",
                            "admin",
                          ]}
                        >
                          <ContactPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/creators"
                      element={
                        <ProtectedRoute
                          allowedRoles={["manager", "sub_manager", "admin"]}
                        >
                          <CreatorManagementPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            "creator",
                            "manager",
                            "sub_manager",
                            "admin",
                          ]}
                        >
                          <ProfilePage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/resume"
                      element={
                        <ProtectedRoute allowedRoles={["creator"]}>
                          <CreatorResumePage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Protected Routes */}
                    <Route
                      path="/creator/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.CREATOR]}>
                          <CreatorDashboardPageRedux />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/manager/dashboard"
                      element={
                        <ProtectedRoute
                          allowedRoles={[
                            UserRole.MANAGER,
                            UserRole.SUB_MANAGER,
                          ]}
                        >
                          <ManagerDashboardPageRedux />
                        </ProtectedRoute>
                      }
                    />

                    {/* Legacy dashboard routes - keep for backwards compatibility */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute allowedRoles={[UserRole.CREATOR]}>
                          <CreatorDashboardPageRedux />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </NotificationProvider>
              </AuthProvider>
            </Router>
          </ThemeProvider>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
