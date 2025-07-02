import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventCalendar.css";
import { buildApiUrl, getApiHeaders } from "../../config/api";

const localizer = momentLocalizer(moment);

const EventCalendar = ({ onEventSelect, onEventCreate, events, loading }) => {
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
        <p>Loading calendar...</p>
      </div>
    );
  }

  return (
    <div className="event-calendar-container">
      <div className="calendar-header">
        <h2>📅 Events Calendar</h2>
        <div className="calendar-legend">
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#ff6b35" }}
            ></span>
            <span>Tournament</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#4caf50" }}
            ></span>
            <span>Challenge</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#2196f3" }}
            ></span>
            <span>Meeting</span>
          </div>
          <div className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: "#9c27b0" }}
            ></span>
            <span>Match</span>
          </div>
        </div>
      </div>

      <div className="calendar-stats">
        <div className="stat-item">
          <span className="stat-number">
            {events.filter((e) => e.type === "tournament").length}
          </span>
          <span className="stat-label">Tournaments</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {events.filter((e) => e.type === "challenge").length}
          </span>
          <span className="stat-label">Challenges</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {events.filter((e) => e.type === "match").length}
          </span>
          <span className="stat-label">Matches</span>
        </div>
      </div>

      <div className="calendar-wrapper">
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
