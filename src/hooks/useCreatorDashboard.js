import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  getCreatorProfile,
  getCreatorStats,
  getAvailableEvents,
  getAvailableCampaigns,
  joinEvent,
  joinCampaign,
  setSelectedTab,
  setShowJoinModal,
  setSelectedItem,
  clearErrors,
  selectCreatorProfile,
  selectCreatorStats,
  selectAvailableEvents,
  selectJoinedEvents,
  selectAvailableCampaigns,
  selectJoinedCampaigns,
  selectCreatorLoading,
  selectCreatorErrors,
  selectSelectedTab,
  selectShowJoinModal,
  selectSelectedItem,
} from '../features/creatorDashboardSlice';

export const useCreatorDashboard = () => {
  const dispatch = useDispatch();

  // Selectors
  const profile = useSelector(selectCreatorProfile);
  const stats = useSelector(selectCreatorStats);
  const availableEvents = useSelector(selectAvailableEvents);
  const joinedEvents = useSelector(selectJoinedEvents);
  const availableCampaigns = useSelector(selectAvailableCampaigns);
  const joinedCampaigns = useSelector(selectJoinedCampaigns);
  const loading = useSelector(selectCreatorLoading);
  const errors = useSelector(selectCreatorErrors);
  const selectedTab = useSelector(selectSelectedTab);
  const showJoinModal = useSelector(selectShowJoinModal);
  const selectedItem = useSelector(selectSelectedItem);

  // Action dispatchers
  const fetchProfile = useCallback(() => {
    return dispatch(getCreatorProfile());
  }, [dispatch]);

  const fetchStats = useCallback(() => {
    return dispatch(getCreatorStats());
  }, [dispatch]);

  const fetchAvailableEvents = useCallback(() => {
    return dispatch(getAvailableEvents());
  }, [dispatch]);

  const fetchAvailableCampaigns = useCallback(() => {
    return dispatch(getAvailableCampaigns());
  }, [dispatch]);

  const handleJoinEvent = useCallback((eventId) => {
    return dispatch(joinEvent(eventId));
  }, [dispatch]);

  const handleJoinCampaign = useCallback((campaignId) => {
    return dispatch(joinCampaign(campaignId));
  }, [dispatch]);

  const handleSetSelectedTab = useCallback((tab) => {
    dispatch(setSelectedTab(tab));
  }, [dispatch]);

  const handleSetShowJoinModal = useCallback((show) => {
    dispatch(setShowJoinModal(show));
  }, [dispatch]);

  const handleSetSelectedItem = useCallback((item) => {
    dispatch(setSelectedItem(item));
  }, [dispatch]);

  const handleClearErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  // Initialize dashboard data
  const initializeDashboard = useCallback(async () => {
    try {
      await Promise.all([
        fetchProfile(),
        fetchStats(),
        fetchAvailableEvents(),
        fetchAvailableCampaigns(),
      ]);
    } catch (error) {
      console.error('Error initializing dashboard:', error);
    }
  }, [fetchProfile, fetchStats, fetchAvailableEvents, fetchAvailableCampaigns]);

  // Check if event is joined
  const isEventJoined = useCallback((eventId) => {
    return joinedEvents?.some(event => event.id === eventId) || false;
  }, [joinedEvents]);

  // Check if campaign is joined
  const isCampaignJoined = useCallback((campaignId) => {
    return joinedCampaigns?.some(campaign => campaign.id === campaignId) || false;
  }, [joinedCampaigns]);

  return {
    // Data
    profile,
    stats,
    availableEvents: availableEvents || [],
    joinedEvents: joinedEvents || [],
    availableCampaigns: availableCampaigns || [],
    joinedCampaigns: joinedCampaigns || [],
    
    // Loading & Error states
    loading,
    errors,
    
    // UI state
    selectedTab,
    showJoinModal,
    selectedItem,
    
    // Actions
    fetchProfile,
    fetchStats,
    fetchAvailableEvents,
    fetchAvailableCampaigns,
    handleJoinEvent,
    handleJoinCampaign,
    setSelectedTab: handleSetSelectedTab,
    setShowJoinModal: handleSetShowJoinModal,
    setSelectedItem: handleSetSelectedItem,
    clearErrors: handleClearErrors,
    initializeDashboard,
    
    // Utility functions
    isEventJoined,
    isCampaignJoined,
  };
};

export default useCreatorDashboard; 