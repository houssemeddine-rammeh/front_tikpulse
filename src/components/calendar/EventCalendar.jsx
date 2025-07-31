import React, { useState, Fragment } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  EmojiEvents as TournamentIcon,
  GpsFixed as ChallengeIcon,
  Business as MeetingIcon,
  FlashOn as MatchIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const EventCalendar = ({ onEventSelect, onEventCreate, events, loading }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [isNavigating, setIsNavigating] = useState(false);

  // Utiliser les événements fournis ou des événements de test si aucun
  const eventsToUse = events && events.length > 0 ? events : [];
  
  // Vérifier si on est sur le mois actuel
  const isCurrentMonth = () => {
    const today = new Date();
    return currentDate.getFullYear() === today.getFullYear() && 
           currentDate.getMonth() === today.getMonth();
  };

  // Calculer les compteurs d'événements
  const tournamentCount = eventsToUse?.filter((e) => e.type === "tournament").length || 0;
  const challengeCount = eventsToUse?.filter((e) => e.type === "challenge").length || 0;
  const meetingCount = eventsToUse?.filter((e) => e.type === "meeting").length || 0;
  const matchCount = eventsToUse?.filter((e) => e.type === "match").length || 0;

  // Navigation dynamique selon le mode
  const goToPrevious = () => {
    let newDate;
    if (viewMode === 'month') {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    } else if (viewMode === 'week') {
      newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
    } else if (viewMode === 'day') {
      newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
    }
    console.log(`Going to previous ${viewMode}:`, newDate); // Debug
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    let newDate;
    if (viewMode === 'month') {
      newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    } else if (viewMode === 'week') {
      newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
    } else if (viewMode === 'day') {
      newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
    }
    console.log(`Going to next ${viewMode}:`, newDate); // Debug
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setIsNavigating(true);
    const today = new Date();
    const newDate = new Date(today.getFullYear(), today.getMonth(), 1);
    console.log('Button Today clicked! Going from:', currentDate, 'to:', newDate); // Debug
    
    setCurrentDate(newDate);
    
    // Reset navigation state et scroll
    setTimeout(() => {
      setIsNavigating(false);
      const todayCell = document.querySelector(`[data-day="${today.getDate()}"]`);
      if (todayCell) {
        todayCell.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  // Génération du calendrier mensuel avec événements étendus
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Jours vides du début
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dayEvents = eventsToUse?.filter(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end || event.start);
        
        // Normaliser les dates pour la comparaison
        const dayNorm = new Date(dayDate);
        dayNorm.setHours(0, 0, 0, 0);
        
        const startNorm = new Date(eventStart);
        startNorm.setHours(0, 0, 0, 0);
        
        const endNorm = new Date(eventEnd);
        endNorm.setHours(23, 59, 59, 999);
        
        return dayNorm >= startNorm && dayNorm <= endNorm;
      }) || [];
      
      days.push({
        day,
        date: dayDate,
        events: dayEvents,
        isToday: dayDate.toDateString() === new Date().toDateString()
      });
    }

    return days;
  };

  // Générer les événements étendus pour l'affichage en barres
  const generateExtendedEvents = (calendarDays) => {
    const extendedEvents = [];
    const processedEvents = new Set();

    eventsToUse?.forEach(event => {
      if (processedEvents.has(event.id)) return;
      
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end || event.start);
      
      // Trouver la position de début et fin dans le calendrier
      let startIndex = -1;
      let endIndex = -1;
      let startWeek = -1;
      let endWeek = -1;

      calendarDays.forEach((day, index) => {
        if (!day) return;
        
        const dayDate = new Date(day.date);
        dayDate.setHours(0, 0, 0, 0);
        
        const eventStartNorm = new Date(eventStart);
        eventStartNorm.setHours(0, 0, 0, 0);
        
        const eventEndNorm = new Date(eventEnd);
        eventEndNorm.setHours(23, 59, 59, 999);
        
        if (dayDate.getTime() === eventStartNorm.getTime() && startIndex === -1) {
          startIndex = index;
          startWeek = Math.floor(index / 7);
        }
        
        if (dayDate <= eventEndNorm && dayDate >= eventStartNorm) {
          endIndex = index;
          endWeek = Math.floor(index / 7);
        }
      });

      if (startIndex !== -1 && endIndex !== -1) {
        // Si l'événement s'étend sur plusieurs semaines, le diviser
        let currentWeek = startWeek;
        let currentStart = startIndex;
        
        while (currentWeek <= endWeek) {
          const weekEnd = Math.min((currentWeek + 1) * 7 - 1, calendarDays.length - 1);
          const currentEnd = currentWeek === endWeek ? endIndex : weekEnd;
          
          if (currentStart <= currentEnd) {
            extendedEvents.push({
              ...event,
              startIndex: currentStart,
              endIndex: currentEnd,
              week: currentWeek,
              span: currentEnd - currentStart + 1,
              startCol: currentStart % 7,
              endCol: currentEnd % 7
            });
          }
          
          currentWeek++;
          currentStart = currentWeek * 7;
        }
      }
      
      processedEvents.add(event.id);
    });

    return extendedEvents;
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  // Titre d'affichage selon le mode
  const getDisplayTitle = () => {
    if (viewMode === 'month') {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (viewMode === 'week') {
      const startWeek = getWeekStart(currentDate);
      const endWeek = new Date(startWeek);
      endWeek.setDate(startWeek.getDate() + 6);
      return `Semaine du ${startWeek.getDate()} au ${endWeek.getDate()} ${monthNames[endWeek.getMonth()]} ${endWeek.getFullYear()}`;
    } else if (viewMode === 'day') {
      return `${dayNames[currentDate.getDay()]} ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
  };

  // Obtenir le début de semaine (dimanche)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Génération de la vue semaine
  const generateWeekDays = () => {
    const startWeek = getWeekStart(currentDate);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startWeek);
      dayDate.setDate(startWeek.getDate() + i);
      
      const dayEvents = eventsToUse?.filter(event => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end || event.start);
        
        // Normaliser les dates pour la comparaison
        const dayNorm = new Date(dayDate);
        dayNorm.setHours(0, 0, 0, 0);
        
        const startNorm = new Date(eventStart);
        startNorm.setHours(0, 0, 0, 0);
        
        const endNorm = new Date(eventEnd);
        endNorm.setHours(23, 59, 59, 999);
        
        return dayNorm >= startNorm && dayNorm <= endNorm;
      }) || [];
      
      days.push({
        day: dayDate.getDate(),
        date: dayDate,
        events: dayEvents,
        isToday: dayDate.toDateString() === new Date().toDateString(),
        dayName: dayNames[i]
      });
    }
    
    return days;
  };

  // Génération de la vue jour
  const generateDayView = () => {
    const dayEvents = eventsToUse?.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end || event.start);
      
      // Normaliser les dates pour la comparaison
      const dayNorm = new Date(currentDate);
      dayNorm.setHours(0, 0, 0, 0);
      
      const startNorm = new Date(eventStart);
      startNorm.setHours(0, 0, 0, 0);
      
      const endNorm = new Date(eventEnd);
      endNorm.setHours(23, 59, 59, 999);
      
      return dayNorm >= startNorm && dayNorm <= endNorm;
    }) || [];
    
    return {
      day: currentDate.getDate(),
      date: currentDate,
      events: dayEvents,
      isToday: currentDate.toDateString() === new Date().toDateString(),
      dayName: dayNames[currentDate.getDay()]
    };
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>Loading calendar...</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h3">
            📅 Events Calendar
          </Typography>
        </Box>

        {/* Types d'Événements - Format Horizontal */}
        <TableContainer component={Paper} elevation={2} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.light' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <TournamentIcon sx={{ mr: 1 }} />
                    Tournament
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <ChallengeIcon sx={{ mr: 1 }} />
                    Challenge
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <MeetingIcon sx={{ mr: 1 }} />
                    Meeting
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <MatchIcon sx={{ mr: 1 }} />
                    Match
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="warning.main">
                    {tournamentCount}Tournaments
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {challengeCount}Challenges
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    {meetingCount}Meetings
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    {matchCount}Matches
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Contrôles de Navigation */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={goToPrevious} color="primary">
              <ChevronLeft />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2, minWidth: '200px', textAlign: 'center' }}>
              {getDisplayTitle()}
            </Typography>
            <IconButton onClick={goToNext} color="primary">
              <ChevronRight />
            </IconButton>
          </Box>
          <Box>
            <Button 
              variant={viewMode === 'month' ? 'contained' : 'outlined'} 
              onClick={() => setViewMode('month')}
              sx={{ mr: 1 }}
            >
              📅 Month
            </Button>
            <Button 
              variant={viewMode === 'week' ? 'contained' : 'outlined'} 
              onClick={() => setViewMode('week')}
              sx={{ mr: 1 }}
            >
              📊 Week
            </Button>
            <Button 
              variant={viewMode === 'day' ? 'contained' : 'outlined'} 
              onClick={() => setViewMode('day')}
              sx={{ mr: 1 }}
            >
              📋 Day
            </Button>
            <Button 
              variant={isCurrentMonth() ? "contained" : "outlined"}
              onClick={goToToday}
              color="primary"
              sx={{ fontWeight: 'bold' }}
              disabled={isNavigating}
            >
              {isNavigating ? "⏳ Navigation..." : 
               isCurrentMonth() ? "✅ Mois Actuel" : "📅 Aujourd'hui"}
            </Button>
          </Box>
        </Box>

        {/* Calendrier Personnalisé - Vues Conditionnelles */}
        {viewMode === 'month' && (() => {
          const calendarDays = generateCalendarDays();
          const extendedEvents = generateExtendedEvents(calendarDays);
          
          return (
            <TableContainer component={Paper} elevation={2}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    {dayNames.map((dayName) => (
                      <TableCell key={dayName} align="center" sx={{ fontWeight: 'bold', p: 1 }}>
                        {dayName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: Math.ceil(calendarDays.length / 7) }, (_, weekIndex) => (
                    <Fragment key={weekIndex}>
                      {/* Ligne des jours */}
                      <TableRow sx={{ position: 'relative' }}>
                        {Array.from({ length: 7 }, (_, dayIndex) => {
                          const dayData = calendarDays[weekIndex * 7 + dayIndex];
                          
                          return (
                            <TableCell 
                              key={dayIndex} 
                              align="center" 
                              data-day={dayData?.day || null}
                              sx={{ 
                                height: '100px', 
                                width: '14.28%',
                                verticalAlign: 'top',
                                p: 1,
                                cursor: dayData ? 'pointer' : 'default',
                                bgcolor: dayData?.isToday ? 'primary.light' : 'inherit',
                                '&:hover': dayData ? { bgcolor: 'grey.50' } : {},
                                position: 'relative',
                                border: '1px solid #e0e0e0'
                              }}
                              onClick={() => {
                                if (dayData && onEventCreate) {
                                  onEventCreate({ start: dayData.date, end: dayData.date });
                                }
                              }}
                            >
                              {dayData && (
                                <Box>
                                  <Typography 
                                    variant="body2" 
                                    fontWeight={dayData.isToday ? 'bold' : 'normal'}
                                    color={dayData.isToday ? 'white' : 'inherit'}
                                    sx={{ mb: 1 }}
                                  >
                                    {dayData.day}
                                  </Typography>
                                  
                                  {/* Événements étendus pour ce jour */}
                                  <Box sx={{ mt: 1 }}>
                                    {extendedEvents
                                      .filter(event => 
                                        event.week === weekIndex && 
                                        dayIndex >= event.startCol && 
                                        dayIndex <= event.endCol
                                      )
                                      .map((event, eventIndex) => {
                                        const isStart = dayIndex === event.startCol;
                                        const isEnd = dayIndex === event.endCol;
                                        const isMiddle = dayIndex > event.startCol && dayIndex < event.endCol;
                                        
                                        return (
                                          <Box
                                            key={`${event.id}-${eventIndex}`}
                                            sx={{
                                              height: '20px',
                                              mb: 0.5,
                                              bgcolor: 
                                                event.type === 'tournament' ? 'warning.main' :
                                                event.type === 'challenge' ? 'error.main' :
                                                event.type === 'meeting' ? 'primary.main' :
                                                event.type === 'match' ? 'success.main' : 'primary.main',
                                              borderRadius: isStart && isEnd ? '10px' : 
                                                           isStart ? '10px 0 0 10px' :
                                                           isEnd ? '0 10px 10px 0' : '0',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: isStart ? 'flex-start' : 'center',
                                              cursor: 'pointer',
                                              color: 'white',
                                              px: isStart ? 1 : 0,
                                              position: 'relative',
                                              overflow: 'hidden',
                                              '&:hover': {
                                                opacity: 0.8,
                                                transform: 'scale(1.02)'
                                              },
                                              '&::before': isMiddle ? {
                                                content: '""',
                                                position: 'absolute',
                                                left: '-1px',
                                                right: '-1px',
                                                top: 0,
                                                bottom: 0,
                                                bgcolor: 'inherit'
                                              } : {}
                                            }}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (onEventSelect) onEventSelect(event);
                                            }}
                                          >
                                            {isStart && (
                                              <Typography 
                                                variant="caption" 
                                                sx={{ 
                                                  color: 'white', 
                                                  fontWeight: 'bold',
                                                  fontSize: '10px',
                                                  overflow: 'hidden',
                                                  textOverflow: 'ellipsis',
                                                  whiteSpace: 'nowrap'
                                                }}
                                              >
                                                {event.title}
                                              </Typography>
                                            )}
                                          </Box>
                                        );
                                      })
                                    }
                                  </Box>
                                </Box>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        })()}

        {/* Vue Semaine */}
        {viewMode === 'week' && (() => {
          const weekDays = generateWeekDays();
          
          return (
            <TableContainer component={Paper} elevation={2}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    {weekDays.map((dayData, index) => (
                      <TableCell key={index} align="center" sx={{ fontWeight: 'bold', p: 1 }}>
                        <Box>
                          <Typography variant="caption">{dayData.dayName}</Typography>
                          <Typography variant="h6" fontWeight="bold">
                            {dayData.day}
                          </Typography>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {weekDays.map((dayData, index) => (
                      <TableCell 
                        key={index} 
                        align="center"
                        sx={{ 
                          height: '150px',
                          width: '14.28%',
                          verticalAlign: 'top',
                          p: 1,
                          cursor: 'pointer',
                          bgcolor: dayData.isToday ? 'primary.light' : 'inherit',
                          '&:hover': { bgcolor: 'grey.50' },
                          border: '1px solid #e0e0e0'
                        }}
                        onClick={() => {
                          if (onEventCreate) {
                            onEventCreate({ start: dayData.date, end: dayData.date });
                          }
                        }}
                      >
                        <Box>
                          {/* Événements pour ce jour */}
                          {dayData.events.map((event, eventIndex) => (
                            <Box
                              key={`${event.id}-${eventIndex}`}
                              sx={{
                                height: '24px',
                                mb: 0.5,
                                bgcolor: 
                                  event.type === 'tournament' ? 'warning.main' :
                                  event.type === 'challenge' ? 'error.main' :
                                  event.type === 'meeting' ? 'primary.main' :
                                  event.type === 'match' ? 'success.main' : 'primary.main',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'white',
                                px: 1,
                                '&:hover': {
                                  opacity: 0.8,
                                  transform: 'scale(1.02)'
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onEventSelect) onEventSelect(event);
                              }}
                            >
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: 'white', 
                                  fontWeight: 'bold',
                                  fontSize: '10px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {event.title}
                              </Typography>
                            </Box>
                          ))}
                          
                          {dayData.events.length === 0 && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                              Aucun événement
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          );
        })()}

        {/* Vue Jour */}
        {viewMode === 'day' && (() => {
          const dayView = generateDayView();
          
          return (
            <TableContainer component={Paper} elevation={2}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell align="center" sx={{ fontWeight: 'bold', p: 2 }}>
                      <Typography variant="h6">
                        {getDisplayTitle()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell 
                      align="center"
                      sx={{ 
                        minHeight: '200px',
                        verticalAlign: 'top',
                        p: 3,
                        cursor: 'pointer',
                        bgcolor: dayView.isToday ? 'primary.light' : 'inherit',
                        '&:hover': { bgcolor: 'grey.50' }
                      }}
                      onClick={() => {
                        if (onEventCreate) {
                          onEventCreate({ start: dayView.date, end: dayView.date });
                        }
                      }}
                    >
                      <Box>
                        {dayView.events.length > 0 ? (
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              {dayView.events.length} événement(s) programmé(s)
                            </Typography>
                            {dayView.events.map((event, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  mb: 2,
                                  p: 2,
                                  bgcolor: 
                                    event.type === 'tournament' ? 'warning.main' :
                                    event.type === 'challenge' ? 'error.main' :
                                    event.type === 'meeting' ? 'primary.main' :
                                    event.type === 'match' ? 'success.main' : 'primary.main',
                                  borderRadius: 2,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    opacity: 0.8,
                                    transform: 'scale(1.02)'
                                  }
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onEventSelect) onEventSelect(event);
                                }}
                              >
                                <Typography variant="h6" color="white">
                                  {event.title}
                                </Typography>
                                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                                  {event.type?.charAt(0).toUpperCase() + event.type?.slice(1)}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              Aucun événement programmé
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Cliquez pour ajouter un événement
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          );
        })()}
      </CardContent>
    </Card>
  );
};

export default EventCalendar;