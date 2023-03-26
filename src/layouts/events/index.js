import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ErrorSnackbar from "examples/Snackbar/ErrorSnackbar";
import EventsPopup from "../../examples/Popup/EventsPopup";

function Events() {
  const [eventImage, setEventImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [guest, setGuest] = useState("");
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState(false);
  const [text, setText] = useState(false);
  const [textFields, setTextFields] = useState([]);

  console.log(textFields);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setEventImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate === "") {
      setError(true);
      setText("Please Enter Start date.");
    } else if (endDate === "") {
      setError(true);
      setText("Please Enter End date.");
    } else if (startTime === "") {
      setError(true);
      setText("Please Enter Start Time.");
    } else if (endTime === "") {
      setError(true);
      setText("Please Enter End Time.");
    } else if (eventName === "") {
      setError(true);
      setText("Please Enter Event Name.");
    } else if (description === "") {
      setError(true);
      setText("Please Enter Event Description.");
    } else if (venue === "") {
      setError(true);
      setText("Please Enter Event Venue.");
    } else if (guest === "") {
      setError(true);
      setText("Please Enter Number of People attending Event.");
    } else {
      setPopup(true);
      // Backend create new event entry
    }
  };

  const handleClose = () => {
    setPopup(false);
  };

  const handleAddTextField = () => {
    const newTextField = { id: textFields.length, name: "", designation: "" };
    setTextFields([...textFields, newTextField]);
  };

  const handleTextFieldChange = (event, id, property) => {
    const updatedTextFields = textFields.map((textField) => {
      if (textField.id === id && property === "name") {
        return { ...textField, name: event.target.value };
      }
      if (textField.id === id && property === "designation") {
        return { ...textField, designation: event.target.value };
      }
      return textField;
    });
    setTextFields(updatedTextFields);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {eventImage && (
          <div
            className="card"
            style={{
              backgroundImage: `url(${eventImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "50rem",
              height: "20rem",
              margin: "2rem auto",
              border: "1px solid black",
              position: "relative",
              borderRadius: "1rem",
            }}
          />
        )}
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Number Of Guests"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            />
          </Grid>
          {textFields.map((textField) => (
            <Grid item xs={12} key={textField.id}>
              <TextField
                label="Cheif Guest"
                type="text"
                style={{ width: "48%" }}
                value={textField.name || ""}
                onChange={(event) => handleTextFieldChange(event, textField.id, "name")}
              />
              <TextField
                label="Designation"
                type="text"
                style={{ width: "48%", marginLeft: "4%" }}
                value={textField.designation || ""}
                onChange={(event) => handleTextFieldChange(event, textField.id, "designation")}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              type="button"
              variant="contained"
              onClick={handleAddTextField}
              style={{ color: "white", width: "10rem" }}
            >
              Add text field
            </Button>
          </Grid>
          <br />
          <br />
          <br />
          <Button
            type="button"
            variant="contained"
            onClick={handleSubmit}
            style={{ color: "white", marginLeft: "1rem", width: "8rem" }}
          >
            Submit
          </Button>
        </Grid>
      </DashboardLayout>
      {popup && <EventsPopup detailData={eventName} handleClose={handleClose} />}
      {error && (
        <ErrorSnackbar
          text={text}
          handleClose={() => {
            setError(false);
          }}
        />
      )}
    </>
  );
}

export default Events;
