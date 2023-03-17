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
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";

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
      <DialogTitle>Death Certificate Request</DialogTitle>
      <DialogContent>
        <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            <Card style={{ height: "25rem" }}>
              <div
                style={{
                  backgroundImage: `url(${requestData.image1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "90%",
                  height: "90%",
                  margin: "2rem auto",
                  border: "0.1rem solid black",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}
              />
            </Card>
          </Grid>
        </MDBox>
        <br />
        <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            <Card style={{ height: "25rem" }}>
              <div
                style={{
                  backgroundImage: `url(${requestData.image2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "90%",
                  height: "90%",
                  margin: "2rem auto",
                  border: "0.1rem solid black",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}
              />
            </Card>
          </Grid>
        </MDBox>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Request Id: {requestData.requestId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Death"
              defaultValue={requestData.dateOfDeath}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Gender" defaultValue={requestData.gender} disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Person Name"
              defaultValue={requestData.personName}
              disabled
            />
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
              label="Place Of Cremation"
              defaultValue={requestData.placeOfCremation}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place of Death"
              defaultValue={requestData.placeOfDeath}
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
    dateOfDeath: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    image1: PropTypes.string.isRequired,
    image2: PropTypes.string.isRequired,
    personName: PropTypes.string.isRequired,
    fathersName: PropTypes.string.isRequired,
    placeOfCremation: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    placeOfDeath: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSchedule: PropTypes.func.isRequired,
};

export default BirthRequestPopup;
