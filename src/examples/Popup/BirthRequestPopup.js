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
      <DialogTitle>Birth Certificate Request</DialogTitle>
      <DialogContent>
        <MDBox pt={6} pb={3}>
          <Grid item xs={12}>
            <Card style={{ height: "25rem" }}>
              <div
                style={{
                  backgroundImage: `data:image/png;base64,${requestData.requestImages[0]}`,
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
                  backgroundImage: `data:image/png;base64,${requestData.requestImages[0]}`,
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
          onClick={() => handleSchedule(requestData.reuestData.requestId, selectedDate)}
        >
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BirthRequestPopup.propTypes = {
  requestData: PropTypes.shape({
    reuestData: PropTypes.shape({
      requestId: PropTypes.string.isRequired,
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
};

export default BirthRequestPopup;
