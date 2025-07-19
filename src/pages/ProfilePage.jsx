import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
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
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/authSlice";
import { updateCreatorProfile } from "../features/creatorDashboardSlice";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../components/layout/Layout";
import moment from "moment";

const ProfilePage = () => {
  const { id: tikTokId } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Check if current user can edit this profile
  const canEdit = user?.role === "creator" && user?._id === profile?._id;

  // Enhanced profile data with all requested information
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    tikTokId: "",
    category: "",
    tiktokUrl: "",
    instagramUrl: "",
    // Social Media Stats (for creators)
    joinedDate: "",
    following: "0",
    videos: "0",
    followers: "0",
    likes: "0",
    views: "0",
    // Contract Details (for creators)
    contractStartDate: "",
    contractDuration: "12 months",
    daysWithAgency: "0",
    diamondsCollected: "0",
    // Payment Details (for creators)
    bankAccount: "",
    paypalAccount: "",
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

  // Fetch profile data when component mounts or tikTokId changes
  useEffect(() => {
    if (tikTokId) {
      dispatch(getProfile(tikTokId));
    }
  }, [tikTokId, dispatch]);

  // Update profile data when profile is fetched
  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "John Creator",
        username: profile?.username || "johncreator",
        email: profile?.email || "john.creator@example.com",
        phone: profile?.phone || "+1 (555) 123-4567",
        bio: profile?.bio || "TikTok creator specializing in comedy and lifestyle content. Working with top brands since 2020.",
        tikTokId: profile?.tikTokId || "",
        category: profile?.category || "",
        tiktokUrl: `https://tiktok.com/@${profile?.tikTokId || "johncreator"}`,
        instagramUrl: "https://instagram.com/johncreator",
        // Social Media Stats (for creators)
        joinedDate: profile?.joinDate ? moment(profile.joinDate).format("MMMM DD, YYYY") : "January 15, 2024",
        following: profile?.profile?.subscribers?.toString() || "1,234",
        videos: profile?.profile?.videos?.toString() || "456",
        followers: profile?.profile?.followers?.toLocaleString() || "125,000",
        likes: profile?.profile?.likes?.toLocaleString() || "2.5M",
        views: profile?.profile?.views?.toLocaleString() || "15.8M",
        // Contract Details (for creators)
        contractStartDate: profile?.joinDate ? moment(profile.joinDate).format("MMMM DD, YYYY") : "January 15, 2024",
        contractDuration: "12 months",
        daysWithAgency: profile?.profile?.daysSinceJoining?.toString() || "145",
        diamondsCollected: profile?.profile?.diamonds?.toLocaleString() || "75,800",
        // Payment Details (for creators)
        bankAccount: profile?.rib || "FR76 3000 4000 0100 0000 1234 567",
        paypalAccount: profile?.email || "creator@tikpulse.com",
        // Keep existing manager data
        department: "Creator Management",
        employeeId: "TPA-001",
        hireDate: "March 1, 2022",
        managedCreators: "45",
        totalDiamondsManaged: "2.8M",
        regionCovered: "North America & Europe",
        specialization: "Brand Partnerships & Creator Development",
        supervisedBy: "Sarah Johnson",
        assignedCreators: "12",
        taskCompletion: "94%",
      });
    }
  }, [profile]);

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

  const handleSaveProfile = async () => {
    if (!canEdit) return;
    
    setSaving(true);
    try {
      // Prepare update data (exclude tikTokId as it should not be editable)
      const updateData = {
        username: profileData.username,
        bio: profileData.bio,
        email: profileData.email,
        phone: profileData.phone,
        category: profileData.category,
        rib: profileData.bankAccount,
        firstName: profileData.fullName.split(' ')[0] || "",
        lastName: profileData.fullName.split(' ').slice(1).join(' ') || "",
      };

      // Remove empty fields
      Object.keys(updateData).forEach(key => {
        if (!updateData[key]) delete updateData[key];
      });

      await dispatch(updateCreatorProfile(updateData)).unwrap();
      
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success"
      });
      setEditMode(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset to original data
    if (profile) {
      setProfileData({
        fullName: `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "John Creator",
        username: profile?.username || "johncreator",
        email: profile?.email || "john.creator@example.com",
        phone: profile?.phone || "+1 (555) 123-4567",
        bio: profile?.bio || "TikTok creator specializing in comedy and lifestyle content. Working with top brands since 2020.",
        tikTokId: profile?.tikTokId || "",
        category: profile?.category || "",
        tiktokUrl: `https://tiktok.com/@${profile?.tikTokId || "johncreator"}`,
        instagramUrl: "https://instagram.com/johncreator",
        joinedDate: profile?.joinDate ? moment(profile.joinDate).format("MMMM DD, YYYY") : "January 15, 2024",
        following: profile?.profile?.subscribers?.toString() || "1,234",
        videos: profile?.profile?.videos?.toString() || "456",
        followers: profile?.profile?.followers?.toLocaleString() || "125,000",
        likes: profile?.profile?.likes?.toLocaleString() || "2.5M",
        views: profile?.profile?.views?.toLocaleString() || "15.8M",
        contractStartDate: profile?.joinDate ? moment(profile.joinDate).format("MMMM DD, YYYY") : "January 15, 2024",
        contractDuration: "12 months",
        daysWithAgency: profile?.profile?.daysSinceJoining?.toString() || "145",
        diamondsCollected: profile?.profile?.diamonds?.toLocaleString() || "75,800",
        bankAccount: profile?.rib || "FR76 3000 4000 0100 0000 1234 567",
        paypalAccount: profile?.email || "creator@tikpulse.com",
        department: "Creator Management",
        employeeId: "TPA-001",
        hireDate: "March 1, 2022",
        managedCreators: "45",
        totalDiamondsManaged: "2.8M",
        regionCovered: "North America & Europe",
        specialization: "Brand Partnerships & Creator Development",
        supervisedBy: "Sarah Johnson",
        assignedCreators: "12",
        taskCompletion: "94%",
      });
    }
    setEditMode(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) return <LoadingScreen />;
  
  if (error || !profile) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h4" align="center" color="error" fontWeight="bold">
            Profile not found!
          </Typography>
        </Container>
      </Layout>
    );
  }

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

                  {canEdit && (
                    <Box sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        startIcon={editMode ? <SaveAlt /> : <Edit />}
                        onClick={
                          editMode ? handleSaveProfile : handleEditToggle
                        }
                        disabled={saving}
                        sx={{
                          mr: 1,
                          bgcolor: "#6200ea",
                          "&:hover": { bgcolor: "#3700b3" },
                        }}
                      >
                        {saving ? "Saving..." : editMode ? "Save" : "Edit Profile"}
                      </Button>

                      {editMode && (
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={handleCancelEdit}
                          disabled={saving}
                        >
                          Cancel
                        </Button>
                      )}
                    </Box>
                  )}

                  {!canEdit && user?.role === "creator" && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        <strong>Note:</strong> You can only edit your own profile.
                      </Typography>
                    </Alert>
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

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="TikTok ID"
                          value={profileData.tikTokId}
                          disabled={true}
                          variant="outlined"
                          helperText="TikTok ID cannot be edited for security reasons"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth disabled={!editMode}>
                          <InputLabel>Category</InputLabel>
                          <Select
                            value={profileData.category}
                            onChange={handleInputChange("category")}
                            label="Category"
                          >
                            <MenuItem value="lifestyle">Lifestyle</MenuItem>
                            <MenuItem value="fashion">Fashion</MenuItem>
                            <MenuItem value="beauty">Beauty</MenuItem>
                            <MenuItem value="fitness">Fitness</MenuItem>
                            <MenuItem value="food">Food</MenuItem>
                            <MenuItem value="travel">Travel</MenuItem>
                            <MenuItem value="tech">Tech</MenuItem>
                            <MenuItem value="gaming">Gaming</MenuItem>
                            <MenuItem value="music">Music</MenuItem>
                            <MenuItem value="dance">Dance</MenuItem>
                            <MenuItem value="comedy">Comedy</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                            <MenuItem value="business">Business</MenuItem>
                            <MenuItem value="health">Health</MenuItem>
                            <MenuItem value="parenting">Parenting</MenuItem>
                            <MenuItem value="pets">Pets</MenuItem>
                            <MenuItem value="sports">Sports</MenuItem>
                            <MenuItem value="art">Art</MenuItem>
                            <MenuItem value="diy">DIY</MenuItem>
                            <MenuItem value="automotive">Automotive</MenuItem>
                            <MenuItem value="finance">Finance</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </FormControl>
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
                              <CardContent sx={{ textAlign: "center", py: 2 }}>
                                <People color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                  {profileData.followers}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Followers
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center", py: 2 }}>
                                <VideoLibrary color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                  {profileData.videos}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Videos
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center", py: 2 }}>
                                <Favorite color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                  {profileData.likes}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Likes
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={6} sm={3}>
                            <Card variant="outlined">
                              <CardContent sx={{ textAlign: "center", py: 2 }}>
                                <Visibility color="primary" sx={{ fontSize: 40 }} />
                                <Typography variant="h6" sx={{ mt: 1 }}>
                                  {profileData.views}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Views
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Box>
                )}

                {/* Contract Details Tab */}
                {activeTab === 2 && user?.role === "creator" && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Contract Details
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contract Start Date"
                          value={profileData.contractStartDate}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Contract Duration"
                          value={profileData.contractDuration}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Days with Agency"
                          value={profileData.daysWithAgency}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Diamonds Collected"
                          value={profileData.diamondsCollected}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Payment Info Tab */}
                {activeTab === 3 && user?.role === "creator" && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Payment Information
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Bank Account (RIB)"
                          value={profileData.bankAccount}
                          onChange={handleInputChange("bankAccount")}
                          disabled={!editMode}
                          variant="outlined"
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
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Work Details Tab */}
                {activeTab === 4 && (user?.role === "manager" || user?.role === "sub_manager") && (
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
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Employee ID"
                          value={profileData.employeeId}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Hire Date"
                          value={profileData.hireDate}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Managed Creators"
                          value={profileData.managedCreators}
                          disabled={true}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* Security Tab */}
                {activeTab === 5 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Security Settings
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Security settings are managed by your administrator.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
