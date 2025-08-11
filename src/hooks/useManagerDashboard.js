import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  // Async thunks
  getManagerProfile,
  updateManagerProfile,
  getManagerStats,
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getCreators,
  createCreator,
  updateCreator,
  deleteCreator,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAnalytics,
  
  // Actions
  setSelectedTab,
  setSelectedItem,
  setShowCreateModal,
  setShowEditModal,
  setShowDeleteModal,
  setModalType,
  setCampaignFilters,
  setCreatorFilters,
  setCompanyFilters,
  setEventFilters,
  setCampaignPagination,
  setCreatorPagination,
  setCompanyPagination,
  setEventPagination,
  clearErrors,
  clearAllData,
  clearError,
  
  // Selectors
  selectManagerProfile,
  selectManagerStats,
  selectCampaigns,
  selectCreators,
  selectCompanies,
  selectEvents,
  selectAnalytics,
  selectManagerLoading,
  selectManagerErrors,
  selectManagerSelectedTab,
  selectManagerSelectedItem,
  selectManagerPagination,
  selectManagerFilters,
  selectManagerModals,
} from '../features/managerDashboardSlice';

export const useManagerDashboard = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const profile = useSelector(selectManagerProfile);
  const stats = useSelector(selectManagerStats);
  const campaigns = useSelector(selectCampaigns);
  const creators = useSelector(selectCreators);
  const companies = useSelector(selectCompanies);
  const events = useSelector(selectEvents);
  const analytics = useSelector(selectAnalytics);
  const loading = useSelector(selectManagerLoading);
  const errors = useSelector(selectManagerErrors);
  const selectedTab = useSelector(selectManagerSelectedTab);
  const selectedItem = useSelector(selectManagerSelectedItem);
  const pagination = useSelector(selectManagerPagination);
  const filters = useSelector(selectManagerFilters);
  const modals = useSelector(selectManagerModals);
  
  // ==================== PROFILE ACTIONS ====================
  
  const fetchProfile = useCallback(() => {
    return dispatch(getManagerProfile());
  }, [dispatch]);
  
  const updateProfile = useCallback((profileData) => {
    return dispatch(updateManagerProfile(profileData));
  }, [dispatch]);
  
  // ==================== STATS ACTIONS ====================
  
  const fetchStats = useCallback(() => {
    return dispatch(getManagerStats());
  }, [dispatch]);
  
  // ==================== CAMPAIGNS ACTIONS ====================
  
  const fetchCampaigns = useCallback((params = {}) => {
    return dispatch(getCampaigns(params));
  }, [dispatch]);
  
  const handleCreateCampaign = useCallback((campaignData) => {
    return dispatch(createCampaign(campaignData));
  }, [dispatch]);
  
  const handleUpdateCampaign = useCallback((campaignId, campaignData) => {
    return dispatch(updateCampaign({ campaignId, campaignData }));
  }, [dispatch]);
  
  const handleDeleteCampaign = useCallback((campaignId) => {
    return dispatch(deleteCampaign(campaignId));
  }, [dispatch]);
  
  // ==================== CREATORS ACTIONS ====================
  
  const fetchCreators = useCallback((params = {}) => {
    return dispatch(getCreators(params));
  }, [dispatch]);
  
  const handleCreateCreator = useCallback((creatorData) => {
    return dispatch(createCreator(creatorData));
  }, [dispatch]);
  
  const handleUpdateCreator = useCallback((creatorId, creatorData) => {
    return dispatch(updateCreator({ creatorId, creatorData }));
  }, [dispatch]);
  
  const handleDeleteCreator = useCallback((creatorId) => {
    return dispatch(deleteCreator(creatorId));
  }, [dispatch]);
  
  // ==================== COMPANIES ACTIONS ====================
  
  const fetchCompanies = useCallback((params = {}) => {
    return dispatch(getCompanies(params));
  }, [dispatch]);
  
  const handleCreateCompany = useCallback((companyData) => {
    return dispatch(createCompany(companyData));
  }, [dispatch]);
  
  const handleUpdateCompany = useCallback((companyId, companyData) => {
    return dispatch(updateCompany({ companyId, companyData }));
  }, [dispatch]);
  
  const handleDeleteCompany = useCallback((companyId) => {
    return dispatch(deleteCompany(companyId));
  }, [dispatch]);
  
  // ==================== EVENTS ACTIONS ====================
  
  const fetchEvents = useCallback((params = {}) => {
    return dispatch(getEvents(params));
  }, [dispatch]);
  
  const handleCreateEvent = useCallback((eventData) => {
    return dispatch(createEvent(eventData));
  }, [dispatch]);
  
  const handleUpdateEvent = useCallback((eventId, eventData) => {
    return dispatch(updateEvent({ eventId, eventData }));
  }, [dispatch]);
  
  const handleDeleteEvent = useCallback((eventId) => {
    return dispatch(deleteEvent(eventId));
  }, [dispatch]);
  
  // ==================== ANALYTICS ACTIONS ====================
  
  const fetchAnalytics = useCallback((params = {}) => {
    return dispatch(getAnalytics(params));
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
  
  const handleSetCampaignFilters = useCallback((filters) => {
    dispatch(setCampaignFilters(filters));
  }, [dispatch]);
  
  const handleSetCreatorFilters = useCallback((filters) => {
    dispatch(setCreatorFilters(filters));
  }, [dispatch]);
  
  const handleSetCompanyFilters = useCallback((filters) => {
    dispatch(setCompanyFilters(filters));
  }, [dispatch]);
  
  const handleSetEventFilters = useCallback((filters) => {
    dispatch(setEventFilters(filters));
  }, [dispatch]);
  
  // ==================== PAGINATION ACTIONS ====================
  
  const handleSetCampaignPagination = useCallback((pagination) => {
    dispatch(setCampaignPagination(pagination));
  }, [dispatch]);
  
  const handleSetCreatorPagination = useCallback((pagination) => {
    dispatch(setCreatorPagination(pagination));
  }, [dispatch]);
  
  const handleSetCompanyPagination = useCallback((pagination) => {
    dispatch(setCompanyPagination(pagination));
  }, [dispatch]);
  
  const handleSetEventPagination = useCallback((pagination) => {
    dispatch(setEventPagination(pagination));
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
  
  const initializeDashboard = useCallback(async () => {
    try {
      // Fetch all initial data
      await Promise.all([
        dispatch(getManagerProfile()),
        dispatch(getManagerStats()),
        dispatch(getCampaigns({ page: 1, limit: 10 })),
        dispatch(getCreators({ page: 1, limit: 10 })),
        dispatch(getCompanies({ page: 1, limit: 10 })),
        dispatch(getEvents({ page: 1, limit: 10 })),
      ]);
    } catch (error) {
      console.error('Failed to initialize manager dashboard:', error);
    }
  }, [dispatch]);
  
  const refreshData = useCallback(() => {
    return initializeDashboard();
  }, [initializeDashboard]);
  
  // ==================== HELPER FUNCTIONS ====================
  
  const getCampaignById = useCallback((id) => {
    return campaigns.find(campaign => campaign.id === id);
  }, [campaigns]);
  
  const getCreatorById = useCallback((id) => {
    return creators.find(creator => creator.id === id);
  }, [creators]);
  
  const getCompanyById = useCallback((id) => {
    return companies.find(company => company.id === id);
  }, [companies]);
  
  const getEventById = useCallback((id) => {
    return events.find(event => event.id === id);
  }, [events]);
  
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
  
  return {
    // State
    profile,
    stats,
    campaigns,
    creators,
    companies,
    events,
    analytics,
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
    
    // Campaign actions
    fetchCampaigns,
    handleCreateCampaign,
    handleUpdateCampaign,
    handleDeleteCampaign,
    
    // Creator actions
    fetchCreators,
    handleCreateCreator,
    handleUpdateCreator,
    handleDeleteCreator,
    
    // Company actions
    fetchCompanies,
    handleCreateCompany,
    handleUpdateCompany,
    handleDeleteCompany,
    
    // Event actions
    fetchEvents,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    
    // Analytics actions
    fetchAnalytics,
    
    // UI actions
    handleSetSelectedTab,
    handleSelectItem,
    showCreateModal,
    showEditModal,
    showDeleteModal,
    closeModals,
    
    // Filter actions
    handleSetCampaignFilters,
    handleSetCreatorFilters,
    handleSetCompanyFilters,
    handleSetEventFilters,
    
    // Pagination actions
    handleSetCampaignPagination,
    handleSetCreatorPagination,
    handleSetCompanyPagination,
    handleSetEventPagination,
    
    // Error actions
    handleClearErrors,
    handleClearError,
    handleClearAllData,
    
    // Combined actions
    initializeDashboard,
    refreshData,
    
    // Helper functions
    getCampaignById,
    getCreatorById,
    getCompanyById,
    getEventById,
    getFilteredCampaigns,
    getFilteredCreators,
  };
}; 