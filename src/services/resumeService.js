import { getApiUrl } from '../config/api';

/**
 * Service for handling creator resume operations
 */
export const resumeService = {
  /**
   * Get a creator's resume
   * @param {string} creatorId - The ID of the creator
   */
  getCreatorResume: async (creatorId) => {
    try {
      const response = await fetch(getApiUrl(`/creators/${creatorId}/resume`));
      if (!response.ok) {
        throw new Error('Failed to fetch creator resume');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching creator resume:', error);
      return null;
    }
  },

  /**
   * Update a creator's resume
   * @param {string} creatorId - The ID of the creator
   * @param {Object} resumeData - The updated resume data
   */
  updateCreatorResume: async (creatorId, resumeData) => {
    try {
      const response = await fetch(getApiUrl(`/creators/${creatorId}/resume`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update creator resume');
      }
      
      return true;
    } catch (error) {
      console.error('Error updating creator resume:', error);
      return false;
    }
  },

  /**
   * Generate a PDF version of the creator's resume
   * @param {string} creatorId - The ID of the creator
   */
  generateResumePDF: async (creatorId) => {
    try {
      const response = await fetch(getApiUrl(`/creators/${creatorId}/resume/pdf`));
      if (!response.ok) {
        throw new Error('Failed to generate resume PDF');
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating resume PDF:', error);
      return null;
    }
  }
};

export default resumeService; 

