import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Divider,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  PersonAddOutlined,
  DashboardOutlined,
  EmojiNatureOutlined,
  BarChartOutlined,
  AutoAwesomeOutlined,
  GroupOutlined as CreatorsIcon,
  EventOutlined,
  AssignmentOutlined,
  Storage,
  Upload,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as FollowersIcon,
  Visibility as ValidDaysIcon,
  PlayCircle as LiveIcon,
  Schedule,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Diamond as DiamondIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";
import axiosInstance from "../api/axiosInstance";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAgencyProfile } from "../features/agencyManagerSlice";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../contexts/ThemeContext";

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { mode } = useTheme();
  const [uploadStats] = useState({
    totalCreators: 187,
    totalManagers: 24,
    lastUpdated: new Date().toLocaleDateString(),
  });

  // Bonus Rules State Management
  const [bonusRules, setBonusRules] = useState([
    {
      id: "1",
      program: "Bronze",
      validDay: "≥7",
      hours: "≥15",
      rate: "0.03%",
    },
    {
      id: "2",
      program: "Silver",
      validDay: "≥15",
      hours: "≥40",
      rate: "0.04%",
    },
    {
      id: "3",
      program: "Gold",
      validDay: "≥20",
      hours: "≥80",
      rate: "0.05%",
    },
    {
      id: "4",
      program: "Platinum",
      validDay: "≥22",
      hours: "≥100",
      rate: "0.06%",
    },
  ]);

  const [editingRule, setEditingRule] = useState(null);
  const [editedRule, setEditedRule] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newRule, setNewRule] = useState({
    program: "",
    validDay: "",
    hours: "",
    rate: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Stats data
  const totalManagers = 12;
  const totalCreators = 87;

  // Managers & Creators State Management
  const [managersWithCreators, setManagersWithCreators] = useState([]);
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [managerPage, setManagerPage] = useState(0);
  const [managerRowsPerPage, setManagerRowsPerPage] = useState(5);
  const [managerOrderBy, setManagerOrderBy] = useState("username");
  const [managerOrder, setManagerOrder] = useState("asc");
  const [creatorOrderBy, setCreatorOrderBy] = useState("username");
  const [creatorOrder, setCreatorOrder] = useState("asc");
  const [creatorPage, setCreatorPage] = useState({});
  const [creatorRowsPerPage, setCreatorRowsPerPage] = useState({});

  const agencyProfile = useSelector(selectAgencyProfile);
  const agencyId = user?.agency?._id || user?.agency;

  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setSelectedFile(acceptedFiles[0]);
    setShowUploadDialog(true);
  }, []);

  const handleUploadConfirm = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    setUploading(true);
    setUploadResult(null);
    setShowUploadDialog(false);
    try {
      const res = await axiosInstance.post(`/upload/uploadData`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadResult({ success: true, message: res.data.message || "Upload successful!" });
      setSelectedFile(null);
    } catch (error) {
      setUploadResult({ success: false, message: error.response?.data?.message || error.message || "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  const handleUploadCancel = () => {
    setShowUploadDialog(false);
    setSelectedFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  });

  // Use /agency/managers-with-creators for admins (no agencyId in the URL)
  useEffect(() => {
    setLoadingManagers(true);
    axiosInstance
      .get(`/agency/managers-with-creators`)
      .then((res) => {
        setManagersWithCreators(res.data.data || []);
        setLoadingManagers(false);
      })
      .catch(() => setLoadingManagers(false));
  }, []);

  const handleManagerSort = (property) => {
    const isAsc = managerOrderBy === property && managerOrder === "asc";
    setManagerOrder(isAsc ? "desc" : "asc");
    setManagerOrderBy(property);
  };
  const handleManagerPageChange = (event, newPage) => setManagerPage(newPage);
  const handleManagerRowsPerPageChange = (event) => {
    setManagerRowsPerPage(parseInt(event.target.value, 10));
    setManagerPage(0);
  };

  const handleCreatorSort = (managerId, property) => {
    setCreatorOrderBy(property);
    setCreatorOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const handleCreatorPageChange = (managerId, newPage) => {
    setCreatorPage((prev) => ({ ...prev, [managerId]: newPage }));
  };
  const handleCreatorRowsPerPageChange = (managerId, event) => {
    setCreatorRowsPerPage((prev) => ({
      ...prev,
      [managerId]: parseInt(event.target.value, 10),
    }));
    setCreatorPage((prev) => ({ ...prev, [managerId]: 0 }));
  };

  const sortedManagers = [...managersWithCreators].sort((a, b) => {
    const aValue =
      a.manager[managerOrderBy]?.toLowerCase?.() ||
      a.manager[managerOrderBy] ||
      "";
    const bValue =
      b.manager[managerOrderBy]?.toLowerCase?.() ||
      b.manager[managerOrderBy] ||
      "";
    if (managerOrder === "asc") return aValue > bValue ? 1 : -1;
    return aValue < bValue ? 1 : -1;
  });
  const paginatedManagers = sortedManagers.slice(
    managerPage * managerRowsPerPage,
    managerPage * managerRowsPerPage + managerRowsPerPage
  );

  // Bonus Rules Functions
  const handleEditRule = (rule) => {
    setEditingRule(rule.id);
    setEditedRule({ ...rule });
  };

  const handleSaveRule = () => {
    if (editedRule) {
      setBonusRules((prev) =>
        prev.map((rule) => (rule.id === editedRule.id ? editedRule : rule))
      );
      setEditingRule(null);
      setEditedRule(null);
      setSnackbar({
        open: true,
        message: t('pages.admin.dashboard.bonusRules.ruleUpdated'),
        severity: "success",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
    setEditedRule(null);
  };

  const handleDeleteRule = (id) => {
    setBonusRules((prev) => prev.filter((rule) => rule.id !== id));
    setSnackbar({
      open: true,
      message: t('pages.admin.dashboard.bonusRules.ruleDeleted'),
      severity: "success",
    });
  };

  const handleAddRule = () => {
    if (newRule.program && newRule.validDay && newRule.hours && newRule.rate) {
      const id = Date.now().toString();
      setBonusRules((prev) => [...prev, { ...newRule, id }]);
      setNewRule({
        program: "",
        validDay: "",
        hours: "",
        rate: "",
      });
      setShowAddDialog(false);
      setSnackbar({
        open: true,
        message: t('pages.admin.dashboard.bonusRules.ruleAdded'),
        severity: "success",
      });
    }
  };

  const getProgramColor = (program) => {
    switch (program.toLowerCase()) {
      case "platinum":
        return "primary";
      case "gold":
        return "warning";
      case "silver":
        return "info";
      case "bronze":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Layout>
      <Box sx={{ 
        minHeight: '100vh',
        background: mode === 'light' 
          ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        py: 2
      }}>
        <Container maxWidth="xl">
          <Box sx={{ py: 4 }}>
            {/* Modern Header */}
            <Box sx={{ 
              mb: 6, 
              p: 4, 
              borderRadius: 3,
              background: mode === 'light'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)',
              color: 'white',
              boxShadow: mode === 'light' 
                ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                : '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}>
{t('pages.admin.dashboard.title')}
              </Typography>
              <Typography variant="h6" sx={{ 
                opacity: 0.9,
                fontWeight: 400
              }}>
{t('pages.admin.dashboard.welcome', { name: user?.name || "Admin" })}
              </Typography>
            </Box>

            {/* Modern Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)',
                  color: 'white',
                  boxShadow: mode === 'light'
                    ? '0 8px 25px rgba(102, 126, 234, 0.2)'
                    : '0 8px 25px rgba(76, 29, 149, 0.3)',
                  border: 'none',
                  transition: 'transform 0.2s ease',
                  "&:hover": {
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {uploadStats.totalCreators}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
{t('pages.admin.dashboard.totalCreators')}
                      </Typography>
                    </Box>
                    <CreatorsIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: mode === 'light'
                    ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                    : 'linear-gradient(135deg, #be185d 0%, #be123c 100%)',
                  color: 'white',
                  boxShadow: mode === 'light'
                    ? '0 8px 25px rgba(240, 147, 251, 0.2)'
                    : '0 8px 25px rgba(190, 24, 93, 0.3)',
                  border: 'none',
                  transition: 'transform 0.2s ease',
                  "&:hover": {
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {uploadStats.totalManagers}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
{t('pages.admin.dashboard.totalManagers')}
                      </Typography>
                    </Box>
                    <AdminPanelSettingsOutlined sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  background: mode === 'light'
                    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: 'white',
                  boxShadow: mode === 'light'
                    ? '0 8px 25px rgba(79, 172, 254, 0.2)'
                    : '0 8px 25px rgba(14, 165, 233, 0.3)',
                  border: 'none',
                  transition: 'transform 0.2s ease',
                  "&:hover": {
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        98.5%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
{t('pages.admin.dashboard.platformHealth')}
                      </Typography>
                    </Box>
                    <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                  </Box>
                </Card>
              </Grid>
            </Grid>

                         {/* Modern Bonus Rules Card */}
             <Card sx={{ 
               mb: 4, 
               borderRadius: 3,
               boxShadow: mode === 'light'
                 ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                 : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
               border: 'none',
               overflow: 'hidden',
               bgcolor: 'background.paper'
             }}>
               <Box sx={{ 
                 p: 4,
                 background: mode === 'light'
                   ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                   : 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)',
                 color: 'white'
               }}>
                 <Box
                   sx={{
                     display: "flex",
                     justifyContent: "space-between",
                     alignItems: "center",
                   }}
                 >
                                <Box>
                                       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                     {t('pages.admin.dashboard.bonusRules.title')}
                   </Typography>
                   <Typography variant="body2" sx={{ opacity: 0.9 }}>
                     {t('pages.admin.dashboard.bonusRules.description')}
                   </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowAddDialog(true)}
                    sx={{ 
                      bgcolor: "rgba(255, 255, 255, 0.2)", 
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      "&:hover": { 
                        bgcolor: "rgba(255, 255, 255, 0.3)",
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
{t('pages.admin.dashboard.bonusRules.addNewRule')}
                  </Button>
                 </Box>
               </Box>

              <TableContainer sx={{ background: 'background.paper' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    background: mode === 'light'
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #4c1d95 0%, #581c87 100%)'
                  }}>
                    <TableCell sx={{ 
                      fontWeight: "bold", 
                      color: 'white',
                      fontSize: '0.95rem'
                    }}>{t('pages.admin.dashboard.bonusRules.program')}</TableCell>
                    <TableCell sx={{ 
                      fontWeight: "bold", 
                      color: 'white',
                      fontSize: '0.95rem'
                    }}>{t('pages.admin.dashboard.bonusRules.validDays')}</TableCell>
                    <TableCell sx={{ 
                      fontWeight: "bold", 
                      color: 'white',
                      fontSize: '0.95rem'
                    }}>
                      {t('pages.admin.dashboard.bonusRules.hoursRequired')}
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: "bold", 
                      color: 'white',
                      fontSize: '0.95rem'
                    }}>{t('pages.admin.dashboard.bonusRules.rate')}</TableCell>
                    <TableCell sx={{ 
                      fontWeight: "bold", 
                      color: 'white',
                      fontSize: '0.95rem'
                    }}>{t('pages.admin.dashboard.bonusRules.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bonusRules.map((rule) => (
                    <TableRow
                      key={rule.id}
                      sx={{ 
                        "&:hover": { 
                          bgcolor: "rgba(102, 126, 234, 0.04)",
                          transform: 'translateY(-1px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.2s ease'
                        },
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      <TableCell>
                        {editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.program || ""}
                            onChange={(e) =>
                              setEditedRule({
                                ...editedRule,
                                program: e.target.value,
                              })
                            }
                            size="small"
                            fullWidth
                          />
                        ) : (
                          <Chip
                            label={rule.program}
                            color={getProgramColor(rule.program)}
                            sx={{ fontWeight: "bold" }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.validDay || ""}
                            onChange={(e) =>
                              setEditedRule({
                                ...editedRule,
                                validDay: e.target.value,
                              })
                            }
                            size="small"
                            fullWidth
                          />
                        ) : (
                          rule.validDay
                        )}
                      </TableCell>
                      <TableCell>
                        {editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.hours || ""}
                            onChange={(e) =>
                              setEditedRule({
                                ...editedRule,
                                hours: e.target.value,
                              })
                            }
                            size="small"
                            fullWidth
                          />
                        ) : (
                          rule.hours
                        )}
                      </TableCell>
                      <TableCell>
                        {editingRule === rule.id ? (
                          <TextField
                            value={editedRule?.rate || ""}
                            onChange={(e) =>
                              setEditedRule({
                                ...editedRule,
                                rate: e.target.value,
                              })
                            }
                            size="small"
                            fullWidth
                          />
                        ) : (
                          <Typography
                            sx={{ color: "#2e7d32", fontWeight: "bold" }}
                          >
                            {rule.rate}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingRule === rule.id ? (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              onClick={handleSaveRule}
                              color="primary"
                              size="small"
                            >
                              <SaveIcon />
                            </IconButton>
                            <IconButton
                              onClick={handleCancelEdit}
                              color="secondary"
                              size="small"
                            >
                              <CancelIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <IconButton
                              onClick={() => handleEditRule(rule)}
                              color="primary"
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteRule(rule.id)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            </Card>

            {/* Modern Managers & Creators Section */}
            <Card sx={{ 
              mb: 4, 
              borderRadius: 3,
              boxShadow: mode === 'light'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              border: 'none',
              overflow: 'hidden',
              bgcolor: 'background.paper'
            }}>
              <Box sx={{ 
                p: 4,
                background: mode === 'light'
                  ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                  : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                color: 'white'
              }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {t('pages.admin.dashboard.managersCreators.title')}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {t('pages.admin.dashboard.managersCreators.description')}
                </Typography>
              </Box>
              {loadingManagers ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box sx={{ background: 'background.paper' }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <TableSortLabel
                              active={managerOrderBy === "username"}
                              direction={
                                managerOrderBy === "username"
                                  ? managerOrder
                                  : "asc"
                              }
                              onClick={() => handleManagerSort("username")}
                            >
{t('pages.admin.dashboard.managersCreators.managerUsername')}
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>{t('pages.admin.dashboard.managersCreators.email')}</TableCell>
                          <TableCell>{t('pages.admin.dashboard.managersCreators.phone')}</TableCell>
                          <TableCell>{t('pages.admin.dashboard.managersCreators.creators')}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedManagers.map(({ manager, creators }) => (
                          <React.Fragment key={manager._id}>
                            <TableRow sx={{ bgcolor: mode === 'light' ? "#f5f5f5" : "rgba(255, 255, 255, 0.05)" }}>
                              <TableCell sx={{ fontWeight: "bold" }}>
                                {manager.username}
                              </TableCell>
                              <TableCell>{manager.email}</TableCell>
                              <TableCell>{manager.phone}</TableCell>
                              <TableCell>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {creators.length} creators
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={4} sx={{ p: 0, border: 0 }}>
                                <Table
                                  size="small"
                                  sx={{ bgcolor: mode === 'light' ? "#fafafa" : "rgba(255, 255, 255, 0.02)", ml: 2 }}
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <TableSortLabel
                                          active={creatorOrderBy === "username"}
                                          direction={creatorOrder}
                                          onClick={() =>
                                            handleCreatorSort(
                                              manager._id,
                                              "username"
                                            )
                                          }
                                        >
                                          Creator Username
                                        </TableSortLabel>
                                      </TableCell>
                                      <TableCell>Email</TableCell>
                                      <TableCell>Phone</TableCell>
                                      <TableCell>Live Days</TableCell>
                                      <TableCell>Diamonds</TableCell>
                                      <TableCell>Hours</TableCell>
                                      <TableCell>Bonus</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {creators
                                      .slice()
                                      .sort((a, b) => {
                                        const aValue =
                                          a[creatorOrderBy]?.toLowerCase?.() ||
                                          a[creatorOrderBy] ||
                                          "";
                                        const bValue =
                                          b[creatorOrderBy]?.toLowerCase?.() ||
                                          b[creatorOrderBy] ||
                                          "";
                                        if (creatorOrder === "asc")
                                          return aValue > bValue ? 1 : -1;
                                        return aValue < bValue ? 1 : -1;
                                      })
                                      .slice(
                                        creatorPage[manager._id] ||
                                          0 *
                                            (creatorRowsPerPage[manager._id] ||
                                              5),
                                        (creatorPage[manager._id] || 0) *
                                          (creatorRowsPerPage[manager._id] || 5) +
                                          (creatorRowsPerPage[manager._id] || 5)
                                      )
                                      .map((creator) => (
                                        <TableRow key={creator._id}>
                                          <TableCell>
                                            {creator.username}
                                          </TableCell>
                                          <TableCell>{creator.email}</TableCell>
                                          <TableCell>{creator.phone}</TableCell>
                                          <TableCell>
                                            {creator.validLiveDays}
                                          </TableCell>
                                          <TableCell>
                                            {creator.diamonds}
                                          </TableCell>
                                          <TableCell>
                                            {creator.bonus?.hoursFormatted ||
                                              creator.liveDuration}
                                          </TableCell>
                                          <TableCell>
                                            {creator.bonus
                                              ?.bonusAmountFormatted || "-"}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                </Table>
                                <TablePagination
                                  component="div"
                                  count={creators.length}
                                  page={creatorPage[manager._id] || 0}
                                  onPageChange={(_, newPage) =>
                                    handleCreatorPageChange(manager._id, newPage)
                                  }
                                  rowsPerPage={
                                    creatorRowsPerPage[manager._id] || 5
                                  }
                                  onRowsPerPageChange={(e) =>
                                    handleCreatorRowsPerPageChange(manager._id, e)
                                  }
                                  rowsPerPageOptions={[5, 10, 25]}
                                  labelRowsPerPage="Creators per page"
                                />
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    component="div"
                    count={managersWithCreators.length}
                    page={managerPage}
                    onPageChange={handleManagerPageChange}
                    rowsPerPage={managerRowsPerPage}
                    onRowsPerPageChange={handleManagerRowsPerPageChange}
                                      rowsPerPageOptions={[5, 10, 25]}
                  labelRowsPerPage="Managers per page"
                />
                </Box>
              )}
            </Card>

            {/* Modern Excel Upload Section */}
            <Card sx={{ 
              mb: 4, 
              borderRadius: 3,
              boxShadow: mode === 'light'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
              border: 'none',
              overflow: 'hidden',
              bgcolor: 'background.paper'
            }}>
              <Box sx={{ 
                p: 4,
                background: mode === 'light'
                  ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                  : 'linear-gradient(135deg, #be185d 0%, #d97706 100%)',
                color: 'white'
              }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                  {t('pages.admin.dashboard.upload.title')}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {t('pages.admin.dashboard.upload.description')}
                </Typography>
              </Box>
              
              <Box sx={{ p: 4 }}>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #667eea",
                    borderRadius: 3,
                    p: 6,
                    textAlign: "center",
                    bgcolor: isDragActive 
                      ? (mode === 'light' ? "rgba(102, 126, 234, 0.08)" : "rgba(102, 126, 234, 0.15)")
                      : (mode === 'light' ? "rgba(102, 126, 234, 0.04)" : "rgba(102, 126, 234, 0.1)"),
                    cursor: "pointer",
                    mb: 2,
                    transition: 'all 0.3s ease',
                    "&:hover": {
                      bgcolor: mode === 'light' ? "rgba(102, 126, 234, 0.08)" : "rgba(102, 126, 234, 0.15)",
                      transform: 'translateY(-2px)',
                      boxShadow: mode === 'light' 
                        ? '0 8px 25px rgba(102, 126, 234, 0.15)'
                        : '0 8px 25px rgba(102, 126, 234, 0.3)'
                    }
                  }}
                >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Typography sx={{ 
                    color: '#667eea', 
                    fontWeight: 'bold', 
                    fontSize: '1.1rem' 
                  }}>
{t('pages.admin.dashboard.upload.dropping')}
                  </Typography>
                ) : (
                  <Box>
                    <Upload sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
                    <Typography sx={{ 
                      color: '#667eea', 
                      fontWeight: 'bold', 
                      fontSize: '1.1rem', 
                      mb: 1 
                    }}>
{t('pages.admin.dashboard.upload.dragDrop')}
                    </Typography>
                    <Typography sx={{ 
                      color: '#64748b', 
                      fontSize: '0.9rem' 
                    }}>
{t('pages.admin.dashboard.upload.supportedFormats')}
                    </Typography>
                  </Box>
                )}
                {uploading && <CircularProgress sx={{ mt: 2 }} />}
                {uploadResult && (
                  <Alert severity={uploadResult.success ? "success" : "error"} sx={{ mt: 2 }}>
                    {uploadResult.message}
                  </Alert>
                )}
                </Box>
              </Box>
            </Card>

            {/* Upload Confirmation Dialog */}
            <Dialog open={showUploadDialog} onClose={handleUploadCancel} maxWidth="sm" fullWidth>
              <DialogTitle>{t('pages.admin.dashboard.upload.confirmUpload')}</DialogTitle>
              <DialogContent>
                <Box sx={{ pt: 1 }}>
                  <Typography variant="body1" gutterBottom>
{t('pages.admin.dashboard.upload.confirmMessage')}
                  </Typography>
                  {selectedFile && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: mode === 'light' ? "#f5f5f5" : "rgba(255, 255, 255, 0.05)", borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        File Details:
                      </Typography>
                      <Typography variant="body2">Name: {selectedFile.name}</Typography>
                      <Typography variant="body2">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</Typography>
                      <Typography variant="body2">Type: {selectedFile.type}</Typography>
                    </Box>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleUploadCancel}>Cancel</Button>
                <Button onClick={handleUploadConfirm} variant="contained" disabled={uploading}>
                  {uploading ? <CircularProgress size={20} /> : "Upload"}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Add Rule Dialog */}
            <Dialog
              open={showAddDialog}
              onClose={() => setShowAddDialog(false)}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>{t('pages.admin.dashboard.bonusRules.addRuleDialog')}</DialogTitle>
              <DialogContent>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
                >
                  <TextField
                    label="Program Name"
                    value={newRule.program}
                    onChange={(e) =>
                      setNewRule({ ...newRule, program: e.target.value })
                    }
                    fullWidth
                  />
                  <TextField
                    label="Valid Days Required"
                    value={newRule.validDay}
                    onChange={(e) =>
                      setNewRule({ ...newRule, validDay: e.target.value })
                    }
                    fullWidth
                    placeholder="e.g., ≥7"
                  />
                  <TextField
                    label="Hours Required"
                    value={newRule.hours}
                    onChange={(e) =>
                      setNewRule({ ...newRule, hours: e.target.value })
                    }
                    fullWidth
                    placeholder="e.g., ≥15"
                  />
                  <TextField
                    label="Rate"
                    value={newRule.rate}
                    onChange={(e) =>
                      setNewRule({ ...newRule, rate: e.target.value })
                    }
                    fullWidth
                    placeholder="e.g., 0.03%"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button onClick={handleAddRule} variant="contained">
                  Add Rule
                </Button>
              </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
              <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
                sx={{ width: "100%" }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default AdminDashboardPage;
