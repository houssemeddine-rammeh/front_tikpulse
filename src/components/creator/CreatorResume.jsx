import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Divider,
  Button,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Link,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  ContentCopy,
  Share,
  Download
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import resumeService from '../../services/resumeService';



const CreatorResume = ({ creatorId, editable = false }) => {
  const { user } = useAuth();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [resumeData, setResumeData] = useState({
    bio: ''
  });

  // Fetch creator data using service
  useEffect(() => {
    const fetchCreatorData = async () => {
      setLoading(true);
      try {
        const targetId = creatorId || user?.id;
        if (!targetId) {
          setLoading(false);
          return;
        }
        
        const creatorData = await resumeService.getCreatorResume(targetId);
        
        if (creatorData) {
          setCreator(creatorData);
          
          // Format resume data for the form
          setResumeData({
            bio: creatorData.resume?.bio || '',
            achievements: creatorData.resume?.achievements?.join('\n') || '',
            portfolioLinks: creatorData.resume?.portfolioLinks?.join('\n') || '',
            collaborations: creatorData.resume?.collaborations?.join('\n') || '',
            skills: creatorData.resume?.skills?.join(', ') || '',
            niche: creatorData.resume?.niche || ''
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching creator data:', error);
        setLoading(false);
        showNotification('Failed to load resume data', 'error');
      }
    };

    fetchCreatorData();
  }, [creatorId, user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (!creator) return;
    
    setSaving(true);
    
    try {
      // Convert form data to the format expected by the API
      const formattedResumeData = {
        bio: resumeData.bio,
        niche: resumeData.niche.split(',').map(item => item.trim()),
        skills: resumeData.skills.split(',').map(item => item.trim()),
        achievements: resumeData.achievements.split('\n').filter(line => line.trim() !== ''),
        portfolioLinks: resumeData.portfolioLinks.split('\n').filter(line => line.trim() !== ''),
        collaborations: resumeData.collaborations.split('\n').filter(line => line.trim() !== ''),
        lastUpdated: new Date()
      };
      
      const success = await resumeService.updateCreatorResume(creator.id, formattedResumeData);
      
      if (success) {
        // Update local state with the new data
        setCreator({
          ...creator,
          resume: formattedResumeData
        });
        
        setEditing(false);
        showNotification('Resume updated successfully', 'success');
      } else {
        showNotification('Failed to update resume', 'error');
      }
    } catch (error) {
      console.error('Error updating resume:', error);
      showNotification('An error occurred while updating the resume', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form data from creator data
    if (creator?.resume) {
      setResumeData({
        bio: creator.resume.bio || '',
        achievements: creator.resume.achievements?.join('\n') || '',
        portfolioLinks: creator.resume.portfolioLinks?.join('\n') || '',
        collaborations: creator.resume.collaborations?.join('\n') || '',
        skills: creator.resume.skills?.join(', ') || '',
        niche: creator.resume.niche || ''
      });
    }
    
    setEditing(false);
  };

  const handleChange = (field) => (e) => {
    setResumeData({
      ...resumeData,
      [field]: e.target.value
    });
  };

  const handleShareResume = () => {
    // Generate shareable link and copy to clipboard
    const shareableLink = `${window.location.origin}/resume/${creator?.id}`;
    navigator.clipboard.writeText(shareableLink);
    showNotification('Shareable link copied to clipboard!', 'success');
  };

  const handleDownloadPDF = async () => {
    if (!creator) return;
    
    try {
      const pdfUrl = await resumeService.generateResumePDF(creator.id);
      if (pdfUrl) {
        // Create a temporary link and trigger download
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = `${creator.username}_resume.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        showNotification('PDF generation not implemented in demo', 'info');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showNotification('Failed to generate PDF', 'error');
    }
  };

  const showNotification = (message) => {
    setNotification({
      open: true,
      message,
      severity: 'success'
    });
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!creator) {
    return (
      <Box>
        <Typography variant="h6" color="error">Creator not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with profile info and actions */}
      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Avatar alt={creator.username} src={creator.profilePicture} sx={{ width: 100, height: 100 }} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {creator.username}
            </Typography>
            
            <Typography variant="h6" component="div" color="text.secondary" gutterBottom>
              {creator?.tikTokId || creator?.tiktokId || 'No TikTok ID'}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
              <Chip label={`${creator?.followers ? Number(creator.followers).toLocaleString() : '0'} followers`} />
              <Chip label={`${creator?.likes ? Number(creator.likes).toLocaleString() : '0'} likes`} />
              <Chip color="primary" label={creator?.contractDetails?.tier || 'N/A'} />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2} textAlign="right" display="flex" flexDirection="column" gap={1}>
            {editable && (
              <>
                {editing ? (
                  <>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      startIcon={<Save />}
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                    <Button 
                      variant="outlined" 
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Edit />}
                    onClick={handleEdit}
                  >
                    Edit Resume
                  </Button>
                )}
              </>
            )}
            
            <Button 
              variant="outlined" 
              startIcon={<Share />}
              onClick={handleShareResume}
            >
              Share
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<Download />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Main resume content */}
      <Grid container spacing={4}>
        {/* Left column */}
        <Grid item xs={12} md={8}>
          {/* Bio section */}
          <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">Biography</Typography>
            </Box>
            
            {editing ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={resumeData.bio}
                onChange={handleChange('bio')}
                placeholder="Write your bio here..."
              />
            ) : (
              <Typography variant="body1" paragraph>
                {resumeData.bio}
              </Typography>
            )}
          </Paper>
          
          {/* Achievements section */}
          <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">Achievements</Typography>
            </Box>
            
            {editing ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={resumeData.achievements}
                onChange={handleChange('achievements')}
                placeholder="List your achievements here..."
              />
            ) : (
              <Box>
                {resumeData.achievements.split('\n').map((achievement, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                    {achievement.trim()}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>
          
          {/* Collaborations section */}
          <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">Brand Collaborations</Typography>
            </Box>
            
            {editing ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                value={resumeData.collaborations}
                onChange={handleChange('collaborations')}
                placeholder="List your brand collaborations here..."
              />
            ) : (
              <Box>
                {resumeData.collaborations.split('\n').map((collab, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                    {collab.trim()}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Right column */}
        <Grid item xs={12} md={4}>
          {/* Stats card */}
          <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>Statistics</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Followers</Typography>
                <Typography variant="h6">{creator?.followers ? Number(creator.followers).toLocaleString() : '0'}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Total Views</Typography>
                <Typography variant="h6">{creator?.views ? creator.views.toLocaleString() : '0'}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Videos</Typography>
                <Typography variant="h6">{creator?.videos ? creator.videos.toLocaleString() : '0'}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Likes</Typography>
                <Typography variant="h6">{creator?.likes ? creator.likes.toLocaleString() : '0'}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Diamonds (Month)</Typography>
                <Typography variant="h6">{creator?.diamondsLastMonth ? creator.diamondsLastMonth.toLocaleString() : '0'}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">New Followers</Typography>
                <Typography variant="h6">{creator?.newFollowersLastMonth ? creator.newFollowersLastMonth.toLocaleString() : '0'}</Typography>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Niche & Skills */}
          <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>Niche & Skills</Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="body2" color="text.secondary">Content Niche</Typography>
            {editing ? (
              <TextField
                fullWidth
                value={resumeData.niche}
                onChange={handleChange('niche')}
                placeholder="Your content niche..."
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="body1" paragraph>
                {resumeData.niche}
              </Typography>
            )}
            
            <Typography variant="body2" color="text.secondary">Skills</Typography>
            {editing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={resumeData.skills}
                onChange={handleChange('skills')}
                placeholder="Your skills..."
              />
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {resumeData.skills.split(', ').map((skill, index) => (
                  <Chip key={index} label={skill.trim()} size="small" />
                ))}
              </Box>
            )}
          </Paper>
          
          {/* Portfolio Links */}
          <Paper elevation={2} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>Portfolio Links</Typography>
            <Divider sx={{ mb: 2 }} />
            
            {editing ? (
              <TextField
                fullWidth
                multiline
                rows={3}
                value={resumeData.portfolioLinks}
                onChange={handleChange('portfolioLinks')}
                placeholder="Your portfolio links (one per line)..."
              />
            ) : (
              <Box>
                {resumeData.portfolioLinks.split('\n').map((link, index) => (
                  <Link 
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreatorResume; 

