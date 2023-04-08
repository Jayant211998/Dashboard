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
              Request Id: {requestData.reuestData.requestId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Death"
              defaultValue={requestData.reuestData.deathCertificate.dateOfDeath}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              defaultValue={requestData.reuestData.deathCertificate.gender}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Person Name"
              defaultValue={requestData.reuestData.deathCertificate.nameOfDeceased}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fathers Name"
              defaultValue={requestData.reuestData.deathCertificate.fathersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place Of Cremation"
              defaultValue={requestData.reuestData.deathCertificate.placeOfCremation}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place of Death"
              defaultValue={requestData.reuestData.deathCertificate.placeOfDeath}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              defaultValue={requestData.reuestData.deathCertificate.homeAddress}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={requestData.reuestData.requestStatus !== "Pending"}
              id="datetime-local"
              label="Appointment Date"
              type="datetime-local"
              value={
                requestData.reuestData.requestStatus !== "Pending"
                  ? requestData.reuestData.documentVerificationDate
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
        {requestData.reuestData.requestStatus === "Pending" && (
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={() => handleSchedule(requestData.reuestData.requestId, selectedDate)}
          >
            Schedule
          </Button>
        )}
        {requestData.reuestData.requestStatus === "Scheduled" && (
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
            onClick={() => handleResolved(requestData.reuestData.requestId)}
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
    reuestData: PropTypes.shape({
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
