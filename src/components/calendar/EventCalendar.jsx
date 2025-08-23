import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventCalendar.css";
import { buildApiUrl, getApiHeaders } from "../../config/api";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";

const localizer = momentLocalizer(moment);

const EventCalendar = ({ onEventSelect, onEventCreate, events, loading, userRole = null }) => {
  const { t } = useTranslation();
  const { mode } = useTheme();

  // Inject theme-aware CSS for react-big-calendar
  useEffect(() => {
    const styleId = 'event-calendar-theme';
    let existingStyle = document.getElementById(styleId);
    
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .rbc-toolbar button {
        color: ${mode === 'light' ? '#333' : '#f9fafb'} !important;
        border: 1px solid ${mode === 'light' ? '#e0e0e0' : '#4b5563'} !important;
        background-color: ${mode === 'light' ? 'transparent' : '#374151'} !important;
      }
      .rbc-toolbar button:hover {
        background-color: ${mode === 'light' ? '#f5f5f5' : '#4b5563'} !important;
      }
      .rbc-toolbar button.rbc-active {
        background-color: #2196f3 !important;
        color: white !important;
        border-color: #2196f3 !important;
      }
      .rbc-header {
        color: ${mode === 'light' ? '#555' : '#d1d5db'} !important;
        background-color: ${mode === 'light' ? '#f9f9f9' : '#4b5563'} !important;
        border-bottom: 1px solid ${mode === 'light' ? '#eaeaea' : '#374151'} !important;
      }
      .rbc-month-view, .rbc-time-view {
        border: 1px solid ${mode === 'light' ? '#eaeaea' : '#4b5563'} !important;
        background-color: ${mode === 'light' ? 'white' : '#374151'} !important;
      }
      .rbc-day-bg:hover {
        background-color: ${mode === 'light' ? '#f5f7fa' : '#4b5563'} !important;
      }
      .rbc-today {
        background-color: ${mode === 'light' ? 'rgba(33, 150, 243, 0.08)' : 'rgba(33, 150, 243, 0.15)'} !important;
      }
      .rbc-off-range-bg {
        background-color: ${mode === 'light' ? '#f9fafc' : '#1f2937'} !important;
      }
      .rbc-date-cell {
        color: ${mode === 'light' ? '#333' : '#f9fafb'} !important;
      }
      .rbc-button-link {
        color: ${mode === 'light' ? '#333' : '#f9fafb'} !important;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [mode]);
  
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
        return "#1976d2"; // Default Blue
    }
  };
  const eventStyleGetter = (event) => {
    const backgroundColor = getEventTypeColor(event.type);
    return {
      style: {
        backgroundColor: backgroundColor,
        borderRadius: "6px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        fontSize: "13px",
        fontWeight: "600",
        boxShadow: mode === 'light' 
          ? `0 2px 6px ${backgroundColor}80`
          : `0 2px 8px ${backgroundColor}60`,
        padding: "2px 6px",
        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
      },
    };
  };

  const handleSelectEvent = (event) => {
    if (onEventSelect) {
      onEventSelect(event);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    // Only managers can create events, creators can only view
    if (onEventCreate && userRole === "manager") {
      onEventCreate(slotInfo);
    } else if (userRole === "creator") {
      console.log("📅 Creator clicked on calendar - view only mode");
    }
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
      <div className="calendar-loading">
        <div className="loading-spinner"></div>
        <p>{t('eventCalendar.loadingCalendar')}</p>
      </div>
    );
  }

  // Dynamic styles for theme support
  const containerStyle = {
    background: mode === 'light' 
      ? 'linear-gradient(to bottom, #ffffff, #f7f9fc)'
      : 'linear-gradient(to bottom, #1f2937, #111827)',
    boxShadow: mode === 'light'
      ? '0 10px 30px rgba(0, 0, 0, 0.08)'
      : '0 10px 30px rgba(0, 0, 0, 0.3)',
    color: mode === 'light' ? '#333' : '#f9fafb'
  };

  const headerStyle = {
    borderBottom: mode === 'light' 
      ? '1px solid rgba(0, 0, 0, 0.08)'
      : '1px solid rgba(255, 255, 255, 0.1)'
  };

  const statItemStyle = {
    background: mode === 'light' ? '#fff' : '#374151',
    boxShadow: mode === 'light'
      ? '0 4px 12px rgba(0, 0, 0, 0.05)'
      : '0 4px 12px rgba(0, 0, 0, 0.2)',
    color: mode === 'light' ? '#333' : '#f9fafb'
  };

  const calendarWrapperStyle = {
    background: mode === 'light' ? 'white' : '#374151',
    boxShadow: mode === 'light'
      ? '0 4px 12px rgba(0, 0, 0, 0.05)'
      : '0 4px 12px rgba(0, 0, 0, 0.2)'
  };

  const calendarStyle = {
    height: 550, 
    fontFamily: "'Inter', -apple-system, sans-serif",
    backgroundColor: mode === 'light' ? 'white' : '#374151',
    color: mode === 'light' ? '#333' : '#f9fafb'
  };

  return (
    <div className="event-calendar-container" style={containerStyle}>
      <div className="calendar-header" style={headerStyle}>
        <h2>📅{t('eventCalendar.title')}</h2>
        {userRole === "creator" && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '8px 16px', 
            borderRadius: '8px',
            marginBottom: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            📋 {t('eventCalendar.viewOnlyMode')}
          </div>
        )}
        <div className="calendar-legend">
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#ff6b35" }}
            ></span>
            <span style={{ color: mode === 'light' ? '#666' : '#d1d5db' }}>{t('eventCalendar.legend.tournament')}</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#4caf50" }}
            ></span>
            <span style={{ color: mode === 'light' ? '#666' : '#d1d5db' }}>{t('eventCalendar.legend.challenge')}</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#2196f3" }}
            ></span>
            <span style={{ color: mode === 'light' ? '#666' : '#d1d5db' }}>{t('eventCalendar.legend.meeting')}</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#9c27b0" }}
            ></span>
            <span style={{ color: mode === 'light' ? '#666' : '#d1d5db' }}>{t('eventCalendar.legend.match')}</span>
          </div>
        </div>
      </div>

      <div className="calendar-stats">
        <div className="stat-item" style={statItemStyle}>
          <span className="stat-number">
            {events.filter((e) => e.type === "tournament").length}
          </span>
          <span className="stat-label">Tournaments</span>
        </div>
        <div className="stat-item" style={statItemStyle}>
          <span className="stat-number">
            {events.filter((e) => e.type === "challenge").length}
          </span>
          <span className="stat-label">Challenges</span>
        </div>
        <div className="stat-item" style={statItemStyle}>
          <span className="stat-number">
            {events.filter((e) => e.type === "match").length}
          </span>
          <span className="stat-label">Meeting</span>
        </div>
        <div className="stat-item" style={statItemStyle}>
          <span className="stat-number">
            {events.filter((e) => e.type === "match").length}
          </span>
          <span className="stat-label">Matches</span>
        </div>
      </div>

      <div className="calendar-wrapper" style={calendarWrapperStyle}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={eventTitleAccessor}
          style={calendarStyle}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day"]}
          defaultView="month"
          popup={true}
          tooltipAccessor={(event) =>
            `${event.title} - ${event.description || "No description"}`
          }
          dayLayoutAlgorithm="no-overlap"
        />
      </div>
    </div>
  );
};

export default EventCalendar;
