import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  InputAdornment,
  Stack,
  Alert,
  Pagination,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getCreators,
  createCreator,
  updateCreator,
  deleteCreator,
  getManagerStats,
} from "../features/managerDashboardSlice";
import Header from "../components/layout/Header";
import { Add, Edit, Delete, Person, Search, Refresh as RefreshIcon } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import axiosInstance from "../api/axiosInstance";
import { useTheme } from "../contexts/ThemeContext";

// Constants
const CATEGORIES = [
  "Gaming",
  "Beauty",
  "Lifestyle",
  "Comedy",
  "Education",
  "Music",
  "Dance",
  "Food",
];

const INITIAL_CREATOR_STATE = {
  username: "",
  tikTokId: "",
  category: "",
  followers: "",
  diamonds: "",
  status: "Active",
  email: "",
  phone: "",
};

const INITIAL_ERROR_STATE = {
  username: "",
  tikTokId: "",
  category: "",
  followers: "",
  diamonds: "",
  email: "",
  phone: "",
};

const ROWS_PER_PAGE = 10;

const CreatorManagementPage = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mode } = useTheme();

  // Redux state
  const { creators = [], stats = {} } = useSelector(
    (state) => state.managerDashboard.managerData || {}
  );
  const loading = useSelector(
    (state) => state.managerDashboard.loading || false
  );
  const error = useSelector((state) => state.managerDashboard.error || null);

  // Admin-specific state for all creators
  const [allCreators, setAllCreators] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState(null);
  // Local state
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCreator, setEditingCreator] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [newCreator, setNewCreator] = useState(INITIAL_CREATOR_STATE);
  const [formErrors, setFormErrors] = useState(INITIAL_ERROR_STATE);
  const [page, setPage] = useState(1);

  // Sorting state
  const [sortField, setSortField] = useState(null); // "followers" or "diamonds"
  const [sortDirection, setSortDirection] = useState("desc"); // "asc" or "desc"

  // Admin function to fetch all creators
  const fetchAllCreators = async () => {
    try {
      setAdminLoading(true);
      setAdminError(null);
      
      // Fetch managers with their creators for admin
      const response = await axiosInstance.get('/agency/managers-with-creators');
      
      if (response.data.success) {
        // Flatten the managers with creators data to get all creators
        const flatCreators = [];
        response.data.data.forEach(({ manager, creators: managerCreators }) => {
          managerCreators.forEach(creator => {
            flatCreators.push({
              ...creator,
              managerInfo: {
                _id: manager._id,
                username: manager.username,
                email: manager.email
              }
            });
          });
        });
        setAllCreators(flatCreators);
      }
    } catch (error) {
      console.error('Error fetching all creators:', error);
      setAdminError(error.response?.data?.message || 'Failed to fetch creators');
    } finally {
      setAdminLoading(false);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllCreators();
    } else {
      dispatch(getManagerStats());
    }
  }, [dispatch, user?.role]);

  // Memoized filtered and sorted creators
  const filteredCreators = useMemo(() => {
    // Use admin data if user is admin, otherwise use manager data
    const creatorData = user?.role === 'admin' ? allCreators : creators;
    if (!creatorData) return [];
    
    let result = creatorData.filter(
      (creator) =>
        creator.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.managerInfo?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (sortField) {
      result = [...result].sort((a, b) => {
        const aValue =
          sortField === "followers"
            ? Number(a.profile?.followers || 0)
            : Number(a.diamonds || 0);
        const bValue =
          sortField === "followers"
            ? Number(b.profile?.followers || 0)
            : Number(b.diamonds || 0);
        if (sortDirection === "asc") return aValue - bValue;
        return bValue - aValue;
      });
    }
    return result;
  }, [creators, allCreators, searchTerm, sortField, sortDirection, user?.role]);

  // Reset page to 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // Paginated creators
  const paginatedCreators = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredCreators.slice(start, start + ROWS_PER_PAGE);
  }, [filteredCreators, page]);

  // Handlers
  const handleDialogOpen = useCallback((creator = null) => {
    if (creator) {
      setEditingCreator(creator);
      setNewCreator({
        username: creator.username || "",
        tikTokId: creator.tikTokId || "",
        category: creator.category || "",
        followers: creator.profile?.followers || "",
        diamonds: creator.profile?.diamonds || "",
        status: creator.status || "Active",
        email: creator.email || "",
        phone: creator.phone || "",
      });
    } else {
      setEditingCreator(null);
      setNewCreator(INITIAL_CREATOR_STATE);
    }
    setOpenDialog(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setOpenDialog(false);
    setEditingCreator(null);
    setSubmitting(false);
    setNewCreator(INITIAL_CREATOR_STATE);
    setFormErrors(INITIAL_ERROR_STATE);
  }, []);

  // Optimized input handlers
  const handleInputChange = useCallback(
    (field) => (e) => {
      const value = e.target.value;
      setNewCreator((prev) => ({ ...prev, [field]: value }));

      if (formErrors[field]) {
        setFormErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [formErrors]
  );

  const validateForm = useCallback(() => {
    const errors = {
      username: !newCreator.username ? t("creatorManagement.validation.usernameRequired") : "",
      tikTokId: !newCreator.tikTokId ? t("creatorManagement.validation.tikTokIdRequired") : "",
      category: !newCreator.category ? t("creatorManagement.validation.categoryRequired") : "",
      followers: !newCreator.followers ? t("creatorManagement.validation.followersRequired") : "",
      diamonds: !newCreator.diamonds ? t("creatorManagement.validation.diamondsRequired") : "",
      email: "", // not mandatory
      phone: "", // not mandatory
    };

    const isValid = !Object.values(errors).some((error) => error);
    if (!isValid) setFormErrors(errors);
    return isValid;
  }, [newCreator, t]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      const creatorData = {
        username: newCreator.username,
        tikTokId: newCreator.tikTokId,
        phone: newCreator.phone || undefined,
        role: "creator",
        profile: {
          followers: parseInt(newCreator.followers, 10) || 0,
          diamonds: parseInt(newCreator.diamonds, 10) || 0,
        },
        status: newCreator.status,
        category: newCreator.category,
      };

      if (editingCreator) {
        await dispatch(
          updateCreator({
            creatorId: editingCreator._id,
            creatorData,
          })
        ).unwrap();
      } else {
        await dispatch(createCreator(creatorData)).unwrap();
      }

      handleDialogClose();
      if (user?.role === 'admin') {
        fetchAllCreators();
      } else {
        dispatch(getManagerStats());
      }
    } catch (error) {
      console.error("Error saving creator:", error);
    } finally {
      setSubmitting(false);
    }
  }, [newCreator, editingCreator, validateForm, handleDialogClose, dispatch]);

  const handleDeleteCreator = useCallback(
    async (creatorId, creatorName) => {
      if (
        window.confirm(
          t("creatorManagement.confirmDeleteCreator", { name: creatorName })
        )
      ) {
        try {
          await dispatch(deleteCreator(creatorId)).unwrap();
          if (user?.role === 'admin') {
            fetchAllCreators();
          } else {
            dispatch(getCreators());
          }
        } catch (error) {
          console.error("Error deleting creator:", error);
        }
      }
    },
    [dispatch, user?.role, fetchAllCreators, t]
  );

  // Sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Determine loading and error states based on user role
  const isLoadingData = user?.role === 'admin' ? adminLoading : loading;
  const errorData = user?.role === 'admin' ? adminError : error;

  // If loading
  if (isLoadingData) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
          >
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  // If error
  if (errorData) {
    return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Header />
        <Container maxWidth="lg">
          <Box sx={{ mt: 4 }}>
            <Alert severity="error">{errorData}</Alert>
            <Button
              variant="contained"
              onClick={() => {
                if (user?.role === 'admin') {
                  fetchAllCreators();
                } else {
                  dispatch(getManagerStats());
                }
              }}
              sx={{ mt: 2 }}
            >
              <RefreshIcon sx={{ mr: 1 }} />
              {t("creatorManagement.actions.retry")}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 4,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
              >
                {user?.role === 'admin' ? t('creatorManagement.allCreatorsManagement') : t('creatorManagement.title')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1rem" }}
              >
                {user?.role === 'admin' 
                  ? t('creatorManagement.allCreatorsDescription') 
                  : t('creatorManagement.description')
                }
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleDialogOpen()}
              size="large"
              sx={{
                bgcolor: mode === 'light' ? "#667eea" : "#7c3aed",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: mode === 'light' 
                  ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                  : "0 4px 12px rgba(124, 58, 237, 0.3)",
                "&:hover": {
                  bgcolor: mode === 'light' ? "#5a6fd8" : "#6d28d9",
                  transform: "translateY(-1px)",
                  boxShadow: mode === 'light' 
                    ? "0 6px 16px rgba(102, 126, 234, 0.4)"
                    : "0 6px 16px rgba(124, 58, 237, 0.4)",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: mode === 'light' 
                    ? "0 0 0 4px rgba(102, 126, 234, 0.2), 0 4px 12px rgba(102, 126, 234, 0.3)"
                    : "0 0 0 4px rgba(124, 58, 237, 0.3), 0 4px 12px rgba(124, 58, 237, 0.3)",
                },
                "&:focus:hover": {
                  boxShadow: mode === 'light' 
                    ? "0 0 0 4px rgba(102, 126, 234, 0.2), 0 6px 16px rgba(102, 126, 234, 0.4)"
                    : "0 0 0 4px rgba(124, 58, 237, 0.3), 0 6px 16px rgba(124, 58, 237, 0.4)",
                },
                transition: "all 0.2s ease",
              }}
            >
              {t('creatorManagement.addCreator')}
            </Button>
          </Box>

          {/* Search and Stats Row */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: mode === 'light' ? "1px solid #e0e7ff" : "1px solid #4b5563",
                  bgcolor: mode === 'light' ? "#f8faff" : "#374151",
                  boxShadow: mode === 'light' 
                    ? '0 2px 8px rgba(0, 0, 0, 0.1)'
                    : '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                <TextField
                  fullWidth
                  placeholder={user?.role === 'admin' 
                    ? t("creatorManagement.searchPlaceholderAdmin") 
                    : t("creatorManagement.searchPlaceholder")
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ 
                          color: mode === 'light' ? "#667eea" : "#a78bfa" 
                        }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      bgcolor: mode === 'light' ? "white" : "#4b5563",
                      color: mode === 'light' ? "#374151" : "#f9fafb",
                      "& fieldset": { 
                        borderColor: mode === 'light' ? "#e0e7ff" : "#6b7280", 
                        borderWidth: 1 
                      },
                      "&:hover fieldset": {
                        borderColor: mode === 'light' ? "#667eea" : "#a78bfa",
                        borderWidth: 2,
                        boxShadow: mode === 'light' 
                          ? "0 0 0 3px rgba(102, 126, 234, 0.1)"
                          : "0 0 0 3px rgba(167, 139, 250, 0.2)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: mode === 'light' ? "#667eea" : "#a78bfa",
                        borderWidth: 2,
                        boxShadow: mode === 'light' 
                          ? "0 0 0 4px rgba(102, 126, 234, 0.15)"
                          : "0 0 0 4px rgba(167, 139, 250, 0.25)",
                      },
                    },
                  }}
                  sx={{ "& .MuiInputBase-input": { fontSize: "0.95rem" } }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  height: "100%",
                  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 3,
                    px: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {filteredCreators.length}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.9, fontWeight: 500 }}
                    >
                      {t('creatorManagement.totalCreators')}
                    </Typography>
                  </Box>
                  <Person sx={{ fontSize: 48, opacity: 0.8 }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                "& .MuiAlert-message": { fontSize: "0.95rem" },
              }}
            >
              {typeof error === "string"
                ? error
                : "An error occurred while loading creators"}
            </Alert>
          )}
        </Box>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: mode === 'light' ? "1px solid #e0e7ff" : "1px solid #4b5563",
            bgcolor: mode === 'light' ? "white" : "#374151",
            boxShadow: mode === 'light' 
              ? '0 4px 6px rgba(0, 0, 0, 0.1)'
              : '0 4px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          <TableContainer>
            {loading ? (
              <Box sx={{ p: 8, textAlign: "center" }}>
                <CircularProgress size={48} sx={{ color: "#667eea", mb: 3 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  {t('creatorManagement.loadingCreators')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('creatorManagement.loadingCreatorsDescription')}
                </Typography>
              </Box>
            ) : filteredCreators.length === 0 ? (
              <Box sx={{ p: 8, textAlign: "center" }}>
                <Person sx={{ fontSize: 80, color: "#cbd5e1", mb: 3 }} />
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {t('creatorManagement.noCreatorsFound')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {searchTerm
                    ? t('creatorManagement.noCreatorsFoundDescription')
                    : t('creatorManagement.noCreatorsFoundEmpty')}
                </Typography>
                {!searchTerm && (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleDialogOpen()}
                    sx={{
                      bgcolor: mode === 'light' ? "#667eea" : "#7c3aed",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { 
                        bgcolor: mode === 'light' ? "#5a6fd8" : "#6d28d9" 
                      },
                    }}
                  >
                    {t('creatorManagement.addFirstCreator')}
                  </Button>
                )}
              </Box>
            ) : (
              <>
                <Table>
                  <TableHead sx={{ 
                    bgcolor: mode === 'light' ? "#f8faff" : "#4b5563" 
                  }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                        }}
                      >
                        {t('creatorManagement.fields.username')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                        }}
                      >
                        {t('creatorManagement.fields.category')}
                      </TableCell>
                      {user?.role === 'admin' && (
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: "#374151",
                            fontSize: "0.9rem",
                            py: 2.5,
                          }}
                        >
                          {t('creatorManagement.fields.manager')}
                        </TableCell>
                      )}
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                          cursor: "pointer",
                          userSelect: "none",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                        onClick={() => handleSort("followers")}
                      >
                        {t('creatorManagement.fields.followers')}
                        {sortField === "followers" &&
                          (sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ))}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                          cursor: "pointer",
                          userSelect: "none",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                        onClick={() => handleSort("diamonds")}
                      >
                        {t('creatorManagement.fields.diamonds')}
                        {sortField === "diamonds" &&
                          (sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ))}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                          cursor: "pointer",
                          userSelect: "none",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                          onClick={() => handleSort("liveDuration")}
                      >
                        {t('creatorManagement.fields.liveDuration')}
                        {sortField === "liveDuration" &&
                          (sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ))}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                          cursor: "pointer",
                          userSelect: "none",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                        onClick={() => handleSort("validLiveDays")}
                      >
                        {t('creatorManagement.fields.validLiveDays')}
                        
                        {sortField === "validLiveDays" &&
                          (sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ))}
                        </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                          cursor: "pointer",
                          userSelect: "none",
                          alignItems: "center",
                          gap: 0.5,
                          }}
                        onClick={() => handleSort("matches")}
                      >
                        {t('creatorManagement.fields.matches')}
                        {sortField === "matches" &&
                          (sortDirection === "asc" ? (
                            <ArrowUpwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ) : (
                            <ArrowDownwardIcon
                              fontSize="small"
                              sx={{ ml: 0.5 }}
                            />
                          ))}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                        }}
                      >
                        {t('creatorManagement.fields.status')}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                          textAlign: "right",
                        }}
                      >
                        {t('creatorManagement.fields.actions')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCreators.map((creator) => (
                      <TableRow
                        key={creator.id}
                        hover
                        sx={{
                          "&:hover": { 
                            bgcolor: mode === 'light' ? "#f8faff" : "#4b5563" 
                          },
                          transition: "background-color 0.2s ease",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2.5}
                          >
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background:
                                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                cursor: "pointer",
                                boxShadow:
                                  "0 4px 12px rgba(102, 126, 234, 0.3)",
                              }}
                              onClick={() =>
                                navigate(`/profile/${creator.tikTokId}`)
                              }
                            >
                              {creator.username?.charAt(0)?.toUpperCase() ||
                                "U"}
                            </Box>
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="#374151"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate(`/profile/${creator.tikTokId}`)
                              }
                            >
                              {creator.username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Chip
                            label={creator.category ? t(`creatorManagement.categories.${creator.category}`) : t("creatorManagement.categories.General")}
                            size="small"
                            sx={{
                              bgcolor: mode === 'light' ? "#e0e7ff" : "rgba(124, 58, 237, 0.2)",
                              color: mode === 'light' ? "#3730a3" : "#c4b5fd",
                              fontWeight: 600,
                              fontSize: "0.8rem",
                              px: 1,
                            }}
                          />
                        </TableCell>
                        {user?.role === 'admin' && (
                          <TableCell sx={{ py: 2.5 }}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="#374151"
                            >
                              {creator.managerInfo?.username || "N/A"}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell sx={{ py: 2.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="#374151"
                          >
                            {creator?.profile?.followers || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="#374151"
                          >
                            {creator?.profile?.diamonds || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="#374151"
                          >
                            {creator?.profile?.liveDuration || "0h 0m"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="#374151"
                          >
                            {creator?.profile?.validLiveDays || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="#374151"
                          >
                            {creator?.profile?.matches || "0"}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Chip
                            label={creator.status ? t(`creatorManagement.status.${creator.status.toLowerCase()}`) : t("creatorManagement.status.active")}
                            size="small"
                            color={
                              creator.status === "Active"
                                ? "success"
                                : "default"
                            }
                            sx={{ fontWeight: 600, fontSize: "0.8rem" }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ py: 2.5 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            <IconButton
                              size="small"
                              onClick={() => handleDialogOpen(creator)}
                              sx={{
                                color: mode === 'light' ? "#667eea" : "#a78bfa",
                                bgcolor: mode === 'light' ? "#f0f4ff" : "rgba(124, 58, 237, 0.1)",
                                "&:hover": {
                                  bgcolor: mode === 'light' ? "#e0e7ff" : "rgba(124, 58, 237, 0.2)",
                                  transform: "scale(1.05)",
                                },
                                "&:focus": {
                                  outline: "none",
                                  boxShadow: mode === 'light' 
                                    ? "0 0 0 3px rgba(102, 126, 234, 0.3)"
                                    : "0 0 0 3px rgba(167, 139, 250, 0.4)",
                                  bgcolor: mode === 'light' ? "#e0e7ff" : "rgba(124, 58, 237, 0.15)",
                                },
                                "&:focus:hover": {
                                  transform: "scale(1.05)",
                                  boxShadow: mode === 'light' 
                                    ? "0 0 0 3px rgba(102, 126, 234, 0.3)"
                                    : "0 0 0 3px rgba(167, 139, 250, 0.4)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              disabled={true}
                              onClick={() =>
                                handleDeleteCreator(
                                  creator.id,
                                  creator.username
                                )
                              }
                              sx={{
                                color: mode === 'light' ? "#ef4444" : "#fca5a5",
                                bgcolor: mode === 'light' ? "#fef2f2" : "rgba(239, 68, 68, 0.1)",
                                "&:hover": {
                                  bgcolor: mode === 'light' ? "#fee2e2" : "rgba(239, 68, 68, 0.2)",
                                  transform: "scale(1.05)",
                                },
                                "&:focus": {
                                  outline: "none",
                                  boxShadow: mode === 'light' 
                                    ? "0 0 0 3px rgba(239, 68, 68, 0.3)"
                                    : "0 0 0 3px rgba(252, 165, 165, 0.4)",
                                  bgcolor: mode === 'light' ? "#fee2e2" : "rgba(239, 68, 68, 0.15)",
                                },
                                "&:focus:hover": {
                                  transform: "scale(1.05)",
                                  boxShadow: mode === 'light' 
                                    ? "0 0 0 3px rgba(239, 68, 68, 0.3)"
                                    : "0 0 0 3px rgba(252, 165, 165, 0.4)",
                                },
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 3,
                  }}
                >
                  <Pagination
                    count={Math.ceil(filteredCreators.length / ROWS_PER_PAGE)}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              </>
            )}
          </TableContainer>
        </Paper>

        {/* Add/Edit Creator Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <DialogTitle
            sx={{
              pb: 2,
              pt: 3,
              px: 3,
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1f2937",
              textAlign: "center",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            {editingCreator ? t("creatorManagement.editCreator") : t("creatorManagement.addNewCreator")}
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label={t("creatorManagement.fields.username")}
                    value={newCreator.username}
                    onChange={handleInputChange("username")}
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label={t("creatorManagement.fields.tikTokId")}
                    value={newCreator.tikTokId}
                    onChange={handleInputChange("tikTokId")}
                    error={!!formErrors.tikTokId}
                    helperText={formErrors.tikTokId}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!formErrors.category}>
                    <InputLabel>{t("creatorManagement.fields.category")}</InputLabel>
                    <Select
                      value={newCreator.category}
                      label={t("creatorManagement.fields.category")}
                      onChange={handleInputChange("category")}
                      sx={{
                        borderRadius: 2,
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      }}
                    >
                      {CATEGORIES.map((category) => (
                        <MenuItem key={category} value={category}>
                          {t(`creatorManagement.categories.${category}`)}
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.category && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 1 }}
                      >
                        {formErrors.category}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label={t("creatorManagement.fields.followers")}
                    value={newCreator.followers}
                    onChange={handleInputChange("followers")}
                    error={!!formErrors.followers}
                    helperText={formErrors.followers}
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    label={t("creatorManagement.fields.diamonds")}
                    value={newCreator.diamonds}
                    onChange={handleInputChange("diamonds")}
                    error={!!formErrors.diamonds}
                    helperText={formErrors.diamonds}
                    type="number"
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t("creatorManagement.fields.email")}
                    value={newCreator.email}
                    onChange={handleInputChange("email")}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t("creatorManagement.fields.phone")}
                    value={newCreator.phone}
                    onChange={handleInputChange("phone")}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ px: 3, pb: 3, pt: 2, borderTop: "1px solid #f3f4f6" }}
          >
            {error && (
              <Alert
                severity="error"
                sx={{
                  width: "50%",
                  mb: 3,
                  borderRadius: 2,
                  "& .MuiAlert-message": { fontSize: "0.95rem" },
                }}
              >
                {typeof error === "string"
                  ? error
                  : "An error occurred while loading creators"}
              </Alert>
            )}
            <Button
              onClick={handleDialogClose}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                color: mode === 'light' ? "#6b7280" : "#9ca3af",
                "&:hover": {
                  bgcolor: mode === 'light' ? "#f3f4f6" : "#374151",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: mode === 'light' 
                    ? "0 0 0 3px rgba(107, 114, 128, 0.2)"
                    : "0 0 0 3px rgba(156, 163, 175, 0.3)",
                  bgcolor: mode === 'light' ? "#f3f4f6" : "#374151",
                },
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={submitting}
              sx={{
                bgcolor: mode === 'light' ? "#667eea" : "#7c3aed",
                borderRadius: 2,
                px: 4,
                py: 1,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: mode === 'light' 
                  ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                  : "0 4px 12px rgba(124, 58, 237, 0.3)",
                "&:hover": {
                  bgcolor: mode === 'light' ? "#5a6fd8" : "#6d28d9",
                  boxShadow: mode === 'light' 
                    ? "0 6px 16px rgba(102, 126, 234, 0.4)"
                    : "0 6px 16px rgba(124, 58, 237, 0.4)",
                },
                "&:focus": {
                  outline: "none",
                  boxShadow: mode === 'light' 
                    ? "0 0 0 4px rgba(102, 126, 234, 0.2), 0 4px 12px rgba(102, 126, 234, 0.3)"
                    : "0 0 0 4px rgba(124, 58, 237, 0.3), 0 4px 12px rgba(124, 58, 237, 0.3)",
                },
                "&:focus:hover": {
                  boxShadow: mode === 'light' 
                    ? "0 0 0 4px rgba(102, 126, 234, 0.2), 0 6px 16px rgba(102, 126, 234, 0.4)"
                    : "0 0 0 4px rgba(124, 58, 237, 0.3), 0 6px 16px rgba(124, 58, 237, 0.4)",
                },
              }}
            >
              {submitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : editingCreator ? (
                t("creatorManagement.updateCreator")
              ) : (
                t("creatorManagement.addCreator")
              )}
            </Button>
          </DialogActions>
        </Dialog>

        <Divider sx={{ my: 5, borderColor: "#e5e7eb" }} />
      </Container>
    </Box>
  );
};

export default CreatorManagementPage;
