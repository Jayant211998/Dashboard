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

function BirthRequestPopup({ handleClose, requestData, handleSchedule }) {
  const classes = useStyles();

  const [selectedDate, handleDateChange] = React.useState("");

  const handleChange = (e) => {
    handleDateChange(e.target.value);
  };

  return (
    <Dialog open={requestData !== null} onClose={handleClose}>
      <DialogTitle>Birth Certificate Request</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Request Id: {requestData.requestId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <img src={requestData.image1} alt="Request 1" className={classes.image} />
              <img src={requestData.image2} alt="Request 2" className={classes.image} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              defaultValue={requestData.dateOfBirth}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Gender" defaultValue={requestData.gender} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Child Name" defaultValue={requestData.childName} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fathers Name"
              defaultValue={requestData.fathersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mothers Name"
              defaultValue={requestData.mothersName}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place of Birth"
              defaultValue={requestData.placeOfBirth}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              defaultValue={requestData.address}
              multiline
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              value={selectedDate}
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
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={() => handleSchedule(requestData.requestId, selectedDate)}
        >
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BirthRequestPopup.propTypes = {
  requestData: PropTypes.shape({
    requestId: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    childName: PropTypes.string.isRequired,
    fathersName: PropTypes.string.isRequired,
    mothersName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    placeOfBirth: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSchedule: PropTypes.func.isRequired,
};

export default BirthRequestPopup;
