import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  // Async thunks
  getAgencyProfile,
  updateAgencyProfile,
  getAgencyStats,
  getAgencyCreators,
  addCreatorToAgency,
  updateAgencyCreator,
  removeCreatorFromAgency,
  getAgencyCampaigns,
  createAgencyCampaign,
  updateAgencyCampaign,
  deleteAgencyCampaign,
  getAgencyContracts,
  createAgencyContract,
  updateAgencyContract,
  deleteAgencyContract,
  getAgencyPayouts,
  createAgencyPayout,
  updateAgencyPayout,
  deleteAgencyPayout,
  getAgencyEvents,
  createAgencyEvent,
  updateAgencyEvent,
  deleteAgencyEvent,
  getAgencyAnalytics,
  generateAgencyReport,
  getAgencyReports,
  
  // Actions
  setSelectedTab,
  setSelectedItem,
  setShowCreateModal,
  setShowEditModal,
  setShowDeleteModal,
  setModalType,
  setCreatorFilters,
  setCampaignFilters,
  setContractFilters,
  setPayoutFilters,
  setEventFilters,
  setReportFilters,
  setCreatorPagination,
  setCampaignPagination,
  setContractPagination,
  setPayoutPagination,
  setEventPagination,
  setReportPagination,
  clearErrors,
  clearAllData,
  clearError,
  
  // Selectors
  selectAgencyProfile,
  selectAgencyStats,
  selectAgencyCreators,
  selectAgencyCampaigns,
  selectAgencyContracts,
  selectAgencyPayouts,
  selectAgencyEvents,
  selectAgencyAnalytics,
  selectAgencyReports,
  selectAgencyLoading,
  selectAgencyErrors,
  selectAgencySelectedTab,
  selectAgencySelectedItem,
  selectAgencyPagination,
  selectAgencyFilters,
  selectAgencyModals,
} from '../features/agencyManagerSlice';

