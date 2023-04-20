import React from "react";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 500,
  },
  image: {
    maxWidth: 100,
    maxHeight: 100,
    objectFit: "contain",
    marginRight: 10,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formControl: {
    minWidth: 120,
  },
}));

function DeathRequestPopup({ handleClose, requestData, handleSchedule, handleResolved }) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState("");

  const handleChange = (e) => {
    handleDateChange(e.target.value);
  };

  return (
    <Dialog open={requestData !== null} onClose={handleClose}>
      <DialogTitle>Death Certificate Request</DialogTitle>
      <DialogContent>
        <img
          src={`data:image/png;base64,${requestData.requestImages[0]}`}
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
        <img
          src={`data:image/png;base64,${requestData.requestImages[1]}`}
          alt="Incident"
          style={{
            width: "30rem",
            height: "15rem",
            border: "0.1rem solid black",
            borderRadius: "0.5rem",
            margin: "1rem",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Request Id: {requestData.requestData.requestId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Death"
              defaultValue={requestData.requestData.deathCertificate.dateOfDeath}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              defaultValue={requestData.requestData.deathCertificate.gender}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Person Name"
              defaultValue={requestData.requestData.deathCertificate.nameOfDeceased}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fathers Name"
              defaultValue={requestData.requestData.deathCertificate.fathersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place Of Cremation"
              defaultValue={requestData.requestData.deathCertificate.placeOfCremation}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place of Death"
              defaultValue={requestData.requestData.deathCertificate.placeOfDeath}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              defaultValue={requestData.requestData.deathCertificate.homeAddress}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={requestData.requestData.requestStatus !== "Pending"}
              id="datetime-local"
              label="Appointment Date"
              type="datetime-local"
              value={
                requestData.requestData.requestStatus !== "Pending"
                  ? requestData.requestData.documentVerificationDate
                  : selectedDate
              }
              className={classes.textField}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {requestData.requestData.requestStatus === "Pending" && (
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={() => handleSchedule(requestData.requestData.requestId, selectedDate)}
          >
            Schedule
          </Button>
        )}
        {requestData.requestData.requestStatus === "Scheduled" && (
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={() => handleResolved(requestData.requestData.requestId)}
          >
            Resolved
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

DeathRequestPopup.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleSchedule: PropTypes.func.isRequired,
  handleResolved: PropTypes.func.isRequired,
  requestData: PropTypes.shape({
    requestData: PropTypes.shape({
      requestId: PropTypes.string.isRequired,
      requestStatus: PropTypes.string.isRequired,
      documentVerificationDate: PropTypes.string.isRequired,
      deathCertificate: PropTypes.shape({
        dateOfDeath: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        nameOfDeceased: PropTypes.string.isRequired,
        fathersName: PropTypes.string.isRequired,
        placeOfDeath: PropTypes.string.isRequired,
        placeOfCremation: PropTypes.string.isRequired,
        homeAddress: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    requestImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DeathRequestPopup;
