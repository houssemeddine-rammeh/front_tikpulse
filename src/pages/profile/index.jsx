import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  Divider,
  Stack,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Container,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DiamondIcon from "@mui/icons-material/Diamond";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaidIcon from "@mui/icons-material/Paid";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Email,
  Favorite,
  Group,
  GroupAdd,
  LocalPhone,
  OndemandVideo,
  Visibility,
} from "@mui/icons-material";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { updateCreatorProfile } from "../../features/creatorDashboardSlice";
import { getProfile } from "../../features/authSlice";
import LoadingScreen from "../../components/LoadingScreen";

// Wrapper component that fetches creator data
export default function ProfileWrapper() {
  const { id: tikTokId } = useParams();
  const dispatch = useDispatch();
  const { profile, isLoading: loading, error } = useSelector((state) => state.auth);
  const { user } = useAuth();

  console.log("ProfileWrapper - tikTokId:", tikTokId);
  console.log("ProfileWrapper - profile:", profile);
  console.log("ProfileWrapper - loading:", loading);
  console.log("ProfileWrapper - error:", error);
  console.log("ProfileWrapper - user:", user);

  useEffect(() => {
    if (tikTokId) {
      console.log("Dispatching getProfile with tikTokId:", tikTokId);
      dispatch(getProfile(tikTokId));
    }
  }, [tikTokId, dispatch]);

  if (loading) return <LoadingScreen />;
  
  if (error && !loading) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="h4" align="center" color="error" fontWeight="bold">
          Profile not found!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      </Container>
    );
  }
  
  if (!profile && !loading) {
    return <LoadingScreen />;
  }

  return <Profile creator={profile} />;
}

// Main Profile component
function Profile({ creator }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  console.log("Profile component - creator:", creator);
  console.log("Profile component - user:", user);

  // Check if current user can edit this profile
  const canEdit = user?.role === "creator" && user?._id === creator?._id;
  
  console.log("Profile component - canEdit:", canEdit);
  console.log("Profile component - user?.role:", user?.role);
  console.log("Profile component - user?._id:", user?._id);
  console.log("Profile component - creator?._id:", creator?._id);

  useEffect(() => {
    if (creator) {
      setEditData({
        username: creator.username || "",
        bio: creator.bio || "",
        email: creator.email || "",
        phone: creator.phone || "",
        category: creator.category || "",
        rib: creator.rib || "",
      });
    }
  }, [creator]);

  const handleEdit = () => {
    console.log("Edit button clicked!");
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset to original data
    setEditData({
      username: creator.username || "",
      bio: creator.bio || "",
      email: creator.email || "",
      phone: creator.phone || "",
      category: creator.category || "",
      rib: creator.rib || "",
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Prepare update data (exclude tikTokId as it should not be editable)
      const updateData = {
        username: editData.username,
        bio: editData.bio,
        email: editData.email,
        phone: editData.phone,
        category: editData.category,
        rib: editData.rib,
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
      setLoading(false);
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

  return (
    <Box sx={{ p: 4, backgroundColor: "#f9f9fb", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          My Profile
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Debug: canEdit = {canEdit.toString()}, user role = {user?.role}, user ID = {user?._id}, creator ID = {creator?._id}
          </Typography>
          {canEdit && (
            <Box>
              {editMode ? (
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={loading}
                    sx={{ backgroundColor: "#1976d2" }}
                  >
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    disabled={loading}
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
          {!canEdit && (
            <Typography variant="body2" color="text.secondary">
              Cannot edit: {user?.role !== "creator" ? "Not a creator" : user?._id !== creator?._id ? "Not your profile" : "Unknown reason"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Profile Card */}
      <Card sx={{ borderRadius: 4, p: 3, mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            src={creator?.avatar}
            alt={creator?.username}
            sx={{ width: 72, height: 72 }}
          />
          <Box sx={{ flex: 1 }}>
            {editMode ? (
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  value={editData.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Bio"
                  value={editData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                />
              </Stack>
            ) : (
              <>
                <Typography variant="h6">{creator?.username}</Typography>
                <Typography variant="body1" mt={1}>
                  {creator?.bio}
                </Typography>
              </>
            )}
            <Typography variant="body2" color="text.secondary" mt={1}>
              @{creator?.tikTokId}
              {creator?.category && (
                <Chip label={creator.category} size="small" sx={{ ml: 1 }} />
              )}
            </Typography>
            {editMode && (
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
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
            )}
          </Box>
        </Stack>

        <CardContent sx={{ pl: 0 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mt={2}
            flexWrap="wrap"
            rowGap={1}
          >
            <Typography variant="body2" display="flex" alignItems="center">
              <GroupAdd fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Joined: {moment(creator?.joinDate).format("MMM DD, YYYY")}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Group fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Following: {creator?.profile?.subscribers}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <OndemandVideo
                fontSize="small"
                sx={{ mr: 0.5 }}
                color="secondary"
              />
              Videos: {creator?.profile?.videos}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Group fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Followers: {creator?.profile?.followers?.toLocaleString()}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Favorite fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Likes: {creator?.profile?.likes?.toLocaleString()}
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Visibility fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
              Views: {creator?.profile?.views?.toLocaleString()}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={4} flexWrap="wrap" rowGap={1}>
            {editMode ? (
              <>
                <TextField
                  label="Phone"
                  value={editData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  size="small"
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  label="Email"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  size="small"
                  sx={{ minWidth: 200 }}
                />
              </>
            ) : (
              <>
                {creator?.phone && (
                  <Typography variant="body2" display="flex" alignItems="center">
                    <LocalPhone
                      fontSize="small"
                      sx={{ mr: 0.5 }}
                      color="secondary"
                    />
                    {creator.phone}
                  </Typography>
                )}
                {creator?.email && (
                  <Typography variant="body2" display="flex" alignItems="center">
                    <Email fontSize="small" sx={{ mr: 0.5 }} color="secondary" />
                    {creator.email}
                  </Typography>
                )}
              </>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Contract Details */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Contract Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CalendarMonthIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Contract Start
                </Typography>
                <Typography fontWeight="bold">
                  {moment(creator?.profile?.joinDate).format("MMM DD, YYYY")}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccessTimeIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Contract Duration
                </Typography>
                <Typography fontWeight="bold">
                  {creator?.contractDuration}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccessTimeIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Days with Agency
                </Typography>
                <Typography fontWeight="bold">
                  {creator?.profile?.daysSinceJoining}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <DiamondIcon color="secondary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Diamonds Collected
                </Typography>
                <Typography fontWeight="bold">
                  {creator?.profile?.diamonds?.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Payment Details */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Payment Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccountBalanceIcon color="secondary" />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  RIB (Bank Account)
                </Typography>
                {editMode ? (
                  <TextField
                    value={editData.rib}
                    onChange={(e) => handleInputChange("rib", e.target.value)}
                    size="small"
                    fullWidth
                    placeholder="Enter bank account details"
                  />
                ) : (
                  <Typography fontWeight="bold">{creator?.rib}</Typography>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* TikTok ID Notice */}
      {editMode && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Note:</strong> TikTok ID cannot be edited for security reasons. 
            Contact your manager if you need to update your TikTok ID.
          </Typography>
        </Alert>
      )}

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
    </Box>
  );
}
