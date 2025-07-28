import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Stack,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  People as FollowingIcon,
  VideoLibrary as VideosIcon,
  Group as FollowersIcon,
  Favorite as LikesIcon,
  Visibility as ViewsIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Diamond as DiamondIcon,
  MonetizationOn as MoneyIcon,
  AccountBalance as AccountBalanceIcon,
  Visibility,
  VisibilityOff,
  Security,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../features/authSlice';
import { updateCreatorProfile } from '../features/creatorDashboardSlice';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../contexts/AuthContext';
import CreatorBonusCard from '../components/CreatorBonusCard';

const CreatorProfilePage = () => {
  const { id: tikTokId } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.auth);
  const { user } = useAuth();
  const [editData, setEditData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check if current user can edit this profile
  const canEdit = user?.role === "creator" && user?._id === profile?._id;

  useEffect(() => {
    if (tikTokId) {
      dispatch(getProfile(tikTokId));
    }
  }, [tikTokId, dispatch]);

  useEffect(() => {
    if (profile) {
      setEditData({
        displayName: `${profile?.firstName} ${profile.lastName}`,
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar,
        bio: profile.bio,
        category: profile.category,
        phone: profile.phone,
        joinDate: new Date(profile.joinDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        following: profile.profile?.following || '0',
        videos: profile.profile?.videos || '0',
        followers: profile.profile?.followers || '0',
        likes: profile.profile?.likes || '0',
        views: profile.profile?.views || '0',
        contractStart: profile.joinDate
          ? new Date(profile.joinDate).toLocaleDateString()
          : 'N/A',
        contractDuration: '12 months',
        daysWithAgency: profile.profile?.daysSinceJoining || 0,
        diamondsCollected: profile.profile?.diamonds || 0,
        bankAccount: profile.rib || 'N/A',
        paypalAccount: profile.email || 'N/A',
        creatorId: profile._id,
      });
    }
  }, [profile]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset to original data
    if (profile) {
      setEditData({
        displayName: `${profile?.firstName} ${profile.lastName}`,
        username: profile.username,
        email: profile.email,
        avatar: profile.avatar,
        bio: profile.bio,
        category: profile.category,
        phone: profile.phone,
        joinDate: new Date(profile.joinDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        following: profile.profile?.following || '0',
        videos: profile.profile?.videos || '0',
        followers: profile.profile?.followers || '0',
        likes: profile.profile?.likes || '0',
        views: profile.profile?.views || '0',
        contractStart: profile.joinDate
          ? new Date(profile.joinDate).toLocaleDateString()
          : 'N/A',
        contractDuration: '12 months',
        daysWithAgency: profile.profile?.daysSinceJoining || 0,
        diamondsCollected: profile.profile?.diamonds || 0,
        bankAccount: profile.rib || 'N/A',
        paypalAccount: profile.email || 'N/A',
        creatorId: profile._id,
      });
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = async () => {
    if (!canEdit) return;

    // Password validation if changing password
    if (newPassword || currentPassword) {
      if (!currentPassword) {
        setSnackbar({
          open: true,
          message: "Current password is required to change password",
          severity: "error"
        });
        return;
      }
      if (!newPassword) {
        setSnackbar({
          open: true,
          message: "New password is required",
          severity: "error"
        });
        return;
      }
      if (newPassword.length < 6) {
        setSnackbar({
          open: true,
          message: "New password must be at least 6 characters long",
          severity: "error"
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        setSnackbar({
          open: true,
          message: "New passwords do not match",
          severity: "error"
        });
        return;
      }
    }

    setSaving(true);
    try {
      // Prepare update data (exclude tikTokId as it should not be editable)
      const updateData = {
        username: editData.username,
        bio: editData.bio,
        email: editData.email,
        phone: editData.phone,
        category: editData.category,
        rib: editData.bankAccount,
        firstName: editData.displayName.split(' ')[0] || "",
        lastName: editData.displayName.split(' ').slice(1).join(' ') || "",
      };
      if (newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.password = newPassword;
      }
      // Remove empty fields
      Object.keys(updateData).forEach(key => {
        if (!updateData[key]) delete updateData[key];
      });

      console.log("Sending update data:", updateData);
      console.log("Current user:", user);
      console.log("Current profile:", profile);

      const result = await dispatch(updateCreatorProfile(updateData)).unwrap();
      console.log("Update result:", result);
      
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success"
      });
      setEditMode(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Profile update error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response,
        status: error.status
      });
      
      setSnackbar({
        open: true,
        message: error.message || "Failed to update profile",
        severity: "error"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const StatItem = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  if (loading) return <LoadingScreen />;
  if (error || !editData) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h4" align="center" color="error" fontWeight="bold">
            Not Found!
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            Creator Profile
          </Typography>
          {canEdit && (
            <Box>
              {editMode ? (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={saving}
                    sx={{ backgroundColor: "#1976d2" }}
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                </Stack>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ borderColor: "#1976d2", color: "#1976d2" }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          )}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 3, overflow: 'visible', position: 'relative' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  src={editData.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                  {editData?.displayName || editData?.username || 'Unknown User'}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2,
                    fontFamily: 'monospace',
                    bgcolor: '#f5f5f5',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    display: 'inline-block',
                    fontWeight: 'bold',
                    color: 'primary.main',
                  }}
                >
                  ID: {editData.creatorId}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="h6" color="text.secondary">
                    {editData.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                  <Chip
                    label={editData.category}
                    size="small"
                    sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}
                  />
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {editData.bio}
                </Typography>
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  <Grid item xs={6}><StatItem icon={<CalendarIcon fontSize="small" />} label="Joined" value={editData.joinDate} /></Grid>
                  <Grid item xs={6}><StatItem icon={<FollowingIcon fontSize="small" />} label="Following" value={editData.following} /></Grid>
                  <Grid item xs={6}><StatItem icon={<VideosIcon fontSize="small" />} label="Videos" value={editData.videos} /></Grid>
                  <Grid item xs={6}><StatItem icon={<FollowersIcon fontSize="small" />} label="Followers" value={editData.followers} /></Grid>
                  <Grid item xs={6}><StatItem icon={<LikesIcon fontSize="small" />} label="Likes" value={editData.likes} /></Grid>
                  <Grid item xs={6}><StatItem icon={<ViewsIcon fontSize="small" />} label="Views" value={editData.views} /></Grid>
                  <Grid item xs={12}><StatItem icon={<PhoneIcon fontSize="small" />} label="Phone" value={editData.phone} /></Grid>
                  <Grid item xs={12}><StatItem icon={<EmailIcon fontSize="small" />} label="Email" value={editData.email} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Contract Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}><StatItem icon={<CalendarIcon />} label="Contract Start" value={editData.contractStart} /></Grid>
                <Grid item xs={12} sm={6}><StatItem icon={<WorkIcon />} label="Duration" value={editData.contractDuration} /></Grid>
                <Grid item xs={12} sm={6}><StatItem icon={<CalendarIcon />} label="Days with Agency" value={`${editData.daysWithAgency} days`} /></Grid>
                <Grid item xs={12} sm={6}><StatItem icon={<DiamondIcon />} label="Diamonds Collected" value={editData.diamondsCollected} /></Grid>
              </Grid>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Payment Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <AccountBalanceIcon color="secondary" />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        RIB (Bank Account)
                      </Typography>
                      {editMode ? (
                        <TextField
                          value={editData.bankAccount}
                          onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                          size="small"
                          fullWidth
                          placeholder="Enter bank account details"
                        />
                      ) : (
                        <Typography fontWeight="bold">{editData.bankAccount}</Typography>
                      )}
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MoneyIcon color="secondary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        PayPal Account
                      </Typography>
                      <Typography fontWeight="bold">{editData.paypalAccount}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Editable Fields Section */}
            {editMode && (
              <Paper sx={{ p: 3, mt: 3, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Edit Profile Information</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Display Name"
                      value={editData.displayName}
                      onChange={(e) => handleInputChange("displayName", e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Username"
                      value={editData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      value={editData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      value={editData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="TikTok ID"
                      value={profile?.tikTokId || ""}
                      disabled={true}
                      fullWidth
                      size="small"
                      helperText="TikTok ID cannot be edited for security reasons"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={editData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
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
                      label="Bio"
                      value={editData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ my: 4 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  <Security sx={{ mr: 1, verticalAlign: "middle" }} />
                  Change Password
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
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
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
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
            )}

            {/* TikTok ID Notice */}
            {editMode && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> TikTok ID cannot be edited for security reasons. 
                  Contact your manager if you need to update your TikTok ID.
                </Typography>
              </Alert>
            )}

            {/* Permission Notice */}
            {!canEdit && user?.role === "creator" && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> You can only edit your own profile.
                </Typography>
              </Alert>
            )}
          </Grid>
        </Grid>

        {/* Bonus Information */}
        <Box mt={3}>
          <CreatorBonusCard tikTokId={tikTokId} />
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

export default CreatorProfilePage;
