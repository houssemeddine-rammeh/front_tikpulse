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
import { Add, Edit, Delete, Person, Search } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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

  // Redux state
  const { creators = [], stats = {} } = useSelector(
    (state) => state.managerDashboard.managerData || {}
  );
  const loading = useSelector(
    (state) => state.managerDashboard.loading || false
  );
  const error = useSelector((state) => state.managerDashboard.error || null);

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

  // Fetch data on mount
  useEffect(() => {
    dispatch(getManagerStats());
  }, [dispatch]);

  // Memoized filtered and sorted creators
  const filteredCreators = useMemo(() => {
    if (!creators) return [];
    let result = creators.filter(
      (creator) =>
        creator.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortField) {
      result = [...result].sort((a, b) => {
        const aValue =
          sortField === "followers"
            ? Number(a.profile?.followers || 0)
            : Number(a.profile?.diamonds || 0);
        const bValue =
          sortField === "followers"
            ? Number(b.profile?.followers || 0)
            : Number(b.profile?.diamonds || 0);
        if (sortDirection === "asc") return aValue - bValue;
        return bValue - aValue;
      });
    }
    return result;
  }, [creators, searchTerm, sortField, sortDirection]);

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
      username: !newCreator.username ? "Username is required" : "",
      tikTokId: !newCreator.tikTokId ? "TikTok ID is required" : "",
      category: !newCreator.category ? "Category is required" : "",
      followers: !newCreator.followers ? "Followers count is required" : "",
      diamonds: !newCreator.diamonds ? "Diamonds count is required" : "",
      email: "", // not mandatory
      phone: "", // not mandatory
    };

    const isValid = !Object.values(errors).some((error) => error);
    if (!isValid) setFormErrors(errors);
    return isValid;
  }, [newCreator]);

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
      dispatch(getManagerStats());
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
          `Are you sure you want to delete creator "${creatorName}"?`
        )
      ) {
        try {
          await dispatch(deleteCreator(creatorId)).unwrap();
          dispatch(getCreators());
        } catch (error) {
          console.error("Error deleting creator:", error);
        }
      }
    },
    [dispatch]
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
                Creator Management
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1rem" }}
              >
                Manage and monitor your TikTok creators
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleDialogOpen()}
              size="large"
              sx={{
                bgcolor: "#667eea",
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  bgcolor: "#5a6fd8",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Add Creator
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
                  border: "1px solid #e0e7ff",
                  bgcolor: "#f8faff",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Search creators by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#667eea" }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      bgcolor: "white",
                      "& fieldset": { borderColor: "#e0e7ff", borderWidth: 1 },
                      "&:hover fieldset": {
                        borderColor: "#667eea",
                        borderWidth: 1,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#667eea",
                        borderWidth: 2,
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
                      Total Creators
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
            border: "1px solid #e0e7ff",
            bgcolor: "white",
          }}
        >
          <TableContainer>
            {loading ? (
              <Box sx={{ p: 8, textAlign: "center" }}>
                <CircularProgress size={48} sx={{ color: "#667eea", mb: 3 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Loading creators...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please wait while we fetch your creators
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
                  No creators found
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {searchTerm
                    ? "Try adjusting your search terms or clear the search to see all creators"
                    : "Get started by adding your first creator to the platform"}
                </Typography>
                {!searchTerm && (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => handleDialogOpen()}
                    sx={{
                      bgcolor: "#667eea",
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#5a6fd8" },
                    }}
                  >
                    Add Your First Creator
                  </Button>
                )}
              </Box>
            ) : (
              <>
                <Table>
                  <TableHead sx={{ bgcolor: "#f8faff" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                        }}
                      >
                        Username
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 700,
                          color: "#374151",
                          fontSize: "0.9rem",
                          py: 2.5,
                        }}
                      >
                        Category
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
                        onClick={() => handleSort("followers")}
                      >
                        Followers
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
                        Diamonds
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
                        }}
                      >
                        Status
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
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCreators.map((creator) => (
                      <TableRow
                        key={creator.id}
                        hover
                        sx={{
                          "&:hover": { bgcolor: "#f8faff" },
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
                                boxShadow:
                                  "0 4px 12px rgba(102, 126, 234, 0.3)",
                              }}
                            >
                              {creator.username?.charAt(0)?.toUpperCase() ||
                                "U"}
                            </Box>
                            <Typography
                              variant="body1"
                              fontWeight={600}
                              color="#374151"
                            >
                              {creator.username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell sx={{ py: 2.5 }}>
                          <Chip
                            label={creator.category || "General"}
                            size="small"
                            sx={{
                              bgcolor: "#e0e7ff",
                              color: "#3730a3",
                              fontWeight: 600,
                              fontSize: "0.8rem",
                              px: 1,
                            }}
                          />
                        </TableCell>
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
                          <Chip
                            label={creator.status || "Active"}
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
                                color: "#667eea",
                                bgcolor: "#f0f4ff",
                                "&:hover": {
                                  bgcolor: "#e0e7ff",
                                  transform: "scale(1.05)",
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
                                color: "#ef4444",
                                bgcolor: "#fef2f2",
                                "&:hover": {
                                  bgcolor: "#fee2e2",
                                  transform: "scale(1.05)",
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
            {editingCreator ? "Edit Creator" : "Add New Creator"}
          </DialogTitle>
          <DialogContent sx={{ pt: 3, px: 3, pb: 2 }}>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
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
                    label="TikTok ID"
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
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={newCreator.category}
                      label="Category"
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
                          {category}
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
                    label="Followers"
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
                    label="Diamonds"
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
                    label="Email"
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
                    label="Phone"
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
                color: "#6b7280",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={submitting}
              sx={{
                bgcolor: "#667eea",
                borderRadius: 2,
                px: 4,
                py: 1,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  bgcolor: "#5a6fd8",
                  boxShadow: "0 6px 16px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              {submitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : editingCreator ? (
                "Update Creator"
              ) : (
                "Add Creator"
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
