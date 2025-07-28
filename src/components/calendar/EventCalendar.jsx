import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventCalendar.css";
import { buildApiUrl, getApiHeaders } from "../../config/api";
import { 
  Box, 
  Typography, 
  CircularProgress, 
  useTheme,
  alpha 
} from "@mui/material";

const localizer = momentLocalizer(moment);

const EventCalendar = ({ onEventSelect, onEventCreate, events, loading }) => {
  const theme = useTheme();
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getEventTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "live stream":
        return "#FF6347"; // Tomato
      case "workshop":
        return "#8A2BE2"; // BlueViolet
      case "meet & greet":
        return "#FF69B4"; // HotPink
      case "training":
        return "#00CED1"; // DarkTurquoise
      case "contest":
        return "#FFD700"; // Gold
      case "tournament":
        return "#FFD700"; // Gold
      case "challenge":
        return "#FF4500"; // OrangeRed
      case "meeting":
        return "#1E90FF"; // DodgerBlue
      case "match":
        return "#32CD32"; // LimeGreen
      default:
        return theme.palette.primary.main; // Use theme primary color
    }
  };
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: getEventTypeColor(event.type),
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        fontSize: "13px",
        fontWeight: "bold",
      },
    };
  };

  const handleSelectEvent = (event) => {
    if (onEventSelect) {
      onEventSelect(event);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    if (onEventCreate) {
      onEventCreate(slotInfo);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "tournament":
        return "🏆";
      case "challenge":
        return "🎯";
      case "meeting":
        return "📋";
      case "match":
        return "⚡";
      default:
        return "📅";
    }
  };

  const eventTitleAccessor = (event) => {
    const icon = getEventTypeIcon(event?.type);
    return `${icon} ${event?.title}`;
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          py: 8,
          textAlign: 'center'
        }}
      >
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.primary">
          Loading calendar...
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      className={`event-calendar-container ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
      sx={{ 
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        p: 3,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box className="calendar-header" sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            mb: 2 
          }}
        >
          📅 Events Calendar
        </Typography>
        <Box 
          className="calendar-legend"
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2,
            mb: 3 
          }}
        >
          <Box className="legend-item" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              className="legend-color"
              sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: 1,
                backgroundColor: "#FFD700" 
              }}
            />
            <Typography variant="body2" color="text.secondary">Tournament</Typography>
          </Box>
          <Box className="legend-item" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              className="legend-color"
              sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: 1,
                backgroundColor: "#FF4500" 
              }}
            />
            <Typography variant="body2" color="text.secondary">Challenge</Typography>
          </Box>
          <Box className="legend-item" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              className="legend-color"
              sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: 1,
                backgroundColor: "#1E90FF" 
              }}
            />
            <Typography variant="body2" color="text.secondary">Meeting</Typography>
          </Box>
          <Box className="legend-item" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              className="legend-color"
              sx={{ 
                width: 16, 
                height: 16, 
                borderRadius: 1,
                backgroundColor: "#32CD32" 
              }}
            />
            <Typography variant="body2" color="text.secondary">Match</Typography>
          </Box>
        </Box>
      </Box>

      <Box 
        className="calendar-stats"
        sx={{ 
          display: 'flex', 
          gap: 3, 
          mb: 3,
          flexWrap: 'wrap'
        }}
      >
        <Box 
          className="stat-item"
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: 2,
            minWidth: 100
          }}
        >
          <Typography 
            variant="h6" 
            component="span" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.primary.main 
            }}
          >
            {events.filter((e) => e.type === "tournament").length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tournaments
          </Typography>
        </Box>
        <Box 
          className="stat-item"
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            bgcolor: alpha(theme.palette.secondary.main, 0.1),
            borderRadius: 2,
            minWidth: 100
          }}
        >
          <Typography 
            variant="h6" 
            component="span" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.secondary.main 
            }}
          >
            {events.filter((e) => e.type === "challenge").length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Challenges
          </Typography>
        </Box>
        <Box 
          className="stat-item"
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            p: 2,
            bgcolor: alpha(theme.palette.success.main, 0.1),
            borderRadius: 2,
            minWidth: 100
          }}
        >
          <Typography 
            variant="h6" 
            component="span" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.success.main 
            }}
          >
            {events.filter((e) => e.type === "match").length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Matches
          </Typography>
        </Box>
      </Box>

      <Box 
        className="calendar-wrapper"
        sx={{ 
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
          p: 2,
          border: `1px solid ${theme.palette.divider}`
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={eventTitleAccessor}
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day"]}
          view={currentView}
          date={currentDate}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          popup={true}
          tooltipAccessor={(event) =>
            `${event.title} - ${event.description || "No description"}`
          }
          dayLayoutAlgorithm="no-overlap"
        />
      </Box>
    </Box>
  );
};

export default EventCalendar;
