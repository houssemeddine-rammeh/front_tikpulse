// Header component for DASHTRACER Platform - Enhanced Responsive Design
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Divider,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Badge,
  Collapse,
  ListItemButton,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Dashboard as DashboardIcon,
  Person as ProfileIcon,
  Event as EventIcon,
  HelpOutline as WikiIcon,
  ContactSupportOutlined as ContactIcon,
  ExitToApp as LogoutIcon,
  AccountCircle as ResumeIcon,
  Home as HomeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  MonetizationOn as SponsorshipIcon,
  Storage as DataIcon,
  EmojiEvents as StandingIcon,
  People as PeopleIcon,
  ExpandLess,
  ExpandMore,
  Close as CloseIcon,
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useTheme } from "../../contexts/ThemeContext";
import { UserRole } from "../../types";
import NotificationCenter from "../notifications/NotificationCenter";
import TicketNotificationBadge from "../notifications/TicketNotificationBadge";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { mode, toggleMode } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.down("lg"));

  // Get user display name and first letter for avatar
  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.username || user.name || user.email || "User";
  };

  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  // User menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  // Mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Notification menu
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const openNotifications = Boolean(notificationAnchorEl);

  // Creators menu
  const [creatorsAnchorEl, setCreatorsAnchorEl] = useState(null);
  const openCreatorsMenu = Boolean(creatorsAnchorEl);

  // Mobile menu sections
  const [managementOpen, setManagementOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate("/login");
  };

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleCreatorsMenuOpen = (event) => {
    setCreatorsAnchorEl(event.currentTarget);
  };

  const handleCreatorsMenuClose = () => {
    setCreatorsAnchorEl(null);
  };

  // Define the main navigation items
  const mainNavItems = [
    {
      title: "Home",
      path: user
        ? user.role === UserRole.ADMIN
          ? "/admin/dashboard"
          : user.role === UserRole.MANAGER || user.role === UserRole.SUB_MANAGER
          ? "/manager/dashboard"
          : "/creator/dashboard"
        : "/creator/dashboard",
      icon: <HomeIcon />,
      roles: [
        UserRole.CREATOR,
        UserRole.MANAGER,
        UserRole.SUB_MANAGER,
        UserRole.ADMIN,
      ],
    },
    {
      title: "Creator Profile",
      path: "/creator/profile",
      icon: <ProfileIcon />,
      roles: [UserRole.CREATOR],
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <ProfileIcon />,
      roles: [UserRole.MANAGER, UserRole.SUB_MANAGER, UserRole.ADMIN],
    },
    {
      title: "Events",
      path: "/events",
      icon: <EventIcon />,
      roles: [
        UserRole.CREATOR,
        UserRole.MANAGER,
        UserRole.SUB_MANAGER,
        UserRole.ADMIN,
      ],
    },

    {
      title: "Wiki",
      path: "/wiki",
      icon: <WikiIcon />,
      roles: [UserRole.CREATOR],
    },
    {
      title: "Contact",
      path: "/contact",
      icon: <ContactIcon />,
      roles: [
        UserRole.CREATOR,
        UserRole.MANAGER,
        UserRole.SUB_MANAGER,
        UserRole.ADMIN,
      ],
    },
  ];

  // Management navigation items for managers and admins
  const managementNavItems = [
    {
      title: "Creators",
      path: "/creators",
      icon: <GroupIcon />,
      roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUB_MANAGER],
      adminPath: "/admin/creators", // Special path for admin users
    },
    {
      title: "Tickets",
      path: "/manager/tickets",
      icon: <ContactIcon />,
      roles: [UserRole.MANAGER, UserRole.SUB_MANAGER],
    },
  ];

  // Admin-only navigation items
  const adminNavItems = [
    {
      title: "Manage Managers",
      path: "/admin/managers",
      icon: <ProfileIcon />,
      roles: [UserRole.ADMIN],
    },
    {
      title: "Contact",
      path: "/admin/contact",
      icon: <ContactIcon />,
      roles: [UserRole.ADMIN],
    },
    {
      title: "Data Management",
      path: "/admin/data-management",
      icon: <DataIcon />,
      roles: [UserRole.ADMIN],
    },
  ];

  // Filter navigation items based on user role
  const filteredMainNavItems = mainNavItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const filteredManagementNavItems = managementNavItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const filteredAdminNavItems = adminNavItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h6" component="div">
          DASHTRACER
        </Typography>
        <IconButton
          onClick={() => toggleDrawer(false)}
          sx={{ color: "white" }}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* User Info Section */}
      {user && (
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.50",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Avatar
              sx={{ width: 40, height: 40, bgcolor: "primary.main", mr: 2 }}
            >
              {getUserInitial()}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                {getUserDisplayName()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.role === UserRole.ADMIN
                  ? "Administrator"
                  : user.role === UserRole.MANAGER
                  ? "Manager"
                  : user.role === UserRole.SUB_MANAGER
                  ? "Sub-Manager"
                  : "Creator"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Divider />

      {/* Main Navigation */}
      <List sx={{ py: 0 }}>
        {filteredMainNavItems.map((item) => {
          const itemPath = item.title === "Contact" && user?.role === UserRole.ADMIN ? "/admin/contact" : item.path;
          const isActive = location.pathname === itemPath;
          
          return (
            <ListItemButton
              component={Link}
              to={itemPath}
              key={item.title}
              onClick={() => toggleDrawer(false)}
              sx={{
                py: 1.5,
                bgcolor: isActive ? "primary.light" : "transparent",
                color: isActive ? "primary.contrastText" : "inherit",
                "&:hover": {
                  bgcolor: isActive ? "primary.light" : "grey.100",
                },
              }}
            >
            <ListItemIcon
              sx={{
                color: isActive ? "primary.contrastText" : "inherit",
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: isActive ? "bold" : "normal",
              }}
            />
          </ListItemButton>
        );
        })}
      </List>

      {/* Management Section */}
      {filteredManagementNavItems.length > 0 && (
        <>
          <Divider />
          <ListItemButton onClick={() => setManagementOpen(!managementOpen)}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              primary="Management"
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: "bold",
              }}
            />
            {managementOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={managementOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {filteredManagementNavItems.map((item) => {
                const itemPath = (user?.role === UserRole.ADMIN && item.adminPath) ? item.adminPath : item.path;
                const isActive = location.pathname === itemPath;
                
                return (
                  <ListItemButton
                    component={Link}
                    to={itemPath}
                    key={item.title}
                    onClick={() => toggleDrawer(false)}
                    sx={{
                      pl: 4,
                      py: 1,
                      bgcolor: isActive ? "primary.light" : "transparent",
                      color: isActive ? "primary.contrastText" : "inherit",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "primary.contrastText" : "inherit",
                        minWidth: 40,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: "0.9rem",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </>
      )}

      {/* Admin Section */}
      {filteredAdminNavItems.length > 0 && (
        <>
          <Divider />
          <ListItemButton onClick={() => setAdminOpen(!adminOpen)}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DataIcon />
            </ListItemIcon>
            <ListItemText
              primary="Administration"
              primaryTypographyProps={{
                fontSize: "0.95rem",
                fontWeight: "bold",
              }}
            />
            {adminOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={adminOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {filteredAdminNavItems.map((item) => (
                <ListItemButton
                  component={Link}
                  to={item.path}
                  key={item.title}
                  onClick={() => toggleDrawer(false)}
                  sx={{
                    pl: 4,
                    py: 1,
                    bgcolor:
                      location.pathname === item.path
                        ? "primary.light"
                        : "transparent",
                    color:
                      location.pathname === item.path
                        ? "primary.contrastText"
                        : "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.path
                          ? "primary.contrastText"
                          : "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight:
                        location.pathname === item.path ? "bold" : "normal",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </>
      )}

      <Box sx={{ flexGrow: 1 }} />

      {/* Bottom Actions */}
      <Divider />
      <List sx={{ py: 0 }}>
        <ListItemButton onClick={toggleMode} sx={{ py: 1.5 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText
            primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
            primaryTypographyProps={{ fontSize: "0.95rem" }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            toggleDrawer(false);
            handleLogout();
          }}
          sx={{ py: 1.5, color: "error.main" }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: "error.main" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: "0.95rem" }}
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={1}
      sx={{
        color: "white",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant={isMobile ? "h6" : "h5"}
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
            fontWeight: "bold",
          }}
        >
          {isMobile ? "DASHTRACER" : "DASHTRACER"}
        </Typography>

        {/* Desktop Navigation - Main Navigation */}
        {!isMobile && user && (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              gap: { md: 1, lg: 2 },
              justifyContent: "center",
              mx: 2,
            }}
          >
            {/* Home Button */}
            <Tooltip title="Home">
              <Button
                color="inherit"
                component={Link}
                to={
                  user.role === UserRole.ADMIN
                    ? "/admin/dashboard"
                    : user.role === UserRole.MANAGER ||
                      user.role === UserRole.SUB_MANAGER
                    ? "/manager/dashboard"
                    : "/creator/dashboard"
                }
                sx={{
                  minWidth: "auto",
                  px: { md: 1.5, lg: 2 },
                  py: 0.5,
                  borderRadius: 1,
                  textTransform: "none",
                  fontSize: { md: "0.85rem", lg: "0.9rem" },
                  bgcolor: location.pathname.includes("/dashboard")
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
                startIcon={<HomeIcon sx={{ fontSize: "1.1rem" }} />}
              >
                {isTablet ? "" : "Home"}
              </Button>
            </Tooltip>

            {/* Events Button */}
            {(user.role === UserRole.MANAGER ||
              user.role === UserRole.CREATOR ||
              user.role === UserRole.ADMIN) && (
              <Tooltip title="Events">
                <Button
                  color="inherit"
                  component={Link}
                  to={user.role === UserRole.ADMIN ? "/admin/events" : "/events"}
                  sx={{
                    minWidth: "auto",
                    px: { md: 1.5, lg: 2 },
                    py: 0.5,
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: { md: "0.85rem", lg: "0.9rem" },
                    bgcolor:
                      (user.role === UserRole.ADMIN ? location.pathname === "/admin/events" : location.pathname === "/events")
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  startIcon={<EventIcon sx={{ fontSize: "1.1rem" }} />}
                >
                  {isTablet ? "" : "Events"}
                </Button>
              </Tooltip>
            )}

            {/* Creators Button - For managers and admins */}
            {(user.role === UserRole.MANAGER ||
              user.role === UserRole.SUB_MANAGER ||
              user.role === UserRole.ADMIN) && (
              <Tooltip title="Creators">
                <Button
                  color="inherit"
                  component={Link}
                  to={user.role === UserRole.ADMIN ? "/admin/creators" : "/creators"}
                  sx={{
                    minWidth: "auto",
                    px: { md: 1.5, lg: 2 },
                    py: 0.5,
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: { md: "0.85rem", lg: "0.9rem" },
                    bgcolor:
                      (user.role === UserRole.ADMIN ? location.pathname === "/admin/creators" : location.pathname === "/creators")
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  startIcon={<GroupIcon sx={{ fontSize: "1.1rem" }} />}
                >
                  {isTablet ? "" : "Creators"}
                </Button>
              </Tooltip>
            )}

            {/* Wiki Button - Only for creators */}
            {user.role === UserRole.CREATOR && (
              <Tooltip title="Wiki">
                <Button
                  color="inherit"
                  component={Link}
                  to="/wiki"
                  sx={{
                    minWidth: "auto",
                    px: { md: 1.5, lg: 2 },
                    py: 0.5,
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: { md: "0.85rem", lg: "0.9rem" },
                    bgcolor:
                      location.pathname === "/wiki"
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  startIcon={<WikiIcon sx={{ fontSize: "1.1rem" }} />}
                >
                  {isTablet ? "" : "Wiki"}
                </Button>
              </Tooltip>
            )}

            {(user.role === UserRole.MANAGER ||
              user.role === UserRole.CREATOR ||
              user.role === UserRole.ADMIN) && (
              <Tooltip title="Contact">
                <Button
                  color="inherit"
                  component={Link}
                  to={user.role === UserRole.ADMIN ? "/admin/contact" : "/contact"}
                  sx={{
                    minWidth: "auto",
                    px: { md: 1.5, lg: 2 },
                    py: 0.5,
                    borderRadius: 1,
                    textTransform: "none",
                    fontSize: { md: "0.85rem", lg: "0.9rem" },
                    bgcolor:
                      (user.role === UserRole.ADMIN ? location.pathname === "/admin/contact" : location.pathname === "/contact")
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  startIcon={<ContactIcon sx={{ fontSize: "1.1rem" }} />}
                >
                  {isTablet ? "" : "Contact"}
                </Button>
              </Tooltip>
            )}
          </Box>
        )}

        {/* Right side actions */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {!isMobile && (
            <IconButton
              onClick={toggleMode}
              color="inherit"
              size={isMobile ? "small" : "medium"}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          )}

          {user && (
            <>
              <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 } }}>
                <TicketNotificationBadge />
                <NotificationCenter />
              </Box>

              {/* Manager Profile Info - Hidden on mobile and tablet */}
              {(user.role === UserRole.MANAGER ||
                user.role === UserRole.SUB_MANAGER) &&
                !isTablet && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mx: 2,
                      color: "white",
                      maxWidth: 200,
                    }}
                  >
                    <Box sx={{ textAlign: "right", mr: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.85rem",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {user?.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.7rem",
                          opacity: 0.8,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {user.role}
                      </Typography>
                    </Box>
                  </Box>
                )}

              <IconButton
                onClick={handleProfileMenuOpen}
                size={isMobile ? "small" : "medium"}
                sx={{ ml: { xs: 0.5, sm: 1 } }}
                aria-controls={openUserMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    width: { xs: 28, sm: 32 },
                    height: { xs: 28, sm: 32 },
                    bgcolor: "white",
                    color: "#6200ea",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {getUserInitial()}
                </Avatar>
              </IconButton>
            </>
          )}
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              maxWidth: "85vw",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Profile Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={openUserMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "profile-button",
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              width: {
                xs: 250,
                sm:
                  user?.role === UserRole.MANAGER ||
                  user?.role === UserRole.SUB_MANAGER
                    ? 280
                    : 200,
              },
              maxWidth: "90vw",
              borderRadius: 2,
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* Profile Header */}
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: "#6200ea" }}>
                {getUserInitial()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {getUserDisplayName()}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  {user?.role === UserRole.MANAGER
                    ? "Manager"
                    : user?.role === UserRole.SUB_MANAGER
                    ? "Sub-Manager"
                    : user?.role === UserRole.ADMIN
                    ? "Administrator"
                    : "Creator"}
                </Typography>
                {(user?.role === UserRole.MANAGER ||
                  user?.role === UserRole.SUB_MANAGER) && (
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
                  >
                    ID: {user?.tikTokId || "N/A"}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Profile Menu Items */}
          {console.log(user)}
          <MenuItem
            component={Link}
            to={
              user?.role === UserRole.CREATOR && user?.tikTokId
                ? `/profile/${user.tikTokId}`
                : "/profile"
            }
            onClick={handleMenuClose}
          >
            <ListItemIcon>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Profile Settings</Typography>
            </ListItemText>
          </MenuItem>

          {user?.role === UserRole.MANAGER ||
          user?.role === UserRole.SUB_MANAGER ? (
            <>
              <MenuItem
                component={Link}
                to="/manager/dashboard"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">Manager Dashboard</Typography>
                </ListItemText>
              </MenuItem>

              <MenuItem
                component={Link}
                to="/creators"
                onClick={handleCreatorsMenuOpen}
              >
                <ListItemIcon>
                  <GroupIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2">
                    {user?.role === UserRole.MANAGER
                      ? "My Creators"
                      : "Assigned Creators"}
                  </Typography>
                </ListItemText>
              </MenuItem>
            </>
          ) : null}

          {/* Mobile-only theme toggle */}
          {isMobile && (
            <MenuItem
              onClick={() => {
                toggleMode();
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                {mode === "dark" ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body2">
                  {mode === "dark" ? "Light Mode" : "Dark Mode"}
                </Typography>
              </ListItemText>
            </MenuItem>
          )}

          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Logout</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>

        {/* Creators Menu */}
        <Menu
          id="creators-menu"
          anchorEl={creatorsAnchorEl}
          open={openCreatorsMenu}
          onClose={handleCreatorsMenuClose}
          MenuListProps={{
            "aria-labelledby": "creators-button",
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              width: 350,
              maxWidth: "90vw",
              borderRadius: 2,
              overflow: "visible",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: "50%",
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) translateX(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #e0e0e0",
              bgcolor: "primary.main",
              color: "white",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.role === UserRole.ADMIN ? "All Creators" : "My Creators"}
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontSize: "0.8rem" }}
            >
              {/* topCreators.length */} active creators
            </Typography>
          </Box>

          {/* Top Creators List */}

          <Divider />

          {/* Footer Actions */}
          <Box sx={{ p: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              component={Link}
              to="/creators"
              onClick={handleCreatorsMenuClose}
              startIcon={<GroupIcon />}
              sx={{ mb: 1 }}
            >
              View All Creators
            </Button>
            {user?.role === UserRole.ADMIN && (
              <Button
                fullWidth
                variant="contained"
                size="small"
                startIcon={<PersonAddIcon />}
                onClick={() => {
                  handleCreatorsMenuClose();
                  navigate("/admin/creators/add");
                }}
              >
                Add Creator
              </Button>
            )}
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
