import React, { useState, useEffect } from "react";
import "./EventForm.css";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

const EventForm = ({
  onEventCreated,
  selectedEvent = {},
  participantsList = [],
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: selectedEvent?.title || "",
    description: selectedEvent?.description || "",
    start: selectedEvent?.start || "",
    end: selectedEvent?.end || "",
    location: selectedEvent?.location || "",
    type: selectedEvent?.type || "",
    status: selectedEvent?.status || "upcoming",
    color: selectedEvent?.color || "#1976d2",
    _id: selectedEvent?._id || null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent?.title || "",
        description: selectedEvent?.description || "",
        start: selectedEvent?.start
          ? new Date(selectedEvent?.start).toISOString().slice(0, 16)
          : "",
        end: selectedEvent?.end
          ? new Date(selectedEvent?.end).toISOString().slice(0, 16)
          : "",
        location: selectedEvent?.location || "",
        type: selectedEvent?.type || "",
        status: selectedEvent?.status || "upcoming",
        color: selectedEvent?.color || "#1976d2",
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear the error for the field being edited
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const now = new Date(); // Current date and time

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.start) {
      newErrors.start = "Start date and time are required.";
    } else if (new Date(formData.start) < now) {
      newErrors.start = "Start date and time cannot be in the past.";
    }

    if (formData.end && new Date(formData.end) < new Date(formData.start)) {
      newErrors.end = "End date must be after the start date.";
    }

    if (!formData.type) {
      newErrors.type = "Event type is required.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const eventData = {
      ...formData,
      start: new Date(formData.start).toISOString(),
      end: formData.end ? new Date(formData.end).toISOString() : null,
    };
    if (selectedEvent?._id) {
      eventData._id = selectedEvent._id; // Include _id for updates
    }
    onEventCreated(eventData);
    setFormData({
      title: "",
      description: "",
      start: "",
      end: "",
      location: "",
      type: "",
      status: "upcoming",
      color: "#1976d2",
    });
    setErrors({});
  };

  return (
    <div className="event-form-container" style={{ width: "100%" }}>
      <div className="event-form-card">
        <h2>{selectedEvent?.title ? "Edit Event" : "Create New Event"}</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter event title"
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter event description"
              rows={4}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start">Start Date & Time *</label>
              <input
                type="datetime-local"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
              />
              {errors.start && (
                <span
                  style={{
                    color: "red",
                  }}
                  className="error"
                >
                  {errors.start}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="end">End Date & Time</label>
              <input
                type="datetime-local"
                id="end"
                name="end"
                value={formData.end}
                onChange={handleChange}
              />
              {errors.end && (
                <span
                  style={{
                    color: "red",
                  }}
                  className="error"
                >
                  {errors.end}
                </span>
              )}
            </div>
          </div>

          <div>
            <Autocomplete
              multiple
              id="participants"
              options={Array.isArray(participantsList) ? participantsList : []}
              getOptionLabel={(option) => option?.username || ""}
              isOptionEqualToValue={(option, value) =>
                option?._id === value?._id
              }
              value={
                Array.isArray(participantsList) &&
                Array.isArray(formData.participants)
                  ? participantsList.filter((user) =>
                      formData.participants.includes(user._id)
                    )
                  : []
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  participants: newValue.map((user) => user?._id),
                }));
              }}
              loading={loading}
              disabled={
                !Array.isArray(participantsList) ||
                participantsList.length === 0
              }
              noOptionsText={
                loading ? "Loading participants..." : "No participants found"
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Participants"
                  placeholder="Search participants"
                  helperText={
                    (!Array.isArray(participantsList) ||
                      participantsList.length === 0) &&
                    !loading
                      ? "No participants available to select"
                      : ""
                  }
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Event Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select an event type
              </option>
              <option value="Live Stream">Live Stream</option>
              <option value="Workshop">Workshop</option>
              <option value="Meet & Greet">Meet & Greet</option>
              <option value="Training">Training</option>
              <option value="Contest">Contest</option>
            </select>
            {errors.type && <span className="error">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Event Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {selectedEvent?.title ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