export const useAgencyManager = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const profile = useSelector(selectAgencyProfile);
  const stats = useSelector(selectAgencyStats);
  const creators = useSelector(selectAgencyCreators);
  const campaigns = useSelector(selectAgencyCampaigns);
  const contracts = useSelector(selectAgencyContracts);
  const payouts = useSelector(selectAgencyPayouts);
  const events = useSelector(selectAgencyEvents);
  const analytics = useSelector(selectAgencyAnalytics);
  const reports = useSelector(selectAgencyReports);
  const loading = useSelector(selectAgencyLoading);
  const errors = useSelector(selectAgencyErrors);
  const selectedTab = useSelector(selectAgencySelectedTab);
  const selectedItem = useSelector(selectAgencySelectedItem);
  const pagination = useSelector(selectAgencyPagination);
  const filters = useSelector(selectAgencyFilters);
  const modals = useSelector(selectAgencyModals);
  
  // ==================== PROFILE ACTIONS ====================
  
  const fetchProfile = useCallback(() => {
    return dispatch(getAgencyProfile());
  }, [dispatch]);
  
  const updateProfile = useCallback((profileData) => {
    return dispatch(updateAgencyProfile(profileData));
  }, [dispatch]);
  
  // ==================== STATS ACTIONS ====================
  
  const fetchStats = useCallback(() => {
    return dispatch(getAgencyStats());
  }, [dispatch]);
  
  // ==================== CREATORS ACTIONS ====================
  
  const fetchCreators = useCallback((params = {}) => {
    return dispatch(getAgencyCreators(params));
  }, [dispatch]);
  
  const handleAddCreator = useCallback((creatorData) => {
    return dispatch(addCreatorToAgency(creatorData));
  }, [dispatch]);
  
  const handleUpdateCreator = useCallback((creatorId, creatorData) => {
    return dispatch(updateAgencyCreator({ creatorId, creatorData }));
  }, [dispatch]);
  
  const handleRemoveCreator = useCallback((creatorId) => {
    return dispatch(removeCreatorFromAgency(creatorId));
  }, [dispatch]);
  
  // ==================== CAMPAIGNS ACTIONS ====================
  
  const fetchCampaigns = useCallback((params = {}) => {
    return dispatch(getAgencyCampaigns(params));
  }, [dispatch]);
  
  const handleCreateCampaign = useCallback((campaignData) => {
    return dispatch(createAgencyCampaign(campaignData));
  }, [dispatch]);
  
  const handleUpdateCampaign = useCallback((campaignId, campaignData) => {
    return dispatch(updateAgencyCampaign({ campaignId, campaignData }));
  }, [dispatch]);
  
  const handleDeleteCampaign = useCallback((campaignId) => {
    return dispatch(deleteAgencyCampaign(campaignId));
  }, [dispatch]);
  
  // ==================== CONTRACTS ACTIONS ====================
  
  const fetchContracts = useCallback((params = {}) => {
    return dispatch(getAgencyContracts(params));
  }, [dispatch]);
  
  const handleCreateContract = useCallback((contractData) => {
    return dispatch(createAgencyContract(contractData));
  }, [dispatch]);
  
  const handleUpdateContract = useCallback((contractId, contractData) => {
    return dispatch(updateAgencyContract({ contractId, contractData }));
  }, [dispatch]);
  
  const handleDeleteContract = useCallback((contractId) => {
    return dispatch(deleteAgencyContract(contractId));
  }, [dispatch]);
  
  // ==================== PAYOUTS ACTIONS ====================
  
  const fetchPayouts = useCallback((params = {}) => {
    return dispatch(getAgencyPayouts(params));
  }, [dispatch]);
  
  const handleCreatePayout = useCallback((payoutData) => {
    return dispatch(createAgencyPayout(payoutData));
  }, [dispatch]);
  
  const handleUpdatePayout = useCallback((payoutId, payoutData) => {
    return dispatch(updateAgencyPayout({ payoutId, payoutData }));
  }, [dispatch]);
  
  const handleDeletePayout = useCallback((payoutId) => {
    return dispatch(deleteAgencyPayout(payoutId));
  }, [dispatch]);
  
  // ==================== EVENTS ACTIONS ====================
  
  const fetchEvents = useCallback((params = {}) => {
    return dispatch(getAgencyEvents(params));
  }, [dispatch]);
  
  const handleCreateEvent = useCallback((eventData) => {
    return dispatch(createAgencyEvent(eventData));
  }, [dispatch]);
  
  const handleUpdateEvent = useCallback((eventId, eventData) => {
    return dispatch(updateAgencyEvent({ eventId, eventData }));
  }, [dispatch]);
  
  const handleDeleteEvent = useCallback((eventId) => {
    return dispatch(deleteAgencyEvent(eventId));
  }, [dispatch]);
  
  // ==================== ANALYTICS ACTIONS ====================
  
  const fetchAnalytics = useCallback((params = {}) => {
    return dispatch(getAgencyAnalytics(params));
  }, [dispatch]);
  
  // ==================== REPORTS ACTIONS ====================
  
  const fetchReports = useCallback((params = {}) => {
    return dispatch(getAgencyReports(params));
  }, [dispatch]);
  
  const handleGenerateReport = useCallback((reportParams) => {
    return dispatch(generateAgencyReport(reportParams));
  }, [dispatch]);
  
  // ==================== UI ACTIONS ====================
  
  const handleSetSelectedTab = useCallback((tab) => {
    dispatch(setSelectedTab(tab));
  }, [dispatch]);
  
  const handleSelectItem = useCallback((item) => {
    dispatch(setSelectedItem(item));
  }, [dispatch]);
  
  const showCreateModal = useCallback((type) => {
    dispatch(setModalType(type));
    dispatch(setShowCreateModal(true));
  }, [dispatch]);
  
  const showEditModal = useCallback((item, type) => {
    dispatch(setSelectedItem(item));
    dispatch(setModalType(type));
    dispatch(setShowEditModal(true));
  }, [dispatch]);
  
  const showDeleteModal = useCallback((item, type) => {
    dispatch(setSelectedItem(item));
    dispatch(setModalType(type));
    dispatch(setShowDeleteModal(true));
  }, [dispatch]);
  
  const closeModals = useCallback(() => {
    dispatch(setShowCreateModal(false));
    dispatch(setShowEditModal(false));
    dispatch(setShowDeleteModal(false));
    dispatch(setSelectedItem(null));
    dispatch(setModalType(null));
  }, [dispatch]);
  
  // ==================== FILTER ACTIONS ====================
  
  const handleSetCreatorFilters = useCallback((filters) => {
    dispatch(setCreatorFilters(filters));
  }, [dispatch]);
  
  const handleSetCampaignFilters = useCallback((filters) => {
    dispatch(setCampaignFilters(filters));
  }, [dispatch]);
  
  const handleSetContractFilters = useCallback((filters) => {
    dispatch(setContractFilters(filters));
  }, [dispatch]);
  
  const handleSetPayoutFilters = useCallback((filters) => {
    dispatch(setPayoutFilters(filters));
  }, [dispatch]);
  
  const handleSetEventFilters = useCallback((filters) => {
    dispatch(setEventFilters(filters));
  }, [dispatch]);
  
  const handleSetReportFilters = useCallback((filters) => {
    dispatch(setReportFilters(filters));
  }, [dispatch]);
  
  // ==================== PAGINATION ACTIONS ====================
  
  const handleSetCreatorPagination = useCallback((pagination) => {
    dispatch(setCreatorPagination(pagination));
  }, [dispatch]);
  
  const handleSetCampaignPagination = useCallback((pagination) => {
    dispatch(setCampaignPagination(pagination));
  }, [dispatch]);
  
  const handleSetContractPagination = useCallback((pagination) => {
    dispatch(setContractPagination(pagination));
  }, [dispatch]);
  
  const handleSetPayoutPagination = useCallback((pagination) => {
    dispatch(setPayoutPagination(pagination));
  }, [dispatch]);
  
  const handleSetEventPagination = useCallback((pagination) => {
    dispatch(setEventPagination(pagination));
  }, [dispatch]);
  
  const handleSetReportPagination = useCallback((pagination) => {
    dispatch(setReportPagination(pagination));
  }, [dispatch]);
  
  // ==================== ERROR ACTIONS ====================
  
  const handleClearErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);
  
  const handleClearError = useCallback((errorType) => {
    dispatch(clearError(errorType));
  }, [dispatch]);
  
  const handleClearAllData = useCallback(() => {
    dispatch(clearAllData());
  }, [dispatch]);
  
  // ==================== COMBINED ACTIONS ====================
  
  const initializeAgencyDashboard = useCallback(async () => {
    try {
      // Fetch all initial data
      await Promise.all([
        dispatch(getAgencyProfile()),
        dispatch(getAgencyStats()),
        dispatch(getAgencyCreators({ page: 1, limit: 10 })),
        dispatch(getAgencyCampaigns({ page: 1, limit: 10 })),
        dispatch(getAgencyContracts({ page: 1, limit: 10 })),
        dispatch(getAgencyPayouts({ page: 1, limit: 10 })),
        dispatch(getAgencyEvents({ page: 1, limit: 10 })),
      ]);
    } catch (error) {
      console.error('Failed to initialize agency dashboard:', error);
    }
  }, [dispatch]);
  
  const refreshData = useCallback(() => {
    return initializeAgencyDashboard();
  }, [initializeAgencyDashboard]);
  
  // ==================== HELPER FUNCTIONS ====================
  
  const getCreatorById = useCallback((id) => {
    return creators.find(creator => creator.id === id);
  }, [creators]);
  
  const getCampaignById = useCallback((id) => {
    return campaigns.find(campaign => campaign.id === id);
  }, [campaigns]);
  
  const getContractById = useCallback((id) => {
    return contracts.find(contract => contract.id === id);
  }, [contracts]);
  
  const getPayoutById = useCallback((id) => {
    return payouts.find(payout => payout.id === id);
  }, [payouts]);
  
  const getEventById = useCallback((id) => {
    return events.find(event => event.id === id);
  }, [events]);
  
  const getReportById = useCallback((id) => {
    return reports.find(report => report.id === id);
  }, [reports]);
  
  const getFilteredCreators = useCallback(() => {
    const creatorFilters = filters.creators;
    if (!creatorFilters || Object.keys(creatorFilters).length === 0) {
      return creators;
    }
    
    return creators.filter(creator => {
      return Object.entries(creatorFilters).every(([key, value]) => {
        if (!value) return true;
        return creator[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [creators, filters.creators]);
  
  const getFilteredCampaigns = useCallback(() => {
    const campaignFilters = filters.campaigns;
    if (!campaignFilters || Object.keys(campaignFilters).length === 0) {
      return campaigns;
    }
    
    return campaigns.filter(campaign => {
      return Object.entries(campaignFilters).every(([key, value]) => {
        if (!value) return true;
        return campaign[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [campaigns, filters.campaigns]);
  
  const getActiveContracts = useCallback(() => {
    return contracts.filter(contract => contract.status === 'active');
  }, [contracts]);
  
  const getPendingPayouts = useCallback(() => {
    return payouts.filter(payout => payout.status === 'pending');
  }, [payouts]);
  
  const getUpcomingEvents = useCallback(() => {
    const now = new Date();
    return events.filter(event => new Date(event.startDate) > now);
  }, [events]);
  
  const getTotalRevenue = useCallback(() => {
    return payouts.reduce((total, payout) => {
      return payout.status === 'completed' ? total + payout.amount : total;
    }, 0);
  }, [payouts]);
  
  const getMonthlyRevenue = useCallback(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return payouts.reduce((total, payout) => {
      const payoutDate = new Date(payout.createdAt);
      if (payout.status === 'completed' && payoutDate >= startOfMonth) {
        return total + payout.amount;
      }
      return total;
    }, 0);
  }, [payouts]);
  
  return {
    // State
    profile,
    stats,
    creators,
    campaigns,
    contracts,
    payouts,
    events,
    analytics,
    reports,
    loading,
    errors,
    selectedTab,
    selectedItem,
    pagination,
    filters,
    modals,
    
    // Profile actions
    fetchProfile,
    updateProfile,
    
    // Stats actions
    fetchStats,
    
    // Creator actions
    fetchCreators,
    handleAddCreator,
    handleUpdateCreator,
    handleRemoveCreator,
    
    // Campaign actions
    fetchCampaigns,
    handleCreateCampaign,
    handleUpdateCampaign,
    handleDeleteCampaign,
    
    // Contract actions
    fetchContracts,
    handleCreateContract,
    handleUpdateContract,
    handleDeleteContract,
    
    // Payout actions
    fetchPayouts,
    handleCreatePayout,
    handleUpdatePayout,
    handleDeletePayout,
    
    // Event actions
    fetchEvents,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    
    // Analytics actions
    fetchAnalytics,
    
    // Report actions
    fetchReports,
    handleGenerateReport,
    
    // UI actions
    handleSetSelectedTab,
    handleSelectItem,
    showCreateModal,
    showEditModal,
    showDeleteModal,
    closeModals,
    
    // Filter actions
    handleSetCreatorFilters,
    handleSetCampaignFilters,
    handleSetContractFilters,
    handleSetPayoutFilters,
    handleSetEventFilters,
    handleSetReportFilters,
    
    // Pagination actions
    handleSetCreatorPagination,
    handleSetCampaignPagination,
    handleSetContractPagination,
    handleSetPayoutPagination,
    handleSetEventPagination,
    handleSetReportPagination,
    
    // Error actions
    handleClearErrors,
    handleClearError,
    handleClearAllData,
    
    // Combined actions
    initializeAgencyDashboard,
    refreshData,
    
    // Helper functions
    getCreatorById,
    getCampaignById,
    getContractById,
    getPayoutById,
    getEventById,
    getReportById,
    getFilteredCreators,
    getFilteredCampaigns,
    getActiveContracts,
    getPendingPayouts,
    getUpcomingEvents,
    getTotalRevenue,
    getMonthlyRevenue,
  };
}; 