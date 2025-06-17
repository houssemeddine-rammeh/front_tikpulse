import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  Grid,
  Avatar,
  Button,
  TextField,
  Divider,
  Card,
  CardContent,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
} from "@mui/material";
import {
  NavigateNext,
  Person,
  Edit,
  SaveAlt,
  Cancel,
  Email,
  Phone,
  Language,
  AccountCircle,
  Key,
  Notifications,
  Security,
  Help,
  CalendarToday,
  People,
  VideoLibrary,
  Favorite,
  Visibility,
  AccountBalance,
  Payment,
  Diamond,
  Business,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../components/layout/Layout";

const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // Enhanced profile data with all requested information
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "John Creator",
    username: user?.username || "johncreator",
    email: user?.email || "john.creator@example.com",
    phone: "+1 (555) 123-4567",
    bio:
      user?.role === "admin"
        ? "System Administrator managing the TikTok Agency platform."
        : user?.role === "manager"
        ? "Senior Manager at TikPulse Digital Agency. Managing top-tier creators and brand partnerships since 2022."
        : user?.role === "sub_manager"
        ? "Sub-Manager at TikPulse Digital Agency. Supporting creator development and campaign execution."
        : "TikTok creator specializing in comedy and lifestyle content. Working with top brands since 2020.",
    tiktokUrl: "https://tiktok.com/@johncreator",
    instagramUrl: "https://instagram.com/johncreator",
    // Social Media Stats (for creators)
    joinedDate: "January 15, 2024",
    following: "1,234",
    videos: "456",
    followers: "125,000",
    likes: "2.5M",
    views: "15.8M",
    // Contract Details (for creators)
    contractStartDate: "January 15, 2024",
    contractDuration: "12 months",
    daysWithAgency: "145",
    diamondsCollected: "75,800",
    // Payment Details (for creators)
    bankAccount: "FR76 3000 4000 0100 0000 1234 567",
    paypalAccount: "creator@tikpulse.com",
    // Manager-specific data
    department: "Creator Management",
    employeeId: "TPA-001",
    hireDate: "March 1, 2022",
    managedCreators: "45",
    totalDiamondsManaged: "2.8M",
    regionCovered: "North America & Europe",
    specialization: "Brand Partnerships & Creator Development",
    // Sub-Manager specific data
    supervisedBy: "Sarah Johnson",
    assignedCreators: "12",
    taskCompletion: "94%",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, this would save the profile data to the server
    setEditMode(false);
    // Show success notification
  };

  const handleCancelEdit = () => {
    // Revert changes
    setEditMode(false);
    // Reset profile data to original state (from server)
  };

  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{ mb: 2 }}
          >
            <Link
              component={RouterLink}
              to="/dashboard"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person sx={{ mr: 0.5 }} fontSize="inherit" />
              Dashboard
            </Link>
            <Typography color="text.primary">Profile</Typography>
          </Breadcrumbs>

          <Grid container spacing={3}>
            {/* Left Sidebar - Profile Summary */}
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <Box
                  sx={{
                    height: 120,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    position: "relative",
                  }}
                />
                <CardContent sx={{ position: "relative", pt: 0 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mt: -6,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        border: "4px solid white",
                        boxShadow: 1,
                      }}
                    >
                      {profileData.fullName.charAt(0)}
                    </Avatar>

                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ mt: 2, textAlign: "center" }}
                    >
                      {profileData.fullName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, textAlign: "center" }}
                    >
                      @{profileData.username}
                    </Typography>

                    <Chip
                      label={user?.role?.toUpperCase() || "USER"}
                      color="primary"
                      sx={{
                        mb: 2,
                        bgcolor: "#6200ea",
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <CalendarToday fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Joined Date"
                        secondary={profileData.joinedDate}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Email fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={profileData.email}
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemIcon>
                        <Phone fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone"
                        secondary={profileData.phone}
                      />
                    </ListItem>
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {user?.role === "manager" || user?.role === "sub_manager" ? (
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Management Info
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <Language fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              user?.role === "manager"
                                ? "Region Covered"
                                : "Task Completion"
                            }
                            secondary={
                              user?.role === "manager"
                                ? profileData.regionCovered
                                : profileData.taskCompletion
                            }
                          />
                        </ListItem>

                        {user?.role === "manager" && (
                          <ListItem>
                            <ListItemIcon>
                              <Business fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Specialization"
                              secondary={profileData.specialization}
                            />
                          </ListItem>
                        )}

                        {user?.role === "sub_manager" && (
                          <ListItem>
                            <ListItemIcon>
                              <Person fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary="Supervised By"
                              secondary={profileData.supervisedBy}
                            />
                          </ListItem>
                        )}
                      </List>
                    </>
                  ) : user?.role !== "admin" ? (
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Creator Stats
                      </Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon>
                            <People fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Followers"
                            secondary={profileData.followers}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemIcon>
                            <VideoLibrary fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Videos"
                            secondary={profileData.videos}
                          />
                        </ListItem>

                        <ListItem>
                          <ListItemIcon>
                            <Diamond fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Diamonds"
                            secondary={profileData.diamondsCollected}
                          />
                        </ListItem>
                      </List>
                    </>
                  ) : null}

                  <Divider sx={{ my: 2 }} />

                  {user?.role !== "admin" && (
                    <Box sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        startIcon={editMode ? <SaveAlt /> : <Edit />}
                        onClick={
                          editMode ? handleSaveProfile : handleEditToggle
                        }
                        sx={{
                          mr: 1,
                          bgcolor: "#6200ea",
                          "&:hover": { bgcolor: "#3700b3" },
                        }}
                      >
                        {editMode ? "Save" : "Edit Profile"}
                      </Button>

                      {editMode && (
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Right Content - Profile Details */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3 }}>
                {/* Navigation Tabs */}
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mb: 3,
                  }}
                >
                  <Tab label="Personal Info" />
                  {user?.role !== "admin" && <Tab label="Social Media" />}
                  {user?.role === "creator" && <Tab label="Contract Details" />}
                  {user?.role === "creator" && <Tab label="Payment Info" />}
                  {(user?.role === "manager" ||
                    user?.role === "sub_manager") && (
                    <Tab label="Work Details" />
                  )}
                  <Tab label="Security" />
                </Tabs>

                {/* Tab Content */}
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Personal Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={profileData.fullName}
                          onChange={handleInputChange("fullName")}
                          disabled={!editMode}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Username"
                          value={profileData.username}
                          onChange={handleInputChange("username")}
                          disabled={!editMode}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          value={profileData.email}
                          onChange={handleInputChange("email")}
                          disabled={!editMode}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={profileData.phone}
                          onChange={handleInputChange("phone")}
                          disabled={!editMode}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bio"
                          value={profileData.bio}
                          onChange={handleInputChange("bio")}
                          disabled={!editMode}
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Social Media Tab */}
                {activeTab === 1 && user?.role !== "admin" && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Social Media Links
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="TikTok URL"
                          value={profileData.tiktokUrl}
                          onChange={handleInputChange("tiktokUrl")}
                          disabled={!editMode}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Instagram URL"
                          value={profileData.instagramUrl}
                          onChange={handleInputChange("instagramUrl")}
                          disabled={!editMode}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    {user?.role === "creator" && (
                      <>
                        <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                          Social Media Statistics
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center" }}>
                                <People
                                  color="primary"
                                  sx={{ fontSize: 40, mb: 1 }}
                                />
                                <Typography variant="h6">
                                  {profileData.followers}
                                </Typography>
                                <Typography variant="caption">
                                  Followers
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center" }}>
                                <Favorite
                                  color="error"
                                  sx={{ fontSize: 40, mb: 1 }}
                                />
                                <Typography variant="h6">
                                  {profileData.likes}
                                </Typography>
                                <Typography variant="caption">Likes</Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center" }}>
                                <Visibility
                                  color="action"
                                  sx={{ fontSize: 40, mb: 1 }}
                                />
                                <Typography variant="h6">
                                  {profileData.views}
                                </Typography>
                                <Typography variant="caption">Views</Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center" }}>
                                <VideoLibrary
                                  color="secondary"
                                  sx={{ fontSize: 40, mb: 1 }}
                                />
                                <Typography variant="h6">
                                  {profileData.videos}
                                </Typography>
                                <Typography variant="caption">
                                  Videos
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Box>
                )}

                {/* Contract Details Tab - Creators only */}
                {activeTab === 2 && user?.role === "creator" && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Contract Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contract Start Date"
                          value={profileData.contractStartDate}
                          disabled
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contract Duration"
                          value={profileData.contractDuration}
                          disabled
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Days with Agency"
                          value={profileData.daysWithAgency}
                          disabled
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Diamonds Collected"
                          value={profileData.diamondsCollected}
                          disabled
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <Diamond color="primary" sx={{ mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Payment Info Tab - Creators only */}
                {activeTab === 3 && user?.role === "creator" && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Payment Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bank Account"
                          value={profileData.bankAccount}
                          onChange={handleInputChange("bankAccount")}
                          disabled={!editMode}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <AccountBalance color="primary" sx={{ mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="PayPal Account"
                          value={profileData.paypalAccount}
                          onChange={handleInputChange("paypalAccount")}
                          disabled={!editMode}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <Payment color="primary" sx={{ mr: 1 }} />
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Work Details Tab - Managers only */}
                {(activeTab === 2 || activeTab === 4) &&
                  (user?.role === "manager" ||
                    user?.role === "sub_manager") && (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Work Details
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Department"
                            value={profileData.department}
                            disabled
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Employee ID"
                            value={profileData.employeeId}
                            disabled
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Hire Date"
                            value={profileData.hireDate}
                            disabled
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label={
                              user?.role === "manager"
                                ? "Managed Creators"
                                : "Assigned Creators"
                            }
                            value={
                              user?.role === "manager"
                                ? profileData.managedCreators
                                : profileData.assignedCreators
                            }
                            disabled
                            variant="outlined"
                          />
                        </Grid>

                        {user?.role === "manager" && (
                          <>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Total Diamonds Managed"
                                value={profileData.totalDiamondsManaged}
                                disabled
                                variant="outlined"
                                InputProps={{
                                  startAdornment: (
                                    <Diamond color="primary" sx={{ mr: 1 }} />
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Region Covered"
                                value={profileData.regionCovered}
                                disabled
                                variant="outlined"
                              />
                            </Grid>
                          </>
                        )}

                        {user?.role === "sub_manager" && (
                          <>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Supervised By"
                                value={profileData.supervisedBy}
                                disabled
                                variant="outlined"
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Task Completion Rate"
                                value={profileData.taskCompletion}
                                disabled
                                variant="outlined"
                              />
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  )}

                {/* Security Tab */}
                {((activeTab === 3 && user?.role === "manager") ||
                  (activeTab === 3 && user?.role === "sub_manager") ||
                  (activeTab === 5 && user?.role === "creator") ||
                  (activeTab === 1 && user?.role === "admin")) && (
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, display: "flex", alignItems: "center" }}
                    >
                      <Security sx={{ mr: 1 }} />
                      Security Settings
                    </Typography>

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Key />
                        </ListItemIcon>
                        <ListItemText
                          primary="Change Password"
                          secondary="Update your account password"
                        />
                        <Button variant="outlined" size="small">
                          Change
                        </Button>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <ListItemIcon>
                          <Notifications />
                        </ListItemIcon>
                        <ListItemText
                          primary="Notification Settings"
                          secondary="Manage your notification preferences"
                        />
                        <Button variant="outlined" size="small">
                          Configure
                        </Button>
                      </ListItem>

                      <Divider />

                      <ListItem>
                        <ListItemIcon>
                          <Help />
                        </ListItemIcon>
                        <ListItemText
                          primary="Privacy Settings"
                          secondary="Control your privacy and data settings"
                        />
                        <Button variant="outlined" size="small">
                          Manage
                        </Button>
                      </ListItem>
                    </List>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
