import React, { useState, useEffect } from "react";
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
  Alert,
  Snackbar,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Input,
} from "@mui/material";
import {
  NavigateNext,
  Person,
  Edit,
  SaveAlt,
  Cancel,
  Email,
  Phone,
  Visibility,
  VisibilityOff,
  PhotoCamera,
  Security,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import LoadingScreen from "../components/LoadingScreen";
import Layout from "../components/layout/Layout";
import axiosInstance from "../api/axiosInstance";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile data state
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Avatar state
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Initialize profile data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value,
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    // Reset password fields when canceling edit
    if (editMode) {
      setProfileData({
        ...profileData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!profileData.email || !profileData.username) {
      setSnackbar({
        open: true,
        message: "Email and username are required",
        severity: "error"
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address",
        severity: "error"
      });
      return false;
    }

    // Password validation if changing password
    if (profileData.newPassword || profileData.currentPassword) {
      if (!profileData.currentPassword) {
        setSnackbar({
          open: true,
          message: "Current password is required to change password",
          severity: "error"
        });
        return false;
      }

      if (!profileData.newPassword) {
        setSnackbar({
          open: true,
          message: "New password is required",
          severity: "error"
        });
        return false;
      }

      if (profileData.newPassword.length < 6) {
        setSnackbar({
          open: true,
          message: "New password must be at least 6 characters long",
          severity: "error"
        });
        return false;
      }

      if (profileData.newPassword !== profileData.confirmPassword) {
        setSnackbar({
          open: true,
          message: "New passwords do not match",
          severity: "error"
        });
        return false;
      }
    }

    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      // Prepare update data
      const updateData = {
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      };

      // Add password if being changed
      if (profileData.newPassword) {
        updateData.currentPassword = profileData.currentPassword;
        updateData.password = profileData.newPassword;
      }

      const response = await axiosInstance.put('/users/update-my-profile', updateData);
      
      setSnackbar({
        open: true,
        message: response.data.message || "Profile updated successfully!",
        severity: "success"
      });

      // Update local user state if needed
      if (response.data.data) {
        // You might want to update the Redux store here
        // dispatch(updateUser(response.data.data));
      }

      setEditMode(false);
      
      // Clear password fields
      setProfileData({
        ...profileData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to update profile",
        severity: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getUserInitial = () => {
    const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
    return fullName ? fullName.charAt(0).toUpperCase() : user?.username?.charAt(0).toUpperCase() || "U";
  };

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{ mb: 3 }}
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
            <Typography color="text.primary">My Profile</Typography>
          </Breadcrumbs>

          <Typography variant="h4" component="h1" gutterBottom>
            Profile Settings
          </Typography>

          <Grid container spacing={3}>
            {/* Left Sidebar - Profile Summary */}
            <Grid item xs={12} md={4}>
              <Card elevation={2}>
                <CardContent sx={{ textAlign: "center", py: 3 }}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      src={avatarPreview}
                      sx={{
                        width: 120,
                        height: 120,
                        fontSize: "3rem",
                        bgcolor: "primary.main",
                        border: "4px solid white",
                        boxShadow: 2,
                      }}
                    >
                      {getUserInitial()}
                    </Avatar>
                    
                    {editMode && (
                      <IconButton
                        component="label"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                        }}
                      >
                        <PhotoCamera />
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </IconButton>
                    )}
                  </Box>

                  <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                    {`${profileData.firstName} ${profileData.lastName}`.trim() || user.username}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    @{profileData.username}
                  </Typography>

                  <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
                    {user.role === "admin" ? "Administrator" : 
                     user.role === "manager" ? "Manager" : 
                     user.role === "sub_manager" ? "Sub-Manager" : "Creator"}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ textAlign: "left" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Email fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {profileData.email}
                      </Typography>
                    </Box>
                    
                    {profileData.phone && (
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Phone fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {profileData.phone}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={editMode ? <SaveAlt /> : <Edit />}
                      onClick={editMode ? handleSaveProfile : handleEditToggle}
                      disabled={saving}
                      sx={{
                        mr: 1,
                        bgcolor: "#6200ea",
                        "&:hover": { bgcolor: "#3700b3" },
                      }}
                    >
                      {saving ? "Saving..." : editMode ? "Save Changes" : "Edit Profile"}
                    </Button>

                    {editMode && (
                      <Button
                        variant="outlined"
                        startIcon={<Cancel />}
                        onClick={handleEditToggle}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Content - Profile Form */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Personal Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={profileData.firstName}
                      onChange={handleInputChange("firstName")}
                      disabled={!editMode}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={handleInputChange("lastName")}
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
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange("email")}
                      disabled={!editMode}
                      variant="outlined"
                      required
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
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h6" sx={{ mb: 3 }}>
                  <Security sx={{ mr: 1, verticalAlign: "middle" }} />
                  Change Password
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type={showPassword ? "text" : "password"}
                      value={profileData.currentPassword}
                      onChange={handleInputChange("currentPassword")}
                      disabled={!editMode}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type={showNewPassword ? "text" : "password"}
                      value={profileData.newPassword}
                      onChange={handleInputChange("newPassword")}
                      disabled={!editMode}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              edge="end"
                            >
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={profileData.confirmPassword}
                      onChange={handleInputChange("confirmPassword")}
                      disabled={!editMode}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2">
                    <strong>Note:</strong> Leave password fields empty if you don't want to change your password.
                  </Typography>
                </Alert>
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
