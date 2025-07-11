import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  InputAdornment,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  LiveHelp as WikiIcon,
  Search as SearchIcon,
  Business as BusinessIcon,
  VideoCall as TikTokIcon,
  Bookmark as BookmarkIcon,
  LibraryBooks as ArticleIcon,
  Category as CategoryIcon,
  ExpandMore as ExpandMoreIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Layout from "../components/layout/Layout";

// Function to render HTML content safely
const HtmlContent = ({ html }) => {
  // Safety check to ensure we're not trying to parse html content
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

const WikiPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [showTikTokLiveContent, setShowTikTokLiveContent] = useState(false);
  const searchInputRef = useRef(null);
  
  // Check if we should display TikTok LIVE content
  useEffect(() => {
    // Show TikTok LIVE content when directly navigating to /wiki
    if (location.pathname === '/wiki') {
      setShowTikTokLiveContent(true);
    }
    
    // Focus the search input when component mounts
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [location.pathname]);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock categories for Agency info
  const agencyCategories = [
    { 
      id: 'getting-started', 
      title: 'Getting Started', 
      icon: <BusinessIcon />, 
      description: 'Learn about our agency, how we work and what we offer to creators.' 
    },
    { 
      id: 'revenue', 
      title: 'Revenue & Payments', 
      icon: <BusinessIcon />, 
      description: 'Understand how payment works, our bonus system, and revenue sharing.' 
    },
    { 
      id: 'campaigns', 
      title: 'Brand Campaigns', 
      icon: <BusinessIcon />, 
      description: 'How to participate in brand campaigns and maximize your earnings.' 
    },
    { 
      id: 'policies', 
      title: 'Agency Policies', 
      icon: <BusinessIcon />, 
      description: 'Important policies and guidelines that all creators should follow.' 
    },
  ];

  // Mock categories for TikTok info
  const tiktokCategories = [
    { 
      id: 'tiktok-basics', 
      title: 'TikTok Basics', 
      icon: <TikTokIcon />, 
      description: 'Essential information about TikTok features and functionality.' 
    },
    { 
      id: 'content-strategy', 
      title: 'Content Strategy', 
      icon: <TikTokIcon />, 
      description: 'Best practices for creating engaging content that performs well.' 
    },
    { 
      id: 'live-streaming', 
      title: 'Live Streaming', 
      icon: <TikTokIcon />, 
      description: 'Tips and tricks for successful TikTok live streams and earning diamonds.' 
    },
    { 
      id: 'tiktok-live-wiki', 
      title: 'TikTok LIVE Wiki for Creators', 
      icon: <TikTokIcon />, 
      description: 'Comprehensive guide to TikTok LIVE streaming, eligibility, rules, monetization and more.' 
    },
    { 
      id: 'tiktok-algorithm', 
      title: 'Algorithm & Trends', 
      icon: <TikTokIcon />, 
      description: 'Understanding how the TikTok algorithm works and staying on top of trends.' 
    },
  ];

  // Mock latest articles
  const latestArticles = [
    {
      id: 'tiktok-live-eligibility',
      title: 'Eligibility Requirements for TikTok LIVE',
      category: 'tiktok-live-wiki',
      date: 'July 1, 2023',
      summary: 'Learn about age and follower requirements to qualify for TikTok LIVE streaming.',
      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Eligibility',
      content: `
        <h2>Eligibility Requirements for a TikTok LIVE</h2>
        <h3>How to become eligible to go LIVE on TikTok?</h3>
        
        <h4>How To:</h4>
        <ul>
          <li><strong>Be 18 years old:</strong> Make sure you're at least 18 years old. This is the minimum age to start a LIVE.</li>
          <li><strong>Reach 1,000 followers:</strong> Get at least 1,000 followers on your account. This is the general threshold to unlock the LIVE feature.</li>
          <li><strong>Be 18+ for Gifting:</strong> If you want to send or receive Gifts during a LIVE, you must be 18 or older (or 19 in South Korea).</li>
        </ul>
        
        <h4>What Not To Do:</h4>
        <ul>
          <li><strong>Don't try to bypass age restrictions:</strong> Any attempt to fake your age will be detected and could lead to account suspension.</li>
          <li><strong>Don't expect to go LIVE without enough followers:</strong> The LIVE feature won't be active if you haven't met the required follower count.</li>
        </ul>
      `
    },
    {
      id: 'tiktok-live-content-rules',
      title: 'TikTok LIVE Content: Rules to Follow',
      category: 'tiktok-live-wiki',
      date: 'July 2, 2023',
      summary: 'Guidelines and rules for creating compliant TikTok LIVE content and avoiding penalties.',
      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Rules',
      content: `
        <h2>TikTok LIVE Content: Rules to Follow (and Avoid)</h2>
        <h3>How to create content that complies with TikTok's guidelines and avoid penalties?</h3>
        
        <h4>How To:</h4>
        <ul>
          <li><strong>Be authentic and live:</strong> Show yourself live, interact, and ensure your visible presence on screen.</li>
          <li><strong>Respect copyrights:</strong> Only use content (music, images) for which you have the rights.</li>
          <li><strong>Maintain positive behavior:</strong> Use respectful language and appropriate conduct.</li>
        </ul>
        
        <h4>What Not To Do:</h4>
        <ul>
          <li><strong>Don't broadcast pre-recorded content:</strong> LIVEs must be real-time broadcasts.</li>
          <li><strong>Don't use blank or static screens:</strong> Avoid black screens, still images, or QR codes without interaction.</li>
          <li><strong>Don't be absent for too long:</strong> Stay present and engaged with your audience.</li>
          <li><strong>Don't redirect off TikTok:</strong> Avoid displaying links or information that push users to other platforms.</li>
          <li><strong>Don't violate sensitive content rules:</strong> Strict prohibition of nudity, sexual acts, violence, harassment, hate speech, misinformation, or promotion of regulated products (alcohol, drugs, weapons, etc.).</li>
        </ul>
      `
    },
    {
      id: 'tiktok-live-monetization',
      title: 'Monetizing Your TikTok LIVE: How It Works',
      category: 'tiktok-live-wiki',
      date: 'July 3, 2023',
      summary: 'Learn how LIVE Gifts can become a source of income and maximize your earnings.',
      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Monetization',
      content: `
        <h2>Monetizing Your TikTok LIVE: How It Works</h2>
        <h3>How can LIVE Gifts become a source of income?</h3>
        
        <h4>How To:</h4>
        <ul>
          <li><strong>Encourage Gifts:</strong> Engage your audience and create quality content to encourage viewers to send you gifts.</li>
          <li><strong>Thank donors:</strong> Express your gratitude live to people who give you gifts.</li>
          <li><strong>Create valuable content:</strong> The more interesting and entertaining your LIVE is, the more likely you are to receive gifts.</li>
        </ul>
        
        <h4>What Not To Do:</h4>
        <ul>
          <li><strong>Don't force donations:</strong> Avoid aggressive or repetitive begging for gifts.</li>
          <li><strong>Don't violate rules for monetization:</strong> Any violation of guidelines will make your LIVE ineligible for monetization.</li>
          <li><strong>Don't produce low-quality content:</strong> Inauthentic or low-quality LIVEs will not be monetized.</li>
        </ul>
        
        <h2>Exploring Other Monetization Avenues on TikTok LIVE</h2>
        <h3>How to diversify your income beyond LIVE Gifts?</h3>
        
        <h4>How To:</h4>
        <ul>
          <li><strong>Use TikTok Shop in LIVE:</strong> If you sell products, integrate TikTok Shop into your LIVE for live demonstrations and direct sales.</li>
          <li><strong>Seek brand partnerships:</strong> Collaborate with brands for sponsored LIVEs or product placements.</li>
          <li><strong>Engage in affiliate marketing:</strong> Promote other brands' products using a unique link to earn a commission on sales.</li>
          <li><strong>Utilize the Creator Rewards Program:</strong> Create videos longer than one minute to potentially generate income based on views and engagement.</li>
          <li><strong>Offer LIVE Subscriptions:</strong> Provide exclusive content to your most loyal fans via a paid subscription.</li>
        </ul>
        
        <h4>What Not To Do:</h4>
        <ul>
          <li><strong>Don't stick to a single revenue stream:</strong> Explore and diversify your monetization options.</li>
          <li><strong>Don't promote irrelevant products:</strong> Ensure products align with your niche and audience interest.</li>
          <li><strong>Don't violate transparency rules:</strong> Always disclose sponsored or affiliate content.</li>
        </ul>
      `
    },
    {
      id: 'tiktok-live-best-practices',
      title: 'TikTok LIVE: Best Practices for Success',
      category: 'tiktok-live-wiki',
      date: 'July 4, 2023',
      summary: 'Essential tips and strategies to make your TikTok LIVE streams more engaging and successful.',
      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Best+Practices',
      content: `
        <h2>TikTok LIVE: Best Practices for Success</h2>
        <h3>How to maximize engagement and success during your LIVE streams?</h3>
        
        <h4>Before Going LIVE:</h4>
        <ul>
          <li><strong>Plan your content:</strong> Have a rough idea of what you want to talk about or do during your stream.</li>
          <li><strong>Announce your LIVE in advance:</strong> Use regular posts to let your followers know when you'll be going LIVE.</li>
          <li><strong>Choose optimal timing:</strong> Stream when your audience is most active (check your analytics).</li>
          <li><strong>Prepare your setup:</strong> Ensure good lighting, clear audio, and a stable internet connection.</li>
        </ul>
        
        <h4>During Your LIVE:</h4>
        <ul>
          <li><strong>Greet viewers by name:</strong> Welcome people as they join to create a personal connection.</li>
          <li><strong>Read and respond to comments:</strong> Active engagement keeps viewers interested and encourages participation.</li>
          <li><strong>Keep the energy high:</strong> Be enthusiastic and maintain an upbeat demeanor throughout the stream.</li>
          <li><strong>Use interactive features:</strong> Polls, Q&As, and challenges can boost engagement.</li>
          <li><strong>Collaborate with other creators:</strong> Multi-user LIVEs can expand your reach.</li>
        </ul>
        
        <h4>What Not To Do:</h4>
        <ul>
          <li><strong>Don't ignore your audience:</strong> Failing to interact with viewers will cause them to leave.</li>
          <li><strong>Don't have long periods of silence:</strong> Keep talking even when there are few viewers.</li>
          <li><strong>Don't end abruptly:</strong> Give viewers a warning before ending your stream and thank them for watching.</li>
          <li><strong>Don't multitask excessively:</strong> Stay focused on your audience rather than doing other activities.</li>
        </ul>
        
        <h4>Post-LIVE:</h4>
        <ul>
          <li><strong>Save highlights:</strong> Create short clips from your LIVE to post as regular content.</li>
          <li><strong>Thank your audience:</strong> Post a follow-up thanking viewers and gift senders.</li>
          <li><strong>Analyze performance:</strong> Review your LIVE analytics to improve future streams.</li>
        </ul>
      `
    }
  ];

  // More articles for different categories
  const moreArticles = [
    {
      id: 'agency-revenue-sharing',
      title: 'Understanding Revenue Sharing',
      category: 'revenue',
      date: 'June 28, 2023',
      summary: 'Learn how our revenue sharing model works and how to maximize your earnings.',
      content: `
        <h2>Understanding Revenue Sharing</h2>
        <p>Our agency operates on a transparent revenue-sharing model designed to reward creators fairly while supporting agency operations and growth initiatives.</p>
        
        <h3>Revenue Split Breakdown:</h3>
        <ul>
          <li><strong>Creator Share: 70%</strong> - The majority goes directly to you</li>
          <li><strong>Agency Support: 20%</strong> - Covers management, marketing, and technical support</li>
          <li><strong>Platform Fees: 10%</strong> - Standard industry platform processing fees</li>
        </ul>
        
        <h3>How Payments Work:</h3>
        <p>Payments are processed monthly, with earnings from the previous month paid out by the 15th of the current month. All payments are tracked transparently in your creator dashboard.</p>
      `
    },
    {
      id: 'brand-campaign-participation',
      title: 'How to Participate in Brand Campaigns',
      category: 'campaigns',
      date: 'June 25, 2023',
      summary: 'Step-by-step guide to joining and succeeding in brand partnership campaigns.',
      content: `
        <h2>How to Participate in Brand Campaigns</h2>
        <p>Brand campaigns are one of the most lucrative opportunities for creators in our agency. Here's how to get involved and succeed.</p>
        
        <h3>Getting Selected for Campaigns:</h3>
        <ul>
          <li>Maintain consistent, high-quality content</li>
          <li>Keep your audience engagement rates high</li>
          <li>Follow all agency guidelines and policies</li>
          <li>Respond promptly to campaign invitations</li>
        </ul>
        
        <h3>Campaign Requirements:</h3>
        <ul>
          <li>Meet minimum follower counts (varies by campaign)</li>
          <li>Demonstrate brand alignment with your content</li>
          <li>Commit to delivery deadlines</li>
          <li>Maintain professional communication</li>
        </ul>
      `
    }
  ];

  // Function to highlight search terms in text
  const highlightSearchTerm = (text) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #ffeb3b; padding: 0 2px;">$1</mark>');
  };

  // Function to highlight search terms in HTML content
  const highlightHtmlContent = (htmlContent) => {
    if (!searchTerm.trim()) return htmlContent;
    
    // Simple text-based highlighting that preserves HTML structure
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return htmlContent.replace(regex, '<mark style="background-color: #ffeb3b; padding: 0 2px;">$1</mark>');
  };

  // Filter articles based on search term and active tab
  const filterArticles = () => {
    let articlesToFilter = [];
    
    if (tabValue === 0) {
      // All articles
      articlesToFilter = [...latestArticles, ...moreArticles];
    } else if (tabValue === 1) {
      // Agency articles
      articlesToFilter = moreArticles.filter(article => 
        agencyCategories.some(cat => cat.id === article.category)
      );
    } else if (tabValue === 2) {
      // TikTok articles
      articlesToFilter = latestArticles; // TikTok LIVE articles
    }
    
    if (!searchTerm.trim()) {
      return articlesToFilter;
    }
    
    return articlesToFilter.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Filter categories based on search term and active tab
  const filterCategories = () => {
    let categoriesToFilter = [];
    
    if (tabValue === 1) {
      categoriesToFilter = agencyCategories;
    } else if (tabValue === 2) {
      categoriesToFilter = tiktokCategories;
    }
    
    if (!searchTerm.trim()) {
      return categoriesToFilter;
    }
    
    return categoriesToFilter.filter(category =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredArticles = filterArticles();
  const filteredCategories = filterCategories();

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
          <Link
            component={Link}
            to="/dashboard"
            style={{ 
              textDecoration: 'none', 
              color: 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <WikiIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Typography color="text.primary">Knowledge Base</Typography>
        </Breadcrumbs>

        {/* Header */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 2,
            mb: 4
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <WikiIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              TikPulse Knowledge Base
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Everything you need to know about working with our agency and succeeding on TikTok
            </Typography>
          </Box>
        </Paper>

        {/* Search Bar */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <TextField
            ref={searchInputRef}
            fullWidth
            placeholder="Search articles, guides, and tutorials..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} edge="end" size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.12)'
                }
              }
            }}
            variant="outlined"
          />
        </Paper>

        {/* Navigation Tabs */}
        <Paper elevation={1} sx={{ mb: 4, borderRadius: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered={!isMobile}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{ 
              '& .MuiTab-root': { 
                textTransform: 'none',
                minHeight: 64,
                fontSize: '1rem'
              },
              '& .Mui-selected': {
                color: '#6200ea',
                fontWeight: 'bold'
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#6200ea',
                height: 3
              }
            }}
          >
            <Tab 
              label="All Content" 
              icon={<ArticleIcon />} 
              iconPosition="start"
            />
            <Tab 
              label="Agency Info" 
              icon={<BusinessIcon />} 
              iconPosition="start" 
            />
            <Tab 
              label="TikTok Guides" 
              icon={<TikTokIcon />} 
              iconPosition="start" 
            />
          </Tabs>
        </Paper>

        {/* Content based on active tab */}
        <Grid container spacing={4}>
          {/* Show categories for Agency Info and TikTok Guides tabs */}
          {(tabValue === 1 || tabValue === 2) && (
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: 'fit-content' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <CategoryIcon sx={{ mr: 1 }} />
                  Categories
                </Typography>
                
                <List>
                  {filteredCategories.map((category) => (
                    <ListItem key={category.id} disablePadding>
                      <ListItemButton 
                        sx={{ 
                          borderRadius: 1,
                          mb: 1,
                          '&:hover': { bgcolor: 'rgba(98, 0, 234, 0.08)' }
                        }}
                      >
                        <ListItemIcon>
                          {category.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <div dangerouslySetInnerHTML={{ 
                              __html: highlightSearchTerm(category.title) 
                            }} />
                          }
                          secondary={
                            <div dangerouslySetInnerHTML={{ 
                              __html: highlightSearchTerm(category.description) 
                            }} />
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          )}

          {/* Articles Grid */}
          <Grid item xs={12} md={tabValue === 0 ? 12 : 8}>
            {searchTerm && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  Found {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''} for "{searchTerm}"
                </Typography>
              </Box>
            )}
            
            <Grid container spacing={3}>
              {filteredArticles.map((article) => (
                <Grid item xs={12} sm={6} lg={tabValue === 0 ? 4 : 6} key={article.id}>
                  <Card 
                    elevation={2} 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    {article.image && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={article.image}
                        alt={article.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip 
                          label={article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                          size="small" 
                          sx={{ 
                            bgcolor: '#e3f2fd',
                            color: '#1976d2',
                            fontWeight: 'medium'
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                          {article.date}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 'bold',
                          lineHeight: 1.3,
                          mb: 2
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ 
                          __html: highlightSearchTerm(article.title) 
                        }} />
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 3,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ 
                          __html: highlightSearchTerm(article.summary) 
                        }} />
                      </Typography>
                      
                      {/* Article Content Accordion */}
                      <Accordion elevation={0} sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
                        <AccordionSummary 
                          expandIcon={<ExpandMoreIcon />}
                          sx={{ 
                            px: 0,
                            '& .MuiAccordionSummary-content': { margin: 0 }
                          }}
                        >
                          <Button 
                            variant="outlined" 
                            size="small"
                            sx={{ 
                              borderColor: '#6200ea',
                              color: '#6200ea',
                              '&:hover': {
                                borderColor: '#3700b3',
                                bgcolor: 'rgba(98, 0, 234, 0.04)'
                              }
                            }}
                          >
                            Read Full Article
                          </Button>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 0, pt: 2 }}>
                          <Box sx={{ 
                            '& h2': { color: '#1976d2', fontSize: '1.25rem', fontWeight: 'bold', mb: 2 },
                            '& h3': { color: '#333', fontSize: '1.1rem', fontWeight: 'bold', mb: 1.5, mt: 2 },
                            '& h4': { color: '#555', fontSize: '1rem', fontWeight: 'bold', mb: 1, mt: 1.5 },
                            '& ul': { pl: 2, mb: 2 },
                            '& li': { mb: 0.5 },
                            '& p': { mb: 2, lineHeight: 1.6 },
                            '& strong': { color: '#1976d2' }
                          }}>
                            <HtmlContent html={highlightHtmlContent(article.content)} />
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            {filteredArticles.length === 0 && (
              <Paper elevation={1} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
                <SearchIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" gutterBottom color="text.secondary">
                  No articles found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm 
                    ? `Try adjusting your search terms or browse different categories.`
                    : `No articles available in this category yet.`
                  }
                </Typography>
                {searchTerm && (
                  <Button 
                    variant="outlined" 
                    onClick={clearSearch}
                    sx={{ mt: 2 }}
                  >
                    Clear Search
                  </Button>
                )}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default WikiPage; 
