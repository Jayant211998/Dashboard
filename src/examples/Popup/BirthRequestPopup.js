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
  console.log(requestData);
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
              Request Id: {requestData.requestData.requestId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              defaultValue={requestData.requestData.birthCertificate.dateOfBirth}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Gender"
              defaultValue={requestData.requestData.birthCertificate.childGender}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Child Name"
              defaultValue={requestData.requestData.birthCertificate.childNameEnglish}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fathers Name"
              defaultValue={requestData.requestData.birthCertificate.fathersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mothers Name"
              defaultValue={requestData.requestData.birthCertificate.mothersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place of Birth"
              defaultValue={requestData.requestData.birthCertificate.placeOfBirth}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              defaultValue={requestData.requestData.birthCertificate.address}
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

BirthRequestPopup.propTypes = {
  requestData: PropTypes.shape({
    requestData: PropTypes.shape({
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
