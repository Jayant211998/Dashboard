import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import EventsPopup from "../../examples/Popup/EventsPopup";

function Events() {
  const [eventImage, setEventImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [popup, setPopup] = useState(false);

  const handleImageChange = (e) => {
    setEventImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {eventImage && <img src={eventImage} alt="Event" />}
        <Grid container spacing={2}>
          <br />
          <br />
          <Grid item xs={12}>
            <input label="Upload event image" type="file" onChange={handleImageChange} />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              label="Event start date"
              type="date"
              value={startDate}
              style={{ width: "48%" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              label="Event end date"
              type="date"
              style={{ width: "48%", marginLeft: "4%" }}
              value={endDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Event start time"
              type="time"
              value={startTime}
              style={{ width: "48%" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <TextField
              label="Event end time"
              type="time"
              style={{ width: "48%", marginLeft: "4%" }}
              value={endTime}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name of event"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Venue of event"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              multiline
            />
          </Grid>
          <br />
          <br />
          <br />
          <Button
            type="button"
            variant="contained"
            onClick={handleSubmit}
            style={{ color: "white", marginLeft: "0.8rem", width: "8rem" }}
          >
            Submit
          </Button>
        </Grid>
      </DashboardLayout>
      {popup && <EventsPopup detailData={eventName} handleClose={handleClose} />}
    </>
  );
}

export default Events;
