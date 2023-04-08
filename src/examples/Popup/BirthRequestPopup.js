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
import { makeStyles } from "@mui/styles";

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

function BirthRequestPopup({ handleClose, requestData, handleSchedule, handleResolved }) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState("");
  const handleChange = (e) => {
    handleDateChange(e.target.value);
  };

  return (
    <Dialog open={requestData !== null} onClose={handleClose}>
      <DialogTitle>Birth Certificate Request</DialogTitle>
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
              label="Date of Birth"
              defaultValue={requestData.reuestData.birthCertificate.dateOfBirth}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              defaultValue={requestData.reuestData.birthCertificate.childGender}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Child Name"
              defaultValue={requestData.reuestData.birthCertificate.childNameEnglish}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fathers Name"
              defaultValue={requestData.reuestData.birthCertificate.fathersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mothers Name"
              defaultValue={requestData.reuestData.birthCertificate.mothersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place of Birth"
              defaultValue={requestData.reuestData.birthCertificate.placeOfBirth}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              defaultValue={requestData.reuestData.birthCertificate.address}
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

BirthRequestPopup.propTypes = {
  requestData: PropTypes.shape({
    reuestData: PropTypes.shape({
      requestStatus: PropTypes.string.isRequired,
      requestId: PropTypes.string.isRequired,
      documentVerificationDate: PropTypes.string.isRequired,
      birthCertificate: PropTypes.shape({
        dateOfBirth: PropTypes.string.isRequired,
        childGender: PropTypes.string.isRequired,
        childNameEnglish: PropTypes.string.isRequired,
        fathersName: PropTypes.string.isRequired,
        mothersName: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        placeOfBirth: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    requestImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSchedule: PropTypes.func.isRequired,
  handleResolved: PropTypes.func.isRequired,
};

export default BirthRequestPopup;
