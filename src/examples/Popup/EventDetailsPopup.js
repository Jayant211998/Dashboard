import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

import PropTypes from "prop-types";

function EventDetailsPopup({ handleClose, requestData }) {
  return (
    <Dialog open={requestData !== null} onClose={handleClose}>
      <DialogTitle>Event Data</DialogTitle>
      <DialogContent>
        <img
          src={`data:image/png;base64,${requestData.img}`}
          alt="Incident"
          style={{
            width: "30rem",
            height: "15rem",
            border: "0.1rem solid black",
            borderRadius: "0.5rem",
            margin: "1rem",
          }}
        />
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Event Id: {requestData.data.eventId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              defaultValue={requestData.data.eventName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              defaultValue={requestData.data.description}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              defaultValue={requestData.data.eventName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              defaultValue={`${requestData.data.startDate} to ${requestData.data.endDate}`}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Time"
              defaultValue={`${requestData.data.startTime} to ${requestData.data.endTime}`}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Venue" defaultValue={requestData.data.venue} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Chief Guest"
              defaultValue={`${requestData.data.guest[0].guestName}(${requestData.data.guest[0].designation})`}
              disabled
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

EventDetailsPopup.propTypes = {
  requestData: PropTypes.shape({
    data: PropTypes.shape({
      eventId: PropTypes.string.isRequired,
      eventName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      venue: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      guest: PropTypes.arrayOf(
        PropTypes.shape({
          guestName: PropTypes.string,
          designation: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default EventDetailsPopup;
