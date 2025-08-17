import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

      title: t('wikiPage.agencyCategories.gettingStarted.title'), 

      icon: <BusinessIcon />, 

      description: t('wikiPage.agencyCategories.gettingStarted.description') 

    },

    { 

      id: 'revenue', 

      title: t('wikiPage.agencyCategories.revenue.title'), 

      icon: <BusinessIcon />, 

      description: t('wikiPage.agencyCategories.revenue.description') 

    },

    { 

      id: 'campaigns', 

      title: t('wikiPage.agencyCategories.campaigns.title'), 

      icon: <BusinessIcon />, 

      description: t('wikiPage.agencyCategories.campaigns.description') 

    },

    { 

      id: 'policies', 

      title: t('wikiPage.agencyCategories.policies.title'), 

      icon: <BusinessIcon />, 

      description: t('wikiPage.agencyCategories.policies.description') 

    },

  ];



  // Mock categories for TikTok info

  const tiktokCategories = [

    { 

      id: 'tiktok-basics', 

      title: t('wikiPage.tiktokCategories.tiktokBasics.title'), 

      icon: <TikTokIcon />, 

      description: t('wikiPage.tiktokCategories.tiktokBasics.description') 

    },

    { 

      id: 'content-strategy', 

      title: t('wikiPage.tiktokCategories.contentStrategy.title'), 

      icon: <TikTokIcon />, 

      description: t('wikiPage.tiktokCategories.contentStrategy.description') 

    },

    { 

      id: 'live-streaming', 

      title: t('wikiPage.tiktokCategories.liveStreaming.title'), 

      icon: <TikTokIcon />, 

      description: t('wikiPage.tiktokCategories.liveStreaming.description') 

    },

    { 

      id: 'tiktok-live-wiki', 

      title: t('wikiPage.tiktokCategories.tiktokLiveWiki.title'), 

      icon: <TikTokIcon />, 

      description: t('wikiPage.tiktokCategories.tiktokLiveWiki.description') 

    },

    { 

      id: 'tiktok-algorithm', 

      title: t('wikiPage.tiktokCategories.tiktokAlgorithm.title'), 

      icon: <TikTokIcon />, 

      description: t('wikiPage.tiktokCategories.tiktokAlgorithm.description') 

    },

  ];



  // Mock latest articles

  const latestArticles = [

    {

      id: 'tiktok-live-eligibility',

      title: t('wikiPage.articles.tiktokLiveEligibility.title'),

      category: 'tiktok-live-wiki',

      date: 'July 1, 2023',

      summary: t('wikiPage.articles.tiktokLiveEligibility.summary'),

      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Eligibility',

      content: t('wikiPage.articles.tiktokLiveEligibility.content')

    },

    {

      id: 'tiktok-live-content-rules',

      title: t('wikiPage.articles.tiktokLiveContentRules.title'),

      category: 'tiktok-live-wiki',

      date: 'July 2, 2023',

      summary: t('wikiPage.articles.tiktokLiveContentRules.summary'),

      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Rules',

      content: t('wikiPage.articles.tiktokLiveContentRules.content')

    },

    {

      id: 'tiktok-live-monetization',

      title: t('wikiPage.articles.tiktokLiveMonetization.title'),

      category: 'tiktok-live-wiki',

      date: 'July 3, 2023',

      summary: t('wikiPage.articles.tiktokLiveMonetization.summary'),

      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Monetization',

      content: t('wikiPage.articles.tiktokLiveMonetization.content')

    },

    {

      id: 'tiktok-live-best-practices',

      title: t('wikiPage.articles.tiktokLiveBestPractices.title'),

      category: 'tiktok-live-wiki',

      date: 'July 4, 2023',

      summary: t('wikiPage.articles.tiktokLiveBestPractices.summary'),

      image: 'https://via.placeholder.com/400x200?text=TikTok+LIVE+Best+Practices',

      content: t('wikiPage.articles.tiktokLiveBestPractices.content')

    }

  ];



  // More articles for different categories

  const moreArticles = [

    {

      id: 'agency-revenue-sharing',

      title: t('wikiPage.articles.agencyRevenueSharing.title'),

      category: 'revenue',

      date: 'June 28, 2023',

      summary: t('wikiPage.articles.agencyRevenueSharing.summary'),

      content: t('wikiPage.articles.agencyRevenueSharing.content')

    },

    {

      id: 'brand-campaign-participation',

      title: t('wikiPage.articles.brandCampaignParticipation.title'),

      category: 'campaigns',

      date: 'June 25, 2023',

      summary: t('wikiPage.articles.brandCampaignParticipation.summary'),

      content: t('wikiPage.articles.brandCampaignParticipation.content')

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

            {t('wikiPage.dashboard')}

          </Link>

          <Typography color="text.primary">{t('wikiPage.knowledgeBase')}</Typography>

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

              {t('wikiPage.title')}

            </Typography>

            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600, mx: 'auto' }}>

              {t('wikiPage.subtitle')}

            </Typography>

          </Box>

        </Paper>



        {/* Search Bar */}

        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>

          <TextField

            ref={searchInputRef}

            fullWidth

            placeholder={t('wikiPage.searchPlaceholder')}

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

              label={t('wikiPage.tabs.allContent')} 

              icon={<ArticleIcon />} 

              iconPosition="start"

            />

            <Tab 

              label={t('wikiPage.tabs.agencyInfo')} 

              icon={<BusinessIcon />} 

              iconPosition="start" 

            />

            <Tab 

              label={t('wikiPage.tabs.tiktokGuides')} 

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

                  {t('wikiPage.categories')}

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

                  {t('wikiPage.searchResults', { 
                    count: filteredArticles.length, 
                    plural: filteredArticles.length !== 1 ? 's' : '', 
                    term: searchTerm 
                  })}

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

                            {t('wikiPage.readFullArticle')}

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

                  {t('wikiPage.noArticlesFound')}

                </Typography>

                <Typography variant="body2" color="text.secondary">

                  {searchTerm 

                    ? t('wikiPage.noArticlesFoundDescription')

                    : t('wikiPage.noArticlesInCategory')

                  }

                </Typography>

                {searchTerm && (

                  <Button 

                    variant="outlined" 

                    onClick={clearSearch}

                    sx={{ mt: 2 }}

                  >

                    {t('wikiPage.clearSearch')}

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


