import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Alert,
  Box,
  Chip,
  Skeleton,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  InputAdornment,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import { 
  Star as StarIcon,
  Diamond as DiamondIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Send as SendIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { fetchCreatorsWithBonus, selectCreatorsWithBonus, selectTotalBonus, selectBonusLoading, selectBonusErrors } from '../features/bonusSlice';
import axiosInstance from '../api/axiosInstance';

const CreatorsBonusTable = () => {
  const dispatch = useDispatch();
  const creators = useSelector(selectCreatorsWithBonus);
  const totalBonus = useSelector(selectTotalBonus);
  const loading = useSelector(selectBonusLoading);
  const error = useSelector(selectBonusErrors);

  // Search, Pagination, and Sorting State
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('username');
  const [order, setOrder] = useState('asc');

  // Message dialog state
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    creatorId: null,
    creatorName: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    dispatch(fetchCreatorsWithBonus());
  }, [dispatch]);

  // Filtering
  const filteredCreators = (creators || []).filter((creator) => {
    const searchLower = search.toLowerCase();
    return (
      creator.username?.toLowerCase().includes(searchLower) ||
      creator.tikTokId?.toLowerCase().includes(searchLower) ||
      creator.bonus.program?.toLowerCase().includes(searchLower)
    );
  });

  // Sorting
  const getComparator = (order, orderBy) => {
    return (a, b) => {
      let aValue, bValue;
      switch (orderBy) {
        case 'diamonds':
          aValue = a.bonus.diamonds || 0;
          bValue = b.bonus.diamonds || 0;
          break;
        case 'validDays':
          aValue = a.bonus.validDays || 0;
          bValue = b.bonus.validDays || 0;
          break;
        case 'hours':
          // Sort by total hours (parse from hoursFormatted)
          const parseHours = (str) => {
            const match = str.match(/(\d+)h\s*(\d+)?m?/);
            if (match) {
              return parseInt(match[1], 10) + (match[2] ? parseInt(match[2], 10) / 60 : 0);
            }
            return 0;
          };
          aValue = parseHours(a.bonus.hoursFormatted);
          bValue = parseHours(b.bonus.hoursFormatted);
          break;
        case 'bonusAmount':
          aValue = a.bonus.bonusAmount || 0;
          bValue = b.bonus.bonusAmount || 0;
          break;
        case 'program':
          aValue = a.bonus.program?.toLowerCase() || '';
          bValue = b.bonus.program?.toLowerCase() || '';
          break;
        case 'rate':
          // Sort by rate percentage (parse from rateFormatted)
          const parseRate = (str) => {
            const match = str.match(/(\d+\.?\d*)%/);
            return match ? parseFloat(match[1]) : 0;
          };
          aValue = parseRate(a.bonus.rateFormatted);
          bValue = parseRate(b.bonus.rateFormatted);
          break;
        case 'username':
        default:
          aValue = a.username?.toLowerCase() || '';
          bValue = b.username?.toLowerCase() || '';
      }
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    };
  };

  const sortedCreators = filteredCreators.slice().sort(getComparator(order, orderBy));

  // Pagination
  const paginatedCreators = sortedCreators.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSendMessage = (creatorId, creatorName) => {
    setMessageDialog({
      open: true,
      creatorId,
      creatorName,
      message: ''
    });
  };

  const handleCloseDialog = () => {
    setMessageDialog({
      open: false,
      creatorId: null,
      creatorName: '',
      message: ''
    });
  };

  const handleSendNotification = async () => {
    if (!messageDialog.message.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a message',
        severity: 'error'
      });
      return;
    }

    setSending(true);
    try {
      const response = await axiosInstance.post(`/users/send-message/${messageDialog.creatorId}`, {
        message: messageDialog.message
      });

      setSnackbar({
        open: true,
        message: response.data.message || 'Message sent successfully!',
        severity: 'success'
      });
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to send message',
        severity: 'error'
      });
    } finally {
      setSending(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getProgramColor = (program) => {
    switch (program) {
      case 'Platinum': return 'primary';
      case 'Gold': return 'warning';
      case 'Silver': return 'default';
      case 'Bronze': return 'secondary';
      default: return 'default';
    }
  };

  const getProgramIcon = (program) => {
    switch (program) {
      case 'Platinum': return <StarIcon color="primary" />;
      case 'Gold': return <StarIcon color="warning" />;
      case 'Silver': return <StarIcon color="default" />;
      case 'Bronze': return <StarIcon color="secondary" />;
      default: return <TrendingUpIcon />;
    }
  };

  if (loading.creators) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
          <Box mt={2}>
            <Skeleton variant="rectangular" height={200} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error.creators) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error">{error.creators}</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center">
              <TrendingUpIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" component="h2">
                Bonus des Créateurs
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ bgcolor: 'success.light', p: 1, borderRadius: 1, color: 'white' }}>
              <MoneyIcon sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Total: ${Number(totalBonus || 0).toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Rechercher par nom, TikTok ID ou programme..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Box>

          {creators?.length === 0 ? (
            <Alert severity="info">
              Aucun créateur trouvé ou aucun créateur n'a de données de bonus disponibles.
            </Alert>
          ) : (
            <>
              <TableContainer component={Paper} elevation={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        sortDirection={orderBy === 'username' ? order : false}
                        onClick={() => handleRequestSort('username')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'username'} direction={orderBy === 'username' ? order : 'asc'}>
                          <Box display="flex" alignItems="center">
                            <TrendingUpIcon sx={{ mr: 1 }} />
                            Créateur
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell 
                        align="center"
                        sortDirection={orderBy === 'diamonds' ? order : false}
                        onClick={() => handleRequestSort('diamonds')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'diamonds'} direction={orderBy === 'diamonds' ? order : 'asc'}>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <DiamondIcon sx={{ mr: 1 }} />
                            Diamants
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell 
                        align="center"
                        sortDirection={orderBy === 'validDays' ? order : false}
                        onClick={() => handleRequestSort('validDays')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'validDays'} direction={orderBy === 'validDays' ? order : 'asc'}>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <ScheduleIcon sx={{ mr: 1 }} />
                            Jours
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell 
                        align="center"
                        sortDirection={orderBy === 'hours' ? order : false}
                        onClick={() => handleRequestSort('hours')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'hours'} direction={orderBy === 'hours' ? order : 'asc'}>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <ScheduleIcon sx={{ mr: 1 }} />
                            Heures
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell 
                        align="center"
                        sortDirection={orderBy === 'program' ? order : false}
                        onClick={() => handleRequestSort('program')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'program'} direction={orderBy === 'program' ? order : 'asc'}>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <StarIcon sx={{ mr: 1 }} />
                            Programme
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell 
                        align="center"
                        sortDirection={orderBy === 'rate' ? order : false}
                        onClick={() => handleRequestSort('rate')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'rate'} direction={orderBy === 'rate' ? order : 'asc'}>
                          Taux
                        </TableSortLabel>
                      </TableCell>
                      <TableCell 
                        align="center"
                        sortDirection={orderBy === 'bonusAmount' ? order : false}
                        onClick={() => handleRequestSort('bonusAmount')}
                        style={{ cursor: 'pointer' }}
                      >
                        <TableSortLabel active={orderBy === 'bonusAmount'} direction={orderBy === 'bonusAmount' ? order : 'asc'}>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <MoneyIcon sx={{ mr: 1 }} />
                            Bonus
                          </Box>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="center">Active</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCreators.map((creator) => (
                      <TableRow key={creator._id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {creator.username}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {creator.tikTokId}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" fontWeight="bold">
                            {creator.bonus.diamonds?.toLocaleString() || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {creator.bonus.validDays || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2">
                            {creator.bonus.hoursFormatted || '0h 0m'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" alignItems="center" justifyContent="center">
                            {getProgramIcon(creator.bonus.program)}
                            <Chip 
                              label={creator.bonus.program} 
                              color={getProgramColor(creator.bonus.program)}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={creator.bonus.rateFormatted} 
                            color="success"
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" fontWeight="bold" color="success.main">
                            {creator.bonus.bonusAmountFormatted}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {creator.active ? (
                            <Tooltip title="Active in the last 7 days">
                              <CheckCircleIcon color="success" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="No valid hours in the last 7 days">
                              <CancelIcon color="error" />
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<SendIcon />}
                            onClick={() => handleSendMessage(creator._id, creator.username)}
                            sx={{ minWidth: 'auto' }}
                          >
                            Message
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* Pagination */}
              <TablePagination
                component="div"
                count={sortedCreators.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage="Lignes par page"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={messageDialog.open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Envoyer un message à {messageDialog.creatorName}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={messageDialog.message}
            onChange={(e) => setMessageDialog({ ...messageDialog, message: e.target.value })}
            placeholder="Entrez votre message ici..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={sending}>
            Annuler
          </Button>
          <Button 
            onClick={handleSendNotification} 
            variant="contained" 
            startIcon={<SendIcon />}
            disabled={sending || !messageDialog.message.trim()}
          >
            {sending ? 'Envoi...' : 'Envoyer'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatorsBonusTable; 